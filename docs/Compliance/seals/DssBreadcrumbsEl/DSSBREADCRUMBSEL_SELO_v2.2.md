# SELO DSS v2.2 — DssBreadcrumbsEl

**Componente:** DssBreadcrumbsEl  
**Versão:** v1.0.0  
**Data de Emissão:** 2026-04-10  
**Auditor:** Claude Code (claude-sonnet-4-6)  
**Ciclo de Auditoria:** 2 (Ciclo 1: 2 NCs + 5 GAPs → Ciclo 2: 0 NCs + 0 GAPs)

---

## Veredicto

> **STATUS: CONFORME**  
> O componente `DssBreadcrumbsEl` atende a todos os requisitos do DSS v2.2 e está elegível para uso em produção.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| Categoria | Elemento de Trilha de Navegação (Breadcrumb Item) |
| Fase | 2 — Componente Estrutural/Interativo |
| Golden Reference | DssButton |
| Golden Context | DssBreadcrumbs (futuro) — DssTabs como proxy de padrões arquiteturais |
| Quasar Base | QBreadcrumbsEl |
| Pattern DOM | Level 1 — `<q-breadcrumbs-el>` como raiz (sem wrapper div) |
| Touch Target | Não implementado (v1.0.0) — revisão em v1.1.0 (RES-03) |
| WCAG | 2.1 AA |

---

## Gates Aprovados

| Gate | Status |
|------|--------|
| Gate Estrutural | ✅ CONFORME |
| Gate Técnico | ✅ CONFORME |
| Gate Documental | ✅ CONFORME |
| Gate de Composição v2.4 | ✅ CONFORME (exceção formal em `gateExceptions`) |
| Gate de Responsabilidade v2.4 | ✅ CONFORME (dualidade clicável/estático via modifier classes) |

---

## Ciclo de Auditoria — Histórico

### Ciclo 1 — Auditoria Inicial (2026-04-10)

**Resultado:** 🟡 Não Elegível — 2 NCs + 5 GAPs

| ID | Tipo | Descrição |
|----|------|-----------|
| NC-01 | Bloqueante | `forced-color-adjust: none` em `@media (forced-colors: active)` — viola padrão canônico DssTextarea |
| NC-02 | Não-bloqueante | `2px solid ButtonText; outline-offset: 2px` em forced-colors sem exceção documentada |
| GAP-01 | Dead code | `cursor: not-allowed` com `pointer-events: none` — efeito nulo |
| GAP-02 | Documentação | `opacity: 1` em forced-colors disabled sem exceção documentada |
| GAP-03 | Catálogo | `--dss-text-body` e `--dss-text-subtle` ausentes do DSS_TOKEN_REFERENCE.md §4.6 (resolvido externamente) |
| GAP-04 | Pré-prompt | EXC-01 do pré-prompt descreve descendant selectors; implementação usa compound selector (resolvido externamente) |
| GAP-05 | Decisão design | Outline permanente em `prefers-contrast: high` não documentado |

### Ciclo 2 — Pós-Correções (2026-04-10)

**Resultado:** 🟢 ELEGÍVEL — 0 NCs + 0 GAPs

| ID | Status | Correção Aplicada |
|----|--------|-------------------|
| NC-01 | ✅ Resolvida | `forced-color-adjust: none` removido de `4-output/_states.scss`; substituído por comentário normativo |
| NC-02 | ✅ Resolvida | EXC-03 adicionado em `dss.meta.json` para `2px solid ButtonText; outline-offset: 2px` |
| GAP-01 | ✅ Resolvida | `cursor: not-allowed` removido de `2-composition/_base.scss` |
| GAP-02 | ✅ Resolvida | EXC-04 adicionado em `dss.meta.json` para `opacity: 1` |
| GAP-03 | ✅ Resolvida (externa) | `DSS_TOKEN_REFERENCE.md` §4.6 atualizado pelo Chat Estratégico |
| GAP-04 | ✅ Resolvida (externa) | Pré-prompt atualizado pelo Chat Estratégico |
| GAP-05 | ✅ Resolvida | Nota §8.4 "Outline Permanente em prefers-contrast: high" adicionada em `DssBreadcrumbsEl.md` |

