# 🏗️ DSS Component Architecture Guide

**Guia oficial de arquitetura em 4 camadas para componentes DSS**

**Versão:** 2.1.0
**Data:** Dezembro de 2024
**Filosofia:** Tokens = Provedores, Componentes = Consumidores
**Padrão:** 100% compatível com Quasar Framework

---

## 🎯 Visão Geral

Todos os **novos componentes DSS** devem seguir a arquitetura em 4 camadas, inspirada no pipeline V6 do plugin Quasar-to-Figma e **100% compatível com o padrão Quasar Framework**.

### **🔥 IMPORTANTE: Padrão Quasar Framework**

O DSS segue **EXATAMENTE** o padrão arquitetural do Quasar Framework para cores e estilos:

- ✅ **Classes utilitárias globais** (`.bg-primary`, `.text-primary`) definidas UMA VEZ
- ✅ **Componentes aplicam classes dinamicamente** via computed properties
- ❌ **NUNCA criar arquivos de cores por componente** (`.dss-button--primary`, etc.)

**Leitura obrigatória:** [`REFACTORING_QUASAR_PATTERN.md`](./REFACTORING_QUASAR_PATTERN.md) - Documentação completa da refatoração para o padrão Quasar.

Todos os **novos componentes DSS** devem seguir a arquitetura em 4 camadas, inspirada no pipeline V6 do plugin Quasar-to-Figma.

### **Pipeline V6 (Plugin) vs Arquitetura DSS (Components)**

```
PLUGIN V6:                    DSS COMPONENTS:
1. PARSE    → Elements        1. STRUCTURE   → Vue Templates + Props
2. ANALYZE  → Semantics       2. COMPOSITION → Base Styles + Mixins
3. RESOLVE  → Priorities      3. VARIANTS    → Visual Variations
4. MATERIALIZE → Figma        4. OUTPUT      → States + Brands + CSS Final
```

**Ambos compartilham:**
- ✅ Separação clara de responsabilidades
- ✅ Cada camada tem 1 função específica
- ✅ Modularidade e testabilidade
- ✅ Reutilização de código

---

## 📁 Estrutura Padrão de Componentes

### **Template de Diretórios**

```
DssComponent/
├── 1-structure/              # LAYER 1
│   ├── DssComponent.vue
│   ├── DssComponentPart1.vue (se houver subcomponentes)
│   └── DssComponentPart2.vue
│
├── 2-composition/            # LAYER 2
│   ├── _base.scss
│   └── _mixins.scss (opcional)
│
├── 3-variants/               # LAYER 3
│   ├── _variant1.scss
│   ├── _variant2.scss
│   └── index.scss
│
├── 4-output/                 # LAYER 4
│   ├── _states.scss
│   ├── _brands.scss (se aplicável)
│   └── index.scss
│
├── DssComponent.module.scss  # Orquestrador (~40 linhas)
├── DssComponent.example.vue  # Exemplos de uso
├── index.js                  # Exports
└── README.md                 # Documentação
```

---

## 🔧 LAYER 1: Structure (Estrutura)

### **Responsabilidade**
Definir **template HTML**, **props**, e **interface** do componente.

### **O QUE DEVE TER**
- ✅ Template Vue limpo
- ✅ Props bem documentadas
- ✅ Computed properties para classes
- ✅ Events emitidos
- ✅ Slots disponíveis

### **O QUE NÃO DEVE TER**
- ❌ Lógica de estilos
- ❌ Valores CSS hardcoded
- ❌ Imports de SCSS (exceto o module.scss final)

### **Exemplo Completo**

```vue
<!-- 1-structure/DssButton.vue -->
<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
/**
 * DssButton - LAYER 1: STRUCTURE
 *
 * Componente de botão compatível com Quasar q-btn
 *
 * @component
 */
export default {
  name: 'DssButton',

  props: {
    /**
     * Visual variant
     * @values filled, outlined, flat, unelevated
     */
    variant: {
      type: String,
      default: 'filled',
      validator: (v) => ['filled', 'outlined', 'flat', 'unelevated'].includes(v)
    },

    /**
     * Color variant
     * @values primary, secondary, tertiary, accent, etc.
     */
    color: {
      type: String,
      default: 'primary'
    },

    /**
     * Button size
     * @values xs, sm, md, lg, xl
     */
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
    },

    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * HTML button type
     * @values button, submit, reset
     */
    type: {
      type: String,
      default: 'button'
    }
  },

  emits: ['click'],

  computed: {
    buttonClasses() {
      return [
        'dss-button',
        `dss-button--${this.variant}`,
        `dss-button--${this.color}`,
        `dss-button--${this.size}`,
        {
          'dss-button--disabled': this.disabled
        }
      ]
    }
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../DssButton.module.scss';
</style>
```

