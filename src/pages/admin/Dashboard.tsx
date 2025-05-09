
import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/ui/stats-card";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Map as MapIcon,
  CheckSquare,
  ChartColumnStacked
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

// Dados simulados para filiais
interface Filial {
  id: number;
  nome: string;
  regiao: string;
  supervisor: string;
  vendedores: number;
  pdvs: number;
  conversoes: number;
  taxaSucesso: number;
}

const filiaisData: Filial[] = [
  { 
    id: 1, 
    nome: "São Paulo - Centro", 
    regiao: "Sudeste", 
    supervisor: "Roberto Almeida", 
    vendedores: 12, 
    pdvs: 340, 
    conversoes: 225, 
    taxaSucesso: 66 
  },
  { 
    id: 2, 
    nome: "São Paulo - Zona Sul", 
    regiao: "Sudeste", 
    supervisor: "Marina Silva", 
    vendedores: 8, 
    pdvs: 290, 
    conversoes: 188, 
    taxaSucesso: 65 
  },
  { 
    id: 3, 
    nome: "Rio de Janeiro - Centro", 
    regiao: "Sudeste", 
    supervisor: "Carlos Eduardo", 
    vendedores: 10, 
    pdvs: 320, 
    conversoes: 210, 
    taxaSucesso: 66 
  },
  { 
    id: 4, 
    nome: "Belo Horizonte", 
    regiao: "Sudeste", 
    supervisor: "Amanda Rocha", 
    vendedores: 7, 
    pdvs: 240, 
    conversoes: 155, 
    taxaSucesso: 65 
  },
  { 
    id: 5, 
    nome: "Campinas", 
    regiao: "Sudeste", 
    supervisor: "Leonardo Dias", 
    vendedores: 6, 
    pdvs: 180, 
    conversoes: 113, 
    taxaSucesso: 63 
  },
  { 
    id: 6, 
    nome: "Curitiba", 
    regiao: "Sul", 
    supervisor: "Juliana Porto", 
    vendedores: 5, 
    pdvs: 150, 
    conversoes: 98, 
    taxaSucesso: 65 
  },
  { 
    id: 7, 
    nome: "Porto Alegre", 
    regiao: "Sul", 
    supervisor: "Ricardo Moura", 
    vendedores: 6, 
    pdvs: 180, 
    conversoes: 111, 
    taxaSucesso: 62 
  }
];

// Calculando totais
const totalPDVs = filiaisData.reduce((acc, filial) => acc + filial.pdvs, 0);
const totalConversoes = filiaisData.reduce((acc, filial) => acc + filial.conversoes, 0);
const totalVendedores = filiaisData.reduce((acc, filial) => acc + filial.vendedores, 0);
const taxaMediaSucesso = filiaisData.reduce((acc, filial) => acc + filial.taxaSucesso, 0) / filiaisData.length;

