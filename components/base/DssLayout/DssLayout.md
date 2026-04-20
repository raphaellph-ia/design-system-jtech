# DssLayout — Documentação Normativa

> **DSS v2.2 — Status: Pendente de auditoria formal**
>
> Golden Reference: DssCard | Golden Context: DssHeader

---

## 1. Visão Geral

### O que é

DssLayout é o container raiz da aplicação DSS. Wrapper governado sobre `QLayout` do Quasar, ele gerencia a matemática de posicionamento entre header, drawers, footer e conteúdo de página — calculando automaticamente os offsets necessários para que o conteúdo não fique oculto sob elementos fixos.

É o componente de **Nível 4** da Fase 2: o nível mais alto de composição, que orquestra todos os componentes estruturais de Nível 3 (`DssHeader`, `DssFooter`, `DssDrawer`).

### Quando usar

- Como invólucro raiz de qualquer aplicação ou módulo principal DSS
- Quando a aplicação requer header, footer ou drawer fixos com cálculo automático de margens
- Quando o conteúdo da página precisa respeitar as áreas seguras dos elementos de layout fixos

### Quando NÃO usar

- Para layouts parciais ou seções de página — use `DssCard` com layout interno
- Para wrappers de conteúdo sem header/drawer — use `div` com classes utilitárias
- Dentro de outro `DssLayout` sem necessidade real (prefer `container=true`)

---

## 2. Anatomia

```
┌──────────────────────────────────────────────────────────────┐
│  DssHeader (Nível 3)          role="banner"                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  DssToolbar                                              │ │
│  └──────────────────────────────────────────────────────────┘ │
├────────┬─────────────────────────────────────────────────────┤
│ Drawer │  DssPageContainer                                    │
│ esq.   │  ┌───────────────────────────────────────────────┐  │
│ nav    │  │  DssPage  (role="main")                       │  │
│        │  │  Conteúdo da aplicação                        │  │
│        │  └───────────────────────────────────────────────┘  │
├────────┴─────────────────────────────────────────────────────┤
│  DssFooter (Nível 3)          role="contentinfo"             │
└──────────────────────────────────────────────────────────────┘
```

### Elementos

| Elemento | Seletor CSS | Descrição |
|----------|-------------|-----------|
| Container | `.dss-layout` | Elemento raiz — wrapper do q-layout |
| Header (filho) | via slot | `DssHeader` — posicionado no topo |
| Drawers (filhos) | via slot | `DssDrawer` — laterais esquerdo/direito |
| Page Container (filho) | via slot | `DssPageContainer` / `q-page-container` |
| Footer (filho) | via slot | `DssFooter` — posicionado na base |

---

## 3. API Pública

### Props permitidas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `view` | `string` | `'hHh lpR fFf'` | Configuração estrutural do layout. Padrão corporativo DSS. Ver seção 3.3. |
| `container` | `boolean` | `false` | Quando true, o layout respeita as dimensões do elemento pai em vez da janela inteira. |

### Props bloqueadas

| Prop | Motivo |
|------|--------|
| `dark` | Dark mode governado por `[data-theme="dark"]` via tokens CSS — consistência com DssHeader, DssDrawer, DssFooter. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Estrutura de layout. Deve conter exclusivamente: `DssHeader`, `DssDrawer`, `DssFooter`, `DssPageContainer` (ou equivalentes Quasar durante desenvolvimento). |

### Eventos

DssLayout não emite eventos próprios.

### 3.3 Configuração de View

O padrão `'hHh lpR fFf'` define:

```
h H h    → Header: responsivo | fixo-desktop | responsivo
l p R    → Left drawer responsivo | página | Right drawer fixo
f F f    → Footer: responsivo | fixo-desktop | responsivo
```

| Letra | Significado |
|-------|-------------|
| Minúscula | Responsivo (colapsa em mobile) |
| Maiúscula | Fixo (sempre visível no desktop) |
| `h/H` | Header row |
| `l/L` | Left drawer |
| `p` | Page (sempre presente) |
| `r/R` | Right drawer |
| `f/F` | Footer row |

---

## 4. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-muted` | Background base da aplicação (~#f5f5f5 light / escuro em dark) |
| `--dss-text-body` | Cor de texto padrão da aplicação |

> **Nota:** DssLayout propositalmente usa poucos tokens. A identidade visual é responsabilidade dos componentes filhos (DssHeader, DssToolbar, DssDrawer).

---

## 5. Estados Visuais

### Aplicáveis

| Estado | Como ativar | Visual |
|--------|------------|--------|
| **Dark mode** | `[data-theme="dark"]` no ancestral | `--dss-surface-muted` resolve para superfície escura |

### Não aplicáveis

| Estado | Justificativa |
|--------|--------------|
| `hover` / `focus` / `active` / `disabled` | Container raiz não-interativo — Gate de Responsabilidade v2.4 |
| `loading` | Responsabilidade do DssPage ou componente de conteúdo |
| `error` | Responsabilidade dos componentes de formulário filhos |
| `indeterminate` | Não aplicável a containers |

---

## 6. Governança

### Composição

DssLayout é o container de Nível 4 da hierarquia DSS:

```
Nível 4: DssLayout
  Nível 3: DssHeader, DssFooter, DssDrawer
    Nível 2: DssToolbar, DssList, DssMenu (filhos dos Nível 3)
      Nível 1: DssButton, DssIcon, DssItem (filhos dos Nível 2)
```

**Regras de composição:**

