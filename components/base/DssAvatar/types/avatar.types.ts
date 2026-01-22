/**
 * ==========================================================================
 * DssAvatar TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssAvatar
 * Wrapper DSS baseado no QAvatar, com API governada pelo DSS
 *
 * @see https://quasar.dev/vue-components/avatar
 * @version 2.3.0
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Cores semânticas DSS
 */
export type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Tamanhos predefinidos do avatar
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Marcas do sistema Sansys
 */
export type AvatarBrand = 'hub' | 'water' | 'waste'

/**
 * Status indicators
 */
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssAvatar
 *
 * @example
 * ```vue
 * <DssAvatar
 *   color="primary"
 *   size="lg"
 *   icon="person"
 *   brand="hub"
 * />
 * ```
 */
export interface AvatarProps {
  // ========================================
  // Size & Typography
  // ========================================

  /**
   * Tamanho do avatar
   * - Aceita tamanhos predefinidos: 'xs', 'sm', 'md', 'lg', 'xl'
   * - Aceita valores CSS customizados: '64px', '3rem'
   * @default 'md'
   */
  size?: AvatarSize | string | null

  /**
   * Tamanho da fonte do conteúdo
   * @example "16px", "1.2rem"
   */
  fontSize?: string | null

  // ========================================
  // Visual
  // ========================================

  /**
   * Cor semântica do avatar (background)
   */
  color?: AvatarColor | null

  /**
   * Cor customizada do texto (sobrescreve cor padrão)
   */
  textColor?: string | null

  /**
   * Marca Sansys (Hub, Water, Waste)
   * Aplica cores de borda/destaque da brand
   * @default null
   */
  brand?: AvatarBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Nome do ícone Material Icons
   * @example "person", "account_circle", "favorite"
   */
  icon?: string | null

  // ========================================
  // Shape
  // ========================================

  /**
   * Avatar quadrado (border-radius: 0)
   * @default false
   */
  square?: boolean

  /**
   * Avatar arredondado (border-radius: 8px)
   * @default false
   */
  rounded?: boolean

  // ========================================
  // Status
  // ========================================

  /**
   * Indicador de status (online, away, busy, offline)
   * @default null
   */
  status?: AvatarStatus | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade para screen readers
   * @example "Avatar de João Silva"
   */
  ariaLabel?: string

  /**
   * Alt text para imagens (usado no slot default)
   */
  alt?: string
}

/**
 * Eventos emitidos pelo DssAvatar
 */
export interface AvatarEmits {
  /**
   * Emitido quando o avatar é clicado (se interativo)
   */
  (e: 'click', event: MouseEvent): void
}

/**
 * Slots disponíveis no DssAvatar
 */
export interface AvatarSlots {
  /**
   * Conteúdo principal do avatar
   * (texto, imagem, elementos customizados)
   * @example
   * ```vue
   * <DssAvatar>
   *   <img src="user.jpg" alt="User" />
   * </DssAvatar>
   * ```
   */
  default(): any
}

/**
 * Referências expostas pelo DssAvatar
 */
export interface AvatarExpose {
  /**
   * Referência ao elemento root do avatar
   */
  rootRef: Ref<HTMLDivElement | null>
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estilo inline do avatar
 */
export interface AvatarStyle {
  width?: string
  height?: string
  borderRadius?: string
  fontSize?: string
}

/**
 * Estilo inline do ícone
 */
export interface IconStyle {
  fontSize?: string
}

/**
 * Estilo inline do conteúdo
 */
export interface ContentStyle {
  fontSize?: string
}

/**
 * Mapeamento de tamanhos para pixels
 */
export const AVATAR_SIZE_MAP: Record<AvatarSize, string> = {
  xs: '32px',
  sm: '40px',
  md: '48px',
  lg: '64px',
  xl: '80px'
}

/**
 * Mapeamento de tamanhos de ícone por tamanho de avatar
 */
export const AVATAR_ICON_SIZE_MAP: Record<AvatarSize, string> = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px'
}

/**
 * Mapeamento de tamanhos de fonte por tamanho de avatar
 */
export const AVATAR_FONT_SIZE_MAP: Record<AvatarSize, string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px'
}
