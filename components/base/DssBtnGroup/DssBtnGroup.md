# DssBtnGroup — Documentação Normativa DSS v2.2

> **Template 13.1** | **Fase 2** | **Status:** Pré-auditoria
> **Classificação:** Container de Composição — Agrupa instâncias de DssButton
> **Golden Reference:** DssChip | **Golden Context:** DssCard

---

## 1. Visão Geral

### 1.1 O que é o DssBtnGroup

O **DssBtnGroup** é um wrapper de composição que agrupa múltiplos componentes DssButton em uma unidade visual coesa. Aplica borda compartilhada, remoção de gap entre botões adjacentes e gerenciamento de border-radius nas extremidades do grupo.

Wrapper DSS governado sobre infraestrutura Quasar (QBtnGroup). A implementação DSS usa `<div role="group">` diretamente — não instancia QBtnGroup — para controle total de tokens e independência de CSS interno do Quasar.

### 1.2 Quando usar

- Agrupar botões relacionados que formam uma unidade funcional única
- Toolbars de formatação (negrito, itálico, sublinhado)
- Seleção de modo de visualização (lista, grade, mapa)
- Ações de documento (editar, duplicar, excluir)
- Controles de paginação agrupados

### 1.3 Quando NÃO usar

- Botões independentes sem relação funcional entre si (usar DssButton separadamente)
- Quando os botões precisam de espaçamento entre eles (usar DssButton + gap no container)
- Para uma única ação isolada (usar DssButton)
- Quando o contexto requer um menu suspenso (aguardar DssBtnDropdown — Fase 2)

### 1.4 Componente Quasar equivalente

`QBtnGroup` — Wrapper DSS governado (API DSS difere da API Quasar)

---

## 2. A Regra de Ouro: Prop Sync

> **⚠️ CRÍTICO**: Esta regra é a mais importante do componente.

### 2.1 Por que prop sync é obrigatório

O DssBtnGroup **não propaga automaticamente** as props de estilo (`flat`, `outline`, `push`, `unelevated`, `glossy`) para os DssButton filhos.

**Razão técnica**: O Quasar projeta o QBtnGroup para usar as props apenas para gerar classes CSS no container (ex: `q-btn-group--outline`), enquanto os botões filhos precisam das mesmas props para renderizar seu próprio estilo. O DssBtnGroup segue o mesmo contrato.

### 2.2 Exemplos correto vs incorreto

```vue
<!-- ❌ ANTI-PATTERN: botões filhos sem prop flat -->
<DssBtnGroup flat>
  <DssButton label="Primeiro" />   <!-- Será elevated (default), não flat -->
  <DssButton label="Segundo" />
</DssBtnGroup>
```

```vue
<!-- ✅ CORRETO: prop declarada no grupo E em cada filho -->
<DssBtnGroup flat>
  <DssButton flat label="Primeiro" />
  <DssButton flat label="Segundo" />
</DssBtnGroup>
```

### 2.3 Por que o DssBtnGroup precisa da prop se não propaga?

O DssBtnGroup usa a prop para aplicar CSS de grupo que complementa o estilo dos filhos:
- `flat` → adiciona separador `--dss-gray-300` entre botões
- `outline` → colapsa bordas duplas com margin negativa
- `push` / `unelevated` → adiciona separador `--dss-gray-200` entre botões

---

## 3. Arquitetura Técnica

### 3.1 Modelo DSS × Quasar

| Camada | Responsabilidade |
|--------|-----------------|
| **Quasar** | Camada de execução (não usada diretamente — implementação própria) |
| **DSS** | Governança, tokenização, brandabilidade, acessibilidade |

### 3.2 Estrutura de Componentes

```
DssBtnGroup (container)
└── slot default
    ├── DssButton (filho principal — Fase 1, selado)
    └── DssBtnDropdown (futuro — Fase 2, não implementado)
```

### 3.3 Elemento HTML raiz

