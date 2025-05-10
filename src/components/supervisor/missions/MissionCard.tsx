
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";

interface MissionSeller {
  id: number;
  nome: string;
  progresso: number;
}

export interface MissionData {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  progresso: number;
  vendedores: MissionSeller[];
}

interface MissionCardProps {
  mission: MissionData;
  onClick: (mission: MissionData) => void;
}

const MissionCard = ({ mission, onClick }: MissionCardProps) => {
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

  return (
    <Card 
      className="bg-tactical-darkgray/80 border-heineken/30 hover:border-heineken/50 cursor-pointer transition-all"
      onClick={() => onClick(mission)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-heineken-neon text-base">{mission.titulo}</CardTitle>
          {renderStatus(mission.status)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-tactical-silver mb-4 line-clamp-2">{mission.descricao}</p>
        
        <div className="flex items-center justify-between mb-2 text-xs text-tactical-silver/80">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{formatDate(mission.dataInicio)} - {formatDate(mission.dataFim)}</span>
          </div>
          <div>
            {mission.vendedores.length} vendedores
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-tactical-silver">Progresso geral</span>
            <span className="text-heineken-neon">{mission.progresso}%</span>
          </div>
          <ProgressBar 
            value={mission.progresso} 
            max={100}
            label={""}
            showValue={false}
            size={"md"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionCard;
