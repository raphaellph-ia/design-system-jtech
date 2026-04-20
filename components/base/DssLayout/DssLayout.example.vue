<script setup lang="ts">
/**
 * DssLayout — Exemplos Interativos
 *
 * EXC-01 (Exemplo): Uso de q-page-container e q-page nativos
 * DssPageContainer e DssPage ainda não existem na Fase 2 do DSS.
 * Os exemplos usam os componentes Quasar nativos temporariamente para
 * demonstrar o cálculo de offsets e a estrutura de layout completa.
 * O código fonte do componente (DssLayout.ts.vue) permanece 100% aderente.
 * Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md — seção exemplo.
 */
import { ref } from 'vue'
import DssLayout from './DssLayout.vue'
import DssHeader from '../DssHeader/DssHeader.vue'
import DssFooter from '../DssFooter/DssFooter.vue'
import DssDrawer from '../DssDrawer/DssDrawer.vue'

const leftDrawerOpen = ref(true)
const rightDrawerOpen = ref(false)
const activeExample = ref<'basic' | 'container' | 'right-drawer'>('basic')

function toggleLeft() { leftDrawerOpen.value = !leftDrawerOpen.value }
function toggleRight() { rightDrawerOpen.value = !rightDrawerOpen.value }
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- Seletor de exemplo -->
    <div class="row q-gutter-sm q-mb-md">
      <q-btn
        :outline="activeExample !== 'basic'"
        color="primary"
        label="1. Básico"
        @click="activeExample = 'basic'"
      />
      <q-btn
        :outline="activeExample !== 'container'"
        color="primary"
        label="2. Container Mode"
        @click="activeExample = 'container'"
      />
      <q-btn
        :outline="activeExample !== 'right-drawer'"
        color="primary"
        label="3. Right Drawer"
        @click="activeExample = 'right-drawer'"
      />
    </div>

    <!-- ================================================================
         EXEMPLO 1 — Layout Básico (Padrão DSS)
         Estrutura completa: Header + Drawer esquerdo + Page + Footer
         view="hHh lpR fFf" — padrão corporativo DSS
         ================================================================ -->
    <div v-if="activeExample === 'basic'" style="height: 400px; position: relative; overflow: hidden; border: 1px solid var(--dss-gray-300);">
      <DssLayout view="hHh lpR fFf" container>
        <DssHeader elevated>
          <q-toolbar>
            <q-btn flat round icon="menu" aria-label="Abrir menu" @click="toggleLeft" />
            <q-toolbar-title>Sansys Hub</q-toolbar-title>
          </q-toolbar>
        </DssHeader>

        <DssDrawer v-model="leftDrawerOpen" side="left" aria-label="Navegação principal">
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar><q-icon name="home" /></q-item-section>
              <q-item-section>Início</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar><q-icon name="settings" /></q-item-section>
              <q-item-section>Configurações</q-item-section>
            </q-item>
          </q-list>
        </DssDrawer>

        <!-- EXC-01 (Exemplo): q-page-container e q-page nativos -->
        <q-page-container>
          <q-page class="q-pa-md">
            <p class="text-body1">Conteúdo principal da página.</p>
            <p class="text-body2 text-grey-6">
              O DssLayout aplica <code>--dss-surface-muted</code> como fundo base,
              criando contraste visual com os DssCards que usam <code>--dss-surface-default</code>.
            </p>
          </q-page>
        </q-page-container>

        <DssFooter bordered>
          <q-toolbar>
            <q-toolbar-title class="text-caption text-center">
              Design System Sansys v2.2
            </q-toolbar-title>
          </q-toolbar>
        </DssFooter>
      </DssLayout>
    </div>

    <!-- ================================================================
         EXEMPLO 2 — Container Mode
         Layout renderizado dentro de um elemento com dimensões fixas.
         Útil para embeds, modais ou previews da aplicação.
         ================================================================ -->
    <div v-if="activeExample === 'container'" style="height: 400px; position: relative; overflow: hidden; border: 1px solid var(--dss-gray-300);">
      <DssLayout view="hHh lpR fFf" container>
        <DssHeader>
          <q-toolbar>
            <q-toolbar-title>Preview em Container</q-toolbar-title>
          </q-toolbar>
        </DssHeader>

        <!-- EXC-01 (Exemplo): q-page-container e q-page nativos -->
        <q-page-container>
          <q-page class="q-pa-md">
            <p class="text-body1">Layout em modo container.</p>
            <p class="text-body2 text-grey-6">
              A prop <code>container=true</code> faz o QLayout respeitar as dimensões
              do elemento pai em vez de ocupar a janela inteira.
            </p>
          </q-page>
        </q-page-container>
      </DssLayout>
    </div>

    <!-- ================================================================
         EXEMPLO 3 — Right Drawer
         Drawer posicionado à direita com view personalizada.
         view="hHh lpR fFf" — right-drawer fixo na desktop.
         ================================================================ -->
    <div v-if="activeExample === 'right-drawer'" style="height: 400px; position: relative; overflow: hidden; border: 1px solid var(--dss-gray-300);">
      <DssLayout view="hHh lpR fFf" container>
        <DssHeader>
          <q-toolbar>
            <q-toolbar-title>Layout com Drawer Direito</q-toolbar-title>
            <q-btn flat round icon="menu_open" aria-label="Abrir painel" @click="toggleRight" />
          </q-toolbar>
        </DssHeader>

        <DssDrawer v-model="rightDrawerOpen" side="right" aria-label="Painel de detalhes">
          <q-list>
            <q-item-label header>Detalhes</q-item-label>
            <q-item>
              <q-item-section>
                <q-item-label>Informação adicional</q-item-label>
                <q-item-label caption>Painel de contexto lateral</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </DssDrawer>

        <!-- EXC-01 (Exemplo): q-page-container e q-page nativos -->
        <q-page-container>
          <q-page class="q-pa-md">
            <p class="text-body1">Conteúdo com painel lateral direito.</p>
          </q-page>
        </q-page-container>
      </DssLayout>
    </div>
  </div>
</template>
