/**
 * generate_component_scaffold — Read-Only (Generator)
 *
 * Generates the boilerplate content for all files in a new DSS component's
 * 4-layer architecture. Returns a structured JSON with file paths and content.
 * Never writes or modifies any file — the developer must apply the scaffold manually.
 */

export interface ScaffoldFile {
  path: string;        // relative to component root (e.g. "1-structure/DssCard.ts.vue")
  content: string;     // file content to be created
}

export interface ComponentScaffoldResult {
  componentName: string;   // e.g. "DssCard"
  componentDir: string;    // e.g. "components/base/DssCard"
  type: "base" | "composed";
  files: ScaffoldFile[];
  summary: string;
  notice: string;
}

// ─── Name helpers ─────────────────────────────────────────────────────────────

function toPascal(name: string): string {
  // Accept "card", "dss-card", "DssCard", "DssCard"
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
  // "DssCard" → "dss-card"
  return pascal
    .replace(/([A-Z])/g, (m, l, o) => (o === 0 ? l.toLowerCase() : "-" + l.toLowerCase()))
    .replace(/^-/, "");
}

function toUpperSnake(pascal: string): string {
  // "DssCard" → "DSSCARD"
  return pascal.toUpperCase();
}

// ─── Template generators ──────────────────────────────────────────────────────

