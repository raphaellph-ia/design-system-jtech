# DSS - Arquitetura de Componentes

> **📅 Criado:** Janeiro 2025
> **🔄 Atualizado:** Janeiro 2025 (Ação 3 - Refatoração Completa + Testes)
> **🎯 Objetivo:** Documentar a filosofia e padrões de construção de componentes DSS
> **✅ Implementado:** Arquitetura de 4 camadas, Testes unitários, Token guidelines

---

## ⚠️ **CORREÇÃO CRÍTICA DA ARQUITETURA**

### **Arquitetura Real do DSS**

O DSS **NÃO** é um sistema de componentes standalone. O DSS é um **sistema de tokens** que se aplica sobre o **Quasar Framework**.

#### ✅ **O que o DSS É:**
1. **Sistema de Tokens CSS Variables** - Define cores, espaçamentos, sombras, etc.
2. **Camada de Brandabilidade** - Permite trocar marcas (Hub, Water, Waste) em runtime
3. **Sistema de Acessibilidade** - Garante WCAG 2.1 AA com mixins e tokens
4. **Overrides Quasar** - Aplica tokens DSS em componentes Quasar existentes

#### ❌ **O que o DSS NÃO É:**
1. **NÃO é biblioteca de componentes standalone**
2. **NÃO substitui o Quasar**
3. **NÃO cria componentes do zero**

#### **DssButton: A Abordagem Correta**

**ANTES (Incorreto):**
- ❌ "DssButton criado do zero"
- ❌ "Não usa código do Quasar"
- ❌ "Autônomo e independente"

**AGORA (Correto):**
- ✅ **DssButton mantém estrutura 100% idêntica ao `<q-btn>` internamente**
- ✅ **Aplica tokens DSS ao invés de classes CSS Quasar**
- ✅ **Todas as props, slots, eventos e comportamentos do q-btn**
- ✅ **Wrapper inteligente que traduz Quasar → DSS Tokens**

### **Todos os Sistemas Usam Quasar**
- **Hub, Water, Waste** → Todos usam Quasar Framework
- **DSS** → Provê apenas tokens e overrides
- **Apps** → Usam `<q-btn>`, `<q-card>`, etc. com aparência DSS

---

## 📋 Índice

