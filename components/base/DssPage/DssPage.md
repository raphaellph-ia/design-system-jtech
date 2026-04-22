# DssPage

> **Classificação:** Container de Conteúdo Estrutural não-interativo de Nível 4 — Fase 2
> **Status:** Pré-auditoria
> **Golden Reference:** DssBadge
> **Golden Context:** DssLayout
> **Contexto Estrutural:** DssPageContainer (container pai obrigatório)
> **Quasar Base:** QPage
> **Versão:** 1.0.0

---

## 1. Visão Geral

O `DssPage` é um wrapper DSS governado sobre o `QPage` do Quasar. Ele atua como a **área de conteúdo principal da aplicação**, responsável por:

1. **Calcular dinamicamente a altura mínima** da página com base nas dimensões da janela e nos offsets de header/footer — garantindo o comportamento de "sticky footer" (footer sempre ao final da tela, mesmo com pouco conteúdo).
2. **Declarar a semântica de conteúdo principal** via `role="main"` por padrão.
3. **Aplicar padding interno governado por token** quando a prop `padding` é verdadeira.

### Papel na Hierarquia de Layout

```
DssLayout (motor de layout, orquestrador global)
  ├── DssHeader (fixo no topo — gera --q-header-offset)
  ├── DssDrawer (fixo lateral — gera --q-left/right-offset)
  ├── DssPageContainer (recebe offsets, aplica padding externo)
  │     └── DssPage  ←  ESTE COMPONENTE
  │           └── [conteúdo da aplicação]
  └── DssFooter (fixo no rodapé — gera --q-footer-offset)
```

### Mapeamento de Superfície de Composição DSS

**🟢 A) Existentes DSS:**
- `DssLayout` (ancestral obrigatório)
- `DssPageContainer` (pai direto obrigatório)
- `DssHeader`, `DssFooter` (irmãos do DssPageContainer — geradores de offset)

**🟡 B) Planejados / Roadmap:**
- `DssScrollArea` (componente opcional para scroll customizado dentro da página)

**⚪ C) Estruturalmente Esperados mas Inexistentes:**
- Nenhum crítico

**Declaração de Impacto:**
- Existentes: 4
- Planejados: 1 (`DssScrollArea` — não crítico)
- Inexistentes: 0
- Risco: Baixo — `DssPage` funciona completamente com o scroll nativo do navegador

---

## 2. Escopo Funcional

### O que DssPage FAZ

| Responsabilidade                                           | DssPage          |
|------------------------------------------------------------|:----------------:|
| Calcula min-height dinâmica para sticky footer             | ✅ (via Quasar)   |
| Aplica `role="main"` por padrão                            | ✅               |
| Aplica padding interno via token (`--dss-container-padding`) | ✅ (quando `padding=true`) |
| Repassa atributos HTML via `v-bind="$attrs"`               | ✅               |
| Permite sobrescrever `role` via `$attrs`                   | ✅               |
| Permite sobrescrever cálculo de min-height via `style-fn`  | ✅               |

### O que DssPage NÃO FAZ

| Responsabilidade                                      | Quem faz                         |
|-------------------------------------------------------|----------------------------------|
| Cor de fundo                                          | DssLayout pai (--dss-surface-muted) |
| Offsets de header/footer/drawer                       | DssLayout (via Quasar)           |
| Padding externo (entre DssPageContainer e DssPage)    | DssPageContainer                 |
| Scrollbars customizadas                               | DssScrollArea (planejado) / navegador |
| Layout interno (grid, flexbox, etc.)                  | Desenvolvedor consumidor         |
| Brand e tokens de cor                                 | DssLayout + DssHeader/DssToolbar |
| Interatividade                                        | Filhos (conteúdo da aplicação)   |

---

## 3. API

### Props

| Prop       | Tipo     | Padrão    | Descrição                                                                        |
|------------|----------|-----------|----------------------------------------------------------------------------------|
| `padding`  | Boolean  | `false`   | Aplica `--dss-container-padding` (16px) em todos os lados do conteúdo           |
| `style-fn` | Function | undefined | Sobrescreve a função de cálculo de min-height do Quasar (uso avançado)          |

#### `padding`

Quando `true`, aplica `var(--dss-container-padding)` (= `var(--dss-spacing-4)` = 16px) como padding interno em todos os lados. Substitui a classe `.q-layout-padding` do Quasar, que usa valores hardcoded.

