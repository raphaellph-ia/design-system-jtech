# DssTooltip

**Design System Sansys - Componente de Tooltip**

> **Documentacao Template 13.1 do DSS**
> Este documento segue o Template 13.1 oficial para documentacao de componentes do Design System Sansys.
> Estrutura obrigatoria: 13 secoes padronizadas com tokens rastreaveis, anti-patterns e governanca.

---

## 1. Visao Geral

### Nome do Componente
`DssTooltip`

### Descricao
Wrapper DSS para exibicao de informacao contextual. Componente de tooltip para apresentar conteudo informativo auxiliar vinculado a elementos da interface. Suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Basico** - Elemento Informativo Contextual (NAO interativo).

### Golden Context
**DssBadge** - Compact Control nao interativo.
**Golden Reference:** DssBadge.

Justificativa normativa:
- Uso informativo (nao acionavel)
- Ausencia de interacao direta
- Nao implementa touch target proprio
- Estados limitados (visible/hidden)
- Interacao delegada ao contexto (elemento disparador)

### Classificacao de Recursos

| Categoria | Recursos | Significado |
|-----------|----------|-------------|
| Recomendado | `label`, `visible`, `color`, `ariaLabel`, `brand` | Padroes estabelecidos pelo DSS — USE sempre que aplicavel |
| Opcional | `multiLine`, `textColor` | Funcionalidades disponiveis — USE conforme necessidade |
| Fora de escopo DSS | Posicionamento absoluto, seta/arrow, animacoes, delay | Funcionalidades NAO governadas pelo DSS — implemente externamente |

> **Nota:** Esta classificacao reflete a **governanca do DSS**, nao limitacoes tecnicas. Recursos "fora de escopo" podem ser implementados via wrappers ou composicao.

### Estrategia de Interacao (DECLARACAO OBRIGATORIA)

| Aspecto | Decisao |
|---------|---------|
| Controle de eventos | NAO controla eventos |
| Captura de input | NAO captura input |
| Abertura/fechamento | NAO governa — controlado externamente via `visible` |
| Touch target | NAO implementa (Opcao B — nao interativo) |
| Foco navegavel | NAO recebe foco |
| `::before` | PROIBIDO |
| `::after` | Permitido apenas para efeitos visuais passivos |
| `inheritAttrs` | `true` (default). `$attrs` encaminhados ao `<div>` raiz |

---

## 2. Quando Usar / Quando Nao Usar

### Quando Usar

- **Descricoes de icones**: Texto auxiliar para icones sem label visivel
- **Informacao adicional de campo**: Dicas sobre preenchimento de formularios
- **Abreviacoes e siglas**: Expansao de textos abreviados
- **Feedback contextual**: Explicacao breve sobre elementos de interface
- **Help text**: Ajuda rapida vinculada a controles especificos

### Quando NAO Usar

- **Informacao critica**: Use `DssBanner` ou mensagens de erro inline
- **Contadores/status**: Use `DssBadge`
- **Tags removiveis**: Use `DssChip`
- **Conteudo interativo**: Tooltips nao devem conter botoes, links ou formularios
- **Texto longo (> 2 linhas)**: Use popover, dialog ou help page
- **Informacao essencial**: Tooltip pode nao ser acessivel a todos os usuarios

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

1. **Root (`.dss-tooltip`)**: Container principal com cantos arredondados

### Slots Disponiveis

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo principal do tooltip | Texto informativo, icones pequenos |

### Subcomponentes DSS Utilizados

**Nenhum** — DssTooltip e um componente atomico que nao depende de outros componentes DSS.

**Dependencias externas:**
- Vue 3 (Composition API)

---

## 4. Tokens Utilizados

O **DssTooltip** consome tokens de **multiplas categorias** do Design System Sansys.

### Referencia Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

### Categorias de Tokens Consumidas

