/**
 * useRadioClasses — Composable de classes CSS
 * Design System Sansys v2.2
 *
 * Gera classes CSS dinamicas com base em props e estado.
 * Segue o mesmo padrao do useCheckboxClasses (Golden Component).
 */

import { computed, type Ref } from 'vue'
import type { RadioProps } from '../types/radio.types'

export interface UseRadioClassesOptions {
  isChecked: Ref<boolean>
  isFocused: Ref<boolean>
}

export function useRadioClasses(
  props: Readonly<RadioProps>,
  options: UseRadioClassesOptions
) {
  // -------------------------------------------------------------------------
  // Classes do elemento raiz (.dss-radio)
  // -------------------------------------------------------------------------
  const radioClasses = computed(() => {
    const color = props.color || 'primary'

    // Classe de cor apenas quando brand esta definido (para seletores _brands.scss)
    let colorClass = ''
    if (props.brand) {
      colorClass = `dss-radio--${color}`
    }

    return [
      'dss-radio',
      `dss-radio--${props.size || 'md'}`,
      colorClass,
      {
        'dss-radio--checked': options.isChecked.value,
        'dss-radio--disabled': props.disable,
        'dss-radio--dense': props.dense,
        'dss-radio--error': props.error,
        'dss-radio--left-label': props.leftLabel,
      }
    ]
  })

  // -------------------------------------------------------------------------
  // Classes do controle visual (.dss-radio__control)
  // -------------------------------------------------------------------------
  const controlClasses = computed(() => {
    const classes = ['dss-radio__control']

    if (options.isChecked.value) {
      classes.push('dss-radio__control--checked')
    }

    if (options.isFocused.value) {
      classes.push('dss-radio__control--focused')
    }

    return classes
  })

  // -------------------------------------------------------------------------
  // Classes de cor (utilitarias Quasar, sem brand)
  // -------------------------------------------------------------------------
  const controlColorClasses = computed(() => {
    // Quando brand esta ativo, _brands.scss cuida das cores
    if (props.brand) return ''

    if (!options.isChecked.value) return ''

    // Cores de erro tem prioridade
    if (props.error) return ''

    const color = props.color || 'primary'
    return `text-${color}`
  })

  return { radioClasses, controlClasses, controlColorClasses }
}
