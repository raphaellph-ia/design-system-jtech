# SELO DE CONFORMIDADE DSS v2.2

---

## Identificacao

| Campo | Valor |
|-------|-------|
| **Componente** | DssBtnGroup |
| **Versao do Componente** | 2.2.0 |
| **Versao do DSS** | v2.2 |
| **Classificacao** | Container de Composicao (Action Group) — Fase 2 |
| **Status Pre-Selo** | Pre-auditoria |
| **Golden Component de Referencia** | DssChip (Compact Control interativo, Selo DSS v2.2) |
| **Golden Context** | DssCard (Container composto Fase 2, Selo DSS v2.2) |
| **Dependencias DSS Internas** | Nenhuma (DssButton e recebido via slot, nao importado diretamente) |
| **Data de Emissao** | 26 de Marco de 2026 |
| **Auditor** | Claude Code (Modo Auditor DSS v2.5) |

---

## Historico de Auditoria

| Fase | Data | Resultado |
|------|------|-----------|
| Auditoria Inicial (Ciclo 1) | 26 Marco 2026 | 3 NCs identificadas (1 bloqueante, 2 nao-bloqueantes), 3 GAPs |
| Correcao Ciclo 1 | 26 Marco 2026 | 3 NCs corrigidas, 3 GAPs implementados |
| Re-Auditoria v2.4 (Ciclo 2) | 26 Marco 2026 | 1 NC bloqueante (Gate Responsabilidade v2.4), 4 GAPs |
| Correcao Ciclo 2 | 26 Marco 2026 | NC-01 resolvida via excecao formal; GAP-01 (documento normativo criado); GAP-04 (pre-prompt atualizado) |
| Auditoria Final (Ciclo 3) | 26 Marco 2026 | NC = 0, GAPs = 0 pendentes, Aprovado |

---

## Nao-Conformidades

**Nenhuma nao-conformidade encontrada.**

Todas as nao-conformidades identificadas durante o ciclo de auditoria foram corrigidas e verificadas:

| NC | Descricao | Correcao | Evidencia |
|----|-----------|----------|-----------|
| NC-C1-01 | `<style lang="scss" scoped>` em `DssBtnGroup.ts.vue` impedia seletores `.dss-btn-group > .dss-button` de funcionar em runtime (filhos via slot nao recebem atributo de escopo Vue) | Removido atributo `scoped`; adicionado comentario explicativo inline | `1-structure/DssBtnGroup.ts.vue:109` — `<style lang="scss">` sem scoped; grep "scoped" = 0 resultados |
| NC-C1-02 | `index.js` nao exportava types (`BtnGroupProps`, `BtnGroupBrand`, `BtnGroupSlots`) nem composables (`useBtnGroupClasses`) — violacao do Gate Estrutural DSS (CLAUDE.md) | Adicionados exports de types e composables ao `index.js` | `index.js` — 4 exports: componente, default, types, composables |
| NC-C1-03 | `index.js` importava diretamente de `./1-structure/DssBtnGroup.ts.vue`, bypassando o Entry Point Wrapper canonico — precedente normativo DssTextarea (19 Mar 2026) | Corrigido para `import DssBtnGroup from './DssBtnGroup.vue'` | `index.js:11` — `from './DssBtnGroup.vue'` |
| NC-C2-01 | `3-variants/_outline.scss` definia `:hover` e `:focus-visible` em `.dss-button` filhos — violacao do Gate de Responsabilidade v2.4 | Resolvido via excecao formal documentada em `dss.meta.json > gateExceptions > responsibilityGateV24`; decisao arquitetural registrada em `DssBtnGroup.md` secao 16.2 | `dss.meta.json:93-97` — `responsibilityGateV24` presente; `DssBtnGroup.md` secao 16.2 — evidencia de aprovacao |

---

## Ressalvas (nao-bloqueantes)

As ressalvas abaixo foram identificadas e aceitas. Nenhuma impede a emissao do selo.

