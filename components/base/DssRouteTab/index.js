/**
 * ==========================================================================
 * DssRouteTab — Barrel Export
 * ==========================================================================
 *
 * Exporta: componente principal, types e composables.
 *
 * @version 1.0.0
 */

// Componente principal (entry point wrapper)
export { default as DssRouteTab } from './DssRouteTab.vue'

// Types (TypeScript)
export type { RouteTabProps, RouteTabSlots } from './types/route-tab.types'

// Composables
export { useRouteTabClasses } from './composables/useRouteTabClasses'
