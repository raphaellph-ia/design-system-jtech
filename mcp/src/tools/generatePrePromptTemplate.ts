import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";

/**
 * generate_pre_prompt_template — Read-Only (Generator)
 *
 * Generates a pre-prompt markdown document for a new DSS component covering
 * all 5 mandatory axes required by Phase 2 governance criteria:
 *   1. Classification (type, category, phase, interactive)
 *   2. Main Architectural Risk
 *   3. Mapped API (props, slots, events derived from Quasar docs)
 *   4. Required Tokens
 *   5. Accessibility & States
 *
 * Reads existing component directory (if present) to auto-populate known data.
 * Never writes or modifies any file.
 */

export interface PrePromptTemplateResult {
  componentName: string;
  found: boolean;              // whether the component dir already exists
  goldenReference: string | null;
  goldenContext: string | null;
  axes: {
    classification: string;
    architecturalRisk: string;
    mappedApi: string;
    tokens: string;
    accessibilityAndStates: string;
  };
  markdown: string;            // full pre-prompt as a markdown string
  notice: string;
}

// ─── Name helpers ─────────────────────────────────────────────────────────────

function toPascal(name: string): string {
  if (/^Dss[A-Z]/.test(name)) return name;
  const clean = name.replace(/^[Dd]ss[-_]?/, "");
  return (
    "Dss" +
    clean
      .split(/[-_\s]/)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join("")
  );
}

function toKebab(pascal: string): string {
  return pascal
    .replace(/([A-Z])/g, (m, l, o) => (o === 0 ? l.toLowerCase() : "-" + l.toLowerCase()))
    .replace(/^-/, "");
}

// ─── Meta reader ──────────────────────────────────────────────────────────────

interface DssMeta {
  goldenReference?: string;
  goldenContext?: string;
  classification?: {
    type?: string;
    category?: string;
    interactive?: boolean;
  };
  tokens?: string[];
}

function readMeta(componentDir: string): DssMeta | null {
  const metaPath = join(componentDir, "dss.meta.json");
  if (!existsSync(metaPath)) return null;
  try {
    return JSON.parse(readFileSync(metaPath, "utf-8")) as DssMeta;
  } catch {
    return null;
  }
}

// ─── Section builders ─────────────────────────────────────────────────────────

function buildClassification(pascal: string, meta: DssMeta | null): string {
  const type = meta?.classification?.type || "⟪ fill: Compact Control | Surface | Informativo | Decorativo | Layout ⟫";
  const category = meta?.classification?.category || "⟪ fill: Form/Selection | Feedback | Navigation | Display | … ⟫";
  const interactive = meta?.classification?.interactive != null
    ? (meta.classification.interactive ? "Sim" : "Não")
    : "⟪ Sim | Não ⟫";
  const phase = "1 (Fase 1 — base components)";
  const goldenRef = meta?.goldenReference || "⟪ fill: DssChip (interativo) | DssBadge (não interativo) ⟫";
  const goldenCtx = meta?.goldenContext || "⟪ fill: component most similar in behavior ⟫";

  return [
    `- **Tipo:** ${type}`,
    `- **Categoria:** ${category}`,
    `- **Interativo:** ${interactive}`,
    `- **Fase:** ${phase}`,
    `- **Golden Reference:** ${goldenRef}`,
    `- **Golden Context:** ${goldenCtx}`,
  ].join("\n");
}

function buildArchitecturalRisk(pascal: string, meta: DssMeta | null): string {
  const kebab = toKebab(pascal);
  return [
    `Identify and document the main architectural risk BEFORE implementation:`,
    ``,
    `- **Q-component base:** ⟪ fill: QInput | QBtn | QSelect | QCheckbox | none (native) ⟫`,
    `- **Encapsulation challenge:** ⟪ e.g. "QMenu is teleported — popup-content-class required" ⟫`,
    `- **Pseudo-element convention:**`,
    `  - \`::before\` → RESERVED for touch target (WCAG 2.5.5) — interactive only`,
    `  - \`::after\` → Visual effects (hover overlay, active ripple)`,
    `- **Token conflict risk:** ⟪ e.g. "no specific height token — use --dss-compact-control-height-{xs,sm,md,lg}" ⟫`,
    `- **SCSS scoping risk:** ⟪ e.g. ":deep() PROHIBITED — use Q-component's exposed class props" ⟫`,
    `- **Known DSS violations to avoid:**`,
    `  - ❌ Hardcoded px/rem/hex values`,
    `  - ❌ Colors applied in SCSS (use utility classes or computed props)`,
    `  - ❌ Component-specific height tokens`,
    `  - ❌ \`:deep()\` / \`::v-deep\``,
    `  - ❌ \`::before\` for visual effects`,
  ].join("\n");
}

