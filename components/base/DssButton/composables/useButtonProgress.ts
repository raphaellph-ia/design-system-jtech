/**
 * ==========================================================================
 * useButtonProgress Composable
 * ==========================================================================
 *
 * Composable para barra de progresso do botão (modo percentage)
 *
 * @example
 * ```ts
 * const { percentageStyle } = useButtonProgress(props)
 * ```
 */

import { computed, type CSSProperties } from 'vue'
import type { ButtonProps } from '../types/button.types'

/**
 * Composable para barra de progresso
 */
export function useButtonProgress(props: Readonly<ButtonProps>) {
  /**
   * Estilo da barra de progresso
   *
   * Usa transform translateX para animar a barra de 0% a 100%
   * Começa em -100% (fora da view) e move para 0% (totalmente visível)
   */
  const percentageStyle = computed<CSSProperties | null>(() => {
    if (props.percentage === null || props.percentage === undefined) {
      return null
    }

    // Calcula transform baseado na porcentagem
    // 0% → translateX(-100%) (totalmente oculto)
    // 50% → translateX(-50%) (metade visível)
    // 100% → translateX(0%) (totalmente visível)
    return {
      transform: `translateX(${props.percentage - 100}%)`
    }
  })

  return {
    percentageStyle
  }
}
