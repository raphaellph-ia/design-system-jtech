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
 */

import { computed, type CSSProperties } from 'vue'
import type { AvatarProps } from '../types/avatar.types'

/**
 * Composable para estilos inline do avatar
 */
export function useAvatarStyles(props: Readonly<AvatarProps>) {
  /**
   * Estilo inline do container do avatar
   *
   * Gerencia:
   * - Tamanho (width/height) customizável
   * - Border-radius baseado em square/rounded/circular
   */
  const avatarStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // Tamanho customizável (compatível com Quasar)
    if (props.size) {
      style.width = props.size
      style.height = props.size
    }

    // Border-radius baseado nas props de forma
    if (props.square) {
      style.borderRadius = '0'
    } else if (props.rounded) {
      style.borderRadius = '8px' // var(--dss-border-radius-md)
    } else {
      // Padrão: circular (50%)
      style.borderRadius = '50%'
    }

    return style
  })

  /**
   * Estilo inline do ícone
   *
   * Calcula fontSize proporcionalmente ao tamanho do avatar:
   * - Ícone = 50% do tamanho do avatar
   * - Ex: avatar 64px → ícone 32px
   */
  const iconStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // Calcular tamanho do ícone proporcionalmente ao avatar
    if (props.size) {
      // Extrair valor numérico do size (ex: "64px" -> 64)
      const sizeValue = parseFloat(props.size)

      // Ícone deve ser aproximadamente 50% do tamanho do avatar
      const iconSize = sizeValue * 0.5

      style.fontSize = `${iconSize}px`
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

    // Font size customizável (compatível com Quasar)
    if (props.fontSize) {
      style.fontSize = props.fontSize
    }

    return style
  })

  return {
    avatarStyle,
    iconStyle,
    contentStyle
  }
}
