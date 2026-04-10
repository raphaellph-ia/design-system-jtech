# DssRouteTab — Documentação Normativa

**Versão:** 1.0.0 · **Fase:** 2 · **Categoria:** Elemento interativo de navegação por abas com roteamento
**Status:** Pronto para Auditoria DSS v2.2

---

## 1. Visão Geral

O `DssRouteTab` é um **wrapper DSS Fase 2** sobre o `QRouteTab` do Quasar Framework. É a variante roteável do `DssTab` — visualmente idêntico, mas com capacidade de acionar navegação Vue Router via prop `to`, além de suportar correspondência exata de rota (`exact`), substituição de histórico (`replace`) e links externos (`href` + `target`).

**Golden Reference:** `DssTab` (irmão arquitetural direto — mesma família, mesmo nível, mesma infraestrutura CSS)
**Golden Context:** `DssTabs` (container pai obrigatório — gerencia estado de rota ativa e seleção)

---

## 2. Classificação

| Atributo | Valor |
|----------|-------|
| **Fase** | 2 — Componente interativo de seleção com roteamento |
| **Nível** | 1 Independente (wrapper sobre primitivo Quasar) |
| **Categoria** | Elemento interativo de navegação por abas com Vue Router |
| **Interativo** | Sim (hover, focus, active, disabled, selected/rota) |
| **Dependência DSS** | Nenhuma direta (wrapper sobre QRouteTab; reusa CSS do DssTab) |
| **Contexto pai obrigatório** | `DssTabs` (ou `q-tabs` em scaffolding) |

---

## 3. Quando usar

**Use `DssRouteTab` quando:**
- Construindo navegação por abas que altera a rota da aplicação (SPA com Vue Router)
- Cada aba corresponde a uma rota Vue Router distinta
- Precisar de links externos em contexto de tabs (`href` + `target="_blank"`)
- Precisar de controle sobre o comportamento do histórico de navegação (`replace`)

**NÃO use `DssRouteTab` quando:**
- A navegação por abas não envolve Vue Router → usar `DssTab`
- Precisar de um botão de ação → usar `DssButton`
- Precisar de item de lista navegável → usar `DssItem`
- O link de rota for isolado (fora de um contexto de tabs) → usar `<RouterLink>`

---

## 4. Arquitetura

### 4.1 Estrutura de arquivos

```
DssRouteTab/
├── 1-structure/
│   └── DssRouteTab.ts.vue          ← Implementação canônica
├── 2-composition/
│   └── _base.scss                  ← Comentário normativo (estilos herdados)
├── 3-variants/
│   ├── _icon.scss                  ← Comentário normativo (herdado via .dss-tab)
│   └── index.scss
├── 4-output/
│   ├── _brands.scss                ← Comentário normativo (herdado via .dss-tab)
│   ├── _states.scss                ← Comentário normativo (herdado via .dss-tab)
│   └── index.scss
├── composables/
│   ├── useRouteTabClasses.ts       ← Lógica de classes (mirror de useTabClasses)
│   └── index.ts
├── types/
│   └── route-tab.types.ts          ← RouteTabProps, RouteTabSlots
├── DssRouteTab.module.scss         ← Orchestrador SCSS (importa DssTab.module.scss)
├── DssRouteTab.vue                 ← Entry point wrapper (re-export)
├── DssRouteTab.example.vue         ← 5 cenários de uso
├── dss.meta.json
├── index.js
├── README.md
├── DssRouteTab.md                  ← Este arquivo
└── DSSROUTETAB_API.md
```

### 4.2 Hierarquia de composição

```
DssTabs (ou q-tabs)
└── DssRouteTab                     ← Este componente
    └── q-route-tab (Quasar)        ← Primitivo encapsulado
        └── RouterLink / <a>        ← Renderizado pelo QRouteTab conforme `to`/`href`
```

### 4.3 Estratégia de CSS compartilhado

**Decisão arquitetural central:** `DssRouteTab` aplica a classe `.dss-tab` — a **mesma classe base** do `DssTab`. Toda a infraestrutura CSS (base, variantes, estados, brands) é fornecida pelo `DssTab.module.scss`, importado explicitamente no `DssRouteTab.module.scss`.

