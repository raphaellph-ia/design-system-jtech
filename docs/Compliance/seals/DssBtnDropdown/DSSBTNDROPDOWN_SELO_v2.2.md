# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssBtnDropdown |
| **Versao do Componente** | 2.2.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Action Group Composto (Botao com Dropdown Integrado) — Fase 2 |
| **Status Pre-Selo** | Pre-auditoria |
| **Golden Component de Referencia** | DssChip (Compact Control interativo, Selo DSS v2.2) |
| **Golden Context** | DssCard (Container composto Fase 2, Selo DSS v2.2) + DssBtnGroup (Action Group Fase 2, Selo DSS v2.2 — precedente direto) |
| **Dependencias DSS Internas** | Nenhuma (DssButton e DssIcon nao sao importados diretamente — trigger e renderizado internamente pelo QBtnDropdown; icones via prop/slot do Quasar) |
| **Data de Emissao** | 27 de Marco de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS v2.5) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial (Ciclo 1) | 27 Marco 2026 | 4 NCs identificadas (2 bloqueantes, 2 nao-bloqueantes), 3 GAPs |
| Correcao Ciclo 1 | 27 Marco 2026 | 4 NCs corrigidas, 3 GAPs implementados |
| Re-Auditoria (Ciclo 2) | 27 Marco 2026 | NC = 0, 1 GAP residual nao-bloqueante (EXC-05 sem comentario inline no SCSS) |
| Correcao GAP Residual | 27 Marco 2026 | Comentario `/* EXC-05 */` adicionado em `_base.scss:99` |
| Auditoria Final (Ciclo 2) | 27 Marco 2026 | NC = 0, GAPs = 0 pendentes, Aprovado |

---

## Nao-Conformidades

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-C1-01 | `min-width: 160px` em `_base.scss` — valor hardcoded sem token DSS e sem excecao formalmente documentada | Formalizado como EXC-05 em `dss.meta.json`, `DssBtnDropdown.md` secao 12 e comentario inline `/* EXC-05 */` no SCSS | `dss.meta.json` exceptions[4].id = "EXC-05"; `2-composition/_base.scss:99` — `min-width: 160px; /* EXC-05 */` |
| NC-C1-02 | Reactivity bug: `useBtnDropdownVariantProps(props.variant)` passava valor estatico ao composable; computed interno sem dependencia reativa — variant dinamica ignorada em runtime | `const variantProps = computed(() => useBtnDropdownVariantProps(props.variant).value)` — computed externo rastreia `props.variant` reativamente | `1-structure/DssBtnDropdown.ts.vue:167` — computed externo com import `{ computed }` de 'vue' |
| NC-C1-03 | Evento `click` documentado como "Apenas em modo split" mas codigo sempre emite o evento (binding incondicional no template) — contrato de API incorreto | Documentacao corrigida para "Sempre emitido; semanticamente relevante em modo split" | `DssBtnDropdown.md` secao 4.4; `DSSBTNDROPDOWN_API.md` tabela de eventos |
| NC-C1-04 | `hasReservations: false` no `dss.meta.json` contradizendo 3 ressalvas formalmente documentadas na secao 16.2 do `.md` — metadado inconsistente | `"hasReservations": true` | `dss.meta.json:13` |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | Tokens de brand usam referencia numerica (`--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`) | Tokens semanticos de brand (`--dss-{brand}-primary`) nao existem no catalogo de tokens DSS v2.2. Uso numerico e tecnicamente correto com a infraestrutura atual. Padrao identico ao DssCard (R-01) e DssBtnGroup (R-01). | Migrar quando tokens semanticos de brand forem oficializados. |
| R-02 | Mixin `dss-transition` disponivel mas nao utilizado no container | DssBtnDropdown delega animacoes de abertura/fechamento ao QBtnDropdown. O container wrapper nao possui transicoes proprias que justifiquem o mixin. | Avaliar aplicabilidade se animacoes de container forem adicionadas. |
| R-03 | Sem testes unitarios | Nao impacta conformidade DSS. Infraestrutura de testes pendente de configuracao no projeto. | Implementar quando test framework for configurado. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes ou invalidos
- Zero tokens especificos de componente (`--dss-btn-dropdown-*` = 0 resultados)
- Tokens de superficie: `--dss-surface-default`
- Tokens de elevacao: `--dss-elevation-2`
- Tokens de shape: `--dss-radius-md`
- Tokens de borda: `--dss-border-width-thin`, `--dss-border-width-thick`, `--dss-border-width-md`
- Tokens de cor: `--dss-gray-200`, `--dss-gray-300`
- Tokens de brand (claro): `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`
- Tokens de brand (dark): `--dss-hub-400`, `--dss-water-400`, `--dss-waste-500`
- 5 excecoes de valor documentadas (EXC-01 a EXC-05) com ID, valor, arquivo e racional — todas coerentes entre `dss.meta.json`, `.md` e comentarios inline no SCSS
- 1 excecao de Gate v2.4 documentada (`compositionGateV24`) com arquivos afetados, seletor e justificativa de escopo
- Zero valores hardcoded nao-documentados em `.scss` e `.vue`

