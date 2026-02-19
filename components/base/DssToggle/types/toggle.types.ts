/**
 * ==========================================================================
 * DssToggle - TypeScript Type Definitions
 * ==========================================================================
 *
 * Interfaces para props, emits e slots do DssToggle.
 *
 * Golden Context: DssCheckbox
 * Diferenca principal: Toggle nao suporta indeterminate (binario puro).
 * Toggle usa role="switch" ao inves de checkbox puro.
 *
 * @version 1.0.0
 */

/**
 * Props do DssToggle
 *
 * Subset controlado baseado no Quasar QToggle.
 * Toggle e um controle binario (on/off) sem estado indeterminate.
 */
export interface ToggleProps {
  // =========================================================================
  // Value / Model
  // =========================================================================

  /**
   * Valor reativo do toggle (v-model)
   *
   * - Boolean mode: true/false
   * - Custom values mode: trueValue/falseValue
   * - Array mode: adiciona/remove val do array
   */
  modelValue?: boolean | null | any[]

  /**
   * Valor quando toggle esta ativo (on)
   * @default true
   */
  trueValue?: any

  /**
   * Valor quando toggle esta inativo (off)
   * @default false
   */
  falseValue?: any

  /**
   * Valor para uso em array mode (grupo de toggles)
   * Quando modelValue e um array, val e adicionado/removido
   */
  val?: any

  // =========================================================================
  // Content
  // =========================================================================

  /**
   * Texto do label (alternativa ao slot default)
   * @default ''
   */
  label?: string

  /**
   * Posiciona o label a esquerda do toggle
   * @default false
   */
  leftLabel?: boolean

  // =========================================================================
  // Visual
  // =========================================================================

  /**
   * Cor do toggle quando ativo
   *
   * Sem brand: classes utilitarias Quasar (bg-{color})
   * Com brand: tokens semanticos via _brands.scss
   *
   * @default 'primary'
   */
  color?: string

  /**
   * Tamanho do toggle
   *
   * Usa tokens de compact control:
   * - xs: --dss-compact-control-height-xs (20px)
   * - sm: --dss-compact-control-height-sm (24px)
   * - md: --dss-compact-control-height-md (28px)
   * - lg: --dss-compact-control-height-lg (32px)
   *
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'

  // =========================================================================
  // States
  // =========================================================================

  /**
   * Desabilita o toggle
   *
   * Aplica opacity: var(--dss-opacity-disabled) e pointer-events: none
   * Input nativo recebe disabled e tabindex=-1
   *
   * @default false
   */
  disable?: boolean

  /**
   * Modo denso - reduz densidade visual
   *
   * Efeitos:
   * - Reduz gap (--dss-spacing-1)
   * - Reduz min-height (--dss-compact-control-height-sm)
   * - Reduz font-size (--dss-font-size-xs)
   * - Remove touch target (::before { display: none })
   *
   * @default false
   */
  dense?: boolean

  /**
   * Estado de erro
   *
   * Aplica cor de erro no track e label.
   * Quando errorMessage fornecida, exibe mensagem com role="alert".
   *
   * @default false
   */
  error?: boolean

  /**
   * Mensagem de erro exibida quando error=true
   * Associada ao input via aria-describedby
   */
  errorMessage?: string

  // =========================================================================
  // Brand
  // =========================================================================

  /**
   * Marca do produto (Hub, Water, Waste)
   *
   * Aplica data-brand no elemento raiz para ativar
   * tokens semanticos de brand via _brands.scss
   *
   * @default null
   */
  brand?: 'hub' | 'water' | 'waste' | null

  // =========================================================================
  // Accessibility
  // =========================================================================

  /**
   * Tabindex customizado para o input nativo
   *
   * Desabilitado: -1 (nao focavel)
   * Padrao: 0 (sempre focavel)
   */
  tabindex?: number | string | null

  /**
   * Label de acessibilidade customizado para screen readers
   * Aplicado ao input nativo
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssToggle
 */
export interface ToggleEmits {
  /**
   * Emitido quando o valor do toggle muda
   * @param value Novo valor (boolean ou array)
   */
  (e: 'update:modelValue', value: boolean | any[]): void
}

/**
 * Slots disponiveis no DssToggle
 */
export interface ToggleSlots {
  /**
   * Conteudo customizado do label
   * @default label prop
   */
  default(): any
}
