/**
 * ==========================================================================
 * DssRouteTab — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssRouteTab.
 * Aba de rota de navegação — wrapper DSS sobre QRouteTab.
 *
 * DssRouteTab é o equivalente do DssTab para navegação via Vue Router.
 * Compartilha a mesma base visual (.dss-tab) e adiciona props de roteamento.
 *
 * @version 1.0.0
 */

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssRouteTab.
 *
 * Estende as props do DssTab com capacidades de roteamento Vue Router.
 *
 * Props bloqueadas:
 * - ripple: desativado por padrão (:ripple="false") — DSS governa feedback visual
 * - no-caps: governado pelo CSS/tokens DSS, não por prop
 * - color, text-color: governados por tokens DSS/brands, não por prop
 */
export interface RouteTabProps {
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

  /**
   * Rota de destino — equivalente ao `to` do RouterLink.
   * Aceita string (path) ou objeto de rota Vue Router.
   * Quando fornecido, a aba renderiza como link de rota.
   */
  to?: string | Record<string, unknown>

  /**
   * Ativa correspondência exata de rota.
   * Quando true, a aba só é marcada como ativa se a rota coincidir exatamente.
   * Equivalente ao `exact` do RouterLink.
   */
  exact?: boolean

  /**
   * Substitui a entrada atual no histórico de navegação em vez de adicionar.
   * Equivalente ao `replace` do RouterLink.
   */
  replace?: boolean

  /**
   * URL externa como fallback quando `to` não é adequado.
   * A aba renderiza como link externo (<a href="...">).
   */
  href?: string

  /**
   * Target do link externo (apenas com `href`).
   * Use "_blank" para abrir em nova aba.
   */
  target?: string
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssRouteTab.
 */
export interface RouteTabSlots {
  /**
   * Conteúdo customizado da aba.
   * Quando fornecido, substitui o conteúdo padrão (icon + label).
   */
  default(): unknown
}