---

## Destaques Arquiteturais

### Level 1 DOM Pattern
`DssBreadcrumbsEl` usa `<q-breadcrumbs-el>` como elemento raiz (sem wrapper div). As classes DSS são aplicadas via `:class` binding ao elemento raiz do QBreadcrumbsEl. O seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` (EXC-01) garante especificidade suficiente para override dos estilos nativos Quasar — seguindo exatamente o padrão DssTabPanel EXC-01 (`.dss-tab-panel.q-tab-panel`).

### Dualidade Clicável/Estático
Exceção prevista ao Gate de Responsabilidade v2.4: estados de interação (`hover`, `focus`, `active`) são restritos ao modifier class `--clickable`. O item `--current` (sem `to`/`href`) recebe apenas estilo estático (`pointer-events: none`, `font-weight: semibold`). Governado via `useBreadcrumbsElClasses` composable.

### Composição DssIcon
DssIcon importado via Entry Point Wrapper (`../../DssIcon/DssIcon.vue`). Decorativo (`aria-hidden="true"`) quando usado com `label`. Herdança de cor via `currentColor` — sem estilos CSS extras necessários.

---

## Exceções Documentadas

### Token First (CSS)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | Seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` | `2-composition/_base.scss` | Level 1 DOM — especificidade sem descendant selectors. Precedente: DssTabPanel EXC-01 |
| EXC-02 | `text-decoration: underline` | `2-composition/_base.scss` — `:hover` e `:active` | Sem token DSS para text-decoration. WCAG 2.1 SC 1.4.1 |
| EXC-03 | `2px solid ButtonText; outline-offset: 2px` | `4-output/_states.scss` — forced-colors `:focus-visible` | Forced-colors — system color keywords obrigatórios. 2px = padrão canônico DSS (todos os componentes selados) |
| EXC-04 | `opacity: 1` | `4-output/_states.scss` — forced-colors disabled | Forced-colors ignora `opacity`. Reset necessário para GrayText. Precedente: DssTab |

### Gate de Composição v2.4

| ID | Local | Justificativa |
|----|-------|---------------|
| GATE-EXC-01 | `1-structure/DssBreadcrumbsEl.ts.vue` — template | `<q-breadcrumbs-el>` gerencia roteamento Vue Router e dualidade `<a>`/estático |

---

## Reservas (Não Bloqueantes)

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | DssBreadcrumbs (container com separadores) não implementado | Baixo — workaround: `<nav>` manual |
| RES-02 | Ícone sem label inacessível sem `aria-label` explícito | Baixo — caso raro, documentado |
| RES-03 | Touch target `::before` WCAG 2.5.5 não implementado | Baixo — revisão em v1.1.0 |

---

## Tokens Utilizados (17)

`--dss-text-subtle`, `--dss-text-body`, `--dss-font-weight-semibold`, `--dss-font-weight-bold`, `--dss-spacing-1`, `--dss-duration-150`, `--dss-easing-standard`, `--dss-opacity-disabled`, `--dss-radius-sm`, `--dss-border-width-thin`, `--dss-border-width-thick`, `--dss-hub-600`, `--dss-hub-400`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500`

---

## Arquivos do Componente (17 arquivos)

```
DSS/components/base/DssBreadcrumbsEl/
├── 1-structure/DssBreadcrumbsEl.ts.vue
├── 2-composition/_base.scss
├── 3-variants/index.scss
├── 4-output/_states.scss
├── 4-output/_brands.scss
├── 4-output/index.scss
├── composables/useBreadcrumbsElClasses.ts
├── composables/index.ts
├── types/breadcrumbs-el.types.ts
├── DssBreadcrumbsEl.vue
├── DssBreadcrumbsEl.module.scss
├── DssBreadcrumbsEl.example.vue
├── DssBreadcrumbsEl.md
├── DSSBREADCRUMBSEL_API.md
├── dss.meta.json
├── README.md
└── index.js
```
