# DssTabs

Container de navegação por abas — wrapper DSS governado sobre QTabs do Quasar.

**Fase:** 2 (Composto) | **Golden Reference:** DssBtnGroup | **Golden Context:** DssCard

---

## Uso básico

```vue
<template>
  <DssTabs v-model="aba" aria-label="Seções do painel">
    <DssTab name="visao-geral" label="Visão Geral" />
    <DssTab name="detalhes" label="Detalhes" />
    <DssTab name="historico" label="Histórico" />
  </DssTabs>
</template>

<script setup>
import { ref } from 'vue'
import { DssTabs } from '@/dss/components/base/DssTabs'
import { DssTab } from '@/dss/components/base/DssTab'

const aba = ref('visao-geral')
</script>
```

---

## Props principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `v-model` | `string \| number` | — | Aba ativa |
| `align` | `left \| center \| right \| justify` | `left` | Alinhamento |
| `breakpoint` | `number` | `600` | Largura para exibir setas (px) |
| `vertical` | `boolean` | `false` | Layout vertical |
| `dense` | `boolean` | `false` | Modo compacto |
| `brand` | `hub \| water \| waste \| null` | `null` | Marca visual |
| `ariaLabel` | `string` | — | Label acessível |

---

## Alinhamentos

```vue
<!-- Abas à esquerda (padrão) -->
<DssTabs v-model="aba" align="left"> ... </DssTabs>

<!-- Abas centralizadas -->
<DssTabs v-model="aba" align="center"> ... </DssTabs>

<!-- Abas à direita -->
<DssTabs v-model="aba" align="right"> ... </DssTabs>

<!-- Abas distribuídas (toda a largura) -->
<DssTabs v-model="aba" align="justify"> ... </DssTabs>
```

---

## Modo vertical

```vue
<DssTabs v-model="aba" vertical aria-label="Configurações">
  <DssTab name="conta" label="Conta" />
  <DssTab name="seguranca" label="Segurança" />
</DssTabs>
```

---

## Com brand

```vue
<!-- Aplicar brand no DssTabs propaga automaticamente para DssTab filhos -->
<DssTabs v-model="aba" brand="hub" aria-label="Painel Hub">
  <DssTab name="dados" label="Dados" />
  <DssTab name="alertas" label="Alertas" />
</DssTabs>
```

---

## Regras de uso

### ✅ Correto
- Usar apenas `DssTab` dentro do slot
- Definir `aria-label` quando não há label visual
- Usar `v-model` para controlar a aba ativa

### ❌ Anti-patterns
- Usar `<q-tab>` diretamente dentro do DssTabs
- Tentar sobrescrever `active-color`, `indicator-color` (bloqueados)
- Usar DssTab fora de DssTabs (ou q-tabs como fallback temporário)

---

## Documentação completa

- [DssTabs.md](./DssTabs.md) — Documentação normativa completa (Template 13.1)
- [DSSTABS_API.md](./DSSTABS_API.md) — Referência técnica de API
- [DssTabs.example.vue](./DssTabs.example.vue) — Exemplos interativos
