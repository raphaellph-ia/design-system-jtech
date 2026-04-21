# DssStepper

## 1. Visão Geral

O `DssStepper` é o container de navegação em etapas do Design System Sansys. É um wrapper DSS sobre o `QStepper` do Quasar Framework, responsável por:

- Gerenciar o estado de navegação (qual passo está ativo) via `v-model`
- Orquestrar múltiplos `DssStep` filhos
- Fornecer o layout geral (horizontal ou vertical)
- Propagar brandabilidade via `[data-brand]` para os filhos `DssStep`
- Bloquear props de cor não governadas pelo DSS

**Quando usar:** fluxos de trabalho em múltiplas etapas com ordem definida — onboarding, checkout, configuração por estágios.

**Quando NÃO usar:**
- Navegação entre conteúdos sem ordem → use `DssTabs`
- Listas de itens estáticos → use `DssList`
- Conteúdo expansível sem progresso → use `DssCard`

---

## 2. Classificação e Contexto

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Nível 2 (Composição de Primeiro Grau) |
| **Família** | Navegação |
| **Classificação** | Container de navegação não-interativo |
| **Quasar Base** | `QStepper` |
| **Golden Reference** | `DssTabs` (Selo v2.2) |
| **Golden Context** | `DssStep` (Selo v2.2) |
| **Dependências Obrigatórias** | `DssStep` |

---

## 3. API

Consulte [DSSSTEPPER_API.md](./DSSSTEPPER_API.md) para referência completa de props, events, slots, tokens e exceções.

**Props expostas:** `modelValue`, `vertical`, `headerNav`, `animated`, `flat`, `bordered`, `brand`, `ariaLabel`

**Props bloqueadas:** `dark`, `color`, `active-color`, `done-color`, `error-color`, `inactive-color`

---

## 4. Governança de Tokens

O `DssStepper` aplica tokens exclusivamente na estrutura do container:

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do `.q-stepper` |
| `--dss-text-body` | Cor de texto base (herdada pelos filhos) |
| `--dss-radius-md` | Borda arredondada do container |
| `--dss-gray-200` | Cor da borda quando `bordered=true` (light) |
| `--dss-gray-300` | Linha conectora fallback no modo vertical |
| `--dss-gray-600` | Cor da borda em dark mode |
| `--dss-border-width-thin` | Espessura da borda (bordered=true) |

Tokens de cor de passos (`--dss-action-primary`, `--dss-feedback-success`, etc.) são responsabilidade do `DssStep` filho.

---

## 5. Acessibilidade

- **Role semântico:** gerenciado nativamente pelo QStepper (`role="tablist"` no header, `role="tabpanel"` no conteúdo)
- **Touch Target:** Option B — DssStepper é container não-interativo; touch targets são responsabilidade dos `DssStep` filhos
- **Navegação por teclado:** setas entre passos quando `header-nav=true` (comportamento nativo do QStepper)
- **ARIA:** `aria-label` propagado ao `<q-stepper>` via prop `ariaLabel`
- **WCAG:** 2.1 AA

---

## 6. Brandabilidade

O `DssStepper` define `[data-brand]` no seu elemento raiz, propagando a marca para os `DssStep` filhos via cascade CSS:

```vue
<DssStepper v-model="step" brand="hub">
  <!-- DssStep filhos herdam automaticamente brand="hub" via [data-brand='hub'] .dss-step -->
  <DssStep name="1" title="Passo 1"> ... </DssStep>
</DssStepper>
```

O container em si não possui sobreposição de cor por brand. A coloração de dots e títulos ativos é gerenciada exclusivamente pelo `DssStep` via `[data-brand='x'] .dss-step`.

---

## 7. Exceções Formais

