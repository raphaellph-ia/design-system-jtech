# DssTextarea

**Versão DSS**: 2.2.0
**Golden Reference**: DssInput
**Golden Context**: DssInput
**Fase**: 1
**Classificação**: Action Control interativo — campo multilinhas

---

## 1. Identidade e Papel Semântico

`DssTextarea` é o componente oficial do Design System Sansys para **campos de texto multilinhas**. Implementado como wrapper do `QInput` do Quasar com `type="textarea"` fixado internamente.

### O que é

- Campo de entrada de texto multilinhas governado pelo DSS
- Wrapper de `QInput` com encapsulamento controlado da API Quasar
- Suporte completo a variantes visuais, brandabilidade e acessibilidade
- Dois modos de dimensionamento: altura fixa (via `rows`) e autogrow (via `autogrow` + `maxHeight`)

### Quando usar

- Campos de descrição, comentário, notas, observações
- Quando o conteúdo esperado excede uma linha de texto
- Formulários que requerem input textual extenso

### Quando NÃO usar

- Para input de linha única → use `DssInput`
- Para textos estáticos/exibição → use `<p>`, `DssCard`, etc.
- Quando `type` precisar variar (email, number, password) → use `DssInput`

---

## 2. Golden Component

### Golden Reference: DssInput

`DssInput` é o Golden Reference para `DssTextarea` porque:
- Ambos são Action Controls interativos de formulário
- Compartilham as mesmas variantes visuais (outlined, filled, standout, borderless)
- Compartilham os mesmos tokens de estilo (input-height, spacing, colors)
- Compartilham o mesmo padrão de brandabilidade
- `DssTextarea` segue exatamente o mesmo sistema de prioridades de estados

### Golden Context: DssInput

`DssInput` é também o Golden Context porque não existe componente mais próximo para baseline de auditoria de um campo multilinhas.

### Diferença Arquitetural Principal

| Aspecto | DssInput | DssTextarea |
|---------|----------|-------------|
| Implementação | HTML nativo customizado | Wrapper QInput |
| SCSS | Classes próprias (`.dss-input__*`) | Override classes Quasar (`.q-field__*`) |
| Prop `type` | Aceita tipo variável | `textarea` fixo — não exposto |

Esta diferença é uma divergência arquitetural intencional e documentada. A equipe DSS optou por aproveitar a infraestrutura do `QInput` (autogrow nativo, gestão interna de focus/error/loading) em vez de reimplementar do zero.

---

## 3. Touch Target

**Opção A — Interativo**: `min-height: var(--dss-input-height-md)` aplicado em `.dss-textarea .q-field__control`.

**Justificativa**: `DssTextarea` é um controle de formulário interativo. O campo em si constitui a área de toque — não há necessidade de `::before` como ocorre em controles compactos (DssCheckbox, DssRadio). Esta decisão é consistente com a governança estabelecida no DssInput (auditoria Jan 2026).

- **Touch target padrão**: `var(--dss-input-height-md)` = 44px (WCAG 2.1 AA — SC 2.5.5)
- **Touch target dense**: `var(--dss-input-height-sm)` = 36px (versão compacta, uso contextual)
- **`::before`**: Não utilizado (reservado para controles compactos por convenção DSS)

---

## 4. Variantes Visuais

### `outlined` (padrão)

Borda completa ao redor. Fundo transparente. Label flutua sobre a borda com notch effect.

```vue
<DssTextarea v-model="text" label="Descrição" variant="outlined" />
```

### `filled`

Fundo preenchido (`--dss-gray-100`), borda apenas na parte inferior. Sugere "área editável".

```vue
<DssTextarea v-model="text" label="Notas" variant="filled" />
```

### `standout`

Fundo sutil em repouso, box-shadow pronunciado no foco. Visual de "destaque".

```vue
<DssTextarea v-model="text" label="Feedback" variant="standout" />
```

### `borderless`

