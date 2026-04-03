# DssTabs — Documentação Normativa DSS v2.2

> **Fase:** 2 — Componente Composto  
> **Versão:** 1.0.0  
> **Status:** Pré-Auditoria  
> **Golden Reference:** DssBtnGroup  
> **Golden Context:** DssCard  
> **Dependências DSS:** DssTab (obrigatório)

---

## 1. Visão Geral

### O que é

O **DssTabs** é o container de navegação por abas do Design System Sansys. É um wrapper DSS governado sobre o `QTabs` do Quasar que:

- Gerencia o estado global de seleção (`v-model`) entre as abas filhas
- Controla a exibição de setas de navegação por scroll com tokens DSS
- Propaga contexto de marca (`[data-brand]`) para coloração automática dos `DssTab` filhos
- Bloqueia props nativas do Quasar que conflitam com a governança DSS

### Quando usar

- Quando o conteúdo pode ser organizado em seções distintas e paralelas
- Navegação entre views, painéis ou seções de uma mesma página
- Configurações organizadas por categoria (conta, segurança, notificações)
- Dashboards com múltiplas perspectivas de dados

### Quando NÃO usar

- Para navegação entre páginas diferentes — use router-links ou DssRouteTab (futuro)
- Para menus de ação — use DssMenu ou DssBtnDropdown
- Para steps sequenciais (wizard) — use um componente de stepper
- Quando há apenas 1 aba — um container simples é mais adequado

### Modelo Arquitetural

> **Quasar = camada de execução. DSS = camada de governança, semântica e tokenização.**

O DssTabs **não é** 100% compatível com a API do QTabs. É um wrapper DSS governado que expõe seletivamente as props semanticamente relevantes e bloqueia props que conflitam com a identidade visual DSS.

---

## 2. Anatomia do Componente

### Estrutura

```
<div class="dss-tabs">               ← root do componente DSS (sem role)
└── <q-tabs role="tablist">          ← QTabs interno (gerencia estado e teclado)
    ├── .q-tabs__content
    │   ├── DssTab (.dss-tab)
    │   ├── DssTab (.dss-tab)
    │   └── DssTab (.dss-tab)
    ├── .q-tabs__arrow--left         (seta de scroll — quando necessário)
    └── .q-tabs__arrow--right        (seta de scroll — quando necessário)
```

### Partes e responsabilidades

| Parte | Responsável | Descrição |
|-------|-------------|-----------|
| Container root | DssTabs | Layout e propagação de brand |
| Abas individuais | DssTab | Estados hover/focus/active/selected |
| Indicador ativo | DssTab + QTab | Linha abaixo da aba ativa |
| Setas de navegação | DssTabs (override) | Governadas por tokens DSS |
| Estado de seleção | QTabs (nativo) | Gerenciado via v-model |
| Navegação teclado | QTabs (nativo) | Setas ←/→ entre abas |

### Subcomponentes

| Subcomponente | Status | Uso |
|---------------|--------|-----|
| `DssTab` | ✅ Selado (Abr 2026) | Aba individual — obrigatório |
| `DssRouteTab` | ⚪ Futuro (Fase 2) | Aba com router-link |
| `DssTabPanels` | ⚪ Futuro (Fase 2) | Container de conteúdo das abas |

---

## 3. API Pública

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string \| number` | `undefined` | Aba ativa (v-model) |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Alinhamento das abas |
| `breakpoint` | `number` | `600` | Largura (px) para exibir setas de scroll |
| `vertical` | `boolean` | `false` | Layout vertical |
| `dense` | `boolean` | `false` | Modo compacto |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys |
| `ariaLabel` | `string` | `undefined` | Label acessível (aria-label) |

### Props Bloqueadas

| Prop QTabs | Motivo |
|------------|--------|
| `active-color` | Governada por tokens no DssTab (`--dss-action-primary`) |
| `active-bg-color` | Governada por tokens no DssTab |
| `indicator-color` | Governada por `currentColor` cascade no DssTab |
| `ripple` | Forçado `false` — DSS usa overlay `::after` no DssTab |
| `no-caps` | CSS/tokens DSS controlam tipografia no DssTab |

### Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Aba selecionada pelo usuário |

### Slots

| Slot | Tipo aceito | Descrição |
|------|-------------|-----------|
| `default` | `DssTab` | Abas do grupo |

---

## 4. Tokens Utilizados

> Todos os tokens referenciados no código SCSS — zero tokens fora desta lista.

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-text-subtle` | L2 base, L4 brands | Cor padrão das setas de navegação |
| `--dss-surface-hover` | L2 base, L4 states | Background das setas em hover |
| `--dss-surface-active` | L2 base, L4 states | Background das setas em active |
| `--dss-focus-ring` | L2 base | Cor do outline focus-visible nas setas |
| `--dss-border-width-md` | L2 base, L4 states | Espessura do outline de focus |
| `--dss-border-width-thick` | L4 states | Espessura do outline em high-contrast |
| `--dss-spacing-1` | L3 dense | Padding inline das setas em mode dense |
| `--dss-hub-600` | L4 brands | Cor das setas em brand Hub |
| `--dss-water-600` | L4 brands | Cor das setas em brand Water |
| `--dss-waste-600` | L4 brands | Cor das setas em brand Waste |

