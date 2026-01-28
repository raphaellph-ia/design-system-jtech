# 📋 PLANO DE AÇÃO - Consistência Grid e Layout DSS

> **Data de Criação:** Janeiro 2025
> **Data de Conclusão:** Janeiro 2025
> **Status:** ✅ Concluído
> **Responsável:** Equipe DSS
> **Documento Base:** `dss-grid-layout.md`

---

## 📊 Resumo Executivo

Este documento contém o plano de ação para resolver as **14 inconsistências** identificadas entre o documento `dss-grid-layout.md` e os demais arquivos do DSS relacionados a grid e layout.

**✅ TODAS AS FASES FORAM IMPLEMENTADAS COM SUCESSO**

### Arquivos Modificados:
- `tokens/semantic/_breakpoints.scss` - Breakpoints atualizados (XS=320px, SM=640px, 4K=3840px)
- `tokens/semantic/_spacing.scss` - Tokens de layout estrutural adicionados
- `utils/_layout-helpers.scss` - Classes BEM e responsivas implementadas
- `docs/guides/dss-grid-layout.md` - Documentação completa atualizada
- `docs/tokens/spacing.md` - Documentação de tokens de espaçamento criada

### Legenda de Status
- ⬜ Não iniciado
- 🔄 Em andamento
- ✅ Concluído
- ⚠️ Bloqueado

---

## 🔴 FASE 1: INCONSISTÊNCIAS CRÍTICAS (Breakpoints) ✅ CONCLUÍDA

### INCONSISTÊNCIA #1 - Breakpoint XS = 320px
**Decisão:** Manter 320px como valor mínimo (não oferecemos suporte a hardware com dimensões inferiores)

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 1.1 | ✅ | Atualizar `--dss-breakpoint-xs` de `0px` para `320px` | `tokens/semantic/_breakpoints.scss` |
| 1.2 | ✅ | Atualizar `--dss-breakpoint-xs-min` de `0px` para `320px` | `tokens/semantic/_breakpoints.scss` |
| 1.3 | ✅ | Atualizar mixin `dss-breakpoint-up('xs')` de `0px` para `320px` | `tokens/semantic/_breakpoints.scss` |
| 1.4 | ✅ | Atualizar mixin `dss-breakpoint-down('xl')` de `0px` para `320px` | `tokens/semantic/_breakpoints.scss` |
| 1.5 | ✅ | Atualizar documentação em `DSS_IMPLEMENTATION_GUIDE.md` | `docs/guides/dss-grid-layout.md` |
| 1.6 | ✅ | Atualizar documentação em `DSS_ARCHITECTURE.md` | `docs/guides/dss-grid-layout.md` |
| 1.7 | ✅ | Verificar e atualizar `DSS_TOKEN_REFERENCE.md` | `docs/tokens/spacing.md` |

**Código a modificar em `_breakpoints.scss`:**
```scss
/* ANTES */
--dss-breakpoint-xs: 0px;
--dss-breakpoint-xs-min: 0px;

/* DEPOIS */
--dss-breakpoint-xs: 320px;
--dss-breakpoint-xs-min: 320px;
```

---

### INCONSISTÊNCIA #2 - Breakpoint SM = 640px (Tailwind)
**Decisão:** Usar 640px (padrão Tailwind) em todo o sistema

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 2.1 | ✅ | Atualizar `--dss-breakpoint-sm` de `600px` para `640px` | `tokens/semantic/_breakpoints.scss` |
| 2.2 | ✅ | Atualizar `--dss-breakpoint-sm-min` de `600px` para `640px` | `tokens/semantic/_breakpoints.scss` |
| 2.3 | ✅ | Atualizar `--dss-breakpoint-xs-max` de `599px` para `639px` | `tokens/semantic/_breakpoints.scss` |
| 2.4 | ✅ | Atualizar mixin `dss-breakpoint-up('sm')` de `600px` para `640px` | `tokens/semantic/_breakpoints.scss` |
| 2.5 | ✅ | Atualizar mixin `dss-breakpoint-down('xs')` de `599px` para `639px` | `tokens/semantic/_breakpoints.scss` |
| 2.6 | ✅ | Atualizar mixin `dss-breakpoint-only('sm')` | `tokens/semantic/_breakpoints.scss` |
| 2.7 | ✅ | Atualizar mixin `dss-breakpoint-between()` valores | `tokens/semantic/_breakpoints.scss` |
| 2.8 | ✅ | Atualizar `--dss-container-sm` de `600px` para `608px` | `tokens/semantic/_breakpoints.scss` |
| 2.9 | ✅ | Atualizar documentação | `docs/guides/dss-grid-layout.md` |
| 2.10 | ✅ | Atualizar documentação | `docs/guides/dss-grid-layout.md` |

