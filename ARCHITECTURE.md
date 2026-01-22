# 🏗️ Arquitetura DSS - TypeScript + Composition API

## 📋 Visão Geral

O Design System Sansys (DSS) v2.2.0 é construído com uma arquitetura moderna baseada em:

- **TypeScript 5.9+** - Type safety completo
- **Vue 3.4+ Composition API** - Reatividade e composabilidade
- **Design Tokens DSS** - Sistema semântico de tokens
- **WCAG 2.1 AA** - Acessibilidade garantida
- **Vite 5.4+** - Build otimizado e rápido

---

## 📁 Estrutura do Projeto

```
DSS/
├── components/              # Componentes Vue
│   └── base/
│       ├── DssButton/
│       │   ├── 1-structure/
│       │   │   └── DssButton.ts.vue       # ✨ TypeScript + Composition API
│       │   ├── 2-composition/
│       │   │   └── DssButtonComponent.vue # Camada de composição
│       │   ├── 3-variants/               # Variantes visuais
│       │   ├── 4-output/                 # Saída final
│       │   ├── composables/              # Composables locais
│       │   │   ├── useButtonBase.ts
│       │   │   ├── useButtonVariants.ts
│       │   │   └── useButtonActions.ts
│       │   ├── types/                    # Tipos TypeScript
│       │   │   └── button.types.ts
│       │   ├── index.js                  # Export principal
│       │   └── README.md                 # Documentação
│       │
│       ├── DssBadge/       # Mesma estrutura
│       ├── DssAvatar/      # Mesma estrutura
│       ├── DssCard/        # Mesma estrutura + subcomponentes
│       └── DssInput/       # Mesma estrutura
│
├── composables/            # ✨ Composables globais (NOVO!)
│   ├── useColorClasses.ts  # Gerenciamento de cores
│   ├── useAccessibility.ts # Atributos WCAG 2.1 AA
│   ├── useComponentState.ts # Estados interativos
│   ├── useBrand.ts         # Marcas Sansys
│   └── index.ts            # Export central
│
├── tokens/                 # Design Tokens DSS
│   ├── colors.scss
│   ├── spacing.scss
│   ├── typography.scss
│   └── shadows.scss
│
├── utils/                  # Utilitários globais
│   └── helpers.js
│
├── index.js                # Entry point principal
├── index.scss              # Estilos globais
├── vite.config.js          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
└── package.json
```

---

## 🏛️ Arquitetura em 4 Camadas

Cada componente segue a arquitetura em 4 camadas:

### **1️⃣ Camada 1: Structure (Estrutura)**

**Arquivo**: `1-structure/Component.ts.vue`

**Responsabilidades**:
- Estrutura base do componente
- Props TypeScript com validação
- Composables (locais e globais)
- Lógica de negócio

**Exemplo (DssButton.ts.vue)**:
```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '../types/button.types'

// Composables locais
import { useButtonBase } from '../composables/useButtonBase'
import { useButtonVariants } from '../composables/useButtonVariants'
import { useButtonActions } from '../composables/useButtonActions'

// Composables globais
import { useColorClasses, useAccessibility } from '@/composables'

// Props com tipo TypeScript
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  size: 'md',
  color: 'primary'
})

// Composables fornecem lógica reutilizável
const { baseClasses, sizeClasses } = useButtonBase(props)
const { variantClasses } = useButtonVariants(props)
const { colorClasses } = useColorClasses({ color: props.color })
const { a11yAttrs } = useAccessibility({ role: 'button', disabled: props.disabled })

// Classes computadas finais
const buttonClasses = computed(() => [
  baseClasses.value,
  sizeClasses.value,
  variantClasses.value,
  colorClasses.value
])
</script>
```

### **2️⃣ Camada 2: Composition (Composição)**

**Arquivo**: `2-composition/ComponentComponent.vue`

**Responsabilidades**:
- Composição de elementos visuais
- Slots e conteúdo dinâmico
- Layout e estrutura HTML

**Exemplo**:
```vue
<template>
  <button
    :class="buttonClasses"
    v-bind="a11yAttrs"
    @click="handleClick"
  >
    <q-icon v-if="icon" :name="icon" />
    <span class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>
    <q-spinner v-if="loading" />
  </button>
</template>
```