---

## 5. Estados Visuais

### Estados do Container (DssTabs)

| Estado | Aplicável | Descrição |
|--------|-----------|-----------|
| Default | ✅ | Container visível, sem interação direta |

### Estados NÃO Aplicáveis ao Container

| Estado | Justificativa |
|--------|---------------|
| `hover` | DssTabs não é interativo — pertence aos DssTab filhos |
| `focus` | O container não recebe foco — apenas os DssTab filhos |
| `active` | Estados de interação pertencem aos filhos |
| `disabled` | DssTabs não possui estado disabled próprio |
| `loading` | Container não carrega dados |
| `error` | Erro pertence ao conteúdo das abas, não ao container |
| `indeterminate` | Não aplicável a seleção de abas |

> **Nota:** As setas de navegação (`.q-tabs__arrow`) possuem hover/focus/active, mas são elementos internos do QTabs, não estados do DssTabs como componente.

---

## 6. Acessibilidade

### Papéis ARIA

| Elemento | Role | Gestão |
|----------|------|--------|
| `<div class="dss-tabs">` (root DSS) | nenhum (generic) | DSS — layout e brand |
| `<q-tabs>` (interno) | `tablist` | Nativo QTabs — recebe `aria-label` via prop |
| DssTab individual | `tab` | Nativo QTab |
| `aria-selected` | — | Gerenciado pelo QTabs via v-model |
| `aria-label` | — | Prop `ariaLabel` forwarded para o `<q-tabs>` interno |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `←` / `→` | Navega entre abas (nativo Quasar) |
| `Tab` | Move o foco para a aba ativa (skip outros tabs) |
| `Home` | Vai para a primeira aba (nativo Quasar) |
| `End` | Vai para a última aba (nativo Quasar) |

### Touch Target

O DssTabs é um container estrutural. Touch target (WCAG 2.5.5, `::before`) é responsabilidade exclusiva de cada `DssTab` filho (min. `--dss-touch-target-md`).

As setas de navegação (`.q-tabs__arrow`) usam touch target nativo do QTabs.

### Recomendações

- **Sempre** fornecer `aria-label` quando não houver label visual acima do grupo
- **Não** usar DssTabs para navegação entre páginas — use links/router
- Verificar que todas as abas têm `name` único e descritivo

---

## 7. Exemplos de Uso

### 7.1 Básico com v-model

```vue
<DssTabs v-model="aba" aria-label="Seções do relatório">
  <DssTab name="resumo" label="Resumo" />
  <DssTab name="detalhes" label="Detalhes" />
  <DssTab name="historico" label="Histórico" />
</DssTabs>
```

### 7.2 Alinhamento justify

```vue
<DssTabs v-model="aba" align="justify" aria-label="Navegação do painel">
  <DssTab name="visao-geral" label="Visão Geral" />
  <DssTab name="configuracoes" label="Configurações" />
  <DssTab name="relatorios" label="Relatórios" />
</DssTabs>
```

### 7.3 Muitas abas (scroll automático)

```vue
<!-- O QTabs exibe setas automaticamente quando o conteúdo excede a largura -->
<DssTabs v-model="aba" :breakpoint="0" aria-label="Módulos">
  <DssTab name="mod-1" label="Módulo 1" />
  <DssTab name="mod-2" label="Módulo 2" />
  <!-- ... mais abas ... -->
</DssTabs>
```