Sem borda visível, sublinhado sutil no foco. Para contextos com delimitação visual externa.

```vue
<DssTextarea v-model="text" label="Observação" variant="borderless" />
```

---

## 5. Modos de Dimensionamento

### Modo altura fixa (padrão)

O campo tem altura definida pelo número de `rows`. Não cresce com o conteúdo. Scrollbar aparece quando o texto excede a altura.

```vue
<DssTextarea v-model="text" :rows="5" label="Descrição longa" />
```

### Modo autogrow

O campo cresce verticalmente conforme o usuário digita. Ideal para campos abertos sem tamanho esperado.

```vue
<!-- Autogrow sem limite -->
<DssTextarea v-model="text" autogrow label="Comentário" />

<!-- Autogrow com altura máxima -->
<DssTextarea v-model="text" autogrow max-height="300px" label="Notas" />
```

**`maxHeight` — Bridge CSS (EX-01)**:
A prop `maxHeight` é implementada via CSS custom property `--dss-textarea-max-height`, aplicada como inline style. O SCSS consome `max-height: var(--dss-textarea-max-height, none)`. Esta técnica é um bridge prop→CSS sem criar token DSS (valores de altura são contextuais, não semânticos globais).

---

## 6. Estados

| Estado | Implementação | Descrição |
|--------|--------------|-----------|
| **default** | `.dss-textarea--{variant}` | Repouso — borda/fundo conforme variante |
| **hover** | `:not(.disabled):not(.readonly):not(.focused):hover` | Borda/fundo ligeiramente intensificados |
| **focus** | `.dss-textarea--focused` + `.q-field--focused` | Borda/sombra com `--dss-action-primary` |
| **active** | (via hover + foco simultâneos) | Campo sendo editado |
| **disabled** | `.dss-textarea--disabled` | opacity 0.4, pointer-events none |
| **readonly** | `.dss-textarea--readonly` | Cursor default, borda reduzida |
| **error** | `.dss-textarea--error` + `.q-field--error` | Borda/sombra com `--dss-error-600` |
| **loading** | `.dss-textarea--loading` | pointer-events none, spinner via QInput |

### Estados NÃO aplicáveis

| Estado | Justificativa |
|--------|--------------|
| **indeterminate** | Não aplicável — textarea é um campo de valor contínuo, não seleção binária/tristate |
| **loading bloqueante** | loading fase 1 mostra spinner sem impedir leitura do conteúdo existente |

---

## 7. Acessibilidade (WCAG 2.1 AA)

### Keyboard Navigation

- `Tab`: foca no textarea
- `Shift+Tab`: foco reverso
- Todas as teclas de texto/edição funcionam normalmente dentro do campo
- `Tab` não fica "preso" dentro do textarea (comportamento nativo)

### ARIA

- `aria-label`: via prop `ariaLabel` (sobrescreve label visual para screen readers)
- `aria-required`: via prop `required` (`aria-required="true"`)
- `aria-invalid`: gerenciado internamente pelo QInput quando `error=true`
- `aria-describedby`: gerenciado pelo QInput para conectar campo com hint/error

### Focus Ring

- Estilo de foco visível: `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` via `:has(:focus-visible)`
- Variantes já aplicam `box-shadow` no foco como indicador primário
- `outline` como indicador secundário de fallback

### Dark Mode (`[data-theme="dark"]`)

Implementado em `4-output/_states.scss`. Cobre:
- Fundo das variantes filled/standout
- Borda da variante outlined
- Cores de texto, label, placeholder, hint

### High Contrast (`prefers-contrast: more`)

- `border-width: var(--dss-border-width-md) !important`
- `border-color: currentColor !important`
- Outline adicional no foco

### Forced Colors (`forced-colors: active`)

- `border: var(--dss-border-width-md) solid ButtonText`
- Foco: `border-color: Highlight`
- Disabled: `border-color: GrayText`
- Texto: `color: FieldText`, fundo: `background-color: Field`

