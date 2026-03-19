# SELO DE CONFORMIDADE DSS v2.2

## Componente: DssTextarea

**Caminho canonico**: `DSS/docs/Compliance/seals/DssTextarea/DSSTEXTAREA_SELO_v2.2.md`

> Este documento e historico e imutavel. Nao pode ser editado apos emissao.
> Alteracoes no componente invalidam o selo. Nova auditoria gera novo selo em novo arquivo.

---

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssTextarea |
| **Versao DSS** | 2.2.0 |
| **Classificacao** | Action Control interativo — campo multilinhas |
| **Fase** | 1 |
| **Golden Reference** | DssChip |
| **Golden Context** | DssInput |
| **Dependencias DSS Internas** | Nenhuma (wrapper de QInput — dependencia Quasar, nao DSS) |
| **Path** | `DSS/components/base/DssTextarea/` |
| **Total de arquivos** | 23 |
| **CSS compilado** | Zero erros de compilacao |
| **Data de emissao** | 19 Mar 2026 |
| **Auditor** | Claude (Modo Auditor DSS) |

---

## 2. Ciclo de Auditoria

| Etapa | Descricao |
|-------|-----------|
| Implementacao inicial | 23 arquivos, arquitetura 4 camadas, wrapper QInput, 4 variantes, brandabilidade hub/water/waste |
| Auditoria tecnica | 3 NCs + 4 GAPs identificados |
| Correcao NC-01 | `dss.meta.json` — `goldenReference` corrigido de `DssInput` para `DssChip` |
| Correcao NC-02 | `_brands.scss` — `!important` desnecessario removido da regra de error override |
| Correcao NC-03 | `_states.scss` — `forced-color-adjust: none` removido do bloco `@media (forced-colors: active)` |
| Correcao GAP-01 | `DssTextarea.ts.vue` — `maxHeight: undefined` e `ariaLabel: undefined` removidos do `withDefaults` |
| Correcao GAP-02 | `index.js` — reescrito para importar do wrapper canonico `DssTextarea.vue` |
| Correcao GAP-03 | `useTextareaActions.ts` — `emit` tipado via `keyof TextareaEmits` |
| Correcao GAP-04 | `DssTextarea.md` — nota de acessibilidade sobre `resize: none` adicionada na secao 7 |
| QA Final | SCSS recompilado zero erros; todas as correcoes verificadas |
| Selo | CONCEDIDO |

---

## 3. Nao-Conformidades Resolvidas

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-01 | `dss.meta.json` declarava `"goldenReference": "DssInput"`. DssInput nao e Golden Reference oficial — os oficiais sao DssChip (interativo) e DssBadge (nao interativo), conforme `DSS_GOLDEN_COMPONENTS.md`. | Alterado para `"goldenReference": "DssChip"`. `goldenContext` permanece `DssInput`. | `dss.meta.json` — campo corrigido. |
| NC-02 | `_brands.scss` linha 154 continha `color: var(--dss-error-600) !important`. A regra de erro ja possui especificidade (0-3-0) superior as regras de brand (0-2-0), tornando o `!important` desnecessario e anti-pattern DSS. | `!important` removido; comentario explicativo de especificidade adicionado. | `4-output/_brands.scss` — linha 153-155. |
| NC-03 | `_states.scss` usava `forced-color-adjust: none` em `.q-field__control` e `.q-field__native` dentro de `@media (forced-colors: active)`. Isso desabilitava o mecanismo do browser para filhos nao mapeados do QInput (icones, spinner, botao clear), comprometendo acessibilidade em Windows High Contrast Mode. Padrao ausente no Golden Context (DssInput). | Ambas as ocorrencias de `forced-color-adjust: none` removidas. System color keywords (`ButtonText`, `Field`, `FieldText`) permanecem — suficientes sem desabilitar o mecanismo. | `4-output/_states.scss` — bloco `@media (forced-colors: active)`. |

---

## 4. GAPs Resolvidos