**Justificativa (pré-prompt §2.1):**
> "The preferred approach is that the `DssRouteTab` applies the same CSS classes (`.dss-tab`) that the `DssTab` does."

**Benefícios:**
- Zero duplicação de tokens ou seletores
- Paridade visual garantida por design (não por convenção)
- Qualquer correção aplicada ao DssTab se propaga automaticamente ao DssRouteTab

**Deduplicação em produção:** em projetos onde `DssTab` e `DssRouteTab` coexistem, bundlers (Vite/webpack) deduplicam CSS idêntico na build final. Nenhuma ação adicional é necessária pelo consumidor.

---

## 5. Props

### 5.1 Props expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `String \| Number` | — | **Obrigatório.** Identificador único para o `v-model` do `DssTabs` pai |
| `label` | `String` | `undefined` | Texto exibido na aba |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons. Sem `label`, renderiza somente ícone |
| `alert` | `Boolean \| String` | `undefined` | Indicador de alerta (`true` = cor padrão; `string` = cor Quasar) |
| `disable` | `Boolean` | `false` | Desabilita interação |
| `to` | `String \| Object` | `undefined` | Rota Vue Router. Path ou objeto `{ name, params, query }` |
| `exact` | `Boolean` | `false` | Correspondência exata de rota — ativa apenas em match exato |
| `replace` | `Boolean` | `false` | Substitui entrada no histórico (sem `history.pushState`) |
| `href` | `String` | `undefined` | URL de link externo (fallback ao `to` para recursos externos) |
| `target` | `String` | `undefined` | Target do link (ex.: `"_blank"` para nova aba) |

### 5.2 Props bloqueadas

| Prop | Motivo do bloqueio |
|------|-------------------|
| `ripple` | Sempre `:ripple="false"`. O DSS não usa o sistema de ripple — feedback visual via overlay `::after` com tokens de opacidade |
| `no-caps` | Transformação de texto é responsabilidade do sistema de tokens DSS |
| `color` | Cores governadas por tokens DSS e brands; não configurável pelo consumidor |
| `text-color` | Idem `color` |

---

## 6. Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado da aba. Quando fornecido, substitui o conteúdo padrão (ícone + label) |

---

## 7. Eventos

**Nenhum.** A navegação de rota é gerenciada pelo `DssTabs` pai via integração Vue Router + Quasar. `DssRouteTab` não emite eventos adicionais.

---

## 8. Estados

### 8.1 Estado padrão (não selecionado)

- Herda de `.dss-tab` via `DssTab.module.scss`
- `color`: `var(--dss-text-subtle)`
- `font-weight`: `var(--dss-font-weight-normal)` (400)

### 8.2 Hover

- Overlay `::after` com `background-color: currentColor`
- `opacity`: `var(--dss-opacity-hover)`
- Condicional: `@media (hover: hover)` — não ativa em touch devices
- Excluído quando `.dss-tab--disable`

### 8.3 Active (pressionado)

- Mesmo mecanismo `::after` do hover
- `opacity`: `var(--dss-opacity-active)`
- Excluído quando `.dss-tab--disable`

### 8.4 Focus (teclado)

- `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)`
- `outline-offset: calc(-1 * var(--dss-border-width-md))` (interno)
- Ativado via `:focus-visible` (apenas teclado)
- Em `prefers-contrast: more`: outline usa `--dss-border-width-thick`

### 8.5 Selecionado / Rota ativa

- Governado pelo `DssTabs` pai via `.q-tab--active` / `aria-selected="true"` (Quasar)
- `color`: `var(--dss-action-primary)`
- `font-weight`: `var(--dss-font-weight-medium)` (500)
- Indicador: `height: var(--dss-border-width-thick)`, `background-color: currentColor`
- **`exact: true`:** ativa somente em correspondência exata de rota
- **`exact: false` (padrão):** ativa em qualquer rota que começa com `to`

### 8.6 Desabilitado

- Classe: `dss-tab--disable`
- `opacity`: `var(--dss-opacity-disabled)` (0.4)
- `cursor: not-allowed`
- `pointer-events: none`
- A rota de destino **não é acionada**

---

## 9. Acessibilidade

