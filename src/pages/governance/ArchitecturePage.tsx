import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Layers, Box, Palette, Code, FileCode } from "lucide-react";

const layers = [
  {
    name: "Camada 1: Tokens",
    icon: Palette,
    description: "Design tokens globais e semânticos que definem cores, tipografia, espaçamento.",
    examples: ["--color-primary-500", "--spacing-4", "--font-size-base"],
  },
  {
    name: "Camada 2: Base (Quasar)",
    icon: Box,
    description: "Componentes base do Quasar que são encapsulados pelo DSS.",
    examples: ["QBtn", "QInput", "QCard"],
  },
  {
    name: "Camada 3: Wrapper DSS",
    icon: Layers,
    description: "Componentes DSS que encapsulam o Quasar aplicando tokens e padrões.",
    examples: ["DssButton", "DssInput", "DssCard"],
  },
  {
    name: "Camada 4: Compostos",
    icon: Code,
    description: "Componentes compostos que combinam múltiplos wrappers DSS.",
    examples: ["DssSearchField", "DssDataTable", "DssFormSection"],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/governanca/arquitetura" className="hover:text-foreground">Governança</Link>
          <span>/</span>
          <span className="text-foreground">Arquitetura</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Arquitetura de 4 Camadas
        </h1>
        
        <p className="text-lg text-muted-foreground">
          O DSS utiliza uma arquitetura em 4 camadas para garantir consistência, 
          manutenibilidade e escalabilidade.
        </p>
      </section>

      {/* Layers */}
      <div className="space-y-4">
        {layers.map((layer, index) => (
          <Card key={layer.name}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <layer.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {layer.name}
                    <Badge variant="secondary" className="font-mono text-xs">
                      Layer {index + 1}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {layer.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {layer.examples.map((example) => (
                  <code 
                    key={example}
                    className="px-2 py-1 rounded text-xs font-mono bg-secondary text-foreground"
                  >
                    {example}
                  </code>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            Estrutura de Diretórios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`components/
├── base/
│   ├── DssButton/
│   │   ├── DssButton.vue
│   │   └── DssButton.md
│   ├── DssInput/
│   │   ├── DssInput.vue
│   │   └── DssInput.md
│   └── ...
├── composed/
│   ├── DssSearchField/
│   └── DssDataTable/
└── tokens/
    ├── global.css
    └── semantic.css`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Encapsulamento:</strong> Mudanças no Quasar não afetam diretamente os produtos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Consistência:</strong> Tokens garantem uniformidade visual entre produtos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Manutenibilidade:</strong> Atualizações centralizadas propagam automaticamente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Brandabilidade:</strong> Suporte nativo a múltiplas marcas (Water, Waste, Hub)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
