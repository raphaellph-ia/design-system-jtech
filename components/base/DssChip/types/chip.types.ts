/**
 * ==========================================================================
 * DssChip TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssChip
 * Baseado na API do Quasar q-chip com extensões DSS
 *
 * @see https://quasar.dev/vue-components/chip
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do chip
 */
export type ChipVariant =
  | 'filled'    // Preenchido (padrão)
  | 'outline'   // Apenas borda
  | 'flat'      // Sem fundo, apenas texto

/**
 * Cores semânticas DSS
 */
export type ChipColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Tamanhos disponíveis
 */
export type ChipSize =
  | 'xs'  // Extra Small
  | 'sm'  // Small
  | 'md'  // Medium (default)
  | 'lg'  // Large

/**
 * Brands disponíveis
 */
export type ChipBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssChip
 *
 * @example
 * ```vue
 * <DssChip
 *   color="primary"
 *   variant="filled"
 *   label="Tag Example"
 *   removable
 *   @remove="handleRemove"
 * />
 * ```
 */
export interface ChipProps {
  // ========================================
  // Content
  // ========================================

  /** Texto do chip (alternativa ao slot default) */
  label?: string

  /** Icone a esquerda (Material Icons) */
  icon?: string

  /** Icone a direita (Material Icons) */
  iconRight?: string

  /** Icone customizado para o botao de remover */
  iconRemove?: string

  /** Icone customizado para estado selecionado */
  iconSelected?: string

  // ========================================
  // Visual
  // ========================================

  /** Variante visual do chip */
  variant?: ChipVariant

  /** Cor semantica do chip */
  color?: ChipColor

  /** Tamanho do chip */
  size?: ChipSize

  /** Chip completamente circular (pill shape) */
  round?: boolean

  /** Chip completamente quadrado (sem border-radius) */
  square?: boolean

  // ========================================
  // States
  // ========================================

  /** Estado selecionado (mostra icone de check) */
  selected?: boolean

  /** Estado desabilitado */
  disable?: boolean

  // ========================================
  // Behavior
  // ========================================

  /** Torna o chip clicavel (adiciona hover effects e emite 'click') */
  clickable?: boolean

  /** Mostra icone de remover e emite evento 'remove' ao clicar */
  removable?: boolean

  // ========================================
  // Brand
  // ========================================

  /** Brand override (Hub, Water, Waste) */
  brand?: ChipBrand | null

  // ========================================
  // Layout
  // ========================================

  /** Modo compacto (reduz padding) */
  dense?: boolean

  // ========================================
  // Interaction
  // ========================================

  /** Ativa efeito ripple ao clicar */
  ripple?: boolean

  /** Tabindex customizado */
  tabindex?: number | string | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade para o botao de remover
   * @default "Remove"
   */
  removeAriaLabel?: string

  /**
   * Label de acessibilidade customizado para screen readers
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssChip
 */
export interface ChipEmits {
  /**
   * Emitido quando o chip e clicado (requer clickable=true)
   * @param event MouseEvent nativo
   */
  (e: 'click', event: MouseEvent): void

  /**
   * Emitido quando o botao de remover e clicado
   * @param event MouseEvent nativo
   */
  (e: 'remove', event: MouseEvent): void

  /**
   * Emitido quando o estado selected muda
   * @param value Novo valor de selected
   */
  (e: 'update:selected', value: boolean): void
}

/**
 * Slots disponiveis no DssChip
 */
export interface ChipSlots {
  /**
   * Conteudo principal do chip
   * @default label prop
   */
  default(): any
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estilo inline customizavel do chip
 */
export interface ChipStyle {
  padding?: string
}

/**
 * Dados computados do chip (para composables)
 */
export interface ChipComputedData {
  /** Classes CSS do chip */
  chipClasses: (string | Record<string, boolean>)[]

  /** Estilos inline do chip */
  chipStyle: ChipStyle

  /** Tabindex computado */
  computedTabindex: number

  /** Se deve mostrar icone de selected */
  showSelectedIcon: boolean

  /** Se deve mostrar botao de remover */
  showRemoveButton: boolean
}
