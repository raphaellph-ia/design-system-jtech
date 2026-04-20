# DssDrawer

Wrapper DSS governado sobre QDrawer. Container lateral de navegação de página.

## Quando usar

- Painel de navegação lateral primário da aplicação (sidebar)
- Menu de navegação secundário em fluxos complexos
- Painel de filtros ou detalhes contextualmente âncora à borda da página

## Quando NÃO usar

- Para exibir conteúdo genérico não relacionado a navegação → use DssCard
- Para menus contextuais flutuantes → use DssMenu
- Para modais ou diálogos de confirmação → use DssDialog (futuro)

## Instalação

```javascript
import DssDrawer from '@sansys/dss/components/DssDrawer'
```

## Uso básico

```vue
<q-layout view="hHh lpR fFf">
  <DssDrawer v-model="isOpen" aria-label="Menu principal">
    <DssList>
      <DssItem clickable active>
        <template #leading><DssIcon name="home" /></template>
        Dashboard
      </DssItem>
      <DssItem clickable>
        <template #leading><DssIcon name="bar_chart" /></template>
        Relatórios
      </DssItem>
    </DssList>
  </DssDrawer>
  <q-page-container>
    <!-- conteúdo da página -->
  </q-page-container>
</q-layout>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `Boolean` | `true` | Controla visibilidade (v-model) |
| `side` | `'left' \| 'right'` | `'left'` | Lado de ancoramento |
| `overlay` | `Boolean` | `false` | Força sobreposição em todos os breakpoints |
| `elevated` | `Boolean` | `false` | Aplica sombra (--dss-elevation-2) |
| `bordered` | `Boolean` | `false` | Aplica borda lateral sutil |
| `mini` | `Boolean` | `false` | Modo minimizado (apenas ícones) |
| `width` | `Number` | `256` | Largura em pixels |

## Props bloqueadas

| Prop QDrawer | Motivo |
|---|---|
| `dark` | DSS gerencia dark mode via CSS global ([data-theme="dark"]) |
| `behavior` | Padronizado como "default" (desktop=push, mobile=overlay) |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do drawer. Use DssList, DssMenu ou cabeçalhos de seção DSS. |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean` | Disparado quando visibilidade muda (v-model) |

## Comportamento responsivo

O DssDrawer usa `behavior="default"` (hardcoded, não configurável):
- **Desktop**: drawer empurra o conteúdo da página para o lado
- **Mobile**: drawer sobrepõe o conteúdo com backdrop semi-transparente

## Variantes

```vue
<!-- Elevado -->
<DssDrawer elevated>...</DssDrawer>

<!-- Bordeado -->
<DssDrawer bordered>...</DssDrawer>

<!-- Mini (apenas ícones) -->
<DssDrawer :mini="isMini">...</DssDrawer>

<!-- Direita -->
<DssDrawer side="right" role="complementary">...</DssDrawer>
```

## Acessibilidade

- `role="navigation"` aplicado por padrão
- Sobrescreva com `role="complementary"` para painéis informativos
- Use `aria-label` para descrever o propósito: `<DssDrawer aria-label="Menu principal">`
- Múltiplos drawers na mesma página devem ter aria-label distintos

## Anti-patterns

```vue
<!-- ❌ HTML nativo sem DssList -->
<DssDrawer>
  <nav><ul><li>Item</li></ul></nav>
</DssDrawer>

<!-- ❌ Texto solto sem componente DSS -->
<DssDrawer>
  Navegação aqui
</DssDrawer>

<!-- ❌ Sobrescrever z-index -->
<DssDrawer style="z-index: 9999">...</DssDrawer>

<!-- ✅ Correto -->
<DssDrawer v-model="open" aria-label="Menu">
  <DssList>
    <DssItem clickable>...</DssItem>
  </DssList>
</DssDrawer>
```

## Tokens utilizados

- `--dss-surface-default` — cor de fundo
- `--dss-text-body` — cor de texto padrão
- `--dss-elevation-2` — sombra (prop elevated)
- `--dss-border-width-thin` — borda (prop bordered)
- `--dss-gray-200` — cor da borda
- `--dss-border-width-md` — borda em high contrast
- `--dss-opacity-backdrop` — opacidade do backdrop em overlay/mobile
