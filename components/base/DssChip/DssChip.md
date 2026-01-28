# DssChip

**Design System Sansys - Componente de Chip/Tag Universal**

> 📦 **Componente Base DSS**
> Documentação seguindo o Template 13.1 do Design System Sansys.
> Estrutura obrigatória: 13 seções padronizadas com tokens rastreáveis, anti-patterns e governança.

---

## 1. Visão Geral

### Nome do Componente
`DssChip`

### Descrição
Wrapper DSS baseado no QChip, com API pública governada pelo Design System Sansys. Componente de chip/tag compacto com suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Básico** - Componente com API governada pelo DSS, baseado no QChip com extensões de brandabilidade.

### Características Principais

- ✅ **Acessibilidade WCAG 2.1 AA completa** - Touch targets, focus rings, navegação por teclado, ARIA, high contrast e reduced motion
- ✅ **Brandabilidade multi-marca** - Suporte automático a Hub, Water, Waste
- ✅ **3 variantes visuais** - Filled, outline, flat com estados de hover documentados
- ✅ **Estados interativos robustos** - Clickable, selected, removable, disabled
- ✅ **Tokens rastreáveis** - Tokens de cor, acessibilidade, espaçamento e forma
- ✅ **API governada pelo DSS** - Props curadas do QChip + extensões DSS de brandabilidade

---

## 2. Quando Usar / Quando Não Usar

### ✅ Quando Usar

- **Tags de categorização**: Tecnologias, categorias, tópicos
- **Status badges compactos**: Ativo, Pendente, Erro
- **Filtros selecionáveis**: Chips clicáveis para filtrar listas
- **Inputs de múltiplos valores**: Tags removíveis em campos de entrada
- **Metadados de conteúdo**: Labels informativos em cards ou listas
- **Seleção múltipla compacta**: Alternativa a checkboxes em espaços limitados

### ❌ Quando Não Usar

- **Badges numéricos**: Use `DssBadge` para contadores
- **Botões de ação principal**: Use `DssButton` para CTAs
- **Avatares com iniciais**: Use `DssAvatar` para representação de usuários
- **Status de formulário**: Use mensagens de validação inline
- **Navegação**: Use tabs ou menus apropriados
- **Listas longas de opções**: Use `DssSelect` ou `DssCheckbox`

---

## 3. Anatomia do Componente

### Estrutura Visual

```
┌─────────────────────────────────────────────────┐
│  [✓]  [ícone]  Label do Chip  [ícone]  [×]     │
└─────────────────────────────────────────────────┘
  │       │            │           │       │
  │       │            │           │       └── Remove button (opcional)
  │       │            │           └── Icon right (opcional)
  │       │            └── Label (texto principal)
  │       └── Icon left (opcional)
  └── Selected icon (quando selecionado)
```

### Partes Internas

1. **Container (`.dss-chip`)**: Elemento raiz `<div>`
2. **Selected Icon (`.dss-chip__icon--selected`)**: Ícone de seleção (opcional)
3. **Icon Left (`.dss-chip__icon--left`)**: Ícone à esquerda (opcional)
4. **Label (`.dss-chip__label`)**: Texto principal
5. **Icon Right (`.dss-chip__icon--right`)**: Ícone à direita (opcional)
6. **Remove Button (`.dss-chip__remove`)**: Botão de remoção (opcional)
7. **Ripple Effect (`.dss-chip__ripple`)**: Efeito Material Design no clique

### Slots Disponíveis

| Slot | Descrição | Uso |
|------|-----------|-----|
| `default` | Conteúdo principal do chip | Label com formatação customizada |
| `icon` | Ícone customizado à esquerda | SVG, Font Awesome, outros |
| `icon-right` | Ícone customizado à direita | SVG, Font Awesome, outros |
| `icon-remove` | Ícone customizado do botão remover | SVG customizado |

### Subcomponentes DSS Utilizados

