/**
 * ==========================================================================
 * DssTooltip TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssTooltip
 *
 * Golden Context: DssBadge
 * Classificacao: Elemento Informativo Contextual (NAO interativo)
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Cores semanticas DSS disponiveis para o tooltip
 *
 * 'dark' e o padrao para tooltips (informacao contextual sobre fundo escuro).
 * Demais cores seguem o mapeamento semantico DSS identico ao DssBadge.
 */
export type TooltipColor =
  | 'dark'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Brands disponiveis
 */
export type TooltipBrand =
  | 'hub'
  | 'water'
  | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssTooltip
 *
 * NOTA: DssTooltip e um componente NAO interativo.
 * A visibilidade e inteiramente controlada externamente via prop `visible`.
 * O componente NAO controla eventos, NAO captura input e
 * NAO governa abertura/fechamento.
 *
 * @example
 * ```vue
 * <DssTooltip
 *   id="tooltip-1"
 *   :visible="showTooltip"
 *   label="Informacao contextual"
 * />
 * <!-- No elemento disparador: aria-describedby="tooltip-1" -->
 * ```
 */
export interface TooltipProps {
  // ========================================
  // Content
  // ========================================

  /** Conteudo textual do tooltip (alternativa ao slot default) */
  label?: string

  // ========================================
  // Visual
  // ========================================

  /**
   * Cor semantica do tooltip
   *
   * Default: 'dark' (fundo escuro com texto claro — padrao para tooltips)
   * Mapeada para classes utilitarias DSS (bg-{color})
   */
  color?: TooltipColor

  /** Cor customizada do texto (sobrescreve cor padrao) */
  textColor?: string | null

  /** Permite multiplas linhas de texto (word-wrap) */
  multiLine?: boolean

  // ========================================
  // Visibility
  // ========================================

  /**
   * Controle externo de visibilidade
   *
   * O DssTooltip NAO governa sua propria visibilidade.
   * O elemento disparador controla esta prop.
   *
   * @default false
   */
  visible?: boolean

  // ========================================
  // Brand
  // ========================================

  /**
   * Brand override (Hub, Water, Waste)
   * Aplica cores especificas da marca
   */
  brand?: TooltipBrand | null

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers
   * Sobrescreve o label visual quando fornecido
   *
   * @example
   * ```vue
   * <DssTooltip
   *   ariaLabel="Clique para mais informacoes sobre este campo"
   *   label="?"
   * />
   * ```
   */
  ariaLabel?: string
}

/**
 * Slots disponiveis no DssTooltip
 */
export interface TooltipSlots {
  /**
   * Conteudo principal do tooltip
   * @default label prop
   */
  default(): any
}
