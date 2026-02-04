# DssChip

Status: ✅ Selo DSS v2.2
Auditoria Final: 27/01/2026
Golden Component: DssChip (self — referencia normativa)
Classificação: Compact Control interativo

Wrapper DSS baseado no QChip, com API pública governada pelo Design System Sansys.

> O DSS curou deliberadamente esta API para garantir consistência visual e brandabilidade corporativa.

---

## 1. Visão Geral

O **DssChip** é um componente de chip/tag para exibição de informações compactas, tags, filtros selecionáveis e elementos removíveis.

**Responsabilidade principal:** Representar visualmente itens discretos de informação em formato compacto, com suporte opcional a interação (clique, seleção, remoção).

---

## 2. Quando Usar / Quando NÃO Usar

### Quando Usar

- Tags de categorização de conteúdo
- Badges de status compactos
- Filtros selecionáveis em listas/tabelas
- Inputs de múltiplos valores (tag inputs)
- Ações secundárias compactas

### Quando NÃO Usar

- **Botões de ação primária** → Use `DssButton`
- **Notificações com ações** → Use `DssBanner` ou `DssNotify`
- **Contadores numéricos simples** → Use `DssBadge`
- **Avatares com iniciais** → Use `DssAvatar`
- **Navegação principal** → Use `DssTab` ou `DssNavigation`

---

## 3. Anatomia do Componente

```
┌─────────────────────────────────────────────────┐
│  [icon] [label/content] [icon-right] [remove]   │
└─────────────────────────────────────────────────┘
```

### Partes do Componente

| Parte | Descrição | Obrigatório |
|-------|-----------|-------------|
| **Container** | Frame principal com padding e bordas | Sim |
| **Icon** | Ícone opcional à esquerda (slot `icon`) | Não |
| **Label** | Texto principal ou conteúdo (slot `default`) | Sim* |
| **Icon Right** | Ícone opcional à direita (slot `icon-right`) | Não |
| **Remove Button** | Botão de remoção (quando `removable`) | Não |

*Obrigatório: `label` ou slot `default` deve existir, exceto quando há `aria-label`.

---

## 4. Tokens Utilizados

> O componente NÃO aceita valores arbitrários de cores, espaçamentos ou tipografia. Todos os valores são derivados dos tokens DSS.

