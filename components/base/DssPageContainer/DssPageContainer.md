# DssPageContainer

> **Classificação:** Container Estrutural não-interativo de Nível 4 — Fase 2
> **Status:** Pré-auditoria
> **Golden Reference:** DssBadge
> **Golden Context:** DssLayout
> **Quasar Base:** QPageContainer
> **Versão:** 1.0.0

---

## 1. Visão Geral

O `DssPageContainer` é um wrapper DSS governado sobre o `QPageContainer` do Quasar. Ele atua como a **camada de conexão entre o motor de layout do Quasar e o conteúdo da página**, recebendo os offsets calculados pelo `DssLayout` (alturas de `DssHeader`/`DssFooter` e largura de `DssDrawer`) e aplicando-os como padding dinâmico para que o conteúdo nunca fique oculto sob elementos fixos.

### Papel na Hierarquia de Layout

```
DssLayout (motor de layout, orquestrador global)
  ├── DssHeader (fixo no topo — gera --q-header-offset)
  ├── DssDrawer (fixo lateral — gera --q-left/right-offset)
  ├── DssPageContainer  ←  ESTE COMPONENTE
  │     └── DssPage (conteúdo — compositionFuture)
  └── DssFooter (fixo no rodapé — gera --q-footer-offset)
```

### Mapeamento de Superfície de Composição DSS

**🟢 A) Existentes DSS:**
- `DssLayout` (pai obrigatório)
- `DssHeader`, `DssFooter` (irmãos — geradores de offset)
- `DssDrawer` (irmão — gerador de offset lateral)

**🟡 B) Planejados / Roadmap:**
- `DssPage` (filho direto — `compositionFuture`)

**⚪ C) Estruturalmente Esperados mas Inexistentes:**
- Nenhum

**Declaração de Impacto:**
- Existentes: 4
- Planejados: 1 (`DssPage`)
- Inexistentes: 0
- Risco: Baixo — `DssPageContainer` funciona com `<q-page>` nativo até que `DssPage` exista (EXC-02)
- Recomendação: `DssPage` deve ser o próximo componente da família Layout Global

---

## 2. Escopo Funcional

### O que DssPageContainer FAZ

| Responsabilidade                             | DssPageContainer |
|----------------------------------------------|:----------------:|
| Recebe offsets do DssLayout via CSS vars     | ✅               |
| Aplica padding dinâmico automático            | ✅ (via Quasar)   |
| Fornece slot para DssPage                    | ✅               |
| Repassa atributos HTML via `v-bind="$attrs"` | ✅               |

### O que DssPageContainer NÃO FAZ

| Responsabilidade                             | Quem faz          |
|----------------------------------------------|-------------------|
| Calcular offsets de header/footer/drawer     | DssLayout (Quasar)|
| Cor de fundo da área de conteúdo             | DssLayout pai     |
| Scroll e comportamento de rolagem            | DssPage filho     |
| Padding interno do conteúdo                  | DssPage filho     |
| Brand e tokens de cor                        | DssLayout + DssHeader/DssToolbar |
| Interatividade                               | Filhos (DssPage e seu conteúdo) |

---

## 3. API

### Props

**Nenhuma.** `DssPageContainer` é pass-through estrutural puro.

`QPageContainer` não possui props documentadas na API do Quasar. Reage ao contexto do `QLayout` via variáveis CSS injetadas.

### Slots

| Slot      | Descrição                                                                      |
|-----------|--------------------------------------------------------------------------------|
| `default` | Destinado exclusivamente a `DssPage`. Não usar HTML nativo em produção.        |

### Eventos

Nenhum. Componente estritamente não-interativo.

---

## 4. Estados

| Estado        | Aplicável | Razão                                              |
|---------------|-----------|----------------------------------------------------|
| Padrão        | ✅        | —                                                  |
| Hover         | ❌        | Não-interativo                                     |
| Focus         | ❌        | Não-interativo                                     |
| Active        | ❌        | Sem estado ativo                                   |
| Disabled      | ❌        | Sem comportamento de desabilitação                 |
| Loading       | ❌        | Sem estado assíncrono                              |
| Error         | ❌        | Container estrutural — sem validação               |
| Indeterminate | ❌        | Não aplicável para container linear                |

### Estados Adaptativos (Passivos)

| Ambiente          | Comportamento                                                               |
|-------------------|-----------------------------------------------------------------------------|
| Dark mode         | Herda cor do `DssLayout` pai. Nenhum override necessário.                   |
| Alto contraste    | `prefers-contrast: more` — sem override (DssPageContainer não define cores) |
| Forced Colors     | `background-color: Canvas; color: CanvasText`                               |
| Reduced motion    | Sem animações — sem override necessário                                     |
| Print             | `padding: 0 !important; background-color: #fff; color: #000` (EXC-03)      |

