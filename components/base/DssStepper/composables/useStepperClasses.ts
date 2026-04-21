/**
 * ==========================================================================
 * DssStepper — Composable: useStepperClasses
 * ==========================================================================
 *
 * Computa as classes CSS do DssStepper com base nas props recebidas.
 *
 * @version 1.0.0
 */

import { computed } from 'vue'
import type { StepperProps } from '../types/stepper.types'

/**
 * Retorna as classes computadas para o elemento raiz do DssStepper.
 *
 * Classes geradas:
 * - `dss-stepper`                — classe base (sempre presente)
 * - `dss-stepper--vertical`     — layout vertical (vertical=true)
 * - `dss-stepper--horizontal`   — layout horizontal (vertical=false, padrão)
 * - `dss-stepper--flat`         — sem sombra (flat=true)
 * - `dss-stepper--bordered`     — com borda (bordered=true)
 * - `dss-stepper--brand-{x}`   — modificador de marca (brand='hub'|'water'|'waste')
 */
export function useStepperClasses(props: Readonly<StepperProps>) {
  const stepperClasses = computed(() => [
    'dss-stepper',
    {
      'dss-stepper--vertical': props.vertical,
      'dss-stepper--horizontal': !props.vertical,
      'dss-stepper--flat': props.flat,
      'dss-stepper--bordered': props.bordered,
      [`dss-stepper--brand-${props.brand}`]: !!props.brand,
    }
  ])

  return { stepperClasses }
}
