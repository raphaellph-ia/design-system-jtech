/**
 * ==========================================================================
 * DssButton TypeScript Definitions
 * ==========================================================================
 *
 * Tipos e interfaces para o componente DssButton
 * Compatível 100% com Quasar q-btn API
 *
 * @see https://quasar.dev/vue-components/button
 */

import type { RouteLocationRaw } from 'vue-router'

// ==========================================================================
// ENUMS E LITERAIS
// ==========================================================================

/**
 * Variantes visuais do botão
 */
export type ButtonVariant =
  | 'elevated'    // Elevado (com sombra)
  | 'flat'        // Plano (sem sombra, fundo transparente)
  | 'outline'     // Contorno (apenas borda)
  | 'unelevated'  // Sem elevação (fundo sólido)
  | 'push'        // Push effect (3D)
  | 'glossy'      // Glossy (gradiente brilhante)

/**
 * Cores semânticas DSS
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'

/**
 * Tamanhos disponíveis
 */
export type ButtonSize =
  | 'xs'  // Extra Small
  | 'sm'  // Small
  | 'md'  // Medium (default)
  | 'lg'  // Large
  | 'xl'  // Extra Large

/**
 * Tipos nativos de botão HTML
 */
export type ButtonType =
  | 'button'
  | 'submit'
  | 'reset'

/**
 * Brands disponíveis
 */
export type ButtonBrand =
  | 'hub'
  | 'water'
  | 'waste'

/**
 * Alinhamento interno do conteúdo
 */
export type ButtonAlign =
  | 'left'
  | 'center'
  | 'right'
  | 'between'
  | 'around'
  | 'evenly'

// ==========================================================================
// INTERFACES
// ==========================================================================

/**
 * Props do componente DssButton
 *
 * @example
 * ```vue
 * <DssButton
 *   color="primary"
 *   variant="elevated"
 *   size="md"
 *   :loading="isLoading"
 *   @click="handleClick"
 * >
 *   Clique Aqui
 * </DssButton>
 * ```
 */
export interface ButtonProps {
  // ========================================
  // Content
  // ========================================

  /** Texto do botão (alternativa ao slot default) */
  label?: string

  /** Ícone à esquerda (Material Icons) */
  icon?: string

  /** Ícone à direita (Material Icons) */
  iconRight?: string

  // ========================================
  // Visual
  // ========================================

  /** Variante visual do botão */
  variant?: ButtonVariant

  /** Cor semântica do botão */
  color?: ButtonColor

  /** Tamanho do botão */
  size?: ButtonSize

  /** Botão completamente circular */
  round?: boolean

  /** Botão completamente quadrado (sem border-radius) */
  square?: boolean

  // ========================================
  // States
  // ========================================

  /** Estado de carregamento (mostra spinner) */
  loading?: boolean

  /** Estado desabilitado */
  disabled?: boolean

  // ========================================
  // Loading Progress
  // ========================================

  /** Porcentagem de progresso (0-100) */
  percentage?: number | null

  /** Usar indicador escuro na barra de progresso */
  darkPercentage?: boolean

  // ========================================
  // Behavior
  // ========================================

  /** Tipo nativo do botão HTML */
  type?: ButtonType

  /** Rota Vue Router (transforma em router-link) */
  to?: RouteLocationRaw | null

  /** Usar router.replace ao invés de router.push */
  replace?: boolean

  // ========================================
  // Brand
  // ========================================

  /** Brand override (Hub, Water, Waste) */
  brand?: ButtonBrand | null

  // ========================================
  // Layout
  // ========================================

  /** Modo compacto (reduz padding) */
  dense?: boolean

  /** Desabilita text-transform: uppercase */
  noCaps?: boolean

  /** Alinhamento interno do conteúdo */
  align?: ButtonAlign

  /** Empilha ícone e label verticalmente */
  stack?: boolean

  /** Estica o botão para ocupar largura total */
  stretch?: boolean

  /** Previne quebra de linha do label */
  noWrap?: boolean

  /** Padding customizado (ex: "16px 32px") */
  padding?: string | null

  // ========================================
  // Interaction
  // ========================================

  /** Ativa efeito ripple ao clicar */
  ripple?: boolean

  /** Tabindex customizado */
  tabindex?: number | string | null
}

/**
 * Eventos emitidos pelo DssButton
 */
export interface ButtonEmits {
  /**
   * Emitido quando o botão é clicado
   * @param event MouseEvent nativo
   */
  (e: 'click', event: MouseEvent): void
}

/**
 * Slots disponíveis no DssButton
 */
export interface ButtonSlots {
  /**
   * Conteúdo principal do botão
   * @default label prop
   */
  default(): any
}

// ==========================================================================
// TIPOS AUXILIARES
// ==========================================================================

/**
 * Tipo para o componente dinâmico (<component :is="">)
 */
export type ButtonComponentType = 'button' | 'router-link'

/**
 * Estilo inline para barra de progresso
 */
export interface PercentageStyle {
  transform: string
}

/**
 * Estilo inline customizável do botão
 */
export interface ButtonStyle {
  padding?: string
}

/**
 * Dados computados do botão (para composables)
 */
export interface ButtonComputedData {
  /** Tipo do componente (button ou router-link) */
  componentType: ButtonComponentType

  /** Tipo nativo HTML (para <button>) */
  nativeType: ButtonType | null

  /** Ícone à esquerda computado */
  computedIconLeft: string

  /** Ícone à direita computado */
  computedIconRight: string

  /** Classes CSS do botão */
  buttonClasses: (string | Record<string, boolean>)[]

  /** Estilos inline do botão */
  buttonStyle: ButtonStyle

  /** Estilos da barra de progresso */
  percentageStyle: PercentageStyle | null

  /** Tabindex computado */
  computedTabindex: number
}
