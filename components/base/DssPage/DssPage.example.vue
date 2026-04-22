<template>
  <div class="dss-page-examples">

    <!-- =====================================================================
         Cenário 1: Edge-to-Edge (sem padding)
         Demonstra o DssPage sem padding — útil para dashboards e layouts
         que precisam de controle total do espaçamento interno.
         EXC-01: <q-page> é o elemento raiz (ver 1-structure/DssPage.ts.vue).
         ===================================================================== -->
    <section>
      <h2>1. Edge-to-Edge — conteúdo sem padding (padrão)</h2>
      <div style="height: 300px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-header elevated>
            <dss-toolbar>
              <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
            </dss-toolbar>
          </dss-header>

          <dss-page-container>
            <dss-page>
              <div
                style="
                  background-color: var(--dss-surface-default);
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <p>Conteúdo edge-to-edge — sem padding interno.</p>
              </div>
            </dss-page>
          </dss-page-container>
        </dss-layout>
      </div>
    </section>

    <!-- =====================================================================
         Cenário 2: Com Padding DSS
         Demonstra a prop padding="true" aplicando --dss-container-padding
         (= --dss-spacing-4 / 16px) em todos os lados.
         ===================================================================== -->
    <section style="margin-top: var(--dss-spacing-6)">
      <h2>2. Com Padding — espaçamento interno governado por token</h2>
      <div style="height: 300px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-header elevated>
            <dss-toolbar>
              <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
            </dss-toolbar>
          </dss-header>

          <dss-page-container>
            <dss-page :padding="true">
              <div style="background-color: var(--dss-surface-default); border-radius: var(--dss-radius-md);">
                <p>Conteúdo com padding de <code>--dss-container-padding</code> (16px) em todos os lados.</p>
                <p style="margin-top: var(--dss-spacing-2)">
                  O espaçamento é governado por token — nunca hardcoded.
                </p>
              </div>
            </dss-page>
          </dss-page-container>
        </dss-layout>
      </div>
    </section>

    <!-- =====================================================================
         Cenário 3: Playground — Sticky Footer + Volume de Conteúdo
         Demonstração crítica: o DssPage calcula min-height automaticamente
         para garantir que o DssFooter fique colado na parte inferior
         mesmo quando há pouco conteúdo.
         ===================================================================== -->
    <section style="margin-top: var(--dss-spacing-6)">
      <h2>3. Playground — Sticky Footer e Volume de Conteúdo</h2>

      <div style="display: flex; gap: var(--dss-spacing-4); margin-bottom: var(--dss-spacing-3)">
        <label>
          <input v-model="withPadding" type="checkbox" />
          Padding
        </label>
        <label>
          <input v-model="muitoConteudo" type="checkbox" />
          Muito conteúdo
        </label>
      </div>

      <p style="margin-bottom: var(--dss-spacing-3); font-size: var(--dss-font-size-sm); color: var(--dss-text-secondary)">
        <strong>Teste crítico:</strong> com "Muito conteúdo" desativado, o Footer deve permanecer
        colado na parte inferior (comportamento sticky footer via min-height do Quasar).
        Com "Muito conteúdo" ativado, a página deve rolar normalmente.
      </p>

      <div style="height: 500px; position: relative; overflow: hidden; border: 1px solid currentColor;">
        <dss-layout view="hHh LpR fFf">
          <dss-header elevated>
            <dss-toolbar>
              <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
            </dss-toolbar>
          </dss-header>

          <dss-page-container>
            <dss-page :padding="withPadding">
              <template v-if="muitoConteudo">
                <p v-for="n in 30" :key="n" style="margin-bottom: var(--dss-spacing-2)">
                  Parágrafo {{ n }} — conteúdo extenso para demonstrar scroll natural da página.
                </p>
              </template>
              <template v-else>
                <p>Pouco conteúdo — o Footer deve estar fixo no final da tela.</p>
              </template>
            </dss-page>
          </dss-page-container>

          <dss-footer>
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
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssToolbarTitle from '../DssToolbarTitle/DssToolbarTitle.vue'
import DssPageContainer from '../DssPageContainer/DssPageContainer.vue'
import DssPage from './DssPage.vue'

const withPadding = ref(false)
const muitoConteudo = ref(false)
</script>
