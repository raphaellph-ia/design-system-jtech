# DssTab — Documentação Normativa

**Versão:** 1.0.0 · **Fase:** 2 · **Categoria:** Elemento interativo de navegação por abas
**Status:** Pronto para Auditoria DSS v2.2

---

## 1. Visão Geral

O `DssTab` é um **wrapper DSS Fase 2** sobre o `QTab` do Quasar Framework. Representa uma aba individual dentro de um sistema de navegação por abas, gerenciando seus próprios estados visuais (hover, focus, active, disabled) enquanto delega o estado de seleção ao container pai (`q-tabs` / `DssTabs`).

**Golden Reference:** `DssButton` (Golden Reference canônico para componentes interativos no DSS)
**Golden Context:** `DssItem` (baseline de auditoria — elemento interativo selecionável mais próximo com Selo DSS v2.2)

---

## 2. Classificação

| Atributo | Valor |
|----------|-------|
| **Fase** | 2 — Componente interativo de seleção |
| **Nível** | 1 Independente (wrapper sobre primitivo Quasar) |
| **Categoria** | Elemento interativo de navegação por abas |
| **Interativo** | Sim (hover, focus, active, disabled, selected) |
| **Dependência DSS** | Nenhuma (wrapper sobre QTab) |
| **Contexto pai obrigatório** | `q-tabs` (ou `DssTabs` quando disponível) |

---

## 3. Quando usar

**Use `DssTab` quando:**
- Construindo navegação por abas dentro de um `q-tabs`
- Alternando a exibição de painéis de conteúdo relacionados
- Organizando seções de conteúdo em uma mesma tela

**NÃO use `DssTab` quando:**
- Precisar de um botão de ação → usar `DssButton`
- Precisar de navegação de lista → usar `DssItem`
- Precisar de link de rota isolado → usar `<router-link>`
- O usuário precisar abrir novos contextos → usar `DssButton` com ação

---

## 4. Arquitetura

### 4.1 Estrutura de arquivos

```
DssTab/
├── 1-structure/
│   └── DssTab.ts.vue          ← Implementação canônica
├── 2-composition/
│   └── _base.scss             ← Estilos base com tokens DSS
├── 3-variants/
│   ├── _icon.scss             ← Variante somente ícone
│   └── index.scss
├── 4-output/
│   ├── _brands.scss           ← Hub / Water / Waste
│   ├── _states.scss           ← Dark, forced-colors, print
│   └── index.scss
├── composables/
│   ├── useTabClasses.ts       ← Lógica de classes computadas
│   └── index.ts
├── types/
│   └── tab.types.ts           ← TabProps, TabSlots
├── DssTab.module.scss         ← Orchestrador SCSS (L2 → L3 → L4)
├── DssTab.vue                 ← Entry point wrapper (re-export)
├── DssTab.example.vue
├── DssTab.test.js
├── dss.meta.json
├── index.js
├── README.md
├── DssTab.md                  ← Este arquivo
└── DSSTAB_API.md
```

### 4.2 Hierarquia de composição

```
q-tabs (ou DssTabs — futuro)
└── DssTab                     ← Este componente
    └── q-tab (Quasar)         ← Primitivo encapsulado
```

**Nota sobre DssTabs:** O `DssTabs` (container pai natural) ainda não existe no catálogo DSS. Até sua criação, `q-tabs` é usado como container de scaffolding — coberto pela isenção de `.example.vue` (política `DSS_IMPLEMENTATION_GUIDE.md`).

---

## 5. Props

### 5.1 Props expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `String \| Number` | — | **Obrigatório.** Identificador único para o `v-model` do `q-tabs` pai |
| `label` | `String` | `undefined` | Texto exibido na aba |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons |
| `alert` | `Boolean \| String` | `undefined` | Indicador de alerta (`true` = cor padrão, `string` = cor Quasar) |
| `disable` | `Boolean` | `false` | Desabilita interação |

### 5.2 Props bloqueadas

