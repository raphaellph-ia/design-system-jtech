import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const classifications = [
  {
    grade: "A",
    color: "bg-[hsl(var(--dss-success))]",
    textColor: "text-[hsl(var(--dss-success))]",
    icon: CheckCircle2,
    title: "Produção",
    description: "Componente estável, totalmente documentado e testado.",
    criteria: [
      "100% dos tokens mapeados",
      "Documentação completa (Template 13.1)",
      "Testes unitários e de integração",
      "Acessibilidade validada (WCAG 2.1 AA)",
      "Suporte a todas as marcas",
      "Dark mode funcional",
    ],
    examples: ["DssButton"],
  },
  {
    grade: "B",
    color: "bg-[hsl(var(--dss-warning))]",
    textColor: "text-[hsl(var(--dss-warning))]",
    icon: AlertCircle,
    title: "Beta",
    description: "Componente funcional, em processo de maturação.",
    criteria: [
      "Tokens principais mapeados",
      "Documentação básica",
      "Testes em progresso",
      "Pode sofrer alterações de API",
    ],
    examples: ["DssInput", "DssCard", "DssBadge", "DssAvatar"],
  },
  {
    grade: "C",
    color: "bg-[hsl(var(--dss-info))]",
    textColor: "text-[hsl(var(--dss-info))]",
    icon: Clock,
    title: "Experimental",
    description: "Componente em fase inicial de desenvolvimento.",
    criteria: [
      "Wrapper básico implementado",
      "API pode mudar significativamente",
      "Não recomendado para produção",
    ],
    examples: ["DssDataTable", "DssSearchField"],
  },
];

export default function ClassificationPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/governanca/classificacao" className="hover:text-foreground">Governança</Link>
          <span>/</span>
          <span className="text-foreground">Classificação</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Classificação A/B/C
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sistema de classificação que indica o nível de maturidade de cada componente.
        </p>
      </section>

      {/* Classifications */}
      <div className="space-y-6">
        {classifications.map((item) => (
          <Card key={item.grade}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xl">{item.grade}</span>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {item.title}
                    <item.icon className={`h-5 w-5 ${item.textColor}`} />
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {item.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 text-foreground">Critérios:</p>
                <ul className="space-y-1">
                  {item.criteria.map((criterion) => (
                    <li key={criterion} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={item.textColor}>•</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2 text-foreground">Componentes:</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((example) => (
                    <Badge key={example} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
