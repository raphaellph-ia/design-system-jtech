/**
 * DssBtnGroup - Component Exports
 *
 * Exporta o componente de grupo de botões DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssBtnGroup } from '@/dss/components/base/DssBtnGroup'
 * import DssBtnGroup from '@/dss/components/base/DssBtnGroup'
 *
 * @example
 * import type { BtnGroupProps } from '@/dss/components/base/DssBtnGroup'
 * import { useBtnGroupClasses } from '@/dss/components/base/DssBtnGroup'
 */

// Componente — via Entry Point Wrapper canônico (não via 1-structure diretamente)
import DssBtnGroup from './DssBtnGroup.vue'

export { DssBtnGroup }
export default DssBtnGroup

// Types
export type { BtnGroupProps, BtnGroupBrand, BtnGroupSlots } from './types/btn-group.types'

// Composables
export { useBtnGroupClasses } from './composables'
