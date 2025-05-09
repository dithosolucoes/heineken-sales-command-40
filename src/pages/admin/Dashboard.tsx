
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
  const [filiaisFiltradas, setFiliaisFiltradas] = useState<Filial[]>(filiaisData);
  
  // Chart config com cores
  const chartConfig = {
    pdvs: { color: "#10b981", label: "PDVs" },
    conversoes: { color: "#f59e0b", label: "Conversões" },
    taxaSucesso: { color: "#6366f1", label: "Taxa %" }
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
  
  useEffect(() => {
    document.title = "Dashboard Admin | Heineken SP SUL";
    
    if (filtroRegiao === "todas") {
      setFiliaisFiltradas(filiaisData);
    } else {
      setFiliaisFiltradas(filiaisData.filter(f => f.regiao === filtroRegiao));
    }
  }, [filtroRegiao]);

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
                onClick={() => setFiltroRegiao("todas")}
              >
                Limpar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Região</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroRegiao(e.target.value)}
                value={filtroRegiao}
              >
                <option value="todas">Todas</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Norte">Norte</option>
                <option value="Centro-Oeste">Centro-Oeste</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Filial</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                defaultValue="todas"
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
                defaultValue="todos"
              >
                <option value="todos">Todos</option>
                {filiaisData.map(filial => (
                  <option key={filial.id} value={filial.supervisor}>{filial.supervisor}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Período</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                defaultValue="mes"
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
          <CardHeader>
            <CardTitle className="text-lg">Desempenho por Filial</CardTitle>
            <CardDescription>
              {filtroRegiao === "todas" 
                ? "Exibindo todas as filiais" 
                : `Exibindo filiais da região ${filtroRegiao}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#9ca3af' }} 
                    tickLine={{ stroke: '#4b5563' }}
                    axisLine={{ stroke: '#4b5563' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#9ca3af' }} 
                    tickLine={{ stroke: '#4b5563' }}
                    axisLine={{ stroke: '#4b5563' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    domain={[0, 100]}
                    tick={{ fill: '#9ca3af' }} 
                    tickLine={{ stroke: '#4b5563' }}
                    axisLine={{ stroke: '#4b5563' }}
                  />
                  <Tooltip 
                    content={<ChartTooltipContent labelClassName="text-white" />}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  <Bar 
                    yAxisId="left"
                    dataKey="pdvs" 
                    name="PDVs"
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="conversoes" 
                    name="Conversões"
                    fill="#f59e0b" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="taxaSucesso" 
                    name="Taxa de Sucesso (%)"
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
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