```vue
<!-- Edge-to-edge (padrão) -->
<dss-page>
  <!-- conteúdo toca as bordas -->
</dss-page>

<!-- Com padding governado -->
<dss-page :padding="true">
  <!-- conteúdo com 16px de espaço interno -->
</dss-page>
```

#### `style-fn`

Função avançada para sobrescrever o cálculo de `min-height` do Quasar. Recebe o offset total (em px) de header + footer e retorna um objeto de estilo CSS.

```typescript
type PageStyleFn = (offset: number) => Record<string, string>
```

```vue
<dss-page :style-fn="(offset) => ({ minHeight: `calc(100vh - ${offset}px - 20px)` })">
  <!-- conteúdo com min-height customizado -->
</dss-page>
```

**Uso raramente necessário** — o cálculo padrão do Quasar é suficiente para a grande maioria dos casos.

### Slots

| Slot      | Descrição                                                                           |
|-----------|-------------------------------------------------------------------------------------|
| `default` | Conteúdo principal da página — livre para qualquer conteúdo de aplicação            |

O `DssPage` não impõe restrições sobre o conteúdo do slot — grids, cards, formulários, seções semânticas, textos são todos válidos.

### Eventos

Nenhum. Componente estritamente não-interativo.

---

## 4. Estados

| Estado        | Aplicável | Razão                                                  |
|---------------|-----------|--------------------------------------------------------|
| Padrão        | ✅        | —                                                      |
| Hover         | ❌        | Não-interativo                                         |
| Focus         | ❌        | Não-interativo                                         |
| Active        | ❌        | Sem estado ativo                                       |
| Disabled      | ❌        | Sem comportamento de desabilitação                     |
| Loading       | ❌        | Container — estado assíncrono é responsabilidade do conteúdo filho |
| Error         | ❌        | Container estrutural — sem validação própria           |
| Indeterminate | ❌        | Não aplicável para container linear                    |

### Estados Adaptativos (Passivos)

| Ambiente          | Comportamento                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| Dark mode         | Herda cor do `DssLayout` pai. Nenhum override necessário.                     |
| Alto contraste    | `prefers-contrast: more` — sem override (DssPage não define cores próprias)   |
| Forced Colors     | `background-color: Canvas; color: CanvasText`                                 |
| Reduced motion    | Sem animações — sem override necessário                                       |
| Print             | `padding: 0 !important; background-color: #fff; color: #000` (EXC-02, EXC-03) |

---

## 5. Acessibilidade

### Touch Target

**Não aplicável.** `DssPage` é não-interativo (Option B).

### Semântica

- `role="main"` aplicado por padrão — identifica o conteúdo principal do documento para tecnologias assistivas
- Permite apenas **um** `role="main"` por documento (garantia do consumidor — fora do escopo do componente)
- `role` pode ser sobrescrito via `$attrs` quando o `DssPage` é usado em contextos que não exigem landmark `main`
- `aria-label` e outros atributos ARIA podem ser repassados via `$attrs`

### Contraste

Cor de fundo herdada do `DssLayout` via cascata. O `DssLayout` garante contraste WCAG 2.1 AA via tokens semânticos.

### Landmark Navigation

`role="main"` é um landmark de navegação essencial para usuários de leitores de tela. Permite que eles saltem diretamente para o conteúdo principal via atalho de navegação.

---

## 6. Como o Cálculo de min-height Funciona (Motor do Quasar)

O `QPage` monitora as dimensões da janela e os offsets calculados pelo `QLayout` para determinar a `min-height` da página dinamicamente via JavaScript:

```
min-height = janela.innerHeight - --q-header-offset - --q-footer-offset
```

Este valor é aplicado como **estilo inline** no elemento `<q-page>`. O DSS não interfere neste mecanismo (EXC-01).

**Efeito prático — Sticky Footer:**

```
Pouco conteúdo → DssPage expande via min-height → DssFooter fica colado no final
Muito conteúdo → DssPage tem altura natural → scroll normal da página
```

**Por que não envolver em `<div>`:** Se `<q-page>` fosse filho de um wrapper, a `min-height` seria aplicada ao wrapper, mas o `<q-page>` interno não expandiria para preencher o wrapper, quebrando o layout.

