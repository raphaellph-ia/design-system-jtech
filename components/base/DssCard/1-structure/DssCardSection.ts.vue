<template>
  <div :class="sectionClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCardSection - Design System Sansys Card Section Component
 * ==========================================================================
 *
 * Seção de conteúdo dentro do DssCard
 * 100% compatível com Quasar q-card-section API
 *
 * @see https://quasar.dev/vue-components/card#card-sections
 *
 * @example
 * ```vue
 * <DssCardSection horizontal>
 *   Content here
 * </DssCardSection>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { CardSectionProps } from '../types/card.types'
import { useCardSectionClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCardSection'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CardSectionProps>(), {
  horizontal: false
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { sectionClasses } = useCardSectionClasses(props)
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
