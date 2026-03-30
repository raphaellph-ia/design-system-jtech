/**
 * ==========================================================================
 * DssBtnGroup TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssBtnGroup
 * Componente DSS baseado em QBtnGroup com API governada pelo Design System
 *
 * @see https://quasar.dev/vue-components/button-group
 *
 * ⚠️ REGRA CRÍTICA (Prop Sync):
 * Props de estilo (flat, outline, push, unelevated, glossy) DEVEM ser declaradas
 * TANTO no DssBtnGroup QUANTO em cada DssButton filho.
 * O DssBtnGroup NÃO propaga essas props automaticamente para os filhos.
 * Este é um comportamento intencional do Quasar (fonte: docs oficiais).
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys
 */
export type BtnGroupBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES - DssBtnGroup
// ==========================================================================

/**
 * Props do componente DssBtnGroup
 *
 * @example
 * ```vue
 * <!-- CORRETO: prop de estilo declarada no grupo E em cada filho -->
 * <DssBtnGroup outline>
 *   <DssButton outline label="Primeiro" />
 *   <DssButton outline label="Segundo" />
 * </DssBtnGroup>
 * ```
 */
export interface BtnGroupProps {
  // ========================================
  // Estilo Visual (Prop Sync Obrigatório com filhos)
  // ========================================

  /**
   * Estilo flat (sem elevação, sem borda).
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  flat?: boolean

  /**
   * Estilo com borda visível.
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  outline?: boolean

  /**
   * Estilo 3D com sombra inferior (push/pressed effect).
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  push?: boolean

  /**
   * Remove a sombra (sem elevação).
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  unelevated?: boolean

  /**
   * Aplica border-radius completamente arredondado (pill) nas extremidades do grupo.
   * ⚠️ Para efeito pill completo em cada botão, declarar também nos filhos.
   * @default false
   */
  rounded?: boolean

  /**
   * Remove todo border-radius do grupo (cantos retos).
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  square?: boolean

  /**
   * Efeito glossy (gradiente brilhante).
   * ⚠️ DEVE ser replicado em cada DssButton filho.
   * @default false
   */
  glossy?: boolean

  // ========================================
  // Layout
  // ========================================

  /**
   * Distribui os botões horizontalmente ocupando toda a largura disponível.
   * Cada DssButton filho recebe flex: 1.
   * @default false
   */
  spread?: boolean

  /**
   * Em contexto flexbox, os botões esticam até a altura do elemento pai.
   * @default false
   */
  stretch?: boolean

  // ========================================
  // Brandabilidade
  // ========================================

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca na borda inferior do grupo.
   * @default null
   */
  brand?: BtnGroupBrand | null

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Label acessível para o grupo de botões (aria-label).
   * Recomendado quando o grupo não possui label visual visível.
   *
   * @example 'Opções de formatação de texto'
   * @example 'Ações de navegação'
   */
  ariaLabel?: string
}

/**
 * Slots do DssBtnGroup
 */
export interface BtnGroupSlots {
  /**
   * Conteúdo do grupo.
   * Aceita: DssButton (principal).
   * Planejado Fase 2: DssBtnDropdown (quando implementado).
   *
   * Nota: Elementos não-DSS dentro do slot não receberão
   * os ajustes de border-radius do grupo automaticamente.
   */
  default(): any
}
