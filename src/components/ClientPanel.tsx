
import React, { useState } from "react";
import { Calendar, Store, MapPin } from "lucide-react";
import { ClientData } from "@/types/client";
import { getPotentialColor } from "@/utils/clientData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ClientPanelProps {
  clients: ClientData[];
  onSelectClient?: (client: ClientData) => void;
  onHoverClient?: (client: ClientData | null) => void;
  compact?: boolean;
}

const ClientPanel: React.FC<ClientPanelProps> = ({ 
  clients, 
  onSelectClient, 
  onHoverClient,
  compact = false 
}) => {
  const [dateFilter, setDateFilter] = useState<'day' | 'week' | 'month'>('day');

  // Function to format date to display
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'Não agendado';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const visitDate = new Date(date);
    visitDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((visitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays > 1 && diffDays < 7) return `${diffDays} dias`;
    
    return visitDate.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const getFilteredClients = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return clients.filter(client => {
      if (!client.nextVisit) return false;
      
      const visitDate = new Date(client.nextVisit);
      visitDate.setHours(0, 0, 0, 0);
      
      switch (dateFilter) {
        case 'day':
          // Today only
          return visitDate.getTime() === today.getTime();
        
        case 'week':
          // Next 7 days
          const weekLater = new Date(today);
          weekLater.setDate(weekLater.getDate() + 7);
          return visitDate >= today && visitDate <= weekLater;
        
        case 'month':
          // Next 30 days
          const monthLater = new Date(today);
          monthLater.setDate(monthLater.getDate() + 30);
          return visitDate >= today && visitDate <= monthLater;
        
        default:
          return true;
      }
    }).sort((a, b) => {
      if (!a.nextVisit) return 1;
      if (!b.nextVisit) return -1;
      return a.nextVisit.getTime() - b.nextVisit.getTime();
    });
  };

  const filteredClients = getFilteredClients();

  return (
    <div className={`tactical-panel h-full flex flex-col ${compact ? 'p-2' : 'p-4'} bg-tactical-darkgray/90 backdrop-blur-md`}>
      <div className="flex items-center justify-between border-b border-heineken/20 pb-2 mb-3">
        <h2 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-heineken-neon flex items-center`}>
          <Store size={compact ? 14 : 16} className="mr-2" />
          MISSÕES
        </h2>
        <Select 
          value={dateFilter} 
          onValueChange={(value) => setDateFilter(value as 'day' | 'week' | 'month')}
        >
          <SelectTrigger className="w-[100px] h-7 bg-tactical-black/50 border-heineken/20 text-xs">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent className="bg-tactical-darkgray border-heineken/20 text-tactical-silver">
            <SelectItem value="day" className="text-xs">Hoje</SelectItem>
            <SelectItem value="week" className="text-xs">Semana</SelectItem>
            <SelectItem value="month" className="text-xs">Mês</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredClients.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-tactical-silver text-sm">
          <Store size={24} className="mb-2" />
          <p>Nenhum cliente para atendimento neste período</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[calc(100%-2rem)]">
          {filteredClients.map((client) => (
            <div 
              key={client.id} 
              className={`tactical-panel ${compact ? 'p-2' : 'p-3'} border border-l-4 hover:bg-tactical-darkgray/90 hover:border-heineken transition-all duration-200 cursor-pointer`}
              style={{ borderLeftColor: 
                client.potential === "diamante" ? "#60A5FA" : 
                client.potential === "ouro" ? "#FFD700" : 
                client.potential === "prata" ? "#9F9EA1" :
                client.potential === "inox" ? "#9F9EA1" :  
                "#CD7F32" 
              }}
              onClick={() => onSelectClient && onSelectClient(client)}
              onMouseEnter={() => onHoverClient && onHoverClient(client)}
              onMouseLeave={() => onHoverClient && onHoverClient(null)}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-tactical-silver`}>
                  {client.name}
                </h3>
                {/* Removed the CONVERTIDO/NÃO CONVERTIDO status tag */}
              </div>
              
              <div className="flex items-center text-xs text-tactical-silver/80 mb-2">
                <MapPin size={12} className="mr-1" />
                <span>{client.address.street}, {client.address.neighborhood}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${getPotentialColor(client.potential)} mr-1`}></div>
                  <span className="capitalize">{client.potential}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1 text-heineken" />
                  <span className="text-heineken-neon">{formatDate(client.nextVisit)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientPanel;
