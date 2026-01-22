# Changelog - Design System Sansys (DSS)

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.3.0] - 2025-01-13

### ✨ Added - DssCard Component

**Componente de superfície estrutural compatível com `q-card`**

#### **Refatoração Completa Baseada em Documentação**

O DssCard foi completamente refatorado para estar **100% alinhado** com a documentação oficial (DssCard.md - Template 13.1).

#### **Props Implementadas (5 total)**
- **`variant`** (String, default: `'elevated'`): Variante visual (elevated, flat, bordered, outlined)
- **`square`** (Boolean): Remove border-radius (cantos quadrados)
- **`clickable`** (Boolean): Torna o card clicável com hover effects e navegação por teclado
- **`dark`** (Boolean): Ativa dark mode
- **`brand`** (String): Tema de marca Sansys (hub, water, waste) - adiciona border-left colorida

#### **Subcomponentes**
- **`DssCardSection`**: Organiza conteúdo interno com padding consistente
  - Prop `horizontal`: Layout horizontal (flex row)
- **`DssCardActions`**: Área de ações (botões) na base do card
  - Prop `align`: Alinhamento (left, center, right, between, around)
  - Prop `vertical`: Layout vertical (botões empilhados)

#### **Casos de Uso**
```vue
<!-- Card básico -->
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Card Title</h3>
    <p>Content here.</p>
  </DssCardSection>
</DssCard>

<!-- Card clickable com navegação por teclado -->
<DssCard variant="elevated" clickable @click="viewDetails">
  <DssCardSection>
    <h3>Clickable Card</h3>
    <p>Press Tab, Enter or Space</p>
  </DssCardSection>
</DssCard>

<!-- Card com brandabilidade -->
<DssCard variant="outlined" brand="hub">
  <DssCardSection>
    <h3>Hub Dashboard 🟠</h3>
    <p>Border-left colorida.</p>
  </DssCardSection>
</DssCard>

<!-- Card com ações -->
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Confirmation</h3>
    <p>Are you sure?</p>
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton variant="flat">Cancel</DssButton>
    <DssButton color="primary">Confirm</DssButton>
  </DssCardActions>
</DssCard>
```

#### **Mudanças Principais**

##### 1. **Acessibilidade Aprimorada (WCAG 2.1 AA)**
- ✅ Cards clickable navegáveis por teclado (Tab, Enter, Space)
- ✅ Adicionado automaticamente `tabindex="0"` e `role="article"` quando `clickable="true"`
- ✅ Handler `handleKeydown` para Enter e Space
- ✅ Focus ring visível via `--dss-focus-shadow-primary`

##### 2. **Brandabilidade Simplificada**
- ✅ Brand **APENAS** via border-left colorida (4px)
- ✅ Removido background sutil da primeira section (não documentado)
- ✅ Mais sutil e consistente com diretrizes do DSS
- ✅ Suporta `data-brand` no contexto pai para herança

##### 3. **Estados Corrigidos**
- ✅ Removido estado de loading (pertence a componentes internos)
- ✅ Cards são **superfícies estruturais** - loading/disabled/error pertencem aos componentes internos
- ✅ Adicionado `cursor: pointer` para cards clickable

##### 4. **Arquitetura em 4 Camadas**
```
DssCard/
├── 1-structure/              # Vue components
├── 2-composition/            # Base styles
├── 3-variants/               # 4 variantes (elevated, flat, bordered, outlined)
└── 4-output/                 # States (dark mode, focus, clickable) + Brands (Hub, Water, Waste)
```

##### 5. **Tokens Reutilizáveis**
- ✅ **ZERO tokens component-specific**
- ✅ Usa apenas tokens genéricos do DSS
- ✅ Categorias: Spacing, Border Radius, Borders, Colors (Surface), Elevation, Brands, Motion, Accessibility (Focus)

#### **Documentação Criada**