**Nenhum** - DssChip é um componente atômico que não depende de outros componentes DSS.

**Dependências externas:**
- Material Icons (recomendado, mas opcional)

---

## 4. Tokens Utilizados

O **DssChip** consome tokens de **múltiplas categorias** do Design System Sansys. Para garantir manutenibilidade e evitar duplicação de documentação, consulte o catálogo completo de tokens:

### 📚 Referência Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../DSS_TOKEN_REFERENCE.md)

### 🎨 Categorias de Tokens Consumidas

O DssChip utiliza tokens das seguintes categorias:

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no DssChip |
|-----------|---------------|----------------|----------------------|
| **Espaçamento** | `--dss-spacing-0_5` a `--dss-spacing-10` | [Seção 1.1 - Escala Base](../../../DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno, gap entre elementos, margins de ícones |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-xs` a `--dss-font-size-lg`, `--dss-line-height-tight` | [Seção 6 - Tipografia](../../../DSS_TOKEN_REFERENCE.md#6-tipografia) | Texto do label (xs=12px, sm=14px, md=14px, lg=16px) |
| **Bordas** | `--dss-radius-sm`, `--dss-radius-full`, `--dss-border-width-md`, `--dss-border-width-lg` | [Seção 8 - Bordas](../../../DSS_TOKEN_REFERENCE.md#8-bordas) | Border radius (round=full, square=sm), outline variant |
| **Acessibilidade (Focus)** | `--dss-focus-ring`, `--dss-focus-ring-dark` | [Seção 7.1 - Focus](../../../DSS_TOKEN_REFERENCE.md#71-focus-configurações-base) | Focus ring (WCAG 2.4.7) em `:focus-visible` |
| **Altura Visual** | `--dss-compact-control-height-{xs\|sm\|md\|lg}` | [Seção 7.13 - Compact Controls](../../docs/reference/DSS_TOKEN_REFERENCE.md#713-compact-controls---alturas-visuais) | Min-height VISUAL do chip por size (20/24/28/32px) |
| **Touch Target** | `--dss-touch-target-min` | [Seção 7.7 - Touch Targets](../../docs/reference/DSS_TOKEN_REFERENCE.md#77-touch-targets) | Área interativa mínima 48px via `::before` |
| **Motion** | `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-slowest`, `--dss-easing-standard`, `--dss-easing-ease-out` | [Seção 5 - Motion/Animation](../../../DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transições de hover, active, ripple effect |
| **Opacidade** | `--dss-opacity-disabled`, `--dss-opacity-70`, `--dss-opacity-hover`, `--dss-opacity-active`, `--dss-opacity-selected` | [Seção 2.4 - Opacidade](../../../DSS_TOKEN_REFERENCE.md#24-opacidade) | Estados disabled, hover overlay, ripple |
| **Brands** | `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` | [Seção 2.2 - Brand Palettes](../../../DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Aplicado via prop `brand` ou `data-brand` |

### ⚠️ Observações Importantes

- 🔒 **Tokens Protegidos**: Tokens de acessibilidade (`--dss-focus-*`) **NÃO devem** ser sobrescritos fora do DSS
- 🎨 **Brandabilidade**: Quando `brand` ou `data-brand` é aplicado, tokens de marca substituem automaticamente cores semânticas
- 📏 **Responsividade**: Tokens de espaçamento são gerenciados pela prop `size`
- 🔄 **Fallback**: Na ausência de `brand`, o sistema usa classes utilitárias (`bg-*`, `text-*`)

### 🔗 Links Rápidos

- [Token Guidelines (Filosofia e Uso)](../../../DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catálogo Completo)](../../../DSS_TOKEN_REFERENCE.md)

### 📏 Altura Visual vs Touch Target (WCAG 2.5.5)

> **⚠️ Conceito Crítico**: Altura visual e área interativa são conceitos **distintos** no DssChip.

#### Definições

| Conceito | Token | Valor | Responsabilidade |
|----------|-------|-------|------------------|
| **Altura Visual** | `--dss-compact-control-height-*` | 20-32px | Dimensão renderizada visualmente |
| **Touch Target** | `--dss-touch-target-min` | 48px | Área mínima clicável/tocável |

#### Mapeamento por Size

| Prop `size` | Altura Visual | Touch Target |
|-------------|---------------|--------------|
| `xs` | 20px (`--dss-compact-control-height-xs`) | 48px (via `::before`) |
| `sm` | 24px (`--dss-compact-control-height-sm`) | 48px (via `::before`) |
| `md` | 28px (`--dss-compact-control-height-md`) | 48px (via `::before`) |
| `lg` | 32px (`--dss-compact-control-height-lg`) | 48px (via `::before`) |

#### Implementação Técnica

O DssChip utiliza pseudo-elemento `::before` para garantir touch target ≥48px:

```scss
.dss-chip {
  min-height: var(--dss-compact-control-height-md); /* 28px - altura VISUAL */

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: var(--dss-touch-target-min);  /* 48px */
    min-height: var(--dss-touch-target-min); /* 48px */
    pointer-events: none; /* ⚠️ Não intercepta eventos */
  }
}
```

#### Características do `::before`

| Propriedade | Valor | Motivo |
|-------------|-------|--------|
| **Visibilidade** | Invisível | Sem `background-color` |
| **Interação** | `pointer-events: none` | Não intercepta cliques |
| **Posicionamento** | Centralizado | Expande igualmente em todas as direções |
| **Propósito** | Acessibilidade | Ferramentas medem área ≥48px |

> **📖 Referência**: Consulte [DSS_IMPLEMENTATION_GUIDE.md - Touch Target vs Visual Height](../../docs/guides/DSS_IMPLEMENTATION_GUIDE.md#touch-target-vs-visual-height-wcag-255) para detalhes completos.

---

## 5. API Pública

### Props Principais

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `label` | String | `''` | - | Texto do chip |
| `icon` | String | `''` | Material Icons | Ícone à esquerda |
| `icon-right` | String | `''` | Material Icons | Ícone à direita |
| `icon-remove` | String | `'cancel'` | Material Icons | Ícone do botão remover |
| `icon-selected` | String | `'check'` | Material Icons | Ícone quando selecionado |
| `variant` | String | `'filled'` | `filled`, `outline`, `flat` | Variante visual |
| `color` | String | `'primary'` | `primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info`, `grey` | Cor do chip |
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg` | Tamanho do chip |