- O slot `default` aceita **exclusivamente** componentes estruturais de layout
- DssLayout não estiliza seus filhos internamente
- DssLayout não assume presença de componentes específicos no slot
- A matemática de offsets (margem-topo, margem-baixo) é calculada automaticamente pelo QLayout via `provide/inject` interno

**Anti-patterns:**

- Colocar HTML nativo ou texto solto no slot
- Usar `DssCard` como filho direto (deve estar dentro de `DssPageContainer/DssPage`)
- Sobrescrever `--q-header-offset` ou `--q-footer-offset` manualmente
- Declarar `data-brand` no `DssLayout` (deve estar no elemento raiz da app)
- Aninhar dois `DssLayout` sem a prop `container=true` no filho

### Exceções ao Gate de Composição v2.4

**EXC-01 — QLayout como elemento raiz (Gate Regra 1)**

`DssLayout` usa `<q-layout>` diretamente como raiz. Envolver em `<div>` quebraria o `provide/inject` interno do QLayout que calcula e distribui offsets para os filhos. Precedente canônico: `DssHeader` (`<q-header>`), `DssDrawer` (`<q-drawer>`).

**EXC-02 — `!important` em `background-color`**

Necessário para garantir que `--dss-surface-muted` prevaleça sobre estilos globais do Quasar. Precedente: `DssHeader`, `DssDrawer`, `DssFooter`.

**EXC-03 — System color keywords em `forced-colors`**

`Canvas`, `CanvasText` são obrigatórios. Tokens CSS são ignorados neste modo.

**EXC-04 — `#fff !important` / `#000 !important` em `print`**

Legibilidade monocromática. Padrão canônico DSS.

**EXC-05 — `q-page-container` e `q-page` no `.example.vue`**

`DssPageContainer` e `DssPage` são `compositionFuture`. Isenção formal para arquivo de exemplo conforme `DSS_IMPLEMENTATION_GUIDE.md`.

---

## 7. Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Semântica de página | Fornecida pelos filhos: `DssHeader` (banner), `DssDrawer` (navigation), `DssPage` (main), `DssFooter` (contentinfo) |
| Role no DssLayout | Nenhum forçado — `DssLayout` é container neutro |
| Touch target | Não aplicável — container não-interativo |
| Contraste | `--dss-surface-muted` vs `--dss-surface-default` (cards) garante hierarquia visual |
| Forced colors | `Canvas` / `CanvasText` via EXC-03 |
| Print | Background e texto monocromáticos via EXC-04 |

---

## 8. Comportamentos Implícitos

### Forwarding de atributos

`inheritAttrs: false` + `v-bind="$attrs"` no `<q-layout>`. Atributos HTML adicionais são encaminhados diretamente ao QLayout (ex.: `aria-label`, `data-*`).

### Matemática de offsets (QLayout interno)

O QLayout usa `provide/inject` para comunicar-se com filhos registrados. Quando um `QHeader` é adicionado ao slot, o QLayout calcula automaticamente `--q-header-offset` e o injeta no `QPageContainer` para que o conteúdo não fique oculto sob o header fixo. O `DssLayout` não interfere neste mecanismo — herda o comportamento integral do QLayout.

### Container mode

Com `container=true`, o QLayout muda de `position: fixed` (para `<body>`) para `position: relative` (para o elemento pai), permitindo que o layout coexista com outros elementos da página.

---

## 9. Matriz de Composição DSS

| Componente | Nível | Status | Papel no DssLayout |
|-----------|-------|--------|--------------------|
| `DssHeader` | 3 | ✅ Selado v2.2 | Header fixo/responsivo |
| `DssFooter` | 3 | ✅ Selado v2.2 | Footer fixo/responsivo |
| `DssDrawer` | 3 | ✅ Selado v2.2 | Drawer lateral esq./dir. |
| `DssPageContainer` | 3 | ⚪ compositionFuture | Container de página com offset automático |
| `DssPage` | 3 | ⚪ compositionFuture | Área de conteúdo principal |

> **Lacuna crítica:** `DssPageContainer` e `DssPage` são estruturalmente necessários para o fluxo completo. Devem ser priorizados na Fase 2 após o DssLayout ser selado.

---

## 10. Paridade com Golden Reference (DssCard) e Golden Context (DssHeader)

| Aspecto | DssCard | DssHeader | DssLayout | Divergência intencional |
|---------|---------|-----------|-----------|------------------------|
| `defineOptions` | Sim | Sim | Sim | — |
| `inheritAttrs: false` | Sim | Sim | Sim | — |
| `v-bind="$attrs"` | No elemento raiz | No `<q-header>` | No `<q-layout>` | — |
| Touch target | Não aplicável | Não aplicável | Não aplicável | — |
| Background token | `--dss-surface-default` | `--dss-surface-default` | `--dss-surface-muted` | ✓ Layout usa superfície rebaixada para criar contraste com cards |
| Dark mode | Sim | Sim | Sim | — |
| Forced-colors | Canvas keywords | Canvas keywords | Canvas keywords | — |
| Print hardcoded | Sim | Sim | Sim | — |
| Brands | Sim (variants) | Não (filhos) | Não (filhos) | ✓ DssLayout é canvas neutro |
| Elemento raiz Quasar | `<q-card>` | `<q-header>` | `<q-layout>` | ✓ Primitivo Quasar específico |

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 2026-04-20 | 1.0.0 | Criação inicial — pronto para auditoria DSS v2.2 |
