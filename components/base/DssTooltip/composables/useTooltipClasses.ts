/**
 * ==========================================================================
 * useTooltipClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssTooltip
 * Segue o padrao Quasar de classes utilitarias (.bg-*, .text-*)
 *
 * Golden Context: DssBadge (useBadgeClasses)
 * Paridade: Mesma logica de cores via classes utilitarias
 *
 * @example
 * ```ts
 * const { tooltipClasses } = useTooltipClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { TooltipProps } from '../types/tooltip.types'

/**
 * Composable para classes CSS do tooltip
 */
export function useTooltipClasses(props: Readonly<TooltipProps>) {
  /**
   * Classes CSS computadas do tooltip
   *
   * Logica de cores seguindo padrao DssBadge:
   * - brand ativo: NÃO aplica classes utilitarias (CSS proprio)
   * - sem brand: aplica bg-{color} + text-white
   * - textColor: sobrescreve cor do texto se fornecido
   */
  const tooltipClasses = computed(() => {
    // Logica de cores seguindo padrao DssBadge:
    // - brand: NÃO usa classes utilitarias (CSS proprio)
    // - sem brand: usa bg-{color} + text-white
    let colorClasses = ''

    // Se tem brand, NÃO aplicar classes utilitarias
    // (brand usa CSS proprio sem !important)
    if (!props.brand) {
      colorClasses = `bg-${props.color} text-white`

      // Override de text color se especificado
      if (props.textColor) {
        colorClasses += ` text-${props.textColor}`
      }
    }

    return [
      // Classe base
      'dss-tooltip',

      // Classes de cor (utilitarias DSS)
      colorClasses,

      // Classes condicionais
      {
        'dss-tooltip--multi-line': props.multiLine,

        // Brand
        [`dss-tooltip--brand-${props.brand}`]: !!props.brand
      }
    ]
  })

  return {
    tooltipClasses
  }
}
