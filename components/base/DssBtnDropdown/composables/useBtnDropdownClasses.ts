/**
 * ==========================================================================
 * useBtnDropdownClasses — Composable de Classes DSS
 * ==========================================================================
 *
 * Gera o array de classes CSS do DssBtnDropdown baseado nas props.
 * Segue a hierarquia de estados DSS: error > disabled > loading > color > brand > default
 *
 * ARQUITETURA:
 * - Este composable APENAS gera classes (não aplica estilos)
 * - Estilos são definidos em 2-composition, 3-variants e 4-output
 * - Sem lógica de negócio de produto
 */

import { computed } from 'vue'
import type { BtnDropdownProps, BtnDropdownVariant } from '../types/btn-dropdown.types'

// ==========================================================================
// MAPEAMENTO DE VARIANTES
// ==========================================================================

/**
 * Mapeia a prop `variant` do DssBtnDropdown para as props booleanas do QBtnDropdown.
 * Este é o mecanismo de prop sync entre a API DSS simplificada e a API Quasar.
 */
export function useBtnDropdownVariantProps(variant: BtnDropdownVariant | undefined) {
  return computed(() => {
    switch (variant) {
      case 'flat':
        return { flat: true }
      case 'outline':
        return { outline: true }
      case 'unelevated':
        return { unelevated: true }
      case 'elevated':
      default:
        // 'elevated' é o padrão Quasar — sem prop booleana explícita
        return {}
    }
  })
}

// ==========================================================================
// CLASSES DO CONTAINER
// ==========================================================================

/**
 * Composable principal: gera as classes do elemento raiz .dss-btn-dropdown
 */
export function useBtnDropdownClasses(props: BtnDropdownProps) {
  const btnDropdownClasses = computed<string[]>(() => {
    const classes: string[] = ['dss-btn-dropdown']

    // Variante visual
    if (props.variant && props.variant !== 'elevated') {
      classes.push(`dss-btn-dropdown--${props.variant}`)
    }

    // Modo split
    if (props.split) {
      classes.push('dss-btn-dropdown--split')
    }

    // Square / Rounded
    if (props.square) {
      classes.push('dss-btn-dropdown--square')
    }
    if (props.rounded) {
      classes.push('dss-btn-dropdown--rounded')
    }

    // Dense
    if (props.dense) {
      classes.push('dss-btn-dropdown--dense')
    }

    // Estados — hierarquia DSS
    if (props.disable) {
      classes.push('dss-btn-dropdown--disabled')
    }
    if (props.loading) {
      classes.push('dss-btn-dropdown--loading')
    }

    // Brand
    if (props.brand) {
      classes.push(`dss-btn-dropdown--brand-${props.brand}`)
    }

    return classes
  })

  return { btnDropdownClasses }
}
