# DssIcon - Documentacao Normativa DSS v2.2

**Versao**: 2.2.0
**Classificacao**: Elemento Visual Base nao interativo
**Fase**: 1
**Golden Component**: DssBadge (unico)
**Selo DSS**: Pendente auditoria

---

## 1. Visao Geral

O **DssIcon** e o componente base estrutural do DSS para exibicao de icones. Funciona como fundacao para multiplos componentes do ecossistema, incluindo DssButton, DssChip, DssBadge, DssListItem, DssToolbar, DssCard e DssNavigation.

### Quando Usar

- Exibir icones em contextos semanticos (com `ariaLabel`)
- Exibir icones decorativos (com `decorative=true`)
- Indicar carregamento/sincronizacao (com `spin`)
- Chamar atencao para notificacoes (com `pulse`)
- Como base dentro de outros componentes DSS (modo embedded)

### Quando NAO Usar

- Para icones clicaveis standalone: use **DssButton** com prop `icon`
- Para avatares com iniciais: use **DssAvatar**
- Para indicadores numericos: use **DssBadge**
- Para imagens complexas: use `<img>` ou `<svg>` diretamente

---

## 2. Anatomia

```
<span class="dss-icon dss-icon--md">        ← Container DSS (sizing, color, animation)
  <q-icon name="home" class="dss-icon__inner" />  ← QIcon interno (renderizacao)
  <slot />                                         ← Conteudo customizado (opcional)
</span>
```

### Camadas

| Elemento | Responsabilidade |
|----------|-----------------|
| `.dss-icon` (span) | Container DSS: dimensoes via tokens, cor via heranca/classes, animacoes |
| `.dss-icon__inner` (QIcon) | Renderizacao do icone Material Icons |
| `<slot>` | Conteudo customizado avancado (SVG inline, etc.) |

### Dependencia Interna

O DssIcon depende internamente do **QIcon** (Quasar Framework) para renderizacao de icones. O QIcon e encapsulado e NAO exposto diretamente ao consumidor.

---

## 3. Tokens Utilizados

### Dimensao

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-xs` | 16px | Inline icons, textos auxiliares |
| `--dss-icon-size-sm` | 20px | Icones secundarios |
| `--dss-icon-size-md` | 24px | Default, icones interativos |
| `--dss-icon-size-lg` | 32px | Icones de destaque |
| `--dss-icon-size-xl` | 48px | Icones grandes, avatares |

### Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-150` | 150ms | Transicao de cor |
| `--dss-duration-200` | 200ms | Transicao de transform |
| `--dss-duration-1000` | 1000ms | Animacao spin (1 rotacao) |
| `--dss-easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Easing padrao |

### Opacidade

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-opacity-60` | 0.6 | Icone decorativo |
| `--dss-opacity-75` | 0.75 | Decorativo em high contrast |

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
| `name` | `string` | — | Sim | Nome do icone Material Icons |
| `size` | `IconSize` | `'md'` | Nao | Tamanho: xs, sm, md, lg, xl |
| `color` | `IconColor \| null` | `null` | Nao | Cor semantica (herda do contexto se null) |
| `brand` | `IconBrand \| null` | `null` | Nao | Brand override (sobrescreve color) |
| `spin` | `boolean` | `false` | Nao | Animacao de rotacao continua |
| `pulse` | `boolean` | `false` | Nao | Animacao de pulso |
| `decorative` | `boolean` | `false` | Nao | Marca como decorativo (aria-hidden=true) |
| `ariaLabel` | `string` | `undefined` | Condicional | OBRIGATORIO quando `decorative=false` |

### Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo customizado (uso avancado) |

### Events

Nenhum evento emitido. DssIcon e um componente de exibicao puro, sem interatividade propria.

---

## 5. Estados

### Estados Implementados

| Estado | Implementado | Descricao |
|--------|-------------|-----------|
| **default** | Sim | Exibicao normal do icone |
| **spin** | Sim | Rotacao continua (loading/sync) |
| **pulse** | Sim | Pulso (notificacao/alerta) |
| **decorative** | Sim | Opacidade reduzida, aria-hidden |

### Estados NAO Aplicaveis

| Estado | Justificativa |
|--------|--------------|
| **hover** | DssIcon NAO e interativo. Hover pertence ao componente wrapper (DssButton, etc.) |
| **active** | Idem. Responsabilidade do componente interativo pai |
| **disabled** | Idem. Quando o pai e disabled, o icone herda opacidade via CSS do pai |
| **focus** | Idem. DssIcon nunca recebe foco diretamente |
| **loading** | Substituido por `spin` que e especifico para icones |
| **error** | NAO se aplica a icones. Errors pertencem a componentes de formulario |

