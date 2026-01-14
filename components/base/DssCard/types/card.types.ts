/**
 * ==========================================================================
 * DssCard TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssCard e subcomponentes
 * Compatível 100% com Quasar q-card API
 *
 * @see https://quasar.dev/vue-components/card
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do card
 */
export type CardVariant = 'elevated' | 'flat' | 'bordered' | 'outlined'

/**
 * Marcas do sistema Sansys
 */
export type CardBrand = 'hub' | 'water' | 'waste'

/**
 * Alinhamento das ações no DssCardActions
 */
export type CardActionsAlign = 'left' | 'center' | 'right' | 'between' | 'around'

// ==========================================================================
// INTERFACES - DssCard
// ==========================================================================

/**
 * Props do componente DssCard
 *
 * @example
 * ```vue
 * <DssCard variant="elevated" clickable>
 *   <DssCardSection>Content</DssCardSection>
 * </DssCard>
 * ```
 */
export interface CardProps {
  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do card
   * @default 'elevated'
   */
  variant?: CardVariant

  /**
   * Remove border-radius (cantos quadrados)
   * @default false
   */
  square?: boolean

  /**
   * Modo escuro
   * @default false
   */
  dark?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: CardBrand | null

  // ========================================
  // Interaction
  // ========================================

  /**
   * Torna o card clicável (adiciona efeitos hover)
   * @default false
   */
  clickable?: boolean
}

/**
 * Emits do DssCard
 */
export interface CardEmits {
  /**
   * Emitido quando o card clicável é acionado
   * @param event - MouseEvent ou KeyboardEvent
   */
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}

/**
 * Slots do DssCard
 */
export interface CardSlots {
  /**
   * Conteúdo principal do card
   * (tipicamente contém DssCardSection e DssCardActions)
   */
  default(): any
}

// ==========================================================================
// INTERFACES - DssCardSection
// ==========================================================================

/**
 * Props do componente DssCardSection
 *
 * @example
 * ```vue
 * <DssCardSection horizontal>
 *   Content here
 * </DssCardSection>
 * ```
 */
export interface CardSectionProps {
  /**
   * Layout horizontal (flex-row)
   * @default false
   */
  horizontal?: boolean
}

/**
 * Slots do DssCardSection
 */
export interface CardSectionSlots {
  /**
   * Conteúdo da seção do card
   */
  default(): any
}

// ==========================================================================
// INTERFACES - DssCardActions
// ==========================================================================

/**
 * Props do componente DssCardActions
 *
 * @example
 * ```vue
 * <DssCardActions align="right">
 *   <DssButton>Cancel</DssButton>
 *   <DssButton color="primary">Confirm</DssButton>
 * </DssCardActions>
 * ```
 */
export interface CardActionsProps {
  /**
   * Alinhamento das ações
   * @default 'right'
   */
  align?: CardActionsAlign

  /**
   * Alinhamento vertical (botões empilhados)
   * @default false
   */
  vertical?: boolean
}

/**
 * Slots do DssCardActions
 */
export interface CardActionsSlots {
  /**
   * Ações do card (tipicamente botões)
   */
  default(): any
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Atributos HTML para acessibilidade
 */
export interface CardAttrs {
  tabindex?: string
  role?: string
  [key: string]: any
}
