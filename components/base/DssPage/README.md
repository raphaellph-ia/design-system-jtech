# DssPage

Wrapper DSS governado sobre `QPage`. Define a área de conteúdo principal da aplicação — responsável pelo cálculo dinâmico de `min-height` (sticky footer), pelo landmark `role="main"` e pelo padding interno opcional governado por token.

## Quando usar

- Como filho direto e único de `DssPageContainer` na hierarquia de layout da aplicação
- Sempre que for necessário garantir que o footer permaneça colado ao final da tela (sticky footer), mesmo com pouco conteúdo
- Quando o conteúdo da página precisar de padding interno governado por tokens DSS

## Quando NÃO usar

- Fora de `DssPageContainer` — depende do contexto de `provide/inject` do `QLayout`
- Como container de seção, card ou região genérica dentro da página (use `DssCard`, `<section>`, `<article>`)
- Mais de um `DssPage` por `DssPageContainer`

## Hierarquia obrigatória

```
DssLayout
  ├── DssHeader
  ├── DssDrawer (opcional)
  ├── DssPageContainer
  │     └── DssPage      ← este componente
  │           └── [conteúdo da aplicação]
  └── DssFooter
```

## Instalação

```js
import { DssPage } from '@dss/components/DssPage'
```

## Uso básico

```vue
<dss-layout view="hHh LpR fFf">
  <dss-header elevated>
    <dss-toolbar>
      <dss-toolbar-title>Minha Aplicação</dss-toolbar-title>
    </dss-toolbar>
  </dss-header>

  <dss-page-container>
    <dss-page :padding="true">
      <!-- conteúdo da página -->
    </dss-page>
  </dss-page-container>

  <dss-footer>
    <dss-toolbar>
      <dss-toolbar-title>Rodapé</dss-toolbar-title>
    </dss-toolbar>
  </dss-footer>
</dss-layout>
```

## Props

| Prop       | Tipo     | Padrão    | Descrição                                                        |
|------------|----------|-----------|------------------------------------------------------------------|
| `padding`  | Boolean  | `false`   | Aplica `--dss-container-padding` (16px) em todos os lados        |
| `style-fn` | Function | undefined | Sobrescreve o cálculo de min-height do Quasar (uso avançado)     |

## Slots

| Slot      | Descrição                                             |
|-----------|-------------------------------------------------------|
| `default` | Conteúdo principal — sem restrições estruturais        |

## Eventos

Nenhum. Componente estritamente não-interativo.

## Forwarding de Atributos

`DssPage` implementa `inheritAttrs: false` com `v-bind="$attrs"` explícito. O `role="main"` padrão é sobrescritível:

```vue
<!-- role padrão -->
<dss-page>...</dss-page>
<!-- → role="main" aplicado -->

<!-- role sobrescrito -->
<dss-page role="region" aria-label="Área de relatórios">...</dss-page>
```

## Tokens utilizados

| Token                     | Condição       |
|---------------------------|----------------|
| `--dss-container-padding` | `padding=true` |

**Tokens herdados do `DssLayout` pai:**

| Token                 | Contexto         |
|-----------------------|------------------|
| `--dss-surface-muted` | Cor de fundo     |
| `--dss-text-body`     | Cor de texto     |

## Como funciona o Sticky Footer

O `QPage` calcula `min-height` via JavaScript:

```
min-height = altura da janela − offset do header − offset do footer
```

Mesmo com pouco conteúdo, o `DssPage` ocupa toda a área disponível — o `DssFooter` fica colado no final. Com muito conteúdo, a página rola normalmente.

## Acessibilidade

- `role="main"` aplicado por padrão — landmark de navegação para tecnologias assistivas
- Componente não-interativo (Option B — sem touch target)
- Contraste WCAG 2.1 AA via herança do `DssLayout` pai

## Golden Reference

**DssBadge** — Golden Reference oficial para componentes não-interativos.

## Golden Context

**DssLayout** — mesmo padrão de wrapper direto sobre primitivo Quasar de layout (EXC-01). Container ancestral obrigatório.