| Critério | Implementação |
|----------|---------------|
| **Role** | `tab` (herdado do `QRouteTab` — elemento de navegação por abas) |
| **Touch target** | `min-height: var(--dss-touch-target-md)` — WCAG 2.5.5 (48px) |
| **`::before`** | **Não usado** — `min-height` é suficiente (QRouteTab é block-level) |
| **Teclado** | Setas ← → navegam entre abas (gerenciado pelo `DssTabs`); Enter/Space aciona rota |
| **`aria-selected`** | Gerenciado pelo `DssTabs` pai via Vue Router |
| **`aria-controls`** | Gerenciado pelo `DssTabs` pai |
| **WCAG 2.1 AA** | Conforme via tokens DSS |
| **forced-colors** | `ButtonText`, `GrayText`, `Highlight` (EXC-02 — herdado via `.dss-tab`) |

### Navegação por teclado (gerenciada pelo DssTabs)

| Tecla | Ação |
|-------|------|
| `←` | Move foco para a aba anterior |
| `→` | Move foco para a próxima aba |
| `Home` | Move foco para a primeira aba |
| `End` | Move foco para a última aba |
| `Enter` / `Space` | Seleciona a aba e aciona a navegação de rota |

### Links externos (target="_blank")

Quando `href` e `target="_blank"` são combinados, o QRouteTab renderiza um `<a>` nativo. O comportamento de abertura em nova aba é gerenciado pelo browser, sem ação adicional necessária.

---

## 10. Brandabilidade

Idêntica ao `DssTab` — herdada via classe `.dss-tab`:

| Brand | Cor ativa | Token |
|-------|-----------|-------|
| Hub (padrão) | Laranja | `--dss-hub-600` |
| Water | Azul | `--dss-water-600` |
| Waste | Verde | `--dss-waste-600` |

### Modo contextual (recomendado)

```vue
<div data-brand="water">
  <DssTabs v-model="route">
    <DssRouteTab name="home" label="Início" to="/home" />
  </DssTabs>
</div>
```

### Modo direto (alternativo)

```vue
<DssTabs v-model="route">
  <DssRouteTab name="docs" label="Documentação" to="/docs" class="dss-tab--brand-hub" />
</DssTabs>
```

---

## 11. Tokens utilizados

| Token | Categoria | Uso |
|-------|-----------|-----|
| `--dss-font-family-sans` | Tipografia | Família base |
| `--dss-font-size-sm` | Tipografia | Tamanho do texto (14px) |
| `--dss-font-weight-normal` | Tipografia | Peso padrão (400) |
| `--dss-font-weight-medium` | Tipografia | Peso selecionado (500) |
| `--dss-line-height-tight` | Tipografia | Altura de linha (1.25) |
| `--dss-text-subtle` | Cor | Texto padrão |
| `--dss-text-inverse` | Cor | Texto em dark mode |
| `--dss-action-primary` | Cor | Texto/indicador selecionado |
| `--dss-opacity-hover` | Interação | Intensidade overlay hover |
| `--dss-opacity-active` | Interação | Intensidade overlay pressed |
| `--dss-opacity-disabled` | Interação | Opacidade desabilitado (0.4) |
| `--dss-focus-ring` | Acessibilidade | Cor do focus ring |
| `--dss-border-width-md` | Borda | Espessura do focus ring |
| `--dss-border-width-thick` | Borda | Espessura do indicador ativo |
| `--dss-touch-target-md` | Dimensão | Altura mínima (48px) — WCAG 2.5.5 |
| `--dss-spacing-3` | Espaçamento | Padding block (12px) e aba somente ícone |
| `--dss-spacing-4` | Espaçamento | Padding inline padrão (16px) |
| `--dss-duration-150` | Motion | Duração de transições |
| `--dss-easing-standard` | Motion | Curva `cubic-bezier(0.4,0,0.2,1)` |
| `--dss-hub-600` | Brand | Cor ativa Hub |
| `--dss-water-600` | Brand | Cor ativa Water |
| `--dss-waste-600` | Brand | Cor ativa Waste |

**Total: 23 tokens** — todos fornecidos pelo `DssTab.module.scss` importado. Nenhum token exclusivo do `DssRouteTab`.

---

## 12. Exceções formalizadas

### EXC-01 — Gate de Composição v2.4 Regra 1 + Regra 2

**Localização:** `DssTab.module.scss` (importado) — `2-composition/_base.scss` + `4-output/_states.scss` do DssTab

