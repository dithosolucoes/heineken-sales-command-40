
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Trophy, Check, X, Clock, ListChecks } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Tipo para vendedores da equipe
interface Vendedor {
  id: string;
  nome: string;
  alvosAtingidos: number;
  totalAlvos: number;
  progresso: number;
}

// Tipo para histórico de alvos
interface AlvoHistorico {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: Date;
  status: "pendente" | "concluido" | "cancelado";
}

// Dados simulados para ranking de vendedores
const vendedoresMockData: Vendedor[] = [
  {
    id: "V-1001",
    nome: "Carlos Silva",
    alvosAtingidos: 42,
    totalAlvos: 50,
    progresso: 84
  },
  {
    id: "V-1002",
    nome: "João Oliveira",
    alvosAtingidos: 38,
    totalAlvos: 50,
    progresso: 76
  },
  {
    id: "V-1003",
    nome: "Ana Pereira",
    alvosAtingidos: 45,
    totalAlvos: 50,
    progresso: 90
  },
  {
    id: "V-1004",
    nome: "Roberto Santos",
    alvosAtingidos: 37,
    totalAlvos: 50,
    progresso: 74
  },
  {
    id: "V-1005",
    nome: "Marcela Costa",
    alvosAtingidos: 41,
    totalAlvos: 50,
    progresso: 82
  },
  {
    id: "V-1006",
    nome: "Fernando Lima",
    alvosAtingidos: 33,
    totalAlvos: 50,
    progresso: 66
  },
  {
    id: "V-1007",
    nome: "Juliana Ferreira",
    alvosAtingidos: 39,
    totalAlvos: 50,
    progresso: 78
  }
];

// Dados simulados para histórico de alvos
const alvosHistoricoMockData: AlvoHistorico[] = [
  {
    id: "A-3001",
    clienteId: "PDV-2345",
    clienteNome: "Bar do João",
    data: new Date(2023, 4, 15),
    status: "concluido"
  },
  {
    id: "A-3002",
    clienteId: "PDV-2123",
    clienteNome: "Restaurante Sabor Caseiro",
    data: new Date(2023, 4, 18),
    status: "pendente"
  },
  {
    id: "A-3003",
    clienteId: "PDV-2567",
    clienteNome: "Lanchonete Expresso",
    data: new Date(2023, 4, 20),
    status: "cancelado"
  },
  {
    id: "A-3004",
    clienteId: "PDV-2890",
    clienteNome: "Padaria Pão Quente",
    data: new Date(2023, 4, 22),
    status: "concluido"
  },
  {
    id: "A-3005",
    clienteId: "PDV-2111",
    clienteNome: "Bar e Petiscaria Encontro",
    data: new Date(2023, 4, 25),
    status: "pendente"
  },
  {
    id: "A-3006",
    clienteId: "PDV-2222",
    clienteNome: "Restaurante Sabor Mineiro",
    data: new Date(2023, 4, 27),
    status: "concluido"
  },
  {
    id: "A-3007",
    clienteId: "PDV-2333",
    clienteNome: "Boteco da Esquina",
    data: new Date(2023, 4, 28),
    status: "cancelado"
  },
  {
    id: "A-3008",
    clienteId: "PDV-2444",
    clienteNome: "Pizzaria Forno a Lenha",
    data: new Date(2023, 4, 30),
    status: "pendente"
  },
  {
    id: "A-3009",
    clienteId: "PDV-2555",
    clienteNome: "Choperia Paulista",
    data: new Date(2023, 5, 2),
    status: "concluido"
  },
  {
    id: "A-3010",
    clienteId: "PDV-2666",
    clienteNome: "Bar do Zé",
    data: new Date(2023, 5, 5),
    status: "pendente"
  },
  {
    id: "A-3011",
    clienteId: "PDV-2777",
    clienteNome: "Quiosque da Praia",
    data: new Date(2023, 5, 8),
    status: "concluido"
  },
  {
    id: "A-3012",
    clienteId: "PDV-2888",
    clienteNome: "Restaurante Vista Mar",
    data: new Date(2023, 5, 10),
    status: "cancelado"
  }
];

