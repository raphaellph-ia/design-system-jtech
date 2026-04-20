// ==========================================================================
// DssDrawer — useDrawerClasses
// ==========================================================================

import { computed } from 'vue'
import type { DrawerProps } from '../types/drawer.types'

/**
 * Computa as classes CSS do DssDrawer com base nas props.
 *
 * Classes geradas:
 * - dss-drawer              — sempre presente (bloco BEM raiz)
 * - dss-drawer--left|right  — lado de ancoramento
 * - dss-drawer--elevated    — box-shadow via --dss-elevation-2
 * - dss-drawer--bordered    — borda lateral via --dss-border-width-thin
 * - dss-drawer--mini        — modo minimizado (apenas ícones)
 * - dss-drawer--overlay     — sobreposição forçada em todos os breakpoints
 */
export function useDrawerClasses(props: Readonly<DrawerProps>) {
  const drawerClasses = computed(() => [
    'dss-drawer',
    `dss-drawer--${props.side ?? 'left'}`,
    {
      'dss-drawer--elevated': props.elevated,
      'dss-drawer--bordered': props.bordered,
      'dss-drawer--mini': props.mini,
      'dss-drawer--overlay': props.overlay
    }
  ])

  return { drawerClasses }
}
