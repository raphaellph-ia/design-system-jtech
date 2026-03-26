# DSS — Faseamento Oficial de Componentes Quasar

> **Status:** Ativo e Normativo
> **Última Atualização:** Março 2026 (Revisão de cobertura total — todos os componentes Quasar classificados)

## Princípio Fundamental

Todo componente Quasar **DEVE** ser classificado em uma fase antes de entrar no DSS. A fase determina as regras de arquitetura, governança e complexidade permitidas. Componentes marcados como **Utilitário** não geram wrapper DSS — são usados diretamente do Quasar ou via diretiva.

---

## FASE 1 — Componentes Atômicos (Wrappers DSS)

**Objetivo:** Criar o vocabulário atômico do DSS, substituir o uso direto de Quasar, garantir consistência visual, semântica e de acessibilidade.

**Regra de Ouro da Fase 1:** O componente deve ser um wrapper direto de **UM único componente Quasar**, sem composição interna relevante, sem layout complexo, com API pública curada e mínima, e sem lógica de negócio.

**Status: FASE 1 COMPLETA — 19 componentes selados.**

| Componente DSS | Quasar Base | Status |
|---|---|---|
| `DssButton` | `QBtn` | ✅ Selado |
| `DssInput` | `QInput` | ✅ Selado |
| `DssTextarea` | `QInput` (type textarea) | ✅ Selado |
| `DssSelect` | `QSelect` | ✅ Selado |
| `DssCheckbox` | `QCheckbox` | ✅ Selado |
| `DssRadio` | `QRadio` | ✅ Selado |
| `DssToggle` | `QToggle` | ✅ Selado |
| `DssSlider` | `QSlider` | ✅ Selado |
| `DssRange` | `QRange` | ✅ Selado |
| `DssFile` | `QFile` | ✅ Selado |
| `DssBadge` | `QBadge` | ✅ Selado |
| `DssChip` | `QChip` | ✅ Selado |
| `DssAvatar` | `QAvatar` | ✅ Selado |
| `DssIcon` | `QIcon` | ✅ Selado |
| `DssSpinner` | `QSpinner*` | ✅ Selado |
| `DssTooltip` | `QTooltip` | ✅ Selado |
| `DssSeparator` | `QSeparator` | ✅ Selado |
| `DssSpace` | `QSpace` | ✅ Selado |
| `DssItem` | `QItem` | ✅ Selado |

---

## FASE 2 — Componentes Compostos / Estruturais

**Objetivo:** Criar padrões reutilizáveis de UI/UX, resolver composição recorrente entre produtos, definir estruturas de layout e agrupamento.

**Regra de Ouro da Fase 2:** O componente envolve a **composição de dois ou mais componentes DSS** (ou gerencia estado complexo entre filhos), pode definir layout e estrutura, mas ainda não representa uma feature de negócio. Exige governança explícita de composição.

### Trilha de Execução (Ordem Lógica por Dependência)

A lista abaixo está ordenada para garantir que componentes base sejam criados antes dos componentes que os consomem, evitando bloqueios de arquitetura.

---

#### Nível 1 — Independentes (Base da Fase 2)

*Não possuem dependências de outros componentes da Fase 2, apenas da Fase 1. Podem ser criados em paralelo.*