### **Checklist Layer 1**
- [ ] Props têm validadores quando aplicável
- [ ] Props têm JSDoc comments com `@values`
- [ ] Computed properties calculam classes dinamicamente
- [ ] Events estão declarados em `emits`
- [ ] Componente tem JSDoc `@component`

---

## 🎨 LAYER 2: Composition (Composição Base)

### **Responsabilidade**
Definir **estilos fundamentais** usando **APENAS tokens genéricos**.

### **O QUE DEVE TER**
- ✅ Reset de estilos
- ✅ Layout base (display, flex, grid)
- ✅ Tokens genéricos (`--dss-spacing-*`, `--dss-radius-*`)
- ✅ Mixins reutilizáveis (`@include dss-transition()`)

### **O QUE NÃO DEVE TER**
- ❌ Valores hardcoded (12px, #fff, etc.)
- ❌ Tokens component-specific (`--dss-button-padding`)
- ❌ Variantes visuais (isso é Layer 3)

### **Exemplo Completo**

```scss
/* 2-composition/_base.scss */

@import '../../../../utils/index';

.dss-button {
  /* Reset */
  appearance: none;
  border: none;
  background: none;
  margin: 0;

  /* Layout - USA TOKENS GENÉRICOS */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);

  /* Typography - USA TOKENS GENÉRICOS */
  font-family: var(--dss-font-family-base);
  font-weight: var(--dss-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--dss-letter-spacing-wide); /* NÃO "0.5px" */

  /* Border Radius - USA TOKENS GENÉRICOS */
  border-radius: var(--dss-radius-md); /* NÃO "4px" */

  /* Accessibility - USA MIXINS */
  @include dss-touch-target('ideal');
  @include dss-focus-ring('primary');
  @include dss-transition(all, 'fast');

  /* Cursor */
  cursor: pointer;

  /* Disabled */
  &:disabled {
    opacity: var(--dss-opacity-disabled);
    cursor: not-allowed;
  }
}
```

### **Tokens Genéricos Permitidos**

```scss
/* ✅ CORRETO - Tokens genéricos reutilizáveis */
var(--dss-spacing-1)           // não "4px"
var(--dss-spacing-2)           // não "8px"
var(--dss-radius-sm)           // não "2px"
var(--dss-radius-md)           // não "4px"
var(--dss-border-width-thin)   // não "1px"
var(--dss-elevation-1)         // não "0 1px 3px rgba(...)"
var(--dss-font-size-base)      // não "16px"
var(--dss-line-height-tight)   // não "1.2"

/* ❌ INCORRETO - Component-specific */
var(--dss-button-padding)      // ❌ NÃO!
var(--dss-card-shadow)         // ❌ NÃO!
var(--dss-input-border)        // ❌ NÃO!
```

### **Checklist Layer 2**
- [ ] ZERO valores hardcoded (px, %, em, hex)
- [ ] ZERO tokens component-specific
- [ ] Todos os valores vêm de tokens genéricos
- [ ] Usa mixins quando disponíveis
- [ ] Código comentado explicando responsabilidades

---

## 🎭 LAYER 3: Variants (Variantes)

### **Responsabilidade**
Definir **variações visuais** do componente (EXCETO CORES).

### **🚨 IMPORTANTE: Cores NÃO ficam na Layer 3**

Seguindo o padrão Quasar Framework:
- ❌ **NUNCA criar arquivos `_colors.scss`** por componente
- ✅ **Cores são aplicadas via classes utilitárias globais** (`.bg-*`, `.text-*`)
- ✅ **Classes utilitárias estão em `utils/_colors.scss`** (arquivo único)

**Por quê?** Ver [`REFACTORING_QUASAR_PATTERN.md`](./REFACTORING_QUASAR_PATTERN.md) - Redução de 97% no código de cores.

### **Estrutura**
1 arquivo SCSS = 1 variante (~30-80 linhas) - APENAS estrutura visual, SEM cores

### **Padrão de Nomenclatura**
```scss
.dss-component--variant-name { }
```

### **Exemplo Completo (Padrão Quasar)**

```scss
/* 3-variants/_outlined.scss */

.dss-button--outlined {
  /* Background transparent */
  background-color: transparent;

  /* Border - USA TOKEN GENÉRICO */
  border: var(--dss-border-width-md) solid currentColor;

  /* ⚠️ CORES NÃO VÃO AQUI! */
  /* ❌ NÃO FAZER:
  &.dss-button--primary {
    color: var(--dss-action-primary);
  }
  */

  /* ✅ Cores aplicadas via classes utilitárias no Vue:
  <button class="dss-button dss-button--outlined text-primary">
    ^ aplicado via classes utilitárias
  </button>
  */

  /* Estados hover usam currentColor (cor vem da classe utilitária) */
  &:hover:not(:disabled) {
    background-color: rgba(128, 128, 128, 0.1); /* hover genérico */
  }

  &:active:not(:disabled) {
    background-color: rgba(128, 128, 128, 0.2); /* active genérico */
  }
}
```

### **Exemplo Vue (Aplicação de Cores)**

```javascript
// 1-structure/DssButton.vue
computed: {
  buttonClasses() {
    // Determina cores via classes utilitárias (padrão Quasar)
    let colorClasses = '';

    if (this.variant === 'flat' || this.variant === 'outline') {
      // Variantes flat/outline: apenas cor de texto
      colorClasses = `text-${this.color}`;
    } else {
      // Variantes filled/unelevated: fundo colorido + texto branco
      colorClasses = `bg-${this.color} text-white`;
    }

    return [
      'dss-button',
      `dss-button--${this.variant}`,
      colorClasses, // ← Classes utilitárias (.bg-primary, .text-primary)
      `dss-button--${this.size}`,
      {
        'dss-button--disabled': this.disabled
      }
    ];
  }
}
```

### **Variantes Comuns**

**Buttons:**
- `_filled.scss` - Preenchido (usa `.bg-*`)
- `_outlined.scss` - Borda + transparente (usa `.text-*`)
- `_flat.scss` - Transparente sem borda (usa `.text-*`)
- `_unelevated.scss` - Preenchido sem sombra (usa `.bg-*`)

**Cards:**
- `_elevated.scss` - Com sombra (padrão)
- `_flat.scss` - Sem sombra
- `_bordered.scss` - Borda + sombra
- `_outlined.scss` - Borda sem sombra

**❌ NÃO criar:**
- `_colors.scss` - Cores estão em `utils/_colors.scss` (global)
- `_primary.scss`, `_secondary.scss` - Usa classes utilitárias

### **Checklist Layer 3**
- [ ] 1 arquivo = 1 variante
- [ ] Arquivo pequeno (~30-80 linhas)
- [ ] ❌ **ZERO arquivos de cores** (usa classes utilitárias)
- [ ] ✅ Cores aplicadas no Vue via computed properties
- [ ] Não duplica código entre variantes
- [ ] `index.scss` importa todas as variantes

---

## 🎬 LAYER 4: Output (Saída Final)

### **Responsabilidade**
Estados especiais, brandability, e orquestração final.

### **Estrutura Típica**

```
4-output/
├── _states.scss    → Dark mode, loading, focus, disabled
├── _brands.scss    → Hub, Water, Waste
└── index.scss      → Importa tudo
```

### **Exemplo: States**

```scss
/* 4-output/_states.scss */

/* Dark Mode */
[data-theme="dark"] .dss-button {
  /* Ajustes para dark mode */
}

/* Focus (acessibilidade) */
.dss-button:focus-visible {
  outline: none;
  box-shadow: var(--dss-focus-shadow-primary);
}

/* Loading */
.dss-button--loading {
  pointer-events: none;
  position: relative;

  .dss-button__label {
    opacity: 0;
  }

  &::after {
    content: '';
    /* spinner styles */
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .dss-button {
    border: var(--dss-border-width-md) solid currentColor;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .dss-button {
    transition: none;
  }
}
```

### **Exemplo: Brands**

```scss
/* 4-output/_brands.scss */

/* Hub - Laranja */
[data-brand="hub"] .dss-button--brand-hub,
.dss-button--brand-hub {
  /* Usa token de brand - NÃO hardcoded */
  background-color: var(--dss-hub-600);

  &:hover:not(:disabled) {
    background-color: var(--dss-hub-700);
  }

  /* Hover com RGB */
  &.dss-button--outlined:hover {
    background-color: rgba(var(--dss-hub-primary-rgb), 0.1);
  }
}

/* Water - Azul */
[data-brand="water"] .dss-button--brand-water {
  background-color: var(--dss-water-500);
  /* ... */
}

/* Waste - Verde */
[data-brand="waste"] .dss-button--brand-waste {
  background-color: var(--dss-waste-600);
  /* ... */
}
```

### **Checklist Layer 4**
- [ ] Dark mode implementado
- [ ] Brandability (se aplicável)
- [ ] Focus states acessíveis
- [ ] High contrast mode
- [ ] Reduced motion
- [ ] Loading/disabled states (se aplicável)

---

## 🎼 Orquestrador Final

### **DssComponent.module.scss**

Arquivo PEQUENO (~40 linhas) que importa TODAS as camadas:

```scss
/* DssButton.module.scss */

/* ==========================================================================
   DssButton - ORQUESTRADOR FINAL

   Filosofia: Arquitetura em 4 Camadas
   ========================================================================== */

/* Layer 2: Composition */
@use './2-composition/base';

/* Layer 3: Variants */
@use './3-variants';

/* Layer 4: Output */
@use './4-output';

/* Accessibility Enhancements */
@media (prefers-contrast: high) {
  .dss-button {
    border: var(--dss-border-width-md) solid currentColor;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dss-button {
    transition: none;
    animation: none;
  }
}
```

### **Checklist Orquestrador**
- [ ] Arquivo pequeno (~40 linhas)
- [ ] Importa Layer 2, 3, 4
- [ ] Comentários explicam arquitetura
- [ ] Media queries de acessibilidade

---

## 🎨 Classes Utilitárias Globais (Padrão Quasar)

### **Arquivo Único de Cores**

**Localização:** `utils/_colors.scss`

Este arquivo contém TODAS as classes de cores do sistema (~150 linhas):

```scss
/* utils/_colors.scss */

/* Background utilities - 8 cores semânticas */
.bg-primary { background: var(--dss-primary) !important; }
.bg-secondary { background: var(--dss-secondary) !important; }
.bg-tertiary { background: var(--dss-tertiary) !important; }
.bg-accent { background: var(--dss-accent) !important; }
.bg-positive { background: var(--dss-positive) !important; }
.bg-negative { background: var(--dss-negative) !important; }
.bg-warning { background: var(--dss-warning) !important; }
.bg-info { background: var(--dss-info) !important; }

/* Text utilities - 8 cores semânticas */
.text-primary { color: var(--dss-primary) !important; }
.text-secondary { color: var(--dss-secondary) !important; }
.text-tertiary { color: var(--dss-tertiary) !important; }
.text-accent { color: var(--dss-accent) !important; }
.text-positive { color: var(--dss-positive) !important; }
.text-negative { color: var(--dss-negative) !important; }
.text-warning { color: var(--dss-warning) !important; }
.text-info { color: var(--dss-info) !important; }

/* Cores neutras */
.bg-white { background: var(--dss-white) !important; }
.bg-black { background: var(--dss-black) !important; }
.bg-dark { background: var(--dss-dark) !important; }
.bg-grey { background: var(--dss-grey) !important; }
.bg-transparent { background: transparent !important; }

.text-white { color: var(--dss-white) !important; }
.text-black { color: var(--dss-black) !important; }
.text-dark { color: var(--dss-dark) !important; }
.text-grey { color: var(--dss-grey) !important; }
```

### **Como Componentes Usam Classes Utilitárias**

**Padrão Quasar:** Computed properties aplicam classes dinamicamente.

**Exemplo Real - DssBadge:**

```javascript
// 1-structure/DssBadge.vue
computed: {
  badgeClasses() {
    // Determina cores seguindo padrão Quasar (QBadge)
    let colorClasses = '';

    if (this.outline === true || this.transparent === true) {
      // outline/transparent: apenas cor de texto
      colorClasses = `text-${this.color}`;
    } else {
      // normal: background + texto branco
      colorClasses = `bg-${this.color} text-white`;
    }

    // Override de text color se especificado
    if (this.textColor) {
      colorClasses += ` text-${this.textColor}`;
    }

    return [
      'dss-badge',
      colorClasses, // Classes utilitárias (.bg-primary, .text-primary)
      {
        'dss-badge--floating': this.floating,
        'dss-badge--transparent': this.transparent,
        'dss-badge--outline': this.outline,
        'dss-badge--rounded': this.rounded
      }
    ];
  }
}
```

**Resultado HTML:**

```html
<!-- Badge primary normal -->
<div class="dss-badge bg-primary text-white">5</div>

<!-- Badge primary outline -->
<div class="dss-badge text-primary dss-badge--outline">5</div>

<!-- Badge com textColor override -->
<div class="dss-badge bg-primary text-black">5</div>
```

### **Escalabilidade**

| Componentes | Modelo Antigo (por componente) | Modelo Quasar (global) | Redução |
|-------------|-------------------------------|------------------------|---------|
| 5 componentes | ~570 linhas | ~150 linhas | **-73%** |
| 10 componentes | ~1.140 linhas | ~150 linhas | **-87%** |
| 50 componentes | ~5.700 linhas | ~150 linhas | **-97%** |
| 100 componentes | ~11.400 linhas | ~150 linhas | **-99%** |

**Adicionar 100 componentes = 0 linhas extras de CSS de cores!** 🚀

---

## 📦 Exports e Index

### **index.js**

```javascript
/**
 * DssButton - Component Exports
 */

import DssButton from './1-structure/DssButton.vue'

export { DssButton }
export default DssButton
```

### **Se houver subcomponentes:**

```javascript
import DssCard from './1-structure/DssCard.vue'
import DssCardSection from './1-structure/DssCardSection.vue'
import DssCardActions from './1-structure/DssCardActions.vue'

export {
  DssCard,
  DssCardSection,
  DssCardActions
}

export default DssCard
```

---

## 📚 Documentação Obrigatória

### **README.md**

Todo componente DEVE ter:

1. **Descrição** do componente
2. **Estrutura de arquivos** (4 camadas)
3. **Props API** (tabela completa)
4. **Exemplos de uso** (5-10 exemplos)
5. **Tokens utilizados** (listagem completa)
6. **Migração do Quasar** (se aplicável)

---

## ✅ Checklist Completo

Use este checklist ao criar um novo componente:

### **📁 Estrutura**
- [ ] Diretório `1-structure/` criado
- [ ] Diretório `2-composition/` criado
- [ ] Diretório `3-variants/` criado
- [ ] Diretório `4-output/` criado
- [ ] `DssComponent.module.scss` criado
- [ ] `index.js` criado
- [ ] `README.md` criado
- [ ] `DssComponent.example.vue` criado

### **🔧 Layer 1: Structure**
- [ ] Props têm validadores
- [ ] Props têm JSDoc `@values`
- [ ] Events declarados em `emits`
- [ ] Computed properties para classes
- [ ] ZERO lógica de estilos no Vue

### **🎨 Layer 2: Composition**
- [ ] ZERO valores hardcoded
- [ ] ZERO tokens component-specific
- [ ] Usa APENAS tokens genéricos
- [ ] Usa mixins quando disponíveis
- [ ] Código bem comentado

### **🎭 Layer 3: Variants**
- [ ] 1 arquivo = 1 variante
- [ ] Usa tokens RGB: `rgba(var(--dss-xxx-rgb), opacity)`
- [ ] Arquivos pequenos (~30-80 linhas)
- [ ] `index.scss` importa todas as variantes

### **🎬 Layer 4: Output**
- [ ] Dark mode implementado
- [ ] Brandability (se aplicável)
- [ ] Focus states acessíveis
- [ ] High contrast mode
- [ ] Reduced motion
- [ ] States especiais (loading, disabled)

### **📦 Exports**
- [ ] `index.js` exporta componentes
- [ ] Subcomponentes exportados (se houver)

### **📚 Documentação**
- [ ] README.md completo
- [ ] Estrutura de arquivos documentada
- [ ] Props API documentada
- [ ] 5-10 exemplos de uso
- [ ] Tokens utilizados listados

### **✅ Qualidade**
- [ ] Build sem erros
- [ ] ZERO console warnings
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] Testes (unit/integration)

