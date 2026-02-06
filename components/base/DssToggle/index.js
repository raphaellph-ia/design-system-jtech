/**
 * ==========================================================================
 * DssToggle - BARREL EXPORT
 *
 * RESPONSABILIDADE: Exportar todos os artefatos publicos do componente
 *
 * EXPORTS:
 * - DssToggle: Componente Vue principal
 * - useToggleClasses: Composable para geracao de classes
 * - Types: Interfaces TypeScript
 * ==========================================================================
 */

// Componente Vue principal
export { default as DssToggle } from './1-structure/DssToggle.ts.vue'

// Composables
export { useToggleClasses } from './composables'

// Types (re-export para consumidores TypeScript)
export * from './types/toggle.types'
