/**
 * ==========================================================================
 * useToggleClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssToggle
 *
 * ESTRATEGIA DE CORES:
 * - Sem brand: usa classes utilitarias Quasar (.bg-*, .text-*)
 * - Com brand: usa classe DSS (.dss-toggle--{color}) para CSS de _brands.scss
 *
 * Golden Context: DssCheckbox (mesmo padrao de composable)
 *
 * @example
 * ```ts
 * const { toggleClasses, trackColorClasses } = useToggleClasses(
 *   props,
 *   { isChecked }
 * )
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ToggleProps } from '../types/toggle.types'

interface UseToggleClassesOptions {
  /** Se o toggle esta ativo (on) */
  isChecked: Ref<boolean>
}

/**
 * Composable para classes CSS do toggle
 */
export function useToggleClasses(
  props: Readonly<ToggleProps>,
  options: UseToggleClassesOptions
) {
  /**
   * Classes CSS computadas do toggle (aplicadas ao ROOT <label>)
   *
   * Logica de cores:
   * - SEM brand: classes utilitarias Quasar nao vao no root
   * - COM brand: classe DSS (dss-toggle--{color}) para seletores em _brands.scss
   *
   * O CSS em _brands.scss usa seletores como:
   *   [data-brand='hub'] .dss-toggle.dss-toggle--primary
   */
  const toggleClasses = computed(() => {
    const color = props.color || 'primary'

    // Classes de cor no root - apenas para brand matching
    let colorClass = ''
    if (props.brand) {
      colorClass = `dss-toggle--${color}`
    }

    return [
      // Classe base
      'dss-toggle',

      // Tamanho
      `dss-toggle--${props.size || 'md'}`,

      // Classe de cor (apenas com brand)
      colorClass,

      // Classes condicionais
      {
        'dss-toggle--checked': options.isChecked.value,
        'dss-toggle--disabled': props.disable,
        'dss-toggle--dense': props.dense,
        'dss-toggle--left-label': props.leftLabel,
        'dss-toggle--error': props.error,
      }
    ]
  })

  /**
   * Classes de cor para o track (.dss-toggle__track)
   *
   * SEM brand: aplica bg-{color} text-white quando checked
   * COM brand: cores vem via _brands.scss, nao precisa de utility classes
   *
   * Hierarquia de estados: error > color
   * (erro impede aplicacao de cor — padrao DssRadio selado)
   */
  const trackColorClasses = computed(() => {
    if (props.brand) return ''

    if (!options.isChecked.value) return ''

    // Cores de erro tem prioridade (padrao DssRadio, Selo DSS v2.2)
    if (props.error) return ''

    const color = props.color || 'primary'
    return `bg-${color} text-white`
  })

  return {
    toggleClasses,
    trackColorClasses
  }
}
