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
        <label v-if="label || slots.label" :class="labelClasses">
          <slot name="label">{{ label }}</slot>
        </label>

        <!-- Native input -->
        <input
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="inputClasses"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>

      <!-- Append slot -->
      <div v-if="slots.append || clearable" class="dss-input__append">
        <slot name="append" />
        <button
          v-if="clearable && modelValue"
          class="dss-input__clear"
          type="button"
          @click="handleClear"
          aria-label="Clear input"
        >
          ×
        </button>
      </div>
    </div>

    <!-- After slot -->
    <div v-if="slots.after" class="dss-input__after">
      <slot name="after" />
    </div>

    <!-- Bottom slots (hint/error) -->
    <div v-if="hasBottomSlot" class="dss-input__bottom">
      <div v-if="error && errorMessage" class="dss-input__error">
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div v-else-if="hint" class="dss-input__hint">
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
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { ref, useSlots } from 'vue'
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
  modelValue: '',
  variant: 'outlined',
  type: 'text',
  label: '',
  stackLabel: false,
  placeholder: '',
  hint: '',
  error: false,
  errorMessage: '',
  disabled: false,
  readonly: false,
  dense: false,
  clearable: false,
  loading: false,
  brand: null
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
// EXPOSE
// ==========================================================================

defineExpose<InputExpose>({
  focus,
  blur
})
</script>

<style src="../DssInput.module.scss" module></style>