| Categoria | Tokens Usados | Onde Encontrar | Aplicacao no DssTooltip |
|-----------|---------------|----------------|-------------------------|
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-sm`, `--dss-font-weight-normal` | [Secao 6 - Tipografia](../../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Fonte, tamanho (14px), peso (400) |
| **Line Height** | `--dss-line-height-tight` | [Secao 6](../../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Altura de linha compacta |
| **Espacamento** | `--dss-spacing-1_5`, `--dss-spacing-2`, `--dss-spacing-2_5` | [Secao 1.1 - Escala Base](../../../docs/reference/DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno |
| **Bordas** | `--dss-radius-md`, `--dss-border-width-md` | [Secao 8 - Bordas](../../../docs/reference/DSS_TOKEN_REFERENCE.md#8-bordas) | Cantos arredondados, borda high contrast |
| **Motion** | `--dss-duration-tooltip`, `--dss-easing-standard` | [Secao 5 - Motion](../../../docs/reference/DSS_TOKEN_REFERENCE.md#5-motionanimation) | Transicao de opacidade |
| **Z-index** | `--dss-z-index-tooltip` | [Secao 9 - Z-index](../../../docs/reference/DSS_TOKEN_REFERENCE.md#9-z-index) | Stacking context do tooltip |
| **Brands** | `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` | [Secao 2.2 - Brand Palettes](../../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes) | Cores por brand |
| **Cores Neutras** | `--dss-gray-50` | [Secao 2.1 - Neutral Palette](../../../docs/reference/DSS_TOKEN_REFERENCE.md#21-neutral-palette) | Texto claro sobre fundo de brand |

### Touch Target vs Tooltip

> **Regra DSS (NORMATIVA)**
>
> **Tooltips NAO sao elementos interativos.**
>
> O DssTooltip NAO implementa touch target.
> A responsabilidade por area de interacao pertence ao elemento disparador.
> Referencia normativa: DssBadge (Opcao B — componente nao interativo).

### Excecoes Documentadas (Valores sem Token)

| ID | Propriedade | Valor | Contexto | Justificativa |
|----|-------------|-------|----------|---------------|
| EX-01 | `max-width` | 300px | Base styles | Nao existe token DSS para largura maxima de conteudo. Valor garante legibilidade (WCAG 1.4.8). |
| EX-02 | `font-weight` | 700 | High contrast mode | Nao existe token de peso para acessibilidade. Paridade com DssBadge Golden. |
| EX-03 | `border`, `outline` | 2px absolute | Forced colors mode | CSS custom properties ignoradas em forced-colors. Paridade com DssBadge Golden. |
| EX-04 | `color` default | `'dark'` | Props defaults | DSS_COMPONENT_ARCHITECTURE.md Secao 4 define `'primary'` como default universal. DssTooltip usa `'dark'` por: (1) Convencao UX universal — tooltips canonicamente possuem fundo escuro para diferenciar de UI primaria; (2) Legibilidade em fundos variados — `dark` garante contraste independente do contexto visual; (3) Precedente Golden — DssBadge tambem diverge do default normativo de cor conforme necessidade semantica. Esta excecao e restrita ao DssTooltip e NAO cria precedente para outros componentes. |

### Observacoes Importantes

- **Tokens Protegidos**: Tokens de feedback (`--dss-feedback-*`) **NAO devem** ser sobrescritos fora do DSS
- **Brandabilidade**: Quando `brand` ou `data-brand` e aplicado, cores mudam automaticamente para a paleta da marca
- **Cores de `color`**: O DssTooltip aceita valores mapeados para tokens semanticos DSS. Valor padrao: `dark`

### Links Rapidos

- [Token Guidelines (Filosofia e Uso)](../../../docs/reference/DSS_TOKEN_GUIDELINES.md)
- [Token Reference (Catalogo Completo)](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## 5. API Publica

### Props de Conteudo

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `label` | String | `''` | Conteudo do tooltip (alternativa ao slot) |

### Props Visuais

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `color` | String | `'dark'` | `dark`, `primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo (mapeada para tokens DSS) |
| `textColor` | String | `null` | Mesmos valores semanticos | Cor do texto (override) |
| `multiLine` | Boolean | `false` | — | Permite multiplas linhas |

> **Nota sobre `color`**: O valor padrao `dark` gera `bg-dark text-white`, aparencia canonica de tooltips. Outros valores seguem o mesmo mapeamento semantico do DssBadge.

### Props de Visibilidade

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `visible` | Boolean | `false` | Controle externo de visibilidade |

