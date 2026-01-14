/**
 * ==========================================================================
 * DssAvatar TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssAvatar
 * Compatível 100% com Quasar q-avatar API
 *
 * @see https://quasar.dev/vue-components/avatar
 */

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
 *   size="64px"
 *   icon="person"
 * />
 * ```
 */
export interface AvatarProps {
  // ========================================
  // Size & Typography
  // ========================================

  /**
   * Tamanho do avatar (aceita qualquer unidade CSS)
   * @default null (usa 48px padrão)
   * @example "64px", "3rem", "80px"
   */
  size?: string | null

  /**
   * Tamanho da fonte do conteúdo
   * @example "16px", "1.2rem"
   */
  fontSize?: string | null

  // ========================================
  // Visual
  // ========================================

  /** Cor semântica do avatar (background) */
  color?: AvatarColor | null

  /** Cor customizada do texto (sobrescreve cor padrão) */
  textColor?: string | null

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

  /** Avatar quadrado (border-radius: 0) */
  square?: boolean

  /** Avatar arredondado (border-radius: 8px) */
  rounded?: boolean
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
   *   <img src="user.jpg" />
   * </DssAvatar>
   * ```
   */
  default(): any
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
