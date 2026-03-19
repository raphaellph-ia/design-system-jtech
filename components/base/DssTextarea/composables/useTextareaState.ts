/**
 * ==========================================================================
 * useTextareaState Composable
 * ==========================================================================
 *
 * Composable para gerenciar o estado reativo do DssTextarea.
 * Rastreia foco e presença de valor para geração de classes e acessibilidade.
 *
 * @example
 * ```ts
 * const { isFocused, hasValue } = useTextareaState(props)
 * ```
 */

import { ref, computed } from 'vue'
import type { TextareaProps } from '../types/textarea.types'

/**
 * Composable para estado do textarea
 */
export function useTextareaState(props: Readonly<TextareaProps>) {
  /**
   * Indica se o textarea está atualmente focado.
   * Atualizado via handlers de focus/blur (useTextareaActions).
   */
  const isFocused = ref(false)

  /**
   * Indica se o textarea possui algum valor.
   * Usado para controlar o comportamento da floating label.
   */
  const hasValue = computed<boolean>(() => {
    return props.modelValue !== undefined &&
           props.modelValue !== null &&
           props.modelValue !== ''
  })

  return { isFocused, hasValue }
}
