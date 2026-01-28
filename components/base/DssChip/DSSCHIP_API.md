# DssChip API - Documentação Completa

## 📋 Visão Geral

O `DssChip` é um wrapper DSS baseado no QChip, com **API pública governada pelo Design System Sansys**. O DSS curou deliberadamente esta API para garantir consistência visual e brandabilidade corporativa.

---

## 🎯 Props Completas

### **Conteúdo**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | String | `''` | Texto do chip |
| `icon` | String | `''` | Ícone à esquerda (Material Icons) |
| `icon-right` | String | `''` | Ícone à direita (Material Icons) |
| `icon-remove` | String | `'cancel'` | Ícone do botão remover |
| `icon-selected` | String | `'check'` | Ícone quando selecionado |

**Exemplo:**
```vue
<DssChip label="Tag" icon="star" />
<DssChip label="Próximo" icon-right="arrow_forward" />
<DssChip icon="settings" aria-label="Configurações" />
```

---

### **Variantes Visuais**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | String | `'filled'` | `filled`, `outline`, `flat` | Estilo visual do chip |

**Exemplo:**
```vue
<DssChip variant="filled" label="Filled (Padrão)" />
<DssChip variant="outline" label="Outline" />
<DssChip variant="flat" label="Flat" />
```

**Características por Variante:**
- `filled`: Background sólido, texto contrastante (padrão)
- `outline`: Background transparente com borda colorida
- `flat`: Background transparente sem borda, apenas texto colorido

---

### **Cores**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `color` | String | `'primary'` | `primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info`, `grey` | Cor semântica do chip |

**Exemplo:**
```vue
<DssChip color="primary" label="Primary" />
<DssChip color="positive" label="Success" />
<DssChip color="negative" label="Error" />
<DssChip color="warning" label="Warning" />
```

---

### **Tamanhos**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg` | Tamanho do chip |

**Especificações:**

| Size | Min-Height | Font Size | Padding |
|------|------------|-----------|---------|
| `xs` | 24px | 12px | 2px 8px |
| `sm` | 28px | 12px | 2px 10px |
| `md` | 32px | 14px | 4px 12px |
| `lg` | 40px | 16px | 8px 16px |

**Exemplo:**
```vue
<DssChip size="xs" label="Extra Small" />
<DssChip size="sm" label="Small" />
<DssChip size="md" label="Medium" />
<DssChip size="lg" label="Large" />
```

---

### **Formas**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `round` | Boolean | `true` | Bordas completamente arredondadas (pill shape) |
| `square` | Boolean | `false` | Bordas quadradas (border-radius pequeno) |

**Exemplo:**
```vue
<DssChip round label="Round (Padrão)" />
<DssChip square label="Square" />
```

---

### **Estados**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `selected` | Boolean | `false` | Estado de seleção visual |
| `disable` | Boolean | `false` | Desabilita todas as interações |
| `clickable` | Boolean | `false` | Torna o chip clicável |
| `removable` | Boolean | `false` | Exibe botão de remoção |
| `dense` | Boolean | `false` | Versão compacta (reduz padding) |

**Exemplo:**
```vue
<!-- Chip clicável -->
<DssChip clickable @click="handleClick" label="Clicável" />

<!-- Chip selecionável -->
<DssChip
  clickable
  :selected="isSelected"
  @update:selected="isSelected = $event"
  label="Selecionável"
/>

<!-- Chip removível -->
<DssChip removable @remove="handleRemove" label="Removível" />

<!-- Chip desabilitado -->
<DssChip disable label="Desabilitado" />

<!-- Chip denso -->
<DssChip dense label="Denso" />
```

---

### **Interação**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ripple` | Boolean | `true` | Efeito ripple Material Design |
| `tabindex` | Number \| String | `null` | Ordem de navegação por teclado |

**Exemplo:**
```vue
<!-- Ripple desabilitado -->
<DssChip clickable :ripple="false" label="Sem Ripple" />

<!-- Controle de foco -->
<DssChip clickable :tabindex="1" label="Primeiro" />
<DssChip clickable :tabindex="2" label="Segundo" />
```

---

### **Brandabilidade (Exclusivo DSS)**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

**Exemplo:**
```vue
<DssChip brand="hub" class="dss-chip--primary" label="Hub 🟠" />
<DssChip brand="water" class="dss-chip--primary" label="Water 🔵" />
<DssChip brand="waste" class="dss-chip--primary" label="Waste 🟢" />
```

---

### **Acessibilidade**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `aria-label` | String | `''` | Label ARIA (obrigatório para chips icon-only) |
| `remove-aria-label` | String | `'Remover'` | Aria-label do botão de remoção |

