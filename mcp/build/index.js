#!/usr/bin/env node

// src/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// src/resources/index.ts
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var DSS_ROOT = resolve(__dirname, "../..");
var RESOURCE_MAP = {
  "dss://governance/claude": {
    path: resolve(DSS_ROOT, "CLAUDE.md"),
    name: "DSS CLAUDE.md \u2014 Regras Normativas",
    description: "Regras normativas e arquitetura base do DSS. Documento de autoridade m\xE1xima para agentes de IA.",
    mimeType: "text/markdown"
  },
  "dss://governance/faseamento": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_FASEAMENTO_COMPONENTES.md"),
    name: "DSS Faseamento de Componentes",
    description: "Classifica\xE7\xE3o e fases de todos os componentes DSS (Fase 1, Fase 2, backlog).",
    mimeType: "text/markdown"
  },
  "dss://governance/tokens": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_TOKEN_REFERENCE.md"),
    name: "DSS Token Reference",
    description: "Refer\xEAncia completa de todos os tokens de design do DSS com sem\xE2ntica e uso.",
    mimeType: "text/markdown"
  },
  "dss://governance/golden-model": {
    path: resolve(DSS_ROOT, "docs/governance/DSS_GOLDEN_COMPONENTS.md"),
    name: "DSS Golden Components",
    description: "Modelo de refer\xEAncia (Golden Reference e Golden Context) para auditoria de componentes.",
    mimeType: "text/markdown"
  },
  "dss://governance/criterios-fase2": {
    path: resolve(
      DSS_ROOT,
      "docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md"
    ),
    name: "DSS Crit\xE9rios de Avalia\xE7\xE3o \u2014 Fase 2",
    description: "Crit\xE9rios formais de avalia\xE7\xE3o para componentes candidatos ao selo DSS v2.2.",
    mimeType: "text/markdown"
  },
  "dss://todo/fase2": {
    path: resolve(DSS_ROOT, "docs/reference/DSS_FASE2_TODO.md"),
    name: "DSS Fase 2 \u2014 To-Do List",
    description: "Estado atual do backlog e lista de tarefas pendentes para a Fase 2 do DSS.",
    mimeType: "text/markdown"
  }
};
function registerResources(server) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: Object.entries(RESOURCE_MAP).map(([uri, meta]) => ({
        uri,
        name: meta.name,
        description: meta.description,
        mimeType: meta.mimeType
      }))
    };
  });
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const resource = RESOURCE_MAP[uri];
    if (!resource) {
      throw new Error(
        `Resource not found: "${uri}". Available resources: ${Object.keys(RESOURCE_MAP).join(", ")}`
      );
    }
    let content;
    try {
      content = readFileSync(resource.path, "utf-8");
    } catch (err) {
      throw new Error(
        `Failed to read DSS file at "${resource.path}": ${err.message}`
      );
    }
    return {
      contents: [
        {
          uri,
          mimeType: resource.mimeType,
          text: content
        }
      ]
    };
  });
}