### Props de Forma

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `round` | Boolean | `true` | Bordas completamente arredondadas (pill shape) |
| `square` | Boolean | `false` | Bordas quadradas (border-radius pequeno) |

### Props de Estado

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `selected` | Boolean | `false` | Estado de seleção |
| `disable` | Boolean | `false` | Desabilita o chip |
| `clickable` | Boolean | `false` | Torna o chip clicável |
| `removable` | Boolean | `false` | Exibe botão de remoção |
| `dense` | Boolean | `false` | Versão compacta |

### Props de Interação

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `ripple` | Boolean | `true` | Efeito ripple Material Design |
| `tabindex` | Number \| String | `null` | Ordem de navegação por teclado |

### Props de Brandabilidade (Exclusivo DSS)

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Acessibilidade

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `aria-label` | String | - | Label ARIA (obrigatório para chips icon-only) |
| `remove-aria-label` | String | `'Remover'` | Aria-label do botão de remoção |

### Eventos

| Event | Payload | Quando Emitido | Descrição |
|-------|---------|----------------|-----------|
| `@click` | `MouseEvent` | Ao clicar no chip | Requer `clickable`, não emite se `disable` |
| `@remove` | `MouseEvent` | Ao clicar no botão remover | Requer `removable` |
| `@update:selected` | `Boolean` | Ao alternar seleção | Requer `clickable`, emite novo valor de selected |

