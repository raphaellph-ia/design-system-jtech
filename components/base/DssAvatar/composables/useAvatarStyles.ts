/**
 * ==========================================================================
 * useAvatarStyles Composable
 * ==========================================================================
 *
 * Composable para gerar estilos inline do DssAvatar
 * Gerencia tamanho, border-radius, e estilos de ícone/conteúdo
 *
 * @example
 * ```ts
 * const { avatarStyle, iconStyle, contentStyle } = useAvatarStyles(props)
 * ```
 *
 * @version 2.3.0
 */

import { computed, type CSSProperties } from 'vue'
import type { AvatarProps, AvatarSize } from '../types/avatar.types'
import {
  AVATAR_ICON_SIZE_MAP,
  AVATAR_FONT_SIZE_MAP
} from '../types/avatar.types'

/**
 * Verifica se o size é um tamanho predefinido
 */
function isPredefinedSize(size: string | null | undefined): size is AvatarSize {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(size as string)
}

/**
 * Composable para estilos inline do avatar
 */
export function useAvatarStyles(props: Readonly<AvatarProps>) {
  /**
   * Estilo inline do container do avatar
   *
   * Gerencia:
   * - Tamanho (width/height) customizável ou predefinido
   * - Border-radius baseado em square/rounded/circular
   */
  const avatarStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // Tamanho customizável (não usa classes predefinidas)
    if (props.size && !isPredefinedSize(props.size)) {
      style.width = props.size
      style.height = props.size
    }

    // Border-radius baseado nas props de forma
    // (Classes CSS já lidam com isso, mas mantemos para override inline)
    if (props.square) {
      style.borderRadius = '0'
    } else if (props.rounded) {
      style.borderRadius = 'var(--dss-radius-md)' // 8px via token
    }
    // Padrão circular é definido no CSS

    return style
  })

  /**
   * Estilo inline do ícone
   *
   * Calcula fontSize proporcionalmente ao tamanho do avatar:
   * - Para tamanhos predefinidos: usa mapa de tamanhos
   * - Para tamanhos custom: calcula 50% do tamanho
   */
  const iconStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.size) {
      if (isPredefinedSize(props.size)) {
        // Usar tamanho de ícone do mapa
        style.fontSize = AVATAR_ICON_SIZE_MAP[props.size]
      } else {
        // Calcular tamanho do ícone proporcionalmente ao avatar
        const sizeValue = parseFloat(props.size)
        if (!isNaN(sizeValue)) {
          const iconSize = sizeValue * 0.5
          style.fontSize = `${iconSize}px`
        }
      }
    }

    return style
  })

  /**
   * Estilo inline do conteúdo (slot)
   *
   * Permite customizar fontSize do texto/conteúdo
   */
  const contentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // Font size customizável via prop
    if (props.fontSize) {
      style.fontSize = props.fontSize
    } else if (props.size && isPredefinedSize(props.size)) {
      // Usar tamanho de fonte do mapa se não customizado
      style.fontSize = AVATAR_FONT_SIZE_MAP[props.size]
    }

    return style
  })

  return {
    avatarStyle,
    iconStyle,
    contentStyle
  }
}
