<template>
  <div class="dss-examples q-pa-lg q-gutter-y-xl">

    <!-- ===================================================================
         EXEMPLO 1: Básico (elevated — padrão)
         Caso de uso mais comum: exportar dados com múltiplas opções
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">1. Básico (Elevated — Padrão)</h3>
      <div class="q-gutter-md row items-center">
        <DssBtnDropdown
          label="Exportar"
          icon="download"
          color="primary"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>PDF</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Excel (.xlsx)</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>CSV</q-item-section>
            </q-item>
          </q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Com Label Acessível"
          color="secondary"
          aria-label="Opções de configuração"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Configurações gerais</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Perfil</q-item-section>
            </q-item>
          </q-list>
        </DssBtnDropdown>
      </div>
    </section>

    <!-- ===================================================================
         EXEMPLO 2: Variantes Visuais
         flat, outline, unelevated
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">2. Variantes Visuais</h3>
      <div class="q-gutter-md row items-center">
        <DssBtnDropdown
          label="Elevated"
          variant="elevated"
          color="primary"
        >
          <q-list><q-item clickable v-close-popup><q-item-section>Opção A</q-item-section></q-item></q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Flat"
          variant="flat"
          color="primary"
        >
          <q-list><q-item clickable v-close-popup><q-item-section>Opção A</q-item-section></q-item></q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Outline"
          variant="outline"
          color="primary"
        >
          <q-list><q-item clickable v-close-popup><q-item-section>Opção A</q-item-section></q-item></q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Unelevated"
          variant="unelevated"
          color="primary"
        >
          <q-list><q-item clickable v-close-popup><q-item-section>Opção A</q-item-section></q-item></q-list>
        </DssBtnDropdown>
      </div>
    </section>

    <!-- ===================================================================
         EXEMPLO 3: Modo Split
         Separação entre ação direta e dropdown de opções
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">3. Modo Split</h3>
      <div class="q-gutter-md row items-center">
        <DssBtnDropdown
          label="Salvar"
          variant="unelevated"
          color="primary"
          :split="true"
          @click="handleSave"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Salvar como rascunho</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Salvar e publicar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Salvar como modelo</q-item-section>
            </q-item>
          </q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Enviar"
          variant="outline"
          color="primary"
          :split="true"
          @click="handleSend"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Enviar para aprovação</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Enviar por email</q-item-section>
            </q-item>
          </q-list>
        </DssBtnDropdown>
      </div>
    </section>

    <!-- ===================================================================
         EXEMPLO 4: Ícone Personalizado e Slot Label
         Customização do trigger
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">4. Ícone Personalizado e Slot Label</h3>
      <div class="q-gutter-md row items-center">
        <!-- Com ícone via prop -->
        <DssBtnDropdown
          label="Filtros"
          icon="filter_list"
          icon-right="tune"
          variant="flat"
          color="primary"
        >
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Por data</q-item-section></q-item>
            <q-item clickable v-close-popup><q-item-section>Por status</q-item-section></q-item>
            <q-item clickable v-close-popup><q-item-section>Por tipo</q-item-section></q-item>
          </q-list>
        </DssBtnDropdown>

        <!-- Ícone de seta personalizado -->
        <DssBtnDropdown
          label="Mais ações"
          dropdown-icon="expand_more"
          variant="outline"
          color="secondary"
        >
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Duplicar</q-item-section></q-item>
            <q-item clickable v-close-popup><q-item-section>Arquivar</q-item-section></q-item>
            <q-item clickable v-close-popup class="text-negative">
              <q-item-section>Excluir</q-item-section>
            </q-item>
          </q-list>
        </DssBtnDropdown>

        <!-- Conteúdo customizado via slot label -->
        <DssBtnDropdown
          variant="flat"
          color="primary"
        >
          <template #label>
            <div class="row items-center q-gutter-xs">
              <q-icon name="account_circle" />
              <span>Perfil</span>
              <q-badge color="positive" label="3" />
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Meu perfil</q-item-section></q-item>
            <q-item clickable v-close-popup><q-item-section>Notificações</q-item-section></q-item>
            <q-item clickable v-close-popup><q-item-section>Sair</q-item-section></q-item>
          </q-list>
        </DssBtnDropdown>
      </div>
    </section>

    <!-- ===================================================================
         EXEMPLO 5: Brandabilidade (Hub, Water, Waste)
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">5. Brandabilidade</h3>
      <div class="q-gutter-md row items-center">
        <DssBtnDropdown
          label="Hub — Exportar"
          variant="unelevated"
          color="primary"
          brand="hub"
        >
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Relatório Hub</q-item-section></q-item>
          </q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Water — Monitorar"
          variant="unelevated"
          color="info"
          brand="water"
        >
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Dashboard Water</q-item-section></q-item>
          </q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Waste — Relatório"
          variant="unelevated"
          color="positive"
          brand="waste"
        >
          <q-list>
            <q-item clickable v-close-popup><q-item-section>Resíduos</q-item-section></q-item>
          </q-list>
        </DssBtnDropdown>
      </div>
    </section>

    <!-- ===================================================================
         EXEMPLO 6: Estados (disabled e loading)
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-md">6. Estados</h3>
      <div class="q-gutter-md row items-center">
        <DssBtnDropdown
          label="Disabled"
          color="primary"
          :disable="true"
        >
          <q-list><q-item v-close-popup><q-item-section>Opção</q-item-section></q-item></q-list>
        </DssBtnDropdown>

        <DssBtnDropdown
          label="Loading"
          color="primary"
          :loading="true"
        >
          <q-list><q-item v-close-popup><q-item-section>Opção</q-item-section></q-item></q-list>
        </DssBtnDropdown>

        <!-- Split desabilitado -->
        <DssBtnDropdown
          label="Split Disabled"
          variant="outline"
          color="secondary"
          :split="true"
          :disable="true"
        >
          <q-list><q-item v-close-popup><q-item-section>Opção</q-item-section></q-item></q-list>
        </DssBtnDropdown>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssBtnDropdown from './DssBtnDropdown.vue'

function handleSave() {
  console.log('[DssBtnDropdown Example] Salvar — ação primária do split')
}

function handleSend() {
  console.log('[DssBtnDropdown Example] Enviar — ação primária do split')
}
</script>
