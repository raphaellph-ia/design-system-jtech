# DssCard - Arquitetura em 4 Camadas

**Componente de Card** baseado no Quasar q-card, implementado com a nova arquitetura DSS em 4 camadas.

> **📋 Documentação Completa:** [DssCard.md](./DssCard.md)
> Este README é um guia rápido. Para documentação completa (Template 13.1), consulte **DssCard.md**.

---

## 🚀 Quick Start

### Instalação

```javascript
import { DssCard, DssCardSection, DssCardActions } from '@/dss/components/base/DssCard'
```

### Uso Básico

```vue
<template>
  <DssCard variant="elevated">
    <DssCardSection>
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </DssCardSection>

    <DssCardActions align="right">
      <DssButton variant="flat">Cancel</DssButton>
      <DssButton color="primary">Confirm</DssButton>
    </DssCardActions>
  </DssCard>
</template>
```

---

## 📁 Estrutura de Arquivos

```
DssCard/
├── 1-structure/              # LAYER 1: Estrutura Vue
│   ├── DssCard.vue           (template + props + acessibilidade)
│   ├── DssCardSection.vue    (seções de conteúdo)
│   └── DssCardActions.vue    (área de ações)
│
├── 2-composition/            # LAYER 2: Composição Base
│   └── _base.scss            (estilos fundamentais)
│
├── 3-variants/               # LAYER 3: Variantes
│   ├── _elevated.scss        (com elevação - padrão)
│   ├── _flat.scss            (sem elevação)
│   ├── _bordered.scss        (borda + elevação)
│   ├── _outlined.scss        (borda apenas)
│   └── index.scss            (orquestrador)
│
├── 4-output/                 # LAYER 4: Output Final
│   ├── _states.scss          (dark mode, focus, clickable)
│   ├── _brands.scss          (Hub, Water, Waste)
│   └── index.scss            (orquestrador)
│
├── DssCard.module.scss       # Importa todas as camadas (~40 linhas)
├── DssCard.vue               # Re-export principal
├── DssCard.example.vue       # 19 secoes de exemplos (11 base + 8 composicao DSS)
├── DssCard.md                # 📋 Documentação Completa (Template 13.1)
├── index.js                  # Exports
└── README.md                 # Esta documentação (Quick Start)
```

---

## 🎯 Filosofia das 4 Camadas

### **LAYER 1: Structure (Estrutura)**
**Responsabilidade:** Template HTML + Props + Interface

**Características:**
- ✅ APENAS template e props
- ✅ Zero lógica de estilos
- ✅ Componentes pequenos (~100 linhas)

**Exemplo:**
```vue
<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    variant: { type: String, default: 'elevated' },
    clickable: Boolean
  }
}
</script>
```

---

### **LAYER 2: Composition (Composição Base)**
**Responsabilidade:** Estilos fundamentais usando APENAS tokens genéricos

**Características:**
- ✅ Reset e layout base
- ✅ ZERO valores hardcoded
- ✅ Usa tokens: `var(--dss-spacing-*)`, `var(--dss-radius-*)`
- ✅ Mixins: `@include dss-transition()`

**Exemplo:**
```scss
.dss-card {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-lg);
  padding: var(--dss-spacing-6);
}
```

---

### **LAYER 3: Variants (Variantes)**
**Responsabilidade:** Variações visuais do componente

**Características:**
- ✅ 1 arquivo = 1 variante (~50 linhas)
- ✅ Fácil debug (problema no outlined? → `_outlined.scss`)
- ✅ Reutilizável (shared/variants no futuro)

**Variantes Disponíveis:**
- `elevated` - Com elevação (padrão Quasar)
- `flat` - Sem elevação
- `bordered` - Borda + elevação
- `outlined` - Borda apenas (sem elevação)

**Exemplo:**
```scss
.dss-card--outlined {
  border: var(--dss-border-width-thin) solid var(--dss-gray-300);
  box-shadow: none;

  &.dss-card--clickable:hover {
    border-color: var(--dss-action-primary);
  }
}
```

---

### **LAYER 4: Output (Saída Final)**
**Responsabilidade:** Estados especiais e orquestração final

**Características:**
- ✅ Dark mode
- ✅ Brandability (Hub, Water, Waste)
- ✅ Estados (loading, focus, disabled)
- ✅ Accessibility enhancements

**Exemplo:**
```scss
[data-theme="dark"] .dss-card {
  background-color: var(--dss-surface-dark);
  color: var(--dss-text-inverse);
}

.dss-card--brand-hub {
  border-left: var(--dss-border-width-thick) solid var(--dss-hub-600);
}
```

---

## 🚀 Uso Básico

### **Importação**

```javascript
import { DssCard, DssCardSection, DssCardActions } from '@/dss/components/base/DssCard'
```

### **Exemplo 1: Card Simples**

```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </DssCardSection>
</DssCard>
```

### **Exemplo 2: Card Clickable**

```vue
<DssCard variant="elevated" clickable @click="handleClick">
  <DssCardSection>
    <h3>Clickable Card</h3>
    <p>Hover to see elevation increase.</p>
  </DssCardSection>
</DssCard>
```

### **Exemplo 3: Card com Ações**

```vue
<DssCard variant="bordered">
  <DssCardSection>
    <h3>Confirmation</h3>
    <p>Are you sure you want to proceed?</p>
  </DssCardSection>

  <DssCardActions align="right">
    <DssButton @click="cancel">Cancel</DssButton>
    <DssButton color="primary" @click="confirm">Confirm</DssButton>
  </DssCardActions>
</DssCard>
```

### **Exemplo 4: Card com Brand**

```vue
<DssCard variant="outlined" brand="hub">
  <DssCardSection>
    <h3>Hub Card</h3>
    <p>Card with Hub brand accent (orange).</p>
  </DssCardSection>
</DssCard>
```

### **Exemplo 5: Card Horizontal**

```vue
<DssCard variant="elevated">
  <DssCardSection horizontal>
    <img src="avatar.jpg" alt="User" />
    <div>
      <h3>User Name</h3>
      <p>User description</p>
    </div>
  </DssCardSection>
</DssCard>
```

---

## 🎨 Props API

### **DssCard**

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `variant` | String | `'elevated'` | `elevated`, `flat`, `bordered`, `outlined` | Visual variant |
| `square` | Boolean | `false` | - | Remove border-radius |
| `clickable` | Boolean | `false` | - | Make card clickable |
| `dark` | Boolean | `false` | - | Dark mode |
| `brand` | String | `null` | `hub`, `water`, `waste` | Brand accent |

### **DssCardSection**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `horizontal` | Boolean | `false` | Horizontal layout |

### **DssCardActions**

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `align` | String | `'right'` | `left`, `center`, `right`, `between`, `around` | Alignment |
| `vertical` | Boolean | `false` | - | Vertical layout |

---

## ✅ Benefícios da Arquitetura em 4 Camadas

### **1. Separação de Responsabilidades**
Cada arquivo tem 1 responsabilidade única:
- `_elevated.scss` → APENAS variante elevated
- `_brands.scss` → APENAS brandability
- Fácil encontrar e corrigir bugs

### **2. Arquivos Pequenos**
```
ANTES (monolítico):
- DssCard.module.scss → 800 linhas

DEPOIS (4 camadas):
- _base.scss → ~100 linhas
- _elevated.scss → ~30 linhas
- _flat.scss → ~25 linhas
- _bordered.scss → ~35 linhas
- _outlined.scss → ~35 linhas
- _states.scss → ~60 linhas
- _brands.scss → ~100 linhas
- DssCard.module.scss → ~40 linhas (orquestrador)

Total: ~425 linhas (melhor organizadas)
```

### **3. Reutilização**
Variantes podem ser compartilhadas:
```scss
// Futuro: shared/variants/_outlined.scss
// Usado por: DssCard, DssButton, DssInput, etc.
```

### **4. Testabilidade**
```javascript
// Testar APENAS variante outlined
import outlinedStyles from './3-variants/_outlined.scss'

test('outlined has border', () => {
  // test isolated
})
```

### **5. Manutenção**
```
Bug no hover do outlined clickable?
→ Ir direto: 3-variants/_outlined.scss linha 8

vs ANTES:
→ DssCard.module.scss linha ??? (procurar em 800 linhas)
```

---

## ✨ Mudanças Recentes (Janeiro 2025)

### Refatoração Completa Baseada em Documentação

O DssCard foi completamente refatorado para estar **alinhado** com a documentação oficial ([DssCard.md](./DssCard.md)):

#### 1. **Acessibilidade Aprimorada (WCAG 2.1 AA)**
- ✅ Cards clickable agora são navegáveis por teclado (Tab, Enter, Space)
- ✅ Adicionado automaticamente `tabindex="0"` e `role="article"` quando `clickable="true"`
- ✅ Handler `handleKeydown` para Enter e Space
- ✅ Focus ring visível via `--dss-focus-shadow-primary`

#### 2. **Brandabilidade Simplificada**
- ✅ Brand agora é **APENAS** via border-left colorida (4px)
- ✅ Removido background sutil da primeira section (não documentado)
- ✅ Mais sutil e consistente com diretrizes do DSS

#### 3. **Estados Corrigidos**
- ✅ Removido estado de loading (pertence a componentes internos)
- ✅ Cards são **superfícies estruturais** - loading/disabled/error pertencem aos componentes internos
- ✅ Adicionado `cursor: pointer` para cards clickable

#### 4. **Exemplos Completos**
- ✅ Arquivo `DssCard.example.vue` com **11 seções de exemplos**
- ✅ 30+ exemplos práticos baseados na documentação oficial
- ✅ Todos os casos de uso documentados implementados

#### 5. **Documentação Completa**
- ✅ [DssCard.md](./DssCard.md) criado seguindo **Template 13.1** (padrão DssButton)
- ✅ 13 seções obrigatórias: Visão Geral, API, Estados, Variantes, Acessibilidade, Anti-patterns, etc.
- ✅ 1.227 linhas de documentação técnica completa

