/**
 * ==========================================================================
 * DssInput TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssInput
 * Subset controlado da API do Quasar q-input, governado pelo DSS v2.2
 *
 * @see https://quasar.dev/vue-components/input
 * @version 2.3.0
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do input
 */
export type InputVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Tipos HTML de input suportados
 */
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'

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
 *   clearable
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
   * Label do input (floating label)
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
   * Mostra indicador de loading (spinner)
   * @default false
   */
  loading?: boolean

  /**
   * Input obrigatório (adiciona aria-required)
   * @default false
   */
  required?: boolean

  // ========================================
  // Features
  // ========================================

  /**
   * Mostra botão de limpar (×) quando há valor
   * @default false
   */
  clearable?: boolean

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers
   * Sobrescreve o label visual quando fornecido
   *
   * @example
   * ```vue
   * <DssInput ariaLabel="Search products" type="search" />
   * ```
   */
  ariaLabel?: string

  /**
   * Label de acessibilidade para o botão de limpar
   * @default 'Clear input'
   */
  clearAriaLabel?: string

  /**
   * Tabindex customizado
   * @default null (usa 0 por padrão)
   */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssInput
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

  /**
   * Emitido quando o input é limpo via botão clear
   */
  (e: 'clear'): void
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
   * Conteúdo antes do campo wrapper
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
   * Conteúdo depois do campo wrapper
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

  /**
   * Referência direta ao elemento input nativo
   */
  inputRef: Ref<HTMLInputElement | null>
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estado interno do input (para composables)
 */
export interface InputState {
  /** Input está focado */
  isFocused: boolean
  /** Input tem valor */
  hasValue: boolean
  /** Deve mostrar área inferior (hint/error) */
  hasBottomSlot: boolean
}

/**
 * Classes CSS do wrapper principal
 */
export interface InputWrapperClasses {
  'dss-input': boolean
  'dss-input--focused': boolean
  'dss-input--error': boolean
  'dss-input--disabled': boolean
  'dss-input--readonly': boolean
  'dss-input--dense': boolean
  'dss-input--loading': boolean
  'dss-input--filled': boolean
  [key: `dss-input--${string}`]: boolean
}

/**
 * Classes CSS da label
 */
export interface InputLabelClasses {
  'dss-input__label': boolean
  'dss-input__label--stack': boolean
  'dss-input__label--float': boolean
}

/**
 * IDs gerados para acessibilidade
 */
export interface InputAccessibilityIds {
  /** ID do input nativo */
  inputId: string
  /** ID da label */
  labelId: string
  /** ID do hint */
  hintId: string
  /** ID do error */
  errorId: string
}

/**
 * Dados computados do input (para composables)
 */
export interface InputComputedData {
  /** Classes CSS do wrapper */
  wrapperClasses: (string | Record<string, boolean>)[]
  /** Classes CSS da label */
  labelClasses: (string | Record<string, boolean>)[]
  /** Classes CSS do input nativo */
  inputClasses: string
  /** Placeholder computado */
  computedPlaceholder: string
  /** Tabindex computado */
  computedTabindex: number
  /** IDs para aria-describedby */
  ariaDescribedBy: string | undefined
}
