/**
 * DssTabs — Component Exports
 *
 * Exporta o componente container de abas DSS, seus tipos TypeScript
 * e composables para uso externo.
 *
 * @example
 * import { DssTabs } from '@/dss/components/base/DssTabs'
 * import DssTabs from '@/dss/components/base/DssTabs'
 *
 * @example
 * import type { TabsProps } from '@/dss/components/base/DssTabs'
 * import { useTabsClasses } from '@/dss/components/base/DssTabs'
 */

// Componente — via Entry Point Wrapper canônico (não via 1-structure diretamente)
import DssTabs from './DssTabs.vue'

export { DssTabs }
export default DssTabs

// Types
export type { TabsProps, TabsEmits, TabsSlots, TabsBrand, TabsAlign } from './types/tabs.types'

// Composables
export { useTabsClasses } from './composables'
