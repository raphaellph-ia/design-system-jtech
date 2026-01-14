<template>
  <div
    :class="avatarClasses"
    :style="avatarStyle"
  >
    <!-- Ícone (se fornecido) -->
    <span v-if="icon" class="dss-avatar__icon material-icons" :style="iconStyle">
      {{ icon }}
    </span>

    <!-- Conteúdo (texto, imagem, etc.) -->
    <div v-if="!icon" :style="contentStyle" class="dss-avatar__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssAvatar - Design System Sansys Avatar Component
 * ==========================================================================
 *
 * Componente de avatar moderno com TypeScript + Composition API
 * 100% compatível com Quasar q-avatar API
 *
 * @see https://quasar.dev/vue-components/avatar
 *
 * @example
 * ```vue
 * <DssAvatar
 *   color="primary"
 *   size="64px"
 *   icon="person"
 * />
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { AvatarProps } from '../types/avatar.types'
import { useAvatarClasses, useAvatarStyles } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssAvatar'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<AvatarProps>(), {
  size: null,
  fontSize: null,
  color: null,
  textColor: null,
  icon: null,
  square: false,
  rounded: false
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { avatarClasses } = useAvatarClasses(props)
const { avatarStyle, iconStyle, contentStyle } = useAvatarStyles(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
