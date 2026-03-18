# DssSeparator — Documentação Normativa DSS v2.2

> **Template 13.1 — Componente Fase 1**
> Equivalente Quasar: `q-separator`

---

## 1. Visão Geral

O `DssSeparator` é um separador **standalone** de uso geral para dividir layouts, páginas ou blocos de conteúdo independentes.

### O que representa
Uma linha visual que marca a transição semântica entre seções ou agrupa elementos relacionados.

### Quando usar
- Separar seções em páginas (ex: entre formulário e área de ações)
- Dividir itens em toolbars ou barras de navegação (vertical)
- Criar respiro visual em layouts com densidade alta

### Quando NÃO usar
- ❌ **Dentro de `<DssCard>`** — o `DssCard` já gerencia divisores internos automaticamente via CSS (`& + &`). Inserir `<DssSeparator>` entre `<DssCardSection>` é um anti-pattern arquitetural.
- ❌ Como substituto de padding/margin
- ❌ Em contextos interativos (o separador não possui estados de interação)

---

## 2. Classificação

| Atributo              | Valor                                      |
|-----------------------|--------------------------------------------|
| Categoria             | Decorativo / Estrutural (Não Interativo)   |
| Fase                  | Fase 1 (Componente Atômico)                |
| Golden Reference      | DssBadge (não interativo)                  |
| Golden Context        | DssBadge                                   |
| Equivalente Quasar    | `q-separator`                              |

---

## 3. Golden Component de Referência

**Golden Reference: DssBadge**

**Justificativa do Golden Context:** DssBadge foi escolhido como Golden Context pois é o único componente certificado não-interativo disponível na cadeia DSS v2.2 no momento desta implementação. A ausência de um componente certificado da categoria "Decorativo/Estrutural" impede um Golden Context de categoria mais próxima. A escolha é consistente com o padrão estabelecido por DssTooltip e DssIcon, que também usam DssBadge como Golden Context por serem elementos não-interativos fora da categoria Compact Control.

O `DssSeparator` segue as mesmas decisões arquiteturais do `DssBadge` por ser **não interativo**:

| Decisão                    | DssBadge (Golden)             | DssSeparator                              |
|----------------------------|-------------------------------|-------------------------------------------|
| Touch target               | Opção B — não aplicável       | Opção B — não aplicável                   |
| `::before`                 | Não usado (sem touch target)  | Não usado (sem touch target)              |
| `::after`                  | Efeitos visuais               | Não usado (sem efeitos visuais)           |
| Estados interativos        | Não possui                    | Não possui                                |
| Cores via utility classes  | Sim (bg-*, text-*)            | Não (borda usa currentColor direto)       |
| `role` ARIA                | `status`                      | `separator` (implícito em `<hr>`)         |

### Diferenças documentadas (com justificativa)

| Aspecto              | DssBadge      | DssSeparator | Justificativa                                      |
|----------------------|---------------|--------------|----------------------------------------------------|
| Elemento HTML        | `<div>`       | `<hr>` / `<div>` | `<hr>` é o elemento semântico correto para horizontal; `<div role="separator">` para vertical |
| Classes de cor       | Utility classes (`bg-*`) | Modificadores SCSS (`--color-*`) | Separador não tem preenchimento — apenas borda; `currentColor` é mais adequado |
| `aria-live`          | `polite`      | Não aplicável | Badges anunciam mudanças dinâmicas; separadores são estáticos |
| Composable de cor    | Lógica complexa (brand, outline, transparent) | Simples (5 valores fixos) | Separador tem paleta restrita e governada |

---

## 4. Decisões Arquiteturais

### 4.1 Separador Standalone vs. Contextual (CRÍTICO)

O `DssSeparator` é **standalone**. Existe uma distinção fundamental:

- **Standalone** (`DssSeparator`): Divide blocos independentes em layouts externos ao componente.
- **Contextual** (`DssCard` interno): O `DssCard` gerencia `border-top` via CSS (`DssCardSection + DssCardSection { border-top: ... }`). Não usa `DssSeparator` internamente.

**Regra de Ouro**: Nunca inserir `<DssSeparator>` dentro de `<DssCard>` para separar seções. O `DssCard` já faz isso automaticamente.

