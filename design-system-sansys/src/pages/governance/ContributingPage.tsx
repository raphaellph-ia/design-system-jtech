import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GitBranch, FileCode, CheckSquare, MessageSquare } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Abra uma Issue",
    description: "Descreva o componente ou melhoria que deseja implementar. Aguarde aprovação do time DSS.",
  },
  {
    number: 2,
    icon: GitBranch,
    title: "Crie uma Branch",
    description: "Use o padrão: feature/dss-component-name ou fix/dss-component-name.",
  },
  {
    number: 3,
    icon: FileCode,
    title: "Implemente",
    description: "Siga a arquitetura de 4 camadas e use o DssButton como referência (Golden Sample).",
  },
  {
    number: 4,
    icon: CheckSquare,
    title: "Submeta o PR",
    description: "Preencha o checklist de PR e aguarde revisão do time DSS.",
  },
];

export default function ContributingPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/governanca/contribuir" className="hover:text-foreground">Governança</Link>
          <span>/</span>
          <span className="text-foreground">Como Contribuir</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Como Contribuir
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Guia para contribuir com novos componentes e melhorias no DSS.
        </p>
      </section>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.number}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link to="/componentes/dss-button" className="text-primary hover:underline">
                → DssButton (Golden Sample)
              </Link>
            </li>
            <li>
              <Link to="/governanca/arquitetura" className="text-primary hover:underline">
                → Arquitetura de 4 Camadas
              </Link>
            </li>
            <li>
              <Link to="/governanca/checklist-pr" className="text-primary hover:underline">
                → Checklist de PR
              </Link>
            </li>
            <li>
              <Link to="/governanca/classificacao" className="text-primary hover:underline">
                → Sistema de Classificação A/B/C
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
