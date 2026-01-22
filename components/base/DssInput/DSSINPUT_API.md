# DssInput API - Referência Técnica

> **Documento referencial** - Para governança e boas práticas, consulte [DssInput.md](./DssInput.md) (normativo).

## Visão Geral

O `DssInput` é um **wrapper DSS baseado no QInput**, com API pública governada pelo Design System Sansys. Este documento serve como referência técnica para props, eventos, slots e tipos TypeScript.

---

## Props Completas

### **Model**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | String \| Number | `''` | Valor do input (v-model) |

**Exemplo:**
```vue
<DssInput v-model="username" />
<DssInput :modelValue="value" @update:modelValue="value = $event" />
```

---

### **Variantes Visuais**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | String | `'outlined'` | `outlined`, `filled`, `standout`, `borderless` | Estilo visual do input |

**Exemplo:**
```vue
<DssInput variant="outlined">Outlined (Padrão)</DssInput>
<DssInput variant="filled">Filled</DssInput>
<DssInput variant="standout">Standout</DssInput>
<DssInput variant="borderless">Borderless</DssInput>
```

**Características por Variante:**
- `outlined`: Borda completa, fundo transparente (padrão Quasar)
- `filled`: Fundo sólido (gray-50), borda inferior
- `standout`: Alto contraste, fundo escuro, texto claro
- `borderless`: Sem bordas, apenas underline no focus

---

### **Tipos de Input**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `type` | String | `'text'` | `text`, `password`, `email`, `number`, `tel`, `url`, `search`, `date`, `time`, `datetime-local` | Tipo HTML do input |

**Exemplo:**
```vue
<DssInput type="text" label="Nome" />
<DssInput type="email" label="Email" />
<DssInput type="password" label="Senha" />
<DssInput type="number" label="Quantidade" />
<DssInput type="tel" label="Telefone" />
<DssInput type="url" label="Website" />
<DssInput type="search" label="Buscar" clearable />
<DssInput type="date" label="Data de Nascimento" />
<DssInput type="time" label="Horário" />
<DssInput type="datetime-local" label="Data e Hora" />
```

---

### **Conteúdo**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | String | `''` | Label flutuante do input |
| `stackLabel` | Boolean | `false` | Label fixo no topo (não flutua) |
| `placeholder` | String | `''` | Texto de placeholder |
| `hint` | String | `''` | Texto de ajuda abaixo do input |
| `errorMessage` | String | `''` | Mensagem de erro |

**Exemplo:**
```vue
<!-- Label flutuante (padrão) -->
<DssInput
  v-model="email"
  label="Email"
  placeholder="exemplo@empresa.com"
  hint="Usaremos para comunicações importantes"
/>

<!-- Label fixo no topo -->
<DssInput
  v-model="name"
  label="Nome completo"
  stack-label
  placeholder="Digite seu nome"
/>

<!-- Com erro -->
<DssInput
  v-model="cpf"
  label="CPF"
  :error="!isValid"
  error-message="CPF inválido"
/>
```

---

### **Estados**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `error` | Boolean | `false` | Estado de erro (borda vermelha) |
| `disabled` | Boolean | `false` | Input desabilitado |
| `readonly` | Boolean | `false` | Input somente leitura |
| `loading` | Boolean | `false` | Exibe spinner de carregamento |
| `required` | Boolean | `false` | Campo obrigatório (aria-required) |

**Exemplo:**
```vue
<!-- Estado de erro -->
<DssInput
  v-model="email"
  :error="!isValidEmail"
  error-message="Email inválido"
/>

<!-- Desabilitado -->
<DssInput v-model="locked" disabled label="Campo bloqueado" />

<!-- Somente leitura -->
<DssInput v-model="readOnly" readonly label="Apenas visualização" />

<!-- Loading -->
<DssInput v-model="async" :loading="isSearching" label="Buscando..." />

<!-- Obrigatório -->
<DssInput v-model="required" required label="Campo obrigatório *" />
```

---

### **Features**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `clearable` | Boolean | `false` | Exibe botão de limpar (x) quando há valor |
| `dense` | Boolean | `false` | Versão compacta (menor altura) |

**Exemplo:**
```vue
<!-- Clearable -->
<DssInput
  v-model="search"
  label="Buscar"
  clearable
  placeholder="Digite para pesquisar..."
/>

<!-- Dense -->
<DssInput
  v-model="code"
  label="Código"
  dense
/>
```

---

### **Acessibilidade**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Label ARIA para screen readers |
| `clearAriaLabel` | String | `'Clear input'` | Label ARIA do botão limpar |
| `tabindex` | Number \| String | `null` | Tabindex customizado |

