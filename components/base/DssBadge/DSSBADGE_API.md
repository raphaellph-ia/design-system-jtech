# DssBadge API - Referencia Tecnica

> **Documento referencial** - Para governanca e boas praticas, consulte [DssBadge.md](./DssBadge.md) (normativo).

## Visao Geral

O `DssBadge` e um **wrapper DSS baseado no QBadge**, com API publica governada pelo Design System Sansys. Este documento serve como referencia tecnica para props, slots e tipos TypeScript.

---

## Props Completas

### Conteudo

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `label` | String \| Number | `''` | Conteúdo do badge |

**Exemplo:**
```vue
<DssBadge label="10" />
<DssBadge label="NEW" />
<DssBadge :label="unreadCount" />
```

---

### Cores

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------| | `color` | String | `'primary'` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo do badge |
| `textColor` | String | `null` | Qualquer cor semântica | Cor do texto (sobrescreve cor padrão) |

**Exemplo:**
```vue
<DssBadge color="primary" label="5" />
<DssBadge color="positive" label="✓" />
<DssBadge color="negative" label="!" />
<DssBadge color="warning" label="⚠" />
<DssBadge color="primary" text-color="white" label="Custom" />
```

---

### Posicionamento

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `floating` | Boolean | `false` | Badge posicionado de forma absoluta (top-right) |
| `align` | String | `null` | Alinhamento vertical (`top`, `middle`, `bottom`) |

**Exemplo:**
```vue
<!-- Badge floating sobre um botão -->
<DssButton>
  Mensagens
  <DssBadge floating color="negative" label="3" />
</DssButton>

<!-- Badge inline com alinhamento -->
<span>Status <DssBadge align="middle" label="Online" color="positive" /></span>
```

---

### Variantes Visuais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `transparent` | Boolean | `false` | Badge com fundo transparente (mantém cor do texto) |
| `outline` | Boolean | `false` | Badge com borda colorida (sem preenchimento) |
| `rounded` | Boolean | `false` | Badge com bordas mais arredondadas (menos pill) |
| `multiLine` | Boolean | `false` | Permite texto em múltiplas linhas |

**Exemplo:**
```vue
<!-- Badge transparente -->
<DssBadge transparent color="primary" label="Transparente" />

<!-- Badge outline -->
<DssBadge outline color="secondary" label="Outline" />

<!-- Badge rounded -->
<DssBadge rounded label="Rounded" />

<!-- Badge multi-line -->
<DssBadge multi-line label="Texto longo que pode quebrar em múltiplas linhas" />
```

---

## Slots

| Slot | Descrição |
|------|-----------| | `default` | Conteúdo do badge (substitui `label`) |

**Exemplo:**
```vue
<DssBadge color="primary">
  <strong>10</strong>
</DssBadge>

<DssBadge color="positive">
  <span class="material-icons">check</span>
</DssBadge>
```

---

## Casos de Uso Comuns

### **1. Badge de Notificação (Floating)**

```vue
<template>
  <DssButton>
    Notificações
    <DssBadge
      floating
      color="negative"
      :label="unreadCount"
    />
  </DssButton>
</template>

<script setup>
import { ref } from 'vue'
const unreadCount = ref(7)
</script>
```

### **2. Badge de Status**

```vue
<DssBadge
  color="positive"
  label="Online"
  rounded
/>

<DssBadge
  color="warning"
  label="Away"
  rounded
/>

<DssBadge
  color="negative"
  label="Offline"
  rounded
/>
```

### **3. Badge Outline (Sutil)**

```vue
<DssBadge
  outline
  color="primary"
  label="Beta"
/>

<DssBadge
  outline
  color="info"
  label="v2.0"
/>
```

### **4. Badge Transparente (Mínimo)**

```vue
<DssBadge
  transparent
  color="primary"
  label="NEW"
/>
```

### **5. Badge Vazio (Dot Indicator)**

```vue
<!-- Badge sem label = dot pequeno -->
<DssBadge color="positive" />
<DssBadge color="negative" />

<!-- Badge floating vazio -->
<DssButton icon="notifications">
  <DssBadge floating color="negative" />
</DssButton>
```

### **6. Badge com Ícone**

```vue
<DssBadge color="positive">
  <span class="material-icons">check_circle</span>
</DssBadge>

<DssBadge color="warning">
  <span class="material-icons">warning</span>
</DssBadge>
```

### **7. Badge Multi-Line**

```vue
<DssBadge
  multi-line
  color="info"
  label="Mensagem longa que precisa de múltiplas linhas"
  style="max-width: 200px;"
/>
```

