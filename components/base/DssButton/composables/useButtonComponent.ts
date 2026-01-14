/**
 * ==========================================================================
 * useButtonComponent Composable
 * ==========================================================================
 *
 * Composable para determinar o tipo de componente a renderizar
 * (button HTML ou router-link Vue Router)
 *
 * @example
 * ```ts
 * const { componentType, nativeType } = useButtonComponent(props)
 * ```
 */

import { computed } from 'vue'
import type { ButtonProps, ButtonComponentType, ButtonType } from '../types/button.types'

/**
 * Composable para tipo de componente
 */
export function useButtonComponent(props: Readonly<ButtonProps>) {
  /**
   * Tipo de componente a renderizar
   *
   * - Se tem `to`: router-link (Vue Router)
   * - Caso contrário: button (HTML nativo)
   */
  const componentType = computed<ButtonComponentType>(() => {
    if (props.to) {
      return 'router-link'
    }
    return 'button'
  })

  /**
   * Tipo nativo HTML do botão
   *
   * - null se for router-link
   * - type prop caso contrário
   */
  const nativeType = computed<ButtonType | null>(() => {
    return props.to ? null : (props.type || 'button')
  })

  return {
    componentType,
    nativeType
  }
}