---

## 5. Acessibilidade

### Touch Target

**Não aplicável.** `DssPageContainer` é não-interativo (Option B).

### Semântica

- Sem `role` adicional — a semântica da região principal (`role="main"`) é responsabilidade do `DssPage` filho
- `aria-label` pode ser repassado via `$attrs` para contextos específicos

### Contraste

Cor de fundo herdada do `DssLayout` via cascata. O `DssLayout` garante contraste WCAG 2.1 AA via tokens semânticos.

---

## 6. Como o Padding Dinâmico Funciona (Motor de Layout do Quasar)

O `QLayout` injeta variáveis CSS em todos os descendentes diretos relevantes:

```css
/* Injetado pelo QLayout pai — gerenciado pelo Quasar */
:root {
  --q-header-offset: 50px;   /* altura do QHeader */
  --q-footer-offset: 50px;   /* altura do QFooter */
  --q-left-offset: 300px;    /* largura do QDrawer esquerdo (quando aberto) */
  --q-right-offset: 0px;     /* largura do QDrawer direito */
}
```

O `QPageContainer` aplica esses valores como padding via regras internas:

```css
/* Regras internas do Quasar — NÃO sobrescrever */
.q-page-container {
  padding-top: var(--q-header-offset);
  padding-bottom: var(--q-footer-offset);
  padding-left: var(--q-left-offset);
  padding-right: var(--q-right-offset);
}
```

**O DSS não interfere neste mecanismo** (EXC-01). Qualquer CSS que sobrescreva `padding` em `.dss-page-container` quebrará o layout.

---

## 7. Tokens Utilizados

**Nenhum token aplicado diretamente.**

| Token herdado          | Origem          | Propriedade    |
|------------------------|-----------------|----------------|
| `--dss-surface-muted`  | DssLayout pai   | background-color (via cascata) |

---

## 8. Exceções DSS

### EXC-01 — QPageContainer como elemento raiz

| Atributo         | Valor                                                               |
|------------------|---------------------------------------------------------------------|
| ID               | EXC-01                                                              |
| Gate violado     | Gate de Composição v2.4 — Regra 1                                   |
| Localização      | `1-structure/DssPageContainer.ts.vue`                               |
| Justificativa    | `QPageContainer` depende de `provide/inject` interno do `QLayout` para receber offsets via variáveis CSS. Envolver em `<div>` quebraria essa comunicação silenciosamente. |
| Precedente       | DssLayout, DssHeader, DssDrawer (EXC-01 em todos)                  |
| Aprovação        | Precedente canônico DSS — 2026-04-22                               |

### EXC-02 — `<q-page>` nativo no arquivo de exemplo

| Atributo         | Valor                                                               |
|------------------|---------------------------------------------------------------------|
| ID               | EXC-02                                                              |
| Gate violado     | Gate de Composição v2.4 — Regra 1 (somente `.example.vue`)         |
| Localização      | `DssPageContainer.example.vue`                                      |
| Justificativa    | `DssPage` é `compositionFuture`. Isenção formal de `.example.vue` conforme DSS_IMPLEMENTATION_GUIDE.md. |
| Precedente       | Política de isenção `.example.vue` (DssSpace) + DssLayout EXC-05  |
| Aprovação        | Isenção formal DSS — 2026-04-22                                    |

### EXC-03 — Hardcoded `#fff`/`#000` em `@media print`

| Atributo         | Valor                                                               |
|------------------|---------------------------------------------------------------------|
| ID               | EXC-03                                                              |
| Localização      | `4-output/_states.scss`                                             |
| Justificativa    | Tokens de marca não são adequados em impressão. Padrão canônico DSS. |
| Aprovação        | Padrão canônico DSS v2.2 — 2026-04-22                             |

---

## 9. Comportamentos Implícitos

### Forwarding de Atributos

`DssPageContainer` usa `inheritAttrs: false` com `v-bind="$attrs"` explícito. Atributos não declarados como props são repassados ao `<q-page-container>` raiz.

### Transparência de Cor

`DssPageContainer` **não define** `background-color` próprio. A cor é herdada via cascata CSS do `DssLayout` pai (`--dss-surface-muted`).

### Padding Automático

O padding de `DssPageContainer` é 100% gerenciado pelo Quasar via variáveis CSS. Não é possível inspecioná-lo diretamente no SCSS do componente — ele existe apenas em tempo de execução.