```html
<div role="group" aria-label="[prop ariaLabel]" class="dss-btn-group [modificadores]">
  <!-- slot default -->
</div>
```

### 3.4 Exceção arquitetural documentada: Estilização de filhos

O DssBtnGroup usa seletores CSS globais do tipo `.dss-btn-group > .dss-button` para:
1. Gerenciar border-radius das faces internas de filhos adjacentes
2. Adicionar separadores entre filhos em variantes sem borda/shadow

Esta é a **única exceção permitida** à regra "componentes DSS não estilizam filhos internamente".

**Justificativa**: Gerenciar visualmente os filhos adjacentes É o propósito central do componente. Não usa `::v-deep` (estilos globais, não scoped). Documentado explicitamente em `dss.meta.json.cssArchitecture`.

---

## 4. Props

Consulte [DSSBTNGROUP_API.md](./DSSBTNGROUP_API.md) para referência completa de types.

### 4.1 Props de Estilo Visual (⚠️ Prop Sync Obrigatório)

| Prop | Default | Comportamento no Grupo |
|------|---------|------------------------|
| `flat` | `false` | Adiciona separador `var(--dss-gray-300)` entre filhos |
| `outline` | `false` | Colapsa bordas duplas com `margin-left: calc(-1 * var(--dss-border-width-thin))` |
| `push` | `false` | Adiciona separador `var(--dss-gray-200)` entre filhos |
| `unelevated` | `false` | Adiciona separador `var(--dss-gray-200)` entre filhos |
| `glossy` | `false` | Sem CSS adicional no grupo — efeito nos filhos |

### 4.2 Props de Forma

| Prop | Efeito no Border-radius |
|------|------------------------|
| `rounded` | Extremidade esquerda: `var(--dss-radius-full)` / Extremidade direita: `var(--dss-radius-full)` |
| `square` | Todos os filhos: `0` (EXC-01) |

### 4.3 Props de Layout

| Prop | Efeito |
|------|--------|
| `spread` | Container: `display: flex` / Filhos: `flex: 1` |
| `stretch` | Container: `align-self: stretch` / Filhos: `align-self: stretch; min-height: 0` |

### 4.4 Props de Brandabilidade e Acessibilidade

| Prop | Tipo | Descrição |
|------|------|-----------|
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | Acento na borda inferior via `box-shadow` inset |
| `ariaLabel` | `string` | Valor de `aria-label` no container |

---

## 5. Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do grupo. DssButton recomendado. |

---

## 6. Eventos

Nenhum. O DssBtnGroup é container estrutural. Todos os eventos (`click`, `focus`, etc.) pertencem aos DssButton filhos.

---

## 7. Estados

### 7.1 Estados Aplicáveis

| Estado | Descrição |
|--------|-----------|
| `default` | Único estado do container. Renderização padrão. |

### 7.2 Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | Pertence ao DssButton filho |
| `focus` | Pertence ao DssButton filho — o grupo não é focusável |
| `active` | Pertence ao DssButton filho |
| `disabled` | Deve ser aplicado individualmente em cada DssButton filho |
| `loading` | Pertence ao DssButton filho |
| `error` | Não aplicável a grupos de botões |
| `indeterminate` | Não aplicável |

---

## 8. Acessibilidade (WCAG 2.1 AA)

### 8.1 Role ARIA

O DssBtnGroup renderiza como `role="group"`, identificando para tecnologias assistivas que os botões dentro formam um grupo relacionado.

### 8.2 aria-label

```vue
<!-- Obrigatório quando o grupo não tem label visual visível -->
<DssBtnGroup flat aria-label="Opções de formatação de texto">
  <DssButton flat icon="format_bold" aria-label="Negrito" />
  <DssButton flat icon="format_italic" aria-label="Itálico" />
</DssBtnGroup>
```

### 8.3 Touch Target

