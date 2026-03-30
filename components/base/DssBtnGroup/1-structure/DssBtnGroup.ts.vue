<template>
  <!--
    DssBtnGroup — Container de agrupamento de botões DSS
    Equivalente governado ao QBtnGroup do Quasar.

    role="group" conforme WAI-ARIA 1.1 para grupos de controles relacionados.
    Os botões filhos são navegáveis individualmente por Tab.
    O grupo em si NÃO é focusável — apenas os filhos recebem foco.

    ⚠️ REGRA DE OURO (Prop Sync):
    Props de estilo (flat, outline, push, unelevated, glossy) DEVEM ser
    declaradas TANTO neste componente QUANTO em cada DssButton filho.
    O DssBtnGroup NÃO propaga essas props automaticamente.
  -->
  <div
    :class="btnGroupClasses"
    role="group"
    :aria-label="ariaLabel || undefined"
    v-bind="$attrs"
  >
    <!-- Slot default: aceita DssButton (e DssBtnDropdown quando implementado) -->
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssBtnGroup - Design System Sansys Button Group Component
 * ==========================================================================
 *
 * Container de composição que agrupa instâncias de DssButton.
 * Gerencia border-radius nas extremidades, gap entre botões e
 * ajustes visuais específicos por variante.
 *
 * ARQUITETURA:
 * - Container estrutural (Fase 2)
 * - Não propaga props para filhos
 * - Usa seletores CSS globais para ajustar filhos (documentado como exceção)
 * - Touch target: delegado aos DssButton filhos (Opção B)
 *
 * @see https://quasar.dev/vue-components/button-group
 *
 * @example
 * ```vue
 * <!-- CORRETO: prop de estilo declarada no grupo E em cada filho -->
 * <DssBtnGroup outline>
 *   <DssButton outline label="Primeiro" />
 *   <DssButton outline label="Segundo" />
 * </DssBtnGroup>
 * ```
 *
 * @example
 * ```vue
 * <!-- ERRADO: botões filhos não herdarão o estilo outline -->
 * <DssBtnGroup outline>
 *   <DssButton label="Sem outline" />
 * </DssBtnGroup>
 * ```
 *
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import type { BtnGroupProps } from '../types/btn-group.types'
import { useBtnGroupClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssBtnGroup',
  inheritAttrs: false
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<BtnGroupProps>(), {
  // Estilos visuais (prop sync com filhos obrigatório)
  flat: false,
  outline: false,
  push: false,
  unelevated: false,
  rounded: false,
  square: false,
  glossy: false,

  // Layout
  spread: false,
  stretch: false,

  // Brand
  brand: null,

  // Acessibilidade
  ariaLabel: undefined,
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { btnGroupClasses } = useBtnGroupClasses(props)
</script>

<style lang="scss">
// Import final compiled styles (Layer 4 output)
// NOTA: Sem `scoped` — este componente usa seletores globais para estilizar
// filhos DssButton passados via <slot>. Com scoped, os filhos não recebem o
// atributo de escopo do Vue e nenhum seletor `.dss-btn-group > .dss-button`
// produziria efeito. Padrão documentado em 2-composition/_base.scss.
@import '../DssBtnGroup.module.scss';
</style>
