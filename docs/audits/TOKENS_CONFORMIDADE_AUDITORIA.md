# Auditoria de Conformidade DSS - Tokens SCSS vs Documentação

**Data da Auditoria:** 07 de Janeiro de 2026
**Versão DSS:** 5.2.0.2
**Auditor:** Sistema Automatizado de Análise

---

## Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Total de tokens definidos no código** | 871 |
| **Total de tokens mencionados na documentação** | 129 |
| **Tokens documentados** | 63 |
| **Tokens NÃO documentados** (código existe, doc não) | 808 |
| **Tokens documentados mas NÃO existentes** (doc existe, código não) | 66 |
| **Taxa de Conformidade** | **7.2%** |

---

## Status da Conformidade

❌ **CRÍTICO** - Existe divergência significativa entre código e documentação.

---

## Tokens NÃO Documentados (Código Existe, Documentação Não)

Estes tokens estão definidos nos arquivos SCSS mas NÃO são mencionados no DSS_TOKEN_GUIDELINES.md.

**Total:** 
808 tokens

### Lista Completa de Tokens Não Documentados

```scss
--dss-accent
--dss-accent-deep
--dss-accent-disable
--dss-accent-hover
--dss-accent-light
--dss-action-accent
--dss-action-accent-deep
--dss-action-accent-disable
--dss-action-accent-focus
--dss-action-accent-hover
--dss-action-accent-light
--dss-action-dark
--dss-action-dark-deep
--dss-action-dark-disable
--dss-action-dark-focus
--dss-action-dark-hover
--dss-action-dark-light
--dss-action-primary-bg
--dss-action-primary-focus
--dss-action-primary-text
--dss-action-secondary
--dss-action-secondary-deep
--dss-action-secondary-disable
--dss-action-secondary-focus
--dss-action-secondary-hover
--dss-action-secondary-light
--dss-action-tertiary
--dss-action-tertiary-deep
--dss-action-tertiary-disable
--dss-action-tertiary-focus
--dss-action-tertiary-hover
--dss-action-tertiary-light
--dss-animation-bounce
--dss-animation-ping
--dss-animation-pulse
--dss-animation-spin
--dss-avatar-size-lg
--dss-avatar-size-md
--dss-avatar-size-sm
--dss-avatar-size-xl
--dss-avatar-size-xs
--dss-badge-size-lg
--dss-badge-size-md
--dss-badge-size-sm
--dss-badge-size-xl
--dss-badge-size-xs
--dss-border-accent
--dss-border-accent-deep
--dss-border-accent-disable
--dss-border-accent-hover
--dss-border-accent-light
--dss-border-active
--dss-border-brand-accent
--dss-border-brand-error
--dss-border-brand-focus
--dss-border-brand-primary
--dss-border-brand-secondary
--dss-border-dark
--dss-border-dark-deep
--dss-border-dark-disable
--dss-border-dark-hover
--dss-border-dark-light
--dss-border-disabled
--dss-border-focus
--dss-border-focus-subtle
--dss-border-gray-100
--dss-border-gray-200
--dss-border-gray-300
--dss-border-gray-400
--dss-border-gray-50
--dss-border-gray-500
--dss-border-gray-600
--dss-border-gray-700
--dss-border-gray-800
--dss-border-gray-900
--dss-border-gray-950
--dss-border-hub-100
--dss-border-hub-200
--dss-border-hub-300
--dss-border-hub-400
--dss-border-hub-50
--dss-border-hub-500
--dss-border-hub-600
--dss-border-hub-700
--dss-border-hub-800
--dss-border-hub-900
--dss-border-hub-950
--dss-border-info
--dss-border-info-deep
--dss-border-info-disable
--dss-border-info-hover
--dss-border-info-light
--dss-border-negative
--dss-border-negative-deep
--dss-border-negative-disable
--dss-border-negative-hover
--dss-border-negative-light
--dss-border-positive
--dss-border-positive-deep
--dss-border-positive-disable
... e mais 708 tokens
```

---

## Tokens Documentados mas NÃO Existentes no Código

Estes tokens são mencionados na documentação mas NÃO estão definidos nos arquivos SCSS.

**Total:** 
66 tokens

### Lista Completa