// src/tools/index.ts
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { resolve as resolve5, dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// src/tools/queryComponent.ts
import { readFileSync as readFileSync2, existsSync } from "fs";
import { resolve as resolve2 } from "path";
async function queryComponent(componentName, dssRoot) {
  const normalized = normalizeComponentName(componentName);
  const componentDir = resolve2(dssRoot, "components/base", normalized);
  const metaPath = resolve2(componentDir, "dss.meta.json");
  const docPath = resolve2(componentDir, `${normalized}.md`);
  const slug = normalized.replace(/^Dss/, "dss_").replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "").replace(/dss__/, "dss_");
  const prePromptPath = resolve2(
    dssRoot,
    "docs/governance/pre-prompts",
    `pre_prompt_${slug}.md`
  );
  if (!existsSync(componentDir)) {
    return {
      component: normalized,
      found: false,
      meta: null,
      prePrompt: null,
      documentation: null,
      summary: `Component "${normalized}" not found in DSS components directory (${componentDir}). Verify the component name or check DSS_FASEAMENTO_COMPONENTES.md for the full list.`
    };
  }
  let meta = null;
  if (existsSync(metaPath)) {
    try {
      meta = JSON.parse(readFileSync2(metaPath, "utf-8"));
    } catch {
      meta = null;
    }
  }
  let prePrompt = null;
  if (existsSync(prePromptPath)) {
    prePrompt = readFileSync2(prePromptPath, "utf-8");
  }
  let documentation = null;
  if (existsSync(docPath)) {
    documentation = readFileSync2(docPath, "utf-8");
  }
  const summary = buildSummary(normalized, meta, prePrompt !== null, documentation !== null);
  return {
    component: normalized,
    found: true,
    meta,
    prePrompt,
    documentation,
    summary
  };
}
function normalizeComponentName(name) {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  const pascal = clean.split(/[-_\s]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join("");
  return `Dss${pascal}`;
}
function buildSummary(component, meta, hasPrePrompt, hasDoc) {
  if (!meta) {
    return `${component}: component directory found but dss.meta.json is missing or invalid.`;
  }
  const lines = [
    `## ${component}`,
    `- **Status:** ${meta.status ?? "unknown"}`,
    `- **Phase:** ${meta.phase ?? "unknown"}`,
    `- **Category:** ${meta.category ?? "unknown"}`,
    `- **DSS Version:** ${meta.dssVersion ?? "unknown"}`,
    `- **Golden Reference:** ${meta.goldenReference ?? "\u2014"}`,
    `- **Golden Context:** ${meta.goldenContext ?? "\u2014"}`,
    `- **Seal Date:** ${meta.sealDate ?? "not sealed"}`,
    `- **Has Pre-Prompt:** ${hasPrePrompt ? "yes" : "no"}`,
    `- **Has Documentation:** ${hasDoc ? "yes" : "no"}`
  ];
  if (meta.hasReservations) {
    lines.push(`- **Reservations:** present (see dss.meta.json for details)`);
  }
  if (Array.isArray(meta.exceptions) && meta.exceptions.length > 0) {
    lines.push(`- **Exceptions:** ${meta.exceptions.length} documented`);
  }
  if (Array.isArray(meta.props)) {
    lines.push(`- **Props:** ${meta.props.join(", ")}`);
  } else if (meta.props && typeof meta.props === "object") {
    const allProps = Object.values(meta.props).flat();
    lines.push(`- **Props (all subcomponents):** ${allProps.join(", ")}`);
  }
  return lines.join("\n");
}

// src/tools/queryToken.ts
import { readFileSync as readFileSync3, existsSync as existsSync2 } from "fs";
import { resolve as resolve3 } from "path";
async function queryToken(dssRoot, tokenName, category) {
  const tokenRefPath = resolve3(
    dssRoot,
    "docs/reference/DSS_TOKEN_REFERENCE.md"
  );
  if (!existsSync2(tokenRefPath)) {
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary: "DSS_TOKEN_REFERENCE.md not found in the repository."
    };
  }
  const content = readFileSync3(tokenRefPath, "utf-8");
  const allSections = splitIntoSections(content);
  if (!tokenName && !category) {
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary: "Please provide either `tokenName` (e.g. `--dss-spacing-4`) or `category` (e.g. `color`, `spacing`, `radius`)."
    };
  }
  const matchedSections = [];
  for (const section of allSections) {
    if (tokenName && sectionMatchesToken(section, tokenName)) {
      matchedSections.push(section);
      continue;
    }
    if (category && sectionMatchesCategory(section, category)) {
      matchedSections.push(section);
    }
  }
  if (matchedSections.length === 0) {
    const searchTerm = tokenName ?? category;
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary: `No sections found in DSS_TOKEN_REFERENCE.md matching "${searchTerm}". Try a broader category (e.g. "color", "spacing", "typography", "radius", "shadow", "motion", "border").`
    };
  }
  return {
    query: { tokenName, category },
    found: true,
    sections: matchedSections,
    summary: `Found ${matchedSections.length} section(s) matching your query. See "sections" for the full content.`
  };
}
function splitIntoSections(content) {
  const lines = content.split("\n");
  const sections = [];
  let current = [];
  for (const line of lines) {
    if (line.startsWith("## ") && current.length > 0) {
      sections.push(current.join("\n").trim());
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) {
    sections.push(current.join("\n").trim());
  }
  return sections.filter((s) => s.length > 0);
}
function stripMarkdown(text) {
  return text.replace(/`/g, "").replace(/\|/g, " ").replace(/\*\*/g, "").replace(/\*/g, "").replace(/_/g, " ");
}
function sectionMatchesToken(section, tokenName) {
  const stripped = stripMarkdown(section).toLowerCase();
  const raw = section.toLowerCase();
  const query = tokenName.toLowerCase();
  return raw.includes(query) || stripped.includes(query);
}
function sectionMatchesCategory(section, category) {
  const lower = category.toLowerCase();
  const stripped = stripMarkdown(section).toLowerCase();
  const sectionLower = section.toLowerCase();
  const headingMatch = /^#{1,3} .+$/m;
  const headings = section.split("\n").filter((l) => headingMatch.test(l)).join(" ").toLowerCase();
  const tokenPattern = `--dss-${lower}`;
  return headings.includes(lower) || sectionLower.includes(tokenPattern) || stripped.includes(tokenPattern);
}

// src/tools/checkCompliance.ts
import { readFileSync as readFileSync4, existsSync as existsSync3 } from "fs";
import { resolve as resolve4 } from "path";
async function checkCompliance(context, ruleType, dssRoot) {
  const claudePath = resolve4(dssRoot, "CLAUDE.md");
  const criteriosPath = resolve4(
    dssRoot,
    "docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md"
  );
  const sources = [];
  for (const { label, path } of [
    { label: "CLAUDE.md", path: claudePath },
    { label: "DSS_CRITERIOS_AVALIACAO_FASE2.md", path: criteriosPath }
  ]) {
    if (existsSync3(path)) {
      sources.push({ label, path, content: readFileSync4(path, "utf-8") });
    }
  }
  if (sources.length === 0) {
    return {
      context,
      ruleType,
      verdict: "uncertain",
      findings: ["Governance files not found \u2014 cannot evaluate compliance."],
      references: [],
      notice: READ_ONLY_NOTICE
    };
  }
  const findings = [];
  const references = [];
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
    notice: READ_ONLY_NOTICE
  };
}
function analyzeTokenRules(context, sources, findings, references) {
  const lower = context.toLowerCase();
  const hardcodedPatterns = [
    { pattern: /\b\d+px\b/, label: "pixel value" },
    { pattern: /\b\d+rem\b/, label: "rem value" },
    { pattern: /#[0-9a-fA-F]{3,6}\b/, label: "hex color" },
    { pattern: /\brgb\s*\(/, label: "rgb() color" },
    { pattern: /\brgba\s*\(/, label: "rgba() color" }
  ];
  for (const { pattern, label } of hardcodedPatterns) {
    if (pattern.test(context)) {
      findings.push(
        `\u26A0\uFE0F NON-COMPLIANT: Hardcoded ${label} detected. DSS Principle #1 (Token First) requires all values to use var(--dss-*) tokens.`
      );
      references.push("CLAUDE.md \u2014 Princ\xEDpio #1: Token First");
    }
  }
  if (lower.includes("var(--dss-")) {
    findings.push(
      "\u2705 Token syntax var(--dss-*) detected \u2014 consistent with Token First principle."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #1: Token First");
  }
  if (lower.includes("--dss-chip-") || lower.includes("--dss-badge-") || lower.includes("--dss-button-")) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: Component-specific tokens (e.g. --dss-chip-height-*) are prohibited. Use --dss-compact-control-height-{xs,sm,md,lg} instead."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #6: Tokens Gen\xE9ricos para Altura");
  }
  if (findings.length === 0) {
    findings.push(
      "\u2139\uFE0F UNCERTAIN: No specific token violations detected in the described context. For a definitive evaluation, reference DSS_TOKEN_REFERENCE.md with the exact token name."
    );
  }
}
function analyzeCompositionRules(context, sources, findings, references) {
  const lower = context.toLowerCase();
  const layers = ["1-structure", "2-composition", "3-variants", "4-output"];
  const mentionedLayers = layers.filter((l) => lower.includes(l));
  if (mentionedLayers.length > 0 && mentionedLayers.length < layers.length && lower.includes("omit")) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: Omitting architectural layers is prohibited. All 4 layers (1-structure, 2-composition, 3-variants, 4-output) must exist, even if sparse."
    );
    references.push("CLAUDE.md \u2014 Arquitetura em 4 Camadas");
  }
  if (lower.includes("::before") && lower.includes("visual")) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: ::before is reserved exclusively for touch target (WCAG 2.5.5). Visual effects must use ::after."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #7: Conven\xE7\xE3o de Pseudo-elementos");
  }
  if ((lower.includes("scss") || lower.includes("css")) && (lower.includes("background-color") || lower.includes("color:")) && !lower.includes("var(--dss-")) {
    findings.push(
      "\u26A0\uFE0F RISK: Applying colors directly in SCSS without tokens is a known anti-pattern. Colors must be applied via Quasar utility classes or computed Vue properties, not SCSS."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #2: Cores seguem o padr\xE3o Quasar");
  }
  const brightnessMatch = context.match(/brightness\(\s*([\d.]+)\s*\)/);
  if (brightnessMatch) {
    const val = parseFloat(brightnessMatch[1]);
    const allowed = [0.85, 0.9, 0.92, 0.95, 1.1, 1.2];
    if (!allowed.includes(val)) {
      findings.push(
        `\u26A0\uFE0F NON-COMPLIANT: brightness(${val}) is not in the canonical table [${allowed.join(", ")}]. Arbitrary brightness values require explicit justification and approval.`
      );
      references.push(
        "CLAUDE.md \u2014 Princ\xEDpio #8: Reutiliza\xE7\xE3o de Valores N\xE3o-Tokenizados"
      );
    } else {
      findings.push(
        `\u2705 brightness(${val}) is in the canonical allowed table.`
      );
    }
  }
  if (findings.length === 0) {
    findings.push(
      "\u2139\uFE0F UNCERTAIN: No specific composition violations detected. Provide layer names, SCSS patterns or component structure details for a more precise evaluation."
    );
  }
}
function analyzeAccessibilityRules(context, sources, findings, references) {
  const lower = context.toLowerCase();
  const pxMatch = context.match(/(\d+)px.*touch|touch.*(\d+)px/i);
  if (pxMatch) {
    const size = parseInt(pxMatch[1] ?? pxMatch[2] ?? "0");
    if (size < 48) {
      findings.push(
        `\u26A0\uFE0F NON-COMPLIANT: Touch target of ${size}px is below the 48px minimum required by WCAG 2.5.5. DSS mandates \u2265 48px via ::before pseudo-element.`
      );
      references.push("CLAUDE.md \u2014 Princ\xEDpio #4: Acessibilidade");
    } else {
      findings.push(`\u2705 Touch target of ${size}px meets the 48px minimum.`);
    }
  }
  if (lower.includes("outline: none") || lower.includes("outline:none")) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: outline: none removes visible focus indicator, violating WCAG 2.4.7 (Focus Visible). DSS requires a visible focus ring using --dss-focus-ring-* tokens."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #4: Acessibilidade");
  }
  if (lower.includes("aria-hidden") && lower.includes("interactive")) {
    findings.push(
      "\u26A0\uFE0F RISK: aria-hidden on interactive elements removes them from the accessibility tree, which may violate WCAG 4.1.2."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #4: Acessibilidade");
  }
  if (findings.length === 0) {
    findings.push(
      "\u2139\uFE0F UNCERTAIN: No specific accessibility violations detected. Describe the component's ARIA attributes, focus handling, or touch target size for a more precise evaluation."
    );
  }
}
function determineVerdict(findings) {
  if (findings.some((f) => f.startsWith("\u26A0\uFE0F NON-COMPLIANT"))) {
    return "non-compliant";
  }
  if (findings.some((f) => f.startsWith("\u2705"))) {
    return "compliant";
  }
  return "uncertain";
}
var READ_ONLY_NOTICE = `
This evaluation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains \u2014 it does not correct, apply fixes, or make autonomous decisions.
All remediation must be performed by a human developer with explicit DSS governance approval.
`.trim();

