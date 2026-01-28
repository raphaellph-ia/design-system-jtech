/**
 * ==========================================================================
 * DssChip - BARREL EXPORT
 *
 * RESPONSABILIDADE: Exportar todos os artefatos públicos do componente
 *
 * EXPORTS:
 * - DssChip: Componente Vue principal
 * - useChipClasses: Composable para geração de classes
 * - Types: Interfaces TypeScript
 * ==========================================================================
 */

// Componente Vue principal
export { default as DssChip } from './1-structure/DssChip.ts.vue'

// Composables
export { useChipClasses } from './composables'

// Types (re-export para consumidores TypeScript)
export * from './types/chip.types'
