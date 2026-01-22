# DssInput

**Design System Sansys - Componente de Input Universal**

> **Golden Sample de Documentação DSS**
> Este documento segue o Template 13.1 oficial para documentação de componentes do Design System Sansys.
> Estrutura obrigatória: 13 seções padronizadas com tokens rastreáveis, anti-patterns e governança.

---

## 1. Visão Geral

### Nome do Componente
`DssInput`

### Descrição
Wrapper DSS baseado no QInput, com API pública governada pelo DSS. Componente de campo de entrada de texto completo com suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Básico** - Wrapper DSS que encapsula funcionalidades do Quasar Framework, expondo apenas a API aprovada pelo Design System.

### Características Principais

- **Acessibilidade WCAG 2.1 AA completa** - Touch targets 56px, focus rings, navegação por teclado, ARIA completo, IDs únicos automáticos
- **Brandabilidade multi-marca** - Suporte automático a Hub, Water, Waste
- **4 variantes visuais** - Outlined, Filled, Standout, Borderless com estados de hover documentados
- **Estados interativos robustos** - Loading com spinner, disabled, readonly, error, focus
- **Floating label inteligente** - Label flutua automaticamente ou fica fixo (stackLabel)
- **Clearable** - Botão de limpar com acessibilidade completa
- **TypeScript + Composition API** - Totalmente tipado com composables reutilizáveis
- **API governada pelo DSS** - Subconjunto curado das props do QInput + extensões DSS exclusivas

### Classificação de Recursos

| Categoria | Recursos | Significado |
|-----------|----------|-------------|
| ✅ **Recomendado** | `label`, `variant`, `error` + `errorMessage`, `brand`, IDs únicos, ARIA | Padrões estabelecidos pelo DSS - USE sempre que aplicável |
| 🔶 **Opcional** | `clearable`, `dense`, `loading`, `stackLabel`, `hint`, slots | Funcionalidades disponíveis - USE conforme necessidade do caso de uso |
| ⛔ **Fora de escopo DSS** | Máscaras, validação automática, autogrow, debounce | Funcionalidades NÃO governadas pelo DSS - implemente externamente se necessário |

> **Nota:** Esta classificação reflete a **governança do DSS**, não limitações técnicas. Recursos "fora de escopo" podem ser implementados via wrappers ou diretivas externas.

---

## 2. Quando Usar / Quando Não Usar

### Quando Usar

- **Formulários de cadastro**: Nome, email, senha, telefone
- **Campos de busca**: Pesquisa com clearable
- **Entrada de dados**: CPF, CNPJ, valores monetários
- **Campos de texto curto**: Títulos, descrições breves
- **Login/Autenticação**: Username, senha
- **Filtros**: Campos de filtro em tabelas e listas
- **Edição inline**: Campos editáveis em cards/listas

### Quando NÃO Usar

- **Textos longos/multiline**: Use `DssTextarea`
- **Seleção de opções predefinidas**: Use `DssSelect`
- **Data/hora**: Use `DssDatePicker` / `DssTimePicker`
- **Valores booleanos**: Use `DssCheckbox` ou `DssToggle`
- **Upload de arquivos**: Use `DssFileInput`
- **Slider de valores numéricos**: Use `DssSlider`
- **Campos com autocomplete complexo**: Use `DssAutocomplete`

---

## 3. Anatomia do Componente

### Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│ [before]                                                    │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [prepend]  ┌────────────────────────┐  [append/clear/⟳] │ │
│ │            │ Label (floating)       │                   │ │
│ │            │ Input value here___    │                   │ │
│ │            └────────────────────────┘                   │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ [after]                                                     │
├─────────────────────────────────────────────────────────────┤
│ Hint text ou Error message                                  │
└─────────────────────────────────────────────────────────────┘
```

### Partes Internas

1. **Wrapper (`.dss-input`)**: Container principal com estados
2. **Before (`.dss-input__before`)**: Conteúdo antes do field (slot)
3. **Field (`.dss-input__field`)**: Container do input com borda/background
4. **Prepend (`.dss-input__prepend`)**: Ícone/conteúdo à esquerda dentro do field
5. **Control (`.dss-input__control`)**: Área do input + label
6. **Label (`.dss-input__label`)**: Label flutuante ou fixo
7. **Native Input (`.dss-input__native`)**: Elemento `<input>` nativo
8. **Append (`.dss-input__append`)**: Ícone/conteúdo à direita dentro do field
9. **Clear Button (`.dss-input__clear`)**: Botão de limpar (quando clearable)
10. **Loading Spinner (`.dss-input__loading`)**: Indicador de carregamento
11. **After (`.dss-input__after`)**: Conteúdo depois do field (slot)
12. **Bottom (`.dss-input__bottom`)**: Container para hint/error
13. **Hint (`.dss-input__hint`)**: Texto de ajuda
14. **Error (`.dss-input__error`)**: Mensagem de erro

### Slots Disponíveis

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `label` | Label customizado | HTML formatado na label |
| `before` | Conteúdo antes do field wrapper | Ícones externos, badges |
| `prepend` | Conteúdo dentro do field, à esquerda | Ícones de contexto (email, phone) |
| `append` | Conteúdo dentro do field, à direita | Botões de ação, ícones |
| `after` | Conteúdo depois do field wrapper | Botões auxiliares |
| `error` | Mensagem de erro customizada | Validação complexa |
| `hint` | Texto de ajuda customizado | Dicas formatadas |

### Subcomponentes DSS Utilizados

**Nenhum** - DssInput é um componente atômico que não depende de outros componentes DSS.

**Dependências externas:**
- Vue 3 (Composition API)
- Material Icons (recomendado para ícones em slots)

---

## 4. Tokens Utilizados

O **DssInput** consome tokens de **múltiplas categorias** do Design System Sansys. Para garantir manutenibilidade e evitar duplicação de documentação, consulte o catálogo completo de tokens:

### Referência Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

### Categorias de Tokens Consumidas

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no DssInput |
|-----------|---------------|----------------|------------------------|
| **Cores Semânticas** | `--dss-action-primary`, `--dss-error-600`, `--dss-error-900` | [Seção 2.3 - Cores Semânticas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Focus ring, estados de erro |
| **Cores de Texto** | `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-disabled`, `--dss-text-inverse` | [Seção 2.3](../../../docs/reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Label, placeholder, hint, input text |
| **Cores Neutras** | `--dss-gray-50` a `--dss-gray-900` | [Seção 2.1 - Neutral Palette](../../../docs/reference/DSS_TOKEN_REFERENCE.md#21-neutral-palette) | Backgrounds (filled, standout), borders |
| **Brands** | `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` (100-800) | [Seção 2.2 - Brand Palettes](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Focus ring por brand, borders |
| **Espaçamento** | `--dss-spacing-1` a `--dss-spacing-14` | [Seção 1.1 - Escala Base](../../../docs/reference/DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno, gaps, min-height (56px = spacing-14) |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-size-xl`, `--dss-line-height-normal` | [Seção 6 - Tipografia](../../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Label (sm), input text (md), error/hint (sm) |
| **Bordas** | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-radius-md`, `--dss-radius-full` | [Seção 8 - Bordas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#8-bordas) | Border do field, radius, clear button |
| **Acessibilidade** | `--dss-focus-ring`, `--dss-focus-primary` | [Seção 7.1 - Focus](../../../docs/reference/DSS_TOKEN_REFERENCE.md#71-focus-configurações-base) | Focus ring (WCAG 2.4.7) |
| **Motion** | `--dss-transition-normal`, `--dss-transition-fast` | [Seção 5 - Motion](../../../docs/reference/DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transições de focus, hover, label float |
| **Opacidade** | `--dss-opacity-disabled` (0.6) | [Seção 2.4 - Opacidade](../../../docs/reference/DSS_TOKEN_REFERENCE.md#24-opacidade) | Estado disabled |

### Observações Importantes

- **Tokens Protegidos**: Tokens de acessibilidade (`--dss-focus-*`) **NÃO devem** ser sobrescritos fora do DSS
- **Brandabilidade**: Quando `brand` ou `data-brand` é aplicado, cores de focus mudam automaticamente
- **Touch Target**: Min-height de 56px (`--dss-spacing-14`) garante WCAG 2.5.5 AAA
- **Fallback**: Na ausência de `brand`, o sistema usa `--dss-action-primary` para focus

### Links Rápidos

- [Token Guidelines (Filosofia e Uso)](../../../docs/reference/DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catálogo Completo)](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## 5. API Pública

### Props de Model

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | String \| Number | `''` | Valor do input (v-model) |

### Props Visuais

| Prop | Type | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | String | `'outlined'` | `outlined`, `filled`, `standout`, `borderless` | Variante visual |
| `type` | String | `'text'` | `text`, `password`, `email`, `number`, `tel`, `url`, `search`, `date`, `time`, `datetime-local` | Tipo HTML do input |
| `dense` | Boolean | `false` | - | Versão compacta (menor altura) |
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Conteúdo

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `label` | String | `''` | Label flutuante do input |
| `stackLabel` | Boolean | `false` | Label sempre fixo no topo (não flutua) |
| `placeholder` | String | `''` | Texto de placeholder |
| `hint` | String | `''` | Texto de ajuda abaixo do input |
| `errorMessage` | String | `''` | Mensagem de erro abaixo do input |

### Props de Estado

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `error` | Boolean | `false` | Estado de erro (borda vermelha) |
| `disabled` | Boolean | `false` | Input desabilitado |
| `readonly` | Boolean | `false` | Input somente leitura |
| `loading` | Boolean | `false` | Exibe spinner de carregamento |
| `required` | Boolean | `false` | Campo obrigatório (aria-required) |

### Props de Features

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `clearable` | Boolean | `false` | Exibe botão de limpar quando há valor |

### Props de Acessibilidade

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Label ARIA customizado para screen readers |
| `clearAriaLabel` | String | `'Clear input'` | Label ARIA do botão de limpar |
| `tabindex` | Number \| String | `null` | Tabindex customizado |

### Eventos

| Event | Payload | Quando Emitido | Descrição |
|-------|---------|----------------|-----------|
| `update:modelValue` | `string` | Ao digitar | Evento v-model |
| `focus` | `FocusEvent` | Ao focar | Input recebeu foco |
| `blur` | `FocusEvent` | Ao perder foco | Input perdeu foco |
| `clear` | - | Ao limpar | Botão clear clicado |

### Slots

| Slot | Descrição | Uso Recomendado |
|------|-----------|-----------------|
| `label` | Label customizado | Label com formatação HTML |
| `before` | Antes do field wrapper | Ícones/badges externos |
| `prepend` | Dentro do field, à esquerda | Ícones de contexto |
| `append` | Dentro do field, à direita | Botões de ação |
| `after` | Depois do field wrapper | Botões auxiliares |
| `error` | Mensagem de erro | Validação customizada |
| `hint` | Texto de ajuda | Dicas formatadas |

### Expose (Ref)

| Method/Ref | Type | Descrição |
|------------|------|-----------|
| `focus()` | `() => void` | Foca no input programaticamente |
| `blur()` | `() => void` | Remove foco do input |
| `inputRef` | `Ref<HTMLInputElement \| null>` | Referência direta ao input nativo |

---

## 6. Estados

### Tabela Única de Estados

| Estado | Aparência | Interação | Tokens Aplicados | Notas |
|--------|-----------|-----------|------------------|-------|
| **Default** | Borda cinza (outlined) ou fundo (filled), label na posição inicial | Focável, editável | `--dss-gray-400`, `--dss-text-primary` | Estado inicial |
| **Hover** | Borda ligeiramente mais escura | Cursor pointer no clear | `--dss-gray-500` | Feedback visual sutil |
| **Focus** | Borda azul, box-shadow, label flutua para cima | Editando ativamente | `--dss-action-primary`, `--dss-focus-ring` | WCAG 2.4.7 AA |
| **Filled (com valor)** | Label flutuante no topo, valor visível | Clearable se habilitado | - | Label permanece no topo |
| **Error** | Borda vermelha, mensagem de erro visível | Editável para correção | `--dss-error-600`, `--dss-error-900` | `role="alert"` no error |
| **Disabled** | Opacidade 0.6, borda pontilhada, cursor not-allowed | Não focável, não editável | `--dss-opacity-disabled` | `aria-disabled="true"` |
| **Readonly** | Aparência normal, sem edição | Focável, selecionável, não editável | - | `aria-readonly="true"` |
| **Loading** | Spinner no append, pointer-events desabilitado | Não editável temporariamente | - | `aria-busy="true"` |

### Diagrama de Transição

```
                    ┌──────────────┐
                    │   Default    │
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │  Hover   │   │  Focus   │   │ Disabled │
     └────┬─────┘   └────┬─────┘   └──────────┘
          │              │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────┐
          │  Filled  │ ◄─── Tem valor
          └────┬─────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌──────────┐     ┌──────────┐
│  Valid   │     │  Error   │
└──────────┘     └──────────┘
```

### Prioridade de Estados

1. **Disabled** - Sobrepõe todos (não pode ter focus, error, etc.)
2. **Loading** - Sobrepõe interações (input desabilitado temporariamente)
3. **Readonly** - Permite focus, não permite edição
4. **Error** - Visual de erro, permite edição
5. **Focus** - Quando focado ativamente
6. **Filled** - Quando tem valor (label flutua)
7. **Default** - Estado base

---

## 7. Variantes

### Outlined (Padrão)

**Descrição:** Input com borda completa ao redor. Padrão do Quasar Framework.

**Características Técnicas:**
- Background: `transparent`
- Borda: `1px solid var(--dss-gray-400)`
- Focus: Borda azul (`--dss-action-primary`) + box-shadow
- Label: Flutua sobre a borda superior quando focado/preenchido

**Quando usar:**
- Formulários padrão
- Campos em fundos claros
- Quando precisa de destaque visual claro

**Exemplo:**
```vue
<DssInput
  v-model="email"
  variant="outlined"
  label="Email"
  type="email"
/>
```

---

### Filled

**Descrição:** Input com fundo sólido e borda inferior.

**Características Técnicas:**
- Background: `var(--dss-gray-50)` (light) / `var(--dss-gray-800)` (dark)
- Borda: Apenas inferior (`border-bottom`)
- Focus: Background escurece ligeiramente, borda azul
- Elevação: Sutil diferença de profundidade

**Quando usar:**
- Formulários com muitos campos
- Quando quer visual mais denso
- Cards e containers com fundo

**Exemplo:**
```vue
<DssInput
  v-model="username"
  variant="filled"
  label="Username"
/>
```

---

### Standout

**Descrição:** Input com alto contraste, ideal para toolbars e headers.

**Características Técnicas:**
- Background: `var(--dss-gray-800)` (escuro)
- Texto: `var(--dss-text-inverse)` (branco)
- Borda: `2px solid` com cor de destaque
- Focus: Borda mais clara, maior contraste

**Quando usar:**
- Toolbars e headers
- Áreas de destaque
- Fundos escuros
- Campos de busca em navegação

**Exemplo:**
```vue
<DssInput
  v-model="search"
  variant="standout"
  placeholder="Buscar..."
  clearable
/>
```

---

### Borderless

**Descrição:** Input sem bordas, visual minimalista.

**Características Técnicas:**
- Background: `transparent`
- Borda: Nenhuma (apenas underline no focus)
- Focus: Underline aparece (`border-bottom`)
- Integração: Visual limpo, integra-se ao fundo

**Quando usar:**
- Edição inline
- Tabelas editáveis
- Quando bordas são desnecessárias
- Integração visual com cards

**Exemplo:**
```vue
<DssInput
  v-model="title"
  variant="borderless"
  placeholder="Digite o título..."
/>
```

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssInput suporta **duas formas** de aplicar brandabilidade:

#### Método 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop.

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssInput brand="hub" label="Campo Hub" />

  <!-- Water (Azul) -->
  <DssInput brand="water" label="Campo Water" />

  <!-- Waste (Verde) -->
  <DssInput brand="waste" label="Campo Waste" />
</template>
```

**Quando usar:**
- Campos individuais com brand específica
- Controle granular por componente
- Não depende de contexto DOM

#### Método 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os inputs filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssInput label="Email" />
    <DssInput label="Senha" type="password" />
  </div>

  <!-- Todos os inputs filhos herdam brand Water -->
  <section data-brand="water">
    <DssInput label="Consumo" type="number" />
  </section>
</template>
```

**Quando usar:**
- Formulários inteiros com mesma brand
- Seções da aplicação com brand específica
- Menos código repetitivo

**Prioridade:** Prop `brand` > `data-brand`

### Cores de Focus por Brand

| Brand | Base State | Focus State |
|-------|------------|-------------|
| **Sem brand** | `--dss-gray-400` | `--dss-action-primary` |
| **Hub** | `--dss-gray-400` | `--dss-hub-600` |
| **Water** | `--dss-gray-400` | `--dss-water-500` |
| **Waste** | `--dss-gray-400` | `--dss-waste-600` |

### Exemplo Visual

```vue
<template>
  <div class="brand-showcase">
    <!-- Formulário Hub -->
    <form data-brand="hub">
      <DssInput label="Nome" v-model="name" />
      <DssInput label="Email" v-model="email" type="email" />
      <!-- Focus ring será laranja (hub-600) -->
    </form>

    <!-- Campo específico Water -->
    <DssInput
      brand="water"
      label="Leitura do Hidrômetro"
      v-model="reading"
      type="number"
    />
    <!-- Focus ring será azul (water-500) -->
  </div>
</template>
```

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

#### Critérios Atendidos

| Critério WCAG | Nível | Como Implementado |
|---------------|-------|-------------------|
| **1.3.1 Info and Relationships** | A | Labels conectados via `for`/`id`, `aria-describedby` para hints |
| **1.3.5 Identify Input Purpose** | AA | Atributo `type` indica propósito (email, tel, etc.) |
| **1.4.3 Contraste (Mínimo)** | AA | Texto e bordas com contraste ≥ 4.5:1 |
| **2.1.1 Teclado** | A | Totalmente navegável por teclado |
| **2.4.6 Headings and Labels** | AA | Labels descritivos e únicos |
| **2.4.7 Foco Visível** | AA | Focus ring de 3px com contraste adequado |
| **2.5.5 Tamanho do Alvo** | AAA | Touch target de 56px (48px mínimo) |
| **3.3.1 Identificação de Erro** | A | Erros identificados com `role="alert"` |
| **3.3.2 Labels ou Instruções** | A | Labels, placeholders e hints disponíveis |
| **4.1.2 Nome, Função, Valor** | A | ARIA completo (label, invalid, busy, etc.) |

### IDs Únicos Automáticos

Cada instância do DssInput gera IDs únicos automaticamente:

```html
<!-- Gerado automaticamente -->
<label id="dss-input-label-abc123" for="dss-input-abc123">Email</label>
<input
  id="dss-input-abc123"
  aria-labelledby="dss-input-label-abc123"
  aria-describedby="dss-input-hint-abc123"
/>
<div id="dss-input-hint-abc123">Digite seu email corporativo</div>
```

### ARIA Attributes Implementados

| Atributo | Quando Aplicado | Valor |
|----------|-----------------|-------|
| `aria-label` | Sempre (se prop fornecida) | Prop `ariaLabel` |
| `aria-labelledby` | Quando tem label | ID da label |
| `aria-describedby` | Quando tem hint ou error | ID do hint/error |
| `aria-invalid` | Quando `error=true` | `"true"` |
| `aria-busy` | Quando `loading=true` | `"true"` |
| `aria-disabled` | Quando `disabled=true` | `"true"` |
| `aria-readonly` | Quando `readonly=true` | `"true"` |
| `aria-required` | Quando `required=true` | `"true"` |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| **Tab** | Move foco para o input |
| **Shift + Tab** | Move foco para elemento anterior |
| **Enter** | Submit do formulário (se em form) |
| **Escape** | Pode ser usado para blur (implementação opcional) |

### Error Messages Acessíveis

```vue
<DssInput
  v-model="email"
  label="Email"
  :error="!isValid"
  error-message="Email inválido. Use o formato nome@empresa.com"
/>

<!-- Gera -->
<div
  id="dss-input-error-xyz789"
  class="dss-input__error"
  role="alert"
  aria-live="assertive"
>
  Email inválido. Use o formato nome@empresa.com
</div>
```

### Testado Com

- NVDA (Windows) - Leitor de tela
- VoiceOver (macOS/iOS) - Leitor de tela
- Navegação por teclado (Tab, Enter)
- High contrast mode (Windows)
- Zoom 200%/300% (sem quebra de layout)
- `prefers-reduced-motion` (animações respeitam)

---

## 10. Exemplos de Uso

### Instalação

```typescript
import { DssInput } from '@/dss/components/base/DssInput'
import type { InputProps, InputExpose } from '@/dss/components/base/DssInput/types/input.types'
```

### Uso Básico

```vue
<template>
  <DssInput
    v-model="name"
    label="Nome completo"
    placeholder="Digite seu nome"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>
```

### Todas as Variantes

```vue
<template>
  <DssInput v-model="v1" variant="outlined" label="Outlined (padrão)" />
  <DssInput v-model="v2" variant="filled" label="Filled" />
  <DssInput v-model="v3" variant="standout" label="Standout" />
  <DssInput v-model="v4" variant="borderless" label="Borderless" />
</template>
```

### Tipos de Input

```vue
<template>
  <DssInput v-model="text" type="text" label="Texto" />
  <DssInput v-model="email" type="email" label="Email" />
  <DssInput v-model="password" type="password" label="Senha" />
  <DssInput v-model="number" type="number" label="Número" />
  <DssInput v-model="tel" type="tel" label="Telefone" />
  <DssInput v-model="date" type="date" label="Data" />
  <DssInput v-model="search" type="search" label="Busca" clearable />
</template>
```

### Com Validação de Erro

```vue
<template>
  <DssInput
    v-model="email"
    type="email"
    label="Email"
    :error="!isValidEmail"
    error-message="Por favor, insira um email válido"
    hint="Usaremos este email para comunicações importantes"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const isValidEmail = computed(() => {
  if (!email.value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})
</script>
```

### Com Ícones (Slots)

```vue
<template>
  <!-- Ícone de email à esquerda -->
  <DssInput v-model="email" label="Email">
    <template #prepend>
      <span class="material-icons">email</span>
    </template>
  </DssInput>

  <!-- Toggle de senha à direita -->
  <DssInput
    v-model="password"
    :type="showPassword ? 'text' : 'password'"
    label="Senha"
  >
    <template #append>
      <button
        type="button"
        @click="showPassword = !showPassword"
        :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
      >
        <span class="material-icons">
          {{ showPassword ? 'visibility_off' : 'visibility' }}
        </span>
      </button>
    </template>
  </DssInput>
</template>
```

### Clearable com Loading

```vue
<template>
  <DssInput
    v-model="search"
    label="Buscar"
    placeholder="Digite para pesquisar..."
    clearable
    :loading="isSearching"
    @update:modelValue="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
const isSearching = ref(false)

const handleSearch = async (value: string) => {
  if (!value) return
  isSearching.value = true
  await fetchResults(value)
  isSearching.value = false
}
</script>
```

### Brandability

```vue
<template>
  <!-- Via prop -->
  <DssInput brand="hub" label="Campo Hub" v-model="hub" />
  <DssInput brand="water" label="Campo Water" v-model="water" />
  <DssInput brand="waste" label="Campo Waste" v-model="waste" />

  <!-- Via contexto -->
  <div data-brand="hub">
    <DssInput label="Herda brand Hub" v-model="inherited" />
  </div>
</template>
```

### Acessando Referência Programaticamente

```vue
<template>
  <DssInput ref="inputRef" v-model="value" label="Campo focável" />
  <button @click="focusInput">Focar no campo</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { InputExpose } from '@/dss/components/base/DssInput/types/input.types'

const inputRef = ref<InputExpose | null>(null)
const value = ref('')

const focusInput = () => {
  inputRef.value?.focus()
}
</script>
```

### Formulário Completo

```vue
<template>
  <form @submit.prevent="handleSubmit" data-brand="hub">
    <DssInput
      v-model="form.name"
      label="Nome completo"
      required
      :error="errors.name"
      error-message="Nome é obrigatório"
    />

    <DssInput
      v-model="form.email"
      type="email"
      label="Email"
      required
      :error="errors.email"
      error-message="Email inválido"
      hint="Seu email corporativo"
    />

    <DssInput
      v-model="form.phone"
      type="tel"
      label="Telefone"
      placeholder="(00) 00000-0000"
    >
      <template #prepend>
        <span class="material-icons">phone</span>
      </template>
    </DssInput>

    <button type="submit">Enviar</button>
  </form>
</template>
```

---

## 11. Anti-patterns

### Usos Incorretos

#### 1. Input Sem Label

**Problema:** Leitores de tela não conseguem identificar o campo.

```vue
<!-- INCORRETO -->
<DssInput v-model="value" placeholder="Digite aqui" />

<!-- CORRETO -->
<DssInput v-model="value" label="Nome" placeholder="Digite aqui" />

<!-- OU com aria-label para campos visuais sem label -->
<DssInput v-model="search" aria-label="Campo de busca" placeholder="Buscar..." />
```

**Por quê:** WCAG 3.3.2 exige labels ou instruções para campos de entrada.

---

#### 2. Placeholder Como Única Identificação

**Problema:** Placeholder desaparece quando usuário digita.

```vue
<!-- INCORRETO -->
<DssInput v-model="email" placeholder="Email" />

<!-- CORRETO -->
<DssInput v-model="email" label="Email" placeholder="exemplo@empresa.com" />
```

**Por quê:** Placeholder não substitui label - usuários perdem contexto ao digitar.

---

#### 3. Erro Sem Mensagem Explicativa

**Problema:** Usuário não sabe o que corrigir.

```vue
<!-- INCORRETO -->
<DssInput v-model="cpf" :error="!isValid" />

<!-- CORRETO -->
<DssInput
  v-model="cpf"
  :error="!isValid"
  error-message="CPF deve conter 11 dígitos"
  hint="Apenas números, sem pontos ou traços"
/>
```

**Por quê:** WCAG 3.3.1 e 3.3.3 exigem identificação e descrição de erros.

---

#### 4. Sobrescrever CSS Sem Usar Tokens

**Problema:** Quebra consistência do Design System.

```vue
<!-- INCORRETO -->
<DssInput style="border-color: #ff0000 !important;" />

<!-- CORRETO -->
<DssInput :error="true" error-message="Mensagem de erro" />

<!-- OU via tokens customizados (se necessário) -->
<style>
.custom-field {
  --dss-action-primary: var(--minha-cor-customizada);
}
</style>
```

**Por quê:** Sobrescrever estilos bypassa tokens, temas e brandabilidade.

---

#### 5. Clearable em Campos Obrigatórios

**Problema:** Usuário pode limpar campo obrigatório e ficar confuso.

```vue
<!-- QUESTIONÁVEL -->
<DssInput
  v-model="requiredField"
  label="Campo obrigatório"
  required
  clearable
/>

<!-- MELHOR - clearable apenas em campos opcionais ou busca -->
<DssInput
  v-model="search"
  label="Buscar"
  clearable
/>
```

**Por quê:** Clearable faz mais sentido em campos de busca/filtro, não obrigatórios.

---

#### 6. Loading Infinito Sem Feedback

**Problema:** Usuário não sabe se algo está acontecendo.

```vue
<!-- INCORRETO -->
<DssInput v-model="value" :loading="true" />

<!-- CORRETO - com feedback ou timeout -->
<DssInput
  v-model="value"
  :loading="isLoading"
  :hint="isLoading ? 'Verificando disponibilidade...' : ''"
/>
```

**Por quê:** Loading deve ser temporário e ter feedback contextual.

---

#### 7. Múltiplos Inputs Sem Agrupamento

**Problema:** Formulários extensos sem organização visual.

```vue
<!-- INCORRETO -->
<DssInput v-model="a" label="Campo 1" />
<DssInput v-model="b" label="Campo 2" />
<DssInput v-model="c" label="Campo 3" />
<DssInput v-model="d" label="Campo 4" />
<DssInput v-model="e" label="Campo 5" />

<!-- CORRETO - agrupado semanticamente -->
<fieldset>
  <legend>Dados Pessoais</legend>
  <DssInput v-model="name" label="Nome" />
  <DssInput v-model="email" label="Email" />
</fieldset>

<fieldset>
  <legend>Endereço</legend>
  <DssInput v-model="street" label="Rua" />
  <DssInput v-model="city" label="Cidade" />
</fieldset>
```

**Por quê:** Agrupamento ajuda navegação por teclado e leitores de tela.

---

### Combinações Não Permitidas

| Combinação | Por quê | Alternativa |
|------------|---------|-------------|
| `disabled` + `loading` | Estados conflitantes | Use apenas `loading` |
| `disabled` + `error` | Não faz sentido validar campo desabilitado | Remova error |
| `readonly` + `clearable` | Não pode limpar campo readonly | Remova clearable |
| `stackLabel` + sem `label` | Stack de nada | Adicione label |
| `type="number"` + `clearable` | Números já têm controles nativos | Avalie necessidade |

---

## 12. Governança do Componente

### O Que É Extensão Válida

**Permitido SEM aprovação:**
- Uso de props públicas documentadas
- Combinação de props dentro das regras
- Customização via tokens CSS (`--dss-*`)
- Uso de slots para conteúdo customizado
- Wrappers que adicionam lógica (máscaras, validação)

**Exemplo:**
```vue
<!-- Wrapper válido com máscara -->
<template>
  <DssInput
    v-model="maskedValue"
    v-maska="'###.###.###-##'"
    label="CPF"
    placeholder="000.000.000-00"
    :error="!isValid"
  />
</template>
```

---

### O Que Exige Novo Componente

**Requer discussão com Design System:**
- Adicionar nova variante visual (ex: `variant="glass"`)
- Modificar comportamento de estados (hover, focus)
- Criar wrapper especializado (ex: `DssInputCurrency`, `DssInputPhone`)
- Adicionar features não presentes no Quasar q-input

**Exemplo de proposta:**
```markdown
## Proposta: DssInputCurrency

**Motivação:** Campos de valor monetário têm formatação específica (R$, separadores).

**Diferencial:**
- Máscara automática de moeda
- Prefixo/sufixo configurável (R$, USD)
- Validação de range numérico

**Impacto:** Novo componente, usa DssInput internamente.
```

---

### O Que É Proibido

**NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar código-fonte do componente sem PR
- Criar forks locais (copiar e colar)
- Ignorar warnings de acessibilidade
- Bypassar sistema de brandabilidade com CSS inline
- Remover ARIA attributes

**Por quê:** Quebra consistência, acessibilidade e manutenibilidade.

---

### Quem Decide

| Tipo de Mudança | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop pública** | Equipe de Design + DSS | RFC + aprovação |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migração |
| **Novo componente derivado** | Equipe de Design + DSS | Proposta formal |

---

## 13. Troubleshooting

### Problema: Label não flutua quando focado

**Causa 1:** CSS customizado sobrescrevendo transições.

**Solução:** Verifique se não há `transition: none` ou similar.

**Causa 2:** JavaScript desabilitando animações.

**Solução:** Verifique `prefers-reduced-motion` não está forçando disable global.

---

### Problema: Focus ring não aparece

**Causa:** CSS global removendo outline.

**Solução:**
```css
/* NÃO FAÇA ISSO */
*:focus {
  outline: none !important;
}

/* O DssInput gerencia seu próprio focus ring */
```

---

### Problema: Erro não aparece mesmo com error=true

**Causa:** Falta `errorMessage`.

**Solução:**
```vue
<!-- INCORRETO - error sem mensagem -->
<DssInput :error="true" />

<!-- CORRETO -->
<DssInput :error="true" error-message="Campo inválido" />
```

---

### Problema: Clearable não aparece

**Causa 1:** Input está vazio.

**Solução:** Clearable só aparece quando `modelValue` tem valor.

**Causa 2:** Input está `disabled` ou `readonly`.

**Solução:** Clearable é desabilitado nesses estados por design.

---

### Problema: Brand não está aplicando cores

**Causa 1:** `data-brand` não está em elemento pai.

**Solução:**
```vue
<!-- INCORRETO -->
<DssInput data-brand="hub" />

<!-- CORRETO -->
<div data-brand="hub">
  <DssInput />
</div>

<!-- OU via prop -->
<DssInput brand="hub" />
```

**Causa 2:** Prop `brand` está vazia/undefined.

**Solução:** Use valor válido: `hub`, `water`, ou `waste`.

---

### Problema: Loading spinner não aparece

**Causa:** Prop `loading` não é reativa.

**Solução:**
```vue
<!-- Certifique-se de usar ref -->
<script setup>
const isLoading = ref(false) // NÃO: let isLoading = false
</script>
```

---

### Problema: Eventos não estão sendo emitidos

**Causa:** Input está `disabled`.

**Solução:** Inputs desabilitados não emitem eventos - comportamento esperado.

---

### Problema: v-model não atualiza

**Causa:** Usando `.value` incorretamente no template.

**Solução:**
```vue
<!-- INCORRETO -->
<DssInput v-model="myRef.value" />

<!-- CORRETO -->
<DssInput v-model="myRef" />
```

---

## Recursos

- [Documentação Oficial do Quasar q-input](https://quasar.dev/vue-components/input)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Icons](https://fonts.google.com/icons)
- [Design System Sansys - Tokens](../../../tokens/)
- [DSS Token Reference](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## Licença

Propriedade da Jtech

---

## Apêndice: Checklist de Conformidade

Use este checklist ao implementar ou revisar o DssInput:

### Funcionalidade
- [x] v-model funcionando corretamente
- [x] Todas as 4 variantes implementadas
- [x] Todos os tipos de input suportados
- [x] Clearable funcional
- [x] Loading com spinner
- [x] Estados error, disabled, readonly

### Acessibilidade
- [x] IDs únicos gerados automaticamente
- [x] Labels conectados via for/id
- [x] aria-describedby para hints/errors
- [x] aria-invalid para erros
- [x] aria-busy para loading
- [x] role="alert" em error messages
- [x] Touch target 56px (WCAG AAA)
- [x] Focus ring visível

### Brandabilidade
- [x] Prop brand funcional
- [x] Contexto data-brand funcional
- [x] Cores de focus por brand

### TypeScript
- [x] Props totalmente tipadas
- [x] Emits tipados
- [x] Expose tipado
- [x] Composables tipados

---

**Última atualização:** Janeiro 2026
**Versão:** DSS v2.3.0
**Status:** Documentação Template 13.1
**Changelog:** Ver [DOCUMENTATION_CHANGELOG.md](./DOCUMENTATION_CHANGELOG.md)