### Reduced Motion

- Todas as `transition` e `animation` são suprimidas via `transition: none !important`

---

## 8. Brandabilidade

Ativada via prop `brand` ou contexto `[data-brand="hub|water|waste"]`:

```vue
<!-- Via prop -->
<DssTextarea variant="outlined" brand="hub" label="Campo Hub" />

<!-- Via contexto -->
<div data-brand="water">
  <DssTextarea variant="outlined" label="Campo Water" />
</div>
```

| Marca | Token de foco | Token de label | Token de hint |
|-------|--------------|----------------|---------------|
| hub | `--dss-hub-600` | `--dss-hub-700` | `--dss-hub-700` |
| water | `--dss-water-500` | `--dss-water-600` | `--dss-water-700` |
| waste | `--dss-waste-600` | `--dss-waste-700` | `--dss-waste-800` |

**Regra**: Error state sempre usa `--dss-error-600` independente de brand.

---

## 9. Anti-Patterns

1. **Usar `DssTextarea` para input de linha única** → use `DssInput`. Textarea tem semântica de multilinhas e layout vertical diferente.

2. **Tentar passar `type` como prop** → `type="textarea"` é fixo internamente e não pode ser alterado. `DssTextarea` não aceita a prop `type`.

3. **Usar `autogrow` em containers de altura fixa sem `maxHeight`** → o textarea pode crescer além do container, causando overflow. Sempre defina `max-height` quando autogrow estiver em layout restrito.

4. **Aplicar `resize` via CSS externo** → `resize: none` é definido pelo componente. Redimensionamento manual pelo usuário vai contra o design DSS. Autogrow é a alternativa governada.

---

## 10. Paridade com DssInput (Golden Context)

| Característica | DssInput | DssTextarea | Diferença justificada |
|----------------|----------|-------------|----------------------|
| Variantes | 4 | 4 | Idêntico |
| Tokens de cor | Mesmos | Mesmos | Idêntico |
| Touch Target | `--dss-input-height-md` | `--dss-input-height-md` | Idêntico |
| Brandabilidade | hub/water/waste | hub/water/waste | Idêntico |
| Dark mode | Sim | Sim | Idêntico |
| Prop `type` | Aceita | Não exposta | Divergência intencional: textarea fixo |
| HTML base | Nativo `<input>` | `QInput` wrapper | Divergência intencional: aproveita autogrow do Quasar |
| SCSS targets | `.dss-input__*` | `.q-field__*` | Divergência necessária: QInput gera HTML próprio |
| `autogrow` | Não existe | Existe | Exclusivo de textarea |
| `rows` | Não existe | Existe | Exclusivo de textarea |
| `maxHeight` | Não existe | Existe | Exclusivo de textarea (via CSS var bridge) |

---

## 11. Exceções Documentadas

### EX-01 — `--dss-textarea-max-height` (CSS custom property de componente)

**Descrição**: A prop `maxHeight` é implementada via `--dss-textarea-max-height`, uma CSS custom property definida como inline style no QInput. O SCSS consome `max-height: var(--dss-textarea-max-height, none)` no `.q-field__native`.

**Por que não é token DSS**: A altura máxima de um textarea é contextual — varia conforme o layout do consumidor. Não é um valor semântico global reutilizável. Criar um token `--dss-textarea-max-height` seria um token específico de componente com valor dinâmico, violando o princípio de tokens genéricos.

**Conformidade**: Sem valores hardcoded. A bridge prop→CSS é idiomática no Vue com CSS custom properties.

---

## 12. Uso Previsto em Componentes Futuros

- **DssFormField**: Wrapper de formulário que pode hospedar DssTextarea com label externo e validação
- **DssCommentBox**: Composto de DssTextarea + DssButton "Enviar" para caixas de comentário
- **DssRichEditor** (Fase 3+): Textarea avançado com suporte a markdown preview