---

## 6. Variantes

### Tamanhos

| Variante | Token | Valor | Uso |
|----------|-------|-------|-----|
| `xs` | `--dss-icon-size-xs` | 16px | Inline, textos auxiliares |
| `sm` | `--dss-icon-size-sm` | 20px | Icones secundarios |
| `md` | `--dss-icon-size-md` | 24px | Default |
| `lg` | `--dss-icon-size-lg` | 32px | Destaque |
| `xl` | `--dss-icon-size-xl` | 48px | Grandes, avatares |

### Animacoes

| Variante | Descricao | Duracao |
|----------|-----------|---------|
| `spin` | Rotacao continua 360deg | `--dss-duration-1000` linear |
| `pulse` | Escala 1 → 0.9 → 1 com fade | `--dss-duration-1000` x 2 |

---

## 7. Brandabilidade

### Seletores Suportados

Cada brand pode ser ativada via:
1. **Prop**: `<DssIcon brand="hub" />`
2. **Data attribute**: `<div data-brand="hub"><DssIcon /></div>` (heranca contextual)

### Tokens por Brand

| Brand | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Hub (Orange) | `--dss-hub-600` | `--dss-hub-500` |
| Water (Blue) | `--dss-water-500` | `--dss-water-400` |
| Waste (Green) | `--dss-waste-600` | `--dss-waste-500` |

---

## 8. Acessibilidade (WCAG 2.1 AA)

### Touch Target

**Opcao B — NAO implementado**

DssIcon e um elemento de exibicao, nao interativo. A responsabilidade de touch target pertence ao componente wrapper (DssButton, DssChip, etc.).

Referencia: DssBadge (Golden Component, mesma decisao).

### ARIA

| Modo | Atributos |
|------|-----------|
| **Semantico** (`decorative=false`) | `role="img"`, `aria-label="..."` |
| **Decorativo** (`decorative=true`) | `aria-hidden="true"` |

### Contraste

- High contrast (`prefers-contrast: more`): opacidade forcada a 1 (exceto decorativos)
- Forced colors (`forced-colors: active`): cor forcada para `ButtonText`

### Movimento

- `prefers-reduced-motion: reduce`: todas as animacoes desativadas (`animation: none`, `transition: none`)

---

## 9. Modos de Uso

### Standalone (icone independente)

```vue
<!-- Icone com significado semantico -->
<DssIcon name="notifications" color="warning" aria-label="Notificacoes" />

<!-- Icone decorativo (ignorado por screen readers) -->
<DssIcon name="chevron_right" :decorative="true" />
```

### Embedded (dentro de outro componente DSS)

```vue
<!-- Dentro de DssButton - herda cor do botao -->
<DssButton color="primary">
  <DssIcon name="send" :decorative="true" />
  Enviar
</DssButton>

<!-- Dentro de DssChip -->
<DssChip color="info">
  <DssIcon name="info" size="sm" :decorative="true" />
  Informacao
</DssChip>
```

### Com Brand

```vue
<!-- Brand via prop -->
<DssIcon name="business" brand="hub" aria-label="Sansys Hub" />

<!-- Brand via contexto (data-brand no pai) -->
<div data-brand="water">
  <DssIcon name="water_drop" aria-label="Agua" />
</div>
```

### Com Animacao

```vue
<!-- Loading spinner -->
<DssIcon name="sync" :spin="true" aria-label="Carregando" />

<!-- Notificacao pulsante -->
<DssIcon name="notification_important" :pulse="true" color="negative" aria-label="Alerta" />
```

---

## 10. Exemplos Completos

### Exemplo 1: Barra de navegacao

```vue
<nav>
  <DssIcon name="home" color="primary" aria-label="Inicio" />
  <DssIcon name="search" color="primary" aria-label="Buscar" />
  <DssIcon name="settings" color="primary" aria-label="Configuracoes" />
</nav>
```

### Exemplo 2: Lista com icones

```vue
<DssListItem>
  <DssIcon name="folder" color="warning" size="sm" :decorative="true" />
  Documentos
</DssListItem>
```

### Exemplo 3: Status indicators

```vue
<DssIcon name="check_circle" color="positive" size="sm" aria-label="Concluido" />
<DssIcon name="error" color="negative" size="sm" aria-label="Erro" />
<DssIcon name="warning" color="warning" size="sm" aria-label="Atencao" />
```

### Exemplo 4: Todos os tamanhos

```vue
<DssIcon name="home" size="xs" :decorative="true" />  <!-- 16px -->
<DssIcon name="home" size="sm" :decorative="true" />  <!-- 20px -->
<DssIcon name="home" size="md" :decorative="true" />  <!-- 24px -->
<DssIcon name="home" size="lg" :decorative="true" />  <!-- 32px -->
<DssIcon name="home" size="xl" :decorative="true" />  <!-- 48px -->
```