### Touch Target — CONFORME (Nao Aplicavel — Opcao B)

- DssBtnDropdown nao e Compact Control standalone
- Touch target via `::before` nao se aplica ao container wrapper
- Decisao de delegacao (Opcao B): touch target e responsabilidade do QBtnDropdown interno, que ja implementa area clicavel adequada
- `::before` nao utilizado no container (nenhuma violacao da convencao de pseudo-elementos DSS)
- `::after` nao utilizado no container (nenhuma violacao da convencao de pseudo-elementos DSS)
- `-webkit-tap-highlight-color: transparent` implementado no container base
- Decisao documentada em `dss.meta.json:64` e `DssBtnDropdown.md` secao 8.2

### Arquitetura — CONFORME

- **Gate Estrutural DSS (CLAUDE.md) — CONFORME**: estrutura obrigatoria completa verificada:
  - Layer 1 (Structure): `1-structure/DssBtnDropdown.ts.vue` — Vue 3 + TypeScript + Composition API; `defineOptions({ name, inheritAttrs: false })`; `withDefaults(defineProps<BtnDropdownProps>())`
  - Layer 2 (Composition): `2-composition/_base.scss` — container wrapper, painel teleportado, modo split (EXC-01, EXC-05), variante square (EXC-02)
  - Layer 3 (Variants): `3-variants/_elevated.scss` (placeholder intencional documentado), `_flat.scss`, `_outline.scss`, `_unelevated.scss`, `index.scss` — 4 variantes ativas + 1 placeholder
  - Layer 4 (Output): `4-output/_states.scss` (dark mode EXC-03, prefers-contrast, forced-colors EXC-04, print) + `4-output/_brands.scss` (3 brands + dark) + `4-output/index.scss`
  - Orchestrador: `DssBtnDropdown.module.scss` — 3 `@use` imports (composition, variants, output) na ordem obrigatoria L2 → L3 → L4
  - **Entry Point Wrapper: `DssBtnDropdown.vue` — re-export puro da Layer 1, sem `<template>`, sem `<style>`, sem logica propria** — CONFORME
  - `index.js` — importa via wrapper canonico `DssBtnDropdown.vue`; exporta componente, default, 6 types, 2 composables
