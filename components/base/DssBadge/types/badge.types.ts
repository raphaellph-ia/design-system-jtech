/**
 * ==========================================================================
 * DssBadge TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssBadge
 * Compatível 100% com Quasar q-badge API
 *
 * @see https://quasar.dev/vue-components/badge
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Cores semânticas DSS
 */
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Alinhamento vertical do badge
 */
export type BadgeAlign =
  | 'top'
  | 'middle'
  | 'bottom'

/**
 * Brands disponíveis
 */
export type BadgeBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssBadge
 *
 * @example
 * ```vue
 * <DssBadge
 *   color="primary"
 *   :floating="true"
 *   align="top"
 * >
 *   99+
 * </DssBadge>
 * ```
 */
export interface BadgeProps {
  // ========================================
  // Content
  // ========================================

  /** Conteúdo do badge (alternativa ao slot default) */
  label?: string | number

  // ========================================
  // Visual
  // ========================================

  /** Cor semântica do badge */
  color?: BadgeColor

  /** Cor customizada do texto (sobrescreve cor padrão) */
  textColor?: string | null

  /** Badge transparente (apenas texto colorido) */
  transparent?: boolean

  /** Badge com outline (borda colorida) */
  outline?: boolean

  /** Badge arredondado (border-radius aumentado) */
  rounded?: boolean

  /** Permite múltiplas linhas de texto */
  multiLine?: boolean

  // ========================================
  // Positioning
  // ========================================

  /** Badge flutuante (posicionamento absoluto) */
  floating?: boolean

  /** Alinhamento vertical quando não flutuante */
  align?: BadgeAlign | null

  // ========================================
  // Brand
  // ========================================

  /**
   * Brand override (Hub, Water, Waste)
   * Aplica cores específicas da marca
   */
  brand?: BadgeBrand | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers
   * Sobrescreve o label visual quando fornecido
   *
   * @example
   * ```vue
   * <DssBadge ariaLabel="5 unread notifications">5</DssBadge>
   * <!-- Screen reader: "5 unread notifications" -->
   * ```
   */
  ariaLabel?: string
}

/**
 * Slots disponíveis no DssBadge
 */
export interface BadgeSlots {
  /**
   * Conteúdo principal do badge
   * @default label prop
   */
  default(): any
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estilo inline do badge
 */
export interface BadgeStyle {
  verticalAlign?: string
}
