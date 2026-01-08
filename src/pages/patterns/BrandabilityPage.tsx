import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const brands = [
  {
    name: "Sansys Water",
    key: "water",
    primary: "#0EA5E9",
    description: "Gestão de recursos hídricos e saneamento.",
    tokens: ["--brand-primary: #0EA5E9", "--brand-accent: #38BDF8"],
  },
  {
    name: "Sansys Waste",
    key: "waste",
    primary: "#10B981",
    description: "Gestão de resíduos sólidos e reciclagem.",
    tokens: ["--brand-primary: #10B981", "--brand-accent: #34D399"],
  },
  {
    name: "Sansys Hub",
    key: "hub",
    primary: "#8B5CF6",
    description: "Plataforma central de integração.",
    tokens: ["--brand-primary: #8B5CF6", "--brand-accent: #A78BFA"],
  },
];

export default function BrandabilityPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/padroes/brandabilidade" className="hover:text-foreground">Padrões</Link>
          <span>/</span>
          <span className="text-foreground">Brandabilidade</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Brandabilidade
        </h1>
        
        <p className="text-lg text-muted-foreground">
          O DSS suporta múltiplas marcas mantendo consistência estrutural 
          e permitindo variação visual por produto.
        </p>
      </section>

      {/* Brands */}
      <div className="grid gap-6">
        {brands.map((brand) => (
          <Card key={brand.key}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div 
                  className="h-12 w-12 rounded-lg"
                  style={{ backgroundColor: brand.primary }}
                />
                <div>
                  <CardTitle>{brand.name}</CardTitle>
                  <CardDescription>{brand.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {brand.tokens.map((token) => (
                  <code 
                    key={token}
                    className="px-2 py-1 rounded text-xs font-mono bg-secondary text-foreground"
                  >
                    {token}
                  </code>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`// Configure a marca no projeto
import { configureDSS } from '@jtech/dss'

configureDSS({
  brand: 'water' // 'water' | 'waste' | 'hub'
})`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