---

## 7. Tokens Utilizados

| Token                      | Propriedade CSS | Condição                       |
|----------------------------|-----------------|--------------------------------|
| `--dss-container-padding`  | `padding`       | Apenas quando `padding=true`   |

### Tokens Herdados (via cascata)

| Token herdado          | Origem          | Propriedade    |
|------------------------|-----------------|----------------|
| `--dss-surface-muted`  | DssLayout pai   | background-color (via cascata) |
| `--dss-text-body`      | DssLayout pai   | color (via cascata)            |

---

## 8. Exceções DSS

### EXC-01 — QPage como elemento raiz

| Atributo         | Valor                                                                 |
|------------------|-----------------------------------------------------------------------|
| ID               | EXC-01                                                                |
| Gate violado     | Gate de Composição v2.4 — Regra 1                                     |
| Localização      | `1-structure/DssPage.ts.vue`                                          |
| Justificativa    | `QPage` recebe estilos inline (min-height) calculados via JavaScript pelo QLayout pai (provide/inject). Envolver em `<div>` aplicaria o min-height ao wrapper, sem expandir o `<q-page>` interno — quebrando o comportamento sticky footer. |
| Precedente       | DssLayout, DssPageContainer (EXC-01 em ambos)                         |
| Aprovação        | Precedente canônico DSS — 2026-04-22                                  |

### EXC-02 — `padding: 0 !important` em `@media print`

| Atributo         | Valor                                                                 |
|------------------|-----------------------------------------------------------------------|
| ID               | EXC-02                                                                |
| Gate violado     | Uso de `!important` fora de override Quasar explícito                 |
| Localização      | `4-output/_states.scss`                                               |
| Justificativa    | Remove o padding da variante `--padding` na impressão. `!important` é necessário para garantir que o print override prevaleça sobre a especificidade do seletor composto `.dss-page.dss-page--padding`. |
| Aprovação        | Padrão canônico DSS v2.2 — 2026-04-22                                |

### EXC-03 — Hardcoded `#fff`/`#000` em `@media print`

| Atributo         | Valor                                                                 |
|------------------|-----------------------------------------------------------------------|
| ID               | EXC-03                                                                |
| Localização      | `4-output/_states.scss`                                               |
| Justificativa    | Tokens de marca não são adequados em impressão. Padrão canônico DSS. |
| Aprovação        | Padrão canônico DSS v2.2 — 2026-04-22                                |

---

## 9. Comportamentos Implícitos

### Forwarding de Atributos

`DssPage` usa `inheritAttrs: false` com `v-bind="$attrs"` explícito. Atributos não declarados como props são repassados ao `<q-page>` raiz.

### role="main" como Padrão Sobrescritível

A ordem das diretivas no template garante que `$attrs` sobrescreva `role="main"`:

```html
<q-page role="main" v-bind="$attrs">
```

Como `v-bind="$attrs"` vem **após** `role="main"`, um `role` passado pelo consumidor via `$attrs` terá precedência sobre o padrão.

### Transparência de Cor

`DssPage` **não define** `background-color` próprio. A cor é herdada via cascata CSS do `DssLayout` pai.

### min-height Automático

O `min-height` não é visível no SCSS — existe apenas em tempo de execução via JavaScript do Quasar. O efeito é: mesmo com pouco conteúdo, `DssPage` ocupa a altura disponível entre header e footer.

---

## 10. Padrões de Uso

### Uso Básico (Edge-to-Edge)

```vue
<dss-layout view="hHh LpR fFf">
  <dss-header elevated>
    <dss-toolbar>
      <dss-toolbar-title>Minha Aplicação</dss-toolbar-title>
    </dss-toolbar>
  </dss-header>

  <dss-page-container>
    <dss-page>
      <!-- conteúdo edge-to-edge -->
    </dss-page>
  </dss-page-container>
</dss-layout>
```

### Com Padding

```vue
<dss-page-container>
  <dss-page :padding="true">
    <h1>Título da Seção</h1>
    <p>Conteúdo com espaçamento interno governado.</p>
  </dss-page>
</dss-page-container>
```

### Sticky Footer

