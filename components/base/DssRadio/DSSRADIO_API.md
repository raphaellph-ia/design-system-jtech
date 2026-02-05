# DSSRADIO_API.md — Referencia Tecnica

**Versao:** 1.0.0 | **DSS:** v2.2 | **Classificacao:** Compact Control interativo

---

## Importacao

```typescript
// Via barrel export
import { DssRadio } from '@dss/components/base/DssRadio'

// Via import direto
import DssRadio from '@dss/components/base/DssRadio/DssRadio.vue'
```

---

## Props — Referencia Completa

### Grupo: Valor / Modelo

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `modelValue` | `any` | `undefined` | Valor atual do grupo de radios. Bindado via `v-model`. |
| `val` | `any` | `undefined` | Valor que este radio individual representa. Quando `modelValue === val`, o radio esta selecionado. |
| `name` | `string` | `undefined` | Nome do grupo HTML. Radios com o mesmo `name` formam um grupo mutuamente exclusivo. **Obrigatorio para navegacao por teclado.** |

### Grupo: Conteudo

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `label` | `string` | `undefined` | Texto do label visivel. Alternativa: usar slot `default`. |
| `leftLabel` | `boolean` | `false` | Quando `true`, posiciona o label a esquerda do controle visual. |

### Grupo: Visual

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `color` | `RadioColor` | `'primary'` | Cor semantica do indicador quando selecionado. |
| `size` | `RadioSize` | `'md'` | Tamanho do controle. Afeta min-height, dimensoes do circulo e fonte. |

### Grupo: Estados

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `disable` | `boolean` | `false` | Desabilita interacao. Aplica `opacity: 0.4`, `cursor: not-allowed`, `aria-disabled="true"`, `tabindex="-1"`. |
| `dense` | `boolean` | `false` | Modo compacto. Remove touch target expandido (`::before { display: none }`). |
| `error` | `boolean` | `false` | Estado de erro. Aplica borda vermelha e `aria-invalid="true"`. |
| `errorMessage` | `string` | `undefined` | Mensagem de erro. Requer `error=true`. Renderiza `<span role="alert">` vinculado via `aria-describedby`. |

### Grupo: Brandabilidade

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `brand` | `RadioBrand \| null` | `null` | Brand Sansys. Ativa sistema de cores de marca via `_brands.scss`. Mutuamente exclusivo com CSS inline. |

### Grupo: Acessibilidade

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `tabindex` | `number \| string \| null` | `null` | Indice de tabulacao. Automaticamente `-1` quando `disable=true`. Default `0` quando nao definido. |
| `ariaLabel` | `string` | `undefined` | Label acessivel. Usar quando o label visual nao e suficiente para screen readers. |

---

## Tipos TypeScript

```typescript
type RadioColor =
  | 'primary' | 'secondary' | 'tertiary' | 'accent'
  | 'positive' | 'negative' | 'warning' | 'info'

type RadioSize = 'xs' | 'sm' | 'md' | 'lg'

type RadioBrand = 'hub' | 'water' | 'waste'
```

---

## Eventos

| Evento | Payload | Quando Emitido |
|--------|---------|----------------|
| `update:modelValue` | `any` (valor da prop `val`) | Ao clicar/selecionar o radio |

**Comportamento:**
- Emite o valor da prop `val` do radio clicado
- Nao emite quando `disable=true`
- Compativel com `v-model`

---

## Slots

| Slot | Descricao | Props de Escopo |
|------|-----------|-----------------|
| `default` | Conteudo customizado do label | Nenhuma |

**Prioridade:** Slot `default` tem prioridade sobre prop `label`.

---

## Expose (API Publica)

| Nome | Tipo | Descricao |
|------|------|-----------|
| `inputRef` | `Ref<HTMLInputElement \| null>` | Referencia direta ao `<input type="radio">` nativo |
| `focus()` | `() => void` | Foca o input programaticamente |
| `blur()` | `() => void` | Remove foco do input programaticamente |

---

## Sistema de Cores

### Sem Brand (classes utilitarias Quasar)

Quando `brand` nao esta definido, a cor e aplicada via classe utilitaria Quasar no controle:

```
.dss-radio__control.text-primary   (quando checked e color="primary")
.dss-radio__control.text-secondary (quando checked e color="secondary")
```

### Com Brand (SCSS _brands.scss)

Quando `brand` esta definido:

1. Classe `dss-radio--{color}` e adicionada ao root
2. `data-brand="{brand}"` e adicionado ao root
3. `_brands.scss` aplica cores via seletores:
   ```scss
   [data-brand='hub'] .dss-radio.dss-radio--primary { ... }
   .dss-radio[data-brand='hub'].dss-radio--primary { ... }
   ```

---

## Classes CSS

### Elemento Raiz

| Classe | Condicao |
|--------|----------|
| `dss-radio` | Sempre |
| `dss-radio--{size}` | Sempre (xs, sm, md, lg) |
| `dss-radio--{color}` | Quando `brand` esta definido |
| `dss-radio--checked` | Quando selecionado |
| `dss-radio--disabled` | Quando `disable=true` |
| `dss-radio--dense` | Quando `dense=true` |
| `dss-radio--error` | Quando `error=true` |
| `dss-radio--left-label` | Quando `leftLabel=true` |

### Elementos Internos

| Classe | Elemento | Descricao |
|--------|----------|-----------|
| `dss-radio__native` | `<input>` | Input nativo (sr-only) |
| `dss-radio__control` | `<span>` | Circulo externo visual |
| `dss-radio__control--checked` | `<span>` | Quando selecionado |
| `dss-radio__control--focused` | `<span>` | Quando focado |
| `dss-radio__dot` | `<span>` | Circulo interno (indicador) |
| `dss-radio__label` | `<span>` | Texto do label |
| `dss-radio__label--left` | `<span>` | Label posicionado a esquerda |
| `dss-radio__error` | `<span>` | Mensagem de erro |

---

## Governanca

### Permitido
- Usar cores semanticas via prop `color`
- Usar brands via prop `brand`
- Customizar label via slot `default`
- Agrupar via prop `name`

### Proibido
- Cores via CSS inline
- Tokens especificos de componente (`--dss-radio-*`)
- Icones customizados no indicador
- Sobrescrever `::before` (reservado para touch target)
- Usar sem `name` em grupo

---

## Subset Controlado

Este componente implementa um subset controlado da API do Quasar `q-radio`. Props e funcionalidades nao listadas nesta documentacao NAO sao suportadas.

Para referencia completa das diferencas, consultar `DssRadio.md` secao 1.