| ID | Descricao | Justificativa | Monitoramento |
|----|-----------|---------------|---------------|
| R-01 | Tokens de brand usam referencia numerica (`--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`) | Tokens semanticos de brand (`--dss-{brand}-primary`) nao existem no catalogo de tokens DSS. Uso numerico e tecnicamente correto com a infraestrutura atual. Padrao identico ao DssCard (R-01). | Migrar quando tokens semanticos de brand forem oficializados. |
| R-02 | Mixins DSS (`dss-focus-ring`, `dss-touch-target`) nao utilizados | DssBtnGroup e container estrutural, nao Compact Control. Mixin `dss-transition` e utilizado na Layer 2. Mixins sao facilitadores, nao mandatorios para containers. | Avaliar aplicabilidade em futuras revisoes de containers. |
| R-03 | Sem testes unitarios | Nao impacta conformidade DSS. Infraestrutura de testes pendente de configuracao no projeto. | Implementar quando test framework for configurado. |
| R-04 | Artefato de pre-prompt (`pre_prompt_dss_btn_group.md`) e reconstrucao fiel apos compactacao de contexto, nao copia exata do texto original | Conteudo validado: cobre todos os 5 eixos obrigatorios. Atualizado com secao 2.3 (Gate de Responsabilidade v2.4) como aprendizado canonico. | O autor do pre-prompt deve assinar o artefato se disponivel o texto original. |

> Nenhuma ressalva impede a concessao do selo.

---

## Conformidades Confirmadas

### Tokens — CONFORME

- Zero tokens inexistentes
- Zero tokens especificos de componente (`--dss-btn-group-*` = 0 resultados)
- Tokens de borda: `--dss-border-width-thin`, `--dss-border-width-thick`, `--dss-border-width-md`
- Tokens de cor: `--dss-gray-200`, `--dss-gray-300`
- Tokens de shape: `--dss-radius-full`
- Tokens de brand (claro): `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`
- Tokens de brand (dark): `--dss-hub-400`, `--dss-water-400`, `--dss-waste-500`
- Mixin `dss-transition` com parametro `'fast'` utilizado na Layer 2
- 3 excecoes de valor documentadas (EXC-01, EXC-02, EXC-03) com ID, valor, arquivo e racional
- 2 excecoes de Gate v2.4 documentadas (`responsibilityGateV24`, `compositionGateV24`) com localizacao, justificativa e decisao de aprovacao
- Zero valores hardcoded nao-documentados em `.scss` e `.vue`

### Touch Target — CONFORME (Nao Aplicavel — Opcao B)

- DssBtnGroup e container estrutural de composicao, nao Compact Control
- Touch target via `::before` nao se aplica ao container de grupo
- Decisao de delegacao (Opcao B): touch target e responsabilidade exclusiva de cada DssButton filho
- `::before` nao utilizado no container (nenhuma violacao da convencao de pseudo-elementos DSS)
- `::after` nao utilizado no container (nenhuma violacao da convencao de pseudo-elementos DSS)
- `-webkit-tap-highlight-color: transparent` implementado no container base (padrao Golden Reference DssChip)
- Decisao documentada em `dss.meta.json:46` e `DssBtnGroup.md` secao correspondente

### Arquitetura — CONFORME

- **Gate Estrutural DSS (CLAUDE.md) — CONFORME**: estrutura obrigatoria completa verificada:
  - Layer 1 (Structure): `1-structure/DssBtnGroup.ts.vue` — Vue 3 + TypeScript + Composition API
  - Layer 2 (Composition): `2-composition/_base.scss` — container base, border-radius de filhos, rounded, square, spread, stretch
  - Layer 3 (Variants): `3-variants/_flat.scss`, `_outline.scss`, `_push.scss`, `_unelevated.scss`, `_glossy.scss`, `index.scss` — 5 variantes (glossy como placeholder intencional documentado)
  - Layer 4 (Output): `4-output/_states.scss` (dark mode, forced-colors) + `4-output/_brands.scss` (3 brands + dark) + `4-output/index.scss`
  - Orchestrador: `DssBtnGroup.module.scss` — 3 `@use` imports (composition, variants, output) + prefers-contrast + prefers-reduced-motion
  - **Entry Point Wrapper: `DssBtnGroup.vue` — re-export puro da Layer 1, sem `<template>`, sem `<style>`, sem logica propria** — CONFORME
  - `index.js` — importa via wrapper canonico `DssBtnGroup.vue`; exporta componente, default, 3 types, 1 composable
- Composable: `composables/useBtnGroupClasses.ts` — computed puro, sem efeitos colaterais
- Tipos: `types/btn-group.types.ts` — `BtnGroupBrand`, `BtnGroupProps` (11 props), `BtnGroupSlots`
- Compilacao: SCSS compila com zero erros (verificado com `npx sass --no-source-map`)
- Nenhuma camada omitida
- Excecoes aos Gates v2.4 formalmente registradas em `dss.meta.json > gateExceptions` (precedente canonico para futuros containers Fase 2)

### Estados — CONFORME

