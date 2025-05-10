
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { DownloadIcon, FilterIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipos para os dados dos gráficos
interface RegionData {
  name: string;
  vendas: number;
  conversoes: number;
  missoes: number;
}

interface PerformanceData {
  name: string;
  previsto: number;
  realizado: number;
}

interface UserPerformanceData {
  name: string;
  vendedor: number;
  supervisor: number;
}

const AdminAnalytics = () => {
  // Dados simulados para os gráficos
  const [regionData] = useState<RegionData[]>([
    { name: "Zona Sul", vendas: 423110, conversoes: 87, missoes: 124 },
    { name: "Zona Oeste", vendas: 210500, conversoes: 65, missoes: 98 },
    { name: "Centro", vendas: 180320, conversoes: 42, missoes: 102 },
    { name: "Zona Norte", vendas: 142300, conversoes: 38, missoes: 118 },
    { name: "Zona Leste", vendas: 100090, conversoes: 25, missoes: 100 }
  ]);

  const [performanceData] = useState<PerformanceData[]>([
    { name: "Jan", previsto: 150000, realizado: 165000 },
    { name: "Fev", previsto: 200000, realizado: 190000 },
    { name: "Mar", previsto: 180000, realizado: 195000 },
    { name: "Abr", previsto: 210000, realizado: 220000 },
    { name: "Mai", previsto: 250000, realizado: 240000 }
  ]);

  const [userPerformanceData] = useState<UserPerformanceData[]>([
    { name: "Zona Sul", vendedor: 87, supervisor: 92 },
    { name: "Zona Oeste", vendedor: 65, supervisor: 72 },
    { name: "Centro", vendedor: 42, supervisor: 55 },
    { name: "Zona Norte", vendedor: 38, supervisor: 45 },
    { name: "Zona Leste", vendedor: 25, supervisor: 40 }
  ]);

  // Função para formatar valores em R$
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Função para exportar dados (simulada)
  const handleExport = (exportType: string) => {
    console.log(`Exportando dados em formato ${exportType}`);
    // Implementação simulada
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-heineken">Analytics</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="text-tactical-silver border-tactical-silver hover:text-white"
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button 
            onClick={() => handleExport('excel')}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button 
            onClick={() => handleExport('pdf')}
            className="bg-red-700 hover:bg-red-600 text-white"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Gráficos Principais por Região */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Desempenho por Região</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                <YAxis tick={{ fill: '#ccc' }} />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === "vendas") return formatCurrency(value);
                    return value;
                  }}
                  contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                  labelStyle={{ color: '#ccc' }}
                />
                <Legend wrapperStyle={{ color: '#ccc' }} />
                <Bar dataKey="vendas" name="Vendas (R$)" fill="#8eff00" />
                <Bar dataKey="conversoes" name="Conversões" fill="#28a745" />
                <Bar dataKey="missoes" name="Missões Concluídas" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Análise Comparativa por Período */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Análise Comparativa por Período</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales" className="w-full">
            <TabsList className="bg-tactical-black mb-4">
              <TabsTrigger value="sales" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                Vendas
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                    <YAxis tick={{ fill: '#ccc' }} />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                      labelStyle={{ color: '#ccc' }}
                    />
                    <Legend wrapperStyle={{ color: '#ccc' }} />
                    <Line type="monotone" dataKey="previsto" name="Meta" stroke="#ffc107" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="realizado" name="Realizado" stroke="#8eff00" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                    <YAxis tick={{ fill: '#ccc' }} />
                    <Tooltip 
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }}
                      labelStyle={{ color: '#ccc' }}
                    />
                    <Legend wrapperStyle={{ color: '#ccc' }} />
                    <Bar dataKey="vendedor" name="Vendedores" fill="#8eff00" />
                    <Bar dataKey="supervisor" name="Supervisores" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Resumo de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-tactical-silver">
              Progresso de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heineken-neon">87%</div>
            <p className="text-xs text-tactical-silver mt-1">Em relação à meta mensal</p>
            <div className="w-full bg-tactical-black h-2 rounded-full mt-3">
              <div className="bg-heineken h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-tactical-silver">
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heineken-neon">62%</div>
            <p className="text-xs text-tactical-silver mt-1">PDVs convertidos este mês</p>
            <div className="w-full bg-tactical-black h-2 rounded-full mt-3">
              <div className="bg-heineken h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-tactical-silver">
              Missões Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heineken-neon">73%</div>
            <p className="text-xs text-tactical-silver mt-1">Total de missões concluídas</p>
            <div className="w-full bg-tactical-black h-2 rounded-full mt-3">
              <div className="bg-heineken h-2 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
