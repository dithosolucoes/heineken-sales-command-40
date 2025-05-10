
import { MissionData } from "@/components/supervisor/missions/MissionCard";

// Example mission data
export const missoesData: MissionData[] = [
  {
    id: 1,
    titulo: "Aumento de PDVs Heineken Silver",
    descricao: "Converter 30 PDVs para venda de Heineken Silver",
    dataInicio: "2023-05-01",
    dataFim: "2023-05-30",
    status: "em_andamento",
    progresso: 67,
    vendedores: [
      { id: 101, nome: "Carlos Silva", progresso: 80 },
      { id: 102, nome: "Ana Oliveira", progresso: 90 },
      { id: 103, nome: "Roberto Santos", progresso: 40 },
    ]
  },
  {
    id: 2,
    titulo: "Expansão Heineken 0.0",
    descricao: "Adicionar Heineken 0.0 em 50 PDVs da região sul",
    dataInicio: "2023-04-15",
    dataFim: "2023-06-15",
    status: "em_andamento",
    progresso: 42,
    vendedores: [
      { id: 101, nome: "Carlos Silva", progresso: 50 },
      { id: 102, nome: "Ana Oliveira", progresso: 60 },
      { id: 104, nome: "Julia Mendes", progresso: 30 },
    ]
  },
  {
    id: 3,
    titulo: "Divulgação Nova Embalagem",
    descricao: "Apresentar nova embalagem premium em todos os PDVs A e B",
    dataInicio: "2023-06-01",
    dataFim: "2023-06-30",
    status: "planejada",
    progresso: 0,
    vendedores: [
      { id: 102, nome: "Ana Oliveira", progresso: 0 },
      { id: 103, nome: "Roberto Santos", progresso: 0 },
      { id: 105, nome: "Fernando Costa", progresso: 0 },
    ]
  },
  {
    id: 4,
    titulo: "Acompanhamento de Freezers",
    descricao: "Verificação do estado e manutenção dos freezers em 100 PDVs",
    dataInicio: "2023-03-10",
    dataFim: "2023-04-10",
    status: "concluida",
    progresso: 100,
    vendedores: [
      { id: 101, nome: "Carlos Silva", progresso: 100 },
      { id: 106, nome: "Mariana Souza", progresso: 100 },
    ]
  }
];

// Function to filter missions based on search term and active tab
export const filterMissions = (
  searchTerm: string, 
  activeTab: string,
  filters: { inProgress: boolean; planned: boolean; completed: boolean } = { 
    inProgress: true, 
    planned: true, 
    completed: true 
  }
): MissionData[] => {
  return missoesData
    .filter(missao => missao.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(missao => {
      if (activeTab === "todas") {
        // Aplicar apenas os filtros quando estiver na aba "todas"
        if (missao.status === "em_andamento" && !filters.inProgress) return false;
        if (missao.status === "planejada" && !filters.planned) return false;
        if (missao.status === "concluida" && !filters.completed) return false;
        return true;
      }
      
      // Nas outras abas, respeitar a seleção da aba
      if (activeTab === "em_andamento") return missao.status === "em_andamento" && filters.inProgress;
      if (activeTab === "planejadas") return missao.status === "planejada" && filters.planned;
      if (activeTab === "concluidas") return missao.status === "concluida" && filters.completed;
      
      return true;
    });
};
