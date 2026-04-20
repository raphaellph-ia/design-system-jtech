# DSS — To Do List: Fase 2

> **Status:** Ativo
> **Última Atualização:** 20 de Abril de 2026
> **Legenda:** ✅ Selado · 🔄 Aguardando auditoria · ⬜ Pendente · 🔒 Bloqueado (aguarda dependência)

---

## Nível 1 — Independentes (Base da Fase 2)

*Estes componentes dependem apenas de componentes da Fase 1 (já selados). Podem ser iniciados imediatamente.*

### Família: Botões e Controles de Grupo

- [x] ~~`DssBtnGroup`~~ ✅ **SELADO**
- [x] ~~`DssBtnDropdown`~~ ✅ **SELADO**
- [x] ~~`DssBtnToggle`~~ ✅ **SELADO**
- [x] ~~`DssOptionGroup`~~ ✅ **SELADO**

### Família: Lista e Itens

- [x] ~~`DssItem`~~ ✅ **SELADO** *(Fase 1 — retroativo)*
- [x] ~~`DssList`~~ ✅ **SELADO**
- [x] ~~`DssItemSection`~~ ✅ **SELADO**
- [x] ~~`DssItemLabel`~~ ✅ **SELADO** *(20 Abr 2026)*

### Família: Tabs

- [x] ~~`DssTab`~~ ✅ **SELADO**
- [x] ~~`DssTabPanel`~~ ✅ **SELADO**

### Família: Navegação Estrutural

- [x] ~~`DssBreadcrumbsEl`~~ ✅ **SELADO**
- [x] ~~`DssStep`~~ ✅ **SELADO** *(20 Abr 2026)*
- [ ] `DssPagination` — Controle de paginação ⬜

### Família: Overlays e Dialogs

- [ ] `DssDialog` — Modal/Dialog com slot de conteúdo livre ⬜
- [ ] `DssPopupEdit` — Edição inline em popup (clique para editar) ⬜

### Família: Scroll e Virtualização

- [ ] `DssVirtualScroll` — Lista virtualizada para grandes volumes de dados ⬜
- [ ] `DssInfiniteScroll` — Carregamento progressivo por scroll ⬜

### Família: Expansão e Colapso

- [ ] `DssExpansionItem` — Item expansível com animação (accordion) ⬜

### Família: Estrutura de Página (Base)

- [x] ~~`DssToolbar`~~ ✅ **SELADO** *(16 Abr 2026)*

### Família: Superfícies e Layout

- [x] ~~`DssCard`~~ ✅ **SELADO**

### Família: Mídia e Visualização

- [ ] `DssImg` — Imagem com lazy load, placeholder e aspect ratio ⬜
- [ ] `DssVideo` — Embed de vídeo responsivo ⬜
- [ ] `DssParallax` — Efeito parallax em imagens de fundo ⬜

### Família: Progresso e Feedback

- [ ] `DssLinearProgress` — Barra de progresso linear (determinada e indeterminada) ⬜
- [ ] `DssCircularProgress` — Progresso circular (determinado e indeterminado) ⬜
- [ ] `DssInnerLoading` — Overlay de loading sobre um container ⬜
- [ ] `DssSkeleton` — Placeholder de carregamento (skeleton screen) ⬜
- [ ] `DssAjaxBar` — Barra de progresso global para requisições Ajax ⬜

### Família: Inputs Especializados

- [ ] `DssKnob` — Controle rotativo (dial) para valores numéricos ⬜
- [ ] `DssRating` — Avaliação por estrelas (ou ícones customizados) ⬜

### Família: Layout Auxiliar

- [ ] `DssScrollArea` — Área com scroll customizado (scrollbar estilizada) ⬜
- [ ] `DssSplitter` — Divisor redimensionável entre dois painéis ⬜
- [ ] `DssResponsive` — Container que mantém aspect ratio responsivo ⬜

### Família: Tabela Simples

- [ ] `DssMarkupTable` — Tabela HTML semântica com estilos DSS ⬜

### Família: Notificações e Alertas

- [ ] `DssBanner` — Faixa de notificação persistente (info, warning, error) ⬜
- [ ] `DssBar` — Barra de sistema (título de janela, barra mobile) ⬜

### Família: Interação Gestual

- [ ] `DssPullToRefresh` — Gesto de arrastar para atualizar (mobile) ⬜
- [ ] `DssSlideItem` — Item de lista com ações deslizáveis (swipe) ⬜

---

## Nível 2 — Composição de Primeiro Grau

*Só podem ser iniciados após os componentes do Nível 1 que os bloqueiam estarem selados.*

### Família: Tabs (completa)

