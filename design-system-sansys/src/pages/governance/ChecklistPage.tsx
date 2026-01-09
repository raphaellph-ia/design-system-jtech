import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const checklistItems = {
  implementation: [
    "Componente encapsula corretamente o componente Quasar",
    "Todos os tokens necessários foram mapeados",
    "Props do Quasar expostas via interface tipada",
    "Suporte a slots do componente base",
    "Eventos propagados corretamente",
  ],
  tokens: [
    "Usa tokens globais (não valores hardcoded)",
    "Tokens semânticos aplicados onde apropriado",
    "Suporte a brandabilidade (Water/Waste/Hub)",
    "Dark mode testado e funcional",
  ],
  documentation: [
    "Arquivo .md criado junto ao componente",
    "Descrição clara do propósito",
    "Tabela de props documentada",
    "Exemplos de uso incluídos",
    "Tokens utilizados listados",
  ],
  quality: [
    "Testes unitários escritos",
    "Acessibilidade validada (WCAG 2.1 AA)",
    "Testado em diferentes viewports",
    "Revisão de código aprovada",
  ],
};

export default function ChecklistPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/governanca/checklist-pr" className="hover:text-foreground">Governança</Link>
          <span>/</span>
          <span className="text-foreground">Checklist de PR</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Checklist de PR
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Itens obrigatórios para aprovação de Pull Requests de novos componentes.
        </p>
      </section>

      {/* Checklist Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Implementação</CardTitle>
          <CardDescription>Requisitos técnicos do componente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.implementation.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Checkbox id={item} disabled />
                <label htmlFor={item} className="text-sm text-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tokens</CardTitle>
          <CardDescription>Uso correto do sistema de tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.tokens.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Checkbox id={item} disabled />
                <label htmlFor={item} className="text-sm text-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentação</CardTitle>
          <CardDescription>Requisitos de documentação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.documentation.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Checkbox id={item} disabled />
                <label htmlFor={item} className="text-sm text-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Qualidade</CardTitle>
          <CardDescription>Padrões de qualidade e testes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.quality.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Checkbox id={item} disabled />
                <label htmlFor={item} className="text-sm text-foreground cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
