
import { User, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Map from "@/components/Map";
import { RouteData } from "./RouteCard";

interface RouteDetailsProps {
  route: RouteData | null;
  onClose: () => void;
}

const RouteDetails = ({ route, onClose }: RouteDetailsProps) => {
  // Format date/time of last update
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!route) return null;

  return (
    <SheetContent className="bg-tactical-black border-heineken/30 w-full sm:max-w-lg overflow-y-auto">
      <SheetHeader className="border-b border-heineken/20 pb-4">
        <SheetTitle className="text-heineken-neon">Detalhes da Rota</SheetTitle>
      </SheetHeader>
      
      <div className="mt-6 space-y-6">
        <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-tactical-black flex items-center justify-center mr-4">
              <User size={20} className="text-heineken-neon" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{route.vendedor}</h3>
              <p className="text-tactical-silver">{route.regiao}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-heineken/20 pr-4">
              <p className="text-sm text-tactical-silver">PDVs Visitados</p>
              <p className="text-2xl font-semibold text-heineken-neon">
                {route.clientesVisitados}/{route.clientes}
              </p>
            </div>
            <div>
              <p className="text-sm text-tactical-silver">Progresso</p>
              <p className="text-2xl font-semibold text-heineken-neon">
                {Math.round((route.clientesVisitados / route.clientes) * 100)}%
              </p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-tactical-silver mb-1">Última Atualização</p>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-heineken" />
              <span>{formatDateTime(route.ultimaAtualizacao)}</span>
            </div>
          </div>
        </div>
        
        {/* Map (mobile) */}
        <div className="h-[200px] rounded-md overflow-hidden border border-heineken/20">
          <Map 
            className=""
            highlightedClientId={route.id.toString()}
            onSelectClient={(client) => console.log("Client selected:", client)}
          />
        </div>
        
        <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
          <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Pontos de Venda</h4>
          <div className="space-y-3">
            {route.pontosDeVenda.map((pdv) => (
              <div key={pdv.id} className="flex items-center justify-between bg-tactical-black/50 p-3 rounded-md">
                <span className="text-tactical-silver">{pdv.nome}</span>
                <span className={`text-sm ${pdv.visitado ? 'text-green-500' : 'text-yellow-400'}`}>
                  {pdv.visitado ? 'Visitado' : 'Pendente'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full bg-heineken hover:bg-heineken/80 text-black" 
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>
    </SheetContent>
  );
};

export default RouteDetails;
