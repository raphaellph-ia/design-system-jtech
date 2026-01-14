/**
 * ==========================================================================
 * useInputState Composable
 * ==========================================================================
 *
 * Composable para gerenciar estado interno do DssInput
 * Gerencia foco, valor, e visibilidade de slots
 *
 * @example
 * ```ts
 * const { isFocused, hasValue, hasBottomSlot } = useInputState(props, slots)
 * ```
 */

import { ref, computed, type Slots } from 'vue'
import type { InputProps } from '../types/input.types'

/**
 * Composable para estado do input
 */
export function useInputState(props: Readonly<InputProps>, slots: Slots) {
  /**
   * Estado de foco do input
   */
  const isFocused = ref(false)

  /**
   * Verifica se o input tem valor
   *
   * Considera valor presente quando:
   * - Não é string vazia
   * - Não é null
   * - Não é undefined
   */
  const hasValue = computed(() => {
    return (
      props.modelValue !== '' &&
      props.modelValue !== null &&
      props.modelValue !== undefined
    )
  })

  /**
   * Verifica se deve exibir área inferior (hint/error)
   *
   * Exibe quando:
   * - Tem errorMessage e está em estado de erro
   * - Tem hint
   * - Tem slot error customizado
   * - Tem slot hint customizado
   */
  const hasBottomSlot = computed(() => {
    return (
      (props.error && props.errorMessage) ||
      props.hint ||
      !!slots.error ||
      !!slots.hint
    )
  })

  return {
    isFocused,
    hasValue,
    hasBottomSlot
  }
}
