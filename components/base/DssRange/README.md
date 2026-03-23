# DssRange

**Classificação:** Action Control interativo — seleção de intervalo numérico
**Fase:** 1
**Golden Reference:** DssSlider
**Golden Context:** DssInput
**Status:** pending-audit

---

## O que é

`DssRange` é o componente DSS para seleção de intervalos numéricos com dois thumbs. É um wrapper direto do `QRange` do Quasar, aplicando governança DSS de tokens, acessibilidade e brandabilidade.

## Quando usar

- Filtros de faixa de preço (ex.: R$ 100 — R$ 500)
- Seleção de intervalos numéricos (idade, peso, distância)
- Ajuste de limites mínimo e máximo simultaneamente
- Configurações com valor inicial e valor final

## Quando NÃO usar

- Para seleção de **valor único** → use `DssSlider`
- Para **listas de opções discretas** → use `DssSelect`
- Quando os valores têm semântica própria ("Baixo/Médio/Alto") → use `DssSelect` ou `DssRadio`
- Para entrada de texto numérico exato → use `DssInput` com `type="number"`

---

## Instalação

```javascript
import { DssRange } from '@dss/components/DssRange'
```

## Uso básico

```vue
<template>
  <DssRange
    v-model="priceRange"
    :min="0"
    :max="1000"
    :step="10"
    aria-label="Faixa de preço"
  />
</template>

<script setup>
import { ref } from 'vue'
const priceRange = ref({ min: 100, max: 500 })
</script>
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `{ min: number, max: number }` | **Obrigatório** | Valor atual do range (v-model) |
| `min` | `number` | `0` | Valor mínimo permitido |
| `max` | `number` | `100` | Valor máximo permitido |
| `step` | `number` | `1` | Incremento do passo |
| `label` | `boolean` | `false` | Exibe tooltip flutuante com valor durante drag |
| `markers` | `boolean` | `false` | Exibe marcações de passo no track |
| `dragRange` | `boolean` | `false` | Permite arrastar o intervalo inteiro |
| `dense` | `boolean` | `false` | Modo compacto (touch target: 36px) |
| `disabled` | `boolean` | `false` | Desabilita toda interação |
| `readonly` | `boolean` | `false` | Somente leitura |
| `error` | `boolean` | `false` | Ativa estado de erro |
| `errorMessage` | `string` | `''` | Mensagem de erro (exibida quando `error=true`) |
| `hint` | `string` | `''` | Texto de ajuda (exibido quando não há erro) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Contexto de brand |
| `ariaLabel` | `string` | — | Rótulo para leitores de tela (WCAG 1.3.1) |

## Eventos

| Evento | Payload | Quando |
|--------|---------|--------|
| `update:modelValue` | `{ min: number, max: number }` | Continuamente durante o drag |
| `change` | `{ min: number, max: number }` | Ao soltar o thumb |

## Métodos expostos

```typescript
const rangeRef = ref()
rangeRef.value.focus() // foca o componente
rangeRef.value.blur()  // remove o foco
```

---

## Acessibilidade

- **Touch target mínimo:** `var(--dss-touch-target-md)` = 44px (WCAG 2.5.5)
- **Touch target dense:** `var(--dss-touch-target-sm)` = 36px
- **`ariaLabel` obrigatório** quando não há label visual (WCAG 1.3.1)
- **Focus ring visível** via `var(--dss-shadow-focus)`
- **`errorMessage`** associada ao range via `aria-describedby`
- **`prefers-reduced-motion`** suportado — transições desabilitadas
- **`forced-colors`** suportado — Windows High Contrast Mode

## Tokens utilizados (35)

| Categoria | Tokens |
|-----------|--------|
| Spacing | `--dss-spacing-{0_5, 1, 2, 4, 5}` |
| Typography | `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-weight-medium`, `--dss-line-height-normal` |
| Colors | `--dss-action-primary`, `--dss-surface-muted`, `--dss-surface-disabled`, `--dss-feedback-error`, `--dss-text-{hint,inverse,secondary}`, `--dss-gray-{300,400,700,900}` |
| Interaction | `--dss-touch-target-{md,sm}`, `--dss-opacity-disabled`, `--dss-shadow-focus`, `--dss-focus-ring-width` |
| Motion | `--dss-duration-200`, `--dss-easing-standard` |
| Border | `--dss-radius-md`, `--dss-border-width-{thin,md,thick}` |
| Brand | `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600` |

---

## Anti-patterns

- ❌ **Usar para valor único** → use `DssSlider`
- ❌ **Definir `color` via prop** → cor governada por tokens DSS via SCSS
- ❌ **Omitir `ariaLabel`** → viola WCAG 1.3.1
- ❌ **Passar `min > max`** → previna na lógica de negócio antes das props
- ❌ **Usar `dragRange` sem instrução ao usuário** → interação não é óbvia sem contexto
