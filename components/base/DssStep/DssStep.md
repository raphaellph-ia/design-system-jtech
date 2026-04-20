# DssStep — Documentação Normativa

> **DSS v2.2 — Status: CONFORME — Selo DSS v2.2 concedido em 20 Abr 2026**
>
> Golden Reference: DssTab | Golden Context: DssTabs

---

## 1. Visão Geral

### O que é

DssStep é o passo individual de um fluxo de assistente (wizard/stepper). Representa uma etapa com estado visual explícito — pendente, ativo, concluído ou com erro — dentro de uma sequência navegável.

### Quando usar

- Em fluxos de cadastro, onboarding ou checkout com múltiplas etapas sequenciais
- Quando cada etapa tem conteúdo próprio que se expande/colapsa
- Quando o sistema precisa comunicar visualmente o progresso do usuário

### Quando NÃO usar

- Para navegação por abas simples — use `DssTab` + `DssTabs`
- Como elemento de lista sem hierarquia de progresso — use `DssItem`
- Sem um container stepper (`q-stepper` / `DssStepper`)

---

## 2. Anatomia

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────┐  ┌────────────────────────────────┐              │
│  │  1   │  │ Título do Passo                │  ← .q-stepper__tab (header)
│  │ dot  │  │ Subtítulo opcional (caption)   │
│  └──────┘  └────────────────────────────────┘
│  ═══════════════════════════════════════════ ← .q-stepper__line (conector)
│
│  ┌─────────────────────────────────────────┐
│  │  Conteúdo do passo (slot default)       │  ← .q-stepper__step-content
│  │  (visível apenas quando ativo)          │
│  └─────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Elementos

| Elemento | Seletor CSS | Descrição |
|----------|-------------|-----------|
| Container | `.dss-step` | Elemento raiz — wrapper do q-step |
| Cabeçalho | `.q-stepper__tab` | Área com dot + label. Clicável apenas com `headerNav=true` |
| Dot | `.q-stepper__dot` | Círculo 32px com número, ícone ou símbolo de estado |
| Título | `.q-stepper__title` | Texto principal do passo |
| Caption | `.q-stepper__caption` | Subtítulo opcional |
| Conector | `.q-stepper__line` | Linha que conecta visualmente este passo ao próximo |
| Conteúdo | `.q-stepper__step-content` | Área de conteúdo colapsável (gerenciada pelo QStepper) |

---

## 3. API Pública

### Props permitidas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string \| number` | **obrigatório** | Identificador único para o v-model do container |
| `title` | `string` | `undefined` | Título do passo |
| `caption` | `string` | `undefined` | Subtítulo do passo |
| `icon` | `string` | `undefined` | Ícone Material Icons (substitui número no dot) |
| `activeIcon` | `string` | `undefined` | Ícone quando ativo |
| `doneIcon` | `string` | `undefined` | Ícone quando concluído |
| `errorIcon` | `string` | `undefined` | Ícone quando com erro |
| `done` | `boolean` | `false` | Passo concluído (dot verde) |
| `error` | `boolean` | `false` | Passo com erro (dot vermelho) |
| `disable` | `boolean` | `false` | Passo desabilitado |
| `headerNav` | `boolean` | `false` | Cabeçalho clicável para navegação livre |

### Props bloqueadas

| Prop | Motivo |
|------|--------|
| `color` | Governado por `--dss-action-primary` + brand tokens |
| `active-color` | Governado por `--dss-action-primary` |
| `done-color` | Governado por `--dss-feedback-success` |
| `error-color` | Governado por `--dss-feedback-error` |
| `prefix` | DSS governa número/ícone no dot via QStep nativo |

### Eventos

DssStep não emite eventos. A seleção é gerenciada pelo container via v-model.

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do passo (visível quando ativo). Aceita qualquer componente DSS. |

---

## 4. Tokens Utilizados