##### **[DssCard.md](./components/base/DssCard/DssCard.md) - Documentação Completa (Template 13.1)**
- 📋 **1.227 linhas** de documentação técnica completa
- ✅ **13 seções obrigatórias**: Visão Geral, Quando Usar/Não Usar, Anatomia, Tokens, API Pública, Estados, Variantes, Brandabilidade, Acessibilidade, Exemplos, Anti-patterns, Governança, Troubleshooting
- ✅ **7 anti-patterns** documentados (❌ incorreto vs ✅ correto)
- ✅ **9 exemplos práticos** de uso
- ✅ **Conformidade WCAG 2.1 AA** documentada

##### **[README.md](./components/base/DssCard/README.md) - Quick Start**
- Guia rápido de uso
- Referência à documentação completa
- Seção de mudanças recentes

##### **[DssCard.example.vue](./components/base/DssCard/DssCard.example.vue) - Exemplos Práticos**
- ✅ **11 seções de exemplos**
- ✅ **30+ exemplos** práticos
- ✅ Todos os casos de uso documentados implementados

#### **CSS Criado**
- **Base styles**: Layout flexbox, background, border-radius, padding (`2-composition/_base.scss`)
- **Variantes**: 4 arquivos separados (elevated, flat, bordered, outlined) em `3-variants/`
- **States**: Dark mode, focus, clickable (`4-output/_states.scss`)
- **Brands**: Hub, Water, Waste com border-left colorida (`4-output/_brands.scss`)
- **Accessibility**: High contrast, reduced motion, keyboard navigation

#### **Playground Visual**
- ✅ Integrado ao `dss-example/src/TestCard.vue`
- ✅ 11 seções de testes visuais
- ✅ Navegação: Layout > DssCard
- ✅ Estatísticas atualizadas: **4 componentes, 65 seções**

---

## [2.2.0] - 2025-12-30

### 🎉 NEW COMPONENTS - DssBadge & DssAvatar

Esta versão adiciona **2 novos componentes** essenciais para interfaces modernas, ambos com **100% de compatibilidade** com a API oficial do Quasar Framework.

### ✨ Added - DssBadge Component

**Componente de badge/notificação compatível com `q-badge`**

#### **Props Implementadas (9 total)**
- **`label`** (String | Number): Conteúdo do badge
- **`color`** (String, default: `'primary'`): Cor semântica (primary, secondary, tertiary, accent, positive, negative, warning, info)
- **`textColor`** (String): Cor do texto customizável
- **`floating`** (Boolean): Posicionamento absoluto (top-right) para notificações
- **`align`** (String): Alinhamento vertical (top, middle, bottom)
- **`transparent`** (Boolean): Fundo transparente
- **`outline`** (Boolean): Variante com borda (sem preenchimento)
- **`rounded`** (Boolean): Bordas mais arredondadas
- **`multiLine`** (Boolean): Suporte a texto em múltiplas linhas

#### **Casos de Uso**
```vue
<!-- Badge de notificação floating -->
<DssButton icon="mail">
  Email
  <DssBadge floating color="negative" label="5" />
</DssButton>

<!-- Badge inline -->
<DssBadge color="positive" label="Online" rounded />

<!-- Badge dot indicator (vazio) -->
<DssBadge color="negative" />
```

#### **CSS Criado**
- Base styles: Layout, tipografia, spacing (`_base.scss`)
- Color variants: 8 cores semânticas completas (`_colors.scss`)
- Modifiers: floating, outline, transparent, rounded, multi-line
- Accessibility: High contrast, reduced motion, ARIA support

---

### ✨ Added - DssAvatar Component

**Componente de avatar compatível com `q-avatar`**

#### **Props Implementadas (7 total)**
- **`size`** (String): Tamanho customizado (aceita qualquer unidade CSS)
- **`fontSize`** (String): Tamanho da fonte do conteúdo
- **`color`** (String): Cor de fundo semântica
- **`textColor`** (String): Cor do texto/ícone
- **`icon`** (String): Material Icon name
- **`square`** (Boolean): Avatar quadrado (sem border-radius)
- **`rounded`** (Boolean): Bordas arredondadas (não circular)

