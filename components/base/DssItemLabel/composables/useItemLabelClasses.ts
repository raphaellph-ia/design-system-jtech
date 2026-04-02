/**
 * ==========================================================================
 * DssItemLabel — Composable: useItemLabelClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssItemLabel com base nas props recebidas.
 * Aplica modificadores de variante tipográfica (header, caption, overline)
 * e de truncamento de linhas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { ItemLabelProps } from '../types/item-label.types'

/**
 * Retorna as classes CSS computadas para o DssItemLabel.
 *
 * @param props - Props reativas do componente DssItemLabel
 */
export function useItemLabelClasses(props: Readonly<ItemLabelProps>) {
  const itemLabelClasses = computed(() => [
    'dss-item-label',
    {
      'dss-item-label--header': props.header,
      'dss-item-label--caption': props.caption,
      'dss-item-label--overline': props.overline,
      'dss-item-label--lines': !!props.lines
    }
  ])

  return { itemLabelClasses }
}