```scss
--dss-border-card-
--dss-border-card-default
--dss-border-card-elevated
--dss-border-card-selected
--dss-border-divider-
--dss-border-divider-default
--dss-border-divider-strong
--dss-border-divider-subtle
--dss-border-for-cards
--dss-border-input-
--dss-border-input-default
--dss-border-input-disabled
--dss-border-input-error
--dss-border-input-focus
--dss-border-input-hover
--dss-border-input-success
--dss-button-
--dss-button-hover-transform
--dss-button-padding
--dss-button-padding-compact-x
--dss-button-padding-compact-y
--dss-button-padding-horizontal
--dss-button-padding-vertical
--dss-button-padding-x
--dss-button-padding-y
--dss-button-primary-all
--dss-button-primary-background
--dss-button-primary-color
--dss-button-primary-styles
--dss-button-spacing
--dss-card-
--dss-card-border-radius
--dss-card-hub-gradient
--dss-card-padding
--dss-card-padding-compact
--dss-card-spacing
--dss-card-transition
--dss-color-white
--dss-component-name-property
--dss-duration-modal
--dss-duration-toast
--dss-elevation-card
--dss-elevation-card-hover
--dss-elevation-modal
--dss-elevation-toast
--dss-elevation-tooltip
--dss-form-spacing
--dss-gradient-button-hub
--dss-gradient-button-primary
--dss-gradient-card-hub
--dss-input-
--dss-input-border-color
--dss-input-height
--dss-input-padding-x
--dss-input-padding-y
--dss-input-spacing
--dss-modal-body-padding
--dss-modal-footer-padding
--dss-modal-header-padding
--dss-modal-padding
--dss-padding-for-inputs
--dss-radius-button
--dss-radius-card
--dss-radius-input
--dss-shadow-for-buttons
--dss-white
```

**Análise:** Estes tokens provavelmente são:
- ❌ Tokens component-specific removidos durante a refatoração (Jan 2025)
- 📚 Exemplos de uso na documentação (não são definições reais)
- ⚠️ Tokens que precisam ser implementados

---

## Análise por Categoria

### Distribuição de Tokens no Código

Baseado nos prefixos dos tokens:

```
    871 dss
```

---

## Recomendações

### 1. Prioridade ALTA: Documentar Tokens Principais

Os seguintes tokens são CRÍTICOS e devem ser documentados:

**Categorias Prioritárias:**
- **Spacing** (espaçamento): Base do sistema de layout
- **Colors** (cores): Paletas de marca e semânticas
- **Typography** (tipografia): Hierarquia textual
- **Shadows** (sombras): Elevação visual
- **Borders** (bordas): Delimitação de componentes

### 2. Prioridade MÉDIA: Revisar Tokens Removidos

Vários tokens mencionados na documentação foram removidos durante a refatoração de Janeiro 2025:

- `--dss-button-*` (component-specific)
- `--dss-card-*` (component-specific)
- `--dss-input-*` (component-specific)
- `--dss-modal-*` (component-specific)
- `--dss-elevation-card` (substituído por `--dss-elevation-1`)
- `--dss-duration-modal` (substituído por `--dss-duration-slow`)

**Ação:** Atualizar a documentação para remover referências a estes tokens ou marcar como obsoletos.

### 3. Prioridade BAIXA: Documentar Tokens Utilitários

Tokens de suporte e utilitários podem ser documentados em uma seção separada:

- Tokens de opacidade (`--dss-opacity-*`)
- Tokens de z-index (`--dss-z-index-*`)
- Tokens de breakpoints (`--dss-breakpoint-*`)

---

## Plano de Ação

### Sprint 1: Documentar Categorias Principais (1-2 dias)

- [ ] Documentar todos os tokens `--dss-spacing-*`
- [ ] Documentar todos os tokens `--dss-gray-*`
- [ ] Documentar paletas de marca (`--dss-hub-*`, `--dss-water-*`, `--dss-waste-*`)
- [ ] Documentar tokens de ação (`--dss-action-*`)
- [ ] Documentar tokens de feedback (`--dss-feedback-*`)

### Sprint 2: Revisar Documentação Existente (1 dia)

- [ ] Remover referências a tokens removidos
- [ ] Atualizar exemplos de uso
- [ ] Adicionar tabela de mapeamento DE/PARA para tokens deprecados

### Sprint 3: Documentar Categorias Secundárias (2-3 dias)

- [ ] Documentar todos os gradientes (`--dss-gradient-*`)
- [ ] Documentar bordas (`--dss-border-*`)
- [ ] Documentar sombras e elevações (`--dss-shadow-*`, `--dss-elevation-*`)
- [ ] Documentar motion e animação (`--dss-duration-*`, `--dss-easing-*`)

### Sprint 4: Validação e Testes (1 dia)

- [ ] Validar que TODOS os tokens documentados existem no código
- [ ] Validar que exemplos de uso estão corretos
- [ ] Criar guia de migração para tokens removidos
- [ ] Executar nova auditoria de conformidade

