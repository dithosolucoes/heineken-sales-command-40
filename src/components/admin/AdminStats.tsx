
import { useState } from "react";
import StatsCard from "@/components/ui/stats-card";
import { Building, Users, MapPin, CheckCircle, Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminStats = () => {
  // Dados simulados para o dashboard
  const [statsData] = useState({
    totalPDVs: 542,
    totalFiliais: 4,
    totalSupervisores: 12,
    missionsCompleted: 857
  });

  // Dados simulados para gráficos por região
  const [regionData] = useState([
    { name: "Zona Sul", pontos: 423, conversoes: 87, pdvs: 124 },
    { name: "Zona Oeste", pontos: 325, conversoes: 65, pdvs: 98 },
    { name: "Centro", pontos: 280, conversoes: 42, pdvs: 102 },
    { name: "Zona Norte", pontos: 210, conversoes: 38, pdvs: 118 },
    { name: "Zona Leste", pontos: 175, conversoes: 25, pdvs: 100 }
  ]);

  // Dados simulados para rankings
  const [topFiliais] = useState([
    { id: 1, nome: "São Paulo - Capital", pontos: 4350, conversao: "78%" },
    { id: 2, nome: "ABC Paulista", pontos: 3200, conversao: "72%" },
    { id: 3, nome: "Campinas", pontos: 2800, conversao: "70%" },
    { id: 4, nome: "Litoral", pontos: 2100, conversao: "68%" },
    { id: 5, nome: "Sorocaba", pontos: 1850, conversao: "65%" }
  ]);

  const [topSupervisores] = useState([
    { id: 1, nome: "Carlos Oliveira", filial: "São Paulo - Capital", pontos: 1240, conversao: "82%" },
    { id: 2, nome: "Ana Silva", filial: "ABC Paulista", pontos: 1180, conversao: "79%" },
    { id: 3, nome: "Roberto Santos", filial: "São Paulo - Capital", pontos: 1050, conversao: "75%" },
    { id: 4, nome: "Luciana Costa", filial: "Campinas", pontos: 980, conversao: "73%" },
    { id: 5, nome: "Márcio Pereira", filial: "São Paulo - Capital", pontos: 920, conversao: "70%" }
  ]);

  const [topVendedores] = useState([
    { id: 1, nome: "João Silva", supervisor: "Carlos Oliveira", pontos: 320, conversao: "85%" },
    { id: 2, nome: "Maria Santos", supervisor: "Ana Silva", pontos: 305, conversao: "83%" },
    { id: 3, nome: "Pedro Almeida", supervisor: "Roberto Santos", pontos: 290, conversao: "81%" },
    { id: 4, nome: "Camila Lima", supervisor: "Carlos Oliveira", pontos: 275, conversao: "79%" },
    { id: 5, nome: "Lucas Martins", supervisor: "Luciana Costa", pontos: 260, conversao: "77%" }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-heineken">Dashboard Administrativo</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Filiais" 
          value={statsData.totalFiliais} 
          icon={<Building />} 
          trend={{ value: 5, label: "novas este mês", positive: true }}
        />
        <StatsCard 
          title="Supervisores" 
          value={statsData.totalSupervisores} 
          icon={<Users />} 
          trend={{ value: 2, label: "novos este mês", positive: true }}
        />
        <StatsCard 
          title="PDVs" 
          value={statsData.totalPDVs} 
          icon={<MapPin />} 
          trend={{ value: 8, label: "novos este mês", positive: true }}
        />
        <StatsCard 
          title="Missões Concluídas" 
          value={statsData.missionsCompleted} 
          icon={<CheckCircle />} 
          trend={{ value: 12, label: "este mês", positive: true }}
        />
      </div>

      {/* Gráfico de Desempenho por Região - Melhorado */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Desempenho por Região</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
                barGap={8}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#ccc' }} 
                  tickLine={{ stroke: '#555' }}
                  axisLine={{ stroke: '#555' }}
                />
                <YAxis 
                  tick={{ fill: '#ccc' }} 
                  tickLine={{ stroke: '#555' }}
                  axisLine={{ stroke: '#555' }}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "pontos") return [`${value} pontos`, "Pontos"];
                    if (name === "conversoes") return [`${value}%`, "Conversões"];
                    if (name === "pdvs") return [`${value}`, "PDVs"];
                    return [value, name];
                  }}
                  contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                  labelStyle={{ color: '#ccc', fontWeight: 'bold' }}
                  itemStyle={{ padding: '4px 0' }}
                />
                <Legend 
                  wrapperStyle={{ color: '#ccc', paddingTop: '15px' }} 
                  iconType="circle"
                  iconSize={10}
                />
                <Bar 
                  dataKey="pontos" 
                  name="Pontos" 
                  fill="#8eff00" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="conversoes" 
                  name="Conversões (%)" 
                  fill="#28a745" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="pdvs" 
                  name="PDVs" 
                  fill="#007bff" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Resumo de Metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <div className="text-6xl font-bold text-heineken-neon">68%</div>
            </div>
            <p className="text-sm text-center text-tactical-silver">
              Meta mensal: 70% | Progresso: 97%
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Progresso de Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-tactical-silver">Zona Sul</span>
                  <span className="text-sm text-heineken-neon">92%</span>
                </div>
                <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                  <div className="bg-heineken h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-tactical-silver">Zona Oeste</span>
                  <span className="text-sm text-heineken-neon">78%</span>
                </div>
                <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                  <div className="bg-heineken h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-tactical-silver">Centro</span>
                  <span className="text-sm text-heineken-neon">65%</span>
                </div>
                <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                  <div className="bg-heineken h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Novo Bloco de Ranking - Agora com tabelas completas */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white flex items-center">
            <Trophy size={20} className="mr-2 text-heineken" />
            Ranking Consolidado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="filiais" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-tactical-black">
              <TabsTrigger value="filiais" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                <Building size={16} className="mr-2" />
                Filiais
              </TabsTrigger>
              <TabsTrigger value="supervisores" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                <Users size={16} className="mr-2" />
                Supervisores
              </TabsTrigger>
              <TabsTrigger value="vendedores" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                <Medal size={16} className="mr-2" />
                Vendedores
              </TabsTrigger>
            </TabsList>

            {/* Tab de Filiais */}
            <TabsContent value="filiais">
              <div className="rounded-md border border-heineken/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-tactical-black">
                    <TableRow className="border-heineken/20 hover:bg-transparent">
                      <TableHead className="text-tactical-silver w-16">#</TableHead>
                      <TableHead className="text-tactical-silver">Filial</TableHead>
                      <TableHead className="text-tactical-silver text-right">Pontos</TableHead>
                      <TableHead className="text-tactical-silver text-right">Conversão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topFiliais.map((filial, index) => (
                      <TableRow 
                        key={filial.id} 
                        className={`border-heineken/10 hover:bg-tactical-black/50 ${index < 3 ? 'bg-heineken/5' : ''}`}
                      >
                        <TableCell className={`text-center font-bold ${
                          index === 0 ? 'text-[#FFD700]' : 
                          index === 1 ? 'text-[#C0C0C0]' : 
                          index === 2 ? 'text-[#CD7F32]' : 
                          'text-white'
                        }`}>
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-heineken-neon">
                          {filial.nome}
                        </TableCell>
                        <TableCell className="text-right font-bold">{filial.pontos.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-heineken">{filial.conversao}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-center mt-4">
                <a 
                  href="/admin/ranking" 
                  className="text-sm text-heineken hover:underline inline-flex items-center"
                >
                  Ver ranking completo de filiais
                  <span className="ml-1">→</span>
                </a>
              </div>
            </TabsContent>

            {/* Tab de Supervisores */}
            <TabsContent value="supervisores">
              <div className="rounded-md border border-heineken/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-tactical-black">
                    <TableRow className="border-heineken/20 hover:bg-transparent">
                      <TableHead className="text-tactical-silver w-16">#</TableHead>
                      <TableHead className="text-tactical-silver">Supervisor</TableHead>
                      <TableHead className="text-tactical-silver">Filial</TableHead>
                      <TableHead className="text-tactical-silver text-right">Pontos</TableHead>
                      <TableHead className="text-tactical-silver text-right">Conversão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSupervisores.map((supervisor, index) => (
                      <TableRow 
                        key={supervisor.id} 
                        className={`border-heineken/10 hover:bg-tactical-black/50 ${index < 3 ? 'bg-heineken/5' : ''}`}
                      >
                        <TableCell className={`text-center font-bold ${
                          index === 0 ? 'text-[#FFD700]' : 
                          index === 1 ? 'text-[#C0C0C0]' : 
                          index === 2 ? 'text-[#CD7F32]' : 
                          'text-white'
                        }`}>
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-heineken-neon">
                          {supervisor.nome}
                        </TableCell>
                        <TableCell>{supervisor.filial}</TableCell>
                        <TableCell className="text-right font-bold">{supervisor.pontos.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-heineken">{supervisor.conversao}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-center mt-4">
                <a 
                  href="/admin/ranking" 
                  className="text-sm text-heineken hover:underline inline-flex items-center"
                >
                  Ver ranking completo de supervisores
                  <span className="ml-1">→</span>
                </a>
              </div>
            </TabsContent>

            {/* Tab de Vendedores */}
            <TabsContent value="vendedores">
              <div className="rounded-md border border-heineken/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-tactical-black">
                    <TableRow className="border-heineken/20 hover:bg-transparent">
                      <TableHead className="text-tactical-silver w-16">#</TableHead>
                      <TableHead className="text-tactical-silver">Vendedor</TableHead>
                      <TableHead className="text-tactical-silver">Supervisor</TableHead>
                      <TableHead className="text-tactical-silver text-right">Pontos</TableHead>
                      <TableHead className="text-tactical-silver text-right">Conversão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topVendedores.map((vendedor, index) => (
                      <TableRow 
                        key={vendedor.id} 
                        className={`border-heineken/10 hover:bg-tactical-black/50 ${index < 3 ? 'bg-heineken/5' : ''}`}
                      >
                        <TableCell className={`text-center font-bold ${
                          index === 0 ? 'text-[#FFD700]' : 
                          index === 1 ? 'text-[#C0C0C0]' : 
                          index === 2 ? 'text-[#CD7F32]' : 
                          'text-white'
                        }`}>
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-heineken-neon">
                          {vendedor.nome}
                        </TableCell>
                        <TableCell>{vendedor.supervisor}</TableCell>
                        <TableCell className="text-right font-bold">{vendedor.pontos}</TableCell>
                        <TableCell className="text-right text-heineken">{vendedor.conversao}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-center mt-4">
                <a 
                  href="/admin/ranking" 
                  className="text-sm text-heineken hover:underline inline-flex items-center"
                >
                  Ver ranking completo de vendedores
                  <span className="ml-1">→</span>
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