### Slots

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteúdo principal do chip | Label com formatação HTML customizada |
| `icon` | Ícone customizado à esquerda | SVG, Font Awesome, Ionicons |
| `icon-right` | Ícone customizado à direita | SVG, Font Awesome, Ionicons |
| `icon-remove` | Ícone do botão remover | SVG customizado |

---

## 6. Estados

### Tabela Única de Estados

| Estado | Aparência | Interação | Tokens Aplicados | Notas |
|--------|-----------|-----------|------------------|-------|
| **Default** | Background cor base, texto branco/contrastante | Hover se clickable | `bg-{color}`, `text-white` | Estado padrão |
| **Hover** | Background escurece (filled) ou clareia (outline/flat) | Clique habilitado | `filter: brightness()` | Transição 200ms |
| **Focus** | Focus ring visível (3px, offset 2px) | Navegação por teclado | `--dss-focus-ring` | WCAG 2.4.7 AA |
| **Active** | Background mais escuro, "afunda" visualmente | Clique em progresso | `filter: brightness(0.85-0.9)` | Feedback tátil |
| **Disabled** | Opacidade 0.4, cursor not-allowed | Interações bloqueadas | `--dss-opacity-disabled` | `aria-disabled="true"` |
| **Selected** | Box-shadow inset, ícone de check (opcional) | Toggle via clique | Variante-específico | `aria-selected="true"` |
| **Clickable** | Cursor pointer, hover effects | Clique habilitado | - | Requer prop `clickable` |

### Diagramas de Transição

```
Default ──hover──> Hover ──click──> Active ──release──> Hover ──leave──> Default
   │
   └──:selected="true"──> Selected (visual distinto)
   │
   └──:disable="true"──> Disabled (sem transição de volta automática)
```

---

## 7. Variantes

### Filled (Padrão)

**Descrição:** Chip preenchido com background sólido.

**Características Técnicas:**
- Background: Cor base via classe utilitária (`bg-primary`)
- Texto: Cor contrastante (`text-white`)
- Hover: `filter: brightness(0.92)`
- Uso: Tags de destaque, categorias principais

**Exemplo:**
```vue
<DssChip variant="filled" color="primary" label="Filled Chip" />
```

---

### Outline

**Descrição:** Chip com borda e **background transparente**.

**Características Técnicas:**
- Base: `background-color: transparent` + borda colorida
- Texto: Cor principal via `text-{color}`
- Hover: Background preenche com cor, texto fica branco
- Borda: `2px solid currentColor`
- Compatível com dark mode

**Exemplo:**
```vue
<DssChip variant="outline" color="primary" label="Outline Chip" />
```

---

### Flat

**Descrição:** Chip plano com **background transparente**, sem borda.

**Características Técnicas:**
- Base: `background-color: transparent`, sem borda
- Texto: Cor principal via `text-{color}`
- Hover: Background sutil com `currentColor` e opacity
- Compatível com dark mode

**Exemplo:**
```vue
<DssChip variant="flat" color="primary" label="Flat Chip" />
```

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssChip suporta **duas formas** de aplicar brandabilidade:

#### Método 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop.

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssChip brand="hub" class="dss-chip--primary" label="Hub Tag" />

  <!-- Water (Azul) -->
  <DssChip brand="water" class="dss-chip--primary" label="Water Tag" />

  <!-- Waste (Verde) -->
  <DssChip brand="waste" class="dss-chip--primary" label="Waste Tag" />
</template>
```

**Quando usar:**
- ✅ Chips individuais com brand específica
- ✅ Controle granular por componente
- ✅ Não depende de contexto DOM

#### Método 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os chips filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssChip class="dss-chip--primary" label="Hub" />
    <DssChip class="dss-chip--secondary" label="Outro Hub" />
  </div>
</template>
```

**Quando usar:**
- ✅ Seções inteiras da aplicação com mesma brand
- ✅ Layouts multi-brand
- ✅ Menos código repetitivo

