# DssRouteTab — API Reference

**Versão:** 1.0.0 · **Componente Quasar Base:** `QRouteTab` · **Fase:** 2

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `name` | `String \| Number` | — | ✅ Sim | Identificador único da aba. Deve corresponder ao valor do `v-model` no `DssTabs` pai |
| `label` | `String` | `undefined` | Não | Texto exibido na aba |
| `icon` | `String` | `undefined` | Não | Nome do ícone Material Icons. Sem `label`, renderiza somente o ícone |
| `alert` | `Boolean \| String` | `undefined` | Não | Exibe indicador de alerta. `true` usa cor padrão; `string` usa cor Quasar (ex.: `"orange"`) |
| `disable` | `Boolean` | `false` | Não | Desabilita interação. Aplica `opacity: --dss-opacity-disabled` e `pointer-events: none` |
| `to` | `String \| Object` | `undefined` | Não | Rota de destino Vue Router. Aceita path `"/home"` ou objeto `{ name: 'home', params: {...} }` |
| `exact` | `Boolean` | `false` | Não | Correspondência exata de rota. Quando `true`, a aba só é marcada como ativa se a rota coincide exatamente |
| `replace` | `Boolean` | `false` | Não | Substitui a entrada atual no histórico de navegação (sem adicionar nova entrada) |
| `href` | `String` | `undefined` | Não | URL de link externo. A aba renderiza como `<a href="...">`. Use como fallback ao `to` para recursos externos |
| `target` | `String` | `undefined` | Não | Target do link externo (ex.: `"_blank"` para nova aba). Funciona apenas com `href` |

---

## Props bloqueadas

| Prop QRouteTab | Motivo |
|---------------|--------|
| `ripple` | Sempre `:ripple="false"`. O DSS governa feedback visual via overlay `::after` com tokens de opacidade (`--dss-opacity-hover`, `--dss-opacity-active`). O sistema de ripple do Material Design não é usado no DSS |
| `no-caps` | Transformação de texto é responsabilidade dos tokens DSS. O valor é sempre aplicado via CSS |
| `color` | Cores governadas exclusivamente por tokens DSS (`--dss-action-primary`) e brands (`--dss-hub-600`, etc.) |
| `text-color` | Idem `color` |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado da aba. Quando fornecido, substitui o conteúdo padrão (ícone + label) renderizado pelo `QRouteTab` |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| — | — | Nenhum evento emitido diretamente. A navegação de rota é gerenciada pelo `DssTabs` pai via Vue Router |

---

## Classes computadas

O `useRouteTabClasses` composable computa as seguintes classes no elemento raiz:

| Classe | Condição |
|--------|----------|
| `dss-tab` | Sempre presente (infraestrutura CSS compartilhada com DssTab) |
| `dss-tab--icon` | `icon` presente **e** `label` ausente |
| `dss-tab--has-icon` | `icon` presente (com ou sem `label`) |
| `dss-tab--has-label` | `label` presente |
| `dss-tab--alert` | `alert` truthy |
| `dss-tab--disable` | `disable === true` |

---

## Tokens utilizados