**Opção B**: Não implementado no container DssBtnGroup. O DssBtnGroup não é um Compact Control. O touch target (via `::before` — WCAG 2.5.5) é responsabilidade exclusiva de cada DssButton filho.

### 8.4 Navegação por Teclado

O grupo **não captura foco**. Cada DssButton filho é individualmente navegável por `Tab`. O DssBtnGroup não intercepta eventos de teclado.

### 8.5 Leitores de Tela

Ao navegar com teclado, o leitor de tela anuncia:
1. O grupo (via `role="group"` + `aria-label`)
2. Cada botão filho individualmente

---

## 9. Anti-Patterns

### 9.1 Prop sync ignorado (Anti-pattern mais crítico)

```vue
<!-- ❌ INCORRETO: Esperando que o flat do grupo seja propagado -->
<DssBtnGroup flat>
  <DssButton label="Sem flat" />  <!-- Será elevated, não flat -->
</DssBtnGroup>
```

### 9.2 Componentes não-DSS diretamente no slot

```vue
<!-- ❌ INCORRETO: elemento HTML nativo sem wrapper DSS -->
<DssBtnGroup outline>
  <button class="meu-botao-custom">Botão</button>
</DssBtnGroup>
```

O ajuste de border-radius do DssBtnGroup usa seletores `.dss-btn-group > .dss-button`. Elementos sem classe `dss-button` não receberão os ajustes visuais.

### 9.3 Props color/size/dark no grupo

```vue
<!-- ❌ INCORRETO: props que pertencem ao DssButton filho -->
<DssBtnGroup color="primary" size="lg" dark>
```

### 9.4 Misturar variantes de estilo conflitantes

```vue
<!-- ❌ INCORRETO: flat e outline são mutuamente exclusivos -->
<DssBtnGroup flat outline>
```

---

## 10. Variantes Visuais

### 10.1 Flat

```vue
<DssBtnGroup flat>
  <DssButton flat color="primary" label="A" />
  <DssButton flat color="primary" label="B" />
  <DssButton flat color="primary" label="C" />
</DssBtnGroup>
```

CSS do grupo: separador `var(--dss-gray-300)` entre filhos adjacentes.

### 10.2 Outline

```vue
<DssBtnGroup outline>
  <DssButton outline icon="view_list" aria-label="Lista" />
  <DssButton outline icon="grid_view" aria-label="Grade" />
</DssBtnGroup>
```

CSS do grupo: colapso de borda dupla via `margin-left: calc(-1 * var(--dss-border-width-thin))`.

### 10.3 Push

```vue
<DssBtnGroup push>
  <DssButton push color="primary" label="Primário" />
  <DssButton push label="Secundário" />
</DssBtnGroup>
```

CSS do grupo: separador `var(--dss-gray-200)` entre filhos.

### 10.4 Unelevated (Padrão recomendado)

```vue
<DssBtnGroup unelevated>
  <DssButton unelevated color="primary" label="Salvar" />
  <DssButton unelevated label="Cancelar" />
</DssBtnGroup>
```

### 10.5 Rounded

```vue
<DssBtnGroup unelevated rounded>
  <DssButton unelevated rounded color="primary" label="Sim" />
  <DssButton unelevated rounded label="Não" />
</DssBtnGroup>
```

Primeiro filho: border-radius pill esquerda. Último filho: pill direita. Intermediários: 0.

### 10.6 Spread

```vue
<DssBtnGroup unelevated spread style="width: 100%">
  <DssButton unelevated label="Cancelar" />
  <DssButton unelevated color="primary" label="Confirmar" />
</DssBtnGroup>
```

---

## 11. Brandabilidade

### 11.1 Comportamento

A prop `brand` aplica um acento visual na borda inferior do container via `box-shadow` inset com `var(--dss-border-width-thick)`.

### 11.2 Exemplos

