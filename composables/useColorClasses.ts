/**
 * ==========================================================================
 * useColorClasses - Global Composable
 * ==========================================================================
 *
 * Composable global para gerenciar classes de cores DSS
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 *
 * @example
 * ```ts
 * const { colorClasses } = useColorClasses({
 *   color: 'primary',
 *   textColor: 'white',
 *   variant: 'filled'
 * })
 * ```
 */

import { computed } from 'vue'

/**
 * Cores semânticas DSS (compatível com Quasar)
 */
export type DssColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Opções para geração de classes de cor
 */
export interface ColorClassesOptions {
  /**
   * Cor semântica do componente
   */
  color?: DssColor | string | null

  /**
   * Cor customizada do texto (sobrescreve padrão)
   */
  textColor?: string | null

  /**
   * Variante que afeta aplicação de cores
   * - 'filled': bg-{color} + text-white
   * - 'outlined': text-{color} (sem background)
   * - 'flat': text-{color} (sem background)
   * - 'transparent': text-{color} (sem background)
   */
  variant?: 'filled' | 'outlined' | 'flat' | 'transparent'
}

/**
 * Composable para classes de cores DSS
 *
 * Gera classes utilitárias DSS baseadas em cor e variante:
 * - Variantes filled: bg-{color} + text-white
 * - Variantes outlined/flat/transparent: text-{color}
 * - Override com textColor quando fornecido
 */
export function useColorClasses(options: ColorClassesOptions) {
  const colorClasses = computed(() => {
    let classes = ''

    // Não gera classes se não houver cor
    if (!options.color) {
      return classes
    }

    // Determina se a variante usa background ou apenas texto
    const usesBackground = !options.variant || options.variant === 'filled'

    if (usesBackground) {
      // Variante filled: fundo colorido + texto branco
      classes = `bg-${options.color} text-white`
    } else {
      // Variantes outlined/flat/transparent: apenas cor de texto
      classes = `text-${options.color}`
    }

    // Override de text color se especificado
    if (options.textColor) {
      classes += ` text-${options.textColor}`
    }

    return classes
  })

  return {
    colorClasses
  }
}