### 7.4 Vertical

```vue
<div style="display: flex; gap: var(--dss-spacing-4)">
  <DssTabs v-model="aba" vertical aria-label="Configurações">
    <DssTab name="conta" label="Conta" />
    <DssTab name="seguranca" label="Segurança" />
    <DssTab name="privacidade" label="Privacidade" />
  </DssTabs>

  <!-- Área de conteúdo correspondente -->
  <div>
    <p v-if="aba === 'conta'">Configurações de conta</p>
    <p v-if="aba === 'seguranca'">Configurações de segurança</p>
    <p v-if="aba === 'privacidade'">Configurações de privacidade</p>
  </div>
</div>
```

### 7.5 Com brand

```vue
<!-- O brand propaga automaticamente via data-brand para DssTab filhos -->
<DssTabs v-model="aba" brand="hub" aria-label="Painel Hub">
  <DssTab name="dados" label="Dados" />
  <DssTab name="sensores" label="Sensores" />
  <DssTab name="alertas" label="Alertas" />
</DssTabs>
```

---

## 8. Variantes e Modificadores

| Variante | Prop/Classe | Descrição |
|----------|-------------|-----------|
| Left (padrão) | `align="left"` | Abas à esquerda |
| Center | `align="center"` | Abas centralizadas |
| Right | `align="right"` | Abas à direita |
| Justify | `align="justify"` | Abas distribuídas — toda a largura |
| Vertical | `vertical` | Layout em coluna |
| Dense | `dense` | Setas compactas |
| Hub | `brand="hub"` | Acento laranja nas setas |
| Water | `brand="water"` | Acento azul nas setas |
| Waste | `brand="waste"` | Acento verde nas setas |

---

## 9. Dark Mode & High Contrast

### Dark Mode (`[data-theme="dark"]`)

- Setas de navegação mantêm `--dss-text-subtle` (token adaptativo por tema)
- Hover/active nas setas usam `--dss-surface-hover`/`--dss-surface-active` (adaptados ao dark)
- DssTab filhos gerenciam seus próprios estados de dark mode

### High Contrast (`@media prefers-contrast: more`)

- Outline de focus-visible nas setas aumenta para `--dss-border-width-thick`

### Forced Colors (Windows High Contrast)

- Setas de navegação: `ButtonText` (system keyword)
- Focus das setas: `Highlight` (system keyword)
- DssTab filhos gerenciam seus próprios forced-colors

### Reduced Motion

- Todas as transições do DssTabs são desativadas (`transition: none`)
- As setas de navegação perdem transições de cor

---

## 10. Matriz de Composição DSS

### Papel Estrutural do DssTabs

O DssTabs é um **container orquestrador de seleção**. Ele:
- Gerencia estado de seleção entre filhos (via QTabs nativo)
- Propaga contexto de marca (via `data-brand`)
- Governa elementos de navegação (setas de scroll)
- **NÃO estiliza** as abas individuais DssTab diretamente

### Componentes DSS Recomendados

| Categoria | Componente | Papel |
|-----------|------------|-------|
| ✅ Aba individual | DssTab | Obrigatório — único item aceito no slot |
| ✅ Container pai | DssCard | Superfície comum para tab panels |
| ⚪ Conteúdo das abas | DssTabPanels | Futuro Fase 2 |
| ⚪ Aba com rota | DssRouteTab | Futuro Fase 2 |

### Limites de Responsabilidade

| Responsabilidade | Quem gerencia |
|------------------|---------------|
| Estado de seleção | QTabs (nativo) via v-model |
| Visual da aba ativa | DssTab (tokens) |
| Cor do indicador | DssTab (`currentColor`) |
| Navegação por teclado | QTabs (nativo) |
| Setas de scroll | DssTabs (governança CSS) |
| Touch target | DssTab (::before WCAG) |
| Propagação de brand | DssTabs (data-brand) |

### Anti-Patterns de Composição

- ❌ Usar `<q-tab>` dentro do DssTabs (violação Gate v2.4)
- ❌ Tentar sobrescrever `active-color` via attr passthrough
- ❌ Usar DssTabs sem DssTab (slot com HTML nativo)
- ❌ Aplicar `class` no DssTabs para substituir tokens de cor
- ❌ Criar DssTabPanels manualmente — aguardar implementação DSS

---

