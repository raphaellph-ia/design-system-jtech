<template>
  <div class="dss-badge-examples">
    <h1>DssBadge - Exemplos Completos</h1>

    <!-- Cores Semanticas -->
    <section class="example-section">
      <h2>Cores Semanticas</h2>
      <div class="badge-row">
        <DssBadge color="primary" label="Primary" />
        <DssBadge color="secondary" label="Secondary" />
        <DssBadge color="tertiary" label="Tertiary" />
        <DssBadge color="accent" label="Accent" />
      </div>
    </section>

    <!-- Cores de Feedback -->
    <section class="example-section">
      <h2>Cores de Feedback</h2>
      <div class="badge-row">
        <DssBadge color="positive" label="Success" />
        <DssBadge color="negative" label="Error" />
        <DssBadge color="warning" label="Warning" />
        <DssBadge color="info" label="Info" />
      </div>
    </section>

    <!-- Variantes -->
    <section class="example-section">
      <h2>Variantes Visuais</h2>

      <h3>Solid (Padrao)</h3>
      <div class="badge-row">
        <DssBadge color="primary" label="5" />
        <DssBadge color="negative" label="99+" />
        <DssBadge color="positive" label="Novo" />
      </div>

      <h3>Outline</h3>
      <div class="badge-row">
        <DssBadge outline color="primary" label="5" />
        <DssBadge outline color="negative" label="99+" />
        <DssBadge outline color="positive" label="Tag" />
      </div>

      <h3>Transparent</h3>
      <div class="badge-row">
        <DssBadge transparent color="primary" label="Info" />
        <DssBadge transparent color="negative" label="Alerta" />
        <DssBadge transparent color="positive" label="OK" />
      </div>

      <h3>Rounded</h3>
      <div class="badge-row">
        <DssBadge rounded color="primary" label="Label" />
        <DssBadge rounded color="accent" label="Tag" />
        <DssBadge rounded color="info" label="Status" />
      </div>
    </section>

    <!-- Dot Indicator -->
    <section class="example-section">
      <h2>Dot Indicator (Badge Vazio)</h2>
      <p class="section-description">
        Badges vazios funcionam como indicadores visuais (pontos de status).
      </p>
      <div class="badge-row">
        <span class="dot-label">
          <DssBadge color="positive" />
          Online
        </span>
        <span class="dot-label">
          <DssBadge color="warning" />
          Ausente
        </span>
        <span class="dot-label">
          <DssBadge color="negative" />
          Offline
        </span>
        <span class="dot-label">
          <DssBadge color="info" />
          Em reuniao
        </span>
      </div>
    </section>

    <!-- Floating -->
    <section class="example-section">
      <h2>Floating (Sobrepondo Elementos)</h2>
      <p class="section-description">
        Badges floating ficam posicionados no canto superior direito do elemento pai.
      </p>
      <div class="badge-row floating-examples">
        <div class="floating-container">
          <div class="fake-avatar">
            <span>JD</span>
          </div>
          <DssBadge floating color="negative" label="3" />
        </div>

        <div class="floating-container">
          <div class="fake-icon">
            <span>&#128276;</span>
          </div>
          <DssBadge floating color="negative" label="99+" />
        </div>

        <div class="floating-container">
          <div class="fake-avatar">
            <span>AB</span>
          </div>
          <DssBadge floating color="positive" />
        </div>
      </div>
    </section>

    <!-- Alinhamento -->
    <section class="example-section">
      <h2>Alinhamento Vertical</h2>
      <div class="alignment-example">
        <span class="align-demo">
          Texto com badge
          <DssBadge align="top" color="primary" label="top" />
        </span>
        <span class="align-demo">
          Texto com badge
          <DssBadge align="middle" color="primary" label="middle" />
        </span>
        <span class="align-demo">
          Texto com badge
          <DssBadge align="bottom" color="primary" label="bottom" />
        </span>
      </div>
    </section>

    <!-- Text Color Customizado -->
    <section class="example-section">
      <h2>Cor de Texto Customizada</h2>
      <div class="badge-row">
        <DssBadge color="warning" text-color="negative" label="Urgente" />
        <DssBadge color="info" text-color="primary" label="Destaque" />
      </div>
    </section>

    <!-- Multi-line -->
    <section class="example-section">
      <h2>Multi-line</h2>
      <div class="badge-row">
        <DssBadge multi-line color="primary">
          Linha 1<br />Linha 2
        </DssBadge>
        <DssBadge multi-line color="info">
          Conteudo<br />em multiplas<br />linhas
        </DssBadge>
      </div>
    </section>

    <!-- Slot Default -->
    <section class="example-section">
      <h2>Usando Slot Default</h2>
      <div class="badge-row">
        <DssBadge color="primary">
          <strong>Bold</strong>
        </DssBadge>
        <DssBadge color="accent">
          <span style="font-style: italic;">Italic</span>
        </DssBadge>
        <DssBadge color="info">
          Custom Content
        </DssBadge>
      </div>
    </section>

    <!-- Brandabilidade -->
    <section class="example-section">
      <h2>Brandabilidade</h2>

      <h3>Hub (Laranja)</h3>
      <div class="badge-row" data-brand="hub">
        <DssBadge brand="hub" label="Hub" />
        <DssBadge brand="hub" outline label="Hub Outline" />
        <DssBadge brand="hub" transparent label="Hub Transparent" />
      </div>

      <h3>Water (Azul)</h3>
      <div class="badge-row" data-brand="water">
        <DssBadge brand="water" label="Water" />
        <DssBadge brand="water" outline label="Water Outline" />
        <DssBadge brand="water" transparent label="Water Transparent" />
      </div>

      <h3>Waste (Verde)</h3>
      <div class="badge-row" data-brand="waste">
        <DssBadge brand="waste" label="Waste" />
        <DssBadge brand="waste" outline label="Waste Outline" />
        <DssBadge brand="waste" transparent label="Waste Transparent" />
      </div>
    </section>

    <!-- Exemplos Praticos -->
    <section class="example-section">
      <h2>Exemplos Praticos</h2>

      <h3>Contador de Notificacoes</h3>
      <div class="practical-example">
        <div class="notification-example">
          <span class="notification-icon">&#128276;</span>
          <DssBadge
            floating
            color="negative"
            :label="notificationCount.toString()"
            aria-label="5 notificacoes nao lidas"
          />
        </div>
        <div class="notification-controls">
          <button @click="addNotification">+ Adicionar</button>
          <button @click="clearNotifications">Limpar</button>
        </div>
      </div>

      <h3>Status de Usuario</h3>
      <div class="badge-row user-status-list">
        <div class="user-status-item">
          <div class="user-avatar">JD</div>
          <DssBadge floating color="positive" aria-label="Online" />
          <span class="user-name">Joao Silva</span>
        </div>
        <div class="user-status-item">
          <div class="user-avatar">MC</div>
          <DssBadge floating color="warning" aria-label="Ausente" />
          <span class="user-name">Maria Costa</span>
        </div>
        <div class="user-status-item">
          <div class="user-avatar">PO</div>
          <DssBadge floating color="negative" aria-label="Offline" />
          <span class="user-name">Pedro Oliveira</span>
        </div>
      </div>

      <h3>Tags de Categoria</h3>
      <div class="badge-row">
        <DssBadge outline color="primary" label="Vue.js" />
        <DssBadge outline color="accent" label="TypeScript" />
        <DssBadge outline color="positive" label="Quasar" />
        <DssBadge outline color="info" label="DSS" />
      </div>

      <h3>Indicadores de Status</h3>
      <div class="status-list">
        <div class="status-item">
          <DssBadge color="positive" label="Ativo" />
          <span>Sistema operacional</span>
        </div>
        <div class="status-item">
          <DssBadge color="warning" label="Pendente" />
          <span>Aguardando aprovacao</span>
        </div>
        <div class="status-item">
          <DssBadge color="negative" label="Erro" />
          <span>Falha na sincronizacao</span>
        </div>
        <div class="status-item">
          <DssBadge color="info" label="Em Progresso" />
          <span>Processando dados</span>
        </div>
      </div>
    </section>

    <!-- Acessibilidade -->
    <section class="example-section">
      <h2>Recursos de Acessibilidade</h2>
      <div class="accessibility-info">
        <ul>
          <li>&#9989; role="status" para leitores de tela</li>
          <li>&#9989; aria-live="polite" para mudancas dinamicas</li>
          <li>&#9989; aria-label customizavel para contexto adicional</li>
          <li>&#9989; Contraste de cores WCAG 2.1 AA (&ge; 4.5:1)</li>
          <li>&#9989; Suporte a prefers-contrast: high</li>
          <li>&#9989; Suporte a prefers-reduced-motion: reduce</li>
          <li>&#9989; Texto legivel em todos os tamanhos</li>
        </ul>
      </div>

      <h3>Exemplo com aria-label</h3>
      <div class="badge-row">
        <DssBadge
          color="negative"
          label="5"
          aria-label="5 erros encontrados"
        />
        <DssBadge
          color="positive"
          aria-label="Status: Online"
        />
      </div>
    </section>
  </div>