### 4.2 Elemento HTML por orientação

- **Horizontal**: `<hr>` — elemento semântico correto com `role="separator"` implícito e `aria-orientation="horizontal"` implícito.
- **Vertical**: `<div role="separator" aria-orientation="vertical">` — `<hr>` não suporta semântica vertical no ARIA; `<div>` com `role` explícito é mais correto.

### 4.3 Técnica de Cor via `currentColor`

O separador usa a propriedade CSS `color` como veículo para a cor da borda:

```scss
.dss-separator {
  color: var(--dss-gray-200);          /* Define a cor */
  border-top-color: currentColor;       /* Herda via currentColor */
}
.dss-separator--color-primary {
  color: var(--dss-primary);            /* Sobrescreve apenas a cor */
}
```

**Vantagem**: Um único modificador de cor funciona para horizontal E vertical, sem duplicação.

### 4.4 Uso de `<hr>` e `<div>` Nativos em vez de `<q-separator>`

O DSS atua como uma camada de tokens aplicada sobre o Quasar Framework. Para elementos puramente estruturais e semânticos — como separadores — onde o HTML nativo fornece acessibilidade superior out-of-the-box (`<hr>` com `role="separator"` implícito), o uso de tags nativas é preferido em relação ao wrapping de componentes Quasar.

Essa decisão alinha-se ao padrão estabelecido pelo `DssBadge` (Golden Context), que também usa `<div>` nativo em vez de `<q-badge>`. O padrão de wrapping Quasar é documentado apenas para `DssButton`, que por decisão arquitetural mantém estrutura idêntica ao `<q-btn>`.

### 4.6 Tokens de Divider Removidos

Os tokens `--dss-border-divider-subtle/default/strong` foram **removidos** no Sprint Jan 2025.
O componente usa diretamente `var(--dss-gray-100/200/300)` conforme a refatoração.
Ver: `DSS/tokens/semantic/_borders.scss` — seção ⚠️ TOKENS COMPONENT-SPECIFIC REMOVIDOS.

### 4.7 `inheritAttrs: true` (default)

Atributos HTML são forwarded automaticamente para o elemento raiz. Isso permite:
```vue
<DssSeparator aria-hidden="true" data-testid="sep" />
```

Não é necessário `v-bind="$attrs"` explícito pois há apenas um elemento raiz.

---

## 5. Touch Target — Opção B (Não Aplicável)

O `DssSeparator` **não é interativo**. Por isso:

- ❌ Touch target **NÃO é implementado**
- ❌ `::before` **NÃO é usado** (reservado exclusivamente para touch targets em componentes interativos)
- ❌ Focus ring **NÃO é implementado**
- ✅ A responsabilidade de interação (se houver) é **do contexto de uso**, não do separador

Referência normativa: CLAUDE.md — Princípio #7 (Convenção de Pseudo-elementos).

---

## 6. Props

| Prop         | Tipo                                                | Default     | Descrição |
|--------------|-----------------------------------------------------|-------------|-----------|
| `vertical`   | `boolean`                                           | `false`     | Orientação vertical |
| `inset`      | `boolean \| 'item' \| 'item-thumbnail'`            | `false`     | Indentação |
| `spaced`     | `boolean`                                           | `false`     | Margem ao redor |
| `color`      | `'subtle' \| 'default' \| 'strong' \| 'primary' \| 'secondary'` | `'default'` | Cor |
| `size`       | `'hairline' \| 'thin' \| 'md' \| 'thick'`         | `'thin'`    | Espessura |
| `ariaHidden` | `boolean`                                           | `undefined` | Ocultar do a11y |

### Props Proibidas (governança DSS)

| Prop Quasar | Status DSS     | Motivo |
|-------------|----------------|--------|
| `dark`      | ❌ Removida     | DSS gerencia dark mode via `[data-theme="dark"]` globalmente |
| `color` (string arbitrária) | ❌ Restrita | Apenas os 5 valores semânticos são suportados |

---

## 7. Slots

**Nenhum.** O `DssSeparator` é um elemento void (self-closing). Não aceita conteúdo.

