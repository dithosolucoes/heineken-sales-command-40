
import { MapPin, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface RoutePoint {
  id: number;
  nome: string;
  visitado: boolean;
  latitude: number;
  longitude: number;
}

export interface RouteData {
  id: number;
  vendedor: string;
  regiao: string;
  clientes: number;
  clientesVisitados: number;
  ultimaAtualizacao: string;
  coordenadas: {
    lat: number;
    lng: number;
    zoom: number;
  };
  pontosDeVenda: RoutePoint[];
}

interface RouteCardProps {
  route: RouteData;
  onClick: (route: RouteData) => void;
}

const RouteCard = ({ route, onClick }: RouteCardProps) => {
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

  return (
    <Card 
      key={route.id} 
      className="bg-tactical-darkgray/80 border-heineken/30 hover:border-heineken/50 cursor-pointer transition-all"
      onClick={() => onClick(route)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-white text-base">{route.vendedor}</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-heineken border-heineken hover:bg-heineken/20 h-8 px-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick(route);
            }}
          >
            <Eye size={16} className="mr-1" />
            Ver
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-tactical-silver mb-2">
          <MapPin size={16} className="mr-1.5 text-heineken-neon" />
          <span>{route.regiao}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-tactical-silver/80">PDVs Visitados</p>
            <p className="text-lg font-semibold text-heineken-neon">
              {route.clientesVisitados}/{route.clientes}
            </p>
          </div>
          <div>
            <p className="text-xs text-tactical-silver/80">Atualizado</p>
            <p className="text-sm text-tactical-silver">
              {formatDateTime(route.ultimaAtualizacao)}
            </p>
          </div>
        </div>
        
        <div className="w-full bg-tactical-black/80 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-heineken h-full rounded-full" 
            style={{ width: `${(route.clientesVisitados / route.clientes) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