</template>

<script>
import DssBadge from './1-structure/DssBadge.ts.vue'

export default {
  name: 'DssBadgeExamples',

  components: {
    DssBadge
  },

  data() {
    return {
      notificationCount: 5
    }
  },

  methods: {
    addNotification() {
      this.notificationCount++
    },

    clearNotifications() {
      this.notificationCount = 0
    }
  }
}
</script>

<style lang="scss" scoped>
/* Importar estilos de showcase (apenas para exemplos) */
@import '../../../utils/example-showcase';

/* Estilos adicionais especificos deste exemplo */
.dss-badge-examples {
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

.section-description {
  color: var(--dss-text-subtle);
  margin-bottom: var(--dss-spacing-4, 16px);
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3, 12px);
  margin-bottom: var(--dss-spacing-4, 16px);
  align-items: center;
}

/* Dot Indicator */
.dot-label {
  display: inline-flex;
  align-items: center;
  gap: var(--dss-spacing-2, 8px);
  color: var(--dss-text-body);
}

/* Floating Examples */
.floating-examples {
  gap: var(--dss-spacing-8, 32px);
}

.floating-container {
  position: relative;
  display: inline-block;
}

.fake-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--dss-surface-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--dss-text-body);
}

.fake-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* Alignment Demo */
.alignment-example {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4, 16px);
}

