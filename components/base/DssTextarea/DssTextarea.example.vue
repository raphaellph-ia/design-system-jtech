<template>
  <div style="max-width: 600px; display: flex; flex-direction: column; gap: 32px; padding: 24px;">

    <!-- ================================================================== -->
    <!-- CENÁRIO 1: Uso básico — outlined (padrão) -->
    <!-- ================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #555;">
        1. Uso Básico (outlined, padrão)
      </h3>
      <DssTextarea
        v-model="basicValue"
        label="Descrição"
        hint="Descreva em poucas palavras"
        placeholder="Digite aqui..."
      />
    </section>

    <!-- ================================================================== -->
    <!-- CENÁRIO 2: autogrow com maxHeight -->
    <!-- ================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #555;">
        2. Autogrow com MaxHeight (cresce até 200px)
      </h3>
      <DssTextarea
        v-model="autogrowValue"
        label="Comentário"
        hint="O campo cresce com o conteúdo, mas para em 200px"
        autogrow
        max-height="200px"
        variant="filled"
      />
    </section>

    <!-- ================================================================== -->
    <!-- CENÁRIO 3: Estado de erro -->
    <!-- ================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #555;">
        3. Estado de Erro
      </h3>
      <DssTextarea
        v-model="errorValue"
        label="Mensagem"
        error
        error-message="Campo obrigatório — mínimo de 20 caracteres"
        variant="outlined"
      />
    </section>

    <!-- ================================================================== -->
    <!-- CENÁRIO 4: Estados disabled e readonly -->
    <!-- ================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #555;">
        4. Disabled e Readonly
      </h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DssTextarea
          model-value="Conteúdo bloqueado — usuário não pode editar nem focar"
          label="Campo desabilitado"
          disabled
          variant="outlined"
        />
        <DssTextarea
          model-value="Texto visível mas não editável — pode ser selecionado e copiado"
          label="Campo somente leitura"
          readonly
          variant="outlined"
        />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- CENÁRIO 5: Brands (Hub, Water, Waste) -->
    <!-- ================================================================== -->
    <section>
      <h3 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #555;">
        5. Brandability (Hub / Water / Waste)
      </h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DssTextarea
          v-model="hubValue"
          label="Textarea Hub"
          hint="Cor de foco: Hub orange"
          brand="hub"
          variant="outlined"
        />
        <DssTextarea
          v-model="waterValue"
          label="Textarea Water"
          hint="Cor de foco: Water blue"
          brand="water"
          variant="outlined"
        />
        <DssTextarea
          v-model="wasteValue"
          label="Textarea Waste"
          hint="Cor de foco: Waste green"
          brand="waste"
          variant="outlined"
        />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssTextarea from './DssTextarea.vue'

const basicValue = ref('')
const autogrowValue = ref('')
const errorValue = ref('Texto insuficiente')
const hubValue = ref('')
const waterValue = ref('')
const wasteValue = ref('')
</script>
