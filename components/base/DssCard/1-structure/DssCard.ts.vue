<template>
  <div
    :class="cardClasses"
    :style="cardStyles"
    v-bind="cardAttrs"
    @click="handleClick"
    @keydown.enter="handleKeydown"
    @keydown.space.prevent="handleKeydown"
  >
    <!-- Card content slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCard - Design System Sansys Card Component
 * ==========================================================================
 *
 * Componente de card moderno com TypeScript + Composition API
 * 100% compatível com Quasar q-card API
 *
 * @see https://quasar.dev/vue-components/card
 *
 * @example
 * ```vue
 * <DssCard variant="elevated" clickable>
 *   <DssCardSection>Content here</DssCardSection>
 *   <DssCardActions>
 *     <DssButton>Action</DssButton>
 *   </DssCardActions>
 * </DssCard>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed, useAttrs, type CSSProperties } from 'vue'
import type { CardProps, CardEmits } from '../types/card.types'
import { useCardClasses, useCardAttrs, useCardActions } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCard',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'elevated',
  square: false,
  clickable: false,
  dark: false,
  brand: null
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<CardEmits>()

// ==========================================================================
// ATTRS
// ==========================================================================

const attrs = useAttrs()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { cardClasses } = useCardClasses(props)
const { cardAttrs } = useCardAttrs(props, attrs)
const { handleClick, handleKeydown } = useCardActions(props, emit)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Estilos inline do card
 * (Reserved for future dynamic styles)
 */
const cardStyles = computed<CSSProperties>(() => {
  return {}
})
</script>

<style lang="scss" scoped>
// Import final compiled styles (Layer 4)
@import '../DssCard.module.scss';
</style>
