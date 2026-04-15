import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join, extname } from "path";
import { suggestTokenReplacement } from "./suggestTokenReplacement.js";

interface Finding {
  severity: "error" | "warning" | "info";
  rule: string;
  message: string;
  file?: string;
  line?: number;
  suggestedToken?: string;       // closest DSS token (if available)
  tokenConfidence?: string;      // "exact" | "close" | "approximate"
  tokenAlternatives?: string[];  // up to 3 alternative token names
  // Internal enrichment fields — stripped before returning
  _hardcodedValue?: string;
  _cssProperty?: string;
}

interface LayerCheck {
  layer: string;
  required: boolean;
  present: boolean;
}

interface ComponentCodeValidationResult {
  componentName: string;
  componentDir: string;
  found: boolean;
  verdict: "compliant" | "non-compliant" | "uncertain";
  layers: LayerCheck[];
  findings: Finding[];
  summary: string;
  notice: string;
}

const REQUIRED_LAYERS = [
  "1-structure",
  "2-composition",
  "3-variants",
  "4-output",
];

// ─── Regex Rules ──────────────────────────────────────────────────────────────

/** Hardcoded color patterns (violates Token First — Principle #1) */
const HARDCODED_COLOR_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /#[0-9a-fA-F]{3,8}\b/, label: "hex color" },
  { pattern: /\brgb\s*\(/, label: "rgb() color" },
  { pattern: /\brgba\s*\(/, label: "rgba() color" },
  { pattern: /\bhsl\s*\(/, label: "hsl() color" },
  { pattern: /\bhsla\s*\(/, label: "hsla() color" },
];

/** Allowed rgba exceptions: dark mode overlays documented in DSS governance */
const RGBA_EXCEPTION_PATTERN =
  /rgba\(\s*(?:255\s*,\s*255\s*,\s*255|0\s*,\s*0\s*,\s*0)\s*,\s*0\.\d+\s*\)/;

/** :deep() usage violates Gate de Composição v2.4 */
const DEEP_SELECTOR_PATTERN = /:deep\s*\(|::v-deep\b/;

/** Hardcoded pixel values in SCSS (not in comments) */
const HARDCODED_PX_PATTERN = /(?<!\/\/[^\n]*)\b(\d+)px\b/g;

/** Allowed pixel values: 0px, 1px (border/forced-colors exceptions), 2px */
const ALLOWED_PX_VALUES = new Set([0, 1, 2]);

/** Component-specific token names (violates Principle #6) */
const COMPONENT_TOKEN_PATTERN =
  /--dss-(?:chip|badge|button|btn|input|select|checkbox|radio|toggle|card)-\w+-(?:height|size|width)/;

// ─── File readers ─────────────────────────────────────────────────────────────

function readFileSafe(path: string): string | null {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return null;
  }
}

function collectFiles(dir: string, exts: string[]): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath, exts));
    } else if (exts.includes(extname(entry))) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Extract <style> blocks from a .vue file */
function extractStyleBlocks(vueContent: string): string {
  const blocks: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let match: RegExpExecArray | null;
  while ((match = styleRegex.exec(vueContent)) !== null) {
    blocks.push(match[1]);
  }
  return blocks.join("\n");
}

/**
 * Remove block comments (/* ... *\/) from CSS/SCSS content.
 * Replaces each comment with an equivalent number of newlines
 * so that line numbers of surrounding code are preserved.
 */
function stripBlockComments(content: string): string {
  return content.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const newlineCount = (match.match(/\n/g) || []).length;
    return "\n".repeat(newlineCount);
  });
}

