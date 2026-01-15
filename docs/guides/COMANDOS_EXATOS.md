# 🎯 Comandos Exatos para Testar o DssButton

> **Copie e cole estes comandos exatamente como estão**

---

## ✅ Passo a Passo (Windows)

### Passo 1: Abrir Terminal no VSCode

1. Abra o VSCode
2. Pressione **Ctrl + `** (ou Menu: View → Terminal)
3. O terminal abrirá na parte inferior do VSCode

### Passo 2: Navegar até o Diretório DSS

Cole este comando no terminal e pressione **Enter**:

```bash
cd dss
```

**Resultado esperado**: O prompt mudará para mostrar que você está em `dss/`

### Passo 3: Instalar Dependências (SASS)

Cole este comando e pressione **Enter**:

```bash
npm install
```

**Resultado esperado**:
```
added 10 packages, and audited 11 packages in 3s

found 0 vulnerabilities
```

**Aguarde**: Este processo pode levar 10-30 segundos.

### Passo 4: Compilar SCSS → CSS

Cole este comando e pressione **Enter**:

```bash
npm run build
```

**Resultado esperado**:
```
> design-system-sansys@1.0.0 build
> npx sass index.scss index.css --no-source-map

Compiled index.scss to index.css.
```

### Passo 5: Verificar se Funcionou

Cole este comando e pressione **Enter**:

```bash
dir index.css
```

**Resultado esperado**: Você verá detalhes do arquivo `index.css` criado.

### Passo 6: Abrir no Navegador

**Opção A - Live Server (Recomendado)**:
1. No VSCode, abra o arquivo: `dss/test-dss-button.html`
2. Clique com botão direito no editor
3. Selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente!

**Opção B - Windows Explorer**:
1. Pressione **Windows + E** para abrir o Explorer
2. Navegue até: `C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\`
3. Duplo clique em **`test-dss-button.html`**

---

## 🐛 Se Algo Der Errado

### Erro: "npm: command not found"

**Solução**: Node.js não está instalado. Baixe e instale de: https://nodejs.org/

Após instalar, feche e reabra o VSCode.

### Erro: "Cannot find module 'sass'"

**Solução**: Execute novamente:
```bash
npm install
```

### Erro: "npx: command not found"

**Solução**: Atualize o Node.js para versão 14 ou superior.

Verifique a versão:
```bash
node --version
```

Deve mostrar: `v14.x.x` ou superior.

### "Estilos não aparecem no navegador"

**Solução**: Verifique se `index.css` foi criado:
```bash
dir index.css
```

Se não existir, execute:
```bash
npm run build
```

---

## 📝 Resumo dos Comandos (Copie Tudo)

```bash
# 1. Navegar
cd dss

# 2. Instalar dependências
npm install

# 3. Compilar
npm run build

# 4. Verificar
dir index.css
```

Depois abra `test-dss-button.html` no navegador!

---

## ✅ O Que Você Verá no Navegador

- ✅ Título: "DssButton - Teste Visual Completo"
- ✅ Botões com diferentes cores (Primary, Secondary, Tertiary, Accent...)
- ✅ Botões de diferentes tamanhos (XS, SM, MD, LG, XL)
- ✅ Botão "🌙 Dark Mode" no canto superior direito
- ✅ Ícones Material Icons nos botões
- ✅ Seções organizadas (Cores Semânticas, Tamanhos, Variantes, etc.)

---

## 🎯 Teste o Dark Mode

1. Clique no botão **"🌙 Dark Mode"** no canto superior direito
2. Observe:
   - Background muda de branco para cinza escuro
   - Texto muda de preto para branco
   - Botões ajustam cores automaticamente

3. Clique em **"☀️ Light Mode"** para voltar ao tema claro

---

## 🚀 Desenvolvimento Contínuo

Para recompilar automaticamente quando modificar arquivos `.scss`:

```bash
npm run watch
```

Deixe este comando rodando em um terminal. Sempre que salvar um arquivo SCSS, o CSS será atualizado automaticamente!

Pressione **Ctrl+C** para parar o watch.

---

## 📞 Precisa de Ajuda?

Se nenhum desses comandos funcionar, me informe:

1. **Qual comando deu erro?**
2. **Qual foi a mensagem de erro completa?**
3. **Qual versão do Node.js?** (execute: `node --version`)

---

**Status**: ✅ **Pronto para Executar**

**Última atualização**: Dezembro 2024
