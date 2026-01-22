# DssButton

**Design System Sansys - Componente de Botão Universal**

> 🏆 **Golden Sample de Documentação DSS**
> Este documento serve como modelo oficial (Template 13.1) para documentar todos os componentes do Design System Sansys.
> Estrutura obrigatória: 13 seções padronizadas com tokens rastreáveis, anti-patterns e governança.

---

## 1. Visão Geral

### Nome do Componente
`DssButton`

### Descrição
Componente de botão completo com suporte a acessibilidade WCAG 2.1 AA, brandabilidade multi-marca (Hub/Water/Waste), e compatibilidade 100% com a API do Quasar Framework (`q-btn`).

### Tipo do Componente
**Básico** - Wrapper direto do Quasar Framework com extensões DSS (brandabilidade).

### Características Principais

- ✅ **Acessibilidade WCAG 2.1 AA completa** - Touch targets, focus rings, navegação por teclado, ARIA, high contrast e reduced motion
- ✅ **Brandabilidade multi-marca** - Suporte automático a Hub, Water, Waste com 8 cores semânticas e 4 de feedback
- ✅ **6 variantes visuais** - Elevated, flat, outline, unelevated, push, glossy com estados de hover documentados
- ✅ **Estados interativos robustos** - Loading com progresso determinístico, disabled, hover, active, focus
- ✅ **31 tokens rastreáveis** - Tokens de cor, acessibilidade, espaçamento e forma com flags de proteção
- ✅ **API 100% compatível com Quasar** - Todas as props do `q-btn` + extensões DSS de brandabilidade

---

## 2. Quando Usar / Quando Não Usar

### ✅ Quando Usar

- **Ações primárias**: Salvar, Enviar, Confirmar, Criar
- **Ações secundárias**: Cancelar, Voltar, Fechar
- **Navegação**: Links importantes que precisam destaque visual
- **Ações destrutivas**: Deletar, Remover (usar `color="negative"`)
- **Call-to-Actions (CTAs)**: Botões de destaque em landing pages
- **Formulários**: Submit, Reset
- **Upload/Download**: Com estados de loading e progresso

### ❌ Quando Não Usar

- **Links de navegação simples**: Use `<router-link>` ou `<a>` nativo
- **Textos clicáveis em parágrafos**: Use links de texto padrão
- **Menus de navegação**: Use `DssMenu` ou `DssTabs`
- **Ações inline em tabelas**: Considere `DssIconButton` para economizar espaço
- **Mais de 3 botões juntos**: Considere `DssButtonGroup` ou redesenhe a interface
- **Ações que não fazem nada**: Não crie botões decorativos sem função

---

## 3. Anatomia do Componente

### Estrutura Visual

```
┌─────────────────────────────────────────┐
│  [ícone]  Label do Botão  [ícone-dir]  │
└─────────────────────────────────────────┘
```

### Partes Internas

1. **Container (`.dss-button`)**: Elemento raiz `<button>` ou `<a>`
2. **Icon Left (`.dss-button__icon`)**: Ícone à esquerda (opcional)
3. **Label (`.dss-button__label`)**: Texto principal
4. **Icon Right (`.dss-button__icon-right`)**: Ícone à direita (opcional)
5. **Loading Spinner**: Indicador de carregamento
6. **Progress Bar**: Barra de progresso (quando `percentage` está ativo)
7. **Ripple Effect**: Efeito Material Design no clique

### Slots Disponíveis

| Slot | Descrição | Uso |
|------|-----------|-----|
| `default` | Conteúdo principal do botão | Label com formatação customizada |
| `icon` | Ícone customizado à esquerda | SVG, Font Awesome, outros |
| `icon-right` | Ícone customizado à direita | SVG, Font Awesome, outros |

### Subcomponentes DSS Utilizados

**Nenhum** - DssButton é um componente atômico que não depende de outros componentes DSS.

**Dependências externas:**
- Quasar Framework `q-btn` (internamente)
- Material Icons (recomendado, mas opcional)

---

## 4. Tokens Utilizados

O **DssButton** consome tokens de **múltiplas categorias** do Design System Sansys. Para garantir manutenibilidade e evitar duplicação de documentação, consulte o catálogo completo de tokens:

### 📚 Referência Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../DSS_TOKEN_REFERENCE.md)

### 🎨 Categorias de Tokens Consumidas

