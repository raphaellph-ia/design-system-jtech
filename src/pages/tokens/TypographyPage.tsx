import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const fontSizes = [
  { name: "text-xs", size: "12px", lineHeight: "16px", sample: "Texto extra pequeno" },
  { name: "text-sm", size: "14px", lineHeight: "20px", sample: "Texto pequeno" },
  { name: "text-base", size: "16px", lineHeight: "24px", sample: "Texto base" },
  { name: "text-lg", size: "18px", lineHeight: "28px", sample: "Texto grande" },
  { name: "text-xl", size: "20px", lineHeight: "28px", sample: "Texto extra grande" },
  { name: "text-2xl", size: "24px", lineHeight: "32px", sample: "Título pequeno" },
  { name: "text-3xl", size: "30px", lineHeight: "36px", sample: "Título médio" },
  { name: "text-4xl", size: "36px", lineHeight: "40px", sample: "Título grande" },
];

const fontWeights = [
  { name: "font-normal", weight: "400", sample: "Texto normal" },
  { name: "font-medium", weight: "500", sample: "Texto médio" },
  { name: "font-semibold", weight: "600", sample: "Texto semi-negrito" },
  { name: "font-bold", weight: "700", sample: "Texto negrito" },
];

export default function TypographyPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/tokens/tipografia" className="hover:text-foreground">Fundações</Link>
          <span>/</span>
          <span className="text-foreground">Tipografia</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Tipografia
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Sistema tipográfico do DSS para hierarquia e legibilidade consistentes.
        </p>
      </section>

      {/* Font Family */}
      <Card>
        <CardHeader>
          <CardTitle>Família Tipográfica</CardTitle>
          <CardDescription>
            O DSS utiliza a família Inter como fonte principal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 rounded-lg bg-secondary">
            <p className="text-4xl font-bold text-foreground mb-2">Inter</p>
            <p className="text-muted-foreground">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789
            </p>
          </div>
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`--font-family-base: 'Inter', system-ui, sans-serif;
--font-family-mono: 'JetBrains Mono', monospace;`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Font Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Tamanhos</CardTitle>
          <CardDescription>
            Escala de tamanhos para diferentes contextos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fontSizes.map((item) => (
              <div 
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-lg border border-border"
              >
                <div className="w-24 flex-shrink-0">
                  <code className="text-sm font-mono text-primary">{item.name}</code>
                </div>
                <div className="flex-1">
                  <p 
                    className="text-foreground"
                    style={{ fontSize: item.size, lineHeight: item.lineHeight }}
                  >
                    {item.sample}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <p>{item.size}</p>
                  <p className="text-xs">LH: {item.lineHeight}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Weights */}
      <Card>
        <CardHeader>
          <CardTitle>Pesos</CardTitle>
          <CardDescription>
            Variações de peso para ênfase e hierarquia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fontWeights.map((item) => (
              <div 
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-lg border border-border"
              >
                <div className="w-32 flex-shrink-0">
                  <code className="text-sm font-mono text-primary">{item.name}</code>
                </div>
                <div className="flex-1">
                  <p 
                    className="text-xl text-foreground"
                    style={{ fontWeight: item.weight }}
                  >
                    {item.sample}
                  </p>
                </div>
                <code className="text-sm text-muted-foreground font-mono">
                  {item.weight}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