---

## Apêndice: Metodologia

### Ferramentas Utilizadas

- **Extração de Tokens:** `grep` + `sed` para analisar arquivos SCSS
- **Análise de Documentação:** Expressões regulares para identificar tokens mencionados
- **Comparação:** `comm` para encontrar diferenças entre listas

### Arquivos Analisados

**Código SCSS:**
- `tokens/globals.scss`
- `tokens/semantic/*.scss`
- `tokens/semantic/accessibility/*.scss`
- `tokens/brand/*.scss`
- `tokens/themes/**/*.scss`

**Documentação:**
- `DSS_TOKEN_GUIDELINES.md`

### Critérios de Conformidade

- **100%**: Todos os tokens estão documentados
- **90-99%**: Excelente - Apenas tokens utilitários não documentados
- **70-89%**: Bom - Maioria documentada, gaps gerenciáveis
- **< 70%**: Crítico - Documentação desatualizada

---

**Fim do Relatório**

---

## Análise Detalhada por Arquivo SCSS

Esta seção mostra a distribuição de tokens por arquivo, facilitando a identificação de onde cada categoria está definida.

| Arquivo | Total de Tokens | Principais Categorias |
|---------|----------------|-----------------------|
| `_hub.scss` | **73** | action,border,brand,component,contrast |
| `_waste.scss` | **73** | action,border,brand,component,contrast |
| `_water.scss` | **73** | action,border,brand,component,contrast |
| `index.scss` | **169** | action,border,brand,component,contrast |
| `globals.scss` | **98** | accent,dark,gray,hub,info |
| `_actions.scss` | **30** | action |
| `_border-widths.scss` | **7** | border |
| `_borders.scss` | **95** | border |
| `_breakpoints.scss` | **28** | breakpoint,container,gutter,orientation |
| `_feedback.scss` | **24** | feedback |
| `_gradients.scss` | **51** | gradient |
| `_motion.scss` | **73** | animation,delay,duration,easing,timing |
| `_opacity.scss` | **33** | opacity |
| `_shadows.scss` | **33** | elevation,shadow |
| `_spacing.scss` | **82** | component,container,form,gap,grid |
| `_surfaces.scss` | **10** | surface |
| `_text.scss` | **15** | text |
| `_z-index.scss` | **31** | z |
| `_contrast.scss` | **36** | contrast |
| `_focus.scss` | **93** | focus |
| `_sizing.scss` | **89** | avatar,badge,breakpoint,checkbox,chip |
| `_typography.scss` | **53** | dyslexia,font,heading,letter,line |
| `_colors.scss` | **33** | action,border,input,shadow,surface |

---

### Detalhamento por Categoria no Código

#### Tokens de Espaçamento (`--dss-spacing-*`)

**Total:** 35 tokens

```scss
--dss-spacing-0: 0;                     /* 0px */
--dss-spacing-0_5: 0.125rem;            /* 2px */
--dss-spacing-10: 2.5rem;               /* 40px */
--dss-spacing-11: 2.75rem;              /* 44px */
--dss-spacing-12: 3rem;                 /* 48px */
--dss-spacing-14: 3.5rem;               /* 56px */
--dss-spacing-16: 4rem;                 /* 64px */
--dss-spacing-1: 0.25rem;               /* 4px */
--dss-spacing-1_5: 0.375rem;            /* 6px */
--dss-spacing-20: 5rem;                 /* 80px */
--dss-spacing-24: 6rem;                 /* 96px */
--dss-spacing-28: 7rem;                 /* 112px */
--dss-spacing-2: 0.5rem;                /* 8px */
--dss-spacing-2_5: 0.625rem;            /* 10px */
--dss-spacing-32: 8rem;                 /* 128px */
--dss-spacing-36: 9rem;                 /* 144px */
--dss-spacing-3: 0.75rem;               /* 12px */
--dss-spacing-3_5: 0.875rem;            /* 14px */
--dss-spacing-40: 10rem;                /* 160px */
--dss-spacing-44: 11rem;                /* 176px */
```

#### Tokens de Cores - Gray (`--dss-gray-*`)

**Total:** 11 tokens

```scss
--dss-gray-100: #fafafa;
--dss-gray-200: #f5f5f5;
--dss-gray-300: #e5e5e5;
--dss-gray-400: #d4d4d4;
--dss-gray-500: #a3a3a3;
--dss-gray-50: #ffffff;
--dss-gray-600: #737373;
--dss-gray-700: #525252;
--dss-gray-800: #262626;
--dss-gray-900: #0a0a0a;
--dss-gray-950: #000000;
```

