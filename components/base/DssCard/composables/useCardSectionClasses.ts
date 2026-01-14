/**
 * ==========================================================================
 * useCardSectionClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssCardSection
 *
 * @example
 * ```ts
 * const { sectionClasses } = useCardSectionClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { CardSectionProps } from '../types/card.types'

/**
 * Composable para classes CSS da seção do card
 */
export function useCardSectionClasses(props: Readonly<CardSectionProps>) {
  /**
   * Classes CSS computadas da seção
   *
   * Estrutura de classes:
   * - dss-card-section: classe base
   * - dss-card-section--horizontal: layout horizontal (flex-row)
   */
  const sectionClasses = computed(() => {
    return [
      // Classe base
      'dss-card-section',

      // Classes condicionais
      {
        'dss-card-section--horizontal': props.horizontal
      }
    ]
  })

  return {
    sectionClasses
  }
}
