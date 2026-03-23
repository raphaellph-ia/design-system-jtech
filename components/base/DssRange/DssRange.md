# DssRange — Documentação Normativa DSS v2.2

**Versão**: 1.0.0 | **Status**: Conformant | **Fase**: 1

---

## 1. Identidade e Papel Semântico

O `DssRange` é um **Action Control interativo** do tipo campo de seleção de intervalo numérico com dois thumbs. Representa uma faixa contínua ou discreta entre valores mínimo e máximo, permitindo ao usuário selecionar simultaneamente um valor inicial e um valor final por arrasto ou navegação por teclado.

**Categoria**: Form Control — Dual-Thumb Range Input
**Papel semântico**: `role="slider"` (dois elementos implícitos no QRange — um para min, um para max)
**Implementação**: Wrapper do `QRange` do Quasar Framework

### O que este componente faz

- Permite seleção simultânea de dois valores (min e max) em uma faixa contínua ou por passos
- Exibe visualmente o intervalo selecionado entre os dois thumbs (fill da seleção)
- Suporta tooltip de label durante arrasto via prop `label`
- Exibe marcadores visuais de passo opcionais via prop `markers`
- Suporta arrastar o intervalo inteiro (`dragRange`) mantendo a distância entre os thumbs
- Integra estado de erro com `errorMessage` e hint
- Responde a brand tokens via `[data-brand]` no contexto ancestral ou via prop `brand`

### O que este componente NÃO faz

- Não suporta seleção de valor único → use `DssSlider`
- Não fornece label flutuante permanente (`labelAlways`) — Fase 2
- Não fornece label HTML acima do controle (não é QField) → use label HTML externo
- Não valida que `modelValue.min < modelValue.max` — validação é responsabilidade do formulário pai
- Não expõe prop `color` — cor governada exclusivamente por tokens DSS

---

## 2. Golden Component

### Golden Reference: DssSlider

`DssSlider` (selado 2026-03-20) é o **Golden Reference** para DssRange. Ambos são Action Controls da categoria Range Input. DssRange segue **exatamente a mesma arquitetura CSS** do DssSlider, adaptada para dois thumbs:

- Mesmos seletores `.q-slider__*` (QRange compartilha todos os elementos internos do QSlider)
- Mesma estratégia de touch target: `min-height` no `.q-slider__track-container`
- Mesma estratégia de brand via `--dss-action-primary` cascade automático
- Mesma estrutura de wrapper externo `<div>` com hint/errorMessage como filhos
- Mesmos padrões de hover/active com `brightness(0.95/0.90)` e dark mode `brightness(1.10/1.20)`
- Mesmo padrão de disabled state via `--dss-opacity-disabled` + `pointer-events: none`

**Diferença principal**: `modelValue` é `{ min: number, max: number }` (objeto) em vez de `number` (escalar). Isso reflete a natureza dual-thumb do QRange.

**Adição específica**: Modificador `.dss-range--drag-range` aplica `cursor: grab/grabbing` — EX-07 documentada.

### Golden Context: DssInput

`DssInput` (selado Jan 2026) é o **Golden Context** de auditoria. Estabelece:

- Touch Target Option A: `min-height: var(--dss-touch-target-md)` na área interativa (44px WCAG 2.5.5)
- Dense mode reduz para `--dss-touch-target-sm` (36px) — uso contextual documentado
- Padrão de hint/error messages abaixo do controle
- Error state com token semântico de feedback
- Padrão de `disabled` via opacidade + `pointer-events: none`

---

## 3. Touch Target

**Estratégia**: Opção A — controle interativo com área de toque explícita

**Implementação**:
```scss
.dss-range .q-slider__track-container {
  min-height: var(--dss-touch-target-md); /* 44px — WCAG 2.5.5 SC 2.5.5 */
}
```

O `QRange` renderiza como `.q-range.q-slider` e usa `.q-slider__track-container` como área de interação principal — idêntico ao QSlider. Garantir `min-height: 44px` neste elemento satisfaz o requisito WCAG 2.5.5 sem sobrepor a lógica interna do Quasar de posicionamento dos thumbs.

**Dense mode**: `min-height: var(--dss-touch-target-sm)` (36px) — uso contextual documentado para contextos de alta densidade visual.

**`::before`**: Não utilizado — o `.q-slider__track-container` é o próprio touch target. Decisão consistente com DssSlider (Golden Reference) e DssInput (Golden Context).

---

## 4. Implementação como Wrapper QRange

### Decisão Arquitetural

O `DssRange` usa um **wrapper externo** (`<div class="dss-range">`) porque:

1. **QRange não é QField** — não suporta hint, error, label flutuante nativamente
2. **Hint e errorMessage** precisam ser renderizados **abaixo** do controle
3. O `data-brand` e as classes DSS precisam de um container para abranger o controle e suas mensagens

### Delegação Total ao QRange

