# DssBadge

Componente de badge do Design System Sansys para exibir informacoes contextuais que precisam de destaque, como contadores de notificacoes, status ou labels.

## Quick Start

```vue
<template>
  <!-- Com label prop -->
  <DssBadge color="primary" label="5" />

  <!-- Com slot -->
  <DssBadge color="positive">Novo</DssBadge>

  <!-- Dot indicator (vazio) -->
  <DssBadge color="negative" />
</template>

<script setup>
import { DssBadge } from '@/dss/components/base/DssBadge'
</script>
```

## Documentacao

| Documento | Descricao | Quando Consultar |
|-----------|-----------|------------------|
| [DssBadge.md](./DssBadge.md) | **Normativo** - Governanca, anti-patterns, decisoes | Duvidas sobre "como devo usar?", "posso fazer isso?" |
| [DSSBADGE_API.md](./DSSBADGE_API.md) | **Referencial** - Props, eventos, tipos | Consulta rapida de API durante desenvolvimento |

## Funcionalidades Principais

- **5 variantes visuais**: solid (default), outline, transparent, floating, rounded
- **8 cores semanticas**: primary, secondary, tertiary, accent, positive, negative, warning, info
- **Brandabilidade**: Hub, Water, Waste
- **Acessibilidade**: WCAG 2.1 AA, ARIA support (role="status", aria-live)
- **TypeScript**: Totalmente tipado

## Exemplos

### Variantes

```vue
<DssBadge color="primary" label="5" />              <!-- Solid (default) -->
<DssBadge outline color="primary" label="Tag" />    <!-- Outline -->
<DssBadge transparent color="secondary" label="Info" />  <!-- Transparent -->
<DssBadge rounded color="accent" label="Label" />   <!-- Rounded -->
```

### Floating (sobrepondo elementos)

```vue
<div style="position: relative;">
  <DssAvatar icon="person" color="primary" />
  <DssBadge floating color="negative" label="3" />
</div>
```

### Cores

```vue
<DssBadge color="primary" label="Primary" />
<DssBadge color="secondary" label="Secondary" />
<DssBadge color="positive" label="Positive" />
<DssBadge color="negative" label="Negative" />
<DssBadge color="warning" label="Warning" />
<DssBadge color="info" label="Info" />
```

### Brandabilidade

```vue
<DssBadge brand="hub" label="Hub" />
<DssBadge brand="water" label="Water" />
<DssBadge brand="waste" label="Waste" />
```

### Dot Indicator (badge vazio)

```vue
<DssBadge color="positive" />  <!-- Circulo verde (online) -->
<DssBadge color="negative" />  <!-- Circulo vermelho (notificacao) -->
```

## Estrutura de Arquivos

```
DssBadge/
├── 1-structure/
│   └── DssBadge.ts.vue       # Componente Vue
├── 2-composition/
│   └── _base.scss            # Estilos base
├── 3-variants/
│   ├── _outline.scss         # Variante outline
│   ├── _floating.scss        # Variante floating
│   ├── _rounded.scss         # Variante rounded
│   ├── _transparent.scss     # Variante transparent
│   ├── _multi-line.scss      # Variante multi-line
│   └── index.scss            # Orquestrador
├── 4-output/
│   ├── _brands.scss          # Hub, Water, Waste
│   ├── _states.scss          # Dark mode, high contrast
│   └── index.scss            # Orquestrador
├── composables/
│   ├── useBadgeClasses.ts    # Classes CSS
│   └── index.ts              # Barrel export
├── types/
│   └── badge.types.ts        # Tipos TypeScript
├── DssBadge.module.scss      # Module orchestrator
├── DssBadge.md               # Documentacao normativa
├── DSSBADGE_API.md           # API reference
├── README.md                 # Este arquivo
└── index.js                  # Export barrel
```

## Licenca

Propriedade da Jtech
