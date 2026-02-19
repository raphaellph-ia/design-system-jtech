<template>
  <label
    :class="checkboxClasses"
    :data-brand="brand || undefined"
    v-bind="$attrs"
  >
    <!-- Label LEFT (when leftLabel is true) -->
    <span
      v-if="hasLabel && leftLabel"
      class="dss-checkbox__label dss-checkbox__label--left"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- Hidden native input for accessibility + form submission -->
    <input
      ref="inputRef"
      type="checkbox"
      class="dss-checkbox__native"
      :checked="isChecked"
      :disabled="disable"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel"
      :value="val"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <!-- Visual control indicator -->
    <span
      class="dss-checkbox__control"
      :class="controlClasses"
      aria-hidden="true"
    >
      <!-- Check mark icon (real element - NOT pseudo-element) -->
      <span
        v-if="isChecked"
        class="dss-checkbox__check material-icons"
        aria-hidden="true"
      >check</span>

      <!-- Indeterminate dash icon (real element - NOT pseudo-element) -->
      <span
        v-if="isIndeterminate"
        class="dss-checkbox__dash material-icons"
        aria-hidden="true"
      >remove</span>
    </span>

    <!-- Label RIGHT (default position) -->
    <span
      v-if="hasLabel && !leftLabel"
      class="dss-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCheckbox - Design System Sansys Checkbox Component
 * ==========================================================================
 *
 * Componente de checkbox moderno com TypeScript + Composition API
 * Baseado na API do Quasar q-checkbox com extensoes DSS
 *
 * Golden Context: DssChip (Compact Control interativo)
 *
 * @see https://quasar.dev/vue-components/checkbox
 *
 * @example
 * ```vue
 * <DssCheckbox
 *   v-model="accepted"
 *   color="primary"
 *   label="Accept terms and conditions"
 * />
 * ```
 *
 * @version 1.0.0
 * @author Design System Sansys Team
 */

import { computed, ref, useSlots, watchEffect } from 'vue'
import type { CheckboxProps, CheckboxEmits } from '../types/checkbox.types'
import { useCheckboxClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCheckbox',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CheckboxProps>(), {
  // Value / Model
  modelValue: false,
  trueValue: true,
  falseValue: false,
  indeterminateValue: null,
  toggleIndeterminate: false,

  // Content
  label: '',
  leftLabel: false,

  // Visual
  color: 'primary',
  size: 'md',

  // States
  disable: false,
  dense: false,

  // Brand
  brand: null,

  // Accessibility
  tabindex: null,
  ariaLabel: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<CheckboxEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// REFS
// ==========================================================================

/** Referencia ao input nativo */
const inputRef = ref<HTMLInputElement | null>(null)

/** Estado de foco do input */
const isFocused = ref(false)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Verifica se o checkbox esta marcado
 *
 * - Array mode: verifica se val esta no array
 * - Single mode: compara com trueValue
 */
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.val)
  }
  return props.modelValue === props.trueValue
})

/**
 * Verifica se o checkbox esta em estado indeterminate
 *
 * Apenas em single mode (arrays nao suportam indeterminate)
 */
const isIndeterminate = computed(() => {
  if (Array.isArray(props.modelValue)) return false
  return props.modelValue === props.indeterminateValue
})

/**
 * Detecta se ha conteudo de label (prop ou slot)
 */
const hasLabel = computed(() => !!(props.label || slots.default))

/**
 * Tabindex computado - SOMENTE para o input nativo
 *
 * - Desabilitado: -1 (nao focavel)
 * - Customizado: usa prop tabindex
 * - Padrao: 0 (sempre focavel, diferente do DssChip)
 */
const computedTabindex = computed(() => {
  if (props.disable) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return 0
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { checkboxClasses, controlColorClasses } = useCheckboxClasses(
  props,
  { isChecked, isIndeterminate }
)

/**
 * Classes CSS do indicador visual (.dss-checkbox__control)
 *
 * Combina classes de estado + classes de cor
 */
const controlClasses = computed(() => [
  controlColorClasses.value,
  {
    'dss-checkbox__control--checked': isChecked.value,
    'dss-checkbox__control--indeterminate': isIndeterminate.value,
    'dss-checkbox__control--focused': isFocused.value,
  }
])

// ==========================================================================
// WATCHERS
// ==========================================================================

/**
 * Sincroniza a propriedade DOM 'indeterminate' do input nativo
 *
 * 'indeterminate' e uma propriedade DOM, nao um atributo HTML,
 * portanto nao pode ser setada via template binding.
 * O browser expoe automaticamente aria-checked="mixed" quando
 * indeterminate=true.
 */
watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = isIndeterminate.value
  }
})

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de mudanca do checkbox
 *
 * Suporta 3 modos:
 * 1. Array (grupo): adiciona/remove val do array
 * 2. Single com toggleIndeterminate: cicla unchecked -> checked -> indeterminate
 * 3. Single simples: toggle true/false
 */
function handleChange() {
  if (props.disable) return

  // Modo 1: Array (grupo)
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    const idx = newValue.indexOf(props.val)
    if (idx === -1) {
      newValue.push(props.val)
    } else {
      newValue.splice(idx, 1)
    }
    emit('update:modelValue', newValue)
    return
  }

  // Modo 2: Ciclo de 3 estados
  if (props.toggleIndeterminate) {
    if (isIndeterminate.value) {
      // indeterminate -> unchecked
      emit('update:modelValue', props.falseValue)
    } else if (isChecked.value) {
      // checked -> indeterminate
      emit('update:modelValue', props.indeterminateValue)
    } else {
      // unchecked -> checked
      emit('update:modelValue', props.trueValue)
    }
    return
  }

  // Modo 3: Toggle simples
  emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue)
}
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
