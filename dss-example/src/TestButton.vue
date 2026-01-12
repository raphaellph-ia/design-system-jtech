<template>
  <div class="test-container">
    <header class="test-header">
      <h1>🔘 DssButton - Teste Completo de Variações</h1>
      <p>Todas as combinações possíveis de props, variantes, cores, tamanhos e estados</p>
    </header>

    <main class="test-content">
      <!-- ========== SEÇÃO 1: VARIANTES VISUAIS ========== -->
      <section class="test-section">
        <h2>1. Variantes Visuais (6 tipos)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton variant="elevated" color="primary">Elevated</DssButton>
            <code>variant="elevated"</code>
          </div>
          <div class="test-item">
            <DssButton variant="flat" color="primary">Flat</DssButton>
            <code>variant="flat"</code>
          </div>
          <div class="test-item">
            <DssButton variant="outline" color="primary">Outline</DssButton>
            <code>variant="outline"</code>
          </div>
          <div class="test-item">
            <DssButton variant="unelevated" color="primary">Unelevated</DssButton>
            <code>variant="unelevated"</code>
          </div>
          <div class="test-item">
            <DssButton variant="push" color="primary">Push</DssButton>
            <code>variant="push"</code>
          </div>
          <div class="test-item">
            <DssButton variant="glossy" color="primary">Glossy ✨</DssButton>
            <code>variant="glossy"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 2: CORES (8 SEMÂNTICAS) ========== -->
      <section class="test-section">
        <h2>2. Cores Semânticas (8 variantes)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton color="primary">Primary</DssButton>
            <code>color="primary"</code>
          </div>
          <div class="test-item">
            <DssButton color="secondary">Secondary</DssButton>
            <code>color="secondary"</code>
          </div>
          <div class="test-item">
            <DssButton color="tertiary">Tertiary</DssButton>
            <code>color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssButton color="accent">Accent</DssButton>
            <code>color="accent"</code>
          </div>
          <div class="test-item">
            <DssButton color="positive">Positive</DssButton>
            <code>color="positive"</code>
          </div>
          <div class="test-item">
            <DssButton color="negative">Negative</DssButton>
            <code>color="negative"</code>
          </div>
          <div class="test-item">
            <DssButton color="warning">Warning</DssButton>
            <code>color="warning"</code>
          </div>
          <div class="test-item">
            <DssButton color="info">Info</DssButton>
            <code>color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 3: TAMANHOS (5 OPÇÕES) ========== -->
      <section class="test-section">
        <h2>3. Tamanhos (xs, sm, md, lg, xl)</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssButton size="xs">Extra Small</DssButton>
            <code>size="xs"</code>
          </div>
          <div class="test-item">
            <DssButton size="sm">Small</DssButton>
            <code>size="sm"</code>
          </div>
          <div class="test-item">
            <DssButton size="md">Medium</DssButton>
            <code>size="md" (default)</code>
          </div>
          <div class="test-item">
            <DssButton size="lg">Large</DssButton>
            <code>size="lg"</code>
          </div>
          <div class="test-item">
            <DssButton size="xl">Extra Large</DssButton>
            <code>size="xl"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 4: ÍCONES (LEFT, RIGHT, BOTH) ========== -->
      <section class="test-section">
        <h2>4. Ícones Material (left, right, both)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton icon="favorite" label="Ícone Left" />
            <code>icon="favorite"</code>
          </div>
          <div class="test-item">
            <DssButton icon-right="send" label="Ícone Right" />
            <code>icon-right="send"</code>
          </div>
          <div class="test-item">
            <DssButton icon="arrow_back" icon-right="arrow_forward" label="Ambos" />
            <code>icon + icon-right</code>
          </div>
          <div class="test-item">
            <DssButton icon="star" />
            <code>Apenas ícone</code>
          </div>
          <div class="test-item">
            <DssButton icon="delete" color="negative" />
            <code>Icon only negative</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 5: ESTADOS (LOADING, DISABLED) ========== -->
      <section class="test-section">
        <h2>5. Estados (loading, disabled)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton :loading="true">Loading</DssButton>
            <code>:loading="true"</code>
          </div>
          <div class="test-item">
            <DssButton :disabled="true">Disabled</DssButton>
            <code>:disabled="true"</code>
          </div>
          <div class="test-item">
            <DssButton :loading="true" icon="cloud_upload">Uploading</DssButton>
            <code>loading + icon</code>
          </div>
          <div class="test-item">
            <DssButton :disabled="true" icon="lock">Locked</DssButton>
            <code>disabled + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 6: LOADING COM PERCENTAGE ========== -->
      <section class="test-section">
        <h2>6. Loading com Percentage (barra de progresso)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton :loading="true" :percentage="25">25% Completo</DssButton>
            <code>percentage="25"</code>
          </div>
          <div class="test-item">
            <DssButton :loading="true" :percentage="50" color="info">50% Completo</DssButton>
            <code>percentage="50"</code>
          </div>
          <div class="test-item">
            <DssButton :loading="true" :percentage="75" color="positive">75% Completo</DssButton>
            <code>percentage="75"</code>
          </div>
          <div class="test-item">
            <DssButton :loading="true" :percentage="100" color="positive">Completo!</DssButton>
            <code>percentage="100"</code>
          </div>
          <div class="test-item">
            <DssButton :loading="true" :percentage="65" dark-percentage>65% Dark</DssButton>
            <code>dark-percentage</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 7: RIPPLE EFFECT ========== -->
      <section class="test-section">
        <h2>7. Ripple Effect (Material Design)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton :ripple="true">Com Ripple Vertical ✨</DssButton>
            <code>:ripple="true"</code>
          </div>
          <div class="test-item">
            <DssButton>Sem Ripple (default)</DssButton>
            <code>:ripple="false" (padrão)</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 8: LAYOUT - ALIGN ========== -->
      <section class="test-section">
        <h2>8. Layout - Align (alinhamento horizontal)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton align="left" icon="menu" label="Left" style="width: 200px;" />
            <code>align="left"</code>
          </div>
          <div class="test-item">
            <DssButton align="center" icon="star" label="Center" style="width: 200px;" />
            <code>align="center"</code>
          </div>
          <div class="test-item">
            <DssButton align="right" icon-right="arrow_forward" label="Right" style="width: 200px;" />
            <code>align="right"</code>
          </div>
          <div class="test-item">
            <DssButton align="between" icon="save" icon-right="cloud" label="Between" style="width: 250px;" />
            <code>align="between"</code>
          </div>
          <div class="test-item">
            <DssButton align="around" icon="star" icon-right="favorite" label="Around" style="width: 250px;" />
            <code>align="around"</code>
          </div>
          <div class="test-item">
            <DssButton align="evenly" icon="home" icon-right="person" label="Evenly" style="width: 250px;" />
            <code>align="evenly"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 9: LAYOUT - STACK ========== -->
      <section class="test-section">
        <h2>9. Layout - Stack (ícone acima do label)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton stack icon="cloud_upload" label="Upload" />
            <code>stack icon="cloud_upload"</code>
          </div>
          <div class="test-item">
            <DssButton stack icon="download" label="Download" color="info" />
            <code>stack icon="download"</code>
          </div>
          <div class="test-item">
            <DssButton stack icon="favorite" label="Favoritar" color="negative" />
            <code>stack icon="favorite"</code>
          </div>
          <div class="test-item">
            <DssButton stack icon="share" label="Compartilhar" color="accent" />
            <code>stack icon="share"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 10: LAYOUT - STRETCH ========== -->
      <section class="test-section">
        <h2>10. Layout - Stretch (full-width)</h2>
        <div class="test-grid" style="grid-template-columns: 1fr;">
          <div class="test-item">
            <DssButton stretch>Botão Full-Width</DssButton>
            <code>stretch (width: 100%)</code>
          </div>
          <div class="test-item">
            <DssButton stretch icon="save" label="Salvar Alterações" color="positive" />
            <code>stretch + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 11: LAYOUT - NO WRAP ========== -->
      <section class="test-section">
        <h2>11. Layout - No Wrap (sem quebra de texto)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton no-wrap style="max-width: 150px;">Texto muito longo que não vai quebrar</DssButton>
            <code>no-wrap (ellipsis)</code>
          </div>
          <div class="test-item">
            <DssButton style="max-width: 150px;">Texto longo que vai quebrar normalmente</DssButton>
            <code>sem no-wrap</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 12: PADDING CUSTOMIZADO ========== -->
      <section class="test-section">
        <h2>12. Padding Customizado</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton padding="4px 8px" size="xs">Padding Pequeno</DssButton>
            <code>padding="4px 8px"</code>
          </div>
          <div class="test-item">
            <DssButton padding="20px 40px">Padding Grande</DssButton>
            <code>padding="20px 40px"</code>
          </div>
          <div class="test-item">
            <DssButton padding="8px 60px">Padding Largo</DssButton>
            <code>padding="8px 60px"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 13: FORMAS (ROUND, SQUARE) ========== -->
      <section class="test-section">
        <h2>13. Formas (round, square)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton>Padrão</DssButton>
            <code>padrão (rounded)</code>
          </div>
          <div class="test-item">
            <DssButton round>Round Button</DssButton>
            <code>round</code>
          </div>
          <div class="test-item">
            <DssButton square>Square Button</DssButton>
            <code>square</code>
          </div>
          <div class="test-item">
            <DssButton round icon="favorite" />
            <code>round icon-only</code>
          </div>
          <div class="test-item">
            <DssButton square icon="star" />
            <code>square icon-only</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 14: DENSE E NO-CAPS ========== -->
      <section class="test-section">
        <h2>14. Dense e No-Caps</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton dense>Compact Button</DssButton>
            <code>dense (versão compacta)</code>
          </div>
          <div class="test-item">
            <DssButton no-caps>Texto Normal</DssButton>
            <code>no-caps (sem uppercase)</code>
          </div>
          <div class="test-item">
            <DssButton dense no-caps>Dense + No Caps</DssButton>
            <code>dense + no-caps</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 15: TABINDEX (ACESSIBILIDADE) ========== -->
      <section class="test-section">
        <h2>15. Tabindex (navegação por teclado)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton :tabindex="1">Primeiro (Tab 1)</DssButton>
            <code>:tabindex="1"</code>
          </div>
          <div class="test-item">
            <DssButton :tabindex="2">Segundo (Tab 2)</DssButton>
            <code>:tabindex="2"</code>
          </div>
          <div class="test-item">
            <DssButton :tabindex="3">Terceiro (Tab 3)</DssButton>
            <code>:tabindex="3"</code>
          </div>
          <div class="test-item">
            <DssButton :tabindex="-1">Não Focável</DssButton>
            <code>:tabindex="-1"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 16: BRANDABILIDADE (HUB, WATER, WASTE) ========== -->
      <section class="test-section">
        <h2>16. Brandabilidade (hub 🟠, water 🔵, waste 🟢)</h2>

        <!-- 16.1. HUB Brand - Variantes -->
        <h3 style="margin-top: 2rem; color: #ef7a11;">🟠 Hub Brand - Variantes</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="hub" variant="elevated">Hub Elevated</DssButton>
            <code>brand="hub" variant="elevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" variant="flat">Hub Flat</DssButton>
            <code>brand="hub" variant="flat"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" variant="outline">Hub Outline</DssButton>
            <code>brand="hub" variant="outline"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" variant="unelevated">Hub Unelevated</DssButton>
            <code>brand="hub" variant="unelevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" variant="push">Hub Push</DssButton>
            <code>brand="hub" variant="push"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" variant="glossy">Hub Glossy ✨</DssButton>
            <code>brand="hub" variant="glossy"</code>
          </div>
        </div>

        <!-- 16.2. HUB Brand - Tamanhos -->
        <h3 style="margin-top: 1.5rem; color: #ef7a11;">🟠 Hub Brand - Tamanhos</h3>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssButton brand="hub" size="xs">Hub XS</DssButton>
            <code>brand="hub" size="xs"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" size="sm">Hub SM</DssButton>
            <code>brand="hub" size="sm"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" size="md">Hub MD</DssButton>
            <code>brand="hub" size="md"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" size="lg">Hub LG</DssButton>
            <code>brand="hub" size="lg"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" size="xl">Hub XL</DssButton>
            <code>brand="hub" size="xl"</code>
          </div>
        </div>

        <!-- 16.3. HUB Brand - Com Ícones -->
        <h3 style="margin-top: 1.5rem; color: #ef7a11;">🟠 Hub Brand - Com Ícones</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="hub" icon="home">Hub com Ícone</DssButton>
            <code>brand="hub" icon="home"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" icon-right="arrow_forward">Hub Ícone Right</DssButton>
            <code>brand="hub" icon-right="arrow_forward"</code>
          </div>
          <div class="test-item">
            <DssButton brand="hub" round icon="favorite" />
            <code>brand="hub" round icon-only</code>
          </div>
        </div>

        <!-- 16.4. WATER Brand - Variantes -->
        <h3 style="margin-top: 2rem; color: #0e88e4;">🔵 Water Brand - Variantes</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="water" variant="elevated">Water Elevated</DssButton>
            <code>brand="water" variant="elevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" variant="flat">Water Flat</DssButton>
            <code>brand="water" variant="flat"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" variant="outline">Water Outline</DssButton>
            <code>brand="water" variant="outline"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" variant="unelevated">Water Unelevated</DssButton>
            <code>brand="water" variant="unelevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" variant="push">Water Push</DssButton>
            <code>brand="water" variant="push"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" variant="glossy">Water Glossy ✨</DssButton>
            <code>brand="water" variant="glossy"</code>
          </div>
        </div>

        <!-- 16.5. WATER Brand - Tamanhos -->
        <h3 style="margin-top: 1.5rem; color: #0e88e4;">🔵 Water Brand - Tamanhos</h3>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssButton brand="water" size="xs">Water XS</DssButton>
            <code>brand="water" size="xs"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" size="sm">Water SM</DssButton>
            <code>brand="water" size="sm"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" size="md">Water MD</DssButton>
            <code>brand="water" size="md"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" size="lg">Water LG</DssButton>
            <code>brand="water" size="lg"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" size="xl">Water XL</DssButton>
            <code>brand="water" size="xl"</code>
          </div>
        </div>

        <!-- 16.6. WATER Brand - Com Ícones -->
        <h3 style="margin-top: 1.5rem; color: #0e88e4;">🔵 Water Brand - Com Ícones</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="water" icon="water_drop">Water com Ícone</DssButton>
            <code>brand="water" icon="water_drop"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" icon-right="arrow_forward">Water Ícone Right</DssButton>
            <code>brand="water" icon-right="arrow_forward"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water" round icon="water" />
            <code>brand="water" round icon-only</code>
          </div>
        </div>

        <!-- 16.7. WASTE Brand - Variantes -->
        <h3 style="margin-top: 2rem; color: #0b8154;">🟢 Waste Brand - Variantes</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="waste" variant="elevated">Waste Elevated</DssButton>
            <code>brand="waste" variant="elevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" variant="flat">Waste Flat</DssButton>
            <code>brand="waste" variant="flat"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" variant="outline">Waste Outline</DssButton>
            <code>brand="waste" variant="outline"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" variant="unelevated">Waste Unelevated</DssButton>
            <code>brand="waste" variant="unelevated"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" variant="push">Waste Push</DssButton>
            <code>brand="waste" variant="push"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" variant="glossy">Waste Glossy ✨</DssButton>
            <code>brand="waste" variant="glossy"</code>
          </div>
        </div>

        <!-- 16.8. WASTE Brand - Tamanhos -->
        <h3 style="margin-top: 1.5rem; color: #0b8154;">🟢 Waste Brand - Tamanhos</h3>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssButton brand="waste" size="xs">Waste XS</DssButton>
            <code>brand="waste" size="xs"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" size="sm">Waste SM</DssButton>
            <code>brand="waste" size="sm"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" size="md">Waste MD</DssButton>
            <code>brand="waste" size="md"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" size="lg">Waste LG</DssButton>
            <code>brand="waste" size="lg"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" size="xl">Waste XL</DssButton>
            <code>brand="waste" size="xl"</code>
          </div>
        </div>

        <!-- 16.9. WASTE Brand - Com Ícones -->
        <h3 style="margin-top: 1.5rem; color: #0b8154;">🟢 Waste Brand - Com Ícones</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="waste" icon="recycling">Waste com Ícone</DssButton>
            <code>brand="waste" icon="recycling"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" icon-right="arrow_forward">Waste Ícone Right</DssButton>
            <code>brand="waste" icon-right="arrow_forward"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste" round icon="delete" />
            <code>brand="waste" round icon-only</code>
          </div>
        </div>

        <!-- 16.10. Comparação Direta das 3 Brands -->
        <h3 style="margin-top: 2rem;">⚖️ Comparação Direta - 3 Brands</h3>
        <div class="test-grid">
          <div class="test-item">
            <DssButton brand="hub">Hub</DssButton>
            <code>brand="hub"</code>
          </div>
          <div class="test-item">
            <DssButton brand="water">Water</DssButton>
            <code>brand="water"</code>
          </div>
          <div class="test-item">
            <DssButton brand="waste">Waste</DssButton>
            <code>brand="waste"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 17: COMBINAÇÕES COMPLEXAS ========== -->
      <section class="test-section">
        <h2>17. Combinações Complexas de Props</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssButton variant="glossy" color="positive" size="lg" icon="cloud_upload" label="Upload" />
            <code>glossy + lg + icon</code>
          </div>
          <div class="test-item">
            <DssButton variant="outline" stack icon="download" label="Download" color="info" />
            <code>outline + stack + icon</code>
          </div>
          <div class="test-item">
            <DssButton round icon="favorite" color="negative" size="lg" />
            <code>round + icon + lg</code>
          </div>
          <div class="test-item">
            <DssButton stretch align="between" icon="save" icon-right="cloud" label="Salvar na Nuvem" color="primary" />
            <code>stretch + align + icons</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 18: BOTÕES COM BADGES ========== -->
      <section class="test-section">
        <h2>18. Botões com Badges (notificações)</h2>
        <div class="test-grid" style="gap: 3rem;">
          <div class="test-item">
            <DssButton icon="mail">
              Email
              <DssBadge floating color="primary" label="5" />
            </DssButton>
            <code>button + badge floating</code>
          </div>
          <div class="test-item">
            <DssButton icon="notifications" variant="outline">
              Notificações
              <DssBadge floating color="negative" label="12" />
            </DssButton>
            <code>outline + badge</code>
          </div>
          <div class="test-item">
            <DssButton icon="shopping_cart" variant="flat" color="accent">
              Carrinho
              <DssBadge floating color="accent" label="3" />
            </DssButton>
            <code>flat + badge</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 19: STRESS TEST (RENDERIZAÇÃO) ========== -->
      <section class="test-section">
        <h2>19. Stress Test (renderização de múltiplos botões)</h2>
        <div class="stress-test">
          <DssButton
            v-for="n in 50"
            :key="n"
            :color="colors[n % colors.length]"
            size="sm"
          >
            Botão {{ n }}
          </DssButton>
        </div>
      </section>

      <!-- ========== SEÇÃO 20: TODAS AS VARIANTES × TODAS AS CORES ========== -->
      <section class="test-section">
        <h2>20. Matriz Completa: Variantes × Cores (48 botões)</h2>
        <div v-for="variant in variants" :key="variant" class="variant-section">
          <h3>{{ variant }}</h3>
          <div class="test-grid-small">
            <DssButton
              v-for="color in colors"
              :key="color"
              :variant="variant"
              :color="color"
              size="sm"
            >
              {{ color }}
            </DssButton>
          </div>
        </div>
      </section>

    </main>

    <footer class="test-footer">
      <p>✅ Teste completo de DssButton - Design System Sansys v2.2.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']
const variants = ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy']
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.test-header {
  background: linear-gradient(135deg, #1976D2 0%, #2196F3 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.test-header p {
  margin: 0;
  opacity: 0.95;
}

.test-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.test-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.test-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  border-left: 4px solid #1976D2;
  padding-left: 1rem;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.test-grid-small {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.test-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.test-item code {
  font-size: 0.75rem;
  color: #666;
  background: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-family: 'Courier New', monospace;
  text-align: center;
}

.variant-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
}

.variant-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  text-transform: capitalize;
}

.stress-test {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
}

.test-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1.5rem;
}

.test-footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .test-grid {
    grid-template-columns: 1fr;
  }

  .test-grid-small {
    grid-template-columns: 1fr;
  }
}
</style>