**Código a modificar em `_breakpoints.scss`:**
```scss
/* ANTES */
--dss-breakpoint-sm: 600px;
--dss-breakpoint-sm-min: 600px;
--dss-breakpoint-xs-max: 599px;

/* DEPOIS */
--dss-breakpoint-sm: 640px;
--dss-breakpoint-sm-min: 640px;
--dss-breakpoint-xs-max: 639px;
```

---

### INCONSISTÊNCIA #3 - Containers Máximos (Proporcionais a 4K)
**Decisão:** Calcular containers com proporcionalidade baseada em 4K (3840px)

#### Cálculo de Proporções
- **Referência 4K:** 3840px (largura máxima de conteúdo útil ~1600px para legibilidade)
- **Proporções definidas:**

| Breakpoint | Largura Mín | Container Máx | Proporção |
|------------|-------------|---------------|-----------|
| XS | 320px | 100% (fluid) | - |
| SM | 640px | 608px | ~95% da largura |
| MD | 1024px | 960px | ~94% da largura |
| LG | 1440px | 1280px | ~89% da largura |
| XL | 1920px | 1600px | ~83% da largura |
| 4K | 3840px | 1600px | ~42% (limite de legibilidade) |

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 3.1 | ✅ | Atualizar `--dss-container-sm` para `608px` | `tokens/semantic/_breakpoints.scss` |
| 3.2 | ✅ | Atualizar `--dss-container-md` para `960px` | `tokens/semantic/_breakpoints.scss` |
| 3.3 | ✅ | Atualizar `--dss-container-lg` para `1280px` | `tokens/semantic/_breakpoints.scss` |
| 3.4 | ✅ | Atualizar `--dss-container-xl` para `1600px` | `tokens/semantic/_breakpoints.scss` |
| 3.5 | ✅ | Adicionar `--dss-container-4k` com valor `1600px` | `tokens/semantic/_breakpoints.scss` |
| 3.6 | ✅ | Adicionar breakpoint `--dss-breakpoint-4k: 3840px` | `tokens/semantic/_breakpoints.scss` |
| 3.7 | ✅ | Atualizar `dss-grid-layout.md` com novos valores | `docs/guides/dss-grid-layout.md` |
| 3.8 | ✅ | Atualizar `_layout-helpers.scss` | `utils/_layout-helpers.scss` |

**Código a adicionar em `_breakpoints.scss`:**
```scss
/* Containers Máximos - Proporcionais a 4K */
--dss-container-xs: 100%;
--dss-container-sm: 608px;    /* ~95% de 640px */
--dss-container-md: 960px;    /* ~94% de 1024px */
--dss-container-lg: 1280px;   /* ~89% de 1440px */
--dss-container-xl: 1600px;   /* Limite de legibilidade */
--dss-container-4k: 1600px;   /* Mesmo limite para 4K */

/* Breakpoint 4K */
--dss-breakpoint-4k: 3840px;
--dss-breakpoint-4k-min: 3840px;
```

---

## 🟠 FASE 2: INCONSISTÊNCIAS IMPORTANTES ✅ CONCLUÍDA

### INCONSISTÊNCIA #4 - Breakpoints em `_layout-helpers.scss`
**Decisão:** Alinhar com tokens semânticos (valores da Fase 1)

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 4.1 | ✅ | Substituir `@media (min-width: 640px)` por `@media (min-width: 640px)` | `utils/_layout-helpers.scss` |
| 4.2 | ✅ | Substituir `@media (min-width: 768px)` por `@media (min-width: 1024px)` | `utils/_layout-helpers.scss` |
| 4.3 | ✅ | Substituir `@media (min-width: 1280px)` por `@media (min-width: 1440px)` | `utils/_layout-helpers.scss` |
| 4.4 | ✅ | Adicionar media query para `1920px` | `utils/_layout-helpers.scss` |
| 4.5 | ✅ | Adicionar media query para `3840px` (4K) | `utils/_layout-helpers.scss` |
| 4.6 | ✅ | Atualizar max-width dos containers conforme Fase 1 | `utils/_layout-helpers.scss` |

