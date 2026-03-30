# DssBtnDropdown

Botão com dropdown integrado — wrapper governado do `QBtnDropdown` do Quasar.

> **DSS Version:** v2.2 — **Fase:** 2 (Componente Composto)
> **Status:** Pré-auditoria
> **Golden Context:** DssCard — **Golden Reference:** DssChip

---

## Quando usar

- Botão de ação primária que expõe múltiplas opções secundárias
- Menus de "exportar para..." com formatos diferentes
- Botões de salvar/enviar com variações de destino
- Menus de usuário com perfil, configurações e logout

## Quando NÃO usar

- Para navegação de páginas → use DssTab
- Para listas de seleção de formulário → use DssSelect
- Para menus de contexto (right-click) → use QMenu diretamente
- Para um único botão de ação simples → use DssButton

---

## Quick Start

```vue
<DssBtnDropdown label="Exportar" icon="download" color="primary">
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

---

## Prop `variant` — API DSS Simplificada

A prop `variant` é a API simplificada do DssBtnDropdown que mapeia internamente para as props booleanas do Quasar. Isso previne combinações inválidas.

| `variant`     | Quasar equiv.     | Descrição |
|---------------|-------------------|-----------|
| `elevated`    | (padrão)          | Botão com sombra (padrão) |
| `flat`        | `flat: true`      | Sem elevação nem borda |
| `outline`     | `outline: true`   | Com borda visível |
| `unelevated`  | `unelevated: true`| Sem sombra, com preenchimento |

```vue
<DssBtnDropdown variant="outline" label="Ações" color="primary">
  <!-- conteúdo -->
</DssBtnDropdown>
```

---

## Modo Split

O modo `split` separa o trigger em dois: botão de ação direta + seta de dropdown.

```vue
<DssBtnDropdown
  label="Salvar"
  :split="true"
  color="primary"
  @click="salvar"
>
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>Salvar como rascunho</q-item-section>
    </q-item>
  </q-list>
</DssBtnDropdown>
```

---

## Brandabilidade

```vue
<DssBtnDropdown label="Relatório" brand="hub" color="primary">
  <!-- conteúdo -->
</DssBtnDropdown>
```

Valores: `'hub'` | `'water'` | `'waste'`

---

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do painel |
| `--dss-elevation-2` | Sombra do painel |
| `--dss-radius-md` | Border-radius do painel |
| `--dss-border-width-thin` | Separadores em split |
| `--dss-border-width-thick` | Acento de brand |
| `--dss-border-width-md` | High contrast |
| `--dss-gray-200` | Separador split unelevated |
| `--dss-gray-300` | Separador split flat |
| `--dss-hub-600` / `--dss-hub-400` | Brand Hub |
| `--dss-water-500` / `--dss-water-400` | Brand Water |
| `--dss-waste-600` / `--dss-waste-500` | Brand Waste |

---

## Acessibilidade

- `aria-haspopup="true"` e `aria-expanded` gerenciados automaticamente pelo Quasar
- `role="button"` no trigger
- Navegação: `Enter`/`Space` abre/fecha, `Escape` fecha, `Arrow keys` navegam no painel
- Prop `ariaLabel` disponível para contextos sem label visual descritivo suficiente

---

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode globalmente |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `no-caps` | Casing gerenciado por tokens de tipografia |

---

## Ver também

- [DssBtnDropdown.md](./DssBtnDropdown.md) — Documentação normativa completa
- [DSSBTNDROPDOWN_API.md](./DSSBTNDROPDOWN_API.md) — API Reference
- [DssBtnGroup](../DssBtnGroup/) — Agrupamento de botões (selado Mar 2026)
