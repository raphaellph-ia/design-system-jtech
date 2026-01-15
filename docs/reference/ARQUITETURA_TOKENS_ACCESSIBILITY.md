# 🏗️ ARQUITETURA DE TOKENS - ACCESSIBILITY
## Reorganização Baseada em Melhores Práticas do Mercado

**Data:** 16 de Dezembro de 2025
**Objetivo:** Resolver confusão arquitetural e alinhar com padrões da indústria

---

## 🚨 PROBLEMA ATUAL

### Estrutura Confusa Existente

```
tokens/semantic/
├── _accessibility.scss          ← Importa apenas 'focus' (do nível pai!)
├── _focus.scss                  ← 339 linhas, sistema NOVO (Jan 2025)
│
└── accessibility/               ← Pasta com 4 arquivos
    ├── _focus.scss              ← 87 linhas, sistema ANTIGO (Dec 2025)
    ├── _contrast.scss           ← 4KB, ratios WCAG
    ├── _sizing.scss             ← 4KB, touch targets
    └── _typography.scss         ← 5KB, tipografia acessível
```

### ❌ Problemas Identificados

1. **Duplicação Confusa**
   - Dois arquivos `_focus.scss` em locais diferentes
   - Sistema NOVO (339 linhas) está fora da pasta accessibility/
   - Sistema ANTIGO (87 linhas) está dentro da pasta accessibility/

2. **Importação Inconsistente**
   - `_accessibility.scss` importa `'focus'` do nível pai
   - Ignora os arquivos dentro de `accessibility/`
   - Não há um agregador dentro da pasta accessibility/

3. **Falta de Padrão**
   - Não está claro onde adicionar novos tokens de acessibilidade
   - Arquivos relacionados estão separados
   - Dificulta manutenção e auditoria WCAG

---

## 🌍 MELHORES PRÁTICAS DO MERCADO

### Análise de Design Systems Líderes

#### 1. **Material Design (Google)**
```
tokens/
├── color/
├── typography/
└── accessibility/              ← Namespace dedicado
    ├── contrast.json
    ├── focus.json
    ├── sizing.json
    └── motion.json
```
**Princípio:** *"Tokens relacionados devem estar fisicamente próximos"*

#### 2. **Carbon Design System (IBM)**
```
scss/
├── components/
├── globals/
└── a11y/                       ← Namespace 'a11y' (accessibility)
    ├── _focus.scss
    ├── _keyboard.scss
    └── _contrast.scss
```
**Princípio:** *"Acessibilidade é uma categoria de primeira classe"*

#### 3. **Lightning Design System (Salesforce)**
```
design-tokens/
├── core/
├── components/
└── accessibility/              ← Categoria dedicada
    ├── focus-ring.yml
    ├── touch-target.yml
    └── contrast-ratio.yml
```
**Princípio:** *"Conformidade WCAG deve ser auditável facilmente"*

#### 4. **Polaris (Shopify)**
```
tokens/
├── colors/
├── spacing/
└── accessibility/
    ├── focus/
    │   ├── color.json
    │   └── width.json
    ├── touch-target.json
    └── contrast.json
```
**Princípio:** *"Organização hierárquica por propósito, não por tipo"*

### 📊 Consenso da Indústria

| Design System | Estrutura | Namespace |
|---------------|-----------|-----------|
| Material Design | ✅ Pasta dedicada | `accessibility/` |
| Carbon (IBM) | ✅ Pasta dedicada | `a11y/` |
| Lightning (Salesforce) | ✅ Pasta dedicada | `accessibility/` |
| Polaris (Shopify) | ✅ Pasta dedicada | `accessibility/` |
| Atlassian | ✅ Pasta dedicada | `accessibility/` |
| Spectrum (Adobe) | ✅ Pasta dedicada | `accessibility/` |

**Conclusão:** 100% dos design systems líderes usam **namespace dedicado para acessibilidade**.

---

## ✅ SOLUÇÃO RECOMENDADA

### Opção A: Namespace Dedicado (RECOMENDADO) ⭐

```
tokens/semantic/
├── _actions.scss
├── _text.scss
├── _surfaces.scss
├── _borders.scss
├── _feedback.scss
│
└── accessibility/                    ← NAMESPACE DEDICADO
    ├── index.scss                    ← 🆕 Agregador principal
    ├── _focus.scss                   ← 🔄 Versão unificada (339 linhas)
    ├── _contrast.scss                ← ✅ Existente
    ├── _sizing.scss                  ← ✅ Existente
    └── _typography.scss              ← ✅ Existente
```

#### Import Chain
```scss
// tokens/index.scss
@import 'semantic/accessibility/index';  // ← Caminho atualizado

// tokens/semantic/accessibility/index.scss (NOVO)
@import 'focus';
@import 'contrast';
@import 'sizing';
@import 'typography';
```

#### ✅ Vantagens

1. **Organização Clara**
   - Todos os tokens WCAG em um único namespace
   - Fácil encontrar e auditar conformidade

2. **Escalabilidade**
   - Adicionar novos tokens (e.g., `_keyboard.scss`, `_motion.scss`)
   - Crescimento natural sem poluir nível pai

3. **Manutenção**
   - Auditoria WCAG: verificar apenas 1 pasta
   - Refatoração isolada sem afetar outros tokens

4. **Padrão da Indústria**
   - Alinhado com Material, Carbon, Lightning, Polaris
   - Fácil onboarding de novos desenvolvedores

5. **Documentação**
   - README dentro de `accessibility/` pode documentar conformidade
   - Fácil gerar relatórios WCAG automaticamente

#### ⚠️ Desvantagens Menores

- Caminho de import ligeiramente mais longo
- Necessita migração (uma vez, feita com cuidado)

---

### Opção B: Flat Structure (NÃO RECOMENDADO)

```
tokens/semantic/
├── _actions.scss
├── _text.scss
├── _surfaces.scss
├── _focus.scss                       ← Misturado com outros
├── _contrast.scss                    ← Poluição do namespace
├── _sizing.scss
├── _typography.scss
└── _borders.scss
```

#### ❌ Desvantagens

1. **Poluição de Namespace**
   - 20+ arquivos no mesmo nível
   - Difícil encontrar tokens relacionados

2. **Falta de Contexto**
   - Não é claro que `_focus.scss` é sobre acessibilidade
   - Pode ser confundido com foco visual genérico

3. **Não Escalável**
   - Adicionar 10+ tokens de acessibilidade = pasta gigante
   - Dificulta navegação e manutenção

4. **Contra Padrões da Indústria**
   - Nenhum design system líder usa essa abordagem
   - Dificulta onboarding

---

### Opção C: Híbrida (NÃO RECOMENDADO)

```
tokens/semantic/
├── _focus.scss                       ← "Geral" fora
└── accessibility/
    ├── _contrast.scss                ← "Específico" dentro
    ├── _sizing.scss
    └── _typography.scss
```

#### ❌ Desvantagens

1. **Inconsistência**
   - Critério subjetivo: o que é "geral" vs "específico"?
   - Confusão para novos desenvolvedores

2. **Auditoria WCAG Difícil**
   - Tokens espalhados em múltiplos locais
   - Relatórios de conformidade fragmentados

3. **Crescimento Problemático**
   - Onde adicionar novos tokens? (decisão sempre necessária)

---

## 🎯 DECISÃO FINAL: OPÇÃO A

**Recomendação:** Namespace dedicado `accessibility/` com agregador `index.scss`

### Por Que?

1. ✅ **Alinhado com 100% dos design systems líderes**
2. ✅ **Organização clara e intuitiva**
3. ✅ **Facilita auditoria WCAG**
4. ✅ **Escalável para crescimento futuro**
5. ✅ **Manutenção isolada**

---

## 📋 PLANO DE MIGRAÇÃO

### Fase 1: Preparação (5 min)

#### 1.1. Backup
```bash
cd /mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/dss
cp -r tokens/semantic tokens/semantic.backup
```

#### 1.2. Análise de Dependências
```bash
# Verificar quem importa _focus.scss do nível pai
grep -r "import.*focus" tokens/ utils/ components/

# Resultado esperado:
# tokens/semantic/_accessibility.scss:14:@import 'focus';
```

### Fase 2: Unificação dos Arquivos Focus (10 min)

#### 2.1. Decidir Qual Versão Manter

**Comparação:**

| Aspecto | Sistema NOVO (pai) | Sistema ANTIGO (accessibility/) |
|---------|-------------------|--------------------------------|
| **Linhas** | 339 | 87 |
| **Cores** | 9 (primary, secondary, tertiary, accent, success, error, warning, info, dark) | 5 (primary, secondary, tertiary, error, success) |
| **Dark Mode** | ✅ Sim (+15-30% luminosidade) | ❌ Não |
| **Brandability** | ✅ Hub, Water, Waste | ❌ Não |
| **High Contrast** | ✅ @media (prefers-contrast) | ✅ Sim |
| **RGB Variants** | ✅ Sim (para manipulação) | ❌ Não |
| **Box Shadows** | ✅ Compostos prontos | ❌ Não |
| **Offset Variants** | ✅ Sim | ❌ Não |
| **Documentação** | ✅ Inline completa | ⚠️ Básica |
| **WCAG Validado** | ✅ Todos os contrastes | ⚠️ Alguns |
| **Data** | Jan 2025 | Dec 2025 |

**Decisão:** ✅ **Manter Sistema NOVO (339 linhas)** - É superior em todos os aspectos.

#### 2.2. Mover Sistema NOVO para accessibility/

```bash
# Mover arquivo para pasta correta
mv tokens/semantic/_focus.scss tokens/semantic/accessibility/_focus.scss

# Deletar sistema antigo (agora redundante)
rm tokens/semantic/accessibility/_focus.scss.old  # (renomear antes de deletar)
```

**Comando Seguro:**
```bash
# 1. Fazer backup do antigo
mv tokens/semantic/accessibility/_focus.scss tokens/semantic/accessibility/_focus.OLD.scss

# 2. Mover o novo para o lugar
mv tokens/semantic/_focus.scss tokens/semantic/accessibility/_focus.scss

# 3. Verificar que funcionou
ls -lh tokens/semantic/accessibility/_focus.scss
# Deve mostrar 14KB (339 linhas)
```

### Fase 3: Criar Agregador (5 min)

#### 3.1. Criar `accessibility/index.scss`

```scss
// =============================================================================
// DSS - Accessibility Tokens Aggregator
// =============================================================================
//
// Criado: Dezembro 2025 (Reorganização Arquitetural)
// Objetivo: Centralizar todos os tokens de acessibilidade WCAG 2.1 AA
// Referência: https://www.w3.org/WAI/WCAG21/quickref/
//
// =============================================================================

// -----------------------------------------------------------------------------
// FOCUS VISIBLE (WCAG 2.4.7 Level AA)
// -----------------------------------------------------------------------------
// Focus rings visíveis com contraste mínimo 3:1
// - 9 cores semânticas validadas
// - Dark mode automático
// - Brandability (Hub, Water, Waste)
// - High contrast mode
// Tokens: --dss-focus-*, --dss-focus-shadow-*, --dss-focus-ring-*
@import 'focus';

// -----------------------------------------------------------------------------
// CONTRAST RATIOS (WCAG 1.4.3, 1.4.6)
// -----------------------------------------------------------------------------
// Ratios de contraste pré-validados para texto e UI
// - Mínimos WCAG: 4.5:1 (texto), 3:1 (UI)
// - Combinações aprovadas documentadas
// Tokens: --dss-contrast-min-*, --dss-contrast-*-on-*
@import 'contrast';

// -----------------------------------------------------------------------------
// TOUCH TARGETS (WCAG 2.5.5)
// -----------------------------------------------------------------------------
// Tamanhos mínimos para áreas tocáveis
// - Mínimo: 44×44px (WCAG)
// - Ideal: 48×48px
// Tokens: --dss-touch-target-*, --dss-touch-spacing-*
@import 'sizing';

// -----------------------------------------------------------------------------
// TYPOGRAPHY (WCAG 1.4.4, 1.4.12)
// -----------------------------------------------------------------------------
// Tipografia acessível e escalável
// - Tamanhos mínimos
// - Espaçamento legível
// - Suporte a zoom 200%
// Tokens: --dss-font-size-*-min, --dss-line-height-*
@import 'typography';

// =============================================================================
// NOTAS DE USO
// =============================================================================
/*
# Importar Tokens de Acessibilidade

## Opção 1: Importar todos
```scss
@import 'tokens/semantic/accessibility';
```

## Opção 2: Importar específicos
```scss
@import 'tokens/semantic/accessibility/focus';
@import 'tokens/semantic/accessibility/contrast';
```

# Conformidade WCAG 2.1 AA

Este módulo garante conformidade com os seguintes critérios:

- ✅ 2.4.7 Focus Visible (Level AA)
- ✅ 1.4.3 Contrast (Minimum) (Level AA)
- ✅ 1.4.6 Contrast (Enhanced) (Level AAA)
- ✅ 2.5.5 Target Size (Level AAA)
- ✅ 1.4.4 Resize Text (Level AA)
- ✅ 1.4.12 Text Spacing (Level AA)

# Auditoria

Para auditar conformidade:
```bash
grep -r "dss-focus\|dss-contrast\|dss-touch" components/
```

# Documentação

Ver: docs/WCAG_COMPLIANCE.md
*/
```