> **IMPORTANTE**: O DssTooltip NAO governa sua propria visibilidade. A prop `visible` e controlada inteiramente pelo elemento disparador ou logica externa.

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
| `default` | Conteudo principal | Texto informativo |

### Events

**Nenhum.** DssTooltip e um componente passivo que nao emite eventos.

---

## 6. Estados

### Tabela Unica de Estados

| Estado | Aparencia | Natureza | Tokens Aplicados |
|--------|-----------|----------|------------------|
| **Visible** | Tooltip exibido, fundo escuro, texto claro | Contextual (externo) | `bg-{color}`, `text-white` |
| **Hidden** | Tooltip oculto (display: none via v-show) | Contextual (externo) | Nenhum (elemento oculto) |

### Estados EXPLICITAMENTE Nao Aplicaveis

| Estado | Justificativa |
|--------|---------------|
| **hover** | Tooltip nao responde a hover proprio. Hover pertence ao disparador. |
| **active** | Tooltip nao tem estado ativo. Nao e acionavel. |
| **disabled** | Tooltip nao pode ser desabilitado. Nao e um controle. |
| **loading** | Tooltip nao carrega dados. Exibe informacao estatica. |
| **focus** | Tooltip nao recebe foco. Nao e navegavel por teclado. |
| **checked** | Tooltip nao e selecionavel. Nao e form control. |

### Prioridade de Estados

1. **Visibilidade** — `visible` > `hidden` (unica dimensao)

---

## 7. Variantes

### Variantes Visuais

| Variante | CSS | Uso Recomendado |
|----------|-----|-----------------|
| **Default** | Fundo escuro, texto claro, single-line | Informacao contextual curta |
| **Multi-line** | Text-wrap habilitado, text-align left | Informacao mais longa (max 2 linhas) |

### Cores Semanticas Governadas

> Todas as cores sao mapeadas para tokens DSS. Consulte [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md) para valores exatos.

| Valor | Classe Utilitaria | Uso Recomendado |
|-------|-------------------|-----------------|
| `dark` | `bg-dark` | Padrao — informacao contextual neutra |
| `primary` | `bg-primary` | Dicas vinculadas a acao principal |
| `secondary` | `bg-secondary` | Informacao secundaria |
| `accent` | `bg-accent` | Destaque especial |
| `positive` | `bg-positive` | Dicas de sucesso/confirmacao |
| `negative` | `bg-negative` | Avisos criticos |
| `warning` | `bg-warning` | Atencao/cuidado |
| `info` | `bg-info` | Informacao neutra |

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssTooltip suporta **duas formas** de aplicar brandabilidade (paridade com DssBadge):

#### Metodo 1: Prop `brand` (Recomendado)

```vue
<template>
  <DssTooltip brand="hub" :visible="show" label="Informacao Hub" />
  <DssTooltip brand="water" :visible="show" label="Informacao Water" />
  <DssTooltip brand="waste" :visible="show" label="Informacao Waste" />
</template>
```

#### Metodo 2: Contexto `data-brand`

```vue
<template>
  <div data-brand="hub">
    <DssTooltip :visible="show" label="Herda brand Hub" />
  </div>
</template>
```

**Prioridade:** Prop `brand` > `data-brand`

### Tokens de Brand

| Brand | Background | Texto |
|-------|------------|-------|
| **Sem brand** | `bg-{color}` (utilitaria) | `text-white` |
| **Hub** | `--dss-hub-600` | `--dss-gray-50` |
| **Water** | `--dss-water-500` | `--dss-gray-50` |
| **Waste** | `--dss-waste-600` | `--dss-gray-50` |

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

| Criterio WCAG | Nivel | Como Implementado |
|---------------|-------|-------------------|
| **1.4.3 Contraste (Minimo)** | AA | Fundo escuro + texto claro garante ratio >= 4.5:1 |
| **1.3.1 Info e Relacoes** | A | `role="tooltip"` define semantica |
| **4.1.2 Nome, Funcao, Valor** | A | `role="tooltip"`, `aria-label` |

### ARIA Implementado

```vue
<!-- Tooltip com associacao semantica -->
<button aria-describedby="tooltip-1">Ajuda</button>
<DssTooltip
  id="tooltip-1"
  :visible="showHelp"
  label="Clique para obter mais informacoes"
/>
<!-- Gera: <div role="tooltip" id="tooltip-1" aria-label="...">...</div> -->
```