## 11. Comportamentos Implícitos

### Forwarding de Atributos (`v-bind="$attrs"`)

O DssTabs usa `inheritAttrs: false` e aplica `v-bind="$attrs"` explicitamente no `<q-tabs>`. Atributos HTML extras (`data-testid`, `id`, `class` adicional) são encaminhados ao elemento raiz renderizado pelo QTabs.

```vue
<!-- data-testid é encaminhado ao elemento .q-tabs raiz -->
<DssTabs v-model="aba" data-testid="meu-tabs">
```

### Propagação de Brand via `data-brand`

Quando `brand` é definido, DssTabs aplica `data-brand="hub|water|waste"` no elemento raiz do QTabs. Os DssTab filhos reagem via CSS cascade:

```css
/* DssTab reage automaticamente sem prop adicional */
[data-brand='hub'] .dss-tab.q-tab--active {
  color: var(--dss-hub-600);
}
```

Não é necessário passar `brand` para cada DssTab — a propagação é automática.

### Ícones das Setas Fixos

As setas de navegação são forçadas para `chevron_left`/`chevron_right` (Material Icons). Esta é uma decisão de governança — não é possível alterar via props externas.

---

## 12. Paridade com Golden Component (DssBtnGroup)

| Aspecto | DssBtnGroup | DssTabs | Justificativa da Diferença |
|---------|-------------|---------|--------------------------|
| `inheritAttrs: false` | ✅ | ✅ | Idêntico |
| `defineOptions` | ✅ | ✅ | Idêntico |
| `v-bind="$attrs"` | ✅ | ✅ | Idêntico |
| `-webkit-tap-highlight-color` | ✅ | ✅ | Idêntico |
| Seletor global para filhos | ✅ | ✅ | Idêntico (EXC-01 documentado) |
| Estados interativos | ❌ N/A | ❌ N/A | Container não é interativo |
| `role` ARIA | `group` | `tablist` (nativo) | DssBtnGroup usa `<div>` manual; DssTabs delega ao QTabs |
| Touch target | Opção B (filhos) | Opção B (filhos) | Idêntico |
| Dark mode | ✅ via _states | ✅ via _states | Idêntico |
| Forced-colors | ✅ EXC-03 | ✅ EXC-02 | Mesmo padrão, IDs diferentes |
| Brands | ✅ classe + L4 | ✅ data-brand + L4 | DssTabs usa data-brand para cascade automático nos filhos |
| v-model | ❌ N/A | ✅ | DssTabs gerencia seleção de aba ativa |
| Setas de navegação | ❌ N/A | ✅ (EXC-01) | Específico de DssTabs |

---

## 13. Troubleshooting

### As abas não respondem ao brand

**Causa:** `brand` prop do DssTabs aplica `data-brand` no elemento QTabs. Se o QTabs tiver `inheritAttrs: false` internamente, o atributo pode não ser aplicado.

**Solução:** Aplicar `data-brand` no elemento pai externo ao DssTabs:
```html
<div data-brand="hub">
  <DssTabs v-model="aba">...</DssTabs>
</div>
```

### As setas de navegação não aparecem

**Causa:** O container é largo o suficiente para exibir todas as abas.

**Solução:** Verificar `breakpoint` prop ou reduzir a largura do container. As setas aparecem apenas quando o conteúdo de abas excede a largura.

### A aba selecionada não é refletida visualmente

**Causa:** v-model não está sincronizado com os `name` das DssTab.

**Solução:** O valor do `v-model` deve corresponder exatamente ao `name` de um DssTab filho.

```vue
<!-- ✅ name e modelValue correspondem -->
<DssTabs v-model="aba">             <!-- aba = 'dashboard' -->
  <DssTab name="dashboard" .../>    <!-- name = 'dashboard' -->
</DssTabs>
```

---

## 14. Referências

- [Documentação QTabs (Quasar)](https://quasar.dev/vue-components/tabs)
- [WCAG 2.1 — 2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [DssTab (Golden Context de DssTabs)](../DssTab/DssTab.md)
- [DssBtnGroup (Golden Reference)](../DssBtnGroup/DssBtnGroup.md)
- [DssCard (Golden Context)](../DssCard/DssCard.md)
- [DSS_TOKEN_REFERENCE.md](../../docs/reference/DSS_TOKEN_REFERENCE.md)
