
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas Login e NotFound
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Páginas do Vendedor
import VendedorDashboard from "./pages/vendedor/Dashboard";
import VendedorRanking from "./pages/vendedor/Ranking";

// Páginas do Supervisor
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorComparativo from "./pages/supervisor/Comparativo";
import SupervisorMissoes from "./pages/supervisor/Missoes";

// Página do Admin
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota raiz - redireciona para login */}
          <Route path="/" element={<Login />} />
          
          {/* Rotas do Vendedor */}
          <Route path="/vendedor/dashboard" element={<VendedorDashboard />} />
          <Route path="/vendedor/ranking" element={<VendedorRanking />} />
          
          {/* Rotas do Supervisor */}
          <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor/comparativo" element={<SupervisorComparativo />} />
          <Route path="/supervisor/missoes" element={<SupervisorMissoes />} />
          
          {/* Rotas do Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Rotas legadas (redirecionamento) */}
          <Route path="/dashboard" element={<Navigate to="/vendedor/dashboard" replace />} />
          <Route path="/vendedor/relatorio" element={<Navigate to="/vendedor/ranking" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
