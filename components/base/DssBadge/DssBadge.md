# DssBadge

**Design System Sansys - Componente de Badge**

> **Documentacao Template 13.1 do DSS**
> Este documento segue o Template 13.1 oficial para documentacao de componentes do Design System Sansys.
> Estrutura obrigatoria: 13 secoes padronizadas com tokens rastreaveis, anti-patterns e governanca.

---

## 1. Visao Geral

### Nome do Componente
`DssBadge`

### Descricao
Wrapper DSS baseado no QBadge, com API publica governada pelo DSS. Componente de badge para exibir informacoes contextuais que precisam de destaque, como contadores de notificacoes, status ou labels. Suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Basico** - Wrapper DSS que encapsula funcionalidades do Quasar Framework, expondo apenas a API aprovada pelo Design System.

### Caracteristicas Principais

- **Acessibilidade WCAG 2.1 AA completa** - role="status", aria-label, aria-live
- **Brandabilidade multi-marca** - Suporte automatico a Hub, Water, Waste
- **5 variantes visuais** - Default (solid), Outline, Transparent, Floating, Rounded
- **Alinhamento vertical** - top, middle, bottom
- **Multi-linha** - Suporte a texto em multiplas linhas
- **Dot indicator** - Badge vazio funciona como indicador
- **TypeScript + Composition API** - Totalmente tipado com composables reutilizaveis
- **API governada pelo DSS** - Subconjunto curado das props do QBadge + extensoes DSS exclusivas

### Classificacao de Recursos

| Categoria | Recursos | Significado |
|-----------|----------|-------------|
| Recomendado | `color`, `label`, `outline`, `floating`, `ariaLabel`, `brand` | Padroes estabelecidos pelo DSS - USE sempre que aplicavel |
| Opcional | `rounded`, `transparent`, `multiLine`, `align`, `textColor` | Funcionalidades disponiveis - USE conforme necessidade do caso de uso |
| Fora de escopo DSS | Animacoes customizadas, interacoes complexas | Funcionalidades NAO governadas pelo DSS - implemente externamente se necessario |

> **Nota:** Esta classificacao reflete a **governanca do DSS**, nao limitacoes tecnicas. Recursos "fora de escopo" podem ser implementados via wrappers ou componentes compostos.

---

## 2. Quando Usar / Quando Nao Usar

### Quando Usar

- **Contadores de notificacao**: Numero de mensagens nao lidas
- **Status indicators**: Online, offline, novo, etc.
- **Labels de categoria**: Tags em cards ou listas
- **Informacao contextual**: Destaque de dados importantes
- **Badges em avatares**: Sobreposicao com status
- **Badges em icones**: Indicadores em botoes/menus
- **Feedback visual**: Alertas discretos

### Quando NAO Usar

- **Botoes de acao**: Use `DssButton`
- **Tags removiveis**: Use `DssChip`
- **Alertas proeminentes**: Use `DssBanner` ou `DssNotify`
- **Status de progresso**: Use `DssProgress`
- **Tooltips**: Use `DssTooltip`

---

## 3. Anatomia do Componente

### Estrutura Visual

```
+---------------------------+
|                           |
|    [Label/Conteudo]       |
|                           |
+---------------------------+
```

### Partes Internas

1. **Root (`.dss-badge`)**: Container principal com forma pill

### Slots Disponiveis

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo principal do badge | Texto, numeros, icones pequenos |

### Subcomponentes DSS Utilizados

**Nenhum** - DssBadge e um componente atomico que nao depende de outros componentes DSS.

**Dependencias externas:**
- Vue 3 (Composition API)

---

## 4. Tokens Utilizados

O **DssBadge** consome tokens de **multiplas categorias** do Design System Sansys. Para garantir manutenibilidade e evitar duplicacao de documentacao, consulte o catalogo completo de tokens:

### Referencia Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

### Categorias de Tokens Consumidas

