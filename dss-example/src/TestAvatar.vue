<template>
  <div class="test-container">
    <header class="test-header">
      <h1>DssAvatar - Teste Completo de Variacoes v2.3.0</h1>
      <p>Todas as combinacoes possiveis de props, cores, tamanhos, formas, brands, status e acessibilidade</p>
    </header>

    <main class="test-content">
      <!-- ========== SECAO 1: CORES SEMANTICAS COM INICIAIS ========== -->
      <section class="test-section">
        <h2>1. Cores Semanticas com Iniciais (8 cores)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">JD</DssAvatar>
            <code>color="primary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary">AB</DssAvatar>
            <code>color="secondary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="tertiary">XY</DssAvatar>
            <code>color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">MK</DssAvatar>
            <code>color="accent"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive">OK</DssAvatar>
            <code>color="positive"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="negative">ER</DssAvatar>
            <code>color="negative"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="warning">WN</DssAvatar>
            <code>color="warning"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="info">IF</DssAvatar>
            <code>color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 2: TAMANHOS (5 variantes com enum) ========== -->
      <section class="test-section">
        <h2>2. Tamanhos Predefinidos (xs, sm, md, lg, xl)</h2>
        <p class="section-info">Usando enum de tamanhos DSS em vez de valores em pixels</p>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar color="primary" size="xs">XS</DssAvatar>
            <code>size="xs" (32px)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="sm">SM</DssAvatar>
            <code>size="sm" (40px)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" size="md">MD</DssAvatar>
            <code>size="md" (48px - default)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="lg">LG</DssAvatar>
            <code>size="lg" (64px)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="info" size="xl">XL</DssAvatar>
            <code>size="xl" (80px)</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 3: TAMANHOS COM ICONES ========== -->
      <section class="test-section">
        <h2>3. Tamanhos com Icones Material</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" size="xs" />
            <code>size="xs" + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="account_circle" color="secondary" size="sm" />
            <code>size="sm" + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="face" color="accent" size="md" />
            <code>size="md" + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="group" color="positive" size="lg" />
            <code>size="lg" + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="business" color="info" size="xl" />
            <code>size="xl" + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 4: BRAND - BRANDABILIDADE DSS ========== -->
      <section class="test-section highlight-section">
        <h2>4. Brandabilidade DSS (Hub, Water, Waste)</h2>
        <p class="section-info">Nova prop brand para aplicar estilos de marca Sansys com bordas coloridas</p>
        <div class="test-grid">
          <div class="test-item brand-demo">
            <DssAvatar brand="hub" icon="person" size="lg" />
            <code>brand="hub"</code>
            <span class="brand-label brand-hub">Sansys Hub</span>
          </div>
          <div class="test-item brand-demo">
            <DssAvatar brand="water" icon="person" size="lg" />
            <code>brand="water"</code>
            <span class="brand-label brand-water">Sansys Water</span>
          </div>
          <div class="test-item brand-demo">
            <DssAvatar brand="waste" icon="person" size="lg" />
            <code>brand="waste"</code>
            <span class="brand-label brand-waste">Sansys Waste</span>
          </div>
        </div>
        <div class="test-grid" style="margin-top: 1.5rem;">
          <div class="test-item brand-demo">
            <DssAvatar brand="hub" color="primary" size="lg">HB</DssAvatar>
            <code>brand="hub" + iniciais</code>
          </div>
          <div class="test-item brand-demo">
            <DssAvatar brand="water" color="secondary" size="lg">WT</DssAvatar>
            <code>brand="water" + iniciais</code>
          </div>
          <div class="test-item brand-demo">
            <DssAvatar brand="waste" color="positive" size="lg">WS</DssAvatar>
            <code>brand="waste" + iniciais</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 5: STATUS - INDICADORES DE STATUS ========== -->
      <section class="test-section highlight-section">
        <h2>5. Status Indicators (online, away, busy, offline)</h2>
        <p class="section-info">Nova prop status para indicadores visuais usando tokens DSS (--dss-positive, --dss-warning, --dss-negative, --dss-neutral-400)</p>
        <div class="test-grid">
          <div class="test-item status-demo">
            <DssAvatar status="online" color="primary" size="lg">JD</DssAvatar>
            <code>status="online"</code>
            <span class="status-label status-online">Online</span>
          </div>
          <div class="test-item status-demo">
            <DssAvatar status="away" color="secondary" size="lg">AB</DssAvatar>
            <code>status="away"</code>
            <span class="status-label status-away">Ausente</span>
          </div>
          <div class="test-item status-demo">
            <DssAvatar status="busy" color="accent" size="lg">XY</DssAvatar>
            <code>status="busy"</code>
            <span class="status-label status-busy">Ocupado</span>
          </div>
          <div class="test-item status-demo">
            <DssAvatar status="offline" color="info" size="lg">ZZ</DssAvatar>
            <code>status="offline"</code>
            <span class="status-label status-offline">Offline</span>
          </div>
        </div>
        <div class="test-grid" style="margin-top: 1.5rem;">
          <div class="test-item">
            <DssAvatar status="online" icon="person" color="primary" size="lg" />
            <code>status + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar status="away" icon="face" color="secondary" size="lg" />
            <code>status + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar status="busy" icon="account_circle" color="accent" size="lg" />
            <code>status + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar status="offline" icon="group" color="info" size="lg" />
            <code>status + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 6: ACESSIBILIDADE (aria-label) ========== -->
      <section class="test-section highlight-section">
        <h2>6. Acessibilidade WCAG 2.1 AA (aria-label)</h2>
        <p class="section-info">Nova prop aria-label para suporte a screen readers</p>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar
              icon="person"
              color="primary"
              size="lg"
              aria-label="Avatar de Joao Silva"
            />
            <code>aria-label="Avatar de Joao Silva"</code>
          </div>
          <div class="test-item">
            <DssAvatar
              color="secondary"
              size="lg"
              aria-label="Usuario Alice Brown"
              @click="handleAvatarClick"
              style="cursor: pointer;"
            >AB</DssAvatar>
            <code>aria-label + @click</code>
          </div>
          <div class="test-item">
            <DssAvatar
              status="online"
              color="positive"
              size="lg"
              aria-label="Maria Kim - Online"
            >MK</DssAvatar>
            <code>aria-label + status</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 7: FORMAS (circular, square, rounded) ========== -->
      <section class="test-section">
        <h2>7. Formas (circular, square, rounded)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary" size="lg">JD</DssAvatar>
            <code>circular (default)</code>
          </div>
          <div class="test-item">
            <DssAvatar square color="secondary" size="lg">AB</DssAvatar>
            <code>square</code>
          </div>
          <div class="test-item">
            <DssAvatar rounded color="accent" size="lg">XY</DssAvatar>
            <code>rounded</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 8: FORMAS COM ICONES ========== -->
      <section class="test-section">
        <h2>8. Formas com Icones</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" size="lg" />
            <code>circular + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="business" color="secondary" size="lg" />
            <code>square + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar rounded icon="group" color="accent" size="lg" />
            <code>rounded + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 9: ICONES MATERIAL (VARIADOS) ========== -->
      <section class="test-section">
        <h2>9. Icones Material Diversos</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" />
            <code>icon="person"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="account_circle" color="secondary" />
            <code>icon="account_circle"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="face" color="accent" />
            <code>icon="face"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="group" color="positive" />
            <code>icon="group"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="business" color="info" />
            <code>icon="business"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="work" color="warning" />
            <code>icon="work"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="admin_panel_settings" color="negative" />
            <code>icon="admin_panel_settings"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="supervised_user_circle" color="tertiary" />
            <code>icon="supervised_user_circle"</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 10: FONT SIZE CUSTOMIZADO ========== -->
      <section class="test-section">
        <h2>10. Font Size Customizado</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary" size="lg" font-size="12px">S</DssAvatar>
            <code>fontSize="12px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="lg" font-size="16px">M</DssAvatar>
            <code>fontSize="16px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" size="lg" font-size="24px">L</DssAvatar>
            <code>fontSize="24px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="lg" font-size="32px">XL</DssAvatar>
            <code>fontSize="32px"</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 11: TEXT COLOR OVERRIDE ========== -->
      <section class="test-section">
        <h2>11. Text Color Override</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary" text-color="white">WT</DssAvatar>
            <code>text-color="white"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" text-color="black">BK</DssAvatar>
            <code>text-color="black"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" text-color="negative">RD</DssAvatar>
            <code>text-color="negative"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="person" color="positive" text-color="primary" />
            <code>icon + text-color</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 12: COMBINACAO BRAND + STATUS ========== -->
      <section class="test-section highlight-section">
        <h2>12. Combinacao Brand + Status (Caso de Uso Real)</h2>
        <p class="section-info">Demonstracao de avatares com brand e status combinados</p>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar brand="hub" status="online" size="lg">HB</DssAvatar>
            <code>brand="hub" + status="online"</code>
          </div>
          <div class="test-item">
            <DssAvatar brand="water" status="away" size="lg">WT</DssAvatar>
            <code>brand="water" + status="away"</code>
          </div>
          <div class="test-item">
            <DssAvatar brand="waste" status="busy" size="lg">WS</DssAvatar>
            <code>brand="waste" + status="busy"</code>
          </div>
          <div class="test-item">
            <DssAvatar brand="hub" status="offline" icon="person" size="lg" />
            <code>brand + status + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 13: AVATAR GROUP (SOBREPOSICAO) ========== -->
      <section class="test-section">
        <h2>13. Avatar Group (Sobreposicao)</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar color="primary">JD</DssAvatar>
            <DssAvatar color="secondary">AB</DssAvatar>
            <DssAvatar color="accent">XY</DssAvatar>
            <DssAvatar color="positive">MK</DssAvatar>
            <DssAvatar color="info">+5</DssAvatar>
          </div>
          <code>dss-avatar-group</code>
        </div>
      </section>

      <!-- ========== SECAO 14: AVATAR GROUP COM ICONES ========== -->
      <section class="test-section">
        <h2>14. Avatar Group com Icones</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar icon="person" color="primary" />
            <DssAvatar icon="face" color="secondary" />
            <DssAvatar icon="account_circle" color="accent" />
            <DssAvatar icon="group" color="positive" />
            <DssAvatar color="info">+12</DssAvatar>
          </div>
          <code>group + icons</code>
        </div>
      </section>

      <!-- ========== SECAO 15: AVATAR GROUP COM STATUS ========== -->
      <section class="test-section">
        <h2>15. Avatar Group com Status</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar status="online" color="primary">JD</DssAvatar>
            <DssAvatar status="online" color="secondary">AB</DssAvatar>
            <DssAvatar status="away" color="accent">XY</DssAvatar>
            <DssAvatar status="busy" color="positive">MK</DssAvatar>
            <DssAvatar status="offline" color="info">+3</DssAvatar>
          </div>
          <code>group + status indicators</code>
        </div>
      </section>

      <!-- ========== SECAO 16: AVATARS EM LISTA DE USUARIOS ========== -->
      <section class="test-section">
        <h2>16. Avatars em Lista de Usuarios (com Status DSS)</h2>
        <div class="list-demo">
          <div class="list-item">
            <DssAvatar status="online" color="primary" aria-label="John Doe - Online">JD</DssAvatar>
            <div class="user-info">
              <strong>John Doe</strong>
              <p>Software Engineer</p>
            </div>
            <DssBadge color="positive" label="Online" />
          </div>
          <div class="list-item">
            <DssAvatar status="away" icon="person" color="secondary" aria-label="Alice Brown - Ausente" />
            <div class="user-info">
              <strong>Alice Brown</strong>
              <p>Product Manager</p>
            </div>
            <DssBadge color="warning" label="Away" />
          </div>
          <div class="list-item">
            <DssAvatar status="busy" color="accent" aria-label="Xavier Young - Ocupado">XY</DssAvatar>
            <div class="user-info">
              <strong>Xavier Young</strong>
              <p>UX Designer</p>
            </div>
            <DssBadge color="negative" label="Busy" />
          </div>
          <div class="list-item">
            <DssAvatar status="offline" icon="face" color="positive" aria-label="Maria Kim - Offline" />
            <div class="user-info">
              <strong>Maria Kim</strong>
              <p>Frontend Developer</p>
            </div>
            <DssBadge color="info" label="Offline" />
          </div>
        </div>
      </section>

      <!-- ========== SECAO 17: AVATARS QUADRADOS (LOGOS) ========== -->
      <section class="test-section">
        <h2>17. Avatars Quadrados para Logos/Empresas</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar square icon="business" color="primary" size="lg" />
            <code>square company 1</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="work" color="secondary" size="lg" />
            <code>square company 2</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="corporate_fare" color="accent" size="lg" />
            <code>square company 3</code>
          </div>
          <div class="test-item">
            <DssAvatar square color="positive" size="lg">CO</DssAvatar>
            <code>square initials</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 18: AVATARS COM SLOTS (CONTEUDO CUSTOMIZADO) ========== -->
      <section class="test-section">
        <h2>18. Avatars com Slots (Conteudo Customizado)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">
              <strong>JD</strong>
            </DssAvatar>
            <code>slot: &lt;strong&gt;</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary">
              <span style="font-size: 24px;">&#128100;</span>
            </DssAvatar>
            <code>slot: emoji</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">
              <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px;">
                <div>J</div>
                <div>D</div>
              </div>
            </DssAvatar>
            <code>slot: complex</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 19: TAMANHOS CUSTOMIZADOS (UNIDADES DIFERENTES) ========== -->
      <section class="test-section">
        <h2>19. Tamanhos Customizados (diferentes unidades CSS)</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar color="primary" size="3rem">3R</DssAvatar>
            <code>size="3rem"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="4em">4E</DssAvatar>
            <code>size="4em"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" size="100px">PX</DssAvatar>
            <code>size="100px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="10vh">VH</DssAvatar>
            <code>size="10vh"</code>
          </div>
        </div>
      </section>

      <!-- ========== SECAO 20: STRESS TEST (RENDERIZACAO) ========== -->
      <section class="test-section">
        <h2>20. Stress Test (renderizacao de multiplos avatars)</h2>
        <div class="stress-test">
          <DssAvatar
            v-for="n in 30"
            :key="n"
            :color="colors[n % colors.length]"
          >
            {{ n }}
          </DssAvatar>
        </div>
      </section>

      <!-- ========== SECAO 21: STRESS TEST COM ICONES ========== -->
      <section class="test-section">
        <h2>21. Stress Test com Icones</h2>
        <div class="stress-test">
          <DssAvatar
            v-for="n in 30"
            :key="n"
            :icon="icons[n % icons.length]"
            :color="colors[n % colors.length]"
          />
        </div>
      </section>

      <!-- ========== SECAO 22: STRESS TEST COM STATUS ========== -->
      <section class="test-section">
        <h2>22. Stress Test com Status</h2>
        <div class="stress-test">
          <DssAvatar
            v-for="n in 20"
            :key="n"
            :status="statuses[n % statuses.length]"
            :color="colors[n % colors.length]"
          >
            {{ n }}
          </DssAvatar>
        </div>
      </section>

      <!-- ========== SECAO 23: AVATAR GROUP GRANDE ========== -->
      <section class="test-section">
        <h2>23. Avatar Group Grande (muitos usuarios)</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar v-for="n in 8" :key="n" :color="colors[n % colors.length]">
              {{ String.fromCharCode(65 + n) }}{{ String.fromCharCode(66 + n) }}
            </DssAvatar>
            <DssAvatar color="info">+25</DssAvatar>
          </div>
          <code>large avatar group</code>
        </div>
      </section>

      <!-- ========== SECAO 24: TOKENS DSS UTILIZADOS ========== -->
      <section class="test-section tokens-section">
        <h2>24. Tokens DSS Utilizados pelo DssAvatar</h2>
        <p class="section-info">Referencia dos tokens DSS aplicados no componente</p>
        <div class="tokens-grid">
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-positive, #21BA45);"></div>
            <code>--dss-positive</code>
            <span>Status Online</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-warning, #F2C037);"></div>
            <code>--dss-warning</code>
            <span>Status Away</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-negative, #C10015);"></div>
            <code>--dss-negative</code>
            <span>Status Busy</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-neutral-400, #9E9E9E);"></div>
            <code>--dss-neutral-400</code>
            <span>Status Offline</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-brand-hub-primary, #F7931E);"></div>
            <code>--dss-brand-hub-primary</code>
            <span>Brand Hub</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-brand-water-primary, #0074BD);"></div>
            <code>--dss-brand-water-primary</code>
            <span>Brand Water</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-brand-waste-primary, #00A651);"></div>
            <code>--dss-brand-waste-primary</code>
            <span>Brand Waste</span>
          </div>
          <div class="token-item">
            <div class="token-swatch" style="background: var(--dss-border-radius-full, 9999px); width: 32px; height: 32px; border-radius: 50%;"></div>
            <code>--dss-border-radius-full</code>
            <span>Circular</span>
          </div>
        </div>
      </section>

    </main>

    <footer class="test-footer">
      <p>Teste completo de DssAvatar - Design System Sansys v2.3.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']
