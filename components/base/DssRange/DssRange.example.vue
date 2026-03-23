<template>
  <div class="dss-range-examples q-pa-md" style="max-width: 600px">
    <h2 class="text-h6 q-mb-lg">DssRange — Exemplos</h2>

    <!-- Cenário 1: Padrão básico -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">1. Padrão básico</p>
      <DssRange
        v-model="basicValue"
        :min="0"
        :max="100"
        :step="1"
        aria-label="Intervalo básico de 0 a 100"
      />
      <p class="text-caption text-secondary q-mt-sm">
        Valor: {{ basicValue.min }} — {{ basicValue.max }}
      </p>
    </section>

    <!-- Cenário 2: Label + Markers + DragRange -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">2. Label, Markers e Drag Range</p>
      <DssRange
        v-model="advancedValue"
        :min="0"
        :max="10"
        :step="1"
        :label="true"
        :markers="true"
        :drag-range="true"
        aria-label="Intervalo de avaliação de 0 a 10"
        hint="Arraste o intervalo inteiro ou ajuste os thumbs individualmente"
      />
      <p class="text-caption text-secondary q-mt-sm">
        Nota: {{ advancedValue.min }} — {{ advancedValue.max }}
      </p>
    </section>

    <!-- Cenário 3: Estados (Hint, Error, Disabled, Readonly) -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">3. Estados</p>

      <p class="text-caption q-mb-xs">Com hint</p>
      <DssRange
        v-model="stateValue"
        :min="0"
        :max="100"
        aria-label="Intervalo com hint"
        hint="Selecione o intervalo de preço entre R$ 0 e R$ 100"
        class="q-mb-md"
      />

      <p class="text-caption q-mb-xs">Com erro</p>
      <DssRange
        v-model="stateValue"
        :min="0"
        :max="100"
        :error="true"
        aria-label="Intervalo com erro"
        error-message="O intervalo selecionado não está disponível neste contexto"
        class="q-mb-md"
      />

      <p class="text-caption q-mb-xs">Disabled</p>
      <DssRange
        v-model="stateValue"
        :min="0"
        :max="100"
        :disabled="true"
        aria-label="Intervalo desabilitado"
        class="q-mb-md"
      />

      <p class="text-caption q-mb-xs">Readonly</p>
      <DssRange
        v-model="stateValue"
        :min="0"
        :max="100"
        :readonly="true"
        aria-label="Intervalo somente leitura"
        hint="Somente leitura — os valores não podem ser alterados"
      />
    </section>

    <!-- Cenário 4: Brandabilidade -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">4. Brandabilidade</p>

      <p class="text-caption q-mb-xs">Hub</p>
      <DssRange
        v-model="brandValue"
        brand="hub"
        :label="true"
        aria-label="Intervalo Hub"
        class="q-mb-md"
      />

      <p class="text-caption q-mb-xs">Water</p>
      <DssRange
        v-model="brandValue"
        brand="water"
        :label="true"
        aria-label="Intervalo Water"
        class="q-mb-md"
      />

      <p class="text-caption q-mb-xs">Waste</p>
      <DssRange
        v-model="brandValue"
        brand="waste"
        :label="true"
        aria-label="Intervalo Waste"
      />
    </section>

    <!-- Cenário 5: Dense + Step customizado -->
    <section class="q-mb-xl">
      <p class="text-subtitle2 q-mb-sm">5. Dense + Step de R$ 50</p>
      <DssRange
        v-model="denseValue"
        :min="0"
        :max="1000"
        :step="50"
        :dense="true"
        :markers="true"
        :label="true"
        aria-label="Faixa de preço em reais, passo de R$ 50"
        hint="Modo compacto — passo de R$ 50"
      />
      <p class="text-caption text-secondary q-mt-sm">
        R$ {{ denseValue.min }} — R$ {{ denseValue.max }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssRange from './DssRange.vue'
import type { RangeValue } from './types/range.types'

const basicValue    = ref<RangeValue>({ min: 20, max: 80 })
const advancedValue = ref<RangeValue>({ min: 3,  max: 7  })
const stateValue    = ref<RangeValue>({ min: 25, max: 75 })
const brandValue    = ref<RangeValue>({ min: 30, max: 70 })
const denseValue    = ref<RangeValue>({ min: 200, max: 600 })
</script>
