/**
 * ==========================================================================
 * useTextareaClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssTextarea.
 * As classes são aplicadas ao elemento raiz do QInput (via :class binding),
 * permitindo que o SCSS do DSS sobrescreva os estilos padrão do Quasar.
 *
 * @example
 * ```ts
 * const { wrapperClasses } = useTextareaClasses(props, { isFocused, hasValue })
 * ```
 */

import { computed, type Ref } from 'vue'
import type { TextareaProps } from '../types/textarea.types'

interface UseTextareaClassesOptions {
  isFocused: Ref<boolean>
  hasValue: Ref<boolean>
}

/**
 * Composable para classes CSS do textarea
 */
export function useTextareaClasses(
  props: Readonly<TextareaProps>,
  { isFocused, hasValue }: UseTextareaClassesOptions
) {
  /**
   * Classes CSS computadas aplicadas ao QInput raiz.
   *
   * Estrutura de classes:
   * - dss-textarea: classe base (hook para SCSS do DSS)
   * - dss-textarea--{variant}: variante visual
   * - dss-textarea--focused: quando focado
   * - dss-textarea--error: estado de erro
   * - dss-textarea--disabled: desabilitado
   * - dss-textarea--readonly: somente leitura
   * - dss-textarea--dense: versão compacta
   * - dss-textarea--loading: carregando
   * - dss-textarea--filled: tem valor
   * - dss-textarea--autogrow: modo crescimento automático
   * - dss-textarea--brand-{brand}: marca Sansys
   */
  const wrapperClasses = computed(() => {
    return [
      // Classe base
      'dss-textarea',

      // Variante visual
      `dss-textarea--${props.variant ?? 'outlined'}`,

      // Classes condicionais de estado
      {
        'dss-textarea--focused': isFocused.value,
        'dss-textarea--error': props.error,
        'dss-textarea--disabled': props.disabled,
        'dss-textarea--readonly': props.readonly,
        'dss-textarea--dense': props.dense,
        'dss-textarea--loading': props.loading,
        'dss-textarea--has-value': hasValue.value,
        'dss-textarea--autogrow': props.autogrow,
        [`dss-textarea--brand-${props.brand}`]: !!props.brand
      }
    ]
  })

  return { wrapperClasses }
}
