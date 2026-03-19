# DssTextarea — API Reference

**Versão DSS**: 2.2.0
**Golden Reference**: DssInput
**Golden Context**: DssInput

---

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `string` | `''` | Valor do textarea (v-model) |
| `variant` | `TextareaVariant` | `'outlined'` | Variante visual |
| `dense` | `boolean` | `false` | Versão compacta (altura reduzida, padding menor) |
| `brand` | `TextareaBrand \| null` | `null` | Marca Sansys: `hub`, `water`, `waste` |
| `label` | `string` | `''` | Label flutuante |
| `stackLabel` | `boolean` | `false` | Label sempre visível no topo (não flutua) |
| `placeholder` | `string` | `''` | Placeholder do textarea |
| `hint` | `string` | `''` | Texto de ajuda abaixo do campo |
| `errorMessage` | `string` | `''` | Mensagem de erro abaixo do campo |
| `error` | `boolean` | `false` | Ativa estado de erro (borda/texto vermelho) |
| `disabled` | `boolean` | `false` | Desabilitado (opacity 0.4, sem interação) |
| `readonly` | `boolean` | `false` | Somente leitura (editável = false, focável = true) |
| `loading` | `boolean` | `false` | Exibe spinner de loading |
| `required` | `boolean` | `false` | Campo obrigatório (adiciona `aria-required="true"`) |
| `clearable` | `boolean` | `false` | Exibe botão × para limpar o valor |
| `autogrow` | `boolean` | `false` | Cresce automaticamente com o conteúdo |
| `rows` | `number \| string` | `3` | Número de linhas visíveis inicialmente |
| `maxHeight` | `string` | `undefined` | Altura máxima CSS (ex.: `'300px'`, `'50vh'`). Limita crescimento do autogrow |
| `ariaLabel` | `string` | `undefined` | Label de acessibilidade para screen readers |
| `clearAriaLabel` | `string` | `'Clear textarea'` | Label acessível do botão clear |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado |

### Tipos

```typescript
type TextareaVariant = 'filled' | 'outlined' | 'standout' | 'borderless'
type TextareaBrand = 'hub' | 'water' | 'waste'
```

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string` | Emitido ao digitar (v-model) |
| `focus` | `FocusEvent` | Emitido quando o textarea recebe foco |
| `blur` | `FocusEvent` | Emitido quando o textarea perde foco |
| `clear` | — | Emitido ao clicar no botão de limpar |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `label` | Label customizado |
| `before` | Conteúdo antes do campo wrapper |
| `prepend` | Conteúdo interno à esquerda |
| `append` | Conteúdo interno à direita |
| `after` | Conteúdo após o campo wrapper |
| `error` | Mensagem de erro customizada |
| `hint` | Texto de ajuda customizado |

---

## Expose (ref)

| Método/Propriedade | Tipo | Descrição |
|--------------------|------|-----------|
| `focus()` | `() => void` | Foca no textarea programaticamente |
| `blur()` | `() => void` | Remove foco do textarea |
| `nativeEl` | `HTMLTextAreaElement \| null` | Referência ao `<textarea>` nativo |

---

## Tokens DSS Utilizados

### Tipografia
- `--dss-font-family-sans`
- `--dss-font-size-md` (texto principal)
- `--dss-font-size-sm` (label flutuante, hint, error)
- `--dss-line-height-normal`

### Dimensões
- `--dss-input-height-md` (44px — Touch Target mínimo, Layer 2)
- `--dss-input-height-sm` (36px — modo dense)
- `--dss-spacing-1` a `--dss-spacing-5` (padding interno)
- `--dss-radius-md` (border-radius das variantes outlined, filled, standout)

### Bordas
- `--dss-border-width-thin` (estado neutro)
- `--dss-border-width-md` (foco / erro)
- `--dss-border-width-thick` (high contrast a11y)

### Cores
- `--dss-text-primary` (texto digitado)
- `--dss-text-secondary` (label, hint, appendages)
- `--dss-text-hint` (placeholder)
- `--dss-text-disabled` (estado disabled)
- `--dss-text-inverse`, `--dss-text-inverse-secondary`, `--dss-text-inverse-hint` (dark mode)
- `--dss-gray-50` a `--dss-gray-900` (fundos, bordas)
- `--dss-action-primary` (foco padrão)
- `--dss-error-600` (estado de erro)
- `--dss-focus-ring` (outline de acessibilidade)
- `--dss-surface-default` (label notch em outlined)
- `--dss-opacity-disabled` (0.4)

### Motion
- `--dss-duration-200`
- `--dss-easing-standard`

### Brand
- `--dss-hub-600`, `--dss-hub-700`
- `--dss-water-500`, `--dss-water-600`, `--dss-water-700`
- `--dss-waste-600`, `--dss-waste-700`, `--dss-waste-800`

---

## CSS Custom Properties de Componente (não-tokens)

| Propriedade | Origem | Descrição |
|-------------|--------|-----------|
| `--dss-textarea-max-height` | Prop `maxHeight` (inline style) | Altura máxima da área de texto. Consumida em `.q-field__native { max-height: var(--dss-textarea-max-height, none) }`. Documentada como EX-01. |

---

## Composables

### `useTextareaClasses(props, { isFocused, hasValue })`
Gera as classes CSS aplicadas ao elemento raiz do QInput.

```typescript
const { wrapperClasses } = useTextareaClasses(props, { isFocused, hasValue })
// wrapperClasses: ['dss-textarea', 'dss-textarea--outlined', { 'dss-textarea--focused': true }]
```

### `useTextareaState(props)`
Rastreia estado reativo de foco e preenchimento.

```typescript
const { isFocused, hasValue } = useTextareaState(props)
// isFocused: Ref<boolean>
// hasValue: ComputedRef<boolean>
```

### `useTextareaActions(emit, qInputRef, isFocused)`
Handlers de eventos e métodos programáticos.

```typescript
const { handleFocus, handleBlur, focus, blur, getNativeEl } =
  useTextareaActions(emit, qInputRef, isFocused)
```

---

## Variantes Visuais

| Variante | Descrição | Uso recomendado |
|----------|-----------|-----------------|
| `outlined` (padrão) | Borda completa, fundo transparente | Formulários gerais |
| `filled` | Fundo preenchido, borda inferior | Densidade visual maior |
| `standout` | Fundo sutil + sombra no foco | Destaque, formulários isolados |
| `borderless` | Sem borda, sublinhado no foco | Dentro de cards ou contextos delimitados |

---

## Diferenças em relação ao DssInput

| Aspecto | DssInput | DssTextarea |
|---------|----------|-------------|
| Elemento base | `<input>` nativo | `QInput` com `type="textarea"` |
| HTML gerado | Próprio (sem Quasar) | `.q-field__*` do Quasar |
| SCSS target | `.dss-input__*` (classes próprias) | `.dss-textarea .q-field__*` (override Quasar) |
| Prop `type` | Aceita (text, email, etc.) | NÃO exposta (`textarea` fixo) |
| Prop `autogrow` | Não existe | Existe |
| Prop `rows` | Não existe | Existe |
| Prop `maxHeight` | Não existe | Existe (via CSS var bridge) |
| Touch Target | `min-height` no `__field` | `min-height` no `q-field__control` |