### Padroes de Associacao

O elemento disparador DEVE associar-se ao tooltip via `aria-describedby`:

```html
<!-- Disparador referencia o tooltip pelo id -->
<button aria-describedby="my-tooltip">?</button>

<!-- Tooltip com id correspondente -->
<div role="tooltip" id="my-tooltip">Texto de ajuda</div>
```

### Acessibilidade por Contexto

| Contexto | Responsabilidade | Implementado por |
|----------|------------------|------------------|
| Associacao semantica | `aria-describedby` no disparador | Consumidor |
| Visibilidade | `visible` prop | Consumidor |
| Touch target do disparador | 48px minimo (WCAG 2.5.5) | Consumidor |
| Navegacao por teclado | Focus no disparador | Consumidor |
| Semantica do tooltip | `role="tooltip"` | DssTooltip |
| Label acessivel | `aria-label` | DssTooltip |

---

## 10. Exemplos de Uso

### Instalacao

```typescript
import { DssTooltip } from '@/dss/components/base/DssTooltip'
import type { TooltipProps } from '@/dss/components/base/DssTooltip/types/tooltip.types'
```

### Uso Basico

```vue
<template>
  <!-- Tooltip com label prop -->
  <div style="position: relative;">
    <button
      aria-describedby="tip-1"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      Ajuda
    </button>
    <DssTooltip id="tip-1" :visible="show" label="Texto de ajuda" />
  </div>
</template>
```

### Com Slot

```vue
<template>
  <DssTooltip id="tip-2" :visible="show">
    <strong>Importante:</strong> Este campo e obrigatorio
  </DssTooltip>
</template>
```

### Multi-line

```vue
<template>
  <DssTooltip
    id="tip-3"
    :visible="show"
    multi-line
    label="Esta funcionalidade permite configurar parametros avancados do sistema."
  />
</template>
```

### Cores Semanticas

```vue
<template>
  <DssTooltip :visible="show" color="negative" label="Acao irreversivel" />
  <DssTooltip :visible="show" color="warning" label="Verificar dados" />
  <DssTooltip :visible="show" color="positive" label="Operacao segura" />
  <DssTooltip :visible="show" color="info" label="Saiba mais" />
</template>
```

### Brandability

```vue
<template>
  <DssTooltip brand="hub" :visible="show" label="Hub info" />
  <DssTooltip brand="water" :visible="show" label="Water info" />
  <DssTooltip brand="waste" :visible="show" label="Waste info" />
</template>
```

### Exemplo Completo com Acessibilidade

```vue
<template>
  <div class="field-wrapper" style="position: relative;">
    <label for="email">E-mail</label>
    <input
      id="email"
      type="email"
      aria-describedby="email-tip"
      @focus="showTip = true"
      @blur="showTip = false"
    />
    <DssTooltip
      id="email-tip"
      :visible="showTip"
      label="Use seu e-mail corporativo @empresa.com.br"
      aria-label="Dica: use seu e-mail corporativo"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showTip = ref(false)
</script>
```

---

## 11. Anti-patterns

### Usos Incorretos

#### 1. Tooltip Sem Associacao Semantica

```vue
<!-- INCORRETO — sem aria-describedby no disparador -->
<button @mouseenter="show = true">?</button>
<DssTooltip :visible="show" label="Ajuda" />

<!-- CORRETO — com associacao via aria-describedby -->
<button
  aria-describedby="help-tip"
  @mouseenter="show = true"
  @mouseleave="show = false"
>?</button>
<DssTooltip id="help-tip" :visible="show" label="Ajuda" />
```

**Por que:** Screen readers precisam da associacao semantica para anunciar o tooltip.

---

#### 2. Tooltip Com Conteudo Interativo

```vue
<!-- INCORRETO — tooltip nao deve conter elementos interativos -->
<DssTooltip :visible="show">
  <button @click="doSomething">Clique aqui</button>
</DssTooltip>

<!-- CORRETO — use popover ou dialog para conteudo interativo -->
<DssPopover :visible="show">
  <button @click="doSomething">Clique aqui</button>
</DssPopover>
```

