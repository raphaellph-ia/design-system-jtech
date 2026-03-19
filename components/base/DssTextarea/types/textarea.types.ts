/**
 * ==========================================================================
 * DssTextarea TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssTextarea
 * Wrapper controlado do QInput com type="textarea" fixado internamente.
 * Governado pelo DSS v2.2.
 *
 * @see https://quasar.dev/vue-components/input (seção textarea)
 * @version 1.0.0
 */

import type { Ref } from 'vue'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do textarea — idênticas ao DssInput
 */
export type TextareaVariant = 'filled' | 'outlined' | 'standout' | 'borderless'

/**
 * Marcas do sistema Sansys
 */
export type TextareaBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssTextarea
 *
 * @example
 * ```vue
 * <DssTextarea
 *   v-model="description"
 *   label="Descrição"
 *   hint="Máx. 500 caracteres"
 *   autogrow
 *   :max-height="'300px'"
 * />
 * ```
 */
export interface TextareaProps {
  // ========================================
  // Model
  // ========================================

  /**
   * Valor do textarea (v-model)
   */
  modelValue?: string

  // ========================================
  // Visual
  // ========================================

  /**
   * Variante visual do textarea
   * @default 'outlined'
   */
  variant?: TextareaVariant

  /**
   * Versão compacta (menor altura inicial e espaçamentos reduzidos)
   * @default false
   */
  dense?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste)
   * @default null
   */
  brand?: TextareaBrand | null

  // ========================================
  // Content
  // ========================================

  /**
   * Label do textarea (floating label)
   */
  label?: string

  /**
   * Label sempre visível no topo (não flutua)
   * @default false
   */
  stackLabel?: boolean

  /**
   * Placeholder do textarea
   */
  placeholder?: string

  /**
   * Texto de ajuda exibido abaixo do textarea
   */
  hint?: string

  /**
   * Mensagem de erro exibida abaixo do textarea
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
   * Textarea desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Textarea somente leitura
   * @default false
   */
  readonly?: boolean

  /**
   * Mostra indicador de loading (spinner)
   * @default false
   */
  loading?: boolean

  /**
   * Textarea obrigatório (adiciona aria-required)
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

  /**
   * Cresce automaticamente conforme o conteúdo é digitado.
   * Quando ativo, a altura visual é controlada pelo conteúdo.
   * Use maxHeight para limitar o crescimento.
   * @default false
   */
  autogrow?: boolean

  /**
   * Número de linhas visíveis inicialmente.
   * Funciona como o atributo `rows` do textarea nativo.
   * Quando autogrow=true, define a altura mínima.
   * @default 3
   */
  rows?: number | string

  /**
   * Altura máxima do campo (CSS value, ex.: '300px', '50vh').
   * Implementado via CSS custom property --dss-textarea-max-height.
   * Útil para limitar o crescimento quando autogrow=true.
   * @default undefined (sem limite)
   */
  maxHeight?: string

  // ========================================
  // Accessibility (WCAG 2.1 AA)
  // ========================================

  /**
   * Label de acessibilidade customizado para screen readers.
   * Sobrescreve o label visual quando fornecido.
   */
  ariaLabel?: string

  /**
   * Label de acessibilidade para o botão de limpar
   * @default 'Clear textarea'
   */
  clearAriaLabel?: string

  /**
   * Tabindex customizado
   * @default null (usa 0 por padrão)
   */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssTextarea
 */
export interface TextareaEmits {
  /**
   * Emitido quando o valor do textarea muda (v-model)
   */
  (e: 'update:modelValue', value: string): void

  /**
   * Emitido quando o textarea recebe foco
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitido quando o textarea perde foco
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * Emitido quando o textarea é limpo via botão clear
   */
  (e: 'clear'): void
}

/**
 * Slots do DssTextarea
 */
export interface TextareaSlots {
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
 * Referências expostas pelo DssTextarea
 */
export interface TextareaExpose {
  /**
   * Foca no textarea
   */
  focus: () => void

  /**
   * Remove foco do textarea
   */
  blur: () => void

  /**
   * Referência direta ao elemento textarea nativo
   */
  nativeEl: HTMLTextAreaElement | null
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Estado interno do textarea (para composables)
 */
export interface TextareaState {
  /** Textarea está focado */
  isFocused: boolean
  /** Textarea tem valor */
  hasValue: boolean
}
