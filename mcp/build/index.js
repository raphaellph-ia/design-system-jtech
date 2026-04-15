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
import { resolve as resolve10, dirname as dirname2 } from "path";
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
import { readFileSync as readFileSync8, existsSync as existsSync7, readdirSync, statSync } from "fs";
import { resolve as resolve8, join, extname } from "path";

// src/tools/suggestTokenReplacement.ts
import { readFileSync as readFileSync7, existsSync as existsSync6 } from "fs";
import { resolve as resolve7 } from "path";
var PROPERTY_TO_CATEGORY = {
  color: ["color", "gray", "hub", "water", "waste", "text", "action", "surface", "feedback", "success", "warning", "error", "info"],
  "background-color": ["color", "gray", "hub", "water", "waste", "surface", "action"],
  background: ["color", "gray", "hub", "water", "waste", "surface"],
  "border-color": ["color", "gray", "hub", "water", "waste", "action", "feedback"],
  fill: ["color", "gray", "hub", "water", "waste"],
  stroke: ["color", "gray", "hub", "water", "waste"],
  margin: ["spacing"],
  padding: ["spacing"],
  gap: ["spacing"],
  top: ["spacing"],
  right: ["spacing"],
  bottom: ["spacing"],
  left: ["spacing"],
  width: ["spacing"],
  height: ["spacing", "compact-control", "touch-target"],
  "min-height": ["spacing", "compact-control", "touch-target"],
  "max-width": ["spacing"],
  inset: ["spacing"],
  "border-radius": ["radius"],
  "font-size": ["font-size", "typography"],
  "font-weight": ["font-weight", "typography"],
  "line-height": ["line-height", "typography"],
  "letter-spacing": ["letter-spacing", "typography"],
  "box-shadow": ["shadow"],
  "text-shadow": ["shadow"],
  "transition-duration": ["duration", "motion"],
  "animation-duration": ["duration", "motion"],
  "z-index": ["z-index"],
  "border-width": ["border"],
  opacity: ["opacity"]
};
function hexToRgb(hex) {
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
function colorDistance(a, b) {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2)
  );
}
function parseInputValue(value) {
  const v = value.trim();
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
    return { type: "hex", hex: v, rgb: hexToRgb(v) ?? void 0, raw: v };
  }
  const rgbMatch = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      type: "rgb",
      rgb: { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) },
      raw: v
    };
  }
  const pxMatch = v.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return { type: "px", px: parseFloat(pxMatch[1]), raw: v };
  const remMatch = v.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) return { type: "rem", px: Math.round(parseFloat(remMatch[1]) * 16), raw: v };
  return { type: "unknown", raw: v };
}
function parseTokenReference(dssRoot) {
  const refPath = resolve7(dssRoot, "docs/reference/DSS_TOKEN_REFERENCE.md");
  if (!existsSync6(refPath)) return [];
  const content = readFileSync7(refPath, "utf-8");
  const entries = [];
  let currentSection = "";
  for (const line of content.split("\n")) {
    const heading = line.match(/^#{1,4}\s+(.+)$/);
    if (heading) {
      currentSection = heading[1].toLowerCase();
      continue;
    }
    const tableRow = line.match(/^\|\s*`(--dss-[\w-]+)`\s*\|([^|]+)\|([^|]*)\|([^|]*)/);
    if (!tableRow) continue;
    const tokenName = tableRow[1].trim();
    const col2 = tableRow[2].trim();
    const col3 = tableRow[3].trim();
    const col4 = tableRow[4].trim();
    const category = deriveCategory(currentSection, tokenName);
    let pxValue = null;
    const pxCol3 = col3.match(/(\d+(?:\.\d+)?)px/);
    const pxCol2 = col2.match(/(\d+(?:\.\d+)?)px/);
    if (pxCol3) pxValue = parseFloat(pxCol3[1]);
    else if (pxCol2) pxValue = parseFloat(pxCol2[1]);
    else {
      const remCol2 = col2.match(/(\d+(?:\.\d+)?)rem/);
      if (remCol2) pxValue = Math.round(parseFloat(remCol2[1]) * 16);
    }
    let hexValue = null;
    let rgb = null;
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
      description: col4
    });
  }
  return entries;
}
function deriveCategory(sectionHeading, tokenName) {
  if (sectionHeading.includes("spacing")) return "spacing";
  if (sectionHeading.includes("radius")) return "radius";
  if (sectionHeading.includes("shadow")) return "shadow";
  if (sectionHeading.includes("typography") || sectionHeading.includes("font")) return "typography";
  if (sectionHeading.includes("motion") || sectionHeading.includes("duration")) return "motion";
  if (sectionHeading.includes("z-index")) return "z-index";
  if (sectionHeading.includes("border")) return "border";
  if (sectionHeading.includes("opacity")) return "opacity";
  if (sectionHeading.includes("touch") || sectionHeading.includes("compact")) return "compact-control";
  if (sectionHeading.includes("color") || sectionHeading.includes("cor")) return "color";
  if (tokenName.includes("spacing")) return "spacing";
  if (tokenName.includes("radius")) return "radius";
  if (tokenName.includes("shadow")) return "shadow";
  if (tokenName.includes("font")) return "typography";
  if (tokenName.includes("duration")) return "motion";
  if (tokenName.includes("z-index")) return "z-index";
  if (tokenName.includes("border")) return "border";
  if (tokenName.includes("opacity")) return "opacity";
  return "color";
}
async function suggestTokenReplacement(value, property, dssRoot) {
  const tokens = parseTokenReference(dssRoot);
  if (tokens.length === 0) {
    return {
      input: { value, property },
      found: false,
      suggestion: null,
      alternatives: [],
      notice: READ_ONLY_NOTICE3
    };
  }
  const parsed = parseInputValue(value);
  const targetCategories = PROPERTY_TO_CATEGORY[property.toLowerCase()] ?? [];
  const candidates = targetCategories.length > 0 ? tokens.filter((t) => targetCategories.some((c) => t.category.includes(c))) : tokens;
  if ((parsed.type === "hex" || parsed.type === "rgb") && parsed.rgb) {
    const colorCandidates = candidates.filter((t) => t.rgb !== null);
    if (colorCandidates.length === 0) {
      return noSuggestion(value, property, "No color tokens found for this property.");
    }
    const ranked = colorCandidates.map((t) => ({ token: t, distance: colorDistance(parsed.rgb, t.rgb) })).sort((a, b) => a.distance - b.distance);
    const best = ranked[0];
    const confidence = best.distance === 0 ? "exact" : best.distance < 15 ? "close" : "approximate";
    return {
      input: { value, property },
      found: true,
      suggestion: {
        token: best.token.name,
        tokenValue: best.token.hexValue ?? best.token.rawValue,
        category: best.token.category,
        confidence,
        justification: confidence === "exact" ? `Exact match: ${best.token.name} = ${best.token.hexValue} (${best.token.description})` : `Closest color match (\u0394E\u2248${best.distance.toFixed(0)}): ${best.token.name} = ${best.token.hexValue}. ${best.token.description}`
      },
      alternatives: ranked.slice(1, 4).map((r) => ({
        token: r.token.name,
        tokenValue: r.token.hexValue ?? r.token.rawValue,
        distance: Math.round(r.distance)
      })),
      notice: READ_ONLY_NOTICE3
    };
  }
  if ((parsed.type === "px" || parsed.type === "rem") && parsed.px !== void 0) {
    const pxCandidates = candidates.filter((t) => t.pxValue !== null);
    if (pxCandidates.length === 0) {
      return noSuggestion(value, property, `No ${targetCategories.join("/")} tokens with pixel values found.`);
    }
    const ranked = pxCandidates.map((t) => ({ token: t, distance: Math.abs(t.pxValue - parsed.px) })).sort((a, b) => a.distance - b.distance);
    const best = ranked[0];
    const confidence = best.distance === 0 ? "exact" : best.distance <= 2 ? "close" : "approximate";
    return {
      input: { value, property },
      found: true,
      suggestion: {
        token: best.token.name,
        tokenValue: best.token.rawValue,
        category: best.token.category,
        confidence,
        justification: confidence === "exact" ? `Exact match: ${best.token.name} = ${best.token.rawValue} (${parsed.px}px). ${best.token.description}` : `Closest match (\u0394${best.distance}px): ${best.token.name} = ${best.token.rawValue}. ${best.token.description}`
      },
      alternatives: ranked.slice(1, 4).map((r) => ({
        token: r.token.name,
        tokenValue: r.token.rawValue,
        distance: r.distance
      })),
      notice: READ_ONLY_NOTICE3
    };
  }
  return noSuggestion(value, property, `Value "${value}" could not be parsed as a color or length. Provide a hex (#rrggbb), rgb(), or px/rem value.`);
}
function noSuggestion(value, property, reason) {
  return {
    input: { value, property },
    found: false,
    suggestion: null,
    alternatives: [],
    notice: `${reason}

${READ_ONLY_NOTICE3}`
  };
}
var READ_ONLY_NOTICE3 = `This suggestion is strictly informational per MCP_READ_ONLY_CONTRACT.md. The MCP observes and explains \u2014 it never writes files or applies changes autonomously.`.trim();

