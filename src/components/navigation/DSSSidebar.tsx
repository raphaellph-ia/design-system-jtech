import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Palette,
  Box,
  FileText,
  Settings,
  BookOpen,
  Layers,
  Type,
  Square,
  Circle,
  RectangleHorizontal,
  CreditCard,
  User,
  Badge,
  Contrast,
  Accessibility,
  GitBranch,
  CheckSquare,
  HelpCircle,
  Figma,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = {
  inicio: {
    label: "Início",
    items: [
      { title: "Visão Geral", url: "/", icon: Home },
      { title: "Primeiros Passos", url: "/primeiros-passos", icon: BookOpen },
    ],
  },
  fundacoes: {
    label: "Fundações",
    items: [
      { title: "Cores", url: "/tokens/cores", icon: Palette },
      { title: "Tipografia", url: "/tokens/tipografia", icon: Type },
      { title: "Espaçamento", url: "/tokens/espacamento", icon: Layers },
      { title: "Sombras", url: "/tokens/sombras", icon: Square },
      { title: "Bordas", url: "/tokens/bordas", icon: RectangleHorizontal },
    ],
  },
  componentes: {
    label: "Componentes",
    items: [
      { title: "DssButton", url: "/componentes/dss-button", icon: RectangleHorizontal, status: "stable" },
      { title: "DssCard", url: "/componentes/dss-card", icon: CreditCard, status: "beta" },
      { title: "DssInput", url: "/componentes/dss-input", icon: Square, status: "beta" },
      { title: "DssBadge", url: "/componentes/dss-badge", icon: Badge, status: "beta" },
      { title: "DssAvatar", url: "/componentes/dss-avatar", icon: User, status: "beta" },
    ],
  },
  padroes: {
    label: "Padrões",
    items: [
      { title: "Brandabilidade", url: "/padroes/brandabilidade", icon: Circle },
      { title: "Dark Mode", url: "/padroes/dark-mode", icon: Contrast },
      { title: "Acessibilidade", url: "/padroes/acessibilidade", icon: Accessibility },
    ],
  },
  governanca: {
    label: "Governança",
    items: [
      { title: "Arquitetura", url: "/governanca/arquitetura", icon: GitBranch },
      { title: "Classificação A/B/C", url: "/governanca/classificacao", icon: Layers },
      { title: "Checklist de PR", url: "/governanca/checklist-pr", icon: CheckSquare },
      { title: "Como Contribuir", url: "/governanca/contribuir", icon: FileText },
    ],
  },
  recursos: {
    label: "Recursos",
    items: [
      { title: "Integração Figma", url: "/recursos/figma", icon: Figma },
      { title: "Instalação", url: "/recursos/instalacao", icon: Download },
      { title: "FAQ", url: "/recursos/faq", icon: HelpCircle },
    ],
  },
};

const statusColors = {
  stable: "bg-[hsl(var(--dss-success))]",
  beta: "bg-[hsl(var(--dss-warning))]",
  experimental: "bg-[hsl(var(--dss-info))]",
};

export function DSSSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">DS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground text-sm">DSS</span>
            <span className="text-xs text-sidebar-muted">Design System Sansys</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="sidebar-scroll">
        {Object.entries(navigation).map(([key, section]) => (
          <SidebarGroup key={key}>
            <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-wider px-4">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                    >
                      <Link
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
                          isActive(item.url)
                            ? "bg-sidebar-accent text-sidebar-primary font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{item.title}</span>
                        {"status" in item && item.status && (
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              statusColors[item.status as keyof typeof statusColors]
                            )}
                            title={item.status}
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-sidebar-muted">
          <Settings className="h-3.5 w-3.5" />
          <span>v1.0.0</span>
          <span className="mx-1">•</span>
          <span>Jtech</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