- [x] ~~`DssTabs`~~ ✅ **SELADO**
- [x] ~~`DssTabPanels`~~ ✅ **SELADO**
- [x] ~~`DssRouteTab`~~ ✅ **SELADO**

### Família: Navegação

- [x] ~~`DssBreadcrumbs`~~ ✅ **SELADO**
- [ ] `DssStepper` 🔒 *(aguarda DssStep — **DESBLOQUEADO** ✅)*
- [x] ~~`DssMenu`~~ ✅ **SELADO** *(18 Abr 2026)*
- [ ] `DssBottomSheet` 🔒 *(aguarda DssList, DssItem)*

### Família: FAB

- [ ] `DssFab` 🔒 *(aguarda DssButton, DssIcon)*

### Família: Estrutura de Página

- [ ] `DssToolbarTitle` 🔒 *(aguarda DssToolbar — **DESBLOQUEADO** ✅)*

### Família: Conteúdo Rico

- [ ] `DssTimeline` 🔒 *(aguarda DssIcon, DssAvatar)*
- [ ] `DssCarousel` 🔒 *(aguarda DssButton, DssIcon)*
- [ ] `DssChatMessage` 🔒 *(aguarda DssAvatar)*

### Família: Upload

- [ ] `DssUploader` 🔒 *(aguarda DssButton, DssIcon, DssLinearProgress)*

### Família: Overlays Compostos

- [ ] `DssPopupProxy` 🔒 *(aguarda DssMenu ou DssDialog)*

### Família: Formulários

- [ ] `DssField` 🔒 *(aguarda padrão visual de DssInput)*
- [ ] `DssForm` 🔒 *(aguarda DssButton)*

---

## Nível 3 — Composição de Segundo Grau e Estrutura

*Dependem de componentes do Nível 2.*

### Família: FAB

- [ ] `DssFabAction` 🔒 *(aguarda DssFab)*

### Família: Layout (Estrutura de Página)

- [x] ~~`DssHeader`~~ ✅ **SELADO** *(17 Abr 2026)*
- [x] ~~`DssFooter`~~ ✅ **SELADO** *(18 Abr 2026)*
- [x] ~~`DssDrawer`~~ ✅ **SELADO** *(20 Abr 2026)*

### Família: Inputs de Data/Hora

- [ ] `DssTimePicker` 🔒 *(aguarda DssIcon, DssButton)*
- [ ] `DssDatePicker` 🔒 *(aguarda DssIcon, DssButton, DssBtnGroup)*
- [ ] `DssColorPicker` 🔒 *(aguarda DssInput, DssSlider)*

---

## Nível 4 — Layouts e Alta Complexidade

*O topo da cadeia de dependências.*

### Família: Layout Global

- [x] ~~`DssLayout`~~ ✅ **SELADO** *(20 Abr 2026)*
- [ ] `DssPage` 🔒 *(aguarda DssLayout — **DESBLOQUEADO** ✅)*
- [ ] `DssPageContainer` 🔒 *(aguarda DssLayout — **DESBLOQUEADO** ✅)*
- [ ] `DssPageSticky` 🔒 *(aguarda DssLayout — **DESBLOQUEADO** ✅)*
- [ ] `DssPageScroller` 🔒 *(aguarda DssLayout — **DESBLOQUEADO** ✅)*

### Família: Dados Complexos

- [ ] `DssTable` 🔒 *(aguarda DssPagination, DssCheckbox, DssSpinner)*
- [ ] `DssTree` 🔒 *(aguarda DssIcon, DssCheckbox)*

---

## Fase 3 — Patterns / Utilitários (sem wrapper DSS)

*Documentação, recipes e guias de uso. Não geram componentes no pacote npm.*

- [ ] `DssEditor` — Recipe: configuração do QEditor com DSS tokens
- [ ] Guia: Uso do `QScrollObserver` em contexto DSS
- [ ] Guia: Uso do `QResizeObserver` em contexto DSS
- [ ] Guia: Uso do `QIntersection` em contexto DSS
- [ ] Guia: Uso do `QNoSsr` em contexto DSS
- [ ] Guia: Uso do `QSlideTransition` em contexto DSS

---

## Progresso Geral

| Nível | Total | Selados | % Concluído |
|---|---|---|---|
| Fase 1 | 19 | 19 | 100% |
| Fase 2 — Nível 1 | 36 | 12 | 33% |
| Fase 2 — Nível 2 | 16 | 5 | 31% |
| Fase 2 — Nível 3 | 7 | 3 | 43% |
| Fase 2 — Nível 4 | 7 | 1 | 14% |
| **Fase 2 Total** | **66** | **21** | **32%** |
| Fase 3 | 6 | N/A | — |
