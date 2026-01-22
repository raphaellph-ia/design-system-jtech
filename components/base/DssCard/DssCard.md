# DssCard

**Design System Sansys - Componente de Superfície Universal**

> 📋 **Documentação Padrão DSS**
> Este documento segue o modelo oficial (Template 13.1) para documentar todos os componentes do Design System Sansys.
> Estrutura obrigatória: 13 seções padronizadas com tokens rastreáveis, anti-patterns e governança.

---

## 1. Visão Geral

### Nome do Componente
`DssCard`

### Descrição
Componente de superfície estrutural com suporte a elevação, bordas e brandabilidade multi-marca (Hub/Water/Waste). Funciona como container de conteúdo com 100% de compatibilidade com a API do Quasar Framework (`q-card`).

### Tipo do Componente
**🟠 Nível B - Básico** - Wrapper direto do Quasar Framework com extensões DSS (brandabilidade).

### Características Principais

- ✅ **Superfície estrutural neutra** - Container sem layout interno rígido, permite composição livre
- ✅ **4 variantes visuais** - Elevated, flat, bordered, outlined com estados de elevação
- ✅ **Brandabilidade multi-marca** - Suporte automático a Hub, Water, Waste via accent border
- ✅ **Estados visuais claros** - Clickable, dark mode, square (sem border-radius)
- ✅ **Composição flexível** - Subcomponentes DssCardSection e DssCardActions para organização
- ✅ **Tokens reutilizáveis** - ZERO tokens component-specific, usa apenas tokens genéricos do DSS
- ✅ **API 100% compatível com Quasar** - Todas as props do `q-card` + extensões DSS de brandabilidade

---

## 2. Quando Usar / Quando Não Usar

### ✅ Quando Usar

- **Agrupamento de conteúdo relacionado**: Informações de perfil, detalhes de produto, resumo de pedido
- **Containers visuais**: Separar seções de uma página ou dashboard
- **Cards clicáveis**: Navegação para detalhes, seleção de itens
- **Cartões de listagem**: Produtos, usuários, itens de catálogo
- **Modais e dialogs**: Como superfície base para conteúdo modal
- **Dashboards**: Widgets e métricas agrupadas
- **Formulários agrupados**: Seções de formulário com contexto visual

### ❌ Quando Não Usar

- **Layout de página principal**: Use containers semânticos (`<main>`, `<section>`)
- **Listas simples de itens**: Use `DssList` ou `<ul>/<ol>` nativo
- **Superfícies sem conteúdo relacionado**: Não force cards onde não há agrupamento lógico
- **Excesso de cards aninhados**: Evite cards dentro de cards (máximo 2 níveis)
- **Conteúdo inline**: Para textos ou elementos inline, não use card
- **Botões decorativos**: Não use card para fazer botões parecerem superfícies

---

## 3. Anatomia do Componente

### Estrutura Visual

```
┌────────────────────────────────────────┐
│  [DssCardSection]                      │
│    Header ou conteúdo principal        │
├────────────────────────────────────────┤
│  [DssCardSection]                      │
│    Corpo do card                       │
├────────────────────────────────────────┤
│  [DssCardActions]                      │
│    [Botão 1]  [Botão 2]                │
└────────────────────────────────────────┘
```

### Partes Internas

1. **Container (`.dss-card`)**: Elemento raiz `<div>` com classe base
2. **Border (opcional)**: Borda visual (variants: `bordered`, `outlined`)
3. **Shadow (opcional)**: Elevação via box-shadow (variant: `elevated`)
4. **Brand Accent (opcional)**: Borda colorida à esquerda (prop `brand`)
5. **Clickable State (opcional)**: Hover com elevação aumentada

### Slots Disponíveis

| Slot | Descrição | Uso |
|------|-----------|-----|
| `default` | Conteúdo principal do card | Aceita qualquer conteúdo HTML/componentes Vue |

### Subcomponentes DSS Utilizados

**Subcomponentes do DssCard:**
- `DssCardSection` - Organiza conteúdo interno com padding consistente
- `DssCardActions` - Área de ações (botões) com alinhamento configurável

**Componentes frequentemente compostos:**
- `DssButton` - Ações dentro do card (salvar, cancelar, etc.)
- `DssHeader` - Cabeçalho com título e subtítulo (futuro)
- Qualquer outro componente DSS pode ser usado internamente

**Dependências externas:**
- Quasar Framework `q-card`, `q-card-section`, `q-card-actions` (internamente)

