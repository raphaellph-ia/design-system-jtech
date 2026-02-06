<script setup lang="ts">
/**
 * DssRadio — Layer 1: Structure
 * Design System Sansys v2.2
 *
 * Classificacao: Compact Control interativo
 * Golden Component de referencia: DssCheckbox (arquitetura, estados, tokens)
 * Golden Component secundario: DssChip (touch target, pseudo-elementos)
 *
 * Subset controlado da API do Quasar q-radio.
 * Este componente NAO replica a API completa do q-radio.
 * Diferencias em relacao a q-radio:
 *   - Sem suporte a keep-color
 *   - Sem suporte a checked-icon / unchecked-icon customizados
 *   - Sem integracao com QOptionGroup (usar agrupamento nativo via prop name)
 *   - Cores aplicadas via classes utilitarias Quasar ou sistema de brands DSS
 */

import { ref, computed, useSlots, type StyleValue } from 'vue'
import type { RadioProps, RadioEmits } from '../types/radio.types'
import { useRadioClasses } from '../composables/useRadioClasses'

// ---------------------------------------------------------------------------
// Component Options
// ---------------------------------------------------------------------------
defineOptions({
  name: 'DssRadio',
  inheritAttrs: false,
})

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  val: undefined,
  name: undefined,
  label: undefined,
  leftLabel: false,
  color: 'primary',
  size: 'md',
  disable: false,
  dense: false,
  error: false,
  errorMessage: undefined,
  brand: null,
  tabindex: null,
  ariaLabel: undefined,
})

// ---------------------------------------------------------------------------
// Emits
// ---------------------------------------------------------------------------
const emit = defineEmits<RadioEmits>()

// ---------------------------------------------------------------------------
// Refs
// ---------------------------------------------------------------------------
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const slots = useSlots()

// ---------------------------------------------------------------------------
// Computed: estado checked
// ---------------------------------------------------------------------------
const isChecked = computed(() => {
  return props.modelValue !== undefined && props.modelValue === props.val
})

// ---------------------------------------------------------------------------
// Computed: label presente (via prop ou slot)
// ---------------------------------------------------------------------------
const hasLabel = computed(() => {
  return !!(props.label || slots.default)
})

// ---------------------------------------------------------------------------
// Computed: tabindex
// ---------------------------------------------------------------------------
const computedTabindex = computed(() => {
  if (props.disable) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return Number(props.tabindex)
  }
  return 0
})

// ---------------------------------------------------------------------------
// Computed: ID unico para associacao label <-> input
// ---------------------------------------------------------------------------
const uniqueId = computed(() => {
  const hash = Math.random().toString(36).substring(2, 8)
  return `dss-radio-${hash}`
})

// ---------------------------------------------------------------------------
// Computed: ID do erro (para aria-describedby)
// ---------------------------------------------------------------------------
const errorId = computed(() => {
  return props.error && props.errorMessage ? `${uniqueId.value}-error` : undefined
})

// ---------------------------------------------------------------------------
// Composable de classes
// ---------------------------------------------------------------------------
const { radioClasses, controlClasses, controlColorClasses } = useRadioClasses(
  props,
  { isChecked, isFocused }
)

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------
function onChange() {
  if (props.disable) return
  emit('update:modelValue', props.val)
}

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

// ---------------------------------------------------------------------------
// Expose (API publica para refs de template)
// ---------------------------------------------------------------------------
defineExpose({
  /** Referencia ao input nativo */
  inputRef,
  /** Foca o input programaticamente */
  focus: () => inputRef.value?.focus(),
  /** Remove o foco do input programaticamente */
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <label
    :class="radioClasses"
    :data-brand="brand || undefined"
    v-bind="$attrs"
  >
    <!-- LABEL ESQUERDO (quando leftLabel === true) -->
    <span
      v-if="hasLabel && leftLabel"
      class="dss-radio__label dss-radio__label--left"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- INPUT NATIVO (visualmente oculto, acessivel para screen readers) -->
    <input
      ref="inputRef"
      type="radio"
      class="dss-radio__native"
      :name="name"
      :value="val"
      :checked="isChecked"
      :disabled="disable"
      :tabindex="computedTabindex"
      :aria-label="ariaLabel"
      :aria-checked="isChecked"
      :aria-disabled="disable || undefined"
      :aria-invalid="error || undefined"
      :aria-describedby="errorId"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />

    <!-- CONTROLE VISUAL (circulo do radio) -->
    <span :class="[controlClasses, controlColorClasses]" aria-hidden="true">
      <!-- INDICADOR DE SELECAO (circulo preenchido) -->
      <span
        v-if="isChecked"
        class="dss-radio__dot"
      />
    </span>

    <!-- LABEL DIREITO (posicao padrao) -->
    <span
      v-if="hasLabel && !leftLabel"
      class="dss-radio__label"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- MENSAGEM DE ERRO -->
    <span
      v-if="error && errorMessage"
      :id="errorId"
      class="dss-radio__error"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>