#### **Casos de Uso**
```vue
<!-- Avatar com iniciais -->
<DssAvatar color="primary">JD</DssAvatar>

<!-- Avatar com ícone -->
<DssAvatar icon="person" color="secondary" />

<!-- Avatar com tamanho customizado -->
<DssAvatar size="64px" color="accent">AB</DssAvatar>

<!-- Avatar quadrado (empresas/logos) -->
<DssAvatar square icon="business" color="positive" />

<!-- Avatar com badge (status) -->
<DssAvatar color="primary">
  JD
  <DssBadge floating color="positive" />
</DssAvatar>
```

#### **CSS Criado**
- Base styles: Circular por padrão, flexbox centering (`_base.scss`)
- Color variants: 8 cores semânticas + neutral/dark/light (`_colors.scss`)
- Size variants: xs (32px), sm (40px), md (48px), lg (64px), xl (80px)
- Shape variants: square, rounded
- Extras: Avatar groups com overlap, status indicators

---

### 🎨 CSS Architecture

#### **DssBadge Files Created**
```
/components/base/DssBadge/
├── 1-structure/DssBadge.vue
├── 2-composition/_base.scss
├── 3-variants/_colors.scss
├── 4-output/DssBadge.scss
├── DssBadge.module.scss
├── index.js
└── DSSBADGE_API.md
```

#### **DssAvatar Files Created**
```
/components/base/DssAvatar/
├── 1-structure/DssAvatar.vue
├── 2-composition/_base.scss
├── 3-variants/_colors.scss
├── 4-output/DssAvatar.scss
├── DssAvatar.module.scss
├── index.js
└── DSSAVATAR_API.md
```

---

### 📚 Documentation

- **DSSBADGE_API.md**: Documentação completa com exemplos de uso
- **DSSAVATAR_API.md**: Documentação completa com exemplos de uso
- Ambos seguem o padrão da documentação do DssButton

---

### 🔧 Changed - Plugin Registration

Componentes registrados globalmente no plugin Vue:
```javascript
app.component('DssBadge', DssBadge)
app.component('DssAvatar', DssAvatar)
```

Exportações individuais disponíveis:
```javascript
import { DssBadge, DssAvatar } from '@sansys/design-system'
```

---

### 📊 Changed - App.vue Examples

Adicionadas **9 novas seções** de exemplos:
1. DssBadge - Cores (8 cores semânticas)
2. DssBadge - Variantes (normal, outline, transparent, rounded, dot, multi-line)
3. DssBadge + DssButton - Notificações floating
4. DssAvatar - Cores e Iniciais
5. DssAvatar - Tamanhos (xs, sm, md, lg, xl)
6. DssAvatar - Ícones (Material Icons)
7. DssAvatar - Formas (circular, square, rounded)
8. DssAvatar + DssBadge - Indicadores de status
9. DssAvatar - Grupo com sobreposição

---

### ✅ Compatibility

**100% compatível com Quasar Framework v2.x**

DssBadge Props:
- ✅ Todas as 9 props principais do `q-badge`
- ✅ Floating positioning
- ✅ Color variants
- ✅ Outline/transparent/rounded modifiers

DssAvatar Props:
- ✅ Todas as 7 props principais do `q-avatar`
- ✅ Size customization
- ✅ Material Icons support
- ✅ Shape variants (square, rounded)

Props exclusivas do DSS:
- 🟠 `color="tertiary"` (ambos componentes)

---

### 🎯 Integration Examples

#### **Badge + Button (Notifications)**
```vue
<DssButton icon="notifications">
  Notificações
  <DssBadge floating color="negative" label="12" />
</DssButton>
```

#### **Avatar + Badge (Status)**
```vue
<DssAvatar color="primary">
  JD
  <DssBadge floating color="positive" />
</DssAvatar>
```

#### **Avatar Group**
```vue
<div class="dss-avatar-group">
  <DssAvatar color="primary">JD</DssAvatar>
  <DssAvatar color="secondary">AB</DssAvatar>
  <DssAvatar color="accent">+5</DssAvatar>
</div>
```

---

### 📦 Package Updates