### **3️⃣ Camada 3: Variants (Variantes)**

**Arquivo**: `3-variants/variants.scss`

**Responsabilidades**:
- Estilos visuais por variante
- Estados (hover, focus, active, disabled)
- Temas (light/dark)

**Exemplo**:
```scss
.dss-button {
  // Variante filled (padrão)
  &--filled {
    background: var(--color-primary);
    color: white;

    &:hover {
      background: var(--color-primary-dark);
    }
  }

  // Variante outlined
  &--outlined {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
}
```

### **4️⃣ Camada 4: Output (Saída)**

**Arquivo**: `4-output/index.js`

**Responsabilidades**:
- Export final do componente
- Integração das 3 camadas anteriores
- Documentação

---

## 🧩 Sistema de Composables

### **Composables Locais** (por componente)

Cada componente tem 3 composables especializados:

#### **1. useComponentBase** - Estrutura Base
```typescript
// useButtonBase.ts
export function useButtonBase(props: ButtonProps) {
  const baseClasses = computed(() => 'dss-button')

  const sizeClasses = computed(() => {
    return `dss-button--${props.size}`
  })

  return { baseClasses, sizeClasses }
}
```

#### **2. useComponentVariants** - Variantes Visuais
```typescript
// useButtonVariants.ts
export function useButtonVariants(props: ButtonProps) {
  const variantClasses = computed(() => {
    return `dss-button--${props.variant}`
  })

  return { variantClasses }
}
```

#### **3. useComponentActions** - Ações e Eventos
```typescript
// useButtonActions.ts
export function useButtonActions(props: ButtonProps, emit: any) {
  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
      emit('click', event)
    }
  }

  return { handleClick }
}
```

### **Composables Globais** (reutilizáveis)

Disponíveis para todos os componentes via `@/composables`:

#### **1. useColorClasses** - Gerenciamento de Cores
```typescript
import { useColorClasses } from '@/composables'

const { colorClasses } = useColorClasses({
  color: 'primary',
  variant: 'filled',
  textColor: 'white'
})
```

**Retorna**: Classes CSS para cor de fundo e texto

#### **2. useAccessibility** - Atributos WCAG 2.1 AA
```typescript
import { useAccessibility } from '@/composables'

const { a11yAttrs } = useAccessibility({
  role: 'button',
  ariaLabel: 'Salvar documento',
  disabled: props.disabled,
  loading: props.loading
})
```

**Retorna**: `role`, `aria-label`, `aria-disabled`, `aria-busy`, `tabindex`

#### **3. useComponentState** - Estados Interativos
```typescript
import { useComponentState } from '@/composables'

const {
  isFocused,
  isHovered,
  isActive,
  bindStateEvents
} = useComponentState({ disabled: props.disabled })
```

**Retorna**: Estados reativos e event handlers

#### **4. useBrand** - Marcas Sansys
```typescript
import { useBrand } from '@/composables'

const { brandClass, isBranded } = useBrand(props.brand, 'dss-button')
```

**Retorna**: Classes CSS para marcas (hub, water, waste)

---

## 🎨 Sistema de Design Tokens

### **Estrutura de Tokens**

```scss
// tokens/colors.scss
:root {
  // Cores Semânticas
  --color-primary: #1976D2;
  --color-secondary: #424242;
  --color-positive: #21BA45;
  --color-negative: #C10015;

  // Cores de Marca
  --brand-hub: #FF6F00;
  --brand-water: #0288D1;
  --brand-waste: #388E3C;

  // Cores Neutras
  --neutral-0: #FFFFFF;
  --neutral-100: #F5F5F5;
  --neutral-900: #212121;
}
```

### **Uso nos Componentes**

```scss
.dss-button--primary {
  background: var(--color-primary);
  color: white;
}

.dss-button--brand-hub {
  background: var(--brand-hub);
}
```

---

## 🔧 Sistema de Build

### **Vite 5.4+ com TypeScript**

**vite.config.js**:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'DesignSystemSansys',
      formats: ['es', 'umd'],
      fileName: (format) => `dss.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
})
```

