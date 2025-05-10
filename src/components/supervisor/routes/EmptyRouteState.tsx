
import { MapPin } from "lucide-react";

const EmptyRouteState = () => {
  return (
    <div className="text-center p-8 bg-tactical-darkgray/50 rounded-lg border border-heineken/10">
      <MapPin className="mx-auto h-10 w-10 text-tactical-silver mb-2" />
      <h3 className="text-tactical-silver text-lg font-medium">Nenhuma rota encontrada</h3>
      <p className="text-tactical-silver/80 mt-1">Tente ajustar os filtros de busca.</p>
    </div>
  );
};

export default EmptyRouteState;
