/**
 * ==========================================================================
 * useTextareaActions Composable
 * ==========================================================================
 *
 * Composable para event handlers e métodos expostos do DssTextarea.
 * Gerencia interações e delega operações ao QInput subjacente.
 *
 * @example
 * ```ts
 * const { handleFocus, handleBlur, focus, blur, getNativeEl } =
 *   useTextareaActions(emit, qInputRef, isFocused)
 * ```
 */

import type { Ref } from 'vue'
// Types used for documentation reference only

/**
 * Composable para ações do textarea
 */
export function useTextareaActions(
  emit: (event: string, ...args: any[]) => void,
  qInputRef: Ref<any | null>,
  isFocused: Ref<boolean>
) {
  /**
   * Handler de foco — atualiza estado e emite evento
   */
  function handleFocus(event: FocusEvent): void {
    isFocused.value = true
    emit('focus', event)
  }

  /**
   * Handler de blur — atualiza estado e emite evento
   */
  function handleBlur(event: FocusEvent): void {
    isFocused.value = false
    emit('blur', event)
  }

  /**
   * Foca programaticamente no textarea.
   * Delega para o método focus() do QInput.
   */
  function focus(): void {
    qInputRef.value?.focus()
  }

  /**
   * Remove o foco do textarea.
   * Delega para o método blur() do QInput.
   */
  function blur(): void {
    qInputRef.value?.blur()
  }

  /**
   * Retorna a referência ao elemento textarea nativo.
   * QInput expõe getNativeElement() para acesso ao DOM.
   */
  function getNativeEl(): HTMLTextAreaElement | null {
    return (qInputRef.value?.getNativeElement?.() as HTMLTextAreaElement) ?? null
  }

  return { handleFocus, handleBlur, focus, blur, getNativeEl }
}
