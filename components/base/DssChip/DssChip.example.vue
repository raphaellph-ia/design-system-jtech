<template>
  <!-- ==========================================================================
       DssChip - VISUAL SHOWCASE

       RESPONSABILIDADE: Demonstrar todas as variações e estados do componente

       SECOES:
       1. Variantes (filled, outline, flat)
       2. Tamanhos (xs, sm, md, lg)
       3. Cores
       4. Estados (disabled, selected, clickable)
       5. Com icones
       6. Removivel
       7. Brands (Hub, Water, Waste)
       8. Acessibilidade
       ========================================================================== -->
  <div class="dss-chip-showcase">
    <!-- =====================================================================
         SECTION 1: VARIANTS
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Variantes</h2>
      <p class="showcase-description">Três variantes visuais disponíveis.</p>

      <div class="showcase-row">
        <div class="showcase-item">
          <span class="showcase-label">Filled (padrão)</span>
          <DssChip label="Filled" variant="filled" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Outline</span>
          <DssChip label="Outline" variant="outline" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Flat</span>
          <DssChip label="Flat" variant="flat" color="primary" />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 2: SIZES
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Tamanhos</h2>
      <p class="showcase-description">Quatro tamanhos disponíveis: xs, sm, md (padrão), lg.</p>

      <div class="showcase-row showcase-row--align-center">
        <div class="showcase-item">
          <span class="showcase-label">XS (24px)</span>
          <DssChip label="Extra Small" size="xs" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">SM (28px)</span>
          <DssChip label="Small" size="sm" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">MD (32px - padrão)</span>
          <DssChip label="Medium" size="md" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">LG (40px)</span>
          <DssChip label="Large" size="lg" color="primary" />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 3: COLORS
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Cores</h2>
      <p class="showcase-description">Cores semânticas aplicadas via classes utilitárias.</p>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Filled</h3>
        <div class="showcase-row">
          <DssChip label="Primary" color="primary" />
          <DssChip label="Secondary" color="secondary" />
          <DssChip label="Accent" color="accent" />
          <DssChip label="Positive" color="positive" />
          <DssChip label="Negative" color="negative" />
          <DssChip label="Warning" color="warning" />
          <DssChip label="Info" color="info" />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Outline</h3>
        <div class="showcase-row">
          <DssChip label="Primary" variant="outline" color="primary" />
          <DssChip label="Secondary" variant="outline" color="secondary" />
          <DssChip label="Accent" variant="outline" color="accent" />
          <DssChip label="Positive" variant="outline" color="positive" />
          <DssChip label="Negative" variant="outline" color="negative" />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Flat</h3>
        <div class="showcase-row">
          <DssChip label="Primary" variant="flat" color="primary" />
          <DssChip label="Secondary" variant="flat" color="secondary" />
          <DssChip label="Accent" variant="flat" color="accent" />
          <DssChip label="Positive" variant="flat" color="positive" />
          <DssChip label="Negative" variant="flat" color="negative" />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 4: STATES
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Estados</h2>
      <p class="showcase-description">Estados interativos e visuais.</p>

      <div class="showcase-row">
        <div class="showcase-item">
          <span class="showcase-label">Normal</span>
          <DssChip label="Normal" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Clickable</span>
          <DssChip
            label="Clickable"
            color="primary"
            clickable
            @click="handleClick('Chip clicado!')"
          />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Selected</span>
          <DssChip label="Selected" color="primary" selected />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Disabled</span>
          <DssChip label="Disabled" color="primary" disable />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Dense</span>
          <DssChip label="Dense" color="primary" dense />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 5: WITH ICONS
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Com Ícones</h2>
      <p class="showcase-description">Ícones Material Icons à esquerda, direita ou ambos.</p>

      <div class="showcase-row">
        <div class="showcase-item">
          <span class="showcase-label">Ícone esquerda</span>
          <DssChip label="Favorito" icon="star" color="warning" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Ícone direita</span>
          <DssChip label="Próximo" icon-right="arrow_forward" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Ambos</span>
          <DssChip label="Email" icon="mail" icon-right="send" color="info" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Apenas ícone</span>
          <DssChip icon="settings" color="secondary" aria-label="Configurações" />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Ícone de seleção</h3>
        <div class="showcase-row">
          <DssChip
            label="Clique para selecionar"
            color="primary"
            clickable
            :selected="isSelected"
            icon-selected="check"
            @update:selected="isSelected = $event"
          />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 6: REMOVABLE
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Removível</h2>
      <p class="showcase-description">Chips com botão de remoção.</p>

      <div class="showcase-row">
        <DssChip
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          color="primary"
          removable
          @remove="removeTag(tag)"
        />
        <DssChip
          v-if="tags.length === 0"
          label="Nenhum tag (clique para resetar)"
          color="grey"
          clickable
          @click="resetTags"
        />
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Variantes removíveis</h3>
        <div class="showcase-row">
          <DssChip label="Filled" color="primary" removable />
          <DssChip label="Outline" variant="outline" color="primary" removable />
          <DssChip label="Flat" variant="flat" color="primary" removable />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 7: SHAPES
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Formas</h2>
      <p class="showcase-description">Chips com bordas arredondadas (padrão) ou quadradas.</p>

      <div class="showcase-row">
        <div class="showcase-item">
          <span class="showcase-label">Round (padrão)</span>
          <DssChip label="Round" color="primary" />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Square</span>
          <DssChip label="Square" color="primary" square />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 8: BRANDS
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Brands</h2>
      <p class="showcase-description">Suporte a múltiplas marcas via data-brand.</p>

      <div class="showcase-subsection" data-brand="hub">
        <h3 class="showcase-subtitle">Hub (Laranja)</h3>
        <div class="showcase-row">
          <DssChip label="Primary" brand="hub" class="dss-chip--primary" />
          <DssChip label="Secondary" brand="hub" class="dss-chip--secondary" />
          <DssChip label="Accent" brand="hub" class="dss-chip--accent" />
        </div>
      </div>

      <div class="showcase-subsection" data-brand="water">
        <h3 class="showcase-subtitle">Water (Azul)</h3>
        <div class="showcase-row">
          <DssChip label="Primary" brand="water" class="dss-chip--primary" />
          <DssChip label="Secondary" brand="water" class="dss-chip--secondary" />
          <DssChip label="Accent" brand="water" class="dss-chip--accent" />
        </div>
      </div>

      <div class="showcase-subsection" data-brand="waste">
        <h3 class="showcase-subtitle">Waste (Verde)</h3>
        <div class="showcase-row">
          <DssChip label="Primary" brand="waste" class="dss-chip--primary" />
          <DssChip label="Secondary" brand="waste" class="dss-chip--secondary" />
          <DssChip label="Accent" brand="waste" class="dss-chip--accent" />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 9: ACCESSIBILITY
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Acessibilidade</h2>
      <p class="showcase-description">Recursos de acessibilidade WCAG 2.1 AA.</p>

      <div class="showcase-row">
        <div class="showcase-item">
          <span class="showcase-label">Com aria-label</span>
          <DssChip
            icon="notifications"
            color="info"
            aria-label="5 notificações não lidas"
          />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Navegação por teclado</span>
          <DssChip
            label="Tab + Enter/Space"
            color="primary"
            clickable
            @click="handleClick('Ativado por teclado!')"
          />
        </div>

        <div class="showcase-item">
          <span class="showcase-label">Remove com aria-label</span>
          <DssChip
            label="Tag importante"
            color="warning"
            removable
            remove-aria-label="Remover tag importante"
          />
        </div>
      </div>
    </section>

    <!-- =====================================================================
         SECTION 10: USE CASES
         ===================================================================== -->
    <section class="showcase-section">
      <h2 class="showcase-title">Casos de Uso</h2>
      <p class="showcase-description">Exemplos práticos de aplicação.</p>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Tags de categorias</h3>
        <div class="showcase-row">
          <DssChip label="JavaScript" icon="code" color="warning" />
          <DssChip label="TypeScript" icon="code" color="info" />
          <DssChip label="Vue.js" icon="code" color="positive" />
          <DssChip label="SCSS" icon="palette" color="negative" />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Status badges</h3>
        <div class="showcase-row">
          <DssChip label="Ativo" icon="check_circle" color="positive" size="sm" />
          <DssChip label="Pendente" icon="schedule" color="warning" size="sm" />
          <DssChip label="Erro" icon="error" color="negative" size="sm" />
          <DssChip label="Processando" icon="sync" color="info" size="sm" />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Filtros selecionáveis</h3>
        <div class="showcase-row">
          <DssChip
            v-for="filter in filters"
            :key="filter.id"
            :label="filter.label"
            :icon="filter.icon"
            color="primary"
            variant="outline"
            clickable
            :selected="filter.selected"
            icon-selected="check"
            @update:selected="filter.selected = $event"
          />
        </div>
      </div>

      <div class="showcase-subsection">
        <h3 class="showcase-subtitle">Input de tags</h3>
        <div class="showcase-row showcase-row--wrap">
          <DssChip
            v-for="inputTag in inputTags"
            :key="inputTag"
            :label="inputTag"
            color="secondary"
            variant="outline"
            removable
            size="sm"
            @remove="removeInputTag(inputTag)"
          />
          <input
            v-model="newTag"
            class="showcase-tag-input"
            placeholder="Adicionar tag..."
            @keydown.enter="addTag"
          />
        </div>
      </div>
    </section>

    <!-- Feedback message -->
    <div v-if="message" class="showcase-message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssChip from './1-structure/DssChip.ts.vue'

