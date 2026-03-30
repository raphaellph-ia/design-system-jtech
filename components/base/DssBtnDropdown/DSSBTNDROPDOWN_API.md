# DSSBTNDROPDOWN_API — API Reference

> **Componente:** DssBtnDropdown
> **DSS Version:** v2.2
> **Fase:** 2 — Componente Composto
> **Quasar Base:** QBtnDropdown

---

## Props

### Conteúdo

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `String` | `undefined` | Rótulo do botão trigger |
| `icon` | `String` | `undefined` | Ícone à esquerda do label (Material Icons) |
| `icon-right` | `String` | `undefined` | Ícone à direita do label (antes da seta) |

### Estilo Visual

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `variant` | `String` | `'elevated'` | `'elevated'` \| `'flat'` \| `'outline'` \| `'unelevated'` | Variante visual. Mapeada internamente para props booleanas do Quasar |
| `color` | `String` | `undefined` | Paleta Quasar/DSS | Cor do trigger |
| `text-color` | `String` | `undefined` | Paleta Quasar/DSS | Cor do texto (sobrescreve contraste automático) |
| `size` | `String` | `'md'` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | Tamanho do botão |
| `square` | `Boolean` | `false` | — | Remove border-radius (cantos retos) |
| `rounded` | `Boolean` | `false` | — | Border-radius pill completo |
| `dense` | `Boolean` | `false` | — | Modo compacto (reduz padding e altura) |

### Comportamento do Dropdown

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `split` | `Boolean` | `false` | Separa botão de ação da seta de dropdown |
| `disable` | `Boolean` | `false` | Desabilita o componente inteiro |
| `loading` | `Boolean` | `false` | Indica estado de carregamento no trigger |
| `close-on-esc` | `Boolean` | `true` | Fecha o dropdown ao pressionar Escape |
| `dropdown-icon` | `String` | `'arrow_drop_down'` | Ícone de seta do dropdown |
| `menu-anchor` | `String` | `'bottom left'` | Ponto de âncora do painel |
| `menu-self` | `String` | `'top left'` | Ponto de self do painel |
| `menu-offset` | `[Number, Number]` | `[0, 0]` | Offset do painel em pixels `[horizontal, vertical]` |
| `stretch` | `Boolean` | `false` | Largura mínima do painel igual à largura do trigger |
| `persistent` | `Boolean` | `false` | Mantém conteúdo do painel montado quando fechado |

### Brandabilidade

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `String \| null` | `null` | `'hub'` \| `'water'` \| `'waste'` | Acento visual de marca na borda inferior do trigger |

### Acessibilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `aria-label` | `String` | `undefined` | Label acessível para o trigger quando o rótulo visual não é suficiente |

---

## Props Bloqueadas (Não Suportadas)

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `no-caps` | Comportamento de casing gerenciado por tokens de tipografia DSS |
| `no-wrap` | Controle de wrapping via CSS contextual |
| `ripple` | Efeito ripple gerenciado globalmente pelo Quasar |

---

## Mapeamento de Variants

| `variant` | Props booleanas Quasar resultantes |
|-----------|-----------------------------------|
| `elevated` | *(nenhuma prop booleana — padrão Quasar)* |
| `flat` | `flat: true` |
| `outline` | `outline: true` |
| `unelevated` | `unelevated: true` |

---

## Eventos

| Evento | Payload | Condição | Descrição |
|--------|---------|----------|-----------|
| `click` | `MouseEvent` | Sempre | Sempre emitido ao clicar no trigger; semanticamente relevante em modo `split` (ação primária independente do dropdown) |
| `show` | — | Sempre | Emitido quando o dropdown abre |
| `hide` | — | Sempre | Emitido quando o dropdown fecha |
| `before-show` | — | Sempre | Emitido antes do dropdown abrir |
| `before-hide` | — | Sempre | Emitido antes do dropdown fechar |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do painel dropdown. Tipicamente `<q-list>` com `<q-item>` elements |
| `label` | Conteúdo personalizado do trigger (substitui `label` + `icon`) |

### Exemplo — Slot `default`

```vue
<DssBtnDropdown label="Exportar">
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>PDF</q-item-section>
    </q-item>
    <q-item clickable v-close-popup>
      <q-item-section>Excel</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

### Exemplo — Slot `label`

```vue
<DssBtnDropdown>
  <template #label>
    <div class="row items-center q-gutter-xs">
      <q-icon name="account_circle" />
      <span>Perfil</span>
      <q-badge color="positive" label="3" />
    </div>
  </template>
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>Meu perfil</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

---

## Tokens CSS

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do painel dropdown |
| `--dss-elevation-2` | L2 | Sombra do painel dropdown |
| `--dss-radius-md` | L2 | Border-radius do painel |
| `--dss-border-width-thin` | L2, L3 | Separadores em modo split e colapso de outline |
| `--dss-border-width-thick` | L4 | Acento de brand (inset box-shadow) |
| `--dss-border-width-md` | L4 | High contrast border do painel |
| `--dss-gray-200` | L3 | Separador split unelevated |
| `--dss-gray-300` | L3 | Separador split flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-btn-dropdown` | Sempre (container wrapper) |
| `dss-btn-dropdown--flat` | `variant="flat"` |
| `dss-btn-dropdown--outline` | `variant="outline"` |
| `dss-btn-dropdown--unelevated` | `variant="unelevated"` |
| `dss-btn-dropdown--split` | `split="true"` |
| `dss-btn-dropdown--square` | `square="true"` |
| `dss-btn-dropdown--rounded` | `rounded="true"` |
| `dss-btn-dropdown--dense` | `dense="true"` |
| `dss-btn-dropdown--disabled` | `disable="true"` |
| `dss-btn-dropdown--loading` | `loading="true"` |
| `dss-btn-dropdown--brand-hub` | `brand="hub"` |
| `dss-btn-dropdown--brand-water` | `brand="water"` |
| `dss-btn-dropdown--brand-waste` | `brand="waste"` |
| `dss-btn-dropdown__trigger` | Sempre (no QBtnDropdown) |
| `dss-btn-dropdown__panel` | Sempre (painel teleportado, via popup-content-class) |

---

## Acessibilidade

| Atributo | Valor | Condição |
|----------|-------|----------|
| `role` | `"button"` | Gerenciado pelo QBtnDropdown |
| `aria-haspopup` | `"true"` | Gerenciado pelo QBtnDropdown |
| `aria-expanded` | `"true"` / `"false"` | Gerenciado pelo QBtnDropdown |
| `aria-label` | valor de `ariaLabel` | Quando prop fornecida |
| `aria-disabled` | `"true"` | Quando `disable="true"` |

**Touch target:** Opção B — Delegado ao QBtnDropdown interno. O trigger já implementa touch target adequado.

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Modo split — junção entre botão e seta. Valor semântico. Padrão DssCard EXC-03. |
| EXC-02 | `border-radius: 0` | `2-composition/_base.scss` | Square variant. Valor semântico. Padrão DssBtnGroup EXC-01. |
| EXC-03 | `rgba(255, 255, 255, 0.12)` | `4-output/_states.scss` | Dark mode dividers — sem token DSS para white alpha. Padrão Material Design. |
| EXC-04 | `1px solid ButtonBorder` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. |

---

*DSS v2.2 — DssBtnDropdown API Reference*
