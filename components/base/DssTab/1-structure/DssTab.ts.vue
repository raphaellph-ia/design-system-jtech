<script setup lang="ts">
/**
 * ==========================================================================
 * DssTab — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QTab. Aba individual de navegação/seleção.
 *
 * Responsabilidades:
 * - Encapsula <q-tab> expondo apenas as props semanticamente relevantes
 * - Bloqueia prop `ripple` (sempre false) — DSS governa feedback visual
 * - Delega estados visuais hover/focus/active ao SCSS (sem lógica Vue)
 * - Delega estado selected/active ao DssTabs pai via v-model
 * - Fornece classes semânticas para o sistema de estilos DSS
 *
 * Props bloqueadas:
 * - ripple: desativado por padrão (:ripple="false")
 * - no-caps: governado pelo CSS/tokens DSS, não por prop
 *
 * @version 1.0.0
 */
import type { TabProps, TabSlots } from '../types/tab.types'
import { useTabClasses } from '../composables/useTabClasses'

defineOptions({ name: 'DssTab', inheritAttrs: false })

const props = withDefaults(defineProps<TabProps>(), {
  label: undefined,
  icon: undefined,
  alert: undefined,
  disable: false
})

defineSlots<TabSlots>()

const { tabClasses } = useTabClasses(props)
</script>

<template>
  <q-tab
    :class="tabClasses"
    :name="props.name"
    :label="props.label"
    :icon="props.icon"
    :alert="props.alert"
    :disable="props.disable"
    :ripple="false"
    v-bind="$attrs"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </q-tab>
</template>
