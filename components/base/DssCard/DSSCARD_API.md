# DSSCARD_API.md — API Reference

**Componente:** DssCard (+ DssCardSection, DssCardActions)
**Versão DSS:** 2.2.0
**Baseado em:** Quasar `q-card` (API governada pelo Design System)

---

## DssCard

### Props

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | `CardVariant` | `'elevated'` | `'elevated'`, `'flat'`, `'bordered'`, `'outlined'` | Variante visual do card |
| `square` | `boolean` | `false` | — | Remove border-radius (cantos quadrados) |
| `clickable` | `boolean` | `false` | — | Torna o card clicável com hover/focus/active |
| `dark` | `boolean` | `false` | — | Ativa dark mode |
| `brand` | `CardBrand \| null` | `null` | `'hub'`, `'water'`, `'waste'`, `null` | Marca Sansys (accent border-left) |

### Eventos

| Evento | Payload | Condição | Descrição |
|--------|---------|----------|-----------|
| `click` | `MouseEvent \| KeyboardEvent` | `clickable === true` | Emitido ao clicar ou pressionar Enter/Space |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal do card. Tipicamente contém `DssCardSection` e `DssCardActions`. |

### Atributos ARIA (automáticos quando `clickable`)

| Atributo | Valor | Descrição |
|----------|-------|-----------|
| `tabindex` | `"0"` | Torna o card navegável por Tab |
| `role` | `"article"` | Semântica ARIA para card clicável |

### Classes CSS geradas

| Classe | Condição |
|--------|----------|
| `dss-card` | Sempre |
| `dss-card--elevated` | `variant === 'elevated'` |
| `dss-card--flat` | `variant === 'flat'` |
| `dss-card--bordered` | `variant === 'bordered'` |
| `dss-card--outlined` | `variant === 'outlined'` |
| `dss-card--square` | `square === true` |
| `dss-card--clickable` | `clickable === true` |
| `dss-card--dark` | `dark === true` |
| `dss-card--brand-hub` | `brand === 'hub'` |
| `dss-card--brand-water` | `brand === 'water'` |
| `dss-card--brand-waste` | `brand === 'waste'` |

### Comportamento `inheritAttrs`

- `inheritAttrs: false` — Atributos HTML são aplicados via `v-bind="cardAttrs"` no root element, com forwarding controlado.

---

## DssCardSection

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `horizontal` | `boolean` | `false` | Layout horizontal (flex row) com `align-items: center` |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da seção |

### Classes CSS geradas

| Classe | Condição |
|--------|----------|
| `dss-card-section` | Sempre |
| `dss-card-section--horizontal` | `horizontal === true` |

### Comportamento `inheritAttrs`

- `inheritAttrs: false` — Atributos são forwardados via `v-bind="$attrs"` no root `<div>`.

---

## DssCardActions

### Props

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `align` | `CardActionsAlign` | `'right'` | `'left'`, `'center'`, `'right'`, `'between'`, `'around'` | Alinhamento das ações |
| `vertical` | `boolean` | `false` | — | Layout vertical (botões empilhados) |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Ações do card (tipicamente botões DssButton) |

### Classes CSS geradas

| Classe | Condição |
|--------|----------|
| `dss-card-actions` | Sempre |
| `dss-card-actions--align-left` | `align === 'left'` |
| `dss-card-actions--align-center` | `align === 'center'` |
| `dss-card-actions--align-right` | `align === 'right'` |
| `dss-card-actions--align-between` | `align === 'between'` |
| `dss-card-actions--align-around` | `align === 'around'` |
| `dss-card-actions--vertical` | `vertical === true` |

### Comportamento `inheritAttrs`

- `inheritAttrs: false` — Atributos são forwardados via `v-bind="$attrs"` no root `<div>`.

---

## Tipos TypeScript

```typescript
type CardVariant = 'elevated' | 'flat' | 'bordered' | 'outlined'
type CardBrand = 'hub' | 'water' | 'waste'
type CardActionsAlign = 'left' | 'center' | 'right' | 'between' | 'around'

interface CardProps {
  variant?: CardVariant
  square?: boolean
  clickable?: boolean
  dark?: boolean
  brand?: CardBrand | null
}

interface CardEmits {
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}

interface CardSectionProps {
  horizontal?: boolean
}

interface CardActionsProps {
  align?: CardActionsAlign
  vertical?: boolean
}
```

---

## Tokens Consumidos

### Estrutura e Layout

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do card (light mode) |
| `--dss-surface-dark` | Background do card (dark mode) |
| `--dss-surface-hover` | Background hover (variant outlined/flat) |
| `--dss-surface-active` | Background active (variant outlined/flat) |
| `--dss-radius-lg` | Border radius (12px) |
| `--dss-spacing-2` | Gap entre botões em actions |
| `--dss-spacing-4` | Padding do actions, gap em section horizontal |
| `--dss-spacing-6` | Padding das sections |

### Bordas

| Token | Uso |
|-------|-----|
| `--dss-border-width-thin` | Bordas de variants e dividers |
| `--dss-border-width-thick` | Accent border-left (brand) |
| `--dss-gray-200` | Divider entre sections |
| `--dss-gray-300` | Border de outlined/bordered |
| `--dss-gray-400` | Border hover de bordered |

