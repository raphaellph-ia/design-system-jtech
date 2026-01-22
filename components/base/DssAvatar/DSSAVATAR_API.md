# DssAvatar API - Referencia Tecnica

> **Documento referencial** - Para governanca e boas praticas, consulte [DssAvatar.md](./DssAvatar.md) (normativo).

## Visao Geral

O `DssAvatar` e um **wrapper DSS baseado no QAvatar**, com API publica governada pelo Design System Sansys. Este documento serve como referencia tecnica para props, eventos, slots e tipos TypeScript.

---

## Props Completas

### **Tamanho**

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg`, `xl` ou CSS unit | Tamanho do avatar |
| `fontSize` | String | `null` | CSS unit | Tamanho da fonte customizado |

**Tamanhos Predefinidos:**

| Size | Width/Height | Font Size | Icon Size |
|------|--------------|-----------|-----------|
| `xs` | 32px | 12px | 16px |
| `sm` | 40px | 14px | 20px |
| `md` | 48px | 16px | 24px |
| `lg` | 64px | 18px | 32px |
| `xl` | 80px | 20px | 48px |

**Exemplo:**
```vue
<!-- Tamanhos predefinidos -->
<DssAvatar size="xs">XS</DssAvatar>
<DssAvatar size="sm">SM</DssAvatar>
<DssAvatar size="md">MD</DssAvatar>
<DssAvatar size="lg">LG</DssAvatar>
<DssAvatar size="xl">XL</DssAvatar>

<!-- Tamanho customizado -->
<DssAvatar size="100px">100</DssAvatar>
<DssAvatar size="5rem">5rem</DssAvatar>

<!-- Font size customizado -->
<DssAvatar size="lg" font-size="24px">JD</DssAvatar>
```

---

### **Cores**

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `color` | String | `null` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo |
| `textColor` | String | `null` | Qualquer cor semantica | Cor do texto/icone |

**Exemplo:**
```vue
<DssAvatar color="primary">JD</DssAvatar>
<DssAvatar color="secondary">AB</DssAvatar>
<DssAvatar color="positive" text-color="white">OK</DssAvatar>
```

> **Nota:** Cores sao aplicadas via classes utilitarias CSS (`.bg-*`, `.text-*`) seguindo o padrao Quasar/DSS.

---

### **Icone**

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `icon` | String | `null` | Nome do icone Material Icons |

**Exemplo:**
```vue
<DssAvatar icon="person" color="primary" />
<DssAvatar icon="account_circle" color="secondary" />
<DssAvatar icon="business" color="accent" />
<DssAvatar icon="group" color="info" />
```

> **Importante:** Quando `icon` e fornecido, o slot default e ignorado.

---

### **Forma**

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `square` | Boolean | `false` | Avatar quadrado (border-radius: 0) |
| `rounded` | Boolean | `false` | Avatar arredondado (border-radius: 8px) |

**Exemplo:**
```vue
<!-- Circular (padrao) -->
<DssAvatar color="primary">JD</DssAvatar>

<!-- Quadrado -->
<DssAvatar square color="secondary">AB</DssAvatar>

<!-- Arredondado -->
<DssAvatar rounded color="accent">XY</DssAvatar>
```

---

### **Brand**

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

**Exemplo:**
```vue
<!-- Borda laranja (Hub) -->
<DssAvatar brand="hub" icon="person" />

<!-- Borda azul (Water) -->
<DssAvatar brand="water" icon="person" />

<!-- Borda verde (Waste) -->
<DssAvatar brand="waste" icon="person" />
```

---

### **Status**

| Prop | Tipo | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `status` | String | `null` | `online`, `away`, `busy`, `offline` | Indicador de status |

**Exemplo:**
```vue
<DssAvatar status="online" color="primary">JD</DssAvatar>
<DssAvatar status="away" color="secondary">AB</DssAvatar>
<DssAvatar status="busy" color="accent">XY</DssAvatar>
<DssAvatar status="offline" color="info">ZZ</DssAvatar>
```

**Cores de Status:**
| Status | Cor | Token |
|--------|-----|-------|
| `online` | Verde | `--dss-positive` |
| `away` | Amarelo | `--dss-warning` |
| `busy` | Vermelho | `--dss-negative` |
| `offline` | Cinza | `--dss-neutral-400` |

---

### **Acessibilidade**

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Label ARIA para screen readers |
| `alt` | String | `undefined` | Alt text para imagens no slot |

**Exemplo:**
```vue
<DssAvatar
  icon="person"
  aria-label="Avatar de Joao Silva"
  color="primary"
/>

<DssAvatar color="secondary" aria-label="Foto do usuario">
  <img src="/avatar.jpg" alt="Joao Silva" />
