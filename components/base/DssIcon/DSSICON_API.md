# DssIcon - API Reference

## Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `name` | `string` | **(obrigatorio)** | Nome do icone Material Icons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho via tokens `--dss-icon-size-*` |
| `color` | `IconColor \| null` | `null` | Cor semantica (herda do contexto se null) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override |
| `spin` | `boolean` | `false` | Animacao de rotacao continua |
| `pulse` | `boolean` | `false` | Animacao de pulso |
| `decorative` | `boolean` | `false` | Marca como decorativo (aria-hidden) |
| `ariaLabel` | `string \| undefined` | `undefined` | Label para screen readers |

## Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo customizado (uso avancado: SVG inline, imagens) |

## Events

Nenhum evento emitido. DssIcon e um componente de exibicao puro.

## CSS Classes

| Classe | Descricao |
|--------|-----------|
| `.dss-icon` | Classe base |
| `.dss-icon--xs` | Tamanho 16px |
| `.dss-icon--sm` | Tamanho 20px |
| `.dss-icon--md` | Tamanho 24px (default) |
| `.dss-icon--lg` | Tamanho 32px |
| `.dss-icon--xl` | Tamanho 48px |
| `.dss-icon--spin` | Animacao de rotacao |
| `.dss-icon--pulse` | Animacao de pulso |
| `.dss-icon--decorative` | Icone decorativo (opacidade reduzida) |
| `.dss-icon--brand-hub` | Brand Hub |
| `.dss-icon--brand-water` | Brand Water |
| `.dss-icon--brand-waste` | Brand Waste |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-xs` | 16px | Tamanho xs |
| `--dss-icon-size-sm` | 20px | Tamanho sm |
| `--dss-icon-size-md` | 24px | Tamanho md (default) |
| `--dss-icon-size-lg` | 32px | Tamanho lg |
| `--dss-icon-size-xl` | 48px | Tamanho xl |
| `--dss-duration-150` | 150ms | Transicao de cor |
| `--dss-duration-200` | 200ms | Transicao de transform |
| `--dss-duration-1000` | 1000ms | Animacao spin |
| `--dss-easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Easing padrao |
| `--dss-opacity-60` | 0.6 | Icone decorativo |
| `--dss-opacity-75` | 0.75 | Decorativo em high contrast |
| `--dss-hub-600` | Brand Hub cor principal | Brand Hub |
| `--dss-hub-500` | Brand Hub dark mode | Brand Hub dark |
| `--dss-water-500` | Brand Water cor principal | Brand Water |
| `--dss-water-400` | Brand Water dark mode | Brand Water dark |
| `--dss-waste-600` | Brand Waste cor principal | Brand Waste |
| `--dss-waste-500` | Brand Waste dark mode | Brand Waste dark |
