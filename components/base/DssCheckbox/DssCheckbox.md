# DssCheckbox

**Design System Sansys - Componente de Checkbox Interativo**

> 📦 **Componente Base DSS**
> Documentação seguindo o Template 13.1 do Design System Sansys.
> Estrutura obrigatória: 13 seções padronizadas com tokens rastreáveis, anti-patterns e governança.

---

## 1. Visão Geral

### Nome do Componente
`DssCheckbox`

### Descrição
Componente de checkbox do Design System Sansys baseado em `<input type="checkbox">` nativo, com API pública governada pelo DSS. Controle compacto interativo com suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Básico** — Compact Control interativo (Fase 1 — Atomic Controls).

### Golden Reference / Golden Context
**Golden Reference:** DssChip — Referencia normativa global para Compact Controls interativos.
**Golden Context:** DssChip — Referência estrutural para padrão de touch target `::before`, tokens genéricos de compact control e convenção de pseudo-elementos.

### Características Principais

- ✅ **Baseado em `<input type="checkbox">` nativo** — Acessibilidade nativa do browser (foco, teclado, `aria-checked`, `indeterminate`)
- ✅ **Acessibilidade WCAG 2.1 AA completa** — Touch targets, focus rings, navegação por teclado, ARIA, high contrast e reduced motion
- ✅ **Brandabilidade multi-marca** — Suporte automático a Hub, Water, Waste
- ✅ **3 modos de operação** — Toggle simples (boolean), ciclo de 3 estados (unchecked → checked → indeterminate), modo grupo (array)
- ✅ **Tokens rastreáveis** — Tokens de compact control, espaçamento, tipografia, bordas, motion e acessibilidade
- ✅ **Ícones como elementos reais** — Check (✓) e dash (—) são `<span class="material-icons">`, NUNCA pseudo-elementos

---

## 2. Quando Usar / Quando Não Usar

### ✅ Quando Usar

- **Seleção binária em formulários**: Campos de aceite, preferências, termos e condições
- **Seleção múltipla independente**: Cada checkbox opera independentemente (modo grupo com `val`)
- **Estado indeterminate**: Seleção parcial de grupo (ex.: "selecionar todos" com filhos parciais)
- **Filtros múltiplos**: Seleção de múltiplas opções de filtro em listas ou tabelas
- **Configurações binárias**: Habilitar/desabilitar funcionalidades em painéis de configuração

### ❌ Quando Não Usar

- **Seleção mutuamente exclusiva**: Use `DssRadio` quando apenas uma opção é permitida
- **Seleção em lista longa**: Use `DssSelect` com `multiple` para listas extensas
- **Ação imediata on/off**: Use toggle/switch dedicado quando a ação ocorre imediatamente
- **Botões de ação**: Use `DssButton` para CTAs
- **Tags visuais**: Use `DssChip` para chips/tags visuais

---

## 3. Anatomia do Componente

### Estrutura Visual

```
┌──────────────────────────────────────────────────────┐
│  [input hidden]  [■ control]  Label do Checkbox      │
│                   ├── ✓ (check icon, se checked)     │
│                   └── — (dash icon, se indeterminate) │
└──────────────────────────────────────────────────────┘
  │                  │              │
  │                  │              └── Label (<span>, via prop ou slot default)
  │                  └── Control indicator (<span>, visual, aria-hidden)
  └── Input nativo (<input type="checkbox">, sr-only, foco e teclado)
```

### Partes Internas

1. **Root (`<label class="dss-checkbox">`)**: Elemento raiz. `<label>` vincula automaticamente o input nativo.
2. **Native Input (`<input type="checkbox" class="dss-checkbox__native">`)**: Input oculto via sr-only. Controla foco, teclado, `aria-checked`, `indeterminate`.
3. **Control Indicator (`<span class="dss-checkbox__control">`)**: Caixa visual do checkbox. `aria-hidden="true"`.
4. **Check Icon (`<span class="dss-checkbox__check material-icons">`)**: Ícone "check" do Material Icons quando marcado. Elemento real `<span>`, NUNCA pseudo-elemento.
5. **Dash Icon (`<span class="dss-checkbox__dash material-icons">`)**: Ícone "remove" do Material Icons quando indeterminate. Elemento real `<span>`, NUNCA pseudo-elemento.
6. **Label (`<span class="dss-checkbox__label">`)**: Texto do label. Renderizado apenas quando há conteúdo (prop `label` ou slot `default`).

### Slots Disponíveis

| Slot | Descrição | Uso |
|------|-----------|-----|
| `default` | Conteúdo customizado do label | HTML formatado, ícones, links |

### Subcomponentes DSS Utilizados

