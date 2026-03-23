import { type Ref } from 'vue'

/**
 * Expõe métodos de controle programático do DssRange.
 *
 * Delega para o elemento nativo do QRange via $el.
 * O QRange possui dois thumbs; o foco vai para o thumb min por padrão.
 *
 * Mesmo padrão do DssSlider (Golden Reference).
 */
export function useRangeActions(
  qRangeRef: Ref<{ $el: HTMLElement } | null>
): {
  focus: () => void
  blur: () => void
} {
  function focus(): void {
    const el = qRangeRef.value?.$el as HTMLElement | undefined
    el?.focus?.()
  }

  function blur(): void {
    const el = qRangeRef.value?.$el as HTMLElement | undefined
    el?.blur?.()
  }

  return { focus, blur }
}