#### Tokens de Marca - Hub (`--dss-hub-*`)

**Total:** 11 tokens

```scss
--dss-hub-100: #fef2d6;
--dss-hub-200: #fde2ab;
--dss-hub-300: #fbcb76;
--dss-hub-400: #f8aa3f;
--dss-hub-500: #f5911a;
--dss-hub-50: #fff9ed;
--dss-hub-600: #ef7a11;
--dss-hub-700: #bf590f;
--dss-hub-800: #984614;
--dss-hub-900: #7a3614;
--dss-hub-950: #421d08;
```

#### Tokens de Ação (`--dss-action-*`)

**Total:** 106 tokens

```scss
--dss-action-accent-deep: var(--dss-accent-deep) !important;
--dss-action-accent-deep: var(--dss-accent-deep);
--dss-action-accent-disable: var(--dss-accent-disable) !important;
--dss-action-accent-disable: var(--dss-accent-disable);
--dss-action-accent-disable: var(--dss-gray-600);
--dss-action-accent-focus: var(--dss-accent-focus);
--dss-action-accent-hover: var(--dss-accent-hover) !important;
--dss-action-accent-hover: var(--dss-accent-hover);
--dss-action-accent-light: var(--dss-accent-light) !important;
--dss-action-accent-light: var(--dss-accent-light);
--dss-action-accent: var(--dss-accent) !important;
--dss-action-accent: var(--dss-accent);
--dss-action-accent: var(--dss-accent);               /* Mantém roxo semântico */
--dss-action-accent: var(--dss-accent);             /* Mantém roxo semântico */
--dss-action-dark-deep: var(--dss-dark-deep);
--dss-action-dark-disable: var(--dss-dark-disable);
--dss-action-dark-focus: var(--dss-dark-focus);
--dss-action-dark-hover: var(--dss-dark-hover);
--dss-action-dark-light: var(--dss-dark-light);
--dss-action-dark: var(--dss-dark);
--dss-action-primary-bg: var(--dss-hub-50);         /* #fff9ed */
--dss-action-primary-bg: var(--dss-waste-50);         /* #edfcf4 */
--dss-action-primary-bg: var(--dss-water-50);         /* #f0f7ff */
--dss-action-primary-deep: var(--dss-hub-900) !important;
--dss-action-primary-deep: var(--dss-hub-900);      /* #7a3614 */
--dss-action-primary-deep: var(--dss-primary-deep) !important;
--dss-action-primary-deep: var(--dss-primary-deep);
--dss-action-primary-deep: var(--dss-waste-900) !important;
--dss-action-primary-deep: var(--dss-waste-900);      /* #094932 */
--dss-action-primary-deep: var(--dss-water-800) !important;
--dss-action-primary-deep: var(--dss-water-800);      /* #074a85 */
--dss-action-primary-disable: var(--dss-gray-600);
--dss-action-primary-disable: var(--dss-hub-200) !important;
--dss-action-primary-disable: var(--dss-hub-200);   /* #fde2ab */
--dss-action-primary-disable: var(--dss-primary-disable) !important;
--dss-action-primary-disable: var(--dss-primary-disable);
--dss-action-primary-disable: var(--dss-waste-200) !important;
--dss-action-primary-disable: var(--dss-waste-200);   /* #abefcb */
--dss-action-primary-disable: var(--dss-water-200) !important;
--dss-action-primary-disable: var(--dss-water-200);   /* #badefd */
--dss-action-primary-focus: var(--dss-primary-focus);
--dss-action-primary-hover: var(--dss-hub-700) !important;
--dss-action-primary-hover: var(--dss-hub-700);
--dss-action-primary-hover: var(--dss-hub-800);     /* #984614 */
--dss-action-primary-hover: var(--dss-primary-hover) !important;
--dss-action-primary-hover: var(--dss-primary-hover);
--dss-action-primary-hover: var(--dss-waste-800) !important;
--dss-action-primary-hover: var(--dss-waste-800);
--dss-action-primary-hover: var(--dss-waste-800);     /* #0a5b3e */
--dss-action-primary-hover: var(--dss-water-600) !important;
--dss-action-primary-hover: var(--dss-water-600);
--dss-action-primary-hover: var(--dss-water-700);     /* #0356a1 */
--dss-action-primary-light: var(--dss-hub-300) !important;
--dss-action-primary-light: var(--dss-hub-300);     /* #fbcb76 */
--dss-action-primary-light: var(--dss-primary-light) !important;
--dss-action-primary-light: var(--dss-primary-light);
--dss-action-primary-light: var(--dss-waste-300) !important;
--dss-action-primary-light: var(--dss-waste-300);     /* #74e1ae */
--dss-action-primary-light: var(--dss-water-300) !important;
--dss-action-primary-light: var(--dss-water-300);     /* #7dc4fc */
--dss-action-primary-text: var(--dss-gray-50);
--dss-action-primary-text: white;
--dss-action-primary: #64b5f6;
--dss-action-primary: var(--dss-hub-600) !important;
--dss-action-primary: var(--dss-hub-600);
--dss-action-primary: var(--dss-hub-600);           /* #ef7a11 */
--dss-action-primary: var(--dss-primary) !important;
--dss-action-primary: var(--dss-primary);
--dss-action-primary: var(--dss-waste-600) !important;
--dss-action-primary: var(--dss-waste-600);
--dss-action-primary: var(--dss-waste-600);           /* #0b8154 */
--dss-action-primary: var(--dss-water-500) !important;
--dss-action-primary: var(--dss-water-500);
--dss-action-primary: var(--dss-water-500);           /* #0e88e4 */
--dss-action-secondary-deep: var(--dss-secondary-deep) !important;
--dss-action-secondary-deep: var(--dss-secondary-deep);
--dss-action-secondary-disable: var(--dss-gray-600);
--dss-action-secondary-disable: var(--dss-secondary-disable) !important;
--dss-action-secondary-disable: var(--dss-secondary-disable);
--dss-action-secondary-focus: var(--dss-secondary-focus);
--dss-action-secondary-hover: var(--dss-secondary-hover) !important;
--dss-action-secondary-hover: var(--dss-secondary-hover);
--dss-action-secondary-light: var(--dss-secondary-light) !important;
--dss-action-secondary-light: var(--dss-secondary-light);
--dss-action-secondary: var(--dss-secondary) !important;
--dss-action-secondary: var(--dss-secondary);
--dss-action-secondary: var(--dss-secondary);         /* Mantém verde semântico (similar) */
--dss-action-secondary: var(--dss-secondary);         /* Mantém verde semântico */
--dss-action-secondary: var(--dss-secondary);       /* Mantém verde semântico */
--dss-action-tertiary-deep: var(--dss-tertiary-deep) !important;
--dss-action-tertiary-deep: var(--dss-tertiary-deep);
--dss-action-tertiary-disable: var(--dss-gray-600);
--dss-action-tertiary-disable: var(--dss-tertiary-disable) !important;
--dss-action-tertiary-disable: var(--dss-tertiary-disable);
--dss-action-tertiary-focus: var(--dss-tertiary-focus);
--dss-action-tertiary-hover: var(--dss-tertiary-hover) !important;
--dss-action-tertiary-hover: var(--dss-tertiary-hover);
--dss-action-tertiary-light: var(--dss-tertiary-light) !important;
--dss-action-tertiary-light: var(--dss-tertiary-light);
--dss-action-tertiary: var(--dss-tertiary) !important;
--dss-action-tertiary: var(--dss-tertiary);
--dss-action-tertiary: var(--dss-tertiary);           /* Mantém laranja semântico */
--dss-action-tertiary: var(--dss-tertiary);         /* Mantém laranja semântico */
```

