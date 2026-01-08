import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function DarkModePage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <span>/</span>
          <Link to="/padroes/dark-mode" className="hover:text-foreground">Padrões</Link>
          <span>/</span>
          <span className="text-foreground">Dark Mode</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          Dark Mode
        </h1>
        
        <p className="text-lg text-muted-foreground">
          O DSS oferece suporte nativo a tema escuro em todos os componentes.
        </p>
      </section>

      {/* Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <Sun className="h-5 w-5 text-[hsl(var(--dss-warning))]" />
            <CardTitle>Light Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-white border">
              <div className="h-8 w-24 bg-[#00A3B4] rounded mb-2" />
              <div className="h-3 w-full bg-gray-200 rounded mb-1" />
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <CardTitle>Dark Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
              <div className="h-8 w-24 bg-[#00BCD4] rounded mb-2" />
              <div className="h-3 w-full bg-slate-700 rounded mb-1" />
              <div className="h-3 w-3/4 bg-slate-700 rounded" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementação</CardTitle>
          <CardDescription>
            O dark mode é controlado via classe CSS no elemento root.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`<!-- Light mode (padrão) -->
<html class="light">

<!-- Dark mode -->
<html class="dark">`}</code>
          </pre>

          <pre className="code-block p-4 overflow-x-auto">
            <code className="text-sm text-foreground">{`// Toggle programático
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Diretrizes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Sempre use tokens semânticos, nunca cores hardcoded</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Teste componentes em ambos os modos antes de submeter PR</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Mantenha contraste WCAG 2.1 AA em ambos os modos</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