**⚠️ Prioridade:** Se ambos estiverem presentes, a prop `brand` tem prioridade sobre `data-brand`.

### Paletas de Cores por Brand

> Para detalhes das paletas de cores por brand (Hub, Water, Waste), consulte [`DSS_TOKEN_REFERENCE.md - Seção 2.2 Brand Palettes`](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes).

**Comportamento de Hover por Brand:**
- **Filled**: Cor base com `brightness(0.92)` no hover
- **Outline/Flat**: Texto colorido, hover inverte para background colorido + texto branco

**Fallback quando nenhum brand está definido:**
- O componente usa classes utilitárias (`bg-{color}`, `text-{color}`) com cores semânticas padrão

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

#### ✅ Critérios Atendidos

| Critério WCAG | Nível | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Mínimo)** | AA | Combinações de cores com contraste ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Navegável por teclado (Tab, Enter, Space) |
| **2.4.7 Foco Visível** | AA | Focus rings com 3px e contraste adequado |
| **2.5.5 Tamanho do Alvo** | AAA | Touch targets adequados por size |
| **4.1.2 Nome, Função, Valor** | A | ARIA labels e estados corretos |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| **Tab** | Move o foco para o próximo chip |
| **Shift + Tab** | Move o foco para o chip anterior |
| **Enter** | Ativa o chip (se clickable) |
| **Space** | Ativa o chip (se clickable) |

### ARIA Labels Obrigatórios

**⚠️ CRÍTICO:** Chips com ícone apenas **DEVEM** ter `aria-label`:

```vue
<!-- ✅ CORRETO -->
<DssChip icon="star" color="warning" aria-label="Favorito" />

<!-- ❌ INCORRETO - Leitores de tela não saberão o que o chip representa -->
<DssChip icon="star" color="warning" />
```

### Estados ARIA

O componente aplica automaticamente:

```html
<!-- Disabled -->
<div role="option" aria-disabled="true">...</div>

<!-- Selected -->
<div role="option" aria-selected="true">...</div>

<!-- Botão de remoção -->
<button aria-label="Remover">×</button>
```

### 🧪 Testado Com

- ✅ **Navegação por teclado** (Tab, Enter, Space)
- ✅ **High contrast mode** (Windows)
- ✅ **prefers-reduced-motion** (desabilita animações)
- ✅ **Forced colors** (Windows High Contrast)

---

## 10. Exemplos de Uso

### Instalação

```javascript
import { DssChip } from '@/dss/components'
```

### Uso Básico

```vue
<template>
  <DssChip label="Tag simples" color="primary" />
</template>
```

### Com Props

```vue
<template>
  <DssChip
    label="JavaScript"
    color="warning"
    icon="code"
    size="sm"
  />
</template>
```

### Cores Disponíveis

```vue
<template>
  <DssChip color="primary" label="Primary" />
  <DssChip color="secondary" label="Secondary" />
  <DssChip color="accent" label="Accent" />
  <DssChip color="positive" label="Positive" />
  <DssChip color="negative" label="Negative" />
  <DssChip color="warning" label="Warning" />
  <DssChip color="info" label="Info" />
</template>
```

### Tamanhos

```vue
<template>
  <DssChip size="xs" label="Extra Small" />
  <DssChip size="sm" label="Small" />
  <DssChip size="md" label="Medium (padrão)" />
  <DssChip size="lg" label="Large" />
</template>
```

### Ícones

```vue
<template>
  <!-- Ícone à esquerda -->
  <DssChip icon="star" label="Favorito" color="warning" />

  <!-- Ícone à direita -->
  <DssChip icon-right="arrow_forward" label="Próximo" color="primary" />

  <!-- Ambos os lados -->
  <DssChip icon="mail" icon-right="send" label="Email" color="info" />

  <!-- Ícone apenas (REQUER aria-label) -->
  <DssChip icon="settings" color="secondary" aria-label="Configurações" />
</template>
```

