
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Radar from "@/components/Radar";
import ClientPanel from "@/components/ClientPanel";
import MobileClientsList from "@/components/MobileClientsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { ClientData } from "@/types/client";
import { clientsData } from "@/utils/clientData";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientDetailsModal from "@/components/ClientDetailsModal";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [clients] = useState<ClientData[]>(clientsData);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [hoveredClient, setHoveredClient] = useState<ClientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isClientPanelMinimized, setIsClientPanelMinimized] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Heineken SP SUL";
  }, []);

  const handleClientSelect = (client: ClientData) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmConversion = (clientId: string) => {
    console.log(`Conversion confirmed for client ${clientId}`);
    // Here you would typically update the client data in a real app
  };

  return (
    <div className="min-h-screen flex flex-col bg-tactical-black">
      <Header userType="vendedor" />
      
      {/* Map as main background element */}
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <Map 
            highlightedClientId={hoveredClient?.id} 
            onSelectClient={handleClientSelect}
          />
        </div>

        {/* Centered search bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md">
          <div className="relative">
            <Input
              placeholder="Buscar cliente por nome ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-tactical-black/70 border-heineken/30 pl-9 pr-4 py-2 text-sm text-white w-full shadow-lg"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver" />
          </div>
        </div>

        {/* Radar positioned in the bottom right */}
        <div className="absolute bottom-8 right-8 z-10">
          <Radar />
        </div>

        {/* Client Panel (floating in the upper right) */}
        {selectedClient && (
          <div className={`absolute ${isPanelMinimized ? 'top-4 right-4 w-auto h-auto' : 'top-14 right-4 w-full max-w-sm'} transition-all duration-300 ease-in-out z-20`}>
            {isPanelMinimized ? (
              <button 
                onClick={() => setIsPanelMinimized(false)}
                className="tactical-button p-2 rounded-md flex items-center"
              >
                <span className="text-xs mr-2">Cliente: {selectedClient.name}</span>
                <span className="text-tactical-silver">+</span>
              </button>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsPanelMinimized(true)}
                  className="absolute -top-8 right-0 bg-tactical-darkgray/80 border border-heineken/20 text-tactical-silver p-1 rounded-t-md"
                >
                  <X size={16} />
                </button>
                <div className="bg-tactical-black border border-heineken/30 rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-heineken-neon font-bold">{selectedClient.name}</h3>
                    <button 
                      onClick={() => setSelectedClient(null)}
                      className="text-tactical-silver hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-tactical-silver text-sm mb-2">
                    {selectedClient.address.street}, {selectedClient.address.neighborhood}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full tactical-button py-2 text-sm"
                  >
                    VER DETALHES
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Client Panel (floating in the bottom left) */}
        <div className={`absolute ${isClientPanelMinimized ? 'bottom-4 left-4 w-auto h-auto' : 'bottom-4 left-4 w-full max-w-xs'} transition-all duration-300 ease-in-out z-10`}>
          {isClientPanelMinimized ? (
            <button 
              onClick={() => setIsClientPanelMinimized(false)}
              className="tactical-button p-2 rounded-md"
            >
              <span className="text-xs">Missões</span>
            </button>
          ) : (
            <div className="relative animate-tactical-fade">
              <button 
                onClick={() => setIsClientPanelMinimized(true)}
                className="absolute -top-8 right-0 bg-tactical-darkgray/80 border border-heineken/20 text-tactical-silver p-1 rounded-t-md"
              >
                <X size={16} />
              </button>
              <ClientPanel 
                clients={clients} 
                onSelectClient={handleClientSelect}
                onHoverClient={setHoveredClient}
                compact={isMobile} 
              />
            </div>
          )}
        </div>

        {/* Single client details modal - only this instance should exist */}
        <ClientDetailsModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          client={selectedClient}
          onConfirmConversion={handleConfirmConversion}
        />

        {/* Mobile client list */}
        {isMobile && (
          <MobileClientsList 
            clients={clients}
            onSelectClient={handleClientSelect}
            onOpenModal={() => setIsModalOpen(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