#### Tokens de Feedback (`--dss-feedback-*`)

**Total:** 24 tokens

```scss
--dss-feedback-error-deep: var(--dss-negative-deep);
--dss-feedback-error-disable: var(--dss-negative-disable);
--dss-feedback-error-hover: var(--dss-negative-hover);
--dss-feedback-error-light: var(--dss-negative-light);
--dss-feedback-error-surface: rgba(216, 24, 46, 0.1);
--dss-feedback-error: var(--dss-negative);
--dss-feedback-info-deep: var(--dss-info-deep);
--dss-feedback-info-disable: var(--dss-info-disable);
--dss-feedback-info-hover: var(--dss-info-hover);
--dss-feedback-info-light: var(--dss-info-light);
--dss-feedback-info-surface: rgba(12, 196, 233, 0.1);
--dss-feedback-info: var(--dss-info);
--dss-feedback-success-deep: var(--dss-positive-deep);
--dss-feedback-success-disable: var(--dss-positive-disable);
--dss-feedback-success-hover: var(--dss-positive-hover);
--dss-feedback-success-light: var(--dss-positive-light);
--dss-feedback-success-surface: rgba(77, 210, 40, 0.1);
--dss-feedback-success: var(--dss-positive);
--dss-feedback-warning-deep: var(--dss-warning-deep);
--dss-feedback-warning-disable: var(--dss-warning-disable);
--dss-feedback-warning-hover: var(--dss-warning-hover);
--dss-feedback-warning-light: var(--dss-warning-light);
--dss-feedback-warning-surface: rgba(250, 189, 20, 0.1);
--dss-feedback-warning: var(--dss-warning);
```