// src/tools/index.ts
var __dirname2 = dirname2(fileURLToPath2(import.meta.url));
var DSS_ROOT2 = resolve5(__dirname2, "../..");
var QueryComponentSchema = z.object({
  componentName: z.string().describe(
    'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
  )
});
var QueryTokenSchema = z.object({
  tokenName: z.string().optional().describe(
    'Exact token name (e.g. "--dss-color-brand-primary", "--dss-spacing-md"). Takes precedence over category.'
  ),
  category: z.string().optional().describe(
    'Token category to search (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").'
  )
});
var CheckComplianceSchema = z.object({
  context: z.string().describe(
    'Description of the usage to evaluate (e.g. "Using DssCard with border-radius of 8px hardcoded").'
  ),
  ruleType: z.enum(["composition", "token", "accessibility"]).describe(
    '"composition" \u2014 layer structure, pseudo-elements, SCSS patterns. "token" \u2014 token usage, hardcoded values. "accessibility" \u2014 WCAG rules, touch target, ARIA.'
  )
});
var TOOL_DEFINITIONS = [
  {
    name: "query_component",
    description: "Returns detailed information about a specific DSS component: compliance status, phase, golden references, props, pre-prompt and documentation. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: 'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
        }
      },
      required: ["componentName"]
    }
  },
  {
    name: "query_token",
    description: "Searches DSS_TOKEN_REFERENCE.md for a specific token or token category. Returns the matching section(s) with full documentation. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        tokenName: {
          type: "string",
          description: 'Exact token name (e.g. "--dss-color-brand-primary"). Optional if category is provided.'
        },
        category: {
          type: "string",
          description: 'Token category (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").'
        }
      }
    }
  },
  {
    name: "check_compliance",
    description: "Evaluates whether a described usage is compliant with DSS governance rules. Strictly descriptive \u2014 never corrective. Per MCP_READ_ONLY_CONTRACT.md, the MCP observes and explains but never decides or changes.",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "string",
          description: 'Description of the usage to evaluate (e.g. "Using brightness(0.93) for hover state in DssButton").'
        },
        ruleType: {
          type: "string",
          enum: ["composition", "token", "accessibility"],
          description: '"composition" \u2014 layers, pseudo-elements, SCSS. "token" \u2014 token usage, hardcoded values. "accessibility" \u2014 WCAG, touch target, ARIA.'
        }
      },
      required: ["context", "ruleType"]
    }
  }
];
function registerTools(server) {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOL_DEFINITIONS };
  });
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case "query_component": {
        const input = QueryComponentSchema.parse(args);
        const result = await queryComponent(input.componentName, DSS_ROOT2);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }
      case "query_token": {
        const input = QueryTokenSchema.parse(args);
        const result = await queryToken(
          DSS_ROOT2,
          input.tokenName,
          input.category
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }
      case "check_compliance": {
        const input = CheckComplianceSchema.parse(args);
        const result = await checkCompliance(
          input.context,
          input.ruleType,
          DSS_ROOT2
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }
      default:
        throw new Error(
          `Unknown tool: "${name}". Available tools: ${TOOL_DEFINITIONS.map((t) => t.name).join(", ")}`
        );
    }
  });
}

// src/server.ts
async function createServer() {
  const server = new Server(
    {
      name: "dss-mcp",
      version: "1.0.0"
    },
    {
      capabilities: {
        resources: {},
        tools: {}
      }
    }
  );
  registerResources(server);
  registerTools(server);
  return server;
}
async function startServer() {
  const server = await createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// src/index.ts
startServer().catch((err) => {
  console.error("DSS MCP Server failed to start:", err);
  process.exit(1);
});
