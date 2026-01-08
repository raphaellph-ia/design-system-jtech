import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const shadows = [
  { 
    name: "shadow-sm", 
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    desc: "Elevação sutil" 
  },
  { 
    name: "shadow", 
    value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    desc: "Elevação padrão" 
  },
  { 
    name: "shadow-md", 
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    desc: "Elevação média" 
  },
  { 
    name: "shadow-lg", 
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    desc: "Elevação alta" 
  },
  { 
    name: "shadow-xl", 
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    desc: "Elevação muito alta" 
  },
];

export default function ShadowsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <span className="text-foreground">Sombras</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Sombras
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sistema de elevação para criar hierarquia visual.
        </p>
      </section>

      {/* Shadows */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis de Sombra</CardTitle>
          <CardDescription>
            Use sombras para indicar elevação e interatividade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="space-y-3">
                <div 
                  className="h-24 bg-card rounded-lg flex items-center justify-center"
                  style={{ boxShadow: shadow.value }}
                >
                  <span className="text-sm text-muted-foreground">{shadow.desc}</span>
                </div>
                <div>
                  <code className="text-sm font-mono text-primary">{shadow.name}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Como Usar</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`.card {
  box-shadow: var(--shadow-md);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