### **PARTE I: FUNDAMENTOS**
1. [Filosofia de Design](#filosofia-de-design)
2. [Anatomia do DssButton](#anatomia-do-dssbutton)
3. [Regras de Implementação](#regras-de-implementação)
4. [Padrões Obrigatórios](#padrões-obrigatórios)
5. [🚫 O Que NÃO Fazer](#o-que-não-fazer) ← **NOVO**

### **PARTE II: TUTORIAL PRÁTICO**
6. [📝 Guia para Novos Componentes](#guia-para-novos-componentes)
   - [📋 Pré-requisitos](#pré-requisitos)
   - [🎯 Tutorial Passo a Passo](#tutorial-passo-a-passo) ← **NOVO**
     - Passo 1: Estrutura de Diretórios
     - Passo 2: Layer 1 - Structure
     - Passo 3: Layer 2 - Composition
     - Passo 4: Layer 3 - Variants
     - Passo 5: Layer 4 - Output
     - Passo 6: Orquestrador Final
     - Passo 7: Exports
     - Passo 8: Exemplo de Uso
     - Passo 9: Adicionar ao Build
   - [✅ Checklist Final](#checklist-final) ← **DETALHADO**

### **PARTE III: REFERÊNCIA**
7. [Diferenças vs Quasar](#diferenças-vs-quasar)
8. [🎓 Exemplo Completo: DssCard](#exemplo-completo-dsscard-template)
9. [📚 Referências Rápidas](#referências-rápidas) ← **NOVO**
10. [🚨 Gaps Identificados vs Quasar](#gaps-identificados-vs-quasar)
11. [✅ Resumo Executivo](#resumo-executivo)
12. [📝 Padroes de Documentacao - Linguagem DSS-First](#padroes-de-documentacao---linguagem-dss-first) ← **NOVO**

---

## 🎯 Filosofia de Design

O DSS é um **sistema de tokens** aplicado sobre componentes Quasar existentes, seguindo princípios que devem ser aplicados a **todos** os componentes:

### 1. **Token First** 🎨
**Regra de Ouro:** NUNCA use valores hard-coded. SEMPRE use tokens DSS.

```scss
/* ❌ ERRADO - Valores diretos */
.component {
  padding: 16px;
  color: #1F86DE;
  border-radius: 4px;
}

/* ✅ CORRETO - Tokens DSS */
.component {
  padding: var(--dss-spacing-4);
  color: var(--dss-action-primary);
  border-radius: var(--dss-radius-button);
}
```

**Por quê?**
- ✅ Brandabilidade automática (Hub, Water, Waste)
- ✅ Dark mode automático
- ✅ Consistência visual garantida
- ✅ Mudanças centralizadas

### 2. **Acessibilidade Nativa** ♿

Todos os componentes DEVEM seguir **WCAG 2.1 AA** por padrão:

```scss
.dss-component {
  /* Touch Targets: Mínimo 48x48px */
  @include dss-touch-target('ideal');

  /* Focus Ring: Contraste 4.5:1 */
  @include dss-focus-ring('primary');

  /* Transições: Respeita prefers-reduced-motion */
  @include dss-transition(all, 'fast');
}
```

**Checklist de Acessibilidade:**
- [ ] Touch targets ≥ 48×48px (mixins)
- [ ] Focus rings visíveis 3px com contraste 4.5:1
- [ ] ARIA labels apropriados
- [ ] Estados (loading, disabled) anunciados
- [ ] Navegação por teclado funcional
- [ ] Suporte a `prefers-reduced-motion`
- [ ] Suporte a `prefers-contrast: high`

### 3. **Brandabilidade por Contexto** 🎨

Componentes devem reagir a `data-brand`:

```html
<!-- Contexto Hub - botão fica laranja -->
<div data-brand="hub">
  <DssButton color="primary">Hub</DssButton>
</div>

<!-- Contexto Water - botão fica azul -->
<div data-brand="water">
  <DssButton color="primary">Water</DssButton>
</div>
```

**Implementação:**
```scss
/* Hovers específicos por brand */
[data-brand="hub"] {
  .dss-component--primary:hover {
    background-color: rgba(239, 122, 17, 0.1) !important;
  }
}

[data-brand="water"] {
  .dss-component--primary:hover {
    background-color: rgba(14, 136, 228, 0.1) !important;
  }
}
```

### 4. **Dark Mode Automático** 🌙

Componentes devem reagir a `data-theme="dark"`:

```scss
/* Tokens mudam automaticamente */
.dss-component {
  background: var(--dss-surface-default); /* white → gray-800 */
  color: var(--dss-text-body);            /* dark → gray-200 */
}

/* Exceções específicas quando necessário */
[data-theme="dark"] {
  .dss-component--special {
    color: var(--dss-special-light); /* versão clara */
  }
}
```

---

## 🔍 Anatomia do DssButton

### Estrutura Vue (205 linhas)

#### 1. **Template Semântico**
```vue
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    :class="buttonClasses"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="dss-button__loading">
      <svg>...</svg>
    </span>

    <!-- Left icon -->
    <span v-if="icon && !loading" class="dss-button__icon--left">
      <slot name="icon">{{ icon }}</slot>
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right icon -->
    <span v-if="iconRight" class="dss-button__icon--right">
      <slot name="icon-right">{{ iconRight }}</slot>
    </span>
  </button>
</template>
```

**Padrão HTML Semântico:**
- ✅ Usa `<button>` nativo (não `<div>` com role)
- ✅ Atributos nativos: `type`, `disabled`, `aria-*`
- ✅ Estrutura hierárquica clara (loading → icon → label → icon-right)

#### 2. **Props com Validação**
```javascript
props: {
  color: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'tertiary', 'accent', 'dark',
      'positive', 'negative', 'warning', 'info'
    ].includes(value)
  },

  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },

  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outlined', 'flat', 'unelevated'].includes(value)
  }
}
```

**Padrão de Props:**
- ✅ Valores default definidos
- ✅ Validação com arrays permitidos
- ✅ Documentação JSDoc nos comentários
- ✅ Type checking rigoroso

#### 3. **Computed Classes BEM**
```javascript
computed: {
  buttonClasses() {
    return [
      'dss-button',                      // Block
      `dss-button--${this.color}`,       // Modifier: color
      `dss-button--${this.size}`,        // Modifier: size
      `dss-button--${this.variant}`,     // Modifier: variant
      {
        'dss-button--loading': this.loading,
        'dss-button--disabled': this.disabled,
        'dss-button--no-caps': this.noCaps,
        'dss-button--round': this.round,
        'dss-button--dense': this.dense,
        'dss-button--block': this.block,
        'dss-button--icon-only': this.isIconOnly
      }
    ]
  }
}
```

**Padrão BEM:**
- ✅ Block: `.dss-button`
- ✅ Elements: `.dss-button__icon`, `.dss-button__label`
- ✅ Modifiers: `.dss-button--primary`, `.dss-button--loading`

### Estrutura SCSS (825 linhas)

#### 1. **Base Styles (Reset + Layout)**
```scss
.dss-button {
  /* Reset completo */
  appearance: none;
  background: none;
  border: none;
  margin: 0;

  /* Layout flex */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);

  /* Typography com tokens */
  font-family: var(--dss-font-family-base);
  font-weight: var(--dss-font-weight-semibold);
  text-transform: uppercase;

  /* Acessibilidade OBRIGATÓRIA */
  @include dss-touch-target('ideal');  // 48x48px
  @include dss-focus-ring('primary');  // Focus ring 3px
  @include dss-transition(all, 'fast'); // Respeita reduced-motion
}
```

**Padrão Base:**
- ✅ Reset nativo do browser
- ✅ Layout flexbox para alinhamento
- ✅ Tokens para TODOS os valores
- ✅ Mixins de acessibilidade OBRIGATÓRIOS

#### 2. **Sizes com Touch Targets**
```scss
.dss-button--xs {
  min-height: 32px;  /* Abaixo do ideal, mas permitido */
  min-width: 32px;
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  font-size: var(--dss-font-size-xs, 12px);
}

.dss-button--md {
  min-height: 48px;  /* ✅ WCAG 2.1 AA ideal */
  min-width: 48px;
  padding: var(--dss-spacing-3) var(--dss-spacing-6);
  font-size: var(--dss-font-size-base, 16px);
}
```

**Padrão de Sizes:**
- ✅ `min-height` e `min-width` para touch targets
- ✅ Tamanho padrão (md) é 48×48px (ideal WCAG)
- ✅ Padding e font-size escalados proporcionalmente

#### 3. **Variants com Estados**
```scss
.dss-button--filled {
  /* Elevação com tokens */
  box-shadow: var(--dss-elevation-1);

  &.dss-button--primary {
    background-color: var(--dss-action-primary);
    color: white;

    /* Estados com tokens */
    &:hover:not(:disabled) {
      background-color: var(--dss-action-primary-hover);
      box-shadow: var(--dss-elevation-card-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--dss-action-primary-deep);
      box-shadow: var(--dss-shadow-active);
    }
  }
}
```

**Padrão de Variants:**
- ✅ Estados: normal → hover → active → disabled
- ✅ Modificador `:not(:disabled)` para evitar estados inválidos
- ✅ TODOS os valores usam tokens

#### 4. **Brandabilidade**
```scss
/* Hovers específicos por brand */
[data-brand="hub"] {
  .dss-button--flat.dss-button--primary {
    &:hover:not(:disabled) {
      /* RGBA com cor do brand */
      background-color: rgba(239, 122, 17, 0.1) !important;
    }
  }
}
```

**Padrão de Brand:**
- ✅ Seletor `[data-brand="nome"]` externo
- ✅ `!important` para sobrescrever tokens
- ✅ RGBA com opacidade (0.1 hover, 0.2 active)

#### 5. **Dark Mode Exceptions**
```scss
[data-theme="dark"] {
  [data-brand="waste"] {
    .dss-button--flat.dss-button--primary {
      /* Versão mais clara para contraste */
      color: var(--dss-waste-500); /* vs -600 em light */
    }
  }
}
```

**Padrão Dark Mode:**
- ✅ Tokens mudam automaticamente (maioria dos casos)
- ✅ Exceções específicas quando necessário
- ✅ Sempre priorizar contraste WCAG

---

## ✅ Regras de Implementação

### 1. **Estrutura de Arquivos - Arquitetura de 4 Camadas** ⭐ **ATUALIZADO**

```
components/base/DssComponente/
├── 1-structure/                   # CAMADA 1 - Componente Vue
│   └── DssComponente.ts.vue       # TypeScript + Composition API
├── 2-composition/                 # CAMADA 2 - Estilos base
│   └── _base.scss                 # APENAS tokens genéricos
├── 3-variants/                    # CAMADA 3 - Variantes visuais
│   ├── _elevated.scss
│   ├── _flat.scss
│   ├── _outline.scss
│   └── index.scss                 # Orquestrador de variantes
├── 4-output/                      # CAMADA 4 - Brands e estados
│   ├── _brands.scss               # Hub, Water, Waste
│   ├── _states.scss               # Dark mode, high contrast
│   └── index.scss                 # Orquestrador de output
├── composables/                   # Lógica reutilizável (TypeScript)
│   └── useComponenteClasses.ts
├── types/                         # Interfaces TypeScript
│   └── componente.types.ts
├── DssComponente.module.scss      # Orquestrador principal (importa 4 camadas)
├── DssComponente.test.js          # Testes unitários (Vitest/Jest)
├── DssComponente.example.vue      # Showcase visual
├── README.md                      # Documentação
└── index.js                       # Export barrel
```

**Referência:** Ver `components/base/DssButton/` como golden sample.

**Estrutura Obrigatória:**
- ✅ **4 camadas SCSS** - 1-structure, 2-composition, 3-variants, 4-output
- ✅ **Componente Vue** - TypeScript + Composition API em `1-structure/`
- ✅ **Types** - Interfaces TypeScript em `types/`
- ✅ **Composables** - Lógica reutilizável em `composables/`
- ✅ **Orquestrador** - `.module.scss` que importa as 4 camadas
- ✅ **Testes** - `.test.js` cobrindo props, eventos, slots, acessibilidade
- ✅ **Showcase** - `.example.vue` para teste visual
- ✅ **Documentação** - `README.md` com exemplos e API
- ✅ **Export** - `index.js` para facilitar imports

### 2. **Import de Utilitários**

```scss
/* SEMPRE no topo do arquivo .module.scss */
@import '../../../utils/index';

/* Isso disponibiliza TODOS os mixins e funções:
 * - dss-touch-target()
 * - dss-focus-ring()
 * - dss-transition()
 * - dss-rem()
 * - etc.
 */
```

### 3. **Nomenclatura BEM**

```scss
/* Block */
.dss-component {
  /* Block styles */
}

/* Elements */
.dss-component__header { }
.dss-component__body { }
.dss-component__footer { }

/* Modifiers */
.dss-component--primary { }
.dss-component--large { }
.dss-component--disabled { }

/* State modifiers */
.dss-component--loading { }
.dss-component--active { }
```

**Padrão:**
- Block: `.dss-{component}`
- Element: `.dss-{component}__{element}`
- Modifier: `.dss-{component}--{modifier}`

### 4. **Props Padrão**

Todos os componentes DEVEM ter:

```javascript
props: {
  // 1. Color (semântico ou feedback)
  color: {
    type: String,
    default: 'primary'
  },

  // 2. Size (xs, sm, md, lg, xl)
  size: {
    type: String,
    default: 'md'
  },

  // 3. Disabled
  disabled: {
    type: Boolean,
    default: false
  },

  // 4. ARIA label (obrigatório se ícone-only)
  ariaLabel: {
    type: String,
    default: ''
  }
}
```

### 5. **Estados Obrigatórios**

```scss
.dss-component {
  /* Normal state */
  background: var(--dss-surface-default);

  /* Hover */
  &:hover:not(:disabled) {
    background: var(--dss-surface-hover);
  }

  /* Active/Press */
  &:active:not(:disabled) {
    background: var(--dss-surface-active);
  }

  /* Focus */
  @include dss-focus-ring('primary');

  /* Disabled */
  &:disabled,
  &.dss-component--disabled {
    opacity: var(--dss-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

---

## 🎯 Padrões Obrigatórios

### 1. **Touch Targets WCAG**

```scss
/* SEMPRE usar mixins */
.dss-component {
  @include dss-touch-target('ideal'); // 48x48px

  /* OU manualmente: */
  min-height: 48px;
  min-width: 48px;
}

/* Componentes pequenos: mínimo 44x44px */
.dss-component--small {
  @include dss-touch-target('min'); // 44x44px
}
```

### 2. **Focus Rings**

```scss
.dss-component {
  /* Primário (azul) */
  @include dss-focus-ring('primary');

  /* Erro (vermelho) */
  @include dss-focus-ring('error');

  /* Customizado */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 134, 222, 0.5);
  }
}
```

### 3. **Transições com Reduced Motion**

```scss
.dss-component {
  /* SEMPRE usar mixin */
  @include dss-transition(all, 'fast');

  /* Isso gera: */
  transition: all 150ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

### 4. **Alto Contraste**

```scss
@media (prefers-contrast: high) {
  .dss-component {
    border: 2px solid currentColor;
    font-weight: var(--dss-font-weight-bold);

    &:focus-visible {
      outline: 3px solid currentColor;
      outline-offset: 2px;
    }
  }
}
```

### 5. **Loading States**

```scss
.dss-component--loading {
  /* Esconder conteúdo */
  .dss-component__content {
    opacity: 0;
  }

  /* Mostrar spinner */
  .dss-component__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 0.8s linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
}
```

### 6. **Testes Unitários** ⭐ **NOVO - OBRIGATÓRIO**

Todos os componentes DEVEM ter arquivo `.test.js` com cobertura completa:

```javascript
// ComponentName.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from './ComponentName.vue'

describe('ComponentName', () => {
  // 1. Renderização básica
  it('renderiza corretamente', () => {
    const wrapper = mount(ComponentName)
    expect(wrapper.exists()).toBe(true)
  })

  // 2. Props - TODAS as props devem ser testadas
  it('aplica color prop', () => {
    const wrapper = mount(ComponentName, {
      props: { color: 'primary' }
    })
    expect(wrapper.classes()).toContain('dss-component--primary')
  })

  // 3. Estados - loading, disabled, etc.
  it('desabilita quando disabled=true', () => {
    const wrapper = mount(ComponentName, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  // 4. Eventos - TODOS os eventos devem ser testados
  it('emite evento click', async () => {
    const wrapper = mount(ComponentName)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 5. Slots - TODOS os slots devem ser testados
  it('renderiza slot default', () => {
    const wrapper = mount(ComponentName, {
      slots: { default: 'Content' }
    })
    expect(wrapper.text()).toContain('Content')
  })

  // 6. Acessibilidade WCAG - OBRIGATÓRIO
  it('tem aria-label quando fornecido', () => {
    const wrapper = mount(ComponentName, {
      props: { ariaLabel: 'Label' }
    })
    expect(wrapper.attributes('aria-label')).toBe('Label')
  })
})
```

**Cobertura Mínima Obrigatória:**
1. ✅ **Renderização básica** - Componente monta sem erros
2. ✅ **TODAS as props** - Cada prop testada individualmente
3. ✅ **TODOS os estados** - loading, disabled, active, etc.
4. ✅ **TODOS os eventos** - click, change, input, etc.
5. ✅ **TODOS os slots** - default, icon, custom slots
6. ✅ **Validadores** - Props com validator devem ser testados
7. ✅ **Computed properties** - Classes dinâmicas, isIconOnly, etc.
8. ✅ **Acessibilidade WCAG** - ARIA attributes, disabled states
9. ✅ **Integração** - Múltiplas props combinadas

**Exemplo Real: DssButton.test.js**
- 13 suítes de testes
- 60+ testes individuais
- Cobertura: Props (cores, tamanhos, variantes), Estados (loading, disabled), Eventos (click), Slots (icon, icon-right), Acessibilidade (aria-label, aria-busy, touch targets)

**Ferramentas:**
- **Vitest** (recomendado) ou **Jest**
- **@vue/test-utils** para montar componentes
- **Vitest UI** para visualização de testes

**Executar Testes:**
```bash
# Instalar Vitest (se não instalado)
npm install -D vitest @vue/test-utils

# Executar testes
npm run test

# Executar testes com UI
npm run test:ui

# Executar testes com coverage
npm run test:coverage
```

---

## 🔄 Diferenças vs Quasar

| Aspecto | Quasar Puro | DSS com Quasar |
|---------|-------------|----------------|
| **Tokens** | Variáveis SASS (`$primary`) | CSS Variables (`var(--dss-action-primary)`) |
| **Cores** | Classes (`bg-primary`) | Tokens (`var(--dss-action-primary)`) |
| **Brandabilidade** | Recompilação SASS | `[data-brand]` em runtime |
| **Dark Mode** | `body.dark` | `[data-theme="dark"]` |
| **Touch Targets** | Não garantido | 48×48px (WCAG ideal) via mixin |
| **Focus Ring** | ❌ FALTANTE | ⚠️ **CRÍTICO: tokens `--dss-focus-*` ainda não criados** |
| **Acessibilidade** | Básica | WCAG 2.1 AA completa |
| **Estrutura** | Componente Quasar | Wrapper DSS sobre Quasar |

**DSS É uma Camada Sobre Quasar:**
- ✅ **USA** componentes Quasar (`<q-btn>`, `<q-card>`, etc.)
- ✅ **APLICA** tokens DSS via overrides
- ✅ **MANTÉM** 100% da funcionalidade Quasar
- ✅ **ADICIONA** brandabilidade e acessibilidade aprimorada
- ✅ **DssButton** = `<q-btn>` internamente + tokens DSS

---

## 🚫 O Que NÃO Fazer

**Anti-patterns críticos que devem ser evitados ao criar componentes DSS.**

### ❌ **NUNCA Criar Arquivos de Cores**

O DSS segue o padrão Quasar de classes utilitárias globais. Criar arquivos de cores por componente viola este princípio e causa escalabilidade ruim.

```scss
/* ❌ ERRADO - NUNCA fazer isso! */
// 3-variants/_colors.scss
.dss-nome-componente--primary {
  background: var(--dss-primary);
}

.dss-nome-componente--secondary {
  background: var(--dss-secondary);
}

/* Problema: Cria duplicação massiva! */
/* Se tiver 10 componentes × 8 cores = 80 classes CSS redundantes */
```

**✅ SOLUÇÃO CORRETA:**

Cores são aplicadas via computed properties no Vue usando classes utilitárias globais:

```javascript
// 1-structure/DssNomeComponente.vue
computed: {
  componentClasses() {
    let colorClasses = '';

    if (this.variant === 'outlined') {
      colorClasses = `text-${this.color}`;
    } else {
      colorClasses = `bg-${this.color} text-white`;
    }

    return [
      'dss-nome-componente',
      `dss-nome-componente--${this.variant}`,
      colorClasses // ← Classes utilitárias (.bg-primary, .text-primary)
    ];
  }
}
```

### ❌ **NUNCA Usar Valores Hardcoded**

Valores hardcoded (px, %, em, hex) violam o princípio "Token First" e quebram brandabilidade.

```scss
/* ❌ ERRADO - Valores diretos */
.dss-nome-componente {
  padding: 16px;              /* ❌ Hardcoded */
  border-radius: 4px;         /* ❌ Hardcoded */
  color: #1F86DE;             /* ❌ Hardcoded */
  font-size: 14px;            /* ❌ Hardcoded */
}

/* Problemas: */
/* - Não respeita tokens DSS */
/* - Brandabilidade quebrada */
/* - Difícil manutenção */
/* - Inconsistência visual */
```

**✅ SOLUÇÃO CORRETA:**

Use SEMPRE tokens DSS genéricos:

```scss
/* ✅ CORRETO - Tokens DSS */
.dss-nome-componente {
  padding: var(--dss-spacing-4);
  border-radius: var(--dss-radius-md);
  color: var(--dss-action-primary);
  font-size: var(--dss-font-size-sm);
}

/* Benefícios: */
/* - Brandabilidade automática */
/* - Manutenção centralizada */
/* - Consistência garantida */
/* - Dark mode funciona */
```

### ❌ **NUNCA Aplicar Cores no SCSS**

Cores aplicadas diretamente no SCSS criam arquivos gigantes e duplicação desnecessária.

```scss
/* ❌ ERRADO - Cores no SCSS */
.dss-nome-componente--primary {
  background-color: var(--dss-primary);
  color: var(--dss-on-primary);
}

.dss-nome-componente--secondary {
  background-color: var(--dss-secondary);
  color: var(--dss-on-secondary);
}

.dss-nome-componente--tertiary {
  background-color: var(--dss-tertiary);
  color: var(--dss-on-tertiary);
}

/* ... repetir para todas as 8+ cores = EXPLOSÃO DE CSS! */
```

**✅ SOLUÇÃO CORRETA:**

Cores são aplicadas via classes utilitárias no Vue:

```javascript
/* ✅ CORRETO - Cores no Vue via computed properties */
computed: {
  componentClasses() {
    return [
      'dss-nome-componente',
      `bg-${this.color}`,    // ← Classe utilitária
      'text-white'            // ← Classe utilitária
    ];
  }
}

/* Benefícios: */
/* - ZERO linhas CSS extras por cor */
/* - Escalabilidade infinita (100 componentes = 0 CSS extra) */
/* - Classes utilitárias já existem globalmente */
```

### ❌ **NUNCA Usar Opacidade Hardcoded**

Após documentação de tokens de opacidade, use SEMPRE os tokens semânticos:

```scss
/* ❌ ERRADO - Opacidade hardcoded */
.dss-component--disabled {
  opacity: 0.6;           /* ❌ Hardcoded */
}

.dss-component:hover::before {
  background: rgba(0, 0, 0, 0.1);  /* ❌ Hardcoded */
}

/* Problemas: */
/* - Inconsistência entre componentes */
/* - Difícil padronização */
```

**✅ SOLUÇÃO CORRETA:**

Use tokens semânticos de opacidade:

```scss
/* ✅ CORRETO - Tokens de opacidade */
.dss-component--disabled {
  opacity: var(--dss-opacity-disabled);  /* 0.4 - Padrão DSS */
}

.dss-component:hover::before {
  background: currentColor;
  opacity: var(--dss-opacity-hover);     /* 0.1 - Overlay sutil */
}

.dss-component:active::after {
  opacity: var(--dss-opacity-active);    /* 0.2 - Estado ativo */
}

/* Benefícios: */
/* - Consistência entre componentes */
/* - Valores semânticos claros */
/* - Fácil auditoria e manutenção */
```

### ⚠️ **Impacto dos Anti-Patterns**

| Anti-Pattern | Impacto | Gravidade |
|--------------|---------|-----------|
| **Arquivos de cores** | 10 componentes × 8 cores = 80 classes CSS redundantes | 🔴 Crítico |
| **Valores hardcoded** | Brandabilidade quebrada, inconsistência visual | 🔴 Crítico |
| **Cores no SCSS** | Arquivo CSS 5-10x maior que necessário | 🔴 Crítico |
| **Opacidade hardcoded** | Inconsistência de estados entre componentes | 🟡 Médio |
| **Tokens component-specific** | Escalabilidade ruim (N componentes = N tokens) | 🟡 Médio |

---

## 📝 Guia para Novos Componentes

Este guia fornece um tutorial passo-a-passo para criar componentes DSS seguindo 100% o padrão Quasar Framework.

### 📋 Pré-requisitos

**Leitura obrigatória ANTES de começar:**
1. Filosofia de Design (seções anteriores deste documento)
2. Padrões Obrigatórios de acessibilidade
3. Anti-patterns na seção "🚫 O Que NÃO Fazer"

### 🎯 Tutorial Passo a Passo

#### **Passo 1: Criar Estrutura de Diretórios**

```bash
cd components/base/
mkdir DssNomeComponente
cd DssNomeComponente

# Criar as 4 camadas
mkdir 1-structure
mkdir 2-composition
mkdir 3-variants
mkdir 4-output
```

#### **Passo 2: Layer 1 - Structure (Vue)**

Criar `1-structure/DssNomeComponente.vue`:

```vue
<template>
  <div :class="componentClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DssNomeComponente',

  props: {
    /**
     * Color variant
     * @values primary, secondary, tertiary, accent, positive, negative, warning, info
     */
    color: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'].includes(v)
    },

    /**
     * Visual variant
     * @values filled, outlined
     */
    variant: {
      type: String,
      default: 'filled',
      validator: (v) => ['filled', 'outlined'].includes(v)
    },

    /**
     * Size
     * @values sm, md, lg
     */
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v)
    }
  },

  emits: ['click'],

  computed: {
    componentClasses() {
      // 🔥 PADRÃO QUASAR: Aplicar cores via classes utilitárias
      let colorClasses = '';

      if (this.variant === 'outlined') {
        // Variante outline: apenas cor de texto
        colorClasses = `text-${this.color}`;
      } else {
        // Variante filled: fundo colorido + texto branco
        colorClasses = `bg-${this.color} text-white`;
      }

      return [
        'dss-nome-componente',
        `dss-nome-componente--${this.variant}`,
        `dss-nome-componente--${this.size}`,
        colorClasses // ← Classes utilitárias (.bg-primary, .text-primary)
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../DssNomeComponente.module.scss';
</style>
```

#### **Passo 3: Layer 2 - Composition (Base Styles)**

Criar `2-composition/_base.scss`:

```scss
/* 2-composition/_base.scss */

@import '../../../../utils/index';

.dss-nome-componente {
  /* Reset */
  margin: 0;
  padding: 0;

  /* Layout - USA TOKENS GENÉRICOS */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);

  /* Typography - USA TOKENS GENÉRICOS */
  font-family: var(--dss-font-family-base);
  font-weight: var(--dss-font-weight-normal);

  /* Border Radius - USA TOKENS GENÉRICOS */
  border-radius: var(--dss-radius-md);

  /* Accessibility - USA MIXINS */
  @include dss-transition(all, 'fast');

  /* ⚠️ CORES NÃO VÃO AQUI - Aplicadas via classes utilitárias no Vue */
}
```

**✅ Checklist Layer 2:**
- [ ] ZERO valores hardcoded (px, %, em, hex)
- [ ] ZERO tokens component-specific (`--dss-component-*`)
- [ ] Todos os valores vêm de tokens genéricos
- [ ] Usa mixins quando disponíveis

#### **Passo 4: Layer 3 - Variants**

Criar `3-variants/_filled.scss`:

```scss
/* 3-variants/_filled.scss */

.dss-nome-componente--filled {
  /* Estilos específicos da variante filled */
  /* ⚠️ CORES NÃO VÃO AQUI */

  /* Exemplo: sombra (se aplicável) */
  box-shadow: var(--dss-elevation-1);

  &:hover {
    box-shadow: var(--dss-elevation-2);
  }
}
```

Criar `3-variants/_outlined.scss`:

```scss
/* 3-variants/_outlined.scss */

.dss-nome-componente--outlined {
  /* Background transparent */
  background-color: transparent;

  /* Border */
  border: var(--dss-border-width-md) solid currentColor;

  /* ⚠️ CORES NÃO VÃO AQUI */
  /* Cor vem de .text-primary aplicada no Vue */

  &:hover {
    background-color: currentColor;
    opacity: var(--dss-opacity-hover); /* Usar token, não hardcoded! */
  }
}
```

Criar `3-variants/index.scss`:

```scss
/* 3-variants/index.scss */

@forward './filled';
@forward './outlined';

/* ❌ NÃO criar _colors.scss aqui! */
```

**✅ Checklist Layer 3:**
- [ ] 1 arquivo = 1 variante
- [ ] ❌ **ZERO arquivos de cores** (usa classes utilitárias)
- [ ] Não duplica código entre variantes

#### **Passo 5: Layer 4 - Output (States)**

Criar `4-output/_states.scss`:

```scss
/* 4-output/_states.scss */

/* Dark Mode */
[data-theme="dark"] .dss-nome-componente {
  /* Ajustes específicos para dark mode (se necessário) */
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .dss-nome-componente {
    border: var(--dss-border-width-md) solid currentColor;
    font-weight: var(--dss-font-weight-bold);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .dss-nome-componente,
  .dss-nome-componente * {
    transition: none !important;
    animation: none !important;
  }
}
```

Criar `4-output/index.scss`:

```scss
/* 4-output/index.scss */

@forward './states';
```

**📋 Checklist - Layer 4:**
- [ ] Testar reduced-motion
- [ ] Testar high-contrast
- [ ] Validar touch targets no mobile

---

#### **Passo 6: Orquestrador Final**

Criar `DssNomeComponente.module.scss` - arquivo que importa todas as camadas:

```scss
/* DssNomeComponente.module.scss */

/* ==========================================================================
   DssNomeComponente - ORQUESTRADOR FINAL

   Filosofia: Arquitetura em 4 Camadas + Padrão Quasar (classes utilitárias)
   ========================================================================== */

/* Layer 2: Composition */
@use './2-composition/base';

/* Layer 3: Variants */
@use './3-variants';

/* Layer 4: Output */
@use './4-output';

/* ==========================================================================
   CORES: Aplicadas via classes utilitárias (.bg-*, .text-*) - Padrão Quasar
   Definidas em: utils/_colors.scss
   ========================================================================== */

/* ==========================================================================
   ACCESSIBILITY ENHANCEMENTS
   ========================================================================== */

/* High contrast mode */
@media (prefers-contrast: high) {
  .dss-nome-componente {
    border: 2px solid currentColor !important;
    font-weight: 700;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dss-nome-componente,
  .dss-nome-componente * {
    transition: none !important;
    animation: none !important;
  }
}
```

---

#### **Passo 7: Exports**

Criar `index.js` para exportar o componente:

```javascript
/**
 * DssNomeComponente - Component Exports
 */

import DssNomeComponente from './1-structure/DssNomeComponente.vue'

export { DssNomeComponente }
export default DssNomeComponente
```

---

#### **Passo 8: Exemplo de Uso**

Criar `DssNomeComponente.example.vue` para testar o componente:

```vue
<template>
  <div class="examples">
    <h2>DssNomeComponente - Exemplos</h2>

    <!-- Filled variants -->
    <section>
      <h3>Filled</h3>
      <DssNomeComponente variant="filled" color="primary">Primary</DssNomeComponente>
      <DssNomeComponente variant="filled" color="secondary">Secondary</DssNomeComponente>
      <DssNomeComponente variant="filled" color="accent">Accent</DssNomeComponente>
    </section>

    <!-- Outlined variants -->
    <section>
      <h3>Outlined</h3>
      <DssNomeComponente variant="outlined" color="primary">Primary</DssNomeComponente>
      <DssNomeComponente variant="outlined" color="secondary">Secondary</DssNomeComponente>
      <DssNomeComponente variant="outlined" color="accent">Accent</DssNomeComponente>
    </section>

    <!-- Sizes -->
    <section>
      <h3>Sizes</h3>
      <DssNomeComponente size="sm">Small</DssNomeComponente>
      <DssNomeComponente size="md">Medium</DssNomeComponente>
      <DssNomeComponente size="lg">Large</DssNomeComponente>
    </section>
  </div>
</template>

<script>
import DssNomeComponente from './index.js'

export default {
  components: {
    DssNomeComponente
  }
}
</script>

<style scoped>
.examples {
  padding: 2rem;
}

section {
  margin-bottom: 2rem;
}

section > * {
  margin-right: 1rem;
}
</style>
```

---

#### **Passo 9: Adicionar ao Build**

**1. Atualizar `components/base/index.js`:**

```javascript
// Adicionar export
export { DssNomeComponente } from './DssNomeComponente'
```

**2. Atualizar `index.scss`:**

```scss
// Adicionar import
@use 'components/base/DssNomeComponente/DssNomeComponente.module';
```

**3. Compilar e testar:**

```bash
# Compilar CSS
npm run build:css

# Compilar componentes Vue
npm run build:lib

# Verificar no navegador
# Abrir dss-example e testar o componente
# Hard reload: Ctrl+Shift+R
```

---

## ✅ Checklist Final

Antes de considerar o componente pronto, verifique todos os itens abaixo:

### **Estrutura**
- [ ] Diretório criado em `components/base/DssNomeComponente/`
- [ ] 4 camadas criadas (1-structure, 2-composition, 3-variants, 4-output)
- [ ] `DssNomeComponente.module.scss` criado
- [ ] `index.js` criado
- [ ] `DssNomeComponente.example.vue` criado

### **Layer 1: Structure**
- [ ] Props têm validadores
- [ ] Props têm JSDoc `@values`
- [ ] Events declarados em `emits`
- [ ] Computed property `componentClasses()` aplica classes utilitárias
- [ ] ZERO lógica de estilos no Vue

### **Layer 2: Composition**
- [ ] ZERO valores hardcoded
- [ ] ZERO tokens component-specific
- [ ] Usa APENAS tokens genéricos
- [ ] Usa mixins quando disponíveis

### **Layer 3: Variants**
- [ ] 1 arquivo = 1 variante
- [ ] ❌ **ZERO arquivos de cores** (usa classes utilitárias)
- [ ] Cores aplicadas no Vue via computed properties
- [ ] `index.scss` importa todas as variantes

### **Layer 4: Output**
- [ ] Dark mode implementado (se necessário)
- [ ] High contrast mode
- [ ] Reduced motion
- [ ] States especiais (loading, disabled, etc.)

### **Padrão Quasar**
- [ ] ✅ Cores aplicadas via classes utilitárias (`.bg-*`, `.text-*`)
- [ ] ❌ Nenhum arquivo `_colors.scss` criado
- [ ] Computed property usa template literals: `` `bg-${this.color}` ``

### **Build e Testes**
- [ ] `npm run build:css` sem erros (CSS compilado)
- [ ] ⚠️ **CRÍTICO**: `npm run build:lib` sem erros (componentes Vue compilados)
- [ ] ZERO console warnings
- [ ] Componente visível em `dss-example`
- [ ] Todas as variantes funcionando
- [ ] Hard reload no navegador (Ctrl+Shift+R)

### **Acessibilidade WCAG 2.1 AA**
- [ ] Contraste mínimo 4.5:1
- [ ] Touch targets ≥ 48×48px (se interativo)
- [ ] Focus ring visível
- [ ] Navegação por teclado (se interativo)
- [ ] ARIA labels apropriados
- [ ] Reduced motion suportado

---

## 🎓 Exemplo Completo: DssCard (Template)

Vamos criar um exemplo de como seria o **DssCard** seguindo todos os padrões:

### `DssCard.vue`
```vue
<template>
  <div
    :class="cardClasses"
    :role="role"
  >
    <!-- Header slot -->
    <header v-if="$slots.header" class="dss-card__header">
      <slot name="header" />
    </header>

    <!-- Body/Content -->
    <div class="dss-card__body">
      <slot />
    </div>

    <!-- Footer slot -->
    <footer v-if="$slots.footer" class="dss-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DssCard',

  props: {
    /**
     * Card variant
     * @values filled, outlined, flat
     */
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outlined', 'flat'].includes(value)
    },

    /**
     * Elevation level
     * @values 0, 1, 2, 3, 4, 5
     */
    elevation: {
      type: [Number, String],
      default: 1,
      validator: (value) => [0, 1, 2, 3, 4, 5].includes(Number(value))
    },

    /**
     * ARIA role
     */
    role: {
      type: String,
      default: 'article'
    }
  },

  computed: {
    cardClasses() {
      return [
        'dss-card',
        `dss-card--${this.variant}`,
        `dss-card--elevation-${this.elevation}`
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './DssCard.module.scss';
</style>
```

### `DssCard.module.scss`
```scss
@import '../../../utils/index';

/* ==========================================================================
   BASE CARD
   ========================================================================== */

.dss-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  position: relative;

  /* Background e border */
  background: var(--dss-surface-default);
  border-radius: var(--dss-radius-card, 12px);

  /* Transições */
  @include dss-transition(all, 'fast');

  /* Elevação padrão */
  box-shadow: var(--dss-elevation-1);
}

/* ==========================================================================
   CARD VARIANTS
   ========================================================================== */

.dss-card--filled {
  background: var(--dss-surface-default);
  border: 1px solid var(--dss-border-card-default);
}

.dss-card--outlined {
  background: transparent;
  border: 2px solid var(--dss-border-default);
  box-shadow: none;
}

.dss-card--flat {
  background: var(--dss-surface-subtle);
  box-shadow: none;
}

/* ==========================================================================
   ELEVATION LEVELS
   ========================================================================== */

.dss-card--elevation-0 { box-shadow: var(--dss-elevation-0); }
.dss-card--elevation-1 { box-shadow: var(--dss-elevation-1); }
.dss-card--elevation-2 { box-shadow: var(--dss-elevation-2); }
.dss-card--elevation-3 { box-shadow: var(--dss-elevation-3); }
.dss-card--elevation-4 { box-shadow: var(--dss-elevation-4); }
.dss-card--elevation-5 { box-shadow: var(--dss-elevation-5); }

/* ==========================================================================
   CARD ELEMENTS
   ========================================================================== */

.dss-card__header {
  padding: var(--dss-card-padding, var(--dss-spacing-6));
  border-bottom: 1px solid var(--dss-border-divider-default);
}

.dss-card__body {
  padding: var(--dss-card-padding, var(--dss-spacing-6));
  flex: 1;
}

.dss-card__footer {
  padding: var(--dss-card-padding, var(--dss-spacing-6));
  border-top: 1px solid var(--dss-border-divider-default);
}

/* ==========================================================================
   BRANDABILIDADE
   ========================================================================== */

[data-brand="hub"] {
  .dss-card--outlined {
    border-color: var(--dss-hub-600);
  }
}

[data-brand="water"] {
  .dss-card--outlined {
    border-color: var(--dss-water-500);
  }
}

[data-brand="waste"] {
  .dss-card--outlined {
    border-color: var(--dss-waste-600);
  }
}

/* ==========================================================================
   ACCESSIBILITY
   ========================================================================== */

@media (prefers-contrast: high) {
  .dss-card {
    border: 2px solid currentColor;
  }
}
```

---

## ✅ Resumo Executivo

### **O que o DssButton É:**
1. ✅ **Wrapper sobre `<q-btn>`** mantendo estrutura interna 100% idêntica
2. ✅ **Aplica tokens DSS** ao invés de classes CSS Quasar
3. ✅ **Todas as 29 props do q-btn** (documentadas em `Q_BTN_COMPLETE_SPECIFICATION.md`)
4. ✅ **Todos os 2 slots do q-btn** (default, loading)
5. ✅ **Todos os 5 eventos do q-btn** (click, keydown, keyup, mousedown, touchstart)
6. ✅ **WCAG 2.1 AA completo** por padrão
7. ✅ **Brandável** via `data-brand`
8. ✅ **Dark mode** via `data-theme`

### **O que o DssButton NÃO É:**
1. ❌ **NÃO é componente standalone** criado do zero
2. ❌ **NÃO substitui** o q-btn do Quasar
3. ❌ **NÃO funciona** sem Quasar Framework

### **Regras de Ouro para Novos Componentes:**

1. 📖 **Consulta Obrigatória**: SEMPRE consultar API oficial do componente Quasar antes de implementar
2. 🏗️ **Estrutura Idêntica**: Manter 100% da estrutura interna do componente Quasar
3. 🎨 **Token First**: Substituir classes Quasar (`bg-primary`) por tokens DSS (`var(--dss-action-primary)`)
4. ♿ **Acessibilidade**: Adicionar mixins DSS (touch-target, focus-ring, transition)
5. 🏷️ **BEM Naming**: `.dss-component`, `.dss-component__element`, `.dss-component--modifier`
6. 🎨 **Brandabilidade**: Reagir a `[data-brand="hub|water|water"]`
7. 🌙 **Dark Mode**: Reagir a `[data-theme="dark"]`
8. ✅ **Props Completas**: TODAS as props do componente Quasar original
9. 📱 **Touch Targets**: Aplicar `@include dss-touch-target('ideal')` (48×48px WCAG)
10. 🎯 **Focus Rings**: Aplicar `@include dss-focus-ring('primary')` (3px, contraste 4.5:1)
11. 🎭 **Estados**: normal → hover → active → disabled → loading (idênticos ao Quasar)
12. 📚 **Documentação**: Listar TODAS as props/slots/eventos do Quasar + gaps identificados

---

## 🚨 Gaps Identificados vs Quasar

Consultar **`Q_BTN_COMPLETE_SPECIFICATION.md`** para lista completa de gaps identificados no q-btn:

### **CRÍTICOS** 🔴
1. **Focus Ring Tokens** - ❌ **FALTANTE NO DSS**
   - Quasar não tem focus ring visível
   - DSS precisa criar: `--dss-focus-ring-*`, `--dss-focus-primary`, etc.
   - **AÇÃO URGENTE**: Criar `tokens/semantic/_focus.scss`

2. **Touch Targets** - ✅ DSS tem mixin
   - Quasar não garante 48×48px mínimo
   - DSS tem `@include dss-touch-target('ideal')`
   - **AÇÃO**: Aplicar em todos os componentes

### **MÉDIOS** 🟡
3. **Size System** - ✅ Decisão: Manter valores DSS
   - Quasar: xs=8px, sm=10px, md=14px, lg=20px, xl=24px
   - **DSS**: xs=12px, sm=14px, md=16px, lg=18px, xl=20px (mantido)
   - **DECISÃO TOMADA**: Manter valores DSS originais (acessibilidade WCAG)

4. **Design Variant "push"** - ✅ Implementado
   - Quasar tem design `push` (elevado com profundidade)
   - **DSS**: Implementado em `DssButton.module.scss`
   - Efeito 3D com sombras profundas + movimento para baixo no active
   - **DECISÃO TOMADA**: Implementado com compatibilidade total Quasar

---

## 📚 Referências Rápidas

### **Documentação Geral**
- **[DSS_COMPONENT_ARCHITECTURE.md](./DSS_COMPONENT_ARCHITECTURE.md)** - Este documento (arquitetura completa)
- **[DSS_IMPLEMENTATION_GUIDE.md](./DSS_IMPLEMENTATION_GUIDE.md)** - Setup e instalação para consumidores
- **[REFACTORING_QUASAR_PATTERN.md](./REFACTORING_QUASAR_PATTERN.md)** - Padrão Quasar detalhado
- **[DSS_TOKEN_GUIDELINES.md](./DSS_TOKEN_GUIDELINES.md)** - Guia completo de tokens

### **Componentes de Referência**

Use como exemplo ao criar novos componentes:
- **DssButton** - `components/base/DssButton/`
  - Exemplo completo de wrapper sobre q-btn
  - Implementação das 4 camadas
  - Todas as 29 props, 2 slots, 5 eventos
  - Ver `DssButton.md` para especificação completa

- **DssBadge** - `components/base/DssBadge/`
  - Componente visual simples
  - Exemplo de sistema de cores via classes utilitárias
  - Variantes rounded, square

- **DssAvatar** - `components/base/DssAvatar/`
  - Componente com texto e imagem
  - Sistema de tamanhos consistente
  - Exemplo de fallback de conteúdo

### **Templates e Checklists**
- **Tutorial Passo a Passo** - Seção "📝 Guia para Novos Componentes" (acima)
- **Checklist Final** - Seção "✅ Checklist Final" (acima)
- **Anti-Patterns** - Seção "🚫 O Que NÃO Fazer" (acima)

### **Governança e Documentação**
- **[Checklist de Documentação](../guides/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md)** - Guia de referência para documentar componentes
- **[Componentes Compostos](../guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md)** - Regras para componentes que orquestram outros componentes DSS

---

## 📝 Padroes de Documentacao - Linguagem DSS-First

### Por que isso importa?

O DSS e uma **camada de governanca** sobre o Quasar, nao um espelho. A documentacao deve refletir isso.

### Linguagem PROIBIDA (causa rejeicao de PR)

```markdown
<!-- ❌ NUNCA ESCREVA ISSO -->
O DssComponente é 100% compatível com a API do Quasar Framework.

<!-- ❌ NUNCA ESCREVA ISSO -->
Props 100% implementadas do QComponente:
- ✅ color
- ✅ size
- ✅ ...

<!-- ❌ NUNCA ESCREVA ISSO -->
| Brand | Cor Primaria |
|-------|--------------|
| Hub   | #EF7A11      |
```

### Linguagem OBRIGATORIA

```markdown
<!-- ✅ ESCREVA ASSIM -->
O DssComponente e um **wrapper DSS baseado no QComponente**, com API publica
governada pelo Design System Sansys.

<!-- ✅ ESCREVA ASSIM -->
> **Governanca**: O DssComponente e um **wrapper governado pelo DSS**, nao
> uma copia do QComponente. A API publica e deliberadamente curada.

<!-- ✅ ESCREVA ASSIM para brandabilidade -->
> Para detalhes das paletas de cores por brand, consulte
> [`DSS_TOKEN_REFERENCE.md - Secao 2.2`](./DSS_TOKEN_REFERENCE.md#22-brand-palettes)
```

### Tokens na Documentacao

Ao documentar tokens:

```markdown
<!-- ❌ ERRADO - muito vago -->
Tokens de cor: cores de feedback, cores semanticas

<!-- ✅ CORRETO - nomes exatos + links -->
| Categoria | Tokens Usados | Onde Encontrar |
|-----------|---------------|----------------|
| **Cores Semanticas** | `--dss-feedback-positive`, `--dss-feedback-negative` | [Secao 2.3](./DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) |
```

### Checklist de Validacao de Documentacao

Antes de submeter PR, verifique:
- [ ] Busque por "100%" - nao deve existir
- [ ] Busque por "compativel" - deve ser "wrapper governado"
- [ ] Busque por cores hex em secao de brandabilidade - deve referenciar DSS_TOKEN_REFERENCE
- [ ] Tokens tem nomes exatos (`--dss-*`) e links

---

**Próximo Passo:** Use este guia para criar **DssCard** ou **DssInput** seguindo exatamente os mesmos padrões!
