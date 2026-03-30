/**
 * ==========================================================================
 * useBtnToggleClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS e props de variante do DssBtnToggle.
 * Segue o padrão DSS de variantes via string única (API simplificada).
 *
 * DIFERENÇA vs. DssBtnGroup:
 * - DssBtnGroup usa props booleanas individuais (flat, outline, etc.)
 * - DssBtnToggle usa prop `variant` (string única) → mapeia para props Quasar
 *
 * @example
 * ```ts
 * const { btnToggleClasses, variantProps } = useBtnToggleClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { BtnToggleProps } from '../types/btn-toggle.types'

/**
 * Composable para classes CSS e mapeamento de variante do DssBtnToggle
 */
export function useBtnToggleClasses(props: Readonly<BtnToggleProps>) {
  /**
   * Mapeamento reativo de `variant` para props booleanas do QBtnToggle.
   *
   * PADRÃO DSS: A prop `variant` simplifica a API para o consumidor.
   * O mapeamento para props booleanas do Quasar é responsabilidade interna.
   *
   * NOTA: Envolvido em computed() para que mudanças dinâmicas em
   * props.variant sejam rastreadas reativamente.
   * Precedente: DssBtnDropdown NC-02 (Ciclo 1, Mar 2026) — correção do mesmo bug.
   */
  const variantProps = computed(() => {
    const v = props.variant ?? 'elevated'
    return {
      flat: v === 'flat',
      outline: v === 'outline',
      unelevated: v === 'unelevated',
      push: v === 'push',
      // elevated = nenhuma prop booleana (padrão Quasar)
    }
  })

  /**
   * Classes CSS computadas do grupo de alternância.
   *
   * Estrutura de classes:
   * - dss-btn-toggle: classe base
   * - dss-btn-toggle--{variant}: variante visual (elevated, flat, outline, unelevated, push)
   * - dss-btn-toggle--rounded: cantos pill nas extremidades
   * - dss-btn-toggle--square: sem border-radius
   * - dss-btn-toggle--spread: distribui largura disponível
   * - dss-btn-toggle--stretch: estica para preencher altura do pai
   * - dss-btn-toggle--readonly: estado somente leitura
   * - dss-btn-toggle--brand-{brand}: acento visual de marca
   */
  const btnToggleClasses = computed(() => {
    return [
      // Classe base
      'dss-btn-toggle',

      // Variante visual
      {
        'dss-btn-toggle--elevated': !props.variant || props.variant === 'elevated',
        'dss-btn-toggle--flat': props.variant === 'flat',
        'dss-btn-toggle--outline': props.variant === 'outline',
        'dss-btn-toggle--unelevated': props.variant === 'unelevated',
        'dss-btn-toggle--push': props.variant === 'push',
      },

      // Modificadores de forma
      {
        'dss-btn-toggle--rounded': props.rounded,
        'dss-btn-toggle--square': props.square,
      },

      // Modificadores de layout
      {
        'dss-btn-toggle--spread': props.spread,
        'dss-btn-toggle--stretch': props.stretch,
      },

      // Estado de interação
      {
        'dss-btn-toggle--readonly': props.readonly,
      },

      // Brand
      {
        [`dss-btn-toggle--brand-${props.brand}`]: props.brand,
      },
    ]
  })

  return {
    btnToggleClasses,
    variantProps,
  }
}
