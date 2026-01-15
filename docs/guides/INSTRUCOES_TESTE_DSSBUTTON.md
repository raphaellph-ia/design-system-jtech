# 🎯 Instruções de Teste - DssButton

> **Objetivo**: Testar visualmente o componente DssButton no navegador com dark mode funcional

---

## ⚡ Teste SUPER RÁPIDO (3 minutos)

### Passo 1: Compilar SCSS → CSS

Abra o terminal no diretório do projeto:

```bash
cd /mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2
```

Execute o comando de compilação:

```bash
npm run dss:build
```

**O que acontece**: O arquivo `dss/index.scss` será compilado para `dss/index.css`

**Resultado esperado**:
```
Compiled dss/index.scss to dss/index.css.
```

### Passo 2: Abrir no Navegador

**Opção A - Usando Live Server (Recomendado)**:
1. Abra VSCode
2. Abra o arquivo `dss/test-dss-button.html`
3. Clique com botão direito no editor
4. Selecione **"Open with Live Server"**
5. O navegador abrirá automaticamente!

**Opção B - Duplo Clique**:
1. Abra o Windows Explorer
2. Navegue até: `C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\`
3. Dê duplo clique em `test-dss-button.html`

### Passo 3: Explorar o DssButton

Você verá na página:

#### 🎨 Cores Semânticas
- **Primary** (Azul)
- **Secondary** (Verde/Turquesa)
- **Tertiary** (Laranja)
- **Accent** (Roxo)

#### 📣 Cores de Feedback
- **Success** (Verde)
- **Error** (Vermelho)
- **Warning** (Amarelo)
- **Info** (Azul Claro)

#### 📏 Tamanhos
- **XS** - Extra Small
- **SM** - Small
- **MD** - Medium (padrão)
- **LG** - Large
- **XL** - Extra Large

#### 🎭 Variantes Visuais
- **Filled** - Preenchido (padrão)
- **Outlined** - Apenas borda
- **Flat** - Sem borda, fundo transparente
- **Unelevated** - Sem sombra

#### 🔣 Com Ícones Material Icons
- Ícone à esquerda
- Ícone à direita
- Ícone em ambos os lados
- Apenas ícone (sem texto)

#### 🔄 Estados
- **Normal** - Estado padrão
- **Loading** - Com spinner animado
- **Disabled** - Desabilitado

#### 🎛️ Modificadores
- **Dense** - Mais compacto
- **Round** - Totalmente arredondado (círculo)
- **No-caps** - Sem uppercase automático
- **Block** - Largura total (100%)

#### 🏢 Brandabilidade (Hub, Water, Waste)
- **Hub** - Laranja (#f5911a)
- **Water** - Azul (#1381d8)
- **Waste** - Verde (#0baf50)

### Passo 4: Testar Dark Mode

No canto superior direito da página, clique no botão:

- **🌙 Dark Mode** - Ativa o tema escuro
- **☀️ Light Mode** - Volta ao tema claro

**O que observar**:
- Fundos mudam de claro para escuro
- Textos mudam de escuro para claro
- Cores dos botões se ajustam automaticamente
- Contraste sempre mantido (WCAG 2.1 AA)

### Passo 5: Testar Navegação por Teclado

1. Pressione **Tab** para navegar entre botões
2. Observe o **focus ring** azul (3px) aparecendo
3. Pressione **Enter** ou **Space** para "clicar" no botão focado

---

## 🧪 Testes de Acessibilidade

### Contraste de Cores

Abra DevTools do navegador (`F12`) e verifique:

```css
/* Light Mode */
--dss-text-body: #0a0a0a;           /* Preto quase total */
--dss-surface-default: #fafafa;     /* Branco quase total */
/* Contraste: 16:1 (AAA) ✅ */

