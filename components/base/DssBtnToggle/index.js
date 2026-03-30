/**
 * DssBtnToggle - Component Exports
 *
 * Exporta o componente de alternância DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssBtnToggle } from '@/dss/components/base/DssBtnToggle'
 * import DssBtnToggle from '@/dss/components/base/DssBtnToggle'
 *
 * @example
 * import type { BtnToggleProps } from '@/dss/components/base/DssBtnToggle'
 * import { useBtnToggleClasses } from '@/dss/components/base/DssBtnToggle'
 */

// Componente — via Entry Point Wrapper canônico (não via 1-structure diretamente)
import DssBtnToggle from './DssBtnToggle.vue'

export { DssBtnToggle }
export default DssBtnToggle

// Types
export type { BtnToggleProps, BtnToggleBrand, BtnToggleVariant, BtnToggleOption, BtnToggleEmits, BtnToggleSlots } from './types/btn-toggle.types'

// Composables
export { useBtnToggleClasses } from './composables'