### Chips Selecionáveis

```vue
<template>
  <DssChip
    v-for="filter in filters"
    :key="filter.id"
    :label="filter.label"
    color="primary"
    variant="outline"
    clickable
    :selected="filter.selected"
    icon-selected="check"
    @update:selected="filter.selected = $event"
  />
</template>

<script setup>
import { ref } from 'vue'

const filters = ref([
  { id: 1, label: 'Todos', selected: true },
  { id: 2, label: 'Ativos', selected: false },
  { id: 3, label: 'Arquivados', selected: false },
])
</script>
```

### Chips Removíveis

```vue
<template>
  <DssChip
    v-for="tag in tags"
    :key="tag"
    :label="tag"
    color="primary"
    removable
    @remove="removeTag(tag)"
  />
</template>

<script setup>
import { ref } from 'vue'

const tags = ref(['Vue.js', 'TypeScript', 'Quasar'])

function removeTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>
```

### Input de Tags

```vue
<template>
  <div class="tag-input">
    <DssChip
      v-for="tag in tags"
      :key="tag"
      :label="tag"
      color="secondary"
      variant="outline"
      removable
      size="sm"
      @remove="removeTag(tag)"
    />
    <input
      v-model="newTag"
      placeholder="Adicionar tag..."
      @keydown.enter="addTag"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref(['design-system', 'vue'])
const newTag = ref('')

function addTag() {
  if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
    tags.value.push(newTag.value.trim())
    newTag.value = ''
  }
}

function removeTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>
```

---

## 11. Anti-patterns

### ❌ Usos Incorretos

#### 1. Ícone-Only Sem `aria-label`

**Problema:** Leitores de tela não conseguem descrever o chip.

```vue
<!-- ❌ INCORRETO -->
<DssChip icon="star" color="warning" />

<!-- ✅ CORRETO -->
<DssChip icon="star" color="warning" aria-label="Favorito" />
```

**Por quê:** WCAG 4.1.2 exige que todos os elementos interativos tenham nome acessível.

---

#### 2. Sobrescrever CSS Sem Usar Tokens

**Problema:** Quebra a consistência do Design System.

```vue
<!-- ❌ INCORRETO -->
<DssChip style="background: #ff0000 !important;" label="Vermelho" />

<!-- ✅ CORRETO -->
<DssChip color="negative" label="Vermelho" />
```

**Por quê:** Sobrescrever estilos diretamente bypassa tokens e temas.

---

#### 3. Usar Chip como Botão de Ação Principal

**Problema:** Chips são para informação/seleção, não para CTAs.

```vue
<!-- ❌ INCORRETO -->
<DssChip clickable label="Salvar Documento" color="positive" />

<!-- ✅ CORRETO -->
<DssButton color="positive">Salvar Documento</DssButton>
```

**Por quê:** Use `DssButton` para ações primárias.

---

#### 4. Usar Chip como Badge Numérico

**Problema:** Chips têm semântica de tag, não de contador.

```vue
<!-- ❌ INCORRETO -->
<DssChip label="5" color="negative" />

<!-- ✅ CORRETO -->
<DssBadge color="negative">5</DssBadge>
```

**Por quê:** Use `DssBadge` para contadores e notificações.

---

#### 5. Chips Removíveis Sem Confirmação

**Problema:** Remoção acidental sem feedback.

```vue
<!-- ❌ INCORRETO - Remove sem confirmação em dados críticos -->
<DssChip
  label="Arquivo Importante"
  removable
  @remove="deleteFile"
/>

<!-- ✅ CORRETO - Confirmação antes de ação destrutiva -->
<DssChip
  label="Arquivo Importante"
  removable
  @remove="confirmDelete"
/>
```

**Por quê:** Ações destrutivas devem ter confirmação.

---

#### 6. Muitos Chips Clickables em Sequência

**Problema:** Confusão sobre o que é selecionável.

