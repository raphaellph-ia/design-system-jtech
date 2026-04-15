import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

type RuleType = "composition" | "token" | "accessibility";

interface ComplianceResult {
  context: string;
  ruleType: RuleType;
  verdict: "compliant" | "non-compliant" | "uncertain";
  findings: string[];
  references: string[];
  notice: string;
}

/**
 * check_compliance — Read-Only
 *
 * Evaluates whether a described usage is compliant with DSS rules.
 * Mode: descriptive only — never corrective, never mutating.
 * Per MCP_READ_ONLY_CONTRACT.md §3: "Validation must always be descriptive, never corrective."
 */
export async function checkCompliance(
  context: string,
  ruleType: RuleType,
  dssRoot: string
): Promise<ComplianceResult> {
  const claudePath = resolve(dssRoot, "CLAUDE.md");
  const criteriosPath = resolve(
    dssRoot,
    "docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md"
  );

  const sources: { label: string; path: string; content: string }[] = [];

  for (const { label, path } of [
    { label: "CLAUDE.md", path: claudePath },
    { label: "DSS_CRITERIOS_AVALIACAO_FASE2.md", path: criteriosPath },
  ]) {
    if (existsSync(path)) {
      sources.push({ label, path, content: readFileSync(path, "utf-8") });
    }
  }

  if (sources.length === 0) {
    return {
      context,
      ruleType,
      verdict: "uncertain",
      findings: ["Governance files not found — cannot evaluate compliance."],
      references: [],
      notice: READ_ONLY_NOTICE,
    };
  }

  const findings: string[] = [];
  const references: string[] = [];

  // Rule-specific analysis
  switch (ruleType) {
    case "token":
      analyzeTokenRules(context, sources, findings, references);
      break;
    case "composition":
      analyzeCompositionRules(context, sources, findings, references);
      break;
    case "accessibility":
      analyzeAccessibilityRules(context, sources, findings, references);
      break;
  }

  const verdict = determineVerdict(findings);

  return {
    context,
    ruleType,
    verdict,
    findings,
    references,
    notice: READ_ONLY_NOTICE,
  };
}

// ─── Rule Analyzers ───────────────────────────────────────────────────────────