- Abordagem arquitetural WRAP (nao rebuild): QBtnDropdown fornece posicionamento, ARIA, animacoes e keyboard navigation nativos — precedente DssSelect (Maio 2026)
- `popup-content-class="dss-btn-dropdown__panel"` — mecanismo canonico para estilizar painel teleportado; sem `<style scoped>` (precedente DssBtnGroup NC-C1-01)
- Composable `useBtnDropdownClasses`: computed puro, props object passado reativamente — CONFORME
- Composable `useBtnDropdownVariantProps`: envolto em computed externo no componente para reatividade — CONFORME (apos NC-C1-02)
- Tipos: `types/btn-dropdown.types.ts` — `BtnDropdownProps`, `BtnDropdownEmits`, `BtnDropdownSlots`, `BtnDropdownVariant`, `BtnDropdownSize`, `BtnDropdownBrand`
- Gate de Composicao v2.4 — CONFORME: Zero HTML nativo substituivel; sem `:deep()` nem `::v-deep`; seletores em elementos Quasar internos (`.q-btn-dropdown__arrow-container`) documentados como excecao formal em `gateExceptions.compositionGateV24`
- Gate de Responsabilidade v2.4 — CONFORME: container nao captura `:hover`, `:focus`, `:active` de filhos; sem logica de negocio de produto
- Nenhuma camada omitida

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| default | `_base.scss:25-33` | `display: inline-flex` | Container base com layout correto |
| hover (trigger) | Delegado ao QBtnDropdown | — | Estado interativo pertence ao trigger interno |
| focus (trigger) | Delegado ao QBtnDropdown | — | Focus ring responsabilidade do QBtnDropdown |
| active (trigger) | Delegado ao QBtnDropdown | — | Estado interativo pertence ao trigger interno |
| disabled | Delegado via `disable` prop | `aria-disabled="true"` | `props.disable` repassado ao QBtnDropdown |
| loading | Delegado via `loading` prop | — | `props.loading` repassado ao QBtnDropdown |
| error | — | — | Nao aplicavel: botao de acao; erro nao e estado de dropdown |
| indeterminate | — | — | Nao aplicavel: grupo de acoes nao possui estado intermediario |
| checked | — | — | Nao aplicavel: botoes de acao nao possuem estado selecionado |
| dark | `_states.scss:12-33` | `[data-theme="dark"]` | Separadores e painel em dark mode — EXC-03 documentada |
| forced-colors | `_states.scss:55-67` | — | `ButtonBorder`, `Canvas`, `ButtonText` — EXC-04 documentada |
| high-contrast | `_states.scss:40-43` | — | `border: var(--dss-border-width-md) solid currentColor` no painel |
| print | `_states.scss:72-76` | — | `.dss-btn-dropdown__panel { display: none }` |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 1.4.3 Contraste Minimo (AA) | CONFORME | Componente nao define cores proprias; herda do contexto Quasar; contraste automatico do QBtnDropdown |
| 2.1.1 Teclado (A) | CONFORME | Enter/Space abre/fecha; Escape fecha; Arrow keys navegam no painel — totalmente gerenciado pelo QBtnDropdown |
| 2.4.7 Foco Visivel (AA) | CONFORME | Focus ring responsabilidade do QBtnDropdown interno |
| 4.1.2 Nome, Funcao, Valor (A) | CONFORME | `role="button"` automatico; `aria-haspopup="true"` automatico; `aria-expanded` gerenciado pelo Quasar; `aria-label` via prop `ariaLabel`; `aria-disabled` quando `disable=true` |
| `prefers-contrast: more` | CONFORME | Borda visivel no painel (`_states.scss:40-43`) |
| `forced-colors: active` | CONFORME | System color keywords: `ButtonBorder`, `Canvas`, `ButtonText` — EXC-04 documentada |
| Dark mode | CONFORME | `[data-theme="dark"]` com ajuste de separadores e painel — EXC-03 documentada |
| Print | CONFORME | Painel ocultado em `@media print` |
| Touch target | CONFORME (Opcao B) | Delegado ao QBtnDropdown conforme classificacao de wrapper composto |
| `inheritAttrs: false` + `v-bind="$attrs"` | CONFORME | Atributos HTML forwarded para `<div>` container |
| `-webkit-tap-highlight-color` | CONFORME | `transparent` no container base |

### Documentacao — CONFORME

