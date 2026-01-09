import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Construction } from "lucide-react";

const componentInfo: Record<string, { name: string; status: string; description: string }> = {
  "dss-card": {
    name: "DssCard",
    status: "beta",
    description: "Container de conteúdo com variantes de estilo e slots flexíveis.",
  },
  "dss-input": {
    name: "DssInput",
    status: "beta",
    description: "Campo de entrada de texto com validação e estados.",
  },
  "dss-badge": {
    name: "DssBadge",
    status: "beta",
    description: "Indicador visual para status, contagens ou categorias.",
  },
  "dss-avatar": {
    name: "DssAvatar",
    status: "beta",
    description: "Representação visual de usuário com imagem ou iniciais.",
  },
};

export default function ComponentPlaceholder() {
  const { componentId } = useParams<{ componentId: string }>();
  const info = componentId ? componentInfo[componentId] : null;

  if (!info) {
    return (
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <p className="text-muted-foreground">Componente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/componentes/dss-button" className="hover:text-foreground">Componentes</Link>
          <span>/</span>
          <span className="text-foreground">{info.name}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">{info.name}</h1>
          <Badge variant="outline" className="bg-[hsl(var(--dss-warning))]/10 text-[hsl(var(--dss-warning))] border-[hsl(var(--dss-warning))]/20">
            {info.status}
          </Badge>
        </div>
        
        <p className="text-lg text-muted-foreground">{info.description}</p>
      </section>

      {/* Placeholder */}
      <Card className="border-dashed">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <Construction className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg mb-2">Em Desenvolvimento</CardTitle>
          <CardDescription>
            A documentação completa deste componente será adicionada em breve.
            <br />
            Consulte o <Link to="/componentes/dss-button" className="text-primary hover:underline">DssButton</Link> como referência.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