Toda a lógica de drag, colisão entre thumbs, cálculo de porcentagem de posição e renderização dos dois thumbs é **100% responsabilidade do QRange**. O DssRange não reimplementa nenhuma dessas lógicas.

### inheritAttrs: false

Como o wrapper `<div>` é o elemento raiz, `inheritAttrs: false` é declarado e `v-bind="$attrs"` é aplicado explicitamente ao QRange. Atributos HTML adicionais (`id`, `class` externo, `data-*`, `aria-*` adicionais) são passados ao controle, não ao div wrapper.

### Override de Cor

O QRange usa a prop `color` internamente. O DssRange **não repassa** a prop `color` ao QRange. O SCSS sobrescreve via seletores descendentes (idênticos ao DssSlider):

```scss
.dss-range .q-slider { color: var(--dss-action-primary); }
.dss-range .q-slider__selection { background-color: var(--dss-action-primary); }
.dss-range .q-slider__thumb-shape { fill: var(--dss-action-primary); }
```

Como `[data-brand="hub"]` sobrescreve `--dss-action-primary` no catálogo de tokens, a brandabilidade é **automática via cascade** — sem regras CSS adicionais para fill e thumbs em `_brands.scss`.

---

## 5. Estados

| Estado | Implementação | Token |
|--------|--------------|-------|
| default | Repouso — track muted + selection primary | `--dss-surface-muted`, `--dss-action-primary` |
| hover | `brightness(0.95)` em selection e thumbs | Exceção canônica DSS |
| focus | Focus ring via `.q-slider__focus-ring` | `--dss-shadow-focus` |
| active | Thumb pressionado — `brightness(0.90)` | Exceção canônica DSS |
| disabled | Opacidade reduzida + pointer-events: none | `--dss-opacity-disabled`, `--dss-gray-400` |
| readonly | pointer-events: none, cursor: default | Sem tokens adicionais |
| error | Selection + thumbs + messages em --dss-feedback-error | `--dss-feedback-error` |
| loading | **NÃO aplicável** — Fase 1, valor síncrono | — |
| indeterminate | **NÃO aplicável** — range é numérico com dois pontos sempre definidos | — |

### Decisão Arquitetural: Focus Ring em Error State

O focus ring **não** alterna para `--dss-shadow-focus-error` quando `error=true`. O estado de erro é comunicado visualmente pela selection, thumbs e errorMessage em `--dss-feedback-error`. O focus ring mantém `--dss-shadow-focus` para não sobrepor dois sinais semânticos no mesmo elemento. Decisão consistente com DssSlider (Golden Reference).

---

## 6. Acessibilidade

### ARIA

- `role="slider"` — implícito no QRange (dois elementos, um por thumb, gerenciados internamente)
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` — gerenciados pelo QRange para cada thumb
- `aria-label` — prop `ariaLabel` repassada ao QRange. **Obrigatório** quando não há label visual associado (WCAG 1.3.1)
- `aria-describedby` — associa o range à `errorMessage` via ID único por instância (`dss-range-error-{uid}`) quando `error=true`
- `aria-disabled` — implícito via prop `disable` no QRange quando `disabled=true`

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| Tab | Foca o primeiro thumb |
| Tab (segundo) | Alterna para o segundo thumb |
| Arrow Left / Down | Decrementa o thumb focado em um passo |
| Arrow Right / Up | Incrementa o thumb focado em um passo |
| Home | Define o thumb focado para o valor mínimo |
| End | Define o thumb focado para o valor máximo |

(Comportamento nativo do QRange — gerenciado pelo Quasar)

### Focus Ring

Focus ring aplicado via `.q-slider__focus-ring` sobrescrito com `--dss-shadow-focus`. Cor de brand via `_brands.scss` (hub-600, water-500, waste-600 substituem o azul padrão).

### Acessibilidade de Mensagens

- `hint`: texto informativo, lido por screen readers via DOM (sem role especial)
- `errorMessage`: `role="alert"` + `aria-live="polite"` — anunciado quando `error` torna-se `true`

---

## 7. Brandabilidade

DssRange suporta os três produtos Sansys via dois mecanismos:

### Mecanismo 1: Cascade Automático via --dss-action-primary

O token `--dss-action-primary` é sobrescrito automaticamente por `[data-brand="x"]` no catálogo de tokens:
- `[data-brand="hub"]` → `--dss-action-primary: var(--dss-hub-600)` (laranja)
- `[data-brand="water"]` → `--dss-action-primary: var(--dss-water-500)` (azul)
- `[data-brand="waste"]` → `--dss-action-primary: var(--dss-waste-600)` (verde)

Fill da seleção, thumbs e label tooltip recebem a cor de brand **sem regras CSS adicionais** em `_brands.scss`.

### Mecanismo 2: Focus Ring Explícito (em _brands.scss)

O `--dss-shadow-focus` usa `rgba` fixo azul por padrão. O `_brands.scss` sobrescreve explicitamente o `box-shadow` do `.q-slider__focus-ring` para cada brand com o token numérico da marca.

### Aplicação

```vue
<!-- Via prop (mesmo elemento) -->
<DssRange v-model="value" brand="hub" />

