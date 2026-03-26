# DSS — To Do List: Fase 2

> **Status:** Ativo
> **Última Atualização:** Março 2026
> **Legenda:** ✅ Selado · 🔄 Em andamento · ⬜ Pendente · 🔒 Bloqueado (aguarda dependência)

---

## Nível 1 — Independentes (Base da Fase 2)

*Estes componentes dependem apenas de componentes da Fase 1 (já selados). Podem ser iniciados imediatamente.*

### Família: Botões e Controles de Grupo

- [x] ~~`DssCard`~~ ✅ **SELADO**
- [ ] `DssBtnGroup` — Agrupa DssButtons com borda compartilhada *(próximo a criar)*
- [ ] `DssBtnDropdown` — Botão com menu dropdown integrado
- [ ] `DssBtnToggle` — Grupo de botões com seleção exclusiva (radio-like)
- [ ] `DssOptionGroup` — Grupo de Radio, Checkbox ou Toggle com label

### Família: Lista e Itens

- [x] ~~`DssItem`~~ ✅ **SELADO** (Fase 1)
- [ ] `DssList` — Container de lista com suporte a separadores e bordas
- [ ] `DssItemSection` — Seção dentro de um DssItem (avatar, conteúdo, ação)
- [ ] `DssItemLabel` — Label hierárquico dentro de DssItem (header, caption, overline)

### Família: Tabs

- [ ] `DssTab` — Aba individual (base para DssTabs)
- [ ] `DssTabPanel` — Painel de conteúdo associado a uma aba

### Família: Navegação Estrutural

- [ ] `DssBreadcrumbsEl` — Elemento individual de breadcrumb
- [ ] `DssStep` — Passo individual de stepper
- [ ] `DssPagination` — Controle de paginação

### Família: Overlays e Dialogs

- [ ] `DssDialog` — Modal/Dialog com slot de conteúdo livre
- [ ] `DssPopupEdit` — Edição inline em popup (clique para editar)

### Família: Scroll e Virtualização

- [ ] `DssVirtualScroll` — Lista virtualizada para grandes volumes de dados
- [ ] `DssInfiniteScroll` — Carregamento progressivo por scroll

### Família: Expansão e Colapso

- [ ] `DssExpansionItem` — Item expansível com animação (accordion)

### Família: Estrutura de Página (Base)

- [ ] `DssToolbar` — Barra de ações horizontal (base para Header/Footer)

### Família: Mídia e Visualização

- [ ] `DssImg` — Imagem com lazy load, placeholder e aspect ratio
- [ ] `DssVideo` — Embed de vídeo responsivo
- [ ] `DssParallax` — Efeito parallax em imagens de fundo

### Família: Progresso e Feedback

- [ ] `DssLinearProgress` — Barra de progresso linear (determinada e indeterminada)
- [ ] `DssCircularProgress` — Progresso circular (determinado e indeterminado)
- [ ] `DssInnerLoading` — Overlay de loading sobre um container
- [ ] `DssSkeleton` — Placeholder de carregamento (skeleton screen)
- [ ] `DssAjaxBar` — Barra de progresso global para requisições Ajax

### Família: Inputs Especializados

- [ ] `DssKnob` — Controle rotativo (dial) para valores numéricos
- [ ] `DssRating` — Avaliação por estrelas (ou ícones customizados)

### Família: Layout Auxiliar

- [ ] `DssScrollArea` — Área com scroll customizado (scrollbar estilizada)
- [ ] `DssSplitter` — Divisor redimensionável entre dois painéis
- [ ] `DssResponsive` — Container que mantém aspect ratio responsivo

### Família: Tabela Simples

- [ ] `DssMarkupTable` — Tabela HTML semântica com estilos DSS

### Família: Notificações e Alertas

- [ ] `DssBanner` — Faixa de notificação persistente (info, warning, error)
- [ ] `DssBar` — Barra de sistema (título de janela, barra mobile)

### Família: Interação Gestual

- [ ] `DssPullToRefresh` — Gesto de arrastar para atualizar (mobile)
- [ ] `DssSlideItem` — Item de lista com ações deslizáveis (swipe)

---

## Nível 2 — Composição de Primeiro Grau

*Só podem ser iniciados após os componentes do Nível 1 que os bloqueiam estarem selados.*

### Família: Tabs (completa)

- [ ] `DssTabs` 🔒 *(aguarda DssTab)*
- [ ] `DssTabPanels` 🔒 *(aguarda DssTabPanel)*
- [ ] `DssRouteTab` 🔒 *(aguarda DssTab)*

### Família: Navegação

- [ ] `DssBreadcrumbs` 🔒 *(aguarda DssBreadcrumbsEl)*
- [ ] `DssStepper` 🔒 *(aguarda DssStep)*
- [ ] `DssMenu` 🔒 *(aguarda DssList, DssItem)*
- [ ] `DssBottomSheet` 🔒 *(aguarda DssList, DssItem)*

### Família: FAB

- [ ] `DssFab` 🔒 *(aguarda DssButton, DssIcon — base para DssFabAction)*

### Família: Estrutura de Página

- [ ] `DssToolbarTitle` 🔒 *(aguarda DssToolbar)*

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

- [ ] `DssHeader` 🔒 *(aguarda DssToolbar)*
- [ ] `DssFooter` 🔒 *(aguarda DssToolbar)*
- [ ] `DssDrawer` 🔒 *(aguarda DssList, DssMenu)*

### Família: Inputs de Data/Hora

- [ ] `DssTimePicker` 🔒 *(aguarda DssIcon, DssButton)*
- [ ] `DssDatePicker` 🔒 *(aguarda DssIcon, DssButton, DssBtnGroup)*
- [ ] `DssColorPicker` 🔒 *(aguarda DssInput, DssSlider)*

---

## Nível 4 — Layouts e Alta Complexidade

*O topo da cadeia de dependências.*

### Família: Layout Global

- [ ] `DssLayout` 🔒 *(aguarda DssHeader, DssFooter, DssDrawer)*
- [ ] `DssPage` 🔒 *(aguarda DssLayout)*
- [ ] `DssPageContainer` 🔒 *(aguarda DssLayout)*
- [ ] `DssPageSticky` 🔒 *(aguarda DssLayout)*
- [ ] `DssPageScroller` 🔒 *(aguarda DssLayout)*

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
| Fase 2 — Nível 1 | 37 | 1 | 3% |
| Fase 2 — Nível 2 | 16 | 0 | 0% |
| Fase 2 — Nível 3 | 7 | 0 | 0% |
| Fase 2 — Nível 4 | 7 | 0 | 0% |
| **Fase 2 Total** | **67** | **1** | **1%** |
| Fase 3 | 6 | N/A | — |
