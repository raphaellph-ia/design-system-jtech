<script setup lang="ts">
/**
 * ==========================================================================
 * DssTextarea — Layer 1: Structure
 *
 * RESPONSABILIDADE: Estrutura Vue e lógica do componente.
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: false
 *   → $attrs é repassado explicitamente para o QInput via v-bind="$attrs".
 *   → Evita que atributos HTML extras (data-*, id, etc.) sejam aplicados
 *     em um wrapper externo inexistente — o QInput É o elemento raiz.
 *
 * type="textarea" — FIXO (não é prop)
 *   → DssTextarea sempre representa um campo de texto multilinhas.
 *   → Não expõe a prop `type`. Usar DssInput para outros tipos de input.
 *
 * QInput como root element
 *   → DssTextarea NÃO cria um wrapper <div> externo.
 *   → O QInput é o elemento raiz, e nossas classes DSS são aplicadas
 *     diretamente a ele via :class="wrapperClasses".
 *   → O SCSS do DSS usa .dss-textarea como hook para sobrescrever
 *     os estilos padrão do Quasar via seletores descendentes.
 *
 * Slots: label, before, prepend, append, after, error, hint
 *   → Todos os slots do QInput são encaminhados via passthrough dinâmico.
 *
 * Events: update:modelValue, focus, blur, clear
 *
 * maxHeight prop
 *   → Implementada via CSS custom property --dss-textarea-max-height.
 *   → Aplicada como inline style no QInput raiz.
 *   → O SCSS usa var(--dss-textarea-max-height, none) no .q-field__native.
 *   → Não é um token DSS — é uma ponte entre prop e CSS (EX-01).
 *
 * autogrow
 *   → Delega diretamente para a prop autogrow do QInput.
 *   → Quando true, o textarea cresce verticalmente com o conteúdo.
 *   → maxHeight limita esse crescimento via CSS.
 *
 * rows
 *   → Delega para a prop rows do QInput.
 *   → Define a altura inicial/mínima em linhas de texto.
 *
 * Touch Target: Opção A (interativo)
 *   → min-height: var(--dss-input-height-md) aplicado no SCSS.
 *   → O campo textarea em si é a área de toque — sem ::before necessário.
 *   → Consistente com a decisão de governança do DssInput (auditoria Jan 2026).
 *
 * Estados NÃO aplicáveis: indeterminate (binário não se aplica),
 *   loading Phase 1 (exibido via spinner visual sem bloquear digitação).
 * ==========================================================================
 */

import { ref, computed, useSlots } from 'vue'
import { QInput } from 'quasar'
import type { TextareaProps, TextareaEmits, TextareaExpose } from '../types/textarea.types'
import { useTextareaClasses, useTextareaState, useTextareaActions } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssTextarea',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TextareaProps>(), {
  // Model
  modelValue: '',

  // Visual
  variant: 'outlined',
  dense: false,
  brand: null,

  // Content
  label: '',
  stackLabel: false,
  placeholder: '',
  hint: '',
  errorMessage: '',

  // State
  error: false,
  disabled: false,
  readonly: false,
  loading: false,
  required: false,

  // Features
  clearable: false,
  autogrow: false,
  rows: 3,

  // Accessibility
  clearAriaLabel: 'Clear textarea',
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<TextareaEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

const qInputRef = ref<InstanceType<typeof QInput> | null>(null)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { isFocused, hasValue } = useTextareaState(props)
const { wrapperClasses } = useTextareaClasses(props, { isFocused, hasValue })
const { handleFocus, handleBlur, focus, blur, getNativeEl } = useTextareaActions(
  emit,
  qInputRef,
  isFocused
)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Tabindex computado
 *
 * - Desabilitado/Loading: -1 (não focável)
 * - Customizado: usa prop tabindex
 * - Padrão: 0 (focável na ordem natural)
 */
const computedTabindex = computed(() => {
  if (props.disabled || props.loading) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number'
      ? props.tabindex
      : parseInt(String(props.tabindex))
  }
  return 0
})

/**
 * Estilo inline para aplicar a maxHeight via CSS custom property.
 *
 * Bridge entre a prop maxHeight (valor CSS como string) e o SCSS que
 * consome var(--dss-textarea-max-height, none) no .q-field__native.
 *
 * EX-01: --dss-textarea-max-height não é token DSS — é CSS variable
 * de componente para bridge prop→CSS. Documentado como exceção.
 */
const maxHeightStyle = computed(() => {
  return props.maxHeight ? { '--dss-textarea-max-height': props.maxHeight } : {}
})

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<TextareaExpose>({
  focus,
  blur,
  get nativeEl() {
    return getNativeEl()
  }
})
</script>

<template>
  <QInput
    ref="qInputRef"
    :class="wrapperClasses"
    :style="maxHeightStyle"
    type="textarea"
    :model-value="modelValue"
    :label="label"
    :stack-label="stackLabel"
    :placeholder="placeholder"
    :hint="hint"
    :error="error"
    :error-message="errorMessage"
    :disabled="disabled"
    :readonly="readonly"
    :loading="loading"
    :clearable="clearable"
    :outlined="variant === 'outlined'"
    :filled="variant === 'filled'"
    :standout="variant === 'standout'"
    :borderless="variant === 'borderless'"
    :dense="dense"
    :autogrow="autogrow"
    :rows="rows"
    :tabindex="computedTabindex"
    :aria-label="ariaLabel || undefined"
    :aria-required="required ? 'true' : undefined"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', String($event ?? ''))"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="emit('clear')"
  >
    <!-- Passthrough dinâmico de todos os slots para o QInput -->
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </QInput>
</template>