---

## 8. Events

**Nenhum.** O componente é não interativo e não emite eventos.

---

## 9. Acessibilidade (WCAG 2.1 AA)

| Critério              | Implementação |
|-----------------------|---------------|
| `role="separator"`    | Implícito em `<hr>` (horizontal); explícito em `<div>` (vertical) |
| `aria-orientation`    | Implícito `horizontal` em `<hr>`; explícito `vertical` em `<div>` |
| `aria-hidden`         | Suportado via prop `ariaHidden` ou atributo direto |
| Touch target          | Não aplicável (Opção B) |
| Focus                 | Não aplicável (não interativo) |
| Reduced motion        | Transition desabilitada via `@media (prefers-reduced-motion)` |
| High contrast         | Border reforçada para 2px em `prefers-contrast: more` |
| Forced colors         | `CanvasText` garante visibilidade em Windows HCM |

### Estados NÃO aplicáveis

| Estado       | Razão |
|--------------|-------|
| hover        | Não interativo |
| focus        | Não interativo |
| active       | Não interativo |
| disabled     | Não interativo |
| loading      | Não interativo |
| indeterminate| Não aplicável (binário: visível/oculto) |

---

## 10. Tokens Utilizados (nomes exatos)

```
Espessura:
  --dss-border-width-hairline   (0.5px)
  --dss-border-width-thin       (1px)    ← default
  --dss-border-width-md         (2px)
  --dss-border-width-thick      (3px)

Cores:
  --dss-gray-100                (subtle)
  --dss-gray-200                (default)
  --dss-gray-300                (strong)
  --dss-gray-400                (print)
  --dss-primary                 (color="primary")
  --dss-secondary               (color="secondary")

Espaçamento:
  --dss-spacing-4               (16px — spaced + inset=true)
  --dss-spacing-14              (56px — inset='item')
  --dss-spacing-16              (64px — inset='item-thumbnail')

Animação:
  --dss-duration-150
  --dss-easing-standard

Brand:
  --dss-hub-600                 (cor primária Hub)
  --dss-water-500               (cor primária Water)
  --dss-waste-600               (cor primária Waste)
```

---

## 11. Exceções Documentadas

| ID      | Valor                      | Local                     | Justificativa |
|---------|----------------------------|---------------------------|---------------|
| EXC-01  | `rgba(255, 255, 255, 0.12)`| `4-output/_states.scss`   | Dark mode divider. Padrão Material Design. Nenhum token DSS fornece branco com alpha parcial. |
| EXC-02  | `1px` (forced-colors)      | `4-output/_states.scss`   | Em `forced-colors: active`, tokens CSS custom properties são ignorados pelo browser. Valor absoluto obrigatório. |

---

## 12. Anti-Patterns

### ❌ Anti-pattern 1: DssSeparator dentro de DssCard

```vue
<!-- ❌ INCORRETO -->
<DssCard>
  <DssCardSection>Conteúdo A</DssCardSection>
  <DssSeparator />  <!-- NÃO FAZER ISSO -->
  <DssCardSection>Conteúdo B</DssCardSection>
</DssCard>
```

```vue
<!-- ✅ CORRETO: DssCard insere a borda automaticamente -->
<DssCard>
  <DssCardSection>Conteúdo A</DssCardSection>
  <DssCardSection>Conteúdo B</DssCardSection>
</DssCard>
```

### ❌ Anti-pattern 2: Prop `dark`

```vue
<!-- ❌ INCORRETO — prop dark não existe no DSS -->
<DssSeparator dark />

<!-- ✅ CORRETO — dark mode é global via CSS -->
<body data-theme="dark">
  <DssSeparator />  <!-- Herda dark mode automaticamente -->
</body>
```

### ❌ Anti-pattern 3: Cor arbitrária (string não governada)

```vue
<!-- ❌ INCORRETO — cor não suportada pela API DSS -->
<DssSeparator color="red-5" />
<DssSeparator color="#ff0000" />

<!-- ✅ CORRETO — usar apenas os 5 valores semânticos -->
<DssSeparator color="primary" />
<DssSeparator color="strong" />
```

