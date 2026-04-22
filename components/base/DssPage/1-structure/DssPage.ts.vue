<template>
  <!--
    DssPage — Área de conteúdo principal da aplicação

    Padrão arquitetural (EXC-01):
    <q-page> é o elemento raiz — não pode ser envolvido em <div>.
    O QPage recebe estilos inline dinâmicos (min-height) calculados
    pelo Quasar em JavaScript, com base nas dimensões da janela e nos
    offsets do QLayout pai (--q-header-offset, --q-footer-offset).
    Envolver em outro elemento aplicaria o min-height ao wrapper, mas
    o <q-page> interno não expandiria, quebrando o comportamento de
    "sticky footer".

    role="main" é o padrão DSS — representa o conteúdo principal do documento.
    Pode ser sobrescrito via $attrs se o contexto exigir outro role.
    v-bind="$attrs" após role="main" garante que $attrs.role sobrescreva
    o padrão, respeitando a intenção do consumidor.
  -->
  <q-page
    :class="pageClasses"
    role="main"
    :style-fn="props.styleFn"
    v-bind="$attrs"
  >
    <slot />
  </q-page>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPage — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPage. Define a área de conteúdo principal
 * da aplicação dentro do DssPageContainer.
 *
 * Responsabilidades:
 * - Encapsula <q-page> preservando o cálculo dinâmico de min-height do Quasar
 * - Aplica role="main" por padrão (acessibilidade WCAG 2.1 — landmark navigation)
 * - Aplica padding interno governado por token quando padding=true
 * - Repassa todos os atributos HTML ao elemento raiz via v-bind="$attrs"
 *
 * NÃO responsabilidades:
 * - Cor de fundo: herdada do DssLayout via --dss-surface-muted
 * - Scrollbars: gerenciadas pelo navegador ou por DssScrollArea
 * - Layout interno: responsabilidade do desenvolvedor consumidor
 * - Offsets de header/footer: calculados pelo QLayout e aplicados pelo QPage
 *
 * Props expostas:
 * - padding: aplica --dss-container-padding em todos os lados
 * - styleFn: sobrescreve o cálculo de min-height do Quasar (uso avançado)
 *
 * EXC-01: Uso direto de <q-page> como raiz do template
 * - QPage recebe min-height calculado por JS via provide/inject do QLayout
 * - Envolver em <div> quebraria o layout sticky footer
 * - Precedente canônico: DssLayout, DssPageContainer
 *
 * @version 1.0.0
 */

import type { PageProps, PageSlots } from '../types/page.types'
import { usePageClasses } from '../composables'

defineOptions({
  name: 'DssPage',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PageProps>(), {
  padding: false,
  styleFn: undefined
})

defineSlots<PageSlots>()

const { pageClasses } = usePageClasses(props)
</script>
