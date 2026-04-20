<script setup lang="ts">
/**
 * ==========================================================================
 * DssLayout — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS sobre QLayout. Container raiz de aplicação — Nível 4.
 *
 * Responsabilidades:
 * - Encapsula <q-layout> expondo apenas props semanticamente relevantes
 * - Bloqueia prop dark (dark mode gerenciado por CSS via [data-theme="dark"])
 * - Aplica --dss-surface-muted como fundo base da aplicação
 * - Orquestra o espaço para DssHeader, DssDrawer, DssFooter e DssPageContainer
 * - Container 100% não-interativo — estados de interação pertencem aos filhos
 *
 * Props bloqueadas:
 * - dark: dark mode governado por token via [data-theme="dark"]
 *
 * Props repassadas via $attrs (não declaradas como props DSS):
 * - aria-label, aria-labelledby: contexto de acessibilidade (recomendado)
 * - Qualquer atributo HTML nativo não conflitante
 *
 * Gate de Responsabilidade v2.4:
 * - DssLayout é container estrutural raiz 100% não-interativo
 * - Sem hover, focus, active próprios
 * - Responsabilidade visual única: fundo base da aplicação
 *
 * EXC-01 — QLayout como elemento raiz:
 * - QLayout usa provide/inject internamente para comunicar dimensões a
 *   QHeader, QFooter, QDrawer e QPageContainer via variáveis CSS
 *   (--q-header-offset, --q-footer-offset, etc.)
 * - Envolver em <div> quebraria toda a matemática de layout do Quasar
 * - Classes DSS são aplicadas ao mesmo elemento raiz via :class binding
 * - Precedente: DssHeader (q-header raiz), DssDrawer (q-drawer raiz)
 *
 * @version 1.0.0
 */
import type { LayoutProps, LayoutSlots } from '../types/layout.types'
import { useLayoutClasses } from '../composables'

defineOptions({ name: 'DssLayout', inheritAttrs: false })

const props = withDefaults(defineProps<LayoutProps>(), {
  view: 'hHh lpR fFf',
  container: false
})

defineSlots<LayoutSlots>()

const { layoutClasses } = useLayoutClasses(props)
</script>

<template>
  <!--
    DssLayout — Container raiz de aplicação

    Padrão arquitetural (EXC-01):
    <q-layout> é o elemento raiz — não pode ser envolvido em <div>.
    O QLayout usa provide/inject internamente para comunicar offsets de
    header/footer/drawer aos componentes filhos via variáveis CSS.
    Envolver em outro elemento quebraria esse canal de comunicação.
    Precedente: DssHeader, DssDrawer usam o mesmo padrão.

    view="hHh lpR fFf" é o padrão corporativo DSS:
    - Header com linha fixa e responsiva
    - Drawer esquerdo responsivo, direito fixo
    - Footer com linha fixa e responsiva

    Slot default destinado exclusivamente a:
    DssHeader, DssDrawer, DssFooter, DssPageContainer
    (ou equivalentes Quasar nativos durante desenvolvimento)
  -->
  <q-layout
    :class="layoutClasses"
    :view="props.view"
    :container="props.container"
    v-bind="$attrs"
  >
    <slot />
  </q-layout>
</template>

<style lang="scss" scoped>
@import '../DssLayout.module.scss';
</style>
