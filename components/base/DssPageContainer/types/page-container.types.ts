/**
 * ==========================================================================
 * DssPageContainer — Types
 * ==========================================================================
 */

/**
 * DssPageContainer não expõe props próprias.
 * É um componente pass-through estrutural puro.
 * QPageContainer não possui props documentadas na API do Quasar —
 * ele apenas reage ao contexto do QLayout pai via variáveis CSS
 * (--q-header-offset, --q-footer-offset, etc.).
 * Atributos são repassados via v-bind="$attrs".
 */
export type PageContainerProps = Record<string, never>

export interface PageContainerSlots {
  /**
   * Conteúdo da página. Destinado exclusivamente a DssPage.
   * O uso de HTML nativo ou componentes fora da hierarquia DSS
   * viola a governança de composição de Nível 4.
   */
  default?: () => unknown
}