### Layout e dimensões

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-lg` | 32px | Dimensão do dot padrão |
| `--dss-icon-size-md` | 24px | Dot em dense + ícone interno |
| `--dss-icon-size-sm` | 20px | Ícone interno no dot |
| `--dss-icon-size-xs` | 16px | Ícone interno em dense |
| `--dss-touch-target-md` | ~44px | Altura mínima do header (WCAG 2.5.5) |
| `--dss-compact-control-height-sm` | ~36px | Altura mínima em dense |
| `--dss-spacing-0_5` | 2px | Margem superior do caption |
| `--dss-spacing-2` | 8px | Padding em dense |
| `--dss-spacing-3` | 12px | Padding-block do header + gap do label |
| `--dss-spacing-4` | 16px | Padding-inline do header e conteúdo |

### Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-family-sans` | Roboto | Família base |
| `--dss-font-size-xs` | 12px | Texto em dense |
| `--dss-font-size-sm` | 14px | Número do dot + caption |
| `--dss-font-size-base` | 16px | Título |
| `--dss-font-weight-normal` | 400 | Título inativo + caption |
| `--dss-font-weight-medium` | 500 | Título ativo + número no dot |
| `--dss-line-height-tight` | 1.25 | Título |
| `--dss-line-height-normal` | 1.5 | Caption |

### Cores

| Token | Uso |
|-------|-----|
| `--dss-text-subtle` | Texto/dot inativo |
| `--dss-text-body` | Título ativo e done |
| `--dss-text-inverse` | Texto dentro do dot colorido |
| `--dss-surface-muted` | Background do dot inativo |
| `--dss-action-primary` | Background do dot ativo |
| `--dss-feedback-success` | Background do dot done |
| `--dss-feedback-error` | Background do dot error + título error |
| `--dss-gray-300` | Cor do conector entre passos |
| `--dss-gray-600` | Conector em dark mode |
| `--dss-hub-600` | Dot ativo — Brand Hub |
| `--dss-water-600` | Dot ativo — Brand Water |
| `--dss-waste-600` | Dot ativo — Brand Waste |

### Interação e estados

| Token | Uso |
|-------|-----|
| `--dss-opacity-disabled` | Opacidade do passo desabilitado |
| `--dss-opacity-hover` | Overlay de hover (headerNav) |
| `--dss-opacity-active` | Overlay de active (headerNav) |
| `--dss-focus-ring` | Cor do outline de foco (headerNav) |
| `--dss-border-width-md` | Espessura do outline de foco |
| `--dss-border-width-thick` | Foco em high-contrast |
| `--dss-border-width-thin` | Borda do dot em forced-colors |
| `--dss-duration-150` | Duração das transições |
| `--dss-easing-standard` | Curva de animação |

---

## 5. Estados Visuais

### Aplicáveis

| Estado | Como ativar | Visual |
|--------|------------|--------|
| **Inativo (padrão)** | Passo não selecionado | Dot cinza, título cinza sutil |
| **Ativo** | v-model do container | Dot com `--dss-action-primary`, título `--dss-text-body` em medium |
| **Concluído** | `done=true` | Dot com `--dss-feedback-success`, ícone check |
| **Erro** | `error=true` | Dot com `--dss-feedback-error`, título em cor error |
| **Desabilitado** | `disable=true` | Opacidade 40%, cursor not-allowed no header |

### Não aplicáveis

| Estado | Justificativa |
|--------|--------------|
| `hover` / `focus` / `active-press` | Aplicam-se ao header somente quando `headerNav=true` |
| `loading` | DssStep não carrega dados; progresso é controlado via props done/error |
| `indeterminate` | Passos têm estado explícito (pendente, ativo, done, error) |

---

## 6. Governança

### Composição

DssStep é filho direto de `q-stepper` (ou `DssStepper`, quando disponível). Ele:
- Fornece um slot `default` para conteúdo
- Não instancia componentes filhos automaticamente
- Não estiliza filhos internamente

