<template>
  <!--
    DssBtnDropdown — Botão com dropdown governado pelo DSS
    Equivalente governado ao QBtnDropdown do Quasar.

    ARQUITETURA:
    - Envolve QBtnDropdown (não reconstrói do zero)
    - prop `variant` mapeia para props booleanas do Quasar internamente
    - Panel estilizado via popup-content-class (painel teleportado para o body)
    - Sem <style scoped> — necessário para seletores de filhos funcionarem

    ⚠️ PAINEL TELEPORTADO:
    O QMenu/QBtnDropdown teleporta o painel para o body.
    Seletores como `.dss-btn-dropdown .q-menu` NÃO funcionam.
    Use popup-content-class="dss-btn-dropdown__panel" para escopo de estilos.
  -->
  <div
    :class="btnDropdownClasses"
    v-bind="$attrs"
  >
    <q-btn-dropdown
      :label="label"
      :icon="icon"
      :icon-right="iconRight"
      v-bind="variantProps"
      :color="color"
      :text-color="textColor"
      :size="size"
      :square="square"
      :rounded="rounded"
      :dense="dense"
      :split="split"
      :disable="disable"
      :loading="loading"
      :close-on-esc-key="closeOnEsc"
      :dropdown-icon="dropdownIcon"
      :menu-anchor="menuAnchor"
      :menu-self="menuSelf"
      :menu-offset="menuOffset"
      :stretch="stretch"
      :persistent="persistent"
      :aria-label="ariaLabel || undefined"
      popup-content-class="dss-btn-dropdown__panel"
      class="dss-btn-dropdown__trigger"
      @click="(e: MouseEvent) => emit('click', e)"
      @show="emit('show')"
      @hide="emit('hide')"
      @before-show="emit('before-show')"
      @before-hide="emit('before-hide')"
    >
      <!-- Slot label: conteúdo personalizado do trigger -->
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>

      <!-- Slot default: conteúdo do painel dropdown -->
      <slot />
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBtnDropdown - Design System Sansys Button Dropdown Component
 * ==========================================================================
 *
 * Botão com dropdown integrado. Envolve QBtnDropdown com governança DSS.
 *
 * DECISÕES ARQUITETURAIS:
 * 1. WRAPPER (não rebuild): QBtnDropdown fornece comportamento de painel completo
 *    (posicionamento, acessibilidade, animações). Rebuild seria duplicação de esforço.
 * 2. Prop `variant`: API simplificada DSS que mapeia para props booleanas Quasar.
 *    Impede combinações inválidas (ex: flat + outline simultâneos).
 * 3. popup-content-class: Mecanismo para injetar classe no painel teleportado.
 *    Precedente: DssSelect (selado Mar 2026) usa mesmo padrão.
 * 4. div wrapper: Necessário para aplicar classes DSS no container sem conflitar
 *    com o elemento raiz do QBtnDropdown.
 *
 * GATE DE COMPOSIÇÃO v2.4:
 * - Usa QBtnDropdown (componente Quasar, não HTML nativo) ✓
 * - Não usa :deep() ou ::v-deep ✓
 * - Sem seletores descendentes diretos em filhos DSS ✓
 *
 * GATE DE RESPONSABILIDADE v2.4:
 * - Container não captura estados interativos dos filhos ✓
 * - Sem lógica de negócio de produto ✓
 *
 * @see https://quasar.dev/vue-components/button-dropdown
 * @see DSS/components/base/DssBtnDropdown/DssBtnDropdown.md
 *
 * @version 2.2.0
 */

import { computed } from 'vue'
import type { BtnDropdownProps, BtnDropdownEmits } from '../types/btn-dropdown.types'
import { useBtnDropdownClasses, useBtnDropdownVariantProps } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssBtnDropdown',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<BtnDropdownProps>(), {
  // Conteúdo
  label: undefined,
  icon: undefined,
  iconRight: undefined,

  // Estilo visual
  variant: 'elevated',
  color: undefined,
  textColor: undefined,
  size: 'md',
  square: false,
  rounded: false,
  dense: false,

  // Comportamento
  split: false,
  disable: false,
  loading: false,
  closeOnEsc: true,
  dropdownIcon: 'arrow_drop_down',
  menuAnchor: 'bottom left',
  menuSelf: 'top left',
  menuOffset: () => [0, 0],
  stretch: false,
  persistent: false,

  // Brand
  brand: null,

  // Acessibilidade
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<{
  click: [event: MouseEvent]
  show: []
  hide: []
  'before-show': []
  'before-hide': []
}>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { btnDropdownClasses } = useBtnDropdownClasses(props)

// Mapeia variant → props booleanas do QBtnDropdown
// CORREÇÃO NC-02: wrapped em computed para manter reatividade se variant mudar dinamicamente.
// useBtnDropdownVariantProps recebe o valor estático — o computed externo rastreia props.variant.
const variantProps = computed(() => useBtnDropdownVariantProps(props.variant).value)
</script>

<style lang="scss">
// Import final compiled styles (Layer 4 output)
// NOTA: Sem `scoped` — necessário para que popup-content-class e seletores
// globais de painel funcionem. Com scoped, o Vue adiciona data-v-xxx apenas
// ao template deste componente, mas o painel é teleportado para o body e
// não recebe este atributo. Precedente: DssBtnGroup NC-01 (Ciclo 1, Mar 2026).
@import '../DssBtnDropdown.module.scss';
</style>
