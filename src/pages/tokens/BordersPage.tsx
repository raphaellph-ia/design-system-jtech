import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const borderRadius = [
  { name: "rounded-none", value: "0px" },
  { name: "rounded-sm", value: "2px" },
  { name: "rounded", value: "4px" },
  { name: "rounded-md", value: "6px" },
  { name: "rounded-lg", value: "8px" },
  { name: "rounded-xl", value: "12px" },
  { name: "rounded-2xl", value: "16px" },
  { name: "rounded-full", value: "9999px" },
];

const borderWidths = [
  { name: "border", value: "1px" },
  { name: "border-2", value: "2px" },
  { name: "border-4", value: "4px" },
];

export default function BordersPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <span className="text-foreground">Bordas</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Bordas
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Tokens de borda para arredondamento e espessura.
        </p>
      </section>

      {/* Border Radius */}
      <Card>
        <CardHeader>
          <CardTitle>Border Radius</CardTitle>
          <CardDescription>
            Escala de arredondamento de cantos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {borderRadius.map((item) => (
              <div key={item.name} className="text-center space-y-2">
                <div 
                  className="h-16 w-16 mx-auto bg-primary"
                  style={{ borderRadius: item.value }}
                />
                <code className="text-xs font-mono text-primary block">{item.name}</code>
                <span className="text-xs text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Border Width */}
      <Card>
        <CardHeader>
          <CardTitle>Espessura de Borda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {borderWidths.map((item) => (
              <div key={item.name} className="text-center space-y-2">
                <div 
                  className="h-16 w-16 rounded-lg border-primary"
                  style={{ borderWidth: item.value, borderStyle: "solid" }}
                />
                <code className="text-xs font-mono text-primary block">{item.name}</code>
                <span className="text-xs text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