| ID | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| GAP-01 | `withDefaults` declarava `maxHeight: undefined` e `ariaLabel: undefined` explicitamente. Para props opcionais (`prop?: string`), `undefined` ja e o default implicito do TypeScript — declaracao redundante e potencialmente confusa, mesmo padrao do GAP-02 do DssSpace. | `maxHeight: undefined` e `ariaLabel: undefined` removidos do bloco `withDefaults`. | `1-structure/DssTextarea.ts.vue` — bloco `withDefaults`. |
| GAP-02 | `index.js` importava de `./1-structure/DssTextarea.ts.vue` diretamente, ignorando o Entry Point Wrapper canonico. `CLAUDE.md` especifica que o barrel export deve exportar o wrapper. | `index.js` reescrito para `export { default as DssTextarea } from './DssTextarea.vue'` + `export *` de composables e types. | `index.js` — reescrito completo. |
| GAP-03 | `useTextareaActions.ts` tipava o parametro `emit` como `(event: string, ...args: any[]) => void`, perdendo verificacao de tipo nos nomes dos eventos em compile time. | Importado `TextareaEmits` de `../types/textarea.types`; assinatura alterada para `(event: keyof TextareaEmits, ...args: any[]) => void`. | `composables/useTextareaActions.ts` — assinatura da funcao. |
| GAP-04 | `DssTextarea.md` secao 7 (Acessibilidade) nao documentava o comportamento `resize: none` nem as alternativas governadas para usuarios que precisam visualizar conteudo extenso. | Adicionada nota explicita: `resize: none` e intencional; alternativas documentadas (`autogrow`, `maxHeight`, `rows`, scrollbar interna); conformidade WCAG declarada. | `DssTextarea.md` — secao 7, subsecao "Redimensionamento Manual". |

---

## 5. Ressalvas

Nenhuma ressalva nao-bloqueante registrada apos ciclo de correcao.

---

## 6. Conformidades

### 6.1 Tokens

| Criterio | Status |
|----------|--------|
| Zero valores hardcoded na implementacao (SCSS e Vue) | CONFORME |
| 46 tokens `--dss-*` — todos existentes no catalogo DSS | CONFORME |
| Zero tokens especificos de componente criados | CONFORME |
| `--dss-textarea-max-height` e CSS custom property de bridge (nao token DSS) — documentada como EX-01 | CONFORME |
| `dss.meta.json` lista todos os 46 tokens utilizados | CONFORME |

### 6.2 Touch Target

| Criterio | Status |
|----------|--------|
| Estrategia declarada explicitamente: Opcao A — implementado | CONFORME |
| `min-height: var(--dss-input-height-md)` aplicado em `.dss-textarea .q-field__control` | CONFORME |
| `--dss-input-height-md` = 44px — WCAG 2.1 AA SC 2.5.5 | CONFORME |
| `::before` nao utilizado — textarea area e o proprio touch target (justificado) | CONFORME |
| Dense mode: `min-height: var(--dss-input-height-sm)` = 36px (uso contextual documentado) | CONFORME |
| Decisao consistente com governanca DssInput (auditoria Jan 2026) | CONFORME |

### 6.3 Arquitetura