### **TypeScript Configuration**

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "components/**/*.ts",
    "components/**/*.ts.vue",
    "composables/**/*.ts",
    "utils/**/*.ts"
  ]
}
```

### **Scripts de Build**

```bash
# Build completo com type checking
npm run build

# Build sem type checking (mais rápido)
npm run build:no-check

# Type checking isolado
npm run type-check

# Watch mode (recompila automaticamente)
npm run build:watch

# Build de desenvolvimento (sem minificação)
npm run build:dev
```

---

## ✅ Type Safety e Validação

### **Tipos TypeScript Completos**

**button.types.ts**:
```typescript
export type ButtonVariant = 'filled' | 'outlined' | 'flat' | 'unelevated' | 'transparent'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DssColor = 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'info'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: DssColor
  icon?: string
  iconRight?: string
  label?: string
  disabled?: boolean
  loading?: boolean
  brand?: 'hub' | 'water' | 'waste'
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
```

### **Autocomplete Inteligente**

TypeScript fornece:
- ✅ Autocomplete de props
- ✅ Validação de tipos em tempo de desenvolvimento
- ✅ Detecção de erros antes da execução
- ✅ Documentação inline via JSDoc
- ✅ Refactoring seguro

---

## 🧪 Workflow de Desenvolvimento

### **1. Durante Desenvolvimento**

Rode em um terminal:
```bash
npm run build:watch
```

Isso recompila automaticamente ao salvar arquivos.

### **2. Antes de Commit**

Execute validação completa:
```bash
npm run type-check
npm run build
```

Garante:
- ✅ 0 erros TypeScript
- ✅ Build bem-sucedido
- ✅ Bundle otimizado

### **3. Para Testar**

Rode o projeto de exemplo:
```bash
cd dss-example
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📊 Estatísticas da Arquitetura

### **Componentes Migrados v2.2.0**

| Componente | Arquivos TS | Composables | Tipos | Linhas |
|------------|-------------|-------------|-------|--------|
| DssButton | 1 | 3 | 1 | ~400 |
| DssBadge | 1 | 1 | 1 | ~150 |
| DssAvatar | 1 | 2 | 1 | ~200 |
| DssCard | 3 | 5 | 1 | ~500 |
| DssInput | 1 | 3 | 1 | ~450 |
| **TOTAL** | **9** | **18** | **5** | **~3000** |

### **Composables Globais**

| Composable | Linhas | Funcionalidade |
|------------|--------|----------------|
| useColorClasses | 92 | Gerenciamento de cores |
| useAccessibility | 133 | Atributos WCAG 2.1 AA |
| useComponentState | 135 | Estados interativos |
| useBrand | 100 | Marcas Sansys |
| **TOTAL** | **460** | **4 composables** |

### **Build Output**

```
dist/
├── dss.es.js      41.48 kB  # ESM bundle
├── dss.umd.js     31.39 kB  # UMD bundle
└── style.css     252.14 kB  # Estilos CSS
```

**Características**:
- ✅ Tree-shakeable (ESM)
- ✅ Minificado e otimizado
- ✅ Source maps incluídos
- ✅ 0 erros TypeScript
- ✅ 100% type coverage

---

## 🚀 Próximos Passos

### **Sprint 5: Próximos Componentes**

Candidatos para migração TypeScript:

1. **DssCheckbox** - Checkbox com estados
2. **DssRadio** - Radio button com grupos
3. **DssSelect** - Select/dropdown complexo
4. **DssDialog** - Modal/dialog system
5. **DssTable** - Tabela com paginação

**Estimativa**: 2-3 componentes por sprint

### **Melhorias Futuras**

- [ ] Testes unitários com Vitest
- [ ] Storybook para documentação visual
- [ ] CI/CD automatizado
- [ ] Publish no NPM registry
- [ ] Versionamento semântico automático

---

## 📚 Referências

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript com Vue](https://vuejs.org/guide/typescript/overview.html)
- [Vite Documentation](https://vitejs.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Tokens Community Group](https://designtokens.org/)

---

**Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves**

**Licença**: Propriedade da Jtech
