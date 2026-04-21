/**
 * ==========================================================================
 * DssStepper — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssStepper.
 * Container de navegação em etapas — wrapper DSS sobre QStepper.
 *
 * @version 1.0.0
 */

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Marcas do sistema Sansys
 */
export type StepperBrand = 'hub' | 'water' | 'waste'

// ==========================================================================
// INTERFACES — DssStepper
// ==========================================================================

/**
 * Props do componente DssStepper.
 *
 * A API espelha seletivamente a do QStepper, expondo apenas as props
 * semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - dark: modo escuro governado globalmente pelo DSS via [data-theme='dark']
 * - color: cor dos passos governada por tokens DSS via --dss-action-primary
 * - active-color: cor ativa governada pelo DssStep via --dss-action-primary
 * - done-color: cor de conclusão governada pelo DssStep via --dss-feedback-success
 * - error-color: cor de erro governada pelo DssStep via --dss-feedback-error
 * - inactive-color: cor inativa governada pelo DssStep via --dss-gray-300
 */
export interface StepperProps {
  /**
   * Identificador do passo atualmente ativo (v-model).
   * Deve corresponder ao `name` de um DssStep filho.
   */
  modelValue?: string | number

  /**
   * Exibe os passos em layout vertical (coluna).
   * No modo vertical, a linha conectora aparece à esquerda dos dots.
   *
   * @default false
   */
  vertical?: boolean

  /**
   * Permite navegação direta clicando nos cabeçalhos dos passos.
   * Quando ativo, os DssStep filhos devem ter `headerNav=true`.
   *
   * @default false
   */
  headerNav?: boolean

  /**
   * Ativa transições animadas ao navegar entre painéis de conteúdo.
   *
   * @default false
   */
  animated?: boolean

  /**
   * Remove a sombra do container.
   * Recomendado ao usar DssStepper dentro de um DssCard ou superfície elevada.
   *
   * @default false
   */
  flat?: boolean

  /**
   * Adiciona borda ao container.
   * Usa `--dss-border-width-thin` solid `--dss-gray-200` via tokens DSS.
   *
   * @default false
   */
  bordered?: boolean

  /**
   * Marca Sansys (Hub, Water, Waste).
   * Define [data-brand] no container, propagando acento visual de marca
   * para os DssStep filhos via cascade CSS de `[data-brand]`.
   *
   * @default null
   */
  brand?: StepperBrand | null

  /**
   * Label acessível para o stepper (aria-label).
   * Recomendado quando o stepper não possui título visual visível.
   *
   * @example 'Processo de onboarding'
   * @example 'Etapas de configuração'
   */
  ariaLabel?: string
}

// ==========================================================================
// EMITS
// ==========================================================================

/**
 * Emits do componente DssStepper.
 */
export interface StepperEmits {
  /**
   * Emitido quando o usuário navega para um passo diferente.
   * Compatível com v-model.
   */
  (e: 'update:modelValue', value: string | number): void
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssStepper.
 */
export interface StepperSlots {
  /**
   * Conteúdo do stepper.
   * Aceita: DssStep (obrigatório como filho direto).
   *
   * ⚠️ Regra de Composição v2.4:
   * Somente DssStep deve ser usado dentro do DssStepper.
   * O uso de <q-step> diretamente é uma violação arquitetural.
   */
  default(): any

  /**
   * Slot para mensagens globais exibidas entre os passos do stepper.
   * Opcional — renderizado na área central do QStepper.
   */
  message?(): any
}