**Por que:** Tooltips sao informativos e nao navegaveis por teclado. Conteudo interativo dentro de tooltips e inacessivel.

---

#### 3. Tooltip Controlando Propria Visibilidade

```vue
<!-- INCORRETO — tooltip nao deve controlar eventos -->
<DssTooltip @mouseenter="show = true" label="Info" />

<!-- CORRETO — disparador controla visibilidade -->
<button @mouseenter="show = true" @mouseleave="show = false">Info</button>
<DssTooltip :visible="show" label="Detalhes" />
```

**Por que:** DssTooltip e passivo. Visibilidade e responsabilidade do consumidor.

---

#### 4. Cores Hardcoded

```vue
<!-- INCORRETO -->
<DssTooltip style="background-color: #333;" label="Info" />

<!-- CORRETO -->
<DssTooltip color="dark" label="Info" />
```

**Por que:** Bypassa tokens e brandabilidade.

---

#### 5. Tooltip Para Informacao Critica

```vue
<!-- INCORRETO — informacao critica em tooltip pode nao ser vista -->
<DssTooltip label="ATENCAO: Este campo e obrigatorio e precisa conter CPF valido" />

<!-- CORRETO — informacao critica deve estar visivel permanentemente -->
<span class="field-error">Este campo e obrigatorio. Insira um CPF valido.</span>
```

**Por que:** Tooltips sao informacao auxiliar, nao primaria. Usuarios de teclado, touch ou screen readers podem nao acessar tooltips.

---

### Combinacoes Nao Permitidas

| Combinacao | Por que | Alternativa |
|------------|---------|-------------|
| `visible` sem `id` | Sem id, nao ha associacao `aria-describedby` | Sempre fornecer `id` |
| `textColor` sem justificativa | Quebra contraste automatico | Usar apenas para excecoes documentadas |
| Tooltip sem disparador | Tooltip flutuando sem contexto | Vincular a elemento disparador |

---

## 12. Governanca do Componente

### O Que E Extensao Valida

**Permitido SEM aprovacao:**
- Uso de props publicas documentadas
- Customizacao via tokens CSS (`--dss-*`)
- Uso de slot para conteudo customizado
- Composicao com wrapper de posicionamento
- Adicionar `aria-describedby` no disparador

### O Que Exige Novo Componente

**Requer discussao com Design System:**
- Adicionar seta/arrow visual
- Sistema de posicionamento automatico
- Suporte a delay de abertura/fechamento
- Tooltip interativo (com conteudo clicavel)

### O Que E Proibido

**NUNCA fazer:**
- Sobrescrever estilos com `!important` fora de tokens
- Modificar codigo-fonte do componente sem PR
- Criar forks locais (copiar e colar)
- Remover `role="tooltip"`
- Adicionar eventos ao tooltip (hover, click, focus)
- Bypassar sistema de brandabilidade
- Usar `::before` para qualquer finalidade

### Quem Decide

| Tipo de Mudanca | Quem Aprova | Processo |
|-----------------|-------------|----------|
| **Bug fix** | Mantenedor do DSS | PR direto |
| **Nova prop publica** | Equipe de Design + DSS | RFC + aprovacao |
| **Nova variante** | Equipe de Design + DSS | Design review + RFC |
| **Breaking change** | Todas as equipes afetadas | RFC + migracao |

---

## 13. Troubleshooting

### Problema: Tooltip nao aparece

**Causa:** Prop `visible` nao esta sendo controlada ou esta sempre `false`.

**Solucao:**
```vue
<script setup>
const show = ref(false)
</script>
<template>
  <button @mouseenter="show = true" @mouseleave="show = false">?</button>
  <DssTooltip :visible="show" label="Ajuda" />
</template>
```

---

### Problema: Tooltip sem estilo/cor

**Causa:** Prop `color` com valor invalido.

**Solucao:**
```vue
<!-- Use valores validos -->
<DssTooltip color="dark" label="Info" />
<!-- Valores: dark, primary, secondary, accent, positive, negative, warning, info -->
```

---

### Problema: Screen reader nao anuncia tooltip

**Causa:** Falta de associacao `aria-describedby` no disparador.

**Solucao:**
```vue
<button aria-describedby="my-tip">?</button>
<DssTooltip id="my-tip" :visible="show" label="Info" />
```

