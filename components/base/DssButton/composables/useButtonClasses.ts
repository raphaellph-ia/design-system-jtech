/**
 * ==========================================================================
 * useButtonClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssButton
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { buttonClasses } = useButtonClasses(props, { hasDefaultSlot })
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ButtonProps } from '../types/button.types'

interface UseButtonClassesOptions {
  /** Se o slot default tem conteúdo */
  hasDefaultSlot: Ref<boolean>
}

/**
 * Composable para classes CSS do botão
 */
export function useButtonClasses(
  props: Readonly<ButtonProps>,
  options: UseButtonClassesOptions
) {
  /**
   * Classes CSS computadas do botão
   *
   * Lógica de cores seguindo padrão Quasar:
   * - flat/outline: usa text-{color} (texto colorido, fundo transparente)
   * - outros: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - brand: NÃO usa classes utilitárias (CSS próprio)
   */
  const buttonClasses = computed(() => {
    // Classes de cor (utilitárias do DSS)
    let colorClasses = ''

    // Se tem brand, NÃO aplicar classes utilitárias
    // (brand usa CSS próprio sem !important)
    if (!props.brand) {
      if (props.variant === 'flat' || props.variant === 'outline') {
        // Variantes transparentes: apenas cor de texto
        colorClasses = `text-${props.color}`
      } else {
        // Variantes sólidas: fundo colorido + texto branco
        colorClasses = `bg-${props.color} text-white`
      }
    }

    // Detecta se é botão apenas ícone (sem label)
    const hasLabel = !!(props.label || options.hasDefaultSlot.value)
    const hasIcon = !!(props.icon || props.iconRight)
    const isIconOnly = hasIcon && !hasLabel

    return [
      // Classe base
      'dss-button',

      // Variante visual
      `dss-button--${props.variant}`,

      // Classes de cor (utilitárias DSS)
      colorClasses,

      // Tamanho
      `dss-button--${props.size}`,

      // Classes condicionais
      {
        'dss-button--round': props.round,
        'dss-button--square': props.square,
        'dss-button--loading': props.loading,
        'dss-button--disabled': props.disabled,
        'dss-button--dense': props.dense,
        'dss-button--no-caps': props.noCaps,
        'dss-button--icon-only': isIconOnly,

        // Brand
        [`dss-button--brand-${props.brand}`]: !!props.brand,

        // Layout
        [`dss-button--align-${props.align}`]: props.align !== 'center',
        'dss-button--stack': props.stack,
        'dss-button--stretch': props.stretch,
        'dss-button--no-wrap': props.noWrap
      }
    ]
  })

  return {
    buttonClasses
  }
}