const VendedorRanking = () => {
  const [tab, setTab] = useState<string>("equipe");
  const [vendedoresFiltrados, setVendedoresFiltrados] = useState<Vendedor[]>([]);
  const [alvosHistoricoFiltrados, setAlvosHistoricoFiltrados] = useState<AlvoHistorico[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Ranking | Vendedor Heineken SP SUL";
    aplicarFiltros();
  }, [tab]);
  
  // Função para ordenar dados
  const aplicarFiltros = () => {
    // Ordenar vendedores por progresso (do maior para o menor)
    const vendedoresOrdenados = [...vendedoresMockData].sort((a, b) => b.progresso - a.progresso);
    setVendedoresFiltrados(vendedoresOrdenados);
    
    // Ordenar histórico de alvos por data, da mais recente para a mais antiga
    const alvosOrdenados = [...alvosHistoricoMockData].sort((a, b) => b.data.getTime() - a.data.getTime());
    setAlvosHistoricoFiltrados(alvosOrdenados);
  };
  
  // Função para renderizar o ícone de status
  const renderizarIconeStatus = (status: string) => {
    switch (status) {
      case "concluido":
        return <Check className="h-5 w-5 text-green-500" />;
      case "cancelado":
        return <X className="h-5 w-5 text-red-500" />;
      case "pendente":
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Função para obter o texto do status
  const getTextoStatus = (status: string) => {
    switch (status) {
      case "concluido":
        return "Concluído";
      case "cancelado":
        return "Cancelado";
      case "pendente":
      default:
        return "Pendente";
    }
  };
  
  // Função para obter a classe CSS do status
  const getClasseStatus = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-green-500/20 text-green-500";
      case "cancelado":
        return "bg-red-500/20 text-red-500";
      case "pendente":
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Componente de barra de progresso
  const ProgressBar = ({ valor }: { valor: number }) => {
    return (
      <div className="w-full h-2 bg-tactical-black rounded-full overflow-hidden">
        <div 
          className="h-full bg-heineken rounded-full" 
          style={{ width: `${valor}%` }}
        ></div>
      </div>
    );
  };

  return (
    <DashboardLayout userType="vendedor" pageTitle="Ranking">
      <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-7xl mx-auto">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full bg-tactical-black border-b border-heineken/30 mb-6 gap-2">
            <TabsTrigger value="equipe" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4" /> Ranking Equipe
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <ListChecks className="h-3 w-3 sm:h-4 sm:w-4" /> Histórico de Alvos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equipe">
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className={cn("pb-2", isMobile ? "px-2 py-3" : "")}>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-heineken" /> Ranking da Equipe
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Seu progresso em comparação aos outros vendedores do seu supervisor
                </CardDescription>
              </CardHeader>
              <CardContent className={cn(isMobile ? "px-1 py-2" : "")}>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className={cn("w-10 sm:w-14", isMobile ? "px-2" : "")}>#</TableHead>
                        <TableHead className={isMobile ? "px-2" : ""}>Vendedor</TableHead>
                        <TableHead className={isMobile ? "px-2" : ""}>Progresso</TableHead>
                        <TableHead className={cn("text-right", isMobile ? "px-2" : "")}>Alvos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendedoresFiltrados.map((vendedor, index) => (
                        <TableRow key={vendedor.id} className={vendedor.id === "V-1001" ? "bg-heineken/10" : ""}>
                          <TableCell className={isMobile ? "px-2 py-2" : ""}>
                            <span className={cn(
                              "flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm", 
                              index === 0 ? "bg-yellow-400/40 text-yellow-400" : 
                              index === 1 ? "bg-gray-400/40 text-gray-400" : 
                              index === 2 ? "bg-amber-600/40 text-amber-600" : "bg-tactical-black"
                            )}>
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell className={cn(isMobile ? "px-2 py-2" : "")}>
                            <div className={cn("whitespace-nowrap overflow-hidden text-ellipsis max-w-20 sm:max-w-none", 
                              vendedor.id === "V-1001" ? "font-bold text-heineken" : "")}>
                              {vendedor.nome}
                              {vendedor.id === "V-1001" && (
                                <span className="text-[10px] sm:text-xs ml-1 sm:ml-2 text-tactical-silver">(Você)</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className={cn("w-1/3", isMobile ? "px-2 py-2" : "")}>
                            <div className="flex flex-col gap-1">
                              <ProgressBar valor={vendedor.progresso} />
                              <span className="text-[10px] sm:text-xs text-tactical-silver">{vendedor.progresso}%</span>
                            </div>
                          </TableCell>
                          <TableCell className={cn("text-right", isMobile ? "px-2 py-2" : "")}>
                            <span className="font-semibold text-xs sm:text-sm">{vendedor.alvosAtingidos}</span>
                            <span className="text-tactical-silver text-[10px] sm:text-sm">/{vendedor.totalAlvos}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className={cn("pb-2", isMobile ? "px-2 py-3" : "")}>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-heineken" /> Histórico de Alvos
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Seu histórico de alvos e missões
                </CardDescription>
              </CardHeader>
              <CardContent className={cn(isMobile ? "px-1 py-2" : "")}>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className={isMobile ? "px-2" : ""}>PDV</TableHead>
                        <TableHead className={isMobile ? "px-2 w-24" : ""}>Data</TableHead>
                        <TableHead className={isMobile ? "px-2" : ""}>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alvosHistoricoFiltrados.map(alvo => (
                        <TableRow key={alvo.id}>
                          <TableCell className={isMobile ? "px-2 py-2" : ""}>
                            <div>
                              <span className={cn("font-medium text-xs sm:text-sm line-clamp-1", 
                                isMobile ? "max-w-28" : "")}>
                                {alvo.clienteNome}
                              </span>
                              <span className="block text-[10px] sm:text-xs text-tactical-silver">{alvo.clienteId}</span>
                            </div>
                          </TableCell>
                          <TableCell className={cn("whitespace-nowrap", isMobile ? "px-2 py-2 text-xs" : "")}>
                            {format(alvo.data, "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell className={isMobile ? "px-2 py-2" : ""}>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              {!isMobile && (
                                <span className={`p-1 rounded-full ${alvo.status === "concluido" ? "bg-green-500" : alvo.status === "cancelado" ? "bg-red-500" : "bg-gray-400"}`}>
                                  {renderizarIconeStatus(alvo.status)}
                                </span>
                              )}
                              <span className={`py-1 px-2 rounded-md text-[10px] sm:text-xs ${getClasseStatus(alvo.status)}`}>
                                {getTextoStatus(alvo.status)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VendedorRanking;
