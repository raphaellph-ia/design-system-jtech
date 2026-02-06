/**
 * DssRadio — Types
 * Design System Sansys v2.2
 *
 * Classificacao: Compact Control interativo
 * Golden Component de referencia: DssCheckbox
 *
 * Subset controlado da API do Quasar q-radio.
 * Este componente NAO replica a API completa do q-radio.
 */

// ---------------------------------------------------------------------------
// Cores semanticas (governadas pelo DSS)
// ---------------------------------------------------------------------------
export type RadioColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

// ---------------------------------------------------------------------------
// Tamanhos (4 niveis com suporte a token)
// ---------------------------------------------------------------------------
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg'

// ---------------------------------------------------------------------------
// Brands Sansys
// ---------------------------------------------------------------------------
export type RadioBrand = 'hub' | 'water' | 'waste'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface RadioProps {
  /** Valor atual do grupo (v-model) */
  modelValue?: any

  /** Valor que este radio representa */
  val?: any

  /** Nome do grupo (agrupa radios nativamente) */
  name?: string

  /** Texto do label */
  label?: string

  /** Posicionar label a esquerda do controle */
  leftLabel?: boolean

  /** Cor semantica do indicador */
  color?: RadioColor

  /** Tamanho do controle */
  size?: RadioSize

  /** Estado desabilitado */
  disable?: boolean

  /** Modo compacto: reduz gap, altura e tamanho da fonte, e remove touch target expandido */
  dense?: boolean

  /** Estado de erro (validacao de formulario) */
  error?: boolean

  /** Mensagem de erro */
  errorMessage?: string

  /** Brand Sansys */
  brand?: RadioBrand | null

  /** Indice de tabulacao */
  tabindex?: number | string | null

  /** Label acessivel (quando label visual nao e suficiente) */
  ariaLabel?: string
}

// ---------------------------------------------------------------------------
// Emits
// ---------------------------------------------------------------------------
export interface RadioEmits {
  (e: 'update:modelValue', value: any): void
}

// ---------------------------------------------------------------------------
// Slots
// ---------------------------------------------------------------------------
export interface RadioSlots {
  /** Conteudo customizado do label */
  default(): any
}
