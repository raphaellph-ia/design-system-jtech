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
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              flex-shrink: 0;
            "
          ></div>
          <div>
            <h3>John Doe</h3>
            <p>Software Engineer at Veolia</p>
            <p><small>john.doe@veolia.com</small></p>
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
  </div>
</template>

<script>
import { DssCard, DssCardSection, DssCardActions } from './index'
import { DssButton } from '../DssButton'
// Nota: Em um projeto real, use:
// import { DssCard, DssCardSection, DssCardActions } from '@/dss/components/base/DssCard'
// import { DssButton } from '@/dss/components/base/DssButton'

export default {
  name: 'DssCardExample',

  components: {
    DssCard,
    DssCardSection,
    DssCardActions,
    DssButton
  },

  methods: {
    handleCancel() {
      console.log('Cancelar clicado')
    },

    handleConfirm() {
      console.log('Confirmar clicado')
    },

    handleCardClick(productName) {
      console.log(`Card clicado: ${productName}`)
      // Exemplo: this.$router.push(`/produto/${productName}`)
    }
  }
}
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
  border-bottom: 2px solid var(--dss-gray-200);
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

/* Dark background para seção dark mode */
.dark-section {
  background-color: #1a1a1a;
  padding: var(--dss-spacing-6);
  border-radius: var(--dss-radius-lg);
  margin: var(--dss-spacing-8) 0;
}

.dark-section h2 {
  color: white;
  border-bottom-color: rgba(255, 255, 255, 0.2);
}
</style>
