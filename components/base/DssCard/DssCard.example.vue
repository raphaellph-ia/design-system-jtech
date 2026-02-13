<template>
  <div class="dss-card-examples">
    <h1>DssCard - Exemplos de Uso</h1>
    <p>Exemplos práticos baseados na documentação oficial (DssCard.md)</p>

    <!-- ========================================================================
         SEÇÃO 1: USO BÁSICO
         ======================================================================== -->
    <section class="example-section">
      <h2>1. Uso Básico</h2>

      <div class="example-grid">
        <!-- Exemplo 1.1: Card Simples -->
        <DssCard>
          <DssCardSection>
            <h3>Card Simples</h3>
            <p>Conteúdo básico do card.</p>
          </DssCardSection>
        </DssCard>

        <!-- Exemplo 1.2: Card com Ações -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Confirmação</h3>
            <p>Tem certeza que deseja continuar?</p>
          </DssCardSection>

          <DssCardActions align="right">
            <DssButton variant="flat" @click="handleCancel">Cancelar</DssButton>
            <DssButton color="primary" @click="handleConfirm">Confirmar</DssButton>
          </DssCardActions>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 2: VARIANTES
         ======================================================================== -->
    <section class="example-section">
      <h2>2. Variantes</h2>

      <div class="example-grid">
        <!-- Elevated (Padrão) -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Elevated (Padrão)</h3>
            <p>Card com elevação (box-shadow).</p>
          </DssCardSection>
        </DssCard>

        <!-- Flat -->
        <DssCard variant="flat">
          <DssCardSection>
            <h3>Flat</h3>
            <p>Card sem elevação e sem borda.</p>
          </DssCardSection>
        </DssCard>

        <!-- Bordered -->
        <DssCard variant="bordered">
          <DssCardSection>
            <h3>Bordered</h3>
            <p>Card com borda + elevação.</p>
          </DssCardSection>
        </DssCard>

        <!-- Outlined -->
        <DssCard variant="outlined">
          <DssCardSection>
            <h3>Outlined</h3>
            <p>Card com borda, sem elevação.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 3: CLICKABLE
         ======================================================================== -->
    <section class="example-section">
      <h2>3. Cards Clickable</h2>

      <div class="example-grid">
        <DssCard variant="elevated" clickable @click="handleCardClick('Produto 1')">
          <DssCardSection>
            <h3>Produto 1</h3>
            <p>Clique para ver detalhes.</p>
            <p><small>Hover para ver elevação aumentada.</small></p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined" clickable @click="handleCardClick('Produto 2')">
          <DssCardSection>
            <h3>Produto 2</h3>
            <p>Clique para ver detalhes.</p>
            <p><small>Hover altera cor da borda.</small></p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 4: BRANDABILIDADE
         ======================================================================== -->
    <section class="example-section">
      <h2>4. Brandabilidade</h2>

      <div class="example-grid">
        <!-- Hub (Laranja) -->
        <DssCard brand="hub" variant="outlined">
          <DssCardSection>
            <h3>Hub Dashboard 🟠</h3>
            <p>Card com accent Hub (laranja).</p>
            <p><small>Border-left colorida.</small></p>
          </DssCardSection>
        </DssCard>

        <!-- Water (Azul) -->
        <DssCard brand="water" variant="elevated">
          <DssCardSection>
            <h3>Water Metrics 🔵</h3>
            <p>Card com accent Water (azul).</p>
            <p><small>Border-left colorida.</small></p>
          </DssCardSection>
        </DssCard>

        <!-- Waste (Verde) -->
        <DssCard brand="waste" variant="flat">
          <DssCardSection>
            <h3>Waste Report 🟢</h3>
            <p>Card com accent Waste (verde).</p>
            <p><small>Border-left colorida.</small></p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 5: HORIZONTAL LAYOUT
         ======================================================================== -->
    <section class="example-section">
      <h2>5. Layout Horizontal</h2>

      <DssCard variant="elevated" style="max-width: 600px;">
        <DssCardSection horizontal>
          <div
            style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: linear-gradient(135deg, var(--dss-action-primary), var(--dss-action-secondary));
              flex-shrink: 0;
            "
          ></div>
          <div>
            <h3>John Doe</h3>
            <p>Software Engineer at Sansys</p>
            <p><small>john.doe@sansys.com.br</small></p>
          </div>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- ========================================================================
         SEÇÃO 6: MÚLTIPLAS SEÇÕES
         ======================================================================== -->
    <section class="example-section">
      <h2>6. Múltiplas Seções</h2>

      <DssCard variant="bordered" style="max-width: 600px;">
        <DssCardSection>
          <h2>Título Principal</h2>
          <p>Subtítulo ou descrição breve.</p>
        </DssCardSection>

        <DssCardSection>
          <h3>Seção de Conteúdo</h3>
          <p>Conteúdo principal do card.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </DssCardSection>

        <DssCardActions align="between">
          <DssButton variant="flat" color="secondary">Ver Mais</DssButton>
          <DssButton color="primary">Ação Primária</DssButton>
        </DssCardActions>
      </DssCard>
    </section>

    <!-- ========================================================================
         SEÇÃO 7: DARK MODE
         ======================================================================== -->
    <section class="example-section dark-section">
      <h2>7. Dark Mode</h2>

      <div class="example-grid">
        <DssCard dark variant="elevated">
          <DssCardSection>
            <h3>Dark Mode Card</h3>
            <p>Card com background escuro e texto claro.</p>
          </DssCardSection>
        </DssCard>

        <DssCard dark variant="outlined" brand="hub">
          <DssCardSection>
            <h3>Dark + Brand Hub</h3>
            <p>Dark mode com brandabilidade Hub.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 8: GRID RESPONSIVO
         ======================================================================== -->
    <section class="example-section">
      <h2>8. Grid Responsivo</h2>

      <div class="responsive-grid">
        <DssCard v-for="i in 6" :key="i" variant="elevated" clickable>
          <DssCardSection>
            <h3>Card {{ i }}</h3>
            <p>Conteúdo do card {{ i }}</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 9: SQUARE VARIANT
         ======================================================================== -->
    <section class="example-section">
      <h2>9. Square Variant (Sem Border-Radius)</h2>

      <div class="example-grid">
        <DssCard variant="elevated" square>
          <DssCardSection>
            <h3>Square Card</h3>
            <p>Card com cantos quadrados (sem border-radius).</p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined" square brand="water">
          <DssCardSection>
            <h3>Square + Brand</h3>
            <p>Square com brandabilidade Water.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 10: ALINHAMENTOS DE ACTIONS
         ======================================================================== -->
    <section class="example-section">
      <h2>10. Alinhamentos de Actions</h2>

      <div class="example-grid">
        <!-- Left -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Align Left</h3>
            <p>Botões alinhados à esquerda.</p>
          </DssCardSection>
          <DssCardActions align="left">
            <DssButton variant="flat">Cancelar</DssButton>
            <DssButton color="primary">Confirmar</DssButton>
          </DssCardActions>
        </DssCard>

        <!-- Center -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Align Center</h3>
            <p>Botões centralizados.</p>
          </DssCardSection>
          <DssCardActions align="center">
            <DssButton variant="flat">Cancelar</DssButton>
            <DssButton color="primary">Confirmar</DssButton>
          </DssCardActions>
        </DssCard>

        <!-- Between -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Align Between</h3>
            <p>Botões nas extremidades.</p>
          </DssCardSection>
          <DssCardActions align="between">
            <DssButton variant="flat">Cancelar</DssButton>
            <DssButton color="primary">Confirmar</DssButton>
          </DssCardActions>
        </DssCard>

        <!-- Vertical -->
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Vertical</h3>
            <p>Botões empilhados verticalmente.</p>
          </DssCardSection>
          <DssCardActions vertical>
            <DssButton variant="flat">Cancelar</DssButton>
            <DssButton color="primary">Confirmar</DssButton>
          </DssCardActions>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SEÇÃO 11: CONTEXTO DATA-BRAND
         ======================================================================== -->
    <section class="example-section">
      <h2>11. Contexto data-brand (Herança)</h2>

      <div data-brand="hub" class="example-grid">
        <DssCard variant="elevated">
          <DssCardSection>
            <h3>Herda Hub</h3>
            <p>Card herda brand Hub do contexto pai.</p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined">
          <DssCardSection>
            <h3>Também Hub</h3>
            <p>Todos cards neste contexto herdam Hub.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SECAO 12: COMPOSICAO — CARD COM DSSAVATAR
         ======================================================================== -->
    <section class="example-section">
      <h2>12. Composicao: Card com DssAvatar</h2>

      <DssCard variant="elevated" style="max-width: 480px;">
        <DssCardSection horizontal>
          <DssAvatar src="/avatar-placeholder.jpg" size="lg" />
          <div>
            <h3>Maria Silva</h3>
            <p>Engenheira de Software</p>
            <p><small>maria.silva@sansys.com.br</small></p>
          </div>
        </DssCardSection>
        <DssCardActions align="right">
          <DssButton variant="flat">Mensagem</DssButton>
          <DssButton color="primary">Ver Perfil</DssButton>
        </DssCardActions>
      </DssCard>
    </section>

    <!-- ========================================================================
         SECAO 13: COMPOSICAO — CARD COM DSSBADGE
         ======================================================================== -->
    <section class="example-section">
      <h2>13. Composicao: Card com DssBadge</h2>

      <div class="example-grid">
        <DssCard variant="elevated">
          <DssCardSection>
            <div class="card-header-with-badge">
              <h3>Pedidos Pendentes</h3>
              <DssBadge color="warning">12</DssBadge>
            </div>
            <p class="metric-value">{{ pendingOrders }}</p>
            <p><small>Atualizado agora</small></p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined" brand="water">
          <DssCardSection>
            <div class="card-header-with-badge">
              <h3>Sistema</h3>
              <DssBadge color="positive">Online</DssBadge>
            </div>
            <p>Todos os servicos operacionais.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SECAO 14: COMPOSICAO — CARD COM DSSCHIP
         ======================================================================== -->
    <section class="example-section">
      <h2>14. Composicao: Card com DssChip</h2>

      <DssCard variant="bordered" style="max-width: 480px;">
        <DssCardSection>
          <h3>Categorias do Projeto</h3>
          <div class="chip-group">
            <DssChip>Frontend</DssChip>
            <DssChip>Vue.js</DssChip>
            <DssChip outline>TypeScript</DssChip>
            <DssChip color="primary">Design System</DssChip>
            <DssChip closable @remove="handleChipRemove('UX')">UX</DssChip>
          </div>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- ========================================================================
         SECAO 15: COMPOSICAO — CARD COM DSSINPUT + DSSBUTTON
         ======================================================================== -->
    <section class="example-section">
      <h2>15. Composicao: Form Card (DssInput + DssButton)</h2>

      <DssCard variant="elevated" style="max-width: 480px;">
        <DssCardSection>
          <h3>Contato</h3>
          <div class="form-fields">
            <DssInput
              v-model="formName"
              label="Nome completo"
            />
            <DssInput
              v-model="formEmail"
              label="E-mail"
              type="email"
            />
          </div>
        </DssCardSection>
        <DssCardActions align="right">
          <DssButton variant="flat" @click="handleFormCancel">Cancelar</DssButton>
          <DssButton color="primary" @click="handleFormSubmit">Enviar</DssButton>
        </DssCardActions>
      </DssCard>
    </section>

    <!-- ========================================================================
         SECAO 16: COMPOSICAO — CARD COM DSSCHECKBOX + DSSRADIO
         ======================================================================== -->
    <section class="example-section">
      <h2>16. Composicao: Card com DssCheckbox e DssRadio</h2>

      <div class="example-grid">
        <!-- Checkbox: selecao multipla -->
        <DssCard variant="outlined">
          <DssCardSection>
            <h3>Notificacoes (multipla escolha)</h3>
            <div class="checkbox-list">
              <DssCheckbox v-model="notifications.email">E-mail</DssCheckbox>
              <DssCheckbox v-model="notifications.sms">SMS</DssCheckbox>
              <DssCheckbox v-model="notifications.push">Push</DssCheckbox>
              <DssCheckbox v-model="notifications.weekly" :disabled="true">Resumo semanal (em breve)</DssCheckbox>
            </div>
          </DssCardSection>
          <DssCardActions align="right">
            <DssButton color="primary" @click="saveNotifications">Salvar</DssButton>
          </DssCardActions>
        </DssCard>

        <!-- Radio: selecao exclusiva -->
        <DssCard variant="outlined">
          <DssCardSection>
            <h3>Frequencia de envio (escolha unica)</h3>
            <div class="checkbox-list">
              <DssRadio v-model="notificationFrequency" val="realtime">Tempo real</DssRadio>
              <DssRadio v-model="notificationFrequency" val="daily">Diario</DssRadio>
              <DssRadio v-model="notificationFrequency" val="weekly">Semanal</DssRadio>
              <DssRadio v-model="notificationFrequency" val="monthly">Mensal</DssRadio>
            </div>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- ========================================================================
         SECAO 17: COMPOSICAO — CARD COM DSSTOGGLE
         ======================================================================== -->
    <section class="example-section">
      <h2>17. Composicao: Card com DssToggle</h2>

      <DssCard variant="elevated" style="max-width: 480px;">
        <DssCardSection>
          <h3>Configuracoes</h3>
          <div class="toggle-list">
            <div class="toggle-item">
              <DssToggle v-model="settings.darkMode" />
              <div>
                <strong>Modo escuro</strong>
                <p><small>Ativar tema escuro na interface</small></p>
              </div>
            </div>
            <div class="toggle-item">
              <DssToggle v-model="settings.autoSave" />
              <div>
                <strong>Salvamento automatico</strong>
                <p><small>Salvar alteracoes automaticamente</small></p>
              </div>
            </div>
            <div class="toggle-item">
              <DssToggle v-model="settings.analytics" />
              <div>
                <strong>Analytics</strong>
                <p><small>Permitir coleta de dados de uso</small></p>
              </div>
            </div>
          </div>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- ========================================================================
         SECAO 18: COMPOSICAO — CARD COM DSSTOOLTIP
         ======================================================================== -->
    <section class="example-section">
      <h2>18. Composicao: Card com DssTooltip</h2>

      <DssCard variant="bordered" style="max-width: 480px;">
        <DssCardSection>
          <div class="card-header-with-badge">
            <DssTooltip text="Receita total acumulada no periodo">
              <h3 class="tooltip-trigger">Receita Total &#9432;</h3>
            </DssTooltip>
            <DssBadge color="positive">+15%</DssBadge>
          </div>
          <p class="metric-value">{{ revenue }}</p>
          <p><small>Comparado ao periodo anterior</small></p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- ========================================================================
         SECAO 19: COMPOSICAO — CARD COMPOSTO MISTO
         ======================================================================== -->
    <section class="example-section">
      <h2>19. Composicao: Dashboard Card Misto</h2>

      <DssCard variant="elevated" brand="hub" style="max-width: 560px;">
        <DssCardSection horizontal>
          <DssAvatar src="/team-lead.jpg" size="lg" />
          <div style="flex: 1;">
            <div class="card-header-with-badge">
              <h3>Carlos Mendes</h3>
              <DssBadge color="info">Tech Lead</DssBadge>
            </div>
            <p>Equipe de Engenharia — Hub</p>
          </div>
        </DssCardSection>
        <DssCardSection>
          <div class="chip-group">
            <DssChip>Vue.js</DssChip>
            <DssChip>Node.js</DssChip>
            <DssChip outline>DevOps</DssChip>
            <DssChip color="primary">DSS</DssChip>
          </div>
        </DssCardSection>
        <DssCardActions align="right">
          <DssButton variant="flat">Projetos</DssButton>
          <DssButton color="primary">Contatar</DssButton>
        </DssCardActions>
      </DssCard>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * DssCard - Exemplos de Uso
 * Composition API + TypeScript (padrao DSS v2.2)
 * Secoes 1-11: Exemplos base do componente
 * Secoes 12-19: Composicao com componentes DSS existentes
 */
