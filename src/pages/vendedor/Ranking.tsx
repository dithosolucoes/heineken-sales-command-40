
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Star, 
  Calendar, 
  CalendarIcon, 
  Filter,
  ChevronUp,
  ChevronDown,
  Target,
  CheckCircle,
  Clock,
  History
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipo para vendedores
interface Vendedor {
  id: string;
  nome: string;
  pontos: number;
  targetHits: number;
  posicao: number;
  tendencia: "up" | "down" | "stable";
}

// Tipo para filiais
interface Filial {
  id: string;
  nome: string;
  pontos: number;
  vendedores: number;
  posicao: number;
  tendencia: "up" | "down" | "stable";
}

// Tipo para missão
interface Missao {
  id: string;
  titulo: string;
  cliente: string;
  data: Date;
  status: "completa" | "pendente" | "expirada";
}

// Dados simulados para vendedores do mesmo supervisor
const vendedoresMockData: Vendedor[] = [
  {
    id: "V1",
    nome: "João Silva",
    pontos: 1250,
    targetHits: 42,
    posicao: 1,
    tendencia: "up"
  },
  {
    id: "V2",
    nome: "Você",
    pontos: 1120,
    targetHits: 38,
    posicao: 2,
    tendencia: "stable"
  },
  {
    id: "V3",
    nome: "Maria Santos",
    pontos: 980,
    targetHits: 33,
    posicao: 3,
    tendencia: "down"
  },
  {
    id: "V4",
    nome: "Carlos Oliveira",
    pontos: 875,
    targetHits: 29,
    posicao: 4,
    tendencia: "up"
  },
  {
    id: "V5",
    nome: "Ana Pereira",
    pontos: 790,
    targetHits: 26,
    posicao: 5,
    tendencia: "down"
  },
  {
    id: "V6",
    nome: "Ricardo Costa",
    pontos: 720,
    targetHits: 24,
    posicao: 6,
    tendencia: "stable"
  },
  {
    id: "V7",
    nome: "Paula Souza",
    pontos: 650,
    targetHits: 21,
    posicao: 7,
    tendencia: "up"
  }
];

// Dados simulados para filiais
const filiaisMockData: Filial[] = [
  {
    id: "F1",
    nome: "SP Sul",
    pontos: 12500,
    vendedores: 12,
    posicao: 1,
    tendencia: "stable"
  },
  {
    id: "F2",
    nome: "SP Norte",
    pontos: 11800,
    vendedores: 10,
    posicao: 2,
    tendencia: "up"
  },
  {
    id: "F3",
    nome: "SP Leste",
    pontos: 10200,
    vendedores: 11,
    posicao: 3,
    tendencia: "down"
  },
  {
    id: "F4",
    nome: "SP Oeste",
    pontos: 9800,
    vendedores: 9,
    posicao: 4,
    tendencia: "up"
  },
  {
    id: "F5",
    nome: "Campinas",
    pontos: 8500,
    vendedores: 8,
    posicao: 5,
    tendencia: "stable"
  }
];

// Dados simulados para histórico de missões
const missoesMockData: Missao[] = [
  {
    id: "M1",
    titulo: "Conversão Bar do João",
    cliente: "Bar do João",
    data: new Date(2023, 4, 25),
    status: "completa"
  },
  {
    id: "M2",
    titulo: "Conversão Restaurante Sabor Caseiro",
    cliente: "Restaurante Sabor Caseiro",
    data: new Date(2023, 4, 22),
    status: "completa"
  },
  {
    id: "M3",
    titulo: "Conversão Lanchonete Expresso",
    cliente: "Lanchonete Expresso",
    data: new Date(2023, 4, 20),
    status: "expirada"
  },
  {
    id: "M4",
    titulo: "Conversão Padaria Pão Quente",
    cliente: "Padaria Pão Quente",
    data: new Date(2023, 5, 5),
    status: "pendente"
  },
  {
    id: "M5",
    titulo: "Conversão Bar e Petiscaria Encontro",
    cliente: "Bar e Petiscaria Encontro",
    data: new Date(2023, 5, 7),
    status: "pendente"
  },
  {
    id: "M6",
    titulo: "Conversão Restaurante Sabor Mineiro",
    cliente: "Restaurante Sabor Mineiro",
    data: new Date(2023, 4, 18),
    status: "completa"
  },
  {
    id: "M7",
    titulo: "Conversão Boteco da Esquina",
    cliente: "Boteco da Esquina",
    data: new Date(2023, 4, 15),
    status: "expirada"
  }
];