- **Version**: 2.0.0 → 2.2.0
- **Components**: 5 → 7 (DssBadge, DssAvatar adicionados)
- **Metadata updated** in index.js

---

## [2.1.0] - 2025-12-30

### 🎉 MAJOR UPDATE - 100% Compatibilidade com Quasar Framework

Esta versão traz **10 novas props** ao DssButton, alcançando **100% de compatibilidade** com a API oficial do `q-btn` do Quasar Framework.

### ✨ Added - Props de Loading Avançado

- **`percentage`** (Number, 0-100): Exibe barra de progresso determinística durante loading
- **`dark-percentage`** (Boolean): Aplica estilo escuro à barra de progresso
- Spinner tradicional quando `loading=true` e `percentage=null`
- Barra de progresso quando `loading=true` e `percentage` definido

**Exemplo:**
```vue
<DssButton :loading="true" :percentage="65">
  65% Completo
</DssButton>
```

### ✨ Added - Props de Interação

- **`ripple`** (Boolean | Object, default: `true`): Efeito ripple Material Design
  - Animação CSS pura (sem JavaScript)
  - Pode ser desabilitado com `:ripple="false"`
- **`tabindex`** (Number | String): Controle de navegação por teclado
  - Automaticamente `-1` quando disabled ou loading
  - Suporta valores customizados para ordem de foco

**Exemplo:**
```vue
<DssButton :ripple="false" :tabindex="1">
  Primeiro no Tab
</DssButton>
```

### ✨ Added - Props de Layout

- **`align`** (String, default: `'center'`): Alinhamento horizontal do conteúdo
  - Valores: `left`, `center`, `right`, `between`, `around`, `evenly`
  - Usa `justify-content` do flexbox

- **`stack`** (Boolean): Layout vertical (ícone acima do label)
  - Muda `flex-direction` para `column`
  - Ajusta margens dos ícones automaticamente

- **`stretch`** (Boolean): Expande para preencher largura disponível
  - Define `width: 100%`
  - Útil para botões full-width em containers

- **`no-wrap`** (Boolean): Previne quebra de texto
  - Aplica `white-space: nowrap`
  - Adiciona `text-overflow: ellipsis` no label

- **`padding`** (String): Padding CSS customizável
  - Aceita qualquer valor CSS válido
  - Sobrescreve padding padrão do DSS

**Exemplos:**
```vue
<!-- Alinhamento -->
<DssButton align="between" icon="save" icon-right="cloud" label="Salvar" />

<!-- Stack -->
<DssButton stack icon="cloud_upload" label="Upload" />

<!-- Stretch -->
<DssButton stretch>Botão Full-Width</DssButton>

<!-- Custom padding -->
<DssButton padding="20px 40px">Padding Grande</DssButton>
```

### 🎨 Added - CSS Classes

Novas classes CSS geradas automaticamente:
- `.dss-button--align-{left|right|between|around|evenly}`
- `.dss-button--stack`
- `.dss-button--stretch`
- `.dss-button--no-wrap`
- `.dss-button__progress` e `.dss-button__progress-indicator`
- `.dss-button__progress--dark`
- `.dss-button__ripple`
- Animação `@keyframes dss-ripple`

### 🔧 Changed - Template Vue

- Adicionado `:style="buttonStyle"` para padding customizável
- Adicionado `:tabindex="computedTabindex"` para acessibilidade
- Barra de progresso renderizada condicionalmente (`percentage !== null`)
- Spinner tradicional apenas quando `percentage === null`
- Container ripple adicionado ao final do template

### 📊 Changed - Computed Properties

Novos computed properties no DssButton.vue:
- **`buttonStyle()`**: Processa padding customizável
- **`percentageStyle()`**: Calcula transform da barra de progresso
- **`computedTabindex()`**: Retorna tabindex apropriado

### 📚 Documentation

- **DSSBUTTON_API.md**: Documentação completa de todas as props
  - Exemplos de uso para cada prop
  - Comparação com Quasar Framework
  - Casos de uso práticos
- **CHANGELOG.md**: Este arquivo