function analyzeTokenRules(
  context: string,
  sources: { label: string; content: string }[],
  findings: string[],
  references: string[]
): void {
  const lower = context.toLowerCase();

  // Check for hardcoded values
  const hardcodedPatterns = [
    { pattern: /\b\d+px\b/, label: "pixel value" },
    { pattern: /\b\d+rem\b/, label: "rem value" },
    { pattern: /#[0-9a-fA-F]{3,6}\b/, label: "hex color" },
    { pattern: /\brgb\s*\(/, label: "rgb() color" },
    { pattern: /\brgba\s*\(/, label: "rgba() color" },
  ];

  for (const { pattern, label } of hardcodedPatterns) {
    if (pattern.test(context)) {
      findings.push(
        `⚠️ NON-COMPLIANT: Hardcoded ${label} detected. DSS Principle #1 (Token First) requires all values to use var(--dss-*) tokens.`
      );
      references.push("CLAUDE.md — Princípio #1: Token First");
    }
  }

  // Check for token usage
  if (lower.includes("var(--dss-")) {
    findings.push(
      "✅ Token syntax var(--dss-*) detected — consistent with Token First principle."
    );
    references.push("CLAUDE.md — Princípio #1: Token First");
  }

  // Check for component-specific token creation
  if (
    lower.includes("--dss-chip-") ||
    lower.includes("--dss-badge-") ||
    lower.includes("--dss-button-")
  ) {
    findings.push(
      "⚠️ NON-COMPLIANT: Component-specific tokens (e.g. --dss-chip-height-*) are prohibited. Use --dss-compact-control-height-{xs,sm,md,lg} instead."
    );
    references.push("CLAUDE.md — Princípio #6: Tokens Genéricos para Altura");
  }

  if (findings.length === 0) {
    findings.push(
      "ℹ️ UNCERTAIN: No specific token violations detected in the described context. For a definitive evaluation, reference DSS_TOKEN_REFERENCE.md with the exact token name."
    );
  }
}

function analyzeCompositionRules(
  context: string,
  sources: { label: string; content: string }[],
  findings: string[],
  references: string[]
): void {
  const lower = context.toLowerCase();

  // Check for layer omission
  const layers = ["1-structure", "2-composition", "3-variants", "4-output"];
  const mentionedLayers = layers.filter((l) => lower.includes(l));
  if (
    mentionedLayers.length > 0 &&
    mentionedLayers.length < layers.length &&
    lower.includes("omit")
  ) {
    findings.push(
      "⚠️ NON-COMPLIANT: Omitting architectural layers is prohibited. All 4 layers (1-structure, 2-composition, 3-variants, 4-output) must exist, even if sparse."
    );
    references.push("CLAUDE.md — Arquitetura em 4 Camadas");
  }

  // Check for ::before misuse (visual / hover / background / content keywords)
  if (
    /::before/.test(context) &&
    /visual|hover|background|overlay|ripple|after-effect/i.test(context)
  ) {
    findings.push(
      "⚠️ NON-COMPLIANT: ::before is reserved exclusively for touch target (WCAG 2.5.5). Visual effects must use ::after."
    );
    references.push("CLAUDE.md — Princípio #7: Convenção de Pseudo-elementos");
  }

  // Gate de Composição v2.4 — :deep() usage
  if (/:deep\s*\(|::v-deep\b/.test(context)) {
    findings.push(
      "⚠️ NON-COMPLIANT: ':deep()' or '::v-deep' detected. Gate de Composição v2.4 prohibits breaking child component encapsulation via CSS. Use child component props instead."
    );
    references.push("DSS_CRITERIOS_AVALIACAO_FASE2.md — Gate de Composição v2.4, Regra 2");
  }

  // Gate de Responsabilidade v2.4 — hover/focus on container
  if (
    /container|wrapper|group/i.test(context) &&
    /:hover|:focus|:active/i.test(context) &&
    /state|interati/i.test(context)
  ) {
    findings.push(
      "⚠️ RISK: Container component capturing interactive states (:hover/:focus) that semantically belong to child components. Gate de Responsabilidade v2.4, Regra 1 may be violated."
    );
    references.push("DSS_CRITERIOS_AVALIACAO_FASE2.md — Gate de Responsabilidade v2.4, Regra 1");
  }

  // Check for colors in SCSS
  if (
    (lower.includes("scss") || lower.includes("css")) &&
    (lower.includes("background-color") || lower.includes("color:")) &&
    !lower.includes("var(--dss-")
  ) {
    findings.push(
      "⚠️ RISK: Applying colors directly in SCSS without tokens is a known anti-pattern. Colors must be applied via Quasar utility classes or computed Vue properties, not SCSS."
    );
    references.push("CLAUDE.md — Princípio #2: Cores seguem o padrão Quasar");
  }

  // Brightness values
  const brightnessMatch = context.match(/brightness\(\s*([\d.]+)\s*\)/);
  if (brightnessMatch) {
    const val = parseFloat(brightnessMatch[1]);
    const allowed = [0.85, 0.9, 0.92, 0.95, 1.1, 1.2];
    if (!allowed.includes(val)) {
      findings.push(
        `⚠️ NON-COMPLIANT: brightness(${val}) is not in the canonical table [${allowed.join(", ")}]. Arbitrary brightness values require explicit justification and approval.`
      );
      references.push(
        "CLAUDE.md — Princípio #8: Reutilização de Valores Não-Tokenizados"
      );
    } else {
      findings.push(
        `✅ brightness(${val}) is in the canonical allowed table.`
      );
    }
  }

  if (findings.length === 0) {
    findings.push(
      "ℹ️ UNCERTAIN: No specific composition violations detected. Provide layer names, SCSS patterns or component structure details for a more precise evaluation."
    );
  }
}

function analyzeAccessibilityRules(
  context: string,
  sources: { label: string; content: string }[],
  findings: string[],
  references: string[]
): void {
  const lower = context.toLowerCase();

  // Touch target
  const pxMatch = context.match(/(\d+)px.*touch|touch.*(\d+)px/i);
  if (pxMatch) {
    const size = parseInt(pxMatch[1] ?? pxMatch[2] ?? "0");
    if (size < 48) {
      findings.push(
        `⚠️ NON-COMPLIANT: Touch target of ${size}px is below the 48px minimum required by WCAG 2.5.5. DSS mandates ≥ 48px via ::before pseudo-element.`
      );
      references.push("CLAUDE.md — Princípio #4: Acessibilidade");
    } else {
      findings.push(`✅ Touch target of ${size}px meets the 48px minimum.`);
    }
  }

  // Focus visibility — improved: also catches outline:none, outline: 0, outline: transparent
  if (/outline\s*:\s*(none|0|transparent)\b/i.test(context)) {
    findings.push(
      "⚠️ NON-COMPLIANT: outline: none/0/transparent removes visible focus indicator, violating WCAG 2.4.7 (Focus Visible). DSS requires a visible focus ring using --dss-focus-ring-* tokens."
    );
    references.push("CLAUDE.md — Princípio #4: Acessibilidade");
  }

  // ARIA
  if (lower.includes("aria-hidden") && lower.includes("interactive")) {
    findings.push(
      "⚠️ RISK: aria-hidden on interactive elements removes them from the accessibility tree, which may violate WCAG 4.1.2."
    );
    references.push("CLAUDE.md — Princípio #4: Acessibilidade");
  }

  if (findings.length === 0) {
    findings.push(
      "ℹ️ UNCERTAIN: No specific accessibility violations detected. Describe the component's ARIA attributes, focus handling, or touch target size for a more precise evaluation."
    );
  }
}

// ─── Verdict ──────────────────────────────────────────────────────────────────

function determineVerdict(
  findings: string[]
): "compliant" | "non-compliant" | "uncertain" {
  if (findings.some((f) => f.startsWith("⚠️ NON-COMPLIANT"))) {
    return "non-compliant";
  }
  if (findings.some((f) => f.startsWith("✅"))) {
    return "compliant";
  }
  return "uncertain";
}

// ─── Read-Only Notice ─────────────────────────────────────────────────────────

const READ_ONLY_NOTICE = `
This evaluation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains — it does not correct, apply fixes, or make autonomous decisions.
All remediation must be performed by a human developer with explicit DSS governance approval.
`.trim();