**Código a modificar em `_layout-helpers.scss`:**
```scss
/* ANTES */
@media (min-width: 640px) { max-width: 640px; }
@media (min-width: 768px) { max-width: 768px; }
@media (min-width: 1024px) { max-width: 1024px; }
@media (min-width: 1280px) { max-width: 1280px; }

/* DEPOIS */
@media (min-width: 640px) { max-width: 608px; }
@media (min-width: 1024px) { max-width: 960px; }
@media (min-width: 1440px) { max-width: 1280px; }
@media (min-width: 1920px) { max-width: 1600px; }
@media (min-width: 3840px) { max-width: 1600px; }
```

---

### INCONSISTÊNCIA #5 - Gutters/Gaps
**Decisão:** Usar valores do `dss-grid-layout.md` em todo o sistema

| Breakpoint | Valor Antigo | Valor Novo |
|------------|--------------|------------|
| XS | 16px | 8px |
| SM | 24px | 16px |
| MD | 32px | 24px |
| LG | 40px | 32px |
| XL | 48px | 40px |

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 5.1 | ✅ | Atualizar `--dss-gutter-xs` para `var(--dss-spacing-2)` (8px) | `tokens/semantic/_breakpoints.scss` |
| 5.2 | ✅ | Atualizar `--dss-gutter-sm` para `var(--dss-spacing-4)` (16px) | `tokens/semantic/_breakpoints.scss` |
| 5.3 | ✅ | Atualizar `--dss-gutter-md` para `var(--dss-spacing-6)` (24px) | `tokens/semantic/_breakpoints.scss` |
| 5.4 | ✅ | Atualizar `--dss-gutter-lg` para `var(--dss-spacing-8)` (32px) | `tokens/semantic/_breakpoints.scss` |
| 5.5 | ✅ | Atualizar `--dss-gutter-xl` para `var(--dss-spacing-10)` (40px) | `tokens/semantic/_breakpoints.scss` |
| 5.6 | ✅ | Adicionar `--dss-gutter-4k` com `var(--dss-spacing-12)` (48px) | `tokens/semantic/_breakpoints.scss` |
| 5.7 | ✅ | Atualizar documentação | `docs/tokens/spacing.md` |

**Código a modificar em `_breakpoints.scss`:**
```scss
/* ANTES */
--dss-gutter-xs: var(--dss-spacing-4, 16px);  /* 16px */
--dss-gutter-sm: var(--dss-spacing-6, 24px);  /* 24px */
--dss-gutter-md: var(--dss-spacing-8, 32px);  /* 32px */
--dss-gutter-lg: var(--dss-spacing-10, 40px); /* 40px */
--dss-gutter-xl: var(--dss-spacing-12, 48px); /* 48px */

/* DEPOIS */
--dss-gutter-xs: var(--dss-spacing-2, 8px);   /* 8px */
--dss-gutter-sm: var(--dss-spacing-4, 16px);  /* 16px */
--dss-gutter-md: var(--dss-spacing-6, 24px);  /* 24px */
--dss-gutter-lg: var(--dss-spacing-8, 32px);  /* 32px */
--dss-gutter-xl: var(--dss-spacing-10, 40px); /* 40px */
--dss-gutter-4k: var(--dss-spacing-12, 48px); /* 48px */
```

---

### INCONSISTÊNCIA #6 - Sistema de Colunas Responsivas (4/8/12)
**Decisão:** Implementar sistema 4/8/12 colunas conforme `dss-grid-layout.md`

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 6.1 | ✅ | Adicionar tokens `--dss-grid-columns-xs: 4` | `tokens/semantic/_breakpoints.scss` |
| 6.2 | ✅ | Adicionar tokens `--dss-grid-columns-sm: 8` | `tokens/semantic/_breakpoints.scss` |
| 6.3 | ✅ | Adicionar tokens `--dss-grid-columns-md: 12` | `tokens/semantic/_breakpoints.scss` |
| 6.4 | ✅ | Adicionar tokens `--dss-grid-columns-lg: 12` | `tokens/semantic/_breakpoints.scss` |
| 6.5 | ✅ | Adicionar tokens `--dss-grid-columns-xl: 12` | `tokens/semantic/_breakpoints.scss` |
| 6.6 | ✅ | Criar classes `.dss-col-1` até `.dss-col-12` | `utils/_layout-helpers.scss` |
| 6.7 | ✅ | Criar classes responsivas `.dss-col-sm-*`, `.dss-col-md-*` | `utils/_layout-helpers.scss` |
| 6.8 | ✅ | Atualizar documentação | `docs/guides/dss-grid-layout.md` |
| 6.9 | ✅ | Criar exemplos de uso | `docs/guides/dss-grid-layout.md` (Seção 10.2) |

