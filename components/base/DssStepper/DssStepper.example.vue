<template>
  <div class="dss-stepper-examples q-pa-lg">
    <h6 class="q-mt-none q-mb-md">DssStepper — Exemplos</h6>

    <!-- ================================================================
      Exemplo 1: Básico Horizontal com Navegação Linear
      Fluxo em 3 passos com botões "Anterior"/"Próximo" no painel.
    ================================================================ -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">1. Básico Horizontal — Navegação Linear</p>
      <DssStepper v-model="step1" animated flat>
        <DssStep name="info" title="Informações" caption="Dados pessoais" :done="step1 === 'address' || step1 === 'confirm'">
          <div class="q-pa-md">
            <p>Preencha suas informações pessoais para continuar.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Próximo" @click="step1 = 'address'" />
          </q-stepper-navigation>
        </DssStep>

        <DssStep name="address" title="Endereço" caption="Localização" :done="step1 === 'confirm'">
          <div class="q-pa-md">
            <p>Informe seu endereço completo.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Próximo" @click="step1 = 'confirm'" />
            <q-btn flat label="Anterior" class="q-ml-sm" @click="step1 = 'info'" />
          </q-stepper-navigation>
        </DssStep>

        <DssStep name="confirm" title="Confirmação">
          <div class="q-pa-md">
            <p>Revise e confirme suas informações antes de finalizar.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Finalizar" @click="step1 = 'info'" />
            <q-btn flat label="Anterior" class="q-ml-sm" @click="step1 = 'address'" />
          </q-stepper-navigation>
        </DssStep>
      </DssStepper>
    </section>

    <!-- ================================================================
      Exemplo 2: Navegação Livre (header-nav)
      Usuário pode clicar diretamente nos cabeçalhos dos passos.
    ================================================================ -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">2. Navegação Livre (header-nav)</p>
      <DssStepper v-model="step2" header-nav animated bordered>
        <DssStep
          name="design"
          title="Design"
          caption="Etapa 1"
          icon="design_services"
          header-nav
        >
          <div class="q-pa-md">
            <p>Defina o design do seu projeto.</p>
          </div>
        </DssStep>

        <DssStep
          name="development"
          title="Desenvolvimento"
          caption="Etapa 2"
          icon="code"
          header-nav
        >
          <div class="q-pa-md">
            <p>Implemente as funcionalidades planejadas.</p>
          </div>
        </DssStep>

        <DssStep
          name="launch"
          title="Lançamento"
          caption="Etapa 3"
          icon="rocket_launch"
          header-nav
        >
          <div class="q-pa-md">
            <p>Publique e monitore seu projeto.</p>
          </div>
        </DssStep>
      </DssStepper>
    </section>

    <!-- ================================================================
      Exemplo 3: Layout Vertical
      Passos empilhados verticalmente com linha conectora lateral.
    ================================================================ -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">3. Layout Vertical</p>
      <DssStepper v-model="step3" vertical animated flat>
        <DssStep name="account" title="Criar conta" caption="Passo 1" :done="step3 === 'profile' || step3 === 'preferences'">
          <div class="q-pa-md">
            <p>Configure suas credenciais de acesso.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Continuar" @click="step3 = 'profile'" />
          </q-stepper-navigation>
        </DssStep>

        <DssStep name="profile" title="Perfil" caption="Passo 2" :done="step3 === 'preferences'">
          <div class="q-pa-md">
            <p>Adicione foto e descrição ao seu perfil.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Continuar" @click="step3 = 'preferences'" />
            <q-btn flat label="Voltar" class="q-ml-sm" @click="step3 = 'account'" />
          </q-stepper-navigation>
        </DssStep>

        <DssStep name="preferences" title="Preferências" caption="Passo 3">
          <div class="q-pa-md">
            <p>Personalize sua experiência.</p>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Concluir" @click="step3 = 'account'" />
            <q-btn flat label="Voltar" class="q-ml-sm" @click="step3 = 'profile'" />
          </q-stepper-navigation>
        </DssStep>
      </DssStepper>
    </section>

    <!-- ================================================================
      Exemplo 4: Estados dos Passos (done, error, disable)
      Demonstra os diferentes estados visuais dos DssStep filhos.
    ================================================================ -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">4. Estados dos Passos</p>
      <DssStepper v-model="step4" header-nav flat>
        <DssStep
          name="completed"
          title="Concluído"
          caption="done=true"
          done
          header-nav
        >
          <div class="q-pa-md">
            <p>Este passo foi marcado como concluído.</p>
          </div>
        </DssStep>

        <DssStep
          name="active"
          title="Ativo"
          caption="passo atual"
          header-nav
        >
          <div class="q-pa-md">
            <p>Este é o passo atualmente selecionado.</p>
          </div>
        </DssStep>

        <DssStep
          name="error"
          title="Erro"
          caption="error=true"
          error
          header-nav
        >
          <div class="q-pa-md">
            <p>Este passo foi marcado com erro — requer atenção.</p>
          </div>
        </DssStep>

        <DssStep
          name="disabled"
          title="Desabilitado"
          caption="disable=true"
          disable
          header-nav
        >
          <div class="q-pa-md">
            <p>Este passo está desabilitado e não é interativo.</p>
          </div>
        </DssStep>
      </DssStepper>
    </section>

    <!-- ================================================================
      Exemplo 5: Flat dentro de DssCard
      DssStepper integrado como conteúdo de uma superfície elevada.

      Nota (EXC-05): DssCard é importado via slot — o uso aqui demonstra
      a prop flat para integração visual com containers externos.
      DssCard está disponível no DSS Fase 1.
    ================================================================ -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">5. Flat/Bordered — Integração com superfície</p>
      <q-card class="q-pa-none">
        <q-card-section>
          <p class="text-body2 q-ma-none">DssStepper com flat=true dentro de um card</p>
        </q-card-section>
        <DssStepper v-model="step5" flat>
          <DssStep name="s1" title="Diagnóstico" :done="step5 === 's2'">
            <div class="q-pa-md">
              <p>Análise inicial do sistema.</p>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" label="Próximo" @click="step5 = 's2'" />
            </q-stepper-navigation>
          </DssStep>
          <DssStep name="s2" title="Solução">
            <div class="q-pa-md">
              <p>Aplicação das correções identificadas.</p>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" label="Concluir" @click="step5 = 's1'" />
              <q-btn flat label="Voltar" class="q-ml-sm" @click="step5 = 's1'" />
            </q-stepper-navigation>
          </DssStep>
        </DssStepper>
      </q-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssStepper from './DssStepper.vue'
import DssStep from '../DssStep/DssStep.vue'

const step1 = ref<string | number>('info')
const step2 = ref<string | number>('design')
const step3 = ref<string | number>('account')
const step4 = ref<string | number>('active')
const step5 = ref<string | number>('s1')
</script>
