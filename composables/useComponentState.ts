/**
 * ==========================================================================
 * useComponentState - Global Composable
 * ==========================================================================
 *
 * Composable global para gerenciar estados comuns de componentes
 * (focus, hover, active, disabled, loading, etc.)
 *
 * @example
 * ```ts
 * const { isFocused, isHovered, bindStateEvents } = useComponentState({
 *   disabled: props.disabled
 * })
 * ```
 */

import { ref, computed, type Ref } from 'vue'

/**
 * Opções para gerenciamento de estado
 */
export interface ComponentStateOptions {
  /**
   * Estado inicial de foco
   */
  initialFocused?: boolean

  /**
   * Componente está desabilitado (não permite interações)
   */
  disabled?: boolean | Ref<boolean>

  /**
   * Componente está em carregamento
   */
  loading?: boolean | Ref<boolean>
}

/**
 * Composable para gerenciar estados de componentes
 *
 * Gerencia estados interativos comuns:
 * - isFocused: componente está focado
 * - isHovered: mouse está sobre o componente
 * - isActive: componente está sendo pressionado
 * - isDisabled: componente está desabilitado
 * - isLoading: componente está carregando
 *
 * Também fornece event bindings prontos para usar
 */
export function useComponentState(options: ComponentStateOptions = {}) {
  // Estados reativos
  const isFocused = ref(options.initialFocused ?? false)
  const isHovered = ref(false)
  const isActive = ref(false)

  // Estados computados
  const isDisabled = computed(() => {
    const disabled = options.disabled
    return typeof disabled === 'boolean' ? disabled : disabled?.value ?? false
  })

  const isLoading = computed(() => {
    const loading = options.loading
    return typeof loading === 'boolean' ? loading : loading?.value ?? false
  })

  /**
   * Indica se o componente pode receber interações
   */
  const isInteractive = computed(() => {
    return !isDisabled.value && !isLoading.value
  })

  // Event Handlers
  const handleFocus = () => {
    if (isInteractive.value) {
      isFocused.value = true
    }
  }

  const handleBlur = () => {
    isFocused.value = false
    isActive.value = false
  }

  const handleMouseEnter = () => {
    if (isInteractive.value) {
      isHovered.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
    isActive.value = false
  }

  const handleMouseDown = () => {
    if (isInteractive.value) {
      isActive.value = true
    }
  }

  const handleMouseUp = () => {
    isActive.value = false
  }

  /**
   * Event bindings prontos para usar em v-bind
   *
   * @example
   * ```vue
   * <div v-bind="bindStateEvents">...</div>
   * ```
   */
  const bindStateEvents = computed(() => ({
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
    onMousedown: handleMouseDown,
    onMouseup: handleMouseUp
  }))

  return {
    // Estados
    isFocused,
    isHovered,
    isActive,
    isDisabled,
    isLoading,
    isInteractive,

    // Handlers
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,

    // Bindings
    bindStateEvents
  }
}
