import type { Ref } from 'vue'

/**
 * Valor do DssRange — objeto com min e max.
 * Corresponde à estrutura do v-model do QRange.
 */
export interface RangeValue {
  min: number
  max: number
}

/**
 * Props públicas do DssRange.
 *
 * Segue o mesmo padrão de DssSlider (Golden Reference),
 * com a diferença crítica no tipo de modelValue.
 */
export interface RangeProps {
  /** Valor atual do range (v-model). Obrigatório. */
  modelValue: RangeValue

  /** Valor mínimo permitido. @default 0 */
  min?: number

  /** Valor máximo permitido. @default 100 */
  max?: number

  /** Incremento do passo. @default 1 */
  step?: number

  /** Exibe tooltip flutuante com valor durante o drag. @default false */
  label?: boolean

  /** Exibe marcações de passo no track. @default false */
  markers?: boolean

  /**
   * Permite arrastar o intervalo inteiro (não apenas os thumbs individuais).
   * Habilita cursor grab na área de seleção via .dss-range--drag-range.
   * @default false
   */
  dragRange?: boolean

  /** Modo compacto — reduz touch target para --dss-touch-target-sm (36px). @default false */
  dense?: boolean

  /** Desabilita toda interação. @default false */
  disabled?: boolean

  /**
   * Modo somente leitura — exibe o valor, mas não permite interação.
   * Diferente de disabled: mantém aparência normal, sem opacity reduzida.
   * @default false
   */
  readonly?: boolean

  /** Ativa estado de erro. Exibe errorMessage quando fornecido. @default false */
  error?: boolean

  /** Mensagem de erro exibida abaixo do range quando error=true. @default '' */
  errorMessage?: string

  /** Texto de ajuda exibido abaixo do range quando não há erro ativo. @default '' */
  hint?: string

  /**
   * Contexto de brand do produto.
   * Altera o focus ring para o token de brand correspondente.
   * Hub → --dss-hub-600 | Water → --dss-water-500 | Waste → --dss-waste-600
   * @default null
   */
  brand?: 'hub' | 'water' | 'waste' | null

  /**
   * Tabindex customizado.
   * -1 é aplicado automaticamente quando disabled=true.
   * @default null
   */
  tabindex?: number | string | null

  /**
   * Rótulo para leitores de tela (WCAG 1.3.1).
   * Fortemente recomendado quando não há label visual associado ao range.
   */
  ariaLabel?: string
}

/**
 * Eventos emitidos pelo DssRange.
 */
export interface RangeEmits {
  /** Emitido continuamente durante o drag dos thumbs (v-model). */
  (e: 'update:modelValue', value: RangeValue): void
  /** Emitido quando o usuário solta o thumb (commit final). */
  (e: 'change', value: RangeValue): void
}

/**
 * Métodos expostos via defineExpose.
 */
export interface RangeExpose {
  /** Foca o componente programaticamente. */
  focus: () => void
  /** Remove o foco do componente programaticamente. */
  blur: () => void
}

/**
 * Refs de estado interno — usadas pelos composables.
 * @internal
 */
export interface RangeStateRefs {
  isFocused: Ref<boolean>
}
