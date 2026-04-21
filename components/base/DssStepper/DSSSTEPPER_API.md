# DssStepper — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string \| number \| undefined` | `undefined` | Identificador do passo atualmente ativo (v-model) |
| `vertical` | `boolean` | `false` | Layout vertical — passos empilhados com linha conectora lateral |
| `headerNav` | `boolean` | `false` | Permite navegação por clique nos cabeçalhos dos DssStep |
| `animated` | `boolean` | `false` | Ativa transições animadas entre painéis de conteúdo |
| `flat` | `boolean` | `false` | Remove a sombra do container (recomendado dentro de DssCard) |
| `bordered` | `boolean` | `false` | Adiciona borda ao container (`--dss-border-width-thin` solid `--dss-gray-200`) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys — aplica [data-brand] e propaga acento visual aos DssStep filhos |
| `ariaLabel` | `string \| undefined` | `undefined` | Label acessível para o stepper (recomendado quando não há título visual) |

### Props Bloqueadas (Governança DSS)

| Prop | Razão do Bloqueio |
|------|------------------|
| `dark` | Modo escuro governado por `[data-theme='dark']` via tokens CSS |
| `color` | Cor base dos passos governada por `--dss-action-primary` no DssStep |
| `active-color` | Cor do passo ativo governada por `--dss-action-primary` no DssStep |
| `done-color` | Cor de conclusão governada por `--dss-feedback-success` no DssStep |
| `error-color` | Cor de erro governada por `--dss-feedback-error` no DssStep |
| `inactive-color` | Cor inativa governada por `--dss-text-subtle` no DssStep |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido quando o usuário navega para um passo diferente |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do stepper — aceita **DssStep** exclusivamente |
| `message` | Mensagens globais exibidas entre os passos (opcional) |

### Regra de Composição (Slot Default)

Somente `DssStep` deve ser usado dentro do `DssStepper`. O uso de `<q-step>` diretamente é violação arquitetural (Gate de Composição v2.4).

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-stepper` | Sempre presente |
| `dss-stepper--horizontal` | `vertical=false` (padrão) |
| `dss-stepper--vertical` | `vertical=true` |
| `dss-stepper--flat` | `flat=true` |
| `dss-stepper--bordered` | `bordered=true` |
| `dss-stepper--brand-hub` | `brand='hub'` |
| `dss-stepper--brand-water` | `brand='water'` |
| `dss-stepper--brand-waste` | `brand='waste'` |

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do container `.q-stepper` |
| `--dss-text-body` | L2 | Cor de texto base herdada pelos filhos |
| `--dss-radius-md` | L2 | Borda arredondada do container |
| `--dss-gray-300` | L2 | Linha conectora de fallback (vertical) |
| `--dss-border-width-thin` | L3 | Espessura da borda (bordered=true) |
| `--dss-gray-200` | L3 | Cor da borda (bordered=true, light mode) |
| `--dss-gray-600` | L4 | Cor da borda em dark mode (bordered=true) |

**Nota:** Tokens de cor de passos (action-primary, feedback-success, feedback-error, text-subtle, etc.) são gerenciados pelo **DssStep**, não pelo DssStepper.

## Exceções Formais

| ID | Localização | Justificativa |
|----|-------------|---------------|
| EXC-01a | `1-structure/DssStepper.ts.vue` | Uso de `<q-stepper>` diretamente no template — primitivo Quasar sem equivalente DSS nativo. QStepper gerencia state management e provide/inject para DssStep filhos. Precedente: DssTabs com `<q-tabs>`. |
| EXC-01b | `2-composition/_base.scss`, `3-variants/_variants.scss`, `4-output/_states.scss` | Seletores Quasar internos (`.dss-stepper .q-stepper__*`) — única forma de aplicar tokens DSS sobre CSS de terceiros. Precedente: DssStep. |
| EXC-02 | `4-output/_states.scss` | System color keywords (`Canvas`, `CanvasText`, `ButtonText`) em `forced-colors`. Tokens ignorados pelo navegador neste modo. |
| EXC-03 | `4-output/_states.scss` | `#fff !important / #000 !important` em `@media print`. Legibilidade monocromática. Precedente: DssStep, DssHeader. |

## Acessibilidade

- **Role**: gerenciado nativamente pelo QStepper (`tablist` para header, `tabpanel` para conteúdo)
- **Teclado**: setas navegam entre passos quando `header-nav=true` (comportamento nativo QStepper)
- **Touch Target**: responsabilidade dos DssStep filhos (Option B no container)
- **ARIA**: `aria-label` propagado ao `<q-stepper>` interno via prop `ariaLabel`
- **WCAG**: 2.1 AA

## Composição Obrigatória

```
DssStepper (este componente)
└── DssStep × N (filhos obrigatórios)
    └── q-stepper-navigation (auxiliar Quasar para botões — opcional por passo)
```