### Exemplo 5: Brands

```vue
<DssIcon name="business" brand="hub" aria-label="Hub" />
<DssIcon name="water_drop" brand="water" aria-label="Water" />
<DssIcon name="delete" brand="waste" aria-label="Waste" />
```

---

## 11. Anti-patterns

### Anti-pattern 1: Icone clicavel sem wrapper

```vue
<!-- ERRADO: DssIcon NAO e interativo -->
<DssIcon name="close" @click="fechar" />

<!-- CORRETO: Use DssButton -->
<DssButton flat round icon="close" @click="fechar" aria-label="Fechar" />
```

### Anti-pattern 2: Cor hardcoded

```vue
<!-- ERRADO: Cor fora do sistema DSS -->
<DssIcon name="star" style="color: #FF5722" />

<!-- CORRETO: Use cor semantica -->
<DssIcon name="star" color="warning" />
```

### Anti-pattern 3: Icone semantico sem aria-label

```vue
<!-- ERRADO: Icone com significado mas sem label -->
<DssIcon name="error" color="negative" />

<!-- CORRETO: Fornecer label OU marcar como decorativo -->
<DssIcon name="error" color="negative" aria-label="Erro na operacao" />
<DssIcon name="error" color="negative" :decorative="true" />
```

### Anti-pattern 4: Token especifico de componente

```scss
/* ERRADO: Criar token especifico */
--dss-icon-color-primary: #1976D2;

/* CORRETO: Usar token semantico existente */
.text-primary { color: var(--dss-primary); }
```

### Anti-pattern 5: Touch target no icone

```scss
/* ERRADO: Implementar touch target no icone */
.dss-icon::before {
  min-width: 48px;
  min-height: 48px;
}

/* CORRETO: Touch target e responsabilidade do wrapper (DssButton, etc.) */
```

---

## 12. Governanca

### Decisoes Arquiteturais

| Decisao | Justificativa |
|---------|--------------|
| `<span>` como container | Elemento inline, nao interativo, compativel com modo embedded |
| QIcon encapsulado | Consumidor nao acessa QIcon diretamente; DSS controla a camada |
| `currentColor` como default | Permite heranca natural de cor em modo embedded |
| Sem touch target | Opcao B (DssBadge): responsabilidade do wrapper |
| `pointer-events: none` | Icone nao deve capturar eventos; delegados ao wrapper |
| `flex-shrink: 0` | Previne compressao do icone em layouts flex |

### Limitacoes Intencionais

1. **NAO suporta icones SVG customizados** diretamente — use slot default para SVG inline
2. **NAO emite eventos** — delegados ao componente wrapper
3. **NAO implementa hover/active/focus** — responsabilidade do contexto interativo
4. **NAO cria tokens proprios** — usa exclusivamente tokens genericos existentes
5. **NAO permite cores arbitrarias** — apenas cores semanticas DSS ou heranca

### Preparacao para Futuro

- **Badge overlay**: Estrutura `position: relative` no container permite futuro overlay de DssBadge
- **Icone + texto**: Layout `inline-flex` permite composicao com texto adjacente

### Excecoes Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EX-01 | `scale(0.9)` | `3-variants/_animations.scss` (pulse keyframe) | Valor de transformacao visual para efeito de pulso. Nao existe token `--dss-scale-*`. Valor canonico reutilizavel. |
| EX-02 | `opacity: 1` | `4-output/_states.scss` (high contrast) | Reset contextual de acessibilidade para garantir visibilidade maxima em `prefers-contrast: more`. Valor CSS maximo, nao necessita token.

---

## 13. Troubleshooting

### Icone nao aparece

1. Verificar se o nome do icone esta correto (convencao Material Icons)
2. Verificar se a font Material Icons esta carregada
3. Verificar se QIcon esta disponivel (Quasar Framework instalado)

### Cor nao aplica

1. Se usando `color` prop: verificar se a classe utilitaria `.text-{color}` existe
2. Se usando `brand`: verificar se o token `--dss-{brand}-*` esta definido
3. Em modo embedded: verificar se o pai define `color` — DssIcon herda via `currentColor`

### Animacao nao funciona

1. Verificar se `prefers-reduced-motion: reduce` esta ativo no sistema
2. Verificar se o token `--dss-duration-1000` esta definido
3. NAO usar `spin` e `pulse` simultaneamente

### Tamanho incorreto

1. Verificar se o token `--dss-icon-size-{size}` esta definido
2. Em modo embedded, verificar se o pai nao esta sobrescrevendo `font-size`
