# DssItem - API Reference

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | `''` | No | Main text content |
| `caption` | `string` | `''` | No | Secondary text below label |
| `clickable` | `boolean` | `false` | No | Makes item interactive (hover, active, focus, touch target) |
| `disabled` | `boolean` | `false` | No | Disables item (requires clickable) |
| `active` | `boolean` | `false` | No | Permanent visual highlight |
| `density` | `'default' \| 'compact'` | `'default'` | No | Item density |
| `color` | `ItemColor \| null` | `null` | No | Semantic text color |
| `inset` | `boolean` | `false` | No | Adds left padding to align with leading-enabled items |
| `divider` | `boolean` | `false` | No | Shows bottom border separator |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | No | Brand override |
| `ariaLabel` | `string` | `undefined` | No | Custom accessibility label |
| `tabindex` | `number \| string \| null` | `null` | No | Custom tabindex |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content (replaces label + caption) |
| `leading` | Left area (DssIcon, DssAvatar, DssCheckbox) |
| `trailing` | Right area (DssIcon, DssBadge, DssToggle) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent \| KeyboardEvent` | Emitted on click or Enter/Space (requires clickable) |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-item` | Base class |
| `.dss-item--default` | Default density |
| `.dss-item--compact` | Compact density |
| `.dss-item--clickable` | Interactive mode |
| `.dss-item--disabled` | Disabled state |
| `.dss-item--active` | Active highlight |
| `.dss-item--inset` | Left padding inset |
| `.dss-item--divider` | Bottom border |
| `.dss-item--multiline` | Has caption (aligns leading/trailing to top) |
| `.dss-item--brand-hub` | Hub brand via prop |
| `.dss-item--brand-water` | Water brand via prop |
| `.dss-item--brand-waste` | Waste brand via prop |
| `.dss-item__leading` | Left area container |
| `.dss-item__content` | Central content area |
| `.dss-item__label` | Main text |
| `.dss-item__caption` | Secondary text |
| `.dss-item__trailing` | Right area container |

## Tokens Referenced

### Spacing
`--dss-spacing-0_5`, `--dss-spacing-1`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-5`, `--dss-spacing-6`, `--dss-spacing-8`, `--dss-spacing-12`

### Typography
`--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-weight-normal`, `--dss-font-weight-medium`, `--dss-line-height-normal`, `--dss-line-height-tight`

### Colors
`--dss-text-body`, `--dss-text-subtle`, `--dss-action-primary`, `--dss-surface-active`, `--dss-border-default`

### Interaction
`--dss-touch-target-min`, `--dss-opacity-hover`, `--dss-opacity-active`, `--dss-opacity-disabled`, `--dss-opacity-50`, `--dss-focus-ring`

### Motion
`--dss-duration-150`, `--dss-easing-standard`

### Border
`--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`

### Brand
`--dss-hub-600`, `--dss-hub-500`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500`
