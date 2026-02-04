<template>
  <div class="dss-button-examples">
    <h1>DssButton - Exemplos Completos</h1>

    <!-- Cores Semânticas -->
    <section class="example-section">
      <h2>Cores Semânticas</h2>
      <div class="button-row">
        <DssButton color="primary">Primary</DssButton>
        <DssButton color="secondary">Secondary</DssButton>
        <DssButton color="tertiary">Tertiary</DssButton>
        <DssButton color="accent">Accent</DssButton>
      </div>
    </section>

    <!-- Cores de Feedback -->
    <section class="example-section">
      <h2>Cores de Feedback</h2>
      <div class="button-row">
        <DssButton color="positive">Success</DssButton>
        <DssButton color="negative">Error</DssButton>
        <DssButton color="warning">Warning</DssButton>
        <DssButton color="info">Info</DssButton>
      </div>
    </section>

    <!-- Tamanhos -->
    <section class="example-section">
      <h2>Tamanhos</h2>
      <div class="button-row">
        <DssButton size="xs" color="primary">Extra Small</DssButton>
        <DssButton size="sm" color="primary">Small</DssButton>
        <DssButton size="md" color="primary">Medium</DssButton>
        <DssButton size="lg" color="primary">Large</DssButton>
        <DssButton size="xl" color="primary">Extra Large</DssButton>
      </div>
    </section>

    <!-- Variantes -->
    <section class="example-section">
      <h2>Variantes Visuais</h2>
      <div class="button-row">
        <DssButton variant="elevated" color="primary">Elevated</DssButton>
        <DssButton variant="flat" color="primary">Flat</DssButton>
        <DssButton variant="outline" color="primary">Outline</DssButton>
        <DssButton variant="unelevated" color="primary">Unelevated</DssButton>
        <DssButton variant="push" color="primary">Push</DssButton>
        <DssButton variant="glossy" color="primary">Glossy</DssButton>
      </div>
    </section>

    <!-- Com Ícones -->
    <section class="example-section">
      <h2>Com Ícones</h2>
      <div class="button-row">
        <DssButton icon="add" color="primary">Adicionar</DssButton>
        <DssButton icon-right="arrow_forward" color="primary">Continuar</DssButton>
        <DssButton icon="arrow_back" icon-right="arrow_forward" color="primary">Navegação</DssButton>
        <DssButton icon="delete" color="negative" aria-label="Deletar" />
      </div>
    </section>

    <!-- Estados -->
    <section class="example-section">
      <h2>Estados</h2>
      <div class="button-row">
        <DssButton color="primary">Normal</DssButton>
        <DssButton :loading="true" color="primary">Loading</DssButton>
        <DssButton :disabled="true" color="primary">Disabled</DssButton>
      </div>
    </section>

    <!-- Modificadores -->
    <section class="example-section">
      <h2>Modificadores</h2>
      <div class="button-row">
        <DssButton dense color="primary">Dense</DssButton>
        <DssButton round icon="add" color="primary" aria-label="Adicionar" />
        <DssButton no-caps color="primary">Sem uppercase</DssButton>
      </div>
      <div class="button-row">
        <DssButton block color="primary">Block (Full Width)</DssButton>
      </div>
    </section>

    <!-- Brandabilidade -->
    <section class="example-section">
      <h2>Brandabilidade</h2>

      <h3>Hub (Laranja)</h3>
      <div class="button-row" data-brand="hub">
        <DssButton color="primary">Hub Primary</DssButton>
        <DssButton variant="outline" color="primary">Hub Outline</DssButton>
        <DssButton variant="flat" color="primary">Hub Flat</DssButton>
      </div>

      <h3>Water (Azul)</h3>
      <div class="button-row" data-brand="water">
        <DssButton color="primary">Water Primary</DssButton>
        <DssButton variant="outline" color="primary">Water Outline</DssButton>
        <DssButton variant="flat" color="primary">Water Flat</DssButton>
      </div>

      <h3>Waste (Verde)</h3>
      <div class="button-row" data-brand="waste">
        <DssButton color="primary">Waste Primary</DssButton>
        <DssButton variant="outline" color="primary">Waste Outline</DssButton>
        <DssButton variant="flat" color="primary">Waste Flat</DssButton>
      </div>
    </section>

    <!-- Exemplos Práticos -->
    <section class="example-section">
      <h2>Exemplos Práticos</h2>

      <h3>Formulário de Login</h3>
      <div class="form-example">
        <input type="text" placeholder="E-mail" class="example-input">
        <input type="password" placeholder="Senha" class="example-input">
        <div class="button-row">
          <DssButton variant="outline" color="primary">Cancelar</DssButton>
          <DssButton color="primary" type="submit">Entrar</DssButton>
        </div>
      </div>

      <h3>Ações de Card</h3>
      <div class="card-example">
        <h4>Título do Card</h4>
        <p>Descrição do conteúdo do card com informações importantes.</p>
        <div class="button-row">
          <DssButton variant="flat" color="primary">Detalhes</DssButton>
          <DssButton color="primary">Ação Principal</DssButton>
        </div>
      </div>

      <h3>Upload com Loading</h3>
      <div class="button-row">
        <DssButton
          icon="upload"
          :loading="uploading"
          color="primary"
          @click="toggleUpload"
        >
          {{ uploading ? 'Enviando...' : 'Upload Arquivo' }}
        </DssButton>
      </div>

      <h3>FAB (Floating Action Button)</h3>
      <DssButton
        round
        size="lg"
        icon="add"
        color="primary"
        aria-label="Adicionar novo item"
        class="fab-example"
      />
    </section>

    <!-- Acessibilidade -->
    <section class="example-section">
      <h2>Recursos de Acessibilidade</h2>
      <div class="accessibility-info">
        <ul>
          <li>✅ Touch targets mínimos de 48×48px</li>
          <li>✅ Focus rings visíveis (3px, contraste 4.5:1)</li>
          <li>✅ Navegação completa por teclado (Tab, Enter, Space)</li>
          <li>✅ ARIA labels para botões com ícone apenas</li>
          <li>✅ Estados loading com aria-busy</li>
          <li>✅ Suporte a prefers-contrast: more</li>
          <li>✅ Suporte a prefers-reduced-motion: reduce</li>
          <li>✅ Contraste de cores WCAG 2.1 AA (&ge; 4.5:1)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import DssButton from './DssButton.vue'

