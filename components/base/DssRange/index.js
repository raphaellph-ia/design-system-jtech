/**
 * DssRange — Barrel Export
 *
 * Exporta o componente (via entry point wrapper), types e composables.
 * Entry point: DssRange.vue (re-export puro de 1-structure/).
 */
export { default as DssRange } from './DssRange.vue'
export { useRangeClasses, useRangeActions, useRangeState } from './composables'
