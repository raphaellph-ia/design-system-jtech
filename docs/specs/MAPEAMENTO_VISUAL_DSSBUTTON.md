# 🗺️ MAPEAMENTO COMPLETO: Arquivos que Definem Visualmente o DssButton

**Data:** 16 de Dezembro de 2025
**Componente:** DssButton
**Objetivo:** Mapear TODOS os arquivos que afetam a aparência visual do componente

---

## 📋 ÍNDICE DE CATEGORIAS

1. [Arquivo Principal do Componente](#1-arquivo-principal-do-componente)
2. [Tokens Semânticos (Cores, Ações, Feedback)](#2-tokens-semânticos)
3. [Tokens de Acessibilidade (Focus Rings)](#3-tokens-de-acessibilidade)
4. [Tokens de Marca (Hub, Water, Waste)](#4-tokens-de-marca)
5. [Tokens Globais (Primitivos)](#5-tokens-globais)
6. [Mixins e Funções](#6-mixins-e-funções)
7. [Patch de Correções](#7-patch-de-correções)
8. [Temas (Light/Dark)](#8-temas)

---

## 1. ARQUIVO PRINCIPAL DO COMPONENTE

### `components/base/DssButton/DssButton.module.scss` (23KB)

**Responsabilidades:**
- ✅ Estrutura base do botão (layout, reset, display)
- ✅ Estados de interação (hover, active, disabled)
- ✅ Variantes visuais (filled, outlined, flat, push, unelevated)
- ✅ 9 cores semânticas (primary, secondary, tertiary, accent, positive, negative, warning, info, dark)
- ✅ Tamanhos (xs, sm, md, lg, xl)
- ✅ Modificadores (dense, rounded, fab, icon-only)
- ✅ Hierarquia de camadas (wrapper, content, ripple)

**O que define:**
```scss
/* Layout e Estrutura */
.dss-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-2);          // ← Token de spacing

  /* Tipografia */
  font-family: var(--dss-font-family-base);     // ← Token de fonte
  font-weight: var(--dss-font-weight-semibold); // ← Token de peso
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* Border radius */
  border-radius: var(--dss-radius-button, 4px); // ← Token de raio

  /* Acessibilidade */
  @include dss-touch-target('ideal');  // ← Mixin (48x48px WCAG)
  @include dss-focus-ring('primary');  // ← Mixin de focus
}

/* Variante FILLED */
.dss-button--filled {
  &.dss-button--primary {
    background-color: var(--dss-action-primary);       // ← Token semântico
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--dss-action-primary-hover); // ← Token de hover
    }
  }
}

/* Variante PUSH (3D) */
.dss-button--push {
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.2),  // ← Elevação definida aqui
              0 4px 6px -2px rgba(0, 0, 0, 0.1);
}

/* Tamanhos */
.dss-button--xs {
  padding: var(--dss-spacing-1) var(--dss-spacing-2); // ← Tokens de spacing
  font-size: 12px;
  min-height: 24px;
}
```

**Imports do arquivo:**
```scss
@import '../../../utils/index';        // Mixins e funções
@import '../../../FOCUS_RINGS_PATCH';  // Patch de focus rings
```

---

## 2. TOKENS SEMÂNTICOS

### `tokens/semantic/_actions.scss` (~5KB)

**Responsabilidades:**
- ✅ Cores de ação (primary, secondary, tertiary, accent)
- ✅ Estados de hover, active, deep
- ✅ Cores disable e light

**Tokens usados pelo DssButton:**
```scss
:root {
  /* Primary Actions */
  --dss-action-primary: #1F86DE;           // Cor base do botão primary
  --dss-action-primary-hover: #1976D2;     // Hover do primary
  --dss-action-primary-deep: #1565C0;      // Active/pressed do primary
  --dss-action-primary-disable: #BBDEFB;   // Botão primary desabilitado

  /* Secondary Actions */
  --dss-action-secondary: #059C8D;         // Cor base do botão secondary
  --dss-action-secondary-hover: #048778;   // Hover do secondary

  /* Tertiary Actions */
  --dss-action-tertiary: #E35900;          // Cor base do botão tertiary
  --dss-action-tertiary-hover: #CC5000;    // Hover do tertiary

  /* Accent Actions */
  --dss-action-accent: #B02EC5;            // Cor base do botão accent
  --dss-action-accent-hover: #9C27B0;      // Hover do accent
}
```

### `tokens/semantic/_feedback.scss` (~4KB)

**Responsabilidades:**
- ✅ Cores de feedback (success, error, warning, info)
- ✅ Estados de hover para feedbacks

**Tokens usados pelo DssButton:**
```scss
:root {
  /* Success/Positive */
  --dss-feedback-success: #34C30C;         // Botão positive
  --dss-feedback-success-hover: #2FA90A;   // Hover do positive

  /* Error/Negative */
  --dss-feedback-error: #C4001B;           // Botão negative
  --dss-feedback-error-hover: #B00018;     // Hover do negative

  /* Warning */
  --dss-feedback-warning: #E9AB00;         // Botão warning
  --dss-feedback-warning-hover: #D19900;   // Hover do warning

  /* Info */
  --dss-feedback-info: #0DB2D5;            // Botão info
  --dss-feedback-info-hover: #0B9FBF;      // Hover do info
}
```

### `tokens/semantic/_dark.scss` (~2KB)

**Responsabilidades:**
- ✅ Cor dark (cinza escuro)
- ✅ Estados de hover para dark

**Tokens usados pelo DssButton:**
```scss
:root {
  --dss-dark: #3E3E3E;                     // Botão dark
  --dss-dark-hover: #2E2E2E;               // Hover do dark
  --dss-dark-deep: #1E1E1E;                // Active do dark
}
```

---

## 3. TOKENS DE ACESSIBILIDADE

### `tokens/semantic/accessibility/_focus.scss` (~13KB)

**Responsabilidades:**
- ✅ Cores de focus rings (9 cores semânticas)
- ✅ Box-shadows compostos para focus
- ✅ Variantes com offset (espaçamento)
- ✅ Brandabilidade (Hub, Water, Waste)
- ✅ Dark mode automático
- ✅ High contrast mode

**Tokens usados pelo DssButton:**
```scss
:root {
  /* Configurações Base */
  --dss-focus-ring-width: 3px;             // Largura do focus ring
  --dss-focus-ring-offset: 2px;            // Offset para inputs
  --dss-focus-duration: 150ms;             // Transição do focus

  /* Cores de Focus (Light Mode) */
  --dss-focus-primary: rgba(0, 106, 197, 0.5);      // #006AC5 @ 50%
  --dss-focus-secondary: rgba(5, 156, 141, 0.5);    // #059C8D @ 50%
  --dss-focus-tertiary: rgba(227, 89, 0, 0.5);      // #E35900 @ 50%
  --dss-focus-accent: rgba(176, 46, 197, 0.5);      // #B02EC5 @ 50%
  --dss-focus-success: rgba(52, 195, 12, 0.5);      // #34C30C @ 50%
  --dss-focus-error: rgba(196, 0, 27, 0.5);         // #C4001B @ 50%
  --dss-focus-warning: rgba(233, 171, 0, 0.6);      // #E9AB00 @ 60%
  --dss-focus-info: rgba(13, 178, 213, 0.5);        // #0DB2D5 @ 50%
  --dss-focus-dark: rgba(62, 62, 62, 0.5);          // #3E3E3E @ 50%

  /* Box-Shadows Compostos (usados nas regras CSS) */
  --dss-focus-shadow-primary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary);
  --dss-focus-shadow-secondary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-secondary);
  --dss-focus-shadow-tertiary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-tertiary);
  --dss-focus-shadow-accent: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-accent);
  --dss-focus-shadow-success: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-success);
  --dss-focus-shadow-error: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-error);
  --dss-focus-shadow-warning: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-warning);
  --dss-focus-shadow-info: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-info);
  --dss-focus-shadow-dark: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-dark);
}

/* Dark Mode - Cores mais claras */
[data-theme="dark"] {
  --dss-focus-primary: rgba(51, 153, 229, 0.6);     // Azul mais claro
  --dss-focus-secondary: rgba(38, 179, 164, 0.6);   // Verde mais claro
  /* ... */
}

/* Brandabilidade */
[data-brand="hub"] {
  --dss-focus-primary: rgba(191, 89, 15, 0.5);      // hub-700 (laranja)
  --dss-focus-shadow-primary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary);
}

[data-brand="water"] {
  --dss-focus-primary: rgba(2, 108, 199, 0.5);      // water-600 (azul escuro)
  --dss-focus-shadow-primary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary);
}

[data-brand="waste"] {
  --dss-focus-primary: rgba(10, 114, 78, 0.5);      // waste-700 (verde escuro)
  --dss-focus-shadow-primary: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary);
}
```

---

## 4. TOKENS DE MARCA

### `tokens/brand/_hub.scss` (~6KB)

**Responsabilidades:**
- ✅ Sobrescreve tokens para marca Hub (laranja)
- ✅ Primary actions usam cores Hub

**Tokens que afetam DssButton:**
```scss
[data-brand="hub"] {
  /* Primary Actions - Sobrescreve para cores Hub */
  --dss-action-primary: var(--dss-hub-600);         // #ef7a11 (laranja)
  --dss-action-primary-hover: var(--dss-hub-800);   // #984614 (laranja escuro)
  --dss-action-primary-deep: var(--dss-hub-900);    // #7a3614 (laranja muito escuro)
  --dss-action-primary-disable: var(--dss-hub-200); // #fde2ab (laranja claro)

  /* Componentes específicos */
  --dss-component-btn-primary-bg: var(--dss-hub-600);
  --dss-component-btn-primary-hover: var(--dss-hub-700);
  --dss-component-btn-primary-active: var(--dss-hub-800);
}
```

### `tokens/brand/_water.scss` (~6KB)

**Responsabilidades:**
- ✅ Sobrescreve tokens para marca Water (azul)

**Tokens que afetam DssButton:**
```scss
[data-brand="water"] {
  /* Primary Actions - Sobrescreve para cores Water */
  --dss-action-primary: var(--dss-water-500);       // #0e88e4 (azul)
  --dss-action-primary-hover: var(--dss-water-700); // #0356a1 (azul escuro)
  --dss-action-primary-deep: var(--dss-water-800);  // #074a85 (azul muito escuro)
  --dss-action-primary-disable: var(--dss-water-200); // #badefd (azul claro)
}
```

### `tokens/brand/_waste.scss` (~6KB)

**Responsabilidades:**
- ✅ Sobrescreve tokens para marca Waste (verde)

**Tokens que afetam DssButton:**
```scss
[data-brand="waste"] {
  /* Primary Actions - Sobrescreve para cores Waste */
  --dss-action-primary: var(--dss-waste-600);       // #0b8154 (verde)
  --dss-action-primary-hover: var(--dss-waste-800); // #0a5b3e (verde escuro)
  --dss-action-primary-deep: var(--dss-waste-900);  // #094932 (verde muito escuro)
  --dss-action-primary-disable: var(--dss-waste-200); // #abefcb (verde claro)
}
```

---

## 5. TOKENS GLOBAIS

### `tokens/globals.scss` (~15KB)

**Responsabilidades:**
- ✅ Cores primitivas (paletas Hub, Water, Waste)
- ✅ Escala de cinzas
- ✅ Famílias de fontes
- ✅ Pesos de fonte
- ✅ Espaçamentos (spacing scale)
- ✅ Border radius

**Tokens usados pelo DssButton:**
```scss
:root {
  /* Famílias de Fonte */
  --dss-font-family-base: 'Roboto', -apple-system, sans-serif;

  /* Pesos de Fonte */
  --dss-font-weight-regular: 400;
  --dss-font-weight-medium: 500;
  --dss-font-weight-semibold: 600;
  --dss-font-weight-bold: 700;

  /* Espaçamentos (usado em padding, gap) */
  --dss-spacing-0: 0px;
  --dss-spacing-1: 4px;
  --dss-spacing-2: 8px;
  --dss-spacing-3: 12px;
  --dss-spacing-4: 16px;
  --dss-spacing-5: 20px;
  --dss-spacing-6: 24px;

  /* Border Radius */
  --dss-radius-button: 4px;
  --dss-radius-sm: 2px;
  --dss-radius-md: 4px;
  --dss-radius-lg: 8px;
  --dss-radius-xl: 12px;
  --dss-radius-full: 9999px;

  /* Paletas de Cores Primitivas - Hub */
  --dss-hub-50: #fff9ed;
  --dss-hub-100: #ffeec8;
  --dss-hub-200: #fde2ab;
  --dss-hub-300: #fbcb76;
  --dss-hub-400: #f8aa3f;
  --dss-hub-500: #f58d1d;
  --dss-hub-600: #ef7a11;   // ← Primary Hub
  --dss-hub-700: #bf590f;   // ← Focus Hub
  --dss-hub-800: #984614;   // ← Hover Hub
  --dss-hub-900: #7a3614;
  --dss-hub-950: #4d1f09;

  /* Paletas de Cores Primitivas - Water */
  --dss-water-50: #f0f7ff;
  --dss-water-100: #d9ebff;
  --dss-water-200: #badefd;
  --dss-water-300: #7dc4fc;
  --dss-water-400: #38a6f8;
  --dss-water-500: #0e88e4;   // ← Primary Water
  --dss-water-600: #026cc7;   // ← Focus Water
  --dss-water-700: #0356a1;   // ← Hover Water
  --dss-water-800: #074a85;
  --dss-water-900: #063f6c;
  --dss-water-950: #042947;

  /* Paletas de Cores Primitivas - Waste */
  --dss-waste-50: #edfcf4;
  --dss-waste-100: #d4f8e2;
  --dss-waste-200: #abefcb;
  --dss-waste-300: #74e1ae;
  --dss-waste-400: #3aca8b;
  --dss-waste-500: #18b173;
  --dss-waste-600: #0b8154;   // ← Primary Waste
  --dss-waste-700: #0a724e;   // ← Focus Waste
  --dss-waste-800: #0a5b3e;   // ← Hover Waste
  --dss-waste-900: #094932;
  --dss-waste-950: #04281c;
}
```

---

## 6. MIXINS E FUNÇÕES

### `utils/_mixins.scss` (~8KB)

**Responsabilidades:**
- ✅ Mixin de focus ring (dss-focus-ring)
- ✅ Mixin de touch target (dss-touch-target)
- ✅ Mixin de visually hidden (dss-visually-hidden)
- ✅ Mixins de elevação (elevation)

**Mixins usados pelo DssButton:**
```scss
/* Mixin de Focus Ring */
@mixin dss-focus-ring($type: 'primary', $offset: false) {
  &:focus-visible {
    outline: none;

    @if $offset {
      box-shadow: var(--dss-focus-shadow-#{$type}-offset);
    } @else {
      box-shadow: var(--dss-focus-shadow-#{$type});
    }

    /* Transição respeitando acessibilidade */
    @media (prefers-reduced-motion: no-preference) {
      transition: box-shadow var(--dss-focus-duration) var(--dss-focus-easing);
    }

    &:focus:not(:focus-visible) {
      box-shadow: none;
    }
  }
}

/* Mixin de Touch Target (WCAG 2.1 AA) */
@mixin dss-touch-target($size: 'ideal') {
  @if $size == 'ideal' {
    min-width: 48px;
    min-height: 48px;
  } @else if $size == 'minimum' {
    min-width: 44px;
    min-height: 44px;
  }
}

/* Mixin de Visually Hidden */
@mixin dss-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### `utils/_functions.scss` (~4KB)

**Responsabilidades:**
- ✅ Funções de cálculo de contraste
- ✅ Funções de manipulação de cores
- ✅ Funções de conversão de unidades

**Funções disponíveis (não usadas diretamente no DssButton):**
```scss
@function calculate-contrast($color1, $color2) { /* ... */ }
@function lighten-color($color, $amount) { /* ... */ }
@function darken-color($color, $amount) { /* ... */ }
```

---

## 7. PATCH DE CORREÇÕES

### `FOCUS_RINGS_PATCH.scss` (~18KB)

**Responsabilidades:**
- ✅ Correções de focus rings por cor específica
- ✅ Correções para variantes push e unelevated
- ✅ Aplicação de hover state + focus ring

**Regras criadas:**
```scss
/* FILLED VARIANT - Focus Rings por Cor + Hover State */
.dss-button--filled {
  &.dss-button--primary:focus-visible:not(:disabled) {
    background-color: var(--dss-action-primary-hover);
    box-shadow: var(--dss-focus-shadow-primary);
  }

  &.dss-button--primary:hover:focus-visible:not(:disabled) {
    background-color: var(--dss-action-primary-hover);
    box-shadow: var(--dss-focus-shadow-primary);
  }

  /* Repete para secondary, tertiary, accent, positive, negative, warning, info, dark */
}

/* UNELEVATED VARIANT - Com !important para sobrescrever box-shadow: none */
.dss-button--unelevated {
  &.dss-button--primary:focus-visible:not(:disabled) {
    outline: none;
    background-color: var(--dss-action-primary-hover);
    box-shadow: var(--dss-focus-shadow-primary) !important;
  }
  /* ... */
}

/* PUSH VARIANT - Combina sombras 3D + focus ring */
.dss-button--push {
  &.dss-button--primary:focus-visible:not(:disabled) {
    outline: none;
    background-color: var(--dss-action-primary-hover);
    box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.2),
                0 4px 6px -2px rgba(0, 0, 0, 0.1),
                var(--dss-focus-shadow-primary);
  }

  &.dss-button--primary:hover:focus-visible:not(:disabled) {
    background-color: var(--dss-action-primary-hover);
    box-shadow: 0 7px 20px -3px rgba(0, 0, 0, 0.25),
                0 5px 8px -2px rgba(0, 0, 0, 0.12),
                var(--dss-focus-shadow-primary);
  }
  /* ... */
}

/* OUTLINED e FLAT VARIANTS */
/* ... mesmo padrão ... */
```

**Total:** 90 regras (5 variantes × 9 cores × 2 estados)

---

## 8. TEMAS

### `tokens/themes/light/_colors.scss` (~3KB)

**Responsabilidades:**
- ✅ Cores de superfície (backgrounds)
- ✅ Cores de texto
- ✅ Cores de bordas

**Tokens usados pelo DssButton (indiretamente):**
```scss
:root {
  --dss-surface-default: #ffffff;
  --dss-text-body: #333333;
  --dss-border-default: #e0e0e0;
}
```

### `tokens/themes/dark/_colors.scss` (~3KB)

**Responsabilidades:**
- ✅ Cores de superfície para dark mode
- ✅ Cores de texto para dark mode
- ✅ Cores de bordas para dark mode

**Tokens usados pelo DssButton (indiretamente):**
```scss
[data-theme="dark"] {
  --dss-surface-default: #1e1e1e;
  --dss-text-body: #e0e0e0;
  --dss-border-default: #424242;
}
```

---

## 📊 RESUMO POR ASPECTO VISUAL

### 🎨 CORES

| Aspecto | Arquivos Responsáveis |
|---------|----------------------|
| **Cores base (9 variantes)** | `tokens/semantic/_actions.scss`, `tokens/semantic/_feedback.scss`, `tokens/semantic/_dark.scss` |
| **Hover states** | `tokens/semantic/_actions.scss`, `tokens/semantic/_feedback.scss`, `tokens/brand/*.scss` |
| **Focus rings** | `tokens/semantic/accessibility/_focus.scss`, `FOCUS_RINGS_PATCH.scss` |
| **Brandabilidade (Hub, Water, Waste)** | `tokens/brand/_hub.scss`, `tokens/brand/_water.scss`, `tokens/brand/_waste.scss` |
| **Dark mode** | `tokens/themes/dark/_colors.scss`, `tokens/semantic/accessibility/_focus.scss` |

### 📏 ESPAÇAMENTO E DIMENSÕES

| Aspecto | Arquivos Responsáveis |
|---------|----------------------|
| **Padding interno** | `components/base/DssButton/DssButton.module.scss` (usa tokens `--dss-spacing-*`) |
| **Gap entre ícone e texto** | `components/base/DssButton/DssButton.module.scss` (usa `--dss-spacing-2`) |
| **Tamanhos (xs, sm, md, lg, xl)** | `components/base/DssButton/DssButton.module.scss` |
| **Touch target (48x48px)** | `utils/_mixins.scss` (mixin `dss-touch-target`) |
| **Escala de spacing** | `tokens/globals.scss` (tokens `--dss-spacing-*`) |

### 🏔️ ELEVAÇÃO E SOMBRAS

| Aspecto | Arquivos Responsáveis |
|---------|----------------------|
| **Variante push (3D)** | `components/base/DssButton/DssButton.module.scss` (box-shadow definido inline) |
| **Focus ring shadows** | `tokens/semantic/accessibility/_focus.scss`, `FOCUS_RINGS_PATCH.scss` |
| **Hover shadows (push)** | `components/base/DssButton/DssButton.module.scss`, `FOCUS_RINGS_PATCH.scss` |

### 🔤 TIPOGRAFIA

| Aspecto | Arquivos Responsáveis |
|---------|----------------------|
| **Família de fonte** | `tokens/globals.scss` (token `--dss-font-family-base`) |
| **Peso da fonte** | `tokens/globals.scss` (token `--dss-font-weight-semibold`) |
| **Tamanho da fonte** | `components/base/DssButton/DssButton.module.scss` (definido por tamanho: xs=12px, sm=14px, md=16px, lg=18px, xl=21px) |
| **Transformação** | `components/base/DssButton/DssButton.module.scss` (`text-transform: uppercase`) |
| **Letter spacing** | `components/base/DssButton/DssButton.module.scss` (`letter-spacing: 0.5px`) |

### 🔄 ESTADOS DE INTERAÇÃO

| Estado | Arquivos Responsáveis |
|--------|----------------------|
| **Hover** | `components/base/DssButton/DssButton.module.scss`, `tokens/semantic/_actions.scss` |
| **Active/Pressed** | `components/base/DssButton/DssButton.module.scss` (usa tokens `*-deep`) |
| **Focus** | `components/base/DssButton/DssButton.module.scss`, `FOCUS_RINGS_PATCH.scss`, `utils/_mixins.scss` |
| **Disabled** | `components/base/DssButton/DssButton.module.scss` (usa tokens `*-disable`) |
| **Hover + Focus** | `FOCUS_RINGS_PATCH.scss` (90 regras específicas) |

### 🧩 HIERARQUIA DE CAMADAS

| Camada | Definida em |
|--------|-------------|
| **Base (.dss-button)** | `components/base/DssButton/DssButton.module.scss` |
| **Wrapper (.dss-button__wrapper)** | Usado internamente para layout |
| **Content (.dss-button__content)** | Contém ícone + texto |
| **Ripple effect** | Planejado mas não implementado ainda |
| **Screen reader only** | `components/base/DssButton/DssButton.module.scss` (classe `.dss-button__sr-only`) |

---

## 🗂️ LISTA COMPLETA DE ARQUIVOS (POR PRIORIDADE)

### NÍVEL 1: Arquivos Críticos (Modificar com cuidado)

1. **`components/base/DssButton/DssButton.module.scss`** (23KB)
   - Estrutura principal, variantes, tamanhos, estados

2. **`FOCUS_RINGS_PATCH.scss`** (18KB)
   - Focus rings por cor + hover state (90 regras)

3. **`tokens/semantic/_actions.scss`** (~5KB)
   - Cores primary, secondary, tertiary, accent

4. **`tokens/semantic/_feedback.scss`** (~4KB)
   - Cores success, error, warning, info

5. **`tokens/semantic/accessibility/_focus.scss`** (~13KB)
   - Focus rings, brandabilidade, dark mode

### NÍVEL 2: Tokens de Marca (Afetam brands específicos)

6. **`tokens/brand/_hub.scss`** (~6KB)
   - Sobrescritas para marca Hub

7. **`tokens/brand/_water.scss`** (~6KB)
   - Sobrescritas para marca Water

8. **`tokens/brand/_waste.scss`** (~6KB)
   - Sobrescritas para marca Waste

### NÍVEL 3: Tokens Globais (Afetam sistema todo)

9. **`tokens/globals.scss`** (~15KB)
   - Paletas primitivas, fontes, spacing, radius

10. **`utils/_mixins.scss`** (~8KB)
    - Mixins de focus, touch target, visually hidden

11. **`utils/_functions.scss`** (~4KB)
    - Funções de contraste e manipulação de cores

### NÍVEL 4: Temas (Afetam todos os componentes)

12. **`tokens/themes/light/_colors.scss`** (~3KB)
    - Cores de superfície, texto, borda (light mode)

13. **`tokens/themes/dark/_colors.scss`** (~3KB)
    - Cores de superfície, texto, borda (dark mode)

---

## 🎯 GUIA RÁPIDO: "Quero Mudar X, Onde Edito?"

### Quero mudar a COR do botão primary:
→ Edite: `tokens/semantic/_actions.scss`
→ Token: `--dss-action-primary`

### Quero mudar a COR de HOVER do botão primary:
→ Edite: `tokens/semantic/_actions.scss`
→ Token: `--dss-action-primary-hover`

### Quero mudar a COR DO FOCUS RING do botão primary:
→ Edite: `tokens/semantic/accessibility/_focus.scss`
→ Token: `--dss-focus-primary`

### Quero mudar o PADDING do botão:
→ Edite: `components/base/DssButton/DssButton.module.scss`
→ Seção: `.dss-button--xs`, `.dss-button--sm`, etc.

### Quero mudar a SOMBRA 3D do botão push:
→ Edite: `components/base/DssButton/DssButton.module.scss`
→ Seção: `.dss-button--push` (box-shadow)

### Quero mudar a FONTE do botão:
→ Edite: `tokens/globals.scss`
→ Token: `--dss-font-family-base`

### Quero mudar o BORDER RADIUS do botão:
→ Edite: `tokens/globals.scss`
→ Token: `--dss-radius-button`

### Quero adicionar uma NOVA COR de botão:
→ Edite:
1. `tokens/semantic/_actions.scss` (criar `--dss-action-nova-cor`)
2. `tokens/semantic/accessibility/_focus.scss` (criar `--dss-focus-nova-cor`)
3. `components/base/DssButton/DssButton.module.scss` (criar `.dss-button--nova-cor`)
4. `FOCUS_RINGS_PATCH.scss` (criar regras de focus para nova cor)

### Quero mudar cores para marca Hub:
→ Edite: `tokens/brand/_hub.scss`
→ Tokens: `--dss-action-primary`, `--dss-action-primary-hover`, etc.

### Quero mudar o FOCUS RING para marca Hub:
→ Edite: `tokens/semantic/accessibility/_focus.scss`
→ Seção: `[data-brand="hub"]`

---

## 📝 NOTAS IMPORTANTES

### ⚠️ Ordem de Importação é Crítica

```scss
/* Em DssButton.module.scss */
@import '../../../utils/index';        // PRIMEIRO: Mixins e funções
/* ... estilos do componente ... */
@import '../../../FOCUS_RINGS_PATCH';  // ÚLTIMO: Patch sobrescreve
```

O patch **DEVE** vir no final para sobrescrever regras anteriores com especificidade correta.

### 🎨 Tokens Seguem Hierarquia

```
Globais (primitivos)
    ↓
Semânticos (abstratos)
    ↓
Brands (específicos)
    ↓
Componente (implementação)
```

Exemplo:
```scss
/* Global */
--dss-hub-800: #984614;

/* Semântico */
--dss-action-primary: var(--dss-hub-600);

/* Brand */
[data-brand="hub"] {
  --dss-action-primary-hover: var(--dss-hub-800);
}

/* Componente */
.dss-button--primary:hover {
  background-color: var(--dss-action-primary-hover);
}
```

### ♿ Acessibilidade é Mandatória

- **WCAG 2.1 AA** é o padrão mínimo
- **Focus rings** são obrigatórios (nunca remover)
- **Touch targets** devem ser 48x48px (ideal) ou 44x44px (mínimo)
- **Contraste** deve ser ≥ 4.5:1 para texto, ≥ 3:1 para UI

### 🔧 Manutenção

Ao modificar qualquer arquivo, sempre:
1. ✅ Compilar CSS: `npm run build`
2. ✅ Testar todas as variantes (filled, outlined, flat, push, unelevated)
3. ✅ Testar todas as cores (9 cores)
4. ✅ Testar todos os brands (Hub, Water, Waste)
5. ✅ Testar dark mode
6. ✅ Testar navegação por teclado (Tab + focus rings)

---

**Documento Criado:** 16 de Dezembro de 2025
**Versão do Sistema:** 2.3.1
**Total de Arquivos Mapeados:** 13 arquivos principais
**Total de Tokens Relacionados:** ~150+ tokens
