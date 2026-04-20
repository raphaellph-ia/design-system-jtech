# DssLayout

Container raiz da aplicação DSS. Wrapper governado sobre `QLayout` que orquestra a estrutura de página com header, footer e drawers.

## Quick Start

```vue
<template>
  <DssLayout view="hHh lpR fFf">
    <DssHeader elevated>
      <q-toolbar>
        <q-toolbar-title>Minha Aplicação</q-toolbar-title>
      </q-toolbar>
    </DssHeader>

    <DssDrawer v-model="drawerOpen" side="left">
      <!-- DssList, DssMenu -->
    </DssDrawer>

    <!-- DssPageContainer com DssPage (compositionFuture) -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Conteúdo -->
      </q-page>
    </q-page-container>

    <DssFooter bordered>
      <q-toolbar>
        <q-toolbar-title class="text-caption">DSS v2.2</q-toolbar-title>
      </q-toolbar>
    </DssFooter>
  </DssLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssLayout from '@/components/base/DssLayout/DssLayout.vue'
import DssHeader from '@/components/base/DssHeader/DssHeader.vue'
import DssDrawer from '@/components/base/DssDrawer/DssDrawer.vue'
import DssFooter from '@/components/base/DssFooter/DssFooter.vue'

const drawerOpen = ref(true)
</script>
```

## Props principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `view` | `string` | `'hHh lpR fFf'` | Configuração estrutural. Padrão corporativo DSS. |
| `container` | `boolean` | `false` | Layout dentro do elemento pai (não ocupa a janela inteira). |

## Container Mode

```vue
<!-- Útil para previews ou embeds -->
<div style="height: 600px; position: relative;">
  <DssLayout view="hHh lpR fFf" container>
    <!-- estrutura normal -->
  </DssLayout>
</div>
```

## Hierarquia de componentes

```
DssLayout (Nível 4)
  ├── DssHeader (Nível 3)
  │     └── DssToolbar (Nível 2)
  ├── DssDrawer (Nível 3)
  │     └── DssList / DssMenu (Nível 2)
  ├── DssPageContainer (Nível 3 — compositionFuture)
  │     └── DssPage (Nível 3 — compositionFuture)
  └── DssFooter (Nível 3)
```

## Tokens aplicados

| Token | Uso |
|-------|-----|
| `--dss-surface-muted` | Fundo base da aplicação |
| `--dss-text-body` | Cor de texto padrão |

## Status

| Campo | Valor |
|-------|-------|
| **Versão** | 1.0.0 |
| **DSS** | v2.2 |
| **Fase** | 2 — Nível 4 (Composição de Terceiro Grau) |
| **Status** | Pendente de auditoria |
| **Dependências** | DssHeader, DssFooter, DssDrawer (todos selados v2.2) |
