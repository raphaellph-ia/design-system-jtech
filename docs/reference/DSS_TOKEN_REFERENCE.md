# DSS - Referência Completa de Tokens

**Design System Sansys (DSS) - Sistema Multi-Marca Sansys**
**Versão:** v2.2.0
**Data:** Janeiro 2025
**Tokens Documentados:** 903 tokens
**Taxa de Conformidade com Código:** 100%

---

## Sobre Este Documento

Este é o catálogo completo de todos os tokens CSS disponíveis no Design System Sansys (DSS).

### Relação com Outros Documentos

- **DSS_TOKEN_GUIDELINES.md**: Filosofia e boas práticas de uso de tokens
- **DSS_TOKEN_REFERENCE.md** (este documento): Catálogo técnico completo
- **TOKENS_CONFORMIDADE_AUDITORIA.md**: Relatório de auditoria de/para

### Como Usar Este Documento

1. **Busque por categoria** no índice abaixo
2. **Copie o token** desejado da tabela
3. **Use no código** via `var(--nome-do-token)`

### Filosofia dos Tokens DSS

> **Tokens = Provedores, Componentes = Consumidores**

Os tokens DSS são **genéricos e reutilizáveis**. Componentes escolhem livremente quais tokens usar baseado em suas necessidades, sem depender de tokens component-specific.

---

## Índice