### ✅ Compatibility

**100% compatível com Quasar Framework v2.x**

Props do Quasar implementadas:
- ✅ Todas as 30+ props principais do `q-btn`
- ✅ Loading com percentage (deterministic progress)
- ✅ Ripple effect
- ✅ Tabindex accessibility
- ✅ Layout modifiers (align, stack, stretch, no-wrap, padding)

Props exclusivas do DSS:
- 🟠 `brand` (hub, water, waste)
- 🟠 `variant="glossy"`
- 🟠 `color="tertiary"`

### 🐛 Bug Fixes

- Fixed: CSS Modules removido (estava causando conflito)
- Fixed: Icon-right agora renderiza corretamente
- Fixed: Ordem natural do DOM (sem flexbox order)
- Fixed: Tertiary color implementada

---

## [2.0.9] - 2025-12-30

### ✨ Added
- **Cor Tertiária**: Adicionada cor `tertiary` (#ff6607) ao DssButton
  - Token `--dss-tertiary` e `--dss-tertiary-hover`
  - Validador de props atualizado
  - CSS `.dss-button--tertiary` criado

---

## [2.0.8] - 2025-12-30

### 🐛 Bug Fixes
- **Icon-Right**: Corrigida renderização de ícones à direita
  - Removido CSS Modules do DssButton.vue
  - Implementada ordem natural do DOM (como Quasar)
  - Flexbox gap para espaçamento automático

---

## [2.0.7] - 2025-12-30

### 🔧 Changed
- Alinhamento com padrão Quasar para ícones
- Ordem natural do template (sem `flexbox order`)

---

## [2.0.6] - 2025-12-30

### ✨ Added
- **Material Icons**: Suporte completo a ícones
  - Props `icon` e `icon-right` (API Quasar)
  - Font Material Icons carregada via CDN
  - CSS para renderização de ícones

---

## [2.0.5] - 2025-12-30

### 🐛 Bug Fixes
- Material Icons CSS aplicado corretamente

---

## [2.0.4] - 2025-12-30

### 🐛 Bug Fixes - CRÍTICO
- **Cores Semânticas**: Corrigida arquitetura de cores
  - POSITIVE: `--dss-positive` (antes: waste-600)
  - NEGATIVE: `--dss-negative` (antes: #dc2626 hardcoded)
  - WARNING: `--dss-warning` (antes: tertiary)
  - INFO: `--dss-info` (antes: water-500)

---

## [2.0.3] - 2025-12-29

### ✨ Added
- **Gradientes**: Tokens de gradiente implementados
  - `--dss-gradient-glossy`
  - `--dss-gradient-glossy-active`
  - Variant glossy refatorada para usar tokens

---

## [2.0.2] - 2025-12-29

### 🔧 Changed - Sistema de Tokens Quasar-Compatible
- **Sizing Tokens**: Refatorados para escala xs/sm/md/lg/xl
  - Touch targets: 32px / 36px / 44px / 52px / 64px
  - Input heights: mesma escala
  - Icon sizes: 16px / 20px / 24px / 32px / 48px
- **Philosophy**: "WCAG compliance via defaults, not nomenclature"
  - `md` = 44px (WCAG 2.1 AA mínimo)
  - Escala completa para flexibilidade

---

## [2.0.1] - 2025-12-29

### 🐛 Bug Fixes
- CSS compilado corretamente sem CSS Modules

---

## [2.0.0] - 2025-12-29

### 🎉 Initial Release
- **DssButton**: Componente completo
  - 6 variantes visuais
  - 7 cores semânticas
  - 5 tamanhos
  - Estados loading/disabled
  - Brandabilidade (hub/water/waste)
- **DssCard**: Componente de card
- **DssInput**: Componente de input
- **Sistema de Tokens**: Completo e profissional
- **Acessibilidade**: WCAG 2.1 AA

---

## Links

- [Repositório](https://github.com/sansys/design-system)
- [Documentação Quasar](https://quasar.dev)
- [NPM Package](https://www.npmjs.com/package/@sansys/design-system)