/* Dark Mode */
--dss-text-body: #f5f5f5;           /* Branco quase total */
--dss-surface-default: #262626;     /* Cinza escuro */
/* Contraste: 12.6:1 (AAA) ✅ */
```

### Touch Targets

Inspecione qualquer botão (clique direito → Inspect):

```css
min-width: 48px;
min-height: 48px;
/* WCAG 2.1 AA requer mínimo 44×44px */
/* DSS usa 48×48px (ideal) ✅ */
```

### Focus Ring

Pressione Tab e inspecione o focus:

```css
outline: 3px solid var(--dss-action-primary);
outline-offset: 2px;
/* Contraste mínimo 4.5:1 ✅ */
```

---

## 🔧 Desenvolvimento Contínuo

### Auto-compilação de SCSS

Para recompilar automaticamente quando modificar arquivos `.scss`:

```bash
npm run dss:watch
```

Deixe este terminal rodando. Sempre que salvar um `.scss`, o CSS será atualizado!

### Modificar Estilos

**Exemplo**: Alterar cor primary

1. Abra `dss/tokens/semantic/_actions.scss`
2. Modifique:
   ```scss
   --dss-action-primary: var(--dss-primary);  /* Linha ~15 */
   ```
3. Salve o arquivo
4. Se `npm run dss:watch` estiver rodando, CSS será recompilado automaticamente
5. Recarregue a página no navegador (`F5` ou `Ctrl+R`)

### Criar Variações do DssButton

Abra `dss/test-dss-button.html` e adicione seus próprios testes:

```html
<!-- Adicionar após linha 100 -->
<section class="section">
  <h2>Meus Testes Personalizados</h2>
  <div class="button-row">
    <dss-button color="primary" size="xl" icon="rocket_launch">
      Lançar Foguete!
    </dss-button>
  </div>
</section>
```

---

## 📚 Documentação Completa

Para entender TUDO sobre o DSS:

### 1. Guia de Setup Completo
**Arquivo**: `dss/GUIA_SETUP_VSCODE.md`

Contém:
- Setup completo com Vite + HMR
- Troubleshooting detalhado
- Checklist de validação

### 2. Arquitetura do DSS
**Arquivo**: `dss/DSS_ARCHITECTURE.md`

Contém:
- Estrutura completa de diretórios (176 arquivos)
- Detalhes de cada módulo
- Estatísticas e análise técnica

### 3. Guia de Implementação
**Arquivo**: `dss/DSS_IMPLEMENTATION_GUIDE.md`

Contém:
- Como usar tokens, mixins, funções
- Exemplos práticos completos
- Integração com Quasar
- Sistema de brandabilidade

### 4. Ajustes Críticos Aplicados
**Arquivo**: `dss/AJUSTES_CRITICOS_APLICADOS.md`

Contém:
- 4 correções críticas realizadas hoje
- Dark mode, light theme, auto-detect, helpers
- Detalhes técnicos de cada correção

---

## ✅ Checklist de Validação Rápida

Após abrir `test-dss-button.html`, verifique:

- [ ] Página carrega sem erros no console (`F12` → Console)
- [ ] Todos os botões aparecem renderizados
- [ ] Ícones Material Icons aparecem
- [ ] Toggle Dark/Light Mode funciona
- [ ] Cores mudam corretamente no dark mode
- [ ] Focus ring aparece ao navegar com Tab
- [ ] Botões respondem a Enter e Space
- [ ] Estado Loading mostra spinner animado
- [ ] Estado Disabled não responde a cliques
- [ ] Brandabilidade funciona (Hub, Water, Waste)

---

## 🐛 Problemas Comuns

### "Estilos não aparecem"

**Solução**:
```bash
npm run dss:build
```

Certifique-se de que `dss/index.css` foi criado.

### "Material Icons não aparecem"

**Solução**: Verifique sua conexão com internet. Os ícones são carregados via CDN do Google Fonts.

### "Dark mode não funciona"

**Solução**: Abra DevTools (`F12`) e veja se o atributo está sendo aplicado:

```javascript
// Executar no Console
document.documentElement.getAttribute('data-theme')
// Deve retornar "dark" quando ativo
```

### "npm run dss:build dá erro"

**Solução**: Instale o compilador SASS:

```bash
npm install -g sass
```

---

## 🎯 Próximas Etapas

Após testar o DssButton, você pode:

1. **Modificar tokens**: Altere cores, espaçamentos, sombras
2. **Criar novos componentes**: Use DssButton como referência
3. **Implementar DssCard**: Próximo componente planejado
4. **Adicionar testes automatizados**: Jest/Vitest para componentes
5. **Criar Storybook**: Documentação visual interativa

---

## 📞 Suporte

Documentação disponível:

- **Teste Rápido**: `INSTRUCOES_TESTE_DSSBUTTON.md` (este arquivo)
- **Setup Completo**: `GUIA_SETUP_VSCODE.md`
- **Arquitetura**: `DSS_ARCHITECTURE.md`
- **Uso**: `DSS_IMPLEMENTATION_GUIDE.md`
- **Correções**: `AJUSTES_CRITICOS_APLICADOS.md`

---

**Status**: ✅ **Pronto para Teste**

**Última atualização**: Dezembro 2024

---

**Divirta-se testando o DssButton! 🚀**
