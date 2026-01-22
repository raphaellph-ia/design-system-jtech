# DssButton API - Documentação Completa

## 📋 Visão Geral

O `DssButton` é um componente de botão **100% compatível com a API do Quasar Framework**, implementado seguindo rigorosamente as especificações oficiais do `q-btn`.

---

## 🎯 Props Completas

### **Conteúdo**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | String | `''` | Texto do botão |
| `icon` | String | `''` | Ícone à esquerda (Material Icons) |
| `icon-right` | String | `''` | Ícone à direita (Material Icons) |

**Exemplo:**
```vue
<DssButton label="Salvar" icon="save" />
<DssButton label="Enviar" icon-right="send" />
<DssButton icon="star" icon-right="favorite" label="Duplo Ícone" />
```

---

### **Variantes Visuais**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | String | `'elevated'` | `elevated`, `flat`, `outline`, `unelevated`, `push`, `glossy` | Estilo visual do botão |

**Exemplo:**
```vue
<DssButton variant="elevated">Elevated (Padrão)</DssButton>
<DssButton variant="flat">Flat</DssButton>
<DssButton variant="outline">Outline</DssButton>
<DssButton variant="unelevated">Unelevated</DssButton>
<DssButton variant="push">Push</DssButton>
<DssButton variant="glossy">Glossy ✨</DssButton>
```

**Características por Variante:**
- `elevated`: Botão preenchido com box-shadow (padrão)
- `flat`: Background transparente, sem elevação (ideal para ações secundárias)
- `outline`: Background transparente com borda colorida
- `unelevated`: Botão preenchido sem box-shadow
- `push`: Efeito 3D pressionável
- `glossy`: Efeito brilhante/glossy

---

### **Cores**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `color` | String | `'primary'` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor semântica do botão |

**Exemplo:**
```vue
<DssButton color="primary">Primary</DssButton>
<DssButton color="tertiary">Tertiary</DssButton>
<DssButton color="negative">Negative</DssButton>
```

---

### **Tamanhos**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg`, `xl` | Tamanho do botão (compatível com Quasar) |

**Exemplo:**
```vue
<DssButton size="xs">Extra Small</DssButton>
<DssButton size="sm">Small</DssButton>
<DssButton size="md">Medium</DssButton>
<DssButton size="lg">Large</DssButton>
<DssButton size="xl">Extra Large</DssButton>
```

---

### **Formas**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `round` | Boolean | `false` | Bordas completamente arredondadas |
| `square` | Boolean | `false` | Bordas quadradas (sem border-radius) |

**Exemplo:**
```vue
<DssButton round>Round Button</DssButton>
<DssButton square>Square Button</DssButton>
```

---

### **🆕 Estados Avançados (Loading com Progresso)**

| Prop | Tipo | Default | Validação | Descrição |
|------|------|---------|-----------|-----------|
| `loading` | Boolean | `false` | - | Exibe spinner de carregamento |
| `percentage` | Number | `null` | 0-100 | Exibe barra de progresso determinística |
| `dark-percentage` | Boolean | `false` | - | Estilo escuro da barra de progresso |

**Exemplo:**
```vue
<!-- Loading tradicional com spinner -->
<DssButton :loading="true">Carregando...</DssButton>

<!-- Loading com progresso determinístico -->
<DssButton :loading="true" :percentage="45">
  45% Completo
</DssButton>

<!-- Barra de progresso escura -->
<DssButton :loading="true" :percentage="75" dark-percentage>
  75% Completo
</DssButton>
```

**Uso dinâmico:**
```vue
<script setup>
import { ref } from 'vue'

const uploadProgress = ref(0)
const isUploading = ref(false)

function startUpload() {
  isUploading.value = true
  uploadProgress.value = 0

  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      isUploading.value = false
    }
  }, 500)
}
</script>

<template>
  <DssButton
    :loading="isUploading"
    :percentage="uploadProgress"
    @click="startUpload"
  >
    {{ isUploading ? `${uploadProgress}% Upload` : 'Iniciar Upload' }}
  </DssButton>
</template>
```

