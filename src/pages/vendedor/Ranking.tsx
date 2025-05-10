
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
import { Button } from "@/components/ui/button";
import { Trophy, Target, CalendarIcon, Filter, Clock, Check, X, ListChecks, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Tipo para vendedores da equipe
interface Vendedor {
  id: string;
  nome: string;
  alvosAtingidos: number;
  totalAlvos: number;
  progresso: number;
}

// Tipo para filiais
interface Filial {
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

// Dados simulados para ranking de filiais
const filiaisMockData: Filial[] = [
  {
    id: "F-2001",
    nome: "SP - Capital",
    alvosAtingidos: 245,
    totalAlvos: 300,
    progresso: 82
  },
  {
    id: "F-2002",
    nome: "SP - Campinas",
    alvosAtingidos: 210,
    totalAlvos: 300,
    progresso: 70
  },
  {
    id: "F-2003",
    nome: "SP - Guarulhos",
    alvosAtingidos: 265,
    totalAlvos: 300,
    progresso: 88
  },
  {
    id: "F-2004",
    nome: "SP - Santos",
    alvosAtingidos: 195,
    totalAlvos: 300,
    progresso: 65
  },
  {
    id: "F-2005",
    nome: "SP - São José dos Campos",
    alvosAtingidos: 240,
    totalAlvos: 300,
    progresso: 80
  },
  {
    id: "F-2006",
    nome: "SP - Ribeirão Preto",
    alvosAtingidos: 225,
    totalAlvos: 300,
    progresso: 75
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
  }
];

const VendedorRanking = () => {
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date());
  const [vendedoresFiltrados, setVendedoresFiltrados] = useState<Vendedor[]>([]);
  const [filiaisFiltradas, setFiliaisFiltradas] = useState<Filial[]>([]);
  const [alvosHistoricoFiltrados, setAlvosHistoricoFiltrados] = useState<AlvoHistorico[]>([]);
  const [tab, setTab] = useState<string>("equipe");
  
  useEffect(() => {
    document.title = "Ranking | Vendedor Heineken SP SUL";
    aplicarFiltros();
  }, [dataInicio, dataFim, tab]);
  
  // Função para filtrar dados por data
  const aplicarFiltros = () => {
    // Filtrar vendedores (sem filtro de data, apenas ordenação)
    const vendedoresOrdenados = [...vendedoresMockData].sort((a, b) => b.progresso - a.progresso);
    setVendedoresFiltrados(vendedoresOrdenados);
    
    // Filtrar filiais (sem filtro de data, apenas ordenação)
    const filiaisOrdenadas = [...filiaisMockData].sort((a, b) => b.progresso - a.progresso);
    setFiliaisFiltradas(filiaisOrdenadas);
    
    // Filtrar histórico de alvos por data
    let alvosResultado = [...alvosHistoricoMockData];
    
    if (dataInicio) {
      alvosResultado = alvosResultado.filter(a => a.data >= dataInicio);
    }
    
    if (dataFim) {
      alvosResultado = alvosResultado.filter(a => a.data <= dataFim);
    }
    
    // Ordenar por data, da mais recente para a mais antiga
    alvosResultado.sort((a, b) => b.data.getTime() - a.data.getTime());
    
    setAlvosHistoricoFiltrados(alvosResultado);
  };
  
  // Resetar filtros para o último mês
  const resetarFiltros = () => {
    setDataInicio(new Date(new Date().setDate(new Date().getDate() - 30)));
    setDataFim(new Date());
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
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Data Início</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left bg-tactical-black border border-heineken/30 hover:bg-tactical-black/80 hover:text-heineken-neon",
                      !dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? (
                      format(dataInicio, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-tactical-black border-heineken/30" align="start">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={setDataInicio}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Data Fim</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left bg-tactical-black border border-heineken/30 hover:bg-tactical-black/80 hover:text-heineken-neon",
                      !dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? (
                      format(dataFim, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-tactical-black border-heineken/30" align="start">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1 flex items-end">
              <Button 
                className="w-full bg-heineken hover:bg-heineken/80"
                onClick={resetarFiltros}
              >
                <Filter className="mr-2 h-4 w-4" /> Resetar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full bg-tactical-black border-b border-heineken/30 mb-6 gap-2">
            <TabsTrigger value="equipe" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Ranking Equipe
            </TabsTrigger>
            <TabsTrigger value="filiais" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Ranking Filiais
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" /> Histórico de Alvos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equipe">
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-heineken" /> Ranking da Equipe
                </CardTitle>
                <CardDescription>
                  Seu progresso em comparação aos outros vendedores do seu supervisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className="w-14">#</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead className="text-right">Alvos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendedoresFiltrados.map((vendedor, index) => (
                        <TableRow key={vendedor.id} className={vendedor.id === "V-1001" ? "bg-heineken/10" : ""}>
                          <TableCell>
                            <span className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full", 
                              index === 0 ? "bg-yellow-400/40 text-yellow-400" : 
                              index === 1 ? "bg-gray-400/40 text-gray-400" : 
                              index === 2 ? "bg-amber-600/40 text-amber-600" : "bg-tactical-black"
                            )}>
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className={vendedor.id === "V-1001" ? "font-bold text-heineken" : ""}>
                              {vendedor.nome}
                              {vendedor.id === "V-1001" && <span className="text-xs ml-2 text-tactical-silver">(Você)</span>}
                            </div>
                          </TableCell>
                          <TableCell className="w-1/3">
                            <div className="flex flex-col gap-1">
                              <ProgressBar valor={vendedor.progresso} />
                              <span className="text-xs text-tactical-silver">{vendedor.progresso}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold">{vendedor.alvosAtingidos}</span>
                            <span className="text-tactical-silver text-sm">/{vendedor.totalAlvos}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filiais">
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-heineken" /> Ranking de Filiais
                </CardTitle>
                <CardDescription>
                  Desempenho geral de todas as filiais Heineken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className="w-14">#</TableHead>
                        <TableHead>Filial</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead className="text-right">Alvos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filiaisFiltradas.map((filial, index) => (
                        <TableRow key={filial.id}>
                          <TableCell>
                            <span className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full", 
                              index === 0 ? "bg-yellow-400/40 text-yellow-400" : 
                              index === 1 ? "bg-gray-400/40 text-gray-400" : 
                              index === 2 ? "bg-amber-600/40 text-amber-600" : "bg-tactical-black"
                            )}>
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell>
                            {filial.nome}
                          </TableCell>
                          <TableCell className="w-1/3">
                            <div className="flex flex-col gap-1">
                              <ProgressBar valor={filial.progresso} />
                              <span className="text-xs text-tactical-silver">{filial.progresso}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold">{filial.alvosAtingidos}</span>
                            <span className="text-tactical-silver text-sm">/{filial.totalAlvos}</span>
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
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-heineken" /> Histórico de Alvos
                </CardTitle>
                <CardDescription>
                  Seu histórico de alvos e missões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead>PDV</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alvosHistoricoFiltrados.length > 0 ? (
                        alvosHistoricoFiltrados.map(alvo => (
                          <TableRow key={alvo.id}>
                            <TableCell>
                              <div>
                                <span className="font-medium">{alvo.clienteNome}</span>
                                <span className="block text-xs text-tactical-silver">{alvo.clienteId}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {format(alvo.data, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className={`p-1 rounded-full ${alvo.status === "concluido" ? "bg-green-500" : alvo.status === "cancelado" ? "bg-red-500" : "bg-gray-400"}`}>
                                  {renderizarIconeStatus(alvo.status)}
                                </span>
                                <span className={`py-1 px-2 rounded-md text-xs ${getClasseStatus(alvo.status)}`}>
                                  {getTextoStatus(alvo.status)}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                            <p className="text-tactical-silver">Nenhum alvo encontrado no período selecionado.</p>
                          </TableCell>
                        </TableRow>
                      )}
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
