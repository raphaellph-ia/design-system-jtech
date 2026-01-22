# CLAUDE.md - Design System Sansys (DSS)

Este arquivo fornece orientações para agentes de IA (Claude Code) ao trabalhar no projeto DSS.

---

## Contexto do Projeto

O **Design System Sansys (DSS)** é um sistema de design corporativo baseado em Vue.js e Quasar Framework. O DSS é uma **camada de tokens e estilos** sobre o Quasar, não uma biblioteca standalone.

### Produtos Suportados
- **Sansys Hub** (marca laranja)
- **Sansys Water** (marca azul)
- **Sansys Waste** (marca verde)

---

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Desenvolvimento com hot-reload
npm run dev

# Build para produção
npm run build

# Verificar tipos TypeScript
npm run type-check

# Executar testes
npm run test
```

---

## Implementação de Novos Componentes

### Leitura Obrigatória (nesta ordem)

Antes de implementar qualquer componente, leia os seguintes arquivos:

1. **`docs/PRD_DSS.md`** - Entendimento do produto, contexto e papel estratégico do DSS
2. **`docs/reference/DSS_ARCHITECTURE.md`** - Arquitetura completa, estrutura de diretórios, sistema de tokens
3. **`docs/reference/DSS_COMPONENT_ARCHITECTURE.md`** - Tutorial passo a passo, padrões obrigatórios, anti-patterns
4. **`docs/guides/DSS_IMPLEMENTATION_GUIDE.md`** - Classes utilitárias, integração Quasar, uso de tokens
5. **`.github/pull_request_template.md`** - Critérios de aprovação de PR (o componente deve atender todos)
6. **`docs/guides/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md`** - Checklist de documentação, Golden Sample, princípios de documentação
7. **`docs/guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md`** - Regras para componentes compostos (DSSForm, DSSPageHeader, etc.)

### Componente de Referência (Golden Sample)

Use **`components/base/DssButton/`** como referência. Este é o componente mais completo e exemplifica todos os padrões do DSS.

### Arquitetura de 4 Camadas

Todo componente DSS segue esta estrutura:

```
components/base/DssNomeComponente/
├── 1-structure/           # Componente Vue (TypeScript + Composition API)
│   └── DssNomeComponente.ts.vue
├── 2-composition/         # Estilos base (APENAS tokens genéricos)
│   └── _base.scss
├── 3-variants/            # Variantes visuais (elevated, flat, outline...)
│   ├── _elevated.scss
│   ├── _flat.scss
│   └── index.scss
├── 4-output/              # Brands e estados finais
│   ├── _brands.scss       # Hub, Water, Waste
│   ├── _states.scss       # Dark mode, high contrast
│   └── index.scss
├── composables/           # Lógica reutilizável (TypeScript)
│   └── useNomeComponenteClasses.ts
├── types/                 # Interfaces TypeScript
│   └── nomecomponente.types.ts
├── DssNomeComponente.module.scss  # Orquestrador SCSS
├── DssNomeComponente.test.js      # Testes unitários
├── DssNomeComponente.example.vue  # Showcase visual
├── README.md              # Documentação
└── index.js               # Export barrel
```

### Princípios Fundamentais (NÃO VIOLAR)

1. **Token First**: NUNCA use valores hardcoded (px, hex, etc.). Use SEMPRE `var(--dss-*)`.
2. **Cores via Classes Utilitárias**: NUNCA crie arquivos `_colors.scss`. Cores são aplicadas via computed properties no Vue usando classes `bg-{color}`, `text-{color}`.
3. **Acessibilidade WCAG 2.1 AA**: Touch targets ≥48px, focus rings 3px, ARIA labels.
4. **Brandabilidade**: Componentes reagem a `[data-brand="hub|water|waste"]`.
5. **BEM Naming**: `.dss-componente`, `.dss-componente__elemento`, `.dss-componente--modifier`.

### Anti-Patterns (EVITAR)

**Codigo:**
- ❌ Criar arquivos de cores por componente
- ❌ Usar valores hardcoded (16px, #1F86DE, etc.)
- ❌ Aplicar cores diretamente no SCSS
- ❌ Ignorar estados (hover, focus, active, disabled, loading)
- ❌ Esquecer suporte a dark mode e brands

**Documentacao:**
- ❌ Afirmar "100% compativel com a API do Quasar"
- ❌ Listar "Props 100% implementadas do QComponente"
- ❌ Detalhar cores hex por brand (usar referencia ao DSS_TOKEN_REFERENCE)
- ❌ Listar tokens sem nomes exatos (ex: "cores de feedback" ao inves de `--dss-feedback-positive`)

### Checklist de Implementação

> ⚠️ **IMPORTANTE**: Este checklist reflete os critérios de aprovação de PR definidos em `.github/pull_request_template.md`. O componente só será aprovado se todos os itens estiverem atendidos.

#### Tokens
- [ ] Todos os valores usam tokens DSS (`var(--dss-*)`)
- [ ] Tokens novos/alterados estão documentados
- [ ] Tokens de branding possuem fallback semântico
- [ ] Não há valores hardcoded

#### Componente
- [ ] Wrapper explícito de componente Quasar (quando aplicável)
- [ ] API pública clara e consistente
- [ ] Cores aplicadas via classes utilitárias no Vue (não no SCSS)
- [ ] Suporta as 3 brands (hub, water, waste)
- [ ] Suporta dark mode (`[data-theme="dark"]`)
- [ ] Estados documentados: hover, focus, active, disabled, loading
- [ ] Alinhado ao padrão do DssButton (golden sample)
- [ ] TypeScript 100% tipado (props, emits, slots)

#### Acessibilidade (WCAG 2.1 AA)
- [ ] Touch targets ≥48px (`@include dss-touch-target('ideal')`)
- [ ] Focus ring implementado (`@include dss-focus-ring('primary')`)
- [ ] Estados de foco visíveis
- [ ] Navegação por teclado validada
- [ ] ARIA aplicado quando necessário

#### Documentação
- [ ] README.md com exemplos de uso
- [ ] Tokens utilizados estão listados **com nomes exatos** (ex: `--dss-feedback-positive`)
- [ ] Estados centralizados
- [ ] Anti-patterns documentados
- [ ] **Linguagem DSS-First** - NUNCA afirmar "100% compativel com Quasar"
- [ ] **Brandabilidade referencia DSS_TOKEN_REFERENCE** - NAO lista cores por brand

#### Exports e Testes
- [ ] Testes unitários cobrindo props, eventos, slots, acessibilidade
- [ ] Export adicionado em `components/index.js` e `components/index.scss`

#### Governança
- [ ] Alinhado às Diretrizes do DSS (PRD Seção 6)
- [ ] Alinhado à Governança do DSS (PRD Seção 7)
- [ ] Não introduz exceções não documentadas

### Fluxo de Trabalho

1. **Pesquisar** - Consultar API do componente Quasar equivalente (se existir)
2. **Criar estrutura** - Seguir arquitetura de 4 camadas
3. **Implementar types** - Definir interfaces TypeScript
4. **Implementar composable** - Lógica de classes e comportamento
5. **Implementar Vue** - Componente com Composition API
6. **Implementar SCSS** - Base → Variants → Brands → States
7. **Testar** - Testes unitários + showcase visual
8. **Documentar** - README + exemplo de uso
9. **Exportar** - Registrar no barrel export

---

## Estrutura do Projeto

```
DSS/
├── components/          # Componentes Vue.js
│   └── base/           # DssButton, DssCard, DssInput, DssBadge, DssAvatar
├── tokens/             # Design tokens (cores, espaçamento, tipografia)
│   ├── brand/          # Tokens por marca (hub, water, waste)
│   └── semantic/       # Tokens semânticos (actions, feedback, surfaces)
├── themes/             # Integração Quasar e dark mode
├── utils/              # Mixins e funções SCSS
├── composables/        # Composables Vue globais
├── docs/               # Documentação organizada
│   ├── guides/         # Guias de implementação
│   ├── reference/      # Referências técnicas
│   ├── specs/          # Especificações de componentes
│   ├── audits/         # Auditorias de conformidade
│   └── archive/        # Histórico (fixes, sprints, reports)
└── examples/           # Arquivos HTML de teste/playground
```

---

## Tokens Principais

### Spacing
```scss
var(--dss-spacing-0)   /* 0px */
var(--dss-spacing-1)   /* 4px */
var(--dss-spacing-2)   /* 8px */
var(--dss-spacing-4)   /* 16px */
var(--dss-spacing-8)   /* 32px */
```

### Colors (Semânticas)
```scss
var(--dss-action-primary)
var(--dss-action-secondary)
var(--dss-feedback-positive)
var(--dss-feedback-negative)
var(--dss-surface-default)
```

### Acessibilidade
```scss
@include dss-touch-target('ideal');  /* 48x48px */
@include dss-focus-ring('primary');  /* Focus ring 3px */
@include dss-transition(all, 'fast'); /* Respeita reduced-motion */
```

---

## Dúvidas Frequentes

### O DSS substitui o Quasar?
**Não.** O DSS é uma camada sobre o Quasar. Componentes DSS usam internamente a estrutura do Quasar, aplicando tokens DSS para visual e brandabilidade.

### Posso usar valores hardcoded?
**Não.** Todos os valores devem usar tokens DSS. Isso garante brandabilidade, dark mode e consistência.

### Onde ficam as cores dos componentes?
**No Vue, não no SCSS.** Cores são aplicadas via computed properties usando classes utilitárias (`bg-primary`, `text-white`).

### Quais são os critérios de aprovação de PR?
Consulte **`.github/pull_request_template.md`** para ver todos os critérios. O checklist de implementação neste documento reflete esses critérios.