### ❌ Anti-pattern 4: Usar para criar espaçamento

```vue
<!-- ❌ INCORRETO — separador não é substituto de margin -->
<p>Parágrafo 1</p>
<DssSeparator spaced />
<DssSeparator spaced />  <!-- Dois separadores para mais espaço — ERRADO -->
<p>Parágrafo 2</p>

<!-- ✅ CORRETO — usar apenas um separador com semântica real -->
<p>Parágrafo 1</p>
<DssSeparator spaced />
<p>Parágrafo 2</p>
```

---

## 13. Paridade com o Golden Component (DssBadge)

| Aspecto                      | DssBadge (Golden)          | DssSeparator               | Status       |
|------------------------------|----------------------------|----------------------------|--------------|
| Arquitetura 4 camadas        | ✅ Completa                 | ✅ Completa                 | Igual        |
| Entry point wrapper          | ✅ Re-export puro           | ✅ Re-export puro           | Igual        |
| Token First                  | ✅ Zero hardcoded           | ✅ Zero hardcoded (+ EXC-01)| Igual        |
| Touch target                 | Opção B (contextual)       | Opção B (não aplicável)    | Igual        |
| `::before` reservado         | ✅ Não usado                | ✅ Não usado                | Igual        |
| Composable de classes        | `useBadgeClasses`          | `useSeparatorClasses`      | Igual        |
| TypeScript interfaces        | ✅ `badge.types.ts`         | ✅ `separator.types.ts`     | Igual        |
| `dss.meta.json`              | ✅                          | ✅                          | Igual        |
| Estados interativos          | ❌ Não possui               | ❌ Não possui               | Igual        |
| Dark mode                    | ✅ `[data-theme="dark"]`    | ✅ `[data-theme="dark"]`    | Igual        |
| High contrast                | ✅                          | ✅                          | Igual        |
| Forced colors                | ✅                          | ✅                          | Igual        |
| Reduced motion               | ✅                          | ✅                          | Igual        |
| Brand context                | ✅ `[data-brand="x"]`       | ✅ `[data-brand="x"]`       | Igual        |
| Utility classes (bg-*, text-*)| ✅ Usadas para cor          | ❌ Não usadas               | **Diferente** — Justificativa: separador tem apenas borda, não preenchimento; `currentColor` é mais elegante |
| Slots                        | ✅ `default`                | ❌ Nenhum                   | **Diferente** — Justificativa: separador é void element, não aceita conteúdo |
| `role` ARIA                  | `status`                   | `separator` (implícito)    | **Diferente** — Justificativa: semântica correta por tipo de componente |
| Elemento HTML raiz           | `<div>`                    | `<hr>` / `<div>`           | **Diferente** — Justificativa: `<hr>` é o elemento semântico para separadores horizontais |
| Exceções documentadas        | 1 (font-weight 700 HCM)    | 2 (dark rgba, forced-colors 1px) | **Diferente** — Justificativa: separador em dark mode exige rgba não disponível em tokens |

---

## 14. Conformidade — Gate Estrutural

### Gate Estrutural
- [x] 4 camadas existem em completude
- [x] Entry Point Wrapper (`DssSeparator.vue`) existe e é re-export puro
- [x] Orchestrador SCSS importa L2 → L3 → L4 na ordem correta
- [x] Barrel export (`index.js`) exporta o wrapper
- [x] `dss.meta.json` com `goldenReference` e `goldenContext` declarados

### Gate Técnico
- [x] Nenhum valor hardcoded (Token First) — exceto EXC-01 e EXC-02 documentadas
- [x] Cores via modificadores SCSS (não utility classes — justificado)
- [x] Estados documentados (não interativo — todos não aplicáveis)
- [x] WCAG 2.1 AA: role, aria-orientation, aria-hidden, reduced-motion, high-contrast, forced-colors
- [x] SCSS compilável sem erros

### Gate Documental
- [x] Tokens listados com nomes exatos
- [x] README completo
- [x] Documentação normativa (Template 13.1) — este arquivo
- [x] API Reference (`DSSSEPARATOR_API.md`)
- [x] Exemplo funcional (8 cenários)
