# DssRange — API Reference

**Versão DSS**: 2.2.0 | **Componente**: DssRange | **Status**: Conformant

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `{ min: number, max: number }` | **Obrigatório** | Intervalo atual (v-model). Objeto com `min` e `max`. **Diferença crítica em relação ao DssSlider**: este componente exige um objeto, não um escalar. |
| `min` | `number` | `0` | Valor mínimo da escala. |
| `max` | `number` | `100` | Valor máximo da escala. |
| `step` | `number` | `1` | Incremento por passo. Use `0` para contínuo. |
| `markers` | `boolean` | `false` | Exibe marcadores de passo no track. |
| `label` | `boolean` | `false` | Exibe tooltip com valor atual durante arrasto. |
| `dragRange` | `boolean` | `false` | Permite arrastar o intervalo inteiro (mantém distância fixa entre os dois thumbs). |
| `hint` | `string` | `''` | Texto de ajuda abaixo do controle (oculto quando `error=true`). |
| `errorMessage` | `string` | `''` | Mensagem de erro exibida quando `error=true`. Associada via `aria-describedby`. |
| `error` | `boolean` | `false` | Ativa estado de erro (cor `--dss-feedback-error`). |
| `disabled` | `boolean` | `false` | Desabilita o range. |
| `readonly` | `boolean` | `false` | Range somente leitura — exibe mas não permite interação. |
| `dense` | `boolean` | `false` | Modo compacto (touch target reduzido para `--dss-touch-target-sm`, 36px). |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys. Substitui `--dss-action-primary` no contexto do componente. |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado. `disabled=true` força `-1`. |
| `ariaLabel` | `string \| undefined` | — | Label acessível para screen readers. **Fortemente recomendado** quando não há label visual associado (WCAG 1.3.1). Dev warning emitido em desenvolvimento quando ausente. |

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `{ min: number, max: number }` | Intervalo mudou durante arrasto (tempo real, contínuo). |
| `change` | `{ min: number, max: number }` | Intervalo confirmado ao soltar o thumb (mouse-up / touch-end). |

---

## Expose (métodos públicos)

```ts
const rangeRef = ref<RangeExpose>()

rangeRef.value?.focus()   // Foca no range (delega ao QRange.$el)
rangeRef.value?.blur()    // Remove o foco (delega ao QRange.$el)
```

---

## Props QRange não expostas (Fase 1)

As seguintes props do QRange **não são expostas** pelo DssRange na Fase 1. Passá-las diretamente via `v-bind` ou atributo HTML pode funcionar via `$attrs`, mas não é suportado oficialmente.

| Prop QRange | Tipo | Justificativa da exclusão |
|-------------|------|--------------------------|
| `color` | `string` | **Governança de cor**: cor controlada exclusivamente por `--dss-action-primary` via SCSS. Expor `color` quebraria o Token First. Anti-pattern explícito no README e DssRange.md. |
| `snap` | `boolean` | **Fase 1**: comportamento não incluído no escopo mínimo. Disponível via `$attrs` se necessário. |
| `labelAlways` | `boolean` | **Fase 1**: tooltip permanente aumenta complexidade visual. Revisão para Fase 2. |

---

## Tokens Utilizados

**Total: 34 tokens**

| Categoria | Tokens |
|-----------|--------|
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-weight-medium`, `--dss-line-height-normal` |
| Dimensões | `--dss-touch-target-md`, `--dss-touch-target-sm`, `--dss-spacing-0_5`, `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-4`, `--dss-spacing-5` |
| Ação / Cor principal | `--dss-action-primary` |
| Superfícies | `--dss-surface-muted`, `--dss-surface-disabled` |
| Cores — gray | `--dss-gray-300`, `--dss-gray-400`, `--dss-gray-700`, `--dss-gray-900` |
| Cores — texto | `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-inverse` |
| Feedback | `--dss-feedback-error` |
| Opacidade | `--dss-opacity-disabled` |
| Sombras / Focus | `--dss-shadow-focus`, `--dss-focus-ring-width` |
| Forma | `--dss-radius-md` |
| Bordas | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick` |
| Motion | `--dss-duration-200`, `--dss-easing-standard` |
| Brand Hub | `--dss-hub-600` |
| Brand Water | `--dss-water-500` |
| Brand Waste | `--dss-waste-600` |

---

## CSS Classes Públicas

| Classe | Condição |
|--------|----------|
| `dss-range` | Sempre presente (wrapper externo) |
| `dss-range--focused` | Quando o range está com foco (qualquer thumb) |
| `dss-range--error` | `error=true` |
| `dss-range--disabled` | `disabled=true` |
| `dss-range--readonly` | `readonly=true` |
| `dss-range--dense` | `dense=true` |
| `dss-range--drag-range` | `dragRange=true` — aplica `cursor: grab` (EX-07) |
| `dss-range--brand-hub` | `brand="hub"` ou `[data-brand="hub"]` no ancestral |
| `dss-range--brand-water` | `brand="water"` ou `[data-brand="water"]` no ancestral |
| `dss-range--brand-waste` | `brand="waste"` ou `[data-brand="waste"]` no ancestral |
