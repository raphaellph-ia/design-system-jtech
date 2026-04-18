<template>
  <div class="q-pa-md q-gutter-md">
    <div class="text-h6 q-mb-md">DssMenu — Exemplos</div>

    <!-- ====================================================================
         Exemplo 1: Básico
         Menu simples com lista de ações
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">1. Básico</div>
      <DssButton label="Ações" icon-right="arrow_drop_down">
        <DssMenu v-model="menu1">
          <DssList>
            <DssItem label="Editar" clickable v-close-popup @click="handleAction('Editar')" />
            <DssItem label="Duplicar" clickable v-close-popup @click="handleAction('Duplicar')" />
            <DssItem label="Excluir" clickable v-close-popup @click="handleAction('Excluir')" />
          </DssList>
        </DssMenu>
      </DssButton>
      <div v-if="lastAction" class="q-mt-sm text-caption">Ação: {{ lastAction }}</div>
    </div>

    <!-- ====================================================================
         Exemplo 2: Com Ícones
         Menu com ícones nos itens de navegação
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">2. Com Ícones</div>
      <DssButton flat icon="more_vert" round aria-label="Mais opções">
        <DssMenu v-model="menu2">
          <DssList>
            <DssItem
              clickable
              v-close-popup
              @click="handleAction('Editar')"
            >
              <DssItemSection avatar>
                <DssIcon name="edit" />
              </DssItemSection>
              <DssItemSection>Editar</DssItemSection>
            </DssItem>
            <DssItem
              clickable
              v-close-popup
              @click="handleAction('Compartilhar')"
            >
              <DssItemSection avatar>
                <DssIcon name="share" />
              </DssItemSection>
              <DssItemSection>Compartilhar</DssItemSection>
            </DssItem>
            <DssItem
              clickable
              v-close-popup
              @click="handleAction('Excluir')"
            >
              <DssItemSection avatar>
                <DssIcon name="delete" />
              </DssItemSection>
              <DssItemSection>Excluir</DssItemSection>
            </DssItem>
          </DssList>
        </DssMenu>
      </DssButton>
    </div>

    <!-- ====================================================================
         Exemplo 3: Com Separadores
         Menu com grupos separados por DssSeparator
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">3. Com Separadores</div>
      <DssButton label="Arquivo">
        <DssMenu v-model="menu3">
          <DssList>
            <DssItem label="Novo" clickable v-close-popup @click="handleAction('Novo')" />
            <DssItem label="Abrir" clickable v-close-popup @click="handleAction('Abrir')" />
            <DssSeparator />
            <DssItem label="Salvar" clickable v-close-popup @click="handleAction('Salvar')" />
            <DssItem label="Salvar como..." clickable v-close-popup @click="handleAction('Salvar como')" />
            <DssSeparator />
            <DssItem label="Exportar" clickable v-close-popup @click="handleAction('Exportar')" />
          </DssList>
        </DssMenu>
      </DssButton>
    </div>

    <!-- ====================================================================
         Exemplo 4: Posicionamento Customizado
         Menu com anchor e self customizados
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">4. Posicionamento Customizado</div>
      <DssButton
        label="Menu acima"
        icon-right="arrow_drop_up"
      >
        <DssMenu
          v-model="menu4"
          anchor="top right"
          self="bottom right"
          :offset="[0, 8]"
        >
          <DssList>
            <DssItem label="Opção A" clickable v-close-popup @click="handleAction('Opção A')" />
            <DssItem label="Opção B" clickable v-close-popup @click="handleAction('Opção B')" />
            <DssItem label="Opção C" clickable v-close-popup @click="handleAction('Opção C')" />
          </DssList>
        </DssMenu>
      </DssButton>
    </div>

    <!-- ====================================================================
         Exemplo 5: Fit
         Menu com mesma largura do elemento trigger (prop fit)
         Útil para selects customizados e dropdowns de formulário
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">5. Fit (mesma largura do trigger)</div>
      <DssButton
        label="Selecionar status"
        icon-right="arrow_drop_down"
        style="width: 220px"
      >
        <DssMenu v-model="menu5" fit>
          <DssList>
            <DssItem label="Ativo" clickable v-close-popup @click="handleAction('Ativo')" />
            <DssItem label="Inativo" clickable v-close-popup @click="handleAction('Inativo')" />
            <DssItem label="Suspenso" clickable v-close-popup @click="handleAction('Suspenso')" />
            <DssItem label="Aguardando aprovação" clickable v-close-popup @click="handleAction('Aguardando')" />
          </DssList>
        </DssMenu>
      </DssButton>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DssMenu.example.vue
 *
 * Exemplos funcionais do componente DssMenu.
 *
 * EXC (exemplo): uso de DssItemSection e DssIcon como filhos de DssItem.
 * O componente DssMenu em si não instancia filhos automaticamente —
 * toda composição é responsabilidade do consumidor.
 *
 * NOTA: Este arquivo usa v-close-popup (diretiva nativa do Quasar) como
 * mecanismo padrão de fechamento. Compatível com DssMenu pois é diretiva
 * aplicada nos filhos, não no container DssMenu.
 */

import { ref } from 'vue'
import { DssMenu } from './index.js'
import { DssList } from '../DssList/index.js'
import { DssItem } from '../DssItem/index.js'
import { DssItemSection } from '../DssItemSection/index.js'
import { DssIcon } from '../DssIcon/index.js'
import { DssSeparator } from '../DssSeparator/index.js'
import { DssButton } from '../DssButton/index.js'

// Controle de visibilidade de cada menu
const menu1 = ref(false)
const menu2 = ref(false)
const menu3 = ref(false)
const menu4 = ref(false)
const menu5 = ref(false)

const lastAction = ref('')

function handleAction(action: string) {
  lastAction.value = action
}
</script>