### 1. Espaçamento
- [1.1 Escala Base (34 tokens)](#11-escala-base)
- [1.2 Espaçamentos Semânticos (4 tokens)](#12-espaçamentos-semânticos)
- [1.3 Grid e Gap (4 tokens)](#13-grid-e-gap)
- [1.4 Formulários (2 tokens)](#14-formulários)
- [1.5 Margins (9 tokens)](#15-margins)
- [1.6 Paddings (9 tokens)](#16-paddings)
- [1.7 Gaps (8 tokens)](#17-gaps)
- [1.8 Acessibilidade (2 tokens)](#18-acessibilidade)
- [1.9 Border Radius (10 tokens)](#19-border-radius)

### 2. Cores
- [2.1 Gray Palette (11 tokens)](#21-gray-palette)
- [2.2 Brand Palettes (33 tokens)](#22-brand-palettes)
  - Hub (11 tokens)
  - Water (11 tokens)
  - Waste (11 tokens)
- [2.3 Cores Semânticas Base (48 tokens)](#23-cores-semânticas-base)
  - Primary (6 tokens)
  - Secondary (6 tokens)
  - Tertiary (6 tokens)
  - Accent (6 tokens)
  - Dark (6 tokens)
  - Positive (6 tokens)
  - Negative (6 tokens)
  - Warning (6 tokens)
  - Info (6 tokens)
- [2.4 Opacidade (32 tokens)](#24-opacidade)
  - Escala Base (21 tokens)
  - Tokens Semânticos de Estados (5 tokens)
  - Tokens Semânticos de UI (1 token)
  - Tokens de Marca (4 tokens)
  - Funções de Utilidade (2 tokens)

### 3. Actions
- [3.1 Primary Actions (6 tokens)](#31-primary-actions)
- [3.2 Secondary Actions (6 tokens)](#32-secondary-actions)
- [3.3 Tertiary Actions (6 tokens)](#33-tertiary-actions)
- [3.4 Accent Actions (6 tokens)](#34-accent-actions)
- [3.5 Dark Actions (6 tokens)](#35-dark-actions)

### 4. Feedback
- [4.1 Success (5 tokens)](#41-success)
- [4.2 Error (5 tokens)](#42-error)
- [4.3 Warning (5 tokens)](#43-warning)
- [4.4 Info (5 tokens)](#44-info)
- [4.5 Surfaces (4 tokens)](#45-surfaces)

### 5. Motion e Animação
- [5.1 Durações Base (10 tokens)](#51-durações-base)
- [5.2 Durações Semânticas (8 tokens)](#52-durações-semânticas)
- [5.3 Durações Interativas (4 tokens)](#53-durações-interativas)
- [5.4 Curvas de Easing (14 tokens)](#54-curvas-de-easing)
- [5.5 Atrasos (9 tokens)](#55-atrasos)
- [5.6 Transições Semânticas (9 tokens)](#56-transições-semânticas)
- [5.7 Animações Predefinidas (4 tokens)](#57-animações-predefinidas)
- [5.8 Temporizadores (4 tokens)](#58-temporizadores)

### 6. Tipografia
- [6.1 Famílias de Fonte (4 tokens)](#61-famílias-de-fonte)
- [6.2 Tamanhos de Fonte (9 tokens)](#62-tamanhos-de-fonte)
- [6.3 Pesos de Fonte (6 tokens)](#63-pesos-de-fonte)
- [6.4 Altura de Linha (10 tokens)](#64-altura-de-linha)
- [6.5 Espaçamento de Letras (6 tokens)](#65-espaçamento-de-letras)
- [6.6 Hierarquia de Títulos (19 tokens)](#66-hierarquia-de-títulos)
- [6.7 Utilitários de Legibilidade (2 tokens)](#67-utilitários-de-legibilidade)

### 7. Acessibilidade
- [7.1 Focus - Configurações Base (5 tokens)](#71-focus-configurações-base)
- [7.2 Focus - Cores Semânticas (8 tokens)](#72-focus-cores-semânticas)
- [7.3 Focus - Cores de Feedback (8 tokens)](#73-focus-cores-de-feedback)
- [7.4 Focus - Cores Neutras (3 tokens)](#74-focus-cores-neutras)
- [7.5 Focus - Box Shadows (10 tokens)](#75-focus-box-shadows)
- [7.6 Focus - Variantes com Offset (4 tokens)](#76-focus-variantes-com-offset)
- [7.7 Touch Targets (6 tokens)](#77-touch-targets)
- [7.8 Touch Spacing (5 tokens)](#78-touch-spacing)
- [7.9 Input Heights (10 tokens)](#79-input-heights)
- [7.10 Checkboxes e Controles (10 tokens)](#710-checkboxes-e-controles)
- [7.11 Ícones (10 tokens)](#711-ícones)
- [7.12 Avatares (5 tokens)](#712-avatares)
- [7.13 Compact Controls - Alturas Visuais (4 tokens)](#713-compact-controls---alturas-visuais)
- [7.14 Breakpoints (9 tokens)](#714-breakpoints)
- [7.15 Z-Index (10 tokens)](#715-z-index)
- [7.16 Contraste - Ratios WCAG (5 tokens)](#716-contraste-ratios-wcag)
- [7.17 Contraste - Combinações Validadas (20 tokens)](#717-contraste-combinações-validadas)

### 8. Borders
- [8.1 Border Widths (7 tokens)](#81-border-widths)
- [8.2 Bordas Neutras (11 tokens)](#82-bordas-neutras)
- [8.3 Bordas de Ação (20 tokens)](#83-bordas-de-ação)
- [8.4 Bordas de Feedback (20 tokens)](#84-bordas-de-feedback)
- [8.5 Bordas de Marca (33 tokens)](#85-bordas-de-marca)
- [8.6 Bordas de Dark (5 tokens)](#86-bordas-de-dark)
- [8.7 Bordas Funcionais (6 tokens)](#87-bordas-funcionais)

### 9. Shadows e Elevação
- [9.1 Sombras Base (8 tokens)](#91-sombras-base)
- [9.2 Sombras Semânticas (5 tokens)](#92-sombras-semânticas)
- [9.3 Sombras de Marca (9 tokens)](#93-sombras-de-marca)
- [9.4 Elevação Semântica (6 tokens)](#94-elevação-semântica)
- [9.5 Sombras para Estados (3 tokens)](#95-sombras-para-estados)

### 10. Tokens Deprecados
- [10.1 Spacing Component-Specific (16 tokens removidos)](#101-spacing-component-specific)
- [10.2 Motion Component-Specific (2 tokens removidos)](#102-motion-component-specific)
- [10.3 Borders Component-Specific (12 tokens removidos)](#103-borders-component-specific)
- [10.4 Shadows Component-Specific (5 tokens removidos)](#104-shadows-component-specific)
- [10.5 Badges e Chips Component-Specific (10 tokens removidos)](#105-badges-e-chips-component-specific)

---

# 1. Espaçamento

Sistema de escala para margins, paddings e gaps. Baseado em rem (1rem = 16px).

## 1.1 Escala Base

**Total: 34 tokens**

| Token | Valor | Pixels | Uso Comum |
|-------|-------|--------|-----------|
| `--dss-spacing-0` | 0 | 0px | Reset de espaçamento |
| `--dss-spacing-px` | 1px | 1px | Bordas finas |
| `--dss-spacing-0_5` | 0.125rem | 2px | Espaçamento mínimo |
| `--dss-spacing-1` | 0.25rem | 4px | Espaçamento ultra compacto |
| `--dss-spacing-1_5` | 0.375rem | 6px | Espaçamento compacto |
| `--dss-spacing-2` | 0.5rem | 8px | Espaçamento pequeno |
| `--dss-spacing-2_5` | 0.625rem | 10px | Espaçamento pequeno-médio |
| `--dss-spacing-3` | 0.75rem | 12px | Espaçamento médio |
| `--dss-spacing-3_5` | 0.875rem | 14px | Espaçamento médio-grande |
| `--dss-spacing-4` | 1rem | 16px | Espaçamento padrão |
| `--dss-spacing-5` | 1.25rem | 20px | Espaçamento confortável |
| `--dss-spacing-6` | 1.5rem | 24px | Espaçamento entre seções |
| `--dss-spacing-7` | 1.75rem | 28px | Espaçamento grande |
| `--dss-spacing-8` | 2rem | 32px | Espaçamento muito grande |
| `--dss-spacing-9` | 2.25rem | 36px | Espaçamento extra grande |
| `--dss-spacing-10` | 2.5rem | 40px | Espaçamento 2.5x |
| `--dss-spacing-11` | 2.75rem | 44px | Espaçamento 2.75x |
| `--dss-spacing-12` | 3rem | 48px | Espaçamento 3x |
| `--dss-spacing-14` | 3.5rem | 56px | Espaçamento 3.5x |
| `--dss-spacing-16` | 4rem | 64px | Espaçamento 4x |
| `--dss-spacing-20` | 5rem | 80px | Espaçamento 5x |
| `--dss-spacing-24` | 6rem | 96px | Espaçamento 6x |
| `--dss-spacing-28` | 7rem | 112px | Espaçamento 7x |
| `--dss-spacing-32` | 8rem | 128px | Espaçamento 8x |
| `--dss-spacing-36` | 9rem | 144px | Espaçamento 9x |
| `--dss-spacing-40` | 10rem | 160px | Espaçamento 10x |
| `--dss-spacing-44` | 11rem | 176px | Espaçamento 11x |
| `--dss-spacing-48` | 12rem | 192px | Espaçamento 12x |
| `--dss-spacing-52` | 13rem | 208px | Espaçamento 13x |
| `--dss-spacing-56` | 14rem | 224px | Espaçamento 14x |
| `--dss-spacing-60` | 15rem | 240px | Espaçamento 15x |
| `--dss-spacing-64` | 16rem | 256px | Espaçamento 16x |
| `--dss-spacing-72` | 18rem | 288px | Espaçamento 18x |
| `--dss-spacing-80` | 20rem | 320px | Espaçamento 20x |
| `--dss-spacing-96` | 24rem | 384px | Espaçamento 24x |

## 1.2 Espaçamentos Semânticos

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-container-padding` | `var(--dss-spacing-4)` | Padding de containers |
| `--dss-section-spacing` | `var(--dss-spacing-12)` | Espaçamento entre seções |
| `--dss-component-spacing` | `var(--dss-spacing-6)` | Espaçamento entre componentes |

## 1.3 Grid e Gap

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-grid-gap-sm` | `var(--dss-spacing-2)` | Gap pequeno (8px) |
| `--dss-grid-gap-md` | `var(--dss-spacing-4)` | Gap médio (16px) |
| `--dss-grid-gap-lg` | `var(--dss-spacing-6)` | Gap grande (24px) |
| `--dss-grid-gap-xl` | `var(--dss-spacing-8)` | Gap extra grande (32px) |

## 1.4 Formulários

**Total: 2 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-form-gap` | `var(--dss-spacing-4)` | Gap entre campos de formulário |
| `--dss-label-margin-bottom` | `var(--dss-spacing-1)` | Margin abaixo de labels |

## 1.5 Margins

**Total: 9 tokens**

| Token | Valor | Pixels |
|-------|-------|--------|
| `--dss-margin-auto` | auto | auto |
| `--dss-margin-0` | `var(--dss-spacing-0)` | 0px |
| `--dss-margin-1` | `var(--dss-spacing-1)` | 4px |
| `--dss-margin-2` | `var(--dss-spacing-2)` | 8px |
| `--dss-margin-3` | `var(--dss-spacing-3)` | 12px |
| `--dss-margin-4` | `var(--dss-spacing-4)` | 16px |
| `--dss-margin-6` | `var(--dss-spacing-6)` | 24px |
| `--dss-margin-8` | `var(--dss-spacing-8)` | 32px |
| `--dss-margin-12` | `var(--dss-spacing-12)` | 48px |
| `--dss-margin-16` | `var(--dss-spacing-16)` | 64px |

## 1.6 Paddings

**Total: 9 tokens**

| Token | Valor | Pixels |
|-------|-------|--------|
| `--dss-padding-0` | `var(--dss-spacing-0)` | 0px |
| `--dss-padding-1` | `var(--dss-spacing-1)` | 4px |
| `--dss-padding-2` | `var(--dss-spacing-2)` | 8px |
| `--dss-padding-3` | `var(--dss-spacing-3)` | 12px |
| `--dss-padding-4` | `var(--dss-spacing-4)` | 16px |
| `--dss-padding-6` | `var(--dss-spacing-6)` | 24px |
| `--dss-padding-8` | `var(--dss-spacing-8)` | 32px |
| `--dss-padding-12` | `var(--dss-spacing-12)` | 48px |
| `--dss-padding-16` | `var(--dss-spacing-16)` | 64px |

## 1.7 Gaps

**Total: 8 tokens**

| Token | Valor | Pixels |
|-------|-------|--------|
| `--dss-gap-0` | `var(--dss-spacing-0)` | 0px |
| `--dss-gap-1` | `var(--dss-spacing-1)` | 4px |
| `--dss-gap-2` | `var(--dss-spacing-2)` | 8px |
| `--dss-gap-3` | `var(--dss-spacing-3)` | 12px |
| `--dss-gap-4` | `var(--dss-spacing-4)` | 16px |
| `--dss-gap-6` | `var(--dss-spacing-6)` | 24px |
| `--dss-gap-8` | `var(--dss-spacing-8)` | 32px |
| `--dss-gap-12` | `var(--dss-spacing-12)` | 48px |

## 1.8 Acessibilidade

**Total: 2 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-touch-spacing` | `var(--dss-spacing-2)` | 8px mínimo entre elementos tocáveis (WCAG) |
| `--dss-line-height-spacing` | `calc(1em * var(--dss-line-height-base))` | Linha como espaçamento |

## 1.9 Border Radius

**Total: 10 tokens**

| Token | Valor | Pixels | Uso |
|-------|-------|--------|-----|
| `--dss-radius-none` | 0 | 0px | Sem arredondamento |
| `--dss-radius-sm` | `var(--dss-spacing-1)` | 4px | Pequeno |
| `--dss-radius-md` | `var(--dss-spacing-2)` | 8px | Médio (padrão) |
| `--dss-radius-lg` | `var(--dss-spacing-3)` | 12px | Grande |
| `--dss-radius-xl` | `var(--dss-spacing-4)` | 16px | Extra grande |
| `--dss-radius-2xl` | `var(--dss-spacing-5)` | 20px | 2x extra grande |
| `--dss-radius-3xl` | `var(--dss-spacing-6)` | 24px | 3x extra grande |
| `--dss-radius-full` | 9999px | 9999px | Completamente arredondado (círculo/pill) |
| `--dss-radius-badge` | `var(--dss-radius-full)` | 9999px | Específico para badges |

---

# 2. Cores

Sistema de cores do DSS dividido em paletas neutras, de marca e semânticas.

## 2.1 Gray Palette

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-gray-50` | #ffffff | 255, 255, 255 | Branco puro |
| `--dss-gray-100` | #fafafa | 250, 250, 250 | Fundos muito claros |
| `--dss-gray-200` | #f5f5f5 | 245, 245, 245 | Fundos claros |
| `--dss-gray-300` | #e5e5e5 | 229, 229, 229 | Bordas padrão |
| `--dss-gray-400` | #d4d4d4 | 212, 212, 212 | Bordas hover |
| `--dss-gray-500` | #a3a3a3 | 163, 163, 163 | Textos secundários |
| `--dss-gray-600` | #737373 | 115, 115, 115 | Textos terciários |
| `--dss-gray-700` | #525252 | 82, 82, 82 | Textos escuros |
| `--dss-gray-800` | #262626 | 38, 38, 38 | Fundos escuros |
| `--dss-gray-900` | #0a0a0a | 10, 10, 10 | Textos preto |
| `--dss-gray-950` | #000000 | 0, 0, 0 | Preto puro |

## 2.2 Brand Palettes

**⚠️ IMPORTANTE:** As paletas de marca (Hub, Water, Waste) são **escalas de 11 tons** (50 a 950).
Apesar de não terem tokens de estado explícitos, seguem um **padrão de uso para interações**:

**Padrão de Estados:**
- **disable** = -200 (desabilitado)
- **light** = -300 (variante clara)
- **hover/focus** = Principal + 2 níveis (ex: se principal é 600, hover é 800)
- **deep** = Mais escuro (950)

### Hub (Laranja/Marrom)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-hub-50` | #fff9ed | 255, 249, 237 | Hub muito claro |
| `--dss-hub-100` | #fef2d6 | 254, 242, 214 | Hub claro |
| `--dss-hub-200` | #fde2ab | 253, 226, 171 | **🔒 Hub disable** |
| `--dss-hub-300` | #fbcb76 | 251, 203, 118 | **✨ Hub light** |
| `--dss-hub-400` | #f8aa3f | 248, 170, 63 | Hub médio |
| `--dss-hub-500` | #f5911a | 245, 145, 26 | Hub padrão |
| `--dss-hub-600` | #ef7a11 | 239, 122, 17 | **✅ Hub principal** |
| `--dss-hub-700` | #bf590f | 191, 89, 15 | Hub escuro |
| `--dss-hub-800` | #984614 | 152, 70, 20 | **💡 Hub hover/focus** |
| `--dss-hub-900` | #7a3614 | 122, 54, 20 | Hub profundo |
| `--dss-hub-950` | #421d08 | 66, 29, 8 | **🎯 Hub deep** |

### Water (Azul)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-water-50` | #f0f7ff | 240, 247, 255 | Water muito claro |
| `--dss-water-100` | #e0eefe | 224, 238, 254 | Water claro |
| `--dss-water-200` | #badefd | 186, 222, 253 | **🔒 Water disable** |
| `--dss-water-300` | #7dc4fc | 125, 196, 252 | **✨ Water light** |
| `--dss-water-400` | #38a6f8 | 56, 166, 248 | Water médio |
| `--dss-water-500` | #0e88e4 | 14, 136, 228 | **✅ Water principal** |
| `--dss-water-600` | #026cc7 | 2, 108, 199 | Water padrão |
| `--dss-water-700` | #0356a1 | 3, 86, 161 | **💡 Water hover/focus** |
| `--dss-water-800` | #074a85 | 7, 74, 133 | Water muito escuro |
| `--dss-water-900` | #0c3e6e | 12, 62, 110 | Water profundo |
| `--dss-water-950` | #082749 | 8, 39, 73 | **🎯 Water deep** |

### Waste (Verde)

**Total: 11 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-waste-50` | #edfcf4 | 237, 252, 244 | Waste muito claro |
| `--dss-waste-100` | #d3f8e2 | 211, 248, 226 | Waste claro |
| `--dss-waste-200` | #abefcb | 171, 239, 203 | **🔒 Waste disable** |
| `--dss-waste-300` | #74e1ae | 116, 225, 174 | **✨ Waste light** |
| `--dss-waste-400` | #3ccb8d | 60, 203, 141 | Waste médio |
| `--dss-waste-500` | #18b173 | 24, 177, 115 | Waste padrão |
| `--dss-waste-600` | #0b8154 | 11, 129, 84 | **✅ Waste principal** |
| `--dss-waste-700` | #0a724e | 10, 114, 78 | Waste escuro |
| `--dss-waste-800` | #0a5b3e | 10, 91, 62 | **💡 Waste hover/focus** |
| `--dss-waste-900` | #0a4a34 | 10, 74, 52 | Waste profundo |
| `--dss-waste-950` | #042a1e | 4, 42, 30 | **🎯 Waste deep** |

**📝 RESUMO DE ESTADOS POR MARCA:**
- **Hub**: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950
- **Water**: Principal=500 | Light=300 | Disable=200 | Hover/Focus=700 | Deep=950
- **Waste**: Principal=600 | Light=300 | Disable=200 | Hover/Focus=800 | Deep=950

## 2.3 Cores Semânticas Base

### Primary (Azul Principal)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-primary-disable` | #b3dcff | 179, 220, 255 | Primary desabilitado |
| `--dss-primary-light` | #86c0f3 | 134, 192, 243 | Primary claro |
| `--dss-primary` | #1f86de | 31, 134, 222 | **Primary padrão** |
| `--dss-primary-hover` | #0f5295 | 15, 82, 149 | Primary hover |
| `--dss-primary-deep` | #0a3a6a | 10, 58, 106 | Primary profundo |
| `--dss-primary-focus` | #006AC5 | 0, 106, 197 | Primary foco |

### Secondary (Verde/Turquesa)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-secondary-disable` | #b5ece4 | 181, 236, 228 | Secondary desabilitado |
| `--dss-secondary-light` | #6ddbcb | 109, 219, 203 | Secondary claro |
| `--dss-secondary` | #26a69a | 38, 166, 154 | **Secondary padrão** |
| `--dss-secondary-hover` | #1c857e | 28, 133, 126 | Secondary hover |
| `--dss-secondary-deep` | #116761 | 17, 103, 97 | Secondary profundo |
| `--dss-secondary-focus` | #009C8D | 0, 156, 141 | Secondary foco |

### Tertiary (Laranja)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-tertiary-disable` | #ffd2b5 | 255, 210, 181 | Tertiary desabilitado |
| `--dss-tertiary-light` | #ff9452 | 255, 148, 82 | Tertiary claro |
| `--dss-tertiary` | #ff6607 | 255, 102, 7 | **Tertiary padrão** |
| `--dss-tertiary-hover` | #de5500 | 222, 85, 0 | Tertiary hover |
| `--dss-tertiary-deep` | #ad4200 | 173, 66, 0 | Tertiary profundo |
| `--dss-tertiary-focus` | #E95900 | 233, 89, 0 | Tertiary foco |

### Accent (Roxo/Púrpura)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-accent-disable` | #f0ddf4 | 240, 221, 244 | Accent desabilitado |
| `--dss-accent-light` | #e3bceb | 227, 188, 235 | Accent claro |
| `--dss-accent` | #b454c4 | 180, 84, 196 | **Accent padrão** |
| `--dss-accent-hover` | #883b90 | 136, 59, 144 | Accent hover |
| `--dss-accent-deep` | #642f6a | 100, 47, 106 | Accent profundo |
| `--dss-accent-focus` | #B02EC5 | 176, 46, 197 | Accent foco |

### Dark (Cinza/Preto)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-dark-disable` | #d7d7d7 | 215, 215, 215 | Dark desabilitado |
| `--dss-dark-light` | #b0b0b0 | 176, 176, 176 | Dark claro |
| `--dss-dark` | #454545 | 69, 69, 69 | **Dark padrão** |
| `--dss-dark-hover` | #313131 | 49, 49, 49 | Dark hover |
| `--dss-dark-deep` | #1d1d1d | 29, 29, 29 | Dark profundo |
| `--dss-dark-focus` | #3E3E3E | 62, 62, 62 | Dark foco |

### Positive (Verde)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-positive-disable` | #dbf8d1 | 219, 248, 209 | Positive desabilitado |
| `--dss-positive-light` | #b9f2a4 | 185, 242, 164 | Positive claro |
| `--dss-positive` | #4dd228 | 77, 210, 40 | **Positive padrão** |
| `--dss-positive-hover` | #27910D | 39, 145, 13 | Positive hover |
| `--dss-positive-deep` | #246714 | 36, 103, 20 | Positive profundo |
| `--dss-positive-focus` | #34C30C | 52, 195, 12 | Positive foco |

### Negative (Vermelho)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-negative-disable` | #ffcfd4 | 255, 207, 212 | Negative desabilitado |
| `--dss-negative-light` | #ffa0ab | 255, 160, 171 | Negative claro |
| `--dss-negative` | #d8182e | 216, 24, 46 | **Negative padrão** |
| `--dss-negative-hover` | #a01424 | 160, 20, 36 | Negative hover |
| `--dss-negative-deep` | #720e19 | 114, 14, 25 | Negative profundo |
| `--dss-negative-focus` | #C40016 | 196, 0, 22 | Negative foco |

### Warning (Amarelo/Laranja)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-warning-disable` | #fff9c3 | 255, 249, 195 | Warning desabilitado |
| `--dss-warning-light` | #fff488 | 255, 244, 136 | Warning claro |
| `--dss-warning` | #fabd14 | 250, 189, 20 | **Warning padrão** |
| `--dss-warning-hover` | #dd8e02 | 221, 142, 2 | Warning hover |
| `--dss-warning-deep` | #a66d08 | 166, 109, 8 | Warning profundo |
| `--dss-warning-focus` | #E9AB00 | 233, 171, 0 | Warning foco |

### Info (Azul Claro)

**Total: 6 tokens**

| Token | Valor Hex | RGB | Uso |
|-------|-----------|-----|-----|
| `--dss-info-disable` | #d2f6fc | 210, 246, 252 | Info desabilitado |
| `--dss-info-light` | #a7effa | 167, 239, 250 | Info claro |
| `--dss-info` | #0cc4e9 | 12, 196, 233 | **Info padrão** |
| `--dss-info-hover` | #0c8bae | 12, 139, 174 | Info hover |
| `--dss-info-deep` | #0d7491 | 13, 116, 145 | Info profundo |
| `--dss-info-focus` | #00B2D5 | 0, 178, 213 | Info foco |

## 2.4 Opacidade

**Total: 32 tokens** (21 tokens de escala + 11 tokens semânticos)

Sistema padronizado de transparências com escala de 0 a 100 e tokens semânticos para estados e overlays.

**📁 Fonte:** `tokens/semantic/_opacity.scss`

### Escala Base (0-100)

**Total: 21 tokens**

| Token | Valor | Percentual | Uso |
|-------|-------|------------|-----|
| `--dss-opacity-0` | 0 | 0% | Invisível |
| `--dss-opacity-5` | 0.05 | 5% | Overlay muito sutil |
| `--dss-opacity-8` | 0.08 | 8% | Brand subtle (ver abaixo) |
| `--dss-opacity-10` | 0.1 | 10% | Hover state |
| `--dss-opacity-12` | 0.12 | 12% | Brand light (ver abaixo) |
| `--dss-opacity-15` | 0.15 | 15% | Selected state |
| `--dss-opacity-16` | 0.16 | 16% | Brand medium (ver abaixo) |
| `--dss-opacity-20` | 0.2 | 20% | Active state |
| `--dss-opacity-24` | 0.24 | 24% | Brand strong (ver abaixo) |
| `--dss-opacity-25` | 0.25 | 25% | Overlay leve |
| `--dss-opacity-30` | 0.3 | 30% | Progress indicator |
| `--dss-opacity-35` | 0.35 | 35% | - |
| `--dss-opacity-40` | 0.4 | 40% | **Disabled state padrão** |
| `--dss-opacity-45` | 0.45 | 45% | - |
| `--dss-opacity-50` | 0.5 | 50% | Overlay médio |
| `--dss-opacity-55` | 0.55 | 55% | - |
| `--dss-opacity-60` | 0.6 | 60% | Elementos semi-transparentes |
| `--dss-opacity-65` | 0.65 | 65% | - |
| `--dss-opacity-70` | 0.7 | 70% | - |
| `--dss-opacity-75` | 0.75 | 75% | Backdrop (modal/dialog) |
| `--dss-opacity-80` | 0.8 | 80% | Alta visibilidade |
| `--dss-opacity-85` | 0.85 | 85% | - |
| `--dss-opacity-90` | 0.9 | 90% | Quase opaco |
| `--dss-opacity-95` | 0.95 | 95% | - |
| `--dss-opacity-100` | 1 | 100% | Totalmente opaco |

### Tokens Semânticos de Estados

**Total: 5 tokens**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-disabled` | `var(--dss-opacity-40)` | 0.4 | **Estado desabilitado padrão** ✅ |
| `--dss-opacity-hover` | `var(--dss-opacity-10)` | 0.1 | Overlay de hover |
| `--dss-opacity-active` | `var(--dss-opacity-20)` | 0.2 | Overlay de active/pressed |
| `--dss-opacity-selected` | `var(--dss-opacity-15)` | 0.15 | Estado selecionado |
| `--dss-opacity-overlay` | `var(--dss-opacity-50)` | 0.5 | Overlay genérico |

### Tokens Semânticos de UI

**Total: 1 token**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-backdrop` | `var(--dss-opacity-75)` | 0.75 | Backdrop de modal/dialog/drawer |

### Tokens de Marca (Brand Overlays)

**Total: 4 tokens**

| Token | Alias | Valor | Uso |
|-------|-------|-------|-----|
| `--dss-opacity-brand-subtle` | `var(--dss-opacity-8)` | 0.08 | Overlay de marca muito sutil |
| `--dss-opacity-brand-light` | `var(--dss-opacity-12)` | 0.12 | Overlay de marca leve |
| `--dss-opacity-brand-medium` | `var(--dss-opacity-16)` | 0.16 | Overlay de marca médio |
| `--dss-opacity-brand-strong` | `var(--dss-opacity-24)` | 0.24 | Overlay de marca forte |

### Funções de Utilidade (Referência)

**Total: 2 tokens** (não devem ser usados diretamente em CSS)

| Token | Valor |
|-------|-------|
| `--dss-opacity-function-hover` | `"opacity: var(--dss-opacity-hover)"` |
| `--dss-opacity-function-disabled` | `"opacity: var(--dss-opacity-disabled)"` |

### ⚠️ Observações Importantes

- **Estado Disabled**: Use sempre `--dss-opacity-disabled` (0.4) para consistência
- **Overlays de Marca**: Use tokens `--dss-opacity-brand-*` quando aplicar overlay sobre cores de marca
- **Interações**: Para hover, active e selected, use os tokens semânticos correspondentes
- **Backdrop**: Use sempre `--dss-opacity-backdrop` (0.75) para fundo de modals/dialogs
- **Funções de Utilidade**: Tokens `--dss-opacity-function-*` são apenas para referência, não devem ser usados em CSS

### 📊 Resumo de Uso por Componente

- **Buttons**: `disabled` (0.4), `60` (spinner), `30` (progress), `active` (0.2), `selected` (0.15)
- **Overlays/Modals**: `backdrop` (0.75), `overlay` (0.5)
- **Estados Interativos**: `hover` (0.1), `active` (0.2), `selected` (0.15)
- **Marca**: `brand-subtle` (0.08), `brand-light` (0.12), `brand-medium` (0.16), `brand-strong` (0.24)

---

# 3. Actions

Cores para ações primárias, secundárias, terciárias e de destaque.

## 3.1 Primary Actions

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-primary` | `var(--dss-primary)` | Ação primária padrão |
| `--dss-action-primary-light` | `var(--dss-primary-light)` | Ação primária clara |
| `--dss-action-primary-disable` | `var(--dss-primary-disable)` | Ação primária desabilitada |
| `--dss-action-primary-hover` | `var(--dss-primary-hover)` | Ação primária hover |
| `--dss-action-primary-deep` | `var(--dss-primary-deep)` | Ação primária profunda |
| `--dss-action-primary-focus` | `var(--dss-primary-focus)` | Ação primária foco |

## 3.2 Secondary Actions

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-secondary` | `var(--dss-secondary)` | Ação secundária padrão |
| `--dss-action-secondary-light` | `var(--dss-secondary-light)` | Ação secundária clara |
| `--dss-action-secondary-disable` | `var(--dss-secondary-disable)` | Ação secundária desabilitada |
| `--dss-action-secondary-hover` | `var(--dss-secondary-hover)` | Ação secundária hover |
| `--dss-action-secondary-deep` | `var(--dss-secondary-deep)` | Ação secundária profunda |
| `--dss-action-secondary-focus` | `var(--dss-secondary-focus)` | Ação secundária foco |

## 3.3 Tertiary Actions

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-tertiary` | `var(--dss-tertiary)` | Ação terciária padrão |
| `--dss-action-tertiary-light` | `var(--dss-tertiary-light)` | Ação terciária clara |
| `--dss-action-tertiary-disable` | `var(--dss-tertiary-disable)` | Ação terciária desabilitada |
| `--dss-action-tertiary-hover` | `var(--dss-tertiary-hover)` | Ação terciária hover |
| `--dss-action-tertiary-deep` | `var(--dss-tertiary-deep)` | Ação terciária profunda |
| `--dss-action-tertiary-focus` | `var(--dss-tertiary-focus)` | Ação terciária foco |

## 3.4 Accent Actions

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-accent` | `var(--dss-accent)` | Ação de destaque padrão |
| `--dss-action-accent-light` | `var(--dss-accent-light)` | Ação de destaque clara |
| `--dss-action-accent-disable` | `var(--dss-accent-disable)` | Ação de destaque desabilitada |
| `--dss-action-accent-hover` | `var(--dss-accent-hover)` | Ação de destaque hover |
| `--dss-action-accent-deep` | `var(--dss-accent-deep)` | Ação de destaque profunda |
| `--dss-action-accent-focus` | `var(--dss-accent-focus)` | Ação de destaque foco |

## 3.5 Dark Actions

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-dark` | `var(--dss-dark)` | Ação escura padrão |
| `--dss-action-dark-light` | `var(--dss-dark-light)` | Ação escura clara |
| `--dss-action-dark-disable` | `var(--dss-dark-disable)` | Ação escura desabilitada |
| `--dss-action-dark-hover` | `var(--dss-dark-hover)` | Ação escura hover |
| `--dss-action-dark-deep` | `var(--dss-dark-deep)` | Ação escura profunda |
| `--dss-action-dark-focus` | `var(--dss-dark-focus)` | Ação escura foco |

---

# 4. Feedback

Cores para estados e alertas (sucesso, erro, aviso, informação).

## 4.1 Success

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-success` | `var(--dss-positive)` | Feedback de sucesso padrão |
| `--dss-feedback-success-light` | `var(--dss-positive-light)` | Feedback de sucesso claro |
| `--dss-feedback-success-disable` | `var(--dss-positive-disable)` | Feedback de sucesso desabilitado |
| `--dss-feedback-success-hover` | `var(--dss-positive-hover)` | Feedback de sucesso hover |
| `--dss-feedback-success-deep` | `var(--dss-positive-deep)` | Feedback de sucesso profundo |

## 4.2 Error

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-error` | `var(--dss-negative)` | Feedback de erro padrão |
| `--dss-feedback-error-light` | `var(--dss-negative-light)` | Feedback de erro claro |
| `--dss-feedback-error-disable` | `var(--dss-negative-disable)` | Feedback de erro desabilitado |
| `--dss-feedback-error-hover` | `var(--dss-negative-hover)` | Feedback de erro hover |
| `--dss-feedback-error-deep` | `var(--dss-negative-deep)` | Feedback de erro profundo |

## 4.3 Warning

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-warning` | `var(--dss-warning)` | Feedback de aviso padrão |
| `--dss-feedback-warning-light` | `var(--dss-warning-light)` | Feedback de aviso claro |
| `--dss-feedback-warning-disable` | `var(--dss-warning-disable)` | Feedback de aviso desabilitado |
| `--dss-feedback-warning-hover` | `var(--dss-warning-hover)` | Feedback de aviso hover |
| `--dss-feedback-warning-deep` | `var(--dss-warning-deep)` | Feedback de aviso profundo |

## 4.4 Info

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-info` | `var(--dss-info)` | Feedback de informação padrão |
| `--dss-feedback-info-light` | `var(--dss-info-light)` | Feedback de informação claro |
| `--dss-feedback-info-disable` | `var(--dss-info-disable)` | Feedback de informação desabilitado |
| `--dss-feedback-info-hover` | `var(--dss-info-hover)` | Feedback de informação hover |
| `--dss-feedback-info-deep` | `var(--dss-info-deep)` | Feedback de informação profundo |

## 4.5 Surfaces

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-feedback-success-surface` | rgba(77, 210, 40, 0.1) | Fundo para alertas de sucesso |
| `--dss-feedback-error-surface` | rgba(216, 24, 46, 0.1) | Fundo para alertas de erro |
| `--dss-feedback-warning-surface` | rgba(250, 189, 20, 0.1) | Fundo para alertas de aviso |
| `--dss-feedback-info-surface` | rgba(12, 196, 233, 0.1) | Fundo para alertas de informação |

---

# 5. Motion e Animação

Sistema de temporização, curvas de easing e animações predefinidas.

## 5.1 Durações Base

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-0` | 0ms | Imediato |
| `--dss-duration-75` | 75ms | Ultra rápido |
| `--dss-duration-100` | 100ms | Muito rápido |
| `--dss-duration-150` | 150ms | Rápido |
| `--dss-duration-200` | 200ms | Moderadamente rápido |
| `--dss-duration-250` | 250ms | Base (padrão) |
| `--dss-duration-300` | 300ms | Moderadamente lento |
| `--dss-duration-500` | 500ms | Lento |
| `--dss-duration-700` | 700ms | Muito lento |
| `--dss-duration-1000` | 1000ms | Ultra lento |

## 5.2 Durações Semânticas

**Total: 8 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-instant` | `var(--dss-duration-0)` | Sem animação |
| `--dss-duration-fastest` | `var(--dss-duration-75)` | 75ms |
| `--dss-duration-faster` | `var(--dss-duration-100)` | 100ms |
| `--dss-duration-fast` | `var(--dss-duration-150)` | 150ms |
| `--dss-duration-base` | `var(--dss-duration-250)` | **250ms (padrão WCAG)** |
| `--dss-duration-slow` | `var(--dss-duration-300)` | 300ms |
| `--dss-duration-slower` | `var(--dss-duration-500)` | 500ms |
| `--dss-duration-slowest` | `var(--dss-duration-700)` | 700ms |

## 5.3 Durações Interativas

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-duration-hover` | `var(--dss-duration-150)` | Duração para hover |
| `--dss-duration-focus` | `var(--dss-duration-100)` | Duração para foco |
| `--dss-duration-active` | `var(--dss-duration-100)` | Duração para estado ativo |
| `--dss-duration-tooltip` | `var(--dss-duration-150)` | Duração para tooltips |

## 5.4 Curvas de Easing

**Total: 14 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-easing-linear` | cubic-bezier(0, 0, 1, 1) | Linear |
| `--dss-easing-ease` | cubic-bezier(0.25, 0.1, 0.25, 1) | Ease padrão |
| `--dss-easing-ease-in` | cubic-bezier(0.42, 0, 1, 1) | Acelera no início |
| `--dss-easing-ease-out` | cubic-bezier(0, 0, 0.58, 1) | Desacelera no final |
| `--dss-easing-ease-in-out` | cubic-bezier(0.42, 0, 0.58, 1) | Acelera e desacelera |
| `--dss-easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Material Design padrão |
| `--dss-easing-accelerate` | cubic-bezier(0.4, 0, 1, 1) | Acelera (Material) |
| `--dss-easing-decelerate` | cubic-bezier(0, 0, 0.2, 1) | Desacelera (Material) |
| `--dss-easing-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Efeito bounce |
| `--dss-easing-spring` | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Efeito spring |
| `--dss-easing-hover` | `var(--dss-easing-ease-out)` | Easing para hover |
| `--dss-easing-focus` | `var(--dss-easing-ease-out)` | Easing para foco |
| `--dss-easing-active` | `var(--dss-easing-ease-in)` | Easing para ativo |
| `--dss-easing-tooltip` | `var(--dss-easing-ease-out)` | Easing para tooltips |

## 5.5 Atrasos

**Total: 9 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-delay-0` | 0ms | Sem atraso |
| `--dss-delay-75` | 75ms | Atraso mínimo |
| `--dss-delay-100` | 100ms | Atraso pequeno |
| `--dss-delay-150` | 150ms | Atraso médio |
| `--dss-delay-200` | 200ms | Atraso padrão |
| `--dss-delay-300` | 300ms | Atraso grande |
| `--dss-delay-500` | 500ms | Atraso muito grande |
| `--dss-delay-700` | 700ms | Atraso extra grande |
| `--dss-delay-1000` | 1000ms | Atraso máximo |

## 5.6 Transições Semânticas

**Total: 9 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-transition-fast` | all var(--dss-duration-fast) var(--dss-easing-ease-out) | Transição rápida |
| `--dss-transition-base` | all var(--dss-duration-base) var(--dss-easing-standard) | Transição padrão |
| `--dss-transition-slow` | all var(--dss-duration-slow) var(--dss-easing-ease-in-out) | Transição lenta |
| `--dss-transition-color` | color var(--dss-duration-base) var(--dss-easing-ease) | Transição de cor |
| `--dss-transition-background` | background-color var(--dss-duration-base) var(--dss-easing-ease) | Transição de fundo |
| `--dss-transition-border` | border-color var(--dss-duration-base) var(--dss-easing-ease) | Transição de borda |
| `--dss-transition-shadow` | box-shadow var(--dss-duration-base) var(--dss-easing-ease) | Transição de sombra |
| `--dss-transition-transform` | transform var(--dss-duration-base) var(--dss-easing-standard) | Transição de transformação |
| `--dss-transition-opacity` | opacity var(--dss-duration-base) var(--dss-easing-ease) | Transição de opacidade |

## 5.7 Animações Predefinidas

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-animation-spin` | spin 1s linear infinite | Rotação contínua (spinners) |
| `--dss-animation-ping` | ping 1s cubic-bezier(0, 0, 0.2, 1) infinite | Pulso expandindo |
| `--dss-animation-pulse` | pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite | Pulsação |
| `--dss-animation-bounce` | bounce 1s infinite | Bounce infinito |

## 5.8 Temporizadores

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-timing-toast` | 5000ms | Duração de exibição de toasts (5s) |
| `--dss-timing-tooltip-hide` | 300ms | Atraso para esconder tooltip |
| `--dss-timing-debounce` | 150ms | Debounce padrão |
| `--dss-timing-throttle` | 100ms | Throttle padrão |

> **Acessibilidade**: Todos os tokens de motion respeitam `prefers-reduced-motion: reduce`, desabilitando animações automaticamente.

---

# 6. Tipografia

Sistema de fontes, tamanhos e hierarquia tipográfica baseado no Guia de Acessibilidade DSS (Página 8).

## 6.1 Famílias de Fonte

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-family-sans` | 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif | Fonte sans-serif padrão |
| `--dss-font-family-mono` | 'Roboto Mono', 'SF Mono', Monaco, 'Courier New', monospace | Fonte monoespaçada |
| `--dss-font-family-system` | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif | Fonte do sistema |
| `--dss-font-family-fallback` | sans-serif | Fallback seguro |

## 6.2 Tamanhos de Fonte

**Total: 9 tokens**

| Token | Valor | Pixels | WCAG | Uso |
|-------|-------|--------|------|-----|
| `--dss-font-size-xs` | 0.75rem | 12px | ⚠️ Só rótulos | Apenas para rótulos, não corpo |
| `--dss-font-size-sm` | 0.875rem | 14px | ⚠️ Mín. secundário | Texto secundário mínimo |
| `--dss-font-size-md` | 1rem | 16px | ✅ **Padrão WCAG** | Padrão Quasar - corpo de texto |
| `--dss-font-size-base` | 1rem | 16px | ✅ Alias | Alias para md |
| `--dss-font-size-lg` | 1.125rem | 18px | ✅ Texto grande | Texto grande (contraste 3:1) |
| `--dss-font-size-xl` | 1.25rem | 20px | ✅ | Texto extra grande |
| `--dss-font-size-2xl` | 1.5rem | 24px | ✅ | Subtítulos |
| `--dss-font-size-3xl` | 1.875rem | 30px | ✅ | Títulos H3 |
| `--dss-font-size-4xl` | 2.25rem | 36px | ✅ | Títulos H1-H2 |

## 6.3 Pesos de Fonte

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-weight-light` | 300 | Texto leve (decorativo) |
| `--dss-font-weight-normal` | 400 | **Texto corporal padrão** |
| `--dss-font-weight-medium` | 500 | Texto médio |
| `--dss-font-weight-semibold` | 600 | Ênfase |
| `--dss-font-weight-bold` | 700 | **Títulos, forte ênfase** |
| `--dss-font-weight-extrabold` | 800 | Ênfase extra |

## 6.4 Altura de Linha

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-line-height-tight` | 1.25 | Linhas compactas |
| `--dss-line-height-snug` | 1.375 | Linhas ajustadas |
| `--dss-line-height-normal` | 1.5 | **Ideal para corpo** |
| `--dss-line-height-relaxed` | 1.625 | Linhas relaxadas |
| `--dss-line-height-loose` | 1.75 | Acessibilidade extra |
| `--dss-line-height-xs` | 1.4 | Para font-size-xs |
| `--dss-line-height-sm` | 1.45 | Para font-size-sm |
| `--dss-line-height-base` | 1.5 | **Para font-size-base** |
| `--dss-line-height-lg` | 1.55 | Para font-size-lg |
| `--dss-line-height-xl` | 1.6 | Para font-size-xl |

## 6.5 Espaçamento de Letras

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-letter-spacing-tighter` | -0.05em | Muito compacto |
| `--dss-letter-spacing-tight` | -0.025em | Compacto |
| `--dss-letter-spacing-normal` | 0 | **Normal (padrão)** |
| `--dss-letter-spacing-wide` | 0.025em | Espaçado |
| `--dss-letter-spacing-wider` | 0.05em | Muito espaçado |
| `--dss-letter-spacing-widest` | 0.1em | Extra espaçado |

## 6.6 Hierarquia de Títulos

**Total: 19 tokens**

**⚠️ IMPORTANTE:** Escala DECRESCENTE lógica e consistente:
- **Size**: Maior título = maior tamanho (H1=36px → H6=16px) ✓
- **Weight**: Maior título = maior peso (H1=700 → H6=400) ✓
- **Line-height**: Maior título = maior espaço (H1=1.5 → H6=1.1) ✓

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-heading-font-family` | `var(--dss-font-family-sans)` | Fonte para todos os títulos |
| **H1 (Maior)** | | |
| `--dss-heading-1-size` | `var(--dss-font-size-4xl)` | Tamanho H1 (36px) 📐 Maior |
| `--dss-heading-1-weight` | `var(--dss-font-weight-bold)` | Peso H1 (700) ⚖️ Maior |
| `--dss-heading-1-line-height` | 1.5 | Altura H1 📏 150% - Maior |
| **H2** | | |
| `--dss-heading-2-size` | `var(--dss-font-size-3xl)` | Tamanho H2 (30px) 📐 |
| `--dss-heading-2-weight` | `var(--dss-font-weight-semibold)` | Peso H2 (600) ⚖️ |
| `--dss-heading-2-line-height` | 1.4 | Altura H2 📏 140% |
| **H3** | | |
| `--dss-heading-3-size` | `var(--dss-font-size-2xl)` | Tamanho H3 (24px) 📐 |
| `--dss-heading-3-weight` | `var(--dss-font-weight-medium)` | Peso H3 (500) ⚖️ |
| `--dss-heading-3-line-height` | 1.3 | Altura H3 📏 130% |
| **H4** | | |
| `--dss-heading-4-size` | `var(--dss-font-size-xl)` | Tamanho H4 (20px) 📐 |
| `--dss-heading-4-weight` | `var(--dss-font-weight-medium)` | Peso H4 (500) ⚖️ |
| `--dss-heading-4-line-height` | 1.2 | Altura H4 📏 120% |
| **H5** | | |
| `--dss-heading-5-size` | `var(--dss-font-size-lg)` | Tamanho H5 (18px) 📐 |
| `--dss-heading-5-weight` | `var(--dss-font-weight-normal)` | Peso H5 (400) ⚖️ |
| `--dss-heading-5-line-height` | 1.15 | Altura H5 📏 115% |
| **H6 (Menor)** | | |
| `--dss-heading-6-size` | `var(--dss-font-size-base)` | Tamanho H6 (16px) 📐 Menor |
| `--dss-heading-6-weight` | `var(--dss-font-weight-normal)` | Peso H6 (400) ⚖️ Menor |
| `--dss-heading-6-line-height` | 1.1 | Altura H6 📏 110% - Menor |

**📊 Escala DECRESCENTE Consistente:**
```
H1: Size=36px | Weight=700 | Line-height=1.5  (150%)  ← Maior em TUDO
H2: Size=30px | Weight=600 | Line-height=1.4  (140%)  ↓
H3: Size=24px | Weight=500 | Line-height=1.3  (130%)  ↓ Decrescente
H4: Size=20px | Weight=500 | Line-height=1.2  (120%)  ↓ Contínuo
H5: Size=18px | Weight=400 | Line-height=1.15 (115%)  ↓
H6: Size=16px | Weight=400 | Line-height=1.1  (110%)  ← Menor em TUDO

✅ Amplitude: 0.4 (1.5 → 1.1) - Escala bem distribuída
✅ Lógica: DECRESCENTE em size, weight E line-height
```

## 6.7 Utilitários de Legibilidade

**Total: 2 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-dyslexia-friendly-spacing` | 0.075em | Espaçamento para dislexia |
| `--dss-low-vision-scale` | 1.1 | Aumento para baixa visão |

---

# 7. Acessibilidade

Tokens para garantir conformidade WCAG 2.1 AA (foco, touch targets, contraste).

## 7.1 Focus - Configurações Base

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-focus-ring-width` | 3px | WCAG recomenda mínimo 2px |
| `--dss-focus-ring-offset` | 2px | Espaço entre elemento e focus ring |
| `--dss-focus-ring-style` | solid | Estilo da borda |
| `--dss-focus-ring-opacity` | 0.5 | Opacidade padrão (50%) |
| `--dss-focus-duration` | 150ms | Duração de transição |

## 7.2 Focus - Cores Semânticas

**Total: 8 tokens** (Light Mode)

| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-primary` | rgba(0, 106, 197, 0.5) | 0, 106, 197 | Focus primary |
| `--dss-focus-primary-rgb` | 0, 106, 197 | - | RGB para manipulação |
| `--dss-focus-secondary` | rgba(5, 156, 141, 0.5) | 5, 156, 141 | Focus secondary |
| `--dss-focus-secondary-rgb` | 5, 156, 141 | - | RGB para manipulação |
| `--dss-focus-tertiary` | rgba(227, 89, 0, 0.5) | 227, 89, 0 | Focus tertiary |
| `--dss-focus-tertiary-rgb` | 227, 89, 0 | - | RGB para manipulação |
| `--dss-focus-accent` | rgba(176, 46, 197, 0.5) | 176, 46, 197 | Focus accent |
| `--dss-focus-accent-rgb` | 176, 46, 197 | - | RGB para manipulação |

## 7.3 Focus - Cores de Feedback

**Total: 8 tokens** (Light Mode)

| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-positive` | rgba(52, 195, 12, 0.5) | 52, 195, 12 | Focus success |
| `--dss-focus-positive-rgb` | 52, 195, 12 | - | RGB para manipulação |
| `--dss-focus-negative` | rgba(196, 0, 27, 0.5) | 196, 0, 27 | Focus error |
| `--dss-focus-negative-rgb` | 196, 0, 27 | - | RGB para manipulação |
| `--dss-focus-warning` | rgba(233, 171, 0, 0.6) | 233, 171, 0 | Focus warning (60% para contraste) |
| `--dss-focus-warning-rgb` | 233, 171, 0 | - | RGB para manipulação |
| `--dss-focus-info` | rgba(13, 178, 213, 0.5) | 13, 178, 213 | Focus info |
| `--dss-focus-info-rgb` | 13, 178, 213 | - | RGB para manipulação |

## 7.4 Focus - Cores Neutras

**Total: 3 tokens** (Light Mode)

| Token | Valor RGBA | RGB | Uso |
|-------|------------|-----|-----|
| `--dss-focus-light` | rgba(255, 255, 255, 0.7) | 255, 255, 255 | Focus em fundos escuros |
| `--dss-focus-dark` | rgba(62, 62, 62, 0.5) | 62, 62, 62 | Focus em fundos claros |
| `--dss-focus-inverse` | `var(--dss-focus-light)` | - | Inversão automática |

## 7.5 Focus - Box Shadows

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-focus-shadow-primary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary) | Shadow primary |
| `--dss-focus-shadow-secondary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-secondary) | Shadow secondary |
| `--dss-focus-shadow-tertiary` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-tertiary) | Shadow tertiary |
| `--dss-focus-shadow-accent` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-accent) | Shadow accent |
| `--dss-focus-shadow-success` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-success) | Shadow success |
| `--dss-focus-shadow-error` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-error) | Shadow error |
| `--dss-focus-shadow-warning` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-warning) | Shadow warning |
| `--dss-focus-shadow-info` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-info) | Shadow info |
| `--dss-focus-shadow-light` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-light) | Shadow light |
| `--dss-focus-shadow-dark` | 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-dark) | Shadow dark |

## 7.6 Focus - Variantes com Offset

**Total: 4 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-focus-shadow-primary-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-primary) | Offset primary |
| `--dss-focus-shadow-error-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-error) | Offset error |
| `--dss-focus-shadow-success-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-success) | Offset success |
| `--dss-focus-shadow-warning-offset` | 0 0 0 var(--dss-focus-ring-offset) transparent, 0 0 0 calc(...) var(--dss-focus-warning) | Offset warning |

## 7.7 Touch Targets

**Total: 6 tokens**

| Token | Valor | WCAG | Uso |
|-------|-------|------|-----|
| `--dss-touch-target-min` | 48px | ✅ **Recomendado** | **Mínimo recomendado para acessibilidade** |
| `--dss-touch-target-xs` | 32px | ⚠️ Compacto | Componentes compactos (chips, badges) |
| `--dss-touch-target-sm` | 36px | ⚠️ Denso | Botões secundários densos |
| `--dss-touch-target-md` | 44px | ✅ Mínimo WCAG | Padrão - touch target mínimo WCAG 2.1 |
| `--dss-touch-target-lg` | 52px | ✅ Destacado | Botões destacados |
| `--dss-touch-target-xl` | 64px | ✅ CTAs | CTAs principais |

> **⚠️ IMPORTANTE**: Use `--dss-touch-target-min` (48px) como padrão para pseudo-elementos de touch target em Compact Controls. Este valor atende WCAG 2.5.5 com margem de segurança.

## 7.8 Touch Spacing

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-touch-spacing-xs` | 4px | Espaçamento mínimo |
| `--dss-touch-spacing-sm` | 8px | Espaçamento compacto |
| `--dss-touch-spacing-md` | 12px | **Padrão - evita toques acidentais** |
| `--dss-touch-spacing-lg` | 16px | Espaçamento confortável |
| `--dss-touch-spacing-xl` | 20px | Espaçamento generoso |

## 7.9 Input Heights

**Total: 10 tokens**

| Token | Valor | WCAG | Uso |
|-------|-------|------|-----|
| `--dss-input-height-xs` | 32px | ⚠️ | Inputs compactos |
| `--dss-input-height-sm` | 36px | ⚠️ | Inputs densos |
| `--dss-input-height-md` | 44px | ✅ **Mínimo WCAG** | Padrão |
| `--dss-input-height-lg` | 52px | ✅ | Inputs destacados |
| `--dss-input-height-xl` | 64px | ✅ | Inputs extra grandes |
| `--dss-input-padding-horizontal-xs` | 8px | - | Padding horizontal xs |
| `--dss-input-padding-horizontal-sm` | 10px | - | Padding horizontal sm |
| `--dss-input-padding-horizontal-md` | 12px | - | Padding horizontal md |
| `--dss-input-padding-horizontal-lg` | 16px | - | Padding horizontal lg |
| `--dss-input-padding-horizontal-xl` | 20px | - | Padding horizontal xl |

## 7.10 Checkboxes e Controles

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-checkbox-size-xs` | 16px | Tamanho visual xs |
| `--dss-checkbox-size-sm` | 18px | Tamanho visual sm |
| `--dss-checkbox-size-md` | 20px | **Tamanho visual padrão** |
| `--dss-checkbox-size-lg` | 24px | Tamanho visual lg |
| `--dss-checkbox-size-xl` | 28px | Tamanho visual xl |
| `--dss-checkbox-touch-area-xs` | 36px | Área tocável xs |
| `--dss-checkbox-touch-area-sm` | 40px | Área tocável sm |
| `--dss-checkbox-touch-area-md` | 44px | **Área tocável WCAG mínimo** |
| `--dss-checkbox-touch-area-lg` | 52px | Área tocável lg |
| `--dss-checkbox-touch-area-xl` | 60px | Área tocável xl |

## 7.11 Ícones

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-xs` | 16px | Ícones inline |
| `--dss-icon-size-sm` | 20px | Ícones secundários |
| `--dss-icon-size-md` | 24px | **Padrão - ícones interativos** |
| `--dss-icon-size-lg` | 32px | Ícones destacados |
| `--dss-icon-size-xl` | 48px | Ícones grandes (avatares) |
| `--dss-icon-spacing-xs` | 4px | Espaço mínimo |
| `--dss-icon-spacing-sm` | 6px | Espaço pequeno |
| `--dss-icon-spacing-md` | 8px | **Espaço padrão** |
| `--dss-icon-spacing-lg` | 12px | Espaço grande |
| `--dss-icon-spacing-xl` | 16px | Espaço extra grande |

## 7.12 Avatares

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-avatar-size-xs` | 24px | Avatar pequeno |
| `--dss-avatar-size-sm` | 32px | Avatar compacto |
| `--dss-avatar-size-md` | 40px | **Avatar padrão** |
| `--dss-avatar-size-lg` | 56px | Avatar grande |
| `--dss-avatar-size-xl` | 80px | Avatar extra grande |

## 7.13 Compact Controls - Alturas Visuais

**Total: 4 tokens**

> **⚠️ IMPORTANTE: Altura Visual vs Touch Target**
>
> Os tokens abaixo definem a **altura visual** do componente, NÃO o touch target.
> O touch target mínimo (48×48px WCAG) é garantido por outros mecanismos:
> - Padding expandido invisível
> - Pseudo-elementos `::before`/`::after`
> - Área de clique estendida via CSS
>
> **Consulte:** Seção "Touch Target vs Visual Height" no DSS_IMPLEMENTATION_GUIDE.md

### Definição

| Token | Valor | Consumidores | Descrição |
|-------|-------|--------------|-----------|
| `--dss-compact-control-height-xs` | 20px | Badge, Chip (xs) | Altura mínima para controles compactos |
| `--dss-compact-control-height-sm` | 24px | Badge, Chip (sm) | Altura pequena |
| `--dss-compact-control-height-md` | 28px | Badge (md), Chip (md) | **Altura padrão** |
| `--dss-compact-control-height-lg` | 32px | Badge (lg), Chip (lg) | Altura grande |

### Filosofia de Uso

```scss
// ✅ CORRETO: Componente consome token genérico
.dss-chip--md {
  min-height: var(--dss-compact-control-height-md); // 28px visual
  // Touch target garantido via padding ou pseudo-elemento
}

.dss-badge--md {
  min-height: var(--dss-compact-control-height-md); // 28px visual
}

// ❌ INCORRETO: Não criar tokens específicos de componente
// --dss-chip-height-md: 28px; // DEPRECADO
// --dss-badge-size-md: 24px;  // DEPRECADO
```

### Garantia de Touch Target (WCAG 2.5.5)

Os componentes que usam estes tokens DEVEM garantir touch target mínimo de 48×48px via:

```scss
// Exemplo de implementação do touch target via pseudo-elemento
.dss-chip {
  position: relative;
  min-height: var(--dss-compact-control-height-md); // 28px visual

  // Touch target expandido (invisível)
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: var(--dss-touch-target-min);  // 48px
    min-height: var(--dss-touch-target-min); // 48px
    pointer-events: none; // ⚠️ NÃO REMOVER - ver nota
  }
}
```

> **⚠️ `pointer-events: none` é OBRIGATÓRIO**: O pseudo-elemento existe apenas para ferramentas de acessibilidade aferir a área de toque. Ele NÃO deve interceptar eventos. Isto é decisão arquitetural, não bug.

### Mapeamento de Componentes

| Componente | Size Prop | Token Consumido | Touch Target |
|------------|-----------|-----------------|--------------|
| DssBadge | xs | `--dss-compact-control-height-xs` (20px) | Via padding |
| DssBadge | sm | `--dss-compact-control-height-sm` (24px) | Via padding |
| DssBadge | md | `--dss-compact-control-height-md` (28px) | Via padding |
| DssBadge | lg | `--dss-compact-control-height-lg` (32px) | Já atende |
| DssChip | xs | `--dss-compact-control-height-xs` (20px) | Via ::before |
| DssChip | sm | `--dss-compact-control-height-sm` (24px) | Via ::before |
| DssChip | md | `--dss-compact-control-height-md` (28px) | Via ::before |
| DssChip | lg | `--dss-compact-control-height-lg` (32px) | Já atende |

## 7.14 Breakpoints

**Total: 9 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-breakpoint-xs` | 320px | Mobile pequeno, zoom 300% |
| `--dss-breakpoint-sm` | 640px | Mobile, zoom 200% |
| `--dss-breakpoint-md` | 768px | Tablet |
| `--dss-breakpoint-lg` | 1024px | Desktop pequeno |
| `--dss-breakpoint-xl` | 1280px | Desktop padrão |
| `--dss-breakpoint-2xl` | 1536px | Desktop grande |
| `--dss-breakpoint-zoom-200` | 800px | Para zoom 200% |
| `--dss-breakpoint-zoom-300` | 600px | Para zoom 300% |
| `--dss-breakpoint-reflow` | 320px | **Mínimo WCAG reflow** |

## 7.15 Z-Index

**Total: 10 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-z-index-base` | 1 | Base |
| `--dss-z-index-dropdown` | 1000 | Dropdowns |
| `--dss-z-index-sticky` | 1020 | Elementos sticky |
| `--dss-z-index-fixed` | 1030 | Elementos fixos |
| `--dss-z-index-backdrop` | 1040 | Backdrop |
| `--dss-z-index-modal` | 1050 | Modais |
| `--dss-z-index-popover` | 1060 | Popovers |
| `--dss-z-index-tooltip` | 1070 | Tooltips |
| `--dss-z-index-notification` | 1080 | Notificações |
| `--dss-z-index-focus` | 9999 | **Foco sempre visível** |

## 7.16 Contraste - Ratios WCAG

**Total: 5 tokens**

| Token | Valor | WCAG | Uso |
|-------|-------|------|-----|
| `--dss-contrast-min-text` | 4.5 | AA | Texto normal (≤ 18pt) |
| `--dss-contrast-min-large` | 3.0 | AA | Texto grande (> 18pt ou 14pt bold) |
| `--dss-contrast-min-ui` | 3.0 | AA | Componentes de interface |
| `--dss-contrast-min-graphics` | 3.0 | AA | Gráficos informativos e ícones |
| `--dss-contrast-min-focus` | 4.5 | Recomendado | Indicadores de foco |

## 7.17 Contraste - Combinações Validadas

**Total: 20 tokens**

| Token | Valor | Status | Uso |
|-------|-------|--------|-----|
| `--dss-contrast-primary-on-white` | 4.6 | ✅ APROVADO | Primary sobre branco |
| `--dss-contrast-primary-on-gray50` | 4.8 | ✅ APROVADO | Primary sobre gray-50 |
| `--dss-contrast-primary-on-gray100` | 3.9 | ❌ NÃO USAR | Primary sobre gray-100 |
| `--dss-contrast-secondary-on-white` | 3.2 | ⚠️ SÓ TEXTO GRANDE | Secondary sobre branco |
| `--dss-contrast-tertiary-on-white` | 3.1 | ⚠️ SÓ TEXTO GRANDE | Tertiary sobre branco |
| `--dss-contrast-positive-on-white` | 2.4 | ❌ NUNCA TEXTO | Positive sobre branco |
| `--dss-contrast-positive-on-gray900` | 7.8 | ✅ APROVADO | Positive sobre gray-900 |
| `--dss-contrast-negative-on-white` | 7.1 | ✅ APROVADO | Negative sobre branco |
| `--dss-contrast-warning-on-white` | 1.9 | ❌ NUNCA TEXTO | Warning sobre branco |
| `--dss-contrast-warning-on-gray900` | 11.2 | ✅ APROVADO | Warning sobre gray-900 |
| `--dss-contrast-info-on-white` | 1.8 | ❌ NUNCA TEXTO | Info sobre branco |
| `--dss-contrast-info-on-gray900` | 9.6 | ✅ APROVADO | Info sobre gray-900 |
| `--dss-contrast-hub500-on-white` | 2.9 | ❌ NUNCA TEXTO | Hub sobre branco |
| `--dss-contrast-hub500-on-gray900` | 8.3 | ✅ APROVADO | Hub sobre gray-900 |
| `--dss-contrast-water500-on-white` | 4.6 | ✅ APROVADO | Water sobre branco |
| `--dss-contrast-water500-on-gray900` | 11.1 | ✅ APROVADO | Water sobre gray-900 |
| `--dss-contrast-waste500-on-white` | 3.1 | ⚠️ SÓ TEXTO GRANDE | Waste sobre branco |
| `--dss-contrast-dark-on-white` | 12.3 | ✅ APROVADO | Dark sobre branco |
| `--dss-contrast-gray600-on-white` | 4.8 | ✅ APROVADO | Gray-600 sobre branco |
| `--dss-contrast-gray700-on-white` | 7.3 | ✅ APROVADO | Gray-700 sobre branco |

---

# 8. Borders

Sistema de bordas para todos os componentes.

## 8.1 Border Widths

**Total: 7 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-border-width-none` | 0 | Sem borda |
| `--dss-border-width-hairline` | 0.5px | Ultra fino (retina) |
| `--dss-border-width-thin` | 1px | **Padrão** |
| `--dss-border-width-md` | 2px | Ênfase, foco |
| `--dss-border-width-thick` | 3px | Ênfase média |
| `--dss-border-width-heavy` | 4px | Forte ênfase |
| `--dss-border-width-extra-heavy` | 8px | Decorativo |

## 8.2 Bordas Neutras

**Total: 11 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-border-gray-50` | 1px solid var(--dss-gray-50) | Borda gray-50 |
| `--dss-border-gray-100` | 1px solid var(--dss-gray-100) | Borda gray-100 |
| `--dss-border-gray-200` | 1px solid var(--dss-gray-200) | Borda gray-200 |
| `--dss-border-gray-300` | 1px solid var(--dss-gray-300) | **Borda padrão** |
| `--dss-border-gray-400` | 1px solid var(--dss-gray-400) | Borda gray-400 |
| `--dss-border-gray-500` | 1px solid var(--dss-gray-500) | Borda gray-500 |
| `--dss-border-gray-600` | 1px solid var(--dss-gray-600) | Borda gray-600 |
| `--dss-border-gray-700` | 1px solid var(--dss-gray-700) | Borda gray-700 |
| `--dss-border-gray-800` | 1px solid var(--dss-gray-800) | Borda gray-800 |
| `--dss-border-gray-900` | 1px solid var(--dss-gray-900) | Borda gray-900 |
| `--dss-border-gray-950` | 1px solid var(--dss-gray-950) | Borda gray-950 |

## 8.3 Bordas de Ação

**Total: 25 tokens**

### Primary

| Token | Valor |
|-------|-------|
| `--dss-border-primary-disable` | 1px solid var(--dss-primary-disable) |
| `--dss-border-primary-light` | 1px solid var(--dss-primary-light) |
| `--dss-border-primary` | 1px solid var(--dss-primary) |
| `--dss-border-primary-hover` | 1px solid var(--dss-primary-hover) |
| `--dss-border-primary-deep` | 1px solid var(--dss-primary-deep) |

### Secondary

| Token | Valor |
|-------|-------|
| `--dss-border-secondary-disable` | 1px solid var(--dss-secondary-disable) |
| `--dss-border-secondary-light` | 1px solid var(--dss-secondary-light) |
| `--dss-border-secondary` | 1px solid var(--dss-secondary) |
| `--dss-border-secondary-hover` | 1px solid var(--dss-secondary-hover) |
| `--dss-border-secondary-deep` | 1px solid var(--dss-secondary-deep) |

### Tertiary

| Token | Valor |
|-------|-------|
| `--dss-border-tertiary-disable` | 1px solid var(--dss-tertiary-disable) |
| `--dss-border-tertiary-light` | 1px solid var(--dss-tertiary-light) |
| `--dss-border-tertiary` | 1px solid var(--dss-tertiary) |
| `--dss-border-tertiary-hover` | 1px solid var(--dss-tertiary-hover) |
| `--dss-border-tertiary-deep` | 1px solid var(--dss-tertiary-deep) |

### Accent

| Token | Valor |
|-------|-------|
| `--dss-border-accent-disable` | 1px solid var(--dss-accent-disable) |
| `--dss-border-accent-light` | 1px solid var(--dss-accent-light) |
| `--dss-border-accent` | 1px solid var(--dss-accent) |
| `--dss-border-accent-hover` | 1px solid var(--dss-accent-hover) |
| `--dss-border-accent-deep` | 1px solid var(--dss-accent-deep) |

## 8.4 Bordas de Feedback

**Total: 20 tokens**

### Positive

| Token | Valor |
|-------|-------|
| `--dss-border-positive-disable` | 1px solid var(--dss-positive-disable) |
| `--dss-border-positive-light` | 1px solid var(--dss-positive-light) |
| `--dss-border-positive` | 1px solid var(--dss-positive) |
| `--dss-border-positive-hover` | 1px solid var(--dss-positive-hover) |
| `--dss-border-positive-deep` | 1px solid var(--dss-positive-deep) |

### Negative

| Token | Valor |
|-------|-------|
| `--dss-border-negative-disable` | 1px solid var(--dss-negative-disable) |
| `--dss-border-negative-light` | 1px solid var(--dss-negative-light) |
| `--dss-border-negative` | 1px solid var(--dss-negative) |
| `--dss-border-negative-hover` | 1px solid var(--dss-negative-hover) |
| `--dss-border-negative-deep` | 1px solid var(--dss-negative-deep) |

### Warning

| Token | Valor |
|-------|-------|
| `--dss-border-warning-disable` | 1px solid var(--dss-warning-disable) |
| `--dss-border-warning-light` | 1px solid var(--dss-warning-light) |
| `--dss-border-warning` | 1px solid var(--dss-warning) |
| `--dss-border-warning-hover` | 1px solid var(--dss-warning-hover) |
| `--dss-border-warning-deep` | 1px solid var(--dss-warning-deep) |

### Info

| Token | Valor |
|-------|-------|
| `--dss-border-info-disable` | 1px solid var(--dss-info-disable) |
| `--dss-border-info-light` | 1px solid var(--dss-info-light) |
| `--dss-border-info` | 1px solid var(--dss-info) |
| `--dss-border-info-hover` | 1px solid var(--dss-info-hover) |
| `--dss-border-info-deep` | 1px solid var(--dss-info-deep) |

## 8.5 Bordas de Marca

**Total: 33 tokens**

### Hub (11 tokens)

| Token | Valor |
|-------|-------|
| `--dss-border-hub-50` | 1px solid var(--dss-hub-50) |
| `--dss-border-hub-100` | 1px solid var(--dss-hub-100) |
| `--dss-border-hub-200` | 1px solid var(--dss-hub-200) |
| `--dss-border-hub-300` | 1px solid var(--dss-hub-300) |
| `--dss-border-hub-400` | 1px solid var(--dss-hub-400) |
| `--dss-border-hub-500` | 1px solid var(--dss-hub-500) |
| `--dss-border-hub-600` | 1px solid var(--dss-hub-600) |
| `--dss-border-hub-700` | 1px solid var(--dss-hub-700) |
| `--dss-border-hub-800` | 1px solid var(--dss-hub-800) |
| `--dss-border-hub-900` | 1px solid var(--dss-hub-900) |
| `--dss-border-hub-950` | 1px solid var(--dss-hub-950) |

### Water (11 tokens)

| Token | Valor |
|-------|-------|
| `--dss-border-water-50` | 1px solid var(--dss-water-50) |
| `--dss-border-water-100` | 1px solid var(--dss-water-100) |
| `--dss-border-water-200` | 1px solid var(--dss-water-200) |
| `--dss-border-water-300` | 1px solid var(--dss-water-300) |
| `--dss-border-water-400` | 1px solid var(--dss-water-400) |
| `--dss-border-water-500` | 1px solid var(--dss-water-500) |
| `--dss-border-water-600` | 1px solid var(--dss-water-600) |
| `--dss-border-water-700` | 1px solid var(--dss-water-700) |
| `--dss-border-water-800` | 1px solid var(--dss-water-800) |
| `--dss-border-water-900` | 1px solid var(--dss-water-900) |
| `--dss-border-water-950` | 1px solid var(--dss-water-950) |

### Waste (11 tokens)

| Token | Valor |
|-------|-------|
| `--dss-border-waste-50` | 1px solid var(--dss-waste-50) |
| `--dss-border-waste-100` | 1px solid var(--dss-waste-100) |
| `--dss-border-waste-200` | 1px solid var(--dss-waste-200) |
| `--dss-border-waste-300` | 1px solid var(--dss-waste-300) |
| `--dss-border-waste-400` | 1px solid var(--dss-waste-400) |
| `--dss-border-waste-500` | 1px solid var(--dss-waste-500) |
| `--dss-border-waste-600` | 1px solid var(--dss-waste-600) |
| `--dss-border-waste-700` | 1px solid var(--dss-waste-700) |
| `--dss-border-waste-800` | 1px solid var(--dss-waste-800) |
| `--dss-border-waste-900` | 1px solid var(--dss-waste-900) |
| `--dss-border-waste-950` | 1px solid var(--dss-waste-950) |

## 8.6 Bordas de Dark

**Total: 5 tokens**

| Token | Valor |
|-------|-------|
| `--dss-border-dark-disable` | 1px solid var(--dss-dark-disable) |
| `--dss-border-dark-light` | 1px solid var(--dss-dark-light) |
| `--dss-border-dark` | 1px solid var(--dss-dark) |
| `--dss-border-dark-hover` | 1px solid var(--dss-dark-hover) |
| `--dss-border-dark-deep` | 1px solid var(--dss-dark-deep) |

## 8.7 Bordas Funcionais

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-border-focus` | 2px solid var(--dss-action-primary) | Borda de foco |
| `--dss-border-focus-subtle` | 1px solid var(--dss-action-primary) | Borda de foco sutil |
| `--dss-border-active` | 2px solid var(--dss-action-secondary) | Borda ativa |
| `--dss-border-selected` | 2px solid var(--dss-action-tertiary) | Borda selecionada |
| `--dss-border-disabled` | 1px solid var(--dss-gray-300) | Borda desabilitada |
| `--dss-border-readonly` | 1px dashed var(--dss-gray-400) | Borda somente leitura |

---

# 9. Shadows e Elevação

Sistema de profundidade visual através de sombras.

## 9.1 Sombras Base

**Total: 8 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-shadow-xs` | 0 0 0 1px rgba(0, 0, 0, 0.05) | Sombra mínima (borda sutil) |
| `--dss-shadow-sm` | 0 1px 3px rgba(0, 0, 0, 0.25) | Sombra pequena |
| `--dss-shadow-md` | 0 4px 6px rgba(0, 0, 0, 0.30) | Sombra média |
| `--dss-shadow-lg` | 0 10px 15px rgba(0, 0, 0, 0.35) | Sombra grande |
| `--dss-shadow-xl` | 0 20px 25px rgba(0, 0, 0, 0.40) | Sombra extra grande |
| `--dss-shadow-2xl` | 0 25px 50px rgba(0, 0, 0, 0.45) | Sombra 2x extra grande |
| `--dss-shadow-inner` | inset 0 2px 4px rgba(0, 0, 0, 0.06) | Sombra interna |
| `--dss-shadow-inner-lg` | inset 0 4px 8px rgba(0, 0, 0, 0.08) | Sombra interna grande |

## 9.2 Sombras Semânticas

**Total: 5 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-shadow-focus` | 0 0 0 3px rgba(31, 134, 222, 0.5) | Sombra de foco (alternativa a outline) |
| `--dss-shadow-focus-error` | 0 0 0 3px rgba(216, 24, 46, 0.5) | Sombra de foco em erro |
| `--dss-shadow-focus-success` | 0 0 0 3px rgba(77, 210, 40, 0.5) | Sombra de foco em sucesso |
| `--dss-shadow-overlay` | 0 10px 38px rgba(0, 0, 0, 0.2) | Sombra de overlay/backdrop |
| `--dss-shadow-modal` | 0 20px 60px rgba(0, 0, 0, 0.3) | Sombra de modal |

## 9.3 Sombras de Marca

**Total: 9 tokens**

### Hub

| Token | Valor |
|-------|-------|
| `--dss-shadow-hub-sm` | 0 1px 3px rgba(245, 145, 26, 0.15) |
| `--dss-shadow-hub-md` | 0 4px 6px rgba(245, 145, 26, 0.15) |
| `--dss-shadow-hub-lg` | 0 10px 15px rgba(245, 145, 26, 0.15) |

### Water

| Token | Valor |
|-------|-------|
| `--dss-shadow-water-sm` | 0 1px 3px rgba(14, 136, 228, 0.15) |
| `--dss-shadow-water-md` | 0 4px 6px rgba(14, 136, 228, 0.15) |
| `--dss-shadow-water-lg` | 0 10px 15px rgba(14, 136, 228, 0.15) |

### Waste

| Token | Valor |
|-------|-------|
| `--dss-shadow-waste-sm` | 0 1px 3px rgba(24, 177, 115, 0.15) |
| `--dss-shadow-waste-md` | 0 4px 6px rgba(24, 177, 115, 0.15) |
| `--dss-shadow-waste-lg` | 0 10px 15px rgba(24, 177, 115, 0.15) |

## 9.4 Elevação Semântica

**Total: 6 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-elevation-0` | none | Sem elevação |
| `--dss-elevation-1` | `var(--dss-shadow-sm)` | Elevação nível 1 (cards padrão) |
| `--dss-elevation-2` | `var(--dss-shadow-md)` | Elevação nível 2 (cards hover) |
| `--dss-elevation-3` | `var(--dss-shadow-lg)` | Elevação nível 3 (popovers, toasts) |
| `--dss-elevation-4` | `var(--dss-shadow-xl)` | Elevação nível 4 (modais) |
| `--dss-elevation-5` | `var(--dss-shadow-2xl)` | Elevação nível 5 (fullscreen) |

## 9.5 Sombras para Estados

**Total: 3 tokens**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-shadow-hover` | `var(--dss-shadow-md)` | Sombra em hover |
| `--dss-shadow-active` | `var(--dss-shadow-inner)` | Sombra em estado ativo |
| `--dss-shadow-drag` | 0 10px 20px rgba(0, 0, 0, 0.15) | Sombra durante drag |

---

# 10. Tokens Deprecados

Tokens component-specific removidos na refatoração de Janeiro 2025 seguindo a filosofia **"Tokens = Provedores, Componentes = Consumidores"**.

## 10.1 Spacing Component-Specific

**Total: 16 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-button-padding-x` | `var(--dss-spacing-4)` | DssButton |
| `--dss-button-padding-y` | `var(--dss-spacing-2)` | DssButton |
| `--dss-button-padding-compact-x` | `var(--dss-spacing-3)` | DssButton |
| `--dss-button-padding-compact-y` | `var(--dss-spacing-1_5)` | DssButton |
| `--dss-input-padding-x` | `var(--dss-spacing-3)` | DssInput |
| `--dss-input-padding-y` | `var(--dss-spacing-2)` | DssInput |
| `--dss-input-height` | `var(--dss-spacing-10)` | DssInput |
| `--dss-card-padding` | `var(--dss-spacing-6)` | DssCard |
| `--dss-card-padding-compact` | `var(--dss-spacing-4)` | DssCard |
| `--dss-modal-padding` | `var(--dss-spacing-6)` | DssModal |
| `--dss-modal-header-padding` | `var(--dss-spacing-6) var(--dss-spacing-6) var(--dss-spacing-4)` | DssModal |
| `--dss-modal-body-padding` | `var(--dss-spacing-6)` | DssModal |
| `--dss-modal-footer-padding` | `var(--dss-spacing-4) var(--dss-spacing-6) var(--dss-spacing-6)` | DssModal |
| `--dss-radius-button` | `var(--dss-radius-md)` | DssButton |
| `--dss-radius-input` | `var(--dss-radius-md)` | DssInput |
| `--dss-radius-card` | `var(--dss-radius-lg)` | DssCard |

## 10.2 Motion Component-Specific

**Total: 2 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-duration-modal` | `var(--dss-duration-slow)` | DssModal |
| `--dss-duration-toast` | `var(--dss-duration-slow)` | DssToast |

## 10.3 Borders Component-Specific

**Total: 12 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-border-input-default` | `1px solid var(--dss-gray-300)` | DssInput |
| `--dss-border-input-hover` | `1px solid var(--dss-gray-400)` | DssInput |
| `--dss-border-input-focus` | `2px solid var(--dss-action-primary)` | DssInput |
| `--dss-border-input-error` | `2px solid var(--dss-negative)` | DssInput |
| `--dss-border-input-success` | `2px solid var(--dss-positive)` | DssInput |
| `--dss-border-input-disabled` | `1px solid var(--dss-gray-200)` | DssInput |
| `--dss-border-card-default` | `1px solid var(--dss-gray-200)` | DssCard |
| `--dss-border-card-elevated` | `1px solid var(--dss-gray-300)` | DssCard |
| `--dss-border-card-selected` | `2px solid var(--dss-action-primary)` | DssCard |
| `--dss-border-divider-subtle` | `1px solid var(--dss-gray-100)` | DssDivider |
| `--dss-border-divider-default` | `1px solid var(--dss-gray-200)` | DssDivider |
| `--dss-border-divider-strong` | `1px solid var(--dss-gray-300)` | DssDivider |

## 10.4 Shadows Component-Specific

**Total: 5 tokens removidos**

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-elevation-card` | `var(--dss-elevation-1)` | DssCard |
| `--dss-elevation-card-hover` | `var(--dss-elevation-2)` | DssCard |
| `--dss-elevation-modal` | `var(--dss-elevation-4)` | DssModal |
| `--dss-elevation-tooltip` | `var(--dss-elevation-2)` | DssTooltip |
| `--dss-elevation-toast` | `var(--dss-elevation-3)` | DssToast |

## 10.5 Badges e Chips Component-Specific

**Total: 10 tokens removidos** (Janeiro 2025)

| Token Deprecado | Substituir por | Componente |
|-----------------|----------------|-----------|
| `--dss-badge-size-xs` | `var(--dss-compact-control-height-xs)` (20px) | DssBadge |
| `--dss-badge-size-sm` | `var(--dss-compact-control-height-sm)` (24px) | DssBadge |
| `--dss-badge-size-md` | `var(--dss-compact-control-height-md)` (28px) | DssBadge |
| `--dss-badge-size-lg` | `var(--dss-compact-control-height-lg)` (32px) | DssBadge |
| `--dss-badge-size-xl` | `var(--dss-compact-control-height-lg)` (32px) | DssBadge |
| `--dss-chip-height-xs` | `var(--dss-compact-control-height-xs)` (20px) | DssChip |
| `--dss-chip-height-sm` | `var(--dss-compact-control-height-sm)` (24px) | DssChip |
| `--dss-chip-height-md` | `var(--dss-compact-control-height-md)` (28px) | DssChip |
| `--dss-chip-height-lg` | `var(--dss-compact-control-height-lg)` (32px) | DssChip |
| `--dss-chip-height-xl` | `var(--dss-compact-control-height-lg)` (32px) | DssChip |

> **Motivo da Deprecação:** Tokens component-specific violam a filosofia "Tokens = Provedores, Componentes = Consumidores".
> O novo token `--dss-compact-control-height-*` é genérico e reutilizável por qualquer controle compacto.

### Benefícios da Refatoração

✅ **Escalabilidade**: 100 componentes = mesmos tokens genéricos
✅ **Flexibilidade**: Componentes escolhem tokens livremente
✅ **Manutenibilidade**: Mudanças isoladas nos componentes
✅ **Clareza**: Valores explícitos (gray-300, spacing-4)

---

## Referências

### Documentos Relacionados
- **DSS_TOKEN_GUIDELINES.md**: Filosofia e boas práticas
- **TOKENS_CONFORMIDADE_AUDITORIA.md**: Relatório de auditoria (Janeiro 2025)
- **AUDITORIA_DSS_JAN_2025.md**: Auditoria completa do sistema
- **Guia de Acessibilidade DSS**: Páginas 7-9 (Tipografia, Contraste, Legibilidade)

### Conformidade WCAG
- **WCAG 2.1 AA**: https://www.w3.org/WAI/WCAG21/quickref/
- **SC 2.5.5**: Target Size (44×44px mínimo)
- **SC 1.4.10**: Reflow (320px viewport)
- **SC 1.4.11**: Non-text Contrast (3:1 mínimo)
- **SC 2.4.7**: Focus Visible (indicadores de foco)

### Framework
- **Quasar Framework**: https://quasar.dev/style/spacing
- **Escala de Tamanhos**: xs, sm, md, lg, xl (compatível com Quasar)

---

**Documento Gerado em:** Janeiro 2025
**Última Atualização:** Janeiro 2025
**Versão DSS:** v2.2.0