---

## Integracao com Outros Componentes

### **Com DssButton**

```vue
<!-- Badge de notificação -->
<DssButton icon="mail">
  Email
  <DssBadge floating color="primary" label="12" />
</DssButton>

<!-- Badge inline -->
<DssButton>
  Inbox
  <DssBadge color="negative" label="5" />
</DssButton>
```

### **Com DssAvatar**

```vue
<DssAvatar icon="person">
  <DssBadge floating color="positive" />
</DssAvatar>
```

### **Em Listas**

```vue
<div class="notification-list">
  <div class="item">
    Mensagens
    <DssBadge color="primary" label="3" />
  </div>
  <div class="item">
    Comentários
    <DssBadge color="info" label="8" />
  </div>
</div>
```

---

## Relacao com Quasar QBadge

> **Governanca**: O DssBadge e um **wrapper governado pelo DSS**, nao uma copia do QBadge. A API publica e deliberadamente curada para garantir consistencia, acessibilidade e brandabilidade.

### Props Governadas pelo DSS (API Publica)

Props aprovadas e mantidas pelo Design System:

| Prop | Origem | Categoria |
|------|--------|-----------|
| `label` | QBadge | Recomendado |
| `color` | QBadge | Recomendado |
| `textColor` | QBadge | Opcional |
| `floating` | QBadge | Recomendado |
| `align` | QBadge | Opcional |
| `transparent` | QBadge | Opcional |
| `outline` | QBadge | Recomendado |
| `rounded` | QBadge | Opcional |
| `multiLine` | QBadge | Opcional |
| `brand` | DSS | Recomendado |
| `ariaLabel` | DSS | Recomendado |

### Props Exclusivas DSS (Extensoes)

| Prop | Descricao | Categoria |
|------|-----------|-----------|
| `brand` | Brandabilidade Sansys (hub, water, waste) | Recomendado |
| `ariaLabel` | Label ARIA customizado | Recomendado |
| `color="tertiary"` | Cor terciaria semantica | Opcional |

### Props do QBadge FORA do Escopo DSS

> Estas props existem no QBadge mas **nao sao governadas pelo DSS**. Se necessarias, implemente via wrappers externos.

| Prop QBadge | Por que fora de escopo | Alternativa |
|-------------|------------------------|-------------|
| Animacoes customizadas | Complexidade de manutencao | CSS externo |
| Interacoes complexas | Badge nao e interativo | Use `DssChip` |

---

## Dimensoes Padrao

| Tipo | Min Width | Min Height | Padding | Font Size |
|------|-----------|------------|---------|-----------|
| **Normal** | 24px | 24px | 4px 8px | 12px |
| **Floating** | 20px | 20px | 4px 4px | 11px |
| **Vazio (dot)** | 12px | 12px | 0 | - |
| **Floating vazio** | 16px | 16px | 0 | - |
| **Multi-line** | 24px | 32px | 4px 12px | 12px |

---

## Classes CSS Geradas

```scss
.dss-badge                    // Base
.dss-badge--primary           // Cor primária
.dss-badge--floating          // Posicionamento absoluto
.dss-badge--transparent       // Fundo transparente
.dss-badge--outline           // Com borda
.dss-badge--rounded           // Bordas arredondadas
.dss-badge--multi-line        // Múltiplas linhas
.dss-badge--text-{color}      // Cor de texto customizada
```

---

## Acessibilidade

### ARIA Labels
```vue
<DssBadge
  aria-label="3 novas notificações"
  label="3"
  color="negative"
/>
```

### High Contrast Mode
```scss
@media (prefers-contrast: high) {
  .dss-badge {
    border-width: 2px !important;
    font-weight: 700;
  }
}
```

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  .dss-badge {
    transition: none !important;
  }
}
```

---

## Versao

**DSS v2.3.0** - TypeScript + Composition API
**Compatibilidade**: Quasar v2.x, Vue 3.x

**Ultima atualizacao:** Janeiro 2026
**Changelog:**
- Migrado para TypeScript + Composition API
- Prop `brand` para brandabilidade Sansys
- Prop `ariaLabel` para acessibilidade
- Composables totalmente tipados

---

## Recursos

- [Documentacao Oficial do Quasar QBadge](https://quasar.dev/vue-components/badge)
- [Design System Sansys - DssBadge.md](./DssBadge.md)
- [DSS Token Reference](../../../docs/reference/DSS_TOKEN_REFERENCE.md)
