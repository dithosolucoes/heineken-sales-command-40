
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