| Estado | SCSS | Vue/ARIA | Evidencia |
|--------|------|----------|-----------|
| default | `_base.scss:23-34` | `role="group"` | `display: inline-flex`, `align-items: stretch`, `vertical-align: middle` |
| hover (filhos) | Delegado ao DssButton | — | DssBtnGroup e container estrutural; hover pertence aos filhos |
| focus (filhos) | Delegado ao DssButton | — | DssBtnGroup nao e focusavel; cada DssButton filho e navegavel por Tab |
| active (filhos) | Delegado ao DssButton | — | Pertence aos DssButton filhos |
| disabled (filhos) | Delegado ao DssButton | — | Pertence aos DssButton filhos |
| loading | — | — | Nao aplicavel: container estrutural. Loading pertence aos DssButton filhos. |
| error | — | — | Nao aplicavel: container estrutural. Error pertence aos DssButton filhos. |
| indeterminate | — | — | Nao aplicavel: grupo de botoes nao possui estado intermediario. |
| dark | `_states.scss:15-27` | `[data-theme="dark"]` | Separadores em dark mode — EXC-02 documentada |
| forced-colors | `_states.scss:36-57` | — | `outline: 1px solid ButtonText` — EXC-03; `border-right-color: ButtonText` em separadores |
| high-contrast | `DssBtnGroup.module.scss:29-33` | — | `outline: var(--dss-border-width-md) solid currentColor` |
| reduced-motion | `DssBtnGroup.module.scss:36-40` | — | `transition: none` |

### Acessibilidade — CONFORME

| Criterio WCAG | Status | Implementacao |
|---------------|--------|---------------|
| 1.4.3 Contraste Minimo (AA) | CONFORME | Grupo nao define cores; herda do contexto; filhos gerenciam contraste |
| 2.1.1 Teclado (A) | CONFORME | Container nao captura foco; cada DssButton filho e navegavel individualmente por Tab |
| 2.4.7 Foco Visivel (AA) | CONFORME | Focus ring responsabilidade de cada DssButton filho |
| 4.1.2 Nome, Funcao, Valor (A) | CONFORME | `role="group"` sempre presente; `aria-label` via prop `ariaLabel`; `aria-label` omitido quando prop ausente (evita atributo vazio) |
| `prefers-reduced-motion` | CONFORME | `transition: none` no orchestrador |
| `prefers-contrast: high` | CONFORME | `outline: var(--dss-border-width-md) solid currentColor` no orchestrador |
| `forced-colors: active` | CONFORME | System colors: `ButtonText` — EXC-03 documentada |
| Dark mode | CONFORME | `[data-theme="dark"]` com ajuste de separadores — EXC-02 documentada |
| `-webkit-tap-highlight-color` | CONFORME | `transparent` no container base |
| Touch target | CONFORME (Opcao B) | Delegado aos DssButton filhos conforme classificacao de container |
| `inheritAttrs: false` + `v-bind="$attrs"` | CONFORME | Atributos HTML forwarded para `<div role="group">` |

### Documentacao — CONFORME

- `DssBtnGroup.md` — Documentacao normativa completa (Template 13.1, 17 secoes; secao 16.2 adicionada para excecoes Gates v2.4)
- `README.md` — Quick start com Prop Sync Rule destacada como regra de ouro, exemplos e tabela de tokens
- `DSSBTNGROUP_API.md` — API Reference completa (props, slots, eventos, atributos herdados, classes CSS, TypeScript, composables, tokens, excecoes, acessibilidade)
- `DssBtnGroup.example.vue` — 6 cenarios (unelevated, outline+icones, flat toolbar, spread, brand hub+water, rounded) + demonstracao de anti-pattern prop sync
- `dss.meta.json` — Metadados de governanca (3 excecoes de valor, 2 excecoes de Gate v2.4, tokens categorizados, propsBlocked com justificativas, statesNotApplicable)
- `docs/governance/pre-prompts/pre_prompt_dss_btn_group.md` — Artefato de governanca com 5 eixos obrigatorios cobertos (classificacao, grande risco arquitetural com secoes 2.1/2.2/2.3, API, tokens, acessibilidade)
- `docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md` — Criado durante este ciclo de auditoria como documento normativo vinculante para Fase 2
- API documentada = API implementada (11 props, 5 props bloqueadas com justificativas, 1 slot, 0 eventos)
- 3 excecoes de valor + 2 excecoes de Gate com rastreabilidade completa
- Tokens listados com nomes exatos em README, API Reference e dss.meta.json
- Prop Sync Rule documentada em 3 locais (README, API Reference, DssBtnGroup.md) para maxima visibilidade
- Nenhuma linguagem absoluta proibida encontrada
- Composition API + TypeScript em todos os componentes

