/**
 * ==========================================================================
 * DssSeparator - BARREL EXPORT
 *
 * RESPONSABILIDADE: Exportar todos os artefatos públicos do componente
 *
 * EXPORTS:
 * - DssSeparator: Componente Vue principal
 * - useSeparatorClasses: Composable para geração de classes
 * - Types: Interfaces TypeScript
 * ==========================================================================
 */

// Componente Vue principal (via Entry Point Wrapper)
export { default as DssSeparator } from './DssSeparator.vue'

// Composables
export { useSeparatorClasses } from './composables'

// Types (re-export para consumidores TypeScript)
export * from './types/separator.types'