.align-demo {
  font-size: 1.25rem;
  color: var(--dss-text-body);
  line-height: 2;
}

/* Practical Examples */
.practical-example {
  padding: var(--dss-spacing-6, 24px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-card, 8px);
  background: var(--dss-surface-default);
  margin-bottom: var(--dss-spacing-4, 16px);
}

.notification-example {
  position: relative;
  display: inline-block;
  font-size: 32px;
  padding: var(--dss-spacing-2, 8px);
}

.notification-icon {
  display: block;
}

.notification-controls {
  margin-top: var(--dss-spacing-4, 16px);
  display: flex;
  gap: var(--dss-spacing-2, 8px);
}

.notification-controls button {
  padding: var(--dss-spacing-2, 8px) var(--dss-spacing-4, 16px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-input, 4px);
  background: var(--dss-surface-default);
  cursor: pointer;
  font-size: 14px;
}

.notification-controls button:hover {
  background: var(--dss-surface-subtle);
}

/* User Status List */
.user-status-list {
  gap: var(--dss-spacing-6, 24px);
}

.user-status-item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3, 12px);
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--dss-surface-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--dss-text-body);
  position: relative;
}

.user-name {
  color: var(--dss-text-body);
  font-size: 14px;
}

/* Status List */
.status-list {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3, 12px);
}

.status-item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3, 12px);
  color: var(--dss-text-body);
}

/* Accessibility Info */
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
