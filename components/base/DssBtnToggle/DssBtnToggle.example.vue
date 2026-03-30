<template>
  <div class="example-container">

    <!-- ================================================================
         CENÁRIO 1: Básico — Alternância simples entre 3 opções de texto
         ================================================================ -->
    <section class="example-section">
      <h3>1. Básico — Seleção de opção única</h3>
      <DssBtnToggle
        v-model="selecaoBasica"
        :options="opcoesBasicas"
        toggle-color="primary"
        aria-label="Tipo de conta"
      />
      <p>Selecionado: {{ selecaoBasica ?? 'nenhum' }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 2: Com Ícones — Alinhamento de texto (somente ícones)
         ================================================================ -->
    <section class="example-section">
      <h3>2. Com Ícones — Alinhamento de texto</h3>
      <DssBtnToggle
        v-model="alinhamento"
        :options="opcoesAlinhamento"
        variant="outline"
        toggle-color="primary"
        aria-label="Alinhamento de texto"
      />
      <p>Alinhamento: {{ alinhamento }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 3: Variantes Visuais
         ================================================================ -->
    <section class="example-section">
      <h3>3. Variantes Visuais</h3>

      <div class="example-row">
        <span>elevated:</span>
        <DssBtnToggle
          v-model="varianteDemo"
          :options="opcoesDemo"
          variant="elevated"
          toggle-color="primary"
          aria-label="Demonstração variante elevated"
        />
      </div>

      <div class="example-row">
        <span>flat:</span>
        <DssBtnToggle
          v-model="varianteDemo"
          :options="opcoesDemo"
          variant="flat"
          toggle-color="primary"
          aria-label="Demonstração variante flat"
        />
      </div>

      <div class="example-row">
        <span>outline:</span>
        <DssBtnToggle
          v-model="varianteDemo"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          aria-label="Demonstração variante outline"
        />
      </div>

      <div class="example-row">
        <span>unelevated:</span>
        <DssBtnToggle
          v-model="varianteDemo"
          :options="opcoesDemo"
          variant="unelevated"
          toggle-color="primary"
          aria-label="Demonstração variante unelevated"
        />
      </div>

      <div class="example-row">
        <span>push:</span>
        <DssBtnToggle
          v-model="varianteDemo"
          :options="opcoesDemo"
          variant="push"
          toggle-color="primary"
          aria-label="Demonstração variante push"
        />
      </div>
    </section>

    <!-- ================================================================
         CENÁRIO 4: Clearable — Permite desmarcar a opção atual
         ================================================================ -->
    <section class="example-section">
      <h3>4. Clearable — Clique na opção ativa para desmarcar</h3>
      <DssBtnToggle
        v-model="selecaoClearable"
        :options="opcoesDemo"
        variant="outline"
        toggle-color="primary"
        clearable
        aria-label="Seleção desmarcável"
      />
      <p>Valor: {{ selecaoClearable !== null ? selecaoClearable : 'nenhum (desmarcado)' }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 5: Brand Context — Hub, Water, Waste
         ================================================================ -->
    <section class="example-section">
      <h3>5. Brand Context</h3>

      <div data-brand="hub" class="example-brand-row">
        <span>Hub:</span>
        <DssBtnToggle
          v-model="selecaoBrand"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          brand="hub"
          aria-label="Seleção brand Hub"
        />
      </div>

      <div data-brand="water" class="example-brand-row">
        <span>Water:</span>
        <DssBtnToggle
          v-model="selecaoBrand"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          brand="water"
          aria-label="Seleção brand Water"
        />
      </div>

      <div data-brand="waste" class="example-brand-row">
        <span>Waste:</span>
        <DssBtnToggle
          v-model="selecaoBrand"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          brand="waste"
          aria-label="Seleção brand Waste"
        />
      </div>
    </section>

    <!-- ================================================================
         CENÁRIO 6: Estados — Disabled e Readonly
         ================================================================ -->
    <section class="example-section">
      <h3>6. Estados — Disabled e Readonly</h3>

      <div class="example-row">
        <span>disabled:</span>
        <DssBtnToggle
          v-model="selecaoEstado"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          disable
          aria-label="Grupo desabilitado"
        />
      </div>

      <div class="example-row">
        <span>readonly:</span>
        <DssBtnToggle
          v-model="selecaoEstado"
          :options="opcoesDemo"
          variant="outline"
          toggle-color="primary"
          readonly
          aria-label="Grupo somente leitura"
        />
      </div>
    </section>

    <!-- ================================================================
         CENÁRIO 7: Spread — Largura total distribuída
         ================================================================ -->
    <section class="example-section">
      <h3>7. Spread — Botões distribuídos</h3>
      <DssBtnToggle
        v-model="selecaoSpread"
        :options="opcoesAlinhamento"
        variant="outline"
        toggle-color="primary"
        spread
        aria-label="Alinhamento distribuído"
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssBtnToggle from './DssBtnToggle.vue'
import type { BtnToggleOption } from './types/btn-toggle.types'

// ==========================================================================
// ESTADO DOS EXEMPLOS
// ==========================================================================

const selecaoBasica = ref<string | null>('pessoal')
const alinhamento = ref<string>('left')
const varianteDemo = ref<string>('a')
const selecaoClearable = ref<string | null>('a')
const selecaoBrand = ref<string>('a')
const selecaoEstado = ref<string>('a')
const selecaoSpread = ref<string>('left')

// ==========================================================================
// OPÇÕES DOS EXEMPLOS
// ==========================================================================

const opcoesBasicas: BtnToggleOption[] = [
  { label: 'Pessoal', value: 'pessoal' },
  { label: 'Empresa', value: 'empresa' },
  { label: 'Governo', value: 'governo' },
]

const opcoesAlinhamento: BtnToggleOption[] = [
  { value: 'left', icon: 'format_align_left', attrs: { 'aria-label': 'Alinhar à esquerda' } },
  { value: 'center', icon: 'format_align_center', attrs: { 'aria-label': 'Centralizar' } },
  { value: 'right', icon: 'format_align_right', attrs: { 'aria-label': 'Alinhar à direita' } },
  { value: 'justify', icon: 'format_align_justify', attrs: { 'aria-label': 'Justificar' } },
]

const opcoesDemo: BtnToggleOption[] = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
]
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
  padding: var(--dss-spacing-4);
}

.example-section {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-4);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.example-section h3 {
  margin: 0 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.example-row {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
}

.example-row span {
  min-width: 80px;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.example-brand-row {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-2);
}

.example-brand-row span {
  min-width: 60px;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.example-section p {
  margin: 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-hint);
}
</style>