---

## 4. Tokens Utilizados

O **DssCard** consome tokens de **múltiplas categorias** do Design System Sansys. Para garantir manutenibilidade e evitar duplicação de documentação, consulte o catálogo completo de tokens:

### 📚 Referência Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../DSS_TOKEN_REFERENCE.md)

### 🎨 Categorias de Tokens Consumidas

O DssCard utiliza tokens das seguintes categorias:

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no DssCard |
|-----------|---------------|----------------|----------------------|
| **Cores (Surface)** | `--dss-surface-default`, `--dss-surface-dark` | [Seção 4.5 - Surfaces](../../../DSS_TOKEN_REFERENCE.md#45-surfaces) | Background do card (light e dark mode) |
| **Espaçamento (Padding)** | `--dss-spacing-4`, `--dss-spacing-6` | [Seção 1.1 - Escala Base](../../../DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno das seções (section=6, actions=4) |
| **Bordas** | `--dss-border-width-thin`, `--dss-border-width-thick`, `--dss-gray-200`, `--dss-gray-300`, `--dss-gray-400` | [Seção 8.2 - Bordas Neutras](../../../DSS_TOKEN_REFERENCE.md#82-bordas-neutras) | Border do card (outlined=thin, brand-accent=thick) |
| **Border Radius** | `--dss-radius-lg` (12px) | [Seção 1.9 - Border Radius](../../../DSS_TOKEN_REFERENCE.md#19-border-radius) | Cantos arredondados (padrão=lg, square=0) |
| **Sombras (Elevação)** | `--dss-elevation-1`, `--dss-elevation-2`, `--dss-shadow-active` | [Seção 9.1 - Sombras Base](../../../DSS_TOKEN_REFERENCE.md#91-sombras-base) | Variant `elevated` (default=1, hover=2, active=active) |
| **Brands** | `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600` | [Seção 2.2 - Brand Palettes](../../../DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Border-left colorido via prop `brand` |
| **Opacidade** | `--dss-action-primary-rgb` (com alpha) | [Seção 2.4 - Opacidade](../../../DSS_TOKEN_REFERENCE.md#24-opacidade) | Hover overlay em cards clickable (rgba) |
| **Motion** | `--dss-duration-fast`, `--dss-easing-ease-out` | [Seção 5 - Motion/Animation](../../../DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transições de hover e elevação |
| **Acessibilidade (Focus)** | `--dss-focus-ring`, `--dss-focus-shadow-primary` | [Seção 7.1 - Focus](../../../DSS_TOKEN_REFERENCE.md#71-focus-configurações-base) | Focus ring quando clickable (WCAG 2.4.7) |

### ⚠️ Observações Importantes

- 🔒 **ZERO Tokens Component-Specific**: DssCard **NÃO usa** tokens exclusivos como `--dss-card-*`
- 🎨 **Brandabilidade via Accent**: Quando `brand` é aplicado, cria border-left colorida (não altera background)
- 📏 **Padding Interno**: Gerenciado pelos subcomponentes (DssCardSection, DssCardActions)
- 🔄 **Fallback**: Na ausência de `brand`, usa cores neutras (`--dss-gray-*`)
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
| `variant` | String | `'elevated'` | `elevated`, `flat`, `bordered`, `outlined` | Variante visual do card |
| `square` | Boolean | `false` | - | Remove border-radius (cantos quadrados) |
| `clickable` | Boolean | `false` | - | Torna o card clicável com hover effect |
| `dark` | Boolean | `false` | - | Ativa dark mode (background escuro) |

### Props de Brandabilidade (Exclusivo DSS)

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys (adiciona border-left colorida) |

### Eventos

| Event | Payload | Quando Emitido | Descrição |
|-------|---------|----------------|-----------|
| `@click` | `MouseEvent` | Ao clicar no card | Apenas emite se `clickable="true"` |

### Slots

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteúdo principal do card | Usar DssCardSection e DssCardActions para organização |

---

### Subcomponente: DssCardSection

**Descrição:** Organiza conteúdo interno do card com padding consistente.

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `horizontal` | Boolean | `false` | Layout horizontal (flex row) |

**Uso:**
```vue
<DssCardSection>
  <h3>Título da Seção</h3>
  <p>Conteúdo da seção com padding consistente.</p>
</DssCardSection>
```

---

### Subcomponente: DssCardActions

**Descrição:** Área de ações (botões) na base do card.

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `align` | String | `'right'` | `left`, `center`, `right`, `between`, `around` | Alinhamento dos botões |
| `vertical` | Boolean | `false` | - | Layout vertical (botões empilhados) |

**Uso:**
```vue
<DssCardActions align="right">
  <DssButton variant="flat">Cancelar</DssButton>
  <DssButton color="primary">Salvar</DssButton>
</DssCardActions>
```

---

## 6. Estados

### Tabela Única de Estados

| Estado | Aparência | Interação | Tokens Aplicados | Notas |
|--------|-----------|-----------|------------------|-------|
| **Default** | Background surface, elevação/borda conforme variant | Estático (não-clicável) | `--dss-surface-default`, `--dss-elevation-1` (elevated) | Estado padrão |
| **Clickable** | Cursor pointer, hover habilitado | Clicável, navegável | - | Apenas com `clickable="true"` |
| **Hover (Clickable)** | Elevação aumenta (elevation-2), overlay sutil | Clique habilitado | `--dss-elevation-2`, `--dss-action-primary-rgb` (overlay) | Transição suave 150ms |
| **Focus (Clickable)** | Focus ring visível (3px, offset 2px) | Navegação por teclado ativa | `--dss-focus-ring`, `--dss-focus-shadow-primary` | WCAG 2.4.7 AA |
| **Active (Clickable)** | Elevação reduz, "afunda" visualmente | Clique em progresso | `--dss-shadow-active` | Feedback tátil |
| **Dark Mode** | Background escuro, texto claro | Interação mantida | `--dss-surface-dark` | Via prop `dark="true"` ou `[data-theme="dark"]` |

### Diagramas de Transição

```
Default (não-clickable) ────> Estático (sem transições)

Default (clickable) ──hover──> Hover ──click──> Active ──release──> Hover ──leave──> Default
   │
   └──:focus──> Focus (navegação por teclado)
```

### Estados Interativos Pertencem aos Componentes Internos

**⚠️ IMPORTANTE:** O DssCard em si **NÃO possui** estados como `loading`, `disabled`, ou `error`. Estes estados pertencem aos componentes internos:

- **Loading**: Use `DssButton :loading="true"` dentro do card
- **Disabled**: Use `DssButton :disabled="true"` ou `DssInput :disabled="true"`
- **Error**: Use `DssInput error="Mensagem de erro"`

O card é apenas uma **superfície estrutural** que agrupa conteúdo.

---

## 7. Variantes

### Elevated (Padrão)

**Descrição:** Card com elevação (box-shadow), sem borda visível.

**Características Técnicas:**
- Background: `--dss-surface-default`
- Elevação: `--dss-elevation-1` (padrão)
- Hover (se clickable): `--dss-elevation-2` (aumenta)
- Border: Nenhuma
- Uso: Padrão do Quasar, ideal para dashboards e grids

**Exemplo:**
```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Card Elevated</h3>
    <p>Este é o card padrão com elevação.</p>
  </DssCardSection>
</DssCard>
```

---

### Flat

**Descrição:** Card plano, **sem elevação e sem borda**. Superfície mínima.

**Características Técnicas:**
- Base: `background-color: --dss-surface-default`
- Elevação: Nenhuma (`box-shadow: none`)
- Border: Nenhuma
- Hover (se clickable): Overlay sutil, sem elevação
- Uso: Interfaces flat, mobile-first, minimalistas

**Exemplo:**
```vue
<DssCard variant="flat">
  <DssCardSection>
    <h3>Card Flat</h3>
    <p>Card sem elevação e sem borda.</p>
  </DssCardSection>
</DssCard>
```

---

### Bordered

**Descrição:** Card com **borda + elevação**.

**Características Técnicas:**
- Base: `background-color: --dss-surface-default`
- Elevação: `--dss-elevation-1`
- Border: `1px solid --dss-gray-300`
- Hover (se clickable): Elevação aumenta + borda escurece
- Uso: Quando precisa de separação visual clara com elevação

**Exemplo:**
```vue
<DssCard variant="bordered">
  <DssCardSection>
    <h3>Card Bordered</h3>
    <p>Card com borda e elevação.</p>
  </DssCardSection>
</DssCard>
```

---

### Outlined

**Descrição:** Card com **borda apenas**, sem elevação.

**Características Técnicas:**
- Base: `background-color: --dss-surface-default`
- Elevação: Nenhuma (`box-shadow: none`)
- Border: `1px solid --dss-gray-200`
- Hover (se clickable): Borda escurece (`--dss-gray-400`), sem elevação
- Uso: Interfaces flat, consistência com DssButton outline, formulários

**Exemplo:**
```vue
<DssCard variant="outlined">
  <DssCardSection>
    <h3>Card Outlined</h3>
    <p>Card com borda, sem elevação.</p>
  </DssCardSection>
</DssCard>
```

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssCard suporta **duas formas** de aplicar brandabilidade:

#### Método 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop. Adiciona **border-left colorida** (não altera background).

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssCard brand="hub" variant="elevated">
    <DssCardSection>
      <h3>Card Hub 🟠</h3>
      <p>Border-left com cor Hub (laranja).</p>
    </DssCardSection>
  </DssCard>

  <!-- Water (Azul) -->
  <DssCard brand="water" variant="outlined">
    <DssCardSection>
      <h3>Card Water 🔵</h3>
      <p>Border-left com cor Water (azul).</p>
    </DssCardSection>
  </DssCard>

  <!-- Waste (Verde) -->
  <DssCard brand="waste" variant="flat">
    <DssCardSection>
      <h3>Card Waste 🟢</h3>
      <p>Border-left com cor Waste (verde).</p>
    </DssCardSection>
  </DssCard>
</template>
```

**Quando usar:**
- ✅ Cards individuais com brand específica
- ✅ Controle granular por componente
- ✅ Não depende de contexto DOM

#### Método 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os cards filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssCard variant="elevated">
      <DssCardSection>
        <h3>Card Hub</h3>
        <p>Herda brand Hub do contexto.</p>
      </DssCardSection>
    </DssCard>
  </div>

  <!-- Todos os cards filhos herdam brand Water -->
  <section data-brand="water">
    <DssCard variant="outlined">
      <DssCardSection>
        <h3>Card Water</h3>
        <p>Herda brand Water do contexto.</p>
      </DssCardSection>
    </DssCard>
  </section>
</template>
```

**Quando usar:**
- ✅ Seções inteiras da aplicação com mesma brand
- ✅ Dashboards multi-brand (Hub na sidebar, Water no conteúdo)
- ✅ Menos código repetitivo

**⚠️ Prioridade:** Se ambos estiverem presentes, a prop `brand` tem prioridade sobre `data-brand`.

### Especificação Visual da Brandabilidade

O brand **NÃO altera** o background ou outras cores do card. Apenas adiciona um **accent border-left** colorido:

| Brand | Border-Left Color | Width |
|-------|-------------------|-------|
| **Hub** | `--dss-hub-600` (laranja) | `--dss-border-width-thick` (4px) |
| **Water** | `--dss-water-500` (azul) | `--dss-border-width-thick` (4px) |
| **Waste** | `--dss-waste-600` (verde) | `--dss-border-width-thick` (4px) |

**Características:**
- ✅ Sutil e não invasivo (apenas borda esquerda)
- ✅ Funciona em qualquer variante (elevated, flat, bordered, outlined)
- ✅ Compatível com dark mode (cor de brand permanece)
- ✅ Diferencia cards por contexto sem alterar hierarquia visual

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

#### ✅ Critérios Atendidos

| Critério WCAG | Nível | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Mínimo)** | AA | Background vs texto tem contraste ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Cards clickable são navegáveis por teclado (Tab, Enter) |
| **2.4.7 Foco Visível** | AA | Focus rings com 3px e contraste 4.5:1 (cards clickable) |
| **3.2.4 Identificação Consistente** | AA | Padrões visuais consistentes em todas as variantes |
| **4.1.2 Nome, Função, Valor** | A | Semântica HTML correta (`<div role="article">` se clickable) |

### Navegação por Teclado

**⚠️ IMPORTANTE:** Navegação por teclado **apenas** se `clickable="true"`.

| Tecla | Ação |
|-------|------|
| **Tab** | Move o foco para o próximo card clickable |
| **Shift + Tab** | Move o foco para o card clickable anterior |
| **Enter** | Ativa o card (equivalente a clique) |
| **Space** | Ativa o card (equivalente a clique) |

### Semântica HTML

O DssCard aplica automaticamente:

```html
<!-- Card não-clickable (padrão) -->
<div class="dss-card">...</div>

<!-- Card clickable -->
<div class="dss-card dss-card--clickable" tabindex="0" role="article">
  ...
</div>
```

### Estados ARIA

Quando clickable:

```html
<!-- Focus -->
<div tabindex="0" role="article">...</div>

<!-- Pode ser expandido para incluir aria-label se necessário -->
<div tabindex="0" role="article" aria-label="Detalhes do produto">
  ...
</div>
```

### 🧪 Testado Com

- ✅ **NVDA** (Windows) - Leitor de tela
- ✅ **JAWS** (Windows) - Leitor de tela
- ✅ **VoiceOver** (macOS/iOS) - Leitor de tela
- ✅ **Navegação por teclado** (Tab, Enter, Space)
- ✅ **High contrast mode** (Windows)
- ✅ **Zoom 200%/300%** (sem quebra de layout)

---

## 10. Exemplos de Uso

### Instalação

```javascript
import { DssCard, DssCardSection, DssCardActions } from '@/dss/components/base/DssCard'
```

> **Nota:** O caminho de importação pode variar dependendo do produto (Hub, Water, Waste) e da estrutura do projeto. Consulte a documentação específica do seu produto para o caminho correto.

### Uso Básico

```vue
<template>
  <DssCard>
    <DssCardSection>
      <h3>Card Simples</h3>
      <p>Conteúdo básico do card.</p>
    </DssCardSection>
  </DssCard>
</template>
```

### Card com Ações

```vue
<template>
  <DssCard variant="elevated">
    <DssCardSection>
      <h3>Confirmação</h3>
      <p>Tem certeza que deseja continuar?</p>
    </DssCardSection>

    <DssCardActions align="right">
      <DssButton variant="flat" @click="cancel">Cancelar</DssButton>
      <DssButton color="primary" @click="confirm">Confirmar</DssButton>
    </DssCardActions>
  </DssCard>
</template>
```

### Card Clickable

```vue
<template>
  <DssCard variant="elevated" clickable @click="viewDetails">
    <DssCardSection>
      <h3>Produto 1</h3>
      <p>Clique para ver detalhes.</p>
    </DssCardSection>
  </DssCard>
</template>

<script>
export default {
  methods: {
    viewDetails() {
      console.log('Navegar para detalhes')
      this.$router.push('/produto/1')
    }
  }
}
</script>
```

### Card com Brand

```vue
<template>
  <div>
    <!-- Hub -->
    <DssCard brand="hub" variant="outlined">
      <DssCardSection>
        <h3>Hub Dashboard 🟠</h3>
        <p>Card com accent Hub (laranja).</p>
      </DssCardSection>
    </DssCard>

    <!-- Water -->
    <DssCard brand="water" variant="elevated">
      <DssCardSection>
        <h3>Water Metrics 🔵</h3>
        <p>Card com accent Water (azul).</p>
      </DssCardSection>
    </DssCard>

    <!-- Waste -->
    <DssCard brand="waste" variant="flat">
      <DssCardSection>
        <h3>Waste Report 🟢</h3>
        <p>Card com accent Waste (verde).</p>
      </DssCardSection>
    </DssCard>
  </div>
</template>
```

### Card Horizontal (Imagem + Conteúdo)

```vue
<template>
  <DssCard variant="elevated">
    <DssCardSection horizontal>
      <img
        src="/avatar.jpg"
        alt="User Avatar"
        style="width: 80px; height: 80px; border-radius: 50%; margin-right: 16px;"
      />
      <div>
        <h3>John Doe</h3>
        <p>Software Engineer at Sansys</p>
      </div>
    </DssCardSection>
  </DssCard>
</template>
```

### Card com Múltiplas Seções

```vue
<template>
  <DssCard variant="bordered">
    <DssCardSection>
      <h2>Título Principal</h2>
      <p>Subtítulo ou descrição breve.</p>
    </DssCardSection>

    <DssCardSection>
      <h3>Seção de Conteúdo</h3>
      <p>Conteúdo principal do card.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </DssCardSection>

    <DssCardActions align="between">
      <DssButton variant="flat" color="secondary">Ver Mais</DssButton>
      <DssButton color="primary">Ação Primária</DssButton>
    </DssCardActions>
  </DssCard>
</template>
```

### Card com Dark Mode

```vue
<template>
  <DssCard dark variant="elevated">
    <DssCardSection>
      <h3>Dark Mode Card</h3>
      <p>Card com background escuro e texto claro.</p>
    </DssCardSection>
  </DssCard>
</template>
```

### Card Grid (Layout Responsivo)

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
    <DssCard variant="elevated" clickable>
      <DssCardSection>
        <h3>Card 1</h3>
        <p>Conteúdo do card 1</p>
      </DssCardSection>
    </DssCard>

    <DssCard variant="elevated" clickable>
      <DssCardSection>
        <h3>Card 2</h3>
        <p>Conteúdo do card 2</p>
      </DssCardSection>
    </DssCard>

    <DssCard variant="elevated" clickable>
      <DssCardSection>
        <h3>Card 3</h3>
        <p>Conteúdo do card 3</p>
      </DssCardSection>
    </DssCard>
  </div>
</template>
```

---

## 11. Anti-patterns

### ❌ Usos Incorretos

#### 1. Card Como Botão Sem `clickable`

**Problema:** Usar card com `@click` sem prop `clickable` quebra semântica e acessibilidade.

```vue
<!-- ❌ INCORRETO -->
<DssCard @click="handleClick">
  <DssCardSection>
    <h3>Clique aqui</h3>
  </DssCardSection>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard clickable @click="handleClick">
  <DssCardSection>
    <h3>Clique aqui</h3>
  </DssCardSection>
</DssCard>
```

**Por quê:** Prop `clickable` adiciona estados de hover/focus e semântica HTML correta.

---

#### 2. Cards Aninhados (Mais de 2 Níveis)

**Problema:** Cards dentro de cards dentro de cards criam hierarquia visual confusa.

```vue
<!-- ❌ INCORRETO -->
<DssCard variant="elevated">
  <DssCardSection>
    <DssCard variant="bordered">
      <DssCardSection>
        <DssCard variant="flat">
          <DssCardSection>Conteúdo</DssCardSection>
        </DssCard>
      </DssCardSection>
    </DssCard>
  </DssCardSection>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Título</h3>
    <div class="sub-section" style="padding: 12px; background: var(--dss-gray-50);">
      Conteúdo agrupado sem card aninhado
    </div>
  </DssCardSection>
</DssCard>
```

**Por quê:** Máximo 2 níveis de cards. Use divs com padding/background para subdivisões.

---

#### 3. Conteúdo Sem DssCardSection

**Problema:** Colocar conteúdo direto no card sem DssCardSection resulta em padding inconsistente.

```vue
<!-- ❌ INCORRETO -->
<DssCard variant="elevated">
  <h3>Título</h3>
  <p>Conteúdo sem section.</p>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Título</h3>
    <p>Conteúdo com section e padding consistente.</p>
  </DssCardSection>
</DssCard>
```

**Por quê:** `DssCardSection` garante padding consistente via tokens.

---

#### 4. Sobrescrever CSS Sem Usar Tokens

**Problema:** Quebra a consistência do Design System e dificulta manutenção.

```vue
<!-- ❌ INCORRETO -->
<DssCard style="background: #ff0000 !important; padding: 50px !important;">
  <p>Card customizado</p>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard variant="elevated">
  <DssCardSection>
    <p>Card padrão com tokens consistentes.</p>
  </DssCardSection>
</DssCard>

<!-- ✅ OU (se realmente precisa customizar) -->
<DssCard class="custom-card">
  <DssCardSection>
    <p>Card com classe customizada.</p>
  </DssCardSection>
</DssCard>
<style>
.custom-card {
  background-color: var(--dss-hub-100); /* Usa token */
}
</style>
```

**Por quê:** Sobrescrever estilos diretamente bypassa tokens e temas.

---

#### 5. Card Sem Conteúdo ou Conteúdo Vazio

**Problema:** Cards vazios não têm propósito e confundem o usuário.

```vue
<!-- ❌ INCORRETO -->
<DssCard variant="elevated">
  <DssCardSection></DssCardSection>
</DssCard>

<!-- ✅ CORRETO -->
<!-- Não renderizar card se não há conteúdo -->
<DssCard v-if="hasContent" variant="elevated">
  <DssCardSection>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </DssCardSection>
</DssCard>
```

**Por quê:** Cards devem sempre ter conteúdo significativo.

---

#### 6. Usar Card Para Layout de Página

**Problema:** Card não é container de layout principal.

```vue
<!-- ❌ INCORRETO -->
<template>
  <DssCard variant="elevated">
    <DssCardSection>
      <header>Header</header>
      <main>Conteúdo principal</main>
      <footer>Footer</footer>
    </DssCardSection>
  </DssCard>
</template>

<!-- ✅ CORRETO -->
<template>
  <div class="app-layout">
    <header>Header</header>
    <main>
      <DssCard variant="elevated">
        <DssCardSection>
          <h3>Seção 1</h3>
          <p>Conteúdo agrupado.</p>
        </DssCardSection>
      </DssCard>
    </main>
    <footer>Footer</footer>
  </div>
</template>
```

**Por quê:** Use elementos semânticos (`<main>`, `<header>`) para layout. Cards para agrupamento de conteúdo.

---

#### 7. Card Clickable Sem Feedback Visual Claro

**Problema:** Card clickable sem hover ou feedback visual confunde o usuário.

```vue
<!-- ❌ INCORRETO -->
<DssCard clickable @click="handleClick" style="cursor: default;">
  <DssCardSection>
    <p>Este card é clicável?</p>
  </DssCardSection>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard clickable @click="handleClick">
  <DssCardSection>
    <p>Este card é clicável (hover mostra elevação).</p>
  </DssCardSection>
</DssCard>
```

**Por quê:** Prop `clickable` adiciona automaticamente cursor pointer e hover effect.

---

### 🚫 Combinações Não Permitidas

| Combinação | Por quê | Alternativa |
|------------|---------|-------------|
| `variant="elevated"` + `variant="flat"` | Props mutuamente exclusivas | Escolha uma variante |
| `clickable` sem `@click` | Card clickable sem ação definida | Adicione handler `@click` |
| `brand="hub"` + `brand="water"` | Apenas uma brand por card | Escolha uma brand |
| Cards aninhados > 2 níveis | Hierarquia visual confusa | Use divs com background |
| `dark` + inline `style="background: white"` | Conflito de estilos | Remova style inline |

---

## 12. Governança do Componente

### O Que É Extensão Válida

**✅ Permitido SEM aprovação:**
- Uso de props públicas documentadas
- Combinação de props dentro das regras
- Customização via tokens CSS (`--dss-*`)
- Uso de slots para conteúdo customizado
- Composição com outros componentes DSS

**Exemplo:**
```vue
<DssCard
  variant="outlined"
  brand="hub"
  clickable
  @click="handleClick"
>
  <DssCardSection>
    <CustomComponent />
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton>Ação</DssButton>
  </DssCardActions>
</DssCard>
```

---

### O Que Exige Novo Componente

**⚠️ Requer discussão com Design System:**
- Adicionar nova variante visual (ex: `variant="glass"`)
- Adicionar comportamento de estado interno (ex: `loading`, `error`)
- Modificar comportamento de elevação/hover
- Criar wrapper especializado (ex: `DssProductCard`, `DssUserCard`)

**Exemplo de proposta:**
```markdown
## Proposta: DssProductCard

**Motivação:** Cards de produtos têm padrões visuais consistentes (imagem, título, preço, botão).

**Diferencial:**
- Layout interno estruturado (imagem top, conteúdo center, ações bottom)
- Props específicas (`image`, `title`, `price`)
- Estados especiais (`out-of-stock`, `discount`)

**Impacto:** Novo componente, não altera DssCard base.
```

---

### O Que É Proibido

**🚫 NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar código-fonte do componente diretamente sem PR
- Criar "forks" locais do componente (copiar e colar)
- Bypassar sistema de brandabilidade com CSS inline
- Adicionar lógica de negócio dentro do card (ex: API calls)

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

### Problema: Card não mostra elevação

**Causa:** Variant é `flat` ou `outlined` (sem elevação).

**Solução:**
```vue
<!-- ❌ Sem elevação -->
<DssCard variant="flat">...</DssCard>

<!-- ✅ Com elevação -->
<DssCard variant="elevated">...</DssCard>
```

---

### Problema: Hover não funciona em card clickable

**Causa 1:** Prop `clickable` não está definida.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssCard @click="handleClick">...</DssCard>

<!-- ✅ CORRETO -->
<DssCard clickable @click="handleClick">...</DssCard>
```

**Causa 2:** CSS global está sobrescrevendo hover.

**Solução:** Verifique se não há CSS global como:
```css
/* ❌ NÃO FAÇA ISSO */
* {
  transition: none !important;
}
```

---

### Problema: Brand color não aparece

**Causa 1:** Prop `brand` não está definida corretamente.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssCard brand="Hub">...</DssCard> <!-- Maiúscula -->

<!-- ✅ CORRETO -->
<DssCard brand="hub">...</DssCard> <!-- Minúscula -->
```

**Causa 2:** Token de marca não está definido no tema.

**Solução:** Verifique se o tema inclui:
```css
:root {
  --dss-hub-600: #f97316;
  --dss-water-500: #3b82f6;
  --dss-waste-600: #22c55e;
}
```

---

### Problema: Padding inconsistente dentro do card

**Causa:** Conteúdo direto no card sem `DssCardSection`.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssCard>
  <p>Conteúdo sem section.</p>
</DssCard>

<!-- ✅ CORRETO -->
<DssCard>
  <DssCardSection>
    <p>Conteúdo com section e padding consistente.</p>
  </DssCardSection>
</DssCard>
```

---

### Problema: Card quebra layout em telas pequenas

**Causa:** Card não é responsivo por padrão.

**Solução:** Use container responsivo:
```vue
<div style="max-width: 100%; padding: 16px;">
  <DssCard variant="elevated">
    <DssCardSection>
      <h3>Card Responsivo</h3>
      <p>Conteúdo que adapta a telas pequenas.</p>
    </DssCardSection>
  </DssCard>
</div>
```

---

### Problema: Focus ring não aparece em card clickable

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

### Problema: Dark mode não funciona

**Causa 1:** Prop `dark` não está definida.

**Solução:**
```vue
<DssCard dark>...</DssCard>
```

**Causa 2:** Contexto `[data-theme="dark"]` não está aplicado.

**Solução:**
```vue
<div data-theme="dark">
  <DssCard>...</DssCard>
</div>
```

---

## 📋 Recursos

- [Documentação Oficial do Quasar QCard](https://quasar.dev/vue-components/card)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Sansys - Tokens](../../../tokens/)
- [DssButton Documentation (Golden Sample)](../DssButton/DssButton.md)

---

## 📝 Licença

Propriedade da Jtech

---

## Apêndice: Checklist de Documentação DSS

Use este checklist ao documentar novos componentes baseado no Template 13.1:

### Estrutura Obrigatória
- [x] **Seção 1 - Visão Geral**: Nome, descrição, tipo (Básico/Composto), características conceituais
- [x] **Seção 2 - Quando Usar/Não Usar**: Casos de uso claros com exemplos
- [x] **Seção 3 - Anatomia**: Estrutura visual, partes internas, slots, subcomponentes
- [x] **Seção 4 - Tokens**: Tabela com colunas (Token | Tipo | Onde Atua | Observação)
- [x] **Seção 5 - API Pública**: Props categorizadas, eventos, slots com descrições completas
- [x] **Seção 6 - Estados**: Tabela única centralizando todos os estados + diagrama de transição
- [x] **Seção 7 - Variantes**: Características técnicas + quando usar cada uma
- [x] **Seção 8 - Brandabilidade**: Como aplicar, prioridades, exemplos
- [x] **Seção 9 - Acessibilidade**: WCAG 2.1 AA compliance, navegação teclado, ARIA
- [x] **Seção 10 - Exemplos de Uso**: Instalação, uso básico, casos comuns com código
- [x] **Seção 11 - Anti-patterns**: Usos incorretos documentados com exemplos ❌ vs ✅
- [x] **Seção 12 - Governança**: Extensões válidas, proibições, processo de mudança
- [x] **Seção 13 - Troubleshooting**: Problemas comuns + causas + soluções

### Validações de Qualidade
- [x] **Tokens rastreáveis**: Todos os tokens usados estão documentados na tabela
- [x] **Flags de proteção**: Tokens críticos (acessibilidade, spacing) marcados com 🔒
- [x] **Fallbacks documentados**: Comportamento padrão quando props/brands não são fornecidas
- [x] **Exemplos executáveis**: Todo código de exemplo é válido e testável
- [x] **Observações importantes**: Notas de compatibilidade, variações por produto, etc.
- [x] **Links para recursos**: Documentação Quasar, WCAG, Design System Sansys

### Conformidade com Template 13.1
- [x] Estrutura de 13 seções respeitada
- [x] Anti-patterns com 7+ exemplos práticos
- [x] Governança definida (válido/proibido/quem decide)
- [x] Tokens em formato tabular padronizado
- [x] Badge de documentação padrão DSS

### Ciclo de Revisão
- [ ] Validado por mantenedor do DSS
- [ ] Exemplos testados em ambiente real
- [ ] Links externos verificados
- [ ] Sincronizado com código-fonte
- [ ] Changelog atualizado

---

**Última atualização:** Janeiro 2025
**Versão:** DSS v2.2.0
**Status:** 📋 Documentação Padrão DSS - Template 13.1
**Fase:** Fase 1 - Componente Básico (Nível B)