const AdminDashboard = () => {
  const [filtroRegiao, setFiltroRegiao] = useState<string>("todas");
  const [filtroSupervisor, setFiltroSupervisor] = useState<string>("todos");
  const [filtroFilial, setFiltroFilial] = useState<string>("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("mes");
  const [filiaisFiltradas, setFiliaisFiltradas] = useState<Filial[]>(filiaisData);
  
  // Chart config com cores que seguem o branding do projeto
  const chartConfig = {
    pdvs: { color: "#00843D", label: "PDVs" },
    conversoes: { color: "#3EFF7F", label: "Conversões" },
    taxaSucesso: { color: "#FFD700", label: "Taxa %" }
  };
  
  // Função para aplicar todos os filtros
  const aplicarFiltros = () => {
    let resultado = [...filiaisData];
    
    if (filtroRegiao !== "todas") {
      resultado = resultado.filter(f => f.regiao === filtroRegiao);
    }
    
    if (filtroSupervisor !== "todos") {
      resultado = resultado.filter(f => f.supervisor === filtroSupervisor);
    }
    
    if (filtroFilial !== "todas") {
      resultado = resultado.filter(f => f.id === parseInt(filtroFilial));
    }
    
    setFiliaisFiltradas(resultado);
  };
  
  // Preparar dados para o gráfico
  const chartData = useMemo(() => {
    return filiaisFiltradas.map(filial => ({
      name: filial.nome.split(' - ')[0], // Nome abreviado para o gráfico
      pdvs: filial.pdvs,
      conversoes: filial.conversoes,
      taxaSucesso: filial.taxaSucesso
    }));
  }, [filiaisFiltradas]);

  // Lista única de supervisores para o filtro
  const supervisores = useMemo(() => {
    return [...new Set(filiaisData.map(filial => filial.supervisor))];
  }, []);
  
  useEffect(() => {
    document.title = "Dashboard Admin | Heineken SP SUL";
    aplicarFiltros();
  }, [filtroRegiao, filtroSupervisor, filtroFilial]);

  return (
    <DashboardLayout userType="admin" pageTitle="Dashboard Administrativo">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-tactical-fade">
        <StatsCard 
          title="Total de PDVs" 
          value={totalPDVs}
          icon={<Building2 />}
          trend={{ value: 5, label: "vs mês anterior", positive: true }}
        />
        <StatsCard 
          title="Conversões Totais" 
          value={totalConversoes}
          icon={<CheckSquare />}
          trend={{ value: 8, label: "vs mês anterior", positive: true }}
        />
        <StatsCard 
          title="Taxa de Sucesso Média" 
          value={`${taxaMediaSucesso.toFixed(1)}%`}
          icon={<TrendingUp />}
          trend={{ value: 2, label: "vs mês anterior", positive: true }}
        />
        <StatsCard 
          title="Total de Vendedores" 
          value={totalVendedores}
          icon={<Users />}
          trend={{ value: 4, label: "vs mês anterior", positive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 lg:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Filtros</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-heineken text-heineken-neon hover:bg-heineken/20"
                onClick={() => {
                  setFiltroRegiao("todas");
                  setFiltroSupervisor("todos");
                  setFiltroFilial("todas");
                  setFiltroPeriodo("mes");
                }}
              >
                Limpar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Estado</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroRegiao(e.target.value)}
                value={filtroRegiao}
              >
                <option value="todas">Todos</option>
                <option value="Sudeste">São Paulo</option>
                <option value="Sul">Rio Grande do Sul</option>
                <option value="Nordeste">Bahia</option>
                <option value="Norte">Pará</option>
                <option value="Centro-Oeste">Goiás</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Filial</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroFilial(e.target.value)}
                value={filtroFilial}
              >
                <option value="todas">Todas</option>
                {filiaisData.map(filial => (
                  <option key={filial.id} value={filial.id}>{filial.nome}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Supervisor</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroSupervisor(e.target.value)}
                value={filtroSupervisor}
              >
                <option value="todos">Todos</option>
                {supervisores.map((supervisor, idx) => (
                  <option key={idx} value={supervisor}>{supervisor}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Período</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroPeriodo(e.target.value)}
                value={filtroPeriodo}
              >
                <option value="semana">Última semana</option>
                <option value="mes">Último mês</option>
                <option value="trimestre">Último trimestre</option>
                <option value="ano">Último ano</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30 lg:col-span-2">
          <CardHeader className="border-b border-heineken/10 pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ChartColumnStacked className="text-heineken-neon" />
              Desempenho por Filial
            </CardTitle>
            <CardDescription>
              {filtroRegiao === "todas" 
                ? "Exibindo todos os estados" 
                : `Exibindo filiais do estado: ${filtroRegiao}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 15, right: 30, left: 5, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#ccc', fontSize: 11 }} 
                      tickLine={{ stroke: '#4b5563' }}
                      axisLine={{ stroke: '#4b5563' }}
                      height={40}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fill: '#ccc' }} 
                      tickLine={{ stroke: '#4b5563' }}
                      axisLine={{ stroke: '#4b5563' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      domain={[0, 100]}
                      tick={{ fill: '#ccc' }} 
                      tickLine={{ stroke: '#4b5563' }}
                      axisLine={{ stroke: '#4b5563' }}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(0, 132, 61, 0.1)'}}
                      contentStyle={{ 
                        backgroundColor: '#1A1F2C', 
                        border: '1px solid rgba(0, 132, 61, 0.3)',
                        borderRadius: '4px'
                      }}
                      content={<ChartTooltipContent labelClassName="text-heineken-neon" />}
                    />
                    <Legend 
                      wrapperStyle={{ 
                        paddingTop: '10px',
                        fontSize: '12px'
                      }} 
                    />
                    <Bar 
                      yAxisId="left"
                      dataKey="pdvs" 
                      name="PDVs"
                      fill="#00843D" 
                      radius={[4, 4, 0, 0]}
                      className="opacity-90 hover:opacity-100"
                    />
                    <Bar 
                      yAxisId="left"
                      dataKey="conversoes" 
                      name="Conversões"
                      fill="#3EFF7F" 
                      radius={[4, 4, 0, 0]}
                      className="opacity-90 hover:opacity-100"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="taxaSucesso" 
                      name="Taxa de Sucesso (%)"
                      fill="#FFD700" 
                      radius={[4, 4, 0, 0]}
                      className="opacity-90 hover:opacity-100"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-tactical-silver">
                  <BarChart3 className="h-16 w-16 text-heineken-neon/40 mx-auto mb-3" />
                  <p>Nenhum dado disponível para os filtros selecionados</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Ranking de Filiais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-heineken/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-tactical-black">
                  <TableRow>
                    <TableHead className="w-12 text-center">Pos.</TableHead>
                    <TableHead>Filial</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead className="text-center">PDVs</TableHead>
                    <TableHead className="text-center">Conversões</TableHead>
                    <TableHead className="text-center">Taxa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filiaisFiltradas
                    .sort((a, b) => b.taxaSucesso - a.taxaSucesso)
                    .map((filial, index) => (
                      <TableRow key={filial.id}>
                        <TableCell className="text-center font-bold">
                          <span className={
                            index === 0 ? "text-tactical-gold" :
                            index === 1 ? "text-tactical-silver" :
                            index === 2 ? "text-tactical-bronze" : ""
                          }>
                            {index + 1}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">{filial.nome}</span>
                            <span className="block text-xs text-tactical-silver">{filial.regiao}</span>
                          </div>
                        </TableCell>
                        <TableCell>{filial.supervisor}</TableCell>
                        <TableCell className="text-center">{filial.pdvs}</TableCell>
                        <TableCell className="text-center">{filial.conversoes}</TableCell>
                        <TableCell className="text-center">
                          <span className={
                            filial.taxaSucesso >= 65 ? "text-heineken-neon" :
                            filial.taxaSucesso >= 60 ? "text-tactical-gold" :
                            "text-tactical-silver"
                          }>
                            {filial.taxaSucesso}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição Geográfica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] tactical-panel relative overflow-hidden rounded">
              <div className="absolute inset-0 flex items-center justify-center bg-tactical-black/70">
                <div className="text-center">
                  <MapIcon className="h-12 w-12 text-heineken-neon mx-auto mb-2" />
                  <p className="text-heineken-neon">Mapa de PDVs por Região</p>
                  <p className="text-sm text-tactical-silver mt-2">
                    {filtroRegiao === "todas" 
                      ? "Visualizando todas as regiões" 
                      : `Visualizando região ${filtroRegiao}`
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
