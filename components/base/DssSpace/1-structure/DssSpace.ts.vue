<script setup lang="ts">
/**
 * ==========================================================================
 * DssSpace — Layer 1: Structure
 *
 * RESPONSABILIDADE: Estrutura Vue e lógica do componente.
 *
 * COMPORTAMENTOS IMPLÍCITOS DECLARADOS (DSS v2.4 obrigatório):
 *
 * inheritAttrs: true (padrão Vue)
 *   → Atributos adicionais (data-testid, id, style externo) são aplicados
 *     automaticamente ao <div> raiz via merge do Vue.
 *   → O atributo `aria-hidden="true"` é estático e sempre presente.
 *     Se o consumidor tentar sobrescrever via $attrs, o binding declarado
 *     no template tem precedência sobre $attrs (Vue merge: template wins).
 *
 * aria-hidden="true" — ESTÁTICO (não é prop)
 *   → DssSpace é um elemento de layout puro, invisível para tecnologias
 *     assistivas por definição. Não carrega informação semântica.
 *   → Ao contrário do DssSeparator (que pode ser semanticamente relevante),
 *     o DssSpace NUNCA deve ser lido por leitores de tela.
 *   → Por isso, aria-hidden não é prop — é sempre verdadeiro.
 *
 * Slots: Nenhum.
 * Events: Nenhum.
 * Estados NÃO aplicáveis: hover, focus, active, disabled, loading, error,
 *   indeterminate (componente não interativo, sem conteúdo visual).
 * ==========================================================================
 */

import { defineOptions } from 'vue'
import type { SpaceProps } from '../types/space.types'
import { useSpaceClasses } from '../composables'

defineOptions({
  name: 'DssSpace',
  inheritAttrs: true
})

const props = defineProps<SpaceProps>()

const { spaceClasses } = useSpaceClasses(props)
</script>

<template>
  <div
    :class="spaceClasses"
    aria-hidden="true"
  />
</template>
