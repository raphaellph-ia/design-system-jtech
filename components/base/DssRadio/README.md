# DssRadio

**Versao:** 1.0.0 | **Status:** Pre-normativo | **Classificacao:** Compact Control interativo

Componente de selecao exclusiva para formularios. Permite ao usuario escolher exatamente uma opcao entre varias alternativas dentro de um grupo.

---

## Quando Usar

- Selecao exclusiva entre 2 a 7 opcoes
- Opcoes mutuamente exclusivas em formularios
- Quando o usuario precisa ver todas as opcoes simultaneamente
- Configuracoes onde apenas uma opcao e valida

## Quando NAO Usar

| Cenario | Alternativa Recomendada |
|---------|------------------------|
| Selecao booleana (sim/nao) | `DssCheckbox` |
| Selecao multipla | `DssCheckbox` (grupo) |
| Muitas opcoes (8+) | `DssSelect` |
| Alternancia on/off | `DssToggle` |
| Navegacao entre views | `DssTabs` |

---

## Uso Basico

```vue
<template>
  <div>
    <DssRadio v-model="selected" val="a" name="grupo" label="Opcao A" />
    <DssRadio v-model="selected" val="b" name="grupo" label="Opcao B" />
    <DssRadio v-model="selected" val="c" name="grupo" label="Opcao C" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selected = ref('a')
</script>
```

---

## Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `modelValue` | `any` | — | Valor atual do grupo (v-model) |
| `val` | `any` | — | Valor que este radio representa |
| `name` | `string` | — | Nome do grupo |
| `label` | `string` | — | Texto do label |
| `leftLabel` | `boolean` | `false` | Label a esquerda |
| `color` | `RadioColor` | `'primary'` | Cor semantica |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `disable` | `boolean` | `false` | Desabilitado |
| `dense` | `boolean` | `false` | Modo compacto |
| `error` | `boolean` | `false` | Estado de erro |
| `errorMessage` | `string` | — | Mensagem de erro |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand Sansys |
| `tabindex` | `number \| string \| null` | `null` | Indice de tabulacao |
| `ariaLabel` | `string` | — | Label acessivel |

### Cores Disponveis

`primary` | `secondary` | `tertiary` | `accent` | `positive` | `negative` | `warning` | `info`

---

## Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido ao selecionar. Payload = valor da prop `val` |

---

## Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo customizado do label |

---

## Expose

| Metodo | Descricao |
|--------|-----------|
| `focus()` | Foca o input programaticamente |
| `blur()` | Remove foco |
| `inputRef` | Referencia ao input nativo |

---

## Tamanhos

| Tamanho | Altura visual | Controle | Token |
|---------|--------------|----------|-------|
| `xs` | 20px | 16px | `--dss-compact-control-height-xs` |
| `sm` | 24px | 20px | `--dss-compact-control-height-sm` |
| `md` | 28px | 20px | `--dss-compact-control-height-md` |
| `lg` | 32px | 24px | `--dss-compact-control-height-lg` |

Touch target: 48px via `::before` (WCAG 2.5.5). Modo `dense` reduz gap, altura e tamanho da fonte, e remove touch target expandido.

---

## Estados

### Default (nao selecionado)
Circulo vazio com borda `currentColor`.

### Checked (selecionado)
Circulo interno preenchido (`.dss-radio__dot`). Cor determinada pela prop `color` ou `brand`.

### Hover
```scss
filter: brightness(0.95); // Light mode — valor canonico DSS
filter: brightness(1.10); // Dark mode — valor canonico DSS
```

### Active / Pressed
```scss
filter: brightness(0.90); // Light mode — valor canonico DSS
filter: brightness(1.20); // Dark mode — valor canonico DSS
```

### Focus
```scss
outline: var(--dss-border-width-md) solid var(--dss-focus-ring);
outline-offset: var(--dss-spacing-0_5); // 2px
```

### Disabled
```scss
opacity: var(--dss-opacity-disabled); // 0.4
cursor: not-allowed;
pointer-events: none;
```

### Error
```scss
border-color: var(--dss-error-600);
color: var(--dss-error-600);
// Dark mode: var(--dss-error-400)
```

---

## Brandabilidade

O DssRadio suporta os 3 brands Sansys:

```vue
<!-- Via prop brand -->
<DssRadio brand="hub" color="primary" />

<!-- Via contexto data-brand -->
<div data-brand="water">
  <DssRadio color="primary" />
</div>
```

Brands disponveis: `hub` (laranja), `water` (azul), `waste` (verde).

---

## Exemplos

### Grupo basico
```vue
<DssRadio v-model="val" val="a" name="g1" label="Opcao A" />
<DssRadio v-model="val" val="b" name="g1" label="Opcao B" />
<DssRadio v-model="val" val="c" name="g1" label="Opcao C" />
```

### Com cores
```vue
<DssRadio v-model="val" val="a" name="g2" label="Primary" color="primary" />
<DssRadio v-model="val" val="b" name="g2" label="Positive" color="positive" />
<DssRadio v-model="val" val="c" name="g2" label="Negative" color="negative" />
```

### Tamanhos
```vue
<DssRadio v-model="val" val="a" name="g3" label="XS" size="xs" />
<DssRadio v-model="val" val="b" name="g3" label="SM" size="sm" />
<DssRadio v-model="val" val="c" name="g3" label="MD" size="md" />
<DssRadio v-model="val" val="d" name="g3" label="LG" size="lg" />
```

### Label a esquerda
```vue
<DssRadio v-model="val" val="a" name="g4" label="Esquerda" left-label />
```

### Desabilitado
```vue
<DssRadio v-model="val" val="a" name="g5" label="Desabilitado" disable />
```

### Com erro
```vue
<DssRadio
  v-model="val"
  val="a"
  name="g6"
  label="Selecione"
  error
  error-message="Campo obrigatorio"
/>
```

### Brand Sansys
```vue
<div data-brand="hub">
  <DssRadio v-model="val" val="a" name="g7" label="Hub" brand="hub" color="primary" />
</div>
```

---

## Acessibilidade

| Criterio WCAG | Nivel | Implementacao |
|---------------|-------|---------------|
| 2.5.5 Target Size | AA | Touch target 48px via `::before` |
| 2.4.7 Focus Visible | AA | Outline tokenizado `--dss-focus-ring` |
| 1.3.1 Info and Relationships | A | `<label>` + `<input type="radio">` nativos |
| 4.1.2 Name, Role, Value | A | `aria-checked`, `aria-disabled`, `aria-invalid` |
| 3.3.1 Error Identification | A | `role="alert"`, `aria-describedby` |

### Navegacao por teclado

- **Tab / Shift+Tab:** Move foco para/do grupo
- **Setas:** Navega entre radios do mesmo grupo (nativo)
- **Space:** Seleciona o radio focado (nativo)

### Media queries

- `prefers-reduced-motion: reduce` → transicoes desativadas
- `prefers-contrast: more` → bordas mais grossas, saturacao aumentada
- `forced-colors: active` → system keywords (ButtonText, Highlight, etc.)
- `print` → sem filtros, bordas currentColor

---

## Tokens Utilizados

| Categoria | Token | Uso |
|-----------|-------|-----|
| Altura | `--dss-compact-control-height-{xs,sm,md,lg}` | min-height por tamanho |
| Touch target | `--dss-touch-target-min` | Area clicavel (48px) |
| Spacing | `--dss-spacing-{0_5,1,1_5,2,2_5,3,4,5,6}` | Gap, controle, dot, offsets |
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-{xs,sm,md}` | Fonte e tamanho |
| Bordas | `--dss-border-width-{md,thick}` | Controle e focus |
| Motion | `--dss-duration-200`, `--dss-easing-standard` | Transicoes |
| Opacidade | `--dss-opacity-disabled` | Disabled (0.4) |
| Focus | `--dss-focus-ring` | Cor do outline |
| Cor | `--dss-text-primary`, `--dss-error-{400,600}`, `--dss-gray-{200,400}` | Texto, erro, dark mode |
| Brand | `--dss-{hub,water,waste}-{primary,secondary,accent}` | Cores de marca |

---

## Anti-patterns

### 1. Radio sem `name`
Sem `name`, navegacao por setas nao funciona. Sempre defina `name` em todos os radios do grupo.

### 2. Radio isolado
Radio e para selecao exclusiva entre 2+ opcoes. Para booleanos, use `DssCheckbox`.

### 3. Cores via CSS inline
Cores devem usar o sistema DSS (`color` prop ou `brand`). CSS inline ignora brandabilidade.

### Combinacoes proibidas

| Combinacao | Alternativa |
|------------|-------------|
| `brand` + CSS inline | Use apenas `brand` |
| `disable` + `error` | Use apenas `disable` |
| Radio sem grupo | Use `DssCheckbox` |

---

## Anatomia (4 Camadas)

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| 1 Structure | `DssRadio.ts.vue` | Template, logica Vue, ARIA |
| 2 Composition | `_base.scss` | Tokens, tamanhos, estados base |
| 3 Variants | `index.scss` | Vazio (Fase 1) |
| 4 Output | `_states.scss`, `_brands.scss` | Dark mode, contrast, brands |

---

## Excepcoes

| Valor | Localizacao | Justificativa |
|-------|-------------|---------------|
| `brightness(0.95)` | `_base.scss` | Canonico DSS (hover light) |
| `brightness(0.90)` | `_base.scss` | Canonico DSS (active light) |
| `brightness(1.10)` | `_states.scss` | Canonico DSS (hover dark) |
| `brightness(1.20)` | `_states.scss` | Canonico DSS (active dark) |
| `saturate(1.2)` | `_states.scss` | Canonico DSS (high contrast) |
| `2px`, `3px` | `_states.scss` | forced-colors ignora tokens |
| `border-radius: 50%` | `_base.scss` | Forma circular (nao tokenizavel) |

---

**Subset controlado da API do Quasar q-radio.** Este componente NAO replica a API completa do q-radio. Diferencias documentadas em DssRadio.md secao 1.
