# DssTooltip

**Design System Sansys - Tooltip Component**

Componente de tooltip para informacao contextual. Elemento informativo NAO interativo com visibilidade controlada externamente.

## Golden Context

**DssBadge** — Baseline de auditoria (Compact Control nao interativo).
**Golden Reference:** DssBadge.

## Quando Usar

- Descricoes de icones sem label visivel
- Informacao adicional de campo de formulario
- Abreviacoes e siglas
- Help text vinculado a controles
- Feedback contextual breve

## Quando NAO Usar

- Informacao critica (use mensagens inline ou DssBanner)
- Contadores/status (use DssBadge)
- Tags removiveis (use DssChip)
- Conteudo interativo (use popover/dialog)
- Texto > 2 linhas (use help page)

## API

### Props

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `label` | String | `''` | Texto do tooltip |
| `color` | String | `'dark'` | Cor de fundo (dark, primary, secondary, accent, positive, negative, warning, info) |
| `textColor` | String | `null` | Override de cor do texto |
| `multiLine` | Boolean | `false` | Permite multiplas linhas |
| `visible` | Boolean | `false` | Visibilidade (controlada externamente) |
| `brand` | String | `null` | Brand Sansys (hub, water, waste) |
| `ariaLabel` | String | `undefined` | Label ARIA |

### Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo principal |

### Events

Nenhum. DssTooltip e um componente passivo.

## Estados

### Aplicaveis
- **visible** — Tooltip exibido
- **hidden** — Tooltip oculto (display: none)

### Explicitamente NAO aplicaveis
hover, active, disabled, loading, focus, checked.

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Familia de fonte |
| `--dss-font-size-sm` | Tamanho (14px) |
| `--dss-font-weight-normal` | Peso (400) |
| `--dss-line-height-tight` | Altura de linha |
| `--dss-spacing-1_5` | Padding vertical |
| `--dss-spacing-2` | Padding horizontal |
| `--dss-spacing-2_5` | Padding multi-line |
| `--dss-radius-md` | Border radius |
| `--dss-duration-tooltip` | Transicao |
| `--dss-easing-standard` | Easing |
| `--dss-z-index-tooltip` | Stacking context |
| `--dss-border-width-md` | Borda high contrast |
| `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600` | Brands |
| `--dss-hub-500`, `--dss-water-400`, `--dss-waste-500` | Brands (dark mode) |
| `--dss-gray-50` | Texto sobre brand |

## Excecoes

| Propriedade | Valor | Justificativa |
|-------------|-------|---------------|
| `max-width` | 300px | Nao existe token para largura de conteudo |
| `font-weight` | 700 | High contrast (sem token a11y) |
| `border` | 2px absolute | Forced colors (tokens ignorados) |

## Exemplos

### Basico

```vue
<button aria-describedby="tip-1" @mouseenter="show = true" @mouseleave="show = false">
  Ajuda
</button>
<DssTooltip id="tip-1" :visible="show" label="Texto de ajuda" />
```

### Multi-line

```vue
<DssTooltip :visible="show" multi-line label="Texto longo que quebra em varias linhas" />
```

### Com Brand

```vue
<DssTooltip brand="hub" :visible="show" label="Info Hub" />
```

### Acessibilidade Completa

```vue
<button aria-describedby="tip-a11y" @focus="show = true" @blur="show = false">?</button>
<DssTooltip
  id="tip-a11y"
  :visible="show"
  label="Use e-mail corporativo"
  aria-label="Dica: use e-mail corporativo @empresa.com.br"
/>
```

### Cores Semanticas

```vue
<DssTooltip color="negative" :visible="show" label="Acao irreversivel" />
<DssTooltip color="warning" :visible="show" label="Verificar dados" />
<DssTooltip color="positive" :visible="show" label="Operacao segura" />
```

## Documentacao Completa

Consulte [`DssTooltip.md`](./DssTooltip.md) para documentacao Template 13.1 completa.