---

## 🔧 Tokens Utilizados

**ZERO tokens component-specific!** Apenas tokens genéricos reutilizáveis:

### **Spacing**
- `--dss-spacing-2` (gaps)
- `--dss-spacing-4` (actions padding)
- `--dss-spacing-6` (section padding)

### **Border Radius**
- `--dss-radius-lg` (card corners)

### **Borders**
- `--dss-border-width-thin` (dividers, outlined)
- `--dss-border-width-thick` (brand accent)

### **Colors**
- `--dss-surface-default` (background)
- `--dss-surface-dark` (dark mode)
- `--dss-gray-200`, `--dss-gray-300`, `--dss-gray-400` (borders)
- `--dss-surface-hover`, `--dss-surface-active` (hover/active states)

### **Elevation**
- `--dss-elevation-1` (default)
- `--dss-elevation-2` (hover)
- `--dss-shadow-active` (active)
- `--dss-focus-shadow-primary` (focus)

### **Brand**
- `--dss-hub-600`, `--dss-hub-300`, `--dss-hub-400`, `--dss-hub-700`
- `--dss-water-500`, `--dss-water-200`, `--dss-water-300`, `--dss-water-600`
- `--dss-waste-600`, `--dss-waste-200`, `--dss-waste-300`, `--dss-waste-700`

---

## 🔗 Composicao com Componentes DSS

O DssCard funciona como superficie para composicao com outros componentes DSS existentes. Exemplos completos em `DssCard.example.vue` (secoes 12-19).

### Card com Avatar (Perfil)

```vue
<DssCard variant="elevated">
  <DssCardSection horizontal>
    <DssAvatar src="/foto.jpg" size="lg" />
    <div>
      <h3>Maria Silva</h3>
      <p>Engenheira de Software</p>
    </div>
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton variant="flat">Mensagem</DssButton>
    <DssButton color="primary">Ver Perfil</DssButton>
  </DssCardActions>
</DssCard>
```

### Form Card (Input + Button)

```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h3>Contato</h3>
    <DssInput v-model="name" label="Nome" />
    <DssInput v-model="email" label="E-mail" type="email" />
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton variant="flat">Cancelar</DssButton>
    <DssButton color="primary">Enviar</DssButton>
  </DssCardActions>
</DssCard>
```

### Dashboard Card Misto

```vue
<DssCard variant="elevated" brand="hub">
  <DssCardSection horizontal>
    <DssAvatar src="/lead.jpg" size="lg" />
    <div style="flex: 1;">
      <div style="display: flex; align-items: center; gap: var(--dss-spacing-2);">
        <h3>Carlos Mendes</h3>
        <DssBadge color="info">Tech Lead</DssBadge>
      </div>
      <p>Equipe de Engenharia</p>
    </div>
  </DssCardSection>
  <DssCardSection>
    <DssChip>Vue.js</DssChip>
    <DssChip>Node.js</DssChip>
    <DssChip color="primary">DSS</DssChip>
  </DssCardSection>
  <DssCardActions align="right">
    <DssButton variant="flat">Projetos</DssButton>
    <DssButton color="primary">Contatar</DssButton>
  </DssCardActions>
</DssCard>
```

### Componentes DSS Recomendados para Composicao

| Componente | Caso de Uso |
|------------|-------------|
| DssAvatar | Perfis, fotos de usuario |
| DssBadge | Status, contadores |
| DssButton | Acoes em DssCardActions |
| DssCheckbox | Listas de selecao |
| DssChip | Tags, categorias |
| DssInput | Formularios embutidos |
| DssRadio | Selecao exclusiva |
| DssToggle | Configuracoes on/off |
| DssTooltip | Info contextual em titulos |

> **Documentacao completa de composicao:** Ver DssCard.md, Secao 17.

---

## 📝 Notas de Migração do Quasar

### **Props Compatíveis**
✅ `flat` → `variant="flat"`
✅ `bordered` → `variant="bordered"`
✅ `square` → `square`
✅ `dark` → `dark`

### **Subcomponentes**
✅ `q-card-section` → `DssCardSection`
✅ `q-card-actions` → `DssCardActions`

### **Diferenças**
⚠️ `variant="outlined"` é novo (bordered sem elevation)
⚠️ `brand` é específico do DSS (Hub, Water, Waste)

---

## 🎯 Próximos Passos

### **Melhorias Futuras**
- [ ] Shared variants (`shared/variants/_outlined.scss`)
- [ ] Animações de entrada (fade-in, slide-in)
- [ ] Skeleton loading state
- [ ] Drag & drop support

### **Testes**
- [ ] Unit tests (variantes)
- [ ] Integration tests (subcomponentes)
- [ ] Visual regression tests
- [ ] Accessibility tests (WCAG 2.1 AA)

---

**Criado:** 18 de Dezembro de 2025
**Arquitetura:** 4 Camadas DSS v2.0
**Filosofia:** Tokens = Provedores, Componentes = Consumidores
