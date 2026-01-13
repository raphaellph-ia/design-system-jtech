import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSSLayout } from "./layouts/DSSLayout";
import HomePage from "./pages/HomePage";
import GettingStartedPage from "./pages/GettingStartedPage";
import ColorsPage from "./pages/tokens/ColorsPage";
import TypographyPage from "./pages/tokens/TypographyPage";
import SpacingPage from "./pages/tokens/SpacingPage";
import ShadowsPage from "./pages/tokens/ShadowsPage";
import BordersPage from "./pages/tokens/BordersPage";
import DssButtonPage from "./pages/components/DssButtonPage";
import DssCardPage from "./pages/components/DssCardPage";
import ComponentPlaceholder from "./pages/components/ComponentPlaceholder";
import ArchitecturePage from "./pages/governance/ArchitecturePage";
import ClassificationPage from "./pages/governance/ClassificationPage";
import ChecklistPage from "./pages/governance/ChecklistPage";
import ContributingPage from "./pages/governance/ContributingPage";
import BrandabilityPage from "./pages/patterns/BrandabilityPage";
import DarkModePage from "./pages/patterns/DarkModePage";
import AccessibilityPage from "./pages/patterns/AccessibilityPage";
import FigmaPage from "./pages/resources/FigmaPage";
import InstallationPage from "./pages/resources/InstallationPage";
import FAQPage from "./pages/resources/FAQPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DSSLayout />}>
            {/* Início */}
            <Route path="/" element={<HomePage />} />
            <Route path="/primeiros-passos" element={<GettingStartedPage />} />
            
            {/* Tokens */}
            <Route path="/tokens/cores" element={<ColorsPage />} />
            <Route path="/tokens/tipografia" element={<TypographyPage />} />
            <Route path="/tokens/espacamento" element={<SpacingPage />} />
            <Route path="/tokens/sombras" element={<ShadowsPage />} />
            <Route path="/tokens/bordas" element={<BordersPage />} />
            
            {/* Componentes */}
            <Route path="/componentes/dss-button" element={<DssButtonPage />} />
            <Route path="/componentes/dss-card" element={<DssCardPage />} />
            <Route path="/componentes/:componentId" element={<ComponentPlaceholder />} />
            
            {/* Governança */}
            <Route path="/governanca/arquitetura" element={<ArchitecturePage />} />
            <Route path="/governanca/classificacao" element={<ClassificationPage />} />
            <Route path="/governanca/checklist-pr" element={<ChecklistPage />} />
            <Route path="/governanca/contribuir" element={<ContributingPage />} />
            
            {/* Padrões */}
            <Route path="/padroes/brandabilidade" element={<BrandabilityPage />} />
            <Route path="/padroes/dark-mode" element={<DarkModePage />} />
            <Route path="/padroes/acessibilidade" element={<AccessibilityPage />} />
            
            {/* Recursos */}
            <Route path="/recursos/figma" element={<FigmaPage />} />
            <Route path="/recursos/instalacao" element={<InstallationPage />} />
            <Route path="/recursos/faq" element={<FAQPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
