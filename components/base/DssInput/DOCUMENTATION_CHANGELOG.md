# DssInput - Changelog de Documentação

> Histórico de alterações na documentação do componente DssInput

---

## [2.3.0] - Janeiro 2026

### 🆕 Adicionado

#### Documentação Principal (DssInput.md)
- **Template 13.1 completo** - Estrutura padronizada com 13 seções obrigatórias
- **Seção 1: Visão Geral** - Propósito, características, badge de versão
- **Seção 2: Quando Usar** - Decisões de uso com ✅ FAÇA e ❌ NÃO FAÇA
- **Seção 3: Anatomia** - Diagrama ASCII e descrição dos 8 subcomponentes
- **Seção 4: Tokens** - Tabela completa de design tokens (spacing, colors, typography)
- **Seção 5: API Pública** - Props, Eventos, Slots, Expose com tipagem TypeScript
- **Seção 6: Estados** - Matriz de 6 estados (default, focus, hover, error, disabled, readonly)
- **Seção 7: Variantes** - 4 variantes visuais (outlined, filled, standout, borderless)
- **Seção 8: Brandabilidade** - Sistema de marcas Sansys (Hub, Water, Waste)
- **Seção 9: Acessibilidade** - WCAG 2.1 AA compliance, ARIA, keyboard navigation
- **Seção 10: Exemplos** - 8 exemplos de código com casos de uso reais
- **Seção 11: Anti-patterns** - 6 padrões a evitar com correções
- **Seção 12: Governança** - Ownership, revisão, versionamento semântico
- **Seção 13: Troubleshooting** - 8 problemas comuns com soluções

#### Referência Técnica (DSSINPUT_API.md)
- **Documentação completa de Props** - 18 props documentadas com tipos, defaults e exemplos
- **Documentação de Eventos** - 4 eventos com assinaturas TypeScript
- **Documentação de Slots** - 7 slots disponíveis com exemplos de uso
- **Documentação de Expose** - 3 métodos/refs públicos
- **Compatibilidade Quasar** - Mapeamento completo q-input → DssInput
- **TypeScript Types** - Definições completas de interfaces
- **ARIA Attributes** - Atributos de acessibilidade gerados automaticamente

#### README.md
- Atualizado para v2.3.0
- Referências para nova documentação
- Links para DssInput.md e DSSINPUT_API.md

### ✏️ Modificado

- **README.md** - Reestruturado para servir como índice de navegação
- **Changelog separado** - Movido de README.md para DOCUMENTATION_CHANGELOG.md

### 📋 Padrão Seguido

- **Golden Sample**: DssButton como referência
- **Template**: 13.1 (13 seções obrigatórias)
- **Idioma**: Português (pt-BR)
- **Formato**: Markdown com tabelas e exemplos de código

---

## [2.2.0] - Dezembro 2025

### 🆕 Adicionado

- **README.md inicial** - Documentação básica do componente
- **Estrutura de arquivos** - Organização em 4 camadas

### 📋 Conteúdo Original

- Visão geral do componente
- Lista de props básicas
- Exemplos simples de uso
- Estrutura de arquivos

---

## [2.0.0] - Novembro 2025

### 🆕 Adicionado

- **Criação inicial** - Componente DssInput criado
- **Options API** - Versão inicial em JavaScript/Vue 2 style

---

## Convenções de Versionamento

### Versionamento Semântico (SemVer)

- **MAJOR (X.0.0)**: Mudanças breaking na API
- **MINOR (0.X.0)**: Novas funcionalidades backwards-compatible
- **PATCH (0.0.X)**: Bug fixes e melhorias de documentação

### Categorias de Mudança

- 🆕 **Adicionado**: Novas funcionalidades ou documentação
- ✏️ **Modificado**: Mudanças em funcionalidades existentes
- 🗑️ **Removido**: Funcionalidades removidas
- 🐛 **Corrigido**: Bug fixes
- 🔒 **Segurança**: Correções de vulnerabilidades
- 📋 **Documentação**: Mudanças apenas em documentação

---

## Responsáveis

| Versão | Autor | Revisor | Data |
|--------|-------|---------|------|
| 2.3.0 | Claude Code | - | Janeiro 2026 |
| 2.2.0 | Equipe DSS | - | Dezembro 2025 |
| 2.0.0 | Equipe DSS | - | Novembro 2025 |

---

## Links Relacionados

- [DssInput.md](./DssInput.md) - Documentação principal (Template 13.1)
- [DSSINPUT_API.md](./DSSINPUT_API.md) - Referência técnica completa
- [README.md](./README.md) - Índice de navegação
- [DssButton (Golden Sample)](../DssButton/DssButton.md) - Componente de referência