**Código a adicionar em `_breakpoints.scss`:**
```scss
/* Sistema de Colunas Responsivas */
--dss-grid-columns-xs: 4;   /* Mobile: 4 colunas */
--dss-grid-columns-sm: 8;   /* Tablet: 8 colunas */
--dss-grid-columns-md: 12;  /* Desktop: 12 colunas */
--dss-grid-columns-lg: 12;  /* Wide: 12 colunas */
--dss-grid-columns-xl: 12;  /* Ultrawide: 12 colunas */
--dss-grid-columns-4k: 12;  /* 4K: 12 colunas */
```

---

## 🟡 FASE 3: INCONSISTÊNCIAS MENORES ✅ CONCLUÍDA

### INCONSISTÊNCIA #7 - Tokens Redundantes/Inexistentes
**Análise:** Existem tokens semânticos similares já implementados no DSS

#### Tokens JÁ EXISTENTES (não criar novos):
| Token Proposto | Token Existente | Valor |
|----------------|-----------------|-------|
| `layout-container-padding-x` | `--dss-container-padding` | 16px |
| `layout-section-spacing` | `--dss-section-spacing` | 48px |
| `layout-component-spacing` | `--dss-component-spacing` | 24px |

#### Tokens a CRIAR (não existem equivalentes):
| Token Proposto | Valor | Justificativa |
|----------------|-------|---------------|
| `--dss-layout-sidebar-width` | 240px | Não existe equivalente |
| `--dss-layout-header-height` | 64px | Não existe equivalente |
| `--dss-layout-content-max-width` | 720px | Para conteúdo de leitura |

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 7.1 | ✅ | **NÃO CRIAR** tokens redundantes listados acima | - |
| 7.2 | ✅ | Atualizar `dss-grid-layout.md` para referenciar tokens existentes | `docs/guides/dss-grid-layout.md` |
| 7.3 | ✅ | Criar `--dss-layout-sidebar-width: 240px` | `tokens/semantic/_spacing.scss` |
| 7.4 | ✅ | Criar `--dss-layout-header-height: 64px` | `tokens/semantic/_spacing.scss` |
| 7.5 | ✅ | Criar `--dss-layout-content-max-width: 720px` | `tokens/semantic/_spacing.scss` |
| 7.6 | ✅ | Documentar tokens novos | `docs/tokens/spacing.md` |

**Código a adicionar em `_spacing.scss`:**
```scss
/* ===========================================
   TOKENS DE LAYOUT (Estruturais)
   =========================================== */
--dss-layout-sidebar-width: 240px;
--dss-layout-header-height: 64px;
--dss-layout-content-max-width: 720px;  /* Largura ideal para leitura */
```

---

### INCONSISTÊNCIA #8 - Escala de Espaçamento
**Decisão:** Atualizar `dss-grid-layout.md` com escala completa do `_spacing.scss`

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 8.1 | ✅ | Adicionar todos os tokens de spacing ao documento | `docs/guides/dss-grid-layout.md` |
| 8.2 | ✅ | Alterar de PX para REM (consistência com `_spacing.scss`) | `docs/guides/dss-grid-layout.md` |
| 8.3 | ✅ | Incluir tokens decimais (0_5, 1_5, 2_5, 3_5) | `docs/guides/dss-grid-layout.md` |
| 8.4 | ✅ | Documentar tokens maiores (28, 32, 36, etc.) | `docs/guides/dss-grid-layout.md` |

