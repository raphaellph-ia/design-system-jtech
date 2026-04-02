# DssTab — API Reference

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

---

## Componente

```typescript
import { DssTab } from '@dss/components/base/DssTab'
```

---

## Props

### `name`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `String \| Number` |
| **Padrão** | — |
| **Obrigatório** | Sim |

Identificador único da aba. Deve corresponder ao valor do `v-model` do `q-tabs` pai para ativar a aba.

```vue
<q-tabs v-model="activeTab">
  <DssTab name="home" label="Início" />
</q-tabs>
```

---

### `label`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `String` |
| **Padrão** | `undefined` |
| **Obrigatório** | Não |

Texto exibido na aba. Quando omitido com `icon` fornecido, a aba renderiza apenas o ícone.

```vue
<DssTab name="home" label="Início" />
```

---

### `icon`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `String` |
| **Padrão** | `undefined` |
| **Obrigatório** | Não |

Nome do ícone Material Icons a exibir. Quando fornecido sem `label`, a aba renderiza apenas o ícone com padding lateral reduzido (`--dss-spacing-3`).

```vue
<DssTab name="home" icon="home" />
<DssTab name="alerts" icon="notifications" label="Alertas" />
```

---

### `alert`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Boolean \| String` |
| **Padrão** | `undefined` |
| **Obrigatório** | Não |

Exibe um ponto de alerta na aba.
- `Boolean (true)`: usa a cor padrão de alerta (negativo DSS via Quasar)
- `String`: usa a cor Quasar especificada (ex.: `"red"`, `"orange"`)

```vue
<DssTab name="alerts" label="Alertas" :alert="true" />
<DssTab name="alerts" label="Alertas" alert="orange" />
```

---

### `disable`

| Atributo | Valor |
|----------|-------|
| **Tipo** | `Boolean` |
| **Padrão** | `false` |
| **Obrigatório** | Não |

Desabilita a interação com a aba. Aplica:
- `opacity: var(--dss-opacity-disabled)` (0.4)
- `cursor: not-allowed`
- `pointer-events: none`

```vue
<DssTab name="reports" label="Relatórios" disable />
```

---

## Props bloqueadas

| Prop | Motivo |
|------|--------|
| `ripple` | Sempre `false` — DSS governa feedback visual via `::after` overlay com tokens de opacidade |
| `no-caps` | Governado pelo sistema de tokens DSS; transformação de texto não é configurável pelo consumidor |

---

## Slots

### `default`

Conteúdo customizado da aba. Quando fornecido, substitui o conteúdo padrão (ícone + label nativos do QTab).

```vue
<DssTab name="custom">
  <span>Conteúdo customizado</span>
</DssTab>
```

---

## Eventos

**Nenhum.** Eventos de seleção (`update:modelValue`) são gerenciados pelo `q-tabs` pai, não pelo `DssTab` individual.

---

## $attrs Forwarding

O componente utiliza `inheritAttrs: false` e aplica `v-bind="$attrs"` no elemento raiz `q-tab`. Todos os atributos não declarados como props são encaminhados diretamente para o `QTab` nativo.

```vue
<!-- data-testid e class são forwarded para q-tab -->
<DssTab name="home" label="Início" data-testid="tab-home" class="custom-tab" />
```

---

## Acessibilidade

| Critério | Implementação |
|----------|---------------|
| **Role** | `tab` (herdado do QTab) |
| **Touch target** | `min-height: var(--dss-touch-target-md)` — WCAG 2.5.5 |
| **Teclado** | Setas ← → navegam entre abas (gerenciado pelo QTabs pai) |
| **ARIA** | `aria-selected` gerenciado pelo QTabs pai |
| **WCAG 2.1 AA** | Conforme via tokens DSS |

---

## Classes CSS geradas

| Classe | Condição | Descrição |
|--------|----------|-----------|
| `dss-tab` | Sempre | Classe base do componente |
| `dss-tab--icon` | `icon` definido, `label` ausente | Variante somente ícone |
| `dss-tab--has-icon` | `icon` definido | Aba com ícone (com ou sem label) |
| `dss-tab--has-label` | `label` definido | Aba com texto |
| `dss-tab--alert` | `alert` truthy | Indicador de alerta ativo |
| `dss-tab--disable` | `disable = true` | Estado desabilitado |
| `dss-tab--brand-hub` | Aplicada manualmente pelo consumidor | Brand Hub direto no elemento (alternativa a `[data-brand="hub"]` no container) |
| `dss-tab--brand-water` | Aplicada manualmente pelo consumidor | Brand Water direto no elemento (alternativa a `[data-brand="water"]` no container) |
| `dss-tab--brand-waste` | Aplicada manualmente pelo consumidor | Brand Waste direto no elemento (alternativa a `[data-brand="waste"]` no container) |
| `q-tab--active` | Quasar (aba ativa) | Gerenciado pelo QTabs pai |
| `q-tab` | Sempre (Quasar) | Classe nativa do QTab |

