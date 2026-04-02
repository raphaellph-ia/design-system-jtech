/**
 * ==========================================================================
 * DssTab — Composable: useTabClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssTab com base nas props recebidas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { TabProps } from '../types/tab.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssTab.
 *
 * Classes geradas:
 * - `dss-tab`            — classe base (sempre presente)
 * - `dss-tab--icon`      — aba somente ícone (icon sem label)
 * - `dss-tab--has-icon`  — aba com ícone (com ou sem label)
 * - `dss-tab--has-label` — aba com texto
 * - `dss-tab--alert`     — indicador de alerta ativo
 * - `dss-tab--disable`   — estado desabilitado
 */
export function useTabClasses(props: Readonly<TabProps>) {
  const tabClasses = computed(() => [
    'dss-tab',
    {
      'dss-tab--icon': !!props.icon && !props.label,
      'dss-tab--has-icon': !!props.icon,
      'dss-tab--has-label': !!props.label,
      'dss-tab--alert': !!props.alert,
      'dss-tab--disable': props.disable
    }
  ])

  return { tabClasses }
}
