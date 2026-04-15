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
import { resolve as resolve8, dirname as dirname2 } from "path";
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
  if (/::before/.test(context) && /visual|hover|background|overlay|ripple|after-effect/i.test(context)) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: ::before is reserved exclusively for touch target (WCAG 2.5.5). Visual effects must use ::after."
    );
    references.push("CLAUDE.md \u2014 Princ\xEDpio #7: Conven\xE7\xE3o de Pseudo-elementos");
  }
  if (/:deep\s*\(|::v-deep\b/.test(context)) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: ':deep()' or '::v-deep' detected. Gate de Composi\xE7\xE3o v2.4 prohibits breaking child component encapsulation via CSS. Use child component props instead."
    );
    references.push("DSS_CRITERIOS_AVALIACAO_FASE2.md \u2014 Gate de Composi\xE7\xE3o v2.4, Regra 2");
  }
  if (/container|wrapper|group/i.test(context) && /:hover|:focus|:active/i.test(context) && /state|interati/i.test(context)) {
    findings.push(
      "\u26A0\uFE0F RISK: Container component capturing interactive states (:hover/:focus) that semantically belong to child components. Gate de Responsabilidade v2.4, Regra 1 may be violated."
    );
    references.push("DSS_CRITERIOS_AVALIACAO_FASE2.md \u2014 Gate de Responsabilidade v2.4, Regra 1");
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
  if (/outline\s*:\s*(none|0|transparent)\b/i.test(context)) {
    findings.push(
      "\u26A0\uFE0F NON-COMPLIANT: outline: none/0/transparent removes visible focus indicator, violating WCAG 2.4.7 (Focus Visible). DSS requires a visible focus ring using --dss-focus-ring-* tokens."
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

// src/tools/getTodoListStatus.ts
import { readFileSync as readFileSync5, existsSync as existsSync4 } from "fs";
import { resolve as resolve5 } from "path";
async function getTodoListStatus(dssRoot) {
  const todoPath = resolve5(dssRoot, "docs/reference/DSS_FASE2_TODO.md");
  if (!existsSync4(todoPath)) {
    return {
      found: false,
      summary: { total: 0, sealed: 0, in_progress: 0, pending: 0, blocked: 0, progress_pct: 0 },
      next_available: [],
      all_items: [],
      raw_note: "DSS_FASE2_TODO.md not found."
    };
  }
  const content = readFileSync5(todoPath, "utf-8");
  const lines = content.split("\n");
  const allItems = [];
  let currentFamily = "Unknown";
  for (const line of lines) {
    const familyMatch = line.match(/^###\s+Família:\s+(.+)$/);
    if (familyMatch) {
      currentFamily = familyMatch[1].trim();
      continue;
    }
    const sealedMatch = line.match(/^\s*-\s+\[x\].*~~`(\w+)`~~.*✅.*SELADO/);
    const inProgressMatch = line.match(/^\s*-\s+\[x\](?!.*SELADO).*`(\w+)`/);
    const blockedMatch = line.match(/^\s*-\s+\[\s\].*🔒.*`(\w+)`/);
    const pendingMatch = line.match(/^\s*-\s+\[\s\](?!.*🔒).*`(\w+)`/);
    if (sealedMatch) {
      allItems.push({ name: sealedMatch[1], status: "sealed", family: currentFamily });
    } else if (blockedMatch) {
      allItems.push({ name: blockedMatch[1], status: "blocked", family: currentFamily });
    } else if (pendingMatch) {
      allItems.push({ name: pendingMatch[1], status: "pending", family: currentFamily });
    } else if (inProgressMatch) {
      allItems.push({ name: inProgressMatch[1], status: "in_progress", family: currentFamily });
    }
  }
  const sealed = allItems.filter((i) => i.status === "sealed").length;
  const in_progress = allItems.filter((i) => i.status === "in_progress").length;
  const pending = allItems.filter((i) => i.status === "pending").length;
  const blocked = allItems.filter((i) => i.status === "blocked").length;
  const total = allItems.length;
  const progress_pct = total > 0 ? Math.round(sealed / total * 100) : 0;
  const next_available = allItems.filter((i) => i.status === "pending").slice(0, 5);
  const lastUpdatedMatch = content.match(/\*\*Última Atualização:\*\*\s*(.+)/);
  const raw_note = lastUpdatedMatch ? `Last updated: ${lastUpdatedMatch[1].trim()}` : "No update date found.";
  return {
    found: true,
    summary: { total, sealed, in_progress, pending, blocked, progress_pct },
    next_available,
    all_items: allItems,
    raw_note
  };
}

// src/tools/validatePrePrompt.ts
import { readFileSync as readFileSync6, existsSync as existsSync5 } from "fs";
import { resolve as resolve6 } from "path";
var REQUIRED_AXES = [
  {
    axis: "1. Classifica\xE7\xE3o e Contexto",
    patterns: [
      /classifica[çc][aã]o/i,
      /contexto/i,
      /fase\s+(e\s+n[íi]vel|2)/i,
      /golden\s+(reference|context)/i
    ]
  },
  {
    axis: "2. Risco Principal Arquitetural",
    patterns: [
      /risco/i,
      /grande\s+risco/i,
      /arquitetural/i,
      /risco\s+arquitetural/i
    ]
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
      /props\s+(de\s+estilo|de\s+forma|de\s+layout|bloqueadas)/i
    ]
  },
  {
    axis: "4. Tokens",
    patterns: [
      /tokens?/i,
      /--dss-/i,
      /mapeamento.*tokens?/i,
      /tokens?.*utilizados/i
    ]
  },
  {
    axis: "5. Acessibilidade e Estados",
    patterns: [
      /acessibilidade/i,
      /accessibility/i,
      /estados/i,
      /wcag/i,
      /aria/i,
      /touch\s+target/i
    ]
  }
];
async function validatePrePrompt(componentName, dssRoot) {
  const slug = componentName.replace(/^Dss/, "dss_").replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "").replace(/dss__/, "dss_").replace(/__+/g, "_");
  const prePromptPath = resolve6(
    dssRoot,
    "docs/governance/pre-prompts",
    `pre_prompt_${slug}.md`
  );
  if (!existsSync5(prePromptPath)) {
    return {
      componentName,
      filePath: prePromptPath,
      found: false,
      verdict: "not_found",
      axes: [],
      missing_axes: REQUIRED_AXES.map((a) => a.axis),
      summary: `Pre-prompt file not found at: ${prePromptPath}`,
      notice: READ_ONLY_NOTICE2
    };
  }
  const content = readFileSync6(prePromptPath, "utf-8");
  const headings = content.split("\n").filter((l) => /^#{1,4}\s/.test(l)).join("\n");
  const axes = REQUIRED_AXES.map(({ axis, patterns }) => {
    for (const pattern of patterns) {
      if (pattern.test(headings)) {
        return { axis, present: true, matched_by: `heading: ${pattern.source}` };
      }
      if (pattern.test(content)) {
        return { axis, present: true, matched_by: `content: ${pattern.source}` };
      }
    }
    return { axis, present: false, matched_by: null };
  });
  const missing_axes = axes.filter((a) => !a.present).map((a) => a.axis);
  const verdict = missing_axes.length === 0 ? "compliant" : "non-compliant";
  const summary = verdict === "compliant" ? `\u2705 Pre-prompt for ${componentName} covers all 5 mandatory axes.` : `\u26A0\uFE0F Pre-prompt for ${componentName} is missing ${missing_axes.length} axis(es): ${missing_axes.join(", ")}.`;
  return {
    componentName,
    filePath: prePromptPath,
    found: true,
    verdict,
    axes,
    missing_axes,
    summary,
    notice: READ_ONLY_NOTICE2
  };
}
var READ_ONLY_NOTICE2 = `
This validation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains \u2014 it does not correct, apply fixes, or make autonomous decisions.
`.trim();

// src/tools/validateComponentCode.ts
import { readFileSync as readFileSync7, existsSync as existsSync6, readdirSync, statSync } from "fs";
import { resolve as resolve7, join, extname } from "path";
var REQUIRED_LAYERS = [
  "1-structure",
  "2-composition",
  "3-variants",
  "4-output"
];
var HARDCODED_COLOR_PATTERNS = [
  { pattern: /#[0-9a-fA-F]{3,8}\b/, label: "hex color" },
  { pattern: /\brgb\s*\(/, label: "rgb() color" },
  { pattern: /\brgba\s*\(/, label: "rgba() color" },
  { pattern: /\bhsl\s*\(/, label: "hsl() color" },
  { pattern: /\bhsla\s*\(/, label: "hsla() color" }
];
var RGBA_EXCEPTION_PATTERN = /rgba\(\s*(?:255\s*,\s*255\s*,\s*255|0\s*,\s*0\s*,\s*0)\s*,\s*0\.\d+\s*\)/;
var DEEP_SELECTOR_PATTERN = /:deep\s*\(|::v-deep\b/;
var HARDCODED_PX_PATTERN = /(?<!\/\/[^\n]*)\b(\d+)px\b/g;
var ALLOWED_PX_VALUES = /* @__PURE__ */ new Set([0, 1, 2]);
var COMPONENT_TOKEN_PATTERN = /--dss-(?:chip|badge|button|btn|input|select|checkbox|radio|toggle|card)-\w+-(?:height|size|width)/;
function readFileSafe(path) {
  try {
    return readFileSync7(path, "utf-8");
  } catch {
    return null;
  }
}
function collectFiles(dir, exts) {
  if (!existsSync6(dir)) return [];
  const results = [];
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
function extractStyleBlocks(vueContent) {
  const blocks = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let match;
  while ((match = styleRegex.exec(vueContent)) !== null) {
    blocks.push(match[1]);
  }
  return blocks.join("\n");
}
function analyzeScss(content, filePath, findings) {
  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
    if (DEEP_SELECTOR_PATTERN.test(line)) {
      findings.push({
        severity: "error",
        rule: "GATE_COMPOSICAO_V2.4",
        message: `':deep()' or '::v-deep' selector detected. Gate de Composi\xE7\xE3o v2.4 prohibits breaking child component encapsulation. Use child component props instead.`,
        file: filePath,
        line: lineNum
      });
    }
    for (const { pattern, label } of HARDCODED_COLOR_PATTERNS) {
      if (pattern.test(line)) {
        if (label.startsWith("rgba") && RGBA_EXCEPTION_PATTERN.test(line)) {
          findings.push({
            severity: "warning",
            rule: "TOKEN_FIRST",
            message: `rgba() with pure white/black detected (may be a documented dark-mode exception). Confirm it is registered in dss.meta.json exceptions.`,
            file: filePath,
            line: lineNum
          });
          continue;
        }
        findings.push({
          severity: "error",
          rule: "TOKEN_FIRST",
          message: `Hardcoded ${label} detected: "${trimmed}". DSS Principle #1 requires all colors to use var(--dss-*) tokens.`,
          file: filePath,
          line: lineNum
        });
        break;
      }
    }
    let pxMatch;
    const pxRegex = new RegExp(HARDCODED_PX_PATTERN.source, "g");
    while ((pxMatch = pxRegex.exec(line)) !== null) {
      const val = parseInt(pxMatch[1], 10);
      if (!ALLOWED_PX_VALUES.has(val)) {
        findings.push({
          severity: "warning",
          rule: "TOKEN_FIRST",
          message: `Hardcoded pixel value '${val}px' detected. Consider using a var(--dss-spacing-*) or var(--dss-*) token instead.`,
          file: filePath,
          line: lineNum
        });
        break;
      }
    }
    if (COMPONENT_TOKEN_PATTERN.test(line)) {
      findings.push({
        severity: "error",
        rule: "PRINCIPLE_6_GENERIC_TOKENS",
        message: `Component-specific height/size token detected. Use --dss-compact-control-height-{xs,sm,md,lg} instead.`,
        file: filePath,
        line: lineNum
      });
    }
  });
}
async function validateComponentCode(componentName, dssRoot) {
  const normalized = normalizeComponentName2(componentName);
  let componentDir = null;
  for (const subDir of ["components/base", "components/composed"]) {
    const candidate = resolve7(dssRoot, subDir, normalized);
    if (existsSync6(candidate)) {
      componentDir = candidate;
      break;
    }
  }
  if (!componentDir) {
    return {
      componentName: normalized,
      componentDir: resolve7(dssRoot, "components/base", normalized),
      found: false,
      verdict: "uncertain",
      layers: [],
      findings: [
        {
          severity: "error",
          rule: "COMPONENT_NOT_FOUND",
          message: `Component directory "${normalized}" not found in components/base or components/composed.`
        }
      ],
      summary: `Component "${normalized}" not found. Verify the name or check DSS_FASEAMENTO_COMPONENTES.md.`,
      notice: READ_ONLY_NOTICE3
    };
  }
  const findings = [];
  const layers = REQUIRED_LAYERS.map((layer) => ({
    layer,
    required: true,
    present: existsSync6(join(componentDir, layer))
  }));
  for (const layer of layers) {
    if (!layer.present) {
      findings.push({
        severity: "error",
        rule: "FOUR_LAYER_ARCHITECTURE",
        message: `Missing required layer: "${layer.layer}". All 4 layers must exist, even if sparse.`,
        file: componentDir
      });
    }
  }
  const metaPath = join(componentDir, "dss.meta.json");
  if (!existsSync6(metaPath)) {
    findings.push({
      severity: "error",
      rule: "META_MISSING",
      message: `dss.meta.json not found. This file is required for governance tracking.`,
      file: componentDir
    });
  }
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
  const hasErrors = findings.some((f) => f.severity === "error");
  const hasWarnings = findings.some((f) => f.severity === "warning");
  let verdict;
  if (hasErrors) {
    verdict = "non-compliant";
  } else if (hasWarnings) {
    verdict = "uncertain";
  } else {
    verdict = "compliant";
  }
  const errorCount = findings.filter((f) => f.severity === "error").length;
  const warnCount = findings.filter((f) => f.severity === "warning").length;
  const summary = verdict === "compliant" ? `\u2705 ${normalized}: No violations detected. All 4 layers present.` : verdict === "non-compliant" ? `\u26A0\uFE0F ${normalized}: ${errorCount} error(s), ${warnCount} warning(s) found.` : `\u2139\uFE0F ${normalized}: ${warnCount} warning(s) \u2014 review for potential exceptions.`;
  return {
    componentName: normalized,
    componentDir,
    found: true,
    verdict,
    layers,
    findings,
    summary,
    notice: READ_ONLY_NOTICE3
  };
}
function normalizeComponentName2(name) {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  const pascal = clean.split(/[-_\s]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("");
  return `Dss${pascal}`;
}
var READ_ONLY_NOTICE3 = `
This validation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains \u2014 it does not correct, apply fixes, or make autonomous decisions.
All remediation must be performed by a human developer with explicit DSS governance approval.
`.trim();

// src/tools/index.ts
var __dirname2 = dirname2(fileURLToPath2(import.meta.url));
var DSS_ROOT2 = resolve8(__dirname2, "../..");
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
var GetTodoListStatusSchema = z.object({
  filter: z.enum(["all", "pending", "sealed", "blocked"]).optional().default("all").describe(
    'Filter results: "all" returns everything, "pending" returns only actionable items, "sealed" returns completed items, "blocked" returns blocked items.'
  )
});
var ValidatePrePromptSchema = z.object({
  componentName: z.string().describe(
    'Name of the DSS component whose pre-prompt should be validated (e.g. "DssBtnGroup", "DssTab"). Case-sensitive, Dss prefix required.'
  )
});
var ValidateComponentCodeSchema = z.object({
  componentName: z.string().describe(
    'Name of the DSS component to validate (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
  )
});
var TOOL_DEFINITIONS = [
  // ── Phase 1 Tools ──────────────────────────────────────────────────────────
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
  },
  // ── Phase 2 Tools ──────────────────────────────────────────────────────────
  {
    name: "get_todo_list_status",
    description: "Returns the current progress of the DSS Phase 2 implementation by parsing DSS_FASE2_TODO.md. Shows sealed, pending, in-progress and blocked components. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          enum: ["all", "pending", "sealed", "blocked"],
          description: 'Filter results: "all" (default), "pending" (actionable), "sealed" (completed), "blocked".'
        }
      }
    }
  },
  {
    name: "validate_pre_prompt",
    description: "Verifies whether a DSS component pre-prompt covers all 5 mandatory axes required by Phase 2 criteria: (1) Classification, (2) Main Architectural Risk, (3) Mapped API, (4) Tokens, (5) Accessibility & States. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: 'Name of the DSS component (e.g. "DssBtnGroup", "DssTab"). Dss prefix required.'
        }
      },
      required: ["componentName"]
    }
  },
  {
    name: "validate_component_code",
    description: "Analyzes the source code of a DSS component (Vue + SCSS) and checks for architectural violations: missing 4-layer structure, hardcoded colors (Token First), :deep() usage (Gate de Composi\xE7\xE3o v2.4), and component-specific tokens. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: 'Name of the DSS component to validate (e.g. "DssCard", "card"). Case-insensitive.'
        }
      },
      required: ["componentName"]
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
      // ── Phase 1 ────────────────────────────────────────────────────────────
      case "query_component": {
        const input = QueryComponentSchema.parse(args);
        const result = await queryComponent(input.componentName, DSS_ROOT2);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      case "query_token": {
        const input = QueryTokenSchema.parse(args);
        const result = await queryToken(DSS_ROOT2, input.tokenName, input.category);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
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
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      // ── Phase 2 ────────────────────────────────────────────────────────────
      case "get_todo_list_status": {
        const input = GetTodoListStatusSchema.parse(args ?? {});
        const result = await getTodoListStatus(DSS_ROOT2);
        if (input.filter && input.filter !== "all") {
          result.all_items = result.all_items.filter(
            (i) => i.status === input.filter
          );
        }
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      case "validate_pre_prompt": {
        const input = ValidatePrePromptSchema.parse(args);
        const result = await validatePrePrompt(input.componentName, DSS_ROOT2);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      case "validate_component_code": {
        const input = ValidateComponentCodeSchema.parse(args);
        const result = await validateComponentCode(input.componentName, DSS_ROOT2);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
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