/** Check a SCSS/style string for violations */
function analyzeScss(
  content: string,
  filePath: string,
  findings: Finding[]
): void {
  // Strip block comments first — prevents false positives when
  // documentation inside /* ... */ mentions :deep() or ::v-deep.
  const contentWithoutBlockComments = stripBlockComments(content);
  const lines = contentWithoutBlockComments.split("\n");

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Strip inline // comments to get only the code portion of the line
    const codeOnly = line.replace(/\/\/.*$/, "");
    const trimmed = codeOnly.trim();

    // Skip lines that are empty after comment removal
    if (!trimmed) return;

    // ── :deep() check ────────────────────────────────────────────────────
    if (DEEP_SELECTOR_PATTERN.test(codeOnly)) {
      findings.push({
        severity: "error",
        rule: "GATE_COMPOSICAO_V2.4",
        message: `':deep()' or '::v-deep' selector detected. Gate de Composição v2.4 prohibits breaking child component encapsulation. Use child component props instead.`,
        file: filePath,
        line: lineNum,
      });
    }

    // ── Hardcoded color check ─────────────────────────────────────────────
    for (const { pattern, label } of HARDCODED_COLOR_PATTERNS) {
      if (pattern.test(codeOnly)) {
        // Allow rgba(255,255,255,x) and rgba(0,0,0,x) — documented dark mode exceptions
        if (label.startsWith("rgba") && RGBA_EXCEPTION_PATTERN.test(codeOnly)) {
          findings.push({
            severity: "warning",
            rule: "TOKEN_FIRST",
            message: `rgba() with pure white/black detected (may be a documented dark-mode exception). Confirm it is registered in dss.meta.json exceptions.`,
            file: filePath,
            line: lineNum,
          });
          continue;
        }

        // Extract the raw color value for token suggestion enrichment
        let rawColorValue: string | undefined;
        const hexMatch = codeOnly.match(/#[0-9a-fA-F]{3,8}/);
        const rgbMatch = codeOnly.match(/rgba?\([^)]+\)/);
        if (hexMatch) rawColorValue = hexMatch[0];
        else if (rgbMatch) rawColorValue = rgbMatch[0];

        // Guess the CSS property from the line (e.g. "color:", "background-color:")
        const propMatch = codeOnly.match(/([\w-]+)\s*:/);
        const guessedProp = propMatch ? propMatch[1].trim() : "color";

        findings.push({
          severity: "error",
          rule: "TOKEN_FIRST",
          message: `Hardcoded ${label} detected: "${trimmed}". DSS Principle #1 requires all colors to use var(--dss-*) tokens.`,
          file: filePath,
          line: lineNum,
          _hardcodedValue: rawColorValue,
          _cssProperty: guessedProp,
        });
        break; // One finding per line is enough
      }
    }

    // ── Hardcoded px check (non-trivial values) ───────────────────────────
    let pxMatch: RegExpExecArray | null;
    const pxRegex = new RegExp(HARDCODED_PX_PATTERN.source, "g");
    while ((pxMatch = pxRegex.exec(codeOnly)) !== null) {
      const val = parseInt(pxMatch[1], 10);
      if (!ALLOWED_PX_VALUES.has(val)) {
        // Guess the CSS property from the line
        const propMatch = codeOnly.match(/([\w-]+)\s*:/);
        const guessedProp = propMatch ? propMatch[1].trim() : "padding";

        findings.push({
          severity: "warning",
          rule: "TOKEN_FIRST",
          message: `Hardcoded pixel value '${val}px' detected. Consider using a var(--dss-spacing-*) or var(--dss-*) token instead.`,
          file: filePath,
          line: lineNum,
          _hardcodedValue: `${val}px`,
          _cssProperty: guessedProp,
        });
        break; // One per line
      }
    }

    // ── Component-specific token names ───────────────────────────────────
    if (COMPONENT_TOKEN_PATTERN.test(codeOnly)) {
      findings.push({
        severity: "error",
        rule: "PRINCIPLE_6_GENERIC_TOKENS",
        message: `Component-specific height/size token detected. Use --dss-compact-control-height-{xs,sm,md,lg} instead.`,
        file: filePath,
        line: lineNum,
      });
    }
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * validate_component_code — Read-Only
 *
 * Analyzes DSS component source files for architectural violations.
 * Uses regex — no AST parser required for the current ruleset.
 * Never writes or modifies any file.
 */
export async function validateComponentCode(
  componentName: string,
  dssRoot: string
): Promise<ComponentCodeValidationResult> {
  // Normalize: accept "DssCard", "card", "dss-card"
  const normalized = normalizeComponentName(componentName);

  // Search in base and composed directories
  let componentDir: string | null = null;
  for (const subDir of ["components/base", "components/composed"]) {
    const candidate = resolve(dssRoot, subDir, normalized);
    if (existsSync(candidate)) {
      componentDir = candidate;
      break;
    }
  }

  if (!componentDir) {
    return {
      componentName: normalized,
      componentDir: resolve(dssRoot, "components/base", normalized),
      found: false,
      verdict: "uncertain",
      layers: [],
      findings: [
        {
          severity: "error",
          rule: "COMPONENT_NOT_FOUND",
          message: `Component directory "${normalized}" not found in components/base or components/composed.`,
        },
      ],
      summary: `Component "${normalized}" not found. Verify the name or check DSS_FASEAMENTO_COMPONENTES.md.`,
      notice: READ_ONLY_NOTICE,
    };
  }

  const findings: Finding[] = [];

  // ── Layer check ───────────────────────────────────────────────────────────
  const layers: LayerCheck[] = REQUIRED_LAYERS.map((layer) => ({
    layer,
    required: true,
    present: existsSync(join(componentDir!, layer)),
  }));

  for (const layer of layers) {
    if (!layer.present) {
      findings.push({
        severity: "error",
        rule: "FOUR_LAYER_ARCHITECTURE",
        message: `Missing required layer: "${layer.layer}". All 4 layers must exist, even if sparse.`,
        file: componentDir,
      });
    }
  }

  // ── dss.meta.json check ───────────────────────────────────────────────────
  const metaPath = join(componentDir, "dss.meta.json");
  if (!existsSync(metaPath)) {
    findings.push({
      severity: "error",
      rule: "META_MISSING",
      message: `dss.meta.json not found. This file is required for governance tracking.`,
      file: componentDir,
    });
  }

  // ── SCSS analysis (all .scss files + <style> blocks in .vue files) ────────
  const scssFiles = collectFiles(componentDir, [".scss"]);
  for (const scssPath of scssFiles) {
    const content = readFileSafe(scssPath);
    if (content) analyzeScss(content, scssPath, findings);
  }

  const vueFiles = collectFiles(componentDir, [".vue"]);
  for (const vuePath of vueFiles) {
    const content = readFileSafe(vuePath);
    if (content) {
      const styleContent = extractStyleBlocks(content);
      if (styleContent) analyzeScss(styleContent, vuePath + " (<style>)", findings);
    }
  }

  // ── Token suggestion enrichment ───────────────────────────────────────────
  // For each TOKEN_FIRST finding that has a raw value, attempt to suggest a token.
  // Errors run in parallel for performance; failures are silently ignored.
  await Promise.all(
    findings
      .filter((f) => f.rule === "TOKEN_FIRST" && f._hardcodedValue && f._cssProperty)
      .map(async (f) => {
        try {
          const suggestion = await suggestTokenReplacement(
            f._hardcodedValue!,
            f._cssProperty!,
            dssRoot
          );
          if (suggestion.found && suggestion.suggestion) {
            f.suggestedToken = suggestion.suggestion.token;
            f.tokenConfidence = suggestion.suggestion.confidence;
            f.tokenAlternatives = suggestion.alternatives.map((a) => a.token);
          }
        } catch {
          // Enrichment is best-effort; never fail validation because of it
        }
      })
  );

  // Strip internal fields before returning
  for (const f of findings) {
    delete f._hardcodedValue;
    delete f._cssProperty;
  }

  // ── Verdict ───────────────────────────────────────────────────────────────
  const hasErrors = findings.some((f) => f.severity === "error");
  const hasWarnings = findings.some((f) => f.severity === "warning");

  let verdict: "compliant" | "non-compliant" | "uncertain";
  if (hasErrors) {
    verdict = "non-compliant";
  } else if (hasWarnings) {
    verdict = "uncertain";
  } else {
    verdict = "compliant";
  }

  const errorCount = findings.filter((f) => f.severity === "error").length;
  const warnCount = findings.filter((f) => f.severity === "warning").length;

  const summary =
    verdict === "compliant"
      ? `✅ ${normalized}: No violations detected. All 4 layers present.`
      : verdict === "non-compliant"
      ? `⚠️ ${normalized}: ${errorCount} error(s), ${warnCount} warning(s) found.`
      : `ℹ️ ${normalized}: ${warnCount} warning(s) — review for potential exceptions.`;

  return {
    componentName: normalized,
    componentDir,
    found: true,
    verdict,
    layers,
    findings,
    summary,
    notice: READ_ONLY_NOTICE,
  };
}

function normalizeComponentName(name: string): string {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  const pascal = clean
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("");
  return `Dss${pascal}`;
}

const READ_ONLY_NOTICE = `
This validation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains — it does not correct, apply fixes, or make autonomous decisions.
All remediation must be performed by a human developer with explicit DSS governance approval.
`.trim();
