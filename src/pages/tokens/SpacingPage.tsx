import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const spacingScale = [
  { name: "spacing-0", value: "0px", rem: "0rem" },
  { name: "spacing-1", value: "4px", rem: "0.25rem" },
  { name: "spacing-2", value: "8px", rem: "0.5rem" },
  { name: "spacing-3", value: "12px", rem: "0.75rem" },
  { name: "spacing-4", value: "16px", rem: "1rem" },
  { name: "spacing-5", value: "20px", rem: "1.25rem" },
  { name: "spacing-6", value: "24px", rem: "1.5rem" },
  { name: "spacing-8", value: "32px", rem: "2rem" },
  { name: "spacing-10", value: "40px", rem: "2.5rem" },
  { name: "spacing-12", value: "48px", rem: "3rem" },
  { name: "spacing-16", value: "64px", rem: "4rem" },
];

export default function SpacingPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <span className="text-foreground">Espaçamento</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Espaçamento
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sistema de espaçamento consistente baseado em múltiplos de 4px.
        </p>
      </section>

      {/* Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Escala de Espaçamento</CardTitle>
          <CardDescription>
            Use tokens de espaçamento para margens, paddings e gaps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {spacingScale.map((item) => (
              <div 
                key={item.name}
                className="flex items-center gap-4 p-3 rounded-lg border border-border"
              >
                <div className="w-32 flex-shrink-0">
                  <code className="text-sm font-mono text-primary">{item.name}</code>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div 
                    className="h-6 bg-primary rounded"
                    style={{ width: item.value }}
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right font-mono">
                  <span>{item.value}</span>
                  <span className="mx-2 text-border">|</span>
                  <span>{item.rem}</span>
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
        <CardContent className="space-y-4">
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`.card {
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  gap: var(--spacing-2);
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
