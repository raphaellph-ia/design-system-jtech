<template>
  <div class="dss-item-examples">
    <h1>DssItem - Exemplos Completos</h1>

    <!-- Cenario 1: Item basico com label -->
    <section class="example-section">
      <h2>1. Item Basico (Estatico)</h2>
      <div class="example-list">
        <DssItem label="Item simples" />
        <DssItem label="Item com caption" caption="Descricao do item" />
      </div>
    </section>

    <!-- Cenario 2: Item clicavel -->
    <section class="example-section">
      <h2>2. Item Clicavel</h2>
      <div class="example-list">
        <DssItem clickable label="Clique aqui" @click="handleClick" />
        <DssItem clickable label="Com caption" caption="Clicavel com subtitulo" @click="handleClick" />
      </div>
    </section>

    <!-- Cenario 3: Leading icon -->
    <section class="example-section">
      <h2>3. Com Leading Icon</h2>
      <div class="example-list">
        <DssItem clickable label="Inicio" @click="handleClick">
          <template #leading>
            <DssIcon name="home" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable label="Configuracoes" caption="Ajustes do sistema" @click="handleClick">
          <template #leading>
            <DssIcon name="settings" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 4: Trailing icon -->
    <section class="example-section">
      <h2>4. Com Trailing Icon</h2>
      <div class="example-list">
        <DssItem clickable label="Ver detalhes" @click="handleClick">
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 5: Leading + Trailing -->
    <section class="example-section">
      <h2>5. Leading + Trailing (Navegacao)</h2>
      <div class="example-list">
        <DssItem clickable label="Perfil" caption="Dados do usuario" @click="handleClick">
          <template #leading>
            <DssIcon name="person" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable label="Notificacoes" @click="handleClick">
          <template #leading>
            <DssIcon name="notifications" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 6: Active state -->
    <section class="example-section">
      <h2>6. Estado Ativo</h2>
      <div class="example-list">
        <DssItem clickable label="Inicio" active @click="handleClick">
          <template #leading>
            <DssIcon name="home" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable label="Projetos" @click="handleClick">
          <template #leading>
            <DssIcon name="folder" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable label="Equipe" @click="handleClick">
          <template #leading>
            <DssIcon name="group" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 7: Disabled state -->
    <section class="example-section">
      <h2>7. Estado Desabilitado</h2>
      <div class="example-list">
        <DssItem clickable disabled label="Item desabilitado">
          <template #leading>
            <DssIcon name="block" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 8: Density variants -->
    <section class="example-section">
      <h2>8. Densidades</h2>
      <h3>Default</h3>
      <div class="example-list">
        <DssItem clickable label="Densidade default" @click="handleClick">
          <template #leading>
            <DssIcon name="view_agenda" :decorative="true" />
          </template>
        </DssItem>
      </div>
      <h3>Compact</h3>
      <div class="example-list">
        <DssItem clickable density="compact" label="Densidade compact" @click="handleClick">
          <template #leading>
            <DssIcon name="view_list" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 9: Inset -->
    <section class="example-section">
      <h2>9. Inset (Alinhamento sem Leading)</h2>
      <div class="example-list">
        <DssItem clickable label="Com icone" @click="handleClick">
          <template #leading>
            <DssIcon name="inbox" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable inset label="Sem icone (inset)" @click="handleClick" />
        <DssItem clickable label="Com icone" @click="handleClick">
          <template #leading>
            <DssIcon name="send" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 10: Divider -->
    <section class="example-section">
      <h2>10. Com Divider</h2>
      <div class="example-list">
        <DssItem clickable divider label="Item 1" @click="handleClick" />
        <DssItem clickable divider label="Item 2" @click="handleClick" />
        <DssItem clickable label="Item 3 (sem divider)" @click="handleClick" />
      </div>
    </section>

    <!-- Cenario 11: Brandabilidade -->
    <section class="example-section">
      <h2>11. Brandabilidade</h2>

      <h3>Via Prop</h3>
      <div class="example-list">
        <DssItem clickable active brand="hub" label="Hub Item">
          <template #leading>
            <DssIcon name="business" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable active brand="water" label="Water Item">
          <template #leading>
            <DssIcon name="water_drop" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable active brand="waste" label="Waste Item">
          <template #leading>
            <DssIcon name="delete" :decorative="true" />
          </template>
        </DssItem>
      </div>

      <h3>Via Heranca Contextual</h3>
      <div class="example-list" data-brand="hub">
        <DssItem clickable active label="Hub (contextual)">
          <template #leading>
            <DssIcon name="business" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 12: Cores Semanticas -->
    <section class="example-section">
      <h2>12. Cores Semanticas</h2>
      <div class="example-list">
        <DssItem clickable color="positive" label="Sucesso" @click="handleClick">
          <template #leading>
            <DssIcon name="check_circle" color="positive" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable color="negative" label="Erro" @click="handleClick">
          <template #leading>
            <DssIcon name="error" color="negative" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable color="warning" label="Atencao" @click="handleClick">
          <template #leading>
            <DssIcon name="warning" color="warning" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Cenario 13: Lista de Navegacao Completa -->
    <section class="example-section">
      <h2>13. Lista de Navegacao Completa</h2>
      <div class="example-list">
        <DssItem clickable active divider label="Dashboard" @click="handleClick">
          <template #leading>
            <DssIcon name="dashboard" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable divider label="Usuarios" caption="Gerenciar usuarios do sistema" @click="handleClick">
          <template #leading>
            <DssIcon name="people" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable divider label="Relatorios" caption="Visualizar relatorios" @click="handleClick">
          <template #leading>
            <DssIcon name="assessment" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="chevron_right" :decorative="true" />
          </template>
        </DssItem>
        <DssItem clickable disabled label="Auditoria" caption="Requer permissao especial">
          <template #leading>
            <DssIcon name="security" :decorative="true" />
          </template>
          <template #trailing>
            <DssIcon name="lock" :decorative="true" />
          </template>
        </DssItem>
      </div>
    </section>

    <!-- Acessibilidade -->
    <section class="example-section">
      <h2>Recursos de Acessibilidade</h2>
      <div class="accessibility-info">
        <ul>
          <li>role="listitem" para itens estaticos</li>
          <li>role="button" para itens clicaveis</li>
          <li>aria-disabled="true" para itens desabilitados</li>
          <li>tabindex="0" para itens clicaveis (focaveis)</li>
          <li>tabindex="-1" para itens desabilitados (nao focaveis)</li>
          <li>Suporte a Enter e Space para ativacao</li>
          <li>Focus ring visivel via :focus-visible</li>
          <li>Touch target 48px via ::before (quando clickable)</li>
          <li>Touch target removido em density="compact"</li>
          <li>Suporte a prefers-reduced-motion: reduce</li>
          <li>Suporte a prefers-contrast: more</li>
          <li>Suporte a forced-colors (Windows High Contrast)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import DssItem from './1-structure/DssItem.ts.vue'
import DssIcon from '../DssIcon/1-structure/DssIcon.ts.vue'

export default {
  name: 'DssItemExamples',

  components: {
    DssItem,
    DssIcon
  },

  methods: {
    handleClick(event) {
      console.log('DssItem clicked:', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.dss-item-examples {
  max-width: 600px;
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

.example-list {
  border: var(--dss-border-width-thin, 1px) solid var(--dss-border-default, #e0e0e0);
  border-radius: var(--dss-radius-card, 8px);
  overflow: hidden;
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
