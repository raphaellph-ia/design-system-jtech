<script setup lang="ts">
/**
 * ==========================================================================
 * DssDrawer — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QDrawer. Container lateral de navegação de página.
 *
 * Responsabilidades:
 * - Encapsula <q-drawer> expondo apenas props semanticamente relevantes
 * - Bloqueia prop `dark` (dark mode gerenciado por CSS via [data-theme="dark"])
 * - Bloqueia prop `behavior` (padronizado como "default" — desktop=push, mobile=overlay)
 * - Gerencia variantes de elevação (elevated) e borda (bordered)
 * - Aplica role="navigation" por padrão (sobrescritível via $attrs)
 * - Container 100% não-interativo — estados de interação pertencem aos filhos
 * - Slot default destinado exclusivamente a DssList, DssMenu ou cabeçalhos DSS
 *
 * Props bloqueadas:
 * - dark: dark mode governado por token --dss-surface-default via [data-theme="dark"]
 * - behavior: DSS padroniza como "default" (desktop=push, mobile=overlay)
 *
 * Props repassadas via $attrs (não declaradas como props DSS):
 * - aria-label, aria-labelledby: contexto de acessibilidade (recomendado)
 * - role: sobrescreve "navigation" padrão quando drawer é informativo
 * - Qualquer atributo HTML nativo não conflitante
 *
 * Gate de Responsabilidade v2.4:
 * - DssDrawer é container estrutural puro — sem hover, focus, active próprios
 * - Interatividade é responsabilidade dos DssList/DssItem/DssMenu internos
 * - Brand é responsabilidade dos componentes filhos (DssList, DssMenu)
 *
 * EXC-03: <q-drawer> como elemento raiz
 * - QDrawer depende de provide/inject do QLayout pai para calcular offsets
 * - Envolver em <div> quebraria a comunicação interna do QLayout
 * - Classes DSS são aplicadas ao mesmo elemento raiz via :class binding
 * - Precedente: DssHeader usa <q-header> como elemento raiz pelo mesmo motivo
 *
 * @version 1.0.0
 */
import { computed, useAttrs } from 'vue'
import type { DrawerProps, DrawerEmits, DrawerSlots } from '../types/drawer.types'
import { useDrawerClasses } from '../composables'

// ==========================================================================
// COMPONENT OPTIONS
// ==========================================================================

defineOptions({
  name: 'DssDrawer',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: true,
  side: 'left',
  overlay: false,
  elevated: false,
  bordered: false,
  mini: false,
  width: 256
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<DrawerEmits>()

// ==========================================================================
// SLOTS
// ==========================================================================

defineSlots<DrawerSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const attrs = useAttrs()
const { drawerClasses } = useDrawerClasses(props)

// ==========================================================================
// COMPUTED
// ==========================================================================

/**
 * Mescla role="navigation" padrão DSS com $attrs.
 * O consumidor pode sobrescrever via role="complementary" quando o drawer
 * é usado como painel de informações e não de navegação.
 *
 * Prioridade: attrs.role (consumidor) > 'navigation' (padrão DSS)
 */
const drawerAttrs = computed(() => ({
  role: 'navigation',
  ...attrs
}))

// ==========================================================================
// HANDLERS
// ==========================================================================

/**
 * Emite update:modelValue para compatibilidade com v-model.
 */
function onUpdate(val: boolean): void {
  emit('update:modelValue', val)
}
</script>

<template>
  <!--
    DssDrawer — Container lateral de navegação DSS

    Padrão arquitetural (EXC-03):
    <q-drawer> é o elemento raiz — não pode ser envolvido em <div>.
    O QDrawer depende de provide/inject do QLayout para calcular offsets
    de conteúdo, gerenciar posicionamento lateral e controlar z-index.
    Classes DSS são aplicadas via :class binding no mesmo elemento.
    Precedente: DssHeader usa <q-header> como raiz pelo mesmo motivo.

    behavior="default" é hardcoded (prop bloqueada no DSS):
    - Desktop: drawer empurra o conteúdo para o lado (push mode)
    - Mobile: drawer sobrepõe o conteúdo com backdrop (overlay mode)
    Posicionado APÓS v-bind para garantir que o consumidor não possa
    sobrescrever acidentalmente via $attrs.

    role="navigation" é padrão DSS — sobrescritível via $attrs.
  -->
  <q-drawer
    :class="drawerClasses"
    v-bind="drawerAttrs"
    :model-value="props.modelValue"
    :side="props.side"
    :overlay="props.overlay"
    :mini="props.mini"
    :width="props.width"
    behavior="default"
    @update:model-value="onUpdate"
  >
    <slot />
  </q-drawer>
</template>

<style lang="scss">
/* Não-scoped: necessário para alcançar .q-drawer__backdrop (elemento interno do QDrawer) */
@import '../DssDrawer.module.scss';
</style>
