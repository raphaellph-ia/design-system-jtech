<template>
  <!--
    DssBtnToggle — Container de seleção exclusiva (grupo de alternância)
    Equivalente governado ao QBtnToggle do Quasar.

    role="group" conforme WAI-ARIA 1.1 para grupos de controles relacionados.
    Os botões internos são renderizados pelo Quasar via prop `options`.
    Cada botão tem role="button" e aria-pressed gerenciados pelo Quasar.

    DIFERENÇA FUNDAMENTAL vs. DssBtnGroup:
    - DssBtnToggle gerencia v-model (estado de seleção)
    - Os botões internos são gerados automaticamente pelo QBtnToggle
    - Não há <slot> de DssButton — a composição é via prop `options`

    GATE DE COMPOSIÇÃO v2.4 (pré-formalizado):
    Os seletores SCSS usam `.q-btn-item` (classe interna do QBtnToggle).
    Este é um elemento DOM do Quasar, não um componente DSS filho.
    Ver gateExceptions.compositionGateV24 em dss.meta.json.

    GATE DE RESPONSABILIDADE v2.4 (pré-formalizado):
    A variante outline usa :hover/:focus-visible em .q-btn-item para z-index.
    Ajuste estrutural (posicionamento), não visual. Ver dss.meta.json.
  -->
  <q-btn-toggle
    :class="btnToggleClasses"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :options="options"
    :flat="variantProps.flat"
    :outline="variantProps.outline"
    :unelevated="variantProps.unelevated"
    :push="variantProps.push"
    :rounded="rounded"
    :square="square"
    :spread="spread"
    :stretch="stretch"
    :disable="disable"
    :readonly="readonly"
    :clearable="clearable"
    :color="color || undefined"
    :toggle-color="toggleColor || undefined"
    :text-color="textColor || undefined"
    :toggle-text-color="toggleTextColor || undefined"
    role="group"
    :aria-label="ariaLabel || undefined"
    no-caps
    v-bind="$attrs"
  >
    <!--
      Slots dinâmicos por opção.
      Cada opção com prop `slot` habilita um slot nomeado correspondente.
      O DssBtnToggle re-expõe esses slots para o consumidor.
    -->
    <template v-for="option in options" :key="option.value">
      <template v-if="option.slot" #[option.slot]>
        <slot :name="option.slot" :option="option" />
      </template>
    </template>
  </q-btn-toggle>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBtnToggle - Design System Sansys Button Toggle Component
 * ==========================================================================
 *
 * Container de seleção exclusiva que gerencia estado via v-model.
 * Agrupa botões que funcionam como radio buttons — apenas uma opção
 * pode estar ativa por vez (salvo uso de `clearable` para desmarcar).
 *
 * ARQUITETURA:
 * - Wrapper governado do QBtnToggle (Fase 2)
 * - Gerencia v-model de seleção
 * - Mapeia `variant` (string) para props booleanas do Quasar
 * - Touch target: delegado ao QBtnToggle interno (Opção B)
 * - Sem <style scoped>: necessário para seletores `.q-btn-item` (painel global)
 *
 * PRECEDENTE ARQUITETURAL:
 * - DssBtnGroup (irmão direto): mesma estrutura de container, gateExceptions
 * - DssBtnDropdown (sibling Fase 2): mesmo padrão de mapeamento de variante
 *
 * @see https://quasar.dev/vue-components/button-toggle
 *
 * @example
 * ```vue
 * <DssBtnToggle
 *   v-model="alinhamento"
 *   :options="[
 *     { label: 'Esquerda', value: 'left' },
 *     { label: 'Centro', value: 'center' },
 *     { label: 'Direita', value: 'right' },
 *   ]"
 *   variant="outline"
 *   aria-label="Alinhamento de texto"
 * />
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed } from 'vue'
import type { BtnToggleProps, BtnToggleEmits } from '../types/btn-toggle.types'
import { useBtnToggleClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssBtnToggle',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<BtnToggleProps>(), {
  // Valor do v-model — sem default (undefined = nenhuma seleção)
  modelValue: undefined,

  // Variante visual
  variant: 'elevated',

  // Cores — sem default (undefined = sistema Quasar/CSS aplica padrão)
  color: undefined,
  toggleColor: undefined,
  textColor: undefined,
  toggleTextColor: undefined,

  // Forma
  rounded: false,
  square: false,

  // Layout
  spread: false,
  stretch: false,

  // Interação
  disable: false,
  readonly: false,
  clearable: false,

  // Brand
  brand: null,

  // Acessibilidade
  ariaLabel: undefined,
})

// ==========================================================================
// EMITS
// ==========================================================================

const emit = defineEmits<BtnToggleEmits>()

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { btnToggleClasses, variantProps } = useBtnToggleClasses(props)
</script>

<style lang="scss">
/**
 * Import final compiled styles (Layer 4 output)
 *
 * NOTA: Sem `scoped` — este componente usa seletores globais para estilizar
 * botões internos (.q-btn-item) renderizados pelo QBtnToggle.
 * Com <style scoped>, os filhos não receberiam o atributo de escopo Vue
 * e nenhum seletor `.dss-btn-toggle > .q-btn-item` produziria efeito.
 *
 * Precedente: DssBtnGroup NC-01 (Ciclo 1, Mar 2026) — mesma causa raiz.
 * Precedente: DssBtnDropdown (Ciclo 1, Mar 2026) — mesmo padrão para painel.
 */
@import '../DssBtnToggle.module.scss';
</style>
