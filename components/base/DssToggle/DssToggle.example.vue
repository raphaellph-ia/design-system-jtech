<template>
  <div class="dss-toggle-examples">
    <!-- ================================================================
         Exemplo 1: Toggle basico
         ================================================================ -->
    <section>
      <h3>1. Toggle Basico</h3>
      <DssToggle
        v-model="basicToggle"
        label="Enable notifications"
      />
      <p>Valor: {{ basicToggle }}</p>
    </section>

    <!-- ================================================================
         Exemplo 2: Tamanhos
         ================================================================ -->
    <section>
      <h3>2. Tamanhos</h3>
      <DssToggle v-model="sizeToggle" size="xs" label="Extra Small" />
      <DssToggle v-model="sizeToggle" size="sm" label="Small" />
      <DssToggle v-model="sizeToggle" size="md" label="Medium (padrao)" />
      <DssToggle v-model="sizeToggle" size="lg" label="Large" />
    </section>

    <!-- ================================================================
         Exemplo 3: Cores (sem brand)
         ================================================================ -->
    <section>
      <h3>3. Cores</h3>
      <DssToggle v-model="colorToggle" color="primary" label="Primary" />
      <DssToggle v-model="colorToggle" color="secondary" label="Secondary" />
      <DssToggle v-model="colorToggle" color="accent" label="Accent" />
      <DssToggle v-model="colorToggle" color="positive" label="Positive" />
      <DssToggle v-model="colorToggle" color="negative" label="Negative" />
    </section>

    <!-- ================================================================
         Exemplo 4: Brands
         ================================================================ -->
    <section>
      <h3>4. Brands</h3>
      <DssToggle v-model="brandToggle" brand="hub" color="primary" label="Hub Primary" />
      <DssToggle v-model="brandToggle" brand="water" color="primary" label="Water Primary" />
      <DssToggle v-model="brandToggle" brand="waste" color="primary" label="Waste Primary" />
    </section>

    <!-- ================================================================
         Exemplo 5: Estados
         ================================================================ -->
    <section>
      <h3>5. Estados</h3>
      <DssToggle v-model="stateToggle" label="Normal" />
      <DssToggle v-model="disabledOff" disable label="Disabled (off)" />
      <DssToggle v-model="disabledOn" disable label="Disabled (on)" />
      <DssToggle v-model="errorToggle" error error-message="Campo obrigatorio" label="Error" />
      <DssToggle v-model="denseToggle" dense label="Dense" />
    </section>

    <!-- ================================================================
         Exemplo 6: Left Label
         ================================================================ -->
    <section>
      <h3>6. Left Label</h3>
      <DssToggle v-model="leftToggle" left-label label="Label a esquerda" />
    </section>

    <!-- ================================================================
         Exemplo 7: Slot customizado
         ================================================================ -->
    <section>
      <h3>7. Slot Customizado</h3>
      <DssToggle v-model="slotToggle">
        <span>
          <strong>Dark Mode</strong>
          <br />
          <small>Ativar tema escuro</small>
        </span>
      </DssToggle>
    </section>

    <!-- ================================================================
         Exemplo 8: Array mode (grupo)
         ================================================================ -->
    <section>
      <h3>8. Array Mode (grupo)</h3>
      <DssToggle v-model="features" val="wifi" label="Wi-Fi" />
      <DssToggle v-model="features" val="bluetooth" label="Bluetooth" />
      <DssToggle v-model="features" val="nfc" label="NFC" />
      <p>Ativos: {{ features.join(', ') || 'nenhum' }}</p>
    </section>

    <!-- ================================================================
         Exemplo 9: Acessibilidade
         ================================================================ -->
    <section>
      <h3>9. Acessibilidade</h3>
      <DssToggle
        v-model="a11yToggle"
        aria-label="Ativar modo de alto contraste"
        label="Alto Contraste"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssToggle from './1-structure/DssToggle.ts.vue'

const basicToggle = ref(false)
const sizeToggle = ref(true)
const colorToggle = ref(true)
const brandToggle = ref(true)
const stateToggle = ref(false)
const disabledOff = ref(false)
const disabledOn = ref(true)
const errorToggle = ref(false)
const denseToggle = ref(false)
const leftToggle = ref(false)
const slotToggle = ref(false)
const features = ref<string[]>(['wifi'])
const a11yToggle = ref(false)
</script>