### Elevação

| Token | Uso |
|-------|-----|
| `--dss-elevation-1` | Shadow default (elevated, bordered) |
| `--dss-elevation-2` | Shadow hover (clickable) |
| `--dss-shadow-active` | Shadow active (clickable) |

### Acessibilidade

| Token | Uso |
|-------|-----|
| `--dss-focus-shadow-primary` | Focus ring (clickable, WCAG 2.4.7) |

### Tipografia

| Token | Uso |
|-------|-----|
| `--dss-text-body` | Cor de texto padrão |
| `--dss-text-inverse` | Cor de texto em dark mode |
| `--dss-font-size-base` | Font size base em sections |
| `--dss-line-height-relaxed` | Line height em sections |

### Interação

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Border color de hover (outlined/bordered clickable) |
| `--dss-action-primary-deep` | Border color de active (outlined clickable) |

### Brand

| Token | Uso |
|-------|-----|
| `--dss-hub-600` | Accent border Hub |
| `--dss-hub-300`, `--dss-hub-400`, `--dss-hub-700` | Bordas Hub (variants bordered/outlined) |
| `--dss-water-500` | Accent border Water |
| `--dss-water-200`, `--dss-water-300`, `--dss-water-600` | Bordas Water |
| `--dss-waste-600` | Accent border Waste |
| `--dss-waste-200`, `--dss-waste-300`, `--dss-waste-700` | Bordas Waste |

### Motion

| Token | Uso |
|-------|-----|
| `--dss-duration-fast` | Duração de transições (via mixin `dss-transition`) |
| `--dss-easing-ease-out` | Easing de transições (via mixin `dss-transition`) |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `rgba(255, 255, 255, 0.12)` | `4-output/_states.scss` | Divider em dark mode. Nenhum token DSS fornece white com alpha parcial. Padrão Material Design. |
| EXC-02 | `rgba(255, 255, 255, 0.2)` | `4-output/_states.scss` | Border em dark mode. Bordas requerem white com alpha. Sem token equivalente. |
| EXC-03 | `border-radius: 0` | `2-composition/_base.scss` | Square variant remove radius. Valor `0` é semanticamente "sem radius", não hardcoded visual. |
| EXC-04 | `2px solid ButtonText` | `4-output/_states.scss` | Forced-colors mode. System keywords obrigatórios (tokens CSS ignorados em forced-colors). |
| EXC-05 | `3px solid Highlight` | `4-output/_states.scss` | Forced-colors focus. Valor absoluto obrigatório. |
| EXC-06 | `4px solid Highlight` | `4-output/_states.scss` | Forced-colors brand accent. Valor absoluto obrigatório. |
| EXC-07 | `linear-gradient(...)` | `DssCard.example.vue` | Avatar placeholder decorativo. Gradiente usa tokens DSS. |

---

## Composicao com Componentes DSS

O DssCard suporta composicao livre com componentes DSS existentes. A tabela abaixo lista recomendacoes por slot/secao.

### Componentes Recomendados por Slot

| Slot / Secao | Componentes Recomendados | Notas |
|--------------|--------------------------|-------|
| `DssCardSection` | DssAvatar, DssBadge, DssChip, DssInput, DssCheckbox, DssRadio, DssToggle, DssTooltip | Conteudo principal do card. Qualquer combinacao e valida. |
| `DssCardSection` (horizontal) | DssAvatar + texto | Layout horizontal ideal para perfis (avatar + info). |
| `DssCardActions` | DssButton | Area de acoes. Usar variante `flat` para secundarias. |
| Qualquer secao (tooltip) | DssTooltip | Envolver elementos que precisam de contexto informativo. |

### Padroes de Composicao

| Padrao | Componentes | Descricao |
|--------|-------------|-----------|
| Profile Card | DssAvatar + DssButton | Avatar com info em section horizontal + acoes |
| Status Card | DssBadge | Badge junto ao titulo para indicar status |
| Tags Card | DssChip (multiplos) | Grupo de chips em container flex |
| Form Card | DssInput + DssButton | Inputs em section + botoes em actions |
| Settings Card | DssToggle | Toggles com descricao em lista vertical |
| Dashboard Misto | DssAvatar + DssBadge + DssChip + DssButton | Composicao completa multi-componente |

> **Documentacao completa:** Ver DssCard.md, Secao 17 (Matriz de Composicao DSS).

> **Principio:** Composicao e recomendacao, nao dependencia. O DssCard funciona independentemente dos componentes listados.

---

## Governanca

- API governada pelo DSS — subconjunto curado do Quasar `q-card`
- Cores aplicadas via classes utilitarias, NAO via SCSS
- Brand via prop `brand` ou contexto `[data-brand]`
- Extensoes (novas variantes, props) requerem RFC + aprovacao
- Composicao com componentes DSS e recomendada, nao obrigatoria

---

**Versao:** DSS v2.2.0
**Ultima atualizacao:** Fevereiro 2026
