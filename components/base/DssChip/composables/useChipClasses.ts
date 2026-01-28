/**
 * ==========================================================================
 * useChipClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssChip
 *
 * ESTRATEGIA DE CORES:
 * - Sem brand: usa classes utilitarias Quasar (.bg-*, .text-*)
 * - Com brand: usa classe DSS (.dss-chip--{color}) para CSS de _brands.scss
 *
 * @example
 * ```ts
 * const { chipClasses } = useChipClasses(props, { hasDefaultSlot })
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ChipProps } from '../types/chip.types'

interface UseChipClassesOptions {
  /** Se o slot default tem conteudo */
  hasDefaultSlot: Ref<boolean>
}

/**
 * Composable para classes CSS do chip
 */
export function useChipClasses(
  props: Readonly<ChipProps>,
  options: UseChipClassesOptions
) {
  /**
   * Classes CSS computadas do chip
   *
   * Logica de cores:
   * - SEM brand: classes utilitarias Quasar (bg-{color}, text-{color})
   * - COM brand: classe DSS (dss-chip--{color}) para seletores em _brands.scss
   *
   * O CSS em _brands.scss usa seletores como:
   *   [data-brand='hub'] .dss-chip--filled.dss-chip--primary
   *
   * Por isso, quando ha brand, geramos dss-chip--{color} em vez de bg-{color}
   */
  const chipClasses = computed(() => {
    // Detecta se tem apenas icone (sem label)
    const hasLabel = !!(props.label || options.hasDefaultSlot.value)
    const hasIcon = !!(props.icon || props.iconRight)
    const isIconOnly = hasIcon && !hasLabel

    // Classes de cor - estrategia diferente com/sem brand
    let colorClasses: string | string[] = ''

    if (props.brand) {
      // COM BRAND: usa classe DSS para matching com seletores de _brands.scss
      // Ex: dss-chip--primary (CSS: [data-brand='hub'] .dss-chip--filled.dss-chip--primary)
      colorClasses = `dss-chip--${props.color}`
    } else {
      // SEM BRAND: usa classes utilitarias Quasar
      if (props.variant === 'flat' || props.variant === 'outline') {
        // Variantes transparentes: apenas cor de texto
        colorClasses = `text-${props.color}`
      } else {
        // Variante filled: fundo colorido + texto branco
        colorClasses = `bg-${props.color} text-white`
      }
    }

    return [
      // Classe base
      'dss-chip',

      // Variante visual
      `dss-chip--${props.variant}`,

      // Classes de cor (estrategia baseada em brand)
      colorClasses,

      // Tamanho
      `dss-chip--${props.size}`,

      // Classes condicionais
      {
        'dss-chip--round': props.round,
        'dss-chip--square': props.square,
        'dss-chip--selected': props.selected,
        'dss-chip--disabled': props.disable,
        'dss-chip--dense': props.dense,
        'dss-chip--clickable': props.clickable,
        'dss-chip--removable': props.removable,
        'dss-chip--icon-only': isIconOnly
      }
    ]
  })

  return {
    chipClasses
  }
}