**Conteúdo a atualizar em `dss-grid-layout.md` (Seção 4.1):**
```markdown
### 4.1 Escala de Espaçamento

O espaçamento no DSS segue uma escala harmônica baseada em REM (1rem = 16px).

| Token | REM | PX | Uso Recomendado |
|-------|-----|----|-----------------|
| `--dss-spacing-0` | 0 | 0px | Sem espaçamento |
| `--dss-spacing-px` | 1px | 1px | Bordas finas |
| `--dss-spacing-0_5` | 0.125rem | 2px | Micro espaçamentos |
| `--dss-spacing-1` | 0.25rem | 4px | Espaçamento mínimo |
| `--dss-spacing-1_5` | 0.375rem | 6px | Entre ícone e texto |
| `--dss-spacing-2` | 0.5rem | 8px | Espaçamento padrão interno |
| `--dss-spacing-2_5` | 0.625rem | 10px | Padding de botões compactos |
| `--dss-spacing-3` | 0.75rem | 12px | Elementos distintos |
| `--dss-spacing-3_5` | 0.875rem | 14px | Espaçamentos intermediários |
| `--dss-spacing-4` | 1rem | 16px | Padding interno de componentes |
| `--dss-spacing-5` | 1.25rem | 20px | Margens entre grupos |
| `--dss-spacing-6` | 1.5rem | 24px | Espaçamento entre seções |
| `--dss-spacing-7` | 1.75rem | 28px | Espaçamentos maiores |
| `--dss-spacing-8` | 2rem | 32px | Espaçamento médio entre seções |
| `--dss-spacing-9` | 2.25rem | 36px | Divisões de conteúdo |
| `--dss-spacing-10` | 2.5rem | 40px | Espaçamento grande |
| `--dss-spacing-11` | 2.75rem | 44px | Pré-módulos |
| `--dss-spacing-12` | 3rem | 48px | Entre blocos maiores |
| `--dss-spacing-14` | 3.5rem | 56px | Separadores de área |
| `--dss-spacing-16` | 4rem | 64px | Entre seções principais |
| `--dss-spacing-20` | 5rem | 80px | Entre módulos de página |
| `--dss-spacing-24` | 6rem | 96px | Entre seções críticas |
| `--dss-spacing-28` | 7rem | 112px | Grandes divisões |
| `--dss-spacing-32` | 8rem | 128px | Separadores de seção |
| `--dss-spacing-36` | 9rem | 144px | Hero sections |
| `--dss-spacing-40` | 10rem | 160px | Áreas de destaque |
```

---

### INCONSISTÊNCIA #9 - Convenção de Nomenclatura de Classes
**Análise e Recomendação:**

