<template>
  <div :class="actionsClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssCardActions - Design System Sansys Card Actions Component
 * ==========================================================================
 *
 * Área de ações (botões) dentro do DssCard
 * 100% compatível com Quasar q-card-actions API
 *
 * @see https://quasar.dev/vue-components/card#card-actions
 *
 * @example
 * ```vue
 * <DssCardActions align="right">
 *   <DssButton>Cancel</DssButton>
 *   <DssButton color="primary">Confirm</DssButton>
 * </DssCardActions>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { CardActionsProps } from '../types/card.types'
import { useCardActionsClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssCardActions'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<CardActionsProps>(), {
  align: 'right',
  vertical: false
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { actionsClasses } = useCardActionsClasses(props)
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
