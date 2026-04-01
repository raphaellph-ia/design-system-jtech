import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Palette,
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
  Tag,
  CheckSquare as CheckSquareIcon,
  Contrast,
  Accessibility,
  GitBranch,
  CheckSquare,
  HelpCircle,
  Figma,
  Download,
  Circle,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  SlidersHorizontal,
  LayoutGrid,
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
      { title: "DssChip", url: "/componentes/dss-chip", icon: Tag, status: "golden" },
      { title: "DssCheckbox", url: "/componentes/dss-checkbox", icon: CheckSquareIcon, status: "stable" },
      { title: "DssToggle", url: "/componentes/dss-toggle", icon: Circle, status: "stable" },
      { title: "DssAvatar", url: "/componentes/dss-avatar", icon: User, status: "stable" },
      { title: "DssTooltip", url: "/componentes/dss-tooltip", icon: MessageSquare, status: "stable" },
      { title: "DssRange", url: "/componentes/dss-range", icon: SlidersHorizontal, status: "stable" },
      { title: "DssBtnGroup", url: "/componentes/dss-btn-group", icon: LayoutGrid, status: "stable" },
      { title: "DssBtnDropdown", url: "/componentes/dss-btn-dropdown", icon: ChevronDown, status: "stable" },
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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = location.pathname;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    inicio: true,
    fundacoes: true,
    componentes: true,
    padroes: true,
    governanca: true,
    recursos: true,
  });

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'golden': return 'var(--dss-jtech-accent)';
      case 'stable': return 'var(--dss-positive)';
      case 'beta': return 'var(--dss-warning)';
      default: return 'var(--dss-info)';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'golden': return 'Golden Sample';
      case 'stable': return 'Estável';
      case 'beta': return 'Beta';
      default: return 'Novo';
    }
  };

  return (
    <Sidebar 
      collapsible="icon"
      className="border-r"
      style={{ 
        borderColor: 'hsl(var(--sidebar-border))',
        backgroundColor: 'hsl(var(--sidebar-background))'
      }}
    >
      {/* Header com hover effect */}
      <SidebarHeader 
        className={cn("border-b transition-all duration-200", collapsed ? "p-3" : "p-4")} 
        style={{ borderColor: 'hsl(var(--sidebar-border))' }}
      >
        <Link 
          to="/" 
          className={cn("flex items-center group", collapsed ? "justify-center" : "gap-3")}
        >
          <div 
            className="h-9 w-9 rounded-lg flex items-center justify-center shadow-sm 
                       transition-all duration-300 ease-out
                       group-hover:shadow-lg group-hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, var(--dss-jtech-accent), var(--dss-jtech-accent-hover))',
              boxShadow: '0 2px 8px rgba(196, 30, 58, 0.3)'
            }}
          >
            <span className="text-white font-bold text-sm transition-transform duration-200 group-hover:scale-110">
              JT
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span 
                className="font-semibold text-sm transition-colors duration-200 group-hover:text-white" 
                style={{ color: 'hsl(var(--sidebar-foreground))' }}
              >
                DSS
              </span>
              <span 
                className="text-xs transition-colors duration-200" 
                style={{ color: 'hsl(var(--sidebar-muted))' }}
              >
                Design System Sansys
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="sidebar-scroll px-2 py-3">
        {Object.entries(navigation).map(([key, section], sectionIndex) => (
          <SidebarGroup 
            key={key} 
            className="mb-1"
            style={{ 
              animationDelay: `${sectionIndex * 50}ms`,
            }}
          >
            {/* Section Label com toggle */}
            <button
              onClick={() => toggleSection(key)}
              className={cn(
                "w-full flex items-center justify-between text-[10px] uppercase tracking-wider",
                "font-semibold px-3 py-2 rounded-md transition-all duration-200",
                "hover:bg-white/5 group cursor-pointer",
                collapsed && "hidden"
              )}
              style={{ color: 'hsl(var(--sidebar-muted))' }}
            >
              <span className="transition-colors duration-200 group-hover:text-white/80">
                {section.label}
              </span>
              <ChevronDown 
                className={cn(
                  "h-3 w-3 transition-all duration-300 ease-out",
                  expandedSections[key] ? "rotate-0" : "-rotate-90"
                )}
              />
            </button>

            {/* Items com animação de collapse */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                expandedSections[key] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item, itemIndex) => {
                    const active = isActive(item.url);
                    const hovered = hoveredItem === item.url;
                    
                    return (
                      <SidebarMenuItem 
                        key={item.url}
                        style={{ 
                          animationDelay: `${(sectionIndex * 50) + (itemIndex * 30)}ms`,
                        }}
                      >
                        <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                          <Link
                            to={item.url}
                            className={cn(
                              "relative flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg mx-1",
                              "transition-all duration-200 ease-out",
                              "group/item"
                            )}
                            style={{
                              backgroundColor: active 
                                ? 'rgba(196, 30, 58, 0.12)' 
                                : hovered 
                                  ? 'rgba(255, 255, 255, 0.05)' 
                                  : 'transparent',
                              color: active 
                                ? 'var(--dss-jtech-accent-light)' 
                                : 'hsl(var(--sidebar-foreground))',
                              fontWeight: active ? 500 : 400,
                              transform: hovered && !active ? 'translateX(4px)' : 'translateX(0)',
                            }}
                            onMouseEnter={() => setHoveredItem(item.url)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {!collapsed && (
                              <div 
                                className={cn(
                                  "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full",
                                  "transition-all duration-300 ease-out"
                                )}
                                style={{
                                  height: active ? '60%' : '0%',
                                  backgroundColor: 'var(--dss-jtech-accent)',
                                  opacity: active ? 1 : 0,
                                  boxShadow: active ? '0 0 8px rgba(196, 30, 58, 0.5)' : 'none',
                                }}
                              />
                            )}

                            {/* Icon with animations */}
                            <div className="relative">
                              <item.icon 
                                className={cn(
                                  "h-4 w-4 flex-shrink-0 transition-all duration-200",
                                  hovered && !active && "scale-110"
                                )}
                                style={{ 
                                  color: active 
                                    ? 'var(--dss-jtech-accent)' 
                                    : hovered 
                                      ? 'var(--dss-jtech-accent-light)'
                                      : 'hsl(var(--sidebar-muted))'
                                }}
                                strokeWidth={active ? 2 : 1.5}
                              />
                              {/* Glow effect on active */}
                              {active && (
                                <div 
                                  className="absolute inset-0 rounded-full animate-glow-pulse"
                                  style={{ 
                                    background: 'radial-gradient(circle, rgba(196, 30, 58, 0.3) 0%, transparent 70%)',
                                  }}
                                />
                              )}
                            </div>

                            {!collapsed && (
                              <span 
                                className={cn(
                                  "flex-1 transition-all duration-200",
                                  hovered && !active && "translate-x-0.5"
                                )}
                              >
                                {item.title}
                              </span>
                            )}

                            {/* Status indicator with tooltip */}
                            {!collapsed && "status" in item && item.status && (
                              <div className="relative group/status">
                                <span
                                  className={cn(
                                    "h-2 w-2 rounded-full transition-all duration-300",
                                    hovered && "scale-125"
                                  )}
                                  style={{ 
                                    backgroundColor: getStatusColor(item.status),
                                    boxShadow: `0 0 6px ${getStatusColor(item.status)}40`,
                                  }}
                                />
                                {/* Tooltip */}
                                <div 
                                  className="absolute right-0 top-full mt-2 px-2 py-1 rounded text-[10px] 
                                             whitespace-nowrap opacity-0 group-hover/status:opacity-100
                                             transition-opacity duration-200 pointer-events-none z-50"
                                  style={{
                                    backgroundColor: 'hsl(var(--popover))',
                                    color: 'hsl(var(--popover-foreground))',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                  }}
                                >
                                  {getStatusLabel(item.status)}
                                </div>
                              </div>
                            )}

                            {!collapsed && (
                              <ChevronRight 
                                className={cn(
                                  "h-3 w-3 transition-all duration-300 ease-out",
                                  active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                )}
                                style={{ color: 'var(--dss-jtech-accent)' }}
                              />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer com hover effects */}
      <SidebarFooter 
        className={cn("border-t transition-colors duration-200", collapsed ? "p-3" : "p-4")} 
        style={{ borderColor: 'hsl(var(--sidebar-border))' }}
      >
        <div 
          className={cn("flex items-center text-xs", collapsed ? "justify-center" : "justify-between")}
          style={{ color: 'hsl(var(--sidebar-muted))' }}
        >
          <div className="flex items-center gap-2 group cursor-pointer transition-colors duration-200 hover:text-white/80">
            <Settings className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
            {!collapsed && <span>v2.0.0</span>}
          </div>
          {!collapsed && (
            <span 
              className="px-2 py-0.5 rounded text-[10px] font-medium
                         transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{ 
                backgroundColor: 'var(--dss-jtech-accent)', 
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(196, 30, 58, 0.3)',
              }}
            >
              Jtech
            </span>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}