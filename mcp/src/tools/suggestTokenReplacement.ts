import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export interface TokenSuggestion {
  input: { value: string; property: string };
  found: boolean;
  suggestion: {
    token: string;
    tokenValue: string;
    category: string;
    confidence: "exact" | "close" | "approximate";
    justification: string;
  } | null;
  alternatives: { token: string; tokenValue: string; distance: number }[];
  notice: string;
}

// ─── Token DB entry ───────────────────────────────────────────────────────────

interface TokenEntry {
  name: string;       // --dss-spacing-4
  rawValue: string;   // 1rem
  pxValue: number | null;
  hexValue: string | null;
  rgb: { r: number; g: number; b: number } | null;
  category: string;
  description: string;
}

// ─── Property → category mapping ─────────────────────────────────────────────

const PROPERTY_TO_CATEGORY: Record<string, string[]> = {
  color:             ["color", "gray", "hub", "water", "waste", "text", "action", "surface", "feedback", "success", "warning", "error", "info"],
  "background-color":["color", "gray", "hub", "water", "waste", "surface", "action"],
  background:        ["color", "gray", "hub", "water", "waste", "surface"],
  "border-color":    ["color", "gray", "hub", "water", "waste", "action", "feedback"],
  fill:              ["color", "gray", "hub", "water", "waste"],
  stroke:            ["color", "gray", "hub", "water", "waste"],
  margin:            ["spacing"],
  padding:           ["spacing"],
  gap:               ["spacing"],
  top:               ["spacing"],
  right:             ["spacing"],
  bottom:            ["spacing"],
  left:              ["spacing"],
  width:             ["spacing"],
  height:            ["spacing", "compact-control", "touch-target"],
  "min-height":      ["spacing", "compact-control", "touch-target"],
  "max-width":       ["spacing"],
  inset:             ["spacing"],
  "border-radius":   ["radius"],
  "font-size":       ["font-size", "typography"],
  "font-weight":     ["font-weight", "typography"],
  "line-height":     ["line-height", "typography"],
  "letter-spacing":  ["letter-spacing", "typography"],
  "box-shadow":      ["shadow"],
  "text-shadow":     ["shadow"],
  "transition-duration": ["duration", "motion"],
  "animation-duration":  ["duration", "motion"],
  "z-index":         ["z-index"],
  "border-width":    ["border"],
  opacity:           ["opacity"],
};

// ─── Parsers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function colorDistance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
    Math.pow(a.g - b.g, 2) +
    Math.pow(a.b - b.b, 2)
  );
}

function parsePxValue(value: string): number | null {
  const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return parseFloat(pxMatch[1]);
  const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) return Math.round(parseFloat(remMatch[1]) * 16);
  return null;
}

function parseInputValue(value: string): {
  type: "hex" | "rgb" | "px" | "rem" | "number" | "unknown";
  hex?: string;
  rgb?: { r: number; g: number; b: number };
  px?: number;
  raw: string;
} {
  const v = value.trim();

  // hex
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
    return { type: "hex", hex: v, rgb: hexToRgb(v) ?? undefined, raw: v };
  }

  // rgb/rgba
  const rgbMatch = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      type: "rgb",
      rgb: { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) },
      raw: v,
    };
  }

  // px
  const pxMatch = v.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return { type: "px", px: parseFloat(pxMatch[1]), raw: v };

  // rem
  const remMatch = v.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) return { type: "rem", px: Math.round(parseFloat(remMatch[1]) * 16), raw: v };

  return { type: "unknown", raw: v };
}

// ─── Token reference parser ───────────────────────────────────────────────────

