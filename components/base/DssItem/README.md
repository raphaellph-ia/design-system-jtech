# DssItem

Elemento base estrutural dual-mode para listas, menus e navegacao no Design System Sansys.

## Quick Start

```vue
<script setup>
import { DssItem } from '@dss/components/base/DssItem'
import { DssIcon } from '@dss/components/base/DssIcon'
</script>

<template>
  <!-- Item estatico -->
  <DssItem label="Informacao" caption="Somente leitura" />

  <!-- Item clicavel com icones -->
  <DssItem clickable label="Configuracoes" @click="openSettings">
    <template #leading>
      <DssIcon name="settings" :decorative="true" />
    </template>
    <template #trailing>
      <DssIcon name="chevron_right" :decorative="true" />
    </template>
  </DssItem>
</template>
```

## Modos de Operacao

| Modo | Prop | Role | Interatividade |
|------|------|------|---------------|
| Estatico | `clickable=false` | `listitem` | Nenhuma |
| Interativo | `clickable=true` | `button` | Hover, Active, Focus, Disabled |

## Densidades

| Densidade | Min-Height | Touch Target |
|-----------|-----------|-------------|
| `default` | 48px | 48px (::before) |
| `compact` | 32px | Removido |

## Slots

- **`leading`** — DssIcon, DssAvatar, DssCheckbox
- **`default`** — Substitui label + caption
- **`trailing`** — DssIcon (chevron), DssBadge, DssToggle

## Exemplos

### Menu de Navegacao

```vue
<DssItem clickable active label="Dashboard" @click="go('dashboard')">
  <template #leading><DssIcon name="dashboard" :decorative="true" /></template>
  <template #trailing><DssIcon name="chevron_right" :decorative="true" /></template>
</DssItem>
```

### Com Brand

```vue
<DssItem clickable active brand="hub" label="Sansys Hub" />
```

### Compact

```vue
<DssItem clickable density="compact" label="Item compacto" />
```

## Documentacao Completa

- [DssItem.md](./DssItem.md) — Documentacao normativa
- [DSSITEM_API.md](./DSSITEM_API.md) — API Reference
- [DssItem.example.vue](./DssItem.example.vue) — Exemplos interativos
