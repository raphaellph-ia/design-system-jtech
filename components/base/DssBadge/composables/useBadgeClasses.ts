/**
 * ==========================================================================
 * useBadgeClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssBadge
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { badgeClasses } = useBadgeClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { BadgeProps } from '../types/badge.types'

/**
 * Composable para classes CSS do badge
 */
export function useBadgeClasses(props: Readonly<BadgeProps>) {
  /**
   * Classes CSS computadas do badge
   *
   * Lógica de cores seguindo padrão Quasar QBadge:
   * - outline/transparent: usa text-{color} (texto colorido, fundo transparente)
   * - normal: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - textColor: sobrescreve cor do texto se fornecido
   */
  const badgeClasses = computed(() => {
    // Lógica de cores
    let colorClasses = ''

    if (props.outline || props.transparent) {
      // Variantes transparentes: apenas cor de texto
      colorClasses = `text-${props.color}`
    } else {
      // Variante sólida: fundo colorido + texto branco
      colorClasses = `bg-${props.color} text-white`
    }

    // Override de text color se especificado
    if (props.textColor) {
      colorClasses += ` text-${props.textColor}`
    }

    return [
      // Classe base
      'dss-badge',

      // Classes de cor (utilitárias DSS)
      colorClasses,

      // Classes condicionais
      {
        'dss-badge--floating': props.floating,
        'dss-badge--transparent': props.transparent,
        'dss-badge--multi-line': props.multiLine,
        'dss-badge--outline': props.outline,
        'dss-badge--rounded': props.rounded
      }
    ]
  })

  return {
    badgeClasses
  }
}