---

## Tokens utilizados

| Token | Categoria | Uso |
|-------|-----------|-----|
| `--dss-font-family-sans` | Tipografia | Família base |
| `--dss-font-size-sm` | Tipografia | Tamanho do texto (14px) |
| `--dss-font-weight-normal` | Tipografia | Peso padrão (400) |
| `--dss-font-weight-medium` | Tipografia | Peso selecionado (500) |
| `--dss-line-height-tight` | Tipografia | Altura de linha (1.25) |
| `--dss-text-subtle` | Cor | Texto padrão (não selecionado) |
| `--dss-text-inverse` | Cor | Texto em dark mode |
| `--dss-action-primary` | Cor | Texto/indicador selecionado |
| `--dss-opacity-hover` | Interação | Intensidade overlay hover |
| `--dss-opacity-active` | Interação | Intensidade overlay pressed |
| `--dss-opacity-disabled` | Interação | Opacidade desabilitado (0.4) |
| `--dss-focus-ring` | Acessibilidade | Cor do focus ring |
| `--dss-border-width-md` | Borda | Espessura do focus ring |
| `--dss-border-width-thick` | Borda | Espessura do indicador ativo |
| `--dss-touch-target-md` | Dimensão | Altura mínima (48px) — WCAG 2.5.5 |
| `--dss-spacing-3` | Espaçamento | Padding block e padding icon-only |
| `--dss-spacing-4` | Espaçamento | Padding inline padrão |
| `--dss-duration-150` | Motion | Duração de transições |
| `--dss-easing-standard` | Motion | Curva `cubic-bezier(0.4,0,0.2,1)` |
| `--dss-hub-600` | Brand | Cor ativa Hub (laranja) |
| `--dss-water-600` | Brand | Cor ativa Water (azul) |
| `--dss-waste-600` | Brand | Cor ativa Waste (verde) |

---

## Exceções documentadas

### EXC-01 — Sobrescrita do QTab (Gate de Composição v2.4 Regra 1 + Regra 2)

**Localização:** `2-composition/_base.scss` + `4-output/_states.scss`

**Seletores afetados:** `.dss-tab .q-tab__indicator`

**Justificativa:** Regra 1 — Wrapper Nível 1 Independente (sem componente DSS Fase 1 equivalente). Regra 2 — O QTab aplica estilo hardcoded no `.q-tab__indicator`. O seletor composto é a única forma de aplicar tokens DSS sobre CSS de terceiros.

### EXC-02 — System Color Keywords em forced-colors

**Localização:** `4-output/_states.scss`

**Valores:** `ButtonText` (texto padrão), `GrayText` (desabilitado), `Highlight` (ativo)

**Justificativa:** Em `forced-colors: active`, tokens CSS são ignorados. System color keywords garantem visibilidade. Padrão canônico DSS.

### EXC-03 — `#000 !important` em print

**Localização:** `4-output/_states.scss — @media print`

**Justificativa:** Impressão monocromática. Tokens podem não ser resolvidos em print dependendo do browser. Valor hardcoded é aceitável para garantir legibilidade.

---

## Paridade com Golden Reference (DssButton)

| Aspecto | DssButton | DssTab | Justificativa de divergência |
|---------|-----------|--------|------------------------------|
| `defineOptions` presente | ✅ | ✅ | — |
| `inheritAttrs: false` | ✅ | ✅ | — |
| `v-bind="$attrs"` | ✅ | ✅ | — |
| Touch target `min-height` | ✅ | ✅ | — |
| `::before` para touch target | ✅ | ❌ | DssTab usa `min-height` diretamente — `::before` desnecessário pois QTab é block-level com dimensão controlada |
| `::after` para overlay | ✅ | ✅ | — |
| Hover via `::after` | ✅ | ✅ | — |
| Focus via `:focus-visible` | ✅ | ✅ | — |
| Disabled via `opacity` | ✅ | ✅ | — |
| Dark mode via `[data-theme]` | ✅ | ✅ | — |
| Forced-colors system keywords | ✅ | ✅ | — |
| Token First (zero hardcoded) | ✅ | ✅ (exceto EXC-03 print) | EXC-03 justificado |
| Ripple bloqueado | N/A | ✅ | DssButton não usa QBtn ripple; DssTab bloqueia explicitamente |
