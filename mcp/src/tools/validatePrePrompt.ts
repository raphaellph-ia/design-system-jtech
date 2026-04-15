import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface AxisResult {
  axis: string;
  present: boolean;
  matched_by: string | null;
}

interface PrePromptValidationResult {
  componentName: string;
  filePath: string;
  found: boolean;
  verdict: "compliant" | "non-compliant" | "not_found";
  axes: AxisResult[];
  missing_axes: string[];
  summary: string;
  notice: string;
}

/**
 * The 5 mandatory axes for a Phase 2 pre-prompt.
 * Each axis is checked against headings (##, ###) in the markdown file.
 */
const REQUIRED_AXES: { axis: string; patterns: RegExp[] }[] = [
  {
    axis: "1. Classificação e Contexto",
    patterns: [
      /classifica[çc][aã]o/i,
      /contexto/i,
      /fase\s+(e\s+n[íi]vel|2)/i,
      /golden\s+(reference|context)/i,
    ],
  },
  {
    axis: "2. Risco Principal Arquitetural",
    patterns: [
      /risco/i,
      /grande\s+risco/i,
      /arquitetural/i,
      /risco\s+arquitetural/i,
    ],
  },
  {
    axis: "3. API Mapeada",
    patterns: [
      /api\s+mapeada/i,
      /mapeamento.*api/i,
      /api.*quasar/i,
      /props.*mapeadas/i,
      /contrato.*api/i,
      /api\s+do\s+componente/i,
      /##\s+api/i,
      /###\s+props/i,
      /props\s+(de\s+estilo|de\s+forma|de\s+layout|bloqueadas)/i,
    ],
  },
  {
    axis: "4. Tokens",
    patterns: [
      /tokens?/i,
      /--dss-/i,
      /mapeamento.*tokens?/i,
      /tokens?.*utilizados/i,
    ],
  },
  {
    axis: "5. Acessibilidade e Estados",
    patterns: [
      /acessibilidade/i,
      /accessibility/i,
      /estados/i,
      /wcag/i,
      /aria/i,
      /touch\s+target/i,
    ],
  },
];

/**
 * validate_pre_prompt — Read-Only
 *
 * Verifies if a DSS component pre-prompt covers all 5 mandatory axes.
 * Never writes or modifies any file.
 */
export async function validatePrePrompt(
  componentName: string,
  dssRoot: string
): Promise<PrePromptValidationResult> {
  // Build slug: DssBtnGroup → dss_btn_group
  const slug = componentName
    .replace(/^Dss/, "dss_")
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/dss__/, "dss_")
    .replace(/__+/g, "_");

  const prePromptPath = resolve(
    dssRoot,
    "docs/governance/pre-prompts",
    `pre_prompt_${slug}.md`
  );

  if (!existsSync(prePromptPath)) {
    return {
      componentName,
      filePath: prePromptPath,
      found: false,
      verdict: "not_found",
      axes: [],
      missing_axes: REQUIRED_AXES.map((a) => a.axis),
      summary: `Pre-prompt file not found at: ${prePromptPath}`,
      notice: READ_ONLY_NOTICE,
    };
  }

  const content = readFileSync(prePromptPath, "utf-8");

  // Extract all heading lines (# ## ### etc.) + all content for pattern matching
  const headings = content
    .split("\n")
    .filter((l) => /^#{1,4}\s/.test(l))
    .join("\n");

  // For broader patterns (like --dss- tokens), check full content
  const axes: AxisResult[] = REQUIRED_AXES.map(({ axis, patterns }) => {
    for (const pattern of patterns) {
      // Check headings first (stronger signal)
      if (pattern.test(headings)) {
        return { axis, present: true, matched_by: `heading: ${pattern.source}` };
      }
      // Then check full content (for token patterns like --dss-)
      if (pattern.test(content)) {
        return { axis, present: true, matched_by: `content: ${pattern.source}` };
      }
    }
    return { axis, present: false, matched_by: null };
  });

  const missing_axes = axes.filter((a) => !a.present).map((a) => a.axis);
  const verdict: "compliant" | "non-compliant" =
    missing_axes.length === 0 ? "compliant" : "non-compliant";

  const summary =
    verdict === "compliant"
      ? `✅ Pre-prompt for ${componentName} covers all 5 mandatory axes.`
      : `⚠️ Pre-prompt for ${componentName} is missing ${missing_axes.length} axis(es): ${missing_axes.join(", ")}.`;

  return {
    componentName,
    filePath: prePromptPath,
    found: true,
    verdict,
    axes,
    missing_axes,
    summary,
    notice: READ_ONLY_NOTICE,
  };
}

const READ_ONLY_NOTICE = `
This validation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains — it does not correct, apply fixes, or make autonomous decisions.
`.trim();
