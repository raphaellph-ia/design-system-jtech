# DssPageContainer

Wrapper DSS governado sobre `QPageContainer`. Container estrutural que recebe os offsets calculados pelo `DssLayout` e os aplica como padding dinâmico, garantindo que o conteúdo da página não fique oculto sob `DssHeader`, `DssFooter` ou `DssDrawer` fixos.

## Quando usar

- Como camada intermediária obrigatória entre `DssLayout` e `DssPage` na hierarquia de layout da aplicação
- Sempre que a aplicação utilizar `DssHeader` e/ou `DssFooter` fixos e precisar que o conteúdo seja corretamente posicionado abaixo/acima deles

## Quando NÃO usar

- Fora de um `DssLayout` pai — o componente depende do contexto de `provide/inject` do Quasar
- Como container de seção, card ou região de conteúdo genérica
- Como substituto de `DssPage` para envolver conteúdo

## Hierarquia obrigatória

```
DssLayout
  ├── DssHeader
  ├── DssDrawer (opcional)
  ├── DssPageContainer      ← este componente
  │     └── DssPage         ← filho direto esperado
  └── DssFooter
```

## Instalação

```js
import { DssPageContainer } from '@dss/components/DssPageContainer'
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
    <dss-page>
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

`DssPageContainer` não expõe props próprias. É um componente pass-through estrutural puro.

`QPageContainer` não possui props documentadas na API do Quasar — ele reage ao contexto do `QLayout` pai via variáveis CSS injetadas (`--q-header-offset`, `--q-footer-offset`, `--q-left-offset`, `--q-right-offset`).

## Slots

| Slot      | Descrição                                                        |
|-----------|------------------------------------------------------------------|
| `default` | Destinado exclusivamente a `DssPage`. Não usar HTML nativo diretamente. |

## Eventos

Nenhum. Componente estritamente não-interativo.

## Forwarding de Atributos

`DssPageContainer` implementa `inheritAttrs: false` com `v-bind="$attrs"` explícito. Atributos HTML extras são repassados ao `<q-page-container>` raiz:

```vue
<dss-page-container aria-label="Conteúdo principal da aplicação">
  <dss-page>...</dss-page>
</dss-page-container>
```

## Tokens utilizados

`DssPageContainer` não aplica tokens próprios. É um componente estrutural transparente.

**Tokens herdados do `DssLayout` pai:**

| Token                  | Contexto                                              |
|------------------------|-------------------------------------------------------|
| `--dss-surface-muted`  | Cor de fundo herdada via cascata CSS do DssLayout    |

## Como funciona o padding dinâmico

O `QPageContainer` (Quasar) monitora os tamanhos de `QHeader`, `QFooter` e `QDrawer` via `provide/inject` e injeta as variáveis CSS:

- `--q-header-offset`: altura do header fixo
- `--q-footer-offset`: altura do footer fixo
- `--q-left-offset`: largura do drawer esquerdo
- `--q-right-offset`: largura do drawer direito

Essas variáveis são aplicadas como `padding` no `QPageContainer`. **O DSS não interfere neste mecanismo** (EXC-01).

## Acessibilidade

- Componente não-interativo (Option B — sem touch target)
- Sem `role` adicional — semântica da região é definida pelo `DssPage` filho (`role="main"`)
- `aria-label` pode ser repassado via `$attrs` se necessário

## Golden Reference

**DssBadge** — Golden Reference oficial para componentes não-interativos.

## Golden Context

**DssLayout** — mesmo padrão de wrapper direto sobre primitivo Quasar de layout (EXC-01). Container pai obrigatório.
