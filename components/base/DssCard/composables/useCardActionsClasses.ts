/**
 * ==========================================================================
 * useCardActionsClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssCardActions
 *
 * @example
 * ```ts
 * const { actionsClasses } = useCardActionsClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { CardActionsProps } from '../types/card.types'

/**
 * Composable para classes CSS das ações do card
 */
export function useCardActionsClasses(props: Readonly<CardActionsProps>) {
  /**
   * Classes CSS computadas das ações
   *
   * Estrutura de classes:
   * - dss-card-actions: classe base
   * - dss-card-actions--align-{align}: alinhamento horizontal
   * - dss-card-actions--vertical: layout vertical (empilhado)
   */
  const actionsClasses = computed(() => {
    return [
      // Classe base
      'dss-card-actions',

      // Alinhamento horizontal
      `dss-card-actions--align-${props.align}`,

      // Classes condicionais
      {
        'dss-card-actions--vertical': props.vertical
      }
    ]
  })

  return {
    actionsClasses
  }
}
