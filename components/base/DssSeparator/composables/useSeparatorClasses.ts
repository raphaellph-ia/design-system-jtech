/**
 * ==========================================================================
 * useSeparatorClasses — Composable de classes CSS do DssSeparator
 * ==========================================================================
 *
 * Gera a lista de classes CSS baseada nas props do componente.
 * Segue a arquitetura DSS: lógica de classes centralizada no composable,
 * aplicação de estilos exclusivamente via SCSS (não via utility classes bg-/text-,
 * pois DssSeparator não possui cor de preenchimento — apenas borda).
 *
 * @example
 * ```ts
 * const { separatorClasses } = useSeparatorClasses(props)
 * ```
 */

import { computed } from 'vue'
import type { SeparatorProps } from '../types/separator.types'

export function useSeparatorClasses(props: Readonly<SeparatorProps>) {
  /**
   * Classes CSS computadas do separador.
   *
   * Nota: Diferente de DssBadge, DssSeparator NÃO usa classes utilitárias
   * (bg-*, text-*) pois sua "cor" é aplicada como border-color no SCSS,
   * controlada via `currentColor` e a prop `color` CSS.
   */
  const separatorClasses = computed(() => {
    // Classe de inset (indentação)
    let insetClass: string | null = null
    if (props.inset === true) {
      insetClass = 'dss-separator--inset'
    } else if (props.inset === 'item') {
      insetClass = 'dss-separator--inset-item'
    } else if (props.inset === 'item-thumbnail') {
      insetClass = 'dss-separator--inset-item-thumbnail'
    }

    return [
      // Classe base obrigatória
      'dss-separator',

      // Classes condicionais
      {
        // Orientação
        'dss-separator--vertical': props.vertical,

        // Espaçamento externo
        'dss-separator--spaced': props.spaced,

        // Cor (apenas se diferente do default)
        [`dss-separator--color-${props.color}`]: props.color !== 'default',

        // Espessura (apenas se diferente do default 'thin')
        [`dss-separator--size-${props.size}`]: props.size !== 'thin'
      },

      // Inset (null quando false — filtrado abaixo)
      insetClass
    ].filter(Boolean)
  })

  return { separatorClasses }
}