```vue
<!-- ❌ INCORRETO - Todos os chips parecem iguais -->
<DssChip clickable label="Opção A" />
<DssChip clickable label="Opção B" />
<DssChip label="Info" />  <!-- Este não é clicável -->

<!-- ✅ CORRETO - Diferenciar visualmente -->
<DssChip clickable variant="outline" label="Opção A" />
<DssChip clickable variant="outline" label="Opção B" />
<DssChip variant="filled" label="Info" />
```

**Por quê:** Diferenciar chips interativos de informativos.

---

### 🚫 Combinações Não Permitidas

| Combinação | Por quê | Alternativa |
|------------|---------|-------------|
| `disabled` + `clickable` ativo | Estados conflitantes | Use apenas `disabled` |
| `round` + `square` | Formas conflitantes | Use apenas um |
| `removable` sem `@remove` handler | Botão não funcional | Sempre handle o evento |

---

## 12. Governança do Componente

### O Que É Extensão Válida

**✅ Permitido SEM aprovação:**
- Uso de props públicas documentadas
- Combinação de props dentro das regras
- Customização via tokens CSS (`--dss-*`)
- Uso de slots para conteúdo customizado
- Aplicação de brands via prop ou contexto

**Exemplo:**
```vue
<DssChip
  brand="hub"
  size="lg"
  variant="outline"
  icon="star"
  clickable
  @click="handleClick"
>
  <template #icon>
    <CustomSVG />
  </template>
  Meu Chip
</DssChip>
```

---

### O Que Exige Novo Componente

**⚠️ Requer discussão com Design System:**
- Adicionar nova variante visual (ex: `variant="gradient"`)
- Adicionar nova cor semântica além das existentes
- Modificar comportamento de estados
- Criar wrapper especializado (ex: `DssChipGroup`, `DssFilterChip`)

---

### O Que É Proibido

**🚫 NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar código-fonte do componente diretamente sem PR
- Criar "forks" locais do componente
- Ignorar warnings de acessibilidade
- Bypassar sistema de brandabilidade com CSS inline

---

### Quem Decide

| Tipo de Mudança | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop pública** | Equipe de Design + DSS | RFC + aprovação |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migração planejada |

---

## 13. Troubleshooting

### Problema: Chip não responde ao clique

**Causa:** Chip não tem prop `clickable`.

**Solução:**
```vue
<DssChip
  clickable
  @click="handleClick"
  label="Clicável"
/>
```

---

### Problema: Cores não mudam com `data-brand`

**Causa 1:** `data-brand` não está em um elemento pai.

**Solução:**
```vue
<!-- ❌ INCORRETO -->
<DssChip data-brand="hub" label="Hub" />

<!-- ✅ CORRETO -->
<div data-brand="hub">
  <DssChip class="dss-chip--primary" label="Hub" />
</div>
```

**Causa 2:** Falta classe de cor específica da brand.

**Solução:** Adicione `class="dss-chip--primary"` etc.

---

### Problema: Ícones não aparecem

**Causa:** Material Icons não está carregada.

**Solução:**
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

### Problema: Focus ring não aparece

**Causa:** CSS global removendo outline.

**Solução:** Não sobrescreva `outline` do componente.

---

### Problema: Evento remove não dispara

**Causa:** Faltando prop `removable`.

**Solução:**
```vue
<DssChip
  removable
  @remove="handleRemove"
  label="Removível"
/>
```

---

## 📋 Recursos

- [Documentação Oficial do Quasar QChip](https://quasar.dev/vue-components/chip)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Icons](https://fonts.google.com/icons)
- [Design System Sansys - Tokens](../../../tokens/)

---

## 📝 Licença

Propriedade da Jtech

---

**Última atualização:** Janeiro 2025
**Versão:** DSS v2.2.0
**Status:** 📦 Componente Base
**Changelog:** Ver [DOCUMENTATION_CHANGELOG.md](./DOCUMENTATION_CHANGELOG.md)