// src/tools/validateComponentCode.ts
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
    return readFileSync8(path, "utf-8");
  } catch {
    return null;
  }
}
function collectFiles(dir, exts) {
  if (!existsSync7(dir)) return [];
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
function stripBlockComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const newlineCount = (match.match(/\n/g) || []).length;
    return "\n".repeat(newlineCount);
  });
}
function analyzeScss(content, filePath, findings) {
  const contentWithoutBlockComments = stripBlockComments(content);
  const lines = contentWithoutBlockComments.split("\n");
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const codeOnly = line.replace(/\/\/.*$/, "");
    const trimmed = codeOnly.trim();
    if (!trimmed) return;
    if (DEEP_SELECTOR_PATTERN.test(codeOnly)) {
      findings.push({
        severity: "error",
        rule: "GATE_COMPOSICAO_V2.4",
        message: `':deep()' or '::v-deep' selector detected. Gate de Composi\xE7\xE3o v2.4 prohibits breaking child component encapsulation. Use child component props instead.`,
        file: filePath,
        line: lineNum
      });
    }
    for (const { pattern, label } of HARDCODED_COLOR_PATTERNS) {
      if (pattern.test(codeOnly)) {
        if (label.startsWith("rgba") && RGBA_EXCEPTION_PATTERN.test(codeOnly)) {
          findings.push({
            severity: "warning",
            rule: "TOKEN_FIRST",
            message: `rgba() with pure white/black detected (may be a documented dark-mode exception). Confirm it is registered in dss.meta.json exceptions.`,
            file: filePath,
            line: lineNum
          });
          continue;
        }
        let rawColorValue;
        const hexMatch = codeOnly.match(/#[0-9a-fA-F]{3,8}/);
        const rgbMatch = codeOnly.match(/rgba?\([^)]+\)/);
        if (hexMatch) rawColorValue = hexMatch[0];
        else if (rgbMatch) rawColorValue = rgbMatch[0];
        const propMatch = codeOnly.match(/([\w-]+)\s*:/);
        const guessedProp = propMatch ? propMatch[1].trim() : "color";
        findings.push({
          severity: "error",
          rule: "TOKEN_FIRST",
          message: `Hardcoded ${label} detected: "${trimmed}". DSS Principle #1 requires all colors to use var(--dss-*) tokens.`,
          file: filePath,
          line: lineNum,
          _hardcodedValue: rawColorValue,
          _cssProperty: guessedProp
        });
        break;
      }
    }
    let pxMatch;
    const pxRegex = new RegExp(HARDCODED_PX_PATTERN.source, "g");
    while ((pxMatch = pxRegex.exec(codeOnly)) !== null) {
      const val = parseInt(pxMatch[1], 10);
      if (!ALLOWED_PX_VALUES.has(val)) {
        const propMatch = codeOnly.match(/([\w-]+)\s*:/);
        const guessedProp = propMatch ? propMatch[1].trim() : "padding";
        findings.push({
          severity: "warning",
          rule: "TOKEN_FIRST",
          message: `Hardcoded pixel value '${val}px' detected. Consider using a var(--dss-spacing-*) or var(--dss-*) token instead.`,
          file: filePath,
          line: lineNum,
          _hardcodedValue: `${val}px`,
          _cssProperty: guessedProp
        });
        break;
      }
    }
    if (COMPONENT_TOKEN_PATTERN.test(codeOnly)) {
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
    const candidate = resolve8(dssRoot, subDir, normalized);
    if (existsSync7(candidate)) {
      componentDir = candidate;
      break;
    }
  }
  if (!componentDir) {
    return {
      componentName: normalized,
      componentDir: resolve8(dssRoot, "components/base", normalized),
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
      notice: READ_ONLY_NOTICE4
    };
  }
  const findings = [];
  const layers = REQUIRED_LAYERS.map((layer) => ({
    layer,
    required: true,
    present: existsSync7(join(componentDir, layer))
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
  if (!existsSync7(metaPath)) {
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
  await Promise.all(
    findings.filter((f) => f.rule === "TOKEN_FIRST" && f._hardcodedValue && f._cssProperty).map(async (f) => {
      try {
        const suggestion = await suggestTokenReplacement(
          f._hardcodedValue,
          f._cssProperty,
          dssRoot
        );
        if (suggestion.found && suggestion.suggestion) {
          f.suggestedToken = suggestion.suggestion.token;
          f.tokenConfidence = suggestion.suggestion.confidence;
          f.tokenAlternatives = suggestion.alternatives.map((a) => a.token);
        }
      } catch {
      }
    })
  );
  for (const f of findings) {
    delete f._hardcodedValue;
    delete f._cssProperty;
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
    notice: READ_ONLY_NOTICE4
  };
}
function normalizeComponentName2(name) {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  const pascal = clean.split(/[-_\s]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("");
  return `Dss${pascal}`;
}
var READ_ONLY_NOTICE4 = `
This validation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes and explains \u2014 it does not correct, apply fixes, or make autonomous decisions.
All remediation must be performed by a human developer with explicit DSS governance approval.
`.trim();

// src/tools/generateComponentScaffold.ts
function toPascal(name) {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  return "Dss" + clean.split(/[-_\s]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("");
}
function toKebab(pascal) {
  return pascal.replace(/([A-Z])/g, (m, l, o) => o === 0 ? l.toLowerCase() : "-" + l.toLowerCase()).replace(/^-/, "");
}
function toUpperSnake(pascal) {
  return pascal.toUpperCase();
}
function genStructureVue(pascal, kebab) {
  const typesFile = toKebab(pascal.replace(/^Dss/, "")).replace(/-/g, "");
  const composableName = "use" + pascal.replace(/^Dss/, "") + "Classes";
  const composableFile = composableName.charAt(0).toLowerCase() + composableName.slice(1);
  return `<script lang="ts">
export default { name: '${pascal}', inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ${pascal}Props, ${pascal}Emits } from '../types/${typesFile}.types'
import { ${composableName} } from '../composables/${composableFile}'

const props = withDefaults(defineProps<${pascal}Props>(), {
  // Define your defaults here
})

const emit = defineEmits<${pascal}Emits>()

const { rootClasses } = ${composableName}(props)
</script>

<template>
  <div
    v-bind="$attrs"
    :class="rootClasses"
    class="${kebab}"
  >
    <slot />
  </div>
</template>
`;
}
function genModuleScss(pascal, kebab) {
  return `// ${pascal} \u2014 SCSS Orchestrator
// Layer order MUST be: L2 \u2192 L3 \u2192 L4 (do not change)

// Layer 2 \u2014 Base composition
@use './2-composition/base' as *;

// Layer 3 \u2014 Variants
@use './3-variants/index' as *;

// Layer 4 \u2014 Output (dark mode, high-contrast, brands)
@use './4-output/index' as *;
`;
}
function genL2Base(pascal, kebab) {
  return `// Layer 2 \u2014 Base composition
// Only generic DSS tokens. No hardcoded values. No colors in SCSS.

.${kebab} {
  // Layout
  display: flex;
  flex-direction: column;

  // Spacing \u2014 replace with appropriate tokens
  // padding: var(--dss-spacing-4);
  // gap: var(--dss-spacing-2);

  // Typography
  // font-size: var(--dss-font-size-md);

  // Touch target \u2014 uncomment if this is a Compact Control (interactive)
  // position: relative;

  // &::before {
  //   // Touch target (WCAG 2.5.5) \u2014 ONLY for interactive components
  //   content: '';
  //   position: absolute;
  //   inset: 50% auto auto 50%;
  //   transform: translate(-50%, -50%);
  //   min-width: var(--dss-touch-target-md);
  //   min-height: var(--dss-touch-target-md);
  // }
}
`;
}
function genL3Variant(pascal, kebab) {
  return `// Layer 3 \u2014 Variants
// Visual variants (size, density, shape, etc.)
// No hardcoded values. No colors in SCSS.

// Example dense variant:
// .${kebab}--dense {
//   // padding: var(--dss-spacing-2);
//   // font-size: var(--dss-font-size-sm);
// }
`;
}
function genL3Index(pascal, kebab) {
  return `// Layer 3 \u2014 Variants orchestrator
@use './variant' as *;
`;
}
function genL4States(pascal, kebab) {
  return `// Layer 4 \u2014 States (dark mode, high-contrast, forced-colors)

// Dark mode
// @media (prefers-color-scheme: dark) {
//   .${kebab} {
//     // Use dark-mode tokens (--dss-surface-*, --dss-gray-*)
//   }
// }

// [data-theme="dark"] .${kebab} {
//   // Same as above for explicit dark theme
// }

// High-contrast / forced-colors (WCAG 1.4.11)
// @media (forced-colors: active) {
//   .${kebab} {
//     // Use SystemColor keywords. 1px border values are allowed exceptions.
//   }
// }
`;
}
function genL4Brands(pascal, kebab) {
  return `// Layer 4 \u2014 Brand variants (Hub, Water, Waste)

// [data-brand="hub"] .${kebab} {
//   // Override with --dss-hub-* tokens
// }

// [data-brand="water"] .${kebab} {
//   // Override with --dss-water-* tokens
// }

// [data-brand="waste"] .${kebab} {
//   // Override with --dss-waste-* tokens
// }
`;
}
function genL4Index(pascal, kebab) {
  return `// Layer 4 \u2014 Output orchestrator
@use './states' as *;
@use './brands' as *;
`;
}
function genTypes(pascal) {
  const baseName = pascal.replace(/^Dss/, "");
  return `// ${pascal} \u2014 TypeScript interfaces

export interface ${pascal}Props {
  /** Disables the component */
  disable?: boolean
  // Add your props here
}

export interface ${pascal}Emits {
  // Add your emits here
  // (e: 'update:modelValue', value: unknown): void
}

export interface ${pascal}Slots {
  /** Default slot content */
  default: () => unknown
  // Add named slots here
}
`;
}
function genComposable(pascal) {
  const baseName = pascal.replace(/^Dss/, "");
  const composableName = "use" + baseName + "Classes";
  const propsType = pascal + "Props";
  return `import { computed } from 'vue'
import type { ${propsType} } from '../types/${toKebab(baseName).replace(/-/g, "")}.types'

export function ${composableName}(props: ${propsType}) {
  const rootClasses = computed(() => ({
    '${toKebab(pascal)}--disabled': props.disable,
    // Add class conditions here
  }))

  return { rootClasses }
}
`;
}
function genMetaJson(pascal, kebab) {
  const meta = {
    component: pascal,
    cssClass: kebab,
    phase: 1,
    status: "in-progress",
    dssVersion: "2.2",
    goldenReference: "DssChip",
    goldenContext: "",
    classification: {
      type: "",
      category: "",
      interactive: false
    },
    tokens: [],
    exceptions: [],
    auditHistory: []
  };
  return JSON.stringify(meta, null, 2);
}
function genExampleVue(pascal) {
  return `<script setup lang="ts">
// ${pascal} \u2014 Interactive examples
// NOTE: .example.vue files are exempt from Token First and Gate de Composi\xE7\xE3o
// per DSS_IMPLEMENTATION_GUIDE.md policy (scaffolding context only).
</script>

<template>
  <div class="example-wrapper" style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
    <!-- Scenario 1: Default -->
    <section>
      <h3>Default</h3>
      <${pascal}></${pascal}>
    </section>

    <!-- Scenario 2: Disabled -->
    <section>
      <h3>Disabled</h3>
      <${pascal} disable></${pascal}>
    </section>

    <!-- Scenario 3: Brand Hub -->
    <section data-brand="hub">
      <h3>Brand Hub</h3>
      <${pascal}></${pascal}>
    </section>
  </div>
</template>
`;
}
function genApiMd(pascal, kebab) {
  const upper = toUpperSnake(pascal);
  return `# ${upper}_API.md \u2014 ${pascal} API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`disable\` | \`Boolean\` | \`false\` | Disables the component |

## Slots

| Slot | Description |
|------|-------------|
| \`default\` | Main content area |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \u2014 | \u2014 | No events in current scope |

## Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| \`--dss-spacing-*\` | varies | Padding and gap |

## CSS Classes

| Class | Description |
|-------|-------------|
| \`.${kebab}\` | Root element |
| \`.${kebab}--disabled\` | Disabled state |
`;
}
function genReadme(pascal, kebab) {
  return `# ${pascal}

Quick start and links for the ${pascal} DSS component.

## Installation

\`\`\`js
import { ${pascal} } from '@dss/components'
\`\`\`

## Basic Usage

\`\`\`vue
<${pascal}>Content</${pascal}>
\`\`\`

## Links

- [Full documentation](./${pascal}.md)
- [API Reference](./${toUpperSnake(pascal)}_API.md)
- [Examples](./${pascal}.example.vue)
\`\`\`
`;
}
function genDocMd(pascal) {
  return `# ${pascal} \u2014 Documentation (Template 13.1)

## 1. Vis\xE3o Geral

**O que \xE9:** \`${pascal}\` \xE9 \u2026

**Quando usar:** \u2026

**Quando N\xC3O usar:** \u2026

---

## 2. Classifica\xE7\xE3o DSS

- **Tipo:** \u2026 (Compact Control / Surface / Informativo / Decorativo / \u2026)
- **Categoria:** \u2026
- **Fase:** 1
- **Interativo:** sim/n\xE3o

---

## 3. API

### Props
*(ver ${toUpperSnake(pascal)}_API.md)*

### Slots
*(ver ${toUpperSnake(pascal)}_API.md)*

### Events
*(ver ${toUpperSnake(pascal)}_API.md)*

---

## 4. Estados

| Estado | Implementado | Observa\xE7\xE3o |
|--------|-------------|------------|
| hover | \u2705 | |
| focus | \u2705 | |
| active | \u2705 | |
| disabled | \u2705 | |
| loading | \u2014 | Fase 1: fora do escopo |

---

## 5. Tokens Utilizados

*(Preencher com tokens exatos ap\xF3s implementa\xE7\xE3o)*

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: \u2026
- **Touch target**: \u2026
- **ARIA**: \u2026
- **Navega\xE7\xE3o por teclado**: \u2026

---

## 7. Exce\xE7\xF5es Registradas

*(Preencher conforme implementa\xE7\xE3o)*

---

## 8. Changelog

| Vers\xE3o | Data | Autor | Descri\xE7\xE3o |
|--------|------|-------|-----------|
| 1.0.0 | ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)} | \u2014 | Cria\xE7\xE3o inicial |
`;
}
function genIndexJs(pascal) {
  const baseName = pascal.replace(/^Dss/, "");
  const composableName = "use" + baseName + "Classes";
  const composableFile = composableName.charAt(0).toLowerCase() + composableName.slice(1);
  const typesFile = toKebab(baseName).replace(/-/g, "") + ".types";
  return `// ${pascal} \u2014 Barrel export
export { default as ${pascal} } from './${pascal}.vue'
export { ${composableName} } from './composables/${composableFile}'
export type { ${pascal}Props, ${pascal}Emits, ${pascal}Slots } from './types/${typesFile}'
`;
}
function genEntryPointWrapper(pascal) {
  return `<script>
import ${pascal} from './1-structure/${pascal}.ts.vue'
export default ${pascal}
</script>
`;
}
async function generateComponentScaffold(componentName, type = "base") {
  const pascal = toPascal(componentName);
  const kebab = toKebab(pascal);
  const baseName = pascal.replace(/^Dss/, "");
  const composableName = "use" + baseName + "Classes";
  const composableFile = composableName.charAt(0).toLowerCase() + composableName.slice(1);
  const typesFileName = toKebab(baseName).replace(/-/g, "");
  const componentDir = `components/${type}/${pascal}`;
  const files = [
    // Entry point wrapper (root)
    {
      path: `${pascal}.vue`,
      content: genEntryPointWrapper(pascal)
    },
    // Layer 1 — Structure
    {
      path: `1-structure/${pascal}.ts.vue`,
      content: genStructureVue(pascal, kebab)
    },
    // Layer 2 — Composition
    {
      path: `2-composition/_base.scss`,
      content: genL2Base(pascal, kebab)
    },
    // Layer 3 — Variants
    {
      path: `3-variants/_variant.scss`,
      content: genL3Variant(pascal, kebab)
    },
    {
      path: `3-variants/index.scss`,
      content: genL3Index(pascal, kebab)
    },
    // Layer 4 — Output
    {
      path: `4-output/_states.scss`,
      content: genL4States(pascal, kebab)
    },
    {
      path: `4-output/_brands.scss`,
      content: genL4Brands(pascal, kebab)
    },
    {
      path: `4-output/index.scss`,
      content: genL4Index(pascal, kebab)
    },
    // Composables
    {
      path: `composables/${composableFile}.ts`,
      content: genComposable(pascal)
    },
    // Types
    {
      path: `types/${typesFileName}.types.ts`,
      content: genTypes(pascal)
    },
    // SCSS orchestrator (module)
    {
      path: `${pascal}.module.scss`,
      content: genModuleScss(pascal, kebab)
    },
    // Documentation
    {
      path: `${pascal}.md`,
      content: genDocMd(pascal)
    },
    {
      path: `${toUpperSnake(pascal)}_API.md`,
      content: genApiMd(pascal, kebab)
    },
    {
      path: `README.md`,
      content: genReadme(pascal, kebab)
    },
    // Example
    {
      path: `${pascal}.example.vue`,
      content: genExampleVue(pascal)
    },
    // Metadata
    {
      path: `dss.meta.json`,
      content: genMetaJson(pascal, kebab)
    },
    // Barrel export
    {
      path: `index.js`,
      content: genIndexJs(pascal)
    }
  ];
  const summary = `Scaffold generated for ${pascal} (${type}) \u2014 ${files.length} files. Component directory: ${componentDir}. Apply files manually and fill in tokens, props, and documentation before requesting a DSS audit.`;
  return {
    componentName: pascal,
    componentDir,
    type,
    files,
    summary,
    notice: READ_ONLY_NOTICE5
  };
}
var READ_ONLY_NOTICE5 = `This scaffold is strictly generative per MCP_READ_ONLY_CONTRACT.md. The MCP generates and explains \u2014 it never writes files or applies changes autonomously. Apply the generated files manually using your editor or CLI.`.trim();

// src/tools/generatePrePromptTemplate.ts
import { readFileSync as readFileSync9, existsSync as existsSync8 } from "fs";
import { resolve as resolve9, join as join2 } from "path";
function toPascal2(name) {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  return "Dss" + clean.split(/[-_\s]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join("");
}
function toKebab2(pascal) {
  return pascal.replace(/([A-Z])/g, (m, l, o) => o === 0 ? l.toLowerCase() : "-" + l.toLowerCase()).replace(/^-/, "");
}
function readMeta(componentDir) {
  const metaPath = join2(componentDir, "dss.meta.json");
  if (!existsSync8(metaPath)) return null;
  try {
    return JSON.parse(readFileSync9(metaPath, "utf-8"));
  } catch {
    return null;
  }
}
function buildClassification(pascal, meta) {
  const type = meta?.classification?.type || "\u27EA fill: Compact Control | Surface | Informativo | Decorativo | Layout \u27EB";
  const category = meta?.classification?.category || "\u27EA fill: Form/Selection | Feedback | Navigation | Display | \u2026 \u27EB";
  const interactive = meta?.classification?.interactive != null ? meta.classification.interactive ? "Sim" : "N\xE3o" : "\u27EA Sim | N\xE3o \u27EB";
  const phase = "1 (Fase 1 \u2014 base components)";
  const goldenRef = meta?.goldenReference || "\u27EA fill: DssChip (interativo) | DssBadge (n\xE3o interativo) \u27EB";
  const goldenCtx = meta?.goldenContext || "\u27EA fill: component most similar in behavior \u27EB";
  return [
    `- **Tipo:** ${type}`,
    `- **Categoria:** ${category}`,
    `- **Interativo:** ${interactive}`,
    `- **Fase:** ${phase}`,
    `- **Golden Reference:** ${goldenRef}`,
    `- **Golden Context:** ${goldenCtx}`
  ].join("\n");
}
function buildArchitecturalRisk(pascal, meta) {
  const kebab = toKebab2(pascal);
  return [
    `Identify and document the main architectural risk BEFORE implementation:`,
    ``,
    `- **Q-component base:** \u27EA fill: QInput | QBtn | QSelect | QCheckbox | none (native) \u27EB`,
    `- **Encapsulation challenge:** \u27EA e.g. "QMenu is teleported \u2014 popup-content-class required" \u27EB`,
    `- **Pseudo-element convention:**`,
    `  - \`::before\` \u2192 RESERVED for touch target (WCAG 2.5.5) \u2014 interactive only`,
    `  - \`::after\` \u2192 Visual effects (hover overlay, active ripple)`,
    `- **Token conflict risk:** \u27EA e.g. "no specific height token \u2014 use --dss-compact-control-height-{xs,sm,md,lg}" \u27EB`,
    `- **SCSS scoping risk:** \u27EA e.g. ":deep() PROHIBITED \u2014 use Q-component's exposed class props" \u27EB`,
    `- **Known DSS violations to avoid:**`,
    `  - \u274C Hardcoded px/rem/hex values`,
    `  - \u274C Colors applied in SCSS (use utility classes or computed props)`,
    `  - \u274C Component-specific height tokens`,
    `  - \u274C \`:deep()\` / \`::v-deep\``,
    `  - \u274C \`::before\` for visual effects`
  ].join("\n");
}
function buildMappedApi(pascal) {
  return [
    `Document the API from the Quasar official docs BEFORE implementation.`,
    `Reference: https://quasar.dev/vue-components/\u27EAcomponent-slug\u27EB#api`,
    ``,
    `### Props (required \u2014 fill from official docs)`,
    ``,
    `| Prop | Type | Default | Description |`,
    `|------|------|---------|-------------|`,
    `| \`disable\` | \`Boolean\` | \`false\` | Disables the component |`,
    `| \`dense\` | \`Boolean\` | \`false\` | Compact (dense) display mode |`,
    `| \u27EAprop\u27EB | \u27EAtype\u27EB | \u27EAdefault\u27EB | \u27EAdescription\u27EB |`,
    ``,
    `### Slots (required \u2014 fill from official docs)`,
    ``,
    `| Slot | Description |`,
    `|------|-------------|`,
    `| \`default\` | Main content |`,
    `| \u27EAslot\u27EB | \u27EAdescription\u27EB |`,
    ``,
    `### Events (required \u2014 fill from official docs)`,
    ``,
    `| Event | Payload | Description |`,
    `|-------|---------|-------------|`,
    `| \u27EAevent\u27EB | \u27EAtype\u27EB | \u27EAdescription\u27EB |`,
    ``,
    `> \u26A0\uFE0F Only declare props/events that have an actual implementation path.`,
    `> Declaring a prop without forwarding it = NC-01 (DssSelect clearAriaLabel precedent).`
  ].join("\n");
}
function buildTokens(pascal, meta) {
  const existingTokens = meta?.tokens ?? [];
  const tokenList = existingTokens.length > 0 ? existingTokens.map((t) => `- \`${t}\``).join("\n") : [
    "- `--dss-spacing-{1..16}` \u2014 padding, gap",
    "- `--dss-font-size-{xs,sm,md,lg}` \u2014 typography",
    "- `--dss-compact-control-height-{xs,sm,md,lg}` \u2014 height (Compact Controls only)",
    "- `--dss-touch-target-md` \u2014 min touch target (interactive only)",
    "- `--dss-duration-{150,200,300}` \u2014 transitions",
    "- `--dss-easing-standard` \u2014 cubic-bezier(0.4, 0, 0.2, 1)",
    "- `--dss-opacity-disabled` \u2014 0.4 (disabled state)",
    "- `--dss-border-radius-{sm,md,lg}` \u2014 border-radius",
    "\u27EA Add all tokens required for this component \u27EB"
  ].join("\n");
  return [
    `All tokens must use \`var(--dss-*)\`. No hardcoded values allowed (Token First \u2014 Principle #1).`,
    ``,
    `### Required tokens for this component:`,
    ``,
    tokenList,
    ``,
    `### Tokens NOT to use:`,
    `- \u274C \`--dss-chip-height-*\`, \`--dss-badge-size-*\` (component-specific \u2014 Principle #6)`,
    `- \u274C \`--dss-font-weight-regular\` (does NOT exist \u2014 use \`--dss-font-weight-normal\`)`,
    `- \u274C \`--dss-action-primary-rgb\` (does NOT exist \u2014 use \`--dss-surface-hover\`/\`--dss-surface-active\`)`,
    `- \u274C \`--dss-input-height-md\` (DEPRECATED \u2014 use \`--dss-touch-target-md\`)`
  ].join("\n");
}
function buildAccessibilityAndStates(pascal, meta) {
  const isInteractive = meta?.classification?.interactive !== false;
  const touchTarget = isInteractive ? `- **Touch target:** \`min-width/min-height: var(--dss-touch-target-md)\` via \`::before\` pseudo-element` : `- **Touch target:** Option B \u2014 non-interactive, touch target NOT implemented`;
  return [
    `### States to implement`,
    ``,
    `| State | Required | Notes |`,
    `|-------|----------|-------|`,
    `| hover | ${isInteractive ? "\u2705" : "\u2014"} | ${isInteractive ? "Use `::after` overlay" : "N/A (non-interactive)"} |`,
    `| focus | ${isInteractive ? "\u2705" : "\u2014"} | ${isInteractive ? "Use `dss-focus-ring` mixin" : "N/A"} |`,
    `| active | ${isInteractive ? "\u2705" : "\u2014"} | ${isInteractive ? "Use `::after` overlay" : "N/A"} |`,
    `| disabled | \u2705 | \`--dss-opacity-disabled\` (0.4) + \`pointer-events: none\` |`,
    `| loading | \u2014 | Phase 1: out of scope unless critical |`,
    `| error | \u27EA \u2705 | \u2014 \u27EB | If this is a form field |`,
    `| indeterminate | \u2014 | If applicable |`,
    ``,
    `### WCAG 2.1 AA checklist`,
    ``,
    touchTarget,
    `- **Focus visible:** \`dss-focus-ring\` mixin from \`utils/_mixins.scss\``,
    `- **Color contrast:** min 4.5:1 (text), 3:1 (large text / UI components)`,
    `- **ARIA:** \u27EA fill required ARIA roles/attributes \u27EB`,
    `- **Keyboard navigation:** \u27EA list keyboard interactions \u27EB`,
    `- **reduced-motion:** wrap transitions in \`@media (prefers-reduced-motion: no-preference)\``,
    ``,
    `### Forced-colors (WCAG 1.4.11)`,
    ``,
    `- Use \`@media (forced-colors: active)\` block in \`4-output/_states.scss\``,
    `- Use SystemColor keywords (\`ButtonText\`, \`ButtonFace\`, \`CanvasText\`, etc.)`,
    `- \`1px\` border values are acceptable exceptions (do NOT register as EX)`,
    `- \`2px\` values may also be acceptable \u2014 document in \`dss.meta.json\` if used`,
    ``,
    `### Exceptions policy`,
    ``,
    `Any non-token value that passes governance review must be registered in \`dss.meta.json\`:`,
    `\`\`\`json`,
    `"exceptions": [`,
    `  { "id": "EX-01", "rule": "TOKEN_FIRST", "value": "\u27EAvalue\u27EB", "justification": "\u27EAreason\u27EB" }`,
    `]`,
    `\`\`\``,
    ``,
    `Allowed non-token values without registration:`,
    `- \`brightness(0.85 | 0.90 | 0.92 | 0.95 | 1.10 | 1.20)\` \u2014 canonical table`,
    `- \`saturate(1.1 | 1.2)\` \u2014 canonical table`,
    `- \`border-radius: 50%\` \u2014 circular elements`,
    `- \`border-radius: 9999px\` \u2014 pill elements`,
    `- \`opacity: 1\` \u2014 forced-colors reset`
  ].join("\n");
}
function buildMarkdown(pascal, axes, meta) {
  const kebab = toKebab2(pascal);
  const goldenRef = meta?.goldenReference || "\u27EA fill \u27EB";
  const goldenCtx = meta?.goldenContext || "\u27EA fill \u27EB";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return `# Pre-Prompt DSS \u2014 ${pascal}

> Auto-generated by MCP \`generate_pre_prompt_template\` on ${today}.
> Fill all \u27EA \u2026 \u27EB placeholders BEFORE starting implementation.
> This document is mandatory per DSS Phase 2 governance.

---

## Eixo 1 \u2014 Classifica\xE7\xE3o

${axes.classification}

---

## Eixo 2 \u2014 Risco Arquitetural Principal

${axes.architecturalRisk}

---

## Eixo 3 \u2014 API Mapeada

${axes.mappedApi}

---

## Eixo 4 \u2014 Tokens Necess\xE1rios

${axes.tokens}

---

## Eixo 5 \u2014 Acessibilidade e Estados

${axes.accessibilityAndStates}

---

## Checklist de Pr\xE9-Implementa\xE7\xE3o

Antes de iniciar a implementa\xE7\xE3o, confirme:

- [ ] Leitura de \`DSS/CLAUDE.md\` conclu\xEDda
- [ ] Leitura de \`docs/reference/DSS_COMPONENT_ARCHITECTURE.md\` conclu\xEDda
- [ ] Leitura de \`docs/guides/DSS_IMPLEMENTATION_GUIDE.md\` conclu\xEDda
- [ ] Leitura de \`docs/governance/DSS_GOLDEN_COMPONENTS.md\` conclu\xEDda
- [ ] Golden Reference (\`${goldenRef}\`) lido como refer\xEAncia
- [ ] Golden Context (\`${goldenCtx}\`) lido como baseline
- [ ] API Quasar consultada em https://quasar.dev/vue-components/
- [ ] Todos os \u27EA placeholders \u27EB preenchidos neste documento
- [ ] \`dss.meta.json\` criado com \`goldenReference\` e \`goldenContext\`

---

## Prompt de Cria\xE7\xE3o (enviar ao Claude ap\xF3s preencher os eixos)

\`\`\`
Voc\xEA vai criar o componente DSS \`${pascal}\` seguindo estritamente o Design System Sansys (DSS).

**Antes de escrever qualquer c\xF3digo, leia obrigatoriamente:**
1. DSS/CLAUDE.md
2. DSS/docs/reference/DSS_COMPONENT_ARCHITECTURE.md
3. DSS/docs/guides/DSS_IMPLEMENTATION_GUIDE.md
4. O componente Golden Reference: ${goldenRef}
5. O componente Golden Context: ${goldenCtx}

**Classifica\xE7\xE3o confirmada:** \u27EA paste Eixo 1 here \u27EB

**API mapeada:** \u27EA paste Eixo 3 here \u27EB

**Tokens necess\xE1rios:** \u27EA paste Eixo 4 here \u27EB

**Riscos arquiteturais confirmados:** \u27EA paste Eixo 2 here \u27EB

**Requisitos de acessibilidade:** \u27EA paste Eixo 5 here \u27EB

Crie todos os arquivos da arquitetura de 4 camadas em \`DSS/components/base/${pascal}/\`.
\`\`\`
`;
}
async function generatePrePromptTemplate(componentName, dssRoot) {
  const pascal = toPascal2(componentName);
  let found = false;
  let meta = null;
  for (const subDir of ["components/base", "components/composed"]) {
    const candidate = resolve9(dssRoot, subDir, pascal);
    if (existsSync8(candidate)) {
      found = true;
      meta = readMeta(candidate);
      break;
    }
  }
  const axes = {
    classification: buildClassification(pascal, meta),
    architecturalRisk: buildArchitecturalRisk(pascal, meta),
    mappedApi: buildMappedApi(pascal),
    tokens: buildTokens(pascal, meta),
    accessibilityAndStates: buildAccessibilityAndStates(pascal, meta)
  };
  const markdown = buildMarkdown(pascal, axes, meta);
  return {
    componentName: pascal,
    found,
    goldenReference: meta?.goldenReference ?? null,
    goldenContext: meta?.goldenContext ?? null,
    axes,
    markdown,
    notice: READ_ONLY_NOTICE6
  };
}
var READ_ONLY_NOTICE6 = `This pre-prompt template is strictly generative per MCP_READ_ONLY_CONTRACT.md. The MCP generates and explains \u2014 it never writes files or applies changes autonomously. Copy the generated markdown to a file manually.`.trim();

// src/tools/index.ts
var __dirname2 = dirname2(fileURLToPath2(import.meta.url));
var DSS_ROOT2 = resolve10(__dirname2, "../..");
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
var SuggestTokenReplacementSchema = z.object({
  value: z.string().describe(
    'The hardcoded CSS value to find a token for (e.g. "#FF5722", "rgb(0,0,0)", "16px", "1rem").'
  ),
  property: z.string().describe(
    'The CSS property where this value is used (e.g. "color", "background-color", "padding", "border-radius"). Used to filter relevant token categories.'
  )
});
var GenerateComponentScaffoldSchema = z.object({
  componentName: z.string().describe(
    'Name of the new DSS component (e.g. "DssCard", "card", "dss-card"). Case-insensitive, Dss prefix optional.'
  ),
  type: z.enum(["base", "composed"]).optional().default("base").describe(
    '"base" for atomic/base components (components/base/). "composed" for composite components (components/composed/). Defaults to "base".'
  )
});
var GeneratePrePromptTemplateSchema = z.object({
  componentName: z.string().describe(
    'Name of the DSS component to generate a pre-prompt for (e.g. "DssBtnGroup", "DssTab"). Case-insensitive, Dss prefix optional.'
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
  },
  // ── Phase 3 Tools ──────────────────────────────────────────────────────────
  {
    name: "suggest_token_replacement",
    description: "Analyzes a hardcoded CSS value and suggests the closest DSS design token from DSS_TOKEN_REFERENCE.md. Supports hex colors (#rrggbb), rgb/rgba(), pixel values (px), and rem values. Returns the best match with confidence level (exact/close/approximate) and up to 3 alternatives. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        value: {
          type: "string",
          description: 'The hardcoded CSS value to find a token for (e.g. "#FF5722", "16px", "1rem", "rgb(0,0,0)").'
        },
        property: {
          type: "string",
          description: 'The CSS property where this value is used (e.g. "color", "padding", "border-radius"). Used to filter relevant token categories.'
        }
      },
      required: ["value", "property"]
    }
  },
  {
    name: "generate_component_scaffold",
    description: "Generates the complete 4-layer boilerplate for a new DSS component (Vue + SCSS + types + composables + documentation). Returns a JSON with all file paths and their content. The developer must apply the files manually \u2014 the MCP never writes files. Follows DSS architectural constraints strictly.",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: 'Name of the new DSS component (e.g. "DssCard", "card"). Case-insensitive, Dss prefix optional.'
        },
        type: {
          type: "string",
          enum: ["base", "composed"],
          description: '"base" for atomic/base components (components/base/). "composed" for composite components (components/composed/). Defaults to "base".'
        }
      },
      required: ["componentName"]
    }
  },
  {
    name: "generate_pre_prompt_template",
    description: "Generates a pre-prompt markdown document for a new DSS component, covering all 5 mandatory governance axes: (1) Classification, (2) Main Architectural Risk, (3) Mapped API, (4) Required Tokens, (5) Accessibility & States. If the component directory exists, auto-populates known data from dss.meta.json. Read-Only \u2014 no files are modified.",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: 'Name of the DSS component to generate a pre-prompt for (e.g. "DssBtnGroup", "DssTab"). Case-insensitive, Dss prefix optional.'
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
      // ── Phase 3 ────────────────────────────────────────────────────────────
      case "suggest_token_replacement": {
        const input = SuggestTokenReplacementSchema.parse(args);
        const result = await suggestTokenReplacement(input.value, input.property, DSS_ROOT2);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      case "generate_component_scaffold": {
        const input = GenerateComponentScaffoldSchema.parse(args ?? {});
        const result = await generateComponentScaffold(
          input.componentName,
          input.type
        );
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
        };
      }
      case "generate_pre_prompt_template": {
        const input = GeneratePrePromptTemplateSchema.parse(args);
        const result = await generatePrePromptTemplate(input.componentName, DSS_ROOT2);
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