**Exemplo:**
```vue
<!-- Chip icon-only com aria-label -->
<DssChip icon="notifications" aria-label="5 notificações" />

<!-- Botão remover com aria-label customizado -->
<DssChip
  removable
  remove-aria-label="Remover tag importante"
  label="Tag Importante"
/>
```

---

## 🎬 Eventos

| Evento | Parâmetros | Descrição |
|--------|------------|-----------|
| `@click` | `event: MouseEvent` | Emitido ao clicar (se `clickable` e não `disable`) |
| `@remove` | `event: MouseEvent` | Emitido ao clicar no botão remover |
| `@update:selected` | `value: Boolean` | Emitido ao alternar seleção (para v-model) |

**Exemplo:**
```vue
<DssChip
  clickable
  :selected="isSelected"
  @click="handleClick"
  @update:selected="isSelected = $event"
  label="Clique Aqui"
/>

<DssChip
  removable
  @remove="handleRemove"
  label="Removível"
/>

<script setup>
import { ref } from 'vue'

const isSelected = ref(false)

function handleClick(event) {
  console.log('Chip clicado!', event)
}

function handleRemove(event) {
  console.log('Chip removido!', event)
}
</script>
```

---

## 🎨 Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal do chip (substitui `label`) |
| `icon` | Ícone customizado à esquerda |
| `icon-right` | Ícone customizado à direita |
| `icon-remove` | Ícone customizado do botão remover |

**Exemplo:**
```vue
<!-- Conteúdo customizado -->
<DssChip>
  <strong>Texto</strong> <em>Formatado</em>
</DssChip>

<!-- Ícone customizado -->
<DssChip label="Custom Icon">
  <template #icon>
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="currentColor"/>
    </svg>
  </template>
</DssChip>
```

---

## 🎨 Sistema de Cores por Variante

### Filled

| Estado | Background | Texto |
|--------|------------|-------|
| Default | `bg-{color}` | `text-white` |
| Hover | `brightness(0.92)` | - |
| Active | `brightness(0.85)` | - |
| Disabled | opacity 0.4 | - |

### Outline

| Estado | Background | Borda | Texto |
|--------|------------|-------|-------|
| Default | `transparent` | `currentColor` | `text-{color}` |
| Hover | `{color}` | - | `white` |
| Active | `brightness(0.9)` | - | - |
| Disabled | opacity 0.4 | - | - |

### Flat

| Estado | Background | Texto |
|--------|------------|-------|
| Default | `transparent` | `text-{color}` |
| Hover | `currentColor` (opacity) | - |
| Active | `currentColor` (opacity mais alta) | - |
| Disabled | opacity 0.4 | - |

---

## 🏷️ Sistema de Hover por Brand

O DssChip responde automaticamente às brands Sansys (Hub, Water, Waste).

### Comportamento de Hover

| Variante | Comportamento |
|----------|---------------|
| **Filled** | Cor base com `brightness(0.92)` no hover |
| **Outline** | Background preenche com cor da brand, texto inverte para branco |
| **Flat** | Overlay sutil com cor da brand |

> Para detalhes das paletas de cores por brand, consulte [`DSS_TOKEN_REFERENCE.md - Seção 2.2`](../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes).

---

## 🎯 API Governada pelo DSS

### Props Curadas do QChip
O DssChip implementa um subconjunto curado das props do QChip:
- `label`, `icon`, `icon-right`, `icon-remove`, `icon-selected`
- `color` (primary, secondary, accent, positive, negative, warning, info)
- `size` (xs, sm, md, lg)
- `selected`, `disable`, `clickable`, `removable`, `dense`
- `ripple`, `tabindex`, `square`

### Props Exclusivas DSS
- `brand` (hub, water, waste) - Sistema de brandabilidade Sansys
- `variant` (filled, outline, flat) - Variantes visuais explícitas
- `round` (Boolean) - Forma pill (arredondada)

### Governança
- Cores são aplicadas via classes utilitárias no Vue, não em SCSS
- Tokens de acessibilidade não devem ser sobrescritos
- Extensões de props devem seguir processo de governança DSS

---

## 📦 Versão

**DSS v2.2.0** - Implementação do DssChip
**Baseado em**: QChip (Quasar Framework)
**Governança**: Design System Sansys

**Última atualização:** Janeiro 2025
**Changelog:**
- ✅ Implementação inicial seguindo arquitetura DSS de 4 camadas
- ✅ 3 variantes visuais (filled, outline, flat)
- ✅ 4 tamanhos (xs, sm, md, lg)
- ✅ Suporte a brands (hub, water, waste)
- ✅ Acessibilidade WCAG 2.1 AA
- ✅ Estados: clickable, selected, removable, disabled, dense

---

## 📚 Recursos

- [Documentação Oficial do Quasar QChip](https://quasar.dev/vue-components/chip)
- [Código-fonte do QChip](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/chip/QChip.js)
- [Design System Sansys - DssChip.md](./DssChip.md)