---

## 🎯 Componentes de Referência

**Componente Exemplo:** DssCard
```
Location: /dss/components/base/DssCard/
Status: ✅ Implementado com 4 camadas
Lines: ~425 linhas (vs ~800 monolítico)
Variants: 4 (elevated, flat, bordered, outlined)
```

**Próximos Componentes:**
- [ ] DssInput (4 camadas)
- [ ] DssSelect (4 camadas)
- [ ] DssCheckbox (4 camadas)
- [ ] DssRadio (4 camadas)
- [ ] DssDialog (4 camadas)

---

## 🚫 Anti-Patterns (O QUE NÃO FAZER)

### ❌ **Anti-Pattern 1: Arquivos de Cores por Componente**

```scss
/* ❌ ERRADO - Modelo antigo (NUNCA fazer) */
DssButton/3-variants/_colors.scss (150 linhas)
DssBadge/3-variants/_colors.scss (200 linhas)
DssAvatar/3-variants/_colors.scss (220 linhas)

.dss-button--primary { background: var(--dss-primary); }
.dss-button--secondary { background: var(--dss-secondary); }
// ... duplicação massiva

/* ✅ CORRETO - Padrão Quasar */
utils/_colors.scss (150 linhas - arquivo único)

.bg-primary { background: var(--dss-primary) !important; }
.bg-secondary { background: var(--dss-secondary) !important; }
// ... usado por TODOS os componentes
```

