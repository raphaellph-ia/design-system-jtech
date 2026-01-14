<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :replace="replace"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :style="buttonStyle"
    :tabindex="computedTabindex"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading && percentage === null" class="dss-button__loading">
      <span class="dss-button__spinner"></span>
    </span>

    <!-- Progress bar (percentage mode) -->
    <span
      v-if="loading && percentage !== null"
      class="dss-button__progress"
      :class="{ 'dss-button__progress--dark': darkPercentage }"
    >
      <span
        class="dss-button__progress-indicator"
        :style="percentageStyle"
      ></span>
    </span>

    <!-- Icon Left (before label) -->
    <span v-if="computedIconLeft && !loading" class="dss-button__icon dss-button__icon--left">
      {{ computedIconLeft }}
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Icon Right (after label) -->
    <span v-if="computedIconRight && !loading" class="dss-button__icon dss-button__icon--right">
      {{ computedIconRight }}
    </span>

    <!-- Ripple effect container (opcional) -->
    <span v-if="ripple" class="dss-button__ripple"></span>
  </component>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssButton - Design System Sansys Button Component
 * ==========================================================================
 *
 * Componente de botão moderno com TypeScript + Composition API
 * 100% compatível com Quasar q-btn API
 *
 * @see https://quasar.dev/vue-components/button
 *
 * @example
 * ```vue
 * <DssButton
 *   color="primary"
 *   variant="elevated"
 *   icon="save"
 *   :loading="isLoading"
 *   @click="handleSubmit"
 * >
 *   Salvar
 * </DssButton>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed, useSlots } from 'vue'
import type { ButtonProps, ButtonEmits } from '../types/button.types'
import {
  useButtonClasses,
  useButtonComponent,
  useButtonProgress
} from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssButton',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ButtonProps>(), {
  // Content
  label: '',
  icon: '',
  iconRight: '',

  // Visual
  variant: 'elevated',
  color: 'primary',
  size: 'md',
  round: false,
  square: false,

  // States
  loading: false,
  disabled: false,

  // Loading Progress
  percentage: null,
  darkPercentage: false,

  // Behavior
  type: 'button',
  to: null,
  replace: false,

  // Brand
  brand: null,

  // Layout
  dense: false,
  noCaps: false,
  align: 'center',
  stack: false,
  stretch: false,
  noWrap: false,
  padding: null,

  // Interaction
  ripple: false,
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ButtonEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

// Detecta se slot default tem conteúdo
const hasDefaultSlot = computed(() => !!slots.default)

// Tipo de componente (button ou router-link)
const { componentType, nativeType } = useButtonComponent(props)

// Classes CSS do botão
const { buttonClasses } = useButtonClasses(props, { hasDefaultSlot })

// Barra de progresso
const { percentageStyle } = useButtonProgress(props)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Ícone à esquerda computado
 */
const computedIconLeft = computed(() => props.icon || '')

/**
 * Ícone à direita computado
 */
const computedIconRight = computed(() => props.iconRight || '')

/**
 * Estilo inline para padding customizável
 */
const buttonStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.padding) {
    style.padding = props.padding
  }

  return style
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

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de clique do botão
 *
 * Emite evento 'click' apenas se:
 * - Não está disabled
 * - Não está loading
 */
function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
