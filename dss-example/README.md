# 📘 Design System Sansys - Projeto Exemplo

Este projeto demonstra o uso completo da biblioteca **Design System Sansys (DSS)** v2.0.0 em uma aplicação Vue 3.

## 🎯 O que este exemplo demonstra

✅ **Instalação e configuração** do plugin Vue global
✅ **Todos os componentes** disponíveis (DssButton, DssCard, DssInput)
✅ **Todas as variantes** de cada componente
✅ **Sistema de cores** completo (primary, secondary, accent, etc.)
✅ **Tamanhos** (xs, sm, md, lg, xl)
✅ **Estados** (loading, disabled, error)
✅ **Brandabilidade** (Hub 🟠, Water 🔵, Waste 🟢)
✅ **Validação de formulários** com feedback visual
✅ **Exemplo completo** de formulário funcional

---

## 🚀 Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em modo desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:5173**

### 3. Build para produção

```bash
npm run build
```

### 4. Preview do build

```bash
npm run preview
```

---

## 📦 Estrutura do Projeto

```
dss-example/
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
├── vite.config.js      # Configuração do Vite
└── src/
    ├── main.js         # Ponto de entrada (registra plugin global)
    └── App.vue         # Componente principal com exemplos
```

---

## 💡 Uso do Design System

### **Opção 1: Plugin Global (usado neste exemplo)**

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'

const app = createApp(App)

app.use(DesignSystemSansys, {
  brand: 'hub' // Opcional: hub, water, waste
})

app.mount('#app')
```

Depois, use os componentes diretamente nos templates:

```vue
<template>
  <DssButton color="primary">Clique Aqui</DssButton>
  <DssCard variant="elevated">
    <DssCardSection>
      <h2>Meu Card</h2>
    </DssCardSection>
  </DssCard>
</template>
```

### **Opção 2: Importação Individual (Tree-shaking)**

```vue
<template>
  <DssButton color="primary">Clique Aqui</DssButton>
</template>

<script setup>
import { DssButton } from '@sansys/design-system'
import '@sansys/design-system/css'
</script>
```

---

## 🎨 Componentes Disponíveis

### **DssButton**
```vue
<DssButton
  variant="elevated"
  color="primary"
  size="md"
  :loading="false"
  :disabled="false"
  icon="favorite"
  :icon-right="false"
  @click="handleClick"
>
  Clique Aqui
</DssButton>
```

**Props:**
- `variant`: `elevated` | `flat` | `outline` | `unelevated` | `push` | `glossy`
- `color`: `primary` | `secondary` | `accent` | `positive` | `negative` | `warning` | `info`
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `loading`: boolean
- `disabled`: boolean
- `icon`: string (Material Icons)
- `icon-right`: boolean

---

### **DssCard**
```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h2>Título</h2>
    <p>Conteúdo do card</p>
  </DssCardSection>
  <DssCardActions>
    <DssButton color="primary">OK</DssButton>
  </DssCardActions>
</DssCard>
```

**Props:**
- `variant`: `flat` | `outlined` | `elevated`

**Subcomponentes:**
- `DssCardSection`: Seção de conteúdo
- `DssCardActions`: Seção de ações (botões)

---

### **DssInput**
```vue
<DssInput
  v-model="nome"
  variant="outlined"
  label="Nome"
  placeholder="Digite seu nome"
  type="text"
  :error="false"
  error-message="Campo inválido"
/>
```

**Props:**
- `variant`: `filled` | `outlined` | `standout` | `borderless`
- `label`: string
- `placeholder`: string
- `type`: `text` | `email` | `password` | `number` | etc.
- `error`: boolean
- `error-message`: string
- `modelValue`: any (v-model)

---

## 🟠 Brandabilidade

```vue
<!-- Hub (Laranja) -->
<DssButton brand="hub" color="primary">Hub</DssButton>

<!-- Water (Azul) -->
<DssButton brand="water" color="primary">Water</DssButton>

<!-- Waste (Verde) -->
<DssButton brand="waste" color="primary">Waste</DssButton>
```

---

## ♿ Acessibilidade WCAG 2.1 AA

Todos os componentes seguem as diretrizes de acessibilidade:

- ✅ **Contraste mínimo** de 4.5:1 entre texto e fundo
- ✅ **Touch targets** de 48×48px para elementos interativos
- ✅ **Navegação por teclado** completa (Tab, Enter, Space)
- ✅ **Focus visível** em todos os elementos interativos
- ✅ **ARIA labels** e roles apropriados
- ✅ **Suporte a reduced motion**

---

## 📚 Documentação Completa

Para documentação detalhada de cada componente, consulte:

- [DssButton](../components/base/DssButton/DssButton.md)
- [Design System Sansys - README Principal](../README.md)

---

## 🛠️ Tecnologias Utilizadas

- **Vue 3.4** - Framework progressivo
- **Vite 5** - Build tool moderna
- **Design System Sansys 2.0** - Biblioteca de componentes

---

## 📝 Licença

Propriedade da Jtech

Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves
