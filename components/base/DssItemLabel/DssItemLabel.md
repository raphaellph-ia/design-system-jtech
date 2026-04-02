# DssItemLabel

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** ✅ Conforme — Selo DSS v2.2 (2026-04-01)

> Container tipográfico para itens de lista. Governa a hierarquia de texto dentro de um `DssItemSection`, sobrescrevendo a tipografia nativa do Quasar com tokens DSS. Wrapper DSS governado sobre infraestrutura `QItemLabel`.

---

## 1. Visão Geral

### O que é

`DssItemLabel` é o **gestor da hierarquia tipográfica** dentro de um `DssItem`. Seu papel é:

- Aplicar tipografia governada por tokens DSS sobre o QItemLabel nativo (EXC-01)
- Definir os níveis semânticos de texto em uma linha de lista: label principal, caption (secundário), overline (categoria) e header (cabeçalho de grupo)
- Garantir consistência tipográfica no ecossistema de listas DSS

### O que NÃO é

`DssItemLabel` **não** é interativo. Ele não captura eventos, não tem hover, focus ou cursor pointer. Toda interatividade pertence ao `DssItem` pai ou a elementos colocados dentro da seção.

`DssItemLabel` **não** gerencia layout de seção. Isso é responsabilidade do `DssItemSection` pai.

`DssItemLabel` **não** aplica cores de marca diretamente. A identidade de marca é herdada via tokens semânticos (`--dss-text-body`, `--dss-text-subtle`) que respondem ao `[data-brand]` ancestral.

### Equivalente Quasar

`QItemLabel` — wrapper DSS governado. API idêntica ao QItemLabel, com sobrescrita completa da tipografia nativa via tokens DSS (EXC-01).

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Componente Estrutural Tipográfico |
| **Classificação** | Container tipográfico não-interativo — wrapper DSS sobre QItemLabel |
| **Golden Reference** | `DssBadge` (para decisões não-interativas: sem touch target, sem estados) |
| **Golden Context** | `DssItemSection` (container pai direto na hierarquia de lista) |
| **Interatividade** | Nenhuma — delegada ao DssItem pai |
| **Touch target** | Não aplicável — Option B (como DssBadge) |

---

## 3. Arquitetura e Responsabilidades

### Gate de Responsabilidade v2.4

| Responsabilidade | DssItemLabel | DssItemSection | DssItem |
|------------------|-------------|----------------|---------|
| Tipografia governada (label principal) | ✅ | ❌ | ❌ |
| Tipografia secundária (caption) | ✅ | ❌ | ❌ |
| Tipografia de categoria (overline) | ✅ | ❌ | ❌ |
| Cabeçalho de grupo de lista (header) | ✅ | ❌ | ❌ |
| Truncamento de texto (lines) | ✅ | ❌ | ❌ |
| Layout de coluna (flex) | ❌ | ✅ | ❌ |
| Hover / Focus / Active | ❌ | ❌ | ✅ (se clickable) |
| Touch target | ❌ | ❌ | ✅ (se clickable) |

### Hierarquia de Composição

```
DssList (container)
  └── DssItem (item — role="listitem" ou role="button")
       ├── DssItemSection [avatar] — zona leading
       │     └── DssAvatar / DssIcon / DssCheckbox
       ├── DssItemSection [main] — zona principal
       │     ├── DssItemLabel [overline] (opcional)
       │     ├── DssItemLabel (label principal)
       │     └── DssItemLabel [caption] (opcional)
       └── DssItemSection [side] — zona trailing
             └── DssIcon / DssBadge / DssButton / DssToggle
```

### Hierarquia Tipográfica

```
DssItemSection (main)
  ├── DssItemLabel [overline]   → 12px / medium / uppercase / subtle
  ├── DssItemLabel (padrão)     → 16px / normal / body
  └── DssItemLabel [caption]    → 14px / normal / subtle
```

```
q-list
  ├── DssItemLabel [header]     → 12px / semibold / uppercase / subtle
  ├── DssItem
  └── DssItem
```

---

## 4. API

### Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `header` | `Boolean` | `false` | Não | Cabeçalho de grupo. Tipografia compacta, maiúsculas, padding de separação. |
| `caption` | `Boolean` | `false` | Não | Texto secundário abaixo do label. Tipografia menor, cor mutada. |
| `overline` | `Boolean` | `false` | Não | Texto de categoria acima do label. Tipografia muito compacta, maiúsculas. |
| `lines` | `Number \| String` | `undefined` | Não | Máximo de linhas antes de truncar com ellipsis. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo de texto. Aceita texto simples ou elementos inline. |

### Eventos

**Nenhum.** Componente estritamente não-interativo.

---

## 5. Estados

| Estado | Aplicável | Justificativa |
|--------|-----------|---------------|
| `default` | ✅ | Estado único — tipografia estática |
| `hover` | ❌ | Pertence ao `DssItem` pai |
| `focus` | ❌ | Pertence ao `DssItem` pai |
| `active` | ❌ | Pertence ao `DssItem` pai |
| `disabled` | ❌ | Pertence ao `DssItem` pai |
| `loading` | ❌ | Pertence ao consumidor |
| `error` | ❌ | Pertence ao consumidor |
| `indeterminate` | ❌ | Não aplicável a texto |

---

## 6. Variantes Tipográficas

### Padrão (label principal)

```vue
<DssItemLabel>Ana Silva</DssItemLabel>
```

- `font-size`: 16px (`--dss-font-size-md`)
- `font-weight`: 400 (`--dss-font-weight-normal`)
- `line-height`: 1.5 (`--dss-line-height-normal`)
- `color`: `--dss-text-body`

### Caption (texto secundário)

```vue
<DssItemLabel caption>Administradora do sistema</DssItemLabel>
```

- `font-size`: 14px (`--dss-font-size-sm`)
- `font-weight`: 400 (`--dss-font-weight-normal`)
- `line-height`: 1.45 (`--dss-line-height-sm`)
- `color`: `--dss-text-subtle`

### Header (cabeçalho de grupo)

```vue
<DssItemLabel header>Favoritos</DssItemLabel>
```

- `font-size`: 12px (`--dss-font-size-xs`)
- `font-weight`: 600 (`--dss-font-weight-semibold`)
- `text-transform`: `uppercase`
- `letter-spacing`: 0.1em (`--dss-letter-spacing-widest`)
- `color`: `--dss-text-subtle`
- `padding-top`: 12px (`--dss-spacing-3`)

### Overline (texto de categoria)

```vue
<DssItemLabel overline>Ordem de Serviço</DssItemLabel>
```

- `font-size`: 12px (`--dss-font-size-xs`)
- `font-weight`: 500 (`--dss-font-weight-medium`)
- `line-height`: 1.25 (`--dss-line-height-tight`)
- `text-transform`: `uppercase`
- `letter-spacing`: 0.1em (`--dss-letter-spacing-widest`)
- `color`: `--dss-text-subtle`

---

## 7. Acessibilidade

### WCAG 2.1 AA

| Critério | Status | Detalhes |
|----------|--------|----------|
| 1.4.3 Contraste mínimo | ✅ | Tokens `--dss-text-body` e `--dss-text-subtle` com contraste ≥ 4.5:1 |
| 1.4.4 Redimensionamento de texto | ✅ | Unidades `rem` via tokens de tipografia |
| 2.5.5 Área de toque | N/A | Componente não-interativo (Option B) |
| 4.1.2 Nome, função, valor | ✅ | Conteúdo textual acessível nativamente |

### Touch Target

**Não aplicável.** `DssItemLabel` é estritamente não-interativo (Option B, como `DssBadge` Golden Reference). O touch target é gerenciado pelo `DssItem` pai quando `clickable = true`.

---

## 8. Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-family-sans` | Inter, sans-serif | Família tipográfica |
| `--dss-font-size-xs` | 0.75rem / 12px | Header e overline |
| `--dss-font-size-sm` | 0.875rem / 14px | Caption |
| `--dss-font-size-md` | 1rem / 16px | Label padrão |
| `--dss-font-weight-normal` | 400 | Label padrão e caption |
| `--dss-font-weight-medium` | 500 | Overline |
| `--dss-font-weight-semibold` | 600 | Header |
| `--dss-line-height-tight` | 1.25 | Overline |
| `--dss-line-height-sm` | 1.45 | Caption |
| `--dss-line-height-normal` | 1.5 | Label padrão e header |
| `--dss-letter-spacing-widest` | 0.1em | Header e overline |
| `--dss-text-body` | — | Cor do label padrão |
| `--dss-text-subtle` | — | Cor de header, caption e overline |
| `--dss-text-inverse` | — | Cor em dark mode |
| `--dss-spacing-0_5` | 0.125rem / 2px | Margin de caption e overline |
| `--dss-spacing-1` | 0.25rem / 4px | Padding-bottom do header |
| `--dss-spacing-3` | 0.75rem / 12px | Padding-top do header |

---

## 9. Exceções

### EXC-01 — Sobrescrita de Tipografia Nativa do Quasar

**ID:** EXC-01  
**Localização:** `2-composition/_base.scss`  
**Gate:** Gate de Composição v2.4 — Regra 2 exception  

**Contexto:** O QItemLabel aplica tipografia hardcoded nas suas classes internas de modificador:
- `.q-item__label--header`: `font-size: 0.75rem`, `color: rgba(0,0,0,0.54)`, `text-transform: uppercase`, `letter-spacing: 0.1em`
- `.q-item__label--caption`: `font-size: 0.75rem`, `color: rgba(0,0,0,0.54)`
- `.q-item__label--overline`: `text-transform: uppercase`, `letter-spacing: 0.1em`

**Justificativa:** Os seletores compostos (`.dss-item-label.q-item__label--*`) são a única forma de substituir CSS de terceiros (Quasar) com tokens DSS, garantindo a consistência tipográfica do sistema sem criar dependências externas adicionais. Formalizado no Pré-Prompt DssItemLabel Fase 2 (seção 9).

### EXC-02 — System Color Keywords em forced-colors

**ID:** EXC-02  
**Localização:** `4-output/_states.scss`  
**Valores:** `ButtonText` (texto principal), `GrayText` (texto secundário)  
**Justificativa:** Em `forced-colors: active`, tokens CSS são ignorados pelo navegador. System color keywords são obrigatórios para garantir visibilidade. Padrão canônico DSS.

---

## 10. Comportamentos Implícitos

### Forwarding de $attrs

O componente declara `inheritAttrs: false` e aplica `v-bind="$attrs"` no elemento raiz `q-item-label`. Todos os atributos não declarados como props (ex.: `class`, `style`, `data-*`) são encaminhados para o QItemLabel nativo.

### Delegação do truncamento

A prop `lines` é passada diretamente para o `q-item-label` nativo. O Quasar injeta `--q-item-label-lines` via inline style e aplica `-webkit-line-clamp`. O DSS adiciona `overflow: hidden` e `overflow-wrap: anywhere` para complementar.

### Herança de marca

Os tokens semânticos `--dss-text-body` e `--dss-text-subtle` respondem automaticamente ao `[data-brand="hub|water|waste"]` definido em qualquer ancestral. Nenhuma prop de brand é necessária no `DssItemLabel`.

---

## 11. Paridade com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssItemLabel | Justificativa de divergência |
|---------|----------|--------------|------------------------------|
| `defineOptions` | ✅ | ✅ | Padrão DSS |
| `inheritAttrs: false` | ❌ | ✅ | DssItemLabel precisa de forwarding para q-item-label |
| `v-bind="$attrs"` | ❌ | ✅ | Idem |
| Touch target | ❌ Option B | ❌ Option B | Ambos não-interativos |
| Estados interativos | ❌ | ❌ | Ambos não-interativos |
| Forced-colors com system keywords | ✅ | ✅ | Padrão canônico |
| Dark mode via `[data-theme]` | ✅ | ✅ | Padrão DSS |
| Token First | ✅ | ✅ | Zero valores hardcoded |
| `defineSlots` tipado | ❌ | ✅ | Melhoria adotada no DssItemLabel |

---

## 12. Matriz de Composição DSS

### Papel estrutural

`DssItemLabel` é o componente folha da hierarquia de lista DSS. É o último nível na cadeia `DssList → DssItem → DssItemSection → DssItemLabel`. Não instancia filhos DSS — apenas estrutura texto.

### Componentes DSS recomendados (contexto pai)

| Componente | Status | Papel |
|-----------|--------|-------|
| `DssItemSection` | ✅ Existente | Container pai obrigatório |
| `DssItem` | ✅ Existente | Item pai (interatividade) |
| `DssList` | ✅ Existente | Container raiz da lista |

### Anti-patterns de composição

- Usar `DssItemLabel` fora de `DssItemSection` (exceto `header` direto em `q-list`)
- Aplicar estilos interativos diretamente no `DssItemLabel`
- Aninhar elementos de ação (`DssButton`, links) dentro do `DssItemLabel`
- Combinar `header` com `caption` ou `overline` no mesmo elemento
- Criar `DssItemLabel` sem conteúdo textual no slot `default`

---

## 13. Anti-patterns

```vue
<!-- ❌ Fora de DssItemSection sem ser header -->
<DssItemLabel>Nome do usuário</DssItemLabel>

<!-- ✅ Dentro de DssItemSection -->
<DssItemSection>
  <DssItemLabel>Nome do usuário</DssItemLabel>
</DssItemSection>
```

```vue
<!-- ❌ DssButton dentro de DssItemLabel -->
<DssItemLabel>
  <DssButton>Ação</DssButton>
</DssItemLabel>

<!-- ✅ DssButton como irmão em DssItemSection[side] -->
<DssItemSection side>
  <DssButton flat round icon="more_vert" />
</DssItemSection>
```

```vue
<!-- ❌ header + caption no mesmo elemento -->
<DssItemLabel header caption>Texto misto</DssItemLabel>

<!-- ✅ Elementos separados com funções distintas -->
<DssItemLabel header>Favoritos</DssItemLabel>
<DssItemSection>
  <DssItemLabel>Dashboard principal</DssItemLabel>
  <DssItemLabel caption>Atualizado hoje</DssItemLabel>
</DssItemSection>
```

---

## 14. Exemplos

### Básico — Label simples

```vue
<DssItem>
  <DssItemSection avatar>
    <DssIcon name="person" />
  </DssItemSection>
  <DssItemSection>
    <DssItemLabel>Ana Silva</DssItemLabel>
  </DssItemSection>
</DssItem>
```

### Label + Caption

```vue
<DssItem>
  <DssItemSection>
    <DssItemLabel>Relatório de inspeção mensal</DssItemLabel>
    <DssItemLabel caption>Gerado em 15 mar. 2026 · PDF · 2,3 MB</DssItemLabel>
  </DssItemSection>
</DssItem>
```

### Overline + Label + Caption

```vue
<DssItem>
  <DssItemSection>
    <DssItemLabel overline>Ordem de Serviço</DssItemLabel>
    <DssItemLabel>Manutenção preventiva — Bomba P-042</DssItemLabel>
    <DssItemLabel caption>Vence em 3 dias · Prioridade alta</DssItemLabel>
  </DssItemSection>
</DssItem>
```

### Header de grupo

```vue
<q-list>
  <DssItemLabel header>Projetos ativos</DssItemLabel>
  <DssItem>
    <DssItemSection>
      <DssItemLabel>Rede de distribuição — Zona Norte</DssItemLabel>
      <DssItemLabel caption>Em andamento · 67% concluído</DssItemLabel>
    </DssItemSection>
  </DssItem>
  <DssItemLabel header>Concluídos</DssItemLabel>
  <DssItem>
    <DssItemSection>
      <DssItemLabel>Expansão do sistema — Setor Leste</DssItemLabel>
      <DssItemLabel caption>Concluído em fev. 2026</DssItemLabel>
    </DssItemSection>
  </DssItem>
</q-list>
```

### Truncamento

```vue
<DssItemSection>
  <DssItemLabel>Relatório completo de inspeção técnica</DssItemLabel>
  <DssItemLabel caption :lines="2">
    Inspeção realizada nas tubulações da zona sul cobrindo 47 km de rede.
    Identificados 3 pontos críticos de infiltração e 12 conexões com desgaste.
  </DssItemLabel>
</DssItemSection>
```

---

## Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-04-01 | Criação inicial — Pronto para Auditoria DSS v2.2 |

---

> ✅ **Componente CONFORME — SELO DSS v2.2 CONCEDIDO em 2026-04-01**
>
> Ciclo de auditoria: 3 rodadas · 0 NCs bloqueantes · 0 NCs residuais
> Exceções formais: EXC-01 (Gate de Composição Regra 1 + Regra 2), EXC-02 (forced-colors)
