/**
 * ==========================================================================
 * DssBtnToggle TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para DssBtnToggle.
 * Componente DSS baseado em QBtnToggle com API governada pelo Design System.
 *
 * @see https://quasar.dev/vue-components/button-toggle
 *
 * DIFERENÇA FUNDAMENTAL vs. DssBtnGroup:
 * DssBtnToggle gerencia estado de seleção (v-model) via prop `options`.
 * DssBtnGroup é um container de layout que aceita filhos DSS via <slot>.
 * Os botões internos do DssBtnToggle são renderizados pelo Quasar a partir
 * do array `options` — não são instâncias de DssButton explícitas.
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do DssBtnToggle.
 * Mapeia para a API simplificada DSS — evita exposição de múltiplas props booleanas.
 *
 * - elevated: padrão Quasar (com sombra) — nenhuma prop booleana extra
 * - flat: sem sombra, sem borda
 * - outline: com borda visível
 * - unelevated: sem sombra, fundo sólido
 * - push: efeito 3D com sombra inferior
 */
export type BtnToggleVariant = 'elevated' | 'flat' | 'outline' | 'unelevated' | 'push'

/**
 * Marcas do sistema Sansys
 */
export type BtnToggleBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES DE OPÇÕES
// ==========================================================================

/**
 * Definição de uma opção individual no DssBtnToggle.
 * Cada opção gera um botão interno via QBtnToggle.
 *
 * @example
 * ```ts
 * const options: BtnToggleOption[] = [
 *   { label: 'Esquerda', value: 'left', icon: 'format_align_left' },
 *   { label: 'Centro', value: 'center', icon: 'format_align_center' },
 *   { label: 'Direita', value: 'right', icon: 'format_align_right' },
 * ]
 * ```
 */
export interface BtnToggleOption {
  /**
   * Rótulo textual do botão.
   * Pelo menos `label` ou `icon` deve estar presente.
   */
  label?: string

  /**
   * Valor único da opção — usado para comparação com v-model.
   * Pode ser string, number ou qualquer tipo serializável.
   */
  value: any

  /**
   * Ícone Material Icons exibido no botão.
   * @example 'format_align_left'
   */
  icon?: string

  /**
   * Ícone Material Icons exibido à direita do label.
   */
  iconRight?: string

  /**
   * Nome do slot para conteúdo personalizado do botão.
   * Slot disponível no template do DssBtnToggle.
   */
  slot?: string

  /**
   * Atributos HTML adicionais passados ao botão individual.
   * Útil para aria-label específico por opção.
   */
  attrs?: Record<string, any>

  /**
   * Desabilita apenas esta opção individualmente.
   * @default false
   */
  disable?: boolean
}

// ==========================================================================
// INTERFACES - DssBtnToggle
// ==========================================================================

/**
 * Props do componente DssBtnToggle
 */
export interface BtnToggleProps {
  // ========================================
  // Estado de Seleção (v-model)
  // ========================================

  /**
   * Valor atualmente selecionado (v-model).
   * Deve corresponder ao campo `value` de uma das opções.
   * Null ou undefined representa "nenhuma seleção" (apenas com clearable).
   */
  modelValue?: any

  /**
   * Array de opções que definem os botões internos.
   * Cada item gera um botão no grupo de alternância.
   * @required
   */
  options: BtnToggleOption[]

  // ========================================
  // Aparência Visual
  // ========================================

  /**
   * Variante visual do grupo de botões.
   * Controla a aparência de todos os botões internos.
   *
   * - elevated: padrão (com sombra)
   * - flat: sem sombra, sem borda
   * - outline: com borda visível
   * - unelevated: sem sombra, fundo sólido
   * - push: efeito 3D
   *
   * @default 'elevated'
   */
  variant?: BtnToggleVariant

  /**
   * Cor dos botões inativos (não selecionados).
   * Usa o sistema de cores do Quasar/DSS (ex: 'primary', 'secondary').
   */
  color?: string

  /**
   * Cor do botão ativo (selecionado).
   * Usa o sistema de cores do Quasar/DSS (ex: 'primary', 'secondary').
   */
  toggleColor?: string

  /**
   * Cor do texto dos botões inativos.
   */
  textColor?: string

  /**
   * Cor do texto do botão ativo.
   */
  toggleTextColor?: string

  // ========================================
  // Forma
  // ========================================

  /**
   * Aplica border-radius completamente arredondado (pill) nas extremidades do grupo.
   * @default false
   */
  rounded?: boolean

  /**
   * Remove todo border-radius do grupo (cantos retos).
   * @default false
   */
  square?: boolean

  // ========================================
  // Layout
  // ========================================

  /**
   * Distribui os botões horizontalmente ocupando toda a largura disponível.
   * Cada botão interno recebe flex: 1.
   * @default false
   */
  spread?: boolean

  /**
   * Em contexto flexbox, os botões esticam até a altura do elemento pai.
   * @default false
   */
  stretch?: boolean

  // ========================================
  // Interação
  // ========================================

  /**
   * Desabilita todo o grupo de alternância.
   * Nenhuma opção pode ser selecionada.
   * @default false
   */
  disable?: boolean

  /**
   * Modo somente leitura — exibe seleção mas bloqueia alteração.
   * Diferença vs. disable: visualmente distinto (não opaco).
   * @default false
   */
  readonly?: boolean

  /**
   * Permite desmarcar a opção atual clicando nela novamente.
   * Quando desmarcado, o modelValue volta a ser null/undefined.
   * @default false
   */
  clearable?: boolean

  // ========================================
  // Brandabilidade
  // ========================================

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Aplica acento visual de marca na borda inferior do grupo.
   * @default null
   */
  brand?: BtnToggleBrand | null

  // ========================================
  // Acessibilidade
  // ========================================

  /**
   * Label acessível para o grupo de alternância (aria-label).
   * Altamente recomendado — o grupo funciona como radiogroup sem label visual próprio.
   *
   * @example 'Alinhamento de texto'
   * @example 'Modo de visualização'
   */
  ariaLabel?: string
}

/**
 * Emits do DssBtnToggle
 */
export interface BtnToggleEmits {
  /**
   * Emitido quando o valor selecionado muda.
   * @param value — O novo valor selecionado (ou null se clearable desmarcar).
   */
  (event: 'update:modelValue', value: any): void
}

/**
 * Slots do DssBtnToggle
 */
export interface BtnToggleSlots {
  /**
   * Slots dinâmicos por opção.
   * Cada opção com `slot: 'nome'` habilita um slot nomeado correspondente.
   * O slot recebe o objeto da opção como prop.
   *
   * @example
   * ```vue
   * <!-- Opção com slot -->
   * :options="[{ value: 'b', slot: 'negrito' }]"
   *
   * <!-- Uso do slot no template consumidor -->
   * <DssBtnToggle :options="options">
   *   <template #negrito>
   *     <strong>N</strong>
   *   </template>
   * </DssBtnToggle>
   * ```
   */
  [key: string]: (props: { option: BtnToggleOption }) => any
}
