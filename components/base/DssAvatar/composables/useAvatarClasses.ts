/**
 * ==========================================================================
 * useAvatarClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssAvatar
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { avatarClasses } = useAvatarClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { AvatarProps } from '../types/avatar.types'

/**
 * Composable para classes CSS do avatar
 */
export function useAvatarClasses(props: Readonly<AvatarProps>) {
  /**
   * Classes CSS computadas do avatar
   *
   * Lógica de cores seguindo padrão Quasar QAvatar:
   * - color: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - textColor: sobrescreve cor do texto se fornecido
   */
  const avatarClasses = computed(() => {
    // Lógica de cores
    let colorClasses = ''

    if (props.color) {
      // Fundo colorido + texto branco
      colorClasses = `bg-${props.color} text-white`
    }

    // Override de text color se especificado
    if (props.textColor) {
      colorClasses += ` text-${props.textColor}`
    }

    return [
      // Classe base
      'dss-avatar',

      // Classes de cor (utilitárias DSS)
      colorClasses,

      // Classes condicionais de forma
      {
        'dss-avatar--square': props.square,
        'dss-avatar--rounded': props.rounded
      }
    ]
  })

  return {
    avatarClasses
  }
}
