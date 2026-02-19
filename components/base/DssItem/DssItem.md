# DssItem - Documentacao Normativa DSS v2.2

**Versao**: 2.2.0
**Classificacao**: Elemento Estrutural Base dual-mode (estatico/interativo)
**Fase**: 1
**Golden Reference**: DssChip (interativo)
**Golden Context**: DssChip
**Selo DSS**: Pendente auditoria

---

## 1. Visao Geral

O **DssItem** e o elemento base estrutural do DSS para listas, menus e navegacao. Funciona como fundacao para DssList, DssMenu, DssNavigation e qualquer contexto que necessite de itens organizados em sequencia.

### Classificacao Dual-Mode

- **Modo Estatico** (`clickable=false`): Elemento de exibicao puro, `role="listitem"`, sem interatividade
- **Modo Interativo** (`clickable=true`): Elemento clicavel, `role="button"`, com hover, active, focus, disabled, touch target

### Quando Usar

- Itens de lista com label e caption
- Itens de menu de navegacao
- Itens de configuracao com leading icon e trailing action
- Agrupamento de conteudo em formato list-item

### Quando NAO Usar

- Para botoes standalone: use **DssButton**
- Para chips/tags: use **DssChip**
- Para cards com conteudo extenso: use **DssCard**
- Para tabelas: use **DssTable**
- Para tabs de navegacao: use **DssTabs**

---

## 2. Anatomia

```
<div class="dss-item dss-item--default dss-item--clickable">
  ::before                                    <- Touch target (48px, apenas quando clickable)
  ::after                                     <- Overlay visual (hover, active)
  <div class="dss-item__leading">             <- Area esquerda (icone, avatar)
    <slot name="leading" />
  </div>
  <div class="dss-item__content">             <- Area central (flex-column)
    <span class="dss-item__label">Label</span>
    <span class="dss-item__caption">Caption</span>
  </div>
  <div class="dss-item__trailing">            <- Area direita (icone, badge)
    <slot name="trailing" />
  </div>
</div>
```

### Camadas

| Elemento | Responsabilidade |
|----------|-----------------|
| `.dss-item` (div) | Container principal: layout flex, padding, transicoes |
| `::before` | Touch target WCAG 2.5.5 (apenas quando clickable, removido em compact) |
| `::after` | Overlay visual para hover/active (opacity com currentColor) |
| `.dss-item__leading` | Area esquerda: DssIcon, DssAvatar, DssCheckbox |
| `.dss-item__content` | Area central: label + caption em flex-column |
| `.dss-item__trailing` | Area direita: DssIcon (chevron), DssBadge, DssToggle |

---

## 3. Tokens Utilizados

### Spacing

| Token | Uso |
|-------|-----|
| `--dss-spacing-0_5` | Gap caption, multiline padding |
| `--dss-spacing-1` | Compact padding vertical |
| `--dss-spacing-3` | Default padding vertical, compact gap |
| `--dss-spacing-4` | Default padding horizontal, default gap |
| `--dss-spacing-5` | Compact leading/trailing min-width |
| `--dss-spacing-6` | Default leading/trailing min-width |
| `--dss-spacing-8` | Compact min-height |
| `--dss-spacing-12` | Default min-height |

### Typography

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Font family base |
| `--dss-font-size-xs` | Caption em compact |
| `--dss-font-size-sm` | Caption, compact font-size |
| `--dss-font-size-md` | Default font-size |
| `--dss-font-weight-normal` | Peso default |
| `--dss-font-weight-medium` | Peso em active state |
| `--dss-line-height-normal` | Line height default |
| `--dss-line-height-tight` | Caption line height |

### Colors

| Token | Uso |
|-------|-----|
| `--dss-text-body` | Cor do texto principal |
| `--dss-text-subtle` | Cor do caption, leading, trailing |
| `--dss-action-primary` | Cor do active state |
| `--dss-surface-active` | Background do active state |
| `--dss-border-default` | Cor do divider |

### Interaction

| Token | Uso |
|-------|-----|
| `--dss-touch-target-min` | Touch target 48px (clickable) |
| `--dss-opacity-hover` | Overlay opacity hover |
| `--dss-opacity-active` | Overlay opacity active |
| `--dss-opacity-disabled` | Opacity disabled (0.4) |
| `--dss-opacity-50` | Opacity disabled high contrast |
| `--dss-focus-ring` | Cor do focus ring |