**Seletores:** `.dss-tab .q-tab__indicator`

**Gates violados:**
- Regra 1: O componente usa `<q-route-tab>` (primitivo Quasar) diretamente
- Regra 2: O SCSS sobrescreve classes internas do Quasar (`.q-tab__indicator`)

**Justificativa (Regra 1):** `DssRouteTab` é um wrapper Nível 1 Independente — não existe componente DSS Fase 1 equivalente para compor. A integração Vue Router nativa do `QRouteTab` (renderização como `<RouterLink>` ou `<a>`) não pode ser reimplementada sem o primitivo Quasar. Precedente direto: `DssTab` EXC-01 (usa `<q-tab>`).

**Justificativa (Regra 2):** Os seletores `.dss-tab .q-tab__indicator` herdados do `DssTab.module.scss` sobrescrevem CSS hardcoded do `QRouteTab` (que herda a estrutura do `QTab`) com tokens DSS. A classe `.dss-tab` aplicada pelo `DssRouteTab` garante cobertura automática por esses seletores.

### EXC-02 — System Color Keywords em forced-colors

**Localização:** `DssTab/4-output/_states.scss` (importado)

**Valores:** `ButtonText` (padrão), `GrayText` (desabilitado), `Highlight` (ativo)

**Justificativa:** Em `@media (forced-colors: active)`, tokens CSS são ignorados pelo navegador. System color keywords são obrigatórios. Herdados via `.dss-tab` (classe compartilhada). Padrão canônico DSS.

### EXC-03 — `#000 !important` em print

**Localização:** `DssTab/4-output/_states.scss` (importado) — `@media print`

**Justificativa:** Impressão monocromática. Tokens CSS podem não ser resolvidos em contexto de impressão. Herdado via `.dss-tab`. Padrão canônico DSS.

---

## 13. Exceções aos Gates v2.4

### GATE-EXC-01 — Gate de Composição v2.4 — Regra 1: Uso direto de componente Quasar

| Campo | Valor |
|-------|-------|
| **Local** | `1-structure/DssRouteTab.ts.vue` — template |
| **Componente Quasar** | `<q-route-tab>` |
| **Decisão arquitetural** | DssRouteTab é wrapper Nível 1 sobre QRouteTab. O QRouteTab gerencia o roteamento Vue Router, a renderização condicional como `<RouterLink>` ou `<a>`, e os atributos de link — funcionalidade que não pode ser reimplementada sem o primitivo Quasar. Gate passa conforme Diretriz: "wrapper Nível 1 Independente". Precedente: DssTab (Golden Reference) usa `<q-tab>` pelo mesmo motivo. |

---

## 14. Anti-padrões

| Anti-padrão | Alternativa |
|-------------|-------------|
| Usar `DssRouteTab` fora de `DssTabs` | Usar como filho direto de `DssTabs` |
| Usar `DssRouteTab` sem Vue Router instalado | Usar `DssTab` para navegação sem roteamento |
| Aplicar cor de seleção via prop | Usar `[data-brand]` no container pai |
| Usar `DssRouteTab` como botão de ação | Usar `DssButton` |
| Combinar `to` e `href` na mesma aba | Usar apenas um mecanismo de navegação por aba |
| Dois `DssRouteTab` com o mesmo `name` no mesmo `DssTabs` | `name` deve ser único por instância |
| Usar `DssRouteTab` para links de âncora | Usar `href="#section"` em `DssButton` com variante flat |

---

## 15. Diferenças em relação ao DssTab e QRouteTab

| Aspecto | DssTab | DssRouteTab | QRouteTab |
|---------|--------|-------------|-----------|
| Quasar base | `QTab` | `QRouteTab` | — |
| Roteamento Vue Router | ❌ | ✅ (`to`, `exact`, `replace`) | ✅ |
| Links externos | ❌ | ✅ (`href`, `target`) | ✅ |
| Infraestrutura CSS | `.dss-tab` (own) | `.dss-tab` (DssTab shared) | — |
| Ripple | Bloqueado | Bloqueado | Configurável |
| Tokens DSS | ✅ | ✅ (herdados) | ❌ |
| Brandabilidade | ✅ | ✅ (herdada) | ❌ |
| Touch target (WCAG 2.5.5) | ✅ | ✅ (herdado) | Sem garantia |
