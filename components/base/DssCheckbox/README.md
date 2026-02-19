# DssCheckbox

Status: ✅ Selo DSS v2.2
Auditoria Final: 01/02/2026
Golden Reference: DssChip
Golden Context: DssChip
Classificação: Compact Control interativo

Componente de checkbox do Design System Sansys baseado em `<input type="checkbox">` nativo, com API pública governada pelo DSS.

> Compact Control interativo (Fase 1 — Atomic Controls). Golden Context: DssChip.

---

## 1. Visão Geral

O **DssCheckbox** é um componente de checkbox para seleção binária, seleção múltipla em grupo (array model) e ciclo de 3 estados (unchecked → checked → indeterminate).

**Responsabilidade principal:** Controle de formulário para seleção binária ou múltipla, com suporte nativo a acessibilidade, brandabilidade multi-marca e estados interativos.

---

## 2. Quando Usar / Quando NÃO Usar

### Quando Usar

- Seleção binária em formulários (aceite, preferências)
- Seleção múltipla independente (modo grupo com `val`)
- Estado indeterminate (seleção parcial de grupo)
- Filtros múltiplos em listas ou tabelas
- Configurações binárias persistentes em formulários (valores submetidos com o formulário, não ações imediatas)

### Quando NÃO Usar

- **Seleção mutuamente exclusiva** → Use `DssRadio`
- **Seleção em lista longa** → Use `DssSelect` com `multiple`
- **Ação imediata on/off** → Use toggle/switch dedicado (quando disponível)
- **Botões de ação** → Use `DssButton`
- **Tags visuais** → Use `DssChip`

---

## 3. Anatomia do Componente

```
┌──────────────────────────────────────────────────────┐
│  [input hidden]  [■ control]  Label do Checkbox      │
└──────────────────────────────────────────────────────┘
```

### Partes do Componente

| Parte | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Root (`<label>`)** | Elemento raiz, vincula automaticamente o input | Sim |
| **Native Input** | `<input type="checkbox">` oculto (sr-only), foco e teclado | Sim |
| **Control** | Caixa visual do checkbox (`aria-hidden="true"`) | Sim |
| **Check Icon** | `<span class="material-icons">check</span>` (quando checked) | Condicional |
| **Dash Icon** | `<span class="material-icons">remove</span>` (quando indeterminate) | Condicional |
| **Label** | Texto via prop `label` ou slot `default` | Recomendado* |

*Recomendado: `label`, slot `default` ou `aria-label` deve existir para acessibilidade.

---

## 4. Tokens Utilizados

> O componente NÃO aceita valores arbitrários de cores, espaçamentos ou tipografia. Todos os valores são derivados dos tokens DSS.

| Categoria | Tokens Usados | Aplicação no Componente |
|-----------|---------------|-------------------------|
| **Altura Visual** | `--dss-compact-control-height-{xs\|sm\|md\|lg}` | `min-height` do root por size |
| **Touch Target** | `--dss-touch-target-min` | Touch target 48px via `::before` |
| **Espaçamento** | `--dss-spacing-{0_5\|1\|1_5\|2\|3\|4\|5\|6}` | Gap, dimensões do control, focus offset |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-{xs\|sm\|md}`, `--dss-line-height-normal` | Fonte e tamanhos |
| **Bordas** | `--dss-border-width-{md\|thick}`, `--dss-radius-sm` | Borda do control, focus outline |
| **Motion** | `--dss-duration-200`, `--dss-easing-standard` | Transições |
| **Opacidade** | `--dss-opacity-disabled`, `--dss-opacity-50` | Estados disabled |
| **Focus** | `--dss-focus-ring` | Focus ring (WCAG 2.4.7) |
| **Brands** | `--dss-{hub\|water\|waste}-{primary\|secondary\|accent\|on-primary\|on-secondary\|on-accent}` | Cores com brand ativo |

### Mapeamento de Altura Visual por Size

| Prop `size` | Altura Visual | Control (caixa) | Touch Target |
|-------------|---------------|-----------------|--------------|
| `xs` | 20px (`--dss-compact-control-height-xs`) | 16px | 48px via `::before` |
| `sm` | 24px (`--dss-compact-control-height-sm`) | 20px | 48px via `::before` |
| `md` | 28px (`--dss-compact-control-height-md`) | 20px | 48px via `::before` |
| `lg` | 32px (`--dss-compact-control-height-lg`) | 24px | 48px via `::before` |

> **Convenção de Pseudo-elementos**: `::before` é RESERVADO para touch target. `::after` reservado para efeitos visuais.

### Exceções Documentadas

| ID | Valor | Arquivo | Racional |
|----|-------|---------|----------|
| EXC-01 | `brightness(0.95)` | `_base.scss` | Hover em light mode (canônico DSS) |
| EXC-02 | `brightness(1.10)` | `_states.scss` | Hover em dark mode (canônico DSS) |
| EXC-03 | `font-weight: normal` | `_base.scss` | Requisito Material Icons |
| EXC-04 | `saturate(1.2)` | `_states.scss` | High contrast mode (canônico DSS) |
| EXC-05 | `2px`, `3px` | `_states.scss` | Tokens ignorados em `forced-colors: active` |
| EXC-06 | `brightness(0.90)` | `_base.scss` | Active em light mode (canônico DSS) |
| EXC-07 | `brightness(1.20)` | `_states.scss` | Active em dark mode (canônico DSS) |

---

## 5. API Pública

### Props Governadas pelo DSS

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `boolean \| null \| any[]` | `false` | Valor atual (boolean, null, ou array para grupo) |
| `val` | `any` | — | Valor no modo grupo (array model) |
| `trueValue` | `any` | `true` | Valor customizado para estado marcado |
| `falseValue` | `any` | `false` | Valor customizado para estado desmarcado |
| `indeterminateValue` | `any` | `null` | Valor customizado para estado indeterminate |
| `toggleIndeterminate` | `boolean` | `false` | Habilita ciclo de 3 estados |
| `label` | `string` | `''` | Texto do label |
| `leftLabel` | `boolean` | `false` | Label à esquerda do indicador |
| `color` | `CheckboxColor` | `'primary'` | Cor semântica |
| `size` | `CheckboxSize` | `'md'` | Tamanho (`xs`, `sm`, `md`, `lg`) |
| `disable` | `boolean` | `false` | Desabilita interações |
| `dense` | `boolean` | `false` | Modo compacto |
| `brand` | `CheckboxBrand \| null` | `null` | Brand Sansys (`hub`, `water`, `waste`) |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado |
| `ariaLabel` | `string` | — | Label ARIA para o input nativo |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| null \| any[]` | Emitido ao alterar estado (não emite se `disable`) |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado do label (substitui prop `label`) |

---

## 6. Estados

### Estados Suportados

| Estado | Classe CSS | Descrição |
|--------|------------|-----------|
| **Unchecked** | (base) | Caixa vazia com borda |
| **Checked** | `.dss-checkbox--checked` | Caixa preenchida com ícone ✓ |
| **Indeterminate** | `.dss-checkbox--indeterminate` | Caixa preenchida com ícone — |
| **Hover** | `:hover` | `brightness(0.95)` no control |
| **Active** | `:active` | `brightness(0.90)` no control |
| **Focus** | `.dss-checkbox__control--focused` | Focus ring visível |
| **Disabled** | `.dss-checkbox--disabled` | Opacidade reduzida, interações bloqueadas |
| **Loading** | — | Não aplicável. Controle de formulário com alternância instantânea de estado. |

### Modos de Operação

| Modo | Condição | Comportamento |
|------|----------|---------------|
| **Toggle simples** | `modelValue` é boolean | Alterna `trueValue` / `falseValue` |
| **3 estados** | `toggleIndeterminate=true` | Cicla: unchecked → checked → indeterminate |
| **Grupo** | `modelValue` é `any[]` | Adiciona/remove `val` do array |

---

## 7. Acessibilidade

O DssCheckbox segue as diretrizes **WCAG 2.1 nível AA**.

### Recursos Implementados

| Critério | Implementação |
|----------|---------------|
| **Touch targets** | 48px via `::before` (`--dss-touch-target-min`) |
| **Focus ring** | `--dss-focus-ring` com outline-offset, visível quando focado |
| **ARIA** | Input nativo provê `aria-checked`, `aria-disabled`, `indeterminate` → `aria-checked="mixed"` |
| **Keyboard** | Tab (foco), Space (toggle de estado) |
| **Reduced motion** | `prefers-reduced-motion: reduce` → `transition: none` |
| **High contrast** | `prefers-contrast: more` → bordas espessas, saturação aumentada, disabled com distinção visual reforçada |
| **Forced colors** | Compatível com Windows High Contrast Mode |

### Uso Obrigatório

```vue
<!-- Checkbox sem label visual DEVE ter aria-label -->
<DssCheckbox v-model="val" aria-label="Enable notifications" />

<!-- Checkbox com label visual (acessível via <label>) -->
<DssCheckbox v-model="val" label="Accept terms" />
```

---

## 8. Exemplos de Uso

### Exemplo Básico

```vue
<template>
  <DssCheckbox v-model="accepted" label="Accept terms and conditions" />
  <DssCheckbox v-model="val" size="lg" color="positive" label="Large positive" />
</template>
```

### Exemplo: Modo Grupo (Array)

```vue
<template>
  <DssCheckbox v-model="fruits" val="apple" label="Apple" />
  <DssCheckbox v-model="fruits" val="banana" label="Banana" />
  <DssCheckbox v-model="fruits" val="cherry" label="Cherry" />
  <p>Selected: {{ fruits.join(', ') }}</p>
</template>

<script setup>
import { ref } from 'vue'
const fruits = ref(['apple'])
</script>
```

### Exemplo: Ciclo de 3 Estados

```vue
<template>
  <DssCheckbox
    v-model="triState"
    toggle-indeterminate
    label="Cycle: unchecked → checked → indeterminate"
  />
</template>

<script setup>
import { ref } from 'vue'
const triState = ref(false)
</script>
```

### Exemplo com Brandabilidade

```vue
<template>
  <!-- Brand via prop -->
  <DssCheckbox :model-value="true" brand="hub" color="primary" label="Hub Primary" />

  <!-- Brand via contexto -->
  <div data-brand="water">
    <DssCheckbox :model-value="true" color="primary" label="Water Primary" />
  </div>
</template>
```

### Exemplo: Painel de Configurações

```vue
<template>
  <form @submit="saveSettings">
    <DssCheckbox v-model="settings.autoSave" label="Auto-save" />
    <DssCheckbox v-model="settings.spellCheck" label="Spell check" />
    <DssCheckbox v-model="settings.darkMode" label="Dark mode" />
  </form>
</template>

<script setup>
import { reactive } from 'vue'
const settings = reactive({ autoSave: true, spellCheck: false, darkMode: false })
</script>
```

---

## 9. Anti-patterns

### Uso Incorreto

| Anti-pattern | Por quê é incorreto | Alternativa Correta |
|--------------|---------------------|---------------------|
| `style="opacity: 0.3"` | Hardcoded bypassa tokens | Usar prop `disable` |
| Usar como toggle/switch imediato | Checkbox é para seleção persistente em formulários, não ações imediatas | Usar toggle/switch dedicado (quando disponível) |
| Grupo sem `val` | Todos toggleam o mesmo boolean | Definir `val` e usar array model |
| Ignorar indeterminate em "selecionar todos" | Sem feedback visual de seleção parcial | Usar `null` + `toggleIndeterminate` |
| Sem `label` e sem `aria-label` | Inacessível para screen readers | Fornecer pelo menos um |
| Sobrescrever brand com CSS inline | Bypassa sistema de brandabilidade | Usar prop `brand` ou `data-brand` |

---

## 10. Troubleshooting

### Problema: Checkbox não alterna estado

**Causa:** Prop `disable` ativa.
**Solução:** Verificar se `disable` não está `true`.

### Problema: Cores de brand não aplicadas

**Causa 1:** `data-brand` ausente ou não em ancestral.
**Solução:** Usar prop `brand` ou colocar `data-brand` em elemento pai.

**Causa 2:** Cor não suportada com brand. Com brand ativo, apenas `primary`, `secondary` e `accent` possuem mapeamento. As cores `tertiary`, `positive`, `negative`, `warning` e `info` não aplicam cor ao control com brand ativo.
**Solução:** Usar uma das 3 cores suportadas (`primary`, `secondary`, `accent`) quando brand está ativo.

### Problema: Estado indeterminate não aparece

**Causa:** `indeterminate` é propriedade DOM, não atributo HTML.
**Solução:** Passar `null` como `modelValue`. O componente sincroniza automaticamente via `watchEffect`.

### Problema: Ícones não aparecem

**Causa:** Material Icons não carregada.
**Solução:** Adicionar `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`.

### Problema: Modo grupo não funciona

**Causa:** `modelValue` não é array ou `val` não definido.
**Solução:** Inicializar `modelValue` como `ref([])` e definir `val` em cada checkbox.

---

## 11. Governança do Componente

### Extensões Permitidas

- Uso de props públicas documentadas
- Customização via tokens CSS (`--dss-*`)
- Slot `default` para label customizado
- Brands via prop ou contexto `data-brand`

### Extensões Proibidas

- Criar tokens específicos de componente (`--dss-checkbox-*`)
- Sobrescrever estilos com `!important` fora de tokens
- Bypass de brandabilidade via estilos inline
- Usar `::before` para efeitos visuais (reservado para touch target)

### Critérios para Evolução

Qualquer modificação deve:
1. Manter conformidade com tokens DSS existentes
2. Preservar acessibilidade WCAG 2.1 AA
3. Ser compatível com sistema de brandabilidade (Hub/Water/Waste)
4. Passar pela arquitetura de 4 camadas

---

## Recursos Adicionais

- [DSSCHECKBOX_API.md](./DSSCHECKBOX_API.md) - Referência técnica completa
- [DssCheckbox.md](./DssCheckbox.md) - Documentação Template 13.1
- [DssCheckbox.example.vue](./DssCheckbox.example.vue) - Showcase visual
- [DSS_TOKEN_REFERENCE.md](../../../docs/reference/DSS_TOKEN_REFERENCE.md) - Catálogo de tokens

---

**Versão:** 1.0.0
**Data:** Janeiro 2026
**Governança:** Design System Sansys (DSS)
