import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Por que usar o DSS ao invés do Quasar diretamente?",
    answer: "O DSS encapsula os componentes do Quasar aplicando os tokens de design da Jtech, garantindo consistência visual entre todos os produtos Sansys. Além disso, oferece suporte a múltiplas marcas e facilita atualizações futuras.",
  },
  {
    question: "Como funciona a brandabilidade?",
    answer: "Os tokens de cor são organizados em camadas. Os tokens semânticos (como --color-primary) são mapeados para valores diferentes dependendo da marca configurada (Water, Waste ou Hub).",
  },
  {
    question: "Posso usar componentes Quasar diretamente?",
    answer: "Não é recomendado. Sempre prefira os wrappers do DSS (DssButton ao invés de QBtn) para garantir consistência. Se um wrapper não existir, abra uma issue solicitando.",
  },
  {
    question: "Como reportar um bug?",
    answer: "Abra uma issue no repositório do DSS com descrição detalhada, passos para reproduzir, comportamento esperado vs atual, e screenshots se aplicável.",
  },
  {
    question: "Qual a frequência de atualizações?",
    answer: "O DSS segue versionamento semântico. Patches são lançados conforme necessário. Minor versions mensalmente. Major versions são planejadas com antecedência.",
  },
  {
    question: "Como contribuir com novos componentes?",
    answer: "Consulte o guia 'Como Contribuir' na seção Governança. Em resumo: abra uma issue, aguarde aprovação, implemente seguindo a arquitetura de 4 camadas, e submeta um PR com o checklist preenchido.",
  },
];

export default function FAQPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/recursos/faq" className="hover:text-foreground">Recursos</Link>
          <span>/</span>
          <span className="text-foreground">FAQ</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Perguntas Frequentes
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Respostas para as dúvidas mais comuns sobre o DSS.
        </p>
      </section>

      {/* FAQ */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
