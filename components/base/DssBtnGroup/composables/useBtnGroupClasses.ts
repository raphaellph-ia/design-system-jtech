/**
 * ==========================================================================
 * useBtnGroupClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssBtnGroup.
 * Segue o padrão DSS de variantes e estados.
 *
 * @example
 * ```ts
 * const { btnGroupClasses } = useBtnGroupClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { BtnGroupProps } from '../types/btn-group.types'

/**
 * Composable para classes CSS do grupo de botões
 */
export function useBtnGroupClasses(props: Readonly<BtnGroupProps>) {
  /**
   * Classes CSS computadas do grupo de botões
   *
   * Estrutura de classes:
   * - dss-btn-group: classe base
   * - dss-btn-group--flat: variante flat (prop sync obrigatório)
   * - dss-btn-group--outline: variante outline (prop sync obrigatório)
   * - dss-btn-group--push: variante push (prop sync obrigatório)
   * - dss-btn-group--unelevated: variante sem elevação (prop sync obrigatório)
   * - dss-btn-group--glossy: variante glossy (prop sync obrigatório)
   * - dss-btn-group--rounded: cantos pill nas extremidades
   * - dss-btn-group--square: sem border-radius
   * - dss-btn-group--spread: distribui largura disponível
   * - dss-btn-group--stretch: estica para preencher altura do pai
   * - dss-btn-group--brand-{brand}: acento visual de marca
   */
  const btnGroupClasses = computed(() => {
    return [
      // Classe base
      'dss-btn-group',

      // Variantes de estilo (prop sync com filhos obrigatório)
      {
        'dss-btn-group--flat': props.flat,
        'dss-btn-group--outline': props.outline,
        'dss-btn-group--push': props.push,
        'dss-btn-group--unelevated': props.unelevated,
        'dss-btn-group--glossy': props.glossy,
      },

      // Modificadores de forma
      {
        'dss-btn-group--rounded': props.rounded,
        'dss-btn-group--square': props.square,
      },

      // Modificadores de layout
      {
        'dss-btn-group--spread': props.spread,
        'dss-btn-group--stretch': props.stretch,
      },

      // Brand
      {
        [`dss-btn-group--brand-${props.brand}`]: props.brand,
      },
    ]
  })

  return {
    btnGroupClasses,
  }
}
