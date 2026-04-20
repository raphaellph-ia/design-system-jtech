# DSSLAYOUT_API — Referência Técnica

> **Versão:** 1.0.0 | **DSS v2.2** | **Quasar base:** QLayout

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `view` | `string` | `'hHh lpR fFf'` | Não | Configuração estrutural do layout. Aceita qualquer string de view QLayout válida. Padrão corporativo DSS: `'hHh lpR fFf'`. |
| `container` | `boolean` | `false` | Não | Quando `true`, o layout renderiza dentro do elemento pai com dimensões fixas em vez de ocupar a janela inteira. |

### Props bloqueadas

| Prop Quasar | Motivo do bloqueio |
|-------------|-------------------|
| `dark` | Dark mode governado por `[data-theme="dark"]` via tokens CSS. Passagem via `$attrs` também bloqueada — a propriedade será ignorada silenciosamente. |

---

## Slots

| Slot | Tipo de conteúdo esperado | Obrigatório |
|------|--------------------------|-------------|
| `default` | `DssHeader`, `DssDrawer`, `DssFooter`, `DssPageContainer` | Não tecnicamente, mas o layout sem filhos é inútil. |

---

## Eventos

Nenhum. DssLayout não emite eventos próprios.

---

## Tokens CSS

| Token | Tipo | Uso |
|-------|------|-----|
| `--dss-surface-muted` | Cor | Background base da aplicação |
| `--dss-text-body` | Cor | Cor de texto padrão |

---

## Classes CSS geradas

| Classe | Quando presente | Descrição |
|--------|-----------------|-----------|
| `.dss-layout` | Sempre | Identificador principal |
| `.dss-layout--container` | `container=true` | Modo container ativo |

---

## Forwarding de atributos

`inheritAttrs: false` — todos os atributos não declarados como props são encaminhados ao `<q-layout>` via `v-bind="$attrs"`.

Atributos úteis a passar via `$attrs`:

| Atributo | Exemplo | Uso |
|----------|---------|-----|
| `aria-label` | `aria-label="Aplicação Sansys Hub"` | Identifica a região de layout em contextos de container mode |
| `data-brand` | Não usar no DssLayout | Deve ser declarado no elemento raiz da aplicação |

---

## Composables

### `useLayoutClasses(props)`

```typescript
import { useLayoutClasses } from '@/components/base/DssLayout/composables'

const { layoutClasses } = useLayoutClasses(props)
// retorna: ComputedRef<string[]>
// ex: ['dss-layout', { 'dss-layout--container': false }]
```

---

## Dependências

| Dependência | Tipo | Status |
|-------------|------|--------|
| `QLayout` (Quasar) | Primitivo base | Externo |
| `DssHeader` | Composição via slot | ✅ Selado v2.2 |
| `DssFooter` | Composição via slot | ✅ Selado v2.2 |
| `DssDrawer` | Composição via slot | ✅ Selado v2.2 |
| `DssPageContainer` | Composição via slot | ⚪ compositionFuture |
| `DssPage` | Composição via slot | ⚪ compositionFuture |
