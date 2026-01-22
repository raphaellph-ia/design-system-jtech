# 🎨 Design System Sansys (DSS)

<div align="center">

![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D.svg?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6.svg?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)

**Sistema de Design profissional com TypeScript + Composition API, tokens semânticos e acessibilidade WCAG 2.1 AA**

[Documentação](#-documentação) •
[Instalação](#-instalação) •
[Componentes](#-componentes) •
[Exemplos](#-exemplos)

</div>

---

## ✨ **Características**

- 🚀 **TypeScript + Composition API** - 6 componentes migrados com 100% type safety
- ✅ **Composables Reutilizáveis** - 18 composables (14 locais + 4 globais)
- ✅ **Componentes Vue 3** - Composition API (novos) + Options API (legado)
- ✅ **Tokens DSS** - Sistema completo de design tokens semânticos
- ✅ **Acessibilidade WCAG 2.1 AA** - Touch targets, contraste, navegação por teclado
- ✅ **Brandabilidade** - Hub 🟠, Water 🔵, Waste 🟢
- ✅ **Dark Mode Support** - Temas claro e escuro
- ✅ **TypeScript First** - Tipagens completas, autocomplete inteligente
- ✅ **Tree-shakeable** - Importe apenas o que você usa
- ✅ **Zero Hardcoded Values** - 100% baseado em tokens
- ✅ **Arquitetura em 4 Camadas** - Structure → Composition → Variants → Output
- 🔥 **Padrão Quasar Framework** - Classes utilitárias globais (97% de redução de código)

---

## 📦 **Instalação**

### NPM

```bash
npm install @sansys/design-system
```

### Yarn

```bash
yarn add @sansys/design-system
```

### PNPM

```bash
pnpm add @sansys/design-system
```

---

## 🚀 **Quick Start**

### **Opção 1: Plugin Global (Recomendado)**

Registra todos os componentes globalmente no app Vue.

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Importar plugin e CSS
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'

const app = createApp(App)

// Registrar plugin
app.use(DesignSystemSansys, {
  brand: 'hub' // opcional: hub, water, waste
})

app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <!-- Componentes disponíveis globalmente -->
  <DssButton color="primary" @click="handleClick">
    Clique Aqui
  </DssButton>

  <DssCard variant="elevated">
    <DssCardSection>
      <h2>Meu Card</h2>
      <DssInput v-model="nome" variant="outlined" label="Nome" />
    </DssCardSection>
  </DssCard>
</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')

function handleClick() {
  console.log('Botão clicado!')
}
</script>
```

---

### **Opção 2: Importação Individual (Tree-shaking)**

Importe apenas os componentes que você precisa.

```vue
<template>
  <DssButton color="primary" @click="handleClick">
    Clique Aqui
  </DssButton>
</template>

<script setup>
import { DssButton } from '@sansys/design-system'
import '@sansys/design-system/css'

const handleClick = () => console.log('Clicado!')
</script>
```

---

## 🧩 **Componentes Disponíveis**

### ✨ **Migrados para TypeScript + Composition API** (v2.2.0)

Os seguintes componentes foram modernizados com:
- ✅ 100% Type Safety
- ✅ Composition API
- ✅ Composables reutilizáveis
- ✅ Autocomplete inteligente
- ✅ Documentação JSDoc inline

**Componentes Modernizados:**
- ✅ **DssButton** - Botão com 6 variantes + 3 composables
- ✅ **DssBadge** - Badge/contador com 1 composable
- ✅ **DssAvatar** - Avatar com 2 composables
- ✅ **DssCard** + subcomponentes - Sistema completo com 5 composables
- ✅ **DssInput** - Formulário com 3 composables

**Composables Globais Disponíveis:**
- `useColorClasses` - Gerenciamento de cores DSS
- `useAccessibility` - Atributos WCAG 2.1 AA
- `useComponentState` - Estados interativos
- `useBrand` - Marcas Sansys (hub, water, waste)

[📖 Ver Guia de Migração](./MIGRATION_TO_TYPESCRIPT.md)

---

### **DssButton** - Botão completo com 6 variantes

```vue
<DssButton variant="elevated" color="primary" size="md">
  Clique Aqui
</DssButton>
```

[📖 Documentação completa](./components/base/DssButton/DssButton.md)

### **DssCard** - Card flexível com composição

```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h2>Título</h2>
  </DssCardSection>
  <DssCardActions>
    <DssButton color="primary">OK</DssButton>
  </DssCardActions>
</DssCard>
```

### **DssInput** - Input de formulário com validação

```vue
<DssInput
  v-model="nome"
  variant="outlined"
  label="Nome"
  :error="nome.length < 3"
  error-message="Mínimo 3 caracteres"
/>
```

---

## 🎨 **Brandabilidade**

```vue
<!-- Hub (Laranja) -->
<DssButton brand="hub" color="primary">Hub</DssButton>

<!-- Water (Azul) -->
<DssButton brand="water" color="primary">Water</DssButton>

<!-- Waste (Verde) -->
<DssButton brand="waste" color="primary">Waste</DssButton>
```

---

## ♿ **Acessibilidade WCAG 2.1 AA**

- ✅ Contraste 4.5:1
- ✅ Touch targets 48×48px
- ✅ Navegação por teclado
- ✅ Focus visível
- ✅ ARIA labels
- ✅ Reduced motion support

---

## 📚 **Documentação**

### **🚀 TypeScript + Composition API (NOVO!)**
- **[MIGRATION_TO_TYPESCRIPT.md](./MIGRATION_TO_TYPESCRIPT.md)** - ✨ Guia completo de migração
  - Padrões estabelecidos
  - Componentes migrados (DssButton, DssBadge, DssAvatar, DssCard, DssInput)
  - Composables globais reutilizáveis
  - Templates e exemplos práticos

### **Arquitetura e Padrões**
- **[DSS_ARCHITECTURE_GUIDE.md](./DSS_ARCHITECTURE_GUIDE.md)** - Arquitetura em 4 camadas
- **[DSS_IMPLEMENTATION_GUIDE.md](./DSS_IMPLEMENTATION_GUIDE.md)** - Guia completo de implementação
- **[REFACTORING_QUASAR_PATTERN.md](./REFACTORING_QUASAR_PATTERN.md)** 🔥 - Padrão Quasar Framework (classes utilitárias)

### **Por Componente**
- **[DssButton](./components/base/DssButton/README.md)** - Botão completo ✨ TypeScript
- **[DssBadge](./components/base/DssBadge/README.md)** - Badge/contador ✨ TypeScript
- **[DssAvatar](./components/base/DssAvatar/README.md)** - Avatar ✨ TypeScript
- **[DssCard](./components/base/DssCard/README.md)** - Card ✨ TypeScript
- **[DssInput](./components/base/DssInput/README.md)** - Input ✨ TypeScript

---

## 🛠️ **Desenvolvimento**

```bash
# Instalar dependências
npm install

# Build completo com TypeScript type checking
npm run build

# Build sem type checking (mais rápido)
npm run build:no-check

# Watch mode (recompila automaticamente)
npm run build:watch

# Type checking isolado (sem build)
npm run type-check

# Rodar exemplo local
cd dss-example
npm run dev
```

### ✨ **Desenvolvimento com TypeScript**

**Novos Scripts Disponíveis:**

```bash
# Validar tipos TypeScript sem compilar
npm run type-check

# Build de desenvolvimento (sem minificação)
npm run build:dev

# Build em watch mode (recompila ao salvar)
npm run build:watch
```

**Workflow Recomendado:**

1. **Durante desenvolvimento**: Use `npm run build:watch` em um terminal
2. **Antes de commit**: Execute `npm run type-check` e `npm run build`
3. **Para testar**: Rode `cd dss-example && npm run dev`

### ⚠️ **Importante: Build de Componentes**

**Componentes `.ts.vue` são compilados automaticamente pelo Vite!**

Após modificar arquivos `.vue` ou `.ts.vue`, execute `npm run build` (ou `build:watch`) para atualizar o diretório `dist/`.

**Ver:** [MIGRATION_TO_TYPESCRIPT.md](./MIGRATION_TO_TYPESCRIPT.md) para guia completo de desenvolvimento TypeScript.

---

## 📝 **Licença**

Propriedade da Jtech

Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves
