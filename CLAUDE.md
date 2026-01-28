# CLAUDE.md — Design System Sansys (DSS)

Guia oficial para agentes de IA (Claude Code e similares) ao trabalhar no **Design System Sansys (DSS)**.

Este documento é **normativo**. O não cumprimento de qualquer regra aqui descrita invalida o componente criado.

---

## 📌 Contexto do Projeto

O **Design System Sansys (DSS)** é uma camada corporativa de design e engenharia construída **sobre o Quasar Framework**, e **não** uma biblioteca standalone.

O DSS fornece:
- Tokens semânticos
- Brandabilidade
- Governança visual e técnica
- Acessibilidade WCAG 2.1 AA
- Padronização de componentes Vue

### Produtos suportados
- **Sansys Hub** (laranja)
- **Sansys Water** (azul)
- **Sansys Waste** (verde)

---

## 📜 Natureza Normativa deste Documento (OBRIGATÓRIO)

Este arquivo (**CLAUDE.md**) é um **documento normativo vinculante** para qualquer agente de IA que produza, modifique ou revise código, documentação ou arquitetura do Design System Sansys (DSS).

⚠️ **IMPORTANTE**
- As regras aqui descritas NÃO são sugestões.
- O agente NÃO deve inferir, resumir ou reinterpretar requisitos.
- O não cumprimento de qualquer regra aqui descrita é considerado **erro de implementação**.

---

## 🚨 Leitura Obrigatória (ANTES de criar qualquer componente)

A criação de qualquer componente DSS **exige leitura prévia** dos seguintes arquivos, **nesta ordem**:

1. `docs/PRD_DSS.md`
2. `docs/reference/DSS_ARCHITECTURE.md`
3. `docs/reference/DSS_COMPONENT_ARCHITECTURE.md`
4. `docs/guides/DSS_IMPLEMENTATION_GUIDE.md`
5. `docs/guides/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md`
6. `docs/guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md`
7. `.github/pull_request_template.md`

⚠️ **IMPORTANTE**  
Nunca inferir padrões apenas observando um componente existente.  
O **DssButton é referência**, não fonte única de verdade.

---

## 🧱 Princípios Fundamentais do DSS (NÃO VIOLAR)

1. **Token First**
   - ❌ Nenhum valor hardcoded (px, rem, hex, rgb)
   - ✅ Sempre `var(--dss-*)`

2. **Cores seguem o padrão Quasar**
   - ❌ Não criar `_colors.scss` por componente
   - ❌ Não aplicar cores no SCSS
   - ✅ Classes utilitárias globais (`bg-*`, `text-*`)
   - ✅ Aplicação via computed properties no Vue

3. **Arquitetura em 4 Camadas (Obrigatória)**
   - Nenhuma camada pode ser omitida
   - Camadas com pouco conteúdo continuam existindo

4. **Acessibilidade não é opcional**
   - WCAG 2.1 AA
   - Focus visível
   - Touch target ≥ 48px
   - Navegação por teclado

5. **Brandabilidade**
   - Componentes reagem a `[data-brand="hub|water|waste"]`
   - Tokens de brand com fallback semântico

6. **Tokens Genéricos para Altura (VINCULANTE)**
   - ❌ NUNCA criar tokens específicos (`--dss-chip-height-*`, `--dss-badge-size-*`)
   - ✅ SEMPRE usar `--dss-compact-control-height-{xs,sm,md,lg}` para controles compactos
   - ⚠️ Altura visual ≠ Touch target (documentar separadamente)
   - 📖 Consulte [DSS_TOKEN_REFERENCE.md - Seção 7.13](#713-compact-controls---alturas-visuais)

7. **Convenção de Pseudo-elementos (VINCULANTE)**
   - `::before` → **RESERVADO** exclusivamente para touch target (WCAG 2.5.5)
   - `::after` → Efeitos visuais (hover, active, selected overlays)
   - ⚠️ NUNCA usar `::before` para efeitos visuais em variantes
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Convenção de Pseudo-elementos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#convenção-de-pseudo-elementos-normativa)

8. **Reutilização de Valores Não-Tokenizados (VINCULANTE)**
   - Valores de `brightness()` DEVEM reutilizar valores da tabela canônica
   - Valores permitidos: 0.85, 0.90, 0.92, 0.95 (light), 1.10, 1.20 (dark)
   - ❌ NUNCA criar valores arbitrários (ex.: 0.93, 0.88)
   - ⚠️ Novos valores exigem justificativa explícita e aprovação
   - 📖 Consulte [DSS_COMPONENT_ARCHITECTURE.md - Valores Visuais Permitidos](docs/reference/DSS_COMPONENT_ARCHITECTURE.md#valores-visuais-permitidos-como-exceção-não-tokenizados)

---

## 🎯 Escopo Funcional Mínimo (DEFINIÇÃO OFICIAL)

### ⚠️ Regra crítica
> **Escopo funcional mínimo NÃO significa documentação mínima.**

### Definição correta

**Escopo funcional mínimo** é o menor conjunto de funcionalidades necessárias para que o componente cumpra **seu papel semântico, visual, comportamental e acessível**, com **todas essas responsabilidades explicitamente documentadas**.

### Escopo mínimo DEFINE:
- O que o componente faz
- O que ele NÃO faz
- Quais responsabilidades ele assume

### Escopo mínimo NÃO autoriza:
- ❌ Documentação superficial
- ❌ Omissão de estados
- ❌ Redução de exemplos
- ❌ Falta de contratos (props, slots, eventos)
- ❌ “Depois documenta”

📌 **Documentação nunca é considerada funcionalidade excedente.**

---

## 🏛️ Hierarquia de Autoridade do DSS (LEITURA OBRIGATÓRIA)

Os arquivos abaixo constituem o **corpo normativo do Design System Sansys**.
Todo trabalho DEVE estar em conformidade com eles.

### 🔒 Nível 1 — Normativos Vinculantes (Hard Rules)

Estes arquivos têm precedência máxima.  
Em caso de conflito, **NUNCA devem ser ignorados ou reinterpretados**.

1. **CLAUDE.md**  
   → Regras operacionais e comportamentais para agentes de IA

2. **PRD_DSS.md**  
   → Papel estratégico, governança, critérios de qualidade

3. **DSS_ARCHITECTURE.md**  
   → Estrutura do sistema, tokens, integração com Quasar

4. **DSS_COMPONENT_ARCHITECTURE.md**  
   → Arquitetura de 4 camadas, padrões obrigatórios, anti-patterns

---

### 🔐 Nível 2 — Guias Técnicos Normativos (Obrigatórios)

Estes arquivos são **obrigatórios por especialidade**  
e NÃO podem ser tratados como material opcional.

5. **DSS_TOKEN_REFERENCE.md**  
   → Catálogo oficial de tokens  
   ⚠️ Tokens DEVEM ser citados com nome exato

6. **DSS_IMPLEMENTATION_GUIDE.md**  
   → Como aplicar tokens, classes, estados e acessibilidade

7. **DSS_ARCHITECTURE_GUIDE.md**  
   → Decisões arquiteturais detalhadas e racional técnico

---

### 📌 Regra de Ouro

Se um comportamento, token, estado ou padrão:
- Não estiver documentado **explicitamente**
- Mas estiver implícito em um guia normativo

👉 **O agente DEVE documentá-lo**, não omiti-lo.


## 🏗️ Arquitetura Obrigatória (4 Camadas)

components/base/DssNomeComponente/
├── 1-structure/
│ └── DssNomeComponente.ts.vue
├── 2-composition/
│ └── _base.scss
├── 3-variants/
│ ├── _variant.scss
│ └── index.scss
├── 4-output/
│ ├── _states.scss
│ ├── _brands.scss
│ └── index.scss
├── composables/
├── types/
├── DssNomeComponente.md
├── DssNomeComponente.module.scss
├── DssNomeComponente.example.vue
├── DssNomeComponente.vue
├── DSSNOMECOMPONENTE_API.md
├── README.md
└── index.js


Nenhum diretório pode ser omitido.

---

## 📚 Piso Mínimo OBRIGATÓRIO de Documentação (README.md)

Todo componente DSS, independente do escopo, **DEVE conter**:

1. Descrição clara do componente
   - O que representa
   - Quando usar
   - Quando NÃO usar

2. API completa
   - Props (com tipos e valores)
   - Slots (mesmo que seja apenas `default`)
   - Events (mesmo que seja “nenhum”)

3. Estados documentados
   - hover
   - focus
   - active
   - disabled
   - loading (ou justificar ausência)

4. Tokens utilizados
   - Lista explícita
   - Nomes exatos (`--dss-*`)

5. Exemplos
   - Mínimo: 3
   - Ideal: 5–7
   - Com brand e contexto real

📌 Se algo **não existir**, isso deve estar **explicitamente declarado**.

---

## 🚫 Anti-Patterns Críticos

### Código
- ❌ Inferir API completa do Quasar
- ❌ Criar tokens específicos de componente
- ❌ Aplicar cores no SCSS
- ❌ Ignorar estados
- ❌ Pular camadas
- ❌ Usar `::before` para efeitos visuais (reservado para touch target)
- ❌ Usar valores de brightness arbitrários (ex.: 0.93, 0.88) — reutilizar tabela canônica

### Documentação
- ❌ “100% compatível com a API do Quasar”
- ❌ “Replica todas as props do QComponent”
- ❌ Listar cores hex por brand
- ❌ Linguagem vaga (“cores de feedback”)

---

## ✅ Checklist de Validação Final

O componente só é considerado válido se:

- [ ] Arquitetura em 4 camadas completa
- [ ] Nenhum valor hardcoded
- [ ] Cores via classes utilitárias
- [ ] Estados implementados e documentados
- [ ] Tokens listados corretamente
- [ ] README completo
- [ ] Exemplo funcional
- [ ] Acessibilidade validada

---

## 📌 Regra Final

> Se houver dúvida entre **simplificar demais** ou **explicitar melhor**,  
> **SEMPRE escolha explicitar melhor**.

Documentação clara hoje evita refatoração massiva amanhã.
