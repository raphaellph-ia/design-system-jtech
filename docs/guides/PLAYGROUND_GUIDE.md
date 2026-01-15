# 🎨 DSS Components Playground - Guia de Uso

**Arquivo:** `playground-standalone.html`
**Componentes:** DssInput, DssCard
**Versão:** Standalone (sem necessidade de compilação)

---

## 🚀 Como Usar

### **Método 1: Abrir Diretamente no Navegador (Recomendado)**

1. Navegue até o arquivo:
   ```
   C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\playground-standalone.html
   ```

2. **Clique duplo** no arquivo `playground-standalone.html`

3. O playground abrirá automaticamente no seu navegador padrão

4. ✅ **Pronto!** Você já pode testar os componentes visualmente

---

### **Método 2: Via HTTP Server (Opcional)**

Se preferir rodar em um servidor local:

```bash
# Opção 1: Python
cd C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss
python -m http.server 8000

# Opção 2: Node.js (npx)
cd C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss
npx http-server -p 8000

# Acesse: http://localhost:8000/playground-standalone.html
```

---

## 📋 O Que Você Pode Testar

### **DssInput - 8 Exemplos**

1. ✅ **Outlined** (padrão) - Border completa
2. ✅ **Filled** - Background sólido + border-bottom
3. ✅ **Standout** - Alto contraste (fundo escuro)
4. ✅ **Borderless** - Apenas underline no focus
5. ✅ **Com Erro** - Estado de erro com mensagem
6. ✅ **Dense** - Versão compacta
7. ✅ **Disabled** - Desabilitado
8. ✅ **Com Hint** - Helper text

### **DssCard - 6 Exemplos**

1. ✅ **Elevated** (padrão) - Com elevação/shadow
2. ✅ **Flat** - Sem elevação
3. ✅ **Bordered** - Border + elevação
4. ✅ **Outlined** - Border apenas (sem elevação)
5. ✅ **Clickable** - Hover aumenta elevação
6. ✅ **Complex** - Multi-section com actions

### **Brandability - 3 Brands**

- 🟠 **Hub** (Laranja) - `--dss-hub-600`
- 🔵 **Water** (Azul) - `--dss-water-500`
- 🟢 **Waste** (Verde) - `--dss-waste-600`

---

## 🎮 Controles Disponíveis

### **Configurações Globais (Topo)**

- **Default** - Sem brand (usa `--dss-primary`)
- **🟠 Hub** - Aplica accent color Hub (laranja)
- **🔵 Water** - Aplica accent color Water (azul)
- **🟢 Waste** - Aplica accent color Waste (verde)

### **Interações**

- **Inputs**: Digite nos campos para ver valores mudarem
- **Focus**: Clique nos inputs para ver estados de focus
- **Hover**: Passe o mouse nos cards clickables
- **Click**: Clique no card clickable para ver alert

---

## 🔍 Funcionalidades do Playground

### **1. Estados em Tempo Real**

Ao digitar nos inputs, você verá:
- ✅ Label flutuando para cima
- ✅ Valor sendo exibido abaixo
- ✅ Border/background mudando de cor
- ✅ Transições suaves

### **2. Focus States**

Ao clicar nos inputs (focus):
- ✅ Border muda de cor (`--dss-primary` ou brand color)
- ✅ Box-shadow aparece
- ✅ Label flutua (se não estava flutuando)
- ✅ Background muda (variante filled)

### **3. Brand Showcase**

Ao selecionar uma brand:
- ✅ Nova seção aparece no final
- ✅ Mostra input e card com accent color da brand
- ✅ Focus usa cor da brand em vez de primary

### **4. Hover Effects**

Nos cards clickables:
- ✅ Elevação aumenta
- ✅ Card "levanta" (translateY)
- ✅ Transição suave

---

## 🛠️ Tecnologias Usadas

- **Vue 3** (via CDN) - Reatividade e data binding
- **DSS Tokens** (`index.css`) - CSS custom properties
- **CSS Inline** - Estilos dos componentes incorporados
- **Vanilla HTML** - Sem build necessário

---

## 📦 Estrutura do Arquivo

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- DSS Tokens -->
    <link rel="stylesheet" href="./index.css">

    <!-- Vue 3 CDN -->
    <script src="https://unpkg.com/vue@3"></script>

    <!-- Component Styles (Inline) -->
    <style>
      .dss-input { ... }
      .dss-card { ... }
    </style>
  </head>

  <body>
    <div id="app">
      <!-- Vue Template -->
    </div>

    <script>
      // Vue App Instance
      createApp({ ... }).mount('#app')
    </script>
  </body>
</html>
```

---

## ✅ Vantagens do Playground Standalone

1. ✅ **Zero Build** - Abre diretamente no navegador
2. ✅ **Auto-contido** - Não depende de SCSS compilado
3. ✅ **Rápido** - Testes visuais imediatos
4. ✅ **Tokens Reais** - Usa `index.css` do DSS
5. ✅ **Interativo** - Vue 3 para reatividade
6. ✅ **Completo** - Todas as variantes e estados

---

## 🎯 Checklist de Testes Visuais

Ao abrir o playground, verifique:

### **DssInput**
- [ ] Outlined tem border completa
- [ ] Filled tem background + border-bottom
- [ ] Standout tem fundo escuro + texto branco
- [ ] Borderless não tem bordas visíveis (até focus)
- [ ] Label flutua ao digitar
- [ ] Focus muda cor da border
- [ ] Erro mostra border vermelha + mensagem
- [ ] Dense é mais compacto (40px vs 56px)
- [ ] Disabled está opaco e não editável
- [ ] Hint aparece abaixo do input

### **DssCard**
- [ ] Elevated tem shadow visível
- [ ] Flat não tem shadow
- [ ] Bordered tem border + shadow
- [ ] Outlined tem border sem shadow
- [ ] Clickable aumenta shadow no hover
- [ ] Multi-section tem dividers entre seções

### **Brandability**
- [ ] Hub (laranja) muda focus color
- [ ] Water (azul) muda focus color
- [ ] Waste (verde) muda focus color
- [ ] Cards mostram border-left colorida

---

## 🐛 Troubleshooting

### **Problema: Estilos não aparecem**

**Solução:** Verifique se o arquivo `index.css` existe em:
```
C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\index.css
```

### **Problema: Vue não carrega**

**Solução:** Verifique conexão com internet (Vue vem de CDN)

### **Problema: Focus não funciona**

**Solução:** Clique dentro do input, não apenas no label

### **Problema: Brand colors não mudam**

**Solução:** Clique nos botões Hub/Water/Waste no topo da página

---

## 📊 Próximos Passos

Após validar visualmente os componentes no playground:

1. ✅ Confirmar que tokens DSS estão corretos
2. ✅ Verificar todas as variantes funcionando
3. ✅ Validar brandability (Hub, Water, Waste)
4. ✅ Testar estados (focus, error, disabled)
5. ✅ Decidir ajustes necessários
6. ✅ Criar próximo componente (DssSelect, DssTextarea, etc.)

---

## 💡 Dicas

- **Teste em diferentes navegadores** - Chrome, Firefox, Edge
- **Teste responsividade** - Redimensione a janela
- **Compare com Quasar** - Abra docs do Quasar lado a lado
- **Valide tokens** - Inspecione elementos no DevTools
- **Teste interações** - Digite, clique, hover em tudo

---

**Criado:** 18 de Dezembro de 2025
**Componentes:** DssInput, DssCard
**Arquitetura:** 4 Camadas DSS v2.0
**Tipo:** Playground Standalone (sem build)