// State
const isSelected = ref(false)
const message = ref('')

const tags = ref(['Vue.js', 'TypeScript', 'Quasar', 'SCSS'])
const initialTags = ['Vue.js', 'TypeScript', 'Quasar', 'SCSS']

const filters = ref([
  { id: 1, label: 'Todos', icon: 'apps', selected: true },
  { id: 2, label: 'Ativos', icon: 'check', selected: false },
  { id: 3, label: 'Arquivados', icon: 'archive', selected: false },
  { id: 4, label: 'Favoritos', icon: 'star', selected: false },
])

const inputTags = ref(['design-system', 'vue', 'component'])
const newTag = ref('')

// Methods
const handleClick = (msg: string) => {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 2000)
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag)
}

const resetTags = () => {
  tags.value = [...initialTags]
}

const removeInputTag = (tag: string) => {
  inputTags.value = inputTags.value.filter(t => t !== tag)
}

const addTag = () => {
  if (newTag.value.trim() && !inputTags.value.includes(newTag.value.trim())) {
    inputTags.value.push(newTag.value.trim())
    newTag.value = ''
  }
}
</script>

<style scoped lang="scss">
.dss-chip-showcase {
  padding: var(--dss-spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

.showcase-section {
  margin-bottom: var(--dss-spacing-10);
  padding-bottom: var(--dss-spacing-6);
  border-bottom: 1px solid var(--dss-border-color, #e0e0e0);
}

.showcase-title {
  font-size: var(--dss-font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--dss-spacing-2);
  color: var(--dss-text-primary);
}

.showcase-description {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
  margin-bottom: var(--dss-spacing-4);
}

.showcase-subsection {
  margin-top: var(--dss-spacing-6);
}

.showcase-subtitle {
  font-size: var(--dss-font-size-md);
  font-weight: 500;
  margin-bottom: var(--dss-spacing-3);
  color: var(--dss-text-primary);
}

.showcase-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3);
  align-items: flex-start;

  &--align-center {
    align-items: center;
  }

  &--wrap {
    flex-wrap: wrap;
  }
}

.showcase-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2);
}

.showcase-label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-secondary);
  text-align: center;
}

.showcase-tag-input {
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  border: 1px solid var(--dss-border-color, #e0e0e0);
  border-radius: var(--dss-radius-md);
  font-size: var(--dss-font-size-sm);
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: var(--dss-action-primary);
  }
}

.showcase-message {
  position: fixed;
  bottom: var(--dss-spacing-4);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
  background-color: var(--dss-surface-dark, #333);
  color: white;
  border-radius: var(--dss-radius-md);
  font-size: var(--dss-font-size-sm);
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