**Impacto:** 50 componentes = 7.500 linhas duplicadas vs 150 linhas reutilizáveis (97% de redução)

### ❌ **Anti-Pattern 2: Tokens Component-Specific**

```scss
/* ❌ ERRADO */
--dss-button-padding: 16px;
--dss-card-shadow: 0 2px 4px rgba(0,0,0,0.1);
--dss-input-border: 1px solid #ccc;

/* ✅ CORRETO */
var(--dss-spacing-4)
var(--dss-elevation-1)
var(--dss-border-width-thin)
```

### ❌ **Anti-Pattern 3: Valores Hardcoded**

```scss
/* ❌ ERRADO */
.dss-button {
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

/* ✅ CORRETO */
.dss-button {
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-elevation-1);
}
```

### ❌ **Anti-Pattern 4: Arquivo Monolítico**

```scss
/* ❌ ERRADO - tudo em 1 arquivo */
DssButton.module.scss (1,000 linhas)

/* ✅ CORRETO - 4 camadas */
2-composition/_base.scss (~100 linhas)
3-variants/_filled.scss (~50 linhas)
3-variants/_outlined.scss (~50 linhas)
4-output/_states.scss (~60 linhas)
DssButton.module.scss (~40 linhas)
```

### ❌ **Anti-Pattern 5: Lógica de Estilos no Vue**

```vue
<!-- ❌ ERRADO -->
<template>
  <button :style="{ padding: size === 'sm' ? '8px' : '16px' }">
</template>

<!-- ✅ CORRETO -->
<template>
  <button :class="`dss-button--${size}`">
</template>
```

### ❌ **Anti-Pattern 6: Aplicar Cores no SCSS**

```scss
/* ❌ ERRADO - Cores no SCSS */
.dss-button--primary {
  background-color: var(--dss-primary);
  color: white;
}

/* ✅ CORRETO - Cores no Vue via classes utilitárias */
```

```javascript
computed: {
  buttonClasses() {
    return [
      'dss-button',
      `bg-${this.color}`,  // ← Classes utilitárias
      'text-white'
    ];
  }
}
```

---

## 📞 Suporte

**Dúvidas sobre arquitetura?**
- Consulte o DssCard como referência
- Leia este guia completo
- Verifique a filosofia DSS: "Tokens = Provedores, Componentes = Consumidores"

**Componente criado:** 18/12/2025
**Última atualização:** 18/12/2025
**Versão:** 2.0