```vue
<DssBtnGroup outline brand="hub">
  <DssButton outline label="Hub A" />
  <DssButton outline label="Hub B" />
</DssBtnGroup>

<DssBtnGroup flat brand="water">
  <DssButton flat label="Water A" />
  <DssButton flat label="Water B" />
</DssBtnGroup>
```

### 11.3 Tokens de brand utilizados

| Brand | Modo Claro | Dark Mode |
|-------|-----------|-----------|
| Hub (laranja) | `--dss-hub-600` | `--dss-hub-400` |
| Water (azul) | `--dss-water-500` | `--dss-water-400` |
| Waste (verde) | `--dss-waste-600` | `--dss-waste-500` |

---

## 12. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-border-width-thin` | L2, L3 | Colapso outline / separadores |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | Module | High contrast outline |
| `--dss-gray-200` | L3 | Separadores push/unelevated |
| `--dss-gray-300` | L3 | Separador flat |
| `--dss-radius-full` | L2 | Variante rounded |
| `--dss-hub-600`, `--dss-hub-400` | L4 | Brand Hub |
| `--dss-water-500`, `--dss-water-400` | L4 | Brand Water |
| `--dss-waste-600`, `--dss-waste-500` | L4 | Brand Waste |

---

## 13. Paridade com Golden Component

### 13.1 DssChip (Golden Reference — Interativo)

| Aspecto | DssChip | DssBtnGroup | Divergência Intencional |
|---------|---------|-------------|------------------------|
| `defineOptions` | ✅ | ✅ | — |
| `inheritAttrs: false` | ✅ | ✅ | — |
| `v-bind="$attrs"` | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | — |
| `aria-hidden` em elementos decorativos | ✅ | N/A | Container sem decorativos |
| Focus ring no componente | ✅ | ❌ | **Intencional**: grupo não é focusável. Focus delegado aos filhos. |
| Touch target via `::before` | ✅ | ❌ | **Intencional**: não é Compact Control. Delegado ao DssButton. |
| Estados hover/active/disabled | ✅ | ❌ | **Intencional**: estados pertencem aos filhos. |

### 13.2 DssCard (Golden Context — Fase 2)

| Aspecto | DssCard | DssBtnGroup | Divergência Intencional |
|---------|---------|-------------|------------------------|
| `defineOptions` | ✅ | ✅ | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | — |
| Composables para lógica | ✅ | ✅ | — |
| 4 camadas SCSS | ✅ | ✅ | — |
| Entry point wrapper puro | ✅ | ✅ | — |
| `dss.meta.json` com `phase: 2` | ✅ | ✅ | — |
| Subcomponentes | Sim (Section, Actions) | Não | **Intencional**: DssBtnGroup é simples |
| `brand` via border-left | ✅ | via box-shadow inset | **Intencional**: border-left não aplica bem em botões inline |
| `dark` prop | ✅ | ❌ | **Intencional**: DSS gerencia via `[data-theme]` global |
| Estados clickable/focus ring | ✅ | N/A | Container não é clickable |

---

## 14. Matriz de Composição DSS

### 14.1 Papel do DssBtnGroup

O DssBtnGroup é um **container de agrupamento visual**:
- Fornece `<div role="group">` como superfície
- Gerencia border-radius nas extremidades do grupo
- Aplica separadores visuais por variante
- Não instancia filhos — responsabilidade do consumidor

### 14.2 Componentes recomendados no slot

| Componente | Status | Caso de Uso |
|------------|--------|-------------|
| `DssButton` | ✅ Existente (Fase 1, selado) | Principal — botões de ação |
| `DssBtnDropdown` | 🟡 Planejado (Fase 2) | Botão com menu suspenso no grupo |

### 14.3 Limites de responsabilidade

| O DssBtnGroup FAZ | O DssBtnGroup NÃO FAZ |
|-------------------|----------------------|
| Gerencia border-radius dos filhos | Propagar props de estilo |
| Adiciona separadores visuais | Controlar estado disabled dos filhos |
| Aplica brand no container | Forçar color/size nos filhos |
| Fornece role="group" + aria-label | Interceptar eventos dos filhos |

