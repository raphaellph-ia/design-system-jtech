# 🚀 Guia Completo de Setup - DSS no VSCode

> **Objetivo**: Configurar o ambiente de desenvolvimento para testar e desenvolver os componentes do Design System Sansys (DSS)

---

## 📋 Índice

1. [Pré-requisitos](#-pré-requisitos)
2. [Instalação Básica](#-instalação-básica)
3. [Opção 1: Teste Rápido com HTML](#-opção-1-teste-rápido-com-html-recomendado)
4. [Opção 2: Setup Completo com Vite](#-opção-2-setup-completo-com-vite-desenvolvimento)
5. [Testando Dark Mode](#-testando-dark-mode)
6. [Troubleshooting](#-troubleshooting)

---

## ✅ Pré-requisitos

### 1. Software Necessário

- **Node.js** versão 14 ou superior
  ```bash
  node --version  # Deve mostrar v14.x.x ou superior
  ```

- **npm** versão 6 ou superior
  ```bash
  npm --version   # Deve mostrar 6.x.x ou superior
  ```

- **VSCode** (ou editor de sua preferência)

### 2. Extensões Recomendadas para VSCode

Abra VSCode e instale as seguintes extensões:

- **Vetur** ou **Volar** (para Vue 3)
- **SCSS IntelliSense** (para autocompletar SCSS)
- **Live Server** (para servir arquivos HTML)
- **ESLint** (linting JavaScript)
- **Prettier** (formatação de código)

**Como instalar extensões**:
1. Pressione `Ctrl+Shift+X` (Windows/Linux) ou `Cmd+Shift+X` (Mac)
2. Busque pelo nome da extensão
3. Clique em "Install"

---

## 📦 Instalação Básica

### 1. Navegue até o diretório do projeto

```bash
cd /mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2
```

### 2. Instale as dependências do projeto principal

```bash
npm install
```

Este comando instalará todas as dependências definidas no `package.json`.

### 3. Verifique a instalação

```bash
npm run build
```

Se não houver erros, a instalação está OK!

---

## 🎯 Opção 1: Teste Rápido com HTML (RECOMENDADO)

Esta é a forma **mais rápida** de visualizar o DssButton funcionando.

### Passo 1: Compilar SCSS para CSS

O navegador não entende SCSS, então precisamos compilar para CSS primeiro.

**Instalar compilador SCSS globalmente** (se ainda não tiver):

```bash
npm install -g sass
```

**Compilar o DSS**:

```bash
cd dss
sass index.scss index.css --no-source-map
```

Isso criará o arquivo `dss/index.css` com todos os estilos compilados.

### Passo 2: Atualizar o HTML de teste

Edite o arquivo `dss/test-dss-button.html` (linha 18):

**Altere de:**
```html
<link rel="stylesheet" href="./index.scss">
```

**Para:**
```html
<link rel="stylesheet" href="./index.css">
```

### Passo 3: Abrir no navegador

#### Opção A: Usando Live Server (Recomendado)

1. Abra `dss/test-dss-button.html` no VSCode
2. Clique com botão direito no arquivo
3. Selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente com hot-reload!

#### Opção B: Usando navegador diretamente

1. Abra o Windows Explorer (ou seu gerenciador de arquivos)
2. Navegue até: `C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\`
3. Dê duplo clique em `test-dss-button.html`

### Passo 4: Testar o DssButton

Você deverá ver:

- ✅ Botões com todas as cores semânticas (Primary, Secondary, Tertiary, Accent)
- ✅ Botões de feedback (Success, Error, Warning, Info)
- ✅ Botões em 5 tamanhos (XS, SM, MD, LG, XL)
- ✅ Botões em 4 variantes (Filled, Outlined, Flat, Unelevated)
- ✅ Botões com ícones Material Icons
- ✅ Estados: Normal, Loading, Disabled
- ✅ Modificadores: Dense, Round, No-caps, Block
- ✅ Brandabilidade: Hub (Laranja), Water (Azul), Waste (Verde)
- ✅ Toggle de Dark Mode no canto superior direito

### Passo 5: Auto-recompilação de SCSS (opcional)

Para recompilar automaticamente quando modificar arquivos SCSS:

```bash
cd dss
sass --watch index.scss:index.css
```

Deixe este terminal rodando. Sempre que você salvar um arquivo `.scss`, o CSS será recompilado automaticamente!

---

## 🛠️ Opção 2: Setup Completo com Vite (DESENVOLVIMENTO)

Para um ambiente de desenvolvimento mais robusto com Hot Module Replacement (HMR).

### Passo 1: Criar projeto Vite no diretório DSS

```bash
cd dss
npm create vite@latest dss-playground -- --template vue
cd dss-playground
npm install
```

### Passo 2: Copiar componentes DSS

```bash
# Criar diretório src/dss
mkdir -p src/dss

# Copiar estrutura DSS
cp -r ../tokens src/dss/
cp -r ../utils src/dss/
cp -r ../themes src/dss/
cp -r ../components src/dss/
cp ../index.scss src/dss/
```

### Passo 3: Instalar SASS

```bash
npm install -D sass
```

### Passo 4: Configurar App.vue

Edite `src/App.vue`:

```vue
<template>
  <div id="app">
    <h1>DSS Playground</h1>

    <section>
      <h2>DssButton</h2>
      <DssButton color="primary">Primary Button</DssButton>
      <DssButton color="secondary">Secondary Button</DssButton>
      <DssButton color="positive">Success Button</DssButton>
    </section>
  </div>
</template>

<script setup>
import DssButton from './dss/components/base/DssButton/DssButton.vue'
</script>

<style lang="scss">
@import './dss/index.scss';

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>
```

### Passo 5: Executar servidor de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador!

### Passo 6: Adicionar toggle de Dark Mode

Adicione ao `<template>` em `App.vue`:

```vue
<button
  @click="toggleTheme"
  style="position: fixed; top: 2rem; right: 2rem;"
>
  {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
</button>
```

E adicione ao `<script setup>`:

```js
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
```

---

## 🌙 Testando Dark Mode

### Auto-detect do Sistema

O dark mode detecta automaticamente a preferência do sistema operacional:

```javascript
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

### Toggle Manual

Use o botão "🌙 Dark Mode" / "☀️ Light Mode" no canto superior direito.

### Validar Cores no Dark Mode

Abra DevTools do navegador (`F12`) e verifique as CSS Custom Properties:

```css
/* Light Mode */
--dss-surface-default: #fafafa;
--dss-text-body: #0a0a0a;

/* Dark Mode */
--dss-surface-default: #262626;
--dss-text-body: #f5f5f5;
```

---

## 🐛 Troubleshooting

### Problema 1: "SCSS compilation failed"

**Solução**:
```bash
npm install -g sass
# ou
npm install -D sass
```

### Problema 2: "Cannot find module 'DssButton.vue'"

**Solução**: Verifique se copiou os arquivos corretamente:
```bash
ls dss/components/base/DssButton/
# Deve listar: DssButton.vue, DssButton.example.vue, index.js
```

### Problema 3: "Estilos não aparecem"

**Solução**: Verifique se compilou o SCSS:
```bash
cd dss
sass index.scss index.css
```

E verifique se o HTML está referenciando `index.css` (não `index.scss`).

### Problema 4: "Material Icons não aparecem"

**Solução**: Verifique se o link está no `<head>`:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### Problema 5: "Dark mode não funciona"

**Solução**: Abra DevTools e verifique se o atributo está sendo aplicado:
```javascript
document.documentElement.getAttribute('data-theme')
// Deve retornar "dark" quando ativo
```

### Problema 6: "Live Server não encontrado"

**Solução**: Instale a extensão no VSCode:
1. `Ctrl+Shift+X`
2. Busque "Live Server"
3. Instale "Live Server" por Ritwick Dey

### Problema 7: "Port 5173 already in use" (Vite)

**Solução**: Mate o processo ou use outra porta:
```bash
npm run dev -- --port 3000
```

---

## 📚 Próximos Passos

Após configurar o ambiente, você pode:

1. **Modificar estilos**: Edite arquivos em `dss/tokens/`, `dss/utils/`, etc.
2. **Criar novos componentes**: Use DssButton como referência
3. **Testar acessibilidade**: Use ferramentas como axe DevTools
4. **Validar WCAG**: Verifique contrastes de cores com Color Contrast Analyzer
5. **Expandir exemplos**: Adicione mais casos de uso ao HTML de teste

---

## 🎯 Checklist de Validação

Após setup, verifique:

- [ ] DssButton renderiza corretamente
- [ ] Todas as 8 cores funcionam (primary, secondary, tertiary, accent, positive, negative, warning, info)
- [ ] Todos os 5 tamanhos funcionam (xs, sm, md, lg, xl)
- [ ] Todas as 4 variantes funcionam (filled, outlined, flat, unelevated)
- [ ] Ícones Material Icons aparecem
- [ ] Estados funcionam (normal, loading, disabled)
- [ ] Dark mode toggle funciona
- [ ] Brandabilidade funciona (Hub, Water, Waste)
- [ ] Focus ring visível ao navegar com Tab
- [ ] Botões respondem a Enter e Space

---

## 📞 Suporte

Se encontrar problemas não listados aqui, verifique:

1. **Console do navegador** (`F12` → Console) para erros JavaScript
2. **Network tab** (`F12` → Network) para verificar se arquivos estão carregando
3. **Elements tab** (`F12` → Elements) para inspecionar estilos aplicados

---

**Status**: ✅ **Guia Completo e Testado**

**Última atualização**: Dezembro 2024
