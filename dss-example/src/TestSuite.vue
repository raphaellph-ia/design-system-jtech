<template>
  <div class="test-suite">
    <!-- Sidebar Navigation -->
    <aside class="test-sidebar">
      <div class="sidebar-header">
        <h1>🧪 DSS Test Suite</h1>
        <p class="version">v2.2.0</p>
      </div>

      <nav class="sidebar-nav">
        <!-- Dashboard -->
        <div class="nav-section">
          <button
            @click="activeComponent = 'index'"
            :class="['nav-item', { active: activeComponent === 'index' }]"
          >
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Dashboard</span>
          </button>
        </div>

        <!-- Foundation -->
        <div class="nav-section">
          <button
            @click="toggleCategory('foundation')"
            class="nav-category"
          >
            <span class="nav-icon">⚡</span>
            <span class="nav-label">Foundation</span>
            <span class="chevron" :class="{ expanded: expandedCategories.foundation }">›</span>
          </button>

          <div v-show="expandedCategories.foundation" class="nav-submenu">
            <button
              @click="activeComponent = 'tokens'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'tokens' }]"
            >
              <span class="nav-icon">🎨</span>
              <span class="nav-label">Design Tokens</span>
              <span class="nav-badge">112 tokens</span>
            </button>

            <button
              @click="activeComponent = 'colors'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'colors' }]"
            >
              <span class="nav-icon">🌈</span>
              <span class="nav-label">Colors</span>
              <span class="nav-badge">Em breve</span>
            </button>

            <button
              @click="activeComponent = 'typography'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'typography' }]"
            >
              <span class="nav-icon">📝</span>
              <span class="nav-label">Typography</span>
              <span class="nav-badge">Em breve</span>
            </button>

            <button
              @click="activeComponent = 'spacing'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'spacing' }]"
            >
              <span class="nav-icon">📐</span>
              <span class="nav-label">Spacing</span>
              <span class="nav-badge">Em breve</span>
            </button>
          </div>
        </div>

        <!-- Components -->
        <div class="nav-section">
          <button
            @click="toggleCategory('components')"
            class="nav-category"
          >
            <span class="nav-icon">🧩</span>
            <span class="nav-label">Components</span>
            <span class="chevron" :class="{ expanded: expandedCategories.components }">›</span>
          </button>

          <div v-show="expandedCategories.components" class="nav-submenu">
            <!-- Buttons & Actions -->
            <button
              @click="toggleCategory('buttonsActions')"
              class="nav-subcategory"
            >
              <span class="nav-label">Buttons & Actions</span>
              <span class="chevron" :class="{ expanded: expandedCategories.buttonsActions }">›</span>
            </button>

            <div v-show="expandedCategories.buttonsActions" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'button'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'button' }]"
              >
                <span class="nav-icon">🔘</span>
                <span class="nav-label">DssButton</span>
                <span class="nav-badge">20 seções</span>
              </button>

              <button
                @click="activeComponent = 'icon-button'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'icon-button' }]"
              >
                <span class="nav-icon">⭕</span>
                <span class="nav-label">IconButton</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>

            <!-- Display & Feedback -->
            <button
              @click="toggleCategory('displayFeedback')"
              class="nav-subcategory"
            >
              <span class="nav-label">Display & Feedback</span>
              <span class="chevron" :class="{ expanded: expandedCategories.displayFeedback }">›</span>
            </button>

            <div v-show="expandedCategories.displayFeedback" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'badge'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'badge' }]"
              >
                <span class="nav-icon">🏷️</span>
                <span class="nav-label">DssBadge</span>
                <span class="nav-badge">14 seções</span>
              </button>

              <button
                @click="activeComponent = 'chip'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'chip' }]"
              >
                <span class="nav-icon">🏷️</span>
                <span class="nav-label">DssChip</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'alert'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'alert' }]"
              >
                <span class="nav-icon">⚠️</span>
                <span class="nav-label">DssAlert</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>

            <!-- Data Display -->
            <button
              @click="toggleCategory('dataDisplay')"
              class="nav-subcategory"
            >
              <span class="nav-label">Data Display</span>
              <span class="chevron" :class="{ expanded: expandedCategories.dataDisplay }">›</span>
            </button>

            <div v-show="expandedCategories.dataDisplay" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'avatar'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'avatar' }]"
              >
                <span class="nav-icon">👤</span>
                <span class="nav-label">DssAvatar</span>
                <span class="nav-badge">20 seções</span>
              </button>

              <button
                @click="activeComponent = 'table'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'table' }]"
              >
                <span class="nav-icon">📊</span>
                <span class="nav-label">DssTable</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'list'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'list' }]"
              >
                <span class="nav-icon">📋</span>
                <span class="nav-label">DssList</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>

            <!-- Forms & Input -->
            <button
              @click="toggleCategory('formsInput')"
              class="nav-subcategory"
            >
              <span class="nav-label">Forms & Input</span>
              <span class="chevron" :class="{ expanded: expandedCategories.formsInput }">›</span>
            </button>

            <div v-show="expandedCategories.formsInput" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'input'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'input' }]"
              >
                <span class="nav-icon">✏️</span>
                <span class="nav-label">DssInput</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'select'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'select' }]"
              >
                <span class="nav-icon">🔽</span>
                <span class="nav-label">DssSelect</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'checkbox'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'checkbox' }]"
              >
                <span class="nav-icon">☑️</span>
                <span class="nav-label">DssCheckbox</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>

            <!-- Layout -->
            <button
              @click="toggleCategory('layout')"
              class="nav-subcategory"
            >
              <span class="nav-label">Layout</span>
              <span class="chevron" :class="{ expanded: expandedCategories.layout }">›</span>
            </button>

            <div v-show="expandedCategories.layout" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'card'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'card' }]"
              >
                <span class="nav-icon">🃏</span>
                <span class="nav-label">DssCard</span>
                <span class="nav-badge">11 seções</span>
              </button>

              <button
                @click="activeComponent = 'container'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'container' }]"
              >
                <span class="nav-icon">📦</span>
                <span class="nav-label">DssContainer</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'grid'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'grid' }]"
              >
                <span class="nav-icon">⊞</span>
                <span class="nav-label">DssGrid</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>

            <!-- Navigation -->
            <button
              @click="toggleCategory('navigation')"
              class="nav-subcategory"
            >
              <span class="nav-label">Navigation</span>
              <span class="chevron" :class="{ expanded: expandedCategories.navigation }">›</span>
            </button>

            <div v-show="expandedCategories.navigation" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'menu'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'menu' }]"
              >
                <span class="nav-icon">☰</span>
                <span class="nav-label">DssMenu</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'tabs'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'tabs' }]"
              >
                <span class="nav-icon">📑</span>
                <span class="nav-label">DssTabs</span>
                <span class="nav-badge">Em breve</span>
              </button>

              <button
                @click="activeComponent = 'breadcrumb'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'breadcrumb' }]"
              >
                <span class="nav-icon">🍞</span>
                <span class="nav-label">DssBreadcrumb</span>
                <span class="nav-badge">Em breve</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Patterns -->
        <div class="nav-section">
          <button
            @click="toggleCategory('patterns')"
            class="nav-category"
          >
            <span class="nav-icon">🎯</span>
            <span class="nav-label">Patterns</span>
            <span class="chevron" :class="{ expanded: expandedCategories.patterns }">›</span>
          </button>

          <div v-show="expandedCategories.patterns" class="nav-submenu">
            <button
              @click="activeComponent = 'login'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'login' }]"
            >
              <span class="nav-icon">🔐</span>
              <span class="nav-label">Login Forms</span>
              <span class="nav-badge">Em breve</span>
            </button>

            <button
              @click="activeComponent = 'dashboards'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'dashboards' }]"
            >
              <span class="nav-icon">📊</span>
              <span class="nav-label">Dashboards</span>
              <span class="nav-badge">Em breve</span>
            </button>
          </div>
        </div>

        <!-- Statistics -->
        <div class="nav-section">
          <div class="stats-mini">
            <div class="stat-item">
              <span class="stat-value">4</span>
              <span class="stat-label">Componentes</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">65</span>
              <span class="stat-label">Seções</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">270+</span>
              <span class="stat-label">Variações</span>
            </div>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <p>Design System Sansys</p>
        <p class="author">Hebert Daniel Oliveira Chaves</p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="test-content">
      <!-- Index/Dashboard View -->
      <div v-if="activeComponent === 'index'" class="component-view">
        <TestIndex />
      </div>

      <!-- DssButton Test View -->
      <div v-if="activeComponent === 'button'" class="component-view">
        <TestButton />
      </div>

      <!-- DssBadge Test View -->
      <div v-if="activeComponent === 'badge'" class="component-view">
        <TestBadge />
      </div>

      <!-- DssAvatar Test View -->
      <div v-if="activeComponent === 'avatar'" class="component-view">
        <TestAvatar />
      </div>

      <!-- DssCard Test View -->
      <div v-if="activeComponent === 'card'" class="component-view">
        <TestCard />
      </div>

      <!-- Design Tokens View -->
      <div v-if="activeComponent === 'tokens'" class="component-view">
        <TestTokens />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TestIndex from './TestIndex.vue'