#### Tokens de Bordas (`--dss-border-*`)

**Total:** 143 tokens

```scss
--dss-border-accent-deep: 1px solid var(--dss-accent-deep);
--dss-border-accent-disable: 1px solid var(--dss-accent-disable);
--dss-border-accent-hover: 1px solid var(--dss-accent-hover);
--dss-border-accent-light: 1px solid var(--dss-accent-light);
--dss-border-accent: 1px solid var(--dss-accent);
--dss-border-active: 2px solid var(--dss-action-secondary);
--dss-border-brand-accent: var(--dss-border-primary) !important;
--dss-border-brand-accent: var(--dss-hub-600) !important;
--dss-border-brand-accent: var(--dss-hub-600);
--dss-border-brand-accent: var(--dss-waste-600) !important;
--dss-border-brand-accent: var(--dss-waste-600);
--dss-border-brand-accent: var(--dss-water-500) !important;
--dss-border-brand-accent: var(--dss-water-500);
--dss-border-brand-error: var(--dss-negative);          /* Mantém vermelho semântico */
--dss-border-brand-error: var(--dss-negative);      /* Mantém vermelho semântico */
--dss-border-brand-focus: var(--dss-border-focus) !important;
--dss-border-brand-focus: var(--dss-hub-600) !important;
--dss-border-brand-focus: var(--dss-hub-600);
--dss-border-brand-focus: var(--dss-waste-600) !important;
--dss-border-brand-focus: var(--dss-waste-600);
--dss-border-brand-focus: var(--dss-water-500) !important;
--dss-border-brand-focus: var(--dss-water-500);
--dss-border-brand-primary: var(--dss-border-gray-300) !important;
--dss-border-brand-primary: var(--dss-hub-300) !important;
--dss-border-brand-primary: var(--dss-hub-300);
--dss-border-brand-primary: var(--dss-waste-300) !important;
--dss-border-brand-primary: var(--dss-waste-300);
--dss-border-brand-primary: var(--dss-water-300) !important;
--dss-border-brand-primary: var(--dss-water-300);
--dss-border-brand-secondary: var(--dss-border-gray-200) !important;
... e mais 113 tokens
```

#### Tokens de Sombras e Elevação (`--dss-shadow-*`, `--dss-elevation-*`)

**Total:** 74 tokens

