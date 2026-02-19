/**
 * ==========================================================================
 * useItemClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssItem
 * Segue o padrao DSS de classes utilitarias (.text-*) definidas em utils/_colors.scss
 *
 * @example
 * ```ts
 * const { itemClasses } = useItemClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { ItemProps } from '../types/item.types'

/**
 * Composable para classes CSS do item
 */
export function useItemClasses(props: Readonly<ItemProps>) {
  /**
   * Classes CSS computadas do item
   *
   * Logica de cores:
   * - brand: NAO usa classes utilitarias (CSS proprio em 4-output/_brands.scss)
   * - color prop: usa .text-{color} (classe utilitaria global)
   * - sem color: herda cor do contexto via currentColor
   */
  const itemClasses = computed(() => {
    // Cor via classe utilitaria (apenas se NAO tem brand)
    let colorClass = ''
    if (!props.brand && props.color) {
      colorClass = `text-${props.color}`
    }

    return [
      // Classe base
      'dss-item',

      // Classe de densidade
      `dss-item--${props.density ?? 'default'}`,

      // Classe de cor (utilitaria DSS)
      colorClass,

      // Classes condicionais
      {
        'dss-item--clickable': props.clickable,
        'dss-item--disabled': props.disabled,
        'dss-item--active': props.active,
        'dss-item--inset': props.inset,
        'dss-item--divider': props.divider,
        'dss-item--multiline': !!props.caption,

        // Brand
        [`dss-item--brand-${props.brand}`]: !!props.brand
      }
    ]
  })

  return {
    itemClasses
  }
}
