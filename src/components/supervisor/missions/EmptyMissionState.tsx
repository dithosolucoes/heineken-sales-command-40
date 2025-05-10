
import { AlertCircle } from "lucide-react";

const EmptyMissionState = () => {
  return (
    <div className="col-span-full p-8 text-center bg-tactical-darkgray/50 rounded-lg border border-heineken/10">
      <AlertCircle className="mx-auto h-10 w-10 text-tactical-silver mb-2" />
      <h3 className="text-tactical-silver text-lg font-medium">Nenhuma missão encontrada</h3>
      <p className="text-tactical-silver/80 mt-1">Tente ajustar os filtros ou criar uma nova missão.</p>
    </div>
  );
};

export default EmptyMissionState;