**Nenhum** — DssCheckbox é um componente atômico que não depende de outros componentes DSS.

**Dependências externas:**
- Material Icons (obrigatória para ícones de check e dash)

---

## 4. Tokens Utilizados

O **DssCheckbox** consome tokens de **múltiplas categorias** do Design System Sansys. Todos os tokens listados abaixo estão **efetivamente presentes** nos arquivos SCSS do componente.

### 📚 Referência Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

### 🎨 Categorias de Tokens Consumidas

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no DssCheckbox |
|-----------|---------------|----------------|--------------------------|
| **Altura Visual** | `--dss-compact-control-height-{xs\|sm\|md\|lg}` | [Seção 7.13 - Compact Controls](../../../docs/reference/DSS_TOKEN_REFERENCE.md#713-compact-controls---alturas-visuais) | `min-height` do root por size (20/24/28/32px) |
| **Touch Target** | `--dss-touch-target-min` | [Seção 7.7 - Touch Targets](../../../docs/reference/DSS_TOKEN_REFERENCE.md#77-touch-targets) | Área interativa mínima 48px via `::before` no root |
| **Espaçamento** | `--dss-spacing-{0_5\|1\|1_5\|2\|3\|4\|5\|6}` | [Seção 1.1 - Escala Base](../../../docs/reference/DSS_TOKEN_REFERENCE.md#11-escala-base) | Gap entre control e label, dimensões do control, focus outline offset |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-{xs\|sm\|md}`, `--dss-line-height-normal` | [Seção 6 - Tipografia](../../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Fonte, tamanho de texto do label e ícones |
| **Bordas** | `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-radius-sm` | [Seção 8 - Bordas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#8-bordas) | Borda do control indicator, focus outline, border-radius |
| **Motion** | `--dss-duration-200`, `--dss-easing-standard` | [Seção 5 - Motion/Animation](../../../docs/reference/DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transições de opacidade e hover |
| **Opacidade** | `--dss-opacity-disabled`, `--dss-opacity-50` | [Seção 2.4 - Opacidade](../../../docs/reference/DSS_TOKEN_REFERENCE.md#24-opacidade) | Estado disabled (normal e high contrast) |
| **Acessibilidade (Focus)** | `--dss-focus-ring` | [Seção 7.1 - Focus](../../../docs/reference/DSS_TOKEN_REFERENCE.md#71-focus-configurações-base) | Focus ring visível em `:focus-visible` (WCAG 2.4.7) |
| **Brands** | `--dss-{hub\|water\|waste}-{primary\|secondary\|accent}`, `--dss-{hub\|water\|waste}-{on-primary\|on-secondary\|on-accent}` | [Seção 2.2 - Brand Palettes](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Cores do control quando checked/indeterminate com brand ativo |

### ⚠️ Observações Importantes

- 🔒 **Tokens Protegidos**: Tokens de acessibilidade (`--dss-focus-*`) **NÃO devem** ser sobrescritos fora do DSS
- 🎨 **Brandabilidade**: Quando `brand` ou `data-brand` é aplicado, tokens de marca substituem classes utilitárias
- 📏 **Responsividade**: Tokens de espaçamento e altura são gerenciados pela prop `size`
- 🔄 **Fallback**: Na ausência de `brand`, o sistema usa classes utilitárias (`bg-*`, `text-white`)

### 📏 Altura Visual vs Touch Target (WCAG 2.5.5)

> **⚠️ Conceito Crítico**: Altura visual e área interativa são conceitos **distintos** no DssCheckbox.

#### Definições

| Conceito | Token | Valor | Responsabilidade |
|----------|-------|-------|------------------|
| **Altura Visual** | `--dss-compact-control-height-*` | 20-32px | Dimensão renderizada visualmente (`min-height` do root) |
| **Touch Target** | `--dss-touch-target-min` | 48px | Área mínima clicável/tocável via `::before` |

#### Mapeamento por Size

| Prop `size` | Altura Visual | Control (caixa) | Font Size (ícone/label) | Gap | Touch Target |
|-------------|---------------|-----------------|-------------------------|-----|-------------|
| `xs` | 20px (`--dss-compact-control-height-xs`) | 16px (`--dss-spacing-4`) | 12px (`--dss-font-size-xs`) | 4px (`--dss-spacing-1`) | 48px (via `::before`) |
| `sm` | 24px (`--dss-compact-control-height-sm`) | 20px (`--dss-spacing-5`) | 12px (`--dss-font-size-xs`) | 6px (`--dss-spacing-1_5`) | 48px (via `::before`) |
| `md` | 28px (`--dss-compact-control-height-md`) | 20px (`--dss-spacing-5`) | 14px (`--dss-font-size-sm`) | 8px (`--dss-spacing-2`) | 48px (via `::before`) |
| `lg` | 32px (`--dss-compact-control-height-lg`) | 24px (`--dss-spacing-6`) | 16px (`--dss-font-size-md`) | 12px (`--dss-spacing-3`) | 48px (via `::before`) |

#### Implementação Técnica

O DssCheckbox utiliza pseudo-elemento `::before` no root `<label>` para garantir touch target ≥48px:

```scss
.dss-checkbox {
  min-height: var(--dss-compact-control-height-md); /* 28px - altura VISUAL */

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: var(--dss-touch-target-min);  /* 48px */
    min-height: var(--dss-touch-target-min); /* 48px */
    pointer-events: none; /* OBRIGATÓRIO - cliques chegam ao input */
  }
}
```

### 📋 Exceções Documentadas

Valores não-tokenizados presentes no SCSS do componente, com justificativa técnica:

| ID | Valor | Arquivo | Linha | Racional |
|----|-------|---------|-------|----------|
| EXC-01 | `brightness(0.95)` | `_base.scss` | 275 | Valor canônico DSS para hover de controles interativos em light mode. Ref: CLAUDE.md Princípio #8 |
| EXC-02 | `brightness(1.10)` | `_states.scss` | 33 | Valor canônico DSS para hover em dark mode (clareia fundos escuros). Ref: CLAUDE.md Princípio #8 |
| EXC-03 | `font-weight: normal` | `_base.scss` | 130 | Requisito técnico da fonte Material Icons. Precedente: DssChip `_base.scss` |
| EXC-04 | `saturate(1.2)` | `_states.scss` | 83 | Valor canônico DSS para high contrast mode. Ref: CLAUDE.md Princípio #8 |
| EXC-05 | `2px`, `3px` hardcoded | `_states.scss` | 156, 181 | Tokens CSS custom properties são ignorados em `forced-colors: active`. Precedente: DssChip `_states.scss` |
| EXC-06 | `brightness(0.90)` | `_base.scss` | 289 | Valor canônico DSS para active state de controles interativos em light mode. Precedente: DssChip `_base.scss`. Ref: CLAUDE.md Princípio #8 |
| EXC-07 | `brightness(1.20)` | `_states.scss` | 45 | Valor canônico DSS para active state em dark mode (clareia fundos escuros). Precedente: DssChip `_states.scss`. Ref: CLAUDE.md Princípio #8 |

### 🔗 Links Rápidos

- [Token Guidelines (Filosofia e Uso)](../../../docs/reference/DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catálogo Completo)](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## 5. API Pública

### Props de Valor / Model

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `boolean \| null \| any[]` | `false` | Valor atual. `boolean`: toggle simples. `null`: indeterminate. `any[]`: modo grupo |
| `val` | `any` | — | Valor que este checkbox representa no modo grupo (array model) |
| `trueValue` | `any` | `true` | Valor customizado para estado marcado |
| `falseValue` | `any` | `false` | Valor customizado para estado desmarcado |
| `indeterminateValue` | `any` | `null` | Valor customizado para estado indeterminate |
| `toggleIndeterminate` | `boolean` | `false` | Habilita ciclo de 3 estados: unchecked → checked → indeterminate |

### Props de Conteúdo

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `label` | `string` | `''` | Texto do label (alternativa ao slot `default`) |
| `leftLabel` | `boolean` | `false` | Posiciona o label à esquerda do indicador |

### Props Visuais

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `color` | `CheckboxColor` | `'primary'` | Cores semânticas conforme prop `color` | Cor semântica do checkbox |
| `size` | `CheckboxSize` | `'md'` | `xs`, `sm`, `md`, `lg` | Tamanho do checkbox |

### Props de Estado

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `disable` | `boolean` | `false` | Desabilita o checkbox (opacidade reduzida, cursor not-allowed, pointer-events none) |
| `dense` | `boolean` | `false` | Modo compacto (reduz gap e min-height para valores de `sm`) |

### Props de Brandabilidade (Exclusivo DSS)

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `CheckboxBrand \| null` | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Acessibilidade

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado para o input nativo. Default efetivo: `0`. Disabled: `-1` |
| `ariaLabel` | `string` | — | Label ARIA customizado aplicado ao input nativo |

### Eventos

| Event | Payload | Quando Emitido | Descrição |
|-------|---------|----------------|-----------|
| `update:modelValue` | `boolean \| null \| any[]` | Ao alterar o estado do checkbox | Novo valor. Não emitido se `disable` é `true` |

### Slots

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteúdo customizado do label | HTML formatado. Sobrescreve prop `label` quando presente |

---

## 6. Estados

### Tabela Única de Estados

| Estado | Classe CSS | Aparência | Interação | Tokens/Valores Aplicados |
|--------|-----------|-----------|-----------|--------------------------|
| **Unchecked** | (estado base) | Caixa vazia com borda `currentColor` | Clique alterna para checked | `border: var(--dss-border-width-md) solid currentColor`, `background-color: transparent` |
| **Checked** | `.dss-checkbox--checked` | Caixa preenchida com ícone ✓ | Clique alterna para unchecked (ou indeterminate se `toggleIndeterminate`) | `bg-{color} text-white` (sem brand) ou tokens de brand |
| **Indeterminate** | `.dss-checkbox--indeterminate` | Caixa preenchida com ícone — | Clique alterna para unchecked (com `toggleIndeterminate`) | Mesmo tratamento visual que checked |
| **Hover** | `:hover` (não disabled) | Control com `brightness(0.95)` | Feedback visual | EXC-01: `filter: brightness(0.95)` |
| **Active** | `:active` (não disabled) | Control com `brightness(0.90)` | Feedback durante mousedown | EXC-06: `filter: brightness(0.90)` |
| **Focus** | `.dss-checkbox__control--focused` | Focus ring visível no control | Navegação por teclado | `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)`, `outline-offset: var(--dss-spacing-0_5)` |
| **Disabled** | `.dss-checkbox--disabled` | Opacidade reduzida, cursor not-allowed | Interações bloqueadas, tabindex -1 | `opacity: var(--dss-opacity-disabled)`, `pointer-events: none` |
| **Disabled (high contrast)** | `.dss-checkbox--disabled` em `@media (prefers-contrast: more)` | Opacidade 50%, label com `text-decoration: line-through` | Interações bloqueadas | `opacity: var(--dss-opacity-50)`, `text-decoration: line-through` no `.dss-checkbox__label` |
| **Loading** | — | — | — | **Não aplicável.** O DssCheckbox é um controle de formulário com alternância instantânea de estado e não executa operações assíncronas internas. |

### Diagrama de Transição

```
                         toggleIndeterminate=true
Unchecked ──change──> Checked ──change──> Indeterminate ──change──> Unchecked
    │                    │
    │                    └── toggleIndeterminate=false ──change──> Unchecked
    │
    └── :disable="true" ──> Disabled (sem transição de volta automática)
```

### Modos de Operação

| Modo | Condição | Comportamento no `change` |
|------|----------|---------------------------|
| **Toggle simples** | `modelValue` é boolean/custom | Alterna entre `trueValue` e `falseValue` |
| **Ciclo de 3 estados** | `toggleIndeterminate=true` | Cicla: unchecked → checked → indeterminate → unchecked |
| **Grupo (array)** | `modelValue` é `any[]` | Adiciona/remove `val` do array. Indeterminate não disponível |

---

## 7. Variantes

### Decisão Arquitetural: Sem Variantes Visuais

O DssCheckbox **não possui variantes visuais** (filled, outline, flat) no mesmo sentido que DssChip ou DssButton.

**Justificativa**: O checkbox é um Compact Control atômico com um único estilo visual. A diferenciação visual ocorre por **estados** (unchecked, checked, indeterminate), não por variantes.

**Arquivo**: `3-variants/index.scss` existe para manter a **arquitetura obrigatória de 4 camadas** do DSS. Contém apenas comentário documentando esta decisão.

**Futuro**: Variantes visuais (se necessárias) devem ser propostas via RFC conforme governança DSS.

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssCheckbox suporta **duas formas** de aplicar brandabilidade:

#### Método 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop. Renderiza `data-brand` no root `<label>`.

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssCheckbox brand="hub" color="primary" label="Hub Primary" />

  <!-- Water (Azul) -->
  <DssCheckbox brand="water" color="secondary" label="Water Secondary" />

  <!-- Waste (Verde) -->
  <DssCheckbox brand="waste" color="accent" label="Waste Accent" />
</template>
```

**Quando usar:**
- ✅ Checkboxes individuais com brand específica
- ✅ Controle granular por componente
- ✅ Não depende de contexto DOM

#### Método 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os checkboxes filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssCheckbox color="primary" label="Primary" />
    <DssCheckbox color="secondary" label="Secondary" />
  </div>
</template>
```

**Quando usar:**
- ✅ Seções inteiras da aplicação com mesma brand
- ✅ Layouts multi-brand
- ✅ Menos código repetitivo

**⚠️ Prioridade:** Se ambos estiverem presentes, a prop `brand` tem prioridade sobre `data-brand` (a prop renderiza `data-brand` no próprio elemento, que tem especificidade CSS maior que o seletor de contexto).

### Estratégia de Cores

O DssCheckbox implementa duas estratégias de cores, gerenciadas pelo composable `useCheckboxClasses`:

| Cenário | Estratégia | Classes Aplicadas | Responsável |
|---------|-----------|-------------------|-------------|
| **Sem brand** | Classes utilitárias Quasar | `bg-{color} text-white` no `.dss-checkbox__control` (quando checked/indeterminate) | `useCheckboxClasses.controlColorClasses` |
| **Com brand** | Classes DSS para CSS matching | `dss-checkbox--{color}` no root `<label>` | `_brands.scss` via seletores `[data-brand]` |

### Paletas de Cores por Brand

> Para detalhes das paletas de cores por brand (Hub, Water, Waste), consulte [`DSS_TOKEN_REFERENCE.md - Seção 2.2 Brand Palettes`](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes).

**Tokens consumidos por brand (em `_brands.scss`):**

| Brand | Primary | On-Primary | Secondary | On-Secondary | Accent | On-Accent |
|-------|---------|------------|-----------|--------------|--------|-----------|
| Hub | `--dss-hub-primary` | `--dss-hub-on-primary` | `--dss-hub-secondary` | `--dss-hub-on-secondary` | `--dss-hub-accent` | `--dss-hub-on-accent` |
| Water | `--dss-water-primary` | `--dss-water-on-primary` | `--dss-water-secondary` | `--dss-water-on-secondary` | `--dss-water-accent` | `--dss-water-on-accent` |
| Waste | `--dss-waste-primary` | `--dss-waste-on-primary` | `--dss-waste-secondary` | `--dss-waste-on-secondary` | `--dss-waste-accent` | `--dss-waste-on-accent` |

**Fallback quando nenhum brand está definido:**
- O componente usa classes utilitárias (`bg-{color}`, `text-white`) com cores semânticas padrão do Quasar

**⚠️ Cores suportadas com brand ativo:**
- Com brand ativo (`hub`, `water`, `waste`), apenas as cores `primary`, `secondary` e `accent` possuem mapeamento em `_brands.scss`
- As cores `tertiary`, `positive`, `negative`, `warning` e `info` **não possuem fallback com brand ativo** e não aplicarão cor ao control quando checked/indeterminate
- Esta limitação é consistente com o golden component DssChip e segue o escopo de tokens de brand definido no DSS

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

#### ✅ Critérios Atendidos

| Critério WCAG | Nível | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Mínimo)** | AA | Cores semânticas com contraste adequado; high contrast mode via `prefers-contrast: more` |
| **2.1.1 Teclado** | A | Input nativo `<input type="checkbox">` com Tab e Space |
| **2.4.7 Foco Visível** | AA | Focus ring via `--dss-focus-ring` com outline-offset `--dss-spacing-0_5` |
| **2.5.5 Tamanho do Alvo** | AAA | Touch target ≥48px via `::before` no root |
| **4.1.2 Nome, Função, Valor** | A | `<label>` vincula input, `aria-label` prop, `indeterminate` DOM property |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| **Tab** | Move o foco para o próximo checkbox |
| **Shift + Tab** | Move o foco para o checkbox anterior |
| **Space** | Alterna o estado do checkbox (toggle de estado) |

### Implementação ARIA

O DssCheckbox utiliza `<input type="checkbox">` nativo, que provê automaticamente:

- `role="checkbox"` implícito
- `aria-checked="true"` quando marcado
- `aria-checked="false"` quando desmarcado
- `aria-checked="mixed"` quando `indeterminate=true` (sincronizado via `watchEffect`)
- `aria-disabled` via atributo `disabled`

```html
<!-- Estrutura acessível renderizada -->
<label class="dss-checkbox">
  <input
    type="checkbox"
    class="dss-checkbox__native"
    tabindex="0"
    aria-label="Aceitar termos"
  />
  <span class="dss-checkbox__control" aria-hidden="true">
    <span class="dss-checkbox__check material-icons" aria-hidden="true">check</span>
  </span>
  <span class="dss-checkbox__label">Aceitar termos</span>
</label>
```

**Pontos críticos:**
- Tabindex existe **SOMENTE** no `<input>`, **NUNCA** no `<label>` root
- `aria-checked` e `aria-disabled` são gerenciados pelo browser via input nativo
- Control indicator (`<span>`) e ícones possuem `aria-hidden="true"`
- Propriedade DOM `indeterminate` é sincronizada via `watchEffect` (não é atributo HTML)

### Media Queries de Acessibilidade

| Media Query | O Que Faz | Tokens/Valores |
|-------------|-----------|----------------|
| `prefers-color-scheme: dark` | Inverte hover para `brightness(1.1)` e active para `brightness(1.2)` em checked/indeterminate | EXC-02, EXC-07 |
| `prefers-contrast: more` | Bordas espessas, saturação aumentada, disabled com opacidade 50% e label com `text-decoration: line-through` | `--dss-border-width-thick`, EXC-04, `--dss-opacity-50` |
| `prefers-reduced-motion: reduce` | Remove todas as transições | `transition: none` |
| `print` | Remove filtros, garante bordas visíveis, ícones em `currentColor` | `filter: none`, `--dss-border-width-md` |
| `forced-colors: active` | Usa cores do sistema Windows (ButtonText, Highlight, GrayText, HighlightText) | EXC-05 |

### 🧪 Testado Com

- ✅ **Navegação por teclado** (Tab, Space)
- ✅ **High contrast mode** (`prefers-contrast: more`)
- ✅ **Reduced motion** (`prefers-reduced-motion: reduce`)
- ✅ **Forced colors** (`forced-colors: active`, Windows High Contrast)
- ✅ **Print styles** (`@media print`)
- ✅ **Dark mode** (`prefers-color-scheme: dark`)

---

## 10. Exemplos de Uso

### Instalação

```javascript
import { DssCheckbox } from '@/dss/components'
// ou import direto
import DssCheckbox from './1-structure/DssCheckbox.ts.vue'
```

### Uso Básico

```vue
<template>
  <DssCheckbox v-model="accepted" label="Accept terms and conditions" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const accepted = ref(false)
</script>
```

### Tamanhos

```vue
<template>
  <DssCheckbox v-model="val" size="xs" label="Extra Small" />
  <DssCheckbox v-model="val" size="sm" label="Small" />
  <DssCheckbox v-model="val" size="md" label="Medium (default)" />
  <DssCheckbox v-model="val" size="lg" label="Large" />
</template>
```

### Cores Semânticas

```vue
<template>
  <DssCheckbox v-model="c.primary" color="primary" label="Primary" />
  <DssCheckbox v-model="c.secondary" color="secondary" label="Secondary" />
  <DssCheckbox v-model="c.tertiary" color="tertiary" label="Tertiary" />
  <DssCheckbox v-model="c.accent" color="accent" label="Accent" />
  <DssCheckbox v-model="c.positive" color="positive" label="Positive" />
  <DssCheckbox v-model="c.negative" color="negative" label="Negative" />
  <DssCheckbox v-model="c.warning" color="warning" label="Warning" />
  <DssCheckbox v-model="c.info" color="info" label="Info" />
</template>
```

### Estado Indeterminate

```vue
<template>
  <DssCheckbox :model-value="null" label="Indeterminate" />
  <DssCheckbox :model-value="null" disable label="Disabled (indeterminate)" />
</template>
```

### Ciclo de 3 Estados (toggleIndeterminate)

```vue
<template>
  <DssCheckbox
    v-model="triState"
    toggle-indeterminate
    label="Click to cycle: unchecked → checked → indeterminate"
  />
  <p>Value: {{ triState === null ? 'null (indeterminate)' : triState }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const triState = ref<boolean | null>(false)
</script>
```

### Modo Grupo (Array Model)

```vue
<template>
  <DssCheckbox v-model="fruits" val="apple" label="Apple" />
  <DssCheckbox v-model="fruits" val="banana" label="Banana" />
  <DssCheckbox v-model="fruits" val="cherry" label="Cherry" />
  <DssCheckbox v-model="fruits" val="date" label="Date" />
  <p>Selected: {{ fruits.join(', ') || 'none' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fruits = ref<string[]>(['apple', 'cherry'])
</script>
```

### Brands

```vue
<template>
  <!-- Hub (Laranja) -->
  <div data-brand="hub">
    <DssCheckbox :model-value="true" brand="hub" color="primary" label="Primary" />
    <DssCheckbox :model-value="true" brand="hub" color="secondary" label="Secondary" />
    <DssCheckbox :model-value="true" brand="hub" color="accent" label="Accent" />
  </div>

  <!-- Water (Azul) -->
  <div data-brand="water">
    <DssCheckbox :model-value="true" brand="water" color="primary" label="Primary" />
    <DssCheckbox :model-value="true" brand="water" color="secondary" label="Secondary" />
  </div>

  <!-- Waste (Verde) -->
  <div data-brand="waste">
    <DssCheckbox :model-value="true" brand="waste" color="primary" label="Primary" />
    <DssCheckbox :model-value="true" brand="waste" color="accent" label="Accent" />
  </div>
</template>
```

### Valores Customizados (trueValue / falseValue)

```vue
<template>
  <DssCheckbox
    v-model="customVal"
    true-value="yes"
    false-value="no"
    label="Custom true/false values"
  />
  <p>Value: "{{ customVal }}"</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const customVal = ref('no')
</script>
```

### Dense e Left Label

```vue
<template>
  <DssCheckbox v-model="val" dense label="Dense mode" />
  <DssCheckbox v-model="val" left-label label="Label on left" />
</template>
```

### Caso Real: Painel de Configurações

```vue
<template>
  <div class="settings-panel">
    <DssCheckbox v-model="settings.autoSave" label="Auto-save documents" />
    <DssCheckbox v-model="settings.spellCheck" label="Enable spell check" />
    <DssCheckbox v-model="settings.darkMode" label="Dark mode" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const settings = reactive({
  autoSave: true,
  spellCheck: false,
  darkMode: false
})
</script>
```

---

## 11. Anti-patterns

### ❌ Usos Incorretos

#### 1. Estilos Hardcoded Sobrescrevendo Tokens

**Problema:** Quebra a consistência do Design System.

```vue
<!-- ❌ INCORRETO -->
<DssCheckbox style="opacity: 0.3;" label="Custom opacity" />

<!-- ✅ CORRETO -->
<DssCheckbox disable label="Disabled" />
```

**Por quê:** Estilos inline bypassa tokens e temas. Use props de estado do componente.

---

#### 2. Usar Checkbox como Toggle/Switch Imediato

**Problema:** Checkbox é para seleção em formulários, não para ações imediatas.

```vue
<!-- ❌ INCORRETO - Ação imediata no @change -->
<DssCheckbox v-model="darkMode" label="Dark Mode" @update:modelValue="toggleDarkModeImmediately" />

<!-- ✅ CORRETO - Usa toggle/switch dedicado para ações imediatas -->
<!-- Ou submete via formulário -->
<form @submit="saveSettings">
  <DssCheckbox v-model="settings.darkMode" label="Dark Mode" />
  <DssButton type="submit">Salvar</DssButton>
</form>
```

**Por quê:** Checkboxes devem ser submetidos em formulários. Para toggle de estado imediato, use componente de switch/toggle.

---

#### 3. Grupo Sem Gerenciamento de Array

**Problema:** Múltiplos checkboxes com mesmo v-model sem `val` causa comportamento inesperado.

```vue
<!-- ❌ INCORRETO - Sem val, todos toggleam o mesmo boolean -->
<DssCheckbox v-model="selection" label="Apple" />
<DssCheckbox v-model="selection" label="Banana" />

<!-- ✅ CORRETO - Com val e array model -->
<DssCheckbox v-model="selection" val="apple" label="Apple" />
<DssCheckbox v-model="selection" val="banana" label="Banana" />
```

```ts
// ✅ Model deve ser array para modo grupo
const selection = ref<string[]>([])
```

**Por quê:** Sem `val`, todos os checkboxes controlam o mesmo valor boolean.

---

#### 4. Ignorar Estado Indeterminate em "Selecionar Todos"

**Problema:** Checkbox "pai" sem indeterminate confunde o usuário.

```vue
<!-- ❌ INCORRETO - Pai é checked mesmo com seleção parcial -->
<DssCheckbox :model-value="items.some(i => i.selected)" label="Select All" />

<!-- ✅ CORRETO - Pai usa null (indeterminate) para seleção parcial -->
<DssCheckbox
  :model-value="allSelected ? true : someSelected ? null : false"
  toggle-indeterminate
  label="Select All"
  @update:modelValue="toggleAll"
/>
```

**Por quê:** O estado indeterminate comunica visualmente que a seleção é parcial.

---

#### 5. Sobrescrever Brand com CSS Inline

**Problema:** Bypassa o sistema de brandabilidade do DSS.

```vue
<!-- ❌ INCORRETO -->
<DssCheckbox style="--dss-hub-primary: #ff0000;" brand="hub" color="primary" label="Hack" />

<!-- ✅ CORRETO -->
<DssCheckbox brand="hub" color="primary" label="Hub Primary" />
```

**Por quê:** Tokens de brand são gerenciados globalmente pelo DSS.

---

#### 6. Checkbox Sem Label Acessível

**Problema:** Screen readers não conseguem descrever o checkbox.

```vue
<!-- ❌ INCORRETO - Sem label nem aria-label -->
<DssCheckbox v-model="val" />

<!-- ✅ CORRETO - Com label -->
<DssCheckbox v-model="val" label="Accept terms" />

<!-- ✅ CORRETO - Com aria-label (quando label visual não é necessário) -->
<DssCheckbox v-model="val" aria-label="Enable notifications" />
```

**Por quê:** WCAG 4.1.2 exige que todos os elementos interativos tenham nome acessível.

---

### 🚫 Combinações Não Permitidas

| Combinação | Por quê | Alternativa |
|------------|---------|-------------|
| `disable` + interação esperada | Estados conflitantes | Remova `disable` ou não espere interação |
| `toggleIndeterminate` + array model | Array model não suporta indeterminate | Use boolean model para 3 estados |
| Sem `label` e sem `aria-label` e sem slot `default` | Checkbox inacessível | Forneça pelo menos um label |

---

## 12. Governança do Componente

### O Que É Extensão Válida

**✅ Permitido SEM aprovação:**
- Uso de props públicas documentadas
- Combinação de props dentro das regras
- Customização via tokens CSS (`--dss-*`) nos níveis apropriados
- Uso de slot `default` para conteúdo customizado de label
- Aplicação de brands via prop ou contexto `data-brand`

**Exemplo:**
```vue
<DssCheckbox
  v-model="accepted"
  brand="hub"
  color="primary"
  size="lg"
  label="Accept terms"
  aria-label="Accept terms and conditions for Hub"
/>
```

---

### O Que Exige Novo Componente

**⚠️ Requer discussão com Design System:**
- Adicionar variante visual (ex.: filled/outline para o control)
- Adicionar nova cor semântica além das definidas em `CheckboxColor`
- Modificar comportamento de estados (ex.: novo modo de operação)
- Criar wrapper especializado (ex.: `DssCheckboxGroup`, `DssCheckboxTree`)

---

### O Que É Proibido

**🚫 NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar código-fonte do componente diretamente sem PR
- Criar "forks" locais do componente
- Ignorar warnings de acessibilidade
- Bypassar sistema de brandabilidade com CSS inline
- Usar `::before` para efeitos visuais (reservado para touch target)
- Usar `::after` para conteúdo estrutural (reservado para efeitos visuais)

---

### Quem Decide

| Tipo de Mudança | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop pública** | Equipe de Design + DSS | RFC + aprovação |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migração planejada |

---

## 13. Troubleshooting

### Problema: Checkbox não alterna estado

**Causa:** Prop `disable` está ativa.

**Solução:**
```vue
<!-- Verificar se disable não está true -->
<DssCheckbox v-model="val" label="Active" />

<!-- Se precisa desabilitar condicionalmente -->
<DssCheckbox v-model="val" :disable="isFormLocked" label="Conditional" />
```

---

### Problema: Cores não mudam com `data-brand`

**Causa 1:** `data-brand` não está em um elemento pai.

**Solução:**
```vue
<!-- ❌ INCORRETO - data-brand em sibling -->
<div data-brand="hub"></div>
<DssCheckbox color="primary" label="Hub" />

<!-- ✅ CORRETO - data-brand em ancestral -->
<div data-brand="hub">
  <DssCheckbox color="primary" label="Hub" />
</div>
```

**Causa 2:** Falta classe de cor. Sem `brand` prop, o seletor CSS `[data-brand] .dss-checkbox.dss-checkbox--{color}` requer que `dss-checkbox--{color}` esteja presente no root. A prop `brand` gera automaticamente essa classe.

**Solução:** Use a prop `brand` ou certifique-se que o composable `useCheckboxClasses` gera a classe correta.

---

### Problema: Estado indeterminate não aparece visualmente

**Causa:** `indeterminate` é uma propriedade DOM, não um atributo HTML. Não pode ser setada via template.

**Solução:** O DssCheckbox gerencia isso automaticamente via `watchEffect`. Basta passar `null` como `modelValue`:
```vue
<DssCheckbox :model-value="null" label="Indeterminate" />
```

---

### Problema: Focus ring não aparece

**Causa:** CSS global removendo `outline`.

**Solução:** Não sobrescreva `outline` do componente. O DssCheckbox aplica focus ring via classe `.dss-checkbox__control--focused` que é ativada por eventos `focus`/`blur` no input nativo.

---

### Problema: Ícones de check/dash não aparecem

**Causa:** Material Icons não está carregada.

**Solução:**
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

### Problema: Modo grupo (array) não funciona

**Causa:** `modelValue` não é um array ou `val` não está definido.

**Solução:**
```vue
<template>
  <DssCheckbox v-model="items" val="a" label="Item A" />
  <DssCheckbox v-model="items" val="b" label="Item B" />
</template>

<script setup>
import { ref } from 'vue'
const items = ref([]) // DEVE ser array
</script>
```

---

## 📋 Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Icons](https://fonts.google.com/icons)
- [Design System Sansys - Tokens](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## 📝 Licença

Propriedade da Jtech

---

**Última atualização:** Janeiro 2026
**Versão:** DSS v2.2.0
**Status:** 📦 Componente Base
**Golden Reference:** DssChip
**Golden Context:** DssChip
