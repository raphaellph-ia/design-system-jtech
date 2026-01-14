/**
 * ==========================================================================
 * useBrand - Global Composable
 * ==========================================================================
 *
 * Composable global para gerenciar marcas do sistema Sansys
 * (Hub, Water, Waste)
 *
 * @example
 * ```ts
 * const { brandClass, isBranded } = useBrand(props.brand, 'dss-button')
 * ```
 */

import { computed } from 'vue'

/**
 * Marcas do sistema Sansys
 */
export type SansysBrand = 'hub' | 'water' | 'waste'

/**
 * Composable para gerenciar marcas Sansys
 *
 * Gera classe CSS apropriada para a marca:
 * - {componentName}--brand-hub
 * - {componentName}--brand-water
 * - {componentName}--brand-waste
 *
 * @param brand - Marca Sansys ou null
 * @param componentName - Nome base do componente (ex: 'dss-button')
 */
export function useBrand(
  brand: SansysBrand | string | null | undefined,
  componentName: string
) {
  /**
   * Verifica se há uma marca aplicada
   */
  const isBranded = computed(() => {
    return !!brand
  })

  /**
   * Classe CSS da marca
   *
   * Formato: {componentName}--brand-{brand}
   * Exemplo: 'dss-button--brand-hub'
   */
  const brandClass = computed(() => {
    if (!brand) return ''
    return `${componentName}--brand-${brand}`
  })

  /**
   * Objeto de classe condicional para uso direto em :class
   *
   * @example
   * ```vue
   * <div :class="[baseClass, brandClassObject]">
   * ```
   */
  const brandClassObject = computed(() => {
    if (!brand) return {}
    return { [brandClass.value]: true }
  })

  return {
    isBranded,
    brandClass,
    brandClassObject
  }
}

/**
 * Mapeamento de cores primárias por marca
 */
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: '#1976D2',     // Azul Hub
  water: '#0288D1',   // Azul Water
  waste: '#388E3C'    // Verde Waste
}

/**
 * Utilitário para obter a cor primária de uma marca
 *
 * @example
 * ```ts
 * const color = getBrandColor('hub') // '#1976D2'
 * ```
 */
export function getBrandColor(brand: SansysBrand | null | undefined): string | null {
  if (!brand) return null
  return BRAND_COLORS[brand as SansysBrand] ?? null
}
