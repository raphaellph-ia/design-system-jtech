<template>
  <span
    :class="iconClasses"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="!decorative ? ariaLabel : undefined"
    :role="!decorative ? 'img' : undefined"
  >
    <!--
      Dependencia interna: QIcon (Quasar Framework)
      O DssIcon delega a renderizacao do icone ao QIcon,
      adicionando a camada DSS de tokens, brands e acessibilidade.
    -->
    <q-icon
      :name="name"
      class="dss-icon__inner"
    />
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssIcon - Design System Sansys Icon Component
 * ==========================================================================
 *
 * Componente base estrutural do DSS para exibicao de icones.
 * Funciona como fundacao para DssButton, DssChip, DssBadge,
 * DssListItem, DssToolbar, DssCard, e demais componentes DSS.
 *
 * DEPENDENCIA INTERNA: QIcon (Quasar Framework)
 * GOLDEN COMPONENT: DssBadge (nao interativo)
 * TOUCH TARGET: Opcao B — NAO implementado (responsabilidade do wrapper)
 *
 * MODOS DE USO:
 * - Standalone: icone independente com acessibilidade propria
 * - Embedded: dentro de outro componente DSS (herda cor via currentColor)
 *
 * @see DssBadge - Golden Component de referencia
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { IconProps } from '../types/icon.types'
import { useIconClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssIcon'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<IconProps>(), {
  // Visual
  size: 'md',
  color: null,

  // Brand
  brand: null,

  // Animation
  spin: false,
  pulse: false,

  // Accessibility
  decorative: false,
  ariaLabel: undefined
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { iconClasses } = useIconClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
