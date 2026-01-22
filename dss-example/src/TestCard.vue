<template>
  <div class="test-container">
    <header class="test-header">
      <h1>🃏 DssCard - Teste Completo de Variações</h1>
      <p>Todas as combinações possíveis de variantes, brandabilidade, estados e composições</p>
    </header>

    <main class="test-content">
      <!-- ========== SEÇÃO 1: VARIANTES VISUAIS ========== -->
      <section class="test-section">
        <h2>1. Variantes Visuais (4 tipos)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection>
                <h4>Elevated</h4>
                <p>Com elevação (box-shadow)</p>
              </DssCardSection>
            </DssCard>
            <code>variant="elevated"</code>
          </div>

          <div class="test-item">
            <DssCard variant="flat">
              <DssCardSection>
                <h4>Flat</h4>
                <p>Sem elevação e sem borda</p>
              </DssCardSection>
            </DssCard>
            <code>variant="flat"</code>
          </div>

          <div class="test-item">
            <DssCard variant="bordered">
              <DssCardSection>
                <h4>Bordered</h4>
                <p>Borda + elevação</p>
              </DssCardSection>
            </DssCard>
            <code>variant="bordered"</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined">
              <DssCardSection>
                <h4>Outlined</h4>
                <p>Borda apenas, sem elevação</p>
              </DssCardSection>
            </DssCard>
            <code>variant="outlined"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 2: BRANDABILIDADE ========== -->
      <section class="test-section">
        <h2>2. Brandabilidade (3 marcas)</h2>
        <p class="section-description">Brand adiciona border-left colorida (4px)</p>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="outlined" brand="hub">
              <DssCardSection>
                <h4>Hub 🟠</h4>
                <p>Border-left laranja</p>
              </DssCardSection>
            </DssCard>
            <code>brand="hub"</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" brand="water">
              <DssCardSection>
                <h4>Water 🔵</h4>
                <p>Border-left azul</p>
              </DssCardSection>
            </DssCard>
            <code>brand="water"</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" brand="waste">
              <DssCardSection>
                <h4>Waste 🟢</h4>
                <p>Border-left verde</p>
              </DssCardSection>
            </DssCard>
            <code>brand="waste"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 3: CLICKABLE ========== -->
      <section class="test-section">
        <h2>3. Cards Clickable</h2>
        <p class="section-description">Hover aumenta elevação | Navegação por teclado (Tab, Enter, Space)</p>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated" clickable @click="handleClick('Elevated')">
              <DssCardSection>
                <h4>Clickable Elevated</h4>
                <p>Hover para ver elevação aumentar</p>
              </DssCardSection>
            </DssCard>
            <code>clickable @click</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" clickable @click="handleClick('Outlined')">
              <DssCardSection>
                <h4>Clickable Outlined</h4>
                <p>Hover altera cor da borda</p>
              </DssCardSection>
            </DssCard>
            <code>clickable @click</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 4: COM AÇÕES ========== -->
      <section class="test-section">
        <h2>4. Cards com Ações (DssCardActions)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection>
                <h4>Confirmação</h4>
                <p>Card com botões de ação</p>
              </DssCardSection>
              <DssCardActions align="right">
                <DssButton variant="flat">Cancelar</DssButton>
                <DssButton color="primary">Confirmar</DssButton>
              </DssCardActions>
            </DssCard>
            <code>align="right"</code>
          </div>

          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection>
                <h4>Entre Extremidades</h4>
                <p>Botões nas bordas</p>
              </DssCardSection>
              <DssCardActions align="between">
                <DssButton variant="outline" color="negative">Deletar</DssButton>
                <DssButton color="primary">Salvar</DssButton>
              </DssCardActions>
            </DssCard>
            <code>align="between"</code>
          </div>

          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection>
                <h4>Vertical</h4>
                <p>Ações empilhadas</p>
              </DssCardSection>
              <DssCardActions vertical>
                <DssButton variant="flat">Opção 1</DssButton>
                <DssButton variant="flat">Opção 2</DssButton>
              </DssCardActions>
            </DssCard>
            <code>vertical</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 5: MÚLTIPLAS SEÇÕES ========== -->
      <section class="test-section">
        <h2>5. Cards com Múltiplas Seções</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="bordered">
              <DssCardSection>
                <h3>Título Principal</h3>
                <p>Primeira seção</p>
              </DssCardSection>
              <DssCardSection>
                <h4>Conteúdo</h4>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </DssCardSection>
              <DssCardActions align="right">
                <DssButton color="primary">OK</DssButton>
              </DssCardActions>
            </DssCard>
            <code>3 seções (2 sections + 1 actions)</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 6: HORIZONTAL LAYOUT ========== -->
      <section class="test-section">
        <h2>6. Layout Horizontal</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection horizontal>
                <div
                  style="
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    flex-shrink: 0;
                  "
                ></div>
                <div>
                  <h4>John Doe</h4>
                  <p>Software Engineer</p>
                  <small>john@sansys.com.br</small>
                </div>
              </DssCardSection>
            </DssCard>
            <code>horizontal layout</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 7: SQUARE VARIANT ========== -->
      <section class="test-section">
        <h2>7. Square Variant (Sem Border-Radius)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated" square>
              <DssCardSection>
                <h4>Square Card</h4>
                <p>Cantos quadrados (border-radius: 0)</p>
              </DssCardSection>
            </DssCard>
            <code>square</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" square brand="water">
              <DssCardSection>
                <h4>Square + Brand</h4>
                <p>Combinação de props</p>
              </DssCardSection>
            </DssCard>
            <code>square brand="water"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 8: DARK MODE ========== -->
      <section class="test-section dark-bg">
        <h2 style="color: white;">8. Dark Mode</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssCard dark variant="elevated">
              <DssCardSection>
                <h4>Dark Mode</h4>
                <p>Background escuro + texto claro</p>
              </DssCardSection>
            </DssCard>
            <code>dark</code>
          </div>

          <div class="test-item">
            <DssCard dark variant="outlined" brand="hub">
              <DssCardSection>
                <h4>Dark + Brand</h4>
                <p>Combinação de props</p>
              </DssCardSection>
            </DssCard>
            <code>dark brand="hub"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 9: BRANDABILIDADE COM VARIANTES ========== -->
      <section class="test-section">
        <h2>9. Brandabilidade × Variantes (Todas Combinações)</h2>
        <div class="test-grid">
          <!-- Hub -->
          <div class="test-item">
            <DssCard variant="elevated" brand="hub">
              <DssCardSection>
                <h4>Hub Elevated</h4>
                <p>Laranja</p>
              </DssCardSection>
            </DssCard>
            <code>hub + elevated</code>
          </div>

          <div class="test-item">
            <DssCard variant="flat" brand="hub">
              <DssCardSection>
                <h4>Hub Flat</h4>
                <p>Laranja</p>
              </DssCardSection>
            </DssCard>
            <code>hub + flat</code>
          </div>

          <div class="test-item">
            <DssCard variant="bordered" brand="hub">
              <DssCardSection>
                <h4>Hub Bordered</h4>
                <p>Laranja</p>
              </DssCardSection>
            </DssCard>
            <code>hub + bordered</code>
          </div>

          <!-- Water -->
          <div class="test-item">
            <DssCard variant="elevated" brand="water">
              <DssCardSection>
                <h4>Water Elevated</h4>
                <p>Azul</p>
              </DssCardSection>
            </DssCard>
            <code>water + elevated</code>
          </div>

          <div class="test-item">
            <DssCard variant="flat" brand="water">
              <DssCardSection>
                <h4>Water Flat</h4>
                <p>Azul</p>
              </DssCardSection>
            </DssCard>
            <code>water + flat</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" brand="water">
              <DssCardSection>
                <h4>Water Outlined</h4>
                <p>Azul</p>
              </DssCardSection>
            </DssCard>
            <code>water + outlined</code>
          </div>

          <!-- Waste -->
          <div class="test-item">
            <DssCard variant="elevated" brand="waste">
              <DssCardSection>
                <h4>Waste Elevated</h4>
                <p>Verde</p>
              </DssCardSection>
            </DssCard>
            <code>waste + elevated</code>
          </div>

          <div class="test-item">
            <DssCard variant="bordered" brand="waste">
              <DssCardSection>
                <h4>Waste Bordered</h4>
                <p>Verde</p>
              </DssCardSection>
            </DssCard>
            <code>waste + bordered</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined" brand="waste">
              <DssCardSection>
                <h4>Waste Outlined</h4>
                <p>Verde</p>
              </DssCardSection>
            </DssCard>
            <code>waste + outlined</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 10: GRID RESPONSIVO ========== -->
      <section class="test-section">
        <h2>10. Grid Responsivo</h2>
        <p class="section-description">Cards em grid adaptável (auto-fill)</p>
        <div class="responsive-grid">
          <DssCard v-for="i in 6" :key="i" variant="elevated" clickable>
            <DssCardSection>
              <h4>Card {{ i }}</h4>
              <p>Conteúdo dinâmico</p>
            </DssCardSection>
          </DssCard>
        </div>
      </section>

      <!-- ========== SEÇÃO 11: CONTEXTO DATA-BRAND ========== -->
      <section class="test-section">
        <h2>11. Herança de Brand (data-brand)</h2>
        <p class="section-description">Todos cards filhos herdam brand do contexto pai</p>
        <div data-brand="hub" class="test-grid">
          <div class="test-item">
            <DssCard variant="elevated">
              <DssCardSection>
                <h4>Herda Hub</h4>
                <p>Via contexto pai</p>
              </DssCardSection>
            </DssCard>
            <code>context: data-brand="hub"</code>
          </div>

          <div class="test-item">
            <DssCard variant="outlined">
              <DssCardSection>
                <h4>Também Hub</h4>
                <p>Herança automática</p>
              </DssCardSection>
            </DssCard>
            <code>context: data-brand="hub"</code>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { DssCard, DssCardSection, DssCardActions } from '../../components/base/DssCard'
