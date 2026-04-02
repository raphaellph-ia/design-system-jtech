<script setup lang="ts">
/**
 * ==========================================================================
 * DssTab — Exemplos
 * ==========================================================================
 *
 * Arquivo de exemplos isolado (.example.vue).
 * Isento de Token First e Gate de Composição para scaffolding de contexto
 * (política DSS_IMPLEMENTATION_GUIDE.md).
 *
 * @version 1.0.0
 */
import { ref } from 'vue'
import DssTab from './DssTab.vue'

// Cenário 1: Tabs com label
const tabLabel = ref('home')

// Cenário 2: Tabs com ícone + label
const tabIconLabel = ref('alerts')

// Cenário 3: Tabs somente ícone
const tabIcon = ref('notifications')

// Cenário 4: Estados (disable)
const tabStates = ref('active')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">

    <!-- ================================================================
         Cenário 1: Abas com label
         ================================================================ -->
    <section>
      <h3 style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em;">
        1. Abas com label
      </h3>
      <q-tabs v-model="tabLabel" dense>
        <DssTab name="home" label="Início" />
        <DssTab name="alerts" label="Alertas" />
        <DssTab name="reports" label="Relatórios" />
      </q-tabs>
      <p style="font-size: 12px; color: #999; margin: 4px 0 0;">Tab ativa: {{ tabLabel }}</p>
    </section>

    <!-- ================================================================
         Cenário 2: Abas com ícone + label
         ================================================================ -->
    <section>
      <h3 style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em;">
        2. Abas com ícone + label
      </h3>
      <q-tabs v-model="tabIconLabel" dense>
        <DssTab name="alerts" icon="notifications" label="Alertas" />
        <DssTab name="map" icon="map" label="Mapa" />
        <DssTab name="settings" icon="settings" label="Configurações" />
      </q-tabs>
    </section>

    <!-- ================================================================
         Cenário 3: Abas somente ícone
         ================================================================ -->
    <section>
      <h3 style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em;">
        3. Abas somente ícone
      </h3>
      <q-tabs v-model="tabIcon" dense>
        <DssTab name="notifications" icon="notifications" />
        <DssTab name="map" icon="map" />
        <DssTab name="analytics" icon="analytics" />
        <DssTab name="settings" icon="settings" />
      </q-tabs>
    </section>

    <!-- ================================================================
         Cenário 4: Estados (disable + alert)
         ================================================================ -->
    <section>
      <h3 style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em;">
        4. Estados: disable e alert
      </h3>
      <q-tabs v-model="tabStates" dense>
        <DssTab name="active" label="Ativa" />
        <DssTab name="alert" label="Com alerta" :alert="true" />
        <DssTab name="disabled" label="Desabilitada" disable />
      </q-tabs>
    </section>

    <!-- ================================================================
         Cenário 5: Brand Hub
         ================================================================ -->
    <section data-brand="hub">
      <h3 style="margin: 0 0 8px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.08em;">
        5. Brand Hub (laranja)
      </h3>
      <q-tabs v-model="tabLabel" dense>
        <DssTab name="home" label="Início" />
        <DssTab name="alerts" label="Alertas" />
        <DssTab name="reports" label="Relatórios" />
      </q-tabs>
    </section>

  </div>
</template>