import { ref, reactive } from 'vue'
import { DssCard, DssCardSection, DssCardActions } from './index'
import { DssButton } from '../DssButton'
import { DssAvatar } from '../DssAvatar'
import { DssBadge } from '../DssBadge'
import { DssChip } from '../DssChip'
import { DssInput } from '../DssInput'
import { DssCheckbox } from '../DssCheckbox'
import { DssRadio } from '../DssRadio'
import { DssToggle } from '../DssToggle'
import { DssTooltip } from '../DssTooltip'
// Nota: Em um projeto real, use paths como:
// import { DssCard, DssCardSection, DssCardActions } from '@/dss/components/base/DssCard'
// import { DssButton } from '@/dss/components/base/DssButton'
// etc.

// --- Handlers basicos (secoes 1-11) ---

function handleCancel(): void {
  console.log('Cancelar clicado')
}

function handleConfirm(): void {
  console.log('Confirmar clicado')
}

function handleCardClick(productName: string): void {
  console.log(`Card clicado: ${productName}`)
}

// --- Dados para composicao (secoes 12-19) ---

const pendingOrders = ref(12)
const revenue = ref('R$ 142.500,00')

// Secao 15: Form Card
const formName = ref('')
const formEmail = ref('')

function handleFormCancel(): void {
  formName.value = ''
  formEmail.value = ''
}

