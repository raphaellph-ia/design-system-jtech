# DssAvatar

**Design System Sansys - Componente de Avatar**

> **Documentacao Template 13.1 do DSS**
> Este documento segue o Template 13.1 oficial para documentacao de componentes do Design System Sansys.
> Estrutura obrigatoria: 13 secoes padronizadas com tokens rastreaveis, anti-patterns e governanca.

---

## 1. Visao Geral

### Nome do Componente
`DssAvatar`

### Descricao
Wrapper DSS baseado no QAvatar, com API publica governada pelo DSS. Componente de avatar para representacao visual de usuarios, entidades ou placeholders com suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca (Hub/Water/Waste).

### Tipo do Componente
**Basico** - Wrapper DSS que encapsula funcionalidades do Quasar Framework, expondo apenas a API aprovada pelo Design System.

### Caracteristicas Principais

- **Acessibilidade WCAG 2.1 AA completa** - Touch targets, focus rings, ARIA labels, navegacao por teclado
- **Brandabilidade multi-marca** - Suporte automatico a Hub, Water, Waste
- **5 tamanhos predefinidos** - xs (32px), sm (40px), md (48px), lg (64px), xl (80px)
- **3 formas** - Circular (padrao), Rounded, Square
- **Status indicators** - online, away, busy, offline
- **Conteudo flexivel** - Icones, texto/iniciais, imagens
- **TypeScript + Composition API** - Totalmente tipado com composables reutilizaveis
- **API governada pelo DSS** - Subconjunto curado das props do QAvatar + extensoes DSS exclusivas

### Classificacao de Recursos

| Categoria | Recursos | Significado |
|-----------|----------|-------------|
| Recomendado | `color`, `size` (enum), `icon`, `ariaLabel`, `brand`, IDs unicos | Padroes estabelecidos pelo DSS - USE sempre que aplicavel |
| Opcional | `square`, `rounded`, `status`, `textColor`, `fontSize`, slots | Funcionalidades disponiveis - USE conforme necessidade do caso de uso |
| Fora de escopo DSS | Animacoes customizadas, badges integrados, upload de imagem | Funcionalidades NAO governadas pelo DSS - implemente externamente se necessario |

> **Nota:** Esta classificacao reflete a **governanca do DSS**, nao limitacoes tecnicas. Recursos "fora de escopo" podem ser implementados via wrappers ou componentes compostos.

---

## 2. Quando Usar / Quando Nao Usar

### Quando Usar

- **Perfis de usuario**: Foto ou iniciais do usuario
- **Listas de contatos**: Identificacao visual em listas
- **Comentarios**: Avatar ao lado de mensagens
- **Cards de perfil**: Destaque visual em cards
- **Menus de usuario**: Avatar no header/toolbar
- **Grupos de usuarios**: Avatares empilhados
- **Entidades**: Logos de empresas/organizacoes
- **Placeholders**: Icone padrao quando sem foto

### Quando NAO Usar

- **Imagens de conteudo**: Use `<img>` ou `DssImage`
- **Icones de acao**: Use `DssIcon` ou `DssButton` com icone
- **Thumbnails de galeria**: Use componentes de galeria
- **Badges standalone**: Use `DssBadge`
- **Botoes circulares**: Use `DssButton round`

---

## 3. Anatomia do Componente

### Estrutura Visual

```
+-------------------------------------+
|   +---------------------------+     |
|   |                           |     |
|   |    [Icon/Content/Img]     |     |
|   |                           |     |
|   +---------------------------+     |
|                            [Status] |
+-------------------------------------+
```

### Partes Internas

1. **Root (`.dss-avatar`)**: Container principal com forma e tamanho
2. **Icon (`.dss-avatar__icon`)**: Icone Material Icons (quando prop `icon`)
3. **Content (`.dss-avatar__content`)**: Conteudo do slot (texto, imagem, etc.)
4. **Status (`.dss-avatar__status`)**: Indicador de status (quando prop `status`)

