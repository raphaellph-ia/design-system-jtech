/**
 * ==========================================================================
 * useCardClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssCard
 * Segue o padrão DSS de variantes e estados
 *
 * @example
 * ```ts
 * const { cardClasses } = useCardClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { CardProps } from '../types/card.types'

/**
 * Composable para classes CSS do card
 */
export function useCardClasses(props: Readonly<CardProps>) {
  /**
   * Classes CSS computadas do card
   *
   * Estrutura de classes:
   * - dss-card: classe base
   * - dss-card--{variant}: variante visual
   * - dss-card--square: cantos quadrados
   * - dss-card--clickable: efeitos hover
   * - dss-card--dark: modo escuro
   * - dss-card--brand-{brand}: marca Sansys
   */
  const cardClasses = computed(() => {
    return [
      // Classe base
      'dss-card',

      // Variante visual
      `dss-card--${props.variant}`,

      // Classes condicionais
      {
        'dss-card--square': props.square,
        'dss-card--clickable': props.clickable,
        'dss-card--dark': props.dark,
        [`dss-card--brand-${props.brand}`]: props.brand
      }
    ]
  })

  return {
    cardClasses
  }
}
