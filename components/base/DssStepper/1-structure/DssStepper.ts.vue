<script setup lang="ts">
/**
 * ==========================================================================
 * DssStepper — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QStepper. Container de navegação em etapas (wizard).
 *
 * Responsabilidades:
 * - Encapsula <q-stepper> expondo apenas as props semanticamente relevantes
 * - Gerencia o estado ativo (v-model) entre os DssStep filhos
 * - Bloqueia props de cor (color, active-color, done-color, error-color,
 *   inactive-color) — DSS governa cores via tokens no DssStep
 * - Bloqueia `dark` — modo escuro governado pelo DSS via [data-theme='dark']
 * - Propaga [data-brand] para coloração automática dos DssStep filhos
 * - Expõe slot `message` para mensagens globais no stepper
 *
 * Props bloqueadas:
 * - dark: governado por [data-theme='dark'] via tokens CSS
 * - color / active-color / done-color / error-color / inactive-color:
 *   governados por tokens DSS no DssStep
 *
 * Regra de Composição v2.4:
 * - Aceita apenas DssStep em seu slot default
 * - O uso de <q-step> diretamente dentro do DssStepper é violação arquitetural
 *
 * Nota arquitetural:
 * - O <div class="dss-stepper"> é o root (Gate de Composição v2.4 PASSA)
 * - O <q-stepper> interno gerencia state management, keyboard navigation
 *   e provide/inject de estado ativo para os DssStep filhos
 *
 * @version 1.0.0
 * @see https://quasar.dev/vue-components/stepper
 */
import type { StepperProps, StepperEmits, StepperSlots } from '../types/stepper.types'
import { useStepperClasses } from '../composables/useStepperClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssStepper',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: undefined,
  vertical: false,
  headerNav: false,
  animated: false,
  flat: false,
  bordered: false,
  brand: null,
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<StepperEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<StepperSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { stepperClasses } = useStepperClasses(props)

// ==========================================================================
// HANDLERS
// ==========================================================================

/**
 * Emite update:modelValue para compatibilidade com v-model.
 */
function onUpdate(val: string | number): void {
  emit('update:modelValue', val)
}
</script>

<template>
  <!--
    DssStepper — Container de navegação em etapas DSS

    Padrão arquitetural (Gate de Composição v2.4 — conforme):
    <div> DSS como elemento raiz — mesmo padrão de DssTabs (Golden Reference).
    O <q-stepper> interno provê state management, keyboard navigation e
    provide/inject de estado para os DssStep filhos via Quasar.

    [data-brand] no root propaga acento visual de marca aos DssStep filhos
    via cascade CSS dos seletores [data-brand='x'] .dss-step em _brands.scss.

    EXC-01 (CSS): seletores .dss-stepper .q-stepper__* são necessários para
    governar a linha conectora com tokens DSS.
  -->
  <div
    :class="stepperClasses"
    :data-brand="props.brand || undefined"
    v-bind="$attrs"
  >
    <q-stepper
      :model-value="props.modelValue"
      :vertical="props.vertical"
      :header-nav="props.headerNav"
      :animated="props.animated"
      :flat="props.flat"
      :bordered="props.bordered"
      :aria-label="props.ariaLabel || undefined"
      @update:model-value="onUpdate"
    >
      <!-- Slot default: aceita DssStep exclusivamente -->
      <slot />

      <!-- Slot message: mensagens globais entre passos (opcional) -->
      <template v-if="$slots.message" #message>
        <slot name="message" />
      </template>
    </q-stepper>
  </div>
</template>
