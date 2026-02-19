/**
 * ==========================================================================
 * DssItem TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssItem
 * Elemento base estrutural dual-mode para listas, menus e navegacao
 *
 * @see DSS_COMPONENT_ARCHITECTURE.md
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Densidades disponiveis
 *
 * - default: Padding padrao com touch target 48px
 * - compact: Padding reduzido, touch target removido
 */
export type ItemDensity =
  | 'default'
  | 'compact'

/**
 * Cores semanticas DSS
 */
export type ItemColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Brands disponiveis
 */
export type ItemBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssItem
 *
 * @example
 * ```vue
 * <DssItem
 *   clickable
 *   label="Menu Item"
 *   caption="Descricao do item"
 *   @click="handleClick"
 * />
 * ```
 */
export interface ItemProps {
  // ========================================
  // Content
  // ========================================

  /** Texto principal do item */
  label?: string

  /** Texto secundario (subtitulo) abaixo do label */
  caption?: string

  // ========================================
  // Behavior
  // ========================================

  /**
   * Torna o item clicavel (adiciona hover, active, focus, touch target)
   * - true: role="button", tabindex="0", cursor pointer
   * - false: role="listitem", sem interatividade
   */
  clickable?: boolean

  /** Estado desabilitado (requer clickable) */
  disabled?: boolean

  /** Estado ativo (destaque visual, requer clickable) */
  active?: boolean

  // ========================================
  // Visual
  // ========================================

  /** Densidade do item */
  density?: ItemDensity

  /** Cor semantica do texto do label */
  color?: ItemColor | null

  /**
   * Recuo do conteudo para alinhar com itens que possuem leading
   * Util para itens sem leading que precisam alinhar com itens que tem icone/avatar
   */
  inset?: boolean

  /** Mostra divider (borda inferior) */
  divider?: boolean

  // ========================================
  // Brand
  // ========================================

  /** Brand override (Hub, Water, Waste) */
  brand?: ItemBrand | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /** Label de acessibilidade customizado para screen readers */
  ariaLabel?: string

  /** Tabindex customizado (sobrescreve logica automatica) */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssItem
 */
export interface ItemEmits {
  /**
   * Emitido quando o item e clicado (requer clickable=true)
   * @param event MouseEvent ou KeyboardEvent nativo
   */
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}

/**
 * Slots disponiveis no DssItem
 */
export interface ItemSlots {
  /**
   * Conteudo principal do item (substitui label + caption)
   */
  default(): any

  /**
   * Area esquerda do item (icone, avatar, checkbox, etc.)
   * Tipicamente DssIcon, DssAvatar ou DssCheckbox
   */
  leading(): any

  /**
   * Area direita do item (icone, badge, toggle, etc.)
   * Tipicamente DssIcon (chevron), DssBadge ou DssToggle
   */
  trailing(): any
}
