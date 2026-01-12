import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const principles = [
  {
    title: "Perceptível",
    items: [
      "Contraste mínimo 4.5:1 para texto normal",
      "Contraste mínimo 3:1 para texto grande",
      "Alternativas textuais para imagens",
      "Não depender apenas de cor para transmitir informação",
    ],
  },
  {
    title: "Operável",
    items: [
      "Todos os componentes navegáveis por teclado",
      "Focus visível em todos os elementos interativos",
      "Skip links disponíveis",
      "Sem armadilhas de teclado",
    ],
  },
  {
    title: "Compreensível",
    items: [
      "Labels claros em formulários",
      "Mensagens de erro descritivas",
      "Comportamento previsível",
      "Instruções claras para entrada de dados",
    ],
  },
  {
    title: "Robusto",
    items: [
      "HTML semântico",
      "ARIA roles corretos",
      "Compatibilidade com leitores de tela",
      "Funcional sem JavaScript quando possível",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/padroes/acessibilidade" className="hover:text-foreground">Padrões</Link>
          <span>/</span>
          <span className="text-foreground">Acessibilidade</span>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">
            Acessibilidade
          </h1>
          <Badge className="bg-[hsl(var(--dss-success))]">WCAG 2.1 AA</Badge>
        </div>
        
        <p className="text-lg text-muted-foreground">
          O DSS segue as diretrizes WCAG 2.1 nível AA para garantir que 
          todos os componentes sejam acessíveis.
        </p>
      </section>

      {/* Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle) => (
          <Card key={principle.title}>
            <CardHeader>
              <CardTitle className="text-lg">{principle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {principle.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--dss-success))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Ferramentas de Teste</CardTitle>
          <CardDescription>
            Ferramentas recomendadas para validar acessibilidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">axe DevTools</Badge>
            <Badge variant="outline">Lighthouse</Badge>
            <Badge variant="outline">NVDA</Badge>
            <Badge variant="outline">VoiceOver</Badge>
            <Badge variant="outline">WAVE</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
