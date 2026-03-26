# Critérios de Avaliação e Qualidade — Fase 2 (DSS)

**Versão:** 1.0.0
**Data:** Março 2026
**Status:** Normativo

Este documento define os critérios de qualidade exigidos para a criação de **Pré-prompts** e para a **Avaliação de Componentes** da Fase 2 do Design System Sansys (DSS). Ele materializa o conhecimento tácito desenvolvido durante o planejamento da Fase 2, garantindo que novos chats de execução mantenham o mesmo rigor arquitetural.

---

## 1. Critérios para um Pré-prompt de Qualidade

O pré-prompt é a ponte de conhecimento entre o planejamento e a execução. Um pré-prompt só é considerado **completo e suficiente** se cobrir obrigatoriamente os seguintes eixos:

### 1.1 Classificação e Contexto
- **Fase e Nível:** Deve declarar explicitamente a qual nível da Fase 2 o componente pertence (ex: Nível 1 — Independente).
- **Golden Context:** Deve definir qual componente já selado servirá como baseline de auditoria (ex: `DssCard` para componentes compostos de superfície).
- **Justificativa de Fase:** Deve explicar *por que* o componente é Fase 2 (ex: gerencia estado visual compartilhado, orquestra múltiplos componentes Fase 1).

### 1.2 O Grande Risco Arquitetural
Todo componente tem um "calcanhar de Aquiles" na sua integração com o Quasar. O pré-prompt **deve** identificar e mitigar esse risco antes da codificação.
- Exemplo no `DssBtnGroup`: A regra de prop sync obrigatório (props de estilo devem ser declaradas no grupo e nos filhos).
- Deve incluir exemplos claros de **Anti-patterns** (❌) e **Padrões Corretos** (✅) para a documentação.

### 1.3 Mapeamento de API (DSS vs Quasar)
- Lista exata de quais props do Quasar serão expostas, bloqueadas ou modificadas.
- Justificativa para props bloqueadas (ex: `dark` é bloqueado porque o DSS usa CSS global).

### 1.4 Governança de Tokens
- Mapeamento exato de quais tokens `--dss-*` devem ser usados para bordas, espaçamentos, cores e tipografia.
- Definição de como o componente lida com gaps e divisores internos.

### 1.5 Acessibilidade e Estados
- Definição de `role` ARIA e atributos obrigatórios.
- Decisão sobre Touch Target (Opção A: implementado via `::before` ou Opção B: delegado ao contexto/filhos).
- Mapeamento de quais estados (hover, focus, active, disabled) pertencem ao container e quais pertencem aos filhos.

---

## 2. Critérios de Aprovação de Componentes (Fase 2)

Além do Checklist Mestre da Fase 1 (Gate Estrutural, Técnico e Documental), os componentes da Fase 2 exigem validações adicionais devido à sua natureza composta.

### 2.1 Validação de Composição Interna
- **Uso Exclusivo de DSS:** O componente composto **não pode** usar componentes Quasar diretamente em seu template. Ele deve orquestrar instâncias de componentes DSS da Fase 1.
- **Isolamento de Estilos:** O componente composto **não pode** redefinir estilos internos dos componentes filhos via CSS (ex: forçar um `border-radius` no filho via seletor descendente). O estilo deve ser passado via props da API do filho.

### 2.2 Validação de Responsabilidade
- **Sem Lógica de Negócio:** O componente deve resolver um padrão de UI/UX, nunca uma regra de negócio específica de um produto (Hub, Water, Waste).
- **Delegação de Estados:** Em containers (como `DssBtnGroup`), estados interativos (hover, focus) devem ser delegados aos componentes filhos. O container não deve capturar foco a menos que seja semanticamente necessário.

### 2.3 Validação de Documentação de Composição
A documentação (`.md`) deve incluir obrigatoriamente:
- Quais componentes DSS são utilizados internamente.
- Limites de responsabilidade (o que o componente faz e o que ele delega).
- Anti-patterns específicos de composição (ex: aninhar componentes de forma redundante).

---

## 3. Lições Aprendidas da Fase 1 Aplicadas à Fase 2

O rigor da Fase 1 gerou aprendizados que são **vinculantes** para a Fase 2:

1. **Entry Point Wrapper é inegociável:** O arquivo `DssNomeComponente.vue` na raiz deve ser um re-export puro. Nenhuma lógica ou template pode residir nele.
2. **Pseudo-elementos têm dono:** `::before` é exclusivo para touch target. `::after` é para efeitos visuais. Componentes compostos raramente precisam de touch target próprio, delegando isso aos filhos.
3. **Exceções exigem registro:** Qualquer desvio do sistema de tokens (ex: `border-radius: 0` para variantes square) deve ser formalmente registrado no `dss.meta.json` com uma ID (ex: EXC-01) e justificativa.
4. **Documentação não é "nice to have":** O escopo funcional mínimo inclui a documentação completa. Um componente com código perfeito e documentação rasa será reprovado na auditoria.

---

**Design System Sansys — Governança DSS v2.2**