| Token | Categoria | Uso |
|-------|-----------|-----|
| `--dss-font-family-sans` | Tipografia | Família base |
| `--dss-font-size-sm` | Tipografia | Tamanho do texto (14px) |
| `--dss-font-weight-normal` | Tipografia | Peso padrão (400) |
| `--dss-font-weight-medium` | Tipografia | Peso selecionado (500) |
| `--dss-line-height-tight` | Tipografia | Altura de linha (1.25) |
| `--dss-text-subtle` | Cor | Texto padrão |
| `--dss-text-inverse` | Cor | Texto em dark mode |
| `--dss-action-primary` | Cor | Texto/indicador selecionado |
| `--dss-opacity-hover` | Interação | Intensidade overlay hover |
| `--dss-opacity-active` | Interação | Intensidade overlay pressed |
| `--dss-opacity-disabled` | Interação | Opacidade desabilitado (0.4) |
| `--dss-focus-ring` | Acessibilidade | Cor do focus ring |
| `--dss-border-width-md` | Borda | Espessura do focus ring |
| `--dss-border-width-thick` | Borda | Espessura do indicador ativo |
| `--dss-touch-target-md` | Dimensão | Altura mínima (48px) — WCAG 2.5.5 |
| `--dss-spacing-3` | Espaçamento | Padding block (12px) e aba somente ícone |
| `--dss-spacing-4` | Espaçamento | Padding inline padrão (16px) |
| `--dss-duration-150` | Motion | Duração de transições |
| `--dss-easing-standard` | Motion | Curva `cubic-bezier(0.4,0,0.2,1)` |
| `--dss-hub-600` | Brand | Cor ativa Hub |
| `--dss-water-600` | Brand | Cor ativa Water |
| `--dss-waste-600` | Brand | Cor ativa Waste |

**Total:** 23 tokens (idênticos ao DssTab — infraestrutura CSS compartilhada).

---

## Exceções documentadas

### EXC-01 — Gate de Composição v2.4 Regra 1 + Regra 2

**Localização:** `DssTab.module.scss` (importado) — `2-composition/_base.scss` + `4-output/_states.scss` do DssTab

**Seletores:** `.dss-tab .q-tab__indicator`

**Gates violados:**
- Regra 1: uso de `<q-route-tab>` (primitivo Quasar) diretamente no template
- Regra 2: SCSS sobrescreve classes internas do Quasar (`.q-tab__indicator`)

**Justificativa:** Wrapper Nível 1 Independente — análogo ao DssTab (Golden Reference). O QRouteTab herda a estrutura completa do QTab. Os seletores `.dss-tab .q-tab__indicator` herdados cobrem DssRouteTab via classe compartilhada. Precedente: DssTab EXC-01.

### EXC-02 — System Color Keywords em forced-colors

**Localização:** `DssTab/4-output/_states.scss` (importado)

**Valores:** `ButtonText` (padrão), `GrayText` (desabilitado), `Highlight` (ativo)

**Justificativa:** Em `@media (forced-colors: active)`, tokens CSS são ignorados. System color keywords obrigatórios. Herdado via `.dss-tab` (classe compartilhada com DssTab).

### EXC-03 — `#000 !important` em print

**Localização:** `DssTab/4-output/_states.scss` (importado) — `@media print`

**Justificativa:** Impressão monocromática. Tokens podem não ser resolvidos em contexto de print. Herdado via `.dss-tab`.

---

## Acessibilidade

| Critério WCAG | Implementação |
|---------------|---------------|
| **2.1.1** Teclado | Setas ← → navegam entre abas (QTabs); Enter/Space aciona rota |
| **2.4.7** Focus Visível | `outline` com `--dss-focus-ring` em `:focus-visible` |
| **2.5.5** Touch Target | `min-height: var(--dss-touch-target-md)` — 48px |
| **1.4.11** Contrast (Non-text) | Indicador usa `currentColor` (herda contraste do texto) |
| **4.1.2** Name, Role, Value | `role="tab"`, `aria-selected` herdados do QRouteTab/QTabs |

---

## Anti-padrões

| Anti-padrão | Alternativa |
|-------------|-------------|
| Usar `DssRouteTab` fora de `DssTabs` | Usar dentro de `DssTabs` como filho direto |
| Usar `DssRouteTab` sem Vue Router instalado | Usar `DssTab` para navegação sem roteamento |
| Aplicar `color` via prop | Usar `[data-brand]` no container pai |
| Usar `DssRouteTab` como botão de ação | Usar `DssButton` |
| Misturar `to` e `href` na mesma aba | Usar apenas um mecanismo de navegação |
| Dois `DssRouteTab` com o mesmo `name` no mesmo `DssTabs` | `name` deve ser único por instância de `DssTabs` |