### Ausência de Role

`DssPageContainer` não aplica `role`. A semântica de região (`role="main"`) é responsabilidade do `DssPage` filho, que deve ser o único ocupante do slot.

---

## 10. Padrões de Uso

### Layout Completo

```vue
<dss-layout view="hHh LpR fFf">
  <dss-header elevated>
    <dss-toolbar>
      <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
    </dss-toolbar>
  </dss-header>

  <dss-drawer side="left" v-model="drawer">
    <!-- navegação -->
  </dss-drawer>

  <dss-page-container>
    <dss-page>
      <!-- conteúdo principal -->
    </dss-page>
  </dss-page-container>

  <dss-footer>
    <dss-toolbar>
      <dss-toolbar-title>Rodapé</dss-toolbar-title>
    </dss-toolbar>
  </dss-footer>
</dss-layout>
```

### Layout Mínimo (sem header/footer)

```vue
<dss-layout view="hHh LpR fFf">
  <dss-page-container>
    <dss-page>
      <!-- conteúdo ocupa toda a tela -->
    </dss-page>
  </dss-page-container>
</dss-layout>
```

---

## 11. Anti-Patterns

| Anti-Pattern                                              | Solução                                                   |
|-----------------------------------------------------------|-----------------------------------------------------------|
| Usar fora de `DssLayout`                                  | Sempre filho direto de `DssLayout`                        |
| Inserir conteúdo HTML diretamente (sem `DssPage`)         | Usar `DssPage` como intermediário obrigatório             |
| Aplicar `padding`, `margin` ou `position` próprios        | O padding é gerenciado pelo Quasar — não sobrescrever     |
| Sobrescrever `--q-header-offset` e variáveis do Quasar   | Essas variáveis são exclusivas do motor de layout         |
| Usar como container de seção ou card dentro de uma página | Usar `DssCard` ou elementos semânticos HTML               |

---

## 12. Matriz de Composição DSS

### Papel Estrutural

`DssPageContainer` é **intermediário obrigatório** entre `DssLayout` e `DssPage`. Não contém outros componentes DSS internamente além de seu filho direto esperado (`DssPage`).

### Componentes do Mesmo Contexto (DssLayout)

| Componente    | Papel                                                  | Status DSS  |
|---------------|--------------------------------------------------------|-------------|
| DssLayout     | Container pai obrigatório (motor de layout)            | ✅ Selado   |
| DssHeader     | Irmão — gera `--q-header-offset`                       | ✅ Selado   |
| DssFooter     | Irmão — gera `--q-footer-offset`                       | ✅ Selado   |
| DssDrawer     | Irmão — gera `--q-left/right-offset`                   | ✅ Selado   |
| DssPage       | Filho direto esperado                                  | 🟡 `compositionFuture` |

### Limites de Responsabilidade

- `DssPageContainer` gerencia: conexão com motor de layout, slot para DssPage
- `DssLayout` gerencia: orquestração global, injeção de variáveis CSS de offset
- `DssPage` gerencia: conteúdo principal, scroll, padding interno, `role="main"`
- Irmãos (`DssHeader`, `DssFooter`, `DssDrawer`): geram os offsets que DssPageContainer recebe

---

## 13. Paridade com Golden Context (DssLayout)

| Aspecto                              | DssLayout   | DssPageContainer | Divergência / Justificativa                          |
|--------------------------------------|:-----------:|:----------------:|------------------------------------------------------|
| `defineOptions` com `name`           | ✅          | ✅               | —                                                    |
| `inheritAttrs: false`                | ✅          | ✅               | —                                                    |
| `v-bind="$attrs"` explícito          | ✅          | ✅               | —                                                    |
| Wrapper direto de Quasar (EXC-01)    | ✅          | ✅               | Mesmo padrão                                         |
| Sem touch target (Option B)          | ✅          | ✅               | Ambos não-interativos                                |
| Composable para classes              | ✅          | ✅               | —                                                    |
| Sem tokens próprios                  | ❌          | ✅               | DssLayout aplica `--dss-surface-muted`; DssPageContainer é transparente |
| Props próprias                       | ✅ (`view`) | ❌               | QPageContainer não tem props — pass-through puro     |
| `_brands.scss` com overrides         | ✅          | ❌ (vazio)       | DssPageContainer não gerencia brand                  |

---

## 14. Histórico de Versões

| Versão | Data       | Mudança                              |
|--------|------------|--------------------------------------|
| 1.0.0  | 2026-04-22 | Criação inicial — DSS v2.5 Protocol  |