### Slots Disponiveis

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo principal do avatar | Texto/iniciais, imagens, elementos customizados |

### Subcomponentes DSS Utilizados

**Nenhum** - DssAvatar e um componente atomico que nao depende de outros componentes DSS.

**Dependencias externas:**
- Vue 3 (Composition API)
- Material Icons (para prop `icon`)

---

## 4. Tokens Utilizados

O **DssAvatar** consome tokens de **multiplas categorias** do Design System Sansys.

### Referencia Completa de Tokens

**Documento oficial:** [`DSS_TOKEN_REFERENCE.md`](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

### Categorias de Tokens Consumidas

| Categoria | Tokens Usados | Aplicacao no DssAvatar |
|-----------|---------------|------------------------|
| **Cores Semanticas** | `--dss-positive`, `--dss-warning`, `--dss-negative`, `--dss-neutral-*` | Status indicators, cores de fundo |
| **Cores de Texto** | `--dss-text-primary`, `--dss-text-inverse` | Texto/iniciais dentro do avatar |
| **Cores Neutras** | `--dss-neutral-200`, `--dss-neutral-700` | Background padrao |
| **Brands** | `--dss-brand-hub-*`, `--dss-brand-water-*`, `--dss-brand-waste-*` | Bordas e status por brand |
| **Espacamento** | `--dss-touch-target-sm/md/xl` | Tamanhos predefinidos (32, 48, 64px) |
| **Tipografia** | `--dss-font-family-base`, `--dss-font-size-xs/sm/md/lg/xl` | Fonte e tamanho do texto |
| **Bordas** | `--dss-border-radius-full`, `--dss-border-radius-md` | Forma circular/rounded |
| **Acessibilidade** | `--dss-focus-ring` | Focus ring para avatares clicaveis |
| **Motion** | `--dss-transition-base` | Transicoes de hover/focus |

### Observacoes Importantes

- **Touch Target**: Tamanhos xs/sm podem nao atender WCAG 2.5.5 AAA (48px minimo)
- **Brandabilidade**: Quando `brand` e aplicado, borda colorida identifica a marca
- **Status**: Cores de status seguem tokens semanticos (positive, warning, negative, neutral)

---

## 5. API Publica

### Props de Tamanho

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `size` | String | `'md'` | `xs`, `sm`, `md`, `lg`, `xl` ou CSS unit | Tamanho do avatar |
| `fontSize` | String | `null` | CSS unit | Tamanho da fonte customizado |

### Props Visuais

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `color` | String | `null` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo |
| `textColor` | String | `null` | Qualquer cor semantica | Cor do texto/icone |
| `brand` | String | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

### Props de Conteudo

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `icon` | String | `null` | Nome do icone Material Icons |

### Props de Forma

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `square` | Boolean | `false` | Avatar quadrado (border-radius: 0) |
| `rounded` | Boolean | `false` | Avatar arredondado (border-radius: 8px) |

### Props de Status

| Prop | Type | Default | Valores | Descricao |
|------|------|---------|---------|-----------|
| `status` | String | `null` | `online`, `away`, `busy`, `offline` | Indicador de status |

### Props de Acessibilidade

| Prop | Type | Default | Descricao |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Label ARIA para screen readers |
| `alt` | String | `undefined` | Alt text para imagens no slot |

### Eventos

| Event | Payload | Descricao |
|-------|---------|-----------|
| `click` | `MouseEvent` | Emitido quando o avatar e clicado |

### Slots

| Slot | Descricao | Uso Recomendado |
|------|-----------|-----------------|
| `default` | Conteudo principal | Iniciais, imagens, elementos customizados |

### Expose (Ref)

| Ref | Type | Descricao |
|-----|------|-----------|
| `rootRef` | `Ref<HTMLDivElement \| null>` | Referencia direta ao elemento root |

---

## 6. Estados

### Tabela Unica de Estados

| Estado | Aparencia | Interacao | Tokens Aplicados |
|--------|-----------|-----------|------------------|
| **Default** | Circular, fundo neutro, conteudo centralizado | Nao interativo | `--dss-neutral-200`, `--dss-neutral-700` |
| **Com Cor** | Fundo colorido, texto branco | - | `bg-{color}`, `text-white` |
| **Com Status** | Indicador circular no canto inferior direito | - | `--dss-positive/warning/negative/neutral-400` |
| **Hover** (clicavel) | Escala 1.05, sombra | Cursor pointer | `--dss-shadow-md` |
| **Active** (clicavel) | Escala 0.95 | Feedback de clique | - |
| **Focus** (clicavel) | Focus ring visivel | Focavel por teclado | `--dss-focus-ring` |

### Prioridade de Estados

1. **Forma** - square > rounded > circular (padrao)
2. **Cor** - color prop > classes utilitarias > neutro padrao
3. **Status** - Sempre visivel se fornecido
4. **Brand** - Borda colorida sobrepoe borda padrao

---

## 7. Variantes

### Tamanhos

| Tamanho | Dimensoes | Font Size | Icon Size | Uso Recomendado |
|---------|-----------|-----------|-----------|-----------------|
| `xs` | 32x32px | 12px | 16px | Listas compactas, comentarios |
| `sm` | 40x40px | 14px | 20px | Listas, menus |
| `md` | 48x48px | 16px | 24px | Padrao, cards |
| `lg` | 64x64px | 18px | 32px | Perfis, destaque |
| `xl` | 80x80px | 20px | 48px | Paginas de perfil, hero |

### Formas

| Forma | CSS | Uso Recomendado |
|-------|-----|-----------------|
| **Circular** (padrao) | `border-radius: 50%` | Pessoas, usuarios |
| **Rounded** | `border-radius: 8px` | Empresas, grupos |
| **Square** | `border-radius: 0` | Logos, entidades |

### Status Indicators

| Status | Cor | Uso |
|--------|-----|-----|
| `online` | Verde (`--dss-positive`) | Usuario disponivel |
| `away` | Amarelo (`--dss-warning`) | Usuario ausente |
| `busy` | Vermelho (`--dss-negative`) | Usuario ocupado |
| `offline` | Cinza (`--dss-neutral-400`) | Usuario offline |

---

## 8. Brandabilidade

### Sistema de Brandabilidade

O DssAvatar suporta **duas formas** de aplicar brandabilidade:

#### Metodo 1: Prop `brand`

```vue
<template>
  <!-- Hub (Laranja) -->
  <DssAvatar brand="hub" icon="person" />

  <!-- Water (Azul) -->
  <DssAvatar brand="water" icon="person" />

  <!-- Waste (Verde) -->
  <DssAvatar brand="waste" icon="person" />
</template>
```

#### Metodo 2: Contexto `data-brand`

```vue
<template>
  <div data-brand="hub">
    <DssAvatar icon="person" />
    <!-- Herda brand Hub automaticamente -->
  </div>
</template>
```

### Cores de Brand

| Brand | Cor da Borda | Token |
|-------|--------------|-------|
| **Hub** | Laranja | `--dss-brand-hub-primary` |
| **Water** | Azul | `--dss-brand-water-primary` |
| **Waste** | Verde | `--dss-brand-waste-primary` |

---

## 9. Acessibilidade

### Conformidade WCAG 2.1 AA

| Criterio WCAG | Nivel | Como Implementado |
|---------------|-------|-------------------|
| **1.1.1 Conteudo Nao-Textual** | A | `aria-label` para avatares com icone |
| **1.4.3 Contraste (Minimo)** | AA | Cores semanticas garantem contraste |
| **2.4.7 Foco Visivel** | AA | Focus ring em avatares clicaveis |
| **4.1.2 Nome, Funcao, Valor** | A | `role="img"` quando tem aria-label |

### ARIA Implementado

```vue
<DssAvatar
  icon="person"
  aria-label="Avatar de Joao Silva"
  color="primary"
/>
<!-- Gera: role="img" aria-label="Avatar de Joao Silva" -->
```

### Avatares com Status

```vue
<DssAvatar status="online">
  JD
</DssAvatar>
<!-- Status tem aria-label="Status: online" -->
```

### Avatares Clicaveis

```vue
<DssAvatar @click="openProfile">
  JD
</DssAvatar>
<!-- Deve adicionar aria-label descrevendo a acao -->
```

---

## 10. Exemplos de Uso

### Instalacao

```typescript
import { DssAvatar } from '@/dss/components/base/DssAvatar'
import type { AvatarProps, AvatarExpose } from '@/dss/components/base/DssAvatar/types/avatar.types'
```

### Uso Basico

```vue
<template>
  <!-- Com iniciais -->
  <DssAvatar color="primary">JD</DssAvatar>

  <!-- Com icone -->
  <DssAvatar icon="person" color="secondary" />

  <!-- Com imagem -->
  <DssAvatar>
    <img src="/avatar.jpg" alt="Joao Silva" />
  </DssAvatar>
</template>
```

### Tamanhos

```vue
<template>
  <DssAvatar size="xs" color="primary">XS</DssAvatar>
  <DssAvatar size="sm" color="primary">SM</DssAvatar>
  <DssAvatar size="md" color="primary">MD</DssAvatar>
  <DssAvatar size="lg" color="primary">LG</DssAvatar>
  <DssAvatar size="xl" color="primary">XL</DssAvatar>

  <!-- Tamanho customizado -->
  <DssAvatar size="100px" color="primary">100</DssAvatar>
</template>
```

### Formas

```vue
<template>
  <!-- Circular (padrao) -->
  <DssAvatar color="primary">JD</DssAvatar>

  <!-- Arredondado -->
  <DssAvatar rounded color="secondary">AB</DssAvatar>

  <!-- Quadrado -->
  <DssAvatar square color="accent">
    <img src="/logo.png" alt="Empresa" />
  </DssAvatar>
</template>
```

### Com Status

```vue
<template>
  <DssAvatar status="online" color="primary">JD</DssAvatar>
  <DssAvatar status="away" color="secondary">AB</DssAvatar>
  <DssAvatar status="busy" color="accent">XY</DssAvatar>
  <DssAvatar status="offline" color="info">ZZ</DssAvatar>
</template>
```

### Grupo de Avatares

```vue
<template>
  <div class="dss-avatar-group">
    <DssAvatar color="primary">JD</DssAvatar>
    <DssAvatar color="secondary">AB</DssAvatar>
    <DssAvatar color="accent">XY</DssAvatar>
    <DssAvatar color="info">+5</DssAvatar>
  </div>
</template>
```

### Brandability

```vue
<template>
  <!-- Via prop -->
  <DssAvatar brand="hub" icon="person" />
  <DssAvatar brand="water" icon="person" />
  <DssAvatar brand="waste" icon="person" />

  <!-- Via contexto -->
  <div data-brand="hub">
    <DssAvatar icon="person" />
  </div>
</template>
```

---

## 11. Anti-patterns

### Usos Incorretos

#### 1. Avatar Sem Identificacao Acessivel

```vue
<!-- INCORRETO -->
<DssAvatar icon="person" />

<!-- CORRETO -->
<DssAvatar icon="person" aria-label="Avatar do usuario" />
```

**Por que:** Screen readers precisam de contexto.

---

#### 2. Imagem Sem Alt Text

```vue
<!-- INCORRETO -->
<DssAvatar>
  <img src="/photo.jpg" />
</DssAvatar>

<!-- CORRETO -->
<DssAvatar>
  <img src="/photo.jpg" alt="Foto de Joao Silva" />
</DssAvatar>
```

**Por que:** WCAG 1.1.1 exige alternativas textuais.

---

#### 3. Status Sem Contexto

```vue
<!-- INCORRETO - status sem significado claro -->
<DssAvatar status="online" />

<!-- CORRETO - com iniciais ou identificacao -->
<DssAvatar status="online" color="primary" aria-label="Joao Silva - Online">
  JD
</DssAvatar>
```

---

#### 4. Cores Hardcoded

```vue
<!-- INCORRETO -->
<DssAvatar style="background-color: #ff0000;" />

<!-- CORRETO -->
<DssAvatar color="negative" />
```

**Por que:** Bypassa tokens e brandabilidade.

---

### Combinacoes Nao Permitidas

| Combinacao | Por que | Alternativa |
|------------|---------|-------------|
| `square` + `rounded` | Conflito de forma | Use apenas um |
| `icon` + slot com conteudo | Icone tem prioridade | Use apenas um |

---

## 12. Governanca do Componente

### O Que E Extensao Valida

**Permitido SEM aprovacao:**
- Uso de props publicas documentadas
- Customizacao via tokens CSS (`--dss-*`)
- Uso de slot para conteudo customizado
- Composicao com outros componentes (ex: DssBadge sobre avatar)

### O Que Exige Novo Componente

**Requer discussao com Design System:**
- Adicionar nova forma (ex: hexagono)
- Modificar comportamento de status
- Criar wrapper especializado (ex: `DssAvatarUpload`)
- Adicionar animacoes de status

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

### Problema: Status nao aparece

**Causa:** Prop `status` nao fornecida ou valor invalido.

**Solucao:**
```vue
<!-- Use valores validos -->
<DssAvatar status="online">JD</DssAvatar>
<!-- Valores: online, away, busy, offline -->
```

---

### Problema: Borda de brand nao aparece

**Causa 1:** Prop `brand` nao fornecida.

**Causa 2:** `data-brand` nao esta em elemento pai.

**Solucao:**
```vue
<!-- Via prop -->
<DssAvatar brand="hub" />

<!-- Via contexto -->
<div data-brand="hub">
  <DssAvatar />
</div>
```

---

### Problema: Icone nao aparece

**Causa:** Material Icons nao carregado.

**Solucao:** Certifique-se de que Material Icons esta incluido:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

---

### Problema: Imagem nao preenche o avatar

**Causa:** Imagem sem `object-fit`.

**Solucao:** O CSS do componente ja aplica `object-fit: cover` em imagens dentro do slot.

---

## Recursos

- [Documentacao Oficial do Quasar QAvatar](https://quasar.dev/vue-components/avatar)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Icons](https://fonts.google.com/icons)
- [DSS Token Reference](../../../docs/reference/DSS_TOKEN_REFERENCE.md)

---

## Licenca

Propriedade da Jtech

---

## Apendice: Checklist de Conformidade

### Funcionalidade
- [x] Todos os 5 tamanhos implementados
- [x] Todas as 3 formas implementadas
- [x] Status indicators funcionais
- [x] Brandabilidade via prop e contexto
- [x] Slot default para conteudo customizado

### Acessibilidade
- [x] aria-label implementado
- [x] role="img" quando tem aria-label
- [x] Status com aria-label
- [x] Focus ring para avatares clicaveis

### Brandabilidade
- [x] Prop brand funcional (hub, water, waste)
- [x] Contexto data-brand funcional
- [x] Borda colorida por brand

### TypeScript
- [x] Props totalmente tipadas
- [x] Emits tipados
- [x] Expose tipado

---

**Ultima atualizacao:** Janeiro 2026
**Versao:** DSS v2.3.0
**Status:** Documentacao Template 13.1
**Changelog:** Ver [DOCUMENTATION_CHANGELOG.md](./DOCUMENTATION_CHANGELOG.md)