| Categoria | Tokens Usados | Onde Encontrar | Aplicacao no DssBadge |
|-----------|---------------|----------------|------------------------|
| **Cores Semanticas** | `--dss-feedback-positive`, `--dss-feedback-negative`, `--dss-feedback-warning`, `--dss-feedback-info` | [Secao 2.3 - Cores Semanticas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Cores de fundo para estados de feedback |
| **Cores de Acao** | `--dss-action-primary`, `--dss-action-secondary` | [Secao 2.3](../../../docs/reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Cores de fundo para acoes |
| **Cores de Texto** | `--dss-text-inverse`, `--dss-text-primary` | [Secao 2.3](../../../docs/reference/DSS_TOKEN_REFERENCE.md#23-cores-semânticas-base) | Texto dentro do badge |
| **Cores Neutras** | `--dss-gray-50` a `--dss-gray-900` | [Secao 2.1 - Neutral Palette](../../../docs/reference/DSS_TOKEN_REFERENCE.md#21-neutral-palette) | Texto em variantes outline/transparent |
| **Brands** | `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` (100-800) | [Secao 2.2 - Brand Palettes](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Cores por brand |
| **Espacamento** | `--dss-spacing-0-5`, `--dss-spacing-1`, `--dss-spacing-2-5`, `--dss-spacing-3` | [Secao 1.1 - Escala Base](../../../docs/reference/DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno, min-width/height |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-weight-medium` | [Secao 6 - Tipografia](../../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Fonte, tamanho (12px), peso (500) |
| **Bordas** | `--dss-border-radius-full`, `--dss-border-radius-lg`, `--dss-border-width-md` | [Secao 8 - Bordas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#8-bordas) | Forma pill, variante outline |
| **Motion** | `--dss-duration-200`, `--dss-easing-standard` | [Secao 5 - Motion](../../../docs/reference/DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transicoes suaves |

### Observacoes Importantes

- **Tokens Protegidos**: Tokens de feedback (`--dss-feedback-*`) **NAO devem** ser sobrescritos fora do DSS
- **Brandabilidade**: Quando `brand` ou `data-brand` e aplicado, cores mudam automaticamente para a paleta da marca
- **Valores de `color`**: O DssBadge **NAO aceita cores arbitrarias**. O valor de `color` e mapeado exclusivamente para tokens semanticos DSS
- **Fallback**: Na ausencia de `brand`, o sistema usa `--dss-action-primary` para cor padrao

### Links Rapidos

- [Token Guidelines (Filosofia e Uso)](../../../docs/reference/DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catalogo Completo)](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## 5. API Publica

### Props de Conteudo

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `label` | String \| Number | `''` | Conteudo do badge (alternativa ao slot) |

### Props Visuais

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `color` | String | `'primary'` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo (mapeada para tokens DSS) |
| `textColor` | String | `null` | Mesmos valores de `color` | Cor do texto (override - usar com cautela) |
| `transparent` | Boolean | `false` | - | Badge com fundo transparente |
| `outline` | Boolean | `false` | - | Badge com estilo outline (apenas borda) |
| `rounded` | Boolean | `false` | - | Badge com cantos mais arredondados |
| `multiLine` | Boolean | `false` | - | Permite multiplas linhas |

> **Importante:** O DssBadge **NAO aceita cores arbitrarias**. Valores de `color` sao mapeados exclusivamente para tokens semanticos DSS. Usar valores fora da lista resulta em fallback para `primary`.

### Props de Posicionamento

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `floating` | Boolean | `false` | - | Badge flutuante (posicao absoluta) |
| `align` | String | `null` | `top`, `middle`, `bottom` | Alinhamento vertical |

> **Atencao `floating`:** Requer que o elemento pai tenha `position: relative`. Sem isso, o badge sera posicionado em relacao ao viewport ou ancestral posicionado mais proximo.

### Props de Brand

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Acessibilidade

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Label ARIA para screen readers |

### Slots

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo principal | Texto, numeros, icones |

---

## 6. Estados

### Tabela Unica de Estados

| Estado | Aparencia | Interacao | Tokens Aplicados |
|--------|-----------|-----------|------------------|
| **Default** | Pill colorido, texto branco | Nao interativo | `bg-{color}`, `text-white` |
| **Outline** | Borda colorida, fundo transparente | - | `border: currentColor` |
| **Transparent** | Borda fina, fundo transparente | - | `border-thin` |
| **Floating** | Posicao absoluta, canto superior direito | - | `position: absolute` |
| **Empty (Dot)** | Circulo pequeno sem texto | Indicador visual | `min-width/height: 12px` |
| **Focus** (interativo) | Focus ring visivel | Focavel por teclado | `--dss-focus-ring` |

### Prioridade de Estados

1. **Variante visual** - outline > transparent > default
2. **Posicionamento** - floating > inline
3. **Forma** - rounded > pill (padrao)

---

## 7. Variantes

### Variantes Visuais

| Variante | CSS | Uso Recomendado |
|----------|-----|-----------------|
| **Default (Solid)** | Fundo colorido | Contadores, status importantes |
| **Outline** | Apenas borda | Status secundarios, tags |
| **Transparent** | Borda fina | Informacao sutil |
| **Floating** | Posicao absoluta | Sobreposicao em avatares/icones |
| **Rounded** | Border-radius menor | Visual menos "pill" |

### Cores Semanticas Governadas

> Todas as cores sao mapeadas para tokens DSS. Consulte [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md) para valores exatos.

| Valor | Token DSS | Uso Recomendado |
|-------|-----------|-----------------|
| `primary` | `--dss-action-primary` | Acoes principais, contadores |
| `secondary` | `--dss-action-secondary` | Informacao secundaria |
| `tertiary` | `--dss-action-tertiary` | Categorias, labels |
| `accent` | `--dss-accent-*` | Destaque especial |
| `positive` | `--dss-feedback-positive` | Sucesso, online, ativo |
| `negative` | `--dss-feedback-negative` | Erro, alerta critico |
| `warning` | `--dss-feedback-warning` | Aviso, atencao |
| `info` | `--dss-feedback-info` | Informacao neutra |

**Nota:** Valores fora desta lista resultam em fallback para `primary`.

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssBadge suporta **duas formas** de aplicar brandabilidade:

#### Metodo 1: Prop `brand` (Recomendado)

Aplica brand diretamente no componente via prop.

```vue
<template>
  <!-- Hub -->
  <DssBadge brand="hub" label="5" />

  <!-- Water -->
  <DssBadge brand="water" label="Novo" />

  <!-- Waste -->
  <DssBadge brand="waste" label="Ativo" />
</template>
```

**Quando usar:**
- Badges individuais com brand especifica
- Controle granular por componente
- Nao depende de contexto DOM

#### Metodo 2: Contexto `data-brand`

Aplica brand via atributo no elemento pai.

```vue
<template>
  <!-- Todos os badges filhos herdam brand Hub -->
  <div data-brand="hub">
    <DssBadge label="5" />
    <DssBadge label="Novo" />
  </div>
</template>
```

**Quando usar:**
- Secoes inteiras com mesma brand
- Menos codigo repetitivo
- Contexto de aplicacao

**Prioridade:** Prop `brand` > `data-brand`

### Tokens de Brand

> Para detalhes completos das paletas de cores por brand, consulte [`DSS_TOKEN_REFERENCE.md - Secao 2.2`](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes)

| Brand | Base State | Variante Outline |
|-------|------------|------------------|
| **Sem brand** | `--dss-action-primary` | `--dss-action-primary` (borda) |
| **Hub** | `--dss-hub-*` | `--dss-hub-*` (borda) |
| **Water** | `--dss-water-*` | `--dss-water-*` (borda) |
| **Waste** | `--dss-waste-*` | `--dss-waste-*` (borda) |

**Nota:** Os valores especificos de escala (600, 500, etc.) sao gerenciados internamente pelo DSS. Nao hardcode valores de tokens em implementacoes customizadas.

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

| Criterio WCAG | Nivel | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Minimo)** | AA | Cores semanticas garantem contraste |
| **4.1.2 Nome, Funcao, Valor** | A | `role="status"`, `aria-label` |
| **4.1.3 Mensagens de Status** | AA | `aria-live="polite"` |

### ARIA Implementado

```vue
<DssBadge
  label="5"
  aria-label="5 notificacoes nao lidas"
  color="negative"
/>
<!-- Gera: role="status" aria-label="5 notificacoes nao lidas" aria-live="polite" -->
```

---

## 10. Exemplos de Uso

### Instalacao

```typescript
import { DssBadge } from '@/dss/components/base/DssBadge'
import type { BadgeProps } from '@/dss/components/base/DssBadge/types/badge.types'
```

### Uso Basico

```vue
<template>
  <!-- Com label prop -->
  <DssBadge color="primary" label="5" />

  <!-- Com slot -->
  <DssBadge color="positive">Novo</DssBadge>

  <!-- Dot indicator (vazio) -->
  <DssBadge color="negative" />
</template>
```

### Variantes

```vue
<template>
  <!-- Outline -->
  <DssBadge outline color="primary" label="Tag" />

  <!-- Transparent -->
  <DssBadge transparent color="secondary" label="Info" />

  <!-- Rounded -->
  <DssBadge rounded color="accent" label="Label" />
</template>
```

### Floating (sobrepondo elementos)

```vue
<template>
  <div style="position: relative;">
    <DssAvatar icon="person" color="primary" />
    <DssBadge floating color="negative" label="3" />
  </div>
</template>
```

### Brandability

```vue
<template>
  <!-- Via prop -->
  <DssBadge brand="hub" label="Hub" />
  <DssBadge brand="water" label="Water" />
  <DssBadge brand="waste" label="Waste" />

  <!-- Via contexto -->
  <div data-brand="hub">
    <DssBadge label="5" />
  </div>
</template>
```

---

## 11. Anti-patterns

### Usos Incorretos

#### 1. Badge Sem Contexto Acessivel

```vue
<!-- INCORRETO -->
<DssBadge label="5" />

<!-- CORRETO -->
<DssBadge label="5" aria-label="5 notificacoes nao lidas" />
```

**Por que:** Screen readers precisam de contexto.

---

#### 2. Badge Como Botao

```vue
<!-- INCORRETO - badge nao e interativo -->
<DssBadge @click="doSomething" label="Clique" />

<!-- CORRETO - use button com badge -->
<DssButton>
  Notificacoes
  <DssBadge label="5" />
</DssButton>
```

**Por que:** Badge e elemento decorativo, nao interativo.

---

#### 3. Cores Hardcoded

```vue
<!-- INCORRETO -->
<DssBadge style="background-color: #ff0000;" label="Erro" />

<!-- CORRETO -->
<DssBadge color="negative" label="Erro" />
```

**Por que:** Bypassa tokens e brandabilidade.

---

### Combinacoes Nao Permitidas

| Combinacao | Por que | Alternativa |
|------------|---------|-------------|
| `outline` + `transparent` | Ambos removem fundo | Use apenas um |
| `floating` sem container relativo | Badge sai do fluxo | Adicione `position: relative` no pai |
| `textColor` sem justificativa | Quebra contraste automatico | Use apenas para casos excepcionais documentados |

### Uso de `textColor` (Excecao)

> **Atencao:** A prop `textColor` existe para casos excepcionais onde o contraste automatico nao e adequado. Seu uso **NAO e recomendado** como pratica padrao.

**Quando usar:**
- Requisitos de design especificos aprovados pela equipe de UX
- Casos de acessibilidade onde o contraste automatico nao e suficiente

**Quando NAO usar:**
- Para "customizar" a aparencia do badge
- Para bypassar o sistema de cores do DSS

---

## 12. Governanca do Componente

### O Que E Extensao Valida

**Permitido SEM aprovacao:**
- Uso de props publicas documentadas
- Customizacao via tokens CSS (`--dss-*`)
- Uso de slot para conteudo customizado
- Composicao com outros componentes

### O Que Exige Novo Componente

**Requer discussao com Design System:**
- Adicionar nova variante visual
- Modificar comportamento de posicionamento
- Criar wrapper especializado (ex: `DssNotificationBadge`)

### O Que E Proibido

**NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar codigo-fonte do componente sem PR
- Criar forks locais (copiar e colar)
- Remover ARIA attributes
- Bypassar sistema de brandabilidade

### Quem Decide

| Tipo de Mudanca | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop publica** | Equipe de Design + DSS | RFC + aprovacao |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migracao |

---

## 13. Troubleshooting

### Problema: Badge nao aparece colorido

**Causa:** Prop `color` nao fornecida ou valor invalido.

**Solucao:**
```vue
<!-- Use valores validos -->
<DssBadge color="primary" label="5" />
<!-- Valores: primary, secondary, tertiary, accent, positive, negative, warning, info -->
```

---

### Problema: Badge floating sai da posicao

**Causa:** Container pai nao tem `position: relative`.

**Solucao:**
```vue
<div style="position: relative;">
  <DssAvatar icon="person" />
  <DssBadge floating color="negative" label="3" />
</div>
```

---

### Problema: Brand nao aplicada

**Causa 1:** Prop `brand` nao fornecida.

**Causa 2:** `data-brand` nao esta em elemento pai.

**Solucao:**
```vue
<!-- Via prop -->
<DssBadge brand="hub" />

<!-- Via contexto -->
<div data-brand="hub">
  <DssBadge />
</div>
```

---

## Recursos

- [Documentacao Oficial do Quasar QBadge](https://quasar.dev/vue-components/badge)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [DSS Token Reference](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## Licenca

Propriedade da Jtech

---

## Apendice: Checklist de Conformidade

### Funcionalidade
- [x] Todas as 5 variantes implementadas (solid, outline, transparent, floating, rounded)
- [x] Todas as 8 cores semanticas suportadas
- [x] Brandabilidade via prop e contexto
- [x] Slot default para conteudo customizado
- [x] Dot indicator (badge vazio)

### Acessibilidade
- [x] role="status" implementado
- [x] aria-label implementado
- [x] aria-live="polite" implementado
- [x] Focus ring para badges interativos

### Brandabilidade
- [x] Prop brand funcional (hub, water, waste)
- [x] Contexto data-brand funcional
- [x] Cores de brand aplicadas

### TypeScript
- [x] Props totalmente tipadas
- [x] Tipos exportados

---

**Ultima atualizacao:** Janeiro 2026
**Versao:** DSS v2.3.0
**Status:** Documentacao Template 13.1
