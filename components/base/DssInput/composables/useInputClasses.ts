/**
 * ==========================================================================
 * useInputClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssInput
 * Gerencia classes de variante, estado, e modificadores
 *
 * @example
 * ```ts
 * const { wrapperClasses, labelClasses, inputClasses } = useInputClasses(props, state)
 * ```
 */

import { computed, type Ref } from 'vue'
import type { InputProps } from '../types/input.types'

interface UseInputClassesOptions {
  isFocused: Ref<boolean>
  hasValue: Ref<boolean>
}

/**
 * Composable para classes CSS do input
 */
export function useInputClasses(
  props: Readonly<InputProps>,
  { isFocused, hasValue }: UseInputClassesOptions
) {
  /**
   * Classes CSS computadas do wrapper principal
   *
   * Estrutura de classes:
   * - dss-input: classe base
   * - dss-input--{variant}: variante visual
   * - dss-input--focused: quando focado
   * - dss-input--error: estado de erro
   * - dss-input--disabled: desabilitado
   * - dss-input--readonly: somente leitura
   * - dss-input--dense: versão compacta
   * - dss-input--loading: carregando
   * - dss-input--filled: tem valor
   * - dss-input--brand-{brand}: marca Sansys
   */
  const wrapperClasses = computed(() => {
    return [
      // Classe base
      'dss-input',

      // Variante visual
      `dss-input--${props.variant}`,

      // Classes condicionais de estado
      {
        'dss-input--focused': isFocused.value,
        'dss-input--error': props.error,
        'dss-input--disabled': props.disabled,
        'dss-input--readonly': props.readonly,
        'dss-input--dense': props.dense,
        'dss-input--loading': props.loading,
        'dss-input--filled': hasValue.value,
        [`dss-input--brand-${props.brand}`]: props.brand
      }
    ]
  })

  /**
   * Classes CSS computadas da label
   *
   * Estrutura de classes:
   * - dss-input__label: classe base
   * - dss-input__label--stack: label sempre no topo
   * - dss-input__label--float: label flutua quando focado/preenchido
   */
  const labelClasses = computed(() => {
    return [
      // Classe base
      'dss-input__label',

      // Classes condicionais
      {
        'dss-input__label--stack': props.stackLabel,
        'dss-input__label--float': hasValue.value || isFocused.value
      }
    ]
  })

  /**
   * Classes CSS do input nativo
   */
  const inputClasses = computed(() => {
    return 'dss-input__native'
  })

  return {
    wrapperClasses,
    labelClasses,
    inputClasses
  }
}
