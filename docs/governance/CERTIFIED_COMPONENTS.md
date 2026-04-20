# Componentes Certificados DSS

Índice oficial de componentes com Selo de Conformidade DSS.

> Este arquivo é mantido pelo Agente de Governança DSS. Cada entrada corresponde a um componente que passou pela auditoria final completa e recebeu selo aprovado. Última atualização: **20 de Abril de 2026**.

---

## Fase 1 — Componentes Atômicos (19/19 — 100%)

| Componente | Categoria | Data do Selo | Golden Reference | Golden Context | Observação |
|---|---|---|---|---|---|
| `DssChip` | Compact Control interativo | 27/01/2026 | **Sim** (interativo) | DssChip (auto) | Golden Reference oficial |
| `DssBadge` | Compact Control não-interativo | 27/01/2026 | **Sim** (não-interativo) | DssChip | Golden Reference oficial |
| `DssButton` | Ação primária interativa | 20/01/2026 | — | DssChip | Golden Sample de documentação |
| `DssToggle` | Controle de estado binário | 05/02/2026 | — | DssChip | — |
| `DssCheckbox` | Compact Control interativo | 01/02/2026 | — | DssChip | 3 ressalvas não-bloqueantes |
| `DssRadio` | Compact Control interativo | 05/02/2026 | — | DssChip | — |
| `DssAvatar` | Visual/Identity | 02/02/2026 | — | DssChip | 2 ressalvas; 6 exceções documentadas |
| `DssIcon` | Ícone decorativo/semântico | 13/02/2026 | — | DssChip | — |
| `DssInput` | Campo de entrada de texto | 04/02/2026 | — | DssChip | — |
| `DssTextarea` | Campo de texto multilinha | 19/03/2026 | — | DssInput | — |
| `DssSelect` | Seleção por dropdown | 20/03/2026 | — | DssInput | — |
| `DssSlider` | Controle deslizante | 20/03/2026 | — | DssChip | — |
| `DssRange` | Controle de intervalo | 23/03/2026 | — | DssSlider | — |
| `DssSeparator` | Divisor visual | 17/03/2026 | — | DssChip | — |
| `DssSpace` | Espaçador flexível | 18/03/2026 | — | DssChip | — |
| `DssSpinner` | Indicador de carregamento | 24/03/2026 | — | DssChip | — |
| `DssTooltip` | Dica contextual | 06/02/2026 | — | DssChip | — |
| `DssItem` | Item de lista | — | — | DssChip | Retroativo — Fase 1 |
| `DssFile` | Upload de arquivo | 24/03/2026 | — | DssInput | — |

---

## Fase 2 — Componentes Compostos (22/66 — 33%)

| Componente | Nível | Categoria | Data do Selo | Golden Reference | Golden Context | Observação |
|---|---|---|---|---|---|---|
| `DssCard` | 1 | Superfície e Layout | 12/02/2026 | — | DssChip | — |
| `DssBtnGroup` | 1 | Botões e Controles de Grupo | — | — | DssButton | — |
| `DssBtnDropdown` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssButton | — |
| `DssBtnToggle` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssButton | — |
| `DssOptionGroup` | 1 | Botões e Controles de Grupo | 27/03/2026 | — | DssCheckbox | — |
| `DssItemSection` | 1 | Lista e Itens | — | — | DssItem | — |
| `DssItemLabel` | 1 | Lista e Itens | **20/04/2026** | — | DssItem | **Selado hoje** |
| `DssList` | 1 | Lista e Itens | 31/03/2026 | — | DssItem | — |
| `DssTab` | 1 | Tabs | 01/04/2026 | — | DssChip | — |
| `DssTabPanel` | 1 | Tabs | 09/04/2026 | — | DssTab | — |
| `DssBreadcrumbsEl` | 1 | Navegação Estrutural | 10/04/2026 | — | DssChip | — |
| `DssStep` | 1 | Navegação Estrutural | **20/04/2026** | — | DssTabs | **Selado hoje** |
| `DssToolbar` | 1 | Estrutura de Página | 16/04/2026 | DssCard | DssTabs | 4 gaps de pré-prompt corrigidos |
| `DssTabs` | 2 | Tabs | 02/04/2026 | — | DssTab | — |
| `DssTabPanels` | 2 | Tabs | 09/04/2026 | — | DssTabPanel | — |
| `DssRouteTab` | 2 | Tabs | 10/04/2026 | — | DssTab | — |
| `DssBreadcrumbs` | 2 | Navegação | 11/04/2026 | — | DssBreadcrumbsEl | — |
| `DssMenu` | 2 | Navegação / Overlays | 18/04/2026 | DssTooltip | DssList | CSS global por teleport QMenu |
| `DssHeader` | 3 | Estrutura de Página | 17/04/2026 | DssCard | DssToolbar | 2 NCs resolvidas; GAP-03 escalado |
| `DssFooter` | 3 | Estrutura de Página | 18/04/2026 | DssCard | DssHeader | EXC-05: sombra upward pendente token |
| `DssDrawer` | 3 | Estrutura de Página | **20/04/2026** | — | DssList | **Selado hoje** |
| `DssLayout` | 4 | Layout Global | **20/04/2026** | — | DssHeader + DssFooter | **Selado hoje — desbloqueia DssPage** |

---

## Resumo por Ciclo

| Período | Componentes Selados | Destaques |
|---|---|---|
| Jan–Fev 2026 | 10 | Fundação atômica: Chip, Badge, Button, Toggle, Checkbox, Radio, Avatar, Icon, Input, Tooltip |
| Mar 2026 | 9 | Inputs especializados: Textarea, Select, Slider, Range, Separator, Space, Spinner, File, BtnDropdown/Toggle/OptionGroup |
| Abr 1–15, 2026 | 9 | Navegação e Tabs: Tab, TabPanel, Tabs, TabPanels, RouteTab, BreadcrumbsEl, Breadcrumbs, Toolbar, Header |
| **Abr 16–20, 2026** | **6** | **Layout completo: Footer, Menu, Drawer, Layout, Step, ItemLabel** |

---

## Legenda

- **Golden Reference:** Referência normativa global para toda a categoria de componentes.
- **Golden Context:** Baseline específico usado para auditar aquele componente.
- **Golden Sample:** Referência de documentação (Template 13.1) — não listado como certificação arquitetural.

---

## Documentos Relacionados

- [DSS_GOLDEN_COMPONENTS.md](./DSS_GOLDEN_COMPONENTS.md) — Modelo de Governança Golden (definições formais)
- [CLAUDE.md](../../CLAUDE.md) — Documento normativo vinculante (Princípio #9)
- [DSS_COMPONENT_ARCHITECTURE.md](../reference/DSS_COMPONENT_ARCHITECTURE.md) — Arquitetura de 4 camadas
- [DSS_TOKEN_REFERENCE.md](../reference/DSS_TOKEN_REFERENCE.md) — Catálogo oficial de tokens

---

**Design System Sansys — Governança DSS v2.2 · Última atualização: 20 de Abril de 2026**
