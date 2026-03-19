/**
 * DssTextarea — Component Exports
 *
 * Exporta o componente wrapper, composables e types.
 * Entry point para consumo externo.
 *
 * @version 1.0.0
 */

import DssTextarea from './1-structure/DssTextarea.ts.vue'

export { DssTextarea }
export default DssTextarea

// Composables
export { useTextareaClasses } from './composables/useTextareaClasses'
export { useTextareaState } from './composables/useTextareaState'
export { useTextareaActions } from './composables/useTextareaActions'

// Types
export type {
  TextareaVariant,
  TextareaBrand,
  TextareaProps,
  TextareaEmits,
  TextareaSlots,
  TextareaExpose,
  TextareaState
} from './types/textarea.types'