| Componente DSS | Quasar Base | Depende de (Fase 1) | Status |
|---|---|---|---|
| `DssCard` | `QCard` + `QCardSection` + `QCardActions` | `DssButton`, `DssAvatar` | ✅ Selado |
| `DssBtnGroup` | `QBtnGroup` | `DssButton` | ⬜ Pendente |
| `DssBtnDropdown` | `QBtnDropdown` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssBtnToggle` | `QBtnToggle` | `DssButton` | ⬜ Pendente |
| `DssOptionGroup` | `QOptionGroup` | `DssRadio`, `DssCheckbox`, `DssToggle` | ⬜ Pendente |
| `DssList` | `QList` | `DssItem`, `DssSeparator` | ⬜ Pendente |
| `DssItemSection` | `QItemSection` | `DssItem` | ⬜ Pendente |
| `DssItemLabel` | `QItemLabel` | `DssItem` | ⬜ Pendente |
| `DssTab` | `QTab` | `DssIcon`, `DssBadge` | ⬜ Pendente |
| `DssTabPanel` | `QTabPanel` | — | ⬜ Pendente |
| `DssBreadcrumbsEl` | `QBreadcrumbsEl` | `DssIcon` | ⬜ Pendente |
| `DssStep` | `QStep` | `DssIcon`, `DssButton` | ⬜ Pendente |
| `DssPagination` | `QPagination` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssDialog` | `QDialog` | `DssButton`, `DssCard` | ⬜ Pendente |
| `DssVirtualScroll` | `QVirtualScroll` | — | ⬜ Pendente |
| `DssInfiniteScroll` | `QInfiniteScroll` | `DssSpinner` | ⬜ Pendente |
| `DssExpansionItem` | `QExpansionItem` | `DssItem`, `DssIcon` | ⬜ Pendente |
| `DssToolbar` | `QToolbar` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssImg` | `QImg` | `DssSpinner` | ⬜ Pendente |
| `DssLinearProgress` | `QLinearProgress` | — | ⬜ Pendente |
| `DssCircularProgress` | `QCircularProgress` | — | ⬜ Pendente |
| `DssInnerLoading` | `QInnerLoading` | `DssSpinner` | ⬜ Pendente |
| `DssKnob` | `QKnob` | — | ⬜ Pendente |
| `DssRating` | `QRating` | `DssIcon` | ⬜ Pendente |
| `DssSkeleton` | `QSkeleton` | — | ⬜ Pendente |
| `DssScrollArea` | `QScrollArea` | — | ⬜ Pendente |
| `DssSplitter` | `QSplitter` | — | ⬜ Pendente |
| `DssMarkupTable` | `QMarkupTable` | — | ⬜ Pendente |
| `DssVideo` | `QVideo` | — | ⬜ Pendente |
| `DssResponsive` | `QResponsive` | — | ⬜ Pendente |
| `DssParallax` | `QParallax` | — | ⬜ Pendente |
| `DssAjaxBar` | `QAjaxBar` | — | ⬜ Pendente |
| `DssBanner` | `QBanner` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssBar` | `QBar` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssPopupEdit` | `QPopupEdit` | `DssInput`, `DssButton` | ⬜ Pendente |
| `DssPullToRefresh` | `QPullToRefresh` | `DssIcon` | ⬜ Pendente |
| `DssSlideItem` | `QSlideItem` | `DssIcon` | ⬜ Pendente |

---

#### Nível 2 — Composição de Primeiro Grau

*Dependem de componentes do Nível 1 desta fase.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N1) | Status |
|---|---|---|---|
| `DssTabs` | `QTabs` | `DssTab` | ⬜ Pendente |
| `DssTabPanels` | `QTabPanels` | `DssTabPanel` | ⬜ Pendente |
| `DssRouteTab` | `QRouteTab` | `DssTab` | ⬜ Pendente |
| `DssBreadcrumbs` | `QBreadcrumbs` | `DssBreadcrumbsEl` | ⬜ Pendente |
| `DssStepper` | `QStepper` + `QStepperNavigation` | `DssStep`, `DssButton` | ⬜ Pendente |
| `DssMenu` | `QMenu` | `DssList`, `DssItem` | ⬜ Pendente |
| `DssBottomSheet` | `QBottomSheet` (plugin) | `DssList`, `DssItem` | ⬜ Pendente |
| `DssFab` | `QFab` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssToolbarTitle` | `QToolbarTitle` | `DssToolbar` | ⬜ Pendente |
| `DssTimeline` | `QTimeline` + `QTimelineEntry` | `DssIcon`, `DssAvatar` | ⬜ Pendente |
| `DssCarousel` | `QCarousel` + `QCarouselSlide` + `QCarouselControl` | `DssButton`, `DssIcon` | ⬜ Pendente |
| `DssUploader` | `QUploader` + `QUploaderAddTrigger` | `DssButton`, `DssIcon`, `DssLinearProgress` | ⬜ Pendente |
| `DssPopupProxy` | `QPopupProxy` | `DssMenu` ou `DssDialog` | ⬜ Pendente |
| `DssField` | `QField` | `DssInput` (padrão visual) | ⬜ Pendente |
| `DssForm` | `QForm` | `DssButton` (submit/reset) | ⬜ Pendente |
| `DssChatMessage` | `QChatMessage` | `DssAvatar` | ⬜ Pendente |

---

#### Nível 3 — Composição de Segundo Grau e Estrutura