### Motion

| Token | Uso |
|-------|-----|
| `--dss-duration-150` | Transicao de background, color, overlay |
| `--dss-easing-standard` | Easing padrao |

### Border

| Token | Uso |
|-------|-----|
| `--dss-border-width-thin` | Divider width |
| `--dss-border-width-md` | Focus ring width |
| `--dss-border-width-thick` | High contrast focus, active indicator |

### Brand (tokens numericos)

| Token | Uso |
|-------|-----|
| `--dss-hub-600` / `--dss-hub-500` (dark) | Brand Hub |
| `--dss-water-500` / `--dss-water-400` (dark) | Brand Water |
| `--dss-waste-600` / `--dss-waste-500` (dark) | Brand Waste |

**Nota**: Tokens semanticos de brand (`--dss-{brand}-primary`) ainda nao existem. Usando tokens numericos conforme padrao DssBadge/DssCard.

---

## 4. API Publica

### Props

| Prop | Tipo | Default | Obrigatorio | Descricao |
|------|------|---------|-------------|-----------|
| `label` | `string` | `''` | Nao | Texto principal do item |
| `caption` | `string` | `''` | Nao | Texto secundario (subtitulo) |
| `clickable` | `boolean` | `false` | Nao | Torna o item interativo |
| `disabled` | `boolean` | `false` | Nao | Estado desabilitado (requer clickable) |
| `active` | `boolean` | `false` | Nao | Destaque visual permanente |
| `density` | `ItemDensity` | `'default'` | Nao | Densidade: default, compact |
| `color` | `ItemColor \| null` | `null` | Nao | Cor semantica do label |
| `inset` | `boolean` | `false` | Nao | Recuo para alinhar com itens com leading |
| `divider` | `boolean` | `false` | Nao | Borda inferior de separacao |
| `brand` | `ItemBrand \| null` | `null` | Nao | Brand override |
| `ariaLabel` | `string` | `undefined` | Nao | Label de acessibilidade |
| `tabindex` | `number \| string \| null` | `null` | Nao | Tabindex customizado |

### Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo principal (substitui label + caption) |
| `leading` | Area esquerda (DssIcon, DssAvatar, DssCheckbox) |
| `trailing` | Area direita (DssIcon, DssBadge, DssToggle) |

### Events

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `click` | `MouseEvent \| KeyboardEvent` | Emitido ao clicar ou pressionar Enter/Space (requer clickable) |

---

## 5. Estados

### Estados Implementados

| Estado | Implementado | Descricao |
|--------|-------------|-----------|
| **default** | Sim | Exibicao normal do item |
| **hover** | Sim | Overlay semi-transparente via ::after (requer clickable) |
| **active (press)** | Sim | Overlay com opacidade maior via ::after (requer clickable) |
| **active (prop)** | Sim | Destaque visual permanente (background + cor) |
| **focus** | Sim | Focus ring via :focus-visible (requer clickable) |
| **disabled** | Sim | Opacidade reduzida, pointer-events none, aria-disabled |

### Estados NAO Aplicaveis

| Estado | Justificativa |
|--------|--------------|
| **loading** | NAO se aplica a itens de lista. Loading pertence ao container (DssList) |
| **error** | NAO se aplica a itens de lista. Errors pertencem a formularios |
| **indeterminate** | NAO se aplica. Pertence a DssCheckbox/DssRadio |

---

## 6. Variantes

### Densidades

| Variante | Min-Height | Padding | Touch Target | Uso |
|----------|-----------|---------|-------------|-----|
| `default` | `--dss-spacing-12` (48px) | `--dss-spacing-3` / `--dss-spacing-4` | 48px via ::before | Listas padrao, menus |
| `compact` | `--dss-spacing-8` (32px) | `--dss-spacing-1` / `--dss-spacing-4` | Removido | Listas densas, dropdowns |

---

## 7. Brandabilidade

### Seletores Suportados

Cada brand pode ser ativada via:
1. **Prop**: `<DssItem brand="hub" />`
2. **Data attribute**: `<div data-brand="hub"><DssItem /></div>` (heranca contextual)

### Efeito por Brand

A brand afeta APENAS o active state:
- Cor do texto no active state usa token da brand
- Leading icon no active state herda cor da brand

### Tokens por Brand