---

### Problema: Brand nao aplicada

**Causa 1:** Prop `brand` nao fornecida.
**Causa 2:** `data-brand` nao esta em elemento pai.

**Solucao:**
```vue
<!-- Via prop -->
<DssTooltip brand="hub" :visible="show" />

<!-- Via contexto -->
<div data-brand="hub">
  <DssTooltip :visible="show" />
</div>
```

---

## Tabela de Paridade com Golden Context (DssBadge)

| Aspecto | Golden (DssBadge) | DssTooltip | Status | Justificativa |
|---------|-------------------|------------|--------|---------------|
| Natureza | Nao interativo | Nao interativo | IGUAL | — |
| `role` | `status` | `tooltip` | DIFERENTE | Semantica ARIA distinta |
| `aria-live` | `polite` | N/A | DIFERENTE | Tooltip usa `aria-describedby` (padrao WAI-ARIA) |
| Touch target | N/A (externo) | N/A (externo) | IGUAL | Opcao B — nao interativo |
| `::before` | Nao utilizado | PROIBIDO | IGUAL | — |
| `::after` | Nao utilizado | Nao utilizado | IGUAL | — |
| 4 camadas | Sim | Sim | IGUAL | — |
| Token First | Sim | Sim | IGUAL | — |
| Cores | Via utilitarias | Via utilitarias | IGUAL | — |
| Brands | hub/water/waste | hub/water/waste | IGUAL | — |
| Estados interativos | N/A | N/A | IGUAL | — |
| Variantes | 5 | 1 (multi-line) | DIFERENTE | Escopo minimo Fase 1 |
| Default color | `primary` | `dark` | DIFERENTE | Tooltip = informacao contextual (fundo escuro e padrao) |
| Font size | xs (12px) | sm (14px) | DIFERENTE | Texto informativo requer legibilidade maior |
| Font weight | medium (500) | regular (400) | DIFERENTE | Texto corrido vs. label curto |
| Border radius | full (pill) | md | DIFERENTE | Tooltip nao e pill shape |
| Slots | default | default | IGUAL | — |
| Props | 11 | 7 | DIFERENTE | Escopo minimo |
| Dark mode | Sim | Sim | IGUAL | — |
| High contrast | Sim | Sim | IGUAL | — |
| Forced colors | Sim | Sim | IGUAL | — |
| Reduced motion | Sim | Sim | IGUAL | — |
| Print | N/A | Hidden | DIFERENTE | Tooltip = informacao de interface (nao imprimivel) |

---

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [DSS Token Reference](../../../docs/reference/DSS_TOKEN_REFERENCE.md)
- [DSS Golden Components](../../../docs/governance/DSS_GOLDEN_COMPONENTS.md)
- [DssBadge Documentation](../DssBadge/DssBadge.md)

---

## Licenca

Propriedade da Jtech

---

## Apendice: Checklist de Conformidade

### Funcionalidade
- [x] Variante default (fundo escuro, texto claro) implementada
- [x] Variante multi-line implementada
- [x] 8 cores semanticas suportadas
- [x] Brandabilidade via prop e contexto
- [x] Slot default para conteudo customizado
- [x] Visibilidade controlada externamente

### Acessibilidade
- [x] role="tooltip" implementado
- [x] aria-label implementado
- [x] Padrao aria-describedby documentado
- [x] prefers-contrast: more suportado
- [x] prefers-reduced-motion: reduce suportado
- [x] forced-colors: active suportado

### Brandabilidade
- [x] Prop brand funcional (hub, water, waste)
- [x] Contexto data-brand funcional
- [x] Cores de brand aplicadas

### TypeScript
- [x] Props totalmente tipadas
- [x] Tipos exportados

### Conformidade DSS
- [x] Arquitetura em 4 camadas completa
- [x] Nenhum token especifico de componente (--dss-tooltip-*)
- [x] Valores hardcoded documentados como excecoes (3 excecoes)
- [x] Paridade com Golden documentada
- [x] Anti-patterns documentados (5 anti-patterns)
- [x] Comportamentos implicitos declarados

---

**Ultima atualizacao:** Fevereiro 2026
**Versao:** DSS v2.2.0
**Status:** Documentacao Template 13.1