function buildMappedApi(pascal: string): string {
  return [
    `Document the API from the Quasar official docs BEFORE implementation.`,
    `Reference: https://quasar.dev/vue-components/⟪component-slug⟫#api`,
    ``,
    `### Props (required — fill from official docs)`,
    ``,
    `| Prop | Type | Default | Description |`,
    `|------|------|---------|-------------|`,
    `| \`disable\` | \`Boolean\` | \`false\` | Disables the component |`,
    `| \`dense\` | \`Boolean\` | \`false\` | Compact (dense) display mode |`,
    `| ⟪prop⟫ | ⟪type⟫ | ⟪default⟫ | ⟪description⟫ |`,
    ``,
    `### Slots (required — fill from official docs)`,
    ``,
    `| Slot | Description |`,
    `|------|-------------|`,
    `| \`default\` | Main content |`,
    `| ⟪slot⟫ | ⟪description⟫ |`,
    ``,
    `### Events (required — fill from official docs)`,
    ``,
    `| Event | Payload | Description |`,
    `|-------|---------|-------------|`,
    `| ⟪event⟫ | ⟪type⟫ | ⟪description⟫ |`,
    ``,
    `> ⚠️ Only declare props/events that have an actual implementation path.`,
    `> Declaring a prop without forwarding it = NC-01 (DssSelect clearAriaLabel precedent).`,
  ].join("\n");
}

function buildTokens(pascal: string, meta: DssMeta | null): string {
  const existingTokens = meta?.tokens ?? [];
  const tokenList = existingTokens.length > 0
    ? existingTokens.map((t) => `- \`${t}\``).join("\n")
    : [
        "- `--dss-spacing-{1..16}` — padding, gap",
        "- `--dss-font-size-{xs,sm,md,lg}` — typography",
        "- `--dss-compact-control-height-{xs,sm,md,lg}` — height (Compact Controls only)",
        "- `--dss-touch-target-md` — min touch target (interactive only)",
        "- `--dss-duration-{150,200,300}` — transitions",
        "- `--dss-easing-standard` — cubic-bezier(0.4, 0, 0.2, 1)",
        "- `--dss-opacity-disabled` — 0.4 (disabled state)",
        "- `--dss-border-radius-{sm,md,lg}` — border-radius",
        "⟪ Add all tokens required for this component ⟫",
      ].join("\n");

  return [
    `All tokens must use \`var(--dss-*)\`. No hardcoded values allowed (Token First — Principle #1).`,
    ``,
    `### Required tokens for this component:`,
    ``,
    tokenList,
    ``,
    `### Tokens NOT to use:`,
    `- ❌ \`--dss-chip-height-*\`, \`--dss-badge-size-*\` (component-specific — Principle #6)`,
    `- ❌ \`--dss-font-weight-regular\` (does NOT exist — use \`--dss-font-weight-normal\`)`,
    `- ❌ \`--dss-action-primary-rgb\` (does NOT exist — use \`--dss-surface-hover\`/\`--dss-surface-active\`)`,
    `- ❌ \`--dss-input-height-md\` (DEPRECATED — use \`--dss-touch-target-md\`)`,
  ].join("\n");
}

function buildAccessibilityAndStates(pascal: string, meta: DssMeta | null): string {
  const isInteractive = meta?.classification?.interactive !== false; // default to true if unknown

  const touchTarget = isInteractive
    ? `- **Touch target:** \`min-width/min-height: var(--dss-touch-target-md)\` via \`::before\` pseudo-element`
    : `- **Touch target:** Option B — non-interactive, touch target NOT implemented`;

  return [
    `### States to implement`,
    ``,
    `| State | Required | Notes |`,
    `|-------|----------|-------|`,
    `| hover | ${isInteractive ? "✅" : "—"} | ${isInteractive ? "Use `::after` overlay" : "N/A (non-interactive)"} |`,
    `| focus | ${isInteractive ? "✅" : "—"} | ${isInteractive ? "Use `dss-focus-ring` mixin" : "N/A"} |`,
    `| active | ${isInteractive ? "✅" : "—"} | ${isInteractive ? "Use `::after` overlay" : "N/A"} |`,
    `| disabled | ✅ | \`--dss-opacity-disabled\` (0.4) + \`pointer-events: none\` |`,
    `| loading | — | Phase 1: out of scope unless critical |`,
    `| error | ⟪ ✅ \| — ⟫ | If this is a form field |`,
    `| indeterminate | — | If applicable |`,
    ``,
    `### WCAG 2.1 AA checklist`,
    ``,
    touchTarget,
    `- **Focus visible:** \`dss-focus-ring\` mixin from \`utils/_mixins.scss\``,
    `- **Color contrast:** min 4.5:1 (text), 3:1 (large text / UI components)`,
    `- **ARIA:** ⟪ fill required ARIA roles/attributes ⟫`,
    `- **Keyboard navigation:** ⟪ list keyboard interactions ⟫`,
    `- **reduced-motion:** wrap transitions in \`@media (prefers-reduced-motion: no-preference)\``,
    ``,
    `### Forced-colors (WCAG 1.4.11)`,
    ``,
    `- Use \`@media (forced-colors: active)\` block in \`4-output/_states.scss\``,
    `- Use SystemColor keywords (\`ButtonText\`, \`ButtonFace\`, \`CanvasText\`, etc.)`,
    `- \`1px\` border values are acceptable exceptions (do NOT register as EX)`,
    `- \`2px\` values may also be acceptable — document in \`dss.meta.json\` if used`,
    ``,
    `### Exceptions policy`,
    ``,
    `Any non-token value that passes governance review must be registered in \`dss.meta.json\`:`,
    `\`\`\`json`,
    `"exceptions": [`,
    `  { "id": "EX-01", "rule": "TOKEN_FIRST", "value": "⟪value⟫", "justification": "⟪reason⟫" }`,
    `]`,
    `\`\`\``,
    ``,
    `Allowed non-token values without registration:`,
    `- \`brightness(0.85 | 0.90 | 0.92 | 0.95 | 1.10 | 1.20)\` — canonical table`,
    `- \`saturate(1.1 | 1.2)\` — canonical table`,
    `- \`border-radius: 50%\` — circular elements`,
    `- \`border-radius: 9999px\` — pill elements`,
    `- \`opacity: 1\` — forced-colors reset`,
  ].join("\n");
}