| Brand | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Hub (Orange) | `--dss-hub-600` | `--dss-hub-500` |
| Water (Blue) | `--dss-water-500` | `--dss-water-400` |
| Waste (Green) | `--dss-waste-600` | `--dss-waste-500` |

---

## 8. Acessibilidade (WCAG 2.1 AA)

### Touch Target

**Condicional** — depende do modo:

| Modo | Touch Target | Implementacao |
|------|-------------|---------------|
| Estatico (`clickable=false`) | NAO implementado (Opcao B) | Elemento nao interativo |
| Interativo (`clickable=true`) | 48px via `::before` (Opcao A) | Pseudo-elemento absolutamente posicionado |
| Compact (`density="compact"`) | Removido | `::before { display: none }` |

### ARIA

| Modo | Atributos |
|------|-----------|
| **Estatico** | `role="listitem"` |
| **Interativo** | `role="button"`, `tabindex="0"` |
| **Desabilitado** | `role="button"`, `aria-disabled="true"`, `tabindex="-1"` |

### Teclado

| Tecla | Acao |
|-------|------|
| `Enter` | Ativa o item (emite click) |
| `Space` | Ativa o item (emite click, preventDefault) |
| `Tab` | Move foco para proximo item focavel |

### Contraste

- High contrast (`prefers-contrast: more`): borda lateral no active, focus ring espesso
- Forced colors (`forced-colors: active`): cores do sistema, bordas explicitas

### Movimento

- `prefers-reduced-motion: reduce`: todas as transicoes desativadas

---

## 9. Modos de Uso

### Item Estatico

```vue
<!-- Item de exibicao, sem interatividade -->
<DssItem label="Informacao" caption="Dado somente leitura" />
```

### Item Clicavel

```vue
<!-- Item de navegacao -->
<DssItem clickable label="Configuracoes" @click="openSettings">
  <template #leading>
    <DssIcon name="settings" :decorative="true" />
  </template>
  <template #trailing>
    <DssIcon name="chevron_right" :decorative="true" />
  </template>
</DssItem>
```

### Com DssAvatar

```vue
<!-- Item de contato -->
<DssItem clickable label="Maria Silva" caption="Gerente de Projetos" @click="viewProfile">
  <template #leading>
    <DssAvatar initials="MS" color="primary" />
  </template>
</DssItem>
```

### Com Brand

```vue
<!-- Brand via prop -->
<DssItem clickable active brand="hub" label="Sansys Hub" />

<!-- Brand via contexto -->
<div data-brand="water">
  <DssItem clickable active label="Sansys Water" />
</div>
```

### Compact

```vue
<!-- Lista densa -->
<DssItem clickable density="compact" label="Item compacto" />
```

---

## 10. Exemplos Completos

### Exemplo 1: Menu de Navegacao

```vue
<DssItem clickable active divider label="Dashboard" @click="navigate('dashboard')">
  <template #leading><DssIcon name="dashboard" :decorative="true" /></template>
  <template #trailing><DssIcon name="chevron_right" :decorative="true" /></template>
</DssItem>
<DssItem clickable divider label="Usuarios" caption="Gerenciar" @click="navigate('users')">
  <template #leading><DssIcon name="people" :decorative="true" /></template>
  <template #trailing><DssIcon name="chevron_right" :decorative="true" /></template>
</DssItem>
```

### Exemplo 2: Lista de Configuracoes

```vue
<DssItem clickable divider label="Notificacoes" caption="Ativar alertas" @click="toggle">
  <template #leading><DssIcon name="notifications" :decorative="true" /></template>
  <template #trailing><DssToggle v-model="notifications" /></template>
</DssItem>
```

### Exemplo 3: Lista com Inset

```vue
<DssItem clickable label="Inbox" @click="go('inbox')">
  <template #leading><DssIcon name="inbox" :decorative="true" /></template>
</DssItem>
<DssItem clickable inset label="Item sem icone (alinhado)" @click="go('other')" />
```

### Exemplo 4: Status Indicators

```vue
<DssItem color="positive" label="Servidor Online">
  <template #leading><DssIcon name="check_circle" color="positive" :decorative="true" /></template>
</DssItem>
<DssItem color="negative" label="Erro de Conexao">
  <template #leading><DssIcon name="error" color="negative" :decorative="true" /></template>
</DssItem>
```

### Exemplo 5: Todas as Densidades

```vue
<DssItem clickable label="Default (48px)" @click="handleClick" />
<DssItem clickable density="compact" label="Compact (32px)" @click="handleClick" />
```

