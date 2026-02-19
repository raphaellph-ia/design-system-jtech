<template>
  <div
    :class="itemClasses"
    :role="clickable ? 'button' : 'listitem'"
    :tabindex="computedTabindex"
    :aria-label="ariaLabel"
    :aria-disabled="clickable && disabled ? 'true' : undefined"
    :data-brand="brand || undefined"
    v-bind="$attrs"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Leading slot (icone, avatar, checkbox) -->
    <div v-if="$slots.leading" class="dss-item__leading" aria-hidden="true">
      <slot name="leading" />
    </div>

    <!-- Content area -->
    <div class="dss-item__content">
      <!-- Default slot OU label + caption -->
      <slot>
        <span v-if="label" class="dss-item__label">{{ label }}</span>
        <span v-if="caption" class="dss-item__caption">{{ caption }}</span>
      </slot>
    </div>

    <!-- Trailing slot (icone, badge, toggle) -->
    <div v-if="$slots.trailing" class="dss-item__trailing" aria-hidden="true">
      <slot name="trailing" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssItem - Design System Sansys Item Component
 * ==========================================================================
 *
 * Elemento base estrutural dual-mode para listas, menus e navegacao.
 * Suporta modo estatico (listitem) e interativo (button) com
 * touch target condicional, hover, active, focus e disabled.
 *
 * Golden Context: DssChip (interativo)
 *
 * @example
 * ```vue
 * <DssItem clickable label="Menu Item" @click="navigate">
 *   <template #leading>
 *     <DssIcon name="home" :decorative="true" />
 *   </template>
 *   <template #trailing>
 *     <DssIcon name="chevron_right" :decorative="true" />
 *   </template>
 * </DssItem>
 * ```
 */

import { computed } from 'vue'
import type { ItemProps, ItemEmits } from '../types/item.types'
import { useItemClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssItem',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ItemProps>(), {
  // Content
  label: '',
  caption: '',

  // Behavior
  clickable: false,
  disabled: false,
  active: false,

  // Visual
  density: 'default',
  color: null,
  inset: false,
  divider: false,

  // Brand
  brand: null,

  // Accessibility
  ariaLabel: undefined,
  tabindex: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<ItemEmits>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { itemClasses } = useItemClasses(props)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Tabindex computado
 *
 * - Disabled: -1 (nao focavel)
 * - Clickable: 0 (focavel)
 * - Customizado: usa prop tabindex
 * - Padrao (static): nao define tabindex
 */
const computedTabindex = computed(() => {
  if (props.clickable && props.disabled) return -1
  if (props.tabindex !== null && props.tabindex !== undefined) {
    return typeof props.tabindex === 'number' ? props.tabindex : parseInt(props.tabindex)
  }
  return props.clickable ? 0 : undefined
})

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler de clique do item
 *
 * Emite evento 'click' apenas se:
 * - Esta clickable
 * - Nao esta disabled
 */
function handleClick(event: MouseEvent | KeyboardEvent) {
  if (props.clickable && !props.disabled) {
    emit('click', event)
  }
}
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