**Exemplo:**
```vue
<!-- Campo de busca sem label visual -->
<DssInput
  v-model="search"
  aria-label="Buscar produtos"
  placeholder="Buscar..."
  clearable
/>

<!-- Controle de ordem de foco -->
<DssInput v-model="first" :tabindex="1" label="Primeiro" />
<DssInput v-model="second" :tabindex="2" label="Segundo" />
<DssInput v-model="skip" :tabindex="-1" label="Não focável via Tab" />

<!-- Label customizado para botão clear -->
<DssInput
  v-model="name"
  clearable
  clear-aria-label="Limpar nome"
/>
```

---

### **Brandabilidade (Exclusivo DSS)**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

**Exemplo:**
```vue
<DssInput brand="hub" label="Campo Hub" />
<DssInput brand="water" label="Campo Water" />
<DssInput brand="waste" label="Campo Waste" />
```

**Comportamento:**
- Cores de focus mudam para a paleta da brand
- Hub: laranja (`--dss-hub-600`)
- Water: azul (`--dss-water-500`)
- Waste: verde (`--dss-waste-600`)

---

## Eventos

| Evento | Parâmetros | Descrição |
|--------|------------|-----------|
| `@update:modelValue` | `value: string` | Emitido ao digitar (v-model) |
| `@focus` | `event: FocusEvent` | Emitido ao focar no input |
| `@blur` | `event: FocusEvent` | Emitido ao perder foco |
| `@clear` | - | Emitido ao clicar no botão clear |

**Exemplo:**
```vue
<DssInput
  v-model="value"
  @focus="handleFocus"
  @blur="handleBlur"
  @clear="handleClear"
/>

<script setup>
function handleFocus(event) {
  console.log('Input focado', event)
}

function handleBlur(event) {
  console.log('Input perdeu foco', event)
}

function handleClear() {
  console.log('Input limpo')
}
</script>
```

---

## Slots

| Slot | Descrição |
|------|-----------|
| `label` | Conteúdo customizado da label |
| `before` | Conteúdo antes do field wrapper (externo) |
| `prepend` | Conteúdo dentro do field, à esquerda |
| `append` | Conteúdo dentro do field, à direita |
| `after` | Conteúdo depois do field wrapper (externo) |
| `error` | Mensagem de erro customizada |
| `hint` | Texto de ajuda customizado |

**Exemplo:**
```vue
<DssInput v-model="value">
  <!-- Label customizada -->
  <template #label>
    <strong>Nome</strong> <small>(obrigatório)</small>
  </template>

  <!-- Ícone à esquerda -->
  <template #prepend>
    <span class="material-icons">person</span>
  </template>

  <!-- Botão à direita -->
  <template #append>
    <button @click="validate">Validar</button>
  </template>

  <!-- Hint customizado -->
  <template #hint>
    <span>Mínimo <strong>3 caracteres</strong></span>
  </template>
</DssInput>
```

---

## Expose (Referências Públicas)

| Método/Ref | Tipo | Descrição |
|------------|------|-----------|
| `focus()` | `() => void` | Foca no input programaticamente |
| `blur()` | `() => void` | Remove foco do input |
| `inputRef` | `Ref<HTMLInputElement \| null>` | Referência direta ao input nativo |

**Exemplo:**
```vue
<template>
  <DssInput ref="inputRef" v-model="value" label="Campo" />
  <button @click="focusInput">Focar</button>
  <button @click="blurInput">Desfocar</button>
  <button @click="selectAll">Selecionar tudo</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { InputExpose } from '@/dss/components/base/DssInput/types/input.types'

const inputRef = ref<InputExpose | null>(null)
const value = ref('')

function focusInput() {
  inputRef.value?.focus()
}

function blurInput() {
  inputRef.value?.blur()
}

function selectAll() {
  // Acesso direto ao input nativo
  inputRef.value?.inputRef.value?.select()
}
</script>
```

---

## Relação com Quasar QInput

> **Governança**: O DssInput é um **wrapper governado pelo DSS**, não uma cópia do QInput. A API pública é deliberadamente curada para garantir consistência, acessibilidade e brandabilidade.

### ✅ Props Governadas pelo DSS (API Pública)

Props aprovadas e mantidas pelo Design System:

| Prop | Origem | Categoria |
|------|--------|-----------|
| `modelValue` | QInput | Recomendado |
| `type` | QInput | Recomendado |
| `label` | QInput | Recomendado |
| `stackLabel` | QInput | Opcional |
| `placeholder` | QInput | Opcional |
| `hint` | QInput | Opcional |
| `error` + `errorMessage` | QInput | Recomendado |
| `disabled` | QInput | Recomendado |
| `readonly` | QInput | Opcional |
| `loading` | QInput | Opcional |
| `clearable` | QInput | Opcional |
| `dense` | QInput | Opcional |
| `variant` | DSS | Recomendado |
| `brand` | DSS | Recomendado |
| `ariaLabel` | DSS | Recomendado |
| `clearAriaLabel` | DSS | Opcional |
| `required` | DSS | Recomendado |
| `tabindex` | DSS | Opcional |

### 🔄 Mapeamento de Variantes (Quasar → DSS)