---

## 11. Anti-patterns

### Anti-pattern 1: DssItem sem DssList

```vue
<!-- ACEITAVEL para prototipacao, mas em producao use DssList -->
<div>
  <DssItem label="Item 1" />
  <DssItem label="Item 2" />
</div>

<!-- IDEAL: Use DssList quando disponivel -->
<DssList>
  <DssItem label="Item 1" />
  <DssItem label="Item 2" />
</DssList>
```

### Anti-pattern 2: Estilos hardcoded

```vue
<!-- ERRADO: Cor fora do sistema DSS -->
<DssItem label="Item" style="background: #f0f0f0" />

<!-- CORRETO: Use prop color ou active state -->
<DssItem label="Item" active />
```

### Anti-pattern 3: Clickable sem handler

```vue
<!-- ERRADO: Clickable sem acao -->
<DssItem clickable label="Item clicavel sem handler" />

<!-- CORRETO: Sempre fornecer handler ou nao usar clickable -->
<DssItem clickable label="Item clicavel" @click="handleClick" />
<DssItem label="Item estatico" />
```

### Anti-pattern 4: Disabled sem clickable

```vue
<!-- ERRADO: Disabled sem clickable nao faz sentido -->
<DssItem disabled label="Desabilitado" />

<!-- CORRETO: Disabled requer clickable -->
<DssItem clickable disabled label="Desabilitado" />
```

### Anti-pattern 5: Touch target no leading/trailing

```scss
/* ERRADO: Touch target no icone interno */
.dss-item__leading::before {
  min-width: 48px;
  min-height: 48px;
}

/* CORRETO: Touch target e responsabilidade do DssItem (::before) */
```

---

## 12. Governanca

### Decisoes Arquiteturais

| Decisao | Justificativa |
|---------|--------------|
| `<div>` como container | Elemento generico, compativel com role="listitem" e role="button" |
| Dual-mode via prop `clickable` | Simplifica API, evita componentes duplicados |
| Touch target condicional | Opcao A quando clickable, Opcao B quando estatico, removido em compact |
| `::after` para overlays | Conforme convencao DSS: `::before` reservado para touch target |
| Overlay com `currentColor` | Permite que o overlay funcione automaticamente com qualquer cor |
| Focus ring inset | `outline-offset` negativo evita overflow em listas contidas |
| Cores via classes utilitarias | Segue padrao DSS de `.text-*` definidas em `utils/_colors.scss` |

### Limitacoes Intencionais

1. **NAO implementa routing** — navegacao e responsabilidade do consumidor (`@click`)
2. **NAO emite evento hover** — hover e apenas visual, sem logica de negocio
3. **NAO suporta drag-and-drop** — funcionalidade futura se necessario
4. **NAO cria tokens proprios** — usa exclusivamente tokens genericos existentes
5. **NAO controla filhos** — DssIcon, DssAvatar, DssBadge nos slots sao independentes

### Preparacao para Futuro

- **DssList**: DssItem e o bloco fundamental de DssList (container)
- **DssMenu**: DssItem sera reutilizado como item de menu
- **DssNavDrawer**: DssItem sera reutilizado na navegacao lateral
- **Nested lists**: Estrutura suporta aninhamento futuro

### Excecoes Documentadas

Nenhuma excecao documentada. Todos os valores usam tokens DSS.

---

## 13. Troubleshooting

### Item nao responde a clique

1. Verificar se `clickable` esta ativo
2. Verificar se `disabled` nao esta ativo
3. Verificar se existe handler `@click`

### Hover nao funciona

1. Verificar se `clickable` esta ativo
2. Verificar se `prefers-reduced-motion: reduce` nao esta ativo
3. Verificar se `disabled` nao esta ativo

### Touch target muito pequeno

1. Verificar se `density` nao e `compact` (compact remove touch target)
2. Verificar se o token `--dss-touch-target-min` esta definido

### Inset nao alinha

1. Verificar se os itens com leading usam `--dss-spacing-6` como min-width
2. O calculo de inset e: padding-left + leading-width + gap

### Brand nao aplica

1. Verificar se `brand` e um valor valido ("hub", "water", "waste")
2. Para heranca contextual, verificar se `data-brand` esta no ancestral
3. Brand afeta APENAS o active state — item precisa ter `active` para ver efeito visual