```vue
<dss-layout view="hHh LpR fFf">
  <dss-header>...</dss-header>

  <dss-page-container>
    <dss-page>
      <!-- mesmo com pouco conteúdo, o footer fica colado no final -->
    </dss-page>
  </dss-page-container>

  <dss-footer>...</dss-footer>
</dss-layout>
```

### Com role Customizado

```vue
<!-- Contexto de navegação auxiliar dentro de um iframe -->
<dss-page role="region" aria-label="Área de relatórios">
  <!-- conteúdo -->
</dss-page>
```

---

## 11. Anti-Patterns

| Anti-Pattern                                                    | Solução                                                          |
|-----------------------------------------------------------------|------------------------------------------------------------------|
| Usar fora de `DssPageContainer`                                 | Sempre filho direto de `DssPageContainer`                        |
| Aplicar `padding` ou `min-height` próprios via CSS              | Usar a prop `padding=true` para padding governado                 |
| Usar como container de seção ou card dentro da página           | Usar `DssCard` ou elementos semânticos HTML (`<section>`, etc.)  |
| Ter múltiplos `DssPage` em um mesmo `DssLayout`                 | `DssPageContainer` aceita apenas um `DssPage` filho              |
| Sobrescrever `.q-page` via SCSS                                 | Usar a prop `padding` ou classes DSS utilitárias                 |
| Usar `role="main"` em mais de um elemento por documento         | `role="main"` deve ser único — sobrescrever se necessário via `$attrs` |

---

## 12. Matriz de Composição DSS

### Papel Estrutural

`DssPage` é o **terminal da hierarquia de layout** — o nó final antes do conteúdo da aplicação. Não contém outros componentes DSS de infraestrutura internamente.

### Componentes do Mesmo Contexto (Layout Global)

| Componente       | Papel                                                      | Status DSS          |
|------------------|------------------------------------------------------------|---------------------|
| DssLayout        | Ancestral raiz — motor de layout                           | ✅ Selado           |
| DssPageContainer | Pai direto obrigatório — recebe e aplica offsets           | ✅ Selado           |
| DssHeader        | Irmão do DssPageContainer — gera `--q-header-offset`       | ✅ Selado           |
| DssFooter        | Irmão do DssPageContainer — gera `--q-footer-offset`       | ✅ Selado           |
| DssDrawer        | Irmão do DssPageContainer — gera `--q-left/right-offset`   | ✅ Selado           |

### Limites de Responsabilidade

- `DssPage` gerencia: min-height dinâmica, role="main", padding interno opcional
- `DssPageContainer` gerencia: padding externo (offsets de layout)
- `DssLayout` gerencia: orquestração global, injeção de variáveis CSS de offset
- `DssHeader/Footer/Drawer` gerenciam: os offsets que DssPage recebe indiretamente

---

## 13. Paridade com Golden Context (DssLayout)

| Aspecto                              | DssLayout   | DssPage    | Divergência / Justificativa                                      |
|--------------------------------------|:-----------:|:----------:|------------------------------------------------------------------|
| `defineOptions` com `name`           | ✅          | ✅         | —                                                                |
| `inheritAttrs: false`                | ✅          | ✅         | —                                                                |
| `v-bind="$attrs"` explícito          | ✅          | ✅         | —                                                                |
| Wrapper direto de Quasar (EXC-01)    | ✅          | ✅         | Mesmo padrão                                                     |
| Sem touch target (Option B)          | ✅          | ✅         | Ambos não-interativos                                            |
| Composable para classes              | ✅          | ✅         | —                                                                |
| Props próprias                       | ✅ (`view`) | ✅ (`padding`, `styleFn`) | DssPage tem props; DssLayout tem `view` |
| Tokens próprios                      | ✅ (1 token) | ✅ (1 token condicional) | DssLayout: `--dss-surface-muted`. DssPage: `--dss-container-padding` (quando `padding=true`) |
| `_brands.scss` com overrides         | ❌ (vazio)  | ❌ (vazio)  | Ambos brand-neutros — delegam ao pai                             |
| `role` semântico aplicado            | ❌          | ✅ (`role="main"`) | DssPage adiciona semântica de landmark — melhoria sobre Quasar nativo |

---

## 14. Histórico de Versões

| Versão | Data       | Mudança                             |
|--------|------------|-------------------------------------|
| 1.0.0  | 2026-04-22 | Criação inicial — DSS v2.5 Protocol |
