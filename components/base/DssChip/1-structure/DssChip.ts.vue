<template>
  <div
    :class="chipClasses"
    :style="chipStyle"
    :tabindex="computedTabindex"
    :aria-label="ariaLabel"
    :aria-selected="selected ? 'true' : undefined"
    :aria-disabled="disable ? 'true' : undefined"
    :data-brand="brand || undefined"
    role="option"
    v-bind="$attrs"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Selected icon (decorative - hidden from screen readers) -->
    <span
      v-if="showSelectedIcon"
      class="dss-chip__icon dss-chip__icon--selected"
      aria-hidden="true"
    >
      {{ computedIconSelected }}
    </span>

    <!-- Icon Left (decorative - hidden from screen readers) -->
    <span
      v-if="computedIconLeft && !showSelectedIcon"
      class="dss-chip__icon dss-chip__icon--left"
      aria-hidden="true"
    >
      {{ computedIconLeft }}
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-chip__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Icon Right (decorative - hidden from screen readers) -->
    <span
      v-if="computedIconRight && !showRemoveButton"
      class="dss-chip__icon dss-chip__icon--right"
      aria-hidden="true"
    >
      {{ computedIconRight }}
    </span>

    <!-- Remove button -->
    <button
      v-if="showRemoveButton"
      type="button"
      class="dss-chip__remove"
      :aria-label="removeAriaLabel"
      :disabled="disable"
      @click.stop="handleRemove"
    >
      <span class="dss-chip__icon dss-chip__icon--remove" aria-hidden="true">
        {{ computedIconRemove }}
      </span>
    </button>

    <!-- Ripple effect (decorative - hidden from screen readers) -->
    <span v-if="ripple && clickable" class="dss-chip__ripple" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssChip - Design System Sansys Chip Component
 * ==========================================================================
 *
 * Componente de chip moderno com TypeScript + Composition API
 * Baseado na API do Quasar q-chip com extensoes DSS
 *
 * @see https://quasar.dev/vue-components/chip
 *
 * @example
 * ```vue
 * <DssChip
 *   color="primary"
 *   variant="filled"
 *   label="Category"
 *   removable
 *   @remove="handleRemove"
 * />
 * ```
 *
 * @version 1.0.0
 * @author Design System Sansys Team
 */

import { computed, useSlots } from 'vue'
import type { ChipProps, ChipEmits } from '../types/chip.types'
import { useChipClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssChip',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ChipProps>(), {
  // Content
  label: '',
  icon: '',
  iconRight: '',
  iconRemove: 'cancel',
  iconSelected: 'check',

  // Visual
  variant: 'filled',
  color: 'primary',
  size: 'md',
  round: true,
  square: false,

  // States
  selected: false,
  disable: false,

  // Behavior
  clickable: false,
  removable: false,

  // Brand
  brand: null,

  // Layout
  dense: false,

  // Interaction
  ripple: false,
  tabindex: null,

  // Accessibility
  removeAriaLabel: 'Remove',
  ariaLabel: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ChipEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

const slots = useSlots()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

// Detecta se slot default tem conteudo
const hasDefaultSlot = computed(() => !!slots.default)

// Classes CSS do chip
const { chipClasses } = useChipClasses(props, { hasDefaultSlot })

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Icone a esquerda computado
 */
const computedIconLeft = computed(() => props.icon || '')

/**
 * Icone a direita computado
 */
const computedIconRight = computed(() => props.iconRight || '')

/**
 * Icone de remover computado
 */
const computedIconRemove = computed(() => props.iconRemove || 'cancel')

/**
 * Icone de selecionado computado
 */
const computedIconSelected = computed(() => props.iconSelected || 'check')

/**
 * Mostra icone de selected quando esta selecionado
 */
const showSelectedIcon = computed(() => props.selected)

/**
 * Mostra botao de remover quando removable esta ativo
 */
const showRemoveButton = computed(() => props.removable && !props.disable)

/**
 * Estilo inline customizavel
 */
const chipStyle = computed(() => {
  const style: Record<string, string> = {}
  return style
})

/**
 * Tabindex computado
 *
 * - Desabilitado: -1 (nao focavel)
 * - Clickable: 0 (focavel)
 * - Customizado: usa prop tabindex
 * - Padrao: -1 (nao focavel se nao clicavel)
 */
const computedTabindex = computed(() => {
  if (props.disable) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return props.clickable ? 0 : -1
})

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de clique do chip
 *
 * Emite evento 'click' apenas se:
 * - Esta clickable
 * - Nao esta disabled
 */
function handleClick(event: MouseEvent | KeyboardEvent) {
  if (props.clickable && !props.disable) {
    emit('click', event as MouseEvent)

    // Se tem v-model:selected, toggle o estado
    if (props.selected !== undefined) {
      emit('update:selected', !props.selected)
    }
  }
}

/**
 * Handler do botao de remover
 *
 * Emite evento 'remove'
 */
function handleRemove(event: MouseEvent) {
  if (!props.disable) {
    emit('remove', event)
  }
}
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
