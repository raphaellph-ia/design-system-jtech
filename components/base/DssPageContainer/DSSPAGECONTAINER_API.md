# DssPageContainer — API Reference

> Wrapper DSS governado sobre `QPageContainer`.
> Componente pass-through estrutural — sem props próprias, sem estados interativos.

---

## Props

**Nenhuma prop exposta.**

`DssPageContainer` não adiciona props próprias. `QPageContainer` não possui props documentadas na API pública do Quasar — ele reage ao contexto do `QLayout` pai via variáveis CSS (`--q-header-offset`, `--q-footer-offset`, `--q-left-offset`, `--q-right-offset`).

---

## Slots

### `default`

Conteúdo da página. Deve receber `DssPage` exclusivamente.

```vue
<dss-page-container>
  <dss-page>
    <!-- conteúdo da página aqui -->
  </dss-page>
</dss-page-container>
```

> **EXC-02:** Até que `DssPage` seja implementado, pode-se usar `<q-page>` nativo em contextos de desenvolvimento/exemplo. O uso de HTML nativo sem wrapper DSS viola a governança em produção.

---

## Eventos

**Nenhum evento emitido.** `DssPageContainer` é estritamente não-interativo.

---

## Forwarding de Atributos

`DssPageContainer` usa `inheritAttrs: false` com `v-bind="$attrs"` explícito no `<q-page-container>`. Atributos HTML não declarados como props são repassados ao elemento raiz:

```vue
<dss-page-container
  data-testid="main-container"
  aria-label="Conteúdo principal"
>
  <dss-page>...</dss-page>
</dss-page-container>
```

---

## Modificadores de Classe

| Classe                   | Condição      | Efeito                                    |
|--------------------------|---------------|-------------------------------------------|
| `dss-page-container`     | Sempre presente | Identificador de escopo CSS do componente |

---

## Tokens CSS

### Aplicados diretamente

**Nenhum.** `DssPageContainer` é um componente estrutural transparente. Não aplica tokens de cor, tipografia ou espaçamento próprios.

### Herdados (via DssLayout pai)

| Token                  | Uso                                                         |
|------------------------|-------------------------------------------------------------|
| `--dss-surface-muted`  | Cor de fundo herdada via cascata CSS do `DssLayout` pai    |

---

## Variáveis CSS do Quasar (gerenciadas internamente)

O `QPageContainer` aplica automaticamente o padding via variáveis CSS injetadas pelo `QLayout`:

| Variável               | Descrição                                      |
|------------------------|------------------------------------------------|
| `--q-header-offset`    | Padding-top = altura do QHeader fixo           |
| `--q-footer-offset`    | Padding-bottom = altura do QFooter fixo        |
| `--q-left-offset`      | Padding-left = largura do QDrawer esquerdo     |
| `--q-right-offset`     | Padding-right = largura do QDrawer direito     |

> ⚠️ **Nunca sobrescrever essas variáveis.** São gerenciadas exclusivamente pelo motor de layout do Quasar.

---

## Estados

| Estado        | Aplicável | Razão                                                 |
|---------------|-----------|-------------------------------------------------------|
| Padrão        | ✅        | —                                                     |
| Hover         | ❌        | Componente não-interativo                             |
| Focus         | ❌        | Componente não-interativo                             |
| Active        | ❌        | Sem estado ativo                                      |
| Disabled      | ❌        | Sem comportamento de desabilitação                    |
| Loading       | ❌        | Sem estado assíncrono                                 |
| Error         | ❌        | Container estrutural — sem validação                  |
| Indeterminate | ❌        | Não aplicável para container linear                   |

---

## Exceções Documentadas

### EXC-01 — QPageContainer como elemento raiz

| Atributo      | Valor                                                               |
|---------------|---------------------------------------------------------------------|
| ID            | EXC-01                                                              |
| Gate violado  | Gate de Composição v2.4 — Regra 1                                   |
| Localização   | `1-structure/DssPageContainer.ts.vue`                               |
| Justificativa | `QPageContainer` depende de `provide/inject` interno do `QLayout` para receber offsets via variáveis CSS. Envolver em `<div>` quebraria essa comunicação. |
| Precedente    | DssLayout, DssHeader, DssDrawer (EXC-01 em todos)                  |

### EXC-02 — Uso de `<q-page>` nativo no arquivo de exemplo

| Atributo      | Valor                                                               |
|---------------|---------------------------------------------------------------------|
| ID            | EXC-02                                                              |
| Gate violado  | Gate de Composição v2.4 — Regra 1 (somente em `.example.vue`)      |
| Localização   | `DssPageContainer.example.vue`                                      |
| Justificativa | `DssPage` é `compositionFuture`. Isenção formal de `.example.vue` conforme DSS_IMPLEMENTATION_GUIDE.md. |
| Precedente    | DssLayout EXC-05                                                    |

### EXC-03 — Hardcoded `#fff` e `#000` em `@media print`

| Atributo      | Valor                                                               |
|---------------|---------------------------------------------------------------------|
| ID            | EXC-03                                                              |
| Localização   | `4-output/_states.scss`                                             |
| Justificativa | Tokens de marca não são adequados em impressão. `#fff`/`#000` garantem legibilidade monocromática universal. Padrão canônico DSS. |

---

## Acessibilidade

- Touch target: Não aplicável (Option B — não-interativo)
- `role`: Não aplicado — semântica de região pertence ao `DssPage` filho (`role="main"`)
- `aria-label` pode ser repassado via `$attrs`
- Cor de fundo em `forced-colors`: `Canvas` (EXC automático via sistema operacional)

---

## Paridade com Golden Context (DssLayout)

| Aspecto                            | DssLayout   | DssPageContainer | Divergência / Justificativa                           |
|------------------------------------|:-----------:|:----------------:|-------------------------------------------------------|
| `defineOptions` com `name`         | ✅          | ✅               | —                                                     |
| `inheritAttrs: false`              | ✅          | ✅               | —                                                     |
| `v-bind="$attrs"` explícito        | ✅          | ✅               | —                                                     |
| Wrapper direto de Quasar (EXC-01)  | ✅          | ✅               | Mesmo padrão                                          |
| Sem touch target (Option B)        | ✅          | ✅               | Ambos não-interativos                                 |
| Composable para classes            | ✅          | ✅               | —                                                     |
| Sem tokens próprios                | ❌          | ✅               | DssLayout aplica `--dss-surface-muted`; DssPageContainer é transparente |
| Props próprias                     | ✅ (`view`) | ❌               | QPageContainer não possui props — pass-through puro   |
| Brands `_brands.scss`              | ✅          | ❌ (vazio)       | DssPageContainer não gerencia brand — delegado ao DssLayout |
