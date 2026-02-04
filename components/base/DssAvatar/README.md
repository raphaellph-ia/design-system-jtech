# DssAvatar

Status: ✅ Selo DSS v2.2
Auditoria Final: 02/02/2026
Golden Component: DssChip
Classificação: Basico (Visual/Identity)

Componente de avatar do Design System Sansys para representacao visual de usuarios, entidades ou placeholders.

## Quick Start

```vue
<template>
  <!-- Com iniciais -->
  <DssAvatar color="primary">JD</DssAvatar>

  <!-- Com icone -->
  <DssAvatar icon="person" color="secondary" />

  <!-- Com imagem -->
  <DssAvatar>
    <img src="/avatar.jpg" alt="Joao Silva" />
  </DssAvatar>
</template>

<script setup>
import { DssAvatar } from '@/dss/components/base/DssAvatar'
</script>
```

## Documentacao

| Documento | Descricao | Quando Consultar |
|-----------|-----------|------------------|
| [DssAvatar.md](./DssAvatar.md) | **Normativo** - Governanca, anti-patterns, decisoes | Duvidas sobre "como devo usar?", "posso fazer isso?" |
| [DSSAVATAR_API.md](./DSSAVATAR_API.md) | **Referencial** - Props, eventos, tipos | Consulta rapida de API durante desenvolvimento |

## Funcionalidades Principais

- **5 tamanhos predefinidos**: xs, sm, md, lg, xl
- **3 formas**: circular, rounded, square
- **Status indicators**: online, away, busy, offline
- **Brandabilidade**: Hub, Water, Waste
- **Acessibilidade**: WCAG 2.1 AA, ARIA support
- **TypeScript**: Totalmente tipado

## Exemplos

### Tamanhos

```vue
<DssAvatar size="xs" color="primary">XS</DssAvatar>
<DssAvatar size="sm" color="primary">SM</DssAvatar>
<DssAvatar size="md" color="primary">MD</DssAvatar>
<DssAvatar size="lg" color="primary">LG</DssAvatar>
<DssAvatar size="xl" color="primary">XL</DssAvatar>
```

### Formas

```vue
<DssAvatar color="primary">JD</DssAvatar>           <!-- Circular -->
<DssAvatar rounded color="secondary">AB</DssAvatar> <!-- Rounded -->
<DssAvatar square color="accent">XY</DssAvatar>     <!-- Square -->
```

### Status

```vue
<DssAvatar status="online" color="primary">JD</DssAvatar>
<DssAvatar status="away" color="secondary">AB</DssAvatar>
<DssAvatar status="busy" color="accent">XY</DssAvatar>
<DssAvatar status="offline" color="info">ZZ</DssAvatar>
```

### Brandabilidade

```vue
<DssAvatar brand="hub" icon="person" />
<DssAvatar brand="water" icon="person" />
<DssAvatar brand="waste" icon="person" />
```

### Grupo de Avatares

```vue
<div class="dss-avatar-group">
  <DssAvatar color="primary">JD</DssAvatar>
  <DssAvatar color="secondary">AB</DssAvatar>
  <DssAvatar color="accent">XY</DssAvatar>
  <DssAvatar color="info">+5</DssAvatar>
</div>
```

## Estrutura de Arquivos

```
DssAvatar/
├── 1-structure/
│   └── DssAvatar.ts.vue      # Componente Vue
├── 2-composition/
│   └── _base.scss            # Estilos base
├── 3-variants/
│   ├── _brands.scss          # Variantes de marca
│   ├── _status.scss          # Estilos de status
│   └── index.scss            # Orquestrador
├── 4-output/
│   └── DssAvatar.scss        # Compilacao final
├── composables/
│   ├── useAvatarClasses.ts   # Classes CSS
│   └── useAvatarStyles.ts    # Estilos inline
├── types/
│   └── avatar.types.ts       # Tipos TypeScript
├── DssAvatar.module.scss     # Module orchestrator
├── DssAvatar.md              # Documentacao normativa
├── DSSAVATAR_API.md          # API reference
├── README.md                 # Este arquivo
└── DOCUMENTATION_CHANGELOG.md # Changelog
```

## Licenca

Propriedade da Jtech
