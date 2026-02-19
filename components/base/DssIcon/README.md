# DssIcon

Componente base estrutural do Design System Sansys para exibicao de icones.

## Quick Start

```vue
<template>
  <!-- Icone standalone com significado -->
  <DssIcon name="home" aria-label="Pagina inicial" />

  <!-- Icone decorativo -->
  <DssIcon name="star" :decorative="true" />

  <!-- Icone com cor semantica -->
  <DssIcon name="check_circle" color="positive" aria-label="Sucesso" />

  <!-- Icone com brand -->
  <DssIcon name="business" brand="hub" aria-label="Hub" />

  <!-- Icone com animacao (carregamento) -->
  <DssIcon name="sync" :spin="true" aria-label="Carregando" />
</template>

<script setup>
import { DssIcon } from '@dss/components/base/DssIcon'
</script>
```

## Tamanhos

```vue
<DssIcon name="home" size="xs" />  <!-- 16px -->
<DssIcon name="home" size="sm" />  <!-- 20px -->
<DssIcon name="home" size="md" />  <!-- 24px (default) -->
<DssIcon name="home" size="lg" />  <!-- 32px -->
<DssIcon name="home" size="xl" />  <!-- 48px -->
```

## Modo Embedded

Quando usado dentro de outro componente DSS, o DssIcon herda a cor do contexto via `currentColor`:

```vue
<!-- Dentro de DssButton, herda cor do botao -->
<DssButton color="primary">
  <DssIcon name="send" :decorative="true" />
  Enviar
</DssButton>
```

## Dependencias

- **QIcon** (Quasar Framework) - renderizacao do icone
- **Material Icons** - font family padrao
