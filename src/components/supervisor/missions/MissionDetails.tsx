
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProgressBar from "@/components/ProgressBar";
import { MissionData } from "./MissionCard";
import { Badge } from "@/components/ui/badge";

interface MissionDetailsProps {
  mission: MissionData | null;
  onClose: () => void;
}

const MissionDetails = ({ mission, onClose }: MissionDetailsProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case "em_andamento":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Em andamento</Badge>;
      case "planejada":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Planejada</Badge>;
      case "concluida":
        return <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  if (!mission) return null;

  return (
    <SheetContent className="bg-tactical-black border-heineken/30 w-full sm:max-w-lg overflow-y-auto">
      <SheetHeader className="border-b border-heineken/20 pb-4">
        <SheetTitle className="text-heineken-neon">Detalhes da Missão</SheetTitle>
      </SheetHeader>
      
      <div className="mt-6 space-y-6">
        <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{mission.titulo}</h3>
            {renderStatus(mission.status)}
          </div>
          
          <p className="text-tactical-silver mb-4">{mission.descricao}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-heineken/20 pr-4">
              <p className="text-sm text-tactical-silver">Data de Início</p>
              <p className="text-lg text-white">{formatDate(mission.dataInicio)}</p>
            </div>
            <div>
              <p className="text-sm text-tactical-silver">Data de Término</p>
              <p className="text-lg text-white">{formatDate(mission.dataFim)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
          <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Progresso Geral</h4>
          <div className="space-y-1 mb-6">
            <div className="flex justify-between text-sm">
              <span>Progresso da missão</span>
              <span className={mission.progresso === 100 ? "text-green-500" : "text-heineken-neon"}>
                {mission.progresso}%
              </span>
            </div>
            <ProgressBar 
              value={mission.progresso} 
              max={100}
              label={""}
              showValue={false}
              size={"md"}
            />
          </div>
          
          <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Vendedores Designados</h4>
          <div className="space-y-4">
            {mission.vendedores.map((vendedor) => (
              <div key={vendedor.id} className="bg-tactical-black/50 p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-tactical-silver">{vendedor.nome}</span>
                  <span className={`text-sm ${vendedor.progresso >= 80 ? 'text-green-500' : vendedor.progresso >= 40 ? 'text-yellow-400' : 'text-red-500'}`}>
                    {vendedor.progresso}%
                  </span>
                </div>
                <ProgressBar 
                  value={vendedor.progresso} 
                  max={100}
                  label={""}
                  showValue={false}
                  size={"md"}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-heineken hover:bg-heineken/80 text-black" 
          >
            Editar Missão
          </Button>
          <Button 
            className="flex-1" 
            variant="outline" 
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default MissionDetails;