import TestButton from './TestButton.vue'
import TestBadge from './TestBadge.vue'
import TestAvatar from './TestAvatar.vue'
import TestCard from './TestCard.vue'
import TestTokens from './TestTokens.vue'

// Active component state
const activeComponent = ref('index')

// Expanded categories state
const expandedCategories = ref({
  foundation: false,
  components: true,
  buttonsActions: true,
  displayFeedback: true,
  dataDisplay: true,
  formsInput: false,
  layout: false,
  navigation: false,
  patterns: false
})

// Toggle category expansion
const toggleCategory = (category) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}
</script>

<style scoped>
/* ========================================
   LAYOUT PRINCIPAL
   ======================================== */
.test-suite {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}

/* ========================================
   SIDEBAR NAVIGATION
   ======================================== */
.test-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 100;
  border-right: 1px solid rgba(227, 30, 36, 0.2);
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.version {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.85;
  font-weight: 500;
}

/* ========================================
   NAVIGATION MENU
   ======================================== */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1rem;
}

/* Base Nav Item Styles */
.nav-item,
.nav-category,
.nav-subcategory {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
}

.nav-item:hover,
.nav-category:hover,
.nav-subcategory:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background: rgba(227, 30, 36, 0.15);
  font-weight: 600;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #E31E24;
}

