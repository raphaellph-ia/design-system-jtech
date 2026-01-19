<template>
  <div :class="wrapperClasses">
    <!-- Before slot -->
    <div v-if="slots.before" class="dss-input__before">
      <slot name="before" />
    </div>

    <!-- Main field wrapper -->
    <div class="dss-input__field">
      <!-- Prepend slot -->
      <div v-if="slots.prepend" class="dss-input__prepend">
        <slot name="prepend" />
      </div>

      <!-- Input control -->
      <div class="dss-input__control">
        <!-- Label -->
        <label
          v-if="label || slots.label"
          :id="labelId"
          :for="inputId"
          :class="labelClasses"
        >
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Native input -->
        <input
          :id="inputId"
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="computedPlaceholder"
          :disabled="disabled || loading"
          :readonly="readonly"
          :class="inputClasses"
          :tabindex="computedTabindex"
          :aria-label="ariaLabel"
          :aria-labelledby="label ? labelId : undefined"
          :aria-describedby="ariaDescribedBy"
          :aria-invalid="error ? 'true' : undefined"
          :aria-busy="loading ? 'true' : undefined"
          :aria-disabled="disabled ? 'true' : undefined"
          :aria-readonly="readonly ? 'true' : undefined"
          :aria-required="required ? 'true' : undefined"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- Append slot -->
      <div v-if="slots.append || clearable || loading" class="dss-input__append">
        <slot name="append" />

        <!-- Loading spinner with ARIA -->
        <span
          v-if="loading"
          class="dss-input__loading"
          role="status"
          aria-label="Loading"
          aria-live="polite"
        >
          <span class="dss-input__spinner" aria-hidden="true"></span>
        </span>

        <!-- Clear button -->
        <button
          v-if="clearable && hasValue && !loading && !disabled && !readonly"
          class="dss-input__clear"
          type="button"
          :tabindex="-1"
          :aria-label="clearAriaLabel"
          @click="handleClear"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>

    <!-- After slot -->
    <div v-if="slots.after" class="dss-input__after">
      <slot name="after" />
    </div>

    <!-- Bottom slots (hint/error) -->
    <div v-if="hasBottomSlot" class="dss-input__bottom">
      <div
        v-if="error && errorMessage"
        :id="errorId"
        class="dss-input__error"
        role="alert"
        aria-live="assertive"
      >
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div
        v-else-if="hint"
        :id="hintId"
        class="dss-input__hint"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssInput - Design System Sansys Input Component
 * ==========================================================================
 *
 * Componente de input moderno com TypeScript + Composition API
 * 100% compatível com Quasar q-input API
 *
 * @see https://quasar.dev/vue-components/input
 *
 * @example
 * ```vue
 * <DssInput
 *   v-model="email"
 *   type="email"
 *   label="Email"
 *   hint="Enter your email address"
 *   clearable
 * />
 * ```
 *
 * @version 2.3.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { ref, computed, useSlots } from 'vue'
import type { InputProps, InputEmits, InputExpose } from '../types/input.types'
import { useInputClasses, useInputState, useInputActions } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssInput',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<InputProps>(), {
  // Model
  modelValue: '',

  // Visual
  variant: 'outlined',
  type: 'text',
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

  // Accessibility
  ariaLabel: undefined,
  clearAriaLabel: 'Clear input',
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<InputEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

const inputRef = ref<HTMLInputElement | null>(null)

// ==========================================================================
// UNIQUE IDS (Accessibility)
// ==========================================================================

const uniqueId = Math.random().toString(36).substring(2, 9)
const inputId = computed(() => `dss-input-${uniqueId}`)
const labelId = computed(() => `dss-input-label-${uniqueId}`)
const hintId = computed(() => `dss-input-hint-${uniqueId}`)
const errorId = computed(() => `dss-input-error-${uniqueId}`)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { isFocused, hasValue, hasBottomSlot } = useInputState(props, slots)
const { wrapperClasses, labelClasses, inputClasses } = useInputClasses(props, { isFocused, hasValue })
const { handleInput, handleFocus, handleBlur, handleClear, focus, blur } = useInputActions(
  emit,
  inputRef,
  isFocused
)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Placeholder computado
 *
 * Se stackLabel=false e tem label, só mostra placeholder quando focado
 */
const computedPlaceholder = computed(() => {
  if (props.stackLabel || !props.label) {
    return props.placeholder
  }
  return isFocused.value || hasValue.value ? props.placeholder : ''
})

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
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return 0
})

/**
 * IDs para aria-describedby
 *
 * Conecta o input com hint ou error message para screen readers
 */
const ariaDescribedBy = computed(() => {
  const ids: string[] = []

  if (props.error && props.errorMessage) {
    ids.push(errorId.value)
  } else if (props.hint) {
    ids.push(hintId.value)
  }

  return ids.length > 0 ? ids.join(' ') : undefined
})

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<InputExpose>({
  focus,
  blur,
  inputRef
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