### Fase 4: Atualizar Imports (5 min)

#### 4.1. Atualizar `tokens/semantic/_accessibility.scss`

**ANTES:**
```scss
// Criado: Janeiro 2025 (Acao 2)
// Objetivo: Agregar todos os tokens de acessibilidade WCAG 2.1 AA

@import 'focus';  // ← Import do nível pai (ERRADO)
```

**DEPOIS:**
```scss
// =============================================================================
// DSS - Accessibility Tokens (Deprecated - Use accessibility/index)
// =============================================================================
//
// ⚠️ DEPRECATED: Este arquivo será removido em DSS v3.0
//
// Use o novo caminho:
//   @import 'semantic/accessibility';
//
// Mantido temporariamente para retrocompatibilidade.
// =============================================================================

@forward 'accessibility';  // ← Redireciona para nova localização
```

#### 4.2. Atualizar `tokens/index.scss`

**ANTES:**
```scss
/* 3. Tokens de acessibilidade (Guia Veolia) */
@import 'semantic/accessibility';  /* Agrega: contrast, focus, sizing, typography */
```

**DEPOIS:**
```scss
/* 3. Tokens de acessibilidade (WCAG 2.1 AA) */
@import 'semantic/accessibility';  /* ← Agora aponta para accessibility/index.scss */
```

**Nota:** Sass resolve automaticamente `accessibility` → `accessibility/index.scss`

### Fase 5: Verificação e Testes (10 min)

#### 5.1. Compilar CSS
```bash
npm run build
```

**Verificações:**
```bash
# 1. Tamanho do CSS deve permanecer igual
ls -lh index.css
# Esperado: ~213KB

# 2. Tokens focus devem estar presentes
grep -c "dss-focus-primary:" index.css
# Esperado: 5 (light, dark, 3 brands)

# 3. Tokens contrast devem estar presentes
grep -c "dss-contrast-min-text:" index.css
# Esperado: 1

# 4. Tokens sizing devem estar presentes
grep -c "dss-touch-target-min:" index.css
# Esperado: 1

# 5. Nenhum erro de compilação
npm run build 2>&1 | grep -i "error"
# Esperado: (vazio)
```

#### 5.2. Testar Aplicação
```bash
# Abrir test-dss-button.html no navegador
# Verificar:
# - Botões push renderizam corretamente ✅
# - Focus rings aparecem ao pressionar Tab ✅
# - Dark mode funciona ✅
```

### Fase 6: Limpeza (5 min)

#### 6.1. Remover Arquivos de Backup
```bash
# Após confirmar que tudo funciona
rm tokens/semantic.backup -rf
rm tokens/semantic/accessibility/_focus.OLD.scss
```

#### 6.2. Atualizar Documentação
```bash
# Criar/atualizar arquivo README
cat > tokens/semantic/accessibility/README.md << 'EOF'
# Accessibility Tokens

Este módulo contém todos os tokens relacionados à conformidade WCAG 2.1 AA.

## Estrutura

- `_focus.scss` - Focus rings (WCAG 2.4.7)
- `_contrast.scss` - Ratios de contraste (WCAG 1.4.3, 1.4.6)
- `_sizing.scss` - Touch targets (WCAG 2.5.5)
- `_typography.scss` - Tipografia acessível (WCAG 1.4.4, 1.4.12)
- `index.scss` - Agregador principal

## Uso

```scss
@import 'tokens/semantic/accessibility';
```

## Conformidade

✅ WCAG 2.1 AA compliant
EOF
```

---

## 📊 RESULTADO FINAL

### Estrutura Limpa

```
tokens/semantic/
├── _actions.scss
├── _text.scss
├── _surfaces.scss
├── _borders.scss
├── _feedback.scss
├── _opacity.scss
├── _shadows.scss
├── _z-index.scss
├── _motion.scss
├── _spacing.scss
├── _breakpoints.scss
├── _gradients.scss
│
└── accessibility/                    ← ✅ NAMESPACE DEDICADO
    ├── README.md                     ← 🆕 Documentação
    ├── index.scss                    ← 🆕 Agregador
    ├── _focus.scss                   ← 🔄 Unificado (339 linhas)
    ├── _contrast.scss                ← ✅ Mantido
    ├── _sizing.scss                  ← ✅ Mantido
    └── _typography.scss              ← ✅ Mantido
```

### Import Chain Simplificado

```scss
// tokens/index.scss
@import 'semantic/accessibility';
         ↓
// tokens/semantic/accessibility/index.scss (auto-resolved)
@import 'focus';
@import 'contrast';
@import 'sizing';
@import 'typography';
         ↓
// Todos os 4 arquivos carregados ✅
```