const VendedorRanking = () => {
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("vendedores");
  const [periodoHistorico, setPeriodoHistorico] = useState<"semana" | "mes" | "trimestre">("mes");
  
  useEffect(() => {
    document.title = "Ranking | Vendedor Heineken SP SUL";
  }, []);
  
  // Resetar filtros para o último mês
  const resetarFiltros = () => {
    setDataInicio(new Date(new Date().setDate(new Date().getDate() - 30)));
    setDataFim(new Date());
  };
  
  // Função para renderizar o ícone de tendência
  const renderizarIconeTendencia = (tendencia: string) => {
    switch (tendencia) {
      case "up":
        return <ChevronUp className="h-5 w-5 text-green-500" />;
      case "down":
        return <ChevronDown className="h-5 w-5 text-red-500" />;
      case "stable":
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-gray-400">-</span>;
    }
  };

  // Função para renderizar o status da missão
  const renderizarStatusMissao = (status: string) => {
    switch (status) {
      case "completa":
        return (
          <span className="flex items-center text-green-500">
            <CheckCircle className="h-4 w-4 mr-1" /> Completa
          </span>
        );
      case "pendente":
        return (
          <span className="flex items-center text-yellow-500">
            <Clock className="h-4 w-4 mr-1" /> Pendente
          </span>
        );
      case "expirada":
      default:
        return (
          <span className="flex items-center text-red-500">
            <Clock className="h-4 w-4 mr-1" /> Expirada
          </span>
        );
    }
  };

  // Filtrar missões com base no período selecionado
  const getMissoesFiltradasPorPeriodo = () => {
    const hoje = new Date();
    let dataInicial = new Date();
    
    switch(periodoHistorico) {
      case "semana":
        dataInicial.setDate(hoje.getDate() - 7);
        break;
      case "mes":
        dataInicial.setMonth(hoje.getMonth() - 1);
        break;
      case "trimestre":
        dataInicial.setMonth(hoje.getMonth() - 3);
        break;
    }
    
    return missoesMockData.filter(missao => missao.data >= dataInicial && missao.data <= hoje);
  };

  const missoesFiltradas = getMissoesFiltradasPorPeriodo();

  return (
    <DashboardLayout userType="vendedor" pageTitle="Ranking de Desempenho">
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
                  <CalendarComponent
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
                  <CalendarComponent
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-tactical-black border border-heineken/30 p-1">
            <TabsTrigger value="vendedores" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Ranking de Vendedores
            </TabsTrigger>
            <TabsTrigger value="filiais" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              Ranking de Filiais
            </TabsTrigger>
            <TabsTrigger value="historico" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
              <History className="h-4 w-4 mr-2" />
              Seu Histórico
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendedores">
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-heineken" />
                  Ranking da Sua Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className="w-12 text-center">Pos.</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead className="text-center">Alvos Atingidos</TableHead>
                        <TableHead className="text-right">Pontos</TableHead>
                        <TableHead className="w-12 text-center">Tendência</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendedoresMockData.map((vendedor, index) => (
                        <TableRow 
                          key={vendedor.id}
                          className={vendedor.nome === "Você" ? "bg-heineken/10" : ""}
                        >
                          <TableCell className="text-center font-bold">
                            {index === 0 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-black">1</span>
                            ) : index === 1 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400 text-black">2</span>
                            ) : index === 2 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600 text-black">3</span>
                            ) : (
                              vendedor.posicao
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {vendedor.nome === "Você" ? (
                              <span className="text-heineken-neon">{vendedor.nome}</span>
                            ) : (
                              vendedor.nome
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <Target className="h-4 w-4 mr-1 text-heineken" />
                              {vendedor.targetHits}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-bold">{vendedor.pontos}</TableCell>
                          <TableCell className="text-center">{renderizarIconeTendencia(vendedor.tendencia)}</TableCell>
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
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-heineken" />
                  Ranking de Filiais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead className="w-12 text-center">Pos.</TableHead>
                        <TableHead>Filial</TableHead>
                        <TableHead className="text-center">Vendedores</TableHead>
                        <TableHead className="text-right">Pontos</TableHead>
                        <TableHead className="w-12 text-center">Tendência</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filiaisMockData.map((filial, index) => (
                        <TableRow 
                          key={filial.id}
                          className={filial.nome === "SP Sul" ? "bg-heineken/10" : ""}
                        >
                          <TableCell className="text-center font-bold">
                            {index === 0 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-black">1</span>
                            ) : index === 1 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400 text-black">2</span>
                            ) : index === 2 ? (
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-600 text-black">3</span>
                            ) : (
                              filial.posicao
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {filial.nome === "SP Sul" ? (
                              <span className="text-heineken-neon">{filial.nome}</span>
                            ) : (
                              filial.nome
                            )}
                          </TableCell>
                          <TableCell className="text-center">{filial.vendedores}</TableCell>
                          <TableCell className="text-right font-bold">{filial.pontos}</TableCell>
                          <TableCell className="text-center">{renderizarIconeTendencia(filial.tendencia)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="historico">
            <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <History className="h-5 w-5 mr-2 text-heineken" />
                  Seu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="tactical-panel p-4">
                    <h3 className="text-xs text-tactical-silver mb-1">ALVOS ATINGIDOS</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-heineken" />
                        <span className="text-2xl font-bold text-heineken-neon">38</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                        +12% este mês
                      </span>
                    </div>
                  </div>
                  
                  <div className="tactical-panel p-4">
                    <h3 className="text-xs text-tactical-silver mb-1">PONTOS ACUMULADOS</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-heineken" />
                        <span className="text-2xl font-bold text-heineken-neon">1.120</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                        +320 este mês
                      </span>
                    </div>
                  </div>
                  
                  <div className="tactical-panel p-4">
                    <h3 className="text-xs text-tactical-silver mb-1">POSIÇÃO NO RANKING</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 mr-2 text-heineken" />
                        <span className="text-2xl font-bold text-heineken-neon">2º lugar</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded">
                        Estável
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">Histórico de Missões</h3>
                  <Select 
                    value={periodoHistorico} 
                    onValueChange={(value) => setPeriodoHistorico(value as "semana" | "mes" | "trimestre")}
                  >
                    <SelectTrigger className="w-32 bg-tactical-black border-heineken/20">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent className="bg-tactical-darkgray border-heineken/20">
                      <SelectItem value="semana">Últimos 7 dias</SelectItem>
                      <SelectItem value="mes">Último mês</SelectItem>
                      <SelectItem value="trimestre">Último trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border border-heineken/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-tactical-black">
                      <TableRow>
                        <TableHead>Missão</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {missoesFiltradas.length > 0 ? (
                        missoesFiltradas.map((missao) => (
                          <TableRow key={missao.id}>
                            <TableCell>
                              <div>
                                <span className="font-medium">{missao.titulo}</span>
                                <span className="block text-xs text-tactical-silver">{missao.cliente}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {format(missao.data, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>
                              {renderizarStatusMissao(missao.status)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8">
                            <Calendar className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                            <p className="text-tactical-silver">Nenhuma missão encontrada no período selecionado.</p>
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