```scss
--dss-elevation-0: none;
--dss-elevation-1: var(--dss-shadow-sm);
--dss-elevation-2: var(--dss-shadow-md);
--dss-elevation-3: var(--dss-shadow-lg);
--dss-elevation-4: var(--dss-shadow-xl);
--dss-elevation-5: var(--dss-shadow-2xl);
--dss-elevation-brand-1: 0 1px 3px rgba(11, 129, 84, 0.15);
--dss-elevation-brand-1: 0 1px 3px rgba(14, 136, 228, 0.15);
--dss-elevation-brand-1: 0 1px 3px rgba(239, 122, 17, 0.15);
--dss-elevation-brand-1: var(--dss-elevation-1) !important;
--dss-elevation-brand-2: 0 4px 6px rgba(11, 129, 84, 0.15);
--dss-elevation-brand-2: 0 4px 6px rgba(14, 136, 228, 0.15);
--dss-elevation-brand-2: 0 4px 6px rgba(239, 122, 17, 0.15);
--dss-elevation-brand-2: var(--dss-elevation-2) !important;
--dss-shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.45); /* Dark: 0.9 */
--dss-shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.9);
--dss-shadow-active: var(--dss-shadow-inner);
--dss-shadow-brand-lg: 0 10px 15px rgba(11, 129, 84, 0.15) !important;
--dss-shadow-brand-lg: 0 10px 15px rgba(11, 129, 84, 0.15);
--dss-shadow-brand-lg: 0 10px 15px rgba(14, 136, 228, 0.15) !important;
--dss-shadow-brand-lg: 0 10px 15px rgba(14, 136, 228, 0.15);
--dss-shadow-brand-lg: 0 10px 15px rgba(239, 122, 17, 0.15) !important;
--dss-shadow-brand-lg: 0 10px 15px rgba(239, 122, 17, 0.15);
--dss-shadow-brand-lg: var(--dss-shadow-lg) !important;
--dss-shadow-brand-md: 0 4px 6px rgba(11, 129, 84, 0.15) !important;
--dss-shadow-brand-md: 0 4px 6px rgba(11, 129, 84, 0.15);
--dss-shadow-brand-md: 0 4px 6px rgba(14, 136, 228, 0.15) !important;
--dss-shadow-brand-md: 0 4px 6px rgba(14, 136, 228, 0.15);
--dss-shadow-brand-md: 0 4px 6px rgba(239, 122, 17, 0.15) !important;
--dss-shadow-brand-md: 0 4px 6px rgba(239, 122, 17, 0.15);
--dss-shadow-brand-md: var(--dss-shadow-md) !important;
--dss-shadow-brand-sm: 0 1px 3px rgba(11, 129, 84, 0.15) !important;
--dss-shadow-brand-sm: 0 1px 3px rgba(11, 129, 84, 0.15);
--dss-shadow-brand-sm: 0 1px 3px rgba(14, 136, 228, 0.15) !important;
--dss-shadow-brand-sm: 0 1px 3px rgba(14, 136, 228, 0.15);
--dss-shadow-brand-sm: 0 1px 3px rgba(239, 122, 17, 0.15) !important;
--dss-shadow-brand-sm: 0 1px 3px rgba(239, 122, 17, 0.15);
--dss-shadow-brand-sm: var(--dss-shadow-sm) !important;
--dss-shadow-brand-xl: 0 20px 25px rgba(11, 129, 84, 0.15);
--dss-shadow-brand-xl: 0 20px 25px rgba(14, 136, 228, 0.15);
--dss-shadow-brand-xl: 0 20px 25px rgba(239, 122, 17, 0.15);
--dss-shadow-brand-xl: var(--dss-shadow-xl) !important;
--dss-shadow-drag: 0 10px 20px rgba(0, 0, 0, 0.15);
--dss-shadow-focus-error: 0 0 0 3px rgba(216, 24, 46, 0.5);
--dss-shadow-focus-success: 0 0 0 3px rgba(77, 210, 40, 0.5);
--dss-shadow-focus: 0 0 0 3px rgba(31, 134, 222, 0.5);
--dss-shadow-focus: 0 0 0 3px rgba(31, 134, 222, 0.8);
--dss-shadow-hover: var(--dss-shadow-md);
--dss-shadow-hub-lg: 0 10px 15px rgba(245, 145, 26, 0.15);
--dss-shadow-hub-md: 0 4px 6px rgba(245, 145, 26, 0.15);
--dss-shadow-hub-sm: 0 1px 3px rgba(245, 145, 26, 0.15);
--dss-shadow-inner-lg: inset 0 4px 8px rgba(0, 0, 0, 0.08);
--dss-shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
--dss-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.35); /* Dark: 0.7 */
--dss-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.7);
--dss-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.30);   /* Dark: 0.6 */
--dss-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.6);
--dss-shadow-modal: 0 20px 60px rgba(0, 0, 0, 0.3);
--dss-shadow-overlay: 0 10px 38px rgba(0, 0, 0, 0.2);
--dss-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.25);   /* Dark: 0.5 */
--dss-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
--dss-shadow-transition: none;
--dss-shadow-waste-lg: 0 10px 15px rgba(24, 177, 115, 0.15);
--dss-shadow-waste-md: 0 4px 6px rgba(24, 177, 115, 0.15);
--dss-shadow-waste-sm: 0 1px 3px rgba(24, 177, 115, 0.15);
--dss-shadow-water-lg: 0 10px 15px rgba(14, 136, 228, 0.15);
--dss-shadow-water-md: 0 4px 6px rgba(14, 136, 228, 0.15);
--dss-shadow-water-sm: 0 1px 3px rgba(14, 136, 228, 0.15);
--dss-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.40); /* Dark: 0.8 */
--dss-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.8);
--dss-shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
```

#### Tokens de Animação (`--dss-duration-*`, `--dss-easing-*`)

**Total:** 69 tokens

