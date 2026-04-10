# DssRouteTab

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

Aba de rota com integração Vue Router — wrapper DSS sobre `QRouteTab`.

Visualmente idêntico ao `DssTab`; diferencia-se pela capacidade de acionar navegação de rota via `to`, `exact`, `replace`, `href` e `target`.

---

## Quando usar

- Navegação por abas que alteram a rota da aplicação (SPA)
- Combinação de abas de rota com painéis de conteúdo renderizados por `<router-view>`
- Links externos em contexto de tabs (via `href` + `target`)

## Quando NÃO usar

- Navegação por abas sem Vue Router → usar `DssTab`
- Botão de ação → usar `DssButton`
- Item de lista navegável → usar `DssItem`

---

## Instalação

```typescript
import { DssRouteTab } from '@dss/components/base/DssRouteTab'
```

---

## Uso básico

```vue
<DssTabs v-model="activeTab">
  <DssRouteTab name="home"    label="Início"     to="/home" />
  <DssRouteTab name="alerts"  label="Alertas"    to="/alerts" />
  <DssRouteTab name="reports" label="Relatórios" to="/reports" />
</DssTabs>
```

---

## Modos

### Label apenas (rota)

```vue
<DssRouteTab name="home" label="Início" to="/home" />
```

### Ícone + label (rota)

```vue
<DssRouteTab name="home" icon="home" label="Início" to="/home" />
```

### Correspondência exata de rota

```vue
<DssRouteTab name="home" label="Início" to="/home" :exact="true" />
```

### Replace (sem nova entrada no histórico)

```vue
<DssRouteTab name="tab" label="Aba" to="/tab" :replace="true" />
```

### Link externo

```vue
<DssRouteTab name="docs" label="Documentação" href="https://docs.sansys.com" target="_blank" />
```

### Desabilitada

```vue
<DssRouteTab name="reports" label="Relatórios" to="/reports" disable />
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `String \| Number` | — | **Obrigatório.** Identificador único para o `v-model` do `DssTabs` pai |
| `label` | `String` | `undefined` | Texto exibido na aba |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons |
| `alert` | `Boolean \| String` | `undefined` | Indicador de alerta (`true` = cor padrão; `string` = cor Quasar) |
| `disable` | `Boolean` | `false` | Desabilita interação |
| `to` | `String \| Object` | `undefined` | Rota de destino Vue Router |
| `exact` | `Boolean` | `false` | Correspondência exata de rota |
| `replace` | `Boolean` | `false` | Substitui entrada no histórico |
| `href` | `String` | `undefined` | URL de link externo |
| `target` | `String` | `undefined` | Target do link externo (ex.: `"_blank"`) |

**Props bloqueadas:**
- `ripple` — sempre `false` (DSS governa feedback visual via `::after`)
- `no-caps` — governado pelo sistema de tokens DSS
- `color`, `text-color` — governados por tokens DSS/brands

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado da aba (substitui ícone + label nativos) |

---

## Eventos

**Nenhum.** Eventos de navegação são gerenciados pelo `DssTabs` pai via Vue Router.

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

- **Role:** `tab` (herdado do `QRouteTab`)
- **Touch target:** `min-height: var(--dss-touch-target-md)` — WCAG 2.5.5
- **Teclado:** setas ← → para navegar entre abas (gerenciado pelo `DssTabs`)
- **Enter/Space:** ativa a navegação de rota
- **ARIA:** `aria-selected` gerenciado pelo `DssTabs` pai
- **WCAG 2.1 AA:** conforme

---

## Exceções documentadas

### EXC-01 — Gate de Composição v2.4 Regra 1 + Regra 2
Wrapper Nível 1 sobre `q-route-tab`. Seletores `.dss-tab .q-tab__indicator` herdados do `DssTab.module.scss` sobrescrevem CSS hardcoded do Quasar com tokens DSS. Precedente: DssTab EXC-01.

### EXC-02 — System Color Keywords em forced-colors
`ButtonText`, `GrayText`, `Highlight` — herdados via `.dss-tab` (DssTab `_states.scss`).

### EXC-03 — `#000 !important` em print
Impressão monocromática — herdado via `.dss-tab` (DssTab `_states.scss`).

---

## Links

- [API Reference](./DSSROUTETAB_API.md)
- [Documentação completa](./DssRouteTab.md)
- [Exemplos](./DssRouteTab.example.vue)
