Critérios de Avaliação e Qualidade — Fase 2 (DSS)

Versão: 2.4.0
Data: Março 2026
Status: Normativo

Este documento define os critérios de qualidade exigidos para a criação de Pré-prompts e para a Avaliação de Componentes da Fase 2 do Design System Sansys (DSS). Ele materializa o conhecimento tácito desenvolvido durante o planejamento da Fase 2, garantindo que novos chats de execução mantenham o mesmo rigor arquitetural.




0. Divisão de Responsabilidades entre Chats

O DSS opera com dois tipos de chat, com responsabilidades estritamente separadas. Essa separação protege o contexto de cada chat e garante a qualidade ao longo do tempo.

| Chat | Responsabilidade | Quando usar |
|---|---|---|
| **Chat Estratégico** (este documento) | Decisões arquiteturais amplas, revisão de governança, faseamento, tokens globais, breaking changes | Quando a decisão impacta múltiplos componentes ou o sistema como um todo |
| **Chat de Execução** (um por componente) | Codificação, auditoria, correções e selagem de **um único componente** — o pré-prompt já chega pronto do Chat Estratégico | Um chat por componente, do início ao fim |




O chat de execução não deve tomar decisões que impactem o sistema. Se durante a criação de um componente surgir uma questão arquitetural mais ampla (ex: necessidade de um novo token, mudança em uma convenção global), o trabalho deve ser pausado e a decisão escalada para o Chat Estratégico.




1. Critérios para um Pré-prompt de Qualidade

O pré-prompt é a ponte de conhecimento entre o planejamento e a execução. Um pré-prompt só é considerado completo e suficiente se cobrir obrigatoriamente os seguintes eixos:

1.1 Classificação e Contexto

•
Fase e Nível: Deve declarar explicitamente a qual nível da Fase 2 o componente pertence (ex: Nível 1 — Independente).

•
Golden Context: Deve definir qual componente já selado servirá como baseline de auditoria (ex: DssCard para componentes compostos de superfície).

•
Justificativa de Fase: Deve explicar por que o componente é Fase 2 (ex: gerencia estado visual compartilhado, orquestra múltiplos componentes Fase 1).

1.2 O Grande Risco Arquitetural

Todo componente tem um "calcanhar de Aquiles" na sua integração com o Quasar. O pré-prompt deve identificar e mitigar esse risco antes da codificação.

•
Exemplo no DssBtnGroup: A regra de prop sync obrigatório (props de estilo devem ser declaradas no grupo e nos filhos).

•
Deve incluir exemplos claros de Anti-patterns (❌) e Padrões Corretos (✅) para a documentação.

1.3 Mapeamento de API (DSS vs Quasar)

•
Lista exata de quais props do Quasar serão expostas, bloqueadas ou modificadas.

•
Justificativa para props bloqueadas (ex: dark é bloqueado porque o DSS usa CSS global).

1.4 Governança de Tokens

•
Mapeamento exato de quais tokens --dss-* devem ser usados para bordas, espaçamentos, cores e tipografia.

•
Definição de como o componente lida com gaps e divisores internos.

1.5 Acessibilidade e Estados

•
Definição de role ARIA e atributos obrigatórios.

•
Decisão sobre Touch Target (Opção A: implementado via ::before ou Opção B: delegado ao contexto/filhos).

•
Mapeamento de quais estados (hover, focus, active, disabled) pertencem ao container e quais pertencem aos filhos.




2. Critérios de Aprovação de Componentes (Fase 2)

Além do Checklist Mestre da Fase 1 (Gate Estrutural, Técnico e Documental), os componentes da Fase 2 exigem validações adicionais devido à sua natureza composta.

2.1 Gate de Composição v2.4

•
Regra 1 — Uso Exclusivo de DSS: O componente composto não pode usar componentes Quasar diretamente em seu template. Ele deve orquestrar instâncias de componentes DSS da Fase 1.

