import { ref, type Ref } from 'vue'

/**
 * Gerencia o estado de foco do DssRange.
 *
 * Usa focusin/focusout (que fazem bubble) para rastrear foco
 * em qualquer descendente do wrapper — incluindo os dois thumbs do QRange.
 *
 * Mesmo padrão do DssSlider (Golden Reference).
 */
export function useRangeState(): {
  isFocused: Ref<boolean>
  handleFocusIn: () => void
  handleFocusOut: () => void
} {
  const isFocused: Ref<boolean> = ref(false)

  function handleFocusIn(): void {
    isFocused.value = true
  }

  function handleFocusOut(): void {
    isFocused.value = false
  }

  return { isFocused, handleFocusIn, handleFocusOut }
}
