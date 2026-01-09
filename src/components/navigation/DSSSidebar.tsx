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
  Circle,
  ChevronRight,
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
      { title: "DssButton", url: "/componentes/dss-button", icon: RectangleHorizontal, status: "golden" },
      { title: "DssCard", url: "/componentes/dss-card", icon: CreditCard, status: "stable" },
      { title: "DssInput", url: "/componentes/dss-input", icon: Square, status: "stable" },
      { title: "DssBadge", url: "/componentes/dss-badge", icon: Badge, status: "stable" },
      { title: "DssAvatar", url: "/componentes/dss-avatar", icon: User, status: "stable" },
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

export function DSSSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'golden': return 'var(--dss-jtech-accent)';
      case 'stable': return 'var(--dss-positive)';
      case 'beta': return 'var(--dss-warning)';
      default: return 'var(--dss-info)';
    }
  };

  return (
    <Sidebar 
      className="border-r"
      style={{ 
        borderColor: 'hsl(var(--sidebar-border))',
        backgroundColor: 'hsl(var(--sidebar-background))'
      }}
    >
      <SidebarHeader 
        className="p-4 border-b" 
        style={{ borderColor: 'hsl(var(--sidebar-border))' }}
      >
        <Link to="/" className="flex items-center gap-3">
          <div 
            className="h-9 w-9 rounded-lg flex items-center justify-center shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, var(--dss-jtech-accent), var(--dss-jtech-accent-hover))'
            }}
          >
            <span className="text-white font-bold text-sm">JT</span>
          </div>
          <div className="flex flex-col">
            <span 
              className="font-semibold text-sm" 
              style={{ color: 'hsl(var(--sidebar-foreground))' }}
            >
              DSS
            </span>
            <span 
              className="text-xs" 
              style={{ color: 'hsl(var(--sidebar-muted))' }}
            >
              Design System Sansys
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="sidebar-scroll px-2 py-3">
        {Object.entries(navigation).map(([key, section]) => (
          <SidebarGroup key={key} className="mb-1">
            <SidebarGroupLabel 
              className="text-[10px] uppercase tracking-wider font-semibold px-3 py-2"
              style={{ color: 'hsl(var(--sidebar-muted))' }}
            >
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
                          "flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-md mx-1",
                          "hover:bg-[hsl(var(--sidebar-accent))]"
                        )}
                        style={{
                          backgroundColor: isActive(item.url) 
                            ? 'hsl(var(--sidebar-accent))' 
                            : 'transparent',
                          color: isActive(item.url) 
                            ? 'var(--dss-jtech-accent-light)' 
                            : 'hsl(var(--sidebar-foreground))',
                          fontWeight: isActive(item.url) ? 500 : 400,
                          borderLeft: isActive(item.url) 
                            ? '2px solid var(--dss-jtech-accent)' 
                            : '2px solid transparent',
                        }}
                      >
                        <item.icon 
                          className="h-4 w-4 flex-shrink-0" 
                          style={{ 
                            color: isActive(item.url) 
                              ? 'var(--dss-jtech-accent)' 
                              : 'hsl(var(--sidebar-muted))'
                          }}
                          strokeWidth={1.5}
                        />
                        <span className="flex-1">{item.title}</span>
                        {"status" in item && item.status && (
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: getStatusColor(item.status) }}
                            title={item.status}
                          />
                        )}
                        {isActive(item.url) && (
                          <ChevronRight 
                            className="h-3 w-3" 
                            style={{ color: 'var(--dss-jtech-accent)' }}
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

      <SidebarFooter 
        className="p-4 border-t" 
        style={{ borderColor: 'hsl(var(--sidebar-border))' }}
      >
        <div 
          className="flex items-center justify-between text-xs"
          style={{ color: 'hsl(var(--sidebar-muted))' }}
        >
          <div className="flex items-center gap-2">
            <Settings className="h-3.5 w-3.5" />
            <span>v2.0.0</span>
          </div>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-medium"
            style={{ 
              backgroundColor: 'var(--dss-jtech-accent)', 
              color: '#ffffff' 
            }}
          >
            Jtech
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
