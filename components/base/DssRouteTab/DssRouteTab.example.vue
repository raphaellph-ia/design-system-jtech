<script setup lang="ts">
// Isenção DSS — Policy DssSpace/DSS_IMPLEMENTATION_GUIDE.md: Arquivos .example.vue são isentos de Token First e Gate de Composição para scaffolding de contexto.
import { ref } from 'vue'
import DssRouteTab from './DssRouteTab.vue'

const tab = ref('home')
const tabExternal = ref('docs')
</script>

<template>
  <!-- ===================================================================
    Cenário 1: Abas de rota básicas (texto)
    Uso típico: navegação principal de uma SPA com Vue Router.
    DssRouteTab como DssTab mas com prop `to` para roteamento.
    =================================================================== -->
  <section>
    <h3>1. Abas de rota básicas</h3>
    <q-tabs v-model="tab" align="left">
      <DssRouteTab name="home" label="Início" to="/home" />
      <DssRouteTab name="alerts" label="Alertas" to="/alerts" />
      <DssRouteTab name="reports" label="Relatórios" to="/reports" />
    </q-tabs>
    <p>Aba ativa: {{ tab }}</p>
  </section>

  <!-- ===================================================================
    Cenário 2: Abas com ícones e correspondência exata de rota
    A prop `exact` garante que /home não fica ativa em /home/details.
    =================================================================== -->
  <section>
    <h3>2. Com ícones e correspondência exata</h3>
    <q-tabs v-model="tab" align="left">
      <DssRouteTab name="home" icon="home" label="Início" to="/home" :exact="true" />
      <DssRouteTab name="alerts" icon="notifications" label="Alertas" to="/alerts" :exact="true" />
      <DssRouteTab name="reports" icon="bar_chart" label="Relatórios" to="/reports" />
    </q-tabs>
  </section>

  <!-- ===================================================================
    Cenário 3: Aba desabilitada
    Mantém a mesma semântica visual do DssTab--disable.
    =================================================================== -->
  <section>
    <h3>3. Estado desabilitado</h3>
    <q-tabs v-model="tab" align="left">
      <DssRouteTab name="home" label="Início" to="/home" />
      <DssRouteTab name="alerts" label="Alertas" to="/alerts" />
      <DssRouteTab name="reports" label="Relatórios" to="/reports" disable />
    </q-tabs>
    <p>A aba "Relatórios" está desabilitada e não é navegável.</p>
  </section>

  <!-- ===================================================================
    Cenário 4: Correspondência exata vs parcial de rota
    Demonstração da diferença entre exact e sem exact.
    =================================================================== -->
  <section>
    <h3>4. Exact vs parcial</h3>
    <q-tabs v-model="tab" align="left">
      <!-- Sem exact: ativa em /settings e /settings/profile -->
      <DssRouteTab name="settings" label="Configurações" to="/settings" />
      <!-- Com exact: ativa APENAS em /settings/profile -->
      <DssRouteTab name="profile" label="Perfil" to="/settings/profile" :exact="true" />
      <!-- Com replace: não adiciona entrada ao histórico -->
      <DssRouteTab name="notifications" label="Notificações" to="/settings/notifications" :replace="true" />
    </q-tabs>
  </section>

  <!-- ===================================================================
    Cenário 5: Links externos com href e target
    Fallback para recursos externos fora do Vue Router.
    =================================================================== -->
  <section>
    <h3>5. Links externos</h3>
    <q-tabs v-model="tabExternal" align="left">
      <DssRouteTab name="docs" label="Documentação" to="/docs" />
      <DssRouteTab
        name="github"
        label="GitHub"
        icon="code"
        href="https://github.com/sansys"
        target="_blank"
      />
      <DssRouteTab
        name="changelog"
        label="Changelog"
        href="https://sansys.com/changelog"
        target="_blank"
      />
    </q-tabs>
    <p>As abas GitHub e Changelog abrem links externos em nova aba.</p>
  </section>
</template>
