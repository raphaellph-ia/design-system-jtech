/**
 * ==========================================================================
 * useCardAttrs Composable
 * ==========================================================================
 *
 * Composable para gerar atributos de acessibilidade do DssCard
 * Adiciona tabindex e role quando o card é clicável
 * Conforme WCAG 2.1 AA
 *
 * @example
 * ```ts
 * const { cardAttrs } = useCardAttrs(props, attrs)
 * ```
 */

import { computed } from 'vue'
import type { CardProps, CardAttrs } from '../types/card.types'

/**
 * Composable para atributos de acessibilidade do card
 */
export function useCardAttrs(
  props: Readonly<CardProps>,
  attrs: Record<string, any>
) {
  /**
   * Atributos HTML computados
   *
   * Quando clickable=true:
   * - tabindex="0": permite navegação por teclado
   * - role="article": define papel semântico do card
   *
   * Permite override via attrs do componente
   */
  const cardAttrs = computed<CardAttrs>(() => {
    const computedAttrs = { ...attrs }

    if (props.clickable) {
      // Adiciona tabindex se não fornecido
      computedAttrs.tabindex = computedAttrs.tabindex ?? '0'

      // Adiciona role se não fornecido
      computedAttrs.role = computedAttrs.role ?? 'article'
    }

    return computedAttrs
  })

  return {
    cardAttrs
  }
}
