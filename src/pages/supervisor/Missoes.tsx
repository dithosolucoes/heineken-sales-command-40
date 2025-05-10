
import { useState } from "react";
import { Search, Plus, Filter, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProgressBar } from "@/components/ProgressBar";

// Dados de exemplo para missões
const missoesData = [
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

const SupervisorMissoes = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");
  const [selectedMissao, setSelectedMissao] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filtrar missões com base na busca e na aba ativa
  const getMissoesFiltradas = () => {
    return missoesData
      .filter(missao => missao.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(missao => {
        if (activeTab === "todas") return true;
        if (activeTab === "em_andamento") return missao.status === "em_andamento";
        if (activeTab === "planejadas") return missao.status === "planejada";
        if (activeTab === "concluidas") return missao.status === "concluida";
        return true;
      });
  };

  const handleMissaoClick = (missao: any) => {
    setSelectedMissao(missao);
    setIsDetailOpen(true);
  };

  // Renderizar status da missão
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Missões">
      <div className="px-4 pb-6">
        {/* Barra de filtro e busca */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar missões..."
              className="pl-8 bg-tactical-darkgray/80 border-heineken/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-heineken hover:bg-heineken/80 text-black">
              <Plus size={16} className="mr-1" />
              {!isMobile && "Nova Missão"}
            </Button>
            <Button variant="outline" className="border-heineken text-heineken hover:bg-heineken/20">
              <Filter size={16} className="mr-1" />
              {!isMobile && "Filtros"}
            </Button>
          </div>
        </div>

        {/* Tabs de status */}
        <Tabs defaultValue="todas" onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="w-full sm:w-auto bg-tactical-darkgray/80 border border-heineken/30">
            <TabsTrigger
              value="todas"
              className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="em_andamento"
              className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
            >
              Em Andamento
            </TabsTrigger>
            <TabsTrigger
              value="planejadas"
              className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
            >
              Planejadas
            </TabsTrigger>
            <TabsTrigger
              value="concluidas"
              className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
            >
              Concluídas
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de missões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getMissoesFiltradas().map((missao) => (
            <Card 
              key={missao.id} 
              className="bg-tactical-darkgray/80 border-heineken/30 hover:border-heineken/50 cursor-pointer transition-all"
              onClick={() => handleMissaoClick(missao)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-heineken-neon text-base">{missao.titulo}</CardTitle>
                  {renderStatus(missao.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-tactical-silver mb-4 line-clamp-2">{missao.descricao}</p>
                
                <div className="flex items-center justify-between mb-2 text-xs text-tactical-silver/80">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>{formatDate(missao.dataInicio)} - {formatDate(missao.dataFim)}</span>
                  </div>
                  <div>
                    {missao.vendedores.length} vendedores
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-tactical-silver">Progresso geral</span>
                    <span className="text-heineken-neon">{missao.progresso}%</span>
                  </div>
                  <ProgressBar 
                    progress={missao.progresso} 
                    className="h-1.5"
                    progressClassName={missao.progresso >= 100 ? "bg-green-500" : "bg-heineken"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {getMissoesFiltradas().length === 0 && (
            <div className="col-span-full p-8 text-center bg-tactical-darkgray/50 rounded-lg border border-heineken/10">
              <AlertCircle className="mx-auto h-10 w-10 text-tactical-silver mb-2" />
              <h3 className="text-tactical-silver text-lg font-medium">Nenhuma missão encontrada</h3>
              <p className="text-tactical-silver/80 mt-1">Tente ajustar os filtros ou criar uma nova missão.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sheet modal para detalhes da missão */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="bg-tactical-black border-heineken/30 w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="border-b border-heineken/20 pb-4">
            <SheetTitle className="text-heineken-neon">Detalhes da Missão</SheetTitle>
          </SheetHeader>
          
          {selectedMissao && (
            <div className="mt-6 space-y-6">
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{selectedMissao.titulo}</h3>
                  {renderStatus(selectedMissao.status)}
                </div>
                
                <p className="text-tactical-silver mb-4">{selectedMissao.descricao}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-r border-heineken/20 pr-4">
                    <p className="text-sm text-tactical-silver">Data de Início</p>
                    <p className="text-lg text-white">{formatDate(selectedMissao.dataInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tactical-silver">Data de Término</p>
                    <p className="text-lg text-white">{formatDate(selectedMissao.dataFim)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Progresso Geral</h4>
                <div className="space-y-1 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Progresso da missão</span>
                    <span className={selectedMissao.progresso === 100 ? "text-green-500" : "text-heineken-neon"}>
                      {selectedMissao.progresso}%
                    </span>
                  </div>
                  <ProgressBar 
                    progress={selectedMissao.progresso} 
                    className="h-2"
                    progressClassName={selectedMissao.progresso >= 100 ? "bg-green-500" : "bg-heineken"}
                  />
                </div>
                
                <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Vendedores Designados</h4>
                <div className="space-y-4">
                  {selectedMissao.vendedores.map((vendedor: any) => (
                    <div key={vendedor.id} className="bg-tactical-black/50 p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="text-tactical-silver">{vendedor.nome}</span>
                        <span className={`text-sm ${vendedor.progresso >= 80 ? 'text-green-500' : vendedor.progresso >= 40 ? 'text-yellow-400' : 'text-red-500'}`}>
                          {vendedor.progresso}%
                        </span>
                      </div>
                      <ProgressBar 
                        progress={vendedor.progresso} 
                        className="h-1.5"
                        progressClassName={
                          vendedor.progresso >= 80 ? "bg-green-500" : 
                          vendedor.progresso >= 40 ? "bg-yellow-400" : "bg-red-500"
                        }
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
                  onClick={() => setIsDetailOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default SupervisorMissoes;
