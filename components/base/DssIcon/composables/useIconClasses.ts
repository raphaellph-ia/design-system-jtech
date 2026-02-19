/**
 * ==========================================================================
 * useIconClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssIcon
 * Segue o padrao DSS de classes utilitarias (.text-*) definidas em utils/_colors.scss
 *
 * @example
 * ```ts
 * const { iconClasses } = useIconClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { IconProps } from '../types/icon.types'

/**
 * Composable para classes CSS do icone
 */
export function useIconClasses(props: Readonly<IconProps>) {
  /**
   * Classes CSS computadas do icone
   *
   * Logica de cores:
   * - brand: NÃO usa classes utilitarias (CSS proprio em 4-output/_brands.scss)
   * - color prop: usa .text-{color} (classe utilitaria global)
   * - sem color: herda cor do contexto via currentColor
   */
  const iconClasses = computed(() => {
    // Cor via classe utilitaria (apenas se NAO tem brand)
    let colorClass = ''
    if (!props.brand && props.color) {
      colorClass = `text-${props.color}`
    }

    return [
      // Classe base
      'dss-icon',

      // Classe de tamanho
      `dss-icon--${props.size ?? 'md'}`,

      // Classe de cor (utilitaria DSS)
      colorClass,

      // Classes condicionais
      {
        'dss-icon--spin': props.spin,
        'dss-icon--pulse': props.pulse,
        'dss-icon--decorative': props.decorative,

        // Brand
        [`dss-icon--brand-${props.brand}`]: !!props.brand
      }
    ]
  })

  return {
    iconClasses
  }
}