O DssButton utiliza tokens das seguintes categorias:

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no DssButton |
|-----------|---------------|----------------|------------------------|
| **Cores** | `--dss-primary`, `--dss-secondary`, `--dss-tertiary`, `--dss-accent`, `--dss-positive`, `--dss-negative`, `--dss-warning`, `--dss-info` + variações (`-hover`, `-deep`, `-light`, `-disable`) | [Seção 2.3 - Cores Semânticas](../../../DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Backgrounds, bordas e textos conforme variant e color prop |
| **Brands** | `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` (50-950) | [Seção 2.2 - Brand Palettes](../../../DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Aplicado automaticamente via prop `brand` ou `data-brand` |
| **Espaçamento (Padding/Gap)** | `--dss-spacing-1` a `--dss-spacing-24` | [Seção 1.1 - Escala Base](../../../DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno (xs=1+2, sm=1.5+3, md=2+4, lg=3+5, xl=4+6), gap entre label/ícone (spacing-2), min-width por size |
| **Touch Targets (Sizing)** | `--dss-touch-target-xs` (32px), `--dss-touch-target-sm` (36px), `--dss-touch-target-md` (44px), `--dss-touch-target-lg` (52px), `--dss-touch-target-xl` (64px) | [Seção 7.2 - Touch Targets](../../../DSS_TOKEN_REFERENCE.md#72-touch-targets) | Min-height do botão por size (xs=32px, sm=36px, md=44px ✅ WCAG, lg=52px, xl=64px) |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-weight-medium`, `--dss-line-height-tight`, `--dss-font-size-xs` a `--dss-font-size-xl` | [Seção 6 - Tipografia](../../../DSS_TOKEN_REFERENCE.md#6-tipografia) | Texto do label (size dependente: xs=12px, sm=14px, md=16px, lg=18px, xl=20px) e ícones |
| **Bordas** | `--dss-radius-sm`, `--dss-radius-full`, `--dss-border-width-md` | [Seção 8 - Bordas](../../../DSS_TOKEN_REFERENCE.md#8-bordas) | Border radius (padrão=sm, round=full, square=0), outline variant e focus ring |
| **Sombras** | `--dss-elevation-1`, `--dss-elevation-2`, `--dss-shadow-md` | [Seção 9 - Shadows](../../../DSS_TOKEN_REFERENCE.md#9-shadows-e-elevação) | Variant `push` e `elevated` |
| **Acessibilidade (Focus)** | `--dss-focus-ring`, `--dss-border-width-md`, outline offset via `--dss-spacing-1` | [Seção 7.1 - Focus](../../../DSS_TOKEN_REFERENCE.md#71-focus-configurações-base) | Focus ring (WCAG 2.4.7) aplicado em `:focus-visible` |
| **Motion** | `--dss-duration-slowest`, `--dss-easing-ease-out` | [Seção 5 - Motion/Animation](../../../DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transições de hover, active, loading e ripple effect |
| **Opacidade** | `--dss-opacity-disabled` (0.4), `--dss-opacity-60` (0.6), `--dss-opacity-30` (0.3), `--dss-opacity-active` (0.2), `--dss-opacity-selected` (0.15) | [Seção 2.4 - Opacidade](../../../DSS_TOKEN_REFERENCE.md#24-opacidade) | disabled=0.4, spinner/progress-dark=0.6, progress=0.3, ripple=0.2/0.15 |

### ⚠️ Observações Importantes

- 🔒 **Tokens Protegidos**: Tokens de acessibilidade (`--dss-focus-*`, `--dss-touch-target-*`) **NÃO devem** ser sobrescritos fora do DSS
- 🎨 **Brandabilidade**: Quando `brand` ou `data-brand` é aplicado, tokens de marca substituem automaticamente tokens semânticos
- 📏 **Responsividade**: Tokens de espaçamento são gerenciados pela prop `size` - customização manual via prop `padding`
- 🔄 **Fallback**: Na ausência de `brand`, o sistema usa tokens semânticos padrão (`--dss-primary`, `--dss-secondary`, etc.)
- 📝 **Documentação Atualizada**: Sempre consulte [`DSS_TOKEN_REFERENCE.md`](../../../DSS_TOKEN_REFERENCE.md) para valores e especificações completas

### 🔗 Links Rápidos

- [Token Guidelines (Filosofia e Uso)](../../../DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catálogo Completo)](../../../DSS_TOKEN_REFERENCE.md)
- [Tokens Deprecados (DE/PARA)](../../../DSS_TOKEN_GUIDELINES.md#tokens-deprecados)

---

## 5. API Pública

### Props Principais

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `label` | String | `''` | - | Texto do botão |
| `icon` | String | `''` | Material Icons | Ícone à esquerda |
| `icon-right` | String | `''` | Material Icons | Ícone à direita |
| `variant` | String | `'elevated'` | `elevated`, `flat`, `outline`, `unelevated`, `push`, `glossy` | Variante visual |
| `color` | String | `'primary'` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor do botão |
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg`, `xl` | Tamanho do botão |

### Props de Forma

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `round` | Boolean | `false` | Bordas completamente arredondadas |
| `square` | Boolean | `false` | Bordas quadradas (sem border-radius) |

### Props de Estado

| Prop | Type | Default | Validação | Descrição |
|------|------|---------|-----------|-----------|
| `loading` | Boolean | `false` | - | Exibe spinner de carregamento |
| `disabled` | Boolean | `false` | - | Desabilita o botão |
| `percentage` | Number | `null` | 0-100 | Barra de progresso (0-100) quando loading=true |
| `dark-percentage` | Boolean | `false` | - | Estilo escuro para barra de progresso |

### Props de Interação

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `ripple` | Boolean \| Object | `true` | Efeito ripple Material Design |
| `tabindex` | Number \| String | `null` | Ordem de navegação por teclado |

### Props de Layout

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `align` | String | `'center'` | `left`, `center`, `right`, `between`, `around`, `evenly` | Alinhamento horizontal |
| `stack` | Boolean | `false` | - | Layout vertical (ícone acima do texto) |
| `stretch` | Boolean | `false` | - | Expande para largura total |
| `no-wrap` | Boolean | `false` | - | Previne quebra de texto |
| `padding` | String | `null` | CSS padding | Padding customizável |

### Props de Comportamento

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `type` | String | `'button'` | `button`, `submit`, `reset` | Tipo HTML do button |
| `dense` | Boolean | `false` | - | Padding reduzido (versão compacta) |
| `no-caps` | Boolean | `false` | - | Desabilita transformação uppercase |

### Props de Navegação (Vue Router)

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `to` | String \| Object | `null` | Rota para navegação (converte em router-link) |
| `replace` | Boolean | `false` | Usa router.replace ao invés de router.push |

### Props de Brandabilidade (Exclusivo DSS)

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Acessibilidade

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `aria-label` | String | - | Label ARIA (obrigatório para botões icon-only) |

### Eventos

| Event | Payload | Quando Emitido | Descrição |
|-------|---------|----------------|-----------|
| `@click` | `MouseEvent` | Ao clicar no botão | Não emite se `disabled` ou `loading` |

### Slots

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteúdo principal do botão | Label com formatação HTML customizada |
| `icon` | Ícone customizado à esquerda | SVG, Font Awesome, Ionicons |
| `icon-right` | Ícone customizado à direita | SVG, Font Awesome, Ionicons |

---

## 6. Estados

### Tabela Única de Estados

| Estado | Aparência | Interação | Tokens Aplicados | Notas |
|--------|-----------|-----------|------------------|-------|
| **Default** | Background cor base, texto branco/contrastante, borda (outline) | Hover habilitado, clique habilitado | `--dss-primary`, `--dss-radius-sm` | Estado padrão |
| **Hover** | Background escurece (`-hover`) ou clareia (`-light`), cursor pointer | Clique habilitado | `--dss-primary-hover` (elevated), `--dss-primary-light` (flat/outline) | Transição suave 150ms |
| **Focus** | Focus ring visível (3px, offset 2px) | Navegação por teclado ativa | `--dss-focus-primary`, `--dss-focus-ring-width` | WCAG 2.4.7 AA |
| **Active** | Background ainda mais escuro, botão "afunda" | Clique em progresso | `--dss-primary-deep` | Feedback tátil |
| **Disabled** | Opacidade 0.5, cursor not-allowed | Hover desabilitado, clique bloqueado | `--dss-opacity-disabled` | `aria-disabled="true"` |
| **Loading** | Spinner animado, opacidade reduzida, cursor wait | Hover desabilitado, clique bloqueado | - | Click event não emitido |
| **Loading + Percentage** | Barra de progresso na base do botão | Hover desabilitado, clique bloqueado | - | Progresso de 0-100% |

### Diagramas de Transição

```
Default ──hover──> Hover ──click──> Active ──release──> Hover ──leave──> Default
   │
   └──:disabled="true"──> Disabled (sem transição de volta automática)
   │
   └──:loading="true"──> Loading (sem transição de volta automática)
```

---

## 7. Variantes

### Elevated (Padrão)

**Descrição:** Botão preenchido com elevação (box-shadow).

**Características Técnicas:**
- Background: Cor base (`--dss-primary`)
- Hover: Cor escurecida (`--dss-primary-hover`)
- Elevação: `box-shadow` sutil
- Uso: Ações primárias de destaque

**Exemplo:**
```vue
<DssButton variant="elevated" color="primary">
  Elevated Button
</DssButton>
```

---

### Flat

**Descrição:** Botão plano com **background transparente**. Ideal para ações secundárias.

**Características Técnicas:**
- Base: `background-color: transparent`
- Texto: Cor principal (`--dss-primary`)
- Hover: `background-color: --dss-primary-light` + `color: --dss-primary-hover`
- Compatível com dark mode (background sempre transparente)

**Exemplo:**
```vue
<DssButton variant="flat" color="primary">
  Flat Button
</DssButton>
```

---

### Outline

**Descrição:** Botão com borda e **background transparente**.

**Características Técnicas:**
- Base: `background-color: transparent` + borda colorida
- Texto: Cor principal (`--dss-primary`)
- Hover: `background-color: --dss-primary-light` + `color: --dss-primary-hover`
- Borda: `1px solid` cor principal
- Compatível com dark mode

**Exemplo:**
```vue
<DssButton variant="outline" color="primary">
  Outline Button
</DssButton>
```

---

### Unelevated

**Descrição:** Botão preenchido sem elevação (sem box-shadow).

**Características Técnicas:**
- Background: Cor base (`--dss-primary`)
- Hover: Cor escurecida (`--dss-primary-hover`)
- Sem elevação (`box-shadow: none`)
- Uso: Ações primárias em interfaces flat

**Exemplo:**
```vue
<DssButton variant="unelevated" color="primary">
  Unelevated Button
</DssButton>
```

---

### Push

**Descrição:** Botão com efeito 3D pressionável.

**Características Técnicas:**
- Efeito 3D com sombra inferior
- Animação de "pressionar" no clique
- Background: Cor base
- Uso: Botões lúdicos, gamificação

**Exemplo:**
```vue
<DssButton variant="push" color="primary">
  Push Button
</DssButton>
```

---

### Glossy

**Descrição:** Botão com efeito brilhante/glossy.

**Características Técnicas:**
- Gradiente sutil no background
- Efeito de brilho (`linear-gradient` overlay)
- Uso: CTAs de destaque, premium features

**Exemplo:**
```vue
<DssButton variant="glossy" color="primary">
  Glossy Button
</DssButton>
```

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssButton suporta **duas formas** de aplicar brandabilidade:

#### Método 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop.

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssButton brand="hub" color="primary">Botão Hub 🟠</DssButton>

  <!-- Water (Azul) -->
  <DssButton brand="water" color="primary">Botão Water 🔵</DssButton>

  <!-- Waste (Verde) -->
  <DssButton brand="waste" color="primary">Botão Waste 🟢</DssButton>
</template>
```

**Quando usar:**
- ✅ Botões individuais com brand específica
- ✅ Controle granular por componente
- ✅ Não depende de contexto DOM

#### Método 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os botões filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssButton color="primary">Botão Hub</DssButton>
    <DssButton color="secondary">Outro Hub</DssButton>
  </div>

  <!-- Todos os botões filhos herdam brand Water -->
  <div data-brand="water">
    <DssButton color="primary">Botão Water</DssButton>
  </div>
</template>
```

**Quando usar:**
- ✅ Seções inteiras da aplicação com mesma brand
- ✅ Layouts multi-brand (Hub na sidebar, Water no conteúdo)
- ✅ Menos código repetitivo

**⚠️ Prioridade:** Se ambos estiverem presentes, a prop `brand` tem prioridade sobre `data-brand`.

### Sistema de Hover - Flat e Outline

Os botões `flat` e `outline` seguem um **padrão consistente** de hover entre cores semânticas e brands:

#### Padrão de Hover

| Tipo | Base State | Hover State |
|------|-----------|-------------|
| **Flat (Semantic)** | `transparent` bg + `color` text | `color-light` bg + `color-hover` text |
| **Outline (Semantic)** | `transparent` bg + `color` text + borda | `color-light` bg + `color-hover` text |
| **Flat (Brand Hub)** | `transparent` bg + `hub-600` text | `hub-100` bg + `hub-800` text |
| **Outline (Brand Hub)** | `transparent` bg + `hub-600` text + borda | `hub-100` bg + `hub-800` text |
| **Flat (Brand Water)** | `transparent` bg + `water-500` text | `water-100` bg + `water-800` text |
| **Outline (Brand Water)** | `transparent` bg + `water-500` text + borda | `water-100` bg + `water-800` text |
| **Flat (Brand Waste)** | `transparent` bg + `waste-600` text | `waste-100` bg + `waste-800` text |
| **Outline (Brand Waste)** | `transparent` bg + `waste-600` text + borda | `waste-100` bg + `waste-800` text |

**Características:**
- ✅ Background sempre transparente no base state (dark mode ready)
- ✅ Hover adiciona background claro (`-100`) + texto escuro (`-800`)
- ✅ Melhor contraste no hover (WCAG 2.1 AA)
- ✅ Padrão consistente entre semânticos e brands

### Variantes Elevated e Unelevated (Brands)

Botões `elevated` e `unelevated` com brands mantêm hover tradicional:

| Brand | Base | Hover |
|-------|------|-------|
| **Hub** | `hub-600` | `hub-700` |
| **Water** | `water-500` | `water-600` |
| **Waste** | `waste-600` | `waste-800` |

```vue
<template>
  <!-- Hub: hover escurece para 700 -->
  <DssButton brand="hub" variant="elevated">Hub Elevated</DssButton>

  <!-- Water: hover escurece para 600 -->
  <DssButton brand="water" variant="unelevated">Water Unelevated</DssButton>

  <!-- Waste: hover escurece para 800 -->
  <DssButton brand="waste" variant="elevated">Waste Elevated</DssButton>
</template>
```

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

#### ✅ Critérios Atendidos

| Critério WCAG | Nível | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Mínimo)** | AA | Todas as combinações de cores têm contraste ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Totalmente navegável por teclado (Tab, Enter, Space) |
| **2.4.7 Foco Visível** | AA | Focus rings com 3px e contraste 4.5:1 |
| **2.5.5 Tamanho do Alvo** | AAA | Touch targets ≥ 48×48px (ideal) |
| **3.2.4 Identificação Consistente** | AA | Padrões visuais consistentes em todo o sistema |
| **4.1.2 Nome, Função, Valor** | A | ARIA labels e estados corretos (`aria-label`, `aria-disabled`) |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| **Tab** | Move o foco para o próximo botão |
| **Shift + Tab** | Move o foco para o botão anterior |
| **Enter** | Ativa o botão (equivalente a clique) |
| **Space** | Ativa o botão (equivalente a clique) |

### ARIA Labels Obrigatórios

**⚠️ CRÍTICO:** Botões com ícone apenas **DEVEM** ter `aria-label`:

```vue
<!-- ✅ CORRETO -->
<DssButton icon="delete" color="negative" aria-label="Deletar item" />

<!-- ❌ INCORRETO - Leitores de tela não saberão o que o botão faz -->
<DssButton icon="delete" color="negative" />
```

### Estados ARIA

O componente aplica automaticamente:

```html
<!-- Disabled -->
<button aria-disabled="true" disabled>...</button>

<!-- Loading -->
<button aria-busy="true">...</button>

<!-- Ícones decorativos -->
<span aria-hidden="true">icon</span>
```

### 🧪 Testado Com

- ✅ **NVDA** (Windows) - Leitor de tela
- ✅ **JAWS** (Windows) - Leitor de tela
- ✅ **VoiceOver** (macOS/iOS) - Leitor de tela
- ✅ **TalkBack** (Android) - Leitor de tela
- ✅ **Navegação por teclado** (Tab, Enter, Space)
- ✅ **High contrast mode** (Windows)
- ✅ **Zoom 200%/300%** (sem quebra de layout)
- ✅ **prefers-reduced-motion** (desabilita animações)

---

## 10. Exemplos de Uso

### Instalação

```javascript
import { DssButton } from '@/dss/components'
```

> **Nota:** O caminho de importação pode variar dependendo do produto (Hub, Water, Waste) e da estrutura do projeto. Consulte a documentação específica do seu produto para o caminho correto.

### Uso Básico

```vue
<template>
  <DssButton @click="handleClick">
    Clique aqui
  </DssButton>
</template>
```

### Com Props

```vue
<template>
  <DssButton
    color="primary"
    size="md"
    variant="elevated"
    @click="handleClick"
  >
    Botão Primary
  </DssButton>
</template>
```

### Cores Disponíveis

#### Semânticas
```vue
<template>
  <DssButton color="primary">Primary</DssButton>
  <DssButton color="secondary">Secondary</DssButton>
  <DssButton color="tertiary">Tertiary</DssButton>
  <DssButton color="accent">Accent</DssButton>
</template>
```

#### Feedback
```vue
<template>
  <DssButton color="positive">Success</DssButton>
  <DssButton color="negative">Error</DssButton>
  <DssButton color="warning">Warning</DssButton>
  <DssButton color="info">Info</DssButton>
</template>
```

### Tamanhos

```vue
<template>
  <DssButton size="xs">Extra Small</DssButton>
  <DssButton size="sm">Small</DssButton>
  <DssButton size="md">Medium (padrão)</DssButton>
  <DssButton size="lg">Large</DssButton>
  <DssButton size="xl">Extra Large</DssButton>
</template>
```

### Ícones

#### Material Icons (Recomendado)

Incluir no projeto:
```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

```vue
<template>
  <!-- Ícone à esquerda -->
  <DssButton icon="add" color="primary">Adicionar</DssButton>

  <!-- Ícone à direita -->
  <DssButton icon-right="arrow_forward" color="primary">Continuar</DssButton>

  <!-- Ambos os lados -->
  <DssButton icon="arrow_back" icon-right="arrow_forward" color="primary">
    Navegação
  </DssButton>

  <!-- Ícone apenas (REQUER aria-label) -->
  <DssButton icon="delete" color="negative" aria-label="Deletar item" />
</template>
```

**Ícones disponíveis:** https://fonts.google.com/icons

#### Ícones Customizados via Slots

```vue
<template>
  <DssButton color="primary">
    <template #icon>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
      </svg>
    </template>
    Protegido
  </DssButton>
</template>
```

### Estados Loading

#### Loading Simples
```vue
<template>
  <DssButton
    :loading="isLoading"
    color="primary"
    @click="handleSubmit"
  >
    Salvar
  </DssButton>
</template>

<script>
export default {
  data() {
    return { isLoading: false }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      try {
        await api.save()
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
```

#### Loading com Progresso

```vue
<template>
  <DssButton
    :loading="isUploading"
    :percentage="uploadProgress"
    @click="startUpload"
  >
    {{ isUploading ? `${uploadProgress}% Completo` : 'Iniciar Upload' }}
  </DssButton>
</template>

<script>
export default {
  data() {
    return {
      isUploading: false,
      uploadProgress: 0
    }
  },
  methods: {
    startUpload() {
      this.isUploading = true
      this.uploadProgress = 0

      const interval = setInterval(() => {
        this.uploadProgress += 10
        if (this.uploadProgress >= 100) {
          clearInterval(interval)
          this.isUploading = false
        }
      }, 500)
    }
  }
}
</script>
```

### Layout Avançado

```vue
<template>
  <!-- Alinhamento -->
  <DssButton align="left" icon="menu" label="Menu" />
  <DssButton align="between" icon="save" icon-right="cloud" label="Salvar na Nuvem" />

  <!-- Stack - Layout vertical -->
  <DssButton stack icon="cloud_upload" label="Upload" />

  <!-- Stretch - Botão full-width -->
  <DssButton stretch>Botão Expandido</DssButton>

  <!-- Padding customizado -->
  <DssButton padding="24px 48px" size="lg">Call to Action</DssButton>
</template>
```

### Navegação Vue Router

```vue
<template>
  <!-- Navegação simples -->
  <DssButton to="/home">Home</DssButton>

  <!-- Rota nomeada com params -->
  <DssButton :to="{ name: 'user', params: { id: 123 } }">
    Ver Usuário
  </DssButton>

  <!-- Replace (não adiciona ao histórico) -->
  <DssButton to="/login" replace>Login</DssButton>
</template>
```

---

## 11. Anti-patterns

### ❌ Usos Incorretos

#### 1. Usar `<DssButton>` como Link Sem `to`

**Problema:** Usar botão para navegação sem prop `to` ou `href` quebra semântica HTML.

```vue
<!-- ❌ INCORRETO -->
<DssButton @click="$router.push('/home')">Home</DssButton>

<!-- ✅ CORRETO -->
<DssButton to="/home">Home</DssButton>
```

**Por quê:** Botões devem executar ações, links devem navegar. Use `to` para navegação.

---

#### 2. Ícone-Only Sem `aria-label`

**Problema:** Leitores de tela não conseguem descrever o botão.

```vue
<!-- ❌ INCORRETO -->
<DssButton icon="delete" color="negative" />

<!-- ✅ CORRETO -->
<DssButton icon="delete" color="negative" aria-label="Deletar item" />
```

**Por quê:** WCAG 4.1.2 exige que todos os elementos interativos tenham nome acessível.

---

#### 3. Sobrescrever CSS Sem Usar Tokens

**Problema:** Quebra a consistência do Design System e dificulta manutenção.

```vue
<!-- ❌ INCORRETO -->
<DssButton style="background: #ff0000 !important;">
  Vermelho Customizado
</DssButton>

<!-- ✅ CORRETO -->
<DssButton color="negative">
  Vermelho Semântico
</DssButton>

<!-- ✅ OU (se realmente precisa customizar) -->
<DssButton class="custom-button">Custom</DssButton>
<style>
.custom-button {
  --dss-primary: var(--meu-token-customizado);
}
</style>
```

**Por quê:** Sobrescrever estilos diretamente bypassa tokens e temas.

---

#### 4. Criar "Variante Nova" Sem Governança

**Problema:** Proliferação de variantes não padronizadas.

```vue
<!-- ❌ INCORRETO -->
<DssButton class="super-glossy-3d-neon">
  Botão Especial
</DssButton>

<!-- ✅ CORRETO -->
<!-- 1. Verificar se variante existente atende (glossy, push, etc.) -->
<DssButton variant="glossy">Botão Especial</DssButton>

<!-- 2. Se não atender, abrir discussão no time de Design System -->
```

**Por quê:** Variantes devem ser aprovadas pela governança do DSS para manter consistência.

---

#### 5. Múltiplos Botões Primary na Mesma Tela

**Problema:** Usuário não sabe qual é a ação principal.

```vue
<!-- ❌ INCORRETO -->
<div>
  <DssButton color="primary">Salvar</DssButton>
  <DssButton color="primary">Cancelar</DssButton>
  <DssButton color="primary">Deletar</DssButton>
</div>

<!-- ✅ CORRETO -->
<div>
  <DssButton color="primary">Salvar</DssButton>
  <DssButton variant="flat" color="secondary">Cancelar</DssButton>
  <DssButton variant="outline" color="negative">Deletar</DssButton>
</div>
```

**Por quê:** Hierarquia visual deve guiar o usuário para a ação primária.

---

#### 6. Loading Sem Bloquear Interação

**Problema:** Usuário pode clicar múltiplas vezes durante loading.

```vue
<!-- ❌ INCORRETO -->
<DssButton @click="submit">
  <span v-if="loading">Carregando...</span>
  <span v-else>Enviar</span>
</DssButton>

<!-- ✅ CORRETO -->
<DssButton :loading="loading" @click="submit">
  Enviar
</DssButton>
```

**Por quê:** A prop `loading` bloqueia cliques automaticamente e exibe spinner.

---

#### 7. Usar Botão Para Abrir Menu Dropdown Manual

**Problema:** Reimplementar funcionalidade que já existe no DSS.

```vue
<!-- ❌ INCORRETO -->
<DssButton @click="showMenu = !showMenu">
  Menu
</DssButton>
<div v-if="showMenu" class="custom-menu">...</div>

<!-- ✅ CORRETO -->
<DssButtonDropdown label="Menu">
  <DssMenuItem>Opção 1</DssMenuItem>
  <DssMenuItem>Opção 2</DssMenuItem>
</DssButtonDropdown>
```

**Por quê:** Use `DssButtonDropdown` ou `DssMenu` para menus dropdown.

---

#### 8. Ignorar Tamanhos Touch Target em Mobile

**Problema:** Botões muito pequenos em dispositivos touch.

```vue
<!-- ❌ INCORRETO -->
<DssButton size="xs" style="padding: 2px 4px;">
  Micro
</DssButton>

<!-- ✅ CORRETO -->
<DssButton size="sm">
  Small (mínimo 48px touch target)
</DssButton>
```

**Por quê:** WCAG 2.5.5 exige touch targets mínimos de 48×48px.

---

### 🚫 Combinações Não Permitidas

| Combinação | Por quê | Alternativa |
|------------|---------|-------------|
| `disabled` + `loading` | Estados conflitantes | Use apenas `loading` |
| `to` + `@click` | Navegação vs ação | Escolha um dos dois |
| `round` + `square` | Formas conflitantes | Use apenas um |
| `stretch` + `size="xs"` | Propósitos opostos | Use `size="md"` ou maior |
| `variant="flat"` + `variant="outline"` | Props mutuamente exclusivas | Escolha uma variante |

---

## 12. Governança do Componente

### O Que É Extensão Válida

**✅ Permitido SEM aprovação:**
- Uso de props públicas documentadas
- Combinação de props dentro das regras
- Customização via tokens CSS (`--dss-*`)
- Uso de slots para conteúdo customizado

**Exemplo:**
```vue
<DssButton
  brand="hub"
  size="lg"
  variant="glossy"
  padding="24px 48px"
  @click="handleClick"
>
  <template #icon>
    <CustomSVG />
  </template>
  Meu Botão
</DssButton>
```

---

### O Que Exige Novo Componente

**⚠️ Requer discussão com Design System:**
- Adicionar nova variante visual (ex: `variant="neon"`)
- Adicionar nova cor semântica além das 8 existentes
- Modificar comportamento de estados (hover, focus, etc.)
- Criar wrapper especializado (ex: `DssButtonUpload`, `DssButtonSocial`)

**Exemplo de proposta:**
```markdown
## Proposta: DssButtonSocial

**Motivação:** Botões para login social (Google, Facebook, etc.) têm padrões visuais específicos.

**Diferencial:**
- Logos das redes sociais embutidas
- Cores de brand específicas (Google blue, Facebook blue)
- Texto padronizado ("Continuar com Google")

**Impacto:** Novo componente, não altera DssButton base.
```

---

### O Que É Proibido

**🚫 NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar código-fonte do componente diretamente sem PR
- Criar "forks" locais do componente (copiar e colar)
- Ignorar warnings de acessibilidade (ex: `aria-label` faltando)
- Bypassar sistema de brandabilidade com CSS inline

**Por quê:** Quebra a consistência, dificulta manutenção, e cria débito técnico.

---

### Quem Decide

| Tipo de Mudança | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop pública** | Equipe de Design + DSS | RFC + aprovação |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migração planejada |
| **Novo componente derivado** | Equipe de Design + DSS | Proposta formal |

**RFC (Request for Comments):** Documento de proposta discutido pela equipe.

---

### Processo de Mudança

1. **Identificar necessidade** - Por que a mudança é necessária?
2. **Verificar alternativas** - Já existe solução no DSS?
3. **Criar proposta (RFC)** - Descrever mudança, impactos, exemplos
4. **Discussão** - Equipe de Design + DSS + stakeholders
5. **Aprovação** - Decisão registrada
6. **Implementação** - PR com testes e documentação
7. **Migração** - Guia para atualizar código existente (se breaking)

---

## 13. Troubleshooting

### Problema: Botão não responde ao clique

**Causa:** Botão está `disabled` ou `loading`.

**Solução:**
```vue
<DssButton
  :disabled="isDisabled"
  :loading="isLoading"
  @click="handleClick"
>
  Clique
</DssButton>
```

Verifique se `isDisabled` ou `isLoading` não estão `true` acidentalmente.

---

### Problema: Cores não mudam com `data-brand`

**Causa 1:** `data-brand` não está em um elemento pai.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssButton data-brand="hub" color="primary">Botão</DssButton>

<!-- ✅ CORRETO -->
<div data-brand="hub">
  <DssButton color="primary">Botão</DssButton>
</div>
```

**Causa 2:** Prop `brand` está sobrescrevendo `data-brand`.

**Solução:** Remova a prop `brand` se quiser usar `data-brand`.

---

### Problema: Ícones não aparecem

**Causa:** Material Icons não está importada.

**Solução:**
```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

**Alternativa:** Use slot para SVG customizado:
```vue
<DssButton>
  <template #icon>
    <svg>...</svg>
  </template>
  Label
</DssButton>
```

---

### Problema: Focus ring não aparece

**Causa:** Navegador ou estilos customizados estão removendo outline.

**Solução 1:** Não sobrescreva `outline` ou `box-shadow` de focus.

**Solução 2:** Verifique se não há CSS global como:
```css
/* ❌ NÃO FAÇA ISSO */
*:focus {
  outline: none !important;
}
```

---

### Problema: Botão muito pequeno no mobile

**Causa:** Touch target menor que 48×48px.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssButton size="xs" dense>Micro</DssButton>

<!-- ✅ CORRETO -->
<DssButton size="sm">Small (48px touch target)</DssButton>
```

---

### Problema: Loading não bloqueia cliques

**Causa:** Você está usando loading visual manual ao invés da prop `loading`.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssButton @click="submit">
  <span v-if="loading">Carregando...</span>
  <span v-else>Enviar</span>
</DssButton>

<!-- ✅ CORRETO -->
<DssButton :loading="loading" @click="submit">
  Enviar
</DssButton>
```

---

### Problema: Botão quebra layout em telas pequenas

**Causa:** Texto muito longo sem `no-wrap` ou `stretch`.

**Solução:**
```vue
<!-- Para texto que não deve quebrar -->
<DssButton no-wrap style="max-width: 200px;">
  Texto longo que será truncado
</DssButton>

<!-- Para botão full-width em mobile -->
<DssButton stretch>
  Botão Responsivo
</DssButton>
```

---

## 📋 Recursos

- [Documentação Oficial do Quasar QBtn](https://quasar.dev/vue-components/button)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Icons](https://fonts.google.com/icons)
- [Design System Sansys - Tokens](../../../tokens/)

---

## 📝 Licença

Propriedade da Jtech

---

## Apêndice: Checklist de Documentação DSS

Use este checklist ao documentar novos componentes baseado no Template 13.1:

### Estrutura Obrigatória
- [ ] **Seção 1 - Visão Geral**: Nome, descrição, tipo (Básico/Composto), características conceituais
- [ ] **Seção 2 - Quando Usar/Não Usar**: Casos de uso claros com exemplos
- [ ] **Seção 3 - Anatomia**: Estrutura visual, partes internas, slots, subcomponentes
- [ ] **Seção 4 - Tokens**: Tabela com colunas (Token | Tipo | Onde Atua | Observação)
- [ ] **Seção 5 - API Pública**: Props categorizadas, eventos, slots com descrições completas
- [ ] **Seção 6 - Estados**: Tabela única centralizando todos os estados + diagrama de transição
- [ ] **Seção 7 - Variantes/Especializações**: Características técnicas + quando usar cada uma
- [ ] **Seção 8 - Brandabilidade**: Como aplicar (se aplicável), prioridades, exemplos
- [ ] **Seção 9 - Acessibilidade**: WCAG 2.1 AA compliance, navegação teclado, ARIA
- [ ] **Seção 10 - Exemplos de Uso**: Instalação, uso básico, casos comuns com código
- [ ] **Seção 11 - Anti-patterns**: Usos incorretos documentados com exemplos ❌ vs ✅
- [ ] **Seção 12 - Governança**: Extensões válidas, proibições, processo de mudança
- [ ] **Seção 13 - Troubleshooting**: Problemas comuns + causas + soluções

### Validações de Qualidade
- [ ] **Tokens rastreáveis**: Todos os tokens usados estão documentados na tabela
- [ ] **Flags de proteção**: Tokens críticos (acessibilidade, touch targets) marcados com 🔒
- [ ] **Fallbacks documentados**: Comportamento padrão quando props/brands não são fornecidas
- [ ] **Exemplos executáveis**: Todo código de exemplo é válido e testável
- [ ] **Observações importantes**: Notas de compatibilidade, variações por produto, etc.
- [ ] **Links para recursos**: Documentação Quasar, WCAG, Material Icons, etc.

### Conformidade com Template 13.1
- [ ] Estrutura de 13 seções respeitada
- [ ] Anti-patterns com 5+ exemplos práticos
- [ ] Governança definida (válido/proibido/quem decide)
- [ ] Tokens em formato tabular padronizado
- [ ] Badge "Golden Sample" se for modelo de referência

### Ciclo de Revisão
- [ ] Validado por mantenedor do DSS
- [ ] Exemplos testados em ambiente real
- [ ] Links externos verificados
- [ ] Sincronizado com código-fonte
- [ ] Changelog atualizado

---

**Última atualização:** Janeiro 2025
**Versão:** DSS v2.2.0
**Status:** 🏆 Golden Sample Oficial - Template 13.1
**Changelog:** Ver [DOCUMENTATION_CHANGELOG.md](./DOCUMENTATION_CHANGELOG.md)