| ID | Gate Violado | Localização | Justificativa |
|----|-------------|-------------|---------------|
| **EXC-01a** | Gate de Composição v2.4 — Regra 1 (template) | `1-structure/DssStepper.ts.vue` | Uso de `<q-stepper>` diretamente no template — primitivo Quasar sem equivalente DSS nativo. O QStepper provê state management e provide/inject para coordenação dos DssStep filhos. Precedente: DssTabs (Golden Reference) com `<q-tabs>`. |
| **EXC-01b** | Gate de Composição v2.4 — Regra 1 (seletores CSS) | `2-composition/_base.scss`, `3-variants/_variants.scss`, `4-output/_states.scss` | Seletores Quasar internos (`.dss-stepper .q-stepper__*`) — única forma de substituir CSS nativo com tokens DSS. Precedente: DssStep (Golden Context). |
| **EXC-02** | Nenhuma (padrão canônico) | `4-output/_states.scss` | `Canvas` / `CanvasText` / `ButtonText` em `forced-colors`. Tokens CSS ignorados pelo navegador. |
| **EXC-03** | Token First | `4-output/_states.scss` | `#fff !important / #000 !important` em `@media print`. Legibilidade monocromática. Precedente: DssStep, DssHeader. |

---

## 8. Estados Aplicáveis

| Estado | Aplicável | Justificativa |
|--------|-----------|---------------|
| `dark-mode` | ✅ | Tokens adaptam-se automaticamente via `[data-theme='dark']` |
| `hover` | ❌ | Container não-interativo — responsabilidade dos DssStep filhos |
| `focus` | ❌ | Idem |
| `active` | ❌ | Idem |
| `disabled` | ❌ | Idem |
| `loading` | ❌ | DssStepper não carrega dados — progresso via props no DssStep |
| `error` | ❌ | Idem |
| `indeterminate` | ❌ | Não aplicável a fluxos sequenciais |

---

## 9. Variantes

| Variante | Prop | Efeito |
|----------|------|--------|
| **Padrão** | — | Container com `background-color: --dss-surface-default`, sombra padrão QStepper |
| **Flat** | `flat=true` | Remove sombra (recomendado dentro de DssCard ou superfícies elevadas) |
| **Bordered** | `bordered=true` | Adiciona borda `--dss-border-width-thin` solid `--dss-gray-200` |
| **Vertical** | `vertical=true` | Passos empilhados verticalmente com linha conectora à esquerda |

---

## 10. Composição

```
DssStepper
└── [div.dss-stepper] — root (Gate de Composição v2.4 PASSA)
    └── [q-stepper] — gerencia state management e keyboard navigation
        └── DssStep × N — filhos obrigatórios
            └── q-stepper-navigation — botões de navegação (opcional por passo)
```

**Regra:** `DssStepper` aceita exclusivamente `DssStep` no slot `default`. O uso de `<q-step>` diretamente é violação arquitetural (Gate de Composição v2.4).

---

## 11. Paridade com Golden Reference (DssTabs) e Golden Context (DssStep)

| Aspecto | DssTabs | DssStep | DssStepper | Divergência |
|---------|---------|---------|------------|-------------|
| `defineOptions` | Sim | Sim | Sim | — |
| `inheritAttrs: false` | Sim | Sim | Sim | — |
| Root element | `<div>` | `<q-step>` | `<div>` | ✓ DssStep usa primitivo Quasar como root (EXC-01 do DssStep) |
| `v-bind="$attrs"` | No `<div>` | No `<q-step>` | No `<div>` | — |
| `[data-brand]` | No `<div>` | N/A | No `<div>` | ✓ DssStepper propaga brand igual ao DssTabs |
| Background token | `--dss-surface-default` | — | `--dss-surface-default` | — |
| Dark mode | ✅ | ✅ | ✅ | — |
| Forced-colors | Canvas keywords | ButtonFace keywords | Canvas keywords | ✓ Container usa Canvas (não ButtonFace) |
| Print hardcoded | ✅ | ✅ | ✅ | — |
| Brands | Via cascade | Seletores diretos | Via `[data-brand]` | ✓ DssStepper é fonte de [data-brand] para filhos |

---

## 12. Anti-Patterns

- **`<q-step>` diretamente no slot** — sempre use `DssStep`
- **Aplicar `color` / `active-color`** — governados por tokens no DssStep
- **Estilizar DssStep via CSS do DssStepper** — cada componente gerencia seu próprio escopo
- **Aninhar DssStepper dentro de outro DssStepper** — sem suporte arquitetural
- **Usar DssStepper como lista estática** — use `DssList` ou `DssCard`

---

## 13. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 20 Abr 2026 | Criação inicial — wrapper sobre QStepper, 7 tokens, 3 exceções formais |
