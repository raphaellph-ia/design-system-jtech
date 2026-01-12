import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function InstallationPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/recursos/instalacao" className="hover:text-foreground">Recursos</Link>
          <span>/</span>
          <span className="text-foreground">Instalação</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Instalação
        </h1>
        
        <p className="text-lg text-muted-foreground">
          Instruções detalhadas para instalar e configurar o DSS no seu projeto.
        </p>
      </section>

      {/* NPM */}
      <Card>
        <CardHeader>
          <CardTitle>Via NPM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">npm install @jtech/dss</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => copyToClipboard("npm install @jtech/dss")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yarn */}
      <Card>
        <CardHeader>
          <CardTitle>Via Yarn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="code-block p-4 overflow-x-auto">
              <code className="text-sm text-foreground">yarn add @jtech/dss</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => copyToClipboard("yarn add @jtech/dss")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Quasar</CardTitle>
          <CardDescription>
            Adicione o plugin do DSS ao seu quasar.config.js
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`// quasar.config.js
module.exports = configure(function (ctx) {
  return {
    // ...
    framework: {
      plugins: ['DSS']
    },
    dss: {
      brand: 'water', // 'water' | 'waste' | 'hub'
      darkMode: 'auto' // 'auto' | 'light' | 'dark'
    }
  }
})`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
