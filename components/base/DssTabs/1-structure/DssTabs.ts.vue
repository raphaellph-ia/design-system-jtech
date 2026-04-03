<script setup lang="ts">
/**
 * ==========================================================================
 * DssTabs — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QTabs. Container de navegação por abas.
 *
 * Responsabilidades:
 * - Encapsula <q-tabs> expondo apenas as props semanticamente relevantes
 * - Gerencia o estado global de seleção (v-model) entre as DssTab filhas
 * - Bloqueia props de cor (active-color, active-bg-color, indicator-color)
 *   — DSS governa cores via tokens no DssTab
 * - Bloqueia `ripple` (sempre false) — DSS governa feedback visual
 * - Bloqueia `no-caps` — governado por CSS/tokens DSS
 * - Impõe ícones oficiais DSS nas setas de navegação (chevron_left/right)
 * - Propaga [data-brand] para coloração automática dos DssTab filhos
 *
 * Props bloqueadas:
 * - active-color: tokens DSS no DssTab governam cor ativa
 * - active-bg-color: tokens DSS no DssTab governam cor de fundo ativa
 * - indicator-color: tokens DSS no DssTab governam cor do indicador
 * - ripple: desativado permanentemente (:ripple="false")
 * - no-caps: CSS/tokens DSS controlam transformação de texto
 *
 * Regra de Composição v2.4:
 * - Aceita apenas DssTab (ou DssRouteTab futuro) em seu slot default
 * - O uso de <q-tab> diretamente dentro do DssTabs é violação arquitetural
 *
 * @version 1.0.0
 * @see https://quasar.dev/vue-components/tabs
 */
import type { TabsProps, TabsEmits, TabsSlots } from '../types/tabs.types'
import { useTabsClasses } from '../composables/useTabsClasses'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssTabs',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  align: 'left',
  breakpoint: 600,
  vertical: false,
  dense: false,
  brand: null,
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<TabsEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<TabsSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { tabsClasses } = useTabsClasses(props)

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
    DssTabs — Container de grupo de abas DSS

    Padrão arquitetural (Gate de Composição v2.4 Regra 1):
    <div> DSS como elemento raiz — mesmo padrão de DssBtnDropdown (conformant).
    O <q-tabs> é o componente Quasar interno que provê state management,
    keyboard navigation e scroll/arrow logic.

    aria-label e data-brand ficam no root <div> para forwarding correto de
    atributos e cascade CSS de marca nos DssTab filhos.

    As setas de navegação usam chevron_left/right (Material Icons padrão
    do Quasar) forçados explicitamente — impedindo substituição acidental
    por ícones externos.
  -->
  <div
    :class="tabsClasses"
    :data-brand="props.brand || undefined"
    v-bind="$attrs"
  >
    <q-tabs
      :model-value="props.modelValue"
      :align="props.align"
      :breakpoint="props.breakpoint"
      :vertical="props.vertical"
      :dense="props.dense"
      :aria-label="props.ariaLabel || undefined"
      left-icon="chevron_left"
      right-icon="chevron_right"
      :ripple="false"
      @update:model-value="onUpdate"
    >
      <!-- Slot default: aceita DssTab (e DssRouteTab quando implementado) -->
      <slot />
    </q-tabs>
  </div>
</template>