export default {
  name: 'DssButtonExamples',

  components: {
    DssButton
  },

  data() {
    return {
      uploading: false
    }
  },

  methods: {
    toggleUpload() {
      this.uploading = true
      setTimeout(() => {
        this.uploading = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
/* Importar estilos de showcase (apenas para exemplos) */
@import '../../../utils/example-showcase';

/* Estilos adicionais específicos deste exemplo */
.dss-button-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--dss-spacing-8, 32px);
  font-family: var(--dss-font-family-base, 'Inter', sans-serif);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: var(--dss-spacing-8, 32px);
  color: var(--dss-text-body);
}

h2 {
  font-size: 1.75rem;
  margin-top: var(--dss-spacing-8, 32px);
  margin-bottom: var(--dss-spacing-4, 16px);
  color: var(--dss-text-body);
  border-bottom: 2px solid var(--dss-border-default);
  padding-bottom: var(--dss-spacing-2, 8px);
}

h3 {
  font-size: 1.25rem;
  margin-top: var(--dss-spacing-6, 24px);
  margin-bottom: var(--dss-spacing-3, 12px);
  color: var(--dss-text-body);
}

.example-section {
  margin-bottom: var(--dss-spacing-10, 40px);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3, 12px);
  margin-bottom: var(--dss-spacing-4, 16px);
  align-items: center;
}

.form-example {
  max-width: 400px;
  padding: var(--dss-spacing-6, 24px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-card, 8px);
  background: var(--dss-surface-default);
}

.example-input {
  width: 100%;
  padding: var(--dss-spacing-3, 12px);
  margin-bottom: var(--dss-spacing-3, 12px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-input, 4px);
  font-size: 16px;
}

.card-example {
  max-width: 400px;
  padding: var(--dss-spacing-6, 24px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-card, 8px);
  background: var(--dss-surface-default);
  box-shadow: var(--dss-shadow-md);
}

.card-example h4 {
  margin: 0 0 var(--dss-spacing-2, 8px);
  font-size: 1.25rem;
}

.card-example p {
  margin: 0 0 var(--dss-spacing-4, 16px);
  color: var(--dss-text-subtle);
}

.fab-example {
  position: fixed;
  bottom: var(--dss-spacing-6, 24px);
  right: var(--dss-spacing-6, 24px);
  box-shadow: var(--dss-shadow-xl);
}

.accessibility-info {
  padding: var(--dss-spacing-6, 24px);
  background: var(--dss-surface-subtle);
  border-left: 4px solid var(--dss-action-primary);
  border-radius: var(--dss-radius-card, 8px);
}

.accessibility-info ul {
  margin: 0;
  padding-left: var(--dss-spacing-6, 24px);
}

.accessibility-info li {
  margin-bottom: var(--dss-spacing-2, 8px);
  color: var(--dss-text-body);
}
</style>
