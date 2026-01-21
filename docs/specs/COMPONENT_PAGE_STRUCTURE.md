# Estrutura Padrão para Páginas de Componentes DSS

**Versão 1.0 - Janeiro 2025**

Este documento define a hierarquia oficial de informações para todas as páginas de documentação de componentes no Design System Sansys.

---

## 📋 Hierarquia de Seções

Todas as páginas de componentes DEVEM seguir esta estrutura na ordem especificada:

### 1. Badges de Metadados
- Versão do componente (ex: `v2.1.0`)
- Compatibilidade (ex: `Quasar Compatible`)
- Status (ex: `Golden Sample`, `Beta`, `Deprecated`)
- Referências relevantes

### 2. Título do Componente
- Usar componente `PageHeader`
- Ícone representativo do componente
- Nome do componente com destaque (ex: "Componente **DssButton**")

### 3. Descrição Básica
- Descrição concisa do propósito do componente
- Destaques em palavras-chave importantes (tokens DSS, brandability, WCAG)
- Máximo 2-3 linhas

### 4. Quick Stats (Opcional)
- Grid de 4 cards com estatísticas rápidas
- Variantes, Cores, Brands, Tamanhos, etc.
- Cores visuais para cada stat

### 5. Playground Interativo
- Card único contendo:
  - Preview visual do componente
  - Controles interativos (variante, cor, tamanho, estados)
  - Código de exemplo atualizado em tempo real
- Usar seção `SectionHeader` com título "Playground **Interativo**"

### 6. Galeria de Variantes
- Tabs organizados por categoria (Variantes, Cores, Brands, Tamanhos, Estados)
- Demonstração visual de cada opção
- Usar componente `DssTabs`

### 7. Anatomia 4 Camadas ⭐ OBRIGATÓRIO
- Usar componente `AnatomySection`
- Cards clicáveis para cada camada:
  1. **Structure** - Template, Props, Lógica
  2. **Composition** - Layout, Tipografia, Reset
  3. **Variants** - Variações visuais (sem cores)
  4. **Output** - Cores, Brands, Estados
- Ao clicar, expandir painel com:
  - Descrição completa
  - Arquivos relacionados
  - Responsabilidades
  - Tokens utilizados
  - Exemplo de código

### 8. Documentação Técnica (Colapsável)
- Usar componente `CollapsibleSection`
- Seções:
  - **Props API & Eventos** - Tabela com todas as props
  - **Tokens DSS Utilizados** - Tabs por categoria de tokens
  - **Acessibilidade WCAG** - Conformidade e implementação

---

## 🧩 Componentes Reutilizáveis

### PageHeader
```tsx
<PageHeader
  icon={Box}
  badge="Golden Sample"
  badgeVariant="accent"
  title="Componente"
  titleAccent="DssButton"
  subtitle="Descrição do componente..."
  subtitleHighlights={["tokens DSS", "brandability"]}
  extraBadges={[
    { label: "v2.1.0", variant: "info" },
    { label: "Quasar Compatible", variant: "success" },
  ]}
/>
```

### SectionHeader
```tsx
<SectionHeader
  title="Playground"
  titleAccent="Interativo"
  badge="Configurador"
/>
```

### AnatomySection
```tsx
<AnatomySection 
  componentName="DssButton" 
  layers={{
    structure: { files: [...], description: "...", responsibilities: [...], tokens: [...], codeExample: "..." },
    composition: { ... },
    variants: { ... },
    output: { ... }
  }} 
/>
```

### CollapsibleSection
```tsx
<CollapsibleSection
  icon={FileText}
  title="Props API"
  titleAccent="& Eventos"
>
  {/* Conteúdo colapsável */}
</CollapsibleSection>
```

---

## 📁 Estrutura de Dados para Anatomia

```typescript
interface LayerContent {
  files: string[];           // Arquivos da camada
  description: string;       // Descrição conceitual
  responsibilities: string[]; // Lista de responsabilidades
  tokens?: string[];         // Tokens utilizados
  codeExample?: string;      // Exemplo de código
}

interface AnatomyData {
  structure: LayerContent;
  composition: LayerContent;
  variants: LayerContent;
  output: LayerContent;
}
```

---

## ✅ Checklist de Validação

Antes de publicar uma página de componente, verifique:

- [ ] Badges de metadados presentes
- [ ] PageHeader com ícone e descrição
- [ ] Quick Stats com métricas relevantes
- [ ] Playground funcional com todos os controles
- [ ] Galeria de variantes em tabs
- [ ] Anatomia 4 Camadas com dados completos
- [ ] Props API documentada em tabela
- [ ] Tokens organizados por categoria
- [ ] Seção de acessibilidade preenchida

---

## 📚 Referências

- **Componente modelo**: `src/pages/components/DssButtonPage.tsx`
- **AnatomySection**: `src/components/ui/AnatomySection.tsx`
- **CollapsibleSection**: `src/components/ui/CollapsibleSection.tsx`
- **PageHeader**: `src/components/ui/PageHeader.tsx`
- **SectionHeader**: `src/components/ui/SectionHeader.tsx`

---

**Mantido por:** Equipe Design System Sansys
**Atualizado em:** Janeiro 2025
**Versão:** 1.0.0
