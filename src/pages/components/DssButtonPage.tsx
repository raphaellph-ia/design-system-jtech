import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy, Check, Star, Layers, Palette, Code, FileText } from "lucide-react";

const variants = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
const sizes = ["sm", "default", "lg"] as const;

const propsData = [
  { prop: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"primary"', description: "Estilo visual do botão" },
  { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Tamanho do botão" },
  { prop: "disabled", type: "boolean", default: "false", description: "Estado desabilitado" },
  { prop: "loading", type: "boolean", default: "false", description: "Exibe indicador de carregamento" },
  { prop: "icon", type: "string", default: "undefined", description: "Ícone à esquerda do texto" },
  { prop: "iconRight", type: "string", default: "undefined", description: "Ícone à direita do texto" },
];

const eventsData = [
  { event: "click", payload: "MouseEvent", description: "Emitido ao clicar no botão" },
  { event: "focus", payload: "FocusEvent", description: "Emitido ao focar no botão" },
  { event: "blur", payload: "FocusEvent", description: "Emitido ao perder foco" },
];

const tokensUsed = [
  { token: "--color-primary-500", usage: "Fundo do variant primary" },
  { token: "--color-primary-600", usage: "Hover do variant primary" },
  { token: "--color-neutral-0", usage: "Texto do variant primary" },
  { token: "--spacing-2", usage: "Padding horizontal sm" },
  { token: "--spacing-4", usage: "Padding horizontal default" },
  { token: "--radius-md", usage: "Border radius" },
];

export default function DssButtonPage() {
  const [selectedVariant, setSelectedVariant] = useState<typeof variants[number]>("primary");
  const [selectedSize, setSelectedSize] = useState<typeof sizes[number]>("default");
  const [isDisabled, setIsDisabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeExample = `<DssButton
  variant="${selectedVariant}"
  size="${selectedSize}"
  ${isDisabled ? "disabled" : ""}
>
  Clique aqui
</DssButton>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/componentes/dss-button" className="hover:text-foreground">Componentes</Link>
          <span>/</span>
          <span className="text-foreground">DssButton</span>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-foreground">DssButton</h1>
          <Badge className="bg-[hsl(var(--dss-success))]">
            <Check className="h-3 w-3 mr-1" />
            Estável
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Star className="h-3 w-3" />
            Golden Sample
          </Badge>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Botão interativo com múltiplas variantes, tamanhos e estados. 
          Encapsula o QBtn do Quasar aplicando os tokens do DSS.
        </p>
      </section>

      {/* Figma Embed Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Design no Figma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video max-h-48 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground text-sm">Embed do Figma será adicionado aqui</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Playground */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Playground
          </CardTitle>
          <CardDescription>
            Experimente diferentes configurações do componente em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <div className="p-8 bg-secondary/30 rounded-lg flex items-center justify-center min-h-[120px]">
            <Button
              variant={selectedVariant === "primary" ? "default" : selectedVariant as any}
              size={selectedSize}
              disabled={isDisabled}
            >
              Clique aqui
            </Button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Variant</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <Button
                    key={v}
                    variant={selectedVariant === v ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Button
                    key={s}
                    variant={selectedSize === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Estado</label>
              <div className="flex gap-2">
                <Button
                  variant={isDisabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  {isDisabled ? "Desabilitado" : "Habilitado"}
                </Button>
              </div>
            </div>
          </div>

          {/* Code */}
          <div className="relative">
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">{codeExample}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={copyCode}
            >
              {copied ? <Check className="h-4 w-4 text-[hsl(var(--dss-success))]" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Tabs */}
      <Tabs defaultValue="props" className="space-y-4">
        <TabsList>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="anatomy">Anatomia</TabsTrigger>
        </TabsList>

        <TabsContent value="props">
          <Card>
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription>Propriedades aceitas pelo componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propsData.map((row) => (
                    <TableRow key={row.prop}>
                      <TableCell className="font-mono text-primary">{row.prop}</TableCell>
                      <TableCell className="font-mono text-sm">{row.type}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{row.default}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
              <CardDescription>Eventos emitidos pelo componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Payload</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsData.map((row) => (
                    <TableRow key={row.event}>
                      <TableCell className="font-mono text-primary">@{row.event}</TableCell>
                      <TableCell className="font-mono text-sm">{row.payload}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle>Tokens Utilizados</CardTitle>
              <CardDescription>Design tokens aplicados neste componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Uso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokensUsed.map((row) => (
                    <TableRow key={row.token}>
                      <TableCell className="font-mono text-primary">{row.token}</TableCell>
                      <TableCell>{row.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anatomy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Anatomia (4 Camadas)
              </CardTitle>
              <CardDescription>Estrutura interna do componente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <p className="font-medium text-foreground mb-1">Camada 1: Tokens</p>
                  <code className="text-sm text-muted-foreground">--color-primary-*, --spacing-*, --radius-*</code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <p className="font-medium text-foreground mb-1">Camada 2: Base (Quasar)</p>
                  <code className="text-sm text-muted-foreground">QBtn</code>
                </div>
                <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="font-medium text-foreground mb-1">Camada 3: Wrapper DSS</p>
                  <code className="text-sm text-primary">DssButton.vue</code>
                </div>
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <p className="font-medium text-foreground mb-1">Camada 4: Compostos</p>
                  <code className="text-sm text-muted-foreground">DssIconButton, DssButtonGroup (futuro)</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Exemplos de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3 text-foreground">Variantes</p>
            <div className="flex flex-wrap gap-3 p-4 bg-secondary/30 rounded-lg">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 text-foreground">Tamanhos</p>
            <div className="flex flex-wrap items-center gap-3 p-4 bg-secondary/30 rounded-lg">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 text-foreground">Estados</p>
            <div className="flex flex-wrap gap-3 p-4 bg-secondary/30 rounded-lg">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
