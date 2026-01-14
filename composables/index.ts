/**
 * ==========================================================================
 * DSS Global Composables - Index
 * ==========================================================================
 *
 * Exportação central de todos os composables globais do Design System Sansys
 *
 * Estes composables podem ser usados por qualquer componente do sistema
 * para funcionalidades comuns como cores, acessibilidade, estados, etc.
 *
 * @example
 * ```ts
 * import { useColorClasses, useAccessibility } from '@/composables'
 * ```
 */

// Color Management
export { useColorClasses } from './useColorClasses'
export type { DssColor, ColorClassesOptions } from './useColorClasses'

// Accessibility
export { useAccessibility, generateA11yId } from './useAccessibility'
export type { AccessibilityOptions } from './useAccessibility'

// Component State
export { useComponentState } from './useComponentState'
export type { ComponentStateOptions } from './useComponentState'

// Brand Management
export { useBrand, getBrandColor, BRAND_COLORS } from './useBrand'
export type { SansysBrand } from './useBrand'