| Criterio | Status |
|----------|--------|
| **Gate Estrutural DSS (CLAUDE.md) — CONFORME** | CONFORME |
| 4 camadas fisicamente presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` | CONFORME |
| Entry Point Wrapper `DssTextarea.vue` na raiz — re-export puro sem `<template>`, sem `<style>`, sem logica propria | CONFORME |
| `DssTextarea.module.scss` importa L2 -> L3 -> L4 na ordem obrigatoria | CONFORME |
| `index.js` exporta do wrapper canonico + composables + types | CONFORME |
| `dss.meta.json` com `goldenReference` (DssChip) e `goldenContext` (DssInput) declarados | CONFORME |
| `inheritAttrs: false` + `v-bind="$attrs"` — correto para wrapper de QInput | CONFORME |
| `type="textarea"` fixo internamente — nao exposto como prop (arquitetura intencional documentada) | CONFORME |
| **Gate de Composicao** — sem `<textarea>` nativo substituivel; usa `QInput` (componente Quasar) | CONFORME |
| Passthrough dinamico de slots via `v-for` sobre `useSlots()` | CONFORME |
| `defineExpose<TextareaExpose>` com `focus()`, `blur()`, `nativeEl` | CONFORME |

### 6.4 Estados

| Criterio | Status |
|----------|--------|
| default (repouso por variante) | CONFORME |
| hover | CONFORME |
| focus — `.dss-textarea--focused` + `.q-field--focused` (dual hook) | CONFORME |
| active (hover + focus simultaneos) | CONFORME |
| disabled — `opacity: var(--dss-opacity-disabled)`, `pointer-events: none` | CONFORME |
| readonly — cursor default, borda reduzida | CONFORME |
| error — borda/sombra com `--dss-error-600` | CONFORME |
| loading — `pointer-events: none`, spinner via QInput | CONFORME |
| indeterminate — NAO aplicavel (campo de valor continuo, nao sele&ccedil;ao tristate) | CONFORME |

### 6.5 Acessibilidade

| Criterio | Status |
|----------|--------|
| `aria-required` via prop `required` | CONFORME |
| `aria-label` via prop `ariaLabel` repassado ao QInput | CONFORME |
| `aria-invalid`, `aria-describedby` — gerenciados internamente pelo QInput | CONFORME |
| Focus ring via `:has(:focus-visible)` — outline com `--dss-focus-ring` | CONFORME |
| `prefers-reduced-motion` — `transition: none !important` em `.q-field__control` e `.q-field__label` | CONFORME |
| `prefers-contrast: more` — `border-width` forcado, `border-color: currentColor` | CONFORME |
| `forced-colors: active` — system color keywords sem `forced-color-adjust: none` (pos NC-03) | CONFORME |
| Dark mode `[data-theme="dark"]` — fundo, borda, texto, label, hint cobertos | CONFORME |
| Brand `[data-brand]` — hub/water/waste via tokens numericos | CONFORME |
| Print — background removido, borda preservada (legibilidade de formularios) | CONFORME |
| `resize: none` — comportamento intencional documentado na secao 7 com alternativas governadas | CONFORME |

### 6.6 Documentacao

| Criterio | Status |
|----------|--------|
| `DssTextarea.md` com todas as secoes obrigatorias: Golden Component, Touch Target, variacoes, estados, acessibilidade, brandabilidade, anti-patterns, paridade com Golden Context, uso previsto | CONFORME |
| `DSSTEXTAREA_API.md` com props, slots, events, expose, composables, tokens, CSS custom properties | CONFORME |
| `README.md` com quick start, casos de uso e casos de nao-uso | CONFORME |
| `DssTextarea.example.vue` com 5 cenarios de uso (acima do minimo de 3) | CONFORME |
| 4 anti-patterns documentados (acima do minimo de 3) | CONFORME |
| Tabela de paridade com Golden Context (DssInput) com justificativas para todas as diferencas | CONFORME |
| Secao "Uso Previsto em Componentes Futuros" | CONFORME |
| Comportamentos implicitos declarados no JSDoc da Layer 1 (inheritAttrs, type fixo, QInput root, slots, maxHeight bridge, autogrow, touch target, estados NAO aplicaveis) | CONFORME |
| EX-01 documentada em `dss.meta.json`, `DssTextarea.md` e `DSSTEXTAREA_API.md` | CONFORME |
| `dss.meta.json` com todos os campos obrigatorios preenchidos | CONFORME |

---

## 7. Excecoes Documentadas

### EX-01 — `--dss-textarea-max-height` (CSS custom property de componente)

**Descricao**: A prop `maxHeight` (tipo `string`, ex.: `'300px'`, `'50vh'`) e implementada via CSS custom property `--dss-textarea-max-height`, definida como inline style no elemento raiz do QInput pelo componente quando a prop e fornecida. O SCSS consome `max-height: var(--dss-textarea-max-height, none)` no `.q-field__native`.

**Por que nao e token DSS**: A altura maxima de um textarea e contextual e dinamica — varia conforme o layout do consumidor e o conteudo esperado. Nao e um valor semantico global reutilizavel entre componentes. Criar um token `--dss-textarea-max-height` violaria o principio de tokens genericos (seriam tokens especificos de componente com valor dinamico).

**Conformidade**: Zero valores hardcoded. A tecnica de CSS custom property como bridge prop→CSS e idiomatica em Vue 3 e alinhada ao DSS.

---

## 8. Estrutura Final do Componente

```
DSS/components/base/DssTextarea/ (23 arquivos)
├── 1-structure/
│   └── DssTextarea.ts.vue       (QInput wrapper, type="textarea" fixo)
├── 2-composition/
│   └── _base.scss               (override QInput via .dss-textarea .q-field__*)
├── 3-variants/
│   ├── _outlined.scss
│   ├── _filled.scss
│   ├── _standout.scss
│   ├── _borderless.scss
│   └── index.scss
├── 4-output/
│   ├── _states.scss             (dark, contrast, forced-colors, reduced-motion, print)
│   ├── _brands.scss             (hub/water/waste)
│   └── index.scss
├── composables/
│   ├── useTextareaClasses.ts
│   ├── useTextareaState.ts
│   ├── useTextareaActions.ts    (emit tipado via keyof TextareaEmits)
│   └── index.ts
├── types/
│   └── textarea.types.ts
├── DssTextarea.module.scss
├── DssTextarea.example.vue
├── DssTextarea.md
├── DSSTEXTAREA_API.md
├── README.md
├── dss.meta.json
└── index.js                     (exporta do wrapper canonico)
```

---

## 9. Metricas

| Metrica | Valor |
|---------|-------|
| Total de arquivos | 23 |
| CSS compilado | Zero erros |
| Tokens referenciados | 46 |
| Tokens validados no catalogo | 46/46 |
| Nao-conformidades encontradas | 3 |
| Nao-conformidades resolvidas | 3/3 |
| GAPs encontrados | 4 |
| GAPs resolvidos | 4/4 |
| Excecoes documentadas | 1 (EX-01) |
| Ressalvas nao-bloqueantes | 0 |
| Anti-patterns documentados | 4 |
| Props publicas | 17 |
| Slots | 7 (label, before, prepend, append, after, error, hint) |
| Events | 4 (update:modelValue, focus, blur, clear) |
| Expose | 3 (focus, blur, nativeEl) |
| Cenarios de exemplo | 5 |
| Variantes | 4 (outlined, filled, standout, borderless) |
| Brands | 3 (hub, water, waste) |

---

## 10. Resultado

**CONFORME — SELO DSS v2.2 CONCEDIDO**

**Componente**: DssTextarea
**Data de emissao**: 19 Mar 2026
**Versao DSS**: 2.2.0

> Este selo atesta que o componente DssTextarea atende aos requisitos normativos do Design System Sansys v2.2, conforme auditoria tecnica completa com resolucao de 3 nao-conformidades e 4 GAPs, e verificacao de aderencia aos documentos vinculantes (CLAUDE.md, DSS_ARCHITECTURE.md, DSS_COMPONENT_ARCHITECTURE.md, DSS_TOKEN_REFERENCE.md).
>
> Componente Action Control interativo para campos de texto multilinhas. Implementado como wrapper do `QInput` do Quasar com `type="textarea"` fixado internamente (divergencia arquitetural intencional em relacao ao DssInput, que usa HTML nativo). O SCSS utiliza seletores descendentes `.dss-textarea .q-field__*` para sobrescrever os estilos padrao do Quasar via tokens DSS. Suporte a 4 variantes visuais, brandabilidade, 2 modos de dimensionamento (altura fixa via `rows`; autogrow via `autogrow` + `maxHeight`). A excecao EX-01 formaliza `--dss-textarea-max-height` como CSS custom property de bridge prop→CSS.
>
> Este documento e historico e imutavel. Alteracoes no componente apos esta data invalidam o selo e requerem nova auditoria com emissao de novo selo em novo arquivo.