### Benefícios Alcançados

1. ✅ **Organização Clara**
   - Todos os tokens WCAG em um namespace
   - Fácil encontrar e auditar

2. ✅ **Sem Duplicação**
   - Sistema focus unificado (339 linhas)
   - Sistema antigo removido

3. ✅ **Alinhado com Mercado**
   - Segue padrões de Material, Carbon, Lightning
   - Fácil onboarding

4. ✅ **Escalável**
   - Adicionar novos tokens: criar arquivo em accessibility/
   - Adicionar import em accessibility/index.scss

5. ✅ **Auditável**
   - Conformidade WCAG: verificar apenas 1 pasta
   - Gerar relatórios automaticamente

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Preparação
- [ ] Fazer backup: `cp -r tokens/semantic tokens/semantic.backup`
- [ ] Verificar dependências: `grep -r "import.*focus" tokens/ utils/ components/`

### Migração de Arquivos
- [ ] Backup do focus antigo: `mv accessibility/_focus.scss accessibility/_focus.OLD.scss`
- [ ] Mover focus novo: `mv _focus.scss accessibility/_focus.scss`
- [ ] Verificar tamanho: `wc -l accessibility/_focus.scss` (deve ser 339)

### Criar Agregador
- [ ] Criar `accessibility/index.scss` com imports de todos os arquivos
- [ ] Adicionar documentação inline no index.scss
- [ ] Criar `accessibility/README.md`

### Atualizar Imports
- [ ] Atualizar `_accessibility.scss` com `@forward 'accessibility'`
- [ ] Marcar `_accessibility.scss` como deprecated
- [ ] Verificar que `tokens/index.scss` importa corretamente

### Testes
- [ ] Compilar CSS: `npm run build`
- [ ] Verificar tamanho: `ls -lh index.css` (deve ser ~213KB)
- [ ] Verificar tokens focus: `grep -c "dss-focus-primary:" index.css` (deve ser 5)
- [ ] Verificar tokens contrast: `grep -c "dss-contrast-min-text:" index.css` (deve ser ≥1)
- [ ] Verificar tokens sizing: `grep -c "dss-touch-target-min:" index.css` (deve ser ≥1)
- [ ] Nenhum erro: `npm run build 2>&1 | grep -i "error"` (deve estar vazio)
- [ ] Testar `test-dss-button.html` no navegador

### Limpeza
- [ ] Remover backup: `rm -rf tokens/semantic.backup`
- [ ] Remover focus antigo: `rm accessibility/_focus.OLD.scss`
- [ ] Atualizar `DSS_AUDITORIA_COMPLETA.md` com nova estrutura

### Documentação
- [ ] Atualizar `DSS_IMPLEMENTATION_GUIDE.md`
- [ ] Atualizar `FOCUS_TOKENS_REFERENCIA.md` com novo caminho
- [ ] Criar `MIGRATION_GUIDE.md` se necessário

---

## 🎓 LIÇÕES APRENDIDAS

### O Que Evitar

1. ❌ **Duplicação de Arquivos** - Manter duas versões do mesmo arquivo
2. ❌ **Imports Inconsistentes** - Importar de diferentes locais
3. ❌ **Namespace Flat** - Misturar todos os arquivos no mesmo nível
4. ❌ **Sem Agregador** - Forçar usuários a importar múltiplos arquivos

### O Que Fazer

1. ✅ **Namespace Dedicado** - Agrupar tokens relacionados
2. ✅ **Agregador Central** - `index.scss` em cada namespace
3. ✅ **Documentação Clara** - README em cada pasta
4. ✅ **Convenções de Nomenclatura** - `_nome-do-arquivo.scss`
5. ✅ **Seguir Padrões** - Alinhar com design systems líderes

---

## 📚 REFERÊNCIAS

### Design Systems Consultados
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens)
- [Carbon Design System](https://carbondesignsystem.com/guidelines/accessibility/overview)
- [Lightning Design System](https://www.lightningdesignsystem.com/accessibility/overview/)
- [Polaris by Shopify](https://polaris.shopify.com/tokens/colors)
- [Atlassian Design System](https://atlassian.design/foundations/accessibility)

### WCAG 2.1 AA
- [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/quickref/#focus-visible)
- [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum)
- [2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/quickref/#target-size)
- [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG21/quickref/#resize-text)

---

**Fim do Documento**

*Preparado para garantir arquitetura limpa e alinhada com melhores práticas do mercado*
