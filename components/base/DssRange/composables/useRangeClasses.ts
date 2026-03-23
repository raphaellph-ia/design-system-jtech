import { computed, type ComputedRef } from 'vue'
import type { RangeProps, RangeStateRefs } from '../types/range.types'

/**
 * Gera as classes CSS do wrapper do DssRange.
 *
 * Classes geradas:
 *   .dss-range                       — hook principal CSS
 *   .dss-range--focused              — qualquer filho com foco
 *   .dss-range--error                — estado de erro ativo
 *   .dss-range--disabled             — estado desabilitado
 *   .dss-range--readonly             — somente leitura
 *   .dss-range--dense                — modo compacto
 *   .dss-range--drag-range           — intervalo arrastável (cursor grab)
 *   .dss-range--brand-{hub|water|waste} — contexto de brand
 */
export function useRangeClasses(
  props: RangeProps,
  state: RangeStateRefs
): { wrapperClasses: ComputedRef<(string | Record<string, boolean>)[]> } {
  const wrapperClasses = computed(() => [
    'dss-range',
    {
      'dss-range--focused':    state.isFocused.value,
      'dss-range--error':      props.error    ?? false,
      'dss-range--disabled':   props.disabled ?? false,
      'dss-range--readonly':   props.readonly ?? false,
      'dss-range--dense':      props.dense    ?? false,
      'dss-range--drag-range': props.dragRange ?? false,
      ...(props.brand ? { [`dss-range--brand-${props.brand}`]: true } : {})
    }
  ])

  return { wrapperClasses }
}
