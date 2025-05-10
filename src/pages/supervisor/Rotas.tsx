
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Sheet } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import Map from "@/components/Map";
import RouteSearchBar from "@/components/supervisor/routes/RouteSearchBar";
import RouteCard, { RouteData } from "@/components/supervisor/routes/RouteCard";
import EmptyRouteState from "@/components/supervisor/routes/EmptyRouteState";
import RouteDetails from "@/components/supervisor/routes/RouteDetails";
import { filterRoutes, getUniqueSellers } from "@/services/routesData";

const SupervisorRotas = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendedor, setSelectedVendedor] = useState("todos");
  const [selectedRota, setSelectedRota] = useState<RouteData | null>(null);
  const [isRouteDetailOpen, setIsRouteDetailOpen] = useState(false);

  // Get unique sellers for the filter
  const vendedoresUnicos = getUniqueSellers();
  
  // Get filtered routes
  const rotasFiltradas = filterRoutes(searchTerm, selectedVendedor);

  const handleRotaClick = (rota: RouteData) => {
    setSelectedRota(rota);
    setIsRouteDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsRouteDetailOpen(false);
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Monitoramento de Rotas">
      <div className="px-4 pb-6">
        {/* Search and filter bar */}
        <RouteSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedVendedor={selectedVendedor}
          onVendedorChange={setSelectedVendedor}
          vendedores={vendedoresUnicos}
        />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Routes list */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-heineken-neon mb-2">Rotas Ativas</h3>
            
            {rotasFiltradas.map((rota) => (
              <RouteCard
                key={rota.id}
                route={rota}
                onClick={handleRotaClick}
              />
            ))}
            
            {rotasFiltradas.length === 0 && <EmptyRouteState />}
          </div>
          
          {/* Map (desktop and tablets) */}
          <div className="hidden md:block lg:col-span-7 xl:col-span-8 rounded-lg overflow-hidden border border-heineken/30 h-[calc(100vh-250px)]">
            <Map 
              className=""
              highlightedClientId={selectedRota?.id.toString()}
              onSelectClient={(client) => console.log("Client selected:", client)}
            />
          </div>
        </div>
      </div>

      {/* Sheet modal for route details */}
      <Sheet open={isRouteDetailOpen} onOpenChange={setIsRouteDetailOpen}>
        <RouteDetails
          route={selectedRota}
          onClose={handleCloseDetails}
        />
      </Sheet>
    </DashboardLayout>
  );
};

export default SupervisorRotas;