*Dependem de componentes do Nível 2.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N2) | Status |
|---|---|---|---|
| `DssFabAction` | `QFabAction` | `DssFab` | ⬜ Pendente |
| `DssHeader` | `QHeader` | `DssToolbar` | ⬜ Pendente |
| `DssFooter` | `QFooter` | `DssToolbar` | ⬜ Pendente |
| `DssDrawer` | `QDrawer` | `DssList`, `DssMenu` | ⬜ Pendente |
| `DssTimePicker` | `QTime` | `DssIcon`, `DssButton` | ⬜ Pendente |
| `DssDatePicker` | `QDate` | `DssIcon`, `DssButton`, `DssBtnGroup` | ⬜ Pendente |
| `DssColorPicker` | `QColor` | `DssInput`, `DssSlider` | ⬜ Pendente |

---

#### Nível 4 — Layouts e Alta Complexidade

*O topo da cadeia de dependências.*

| Componente DSS | Quasar Base | Depende de (Fase 2 N3) | Status |
|---|---|---|---|
| `DssLayout` | `QLayout` | `DssHeader`, `DssFooter`, `DssDrawer` | ⬜ Pendente |
| `DssPage` | `QPage` | `DssLayout` | ⬜ Pendente |
| `DssPageContainer` | `QPageContainer` | `DssLayout` | ⬜ Pendente |
| `DssPageSticky` | `QPageSticky` | `DssLayout` | ⬜ Pendente |
| `DssPageScroller` | `QPageScroller` | `DssLayout` | ⬜ Pendente |
| `DssTable` | `QTable` + `QTh` + `QTr` + `QTd` | `DssPagination`, `DssCheckbox`, `DssSpinner` | ⬜ Pendente |
| `DssTree` | `QTree` | `DssIcon`, `DssCheckbox` | ⬜ Pendente |

---

## FASE 3 — Patterns / Recipes e Utilitários

**Objetivo:** Acelerar times de produto, documentar boas práticas, exemplificar uso correto do DSS em cenários reais. **Não gera wrapper DSS.** Não vira um componente reutilizável no pacote npm. É puramente documentação, código de exemplo e guias de implementação.

**Regra de Ouro da Fase 3:** Não gera um wrapper DSS. É puramente documentação, código de exemplo e guias de implementação.

### Patterns de Fase 3 (Documentação e Exemplos)

| Componente / Pattern | Quasar Base | Justificativa |
|---|---|---|
| `DssEditor` | `QEditor` | Componente de altíssima complexidade (WYSIWYG). Requer integração com bibliotecas de rich text. Melhor tratado como recipe com configuração documentada. |
| `DssScrollObserver` | `QScrollObserver` | Utilitário comportamental puro. Não tem representação visual. Usar diretamente do Quasar. |
| `DssResizeObserver` | `QResizeObserver` | Utilitário comportamental puro. Não tem representação visual. Usar diretamente do Quasar. |
| `DssIntersection` | `QIntersection` | Wrapper de diretiva/comportamento. Sem representação visual. Usar diretamente do Quasar. |
| `DssNoSsr` | `QNoSsr` | Utilitário de renderização condicional. Sem representação visual. Usar diretamente do Quasar. |
| `DssSlideTransition` | `QSlideTransition` | Transição CSS pura. Sem representação visual própria. Usar diretamente do Quasar. |

---

## Resumo de Cobertura

| Fase | Total de Componentes | Selados | Pendentes |
|---|---|---|---|
| Fase 1 — Atômicos | 19 | 19 | 0 |
| Fase 2 — Nível 1 (Independentes) | 37 | 1 (DssCard) | 36 |
| Fase 2 — Nível 2 (1º Grau) | 16 | 0 | 16 |
| Fase 2 — Nível 3 (2º Grau) | 7 | 0 | 7 |
| Fase 2 — Nível 4 (Layouts) | 7 | 0 | 7 |
| Fase 3 — Patterns/Utilitários | 6 | N/A | N/A |
| **TOTAL** | **92** | **20** | **66** |

---

## Histórico de Revisões

| Data | Revisão |
|---|---|
| Março 2026 | **Cobertura total**: Todos os 92 componentes/patterns Quasar classificados. Adicionados 34 componentes ausentes na versão anterior. Fase 3 expandida com utilitários comportamentais. |
| Março 2026 | Reordenação da Fase 2 em "Trilha de Execução" baseada em interdependência, garantindo que componentes consumidos sejam criados antes dos consumidores. |
| Março 2026 | Reclassificação de `QOptionGroup`, `QBtnGroup`, `QFab` e `QFabAction` da Fase 1 para a Fase 2. Justificativa: A regra de ouro da Fase 1 exige que o componente seja um wrapper de um único componente, sem composição interna. Estes componentes gerenciam estado entre múltiplos filhos ou compõem outros componentes internamente, caracterizando comportamento de Fase 2. |
| Fevereiro 2026 | Documento original criado em formato PDF. |