// ─── Full markdown assembler ──────────────────────────────────────────────────

function buildMarkdown(
  pascal: string,
  axes: PrePromptTemplateResult["axes"],
  meta: DssMeta | null
): string {
  const kebab = toKebab(pascal);
  const goldenRef = meta?.goldenReference || "⟪ fill ⟫";
  const goldenCtx = meta?.goldenContext || "⟪ fill ⟫";
  const today = new Date().toISOString().slice(0, 10);

  return `# Pre-Prompt DSS — ${pascal}

> Auto-generated by MCP \`generate_pre_prompt_template\` on ${today}.
> Fill all ⟪ … ⟫ placeholders BEFORE starting implementation.
> This document is mandatory per DSS Phase 2 governance.

---

## Eixo 1 — Classificação

${axes.classification}

---

## Eixo 2 — Risco Arquitetural Principal

${axes.architecturalRisk}

---

## Eixo 3 — API Mapeada

${axes.mappedApi}

---

## Eixo 4 — Tokens Necessários

${axes.tokens}

---

## Eixo 5 — Acessibilidade e Estados

${axes.accessibilityAndStates}

---

## Checklist de Pré-Implementação

Antes de iniciar a implementação, confirme:

- [ ] Leitura de \`DSS/CLAUDE.md\` concluída
- [ ] Leitura de \`docs/reference/DSS_COMPONENT_ARCHITECTURE.md\` concluída
- [ ] Leitura de \`docs/guides/DSS_IMPLEMENTATION_GUIDE.md\` concluída
- [ ] Leitura de \`docs/governance/DSS_GOLDEN_COMPONENTS.md\` concluída
- [ ] Golden Reference (\`${goldenRef}\`) lido como referência
- [ ] Golden Context (\`${goldenCtx}\`) lido como baseline
- [ ] API Quasar consultada em https://quasar.dev/vue-components/
- [ ] Todos os ⟪ placeholders ⟫ preenchidos neste documento
- [ ] \`dss.meta.json\` criado com \`goldenReference\` e \`goldenContext\`

---

## Prompt de Criação (enviar ao Claude após preencher os eixos)

\`\`\`
Você vai criar o componente DSS \`${pascal}\` seguindo estritamente o Design System Sansys (DSS).

**Antes de escrever qualquer código, leia obrigatoriamente:**
1. DSS/CLAUDE.md
2. DSS/docs/reference/DSS_COMPONENT_ARCHITECTURE.md
3. DSS/docs/guides/DSS_IMPLEMENTATION_GUIDE.md
4. O componente Golden Reference: ${goldenRef}
5. O componente Golden Context: ${goldenCtx}

**Classificação confirmada:** ⟪ paste Eixo 1 here ⟫

**API mapeada:** ⟪ paste Eixo 3 here ⟫

**Tokens necessários:** ⟪ paste Eixo 4 here ⟫

**Riscos arquiteturais confirmados:** ⟪ paste Eixo 2 here ⟫

**Requisitos de acessibilidade:** ⟪ paste Eixo 5 here ⟫

Crie todos os arquivos da arquitetura de 4 camadas em \`DSS/components/base/${pascal}/\`.
\`\`\`
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generatePrePromptTemplate(
  componentName: string,
  dssRoot: string
): Promise<PrePromptTemplateResult> {
  const pascal = toPascal(componentName);

  // Check if component dir exists and read meta
  let found = false;
  let meta: DssMeta | null = null;
  for (const subDir of ["components/base", "components/composed"]) {
    const candidate = resolve(dssRoot, subDir, pascal);
    if (existsSync(candidate)) {
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
    accessibilityAndStates: buildAccessibilityAndStates(pascal, meta),
  };

  const markdown = buildMarkdown(pascal, axes, meta);

  return {
    componentName: pascal,
    found,
    goldenReference: meta?.goldenReference ?? null,
    goldenContext: meta?.goldenContext ?? null,
    axes,
    markdown,
    notice: READ_ONLY_NOTICE,
  };
}

const READ_ONLY_NOTICE = `This pre-prompt template is strictly generative per MCP_READ_ONLY_CONTRACT.md. The MCP generates and explains — it never writes files or applies changes autonomously. Copy the generated markdown to a file manually.`.trim();
