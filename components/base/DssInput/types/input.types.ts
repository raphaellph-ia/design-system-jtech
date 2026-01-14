/**
 * ==========================================================================
 * DssInput TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssInput
 * Compatível 100% com Quasar q-input API
 *
 * @see https://quasar.dev/vue-components/input
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do input
 */
export type InputVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Tipos HTML de input
 */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'

/**
 * Marcas do sistema Sansys
 */
export type InputBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssInput
 *
 * @example
 * ```vue
 * <DssInput
 *   v-model="email"
 *   type="email"
 *   label="Email"
 *   hint="Enter your email address"
 * />
 * ```
 */
export interface InputProps {
  // ========================================
  // Model
  // ========================================

  /**
   * Valor do input (v-model)
   */
  modelValue?: string | number

  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do input
   * @default 'outlined'
   */
  variant?: InputVariant

  /**
   * Tipo HTML do input
   * @default 'text'
   */
  type?: InputType

  /**
   * Versão compacta (menor altura)
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: InputBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Label do input
   */
  label?: string

  /**
   * Label sempre visível no topo (não flutua)
   * @default false
   */
  stackLabel?: boolean

  /**
   * Placeholder do input
   */
  placeholder?: string

  /**
   * Texto de ajuda exibido abaixo do input
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do input
   */
  errorMessage?: string

  // ========================================
  // State
  // ========================================

  /**
   * Estado de erro (muda cor para negativo)
   * @default false
   */
  error?: boolean

  /**
   * Input desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Input somente leitura
   * @default false
   */
  readonly?: boolean

  /**
   * Mostra indicador de loading
   * @default false
   */
  loading?: boolean

  // ========================================
  // Features
  // ========================================

  /**
   * Mostra botão de limpar (×) quando há valor
   * @default false
   */
  clearable?: boolean
}

/**
 * Emits do DssInput
 */
export interface InputEmits {
  /**
   * Emitido quando o valor do input muda (v-model)
   */
  (e: 'update:modelValue', value: string): void

  /**
   * Emitido quando o input recebe foco
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitido quando o input perde foco
   */
  (e: 'blur', event: FocusEvent): void
}

/**
 * Slots do DssInput
 */
export interface InputSlots {
  /**
   * Label customizado
   */
  label?(): any

  /**
   * Conteúdo antes do campo (ícones, texto)
   */
  before?(): any

  /**
   * Conteúdo dentro do campo, à esquerda
   */
  prepend?(): any

  /**
   * Conteúdo dentro do campo, à direita
   */
  append?(): any

  /**
   * Conteúdo depois do campo
   */
  after?(): any

  /**
   * Mensagem de erro customizada
   */
  error?(): any

  /**
   * Texto de ajuda customizado
   */
  hint?(): any
}

/**
 * Referências expostas pelo DssInput
 */
export interface InputExpose {
  /**
   * Foca no input
   */
  focus: () => void

  /**
   * Remove foco do input
   */
  blur: () => void
}