import { DssButton } from '../../components/base/DssButton'

const handleClick = (variant) => {
  console.log(`Card ${variant} clicado`)
  alert(`Card ${variant} clicado!`)
}
</script>

<style scoped>
.test-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: var(--dss-gray-50);
}

.test-header {
  padding: var(--dss-spacing-8);
  background: white;
  border-bottom: 2px solid var(--dss-gray-200);
  position: sticky;
  top: 0;
  z-index: 10;
}

.test-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: var(--dss-spacing-2);
  color: var(--dss-gray-900);
}

.test-header p {
  font-size: 16px;
  color: var(--dss-gray-600);
  margin: 0;
}

.test-content {
  padding: var(--dss-spacing-8);
}

.test-section {
  margin-bottom: var(--dss-spacing-12);
  padding: var(--dss-spacing-6);
  background: white;
  border-radius: var(--dss-radius-lg);
  box-shadow: var(--dss-elevation-1);
}

.test-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--dss-spacing-4);
  color: var(--dss-gray-900);
  border-bottom: 2px solid var(--dss-gray-200);
  padding-bottom: var(--dss-spacing-2);
}

.section-description {
  margin-bottom: var(--dss-spacing-4);
  color: var(--dss-gray-600);
  font-size: 14px;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--dss-spacing-4);
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--dss-spacing-4);
}

.test-item {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
}

.test-item code {
  font-size: 12px;
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  background: var(--dss-gray-100);
  border-radius: var(--dss-radius-sm);
  color: var(--dss-gray-700);
  font-family: 'Courier New', monospace;
  display: inline-block;
}

/* Dark background para seção dark mode */
.dark-bg {
  background-color: #1a1a1a;
  padding: var(--dss-spacing-6);
}

.dark-bg h2 {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.dark-bg .section-description {
  color: rgba(255, 255, 255, 0.7);
}

.dark-bg code {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}
</style>