const icons = ['person', 'account_circle', 'face', 'group', 'business', 'work', 'supervised_user_circle', 'admin_panel_settings']
const statuses = ['online', 'away', 'busy', 'offline']
const brands = ['hub', 'water', 'waste']

const handleAvatarClick = (event) => {
  console.log('Avatar clicado!', event)
  alert('Avatar clicado! Evento @click funcionando.')
}
</script>

<style scoped>
/* ========================================
   CSS USANDO TOKENS DSS
   ======================================== */
.test-container {
  min-height: 100vh;
  background: var(--dss-surface-background, #f5f5f5);
}

.test-header {
  background: linear-gradient(135deg, var(--dss-action-primary, #1976D2) 0%, var(--dss-action-primary-hover, #1565C0) 100%);
  color: var(--dss-text-on-primary, white);
  padding: var(--dss-spacing-8, 2rem);
  text-align: center;
  box-shadow: var(--dss-shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
}

.test-header h1 {
  margin: 0 0 var(--dss-spacing-2, 0.5rem) 0;
  font-size: var(--dss-font-size-2xl, 2rem);
  font-weight: var(--dss-font-weight-bold, 700);
}

.test-header p {
  margin: 0;
  opacity: 0.95;
}

.test-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--dss-spacing-8, 2rem);
}

.test-section {
  background: var(--dss-surface-default, white);
  border-radius: var(--dss-border-radius-lg, 12px);
  padding: var(--dss-spacing-8, 2rem);
  margin-bottom: var(--dss-spacing-8, 2rem);
  box-shadow: var(--dss-shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08));
}

.test-section.highlight-section {
  border: 2px solid var(--dss-action-primary, #1976D2);
  box-shadow: var(--dss-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
}

.test-section h2 {
  margin: 0 0 var(--dss-spacing-4, 1rem) 0;
  font-size: var(--dss-font-size-lg, 1.25rem);
  font-weight: var(--dss-font-weight-semibold, 600);
  color: var(--dss-text-primary, #333);
  border-left: 4px solid var(--dss-action-primary, #1976D2);
  padding-left: var(--dss-spacing-4, 1rem);
}

.section-info {
  margin: 0 0 var(--dss-spacing-4, 1rem) 0;
  padding: var(--dss-spacing-3, 0.75rem) var(--dss-spacing-4, 1rem);
  background: var(--dss-surface-elevated, #E3F2FD);
  border-radius: var(--dss-border-radius-md, 8px);
  color: var(--dss-text-secondary, #555);
  font-size: var(--dss-font-size-sm, 0.875rem);
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dss-spacing-6, 1.5rem);
}

.test-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2, 0.5rem);
  padding: var(--dss-spacing-4, 1rem);
  background: var(--dss-surface-subtle, #fafafa);
  border-radius: var(--dss-border-radius-md, 8px);
  border: 1px solid var(--dss-border-default, #e0e0e0);
}

.test-item code {
  font-size: var(--dss-font-size-xs, 0.75rem);
  color: var(--dss-text-secondary, #666);
  background: var(--dss-surface-default, #fff);
  padding: var(--dss-spacing-1, 0.25rem) var(--dss-spacing-2, 0.5rem);
  border-radius: var(--dss-border-radius-sm, 4px);
  border: 1px solid var(--dss-border-light, #ddd);
  font-family: 'Courier New', monospace;
  text-align: center;
}

/* ========================================
   BRAND DEMO STYLES (usando tokens DSS)
   ======================================== */
.brand-demo {
  position: relative;
}

.brand-label {
  padding: var(--dss-spacing-1, 0.25rem) var(--dss-spacing-2, 0.5rem);
  border-radius: var(--dss-border-radius-sm, 4px);
  font-size: var(--dss-font-size-xs, 0.75rem);
  font-weight: var(--dss-font-weight-medium, 500);
}

.brand-label.brand-hub {
  background: var(--dss-brand-hub-primary, #F7931E);
  color: var(--dss-text-on-primary, white);
}

.brand-label.brand-water {
  background: var(--dss-brand-water-primary, #0074BD);
  color: var(--dss-text-on-primary, white);
}

.brand-label.brand-waste {
  background: var(--dss-brand-waste-primary, #00A651);
  color: var(--dss-text-on-primary, white);
}

/* ========================================
   STATUS DEMO STYLES (usando tokens DSS)
   ======================================== */
.status-demo {
  position: relative;
}

.status-label {
  padding: var(--dss-spacing-1, 0.25rem) var(--dss-spacing-2, 0.5rem);
  border-radius: var(--dss-border-radius-sm, 4px);
  font-size: var(--dss-font-size-xs, 0.75rem);
  font-weight: var(--dss-font-weight-medium, 500);
}

.status-label.status-online {
  background: var(--dss-positive, #21BA45);
  color: var(--dss-text-on-primary, white);
}

.status-label.status-away {
  background: var(--dss-warning, #F2C037);
  color: var(--dss-text-primary, #333);
}

.status-label.status-busy {
  background: var(--dss-negative, #C10015);
  color: var(--dss-text-on-primary, white);
}

.status-label.status-offline {
  background: var(--dss-neutral-400, #9E9E9E);
  color: var(--dss-text-on-primary, white);
}

/* ========================================
   LIST DEMO STYLES
   ======================================== */
.list-demo {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4, 1rem);
}

.list-item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-4, 1rem);
  padding: var(--dss-spacing-4, 1rem);
  background: var(--dss-surface-subtle, #fafafa);
  border-radius: var(--dss-border-radius-md, 8px);
  border: 1px solid var(--dss-border-default, #e0e0e0);
}

.user-info {
  flex: 1;
}

.user-info strong {
  display: block;
  color: var(--dss-text-primary, #333);
  margin-bottom: var(--dss-spacing-1, 0.25rem);
}

.user-info p {
  margin: 0;
  color: var(--dss-text-secondary, #666);
  font-size: var(--dss-font-size-sm, 0.875rem);
}

/* ========================================
   TOKENS SECTION STYLES
   ======================================== */
.tokens-section {
  background: linear-gradient(135deg, var(--dss-surface-default, white) 0%, var(--dss-surface-subtle, #fafafa) 100%);
}

.tokens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--dss-spacing-4, 1rem);
}

.token-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2, 0.5rem);
  padding: var(--dss-spacing-4, 1rem);
  background: var(--dss-surface-default, white);
  border-radius: var(--dss-border-radius-md, 8px);
  border: 1px solid var(--dss-border-default, #e0e0e0);
}

.token-swatch {
  width: 48px;
  height: 48px;
  border-radius: var(--dss-border-radius-md, 8px);
  border: 2px solid var(--dss-border-default, #e0e0e0);
}

.token-item code {
  font-size: var(--dss-font-size-xs, 0.7rem);
  color: var(--dss-text-secondary, #666);
  background: var(--dss-surface-subtle, #f5f5f5);
  padding: var(--dss-spacing-1, 0.25rem) var(--dss-spacing-2, 0.5rem);
  border-radius: var(--dss-border-radius-sm, 4px);
  text-align: center;
}

.token-item span {
  font-size: var(--dss-font-size-xs, 0.75rem);
  color: var(--dss-text-secondary, #888);
}

/* ========================================
   STRESS TEST STYLES
   ======================================== */
.stress-test {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-2, 0.5rem);
  padding: var(--dss-spacing-4, 1rem);
  background: var(--dss-surface-subtle, #fafafa);
  border-radius: var(--dss-border-radius-md, 8px);
  align-items: center;
}

/* ========================================
   FOOTER STYLES
   ======================================== */
.test-footer {
  background: var(--dss-surface-dark, #333);
  color: var(--dss-text-on-dark, white);
  text-align: center;
  padding: var(--dss-spacing-6, 1.5rem);
}

.test-footer p {
  margin: 0;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */
@media (max-width: 768px) {
  .test-grid {
    grid-template-columns: 1fr;
  }

  .tokens-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
