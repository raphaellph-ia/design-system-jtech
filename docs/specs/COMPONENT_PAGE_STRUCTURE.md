## 📚 Referências Normativas ⭐ OBRIGATÓRIO

Esta seção estabelece **as fontes normativas oficiais** que a IA DEVE consultar, correlacionar e respeitar ao editar, atualizar ou validar uma página de componente DSS. Nenhuma decisão estrutural, semântica ou técnica pode ser tomada fora do escopo destas referências.

### 1. Hierarquia de Autoridade

A IA DEVE respeitar rigorosamente a seguinte ordem de precedência:

1. **Selos de Conformidade DSS** (fonte máxima de verdade)
2. **Documentos Normativos DSS v2.2**
3. **COMPONENT_PAGE_STRUCTURE.md** (estrutura obrigatória)
4. **PLAYGROUND_STANDARD.md** (padrões de interatividade)
5. **Arquivo do componente (`Dss[Component]Page.tsx`)**
6. **Tokens Oficiais DSS**

Em caso de conflito, **a fonte de nível mais alto SEMPRE prevalece**.

---

### 2. Selos de Conformidade DSS

Antes de QUALQUER edição no template da página do componente, a IA DEVE:

1. Verificar se existe selo de conformidade para o componente.
2. Ler integralmente o conteúdo do selo.
3. Extrair regras, exceções, obrigações e decisões já aprovadas.
4. Aplicar essas decisões de forma vinculante na página.

#### 📁 Local Canônico dos Selos

Os selos de conformidade estão armazenados obrigatoriamente no caminho:

```
DSS/docs/compliance/seals/<NomeDoComponente>/<NOME_DO_COMPONENTE>_SELO_v2.2.md
```

Exemplo:

```
DSS/docs/compliance/seals/DssButton/DSSBUTTON_SELO_v2.2.md
```

#### Regras

* Se o selo EXISTIR → ele é **fonte normativa obrigatória**

* Se o selo NÃO existir → declarar explicitamente na página:

  > "Este componente ainda não possui Selo de Conformidade DSS v2.2."

* A IA **NÃO pode inferir** conformidade sem selo explícito

* A IA **NÃO pode criar, alterar ou suavizar regras** definidas no selo

---

### 3. Documentos Normativos DSS

A IA DEVE consultar e respeitar integralmente:

* `docs/reference/DSS_COMPONENT_ARCHITECTURE.md`
* `docs/reference/DSS_TOKEN_REFERENCE.md`
* `docs/governance/DSS_GOLDEN_COMPONENTS.md`
* `docs/guides/DSS_IMPLEMENTATION_GUIDE.md`

Esses documentos definem:

* Uso permitido de pseudo‑elementos
* Tabela canônica de `brightness()`
* Classificação de componentes
* Regras de estados interativos
* Governança de tokens

---

### 4. Estrutura da Página do Componente

A IA DEVE seguir **sem exceções** a estrutura definida em:

```
COMPONENT_PAGE_STRUCTURE.md
```

Regras:

* Seções ⭐ OBRIGATÓRIAS nunca podem ser omitidas
* Seções opcionais só podem ser removidas com justificativa explícita
* A ordem das seções é vinculante

---

## 🤖 Modo de Operação da IA ⭐ OBRIGATÓRIO

Esta seção define **como a IA deve pensar, decidir e agir** ao editar ou amadurecer uma página de componente DSS.

---

### 1. Princípio Fundamental

> **A IA NÃO cria um novo template.**
>
> A IA **refina, amadurece e corrige** o template existente até atingir conformidade total com o DSS.

---

### 2. Fluxo Operacional Obrigatório

A IA DEVE seguir o fluxo abaixo, sempre nesta ordem:

1. **Identificação do Componente**

   * Nome do componente
   * Classificação (Action / Compact / Visual)

2. **Leitura do Selo (se existir)**

   * Extrair decisões já aprovadas
   * Identificar exceções documentadas

3. **Auditoria da Página Atual**

   * Comparar com `COMPONENT_PAGE_STRUCTURE.md`
   * Identificar gaps, omissões ou inconsistências

4. **Correção Estrutural**

   * Criar seções faltantes
   * Reorganizar seções fora de ordem
   * Renomear seções conforme padrão oficial

5. **Refinamento de Conteúdo**

   * Tornar descrições mais orientadas a UX/produto
   * Eliminar redundâncias
   * Garantir linguagem normativa onde exigido

6. **Validação Final**

   * Checklist de conformidade DSS v2.2
   * Declarações explícitas (eventos ausentes, slots ausentes, etc.)

---

### 3. Regras de Decisão

A IA:

* ❌ NÃO deve inferir comportamentos não documentados
* ❌ NÃO deve suavizar regras normativas
* ❌ NÃO deve introduzir padrões novos sem referência DSS
* ✅ DEVE declarar explicitamente quando algo **não se aplica**
* ✅ DEVE preferir correção incremental ao invés de reescrita total

---

### 4. Linguagem e Tom

* Seções normativas → linguagem **assertiva e vinculante**
* Seções de UX → linguagem clara e orientada a produto
* Anti‑patterns → linguagem direta e preventiva

---

### 5. Resultado Esperado

Ao final da atuação da IA:

* A página do componente deve ser **auditável**
* Nenhuma decisão deve depender de inferência implícita
* Toda conformidade DSS deve estar **explicitamente declarada**

> Uma página DSS correta é aquela que pode ser validada sem contexto oral ou histórico externo.
