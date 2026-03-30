/**
 * ==========================================================================
 * DssBtnDropdown TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssBtnDropdown
 * Componente DSS baseado em QBtnDropdown com API governada pelo Design System
 *
 * @see https://quasar.dev/vue-components/button-dropdown
 *
 * ⚠️ ARQUITETURA: Este componente ENVOLVE QBtnDropdown.
 * A prop `variant` é um alias DSS que mapeia para as props booleanas do Quasar
 * (flat, outline, unelevated, elevated). Isso simplifica a API e evita
 * combinações inválidas de variantes.
 *
 * ⚠️ PAINEL: O painel é teleportado para o body via QMenu.
 * Use `popup-content-class="dss-btn-dropdown__panel"` para escopo de estilos.
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do DssBtnDropdown.
 * Mapeadas internamente para props booleanas do QBtnDropdown.
 */
export type BtnDropdownVariant = 'elevated' | 'flat' | 'outline' | 'unelevated'

/**
 * Tamanhos disponíveis (compatíveis com DssButton)
 */
export type BtnDropdownSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Marcas do sistema Sansys
 */
export type BtnDropdownBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES — DssBtnDropdown
// ==========================================================================

/**
 * Props do componente DssBtnDropdown
 *
 * @example
 * ```vue
 * <DssBtnDropdown label="Exportar" variant="outline" brand="hub">
 *   <q-list>
 *     <q-item clickable>PDF</q-item>
 *     <q-item clickable>Excel</q-item>
 *   </q-list>
 * </DssBtnDropdown>
 * ```
 */
export interface BtnDropdownProps {
  // ========================================
  // Conteúdo
  // ========================================

  /**
   * Rótulo do botão trigger.
   * @example 'Exportar'
   */
  label?: string

  /**
   * Ícone à esquerda do label (Material Icons).
   * @example 'download'
   */
  icon?: string

  /**
   * Ícone à direita do label (antes do ícone de seta).
   * @example 'info'
   */
  iconRight?: string

  // ========================================
  // Estilo Visual
  // ========================================

  /**
   * Variante visual do botão.
   * - `elevated` (default): botão com sombra (padrão Quasar)
   * - `flat`: sem elevação nem borda
   * - `outline`: com borda visível
   * - `unelevated`: sem sombra, com preenchimento
   *
   * Internamente mapeado para as props booleanas do QBtnDropdown.
   * @default 'elevated'
   */
  variant?: BtnDropdownVariant

  /**
   * Cor do botão (compatível com paleta Quasar e DSS).
   * @example 'primary' | 'secondary' | 'positive' | 'negative'
   */
  color?: string

  /**
   * Cor do texto (sobrescreve o contraste automático).
   */
  textColor?: string

  /**
   * Tamanho do botão.
   * @default 'md'
   */
  size?: BtnDropdownSize

  /**
   * Remove o border-radius (cantos retos).
   * @default false
   */
  square?: boolean

  /**
   * Border-radius pill completo.
   * @default false
   */
  rounded?: boolean

  /**
   * Reduz padding e altura (modo compacto).
   * @default false
   */
  dense?: boolean

  // ========================================
  // Comportamento do Dropdown
  // ========================================

  /**
   * Modo split: separa o botão de ação da seta de dropdown.
   * A ação do botão principal é independente do dropdown.
   * @default false
   */
  split?: boolean

  /**
   * Desabilita o componente inteiro (trigger + dropdown).
   * @default false
   */
  disable?: boolean

  /**
   * Indica estado de carregamento no trigger.
   * @default false
   */
  loading?: boolean

  /**
   * Fecha o dropdown ao pressionar Escape.
   * @default true
   */
  closeOnEsc?: boolean

  /**
   * Ícone de seta do dropdown.
   * @default 'arrow_drop_down'
   */
  dropdownIcon?: string

  /**
   * Opções de posicionamento do painel (QMenu anchor).
   * @example 'bottom left' | 'bottom right'
   * @default 'bottom left'
   */
  menuAnchor?: string

  /**
   * Ponto de self do painel (QMenu self).
   * @default 'top left'
   */
  menuSelf?: string

  /**
   * Offset do painel em pixels [horizontal, vertical].
   * @default [0, 0]
   */
  menuOffset?: [number, number]

  /**
   * Largura mínima do painel igual à largura do trigger.
   * @default false
   */
  stretch?: boolean

  /**
   * Mantém o conteúdo do painel montado mesmo quando fechado.
   * Útil para listas com estado interno.
   * @default false
   */
  persistent?: boolean

  // ========================================
  // Brandabilidade
  // ========================================

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca na borda inferior do trigger.
   * @default null
   */
  brand?: BtnDropdownBrand | null

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Label acessível para o trigger (aria-label).
   * Use quando o rótulo visual não é suficientemente descritivo.
   * @example 'Opções de exportação'
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssBtnDropdown
 */
export interface BtnDropdownEmits {
  /**
   * Emitido ao clicar no botão principal (modo split).
   */
  click: [event: MouseEvent]

  /**
   * Emitido quando o dropdown é aberto.
   */
  show: []

  /**
   * Emitido quando o dropdown é fechado.
   */
  hide: []

  /**
   * Emitido antes do dropdown abrir.
   */
  'before-show': []

  /**
   * Emitido antes do dropdown fechar.
   */
  'before-hide': []
}

/**
 * Slots disponíveis no DssBtnDropdown
 */
export interface BtnDropdownSlots {
  /**
   * Conteúdo do painel dropdown.
   * Tipicamente um QList com QItem elements.
   *
   * @example
   * ```vue
   * <DssBtnDropdown label="Exportar">
   *   <q-list>
   *     <q-item clickable v-close-popup>
   *       <q-item-section>PDF</q-item-section>
   *     </q-item>
   *   </q-list>
   * </DssBtnDropdown>
   * ```
   */
  default(): any

  /**
   * Slot para conteúdo personalizado do trigger (substitui label + icon).
   * Usa o slot `label` do QBtnDropdown.
   */
  label(): any
}
