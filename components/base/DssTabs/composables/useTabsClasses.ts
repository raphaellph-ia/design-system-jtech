/**
 * ==========================================================================
 * DssTabs — Composable: useTabsClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssTabs com base nas props recebidas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { TabsProps } from '../types/tabs.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssTabs.
 *
 * Classes geradas:
 * - `dss-tabs`                        — classe base (sempre presente)
 * - `dss-tabs--align-{left|...}`      — alinhamento das abas
 * - `dss-tabs--vertical`              — layout vertical
 * - `dss-tabs--dense`                 — modo compacto
 * - `dss-tabs--brand-{hub|water|waste}` — acento visual de marca
 */
export function useTabsClasses(props: Readonly<TabsProps>) {
  const tabsClasses = computed(() => [
    // Classe base
    'dss-tabs',

    // Alinhamento
    {
      [`dss-tabs--align-${props.align}`]: props.align && props.align !== 'left',
    },

    // Layout
    {
      'dss-tabs--vertical': props.vertical,
      'dss-tabs--dense': props.dense,
    },

    // Brand
    {
      [`dss-tabs--brand-${props.brand}`]: props.brand,
    },
  ])

  return { tabsClasses }
}
