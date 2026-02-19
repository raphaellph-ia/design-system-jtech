# DSSTOOLTIP_API.md

**Design System Sansys - DssTooltip API Reference**

---

## Componente

| Aspecto | Valor |
|---------|-------|
| **Nome** | `DssTooltip` |
| **Classificacao** | Elemento Informativo Contextual (NAO interativo) |
| **Golden Reference** | DssBadge |
| **Golden Context** | DssBadge |
| **Versao DSS** | 2.2.0 |
| **Fase** | 1 — Componente Basico |

---

## Props

### Conteudo

| Prop | Tipo | Default | Obrigatoria | Descricao |
|------|------|---------|-------------|-----------|
| `label` | `String` | `''` | Nao | Texto do tooltip (alternativa ao slot default) |

### Visual

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `color` | `TooltipColor` | `'dark'` | `dark`, `primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo |
| `textColor` | `String \| null` | `null` | Tokens semanticos | Override de cor do texto |
| `multiLine` | `Boolean` | `false` | — | Permite multiplas linhas |

### Visibilidade

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `visible` | `Boolean` | `false` | Controle externo de visibilidade (v-show) |

### Brand

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `brand` | `TooltipBrand \| null` | `null` | `hub`, `water`, `waste` | Brand Sansys |

### Acessibilidade

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `ariaLabel` | `String` | `undefined` | Label ARIA customizado |

---

## Slots

| Slot | Props | Descricao |
|------|-------|-----------|
| `default` | — | Conteudo principal do tooltip |

---

## Events

**Nenhum.** DssTooltip nao emite eventos.

---

## CSS Classes

| Classe | Descricao |
|--------|-----------|
| `.dss-tooltip` | Classe base do componente |
| `.dss-tooltip--multi-line` | Variante multi-line |
| `.dss-tooltip--brand-hub` | Brand Hub |
| `.dss-tooltip--brand-water` | Brand Water |
| `.dss-tooltip--brand-waste` | Brand Waste |

---

## ARIA

| Atributo | Valor | Aplicado em |
|----------|-------|-------------|
| `role` | `tooltip` | Elemento raiz |
| `aria-label` | Prop `ariaLabel` | Elemento raiz |

### Associacao (responsabilidade do consumidor)

| Atributo | Onde | Descricao |
|----------|------|-----------|
| `aria-describedby` | Elemento disparador | Referencia o `id` do DssTooltip |
| `id` | DssTooltip (via $attrs) | Identificador para associacao |

---

## TypeScript

```typescript
import type {
  TooltipProps,
  TooltipSlots,
  TooltipColor,
  TooltipBrand
} from '@/dss/components/base/DssTooltip/types/tooltip.types'
```

---

## Tokens Consumidos

| Token | Camada | Propriedade CSS |
|-------|--------|-----------------|
| `--dss-font-family-sans` | 2-composition | `font-family` |
| `--dss-font-size-sm` | 2-composition | `font-size` |
| `--dss-font-weight-normal` | 2-composition | `font-weight` |
| `--dss-line-height-tight` | 2-composition, 3-variants | `line-height` |
| `--dss-spacing-1_5` | 2-composition | `padding` (vertical) |
| `--dss-spacing-2` | 2-composition | `padding` (horizontal) |
| `--dss-spacing-2_5` | 3-variants | `padding` (multi-line horizontal) |
| `--dss-radius-md` | 2-composition | `border-radius` |
| `--dss-duration-tooltip` | 2-composition | `transition-duration` |
| `--dss-easing-standard` | 2-composition | `transition-timing-function` |
| `--dss-z-index-tooltip` | 2-composition | `z-index` |
| `--dss-border-width-md` | 4-output | `border` (high contrast) |
| `--dss-hub-600` | 4-output | `background-color` (Hub) |
| `--dss-hub-500` | 4-output | `background-color` (Hub dark) |
| `--dss-water-500` | 4-output | `background-color` (Water) |
| `--dss-water-400` | 4-output | `background-color` (Water dark) |
| `--dss-waste-600` | 4-output | `background-color` (Waste) |
| `--dss-waste-500` | 4-output | `background-color` (Waste dark) |
| `--dss-gray-50` | 4-output | `color` (texto sobre brand) |
