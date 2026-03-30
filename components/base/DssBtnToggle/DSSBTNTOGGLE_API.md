# DssBtnToggle — API Reference

**Design System Sansys v2.2 — Componente Fase 2**

---

## Props

### `modelValue` (v-model)

| Campo | Valor |
|-------|-------|
| Tipo | `any` |
| Default | `undefined` |
| Obrigatório | Não (mas necessário para controle de estado) |

Valor atualmente selecionado. Deve corresponder ao campo `value` de uma das opções. `null`/`undefined` representa nenhuma seleção (apenas com `clearable: true`).

---

### `options`

| Campo | Valor |
|-------|-------|
| Tipo | `BtnToggleOption[]` |
| Obrigatório | **Sim** |

Array de objetos que definem os botões internos. Cada objeto gera um botão no grupo.

**Estrutura de `BtnToggleOption`:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `value` | `any` | Valor único da opção (**obrigatório**) |
| `label` | `string?` | Texto do botão |
| `icon` | `string?` | Ícone Material Icons |
| `iconRight` | `string?` | Ícone à direita do label |
| `slot` | `string?` | Nome do slot para conteúdo personalizado |
| `attrs` | `Record<string, any>?` | Atributos HTML adicionais (ex: `aria-label`) |
| `disable` | `boolean?` | Desabilita somente esta opção |

---

### `variant`

| Campo | Valor |
|-------|-------|
| Tipo | `'elevated' \| 'flat' \| 'outline' \| 'unelevated' \| 'push'` |
| Default | `'elevated'` |

Variante visual do grupo. Controla aparência de todos os botões internos.

| Valor | Descrição | Props Quasar resultantes |
|-------|-----------|--------------------------|
| `elevated` | Com sombra (padrão) | nenhuma prop booleana |
| `flat` | Sem sombra, sem borda | `flat: true` |
| `outline` | Com borda visível | `outline: true` |
| `unelevated` | Sem sombra, fundo sólido | `unelevated: true` |
| `push` | Efeito 3D sombra inferior | `push: true` |

---

### `color`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Cor dos botões **inativos** (não selecionados). Sistema de cores Quasar/DSS (ex: `'primary'`, `'secondary'`, `'grey-6'`).

---

### `toggleColor`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Cor do botão **ativo** (selecionado). Sistema de cores Quasar/DSS.

---

### `textColor`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Cor do texto dos botões inativos.

---

### `toggleTextColor`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Cor do texto do botão ativo.

---

### `rounded`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Aplica `border-radius: var(--dss-radius-full)` (pill) nas extremidades do grupo. Botões intermediários mantêm `border-radius: 0`.

---

### `square`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Remove todo `border-radius` (cantos completamente retos). EXC-01 documentado.

---

### `spread`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Os botões internos recebem `flex: 1` e ocupam toda a largura disponível.

---

### `stretch`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Em contexto flexbox, o grupo e os botões esticam até a altura do elemento pai.

---

### `disable`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Desabilita todo o grupo. Nenhuma opção pode ser selecionada. `aria-disabled` gerenciado pelo Quasar nos botões internos.

---

### `readonly`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Modo somente leitura. Exibe a seleção atual mas bloqueia interação. Cursor `default` + `pointer-events: none` no container.

---

### `clearable`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Permite desmarcar a opção ativa clicando nela novamente. O `modelValue` volta para `null`/`undefined`.

---

### `brand`

| Campo | Valor |
|-------|-------|
| Tipo | `'hub' \| 'water' \| 'waste' \| null` |
| Default | `null` |

Marca Sansys. Aplica acento visual (box-shadow inset na borda inferior) com a cor da marca.

---

### `ariaLabel`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Label acessível para o grupo (`aria-label` no container). **Altamente recomendado** — o grupo não possui label visual próprio.

---

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `size` | Controle via tokens `--dss-compact-control-height-*` (implementação futura) |
| `dense` | Mesmo motivo de `size` — deve seguir tokens DSS |
| `noCaps` | O componente aplica `no-caps` internamente. Casing controlado por tokens de tipografia |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido quando o valor selecionado muda (clicar numa opção ou desmarcar com `clearable`) |

---

## Slots

Slots dinâmicos por opção — disponíveis quando a opção define a propriedade `slot`.

```vue
<!-- Opção com slot personalizado -->
:options="[{ value: 'bold', slot: 'negrito' }]"

<!-- Uso no template consumidor -->
<DssBtnToggle :options="opcoes">
  <template #negrito>
    <strong>N</strong>
  </template>
</DssBtnToggle>
```

O slot recebe `{ option: BtnToggleOption }` como prop para acesso à opção correspondente.

---

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L3 | Separadores flat/unelevated; colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast outline |
| `--dss-radius-full` | L2 | Border-radius rounded (pill) |
| `--dss-gray-200` | L3 | Separador unelevated (sutil) |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Square variant. Semântico. Padrão DssBtnGroup EXC-01. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Dark mode dividers. Sem token DSS para white alpha. |
| EXC-03 | `1px solid ButtonText` | `_states.scss` | Forced-colors — system keywords obrigatórios. |

---

*DSS v2.2 — DssBtnToggle API Reference*