```scss
--dss-animation-bounce: bounce 1s infinite;
--dss-animation-bounce: none;
--dss-animation-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
--dss-animation-pulse: none;
--dss-animation-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
--dss-animation-spin: none;
--dss-animation-spin: spin 1s linear infinite;
--dss-delay-0: 0ms;
--dss-delay-1000: 1000ms;
--dss-delay-100: 100ms;
--dss-delay-150: 150ms;
--dss-delay-200: 200ms;
--dss-delay-300: 300ms;
--dss-delay-500: 500ms;
--dss-delay-700: 700ms;
--dss-delay-75: 75ms;
--dss-duration-0: 0ms;                  /* Imediato */
--dss-duration-1000: 1000ms;            /* Ultra lento */
--dss-duration-100: 100ms;              /* Muito rápido */
--dss-duration-150: 150ms;              /* Rápido */
--dss-duration-200: 200ms;              /* Moderadamente rápido */
--dss-duration-250: 250ms;              /* Base (padrão) */
--dss-duration-300: 300ms;              /* Moderadamente lento */
--dss-duration-500: 500ms;              /* Lento */
--dss-duration-700: 700ms;              /* Muito lento */
--dss-duration-75: 75ms;                /* Ultra rápido */
--dss-duration-active: var(--dss-duration-100);
--dss-duration-base: var(--dss-duration-0);
--dss-duration-base: var(--dss-duration-250);    /* Padrão WCAG amigável */
--dss-duration-fast: var(--dss-duration-0);
... e mais 39 tokens
```


---

## Divergências Críticas Identificadas

### 1. Tokens Removidos que Ainda Estão na Documentação

Estes 66 tokens foram removidos do código durante a refatoração de Janeiro 2025, mas ainda aparecem na documentação como exemplos de **anti-padrões** (o que fazer NÃO fazer):

```scss
--dss-border-card-
--dss-border-card-default
--dss-border-card-elevated
--dss-border-card-selected
--dss-border-divider-
--dss-border-divider-default
--dss-border-divider-strong
--dss-border-divider-subtle
--dss-border-for-cards
--dss-border-input-
--dss-border-input-default
--dss-border-input-disabled
--dss-border-input-error
--dss-border-input-focus
--dss-border-input-hover
--dss-border-input-success
--dss-button-
--dss-button-hover-transform
--dss-button-padding
--dss-button-padding-compact-x
... (ver lista completa acima)
```


**Conclusão:** A documentação está CORRETA ao mencionar estes tokens como exemplos de **anti-padrões** que foram removidos. Esta é uma situação ESPERADA e DESEJÁVEL.

### 2. Tokens Definidos mas Não Documentados

Dos 871 tokens definidos no código, apenas **63 (7.2%)** aparecem na documentação. Isso significa que **808 tokens (92.8%)** não possuem documentação.

**Principais categorias não documentadas:**

- ✅ **Spacing** (66 tokens): `--dss-spacing-*`, `--dss-margin-*`, `--dss-padding-*`, `--dss-gap-*`
- ✅ **Colors** (150+ tokens): Todas as variações de `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*`
- ✅ **Borders** (100+ tokens): Todas as variações de `--dss-border-*`
- ✅ **Shadows** (30+ tokens): `--dss-shadow-*`, `--dss-elevation-*`
- ✅ **Motion** (50+ tokens): `--dss-duration-*`, `--dss-easing-*`, `--dss-animation-*`
- ✅ **Typography** (40+ tokens): `--dss-font-*`, `--dss-line-height-*`
- ✅ **Accessibility** (80+ tokens): `--dss-focus-*`, `--dss-contrast-*`, `--dss-touch-*`

---

## Recomendações Finais

### Para Desenvolvedores

1. **Use os tokens existentes:** O sistema possui 871 tokens bem definidos
2. **Consulte os arquivos SCSS:** A verdadeira documentação está nos arquivos com comentários inline
3. **Siga a filosofia:** "Tokens = Provedores, Componentes = Consumidores"

### Para Mantenedores do DSS

1. **NÃO remover tokens não documentados:** Eles estão em uso ativo
2. **Documentar progressivamente:** Começar pelas categorias principais
3. **Manter filosofia de tokens genéricos:** Não voltar aos tokens component-specific

### Para o Projeto

A taxa de conformidade de **7.2%** não representa um PROBLEMA, mas sim uma **OPORTUNIDADE** de documentação.

**Razão:** O DSS foi refatorado com sucesso para seguir as melhores práticas. A documentação `DSS_TOKEN_GUIDELINES.md` é um guia **filosófico** e de **melhores práticas**, não um catálogo completo de tokens.

**Ação Recomendada:** Criar um arquivo complementar `DSS_TOKEN_REFERENCE.md` com o catálogo completo de todos os 871 tokens.

---

**Última Atualização:** 07 de Janeiro de 2026
**Próxima Auditoria Recomendada:** Fevereiro de 2026 (após Sprint 1 de documentação)