- `DssBtnDropdown.md` — Documentacao normativa completa (16 secoes; secao 9.1 adicionada para comportamento elevated+brand; secao 13 com status dos Gates v2.4; secao 16.2 com 3 ressalvas declaradas)
- `README.md` — Quick start com casos de uso, quando usar/nao usar, exemplos de variant, split, brand e tokens
- `DSSBTNDROPDOWN_API.md` — API Reference completa (props, slots, eventos com condicoes corretas, tokens, classes CSS geradas, acessibilidade, excecoes)
- `DssBtnDropdown.example.vue` — 6 cenarios (basico, variantes visuais, modo split, icones e slot label, brandabilidade, estados disabled/loading)
- `dss.meta.json` — Metadados de governanca (5 excecoes de valor EXC-01 a EXC-05, 1 excecao de Gate `compositionGateV24`, tokens categorizados, propsBlocked com justificativas, statesNotApplicable)
- `docs/governance/pre-prompts/pre_prompt_dss_btn_dropdown.md` — Artefato de governanca com 5 eixos obrigatorios cobertos (classificacao e contexto, grande risco arquitetural com 4 subsecoes incluindo risco de reatividade, mapeamento de API, governanca de tokens com EXC-05, acessibilidade e estados)
- API documentada = API implementada (22 props, 6 props bloqueadas com justificativas, 2 slots, 5 eventos com condicoes corretas)
- 5 excecoes de valor com rastreabilidade completa (codigo, dss.meta.json, .md)
- Tokens listados com nomes exatos em README, API Reference e dss.meta.json
- Nenhuma linguagem absoluta proibida encontrada
- Composition API + TypeScript em todos os arquivos

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssChip (referencia global), DssCard (contexto Fase 2), DssBtnGroup (precedente direto) | DssChip como Golden Reference de categoria; DssCard como Golden Context Fase 2 mais proximo semanticamente; DssBtnGroup como precedente canonico de Action Group |
| Abordagem arquitetural | WRAP QBtnDropdown (nao rebuild) | QBtnDropdown fornece posicionamento, ARIA completo, animacoes e keyboard navigation; rebuild duplicaria esforco sem ganho; precedente DssSelect (Mar 2026) |
| Painel teleportado | `popup-content-class="dss-btn-dropdown__panel"` | QMenu teleporta para o body; seletores descendentes nao alcancam o painel; popup-content-class e o mecanismo canonico; precedente DssSelect |
| Estilo sem scoped | `<style lang="scss">` sem scoped | Painel teleportado nao recebe data-v-xxx; seletores de painel seriam ignorados com scoped; precedente DssBtnGroup NC-C1-01 |
| Touch target | Opcao B — delegado | Wrapper composto nao e Compact Control; QBtnDropdown ja implementa touch target adequado |
| Tokens de brand | Numericos (`--dss-hub-600`, etc.) | Tokens semanticos de brand inexistentes no catalogo DSS v2.2; padrao identico ao DssCard e DssBtnGroup |
| Excecao EXC-05 | `min-width: 160px` no painel | Valor de UX contextual amplamente aceito para paineis flutuantes; sem token generico de sizing no catalogo DSS v2.2; decisao arquitetural aprovada (Chat Estrategico, Mar 2026) |
| Excecao Gate Composicao v2.4 | Seletores `.q-btn-dropdown__arrow-container` | Elemento DOM interno do QBtnDropdown (Quasar), nao subcomponente DSS; Gate aplica-se exclusivamente a filhos DSS; precedente DssBtnGroup (compositionGateV24) |
| Estados nao aplicaveis | hover, focus, active, error, indeterminate, checked | Wrapper composto; estados interativos pertencem ao QBtnDropdown interno; error/indeterminate/checked nao sao estados de botoes de acao |
| Reatividade de variant | `computed(() => useBtnDropdownVariantProps(props.variant).value)` | Passagem de valor ao composable sem reatividade — corrigido com computed externo que rastreia `props.variant` como dependencia |

---

## Veredito Final

| Criterio | Status |
|----------|--------|
| Tokens | CONFORME |
| Touch Target | CONFORME |
| Arquitetura | CONFORME |
| Estados | CONFORME |
| Acessibilidade | CONFORME |
| Documentacao | CONFORME |

---

## CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente:** DssBtnDropdown
**Versao:** 2.2.0
**Data de Emissao:** 27 de Marco de 2026
**Classificacao:** Action Group Composto (Botao com Dropdown Integrado) — Fase 2

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssBtnDropdown invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/Compliance/seals/DssBtnDropdown/DSSBTNDROPDOWN_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssBtnDropdown.ts.vue` | Layer 1 | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_elevated.scss` | Layer 3 | CONFORME (placeholder intencional documentado) |
| `3-variants/_flat.scss` | Layer 3 | CONFORME |
| `3-variants/_outline.scss` | Layer 3 | CONFORME |
| `3-variants/_unelevated.scss` | Layer 3 | CONFORME |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssBtnDropdown.module.scss` | Orchestrador | CONFORME |
| `DssBtnDropdown.vue` | Entry Point Wrapper | CONFORME |
| `composables/useBtnDropdownClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel Composable | CONFORME |
| `types/btn-dropdown.types.ts` | Tipos | CONFORME |
| `DssBtnDropdown.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSSBTNDROPDOWN_API.md` | Doc API | CONFORME |
| `DssBtnDropdown.example.vue` | Showcase | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
| `docs/governance/pre-prompts/pre_prompt_dss_btn_dropdown.md` | Governanca | CONFORME |
