import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FigmaPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/recursos/figma" className="hover:text-foreground">Recursos</Link>
          <span>/</span>
          <span className="text-foreground">Integração Figma</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Integração Figma
        </h1>
        
        <p className="text-lg text-muted-foreground">
          O Figma é a fonte de design do DSS. Todos os componentes 
          são desenhados primeiro no Figma antes da implementação.
        </p>
      </section>

      {/* Figma Embed Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de Componentes</CardTitle>
          <CardDescription>
            Acesse a biblioteca completa de componentes no Figma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Embed do Figma será adicionado aqui
              </p>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Abrir no Figma
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Trabalho</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Design no Figma</p>
                <p className="text-sm text-muted-foreground">
                  Designer cria ou atualiza o componente na biblioteca Figma.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Extração de Tokens</p>
                <p className="text-sm text-muted-foreground">
                  Tokens são extraídos e sincronizados com o código.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Implementação</p>
                <p className="text-sm text-muted-foreground">
                  Dev implementa o wrapper seguindo a arquitetura de 4 camadas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-semibold">4</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Validação</p>
                <p className="text-sm text-muted-foreground">
                  Designer valida implementação contra o design original.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
