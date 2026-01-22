<template>
  <div class="tokens-page">
    <!-- Header -->
    <div class="page-header">
      <h1>🎨 Design Tokens</h1>
      <p class="subtitle">Sistema completo de tokens de design do DSS</p>
    </div>

    <!-- Navegação de Categorias -->
    <div class="categories-nav">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="activeCategory = cat.id"
        :class="['category-btn', { active: activeCategory === cat.id }]"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-label">{{ cat.label }}</span>
        <span class="cat-count">{{ cat.count }}</span>
      </button>
    </div>

    <!-- Content Area -->
    <div class="tokens-content">
      <!-- 1. CORES SEMÂNTICAS -->
      <section v-if="activeCategory === 'semantic'" class="token-section">
        <h2>🎨 Cores Semânticas</h2>
        <p class="section-desc">Cores principais do sistema para ações e estados</p>

        <!-- Primary -->
        <div class="token-group">
          <h3>Primary (Azul)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-primary-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-primary-disable</div>
                <div class="token-value">#b3dcff</div>
                <div class="token-usage">Estado desabilitado</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-primary-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-primary-light</div>
                <div class="token-value">#86c0f3</div>
                <div class="token-usage">Background hover flat/outline</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-primary)"></div>
              <div class="token-info">
                <div class="token-name">--dss-primary</div>
                <div class="token-value">#1f86de</div>
                <div class="token-usage">Cor principal</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-primary-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-primary-hover</div>
                <div class="token-value">#0f5295</div>
                <div class="token-usage">Hover elevated/unelevated + texto flat/outline</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-primary-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-primary-deep</div>
                <div class="token-value">#0a3a6a</div>
                <div class="token-usage">Tom mais escuro</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary -->
        <div class="token-group">
          <h3>Secondary (Verde/Turquesa)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-secondary-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-secondary-disable</div>
                <div class="token-value">#b5ece4</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-secondary-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-secondary-light</div>
                <div class="token-value">#6ddbcb</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-secondary)"></div>
              <div class="token-info">
                <div class="token-name">--dss-secondary</div>
                <div class="token-value">#26a69a</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-secondary-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-secondary-hover</div>
                <div class="token-value">#1c857e</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-secondary-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-secondary-deep</div>
                <div class="token-value">#116761</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tertiary -->
        <div class="token-group">
          <h3>Tertiary (Laranja)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-tertiary-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-tertiary-disable</div>
                <div class="token-value">#ffd2b5</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-tertiary-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-tertiary-light</div>
                <div class="token-value">#ff9452</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-tertiary)"></div>
              <div class="token-info">
                <div class="token-name">--dss-tertiary</div>
                <div class="token-value">#ff6607</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-tertiary-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-tertiary-hover</div>
                <div class="token-value">#de5500</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-tertiary-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-tertiary-deep</div>
                <div class="token-value">#ad4200</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Accent -->
        <div class="token-group">
          <h3>Accent (Roxo)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-accent-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-accent-disable</div>
                <div class="token-value">#f0ddf4</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-accent-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-accent-light</div>
                <div class="token-value">#e3bceb</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-accent)"></div>
              <div class="token-info">
                <div class="token-name">--dss-accent</div>
                <div class="token-value">#b454c4</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-accent-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-accent-hover</div>
                <div class="token-value">#883b90</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-accent-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-accent-deep</div>
                <div class="token-value">#642f6a</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. CORES DE FEEDBACK -->
      <section v-if="activeCategory === 'feedback'" class="token-section">
        <h2>✅ Cores de Feedback</h2>
        <p class="section-desc">Cores para estados de sucesso, erro, aviso e informação</p>

        <!-- Positive -->
        <div class="token-group">
          <h3>Positive (Verde)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-positive-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-positive-disable</div>
                <div class="token-value">#dbf8d1</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-positive-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-positive-light</div>
                <div class="token-value">#b9f2a4</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-positive)"></div>
              <div class="token-info">
                <div class="token-name">--dss-positive</div>
                <div class="token-value">#4dd228</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-positive-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-positive-hover</div>
                <div class="token-value">#27910D</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-positive-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-positive-deep</div>
                <div class="token-value">#246714</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Negative -->
        <div class="token-group">
          <h3>Negative (Vermelho)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-negative-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-negative-disable</div>
                <div class="token-value">#ffcfd4</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-negative-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-negative-light</div>
                <div class="token-value">#ffa0ab</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-negative)"></div>
              <div class="token-info">
                <div class="token-name">--dss-negative</div>
                <div class="token-value">#d8182e</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-negative-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-negative-hover</div>
                <div class="token-value">#a01424</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-negative-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-negative-deep</div>
                <div class="token-value">#720e19</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Warning -->
        <div class="token-group">
          <h3>Warning (Amarelo/Laranja)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-warning-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-warning-disable</div>
                <div class="token-value">#fff9c3</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-warning-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-warning-light</div>
                <div class="token-value">#fff488</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-warning)"></div>
              <div class="token-info">
                <div class="token-name">--dss-warning</div>
                <div class="token-value">#fabd14</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-warning-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-warning-hover</div>
                <div class="token-value">#dd8e02</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-warning-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-warning-deep</div>
                <div class="token-value">#a66d08</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="token-group">
          <h3>Info (Azul Claro)</h3>
          <div class="token-grid">
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-info-disable)"></div>
              <div class="token-info">
                <div class="token-name">--dss-info-disable</div>
                <div class="token-value">#d2f6fc</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-info-light)"></div>
              <div class="token-info">
                <div class="token-name">--dss-info-light</div>
                <div class="token-value">#a7effa</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-info)"></div>
              <div class="token-info">
                <div class="token-name">--dss-info</div>
                <div class="token-value">#0cc4e9</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-info-hover)"></div>
              <div class="token-info">
                <div class="token-name">--dss-info-hover</div>
                <div class="token-value">#0c8bae</div>
              </div>
            </div>
            <div class="token-card">
              <div class="token-preview" style="background: var(--dss-info-deep)"></div>
              <div class="token-info">
                <div class="token-name">--dss-info-deep</div>
                <div class="token-value">#0d7491</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. FOCUS (ACCESSIBILITY) -->
      <section v-if="activeCategory === 'focus'" class="token-section">
        <h2>🎯 Focus Tokens (Acessibilidade)</h2>
        <p class="section-desc">Anéis de foco compatíveis com WCAG 2.1 AA (mínimo 3:1 de contraste)</p>

        <!-- Semantic Focus -->
        <div class="token-group">
          <h3>Semantic Focus</h3>
          <div class="focus-grid">
            <div class="focus-card" v-for="token in focusSemantic" :key="token.var">
              <div class="focus-preview">
                <button class="focus-demo" :style="`outline: var(--dss-focus-ring-width) solid var(${token.var}); outline-offset: var(--dss-focus-ring-offset);`">
                  Elemento Focado
                </button>
              </div>
              <div class="focus-info">
                <div class="token-name">{{ token.var }}</div>
                <div class="token-value">{{ token.hex }} @ {{ token.opacity }}</div>
                <div class="token-usage">{{ token.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Focus -->
        <div class="token-group">
          <h3>Feedback Focus</h3>
          <div class="focus-grid">
            <div class="focus-card" v-for="token in focusFeedback" :key="token.var">
              <div class="focus-preview">
                <button class="focus-demo" :style="`outline: var(--dss-focus-ring-width) solid var(${token.var}); outline-offset: var(--dss-focus-ring-offset);`">
                  Elemento Focado
                </button>
              </div>
              <div class="focus-info">
                <div class="token-name">{{ token.var }}</div>
                <div class="token-value">{{ token.hex }} @ {{ token.opacity }}</div>
                <div class="token-usage">{{ token.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Neutral Focus -->
        <div class="token-group">
          <h3>Neutral Focus</h3>
          <div class="focus-grid">
            <div class="focus-card" v-for="token in focusNeutral" :key="token.var">
              <div class="focus-preview" :style="token.var.includes('light') ? 'background: #333;' : 'background: #f0f0f0;'">
                <button class="focus-demo" :style="`outline: var(--dss-focus-ring-width) solid var(${token.var}); outline-offset: var(--dss-focus-ring-offset); ${token.var.includes('light') ? 'color: white;' : 'color: #333;'}`">
                  Elemento Focado
                </button>
              </div>
              <div class="focus-info">
                <div class="token-name">{{ token.var }}</div>
                <div class="token-value">{{ token.hex }} @ {{ token.opacity }}</div>
                <div class="token-usage">{{ token.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Brand Focus -->
        <div class="token-group">
          <h3>Brand Focus (Hub, Water, Waste)</h3>
          <div class="focus-grid">
            <div class="focus-card" v-for="token in focusBrands" :key="token.var">
              <div class="focus-preview">
                <button class="focus-demo" :style="`outline: 3px solid ${token.value}; outline-offset: 2px;`">
                  Elemento Focado
                </button>
              </div>
              <div class="focus-info">
                <div class="token-name">{{ token.var }}</div>
                <div class="token-value">{{ token.hex }} @ {{ token.opacity }}</div>
                <div class="token-usage">{{ token.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration -->
        <div class="token-group">
          <h3>Configuration Tokens</h3>
          <div class="config-grid">
            <!-- Ring Width -->
            <div class="config-card" v-if="focusConfig[0]">
              <div class="config-visual">
                <div class="ring-width-demo" style="border: 3px solid #667eea; width: 60px; height: 60px; border-radius: 8px;"></div>
              </div>
              <div class="config-info">
                <div class="token-name">{{ focusConfig[0].var }}</div>
                <div class="token-value">{{ focusConfig[0].value }}</div>
                <div class="token-usage">{{ focusConfig[0].usage }}</div>
              </div>
            </div>

            <!-- Ring Offset -->
            <div class="config-card" v-if="focusConfig[1]">
              <div class="config-visual">
                <div class="offset-container">
                  <div class="offset-inner"></div>
                  <div class="offset-ring"></div>
                </div>
              </div>
              <div class="config-info">
                <div class="token-name">{{ focusConfig[1].var }}</div>
                <div class="token-value">{{ focusConfig[1].value }}</div>
                <div class="token-usage">{{ focusConfig[1].usage }}</div>
              </div>
            </div>

            <!-- Ring Opacity -->
            <div class="config-card" v-if="focusConfig[2]">
              <div class="config-visual">
                <div class="opacity-demo" style="width: 60px; height: 60px; background: rgba(102, 126, 234, 0.5); border-radius: 8px;"></div>
              </div>
              <div class="config-info">
                <div class="token-name">{{ focusConfig[2].var }}</div>
                <div class="token-value">{{ focusConfig[2].value }}</div>
                <div class="token-usage">{{ focusConfig[2].usage }}</div>
              </div>
            </div>

            <!-- Duration -->
            <div class="config-card" v-if="focusConfig[3]">
              <div class="config-visual">
                <div class="duration-icon">⏱️</div>
              </div>
              <div class="config-info">
                <div class="token-name">{{ focusConfig[3].var }}</div>
                <div class="token-value">{{ focusConfig[3].value }}</div>
                <div class="token-usage">{{ focusConfig[3].usage }}</div>
              </div>
            </div>

            <!-- Easing -->
            <div class="config-card" v-if="focusConfig[4]">
              <div class="config-visual">
                <div class="easing-icon">📈</div>
              </div>
              <div class="config-info">
                <div class="token-name">{{ focusConfig[4].var }}</div>
                <div class="token-value">{{ focusConfig[4].value }}</div>
                <div class="token-usage">{{ focusConfig[4].usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- WCAG Info -->
        <div class="wcag-info">
          <h3>📋 Conformidade WCAG 2.1</h3>
          <ul>
            <li><strong>2.4.7 Focus Visible (AA):</strong> Indicador de foco visível com contraste mínimo de 3:1</li>
            <li><strong>Largura do anel:</strong> 3px (recomendado para boa visibilidade)</li>
            <li><strong>Offset:</strong> 2px de distância entre elemento e anel</li>
            <li><strong>Opacidade:</strong> 50% padrão (60% para warning devido ao amarelo)</li>
            <li><strong>Contraste:</strong> Todos os tokens testados com mínimo 3:1</li>
          </ul>
        </div>
      </section>

      <!-- 4. BRANDS -->
      <section v-if="activeCategory === 'brands'" class="token-section">
        <h2>🏢 Brands Sansys</h2>
        <p class="section-desc">Paletas de cores das marcas Hub, Water e Waste</p>

        <!-- Hub -->
        <div class="token-group">
          <h3>Hub (Laranja/Marrom) 🟠</h3>
          <div class="token-grid">
            <div class="token-card" v-for="shade in hubShades" :key="shade.var">
              <div class="token-preview" :style="`background: var(${shade.var})`"></div>
              <div class="token-info">
                <div class="token-name">{{ shade.var }}</div>
                <div class="token-value">{{ shade.hex }}</div>
                <div class="token-usage" v-if="shade.usage">{{ shade.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Water -->
        <div class="token-group">
          <h3>Water (Azul) 🔵</h3>
          <div class="token-grid">
            <div class="token-card" v-for="shade in waterShades" :key="shade.var">
              <div class="token-preview" :style="`background: var(${shade.var})`"></div>
              <div class="token-info">
                <div class="token-name">{{ shade.var }}</div>
                <div class="token-value">{{ shade.hex }}</div>
                <div class="token-usage" v-if="shade.usage">{{ shade.usage }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Waste -->
        <div class="token-group">
          <h3>Waste (Verde) 🟢</h3>
          <div class="token-grid">
            <div class="token-card" v-for="shade in wasteShades" :key="shade.var">
              <div class="token-preview" :style="`background: var(${shade.var})`"></div>
              <div class="token-info">
                <div class="token-name">{{ shade.var }}</div>
                <div class="token-value">{{ shade.hex }}</div>
                <div class="token-usage" v-if="shade.usage">{{ shade.usage }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. GRAYS -->
      <section v-if="activeCategory === 'grays'" class="token-section">
        <h2>⬜ Escala de Cinza</h2>
        <p class="section-desc">Escala de cinza para backgrounds, textos e bordas</p>

        <div class="token-grid">
          <div class="token-card" v-for="gray in grayScale" :key="gray.var">
            <div class="token-preview" :style="`background: var(${gray.var})`"></div>
            <div class="token-info">
              <div class="token-name">{{ gray.var }}</div>
              <div class="token-value">{{ gray.hex }}</div>
              <div class="token-usage" v-if="gray.usage">{{ gray.usage }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. SPACING -->
      <section v-if="activeCategory === 'spacing'" class="token-section">
        <h2>📏 Espaçamento</h2>
        <p class="section-desc">Tokens de espaçamento (padding, margin, gap)</p>

        <div class="spacing-grid">
          <div class="spacing-card" v-for="space in spacingTokens" :key="space.var">
            <div class="spacing-preview">
              <div class="spacing-box" :style="`width: var(${space.var}); height: var(${space.var})`"></div>
            </div>
            <div class="spacing-info">
              <div class="token-name">{{ space.var }}</div>
              <div class="token-value">{{ space.value }}</div>
              <div class="token-usage">{{ space.usage }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. TYPOGRAPHY -->
      <section v-if="activeCategory === 'typography'" class="token-section">
        <h2>✍️ Tipografia</h2>
        <p class="section-desc">Tokens de tamanho de fonte e line-height</p>

        <div class="typo-grid">
          <div class="typo-card" v-for="typo in typographyTokens" :key="typo.var">
            <div class="typo-preview" :style="`font-size: var(${typo.var})`">
              {{ typo.sample }}
            </div>
            <div class="typo-info">
              <div class="token-name">{{ typo.var }}</div>
              <div class="token-value">{{ typo.value }}</div>
              <div class="token-usage">{{ typo.usage }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. BORDER RADIUS -->
      <section v-if="activeCategory === 'radius'" class="token-section">
        <h2>⭕ Border Radius</h2>
        <p class="section-desc">Tokens de arredondamento de bordas</p>

        <div class="radius-grid">
          <div class="radius-card" v-for="rad in radiusTokens" :key="rad.var">
            <div class="radius-preview">
              <div class="radius-box" :style="`border-radius: var(${rad.var})`"></div>
            </div>
            <div class="radius-info">
              <div class="token-name">{{ rad.var }}</div>
              <div class="token-value">{{ rad.value }}</div>
              <div class="token-usage">{{ rad.usage }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Categoria ativa
const activeCategory = ref('semantic')

// Categorias de navegação
const categories = [
  { id: 'semantic', icon: '🎨', label: 'Cores Semânticas', count: 20 },
  { id: 'feedback', icon: '✅', label: 'Feedback', count: 20 },
  { id: 'focus', icon: '🎯', label: 'Focus (A11y)', count: 18 },
  { id: 'brands', icon: '🏢', label: 'Brands', count: 30 },
  { id: 'grays', icon: '⬜', label: 'Cinzas', count: 10 },
  { id: 'spacing', icon: '📏', label: 'Espaçamento', count: 14 },
  { id: 'typography', icon: '✍️', label: 'Tipografia', count: 12 },
  { id: 'radius', icon: '⭕', label: 'Border Radius', count: 6 }
]

// Hub Shades
const hubShades = [
  { var: '--dss-hub-50', hex: '#fff9ed', usage: 'Background muito claro' },
  { var: '--dss-hub-100', hex: '#fef2d6', usage: 'Hover flat/outline' },
  { var: '--dss-hub-200', hex: '#fde2ab' },
  { var: '--dss-hub-300', hex: '#fbcb76' },
  { var: '--dss-hub-400', hex: '#f8aa3f' },
  { var: '--dss-hub-500', hex: '#f5911a' },
  { var: '--dss-hub-600', hex: '#ef7a11', usage: 'Cor principal' },
  { var: '--dss-hub-700', hex: '#bf590f', usage: 'Hover elevated' },
  { var: '--dss-hub-800', hex: '#984614', usage: 'Texto hover flat/outline' },
  { var: '--dss-hub-900', hex: '#7a3614' },
  { var: '--dss-hub-950', hex: '#421d08' }
]

// Water Shades
const waterShades = [
  { var: '--dss-water-50', hex: '#f0f7ff', usage: 'Background muito claro' },
  { var: '--dss-water-100', hex: '#e0eefe', usage: 'Hover flat/outline' },
  { var: '--dss-water-200', hex: '#badefd' },
  { var: '--dss-water-300', hex: '#7dc4fc' },
  { var: '--dss-water-400', hex: '#38a6f8' },
  { var: '--dss-water-500', hex: '#0e88e4', usage: 'Cor principal' },
  { var: '--dss-water-600', hex: '#026cc7', usage: 'Hover elevated' },
  { var: '--dss-water-700', hex: '#0356a1' },
  { var: '--dss-water-800', hex: '#074a85', usage: 'Texto hover flat/outline' },
  { var: '--dss-water-900', hex: '#0c3e6e' },
  { var: '--dss-water-950', hex: '#082749' }
]

// Waste Shades
const wasteShades = [
  { var: '--dss-waste-50', hex: '#edfcf4', usage: 'Background muito claro' },
  { var: '--dss-waste-100', hex: '#d3f8e2', usage: 'Hover flat/outline' },
  { var: '--dss-waste-200', hex: '#abefcb' },
  { var: '--dss-waste-300', hex: '#74e1ae' },
  { var: '--dss-waste-400', hex: '#3ccb8d' },
  { var: '--dss-waste-500', hex: '#18b173' },
  { var: '--dss-waste-600', hex: '#0b8154', usage: 'Cor principal' },
  { var: '--dss-waste-700', hex: '#0a724e' },
  { var: '--dss-waste-800', hex: '#0a5b3e', usage: 'Texto hover flat/outline' },
  { var: '--dss-waste-900', hex: '#0a4a34' },
  { var: '--dss-waste-950', hex: '#042a1e' }
]

// Gray Scale
const grayScale = [
  { var: '--dss-gray-50', hex: '#ffffff', usage: 'Branco puro' },
  { var: '--dss-gray-100', hex: '#fafafa', usage: 'Background muito claro' },
  { var: '--dss-gray-200', hex: '#f5f5f5', usage: 'Background claro' },
  { var: '--dss-gray-300', hex: '#e5e5e5', usage: 'Bordas claras' },
  { var: '--dss-gray-400', hex: '#d4d4d4', usage: 'Bordas médias' },
  { var: '--dss-gray-500', hex: '#a3a3a3', usage: 'Textos secundários' },
  { var: '--dss-gray-600', hex: '#737373', usage: 'Textos médios' },
  { var: '--dss-gray-700', hex: '#525252', usage: 'Textos escuros' },
  { var: '--dss-gray-800', hex: '#262626', usage: 'Textos muito escuros' },
  { var: '--dss-gray-900', hex: '#0a0a0a', usage: 'Quase preto' },
  { var: '--dss-gray-950', hex: '#000000', usage: 'Preto puro' }
]

// Spacing Tokens
const spacingTokens = [
  { var: '--dss-spacing-1', value: '4px', usage: 'Micro espaçamento' },
  { var: '--dss-spacing-2', value: '8px', usage: 'Espaçamento pequeno' },
  { var: '--dss-spacing-3', value: '12px', usage: 'Espaçamento médio-pequeno' },
  { var: '--dss-spacing-4', value: '16px', usage: 'Espaçamento base' },
  { var: '--dss-spacing-5', value: '20px', usage: 'Espaçamento médio' },
  { var: '--dss-spacing-6', value: '24px', usage: 'Espaçamento médio-grande' },
  { var: '--dss-spacing-8', value: '32px', usage: 'Espaçamento grande' },
  { var: '--dss-spacing-10', value: '40px', usage: 'Espaçamento muito grande' },
  { var: '--dss-spacing-12', value: '48px', usage: 'Touch target' },
  { var: '--dss-spacing-16', value: '64px', usage: 'Seções' },
  { var: '--dss-spacing-20', value: '80px', usage: 'Grandes espaços' },
  { var: '--dss-spacing-24', value: '96px', usage: 'Espaços massivos' }
]

// Typography Tokens
const typographyTokens = [
  { var: '--dss-font-size-xs', value: '0.75rem (12px)', sample: 'Texto Extra Small', usage: 'Badges, labels' },
  { var: '--dss-font-size-sm', value: '0.875rem (14px)', sample: 'Texto Small', usage: 'Textos secundários' },
  { var: '--dss-font-size-md', value: '1rem (16px)', sample: 'Texto Medium', usage: 'Texto padrão' },
  { var: '--dss-font-size-lg', value: '1.125rem (18px)', sample: 'Texto Large', usage: 'Subtítulos' },
  { var: '--dss-font-size-xl', value: '1.25rem (20px)', sample: 'Texto XL', usage: 'Títulos menores' },
  { var: '--dss-font-size-2xl', value: '1.5rem (24px)', sample: 'Texto 2XL', usage: 'Títulos médios' },
  { var: '--dss-font-size-3xl', value: '1.875rem (30px)', sample: 'Texto 3XL', usage: 'Títulos grandes' },
  { var: '--dss-font-size-4xl', value: '2.25rem (36px)', sample: 'Texto 4XL', usage: 'Títulos muito grandes' }
]

// Border Radius Tokens
const radiusTokens = [
  { var: '--dss-radius-none', value: '0px', usage: 'Sem arredondamento' },
  { var: '--dss-radius-sm', value: '4px', usage: 'Botões, inputs' },
  { var: '--dss-radius-md', value: '8px', usage: 'Cards' },
  { var: '--dss-radius-lg', value: '12px', usage: 'Modais' },
  { var: '--dss-radius-xl', value: '16px', usage: 'Grandes containers' },
  { var: '--dss-radius-full', value: '9999px', usage: 'Círculos, pills' }
]

// Focus Tokens - Semantic
const focusSemantic = [
  { var: '--dss-focus-primary', value: 'rgba(0, 106, 197, 0.5)', hex: '#006AC5', opacity: '50%', usage: 'Focus primary (WCAG AA)' },
  { var: '--dss-focus-secondary', value: 'rgba(5, 156, 141, 0.5)', hex: '#059C8D', opacity: '50%', usage: 'Focus secondary' },
  { var: '--dss-focus-tertiary', value: 'rgba(227, 89, 0, 0.5)', hex: '#E35900', opacity: '50%', usage: 'Focus tertiary' },
  { var: '--dss-focus-accent', value: 'rgba(176, 46, 197, 0.5)', hex: '#B02EC5', opacity: '50%', usage: 'Focus accent' }
]

// Focus Tokens - Feedback
const focusFeedback = [
  { var: '--dss-focus-positive', value: 'rgba(52, 195, 12, 0.5)', hex: '#34C30C', opacity: '50%', usage: 'Focus sucesso' },
  { var: '--dss-focus-negative', value: 'rgba(196, 0, 27, 0.5)', hex: '#C4001B', opacity: '50%', usage: 'Focus erro' },
  { var: '--dss-focus-warning', value: 'rgba(233, 171, 0, 0.6)', hex: '#E9AB00', opacity: '60%', usage: 'Focus aviso (maior opacidade)' },
  { var: '--dss-focus-info', value: 'rgba(13, 178, 213, 0.5)', hex: '#0DB2D5', opacity: '50%', usage: 'Focus informação' }
]

// Focus Tokens - Neutral
const focusNeutral = [
  { var: '--dss-focus-light', value: 'rgba(255, 255, 255, 0.7)', hex: '#FFFFFF', opacity: '70%', usage: 'Focus em fundos escuros' },
  { var: '--dss-focus-dark', value: 'rgba(62, 62, 62, 0.5)', hex: '#3E3E3E', opacity: '50%', usage: 'Focus em fundos claros' }
]

// Focus Tokens - Brands
const focusBrands = [
  { var: '--dss-focus-hub', value: 'rgba(239, 122, 17, 0.5)', hex: '#EF7A11', opacity: '50%', usage: 'Focus Hub (laranja)' },
  { var: '--dss-focus-water', value: 'rgba(14, 136, 228, 0.5)', hex: '#0E88E4', opacity: '50%', usage: 'Focus Water (azul)' },
  { var: '--dss-focus-waste', value: 'rgba(24, 177, 115, 0.5)', hex: '#18B173', opacity: '50%', usage: 'Focus Waste (verde)' }
]

// Focus Tokens - Configuration
const focusConfig = [
  { var: '--dss-focus-ring-width', value: '3px', usage: 'Largura do anel de foco (WCAG 2.4.7)' },
  { var: '--dss-focus-ring-offset', value: '2px', usage: 'Distância entre elemento e anel' },
  { var: '--dss-focus-ring-opacity', value: '0.5', usage: 'Opacidade padrão (50%)' },
  { var: '--dss-focus-duration', value: '150ms', usage: 'Duração da transição' },
  { var: '--dss-focus-easing', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Curva de animação' }
]
</script>

<style scoped>
/* ========================================
   PAGE HEADER
   ======================================== */
.tokens-page {
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.subtitle {
  margin: 0;
  font-size: 1.125rem;
  color: #666;
}

/* ========================================
   CATEGORIES NAVIGATION
   ======================================== */
.categories-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.9375rem;
  font-weight: 500;
}

.category-btn:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.cat-icon {
  font-size: 1.25rem;
}

.cat-count {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.category-btn.active .cat-count {
  background: rgba(255, 255, 255, 0.25);
}

/* ========================================
   TOKEN SECTIONS
   ======================================== */
.tokens-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.token-section h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a1a1a;
}

.section-desc {
  margin: 0 0 2rem 0;
  font-size: 1rem;
  color: #666;
}

.token-group {
  margin-bottom: 3rem;
}

.token-group h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

/* ========================================
   TOKEN GRID
   ======================================== */
.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.token-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.token-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.token-preview {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e0e0e0;
}

.token-info {
  padding: 0.75rem;
}

.token-name {
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.token-value {
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.token-usage {
  font-size: 0.75rem;
  color: #999;
  font-style: italic;
}

/* ========================================
   SPACING GRID
   ======================================== */
.spacing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.spacing-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.spacing-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.spacing-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 4px;
}

.spacing-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

.spacing-info {
  text-align: center;
}

/* ========================================
   TYPOGRAPHY GRID
   ======================================== */
.typo-grid {
  display: grid;
  gap: 1.5rem;
}

.typo-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.typo-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.typo-preview {
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  font-family: 'Roboto', sans-serif;
}

.typo-info {
  border-top: 1px solid #e0e0e0;
  padding-top: 0.75rem;
}

/* ========================================
   RADIUS GRID
   ======================================== */
.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.radius-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.radius-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.radius-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 4px;
}

.radius-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.radius-info {
  text-align: center;
}

/* ========================================
   SCROLLBAR
   ======================================== */
.categories-nav::-webkit-scrollbar {
  height: 6px;
}

.categories-nav::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.categories-nav::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.categories-nav::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* ========================================
   FOCUS GRID
   ======================================== */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.focus-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.focus-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.focus-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.focus-demo {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--dss-focus-duration, 150ms) var(--dss-focus-easing, ease);
}

.focus-info {
  padding: 1rem;
}

/* ========================================
   CONFIG GRID
   ======================================== */
.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.config-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.config-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.config-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  background: white;
  border-radius: 6px;
  padding: 1rem;
}

.config-info {
  flex: 1;
}

/* Ring Width Demo */
.ring-width-demo {
  background: white;
}

/* Offset Demo */
.offset-container {
  position: relative;
  width: 60px;
  height: 60px;
}

.offset-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #667eea;
  border-radius: 6px;
}

.offset-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px; /* 40px + 2*2px offset + 2*3px border */
  height: 56px;
  border: 3px solid rgba(102, 126, 234, 0.5);
  border-radius: 8px;
}

/* Duration and Easing Icons */
.duration-icon,
.easing-icon {
  font-size: 3rem;
}

/* ========================================
   WCAG INFO BOX
   ======================================== */
.wcag-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 100%);
  border-left: 4px solid #667eea;
  border-radius: 8px;
}

.wcag-info h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.wcag-info ul {
  margin: 0;
  padding-left: 1.5rem;
}

.wcag-info li {
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #555;
}

.wcag-info li:last-child {
  margin-bottom: 0;
}

.wcag-info strong {
  color: #333;
  font-weight: 600;
}
</style>
