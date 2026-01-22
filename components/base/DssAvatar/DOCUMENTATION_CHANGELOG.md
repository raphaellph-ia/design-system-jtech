# DssAvatar - Changelog de Documentacao

Historico de alteracoes na documentacao do componente DssAvatar.

---

## [2.3.0] - Janeiro 2026

### Adicionado
- **DssAvatar.md**: Documentacao completa seguindo Template 13.1 (13 secoes)
- **DSSAVATAR_API.md**: Referencia tecnica atualizada com linguagem de governanca
- **README.md**: Documento de onboarding com quick start e exemplos
- **DOCUMENTATION_CHANGELOG.md**: Este arquivo de changelog

### Alterado
- **Linguagem de governanca**: Substituido "100% compativel" por "wrapper DSS baseado no QAvatar, com API publica governada pelo DSS"
- **Classificacao de recursos**: Adicionada tabela com Recomendado / Opcional / Fora de escopo DSS
- **Estrutura SCSS**: Criados arquivos em 3-variants/ (_brands.scss, _status.scss, index.scss)
- **Imports corrigidos**: 4-output/DssAvatar.scss agora importa 3-variants/index
- **TypeScript**: Adicionados tipos AvatarSize, AvatarBrand, AvatarStatus, AvatarEmits, AvatarExpose
- **Componente**: Adicionadas props brand, status, ariaLabel; evento click; expose rootRef

### Corrigido
- **3-variants vazia**: Pasta agora contem _brands.scss e _status.scss
- **Import quebrado**: @import '../3-variants/colors' corrigido para '../3-variants/index'
- **Status indicator**: Migrado de ::after pseudo-element para span element

---

## [2.2.0] - Dezembro 2025

### Adicionado
- Implementacao inicial do DssAvatar
- Suporte a tamanhos customizados
- Formas: circular, rounded, square
- Classes utilitarias para cores

---

## Estrutura de Documentos

| Documento | Tipo | Proposito |
|-----------|------|-----------|
| **DssAvatar.md** | Normativo | Governanca, anti-patterns, decisoes, regras |
| **DSSAVATAR_API.md** | Referencial | Props, eventos, tipos, exemplos de codigo |
| **README.md** | Onboarding | Quick start, estrutura de arquivos |
| **DOCUMENTATION_CHANGELOG.md** | Historico | Registro de alteracoes |

---

## Proximas Atualizacoes Planejadas

- [ ] Adicionar secao de testes unitarios
- [ ] Documentar integracao com DssBadge
- [ ] Adicionar exemplos de uso em formularios
- [ ] Criar visual showcase (DssAvatar.example.vue)
