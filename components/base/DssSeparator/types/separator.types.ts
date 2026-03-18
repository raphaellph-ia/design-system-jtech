/**
 * ==========================================================================
 * DssSeparator — TypeScript Types
 * ==========================================================================
 */

/**
 * Cor semântica do separador.
 *
 * Os tokens --dss-border-divider-* foram REMOVIDOS (Sprint Jan 2025).
 * O componente usa diretamente var(--dss-gray-*) e var(--dss-primary/secondary).
 *
 * @see DSS/tokens/semantic/_borders.scss (seção ⚠️ TOKENS REMOVIDOS)
 */
export type SeparatorColor =
  | 'subtle'     // var(--dss-gray-100)
  | 'default'    // var(--dss-gray-200) ← default
  | 'strong'     // var(--dss-gray-300)
  | 'primary'    // var(--dss-primary)
  | 'secondary'  // var(--dss-secondary)

/**
 * Espessura do separador.
 * Mapeado para tokens --dss-border-width-*.
 */
export type SeparatorSize =
  | 'hairline'  // var(--dss-border-width-hairline) = 0.5px
  | 'thin'      // var(--dss-border-width-thin)     = 1px  ← default
  | 'md'        // var(--dss-border-width-md)        = 2px
  | 'thick'     // var(--dss-border-width-thick)     = 3px

/**
 * Indentação do separador.
 * - true: indentação padrão (var(--dss-spacing-4) = 16px)
 * - 'item': indentação para contexto de lista (var(--dss-spacing-14) = 56px)
 * - 'item-thumbnail': indentação para lista com thumbnail (var(--dss-spacing-16) = 64px)
 */
export type SeparatorInset = boolean | 'item' | 'item-thumbnail'

/**
 * Props públicas do DssSeparator.
 */
export interface SeparatorProps {
  /** Define orientação vertical. Default: false (horizontal) */
  vertical?: boolean

  /**
   * Aplica indentação nas extremidades do separador.
   * - false: sem indentação (default)
   * - true: 16px (var(--dss-spacing-4))
   * - 'item': 56px (var(--dss-spacing-14)) — contexto de lista
   * - 'item-thumbnail': 64px (var(--dss-spacing-16)) — lista com avatar/thumbnail
   */
  inset?: SeparatorInset

  /**
   * Aplica margem ao redor do separador (separação com o conteúdo adjacente).
   * Usa var(--dss-spacing-4) = 16px nas extremidades ortogonais.
   */
  spaced?: boolean

  /** Cor semântica da linha. Default: 'default' (var(--dss-gray-200)) */
  color?: SeparatorColor

  /** Espessura da linha. Default: 'thin' (1px) */
  size?: SeparatorSize

  /**
   * Remove o separador da árvore de acessibilidade.
   * Use quando o separador é puramente decorativo e não agrega semântica.
   * Pode ser passado diretamente como atributo HTML: <DssSeparator aria-hidden="true" />
   *
   * NOTA DE PRECEDÊNCIA (inheritAttrs: true):
   * Se o consumidor passar `aria-hidden="true"` como atributo HTML nativo
   * (não como prop camelCase `ariaHidden`), o Vue realizará merge via $attrs,
   * e o valor do $attrs pode ter precedência sobre este binding explícito.
   * Recomendação: use sempre a prop `ariaHidden` para garantir comportamento
   * consistente e type-safety no TypeScript.
   */
  ariaHidden?: boolean
}
