<script setup lang="ts">
/**
 * ==========================================================================
 * DssRouteTab — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QRouteTab. Aba individual com integração Vue Router.
 *
 * Responsabilidades:
 * - Encapsula <q-route-tab> expondo apenas as props semanticamente relevantes
 * - Bloqueia prop `ripple` (sempre false) — DSS governa feedback visual
 * - Expõe props de roteamento: to, exact, replace, href, target
 * - Delega estados visuais hover/focus/active ao SCSS (sem lógica Vue)
 * - Delega estado selected/active ao DssTabs pai via Vue Router + Quasar
 * - Aplica classe .dss-tab — infraestrutura CSS compartilhada com DssTab
 *
 * Props bloqueadas:
 * - ripple: desativado (:ripple="false") — DSS governa feedback via ::after
 * - no-caps: governado pelo CSS/tokens DSS, não por prop
 * - color, text-color: governados por tokens DSS/brands, não por prop
 *
 * @version 1.0.0
 */
import type { RouteTabProps, RouteTabSlots } from '../types/route-tab.types'
import { useRouteTabClasses } from '../composables/useRouteTabClasses'

defineOptions({ name: 'DssRouteTab', inheritAttrs: false })

const props = withDefaults(defineProps<RouteTabProps>(), {
  label: undefined,
  icon: undefined,
  alert: undefined,
  disable: false,
  to: undefined,
  exact: false,
  replace: false,
  href: undefined,
  target: undefined
})

defineSlots<RouteTabSlots>()

const { routeTabClasses } = useRouteTabClasses(props)
</script>

<template>
  <q-route-tab
    :class="routeTabClasses"
    :name="props.name"
    :label="props.label"
    :icon="props.icon"
    :alert="props.alert"
    :disable="props.disable"
    :to="props.to"
    :exact="props.exact"
    :replace="props.replace"
    :href="props.href"
    :target="props.target"
    :ripple="false"
    v-bind="$attrs"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </q-route-tab>
</template>
