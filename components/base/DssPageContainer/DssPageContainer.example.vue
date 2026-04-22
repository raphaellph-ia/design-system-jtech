<template>
  <div class="dss-page-container-examples">

    <!-- =====================================================================
         Cenário 1: Layout Completo (Header + Footer + Drawer)
         Demonstra o recálculo dinâmico de offsets em todos os eixos.
         Valores fixos — independente dos controles do Cenário 3.
         EXC-02: <q-page> nativo usado — DssPage ainda não existe (compositionFuture).
         ===================================================================== -->
    <section>
      <h2>1. Layout Completo — offsets em todos os eixos</h2>
      <div style="height: 400px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-header elevated>
            <dss-toolbar>
              <dss-toolbar-title>Título da Página</dss-toolbar-title>
            </dss-toolbar>
          </dss-header>

          <dss-drawer side="left" :model-value="true">
            <div style="padding: var(--dss-spacing-4)">Navegação</div>
          </dss-drawer>

          <!-- DssPageContainer: recebe offsets via --q-header-offset etc. -->
          <dss-page-container>
            <!-- EXC-02: q-page nativo — DssPage é compositionFuture -->
            <q-page style="padding: var(--dss-spacing-4)">
              <p>Conteúdo principal. O padding deste container é calculado
              automaticamente pelo Quasar com base na presença de Header,
              Footer e Drawer.</p>
            </q-page>
          </dss-page-container>

          <dss-footer>
            <dss-toolbar>
              <dss-toolbar-title>Rodapé</dss-toolbar-title>
            </dss-toolbar>
          </dss-footer>
        </dss-layout>
      </div>
    </section>

    <!-- =====================================================================
         Cenário 2: Layout Limpo — sem offsets
         Demonstra que o padding dinâmico se ajusta a zero quando não há
         Header, Footer ou Drawer presentes.
         ===================================================================== -->
    <section style="margin-top: var(--dss-spacing-6)">
      <h2>2. Layout Limpo — sem offsets (padding zero)</h2>
      <div style="height: 200px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-page-container>
            <q-page style="padding: var(--dss-spacing-4)">
              <p>Sem Header, Footer ou Drawer — DssPageContainer ocupa
              100% do espaço disponível sem padding adicional.</p>
            </q-page>
          </dss-page-container>
        </dss-layout>
      </div>
    </section>

    <!-- =====================================================================
         Cenário 3: Playground — recálculo dinâmico
         Controles para alternar presença de Header, Footer e Drawer.
         ===================================================================== -->
    <section style="margin-top: var(--dss-spacing-6)">
      <h2>3. Playground — recálculo dinâmico</h2>

      <div style="display: flex; gap: var(--dss-spacing-4); margin-bottom: var(--dss-spacing-3)">
        <label>
          <input v-model="showHeader" type="checkbox" />
          Header Visível
        </label>
        <label>
          <input v-model="showFooter" type="checkbox" />
          Footer Visível
        </label>
        <label>
          <input v-model="showDrawer" type="checkbox" />
          Drawer Visível
        </label>
      </div>

      <div style="height: 400px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-header v-if="showHeader" elevated>
            <dss-toolbar>
              <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
            </dss-toolbar>
          </dss-header>

          <dss-drawer v-if="showDrawer" side="left" :model-value="true">
            <div style="padding: var(--dss-spacing-4)">
              <p>Menu lateral</p>
            </div>
          </dss-drawer>

          <dss-page-container>
            <q-page style="padding: var(--dss-spacing-4)">
              <p>O padding do DssPageContainer é recalculado automaticamente
              ao ativar/desativar os elementos ao redor.</p>
              <p style="margin-top: var(--dss-spacing-2)">
                Header: <strong>{{ showHeader ? 'Ativo' : 'Inativo' }}</strong> |
                Footer: <strong>{{ showFooter ? 'Ativo' : 'Inativo' }}</strong> |
                Drawer: <strong>{{ showDrawer ? 'Ativo' : 'Inativo' }}</strong>
              </p>
            </q-page>
          </dss-page-container>

          <dss-footer v-if="showFooter">
            <dss-toolbar>
              <dss-toolbar-title>Rodapé da Aplicação</dss-toolbar-title>
            </dss-toolbar>
          </dss-footer>
        </dss-layout>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssLayout from '../DssLayout/DssLayout.vue'
import DssHeader from '../DssHeader/DssHeader.vue'
import DssFooter from '../DssFooter/DssFooter.vue'
import DssDrawer from '../DssDrawer/DssDrawer.vue'
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssToolbarTitle from '../DssToolbarTitle/DssToolbarTitle.vue'
import DssPageContainer from './DssPageContainer.vue'

const showHeader = ref(true)
const showFooter = ref(true)
const showDrawer = ref(false)
</script>
