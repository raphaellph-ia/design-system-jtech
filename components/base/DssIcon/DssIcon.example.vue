<template>
  <div class="dss-icon-examples">
    <h1>DssIcon - Exemplos Completos</h1>

    <!-- Tamanhos -->
    <section class="example-section">
      <h2>Tamanhos</h2>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="home" size="xs" :decorative="true" />
          <span class="icon-label">xs (16px)</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="home" size="sm" :decorative="true" />
          <span class="icon-label">sm (20px)</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="home" size="md" :decorative="true" />
          <span class="icon-label">md (24px)</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="home" size="lg" :decorative="true" />
          <span class="icon-label">lg (32px)</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="home" size="xl" :decorative="true" />
          <span class="icon-label">xl (48px)</span>
        </div>
      </div>
    </section>

    <!-- Cores Semanticas -->
    <section class="example-section">
      <h2>Cores Semanticas</h2>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="circle" color="primary" :decorative="true" />
          <span class="icon-label">primary</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="circle" color="secondary" :decorative="true" />
          <span class="icon-label">secondary</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="circle" color="tertiary" :decorative="true" />
          <span class="icon-label">tertiary</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="circle" color="accent" :decorative="true" />
          <span class="icon-label">accent</span>
        </div>
      </div>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="check_circle" color="positive" :decorative="true" />
          <span class="icon-label">positive</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="error" color="negative" :decorative="true" />
          <span class="icon-label">negative</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="warning" color="warning" :decorative="true" />
          <span class="icon-label">warning</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="info" color="info" :decorative="true" />
          <span class="icon-label">info</span>
        </div>
      </div>
    </section>

    <!-- Heranca de Cor (Modo Embedded) -->
    <section class="example-section">
      <h2>Heranca de Cor (Modo Embedded)</h2>
      <p class="section-description">
        Sem prop color, DssIcon herda cor do contexto via currentColor.
      </p>
      <div class="icon-row">
        <div class="icon-demo" style="color: var(--dss-primary)">
          <DssIcon name="home" :decorative="true" />
          <span class="icon-label">herda primary</span>
        </div>
        <div class="icon-demo" style="color: var(--dss-negative)">
          <DssIcon name="home" :decorative="true" />
          <span class="icon-label">herda negative</span>
        </div>
        <div class="icon-demo" style="color: var(--dss-positive)">
          <DssIcon name="home" :decorative="true" />
          <span class="icon-label">herda positive</span>
        </div>
      </div>
    </section>

    <!-- Animacoes -->
    <section class="example-section">
      <h2>Animacoes</h2>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="sync" :spin="true" color="primary" aria-label="Carregando" />
          <span class="icon-label">spin</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="notifications" :pulse="true" color="negative" aria-label="Alerta" />
          <span class="icon-label">pulse</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="home" color="primary" :decorative="true" />
          <span class="icon-label">sem animacao</span>
        </div>
      </div>
    </section>

    <!-- Decorativo vs Semantico -->
    <section class="example-section">
      <h2>Acessibilidade: Decorativo vs Semantico</h2>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="home" aria-label="Pagina inicial" />
          <span class="icon-label">semantico (role=img)</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="chevron_right" :decorative="true" />
          <span class="icon-label">decorativo (aria-hidden)</span>
        </div>
      </div>
    </section>

    <!-- Brandabilidade -->
    <section class="example-section">
      <h2>Brandabilidade</h2>

      <h3>Via Prop</h3>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="business" brand="hub" aria-label="Hub" />
          <span class="icon-label">Hub</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="water_drop" brand="water" aria-label="Water" />
          <span class="icon-label">Water</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="delete" brand="waste" aria-label="Waste" />
          <span class="icon-label">Waste</span>
        </div>
      </div>

      <h3>Via Heranca Contextual (data-brand no pai)</h3>
      <div class="icon-row" data-brand="hub">
        <div class="icon-demo">
          <DssIcon name="business" aria-label="Hub contextual" />
          <span class="icon-label">Hub (contextual)</span>
        </div>
      </div>
      <div class="icon-row" data-brand="water">
        <div class="icon-demo">
          <DssIcon name="water_drop" aria-label="Water contextual" />
          <span class="icon-label">Water (contextual)</span>
        </div>
      </div>
      <div class="icon-row" data-brand="waste">
        <div class="icon-demo">
          <DssIcon name="delete" aria-label="Waste contextual" />
          <span class="icon-label">Waste (contextual)</span>
        </div>
      </div>
    </section>

    <!-- Exemplos Praticos -->
    <section class="example-section">
      <h2>Exemplos Praticos</h2>

      <h3>Status Indicators</h3>
      <div class="icon-row">
        <div class="icon-demo">
          <DssIcon name="check_circle" color="positive" size="sm" aria-label="Concluido" />
          <span class="icon-label">Concluido</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="error" color="negative" size="sm" aria-label="Erro" />
          <span class="icon-label">Erro</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="warning" color="warning" size="sm" aria-label="Atencao" />
          <span class="icon-label">Atencao</span>
        </div>
        <div class="icon-demo">
          <DssIcon name="info" color="info" size="sm" aria-label="Informacao" />
          <span class="icon-label">Info</span>
        </div>
      </div>

      <h3>Navegacao</h3>
      <div class="icon-row">
        <DssIcon name="home" color="primary" aria-label="Inicio" />
        <DssIcon name="search" color="primary" aria-label="Buscar" />
        <DssIcon name="notifications" color="primary" aria-label="Notificacoes" />
        <DssIcon name="settings" color="primary" aria-label="Configuracoes" />
        <DssIcon name="person" color="primary" aria-label="Perfil" />
      </div>

      <h3>Loading Spinner</h3>
      <div class="icon-row">
        <DssIcon name="sync" :spin="true" size="lg" color="primary" aria-label="Carregando dados" />
      </div>
    </section>

    <!-- Recursos de Acessibilidade -->
    <section class="example-section">
      <h2>Recursos de Acessibilidade</h2>
      <div class="accessibility-info">
        <ul>
          <li>role="img" para icones semanticos</li>
          <li>aria-hidden="true" para icones decorativos</li>
          <li>aria-label customizavel para contexto adicional</li>
          <li>Suporte a prefers-reduced-motion: reduce</li>
          <li>Suporte a prefers-contrast: more</li>
          <li>Suporte a forced-colors (Windows High Contrast)</li>
          <li>Touch target delegado ao wrapper (Opcao B)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import DssIcon from './1-structure/DssIcon.ts.vue'

export default {
  name: 'DssIconExamples',

  components: {
    DssIcon
  }
}
</script>

<style lang="scss" scoped>
.dss-icon-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--dss-spacing-8, 32px);
  font-family: var(--dss-font-family-sans, 'Inter', sans-serif);
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

.section-description {
  color: var(--dss-text-subtle);
  margin-bottom: var(--dss-spacing-4, 16px);
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-6, 24px);
  margin-bottom: var(--dss-spacing-4, 16px);
  align-items: center;
}

.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2, 8px);
}

.icon-label {
  font-size: var(--dss-font-size-xs, 12px);
  color: var(--dss-text-subtle);
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
