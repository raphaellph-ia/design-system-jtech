<template>
  <div class="dss-example-showcase">

    <!-- =======================================================================
         Exemplo 1: Básico
         Drawer esquerdo simples com DssList de navegação.
         ======================================================================= -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">1. Básico</h2>
      <p class="dss-example-description">
        Drawer esquerdo padrão contendo DssList de navegação. Clique no ícone de menu para abrir/fechar.
      </p>
      <div class="dss-example-layout-wrapper">
        <!-- EXC-01: q-layout temporário até DssLayout (Nível 4) existir -->
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-96)">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round aria-label="Abrir menu" icon="menu" @click="open1 = !open1" />
              <span class="text-subtitle1">Sansys Hub</span>
              <DssSpace />
              <DssButton flat round aria-label="Buscar" icon="search" />
            </DssToolbar>
          </DssHeader>
          <DssDrawer v-model="open1" aria-label="Menu de navegação principal">
            <DssList>
              <DssItem clickable :active="activeItem1 === 'dashboard'" @click="activeItem1 = 'dashboard'">
                <template #leading><DssIcon name="home" /></template>
                Dashboard
              </DssItem>
              <DssItem clickable :active="activeItem1 === 'reports'" @click="activeItem1 = 'reports'">
                <template #leading><DssIcon name="bar_chart" /></template>
                Relatórios
              </DssItem>
              <DssSeparator />
              <DssItem clickable :active="activeItem1 === 'settings'" @click="activeItem1 = 'settings'">
                <template #leading><DssIcon name="settings" /></template>
                Configurações
              </DssItem>
            </DssList>
          </DssDrawer>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Conteúdo da página — o drawer empurra o conteúdo
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- =======================================================================
         Exemplo 2: Elevated
         Drawer com sombra de elevação (--dss-elevation-2).
         ======================================================================= -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">2. Elevated</h2>
      <p class="dss-example-description">
        Drawer com sombra de elevação para destacar o painel do conteúdo adjacente.
      </p>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-96)">
          <DssHeader elevated>
            <DssToolbar>
              <DssButton flat round aria-label="Abrir menu" icon="menu" @click="open2 = !open2" />
              <span class="text-subtitle1">Painel Administrativo</span>
            </DssToolbar>
          </DssHeader>
          <DssDrawer v-model="open2" elevated aria-label="Menu administrativo">
            <DssList>
              <DssItem clickable active>
                <template #leading><DssIcon name="dashboard" /></template>
                Visão Geral
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="people" /></template>
                Usuários
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="inventory_2" /></template>
                Produtos
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="receipt_long" /></template>
                Pedidos
              </DssItem>
            </DssList>
          </DssDrawer>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Drawer com box-shadow: var(--dss-elevation-2)
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- =======================================================================
         Exemplo 3: Bordered
         Drawer com borda lateral sutil (--dss-border-width-thin / --dss-gray-200).
         ======================================================================= -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">3. Bordered</h2>
      <p class="dss-example-description">
        Drawer com borda sutil como alternativa flat ao elevated.
        Ideal para layouts com fundo claro onde sombra seria excessiva.
      </p>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-96)">
          <DssHeader bordered>
            <DssToolbar>
              <DssButton flat round aria-label="Abrir menu" icon="menu" @click="open3 = !open3" />
              <span class="text-subtitle1">Relatórios</span>
              <DssSpace />
              <DssButton flat round aria-label="Exportar" icon="download" />
            </DssToolbar>
          </DssHeader>
          <DssDrawer v-model="open3" bordered aria-label="Menu de relatórios">
            <DssList>
              <DssItem clickable active>
                <template #leading><DssIcon name="table_chart" /></template>
                Resumo
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="trending_up" /></template>
                Desempenho
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="pie_chart" /></template>
                Distribuição
              </DssItem>
            </DssList>
          </DssDrawer>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Drawer com border-right: var(--dss-border-width-thin) solid var(--dss-gray-200)
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- =======================================================================
         Exemplo 4: Mini Mode
         Drawer minimizado exibindo apenas ícones.
         ======================================================================= -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">4. Mini Mode</h2>
      <p class="dss-example-description">
        Drawer em modo minimizado. Exibe apenas ícones para maximizar área de conteúdo.
        Clique no ícone de expansão para alternar entre mini e expandido.
      </p>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpR fFf" style="min-height: var(--dss-spacing-96)">
          <DssHeader>
            <DssToolbar>
              <DssButton flat round :aria-label="miniMode ? 'Expandir menu' : 'Minimizar menu'" :icon="miniMode ? 'menu_open' : 'menu'" @click="miniMode = !miniMode" />
              <span class="text-subtitle1">Sansys Water</span>
            </DssToolbar>
          </DssHeader>
          <DssDrawer v-model="open4" :mini="miniMode" elevated aria-label="Menu principal">
            <DssList>
              <DssItem clickable active>
                <template #leading><DssIcon name="home" /></template>
                <template #default>Início</template>
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="water_drop" /></template>
                <template #default>Medições</template>
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="notifications" /></template>
                <template #default>Alertas</template>
              </DssItem>
              <DssItem clickable>
                <template #leading><DssIcon name="map" /></template>
                <template #default>Mapa</template>
              </DssItem>
            </DssList>
          </DssDrawer>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Mini mode: {{ miniMode ? 'ativo (57px)' : 'inativo (256px)' }}
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

    <!-- =======================================================================
         Exemplo 5: Right Side
         Drawer ancorado à direita (side="right").
         ======================================================================= -->
    <section class="dss-example-section">
      <h2 class="dss-example-title">5. Right Side</h2>
      <p class="dss-example-description">
        Drawer posicionado à direita. Útil para painéis de detalhe ou filtros contextuais.
        Neste caso, role="complementary" é mais semântico que "navigation".
      </p>
      <div class="dss-example-layout-wrapper">
        <q-layout view="hHh lpr fFf" style="min-height: var(--dss-spacing-96)">
          <DssHeader>
            <DssToolbar>
              <span class="text-subtitle1">Detalhes do Pedido</span>
              <DssSpace />
              <DssButton flat round aria-label="Abrir painel de detalhes" icon="info_outline" @click="open5 = !open5" />
            </DssToolbar>
          </DssHeader>
          <DssDrawer
            v-model="open5"
            side="right"
            bordered
            role="complementary"
            aria-label="Painel de informações do pedido"
          >
            <DssList>
              <DssItem>
                <template #leading><DssIcon name="receipt" /></template>
                Pedido #12345
              </DssItem>
              <DssSeparator />
              <DssItem>
                <template #leading><DssIcon name="local_shipping" /></template>
                Em trânsito
              </DssItem>
              <DssItem>
                <template #leading><DssIcon name="calendar_today" /></template>
                Prev: 25/04/2026
              </DssItem>
            </DssList>
          </DssDrawer>
          <q-page-container>
            <div class="dss-example-page-content text-caption text-center q-pa-md">
              Drawer ancorado à direita com role="complementary"
            </div>
          </q-page-container>
        </q-layout>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssDrawer from './DssDrawer.vue'
import DssHeader from '../DssHeader/DssHeader.vue'
import DssToolbar from '../DssToolbar/DssToolbar.vue'
import DssButton from '../DssButton/DssButton.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
import DssList from '../DssList/DssList.vue'
import DssItem from '../DssItem/DssItem.vue'
import DssSeparator from '../DssSeparator/DssSeparator.vue'
import DssSpace from '../DssSpace/DssSpace.vue'

const open1 = ref(true)
const open2 = ref(true)
const open3 = ref(true)
const open4 = ref(true)
const open5 = ref(false)

const activeItem1 = ref('dashboard')
const miniMode = ref(false)
</script>

<style scoped>
.dss-example-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-10);
  padding: var(--dss-spacing-6);
}

.dss-example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.dss-example-title {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-body);
  margin: 0;
}

.dss-example-description {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin: 0;
}

.dss-example-layout-wrapper {
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.dss-example-page-content {
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  min-height: var(--dss-spacing-14);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
