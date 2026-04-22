# DssPage — API Reference

> Wrapper DSS governado sobre `QPage`.
> Define a área de conteúdo principal da aplicação com `role="main"` e min-height dinâmica.

---

## Props

### `padding`

| Campo    | Valor                           |
|----------|---------------------------------|
| Tipo     | `Boolean`                       |
| Padrão   | `false`                         |
| Classe   | `.dss-page--padding`            |
| Token    | `--dss-container-padding`       |

Aplica `var(--dss-container-padding)` (= `var(--dss-spacing-4)` = 16px) como padding interno em todos os lados. Substitui a classe `.q-layout-padding` nativa do Quasar, que usa valores hardcoded.

```vue
<dss-page :padding="true">
  <p>Conteúdo com 16px de espaço em todos os lados.</p>
</dss-page>
```

---

### `style-fn`

| Campo  | Valor                                                    |
|--------|----------------------------------------------------------|
| Tipo   | `(offset: number) => Record<string, string>`             |
| Padrão | `undefined` (usa o cálculo padrão do Quasar)             |

Sobrescreve a função de cálculo de `min-height` do Quasar. O `offset` recebido é a soma em pixels das alturas de header e footer.

```vue
<dss-page :style-fn="(offset) => ({ minHeight: `calc(100vh - ${offset}px)` })">
  <!-- conteúdo com min-height customizado -->
</dss-page>
```

**Uso raramente necessário.** O cálculo padrão do Quasar é suficiente na maioria dos casos.

---

## Slots

### `default`

Conteúdo principal da página. Livre para qualquer conteúdo de aplicação — sem restrições estruturais.

```vue
<dss-page :padding="true">
  <h1>Bem-vindo</h1>
  <p>Qualquer conteúdo de aplicação pode ser inserido aqui.</p>
</dss-page>
```

---

## Eventos

**Nenhum evento emitido.** `DssPage` é estritamente não-interativo.

---

## Forwarding de Atributos

`DssPage` usa `inheritAttrs: false` com `v-bind="$attrs"` explícito no `<q-page>`.

A ordem no template (`role="main"` antes de `v-bind="$attrs"`) garante que atributos passados pelo consumidor **sobrescrevam** os padrões do componente:

```vue
<!-- role="main" padrão sobrescrito pelo consumidor -->
<dss-page role="region" aria-label="Área de relatórios">
  ...
</dss-page>

<!-- data-testid repassado ao q-page raiz -->
<dss-page data-testid="main-content">
  ...
</dss-page>
```

---

## Modificadores de Classe

| Classe                  | Condição            | Efeito                                    |
|-------------------------|---------------------|-------------------------------------------|
| `dss-page`              | Sempre presente     | Identificador de escopo CSS do componente |
| `dss-page--padding`     | `padding=true`      | Aplica `--dss-container-padding` em todos os lados |

---

## Tokens CSS

### Aplicados Diretamente

| Token                     | Propriedade | Condição           |
|---------------------------|-------------|---------------------|
| `--dss-container-padding` | `padding`   | `padding=true`      |

### Herdados (via cascata do DssLayout)

| Token                 | Propriedade      |
|-----------------------|------------------|
| `--dss-surface-muted` | background-color |
| `--dss-text-body`     | color            |

---

## Acessibilidade

- `role="main"` aplicado por padrão — landmark de navegação principal (WCAG 2.4.1)
- `role` pode ser sobrescrito via `$attrs` para contextos específicos
- Touch target: NOT_APPLICABLE (Option B — não-interativo)
- `aria-label`, `aria-labelledby` podem ser repassados via `$attrs`
- Contraste garantido via herança do DssLayout pai

---

## Estados

| Estado        | Aplicável | Razão                                                       |
|---------------|-----------|-------------------------------------------------------------|
| Padrão        | ✅        | —                                                           |
| Hover         | ❌        | Componente não-interativo                                   |
| Focus         | ❌        | Componente não-interativo                                   |
| Active        | ❌        | Sem estado ativo                                            |
| Disabled      | ❌        | Sem comportamento de desabilitação                          |
| Loading       | ❌        | Container — estado assíncrono pertence ao conteúdo filho    |
| Error         | ❌        | Container estrutural — sem validação própria                |
| Indeterminate | ❌        | Não aplicável para container linear                         |

---

## Exceções Documentadas

### EXC-01 — QPage como elemento raiz

| Atributo      | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| ID            | EXC-01                                                                |
| Gate violado  | Gate de Composição v2.4 — Regra 1                                     |
| Localização   | `1-structure/DssPage.ts.vue`                                          |
| Justificativa | `QPage` recebe estilos inline (min-height) calculados via JavaScript pelo QLayout. Envolver em `<div>` quebraria o comportamento sticky footer. |
| Precedente    | DssLayout EXC-01, DssPageContainer EXC-01                             |

### EXC-02 — `padding: 0 !important` em print

| Atributo      | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| ID            | EXC-02                                                                |
| Gate violado  | Uso de `!important` fora de override Quasar explícito                 |
| Localização   | `4-output/_states.scss`                                               |
| Justificativa | Necessário para garantir que o print override sobrescreva a especificidade do seletor `.dss-page--padding`. |
| Aprovado      | Padrão canônico DSS v2.2 para `@media print`                          |

### EXC-03 — Hardcoded `#fff`/`#000` em print

| Atributo      | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| ID            | EXC-03                                                                |
| Localização   | `4-output/_states.scss`                                               |
| Justificativa | Tokens de marca não são adequados em impressão. Padrão canônico DSS.  |

---

## Paridade com Golden Context (DssLayout)

| Aspecto                          | DssLayout   | DssPage    | Divergência / Justificativa                             |
|----------------------------------|:-----------:|:----------:|---------------------------------------------------------|
| `defineOptions` com `name`       | ✅          | ✅         | —                                                       |
| `inheritAttrs: false`            | ✅          | ✅         | —                                                       |
| `v-bind="$attrs"` explícito      | ✅          | ✅         | —                                                       |
| Wrapper direto de Quasar (EXC-01)| ✅          | ✅         | Mesmo padrão                                            |
| Sem touch target (Option B)      | ✅          | ✅         | Ambos não-interativos                                   |
| Composable para classes          | ✅          | ✅         | —                                                       |
| `role` semântico                 | ❌          | ✅ (`main`) | DssPage adiciona landmark — melhoria sobre Quasar nativo |
| Props próprias                   | ✅ (`view`) | ✅ (`padding`, `styleFn`) | DssPage tem props funcionais de conteúdo |
