<template>
  <div
    ref="rootRef"
    :class="avatarClasses"
    :style="avatarStyle"
    :role="ariaLabel ? 'img' : undefined"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <!-- Ícone (se fornecido) -->
    <span
      v-if="icon"
      class="dss-avatar__icon material-icons"
      :style="iconStyle"
      aria-hidden="true"
    >
      {{ icon }}
    </span>

    <!-- Conteúdo (texto, imagem, etc.) -->
    <div v-if="!icon" :style="contentStyle" class="dss-avatar__content">
      <slot></slot>
    </div>

    <!-- Status indicator -->
    <span
      v-if="status"
      class="dss-avatar__status"
      :class="`dss-avatar__status--${status}`"
      :aria-label="`Status: ${status}`"
    ></span>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssAvatar - Design System Sansys Avatar Component
 * ==========================================================================
 *
 * Wrapper DSS baseado no QAvatar, com API governada pelo DSS.
 * Componente de avatar com suporte a brandabilidade, acessibilidade
 * WCAG 2.1 AA e múltiplas variantes visuais.
 *
 * @see https://quasar.dev/vue-components/avatar
 *
 * @example
 * ```vue
 * <DssAvatar
 *   color="primary"
 *   size="lg"
 *   icon="person"
 *   brand="hub"
 *   aria-label="Avatar do usuário"
 * />
 * ```
 *
 * @version 2.3.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { ref } from 'vue'
import type { AvatarProps, AvatarExpose } from '../types/avatar.types'
import { useAvatarClasses } from '../composables/useAvatarClasses'
import { useAvatarStyles } from '../composables/useAvatarStyles'

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
  size: 'md',
  fontSize: null,
  color: null,
  textColor: null,
  icon: null,
  square: false,
  rounded: false,
  brand: null,
  status: null,
  ariaLabel: undefined,
  alt: undefined
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// ==========================================================================
// REFS
// ==========================================================================

const rootRef = ref<HTMLDivElement | null>(null)

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { avatarClasses } = useAvatarClasses(props)
const { avatarStyle, iconStyle, contentStyle } = useAvatarStyles(props)

// ==========================================================================
// METHODS
// ==========================================================================

/**
 * Handler para clique no avatar
 */
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

// ==========================================================================
// EXPOSE
// ==========================================================================

defineExpose<AvatarExpose>({
  rootRef
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
