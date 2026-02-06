<template>
  <label
    :class="toggleClasses"
    :data-brand="brand || undefined"
    v-bind="$attrs"
  >
    <!-- Label LEFT (when leftLabel is true) -->
    <span
      v-if="hasLabel && leftLabel"
      class="dss-toggle__label dss-toggle__label--left"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- Hidden native input for accessibility + form submission -->
    <input
      ref="inputRef"
      type="checkbox"
      role="switch"
      class="dss-toggle__native"
      :checked="isChecked"
      :disabled="disable"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel"
      :aria-checked="isChecked"
      :aria-disabled="disable || undefined"
      :aria-invalid="error || undefined"
      :aria-describedby="errorDescribedBy"
      :value="val"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <!-- Visual toggle track (decorative) -->
    <span
      class="dss-toggle__track"
      :class="trackClasses"
      aria-hidden="true"
    >
      <!-- Toggle thumb (knob) -->
      <span
        class="dss-toggle__thumb"
        aria-hidden="true"
      ></span>
    </span>

    <!-- Label RIGHT (default position) -->
    <span
      v-if="hasLabel && !leftLabel"
      class="dss-toggle__label"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- Error message -->
    <span
      v-if="error && errorMessage"
      :id="errorId"
      class="dss-toggle__error"
      role="alert"
      aria-live="assertive"
    >{{ errorMessage }}</span>
  </label>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssToggle - Design System Sansys Toggle/Switch Component
 * ==========================================================================
 *
 * Componente de toggle (switch) moderno com TypeScript + Composition API
 * Baseado na API do Quasar QToggle com extensoes DSS
 *
 * Golden Component de referencia: DssCheckbox (Compact Control interativo)
 * Referencia secundaria: DssRadio (error state, aria-describedby)
 *
 * Diferenca principal do DssCheckbox:
 * - Toggle usa role="switch" (WAI-ARIA switch pattern)
 * - Toggle nao suporta estado indeterminate (binario puro)
 * - Toggle tem track + thumb ao inves de caixa + checkmark
 * - Toggle suporta error state (seguindo DssRadio)
 *
 * @see https://quasar.dev/vue-components/toggle
 *
 * @example
 * ```vue
 * <DssToggle
 *   v-model="notifications"
 *   color="primary"
 *   label="Enable notifications"
 * />
 * ```
 *
 * @version 1.0.0
 * @author Design System Sansys Team
 */

import { computed, ref, useSlots } from 'vue'
import type { ToggleProps, ToggleEmits } from '../types/toggle.types'
import { useToggleClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssToggle',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ToggleProps>(), {
  // Value / Model
  modelValue: false,
  trueValue: true,
  falseValue: false,

  // Content
  label: '',
  leftLabel: false,

  // Visual
  color: 'primary',
  size: 'md',

  // States
  disable: false,
  dense: false,
  error: false,
  errorMessage: '',

  // Brand
  brand: null,

  // Accessibility
  tabindex: null,
  ariaLabel: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ToggleEmits>()

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
// UNIQUE ID (for aria-describedby)
// ==========================================================================

/**
 * ID unico para associacao error message <-> input via aria-describedby
 * Usa hash simples baseado em timestamp + random
 */
const uid = Math.random().toString(36).substring(2, 8)
const errorId = `dss-toggle-error-${uid}`

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Verifica se o toggle esta ativo (on)
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
 * Detecta se ha conteudo de label (prop ou slot)
 */
const hasLabel = computed(() => !!(props.label || slots.default))

/**
 * Tabindex computado - SOMENTE para o input nativo
 *
 * - Desabilitado: -1 (nao focavel)
 * - Customizado: usa prop tabindex
 * - Padrao: 0 (sempre focavel)
 */
const computedTabindex = computed(() => {
  if (props.disable) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return 0
})

/**
 * aria-describedby para associar input com mensagem de erro
 */
const errorDescribedBy = computed(() => {
  if (props.error && props.errorMessage) {
    return errorId
  }
  return undefined
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { toggleClasses, trackColorClasses } = useToggleClasses(
  props,
  { isChecked }
)

/**
 * Classes CSS do track (.dss-toggle__track)
 *
 * Combina classes de estado + classes de cor
 */
const trackClasses = computed(() => [
  trackColorClasses.value,
  {
    'dss-toggle__track--checked': isChecked.value,
    'dss-toggle__track--focused': isFocused.value,
  }
])

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de mudanca do toggle
 *
 * Suporta 2 modos:
 * 1. Array (grupo): adiciona/remove val do array
 * 2. Single: toggle true/false (ou trueValue/falseValue)
 *
 * Nota: Toggle NAO suporta indeterminate (diferenca do DssCheckbox)
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

  // Modo 2: Toggle simples
  emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue)
}

// ==========================================================================
// EXPOSE (public API)
// ==========================================================================

/**
 * API publica do componente
 * Permite controle programatico de foco
 */
defineExpose({
  /** Foca o input nativo */
  focus: () => inputRef.value?.focus(),
  /** Remove foco do input nativo */
  blur: () => inputRef.value?.blur()
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