| Categoria | Tokens Usados | Onde Encontrar | Aplicação no Componente |
|-----------|---------------|----------------|-------------------------|
| **Altura Visual** | `--dss-compact-control-height-xs/sm/md/lg` | [Seção 7.13](../../docs/reference/DSS_TOKEN_REFERENCE.md#713-compact-controls---alturas-visuais) | **Altura VISUAL por size** |
| **Touch Target** | `--dss-touch-target-min` | [Seção 7.7](../../docs/reference/DSS_TOKEN_REFERENCE.md#77-touch-targets) | Touch target 48px via ::before |
| **Espaçamento** | `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-2_5`, `--dss-spacing-3`, `--dss-spacing-4` | [Seção 1.1](../../docs/reference/DSS_TOKEN_REFERENCE.md#11-escala-base) | Padding interno por tamanho |
| **Tipografia** | `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-size-sm`, `--dss-font-size-md` | [Seção 6](../../docs/reference/DSS_TOKEN_REFERENCE.md#6-tipografia) | Fonte e tamanhos de texto |
| **Border Radius** | `--dss-radius-sm`, `--dss-radius-full` | [Seção 1.9](../../docs/reference/DSS_TOKEN_REFERENCE.md#19-border-radius) | Formato round/square |
| **Border Width** | `--dss-border-width-md` | [Seção 8.1](../../docs/reference/DSS_TOKEN_REFERENCE.md#81-border-widths) | Variante outline |
| **Opacidade** | `--dss-opacity-disabled`, `--dss-opacity-hover`, `--dss-opacity-active` | [Seção 2.4](../../docs/reference/DSS_TOKEN_REFERENCE.md#24-opacidade) | Estados interativos |
| **Motion** | `--dss-duration-150`, `--dss-duration-200`, `--dss-easing-standard` | [Seção 5](../../docs/reference/DSS_TOKEN_REFERENCE.md#5-motion-e-animação) | Transições de hover/focus |
| **Focus** | `--dss-focus-ring`, `--dss-focus-ring-offset` | [Seção 7.5](../../docs/reference/DSS_TOKEN_REFERENCE.md#75-focus-box-shadows) | Focus ring de acessibilidade |

### Mapeamento de Altura Visual por Size

| Prop `size` | Token Usado | Valor | Touch Target |
|-------------|-------------|-------|--------------|
| `xs` | `--dss-compact-control-height-xs` | 20px | Via ::before (48px) |
| `sm` | `--dss-compact-control-height-sm` | 24px | Via ::before (48px) |
| `md` | `--dss-compact-control-height-md` | 28px | Via ::before (48px) |
| `lg` | `--dss-compact-control-height-lg` | 32px | Via ::before (48px) |

> **⚠️ Altura Visual vs Touch Target**: A altura visual do chip é menor que 48px por razões estéticas. O touch target mínimo de 48×48px (WCAG 2.5.5) é garantido via pseudo-elemento `::before` invisível com `pointer-events: none`. O pseudo-elemento NÃO intercepta eventos de clique — ele existe apenas para ferramentas de acessibilidade medirem a área tocável. Consulte [DSS_IMPLEMENTATION_GUIDE.md - Touch Target vs Visual Height](../../docs/guides/DSS_IMPLEMENTATION_GUIDE.md#touch-target-vs-visual-height-wcag-255) para detalhes.

> **📖 Convenção de Pseudo-elementos**: `::before` é RESERVADO para touch target. Efeitos visuais (hover, active, selected na variante flat) usam `::after`. Consulte [DSS_COMPONENT_ARCHITECTURE.md - Convenção de Pseudo-elementos](../../docs/reference/DSS_COMPONENT_ARCHITECTURE.md#convenção-de-pseudo-elementos-normativa).

### Exceções Documentadas (Valores sem Token)

| Propriedade | Valores | Contexto | Justificativa |
|-------------|---------|----------|---------------|
| `filter: brightness()` | 0.85, 0.9, 0.92, 0.95 | Estados hover/active | Ajuste relativo à cor atual, não absoluto |
| `filter: brightness()` | 1.1, 1.2 | Dark mode | Inversão para fundos escuros |
| `filter: saturate()` | 1.2 | High contrast | Acessibilidade visual |
| `outline-offset` | 1px | Botão remover | Elemento compacto (16px) requer offset menor |

> Estes valores estão documentados nos arquivos SCSS com comentários explicativos. Não existem tokens DSS equivalentes porque operam de forma relativa ou são específicos de contextos de acessibilidade.

---

## 5. API Pública

### Props Governadas pelo DSS

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `String` | `''` | Texto do chip |
| `icon` | `String` | `''` | Ícone Material Icons à esquerda |
| `iconRight` | `String` | `''` | Ícone Material Icons à direita |
| `iconRemove` | `String` | `'cancel'` | Ícone do botão de remover |
| `iconSelected` | `String` | `'check'` | Ícone quando selecionado |
| `variant` | `'filled' \| 'outline' \| 'flat'` | `'filled'` | Variante visual |
| `color` | `String` | `'primary'` | Cor semântica DSS |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `round` | `Boolean` | `true` | Bordas pill (arredondadas) |
| `square` | `Boolean` | `false` | Bordas com radius mínimo |
| `selected` | `Boolean` | `false` | Estado de seleção |
| `disable` | `Boolean` | `false` | Desabilita interações |
| `clickable` | `Boolean` | `false` | Habilita clique |
| `removable` | `Boolean` | `false` | Exibe botão de remover |
| `dense` | `Boolean` | `false` | Versão compacta |
| `ripple` | `Boolean` | `true` | Efeito ripple |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand Sansys |
| `tabindex` | `Number \| String` | `null` | Ordem de tabulação |
| `ariaLabel` | `String` | `''` | Label de acessibilidade |
| `removeAriaLabel` | `String` | `'Remover'` | Aria-label do botão remover |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Emitido ao clicar (requer `clickable`) |
| `remove` | `MouseEvent` | Emitido ao clicar no botão remover |
| `update:selected` | `Boolean` | Para v-model do estado selecionado |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado (substitui `label`) |
| `icon` | Ícone customizado à esquerda |
| `icon-right` | Ícone customizado à direita |
| `icon-remove` | Ícone customizado do botão remover |

---

## 6. Estados

### Estados Suportados

| Estado | Classe CSS | Descrição |
|--------|------------|-----------|
| **Default** | `.dss-chip` | Estado padrão |
| **Hover** | `.dss-chip:hover` | Cursor sobre (se clickable) |
| **Focus** | `.dss-chip:focus-visible` | Focus ring visível |
| **Active** | `.dss-chip:active` | Sendo pressionado |
| **Selected** | `.dss-chip--selected` | Chip selecionado |
| **Disabled** | `.dss-chip--disabled` | Interações bloqueadas |

### Prioridade de Estados

```
disabled > selected > active > focus > hover > default
```

Quando `disabled=true`, todos os outros estados são ignorados visualmente.

---

## 7. Acessibilidade

O DssChip segue as diretrizes **WCAG 2.1 nível AA**.

### Recursos Implementados

| Critério | Implementação |
|----------|---------------|
| **Touch targets** | Áreas mínimas de 48x48px via `::before` (`--dss-touch-target-min`) |
| **Focus ring** | `--dss-border-width-md` com `--dss-focus-ring`, visível em `:focus-visible` |
| **ARIA** | `role="option"`, `aria-selected`, `aria-disabled` |
| **Keyboard** | Tab (foco), Enter/Space (ação), Delete (remover) |
| **Reduced motion** | Respeita `prefers-reduced-motion: reduce` |
| **High contrast** | Suporte a `prefers-contrast: more` |
| **Forced colors** | Compatível com Windows High Contrast Mode |

### Uso Obrigatório

```vue
<!-- Chip somente com ícone DEVE ter aria-label -->
<DssChip icon="notifications" aria-label="5 notificações não lidas" />

<!-- Chip removível com aria-label descritivo -->
<DssChip
  label="JavaScript"
  removable
  remove-aria-label="Remover tag JavaScript"
/>
```

---

## 8. Exemplos de Uso

### Exemplo Básico

```vue
<template>
  <DssChip label="Tag simples" />
  <DssChip label="Com ícone" icon="star" color="warning" />
  <DssChip label="Outline" variant="outline" color="primary" />
</template>
```

### Exemplo Avançado: Filtros Selecionáveis

```vue
<template>
  <div class="q-gutter-sm">
    <DssChip
      v-for="filter in filters"
      :key="filter.id"
      :label="filter.label"
      color="primary"
      variant="outline"
      clickable
      :selected="filter.active"
      icon-selected="check"
      @update:selected="toggleFilter(filter.id, $event)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filters = ref([
  { id: 1, label: 'Vue.js', active: false },
  { id: 2, label: 'TypeScript', active: true },
  { id: 3, label: 'SCSS', active: false }
])

function toggleFilter(id, selected) {
  const filter = filters.value.find(f => f.id === id)
  if (filter) filter.active = selected
}
</script>
```

### Exemplo com Brandabilidade

```vue
<template>
  <!-- Brand via prop -->
  <DssChip label="Hub" brand="hub" color="primary" />

  <!-- Brand via contexto -->
  <div data-brand="water">
    <DssChip label="Water" color="primary" />
  </div>
</template>
```

> Para detalhes das paletas de cores por brand, consulte [`DSS_TOKEN_REFERENCE.md - Seção 2.2`](../../docs/reference/DSS_TOKEN_REFERENCE.md#22-brand-palettes).

---

## 9. Anti-patterns

### Uso Incorreto

| Anti-pattern | Por quê é incorreto | Alternativa Correta |
|--------------|---------------------|---------------------|
| `style="background: #FF5722"` | Cores hardcoded quebram brandabilidade | `color="warning"` |
| Criar `_colors.scss` para chips | Duplica tokens e quebra governança | Usar tokens existentes |
| Chip sem `aria-label` (icon-only) | Inacessível para leitores de tela | Sempre incluir `aria-label` |
| Usar como botão de ação primária | Chip não é call-to-action | Usar `DssButton` |
| `clickable` sem handler | Chip clicável sem ação é confuso | Adicionar `@click` ou remover prop |

---

## 10. Troubleshooting

### Problema: Chip não responde a cliques

**Causa:** Falta da prop `clickable`.

**Solução:**
```vue
<!-- Adicionar clickable -->
<DssChip label="Clicável" clickable @click="handleClick" />
```

### Problema: Cores de brand não aplicadas

**Causa:** Brand não definido no contexto ou via prop.

**Solução:**
```vue
<!-- Via prop -->
<DssChip label="Hub" brand="hub" color="primary" />

<!-- Via contexto (pai com data-brand) -->
<div data-brand="hub">
  <DssChip label="Hub" color="primary" />
</div>
```

### Problema: Focus ring não aparece

**Causa:** Possível override de estilos ou `:focus` em vez de `:focus-visible`.

**Solução:** O componente usa `:focus-visible` por padrão. Verificar se não há CSS externo sobrescrevendo.

---

## 11. Governança do Componente

### Extensões Permitidas

- Novos valores para prop `color` (se adicionados ao DSS)
- Novos tamanhos (`size`) seguindo escala de tokens
- Slots adicionais para customização controlada

### Extensões Proibidas

- Criar tokens específicos de componente (`--dss-chip-*`)
- Adicionar props que aceitem valores arbitrários de cor/tamanho
- Bypass de brandabilidade via estilos inline

### Critérios para Evolução

Qualquer modificação deve:
1. Manter conformidade com tokens DSS existentes
2. Preservar acessibilidade WCAG 2.1 AA
3. Ser compatível com sistema de brandabilidade (Hub/Water/Waste)
4. Passar pela arquitetura de 4 camadas

---

## Recursos Adicionais

- [DSSCHIP_API.md](./DSSCHIP_API.md) - Referência técnica completa
- [DssChip.example.vue](./DssChip.example.vue) - Showcase visual
- [DSS_TOKEN_REFERENCE.md](../../docs/reference/DSS_TOKEN_REFERENCE.md) - Catálogo de tokens
- [Documentação do QChip (Quasar)](https://quasar.dev/vue-components/chip) - Componente base

---

**Versão:** 1.0.0
**Data:** Janeiro 2025
**Governança:** Design System Sansys (DSS)
