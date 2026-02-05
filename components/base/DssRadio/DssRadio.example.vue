<script setup lang="ts">
/**
 * DssRadio — Showcase / Exemplos
 * Design System Sansys v2.2
 */
import { ref } from 'vue'
import DssRadio from './DssRadio.vue'

// Modelos reativos para demonstracao
const selectedFruit = ref('apple')
const selectedSize = ref('md')
const selectedColor = ref('primary')
const selectedBrand = ref(null)
const selectedDisabled = ref('option1')
const selectedError = ref(null)
const selectedDense = ref('a')
</script>

<template>
  <div class="dss-radio-examples">

    <!-- ================================================================ -->
    <!-- 1. Uso basico -->
    <!-- ================================================================ -->
    <section>
      <h3>1. Uso Basico</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedFruit"
          val="apple"
          name="fruit"
          label="Maca"
        />
        <DssRadio
          v-model="selectedFruit"
          val="banana"
          name="fruit"
          label="Banana"
        />
        <DssRadio
          v-model="selectedFruit"
          val="orange"
          name="fruit"
          label="Laranja"
        />
      </div>
      <p>Selecionado: {{ selectedFruit }}</p>
    </section>

    <!-- ================================================================ -->
    <!-- 2. Tamanhos -->
    <!-- ================================================================ -->
    <section>
      <h3>2. Tamanhos</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedSize"
          val="xs"
          name="size"
          label="Extra Small (xs)"
          size="xs"
        />
        <DssRadio
          v-model="selectedSize"
          val="sm"
          name="size"
          label="Small (sm)"
          size="sm"
        />
        <DssRadio
          v-model="selectedSize"
          val="md"
          name="size"
          label="Medium (md)"
          size="md"
        />
        <DssRadio
          v-model="selectedSize"
          val="lg"
          name="size"
          label="Large (lg)"
          size="lg"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 3. Cores semanticas -->
    <!-- ================================================================ -->
    <section>
      <h3>3. Cores Semanticas</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedColor"
          val="primary"
          name="color"
          label="Primary"
          color="primary"
        />
        <DssRadio
          v-model="selectedColor"
          val="secondary"
          name="color"
          label="Secondary"
          color="secondary"
        />
        <DssRadio
          v-model="selectedColor"
          val="positive"
          name="color"
          label="Positive"
          color="positive"
        />
        <DssRadio
          v-model="selectedColor"
          val="negative"
          name="color"
          label="Negative"
          color="negative"
        />
        <DssRadio
          v-model="selectedColor"
          val="warning"
          name="color"
          label="Warning"
          color="warning"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 4. Brands (Sansys) -->
    <!-- ================================================================ -->
    <section>
      <h3>4. Brands Sansys</h3>
      <div class="example-row" data-brand="hub">
        <DssRadio
          v-model="selectedBrand"
          val="hub"
          name="brand"
          label="Hub"
          brand="hub"
        />
      </div>
      <div class="example-row" data-brand="water">
        <DssRadio
          v-model="selectedBrand"
          val="water"
          name="brand"
          label="Water"
          brand="water"
        />
      </div>
      <div class="example-row" data-brand="waste">
        <DssRadio
          v-model="selectedBrand"
          val="waste"
          name="brand"
          label="Waste"
          brand="waste"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 5. Estado desabilitado -->
    <!-- ================================================================ -->
    <section>
      <h3>5. Desabilitado</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedDisabled"
          val="option1"
          name="disabled"
          label="Selecionado e desabilitado"
          disable
        />
        <DssRadio
          v-model="selectedDisabled"
          val="option2"
          name="disabled"
          label="Nao selecionado e desabilitado"
          disable
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 6. Estado de erro -->
    <!-- ================================================================ -->
    <section>
      <h3>6. Erro de Validacao</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedError"
          val="accept"
          name="error"
          label="Aceitar termos"
          error
          error-message="Selecao obrigatoria"
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 7. Label a esquerda -->
    <!-- ================================================================ -->
    <section>
      <h3>7. Label a Esquerda</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedFruit"
          val="apple"
          name="fruit-left"
          label="Maca"
          left-label
        />
        <DssRadio
          v-model="selectedFruit"
          val="banana"
          name="fruit-left"
          label="Banana"
          left-label
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 8. Dense -->
    <!-- ================================================================ -->
    <section>
      <h3>8. Modo Dense</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedDense"
          val="a"
          name="dense"
          label="Opcao A"
          dense
        />
        <DssRadio
          v-model="selectedDense"
          val="b"
          name="dense"
          label="Opcao B"
          dense
        />
      </div>
    </section>

    <!-- ================================================================ -->
    <!-- 9. Slot customizado -->
    <!-- ================================================================ -->
    <section>
      <h3>9. Slot Customizado</h3>
      <div class="example-row">
        <DssRadio
          v-model="selectedFruit"
          val="apple"
          name="fruit-slot"
        >
          <strong>Maca</strong> — fruta tropical
        </DssRadio>
      </div>
    </section>

  </div>
</template>