•
Regra 2 — Zero Quebra de Encapsulamento: O componente pai não pode usar seletores CSS (:deep(), ::v-deep, ou descendência direta) para alterar a aparência de um subcomponente DSS filho. Toda alteração visual no filho deve ser feita via props do próprio filho.

•
Exceções documentadas: Ver regime de exceções formais abaixo.



•
Regra 3 — Importação Correta: Componentes DSS internos devem ser importados via seus wrappers na raiz, nunca via 1-structure.

2.2 Gate de Responsabilidade v2.4

Aplicação: Obrigatório para todos os componentes Fase 2.

•
Regra 1 — Delegação de Estados Interativos: Componentes container não podem capturar estados interativos (:hover, :focus, :active) que semanticamente pertencem aos filhos.

•
Exceção documentada: Uso de z-index/position em :hover/:focus-visible para gerenciamento de empilhamento de grupo (não altera aparência visual do botão) — ver dss.meta.json > gateExceptions > responsibilityGateV24 do DssBtnGroup como precedente.



•
Regra 2 — Sem Lógica de Negócio: O componente deve resolver exclusivamente um padrão de UI/UX. Não deve haver lógica condicional no <script> que dependa de regras de negócio específicas de um produto (Hub, Water, Waste) em vez de props genéricas.

•
Regra 3 — Limites Documentados: A documentação (.md) deve declarar explicitamente:

•
O que o componente faz

•
O que ele delega aos filhos

•
Ausência dessa declaração é Gap documentável.






3. Regime de Exceções Formais

Quando uma das regras dos Gates v2.4 precisa ser violada por necessidade técnica legítima, a exceção deve ser:

1.
Registrada em dss.meta.json

2.
Documentada em DssNomeComponente.md (seção Exceções)
A seção de exceções deve incluir uma subseção "Exceções aos Gates v2.4" com:

•
Nome do gate violado

•
Arquivo onde ocorre

•
Justificativa técnica

•
Decisão arquitetural (quem aprovou e quando)



3.
Aprovada explicitamente
A exceção deve ter registro de aprovação. Para fins deste framework, o registro no dss.meta.json + documentação no .md constituem a aprovação formal.




4. Critérios de Status Final

Status
Condição
✅ Elegível para Selo
Zero NCs bloqueantes; Gates v2.4 conformes ou com exceções formais registradas; 5 eixos do pré-prompt cobertos
🟡 Condicional
NCs não-bloqueantes pendentes; Gates v2.4 com tensão não registrada; pré-prompt cobrindo < 5 eixos
🔴 Não Elegível
Qualquer NC bloqueante sem exceção formal; Gate v2.4 violado sem documentação







5. Lições Aprendidas da Fase 1 Aplicadas à Fase 2

O rigor da Fase 1 gerou aprendizados que são vinculantes para a Fase 2:

1.
Entry Point Wrapper é inegociável: O arquivo DssNomeComponente.vue na raiz deve ser um re-export puro. Nenhuma lógica ou template pode residir nele.

2.
Pseudo-elementos têm dono: ::before é exclusivo para touch target. ::after é para efeitos visuais. Componentes compostos raramente precisam de touch target próprio, delegando isso aos filhos.

3.
Exceções exigem registro: Qualquer desvio do sistema de tokens (ex: border-radius: 0 para variantes square) deve ser formalmente registrado no dss.meta.json com uma ID (ex: EXC-01) e justificativa.

4.
Documentação não é "nice to have": O escopo funcional mínimo inclui a documentação completa. Um componente com código perfeito e documentação rasa será reprovado na auditoria.




6. Referências

•
CLAUDE.md — Regras normativas para agentes de IA

•
DSS_GOLDEN_COMPONENTS.md — Modelo Golden (Reference, Context, Sample)

•
DSS_COMPONENT_ARCHITECTURE.md — Arquitetura de 4 camadas e anti-patterns

•
DssBtnGroup/dss.meta.json — Precedente de exceções Gates v2.4 (Março 2026)




Design System Sansys — Governança DSS v2.4