function handleFormSubmit(): void {
  console.log('Form enviado:', { name: formName.value, email: formEmail.value })
}

// Secao 14: Chip remove
function handleChipRemove(label: string): void {
  console.log(`Chip removido: ${label}`)
}

// Secao 16: Checkbox + Radio
const notificationFrequency = ref('daily')
const notifications = reactive({
  email: true,
  sms: false,
  push: true,
  weekly: false
})

function saveNotifications(): void {
  console.log('Notificacoes salvas:', { ...notifications })
}

// Secao 17: Toggle
const settings = reactive({
  darkMode: false,
  autoSave: true,
  analytics: false
})
</script>

<style scoped>
.dss-card-examples {
  padding: var(--dss-spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: var(--dss-spacing-2);
}

h2 {
  margin-top: var(--dss-spacing-12);
  margin-bottom: var(--dss-spacing-6);
  padding-bottom: var(--dss-spacing-2);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-200);
}

.example-section {
  margin-bottom: var(--dss-spacing-12);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--dss-spacing-4);
  margin-bottom: var(--dss-spacing-6);
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--dss-spacing-4);
}

/* Dark background para secao dark mode */
.dark-section {
  background-color: var(--dss-surface-dark);
  padding: var(--dss-spacing-6);
  border-radius: var(--dss-radius-lg);
  margin: var(--dss-spacing-8) 0;
}

.dark-section h2 {
  color: var(--dss-text-inverse);
  border-bottom-color: var(--dss-gray-700);
}

/* --- Composicao (secoes 12-19) --- */

.card-header-with-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-2);
}

.metric-value {
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-bold);
  margin: var(--dss-spacing-2) 0;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-2);
  margin-top: var(--dss-spacing-2);
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
  margin-top: var(--dss-spacing-4);
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  margin-top: var(--dss-spacing-4);
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
  margin-top: var(--dss-spacing-4);
}

.toggle-item {
  display: flex;
  align-items: flex-start;
  gap: var(--dss-spacing-3);
}

.toggle-item p {
  margin: 0;
  color: var(--dss-text-secondary);
}

.tooltip-trigger {
  cursor: help;
  border-bottom: var(--dss-border-width-thin) dashed var(--dss-gray-400);
  display: inline;
}
</style>
