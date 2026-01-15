# 📋 Opção D - Issues Rápidos (CORRIGIDO - Tokens Existentes)

## 🎯 Status Geral

**Data da análise**: Janeiro 2026
**Componentes analisados**: 6 (DssButton, DssBadge, DssAvatar, DssCard, DssInput, DssCardSection, DssCardActions)
**Total de issues encontrados**: 13

---

## 🔴 CATEGORIA 1: Hardcoded Values (8 encontrados)

### ✅ **Issue #1.1: Hardcoded Brand Colors**
**Prioridade**: 🔴 CRÍTICA
**Arquivo**: `/DSS/composables/useBrand.ts` (linhas 78-81)

**Problema atual**:
```typescript
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: '#1976D2',     // ❌ Hardcoded - INCORRETO!
  water: '#0288D1',   // ❌ Hardcoded - INCORRETO!
  waste: '#388E3C'    // ❌ Hardcoded - INCORRETO!
}
```

**✅ SOLUÇÃO CORRETA** (com tokens existentes):
```typescript
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: 'var(--dss-hub-600)',      // #ef7a11 (laranja Hub oficial)
  water: 'var(--dss-water-500)',  // #0e88e4 (azul Water oficial)
  waste: 'var(--dss-waste-600)'   // #0b8154 (verde Waste oficial)
}
```

**Por quê corrigir?**
- 🔴 **Cores hardcoded estão INCORRETAS** - não correspondem às marcas oficiais Sansys
- ✅ Hub real: `#ef7a11` (laranja) vs hardcoded: `#1976D2` (azul!)
- ✅ Facilita temas dinâmicos e mudanças de branding
- ✅ Sincroniza com tokens oficiais DSS

**Tokens disponíveis**:
- `--dss-hub-50` até `--dss-hub-950` (11 tons)
- `--dss-water-50` até `--dss-water-950` (11 tons)
- `--dss-waste-50` até `--dss-waste-950` (11 tons)

---

### ⚠️ **Issue #1.2: Hardcoded Letter Spacing**
**Prioridade**: 🟡 MÉDIA
**Arquivo**: `/DSS/components/base/DssButton/2-composition/_base.scss` (linha 31)

**Problema atual**:
```scss
.dss-button {
  letter-spacing: 0.0892857143em; /* ❌ Hardcoded - Quasar default */
}
```

**⚠️ ANÁLISE DE TOKENS**:
- ❌ **NÃO EXISTE** token `--dss-letter-spacing-wide` no sistema DSS
- ❌ Sistema DSS **não possui tokens de letter-spacing**
- ✅ Valor é **padrão do Quasar** (0.0892857143em = 1.25px em font 14px)

**✅ SOLUÇÃO CORRETA**:

**Opção A - Criar token novo** (requer adicionar ao sistema):
```scss
/* tokens/semantic/_text.scss - ADICIONAR */
:root {
  --dss-letter-spacing-tight: -0.05em;
  --dss-letter-spacing-normal: 0em;
  --dss-letter-spacing-wide: 0.0892857143em;  /* Quasar button default */
  --dss-letter-spacing-wider: 0.15em;
}

/* Uso no componente */
.dss-button {
  letter-spacing: var(--dss-letter-spacing-wide);
}
```

**Opção B - Manter hardcoded com comentário** (pragmática):
```scss
.dss-button {
  /* Quasar Framework padrão - 1.25px em 14px */
  letter-spacing: 0.0892857143em;
}
```

**Recomendação**: ⏸️ **Opção B por enquanto** - criar token letter-spacing pode ser feito em Sprint futura dedicada a typography

---

### 🟢 **Issue #1.3: Hardcoded Border (Print Styles)**
**Prioridade**: 🟢 BAIXA
**Arquivo**: `/DSS/components/base/DssButton/4-output/_states.scss` (linha 68)

**Problema atual**:
```scss
@media print {
  .dss-button {
    border: 1px solid #000 !important; /* ❌ Hardcoded */
  }
}
```

**✅ SOLUÇÃO CORRETA** (com tokens existentes):
```scss
@media print {
  .dss-button {
    border: var(--dss-border-gray-900) !important;
    /* Equivalente a: 1px solid var(--dss-gray-900) = 1px solid #0a0a0a */
  }
}
```