function genStructureVue(pascal: string, kebab: string): string {
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

function genModuleScss(pascal: string, kebab: string): string {
  return `// ${pascal} — SCSS Orchestrator
// Layer order MUST be: L2 → L3 → L4 (do not change)

// Layer 2 — Base composition
@use './2-composition/base' as *;

// Layer 3 — Variants
@use './3-variants/index' as *;

// Layer 4 — Output (dark mode, high-contrast, brands)
@use './4-output/index' as *;
`;
}

function genL2Base(pascal: string, kebab: string): string {
  return `// Layer 2 — Base composition
// Only generic DSS tokens. No hardcoded values. No colors in SCSS.

.${kebab} {
  // Layout
  display: flex;
  flex-direction: column;

  // Spacing — replace with appropriate tokens
  // padding: var(--dss-spacing-4);
  // gap: var(--dss-spacing-2);

  // Typography
  // font-size: var(--dss-font-size-md);

  // Touch target — uncomment if this is a Compact Control (interactive)
  // position: relative;

  // &::before {
  //   // Touch target (WCAG 2.5.5) — ONLY for interactive components
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

function genL3Variant(pascal: string, kebab: string): string {
  return `// Layer 3 — Variants
// Visual variants (size, density, shape, etc.)
// No hardcoded values. No colors in SCSS.

// Example dense variant:
// .${kebab}--dense {
//   // padding: var(--dss-spacing-2);
//   // font-size: var(--dss-font-size-sm);
// }
`;
}

function genL3Index(pascal: string, kebab: string): string {
  return `// Layer 3 — Variants orchestrator
@use './variant' as *;
`;
}

function genL4States(pascal: string, kebab: string): string {
  return `// Layer 4 — States (dark mode, high-contrast, forced-colors)

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

function genL4Brands(pascal: string, kebab: string): string {
  return `// Layer 4 — Brand variants (Hub, Water, Waste)

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

function genL4Index(pascal: string, kebab: string): string {
  return `// Layer 4 — Output orchestrator
@use './states' as *;
@use './brands' as *;
`;
}

function genTypes(pascal: string): string {
  const baseName = pascal.replace(/^Dss/, "");
  return `// ${pascal} — TypeScript interfaces

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

function genComposable(pascal: string): string {
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

function genMetaJson(pascal: string, kebab: string): string {
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
      interactive: false,
    },
    tokens: [],
    exceptions: [],
    auditHistory: [],
  };
  return JSON.stringify(meta, null, 2);
}

function genExampleVue(pascal: string): string {
  return `<script setup lang="ts">
// ${pascal} — Interactive examples
// NOTE: .example.vue files are exempt from Token First and Gate de Composição
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

function genApiMd(pascal: string, kebab: string): string {
  const upper = toUpperSnake(pascal);
  return `# ${upper}_API.md — ${pascal} API Reference

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
| — | — | No events in current scope |

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

function genReadme(pascal: string, kebab: string): string {
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

function genDocMd(pascal: string): string {
  return `# ${pascal} — Documentation (Template 13.1)

## 1. Visão Geral

**O que é:** \`${pascal}\` é …

**Quando usar:** …

**Quando NÃO usar:** …

---

## 2. Classificação DSS

- **Tipo:** … (Compact Control / Surface / Informativo / Decorativo / …)
- **Categoria:** …
- **Fase:** 1
- **Interativo:** sim/não

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

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover | ✅ | |
| focus | ✅ | |
| active | ✅ | |
| disabled | ✅ | |
| loading | — | Fase 1: fora do escopo |

---

## 5. Tokens Utilizados

*(Preencher com tokens exatos após implementação)*

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: …
- **Touch target**: …
- **ARIA**: …
- **Navegação por teclado**: …

---

## 7. Exceções Registradas

*(Preencher conforme implementação)*

---

## 8. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | ${new Date().toISOString().slice(0, 10)} | — | Criação inicial |
`;
}

function genIndexJs(pascal: string): string {
  const baseName = pascal.replace(/^Dss/, "");
  const composableName = "use" + baseName + "Classes";
  const composableFile = composableName.charAt(0).toLowerCase() + composableName.slice(1);
  const typesFile = toKebab(baseName).replace(/-/g, "") + ".types";

  return `// ${pascal} — Barrel export
export { default as ${pascal} } from './${pascal}.vue'
export { ${composableName} } from './composables/${composableFile}'
export type { ${pascal}Props, ${pascal}Emits, ${pascal}Slots } from './types/${typesFile}'
`;
}

function genEntryPointWrapper(pascal: string): string {
  return `<script>
import ${pascal} from './1-structure/${pascal}.ts.vue'
export default ${pascal}
</script>
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generateComponentScaffold(
  componentName: string,
  type: "base" | "composed" = "base"
): Promise<ComponentScaffoldResult> {
  const pascal = toPascal(componentName);
  const kebab = toKebab(pascal);
  const baseName = pascal.replace(/^Dss/, "");
  const composableName = "use" + baseName + "Classes";
  const composableFile = composableName.charAt(0).toLowerCase() + composableName.slice(1);
  const typesFileName = toKebab(baseName).replace(/-/g, "");

  const componentDir = `components/${type}/${pascal}`;

  const files: ScaffoldFile[] = [
    // Entry point wrapper (root)
    {
      path: `${pascal}.vue`,
      content: genEntryPointWrapper(pascal),
    },
    // Layer 1 — Structure
    {
      path: `1-structure/${pascal}.ts.vue`,
      content: genStructureVue(pascal, kebab),
    },
    // Layer 2 — Composition
    {
      path: `2-composition/_base.scss`,
      content: genL2Base(pascal, kebab),
    },
    // Layer 3 — Variants
    {
      path: `3-variants/_variant.scss`,
      content: genL3Variant(pascal, kebab),
    },
    {
      path: `3-variants/index.scss`,
      content: genL3Index(pascal, kebab),
    },
    // Layer 4 — Output
    {
      path: `4-output/_states.scss`,
      content: genL4States(pascal, kebab),
    },
    {
      path: `4-output/_brands.scss`,
      content: genL4Brands(pascal, kebab),
    },
    {
      path: `4-output/index.scss`,
      content: genL4Index(pascal, kebab),
    },
    // Composables
    {
      path: `composables/${composableFile}.ts`,
      content: genComposable(pascal),
    },
    // Types
    {
      path: `types/${typesFileName}.types.ts`,
      content: genTypes(pascal),
    },
    // SCSS orchestrator (module)
    {
      path: `${pascal}.module.scss`,
      content: genModuleScss(pascal, kebab),
    },
    // Documentation
    {
      path: `${pascal}.md`,
      content: genDocMd(pascal),
    },
    {
      path: `${toUpperSnake(pascal)}_API.md`,
      content: genApiMd(pascal, kebab),
    },
    {
      path: `README.md`,
      content: genReadme(pascal, kebab),
    },
    // Example
    {
      path: `${pascal}.example.vue`,
      content: genExampleVue(pascal),
    },
    // Metadata
    {
      path: `dss.meta.json`,
      content: genMetaJson(pascal, kebab),
    },
    // Barrel export
    {
      path: `index.js`,
      content: genIndexJs(pascal),
    },
  ];

  const summary = `Scaffold generated for ${pascal} (${type}) — ${files.length} files. Component directory: ${componentDir}. Apply files manually and fill in tokens, props, and documentation before requesting a DSS audit.`;

  return {
    componentName: pascal,
    componentDir,
    type,
    files,
    summary,
    notice: READ_ONLY_NOTICE,
  };
}

const READ_ONLY_NOTICE = `This scaffold is strictly generative per MCP_READ_ONLY_CONTRACT.md. The MCP generates and explains — it never writes files or applies changes autonomously. Apply the generated files manually using your editor or CLI.`.trim();
