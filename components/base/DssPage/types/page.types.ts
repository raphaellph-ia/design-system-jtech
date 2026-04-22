// ==========================================================================
// DssPage — Types
// ==========================================================================

/**
 * Função de estilo para cálculo de min-height (QPage native API).
 * Recebe o offset total de header+footer (em px) e retorna um objeto de estilo.
 * Use apenas quando o cálculo padrão do Quasar precisar ser customizado.
 */
export type PageStyleFn = (offset: number) => Record<string, string>

export type PageProps = {
  /**
   * Aplica padding interno padrão ao redor do conteúdo.
   * Usa --dss-container-padding (= --dss-spacing-4 / 16px) em todos os lados.
   * Quando false, o conteúdo ocupa a área inteira (edge-to-edge).
   */
  padding?: boolean
  /**
   * Sobrescreve a função de cálculo de min-height do Quasar.
   * Passada diretamente ao QPage sem modificações (EXC-01).
   * Uso avançado — raramente necessário.
   */
  styleFn?: PageStyleFn
}

export type PageSlots = {
  /**
   * Conteúdo principal da página. Destinado a qualquer conteúdo de aplicação.
   * O DssPage não impõe restrições sobre o conteúdo do slot — grade, cards,
   * formulários, seções semânticas, etc. são todos válidos.
   */
  default(): void
}