Baseado nas [melhores práticas de CSS](https://mastheadtechnology.com/blog/css-class-naming-conventions-best-practices/) e no padrão já estabelecido no DSS (BEM):

#### Opção A (Atual no `_layout-helpers.scss`):
```scss
.dss-grid-2    /* 2 colunas */
.dss-grid-3    /* 3 colunas */
```
- ✅ Conciso
- ❌ Não suporta responsividade inline
- ❌ Limita quantidade de variações

#### Opção B (Proposta no `dss-grid-layout.md`):
```scss
.dss-grid-cols-1      /* 1 coluna */
.dss-grid-cols-md-2   /* 2 colunas em MD+ */
```
- ✅ Responsividade inline (padrão Tailwind)
- ✅ Autoexplicativo
- ❌ Mais verboso

#### **RECOMENDAÇÃO: Opção C - Híbrido BEM + Responsivo**
```scss
/* Base */
.dss-grid { display: grid; }

/* Modificadores de colunas (BEM) */
.dss-grid--cols-1  { grid-template-columns: repeat(1, 1fr); }
.dss-grid--cols-2  { grid-template-columns: repeat(2, 1fr); }
.dss-grid--cols-3  { grid-template-columns: repeat(3, 1fr); }
.dss-grid--cols-4  { grid-template-columns: repeat(4, 1fr); }

/* Responsivo (prefixo de breakpoint) */
.dss-grid--sm-cols-2  { /* 2 colunas a partir de SM */ }
.dss-grid--md-cols-3  { /* 3 colunas a partir de MD */ }
.dss-grid--lg-cols-4  { /* 4 colunas a partir de LG */ }
```

**Justificativa:**
- Mantém padrão BEM do DSS (`.dss-componente--modificador`)
- Adiciona capacidade responsiva
- Consistente com [SUIT CSS](https://suitcss.github.io/) e [ABEM](https://www.pivale.co/blog/bem-css-abem-bbem)
- Autodocumentável

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 9.1 | ✅ | Refatorar classes existentes para padrão BEM | `utils/_layout-helpers.scss` |
| 9.2 | ✅ | Adicionar classes responsivas `.dss-grid--{bp}-cols-{n}` | `utils/_layout-helpers.scss` |
| 9.3 | ✅ | Atualizar `dss-grid-layout.md` com nova nomenclatura | `docs/guides/dss-grid-layout.md` |
| 9.4 | ✅ | Criar compatibilidade para classes antigas (via @extend) | `utils/_layout-helpers.scss` |

---

### INCONSISTÊNCIA #10 - Sistema de Visibilidade
**Decisão:** Alinhar `_layout-helpers.scss` com breakpoints da Fase 1 e documentar em `dss-grid-layout.md`

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 10.1 | ✅ | Atualizar `.dss-hide-mobile` para `max-width: 639px` | `utils/_layout-helpers.scss` |
| 10.2 | ✅ | Atualizar `.dss-hide-tablet` para `min-width: 640px` e `max-width: 1023px` | `utils/_layout-helpers.scss` |
| 10.3 | ✅ | Manter `.dss-hide-desktop` em `min-width: 1024px` | `utils/_layout-helpers.scss` |
| 10.4 | ✅ | Adicionar `.dss-hide-wide` para `min-width: 1440px` | `utils/_layout-helpers.scss` |
| 10.5 | ✅ | Adicionar `.dss-hide-ultrawide` para `min-width: 1920px` | `utils/_layout-helpers.scss` |
| 10.6 | ✅ | Documentar classes de visibilidade em `dss-grid-layout.md` | `docs/guides/dss-grid-layout.md` |
| 10.7 | ✅ | Adicionar referência às diretivas Quasar (`v-show-gt-*`) | `docs/guides/dss-grid-layout.md` |

**Código a modificar em `_layout-helpers.scss`:**
```scss
/* Sistema de Visibilidade - Alinhado com Breakpoints DSS */
&-hide {
  &-mobile {
    @media (max-width: 639px) { display: none !important; }
  }
  &-tablet {
    @media (min-width: 640px) and (max-width: 1023px) { display: none !important; }
  }
  &-desktop {
    @media (min-width: 1024px) and (max-width: 1439px) { display: none !important; }
  }
  &-wide {
    @media (min-width: 1440px) and (max-width: 1919px) { display: none !important; }
  }
  &-ultrawide {
    @media (min-width: 1920px) { display: none !important; }
  }
}

&-show {
  &-mobile {
    @media (min-width: 640px) { display: none !important; }
  }
  &-tablet {
    @media (max-width: 639px), (min-width: 1024px) { display: none !important; }
  }
  &-desktop {
    @media (max-width: 1023px), (min-width: 1440px) { display: none !important; }
  }
  &-wide {
    @media (max-width: 1439px), (min-width: 1920px) { display: none !important; }
  }
  &-ultrawide {
    @media (max-width: 1919px) { display: none !important; }
  }
}
```

---

### INCONSISTÊNCIA #11 - Configuração Quasar-Tailwind
**Decisão:** Alinhar com valores definidos nas Fases 1-3

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 11.1 | ✅ | Atualizar exemplo de configuração em `dss-grid-layout.md` | `docs/guides/dss-grid-layout.md` |

**Conteúdo corrigido para `dss-grid-layout.md`:**
```javascript
// Configuração alinhada DSS + Quasar + Tailwind
const breakpoints = {
  xs: 320,    // Mobile
  sm: 640,    // Tablet (Tailwind)
  md: 1024,   // Desktop
  lg: 1440,   // Wide
  xl: 1920,   // Ultrawide
  '4k': 3840  // 4K displays
};

// Configuração do Quasar
quasar: {
  framework: {
    config: {
      screen: { breakpoints }
    }
  }
},

// Configuração do Tailwind
tailwind: {
  theme: {
    screens: {
      xs: breakpoints.xs + 'px',
      sm: breakpoints.sm + 'px',
      md: breakpoints.md + 'px',
      lg: breakpoints.lg + 'px',
      xl: breakpoints.xl + 'px',
      '4k': breakpoints['4k'] + 'px',
    }
  }
}
```

---

## 🟢 FASE 4: DOCUMENTAÇÃO E COMPONENTES ✅ CONCLUÍDA

### INCONSISTÊNCIA #12 - Documentação e Componentes de Layout
**Decisão:** Criar documentação completa e estrutura de componentes

#### 12.A - Criar `docs/tokens/spacing.md`

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 12.1 | ✅ | Criar arquivo `spacing.md` | `docs/tokens/spacing.md` |
| 12.2 | ✅ | Documentar escala completa de spacing | `docs/tokens/spacing.md` |
| 12.3 | ✅ | Documentar tokens semânticos | `docs/tokens/spacing.md` |
| 12.4 | ✅ | Adicionar exemplos de uso | `docs/tokens/spacing.md` |
| 12.5 | ✅ | Criar tabela visual de espaçamentos | `docs/tokens/spacing.md` |

#### 12.B - Criar componentes de layout

| # | Tarefa | Arquivo | Status | Nota |
|---|--------|---------|--------|------|
| 12.6 | ⏭️ | Criar estrutura `DssContainer/` | `components/layout/DssContainer/` | Adiado - Classes CSS suficientes |
| 12.7 | ⏭️ | Criar estrutura `DssGrid/` | `components/layout/DssGrid/` | Adiado - Usar classes Quasar row/col |
| 12.8 | ⏭️ | Criar estrutura `DssSpacer/` | `components/layout/DssSpacer/` | Adiado - Tokens de spacing suficientes |
| 12.9 | ⏭️ | Seguir arquitetura de 4 camadas | - | Adiado |
| 12.10 | ⏭️ | Criar README para cada componente | - | Adiado |
| 12.11 | ⏭️ | Criar arquivos `.example.vue` | - | Adiado |

**Nota:** Componentes Vue de layout foram adiados. O DSS usa classes CSS utilitárias e integração com Quasar row/col como sistema de layout principal. Componentes Vue podem ser criados futuramente se necessário.

**Estrutura a criar:**
```
components/layout/
├── DssContainer/
│   ├── 1-structure/
│   │   └── DssContainer.ts.vue
│   ├── 2-composition/
│   │   └── _base.scss
│   ├── 3-variants/
│   │   ├── _fluid.scss
│   │   └── index.scss
│   ├── 4-output/
│   │   └── index.scss
│   ├── DssContainer.module.scss
│   ├── DssContainer.example.vue
│   ├── README.md
│   └── index.js
│
├── DssGrid/
│   ├── 1-structure/
│   │   └── DssGrid.ts.vue
│   ├── 2-composition/
│   │   └── _base.scss
│   ├── 3-variants/
│   │   ├── _responsive.scss
│   │   └── index.scss
│   ├── 4-output/
│   │   └── index.scss
│   ├── DssGrid.module.scss
│   ├── DssGrid.example.vue
│   ├── README.md
│   └── index.js
│
├── DssSpacer/
│   ├── 1-structure/
│   │   └── DssSpacer.ts.vue
│   ├── 2-composition/
│   │   └── _base.scss
│   ├── DssSpacer.module.scss
│   ├── README.md
│   └── index.js
│
└── index.js
```

---

### INCONSISTÊNCIA #13 - Tokens de Grid Gap
**Decisão:** Documentar tokens existentes em `dss-grid-layout.md`

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 13.1 | ✅ | Adicionar seção sobre `--dss-grid-gap-*` | `docs/guides/dss-grid-layout.md` (Seção 7.4) |
| 13.2 | ✅ | Documentar relação com `--dss-gutter-*` | `docs/guides/dss-grid-layout.md` (Seção 7.3) |

**Conteúdo a adicionar em `dss-grid-layout.md`:**
```markdown
### Tokens de Grid Gap

O DSS fornece tokens específicos para gaps em layouts flex e grid:

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-grid-gap-sm` | `var(--dss-spacing-2)` (8px) | Gaps pequenos |
| `--dss-grid-gap-md` | `var(--dss-spacing-4)` (16px) | Gap padrão |
| `--dss-grid-gap-lg` | `var(--dss-spacing-6)` (24px) | Gaps maiores |
| `--dss-grid-gap-xl` | `var(--dss-spacing-8)` (32px) | Gaps grandes |

#### Relação com Gutters Responsivos

Os gutters responsivos (`--dss-gutter-*`) são automaticamente aplicados
por breakpoint, enquanto os grid gaps são valores fixos:

| Breakpoint | Gutter | Grid Gap Sugerido |
|------------|--------|-------------------|
| XS | 8px | `--dss-grid-gap-sm` |
| SM | 16px | `--dss-grid-gap-md` |
| MD | 24px | `--dss-grid-gap-lg` |
| LG | 32px | `--dss-grid-gap-xl` |
| XL | 40px | `--dss-grid-gap-xl` |
```

---

### INCONSISTÊNCIA #14 - Componente QGrid (Inexistente)
**Decisão:** Substituir por sistema de classes row/col do Quasar

| # | Tarefa | Arquivo | Status |
|---|--------|---------|--------|
| 14.1 | ✅ | Remover referência a `<q-grid>` | `docs/guides/dss-grid-layout.md` (Seção 6.2) |
| 14.2 | ✅ | Substituir por classes Quasar `row`/`col-*` | `docs/guides/dss-grid-layout.md` (Seção 6.2.1) |
| 14.3 | ✅ | Documentar integração DSS + Quasar grid | `docs/guides/dss-grid-layout.md` (Seção 6.2.2) |

**Conteúdo a corrigir em `dss-grid-layout.md` (Seção 6.2.1):**
```markdown
#### 6.2.1 Sistema de Grid Flexbox do Quasar

O Quasar utiliza um sistema de grid baseado em Flexbox com classes CSS:

```vue
<template>
  <!-- Grid responsivo com classes Quasar -->
  <div class="row q-col-gutter-md">
    <!-- 12 colunas em desktop, 6 em tablet, 12 em mobile -->
    <div class="col-12 col-sm-6 col-md-4">
      <q-card>Coluna 1</q-card>
    </div>
    <div class="col-12 col-sm-6 col-md-4">
      <q-card>Coluna 2</q-card>
    </div>
    <div class="col-12 col-sm-12 col-md-4">
      <q-card>Coluna 3</q-card>
    </div>
  </div>
</template>
```

**Classes disponíveis:**

| Classe | Descrição |
|--------|-----------|
| `.row` | Container flexbox horizontal |
| `.col-{n}` | Largura de coluna (1-12) |
| `.col-sm-{n}` | Largura a partir de SM (640px) |
| `.col-md-{n}` | Largura a partir de MD (1024px) |
| `.col-lg-{n}` | Largura a partir de LG (1440px) |
| `.col-xl-{n}` | Largura a partir de XL (1920px) |
| `.q-col-gutter-{size}` | Gutter entre colunas (xs, sm, md, lg, xl) |
| `.offset-{n}` | Offset de colunas |
```

---

## 📅 CRONOGRAMA SUGERIDO

| Fase | Descrição | Tarefas | Prioridade |
|------|-----------|---------|------------|
| **1** | Breakpoints Críticos | #1, #2, #3 | 🔴 Alta |
| **2** | Alinhamento Técnico | #4, #5, #6 | 🟠 Média-Alta |
| **3** | Padronização | #7, #8, #9, #10, #11 | 🟡 Média |
| **4** | Documentação | #12, #13, #14 | 🟢 Normal |

---

## ✅ CHECKLIST DE VALIDAÇÃO FINAL

Após implementação de todas as tarefas:

- [x] Todos os breakpoints usam os mesmos valores em todos os arquivos
- [x] Containers máximos são proporcionais e consistentes
- [x] Gutters seguem escala definida
- [x] Sistema 4/8/12 colunas está implementado
- [x] Nomenclatura de classes segue padrão BEM
- [x] Documentação está completa e consistente
- [ ] Componentes de layout seguem arquitetura de 4 camadas (adiado)
- [ ] Build do DSS compila sem erros (pendente teste)
- [ ] Playground (`dss-example`) funciona corretamente (pendente teste)
- [ ] Testes visuais validados (pendente teste)

---

## 📚 REFERÊNCIAS

- [Tailwind CSS Breakpoints](https://tailwindcss.com/docs/responsive-design)
- [Quasar Flex Grid](https://quasar.dev/layout/grid/introduction)
- [CSS Naming Conventions Best Practices](https://mastheadtechnology.com/blog/css-class-naming-conventions-best-practices/)
- [BEM CSS Naming Convention](https://cyrusyip.org/en/posts/2024/09/08/css-bem-guide/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Documento criado em:** Janeiro 2025
**Versão:** 1.0
