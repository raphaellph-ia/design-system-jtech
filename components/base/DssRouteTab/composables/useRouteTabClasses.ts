/**
 * ==========================================================================
 * DssRouteTab — Composable: useRouteTabClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssRouteTab com base nas props recebidas.
 *
 * DssRouteTab aplica as mesmas classes `.dss-tab` do DssTab — toda a
 * infraestrutura visual é compartilhada. O composable mirror exato de
 * useTabClasses, garantindo independência arquitetural entre os dois
 * componentes sem acoplamento de importação.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { RouteTabProps } from '../types/route-tab.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssRouteTab.
 *
 * Classes geradas (mesmas do DssTab por design):
 * - `dss-tab`            — classe base (sempre presente)
 * - `dss-tab--icon`      — aba somente ícone (icon sem label)
 * - `dss-tab--has-icon`  — aba com ícone (com ou sem label)
 * - `dss-tab--has-label` — aba com texto
 * - `dss-tab--alert`     — indicador de alerta ativo
 * - `dss-tab--disable`   — estado desabilitado
 */
export function useRouteTabClasses(props: Readonly<RouteTabProps>) {
  const routeTabClasses = computed(() => [
    'dss-tab',
    {
      'dss-tab--icon': !!props.icon && !props.label,
      'dss-tab--has-icon': !!props.icon,
      'dss-tab--has-label': !!props.label,
      'dss-tab--alert': !!props.alert,
      'dss-tab--disable': props.disable
    }
  ])

  return { routeTabClasses }
}