**Anti-patterns:**
- Usar DssStep fora de um container stepper
- Aplicar cores via props bloqueadas (color, active-color, etc.)
- Aninhar DssStep dentro de outros DssStep
- Usar DssStep como elemento de lista sem semântica de progresso

### Exceções ao Gate de Composição v2.4

**EXC-01 — Seletores internos do Quasar (Gate Regra 1)**

O QStep renderiza estrutura DOM com classes internas (`.q-stepper__tab`, `.q-stepper__dot`, etc.) estilizadas com valores hardcoded. O DssStep DEVE sobrescrever via seletores compostos `.dss-step .q-stepper__*` para aplicar tokens DSS. Precedente canônico: DssTab (`.dss-tab .q-tab__indicator`).

**EXC-02 — border-radius: 50%**

Forma geométrica do dot (círculo perfeito). Exceção canônica DSS. Precedente: DssRadio, DssToggle.

**EXC-03 — System color keywords em forced-colors**

`ButtonText`, `Highlight`, `GrayText`, etc. Obrigatórios em `@media (forced-colors: active)` — tokens CSS são ignorados pelo navegador neste modo. Padrão canônico DSS.

**EXC-04 — `#000 / #fff` em print**

Valores hardcoded aceitáveis para garantir legibilidade em impressão monocromática. Precedente: DssTab EXC-03.

---

## 7. Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Contraste do dot | Ícone/texto branco em dots coloridos: contraste ≥ 3:1 (WCAG AA gráficos) |
| Touch target | `min-height: var(--dss-touch-target-md)` no header |
| Focus visible | `outline` com `--dss-focus-ring` (somente quando `headerNav=true`) |
| ARIA | Gerenciado nativamente pelo QStepper (tablist/tab/tabpanel) |
| Reduced motion | Todas as transições são removidas |
| Forced colors | System color keywords explícitos (EXC-03) |
| Screen reader | Estrutura semântica do QStepper é respeitada integralmente |

---

## 8. Comportamentos Implícitos

### Forwarding de atributos

`inheritAttrs: false` + `v-bind="$attrs"` no `<q-step>`. Atributos HTML adicionais são encaminhados diretamente ao QStep (ex.: `aria-*`, `data-*`).

### Estado ativo via Quasar

O estado ativo é determinado pelo `v-model` do QStepper pai. O Quasar aplica a classe `.q-stepper__step--active` no elemento raiz do DssStep quando ele é o passo corrente. O SCSS do DssStep reage a esta classe para alterar cores do dot e título.

### Relação com header-nav e QStepper

A prop `headerNav=true` somente habilita navegação se o QStepper pai não estiver em modo linear (`linear=false`). O DssStep expõe a prop para que o consumidor possa ativá-la; a efetividade depende da configuração do container.

---

## 9. Paridade com Golden Reference (DssTab)

| Aspecto | DssTab | DssStep | Divergência intencional? |
|---------|--------|---------|--------------------------|
| `defineOptions` | Sim | Sim | — |
| `inheritAttrs: false` | Sim | Sim | — |
| `v-bind="$attrs"` | No `<q-tab>` | No `<q-step>` | — |
| Touch target | Sempre | Somente no header | ✓ DssStep: header pode ser estático |
| Overlay `::after` | Sempre | Somente `header-nav` | ✓ DssStep: interatividade condicional |
| Focus ring | Sempre | Somente `header-nav` | ✓ Mesma razão |
| `-webkit-tap-highlight-color` | Sim | Sim | — |
| Dark mode | Sim | Sim | — |
| Forced-colors | System keywords | System keywords | — |
| Print | `#000 !important` | `#000 !important` | — |
| Brands | Dual selector | Dual selector | — |
| Indicador visual | Linear (`.q-tab__indicator`) | Circular (`.q-stepper__dot`) | ✓ Diferença estrutural do componente Quasar |
| Múltiplos estados de cor | Ativo apenas | Ativo / Done / Error | ✓ DssStep tem semântica de progresso |

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 2026-04-16 | 1.0.0 | Criação inicial — pronto para auditoria DSS v2.2 |