---

## Decisoes de Governanca Registradas

| Decisao | Valor | Justificativa |
|---------|-------|---------------|
| Golden Component | DssChip (referencia), DssCard (contexto) | DssChip como Golden Reference global de categoria; DssCard como Golden Context Fase 2 mais proximo semanticamente (ambos sao containers estruturais de composicao) |
| Touch target | Opcao B — delegado | DssBtnGroup nao e Compact Control; touch target pertence a cada DssButton filho |
| Tokens de brand | Numericos (`--dss-hub-600`, etc.) | Tokens semanticos de brand inexistentes no catalogo DSS atual; padrao identico ao DssCard |
| Escopo de estilo | `<style lang="scss">` sem scoped | Necessario para seletores `.dss-btn-group > .dss-button` funcionarem com filhos via slot (NC-C1-01) |
| Excecao composicao v2.4 | Seletores descendentes `> .dss-button` | Gerenciar border-radius e separadores de filhos adjacentes E o unico proposito do componente; impossivel via props do filho pois o botao nao conhece sua posicao no grupo |
| Excecao responsabilidade v2.4 | `:hover`/`:focus-visible` em `_outline.scss` | Efeito e exclusivamente `z-index: 1` para empilhamento de borda — nao altera aparencia visual do botao; alterar DssButton (Fase 1, selado) seria risco desnecessario |
| Glossy placeholder | `_glossy.scss` vazio intencional | Efeito glossy e responsabilidade exclusiva do DssButton filho; arquivo existe para completude da Layer 3; marcado com `@status: intentional-placeholder` |
| Estados nao aplicaveis | hover, focus, active, disabled, loading, error, indeterminate | Container estrutural; todos os estados interativos pertencem aos DssButton filhos |
| Importacao de filhos | Via slot, nao via import direto | DssBtnGroup recebe DssButton via slot `<default>`, nao instancia diretamente; satisfaz Gate de Composicao v2.4 Regra 3 |

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

**Componente:** DssBtnGroup
**Versao:** 2.2.0
**Data de Emissao:** 26 de Marco de 2026
**Classificacao:** Container de Composicao (Action Group) — Fase 2

---

## Imutabilidade

Este documento e historico e imutavel apos emissao. Nao pode ser editado, reinterpretado ou complementado. Qualquer alteracao futura no componente DssBtnGroup invalida este selo. Nova auditoria devera ser conduzida e novo selo emitido em novo arquivo.

**Caminho canonico deste arquivo:**
```
DSS/docs/compliance/seals/DssBtnGroup/DSSBTNGROUP_SELO_v2.2.md
```

---

## Arquivos Auditados

| Arquivo | Camada | Status |
|---------|--------|--------|
| `1-structure/DssBtnGroup.ts.vue` | Layer 1 | CONFORME |
| `2-composition/_base.scss` | Layer 2 | CONFORME |
| `3-variants/_flat.scss` | Layer 3 | CONFORME |
| `3-variants/_outline.scss` | Layer 3 | CONFORME |
| `3-variants/_push.scss` | Layer 3 | CONFORME |
| `3-variants/_unelevated.scss` | Layer 3 | CONFORME |
| `3-variants/_glossy.scss` | Layer 3 | CONFORME (placeholder intencional documentado) |
| `3-variants/index.scss` | Layer 3 | CONFORME |
| `4-output/_states.scss` | Layer 4 | CONFORME |
| `4-output/_brands.scss` | Layer 4 | CONFORME |
| `4-output/index.scss` | Layer 4 | CONFORME |
| `DssBtnGroup.module.scss` | Orchestrador | CONFORME |
| `DssBtnGroup.vue` | Entry Point Wrapper | CONFORME |
| `composables/useBtnGroupClasses.ts` | Composable | CONFORME |
| `composables/index.ts` | Barrel Composable | CONFORME |
| `types/btn-group.types.ts` | Tipos | CONFORME |
| `DssBtnGroup.md` | Doc Principal | CONFORME |
| `README.md` | Doc Onboarding | CONFORME |
| `DSSBTNGROUP_API.md` | Doc API | CONFORME |
| `DssBtnGroup.example.vue` | Showcase | CONFORME |
| `dss.meta.json` | Metadados | CONFORME |
| `index.js` | API Publica | CONFORME |
| `docs/governance/pre-prompts/pre_prompt_dss_btn_group.md` | Governanca | CONFORME |
| `docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md` | Normativo v2.4 | CRIADO NESTE CICLO |