</DssAvatar>
```

---

## Eventos

| Evento | Payload | Quando Emitido | Descricao |
|--------|---------|----------------|-----------|
| `click` | `MouseEvent` | Ao clicar no avatar | Permite avatares clicaveis |

**Exemplo:**
```vue
<template>
  <DssAvatar
    @click="openProfile"
    color="primary"
    aria-label="Abrir perfil do usuario"
  >
    JD
  </DssAvatar>
</template>

<script setup>
const openProfile = (event) => {
  console.log('Avatar clicado', event)
}
</script>
```

---

## Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo principal do avatar (texto, imagem, elementos customizados) |

**Exemplo:**
```vue
<!-- Iniciais -->
<DssAvatar color="primary">JD</DssAvatar>

<!-- Imagem -->
<DssAvatar>
  <img src="/avatar.jpg" alt="Joao Silva" />
</DssAvatar>

<!-- Elemento customizado -->
<DssAvatar color="secondary">
  <strong>AB</strong>
</DssAvatar>
```

---

## Expose (Ref)

| Ref | Tipo | Descricao |
|-----|------|-----------|
| `rootRef` | `Ref<HTMLDivElement \| null>` | Referencia direta ao elemento root |

**Exemplo:**
```vue
<template>
  <DssAvatar ref="avatarRef" color="primary">JD</DssAvatar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import type { AvatarExpose } from './types/avatar.types'

const avatarRef = ref<AvatarExpose | null>(null)

onMounted(() => {
  console.log(avatarRef.value?.rootRef)
})
</script>
```

---

## Classes CSS Geradas

```scss
// Base
.dss-avatar

// Tamanhos
.dss-avatar--xs
.dss-avatar--sm
.dss-avatar--md
.dss-avatar--lg
.dss-avatar--xl

// Formas
.dss-avatar--square
.dss-avatar--rounded

// Brands
.dss-avatar--brand-hub
.dss-avatar--brand-water
.dss-avatar--brand-waste

// Status
.dss-avatar--with-status
.dss-avatar__status
.dss-avatar__status--online
.dss-avatar__status--away
.dss-avatar__status--busy
.dss-avatar__status--offline

// Partes internas
.dss-avatar__icon
.dss-avatar__content
```

---

## Tipos TypeScript

### AvatarProps

```typescript
interface AvatarProps {
  size?: AvatarSize | string | null
  fontSize?: string | null
  color?: AvatarColor | null
  textColor?: string | null
  icon?: string | null
  square?: boolean
  rounded?: boolean
  brand?: AvatarBrand | null
  status?: AvatarStatus | null
  ariaLabel?: string
  alt?: string
}
```

### AvatarSize

```typescript
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### AvatarColor

```typescript
type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
```

### AvatarBrand

```typescript
type AvatarBrand = 'hub' | 'water' | 'waste'
```

### AvatarStatus

```typescript
type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'
```

### AvatarEmits

```typescript
interface AvatarEmits {
  (e: 'click', event: MouseEvent): void
}
```

### AvatarExpose

```typescript
interface AvatarExpose {
  rootRef: Ref<HTMLDivElement | null>
}
```

---

## Integracao com Outros Componentes

### Com DssBadge

```vue
<template>
  <div style="position: relative; display: inline-block;">
    <DssAvatar color="primary" icon="person" size="lg" />
    <DssBadge
      floating
      color="positive"
      style="position: absolute; top: 0; right: 0;"
    />
  </div>
</template>
```

### Em Listas

```vue
<template>
  <div class="user-item">
    <DssAvatar color="primary" size="sm">JD</DssAvatar>
    <div class="user-info">
      <strong>Joao Silva</strong>
      <span>joao.silva@sansys.com.br</span>
    </div>
  </div>
</template>
```

### Grupo de Avatares

```vue
<template>
  <div class="dss-avatar-group">
    <DssAvatar color="primary">JD</DssAvatar>
    <DssAvatar color="secondary">AB</DssAvatar>
    <DssAvatar color="accent">XY</DssAvatar>
    <DssAvatar color="info">+5</DssAvatar>
  </div>
</template>
```

---

## Versao

**DSS v2.3.0** - Implementacao completa da API do Quasar QAvatar com extensoes DSS
**Compatibilidade**: Quasar v2.x

---

## Recursos

- [Documentacao Oficial do Quasar QAvatar](https://quasar.dev/vue-components/avatar)
- [Codigo-fonte do QAvatar](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/avatar/QAvatar.js)
- [Material Icons](https://fonts.google.com/icons)
- [DssAvatar.md - Documentacao Normativa](./DssAvatar.md)