| Prop | Motivo do bloqueio |
|------|-------------------|
| `ripple` | Sempre `:ripple="false"`. O DSS não usa o sistema de ripple do Material Design — feedback visual gerenciado via overlay `::after` com tokens de opacidade |
| `no-caps` | Transformação de texto é responsabilidade do sistema de tokens DSS, não configurável pelo consumidor |

---

## 6. Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado da aba. Quando fornecido, substitui o conteúdo padrão (ícone + label nativos do QTab) |

---

## 7. Eventos

**Nenhum.** Eventos de seleção (`update:modelValue`) são gerenciados pelo `q-tabs` pai.

---

## 8. Estados

### 8.1 Estado padrão (não selecionado)

- `color`: `var(--dss-text-subtle)`
- `font-weight`: `var(--dss-font-weight-normal)` (400)

### 8.2 Hover

- Implementado via `::after` overlay com `background-color: currentColor`
- `opacity`: `var(--dss-opacity-hover)`
- Condicional: `@media (hover: hover)` — não ativa em touch devices
- Excluído quando `.dss-tab--disable`

### 8.3 Active (pressionado)

- Mesmo mecanismo `::after` do hover
- `opacity`: `var(--dss-opacity-active)`
- Excluído quando `.dss-tab--disable`

### 8.4 Focus (teclado)

- `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)`
- `outline-offset: -var(--dss-border-width-md)` (interno, sem afetar layout)
- Ativado via `:focus-visible` (apenas teclado, não mouse)
- Em `prefers-contrast: more`: outline usa `--dss-border-width-thick`

### 8.5 Selecionado (ativo)

- Governado pelo `QTabs` pai via classe `.q-tab--active` / atributo `aria-selected="true"`
- `color`: `var(--dss-action-primary)`
- `font-weight`: `var(--dss-font-weight-medium)` (500)
- Indicador (`EXC-01`): `height: var(--dss-border-width-thick)`, `background-color: currentColor`

### 8.6 Desabilitado

- Classe: `dss-tab--disable`
- `opacity`: `var(--dss-opacity-disabled)` (0.4)
- `cursor: not-allowed`
- `pointer-events: none`

---

## 9. Acessibilidade

| Critério | Implementação |
|----------|---------------|
| **Role** | `tab` (herdado do `QTab` — elemento nativo da navegação por abas) |
| **Touch target** | `min-height: var(--dss-touch-target-md)` — WCAG 2.5.5 (48px) |
| **`::before`** | **Não usado** — `min-height` é suficiente pois `QTab` é block-level |
| **Teclado** | Setas ← → navegam entre abas (gerenciado pelo `QTabs` pai) |
| **`aria-selected`** | Gerenciado pelo `QTabs` pai — `DssTab` não duplica |
| **`aria-controls`** | Gerenciado pelo `QTabs` pai |
| **WCAG 2.1 AA** | Conforme via tokens DSS |
| **forced-colors** | `ButtonText`, `GrayText`, `Highlight` (EXC-02) |

### Navegação por teclado (gerenciada pelo QTabs)

| Tecla | Ação |
|-------|------|
| `←` | Move foco para a aba anterior |
| `→` | Move foco para a próxima aba |
| `Home` | Move foco para a primeira aba |
| `End` | Move foco para a última aba |
| `Enter` / `Space` | Seleciona a aba em foco |

---

## 10. Brandabilidade

A cor de seleção reage ao `[data-brand]` do container pai:

| Brand | Cor ativa | Token |
|-------|-----------|-------|
| Hub (padrão) | Laranja | `--dss-hub-600` |
| Water | Azul | `--dss-water-600` |
| Waste | Verde | `--dss-waste-600` |

O indicador (`.q-tab__indicator`) herda a cor via `currentColor` — sem sobrescrita adicional necessária.

### Modo contextual (recomendado)

Aplicar `[data-brand]` no container pai afeta todas as abas dentro dele:

```vue
<div data-brand="hub">
  <q-tabs v-model="tab">
    <DssTab name="home" label="Início" />
  </q-tabs>
</div>
```

### Modo direto (alternativo)

Aplicar `.dss-tab--brand-*` diretamente no `DssTab` via `class`. Útil quando apenas uma aba específica deve adotar uma brand diferente do container:

