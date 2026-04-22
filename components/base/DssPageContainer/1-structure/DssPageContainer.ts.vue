<template>
  <q-page-container
    :class="pageContainerClasses"
    v-bind="$attrs"
  >
    <slot />
  </q-page-container>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPageContainer — Layer 1: Implementação Canônica
 * ==========================================================================
 *
 * Wrapper DSS governado sobre QPageContainer. Container estrutural que
 * recebe os offsets calculados pelo DssLayout e os aplica como padding
 * dinâmico, garantindo que o conteúdo da página não fique oculto
 * sob DssHeader, DssFooter ou DssDrawer fixos.
 *
 * Responsabilidades:
 * - Encapsula <q-page-container> preservando a comunicação com QLayout pai
 * - Aplica a classe .dss-page-container para identificação e escopo CSS
 * - Repassa todos os atributos HTML ao elemento raiz via v-bind="$attrs"
 *
 * NÃO responsabilidades:
 * - Cor de fundo: herdada do DssLayout pai via --dss-surface-muted
 * - Padding interno do conteúdo: responsabilidade do DssPage filho
 * - Scroll: gerenciado pela janela ou pelo DssPage filho
 * - Interatividade: componente 100% não-interativo
 *
 * Props bloqueadas:
 * - Nenhuma: QPageContainer não possui props próprias documentadas na
 *   API do Quasar. Ele apenas reage ao contexto do QLayout pai via
 *   variáveis CSS injetadas (--q-header-offset, --q-footer-offset, etc.).
 *
 * EXC-01: Uso direto de <q-page-container> como raiz do template
 * - QPageContainer depende de provide/inject interno do QLayout pai
 *   para receber offsets via variáveis CSS.
 * - Envolver em <div> quebraria essa comunicação.
 * - Precedente canônico: DssLayout, DssHeader, DssDrawer.
 *
 * Gate de Responsabilidade v2.4:
 * - DssPageContainer é container estrutural puro — sem hover, focus, active
 * - O padding é calculado pelo Quasar internamente; o DSS não interfere
 *
 * @version 1.0.0
 */

import type { PageContainerSlots } from '../types/page-container.types'
import { usePageContainerClasses } from '../composables'

defineOptions({
  name: 'DssPageContainer',
  inheritAttrs: false
})

defineSlots<PageContainerSlots>()

const { pageContainerClasses } = usePageContainerClasses()
</script>
