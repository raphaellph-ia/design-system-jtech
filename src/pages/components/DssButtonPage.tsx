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
  { token: "--dss-action-primary", usage: "Fundo do variant primary", value: "#1f86de" },
  { token: "--dss-action-primary-hover", usage: "Hover do variant primary", value: "#0f5295" },
  { token: "--dss-action-secondary", usage: "Fundo do variant secondary", value: "#26a69a" },
  { token: "--dss-gray-50", usage: "Texto do variant primary", value: "#ffffff" },
  { token: "--dss-spacing-2", usage: "Padding vertical", value: "0.5rem" },
  { token: "--dss-spacing-4", usage: "Padding horizontal", value: "1rem" },
  { token: "--dss-radius-md", usage: "Border radius", value: "0.5rem" },
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
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8" style={{ backgroundColor: 'var(--dss-surface-default)' }}>
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--dss-text-subtle)' }}>
          <Link to="/" className="hover:underline" style={{ color: 'var(--dss-text-action)' }}>Início</Link>
          <span>/</span>
          <Link to="/componentes/dss-button" className="hover:underline" style={{ color: 'var(--dss-text-action)' }}>Componentes</Link>
          <span>/</span>
          <span style={{ color: 'var(--dss-text-body)' }}>DssButton</span>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--dss-text-body)' }}>DssButton</h1>
          <Badge style={{ backgroundColor: 'var(--dss-positive)', color: 'white' }}>
            <Check className="h-3 w-3 mr-1" />
            Estável
          </Badge>
          <Badge variant="outline" className="gap-1" style={{ borderColor: 'var(--dss-warning)', color: 'var(--dss-warning)' }}>
            <Star className="h-3 w-3" />
            Golden Sample
          </Badge>
        </div>
        
        <p className="text-lg" style={{ color: 'var(--dss-text-subtle)' }}>
          Botão interativo com múltiplas variantes, tamanhos e estados. 
          Encapsula o QBtn do Quasar aplicando os tokens do DSS.
        </p>
      </section>

      {/* Figma Embed Placeholder */}
      <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4" style={{ color: 'var(--dss-primary)' }} />
            Design no Figma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="aspect-video max-h-48 rounded-lg flex items-center justify-center border-2 border-dashed"
            style={{ 
              backgroundColor: 'var(--dss-surface-subtle)', 
              borderColor: 'var(--dss-gray-300)' 
            }}
          >
            <p style={{ color: 'var(--dss-text-subtle)' }} className="text-sm">Embed do Figma será adicionado aqui</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Playground */}
      <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
            Playground
          </CardTitle>
          <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>
            Experimente diferentes configurações do componente em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <div 
            className="p-8 rounded-lg flex items-center justify-center min-h-[120px]"
            style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
          >
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
              <label className="text-sm font-medium" style={{ color: 'var(--dss-text-body)' }}>Variant</label>
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
              <label className="text-sm font-medium" style={{ color: 'var(--dss-text-body)' }}>Size</label>
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
              <label className="text-sm font-medium" style={{ color: 'var(--dss-text-body)' }}>Estado</label>
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
            <pre 
              className="p-4 overflow-x-auto rounded-md font-mono text-sm"
              style={{ 
                backgroundColor: 'var(--dss-gray-800)', 
                color: 'var(--dss-gray-100)',
                border: '1px solid var(--dss-gray-700)'
              }}
            >
              <code>{codeExample}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={copyCode}
              style={{ color: 'var(--dss-gray-400)' }}
            >
              {copied ? <Check className="h-4 w-4" style={{ color: 'var(--dss-positive)' }} /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Tabs */}
      <Tabs defaultValue="props" className="space-y-4">
        <TabsList style={{ backgroundColor: 'var(--dss-surface-subtle)' }}>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="anatomy">Anatomia</TabsTrigger>
        </TabsList>

        <TabsContent value="props">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Props</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>Propriedades aceitas pelo componente.</CardDescription>
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
                      <TableCell className="font-mono" style={{ color: 'var(--dss-primary)' }}>{row.prop}</TableCell>
                      <TableCell className="font-mono text-sm">{row.type}</TableCell>
                      <TableCell className="font-mono text-sm" style={{ color: 'var(--dss-text-subtle)' }}>{row.default}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>Eventos emitidos pelo componente.</CardDescription>
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
                      <TableCell className="font-mono" style={{ color: 'var(--dss-primary)' }}>@{row.event}</TableCell>
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
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle>Tokens DSS Utilizados</CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>Design tokens aplicados neste componente.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Uso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokensUsed.map((row) => (
                    <TableRow key={row.token}>
                      <TableCell className="font-mono" style={{ color: 'var(--dss-primary)' }}>{row.token}</TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-4 h-4 rounded border"
                            style={{ 
                              backgroundColor: row.value,
                              borderColor: 'var(--dss-gray-300)'
                            }}
                          />
                          {row.value}
                        </div>
                      </TableCell>
                      <TableCell>{row.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anatomy">
          <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
                Anatomia (4 Camadas)
              </CardTitle>
              <CardDescription style={{ color: 'var(--dss-text-subtle)' }}>Estrutura interna do componente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div 
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}
                >
                  <p className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>Camada 1: Tokens DSS</p>
                  <code className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>--dss-action-primary, --dss-spacing-*, --dss-radius-*</code>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}
                >
                  <p className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>Camada 2: Base (Quasar)</p>
                  <code className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>QBtn</code>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--dss-feedback-info-surface)', 
                    borderColor: 'var(--dss-primary-light)' 
                  }}
                >
                  <p className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>Camada 3: Wrapper DSS</p>
                  <code className="text-sm" style={{ color: 'var(--dss-primary)' }}>DssButton.vue</code>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: 'var(--dss-surface-subtle)', borderColor: 'var(--dss-gray-200)' }}
                >
                  <p className="font-medium mb-1" style={{ color: 'var(--dss-text-body)' }}>Camada 4: Compostos</p>
                  <code className="text-sm" style={{ color: 'var(--dss-text-subtle)' }}>DssIconButton, DssButtonGroup (futuro)</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Examples */}
      <Card style={{ backgroundColor: 'var(--dss-surface-default)', borderColor: 'var(--dss-gray-200)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" style={{ color: 'var(--dss-primary)' }} />
            Exemplos de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--dss-text-body)' }}>Variantes</p>
            <div 
              className="flex flex-wrap gap-3 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
            >
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--dss-text-body)' }}>Tamanhos</p>
            <div 
              className="flex flex-wrap items-center gap-3 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
            >
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--dss-text-body)' }}>Estados</p>
            <div 
              className="flex flex-wrap gap-3 p-4 rounded-lg"
              style={{ backgroundColor: 'var(--dss-surface-subtle)' }}
            >
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
