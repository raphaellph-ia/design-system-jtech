# SELO DSS v2.2 — DssRouteTab

**Componente:** DssRouteTab
**Versão:** v1.0.0
**Data de Emissão:** 2026-04-10
**Auditor:** Claude Code (claude-sonnet-4-6)
**Ciclo de Auditoria:** 2 (Ciclo 1: 1 NC + 3 GAPs → Ciclo 2: 0 NCs + 0 GAPs)

---

## Veredicto

> **STATUS: CONFORME**
> O componente `DssRouteTab` atende a todos os requisitos do DSS v2.2 e está elegível para uso em produção.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| Categoria | Elemento interativo de navegação por abas com roteamento |
| Fase | 2 — Componente interativo de seleção com Vue Router |
| Golden Reference | DssTab |
| Golden Context | DssTabs |
| Quasar Base | QRouteTab |
| Pattern DOM | Level 1 — `<q-route-tab>` como raiz (sem wrapper div) |
| Touch Target | `min-height: var(--dss-touch-target-md)` — herdado via `.dss-tab` |
| WCAG | 2.1 AA |

---

## Gates Aprovados

| Gate | Status |
|------|--------|
| Gate Estrutural | ✅ CONFORME |
| Gate Técnico | ✅ CONFORME |
| Gate Documental | ✅ CONFORME |
| Gate de Composição v2.4 | ✅ CONFORME (exceção formal em `gateExceptions`) |
| Gate de Responsabilidade v2.4 | ✅ CONFORME (delegação de estados ao DssTabs pai) |

---

## Ciclo de Auditoria — Histórico

### Ciclo 1 — Auditoria Inicial (2026-04-10)

**Resultado:** 🟡 Não Elegível — 1 NC (não-bloqueante) + 3 GAPs

| ID | Tipo | Descrição |
|----|------|-----------|
| NC-01 | Não-bloqueante | `--dss-text-body` declarado em `tokensUsed` sem uso real no CSS compilado (22 tokens reais vs. 23 declarados) |
| GAP-01 | Pré-prompt | §4 declara tokens com nomenclatura inexistente no DSS (`--dss-text-body-strong`, `--dss-motion-duration-fast`, `--dss-motion-easing-standard`) |
| GAP-02 | Pré-prompt | §3.1 omite a prop `alert` (exposta no componente, consistente com DssTab) |
| GAP-03 | Meta schema | Campo `sharedCssStrategy` não-padrão em `dss.meta.json` |

### Ciclo 2 — Pós-Correções (2026-04-10)

**Resultado:** 🟢 ELEGÍVEL — 0 NCs + 0 GAPs

| ID | Status | Correção Aplicada |
|----|--------|-------------------|
| NC-01 | ✅ Resolvida | `--dss-text-body` removido de `dss.meta.json`, `DssRouteTab.md §11` e `DSSROUTETAB_API.md`; contagem atualizada para 22 tokens |
| GAP-01 | ✅ Resolvida (externa) | Pré-prompt §4 atualizado pelo Chat Estratégico |
| GAP-02 | ✅ Resolvida (externa) | Pré-prompt §3.1 atualizado pelo Chat Estratégico |
| GAP-03 | ✅ Resolvida | `sharedCssStrategy` removido; conteúdo migrado para `compositionNote` em `dss.meta.json` |

---

## Destaques Arquiteturais

### Estratégia de CSS Compartilhado (Decisão Central)

`DssRouteTab` aplica a classe `.dss-tab` — a mesma classe base do `DssTab`. Toda a infraestrutura CSS (22 tokens, todos os estados, brands, dark mode, forced-colors, print) é fornecida pelo `DssTab.module.scss`, importado explicitamente no `DssRouteTab.module.scss`. Zero duplicação de seletores ou tokens. Qualquer correção aplicada ao `DssTab` propaga-se automaticamente ao `DssRouteTab`.

Fundamento: pré-prompt §2.1 — *"The preferred approach is that the DssRouteTab applies the same CSS classes (.dss-tab) that the DssTab does."*

### Level 1 DOM Pattern

`DssRouteTab` usa `<q-route-tab>` como elemento raiz (sem wrapper div). O `QRouteTab` gerencia a renderização condicional como `<RouterLink>` ou `<a>` conforme `to`/`href`. As classes DSS são aplicadas via `:class` binding ao elemento raiz. Gate de Composição v2.4 formalizado em `gateExceptions`.

### Props de Roteamento

Superset do `DssTab`: adiciona `to`, `exact`, `replace`, `href`, `target` sem alterar nenhuma prop base. Bloqueio adicional de `color` e `text-color` (além de `ripple` e `no-caps` herdados do DssTab).

### Herança de Acessibilidade

`inheritAttrs: false` + `v-bind="$attrs"` — forwarding correto de `aria-*` do consumidor para o `<q-route-tab>` raiz. `aria-selected` delegado ao `DssTabs` pai via integração Vue Router/Quasar.

---

## Exceções Documentadas

### Token First (CSS)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | Seletor `.dss-tab .q-tab__indicator` | `DssTab/2-composition/_base.scss` (importado) | Level 1 DOM + override Quasar. Herdado via `.dss-tab`. Precedente: DssTab EXC-01 |
| EXC-02 | `ButtonText / GrayText / Highlight` | `DssTab/4-output/_states.scss` (importado) | Forced-colors — system color keywords obrigatórios. Herdado via `.dss-tab` |
| EXC-03 | `#000 !important` | `DssTab/4-output/_states.scss` (importado) — `@media print` | Impressão monocromática. Herdado via `.dss-tab` |

### Gate de Composição v2.4

| ID | Local | Justificativa |
|----|-------|---------------|
| GATE-EXC-01 | `1-structure/DssRouteTab.ts.vue` — template | `<q-route-tab>` gerencia roteamento Vue Router e renderização condicional `<RouterLink>`/`<a>` |

---

## Tokens Utilizados (22)

`--dss-font-family-sans`, `--dss-font-size-sm`, `--dss-font-weight-normal`, `--dss-font-weight-medium`, `--dss-line-height-tight`, `--dss-text-subtle`, `--dss-text-inverse`, `--dss-action-primary`, `--dss-opacity-hover`, `--dss-opacity-active`, `--dss-opacity-disabled`, `--dss-focus-ring`, `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-touch-target-md`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-duration-150`, `--dss-easing-standard`, `--dss-hub-600`, `--dss-water-600`, `--dss-waste-600`

*(Todos fornecidos pelo `DssTab.module.scss` importado — verificados via compilação SCSS)*

---

## Arquivos do Componente (18 arquivos)

```
DSS/components/base/DssRouteTab/
├── 1-structure/DssRouteTab.ts.vue
├── 2-composition/_base.scss
├── 3-variants/_icon.scss
├── 3-variants/index.scss
├── 4-output/_brands.scss
├── 4-output/_states.scss
├── 4-output/index.scss
├── composables/useRouteTabClasses.ts
├── composables/index.ts
├── types/route-tab.types.ts
├── DssRouteTab.vue
├── DssRouteTab.module.scss
├── DssRouteTab.example.vue
├── DssRouteTab.md
├── DSSROUTETAB_API.md
├── dss.meta.json
├── README.md
└── index.js
```
