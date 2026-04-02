<template>
  <q-item-label
    :class="itemLabelClasses"
    :header="props.header"
    :caption="props.caption"
    :overline="props.overline"
    :lines="props.lines"
    v-bind="$attrs"
  >
    <slot />
  </q-item-label>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssItemLabel - Design System Sansys Item Label Component
 * ==========================================================================
 *
 * Container tipográfico para itens de lista.
 * Governa a hierarquia tipográfica dentro de um DssItemSection,
 * sobrescrevendo a tipografia nativa do Quasar com tokens DSS (EXC-01).
 *
 * Golden Reference: DssBadge (padrão não-interativo — sem touch target)
 * Golden Context:   DssItemSection (container pai direto)
 *
 * RESPONSABILIDADES:
 * ✅ Tipografia governada por tokens DSS (font-size, weight, color, line-height)
 * ✅ Variantes semânticas: header, caption, overline
 * ✅ Truncamento de texto por número de linhas (prop lines)
 * ✅ Sobrescrita da tipografia nativa do Quasar com tokens DSS (EXC-01)
 * ✅ Forwarding de $attrs via inheritAttrs: false + v-bind="$attrs"
 *
 * NÃO RESPONSABILIDADES:
 * ❌ Interatividade (hover, focus, click) — pertence ao DssItem pai
 * ❌ Touch target — componente estritamente não-interativo (Option B)
 * ❌ Layout de seção — pertence ao DssItemSection pai
 * ❌ Brandabilidade direta — herdada via [data-brand] no ancestral
 * ❌ Dark mode por prop — gerenciado via [data-theme="dark"] global
 *
 * @see https://quasar.dev/vue-components/list-and-list-items#qitemlabel-api
 *
 * @example
 * ```vue
 * <DssItemSection>
 *   <DssItemLabel>Ana Silva</DssItemLabel>
 *   <DssItemLabel caption>Administradora do sistema</DssItemLabel>
 * </DssItemSection>
 * ```
 *
 * @version 1.0.0
 */

import type { ItemLabelProps, ItemLabelSlots } from '../types/item-label.types'
import { useItemLabelClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssItemLabel',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<ItemLabelProps>(), {
  header: false,
  caption: false,
  overline: false,
  lines: undefined
})

// ==========================================================================
// SLOTS (declaração explícita para type safety)
// ==========================================================================

defineSlots<ItemLabelSlots>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { itemLabelClasses } = useItemLabelClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css — padrão DssList/DssItem -->
