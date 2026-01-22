/**
 * ==========================================================================
 * useAvatarClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssAvatar
 * Segue o padrão DSS de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { avatarClasses } = useAvatarClasses(props)
 * ```
 *
 * @version 2.3.0
 */

import { computed } from 'vue'
import type { AvatarProps, AvatarSize } from '../types/avatar.types'

/**
 * Verifica se o size é um tamanho predefinido
 */
function isPredefinedSize(size: string | null | undefined): size is AvatarSize {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(size as string)
}

/**
 * Composable para classes CSS do avatar
 */
export function useAvatarClasses(props: Readonly<AvatarProps>) {
  /**
   * Classes CSS computadas do avatar
   *
   * Lógica de cores seguindo padrão DSS:
   * - color: usa bg-{color} + text-white (fundo colorido, texto branco)
   * - textColor: sobrescreve cor do texto se fornecido
   * - brand: adiciona classe de brand para customização visual
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

      // Classe de tamanho predefinido
      {
        'dss-avatar--xs': props.size === 'xs',
        'dss-avatar--sm': props.size === 'sm',
        'dss-avatar--md': props.size === 'md' || !props.size,
        'dss-avatar--lg': props.size === 'lg',
        'dss-avatar--xl': props.size === 'xl'
      },

      // Classes condicionais de forma
      {
        'dss-avatar--square': props.square,
        'dss-avatar--rounded': props.rounded
      },

      // Classes de brand (Sansys)
      {
        'dss-avatar--brand-hub': props.brand === 'hub',
        'dss-avatar--brand-water': props.brand === 'water',
        'dss-avatar--brand-waste': props.brand === 'waste'
      },

      // Classes de status
      {
        'dss-avatar--with-status': !!props.status
      }
    ]
  })

  return {
    avatarClasses
  }
}