| Quasar (props separadas) | DSS (prop unificada) |
|--------------------------|----------------------|
| `filled` | `variant="filled"` |
| `outlined` | `variant="outlined"` |
| `standout` | `variant="standout"` |
| `borderless` | `variant="borderless"` |

### ✅ Slots Governados pelo DSS

- `prepend` - Conteúdo à esquerda (dentro do field)
- `append` - Conteúdo à direita (dentro do field)
- `before` - Conteúdo antes do field wrapper
- `after` - Conteúdo depois do field wrapper
- `error` - Mensagem de erro customizada
- `hint` - Texto de ajuda customizado
- `label` - Label customizado

### 🔶 Props Exclusivas DSS (Extensões)

| Prop | Descrição | Categoria |
|------|-----------|-----------|
| `brand` | Brandabilidade Sansys (hub, water, waste) | Recomendado |
| `ariaLabel` | Label ARIA customizado | Recomendado |
| `clearAriaLabel` | Label ARIA do botão clear | Opcional |
| `required` | Campo obrigatório com aria-required | Recomendado |
| `tabindex` | Controle de ordem de foco | Opcional |

### ⛔ Props do QInput FORA do Escopo DSS

> Estas props existem no QInput mas **não são governadas pelo DSS**. Se necessárias, implemente via wrappers ou diretivas externas.

| Prop QInput | Por que fora de escopo | Alternativa |
|-------------|------------------------|-------------|
| `mask` | Complexidade de manutenção | Diretiva `v-maska` |
| `rules` | Validação deve ser externa | `vee-validate`, `vuelidate` |
| `autogrow` | Comportamento de textarea | Use `DssTextarea` |
| `prefix` / `suffix` | Slots resolvem | `#prepend` / `#append` |
| `input-class` / `input-style` | Evitar CSS inline | Tokens ou slots |
| `bottom-slots` | Estrutura diferente no DSS | Slots `error` e `hint` |
| `counter` | Pode ser implementado via slot | Wrapper customizado |
| `maxlength` | Atributo HTML nativo | `v-bind="{ maxlength: 100 }"` |
| `debounce` | Lógica de aplicação | Composable ou lodash |
| `autofocus` | Controle programático | `inputRef.value?.focus()` |

---

## TypeScript Types

### InputProps

```typescript
interface InputProps {
  // Model
  modelValue?: string | number

  // Visual
  variant?: 'filled' | 'outlined' | 'standout' | 'borderless'
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local'
  dense?: boolean
  brand?: 'hub' | 'water' | 'waste' | null

  // Content
  label?: string
  stackLabel?: boolean
  placeholder?: string
  hint?: string
  errorMessage?: string

  // State
  error?: boolean
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  required?: boolean

  // Features
  clearable?: boolean

  // Accessibility
  ariaLabel?: string
  clearAriaLabel?: string
  tabindex?: number | string | null
}
```

### InputEmits

```typescript
interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
```

### InputExpose

```typescript
interface InputExpose {
  focus: () => void
  blur: () => void
  inputRef: Ref<HTMLInputElement | null>
}
```

### InputSlots

```typescript
interface InputSlots {
  label?(): any
  before?(): any
  prepend?(): any
  append?(): any
  after?(): any
  error?(): any
  hint?(): any
}
```

---

## ARIA Attributes Gerados

O DssInput gera automaticamente os seguintes atributos ARIA:

```html
<div class="dss-input dss-input--outlined dss-input--focused">
  <label
    id="dss-input-label-abc123"
    for="dss-input-abc123"
    class="dss-input__label"
  >
    Email
  </label>

  <input
    id="dss-input-abc123"
    type="email"
    class="dss-input__native"
    aria-labelledby="dss-input-label-abc123"
    aria-describedby="dss-input-hint-abc123"
    aria-invalid="false"
    aria-busy="false"
    aria-disabled="false"
    aria-readonly="false"
    aria-required="true"
  />

  <div
    id="dss-input-hint-abc123"
    class="dss-input__hint"
  >
    Digite seu email corporativo
  </div>
</div>
```

---

## Versão

**DSS v2.3.0** - TypeScript + Composition API
**Compatibilidade**: Quasar v2.x, Vue 3.x

**Última atualização:** Janeiro 2026
**Changelog:**
- Migrado para TypeScript + Composition API
- IDs únicos automáticos para acessibilidade
- Evento `clear` adicionado
- Props de acessibilidade expandidas (`ariaLabel`, `clearAriaLabel`, `required`, `tabindex`)
- Expose inclui `inputRef`
- Composables totalmente tipados

---

## Recursos

- [Documentação Oficial do Quasar q-input](https://quasar.dev/vue-components/input)
- [Código-fonte do q-input](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/QInput.js)
- [Design System Sansys - DssInput.md](./DssInput.md)
- [WCAG 2.1 Form Guidelines](https://www.w3.org/WAI/tutorials/forms/)