<!-- Via contexto ancestral -->
<div data-brand="water">
  <DssRange v-model="value" />
</div>
```

---

## 8. Anti-Patterns

1. **Usar DssRange para seleção de valor único** → use `DssSlider`
2. **Definir cor via prop `color`** — DssRange não expõe prop de cor. A cor é governada por tokens DSS via SCSS
3. **Omitir `ariaLabel` quando não há label visual** — viola WCAG 1.3.1 (Informação e Relações)
4. **Passar `min > max`** — QRange não valida bounds. A lógica de negócio deve prevenir isso antes de passar as props
5. **Usar `dragRange` sem instrução visual ou hint** — a affordance de arrastar o intervalo inteiro não é óbvia sem contexto. Forneça hint ou instrução contextual

---

## 9. Paridade com Golden Reference (DssSlider) e Golden Context (DssInput)

### Paridade com DssSlider (Golden Reference)

| Critério | DssSlider | DssRange | Observação |
|----------|-----------|----------|------------|
| Touch Target | Opção A — `.q-slider__track-container` | Opção A — `.q-slider__track-container` | Idêntico |
| Seletores CSS internos | `.q-slider__*` | `.q-slider__*` | Idêntico — QRange usa mesmos elementos |
| Brand via cascade | `--dss-action-primary` automático | `--dss-action-primary` automático | Idêntico |
| Focus ring brand | `_brands.scss` explícito | `_brands.scss` explícito | Idêntico |
| Wrapper externo | `<div class="dss-slider">` | `<div class="dss-range">` | Mesmo padrão |
| inheritAttrs | `false`, `$attrs` no QSlider | `false`, `$attrs` no QRange | Idêntico |
| modelValue type | `number` | `{ min: number, max: number }` | **Diferente** — dual-thumb requer objeto |
| Props não expostas | `color` | `color`, `snap`, `labelAlways` | **Diferente** — exclusões adicionais Fase 1 |
| dragRange / cursor | N/A | `.dss-range--drag-range` → `cursor: grab` | **Adição** — específico do QRange |

### Paridade com DssInput (Golden Context)

| Critério | DssInput | DssRange | Justificativa da Divergência |
|----------|----------|----------|------------------------------|
| Touch Target | Opção A, `.q-field__control` | Opção A, `.q-slider__track-container` | QRange não usa QField |
| Label flutuante | Sim (via QField) | Não | QRange não é QField |
| Variantes visuais | outlined / filled / standout / borderless | Nenhuma (Fase 1) | Range tem única apresentação visual |
| Hint/Error | Gerenciado pelo QField | Gerenciado pelo wrapper div | QRange não é QField |
| Dense mode | `--dss-touch-target-sm` | `--dss-touch-target-sm` | Idêntico |
| Brand | `[data-brand]` + tokens numéricos | `--dss-action-primary` cascade | Pattern mais elegante para este componente |

---

## 10. Exceções Documentadas

| ID | Descrição | Justificativa |
|----|-----------|---------------|
| EX-01 | `border-radius: 9999px` no track e selection | Pill shape inerente ao range slider. Sem token DSS para full-round radius. Precedente: DssSlider, DssToggle |
| EX-02 | `border-radius: 50%` no focus ring | Forma circular para envolver o thumb circular. Precedente: DssSlider, DssToggle |
| EX-03 | `brightness(0.95)` hover / `brightness(0.90)` active | Valores canônicos DSS (CLAUDE.md Princípio #8). Precedente: DssSlider, DssToggle |
| EX-04 | `brightness(1.10)` hover dark / `brightness(1.20)` active dark | Valores canônicos DSS para dark mode (CLAUDE.md Princípio #8). Precedente: DssSlider |
| EX-05 | `saturate(1.2)` em high contrast | Valor canônico DSS. Precedente: DssSlider, DssToggle |
| EX-06 | `2px`, `3px` em `@media (forced-colors: active)` | Tokens CSS custom properties ignorados pelo Windows HCM. Precedente: DssSlider, DssTextarea |
| EX-07 | `cursor: grab / grabbing` em `.dss-range--drag-range` | Affordance de UX: comunica ao usuário que o intervalo inteiro pode ser arrastado. Não tokenizável. Exclusivo do DssRange |

---

## 11. Uso Previsto em Componentes Futuros

- **DssForm** (Fase 2): Contexto de formulário que agrupará DssRange com label externo, validação e layout grid.
- **DssFilterPanel** (Fase 2): Painel de filtros que usará DssRange para filtros de intervalo (preço, distância, faixa etária).
- **DssRangeLabels** (Fase 2): Componente auxiliar que exibirá os valores min/max formatados abaixo dos thumbs do DssRange.