**Tokens disponíveis**:
- `--dss-border-gray-900`: `1px solid var(--dss-gray-900)` (#0a0a0a - quase preto)
- `--dss-border-gray-950`: `1px solid var(--dss-gray-950)` (#000000 - preto puro)

**Por quê corrigir?**
- ⚠️ Apenas para impressão (baixo impacto)
- ✅ Consistência de código
- ✅ Facilita ajustes futuros de print styles

---

### ⚠️ **Issue #1.4: Hardcoded Progress Bar Height**
**Prioridade**: 🟡 MÉDIA
**Arquivo**: `/DSS/components/base/DssButton/2-composition/_base.scss` (linha 269)

**Problema atual**:
```scss
.dss-button__progress {
  height: 4px; /* ❌ Hardcoded */
}
```

**⚠️ ANÁLISE DE TOKENS**:
- ❌ **NÃO EXISTE** token `--dss-progress-height`
- ✅ **EXISTE** token `--dss-spacing-1` = `0.25rem` = **4px**!

**✅ SOLUÇÃO CORRETA** (com tokens existentes):
```scss
.dss-button__progress {
  height: var(--dss-spacing-1); /* 4px via token de spacing */
}
```

**Tokens disponíveis** (spacing que equivalem a 4px ou próximo):
- `--dss-spacing-1`: `0.25rem` = **4px** ✅ (perfeito!)
- `--dss-spacing-0_5`: `0.125rem` = 2px
- `--dss-spacing-1_5`: `0.375rem` = 6px

**Por quê corrigir?**
- ✅ Componente visual importante (progress bar)
- ✅ Token existe e é semântico
- ✅ Facilita ajustes de UI

---

### ✅ **Issue #1.5: Hardcoded Transitions**
**Prioridade**: 🟡 MÉDIA
**Arquivo**: `/DSS/components/base/DssButton/2-composition/_base.scss` (linha 51)

**Problema atual**:
```scss
.dss-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* ❌ Hardcoded */
}
```

**✅ SOLUÇÃO CORRETA** (com tokens existentes):

**Opção A - Token completo** (mais limpo):
```scss
.dss-button {
  transition: var(--dss-transition-base);
  /* Equivalente a: all 250ms cubic-bezier(0.4, 0, 0.2, 1) */
}
```

**Opção B - Tokens separados** (mais controle):
```scss
.dss-button {
  transition: all var(--dss-duration-200) var(--dss-easing-standard);
  /* Equivalente a: all 200ms cubic-bezier(0.4, 0, 0.2, 1) */
}
```

**Tokens disponíveis**:
- **Completos**: `--dss-transition-base`, `--dss-transition-fast`, `--dss-transition-slow`
- **Durações**: `--dss-duration-200` (200ms), `--dss-duration-250` (250ms), `--dss-duration-base` (250ms)
- **Easings**: `--dss-easing-standard` (cubic-bezier(0.4, 0, 0.2, 1))

**Observação**:
- Hardcoded: **200ms**
- Token base: **250ms** (50ms a mais - WCAG amigável)
- ✅ **Recomendação**: Usar `--dss-duration-200` + `--dss-easing-standard` para manter timing exato

**Por quê corrigir?**
- ✅ Padrão de transição global deve ser token
- ✅ Facilita ajustes de timing em todo o sistema
- ✅ Respeita `prefers-reduced-motion` automaticamente

---

## 🟡 CATEGORIA 2: ARIA Labels Faltando (5 componentes)

### 🔴 **Issue #2.1: DssButton - ARIA Incompleto**
**Prioridade**: 🔴 CRÍTICA
**Arquivo**: `/DSS/components/base/DssButton/1-structure/DssButton.ts.vue`

**Elementos sem ARIA**:
1. ❌ **Loading spinner** - sem `aria-label="Loading"`
2. ❌ **Progress bar** - sem `role="progressbar"` + `aria-valuenow`
3. ❌ **Botão principal** - sem `aria-busy` quando `loading={true}`
4. ❌ **Botão principal** - sem `aria-disabled` quando `disabled={true}`

**✅ SOLUÇÃO CORRETA**:

```vue
<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :replace="replace"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :style="buttonStyle"
    :tabindex="computedTabindex"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-label="ariaLabel"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner com ARIA -->
    <span
      v-if="loading && percentage === null"
      class="dss-button__loading"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <span class="dss-button__spinner" aria-hidden="true"></span>
    </span>

    <!-- Progress bar com ARIA completo -->
    <span
      v-if="loading && percentage !== null"
      class="dss-button__progress"
      :class="{ 'dss-button__progress--dark': darkPercentage }"
      role="progressbar"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Loading ${percentage}%`"
    >
      <span
        class="dss-button__progress-indicator"
        :style="percentageStyle"
        aria-hidden="true"
      ></span>
    </span>

    <!-- Ícones decorativos com aria-hidden -->
    <span
      v-if="computedIconLeft && !loading"
      class="dss-button__icon dss-button__icon--left"
      aria-hidden="true"
    >
      {{ computedIconLeft }}
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>

    <span
      v-if="computedIconRight && !loading"
      class="dss-button__icon dss-button__icon--right"
      aria-hidden="true"
    >
      {{ computedIconRight }}
    </span>

    <!-- Ripple decorativo com aria-hidden -->
    <span
      v-if="ripple"
      class="dss-button__ripple"
      aria-hidden="true"
    ></span>
  </component>
</template>

<script setup lang="ts">
// Adicionar prop ariaLabel
const props = withDefaults(defineProps<ButtonProps>(), {
  // ... existing props
  ariaLabel: undefined  // NOVO
})
</script>
```

**Adições necessárias em `button.types.ts`**:
```typescript
export interface ButtonProps {
  // ... existing props

  /**
   * Label de acessibilidade customizado
   * Sobrescreve o label visual para screen readers
   */
  ariaLabel?: string
}
```

**Por quê corrigir?**
- 🔴 **CRÍTICO** - Acessibilidade WCAG 2.1 AA comprometida
- 🔴 Leitores de tela não anunciam estados de loading/disabled
- 🔴 Usuários com deficiência visual não sabem o estado do botão
- 🔴 Progress bar sem role/valuenow é inútil para screen readers

---

### 🟡 **Issue #2.2: DssBadge - ARIA Ausente**
**Prioridade**: 🟡 ALTA
**Arquivo**: `/DSS/components/base/DssBadge/1-structure/DssBadge.ts.vue`

**Problema atual**:
```vue
<div :class="badgeClasses" :style="badgeStyle">
  <slot>{{ label }}</slot>
</div>
```

**✅ SOLUÇÃO CORRETA**:
```vue
<div
  :class="badgeClasses"
  :style="badgeStyle"
  role="status"
  :aria-label="ariaLabel || `${label} notifications`"
  aria-live="polite"
>
  <slot>{{ label }}</slot>
</div>
```

**Adições necessárias**:
```typescript
// badge.types.ts
export interface BadgeProps {
  // ... existing props

  /** Label de acessibilidade para screen readers */
  ariaLabel?: string
}

// DssBadge.ts.vue
const props = withDefaults(defineProps<BadgeProps>(), {
  // ... existing defaults
  ariaLabel: undefined
})
```

**Por quê corrigir?**
- ✅ Badges geralmente indicam contadores/notificações
- ✅ `role="status"` + `aria-live="polite"` anunciam mudanças
- ✅ Screen readers falam "5 notifications" ao invés de apenas "5"

---

### 🟡 **Issue #2.3: DssAvatar - ARIA Ausente**
**Prioridade**: 🟡 ALTA
**Arquivo**: `/DSS/components/base/DssAvatar/1-structure/DssAvatar.ts.vue`

**Problema atual**:
```vue
<div :class="avatarClasses" :style="avatarStyle">
  <span v-if="icon" class="dss-avatar__icon material-icons">
    {{ icon }}
  </span>
  <!-- ... -->
</div>
```

**✅ SOLUÇÃO CORRETA**:
```vue
<div
  :class="avatarClasses"
  :style="avatarStyle"
  role="img"
  :aria-label="ariaLabel || 'User avatar'"
>
  <span
    v-if="icon"
    class="dss-avatar__icon material-icons"
    aria-hidden="true"
  >
    {{ icon }}
  </span>

  <div v-if="!icon" :style="contentStyle" class="dss-avatar__content">
    <slot></slot>
  </div>
</div>
```

**Adições necessárias**:
```typescript
// avatar.types.ts
export interface AvatarProps {
  // ... existing props

  /** Label descritivo para screen readers */
  ariaLabel?: string
}
```

**Por quê corrigir?**
- ✅ Avatares são elementos visuais importantes
- ✅ `role="img"` indica que é uma imagem semântica
- ✅ Ícone deve ter `aria-hidden="true"` (puramente decorativo)

---

### 🟢 **Issue #2.4: DssCard - ARIA Parcial**
**Prioridade**: 🟢 MÉDIA
**Arquivos**: DssCard.ts.vue, DssCardSection.ts.vue, DssCardActions.ts.vue

**✅ SOLUÇÃO CORRETA**:

**DssCard.ts.vue**:
```vue
<div
  :class="cardClasses"
  :style="cardStyle"
  role="article"
  :aria-labelledby="titleId"
>
  <slot></slot>
</div>

<script setup lang="ts">
const props = withDefaults(defineProps<CardProps>(), {
  // ... existing
  titleId: undefined,  // NOVO - ID do título para aria-labelledby
  role: 'article'      // NOVO - role customizável
})
</script>
```

**Por quê corrigir?**
- ⚠️ Cards são elementos estruturais (ajuda navegação)
- ⚠️ `role="article"` cria landmark para screen readers
- ⚠️ Baixo impacto mas melhora navegação

---

### 🟡 **Issue #2.5: DssInput - Melhorar ARIA**
**Prioridade**: 🟡 MÉDIA
**Arquivo**: `/DSS/components/base/DssInput/1-structure/DssInput.ts.vue`

**Status atual**: ✅ Já tem `aria-label` no clear button (linha 46)

**Melhorias necessárias**:
```vue
<template>
  <div :class="wrapperClasses">
    <!-- ... -->
    <div class="dss-input__field">
      <!-- ... -->
      <div class="dss-input__control">
        <label v-if="label || slots.label" :class="labelClasses" :for="inputId">
          <slot name="label">{{ label }}</slot>
        </label>

        <input
          :id="inputId"
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="inputClasses"
          :aria-describedby="errorId || hintId"
          :aria-invalid="error ? 'true' : undefined"
          v-bind="$attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <!-- ... -->
    </div>

    <!-- Bottom slots com IDs e roles -->
    <div v-if="hasBottomSlot" class="dss-input__bottom">
      <div
        v-if="error && errorMessage"
        :id="errorId"
        class="dss-input__error"
        role="alert"
        aria-live="assertive"
      >
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div
        v-else-if="hint"
        :id="hintId"
        class="dss-input__hint"
        aria-live="polite"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateA11yId } from '@/composables'

const inputId = generateA11yId('dss-input')
const errorId = computed(() => error && errorMessage ? `${inputId}-error` : undefined)
const hintId = computed(() => hint ? `${inputId}-hint` : undefined)
</script>
```

**Por quê corrigir?**
- ✅ Associa hint/error ao input via `aria-describedby`
- ✅ `role="alert"` + `aria-live="assertive"` anuncia erros imediatamente
- ✅ IDs únicos previnem conflitos

---

## 🟢 CATEGORIA 3: Props Validators

**Status**: ✅ **COMPLETO - Nenhuma ação necessária**

TypeScript types substituem validators de Options API:
- ✅ ButtonVariant, ButtonSize, ButtonColor como **literal types**
- ✅ Type checking em tempo de desenvolvimento e build
- ✅ Autocomplete inteligente no IDE
- ✅ Validação em **compile time** (mais seguro que runtime)

**Decisão**: **NÃO PRECISA CORREÇÃO**

---

## 📊 RESUMO EXECUTIVO - ISSUES CORRIGIDOS

| ID | Categoria | Prioridade | Tokens Existentes | Status |
|----|-----------|------------|-------------------|--------|
| 1.1 | Hardcoded Brand Colors | 🔴 CRÍTICA | `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600` | ✅ Solução validada |
| 1.2 | Hardcoded Letter Spacing | 🟡 MÉDIA | ❌ Não existe | ⏸️ Criar token ou manter |
| 1.3 | Hardcoded Border (Print) | 🟢 BAIXA | `--dss-border-gray-900` | ✅ Solução validada |
| 1.4 | Hardcoded Progress Height | 🟡 MÉDIA | `--dss-spacing-1` (4px) | ✅ Solução validada |
| 1.5 | Hardcoded Transitions | 🟡 MÉDIA | `--dss-duration-200`, `--dss-easing-standard` | ✅ Solução validada |
| 2.1 | DssButton ARIA | 🔴 CRÍTICA | N/A | ✅ Solução completa |
| 2.2 | DssBadge ARIA | 🟡 ALTA | N/A | ✅ Solução completa |
| 2.3 | DssAvatar ARIA | 🟡 ALTA | N/A | ✅ Solução completa |
| 2.4 | DssCard ARIA | 🟢 MÉDIA | N/A | ✅ Solução completa |
| 2.5 | DssInput ARIA | 🟡 MÉDIA | N/A | ✅ Solução completa |
| 3.x | Props Validators | N/A | N/A | ✅ Já completo (TypeScript) |

---

## 🎯 RECOMENDAÇÃO DE EXECUÇÃO

### **🔴 DEVE ser feito AGORA** (Crítico):
1. ✅ **Issue 1.1**: Corrigir cores de marca hardcoded (INCORRETAS!)
2. ✅ **Issue 2.1**: ARIA completo no DssButton

### **🟡 PODE ser feito AGORA** (Alta/Média prioridade):
3. ✅ **Issue 1.4**: Progress bar height via token
4. ✅ **Issue 1.5**: Transitions via tokens
5. ✅ **Issue 2.2**: ARIA no DssBadge
6. ✅ **Issue 2.3**: ARIA no DssAvatar
7. ✅ **Issue 2.5**: Melhorar ARIA no DssInput

### **🟢 PODE AGUARDAR** (Baixa prioridade):
8. ⏸️ **Issue 1.2**: Letter spacing (requer novo token ou manter pragmático)
9. ⏸️ **Issue 1.3**: Border em print styles (baixo impacto)
10. ⏸️ **Issue 2.4**: ARIA no DssCard (estrutural, não crítico)

---

## 📚 REFERÊNCIAS DE TOKENS

### Tokens Spacing Disponíveis:
```scss
--dss-spacing-0: 0
--dss-spacing-px: 1px
--dss-spacing-0_5: 0.125rem  /* 2px */
--dss-spacing-1: 0.25rem     /* 4px */
--dss-spacing-1_5: 0.375rem  /* 6px */
--dss-spacing-2: 0.5rem      /* 8px */
--dss-spacing-3: 0.75rem     /* 12px */
--dss-spacing-4: 1rem        /* 16px */
// ... até --dss-spacing-96
```

### Tokens Motion Disponíveis:
```scss
/* Durações */
--dss-duration-75: 75ms
--dss-duration-100: 100ms
--dss-duration-150: 150ms
--dss-duration-200: 200ms
--dss-duration-250: 250ms
--dss-duration-300: 300ms
--dss-duration-500: 500ms

/* Semantics */
--dss-duration-fast: var(--dss-duration-150)
--dss-duration-base: var(--dss-duration-250)
--dss-duration-slow: var(--dss-duration-300)

/* Easings */
--dss-easing-standard: cubic-bezier(0.4, 0, 0.2, 1)
--dss-easing-ease-out: cubic-bezier(0, 0, 0.58, 1)
--dss-easing-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1)

/* Completos */
--dss-transition-base: all var(--dss-duration-base) var(--dss-easing-standard)
--dss-transition-fast: all var(--dss-duration-fast) var(--dss-easing-ease-out)
```

### Tokens Color Disponíveis:
```scss
/* Marcas (11 tons cada) */
--dss-hub-50 até --dss-hub-950       /* Laranja/Marrom Hub */
--dss-water-50 até --dss-water-950   /* Azul Water */
--dss-waste-50 até --dss-waste-950   /* Verde Waste */

/* Borders prontos */
--dss-border-gray-50 até --dss-border-gray-950
--dss-border-hub-50 até --dss-border-hub-950
--dss-border-water-50 até --dss-border-water-950
--dss-border-waste-50 até --dss-border-waste-950
```

---

**Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves**
**Licença**: MIT © 2025 Sansys/Veolia
