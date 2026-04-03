<template>
  <div class="dss-tabs-examples">
    <!-- ================================================================
         Exemplo 1 — Básico: abas simples com v-model
         ================================================================ -->
    <section>
      <h3>1. Básico — Seleção com v-model</h3>
      <p>Grupo de abas básico com estado controlado por v-model.</p>

      <DssTabs v-model="tabBasico" aria-label="Seções principais">
        <DssTab name="visao-geral" label="Visão Geral" />
        <DssTab name="detalhes" label="Detalhes" />
        <DssTab name="historico" label="Histórico" />
        <DssTab name="configuracoes" label="Configurações" />
      </DssTabs>

      <p>Aba ativa: <strong>{{ tabBasico }}</strong></p>
    </section>

    <!-- ================================================================
         Exemplo 2 — Alinhamento
         ================================================================ -->
    <section>
      <h3>2. Alinhamento — align="justify"</h3>
      <p>Abas distribuídas ocupando toda a largura disponível.</p>

      <DssTabs
        v-model="tabAlinhamento"
        align="justify"
        aria-label="Navegação do painel"
      >
        <DssTab name="resumo" label="Resumo" />
        <DssTab name="relatorios" label="Relatórios" />
        <DssTab name="alertas" label="Alertas" />
      </DssTabs>
    </section>

    <!-- ================================================================
         Exemplo 3 — Muitas abas (Scrollable com setas)
         ================================================================ -->
    <section>
      <h3>3. Rolagem — Setas de navegação visíveis</h3>
      <p>
        Com muitas abas em um container de largura limitada, o DssTabs
        exibe automaticamente as setas de navegação governadas pelo DSS.
      </p>

      <div style="max-width: var(--dss-spacing-96)">
        <DssTabs
          v-model="tabScroll"
          align="left"
          aria-label="Módulos do sistema"
        >
          <DssTab name="dashboard" label="Dashboard" />
          <DssTab name="monitoramento" label="Monitoramento" />
          <DssTab name="producao" label="Produção" />
          <DssTab name="manutencao" label="Manutenção" />
          <DssTab name="qualidade" label="Qualidade" />
          <DssTab name="seguranca" label="Segurança" />
          <DssTab name="financeiro" label="Financeiro" />
          <DssTab name="relatorios" label="Relatórios" />
        </DssTabs>
      </div>
    </section>

    <!-- ================================================================
         Exemplo 4 — Vertical
         ================================================================ -->
    <section>
      <h3>4. Vertical — Layout em coluna</h3>
      <p>Abas em orientação vertical com indicador lateral.</p>

      <div style="display: flex; gap: var(--dss-spacing-4)">
        <DssTabs
          v-model="tabVertical"
          vertical
          aria-label="Configurações do perfil"
        >
          <DssTab name="pessoal" label="Pessoal" />
          <DssTab name="seguranca" label="Segurança" />
          <DssTab name="notificacoes" label="Notificações" />
          <DssTab name="privacidade" label="Privacidade" />
        </DssTabs>

        <!-- Área de conteúdo simulada -->
        <div
          style="
            flex: 1;
            padding: var(--dss-spacing-4);
            border: var(--dss-border-width-thin) solid var(--dss-gray-200);
            border-radius: var(--dss-radius-md);
          "
        >
          <p>Conteúdo da aba: <strong>{{ tabVertical }}</strong></p>
        </div>
      </div>
    </section>

    <!-- ================================================================
         Exemplo 5 — Brands
         ================================================================ -->
    <section>
      <h3>5. Brands — Acento visual por produto</h3>
      <p>
        DssTabs com brand aplicado. O acento de cor nas setas de navegação
        e nas abas ativas reflete o produto Sansys ativo.
      </p>

      <!-- Hub (laranja) -->
      <div data-brand="hub" style="margin-bottom: var(--dss-spacing-4)">
        <p><em>Hub (laranja)</em></p>
        <DssTabs v-model="tabHub" brand="hub" aria-label="Painel Hub">
          <DssTab name="dados" label="Dados" />
          <DssTab name="sensores" label="Sensores" />
          <DssTab name="alertas" label="Alertas" />
        </DssTabs>
      </div>

      <!-- Water (azul) -->
      <div data-brand="water" style="margin-bottom: var(--dss-spacing-4)">
        <p><em>Water (azul)</em></p>
        <DssTabs v-model="tabWater" brand="water" aria-label="Painel Water">
          <DssTab name="consumo" label="Consumo" />
          <DssTab name="qualidade" label="Qualidade" />
          <DssTab name="rede" label="Rede" />
        </DssTabs>
      </div>

      <!-- Waste (verde) -->
      <div data-brand="waste">
        <p><em>Waste (verde)</em></p>
        <DssTabs v-model="tabWaste" brand="waste" aria-label="Painel Waste">
          <DssTab name="coleta" label="Coleta" />
          <DssTab name="triagem" label="Triagem" />
          <DssTab name="destinacao" label="Destinação" />
        </DssTabs>
      </div>
    </section>

    <!-- ================================================================
         Exemplo 6 — Com ícones e estado disabled
         ================================================================ -->
    <section>
      <h3>6. Com ícones e aba desabilitada</h3>
      <p>Abas com ícone + label e uma aba desabilitada.</p>

      <DssTabs
        v-model="tabIcones"
        aria-label="Navegação com ícones"
      >
        <DssTab name="inicio" label="Início" icon="home" />
        <DssTab name="perfil" label="Perfil" icon="person" />
        <DssTab name="notificacoes" label="Notificações" icon="notifications" />
        <DssTab name="configuracoes" label="Configurações" icon="settings" disable />
      </DssTabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssTabs from './DssTabs.vue'
import DssTab from '../DssTab/DssTab.vue'

// Estados das abas por exemplo
const tabBasico = ref('visao-geral')
const tabAlinhamento = ref('resumo')
const tabScroll = ref('dashboard')
const tabVertical = ref('pessoal')
const tabHub = ref('dados')
const tabWater = ref('consumo')
const tabWaste = ref('coleta')
const tabIcones = ref('inicio')
</script>