function parseTokenReference(dssRoot: string): TokenEntry[] {
  const refPath = resolve(dssRoot, "docs/reference/DSS_TOKEN_REFERENCE.md");
  if (!existsSync(refPath)) return [];

  const content = readFileSync(refPath, "utf-8");
  const entries: TokenEntry[] = [];
  let currentSection = "";

  for (const line of content.split("\n")) {
    // Track current section heading
    const heading = line.match(/^#{1,4}\s+(.+)$/);
    if (heading) {
      currentSection = heading[1].toLowerCase();
      continue;
    }

    // Parse markdown table rows containing a token
    // Format: | `--dss-token-name` | value | ... |
    const tableRow = line.match(/^\|\s*`(--dss-[\w-]+)`\s*\|([^|]+)\|([^|]*)\|([^|]*)/);
    if (!tableRow) continue;

    const tokenName  = tableRow[1].trim();
    const col2       = tableRow[2].trim(); // usually rem/px value or hex
    const col3       = tableRow[3].trim(); // usually px or rgb
    const col4       = tableRow[4].trim(); // description

    // Determine category from section heading
    const category = deriveCategory(currentSection, tokenName);

    // Parse numeric px value
    let pxValue: number | null = null;
    const pxCol3 = col3.match(/(\d+(?:\.\d+)?)px/);
    const pxCol2 = col2.match(/(\d+(?:\.\d+)?)px/);
    if (pxCol3) pxValue = parseFloat(pxCol3[1]);
    else if (pxCol2) pxValue = parseFloat(pxCol2[1]);
    else {
      const remCol2 = col2.match(/(\d+(?:\.\d+)?)rem/);
      if (remCol2) pxValue = Math.round(parseFloat(remCol2[1]) * 16);
    }

    // Parse hex color
    let hexValue: string | null = null;
    let rgb: { r: number; g: number; b: number } | null = null;
    const hexInCol2 = col2.match(/#([0-9a-fA-F]{3,8})/);
    if (hexInCol2) {
      hexValue = hexInCol2[0];
      rgb = hexToRgb(hexValue);
    }

    entries.push({
      name: tokenName,
      rawValue: col2 || col3,
      pxValue,
      hexValue,
      rgb,
      category,
      description: col4,
    });
  }

  return entries;
}

function deriveCategory(sectionHeading: string, tokenName: string): string {
  if (sectionHeading.includes("spacing"))      return "spacing";
  if (sectionHeading.includes("radius"))       return "radius";
  if (sectionHeading.includes("shadow"))       return "shadow";
  if (sectionHeading.includes("typography") || sectionHeading.includes("font")) return "typography";
  if (sectionHeading.includes("motion") || sectionHeading.includes("duration")) return "motion";
  if (sectionHeading.includes("z-index"))      return "z-index";
  if (sectionHeading.includes("border"))       return "border";
  if (sectionHeading.includes("opacity"))      return "opacity";
  if (sectionHeading.includes("touch") || sectionHeading.includes("compact")) return "compact-control";
  if (sectionHeading.includes("color") || sectionHeading.includes("cor"))     return "color";

  // Fallback: derive from token name
  if (tokenName.includes("spacing"))   return "spacing";
  if (tokenName.includes("radius"))    return "radius";
  if (tokenName.includes("shadow"))    return "shadow";
  if (tokenName.includes("font"))      return "typography";
  if (tokenName.includes("duration"))  return "motion";
  if (tokenName.includes("z-index"))   return "z-index";
  if (tokenName.includes("border"))    return "border";
  if (tokenName.includes("opacity"))   return "opacity";
  return "color";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * suggest_token_replacement — Read-Only
 *
 * Analyzes a hardcoded CSS value and suggests the closest DSS token.
 * Reads DSS_TOKEN_REFERENCE.md. Never writes or modifies any file.
 */
export async function suggestTokenReplacement(
  value: string,
  property: string,
  dssRoot: string
): Promise<TokenSuggestion> {
  const tokens = parseTokenReference(dssRoot);

  if (tokens.length === 0) {
    return {
      input: { value, property },
      found: false,
      suggestion: null,
      alternatives: [],
      notice: READ_ONLY_NOTICE,
    };
  }

  const parsed = parseInputValue(value);
  const targetCategories = PROPERTY_TO_CATEGORY[property.toLowerCase()] ?? [];

  // Filter tokens by relevant categories (or all if unmapped property)
  const candidates = targetCategories.length > 0
    ? tokens.filter((t) => targetCategories.some((c) => t.category.includes(c)))
    : tokens;

  // ── Color matching ─────────────────────────────────────────────────────────
  if ((parsed.type === "hex" || parsed.type === "rgb") && parsed.rgb) {
    const colorCandidates = candidates.filter((t) => t.rgb !== null);
    if (colorCandidates.length === 0) {
      return noSuggestion(value, property, "No color tokens found for this property.");
    }

    const ranked = colorCandidates
      .map((t) => ({ token: t, distance: colorDistance(parsed.rgb!, t.rgb!) }))
      .sort((a, b) => a.distance - b.distance);

    const best = ranked[0];
    const confidence: "exact" | "close" | "approximate" =
      best.distance === 0 ? "exact" :
      best.distance < 15  ? "close" : "approximate";

    return {
      input: { value, property },
      found: true,
      suggestion: {
        token: best.token.name,
        tokenValue: best.token.hexValue ?? best.token.rawValue,
        category: best.token.category,
        confidence,
        justification: confidence === "exact"
          ? `Exact match: ${best.token.name} = ${best.token.hexValue} (${best.token.description})`
          : `Closest color match (ΔE≈${best.distance.toFixed(0)}): ${best.token.name} = ${best.token.hexValue}. ${best.token.description}`,
      },
      alternatives: ranked.slice(1, 4).map((r) => ({
        token: r.token.name,
        tokenValue: r.token.hexValue ?? r.token.rawValue,
        distance: Math.round(r.distance),
      })),
      notice: READ_ONLY_NOTICE,
    };
  }

  // ── px / rem matching ──────────────────────────────────────────────────────
  if ((parsed.type === "px" || parsed.type === "rem") && parsed.px !== undefined) {
    const pxCandidates = candidates.filter((t) => t.pxValue !== null);
    if (pxCandidates.length === 0) {
      return noSuggestion(value, property, `No ${targetCategories.join("/")} tokens with pixel values found.`);
    }

    const ranked = pxCandidates
      .map((t) => ({ token: t, distance: Math.abs(t.pxValue! - parsed.px!) }))
      .sort((a, b) => a.distance - b.distance);

    const best = ranked[0];
    const confidence: "exact" | "close" | "approximate" =
      best.distance === 0 ? "exact" :
      best.distance <= 2  ? "close" : "approximate";

    return {
      input: { value, property },
      found: true,
      suggestion: {
        token: best.token.name,
        tokenValue: best.token.rawValue,
        category: best.token.category,
        confidence,
        justification: confidence === "exact"
          ? `Exact match: ${best.token.name} = ${best.token.rawValue} (${parsed.px}px). ${best.token.description}`
          : `Closest match (Δ${best.distance}px): ${best.token.name} = ${best.token.rawValue}. ${best.token.description}`,
      },
      alternatives: ranked.slice(1, 4).map((r) => ({
        token: r.token.name,
        tokenValue: r.token.rawValue,
        distance: r.distance,
      })),
      notice: READ_ONLY_NOTICE,
    };
  }

  return noSuggestion(value, property, `Value "${value}" could not be parsed as a color or length. Provide a hex (#rrggbb), rgb(), or px/rem value.`);
}

function noSuggestion(value: string, property: string, reason: string): TokenSuggestion {
  return {
    input: { value, property },
    found: false,
    suggestion: null,
    alternatives: [],
    notice: `${reason}\n\n${READ_ONLY_NOTICE}`,
  };
}

const READ_ONLY_NOTICE = `This suggestion is strictly informational per MCP_READ_ONLY_CONTRACT.md. The MCP observes and explains — it never writes files or applies changes autonomously.`.trim();