---

### **🆕 Interação**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ripple` | Boolean \| Object | `true` | Efeito ripple Material Design |
| `tabindex` | Number \| String | `null` | Ordem de navegação por teclado |
| `disabled` | Boolean | `false` | Desabilita o botão |

**Exemplo:**
```vue
<!-- Ripple desabilitado -->
<DssButton :ripple="false">Sem Ripple</DssButton>

<!-- Controle de foco via teclado -->
<DssButton :tabindex="1">Primeiro</DssButton>
<DssButton :tabindex="2">Segundo</DssButton>
<DssButton :tabindex="-1">Não Focável</DssButton>

<!-- Desabilitado -->
<DssButton :disabled="true">Desabilitado</DssButton>
```

---

### **🆕 Layout**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `align` | String | `'center'` | `left`, `center`, `right`, `between`, `around`, `evenly` | Alinhamento horizontal do conteúdo |
| `stack` | Boolean | `false` | - | Layout vertical (ícone acima do label) |
| `stretch` | Boolean | `false` | - | Expande para preencher largura disponível |
| `no-wrap` | Boolean | `false` | - | Previne quebra de texto |
| `padding` | String | `null` | CSS padding | Padding customizável |

**Exemplo:**
```vue
<!-- Alinhamento -->
<DssButton align="left" icon="menu" label="Menu" />
<DssButton align="right" icon-right="arrow_forward" label="Avançar" />
<DssButton align="between" icon="save" icon-right="cloud" label="Salvar na Nuvem" />

<!-- Stack - Layout vertical -->
<DssButton stack icon="cloud_upload" label="Upload" />

<!-- Stretch - Botão full-width -->
<DssButton stretch>Botão Expandido</DssButton>

<!-- No wrap - Texto sem quebra -->
<DssButton no-wrap style="max-width: 150px">
  Texto muito longo que não vai quebrar
</DssButton>

<!-- Padding customizado -->
<DssButton padding="20px 40px">Padding Grande</DssButton>
<DssButton padding="4px 8px" size="xs">Padding Pequeno</DssButton>
```

---

### **Comportamento**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `type` | String | `'button'` | `button`, `submit`, `reset` | Tipo nativo do button HTML |
| `dense` | Boolean | `false` | - | Versão compacta do botão |
| `no-caps` | Boolean | `false` | - | Desabilita transformação uppercase |

**Exemplo:**
```vue
<!-- Formulários -->
<form @submit.prevent="handleSubmit">
  <DssButton type="submit">Enviar</DssButton>
  <DssButton type="reset">Limpar</DssButton>
</form>

<!-- Versão compacta -->
<DssButton dense>Compact</DssButton>

<!-- Sem uppercase -->
<DssButton no-caps>Texto Normal</DssButton>
```

---

### **Router (Vue Router)**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `to` | String \| Object | `null` | Rota de navegação |
| `replace` | Boolean | `false` | Usa router.replace ao invés de router.push |

**Exemplo:**
```vue
<!-- Navegação simples -->
<DssButton to="/home">Home</DssButton>

<!-- Rota nomeada com params -->
<DssButton :to="{ name: 'user', params: { id: 123 } }">
  Ver Usuário
</DssButton>

<!-- Replace (não adiciona ao histórico) -->
<DssButton to="/login" replace>Login</DssButton>
```

---

### **Brandabilidade (Exclusivo DSS)**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

**Exemplo:**
```vue
<DssButton brand="hub" color="primary">Hub Brand 🟠</DssButton>
<DssButton brand="water" color="primary">Water Brand 🔵</DssButton>
<DssButton brand="waste" color="primary">Waste Brand 🟢</DssButton>
```

---

## 🎬 Eventos

| Evento | Parâmetros | Descrição |
|--------|------------|-----------|
| `@click` | `event: MouseEvent` | Emitido ao clicar (se não disabled/loading) |

