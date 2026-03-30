# DssBtnToggle

**Design System Sansys — Grupo de Alternância (Button Toggle)**

Container de seleção exclusiva que agrupa botões funcionando como radio buttons visuais. Gerencia estado via `v-model` e renderiza internamente os botões a partir de um array de `options`.

---

## Quando usar

- Selecionar uma opção entre um conjunto mutuamente exclusivo pequeno (2–5 opções)
- Alternar entre modos de visualização (ex: lista/grade)
- Controlar alinhamento ou formatação de texto
- Filtros de toggle (ex: dia/semana/mês)

## Quando NÃO usar

- Mais de 5 opções → usar `DssSelect` ou `DssRadio`
- Seleção múltipla → usar `DssCheckbox`
- Botões sem estado de seleção → usar `DssBtnGroup`

---

## Uso Básico

```vue
<DssBtnToggle
  v-model="valor"
  :options="[
    { label: 'Dia', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mês', value: 'month' },
  ]"
  toggle-color="primary"
  aria-label="Período de visualização"
/>
```

## Com Ícones

```vue
<DssBtnToggle
  v-model="alinhamento"
  :options="[
    { value: 'left', icon: 'format_align_left', attrs: { 'aria-label': 'Esquerda' } },
    { value: 'center', icon: 'format_align_center', attrs: { 'aria-label': 'Centro' } },
    { value: 'right', icon: 'format_align_right', attrs: { 'aria-label': 'Direita' } },
  ]"
  variant="outline"
  toggle-color="primary"
  aria-label="Alinhamento de texto"
/>
```

## Com Clearable

```vue
<DssBtnToggle
  v-model="filtro"
  :options="opcoes"
  clearable
  variant="outline"
  aria-label="Filtro opcional"
/>
<!-- Clicar na opção ativa a desmarca (v-model volta para null) -->
```

---

## API Resumida

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `v-model` | `any` | — | Valor selecionado |
| `options` | `BtnToggleOption[]` | — | Array de opções (**obrigatório**) |
| `variant` | `string` | `'elevated'` | Estilo visual |
| `toggle-color` | `string` | — | Cor do botão ativo |
| `color` | `string` | — | Cor dos botões inativos |
| `clearable` | `boolean` | `false` | Permite desmarcar |
| `disable` | `boolean` | `false` | Desabilita o grupo |
| `readonly` | `boolean` | `false` | Somente leitura |
| `spread` | `boolean` | `false` | Ocupa largura total |
| `rounded` | `boolean` | `false` | Cantos pill |
| `brand` | `string\|null` | `null` | Acento de marca |
| `aria-label` | `string` | — | Label acessível (**recomendado**) |

Documentação completa: [DssBtnToggle.md](./DssBtnToggle.md) | API: [DSSBTNTOGGLE_API.md](./DSSBTNTOGGLE_API.md)