---

## 15. Comportamentos Implícitos

### 15.1 Forwarding de atributos

O DssBtnGroup usa `inheritAttrs: false` + `v-bind="$attrs"` no `<div>` raiz. Todos os atributos HTML passados ao componente são forwarded para o container.

```vue
<DssBtnGroup data-testid="nav-group" class="custom-class" unelevated>
<!-- Resultado: <div class="dss-btn-group dss-btn-group--unelevated custom-class" data-testid="nav-group" ...> -->
```

### 15.2 Grupo com filho único

Se o grupo tiver apenas um DssButton filho, o seletor `:only-child` é aplicado:
- Para `rounded`: `border-radius: var(--dss-radius-full)`
- Para `square`: `border-radius: 0`
- Sem variante de forma: border-radius original do DssButton é preservado

### 15.3 Flat com rounded

A combinação `flat + rounded` funciona corretamente:
- Separador flat é aplicado
- Border-radius pill nas extremidades é aplicado

---

## 16. Exceções Documentadas

### 16.1 Exceções de Valor (Token First)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Square variant. Semanticamente "sem radius". Idêntico ao DssCard EXC-03. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `4-output/_states.scss` | Dark mode divider. Sem token DSS equivalente. Padrão Material Design. Idêntico ao DssCard EXC-01. |
| EXC-03 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors mode. System keywords obrigatórios. Tokens ignorados neste modo. |

### 16.2 Exceções aos Gates v2.4

Registradas formalmente em `dss.meta.json > gateExceptions`. Aprovadas pelo Chat Estratégico DSS em 26 Mar 2026.

#### Gate de Responsabilidade v2.4 — `responsibilityGateV24`

| Campo | Valor |
|-------|-------|
| **Arquivo** | `3-variants/_outline.scss` |
| **Violação nominal** | Captura de `:hover` / `:focus-visible` em `.dss-button` filho |
| **Justificativa de exceção** | O efeito aplica apenas `position: relative; z-index: 1` — altera exclusivamente o **contexto de empilhamento de grupo**, sem modificar cor, background, borda ou qualquer propriedade visual do DssButton. A alternativa (CSS custom property no DssButton) adicionaria acoplamento em componente Fase 1 já selado. |
| **Decisão** | Exceção formal aprovada. Alternativa Opção B descartada por impacto em DssButton (Fase 1, selado). |

#### Gate de Composição v2.4 — `compositionGateV24`

| Campo | Valor |
|-------|-------|
| **Arquivos** | `2-composition/_base.scss`, `3-variants/_flat.scss` e demais variantes |
| **Violação nominal** | Uso de seletores de descendência direta (`.dss-btn-group > .dss-button`) para modificar aparência de filho DSS |
| **Justificativa de exceção** | O gerenciamento de `border-radius` nas extremidades e separadores entre botões adjacentes **é o único propósito** do DssBtnGroup — é impossível implementá-lo via props do DssButton porque o botão não conhece sua posição no grupo. Não usa `::v-deep`. Documentado como exceção arquitetural desde a criação do componente. |
| **Decisão** | Exceção formal aprovada. Herança pré-v2.4 registrada retroativamente no framework v2.4. |

---

## 17. Dependências Futuras

| Componente | Fase | Impacto para DssBtnGroup |
|------------|------|--------------------------|
| `DssBtnDropdown` | 2 | Suporte nativo no slot default. Declarado em `dss.meta.json.compositionFuture`. |

---

**Criado:** 26 de Março de 2026
**Autor:** Hebert Daniel Oliveira Chaves
**Versão DSS:** 2.2
**Fase:** 2 — Componente Composto
**Status:** Pré-auditoria — PRONTO PARA AUDITORIA DSS v2.2