**Exemplo:**
```vue
<DssButton @click="handleClick">Clique Aqui</DssButton>

<script setup>
function handleClick(event) {
  console.log('Botão clicado!', event)
}
</script>
```

---

## 🎨 Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal do botão (substitui `label`) |

**Exemplo:**
```vue
<DssButton>
  <strong>Texto</strong> <em>Formatado</em>
</DssButton>
```

---

## ✅ Compatibilidade com Quasar

### Props 100% Implementadas:
✅ `label`, `icon`, `icon-right`
✅ `variant` (elevated, flat, outline, unelevated, push)
✅ `color` (primary, secondary, accent, positive, negative, warning, info)
✅ `size` (xs, sm, md, lg, xl)
✅ `loading`, `percentage`, `dark-percentage`
✅ `ripple`, `tabindex`, `disabled`
✅ `align`, `stack`, `stretch`, `no-wrap`, `padding`
✅ `round`, `square`, `dense`, `no-caps`
✅ `type`, `to`, `replace`

### Props Adicionadas pelo DSS:
🟠 `brand` (hub, water, waste) - Brandabilidade Sansys
🟠 `variant="glossy"` - Efeito glossy exclusivo
🟠 `color="tertiary"` - Cor semântica adicional

### Diferenças:
- **Quasar** usa `q-btn`, **DSS** usa `DssButton`
- **DSS** adiciona sistema de brandabilidade (hub/water/waste)
- **DSS** adiciona cor `tertiary` como semântica

---

## 🎨 Sistema de Hover Atualizado

### Flat e Outline - Padrão Consistente

As variantes `flat` e `outline` seguem um padrão consistente entre cores semânticas e brands:

#### **Base State:**
- Background: `transparent` (dark mode ready)
- Text: cor principal

#### **Hover State:**
- Background: cor `-light` (ex: `primary-light`, `hub-100`)
- Text: cor `-hover` ou `-800` (ex: `primary-hover`, `hub-800`)

#### **Tabela Completa:**

| Tipo | Base | Hover Background | Hover Text |
|------|------|-----------------|------------|
| **Semantic Flat** | `transparent` + `primary` | `primary-light` | `primary-hover` |
| **Semantic Outline** | `transparent` + `primary` + borda | `primary-light` | `primary-hover` |
| **Brand Flat (Hub)** | `transparent` + `hub-600` | `hub-100` | `hub-800` |
| **Brand Outline (Hub)** | `transparent` + `hub-600` + borda | `hub-100` | `hub-800` |
| **Brand Flat (Water)** | `transparent` + `water-500` | `water-100` | `water-800` |
| **Brand Outline (Water)** | `transparent` + `water-500` + borda | `water-100` | `water-800` |
| **Brand Flat (Waste)** | `transparent` + `waste-600` | `waste-100` | `waste-800` |
| **Brand Outline (Waste)** | `transparent` + `waste-600` + borda | `waste-100` | `waste-800` |

**Benefícios:**
- ✅ Melhor contraste no hover (WCAG 2.1 AA)
- ✅ Consistência visual entre semânticos e brands
- ✅ Background transparente compatível com dark mode
- ✅ Zero hardcoding, 100% baseado em tokens

---

## 📦 Versão

**DSS v2.1.0** - Implementação completa da API do Quasar QBtn
**Compatibilidade**: Quasar v2.x

**Última atualização:** Janeiro 2025
**Changelog:**
- ✅ Sistema de hover consistente para flat/outline
- ✅ Background transparente para flat/outline
- ✅ Props avançadas de layout (align, stack, padding)
- ✅ Loading com progresso (percentage)
- ✅ Ripple effect configurável

---

## 📚 Recursos

- [Documentação Oficial do Quasar QBtn](https://quasar.dev/vue-components/button)
- [Código-fonte do QBtn](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/btn/QBtn.js)
- [Design System Sansys - DssButton.md](./DssButton.md)
