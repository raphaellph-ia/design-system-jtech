/**
 * ==========================================================================
 * useInputActions Composable
 * ==========================================================================
 *
 * Composable para gerenciar ações e eventos do DssInput
 * Lida com input, focus, blur e clear
 *
 * @example
 * ```ts
 * const { handleInput, handleFocus, handleBlur, handleClear, focus, blur } = useInputActions(emit, inputRef, isFocused)
 * ```
 *
 * @version 2.3.0
 */

import type { Ref } from 'vue'
import type { InputEmits } from '../types/input.types'

/**
 * Composable para ações do input
 *
 * @param emit - Função de emissão de eventos tipada
 * @param inputRef - Referência ao elemento input nativo
 * @param isFocused - Estado de foco reativo
 */
export function useInputActions(
  emit: InputEmits,
  inputRef: Ref<HTMLInputElement | null>,
  isFocused: Ref<boolean>
) {
  /**
   * Handler para evento de input
   *
   * Emite update:modelValue com o novo valor
   */
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }

  /**
   * Handler para evento de focus
   *
   * Atualiza estado interno e emite evento focus
   */
  const handleFocus = (event: FocusEvent) => {
    isFocused.value = true
    emit('focus', event)
  }

  /**
   * Handler para evento de blur
   *
   * Atualiza estado interno e emite evento blur
   */
  const handleBlur = (event: FocusEvent) => {
    isFocused.value = false
    emit('blur', event)
  }

  /**
   * Handler para botão de limpar
   *
   * Limpa o valor do input, emite eventos e retorna foco
   */
  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
    inputRef.value?.focus()
  }

  /**
   * Método público para focar no input
   */
  const focus = () => {
    inputRef.value?.focus()
  }

  /**
   * Método público para remover foco do input
   */
  const blur = () => {
    inputRef.value?.blur()
  }

  return {
    handleInput,
    handleFocus,
    handleBlur,
    handleClear,
    focus,
    blur
  }
}