```vue
<q-tabs v-model="tab">
  <DssTab name="home" label="Início" />
  <DssTab name="alerts" label="Alertas" class="dss-tab--brand-hub" />
</q-tabs>
```

---

## 11. Tokens utilizados

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
| `--dss-spacing-3` | Espaçamento | Padding block (12px) e padding icon-only |
| `--dss-spacing-4` | Espaçamento | Padding inline padrão (16px) |
| `--dss-duration-150` | Motion | Duração de transições |
| `--dss-easing-standard` | Motion | Curva `cubic-bezier(0.4,0,0.2,1)` |
| `--dss-hub-600` | Brand | Cor ativa Hub |
| `--dss-water-600` | Brand | Cor ativa Water |
| `--dss-waste-600` | Brand | Cor ativa Waste |

---

## 12. Exceções formalizadas

### EXC-01 — Gate de Composição v2.4 Regra 1 + Regra 2

**Localização:** `2-composition/_base.scss` + `4-output/_states.scss`

**Seletores:** `.dss-tab .q-tab__indicator`

**Gates violados:**
- Regra 1: O componente usa `<q-tab>` (primitivo Quasar) diretamente
- Regra 2: O SCSS sobrescreve classes internas do Quasar

**Justificativa (Regra 1):** `DssTab` é um wrapper Nível 1 Independente — não existe componente DSS Fase 1 equivalente para compor. Precedente estabelecido pelo `DssItemSection` (Golden Context de `DssItemLabel`), que da mesma forma encapsula `<q-item-section>`.

**Justificativa (Regra 2):** O `QTab` aplica estilo hardcoded ao `.q-tab__indicator` (altura e cor fixas). O seletor composto `.dss-tab .q-tab__indicator` é a única forma de substituir esse CSS de terceiros com tokens DSS sem criar dependências externas adicionais.

### EXC-02 — System Color Keywords em forced-colors

**Localização:** `4-output/_states.scss`

**Valores:** `ButtonText` (padrão), `GrayText` (desabilitado), `Highlight` (ativo)

**Justificativa:** Em `@media (forced-colors: active)`, tokens CSS são ignorados pelo navegador. System color keywords são obrigatórios para garantir visibilidade. Padrão canônico DSS (estabelecido em `DssBadge`, `DssIcon`, `DssItemLabel`).

### EXC-03 — `#000 !important` em print

**Localização:** `4-output/_states.scss — @media print`

**Justificativa:** Impressão monocromática. Tokens CSS podem não ser resolvidos em contexto de print dependendo do browser/configuração de impressão. Valor hardcoded preto é aceitável e necessário para garantir legibilidade.

---

## 13. Anti-padrões

| Anti-padrão | Alternativa |
|-------------|-------------|
| Usar `DssTab` fora de `q-tabs` ou `DssTabs` | Usar em contexto de tabs adequado |
| Aplicar cor de seleção via prop | Usar `[data-brand]` no container pai |
| Forçar `ripple=true` | Bloqueado por design — não tente sobrescrever |
| Usar `DssTab` como botão de ação | Usar `DssButton` |
| Adicionar lógica de navegação dentro do `DssTab` | Pertence ao router ou ao container pai |
| Usar dois `DssTab` com o mesmo `name` no mesmo `q-tabs` | `name` deve ser único por instância de `q-tabs` |

---

## 14. Diferenças em relação ao QTab nativo

| Aspecto | QTab | DssTab |
|---------|------|--------|
| Ripple | Configurável | Sempre desativado |
| No-caps | Configurável | Sempre aplicado via tokens |
| Tipografia | Quasar defaults | Tokens DSS |
| Indicador | CSS hardcoded | `--dss-border-width-thick` + `currentColor` |
| Touch target | Sem garantia | `min-height: --dss-touch-target-md` |
| Focus ring | Quasar style | `outline` com `--dss-focus-ring` |
| Hover | Ripple | Overlay `::after` com opacity tokens |
| Brandabilidade | Não | Via `[data-brand]` + tokens DSS |
