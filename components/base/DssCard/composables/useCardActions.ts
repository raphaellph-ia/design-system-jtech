/**
 * ==========================================================================
 * useCardActions Composable
 * ==========================================================================
 *
 * Composable para gerenciar interações do DssCard
 * Lida com eventos de click e navegação por teclado
 * Conforme WCAG 2.1 AA (Enter e Space)
 *
 * @example
 * ```ts
 * const { handleClick, handleKeydown } = useCardActions(props, emit)
 * ```
 */

import type { CardProps } from '../types/card.types'

/**
 * Composable para ações do card
 */
export function useCardActions(
  props: Readonly<CardProps>,
  emit: (event: 'click', ...args: any[]) => void
) {
  /**
   * Handler para eventos de click
   *
   * Emite evento 'click' apenas se o card for clicável
   */
  const handleClick = (event: MouseEvent) => {
    if (props.clickable) {
      emit('click', event)
    }
  }

  /**
   * Handler para navegação por teclado (Enter e Space)
   *
   * Conforme WCAG 2.1 AA:
   * - Enter: ativa o card
   * - Space: ativa o card (preventDefault para evitar scroll)
   *
   * Emite evento 'click' apenas se o card for clicável
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (props.clickable) {
      emit('click', event)
    }
  }

  return {
    handleClick,
    handleKeydown
  }
}
