<template>
  <div
    :class="badgeClasses"
    :style="badgeStyle"
  >
    <!-- Conteúdo do badge -->
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBadge - Design System Sansys Badge Component
 * ==========================================================================
 *
 * Componente de badge moderno com TypeScript + Composition API
 * 100% compatível com Quasar q-badge API
 *
 * @see https://quasar.dev/vue-components/badge
 *
 * @example
 * ```vue
 * <DssBadge
 *   color="primary"
 *   :floating="true"
 *   align="top"
 * >
 *   5
 * </DssBadge>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed, type CSSProperties } from 'vue'
import type { BadgeProps } from '../types/badge.types'
import { useBadgeClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssBadge'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<BadgeProps>(), {
  label: '',
  color: 'primary',
  textColor: null,
  transparent: false,
  outline: false,
  rounded: false,
  multiLine: false,
  floating: false,
  align: null
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { badgeClasses } = useBadgeClasses(props)

// ==========================================================================
// COMPUTED PROPERTIES
// ==========================================================================

/**
 * Estilo inline para alinhamento vertical
 */
const badgeStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  // Vertical align (compatível com Quasar)
  if (props.align) {
    style.verticalAlign = props.align
  }

  return style
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
