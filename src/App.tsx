
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
import VendedorRelatorio from "./pages/vendedor/Relatorio";

// Páginas do Supervisor
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorComparativo from "./pages/supervisor/Comparativo";
import SupervisorMissoes from "./pages/supervisor/Missoes";

// Páginas do Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminFiliais from "./pages/admin/Filiais";
import AdminFilialDetalhe from "./pages/admin/FilialDetalhe";
import AdminSupervisorDetalhe from "./pages/admin/SupervisorDetalhe";
import AdminVendedorDetalhe from "./pages/admin/VendedorDetalhe";
import AdminUploadData from "./pages/admin/UploadData"; 
import AdminRanking from "./pages/admin/Ranking"; // Nova página de Ranking

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
          <Route path="/vendedor/relatorio" element={<VendedorRelatorio />} />
          
          {/* Rotas do Supervisor */}
          <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor/comparativo" element={<SupervisorComparativo />} />
          <Route path="/supervisor/missoes" element={<SupervisorMissoes />} />
          
          {/* Rotas do Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/filiais" element={<AdminFiliais />} />
          <Route path="/admin/filial/:filialId" element={<AdminFilialDetalhe />} />
          <Route path="/admin/supervisor/:supervisorId" element={<AdminSupervisorDetalhe />} />
          <Route path="/admin/vendedor/:vendedorId" element={<AdminVendedorDetalhe />} />
          <Route path="/admin/upload-data" element={<AdminUploadData />} />
          <Route path="/admin/ranking" element={<AdminRanking />} /> {/* Nova rota de Ranking */}
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
