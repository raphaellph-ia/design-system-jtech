/**
 * ==========================================================================
 * DssItemLabel — Types
 * ==========================================================================
 *
 * Interfaces TypeScript para o componente DssItemLabel.
 * Container tipográfico para itens de lista — wrapper DSS sobre QItemLabel.
 *
 * @version 1.0.0
 */

// ==========================================================================
// PROPS
// ==========================================================================

/**
 * Props do DssItemLabel.
 *
 * A API espelha intencionalmente a do QItemLabel, mantendo a simplicidade
 * estrutural e o foco tipográfico do componente.
 */
export interface ItemLabelProps {
  /**
   * Define o label como um cabeçalho de lista.
   * Aplica tipografia mais forte, maiúsculas e padding superior
   * para separação visual de grupos de itens.
   */
  header?: boolean

  /**
   * Define o label como texto secundário (caption).
   * Aplica tipografia menor e cor de texto mutada (--dss-text-subtle).
   */
  caption?: boolean

  /**
   * Define o label como texto de sobreposição (overline).
   * Aplica tipografia muito pequena, maiúsculas e espaçamento entre letras.
   * Normalmente posicionado acima do label principal.
   */
  overline?: boolean

  /**
   * Número máximo de linhas antes de truncar o texto com ellipsis.
   * Delegado ao QItemLabel nativo para gerenciamento via CSS line-clamp.
   */
  lines?: number | string
}

// ==========================================================================
// SLOTS
// ==========================================================================

/**
 * Slots disponíveis no DssItemLabel.
 */
export interface ItemLabelSlots {
  /**
   * Conteúdo de texto do label.
   * Aceita texto simples ou elementos inline (ex.: <strong>, <em>).
   */
  default(): unknown
}