/* Category Headers */
.nav-category {
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.nav-category:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

/* Subcategory Headers */
.nav-subcategory {
  font-weight: 500;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  opacity: 0.85;
  padding-left: 2rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.nav-subcategory:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

/* Submenu Items */
.nav-subitem {
  padding-left: 2.5rem;
  font-size: 0.875rem;
}

.nav-subsubitem {
  padding-left: 3.5rem;
  font-size: 0.875rem;
}

.nav-subitem:hover {
  padding-left: 2.75rem;
}

.nav-subsubitem:hover {
  padding-left: 3.75rem;
}

/* Submenu Containers */
.nav-submenu,
.nav-subsubmenu {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* Icons */
.nav-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.nav-label {
  flex: 1;
  font-size: 0.9375rem;
}

/* Chevron Indicator */
.chevron {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  opacity: 0.7;
  font-weight: bold;
  margin-left: auto;
}

.chevron.expanded {
  transform: rotate(90deg);
}

/* Badges */
.nav-badge {
  background: #E31E24;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* ========================================
   MINI STATISTICS
   ======================================== */
.stats-mini {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1.5rem;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.8125rem;
  opacity: 0.85;
}

/* ========================================
   SIDEBAR FOOTER
   ======================================== */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.sidebar-footer p {
  margin: 0;
  font-size: 0.8125rem;
  opacity: 0.85;
}

.author {
  margin-top: 0.25rem !important;
  font-size: 0.75rem !important;
  opacity: 0.7 !important;
}

/* ========================================
   MAIN CONTENT AREA
   ======================================== */
.test-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
}

.component-view {
  min-height: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   SCROLLBAR CUSTOMIZATION
   ======================================== */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

.test-content::-webkit-scrollbar {
  width: 10px;
}

.test-content::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.test-content::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

.test-content::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */
@media (max-width: 768px) {
  .test-sidebar {
    width: 240px;
  }

  .sidebar-header h1 {
    font-size: 1.25rem;
  }

  .nav-item {
    padding: 0.75rem 1rem;
  }

  .nav-item:hover {
    padding-left: 1.25rem;
  }

  .nav-section h3 {
    padding: 0 1rem;
  }

  .stats-mini {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .test-sidebar {
    width: 60px;
  }

  .sidebar-header h1,
  .version,
  .nav-label,
  .nav-badge,
  .nav-section h3,
  .stats-mini,
  .sidebar-footer p {
    display: none;
  }

  .sidebar-header {
    padding: 1rem 0.5rem;
    text-align: center;
  }

  .nav-item {
    justify-content: center;
    padding: 1rem 0.5rem;
  }

  .nav-icon {
    font-size: 1.5rem;
  }
}
</style>
