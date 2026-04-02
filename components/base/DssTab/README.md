# DssTab

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

Aba individual de navegação/seleção — wrapper DSS sobre `QTab`.

---

## Quando usar

- Navegação por abas dentro de um `q-tabs` (ou `DssTabs` quando disponível)
- Seleção de seção ativa em painéis de conteúdo

## Quando NÃO usar

- Como botão de ação → usar `DssButton`
- Como item de lista → usar `DssItem`
- Como link de rota isolado → usar `<router-link>`

---

## Instalação

```typescript
import { DssTab } from '@dss/components/base/DssTab'
```

---

## Uso básico

```vue
<q-tabs v-model="tab">
  <DssTab name="home" label="Início" />
  <DssTab name="alerts" label="Alertas" />
  <DssTab name="reports" label="Relatórios" />
</q-tabs>
```

---

## Modos

### Label apenas

```vue
<DssTab name="home" label="Início" />
```

### Ícone apenas

```vue
<DssTab name="home" icon="home" />
```

### Ícone + label

```vue
<DssTab name="home" icon="home" label="Início" />
```

### Com alerta

```vue
<DssTab name="alerts" label="Alertas" :alert="true" />
<DssTab name="alerts" label="Alertas" alert="orange" />
```

### Desabilitada

```vue
<DssTab name="reports" label="Relatórios" disable />
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `String \| Number` | — | **Obrigatório.** Identificador único para o `v-model` do `q-tabs` pai |
| `label` | `String` | `undefined` | Texto exibido na aba |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons |
| `alert` | `Boolean \| String` | `undefined` | Exibe indicador de alerta (`true` = cor padrão; `string` = cor Quasar) |
| `disable` | `Boolean` | `false` | Desabilita interação |

**Props bloqueadas:**
- `ripple` — sempre `false` (DSS governa feedback visual via `::after`)
- `no-caps` — governado pelo sistema de tokens DSS

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado da aba (substitui ícone + label nativos) |

---

## Eventos

**Nenhum.** Eventos de navegação (`update:modelValue`) são gerenciados pelo `q-tabs` pai.

---

## Estados

| Estado | Implementação |
|--------|--------------|
| **Padrão** | `color: --dss-text-subtle` |
| **Hover** | Overlay `::after` com `opacity: --dss-opacity-hover` |
| **Active (pressionado)** | Overlay `::after` com `opacity: --dss-opacity-active` |
| **Focus (teclado)** | `outline: --dss-border-width-md solid --dss-focus-ring` |
| **Selecionado** | `color: --dss-action-primary`, `font-weight: --dss-font-weight-medium` |
| **Desabilitado** | `opacity: --dss-opacity-disabled`, `cursor: not-allowed`, `pointer-events: none` |

---

## Acessibilidade

- **Role:** `tab` (herdado do `QTab`)
- **Touch target:** `min-height: var(--dss-touch-target-md)` — WCAG 2.5.5
- **Teclado:** setas ← → para navegar entre abas (gerenciado pelo `QTabs`)
- **ARIA:** `aria-selected` gerenciado pelo `QTabs` pai
- **WCAG 2.1 AA:** conforme

---

## Tokens utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Família tipográfica |
| `--dss-font-size-sm` | Tamanho do texto (14px) |
| `--dss-font-weight-normal` | Peso padrão (400) |
| `--dss-font-weight-medium` | Peso selecionado (500) |
| `--dss-line-height-tight` | Altura de linha (1.25) |
| `--dss-text-subtle` | Cor padrão |
| `--dss-action-primary` | Cor selecionada |
| `--dss-opacity-hover` | Intensidade hover |
| `--dss-opacity-active` | Intensidade pressed |
| `--dss-opacity-disabled` | Opacidade desabilitado (0.4) |
| `--dss-focus-ring` | Cor do focus ring |
| `--dss-border-width-md` | Espessura do focus ring |
| `--dss-border-width-thick` | Espessura do indicador |
| `--dss-touch-target-md` | Altura mínima (48px) |
| `--dss-spacing-3` | Padding block (12px) |
| `--dss-spacing-4` | Padding inline (16px) |
| `--dss-duration-150` | Duração da transição |
| `--dss-easing-standard` | Curva de animação |

---

## Exceções documentadas

### EXC-01 — Sobrescrita do QTab (Gate de Composição v2.4 Regra 1 + Regra 2)
Wrapper Nível 1 sobre `q-tab`. Seletores compostos (`.dss-tab .q-tab__indicator`) sobrescrevem CSS hardcoded do Quasar com tokens DSS.

### EXC-02 — System Color Keywords em forced-colors
`ButtonText`, `GrayText`, `Highlight` obrigatórios em `@media (forced-colors: active)`.

### EXC-03 — `#000 !important` em print
Impressão monocromática. Tokens podem não ser resolvidos em contexto de print.

---

## Links

- [API Reference](./DSSTAB_API.md)
- [Documentação completa](./DssTab.md)
- [Exemplos](./DssTab.example.vue)
