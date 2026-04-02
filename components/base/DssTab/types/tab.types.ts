/**
 * ==========================================================================
 * DssTab — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssTab.
 * Aba individual de navegação/seleção — wrapper DSS sobre QTab.
 *
 * @version 1.0.0
 */

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssTab.
 *
 * A API espelha seletivamente a do QTab, expondo apenas as props
 * semanticamente relevantes para o DSS.
 *
 * Props bloqueadas:
 * - ripple: desativado por padrão (:ripple="false") — DSS governa feedback visual
 * - no-caps: governado pelo CSS/tokens DSS, não por prop
 */
export interface TabProps {
  /**
   * Identificador único da aba.
   * Obrigatório para o v-model do DssTabs pai.
   */
  name: string | number

  /**
   * Texto principal exibido na aba.
   */
  label?: string

  /**
   * Nome do ícone Material Icons a exibir.
   * Quando fornecido sem label, a aba renderiza apenas o ícone.
   */
  icon?: string

  /**
   * Exibe um ponto de alerta na aba.
   * - Boolean (true): usa a cor padrão de alerta (negativo DSS via Quasar)
   * - String: usa a cor Quasar especificada (ex.: "red", "orange")
   */
  alert?: boolean | string

  /**
   * Desabilita a interação com a aba.
   * Aplica opacidade reduzida e cursor not-allowed.
   */
  disable?: boolean
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssTab.
 */
export interface TabSlots {
  /**
   * Conteúdo customizado da aba.
   * Quando fornecido, substitui o conteúdo padrão (icon + label).
   */
  default(): unknown
}
