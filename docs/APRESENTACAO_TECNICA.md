# 📊 Design System Sansys v2.0.0 - Apresentação Técnica

## 🎯 Objetivo

Esta apresentação demonstra o **Design System Sansys (DSS)** como uma **biblioteca NPM profissional** pronta para uso em projetos Vue 3, com componentes acessíveis (WCAG 2.1 AA), sistema de tokens semânticos e brandabilidade multi-produto.

---

## 📦 O que foi desenvolvido

### **1. Biblioteca NPM Completa**

- **Package:** `@sansys/design-system` v2.0.0
- **Formato:** ES Module + UMD (compatível com bundlers e browsers)
- **Build System:** Vite 5 + Rollup
- **TypeScript Ready:** Preparado para tipagens (em desenvolvimento)
- **Tree-shakeable:** Importação individual de componentes

### **2. Componentes Vue 3 Disponíveis**

✅ **DssButton** - Botão completo com 6 variantes
✅ **DssCard** - Card flexível com subcomponentes
✅ **DssInput** - Input de formulário com validação

### **3. Sistema de Tokens DSS**

- **Cores semânticas:** primary, secondary, accent, positive, negative, warning, info
- **Spacing:** Sistema baseado em múltiplos de 4px
- **Typography:** Escala tipográfica consistente
- **Breakpoints:** Sistema responsivo
- **Acessibilidade:** Contraste WCAG 2.1 AA garantido

### **4. Brandabilidade**

Sistema único de brandability para 3 produtos:

- **Hub** 🟠 - Laranja (#FF6B00)
- **Water** 🔵 - Azul (#0066CC)
- **Waste** 🟢 - Verde (#00CC66)

---

## 🏗️ Arquitetura em 4 Camadas

Cada componente segue a arquitetura modular:

```
DssButton/
├── 1-structure/      # Estrutura base Vue
│   └── DssButton.vue
├── 2-composition/    # Composição de estilos
│   └── _base.scss
├── 3-variants/       # Variantes visuais
│   └── index.scss
└── 4-output/         # Output final
    └── index.scss
```

**Vantagens:**
- ✅ Separação clara de responsabilidades
- ✅ Fácil manutenção e extensão
- ✅ Reutilização de código
- ✅ Testes isolados por camada

---

## 📁 Estrutura da Biblioteca

```
dss/
├── dist/                      # 📦 Build da biblioteca
│   ├── dss.es.js             # ES Module (21.72 kB)
│   ├── dss.umd.js            # UMD (13.69 kB)
│   └── style.css             # CSS compilado (123.02 kB)
│
├── components/                # 🧩 Componentes Vue 3
│   ├── base/
│   │   ├── DssButton/
│   │   ├── DssCard/
│   │   └── DssInput/
│   └── index.js              # Exportações + Plugin Vue
│
├── tokens/                    # 🎨 Design Tokens
│   ├── colors/
│   ├── spacing/
│   ├── typography/
│   └── index.scss
│
├── themes/                    # 🌈 Temas (Hub, Water, Waste)
│   ├── hub.scss
│   ├── water.scss
│   └── waste.scss
│
├── utils/                     # 🛠️ Utilitários SCSS
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _accessibility-mixins.scss
│
├── index.js                   # 🚀 Entry point principal
├── package.json              # 📋 Configuração NPM
├── vite.config.js            # ⚙️ Build config
└── README.md                 # 📖 Documentação

dss-example/                  # 🎬 Projeto de demonstração
├── src/
│   ├── App.vue              # Exemplos de todos os componentes
│   └── main.js              # Setup do plugin
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Como Testar (Revisor Técnico)

### **Passo 1: Verificar o Build**

```bash
cd dss/
npm install
npm run build
```

**Resultado esperado:**
- ✅ `dist/dss.es.js` - ES Module gerado
- ✅ `dist/dss.umd.js` - UMD gerado
- ✅ `dist/style.css` - CSS compilado
- ✅ Source maps gerados

---

### **Passo 2: Executar Projeto Exemplo**

```bash
cd dss-example/
npm install
npm run dev
```

**Acesse:** http://localhost:5173

**O que você verá:**
- ✅ Todos os componentes funcionando
- ✅ Todas as variantes (elevated, flat, outline, etc.)
- ✅ Sistema de cores completo
- ✅ Tamanhos (xs, sm, md, lg, xl)
- ✅ Estados (loading, disabled, error)
- ✅ Brandabilidade (Hub, Water, Waste)
- ✅ Formulário completo com validação

---

### **Passo 3: Testar Importação Individual**

Abra `dss-example/src/App.vue` e mude de plugin global para importação individual:

```vue
<script setup>
// Importação individual (tree-shaking)
import { DssButton, DssCard, DssInput } from '@sansys/design-system'
import '@sansys/design-system/css'

// ... resto do código
</script>
```

---

## 🎨 Exemplos de Uso

### **Opção 1: Plugin Global**

```javascript
// main.js
import { createApp } from 'vue'
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'

app.use(DesignSystemSansys, {
  brand: 'hub' // hub, water, ou waste
})
```

```vue
<!-- Componentes disponíveis globalmente -->
<template>
  <DssButton color="primary">Clique</DssButton>
  <DssCard variant="elevated">
    <DssCardSection>
      <h2>Título</h2>
    </DssCardSection>
  </DssCard>
</template>
```

### **Opção 2: Importação Individual (Tree-shaking)**

```vue
<template>
  <DssButton color="primary">Clique</DssButton>
</template>

<script setup>
import { DssButton } from '@sansys/design-system'
import '@sansys/design-system/css'
</script>
```

---

## ♿ Conformidade WCAG 2.1 AA

### **Contraste de Cores**
- ✅ Todas as combinações de cores testadas
- ✅ Contraste mínimo 4.5:1 para texto normal
- ✅ Contraste mínimo 3:1 para texto grande
- ✅ Auto-contraste em fundos variáveis

### **Touch Targets**
- ✅ Botões com mínimo 48×48px
- ✅ Inputs com altura mínima de 48px
- ✅ Espaçamento adequado entre elementos

### **Navegação por Teclado**
- ✅ Todos os botões acessíveis via Tab
- ✅ Enter/Space para ativar
- ✅ Focus visível em todos os elementos

### **ARIA e Semântica**
- ✅ ARIA labels apropriados
- ✅ Roles semânticos corretos
- ✅ Live regions para feedback

### **Reduced Motion**
- ✅ Suporte a `prefers-reduced-motion`
- ✅ Animações desabilitadas quando solicitado

---

## 📊 Métricas de Performance

### **Bundle Size**
- **ES Module:** 21.72 kB (gzip: 4.87 kB)
- **UMD:** 13.69 kB (gzip: 3.72 kB)
- **CSS:** 123.02 kB (gzip: 11.70 kB)

### **Tree-shaking**
Importando apenas DssButton:
```javascript
import { DssButton } from '@sansys/design-system'
// Bundle final: ~8 kB (apenas DssButton + dependências)
```

---

## 🔍 Diferenciais Técnicos

### **1. Arquitetura em 4 Camadas**
Separação clara entre estrutura, composição, variantes e output.

### **2. Sistema de Tokens**
100% baseado em tokens semânticos, sem valores hardcoded.

### **3. Brandabilidade**
Sistema único que permite 3 identidades visuais distintas sem duplicação de código.

### **4. Acessibilidade WCAG 2.1 AA**
Conformidade completa com diretrizes de acessibilidade.

### **5. Vue 3 Composition API + Options API**
Compatível com ambos os estilos de código.

### **6. TypeScript Ready**
Estrutura preparada para tipagens completas.

### **7. Zero Config**
Funciona out-of-the-box, sem configuração adicional.

---

## 🛣️ Roadmap

### **v2.1.0 (Próxima Release)**
- [ ] DssCheckbox
- [ ] DssRadio
- [ ] DssSelect
- [ ] DssDialog
- [ ] Tipagens TypeScript completas

### **v2.2.0**
- [ ] DssTable
- [ ] DssToolbar
- [ ] DssTabs
- [ ] DssBreadcrumb

### **v3.0.0**
- [ ] Composables utilitários
- [ ] Testes E2E completos
- [ ] Storybook integrado
- [ ] CLI para scaffolding

---

## 📚 Documentação Adicional

- **[README Principal](./README.md)** - Instalação e uso básico
- **[DssButton Docs](./components/base/DssButton/DssButton.md)** - Documentação completa do botão
- **[Projeto Exemplo](./dss-example/README.md)** - Como executar exemplos
- **[Tokens System](./tokens/README.md)** - Sistema de design tokens

---

## 👨‍💻 Autor

**Hebert Daniel Oliveira Chaves**

- GitHub: [@hebertchaves](https://github.com/hebertchaves)
- Email: hebert.chaves@veolia.com

---

## 📝 Licença

MIT © 2025 Sansys/Veolia

---

## ✅ Checklist de Revisão Técnica

Para o revisor técnico, verificar:

- [ ] **Build bem-sucedido** - `npm run build` executa sem erros
- [ ] **Arquivos gerados** - dist/ contém dss.es.js, dss.umd.js, style.css
- [ ] **Projeto exemplo funciona** - `npm run dev` em dss-example/
- [ ] **Componentes renderizam** - DssButton, DssCard, DssInput aparecem
- [ ] **Variantes funcionam** - elevated, flat, outline, etc.
- [ ] **Cores funcionam** - primary, secondary, accent, etc.
- [ ] **Estados funcionam** - loading, disabled, error
- [ ] **Brandabilidade funciona** - Hub, Water, Waste mudam cores
- [ ] **Validação funciona** - DssInput mostra erro quando inválido
- [ ] **Formulário funciona** - Exemplo completo envia dados
- [ ] **Acessibilidade** - Navegação por teclado funciona
- [ ] **Responsividade** - Layout se adapta em mobile
- [ ] **Documentação clara** - README.md é compreensível
- [ ] **Código limpo** - Sem console.log, código comentado, etc.
- [ ] **Padrões consistentes** - Arquitetura mantida em todos os componentes

---

## 🎯 Conclusão

O **Design System Sansys v2.0.0** está pronto para produção como biblioteca NPM profissional, com:

✅ **Arquitetura sólida** - 4 camadas modulares
✅ **Acessibilidade completa** - WCAG 2.1 AA
✅ **Performance otimizada** - Tree-shaking + bundles pequenos
✅ **Brandabilidade única** - Sistema multi-produto
✅ **Developer Experience** - Fácil instalação e uso
✅ **Documentação completa** - README + exemplos + docs

**Status:** ✅ **APROVADO PARA REVISÃO TÉCNICA**
