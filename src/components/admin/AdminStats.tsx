
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
    { id: 3, nome: "Campinas", pontos: 2800, conversao: "70%" }
  ]);

  const [topSupervisores] = useState([
    { id: 1, nome: "Carlos Oliveira", filial: "São Paulo - Capital", pontos: 1240, conversao: "82%" },
    { id: 2, nome: "Ana Silva", filial: "ABC Paulista", pontos: 1180, conversao: "79%" },
    { id: 3, nome: "Roberto Santos", filial: "São Paulo - Capital", pontos: 1050, conversao: "75%" }
  ]);

  const [topVendedores] = useState([
    { id: 1, nome: "João Silva", supervisor: "Carlos Oliveira", pontos: 320, conversao: "85%" },
    { id: 2, nome: "Maria Santos", supervisor: "Ana Silva", pontos: 305, conversao: "83%" },
    { id: 3, nome: "Pedro Almeida", supervisor: "Roberto Santos", pontos: 290, conversao: "81%" }
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

      {/* Novo Bloco de Ranking */}
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
              <div className="grid grid-cols-1 gap-4">
                {/* Pódio */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Top 3 Filiais em formato de pódio */}
                  <div className="flex items-end justify-center h-52 space-x-2 flex-1">
                    {/* 2º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-tactical-black border-2 border-[#C0C0C0] flex items-center justify-center mb-2">
                        <Trophy size={32} className="text-[#C0C0C0]" />
                      </div>
                      <div className="w-20 h-28 bg-tactical-black/50 border-t-2 border-[#C0C0C0] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#C0C0C0] font-bold">2º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topFiliais[1].nome}</span>
                        <span className="text-[#C0C0C0] text-xs mt-1">{topFiliais[1].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 1º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-tactical-black border-2 border-[#FFD700] flex items-center justify-center mb-2">
                        <Trophy size={40} className="text-[#FFD700]" />
                      </div>
                      <div className="w-24 h-36 bg-tactical-black/50 border-t-2 border-[#FFD700] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#FFD700] font-bold text-lg">1º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topFiliais[0].nome}</span>
                        <span className="text-[#FFD700] text-xs mt-1">{topFiliais[0].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 3º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full bg-tactical-black border-2 border-[#CD7F32] flex items-center justify-center mb-2">
                        <Trophy size={28} className="text-[#CD7F32]" />
                      </div>
                      <div className="w-18 h-24 bg-tactical-black/50 border-t-2 border-[#CD7F32] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#CD7F32] font-bold">3º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topFiliais[2].nome}</span>
                        <span className="text-[#CD7F32] text-xs mt-1">{topFiliais[2].pontos} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas adicionais */}
                  <div className="flex-1 bg-tactical-black/30 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-heineken mb-4">Estatísticas Top 3 Filiais</h4>
                    <div className="space-y-3">
                      {topFiliais.map((filial, index) => (
                        <div key={filial.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white">
                              {index === 0 && <Award size={14} className="inline mr-1 text-[#FFD700]" />}
                              {index === 1 && <Award size={14} className="inline mr-1 text-[#C0C0C0]" />}
                              {index === 2 && <Award size={14} className="inline mr-1 text-[#CD7F32]" />}
                              {filial.nome}
                            </span>
                            <span className="text-sm text-tactical-silver">{filial.conversao}</span>
                          </div>
                          <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-[#FFD700]' : 
                                index === 1 ? 'bg-[#C0C0C0]' : 
                                'bg-[#CD7F32]'
                              }`} 
                              style={{ width: filial.conversao }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Link para relatório completo */}
                <div className="text-center">
                  <a 
                    href="/admin/ranking" 
                    className="text-sm text-heineken hover:underline inline-flex items-center"
                  >
                    Ver ranking completo de filiais
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* Tab de Supervisores */}
            <TabsContent value="supervisores">
              <div className="grid grid-cols-1 gap-4">
                {/* Pódio */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Top 3 Supervisores em formato de pódio */}
                  <div className="flex items-end justify-center h-52 space-x-2 flex-1">
                    {/* 2º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-tactical-black border-2 border-[#C0C0C0] flex items-center justify-center mb-2">
                        <Users size={32} className="text-[#C0C0C0]" />
                      </div>
                      <div className="w-20 h-28 bg-tactical-black/50 border-t-2 border-[#C0C0C0] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#C0C0C0] font-bold">2º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topSupervisores[1].nome}</span>
                        <span className="text-[#C0C0C0] text-xs mt-1">{topSupervisores[1].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 1º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-tactical-black border-2 border-[#FFD700] flex items-center justify-center mb-2">
                        <Users size={40} className="text-[#FFD700]" />
                      </div>
                      <div className="w-24 h-36 bg-tactical-black/50 border-t-2 border-[#FFD700] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#FFD700] font-bold text-lg">1º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topSupervisores[0].nome}</span>
                        <span className="text-[#FFD700] text-xs mt-1">{topSupervisores[0].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 3º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full bg-tactical-black border-2 border-[#CD7F32] flex items-center justify-center mb-2">
                        <Users size={28} className="text-[#CD7F32]" />
                      </div>
                      <div className="w-18 h-24 bg-tactical-black/50 border-t-2 border-[#CD7F32] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#CD7F32] font-bold">3º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topSupervisores[2].nome}</span>
                        <span className="text-[#CD7F32] text-xs mt-1">{topSupervisores[2].pontos} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas adicionais */}
                  <div className="flex-1 bg-tactical-black/30 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-heineken mb-4">Estatísticas Top 3 Supervisores</h4>
                    <div className="space-y-3">
                      {topSupervisores.map((supervisor, index) => (
                        <div key={supervisor.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white">
                              {index === 0 && <Award size={14} className="inline mr-1 text-[#FFD700]" />}
                              {index === 1 && <Award size={14} className="inline mr-1 text-[#C0C0C0]" />}
                              {index === 2 && <Award size={14} className="inline mr-1 text-[#CD7F32]" />}
                              {supervisor.nome}
                            </span>
                            <span className="text-sm text-tactical-silver">{supervisor.conversao}</span>
                          </div>
                          <div className="flex justify-between text-xs text-tactical-silver mb-1">
                            <span>{supervisor.filial}</span>
                          </div>
                          <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-[#FFD700]' : 
                                index === 1 ? 'bg-[#C0C0C0]' : 
                                'bg-[#CD7F32]'
                              }`} 
                              style={{ width: supervisor.conversao }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Link para relatório completo */}
                <div className="text-center">
                  <a 
                    href="/admin/ranking" 
                    className="text-sm text-heineken hover:underline inline-flex items-center"
                  >
                    Ver ranking completo de supervisores
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* Tab de Vendedores */}
            <TabsContent value="vendedores">
              <div className="grid grid-cols-1 gap-4">
                {/* Pódio */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Top 3 Vendedores em formato de pódio */}
                  <div className="flex items-end justify-center h-52 space-x-2 flex-1">
                    {/* 2º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-tactical-black border-2 border-[#C0C0C0] flex items-center justify-center mb-2">
                        <Medal size={32} className="text-[#C0C0C0]" />
                      </div>
                      <div className="w-20 h-28 bg-tactical-black/50 border-t-2 border-[#C0C0C0] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#C0C0C0] font-bold">2º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topVendedores[1].nome}</span>
                        <span className="text-[#C0C0C0] text-xs mt-1">{topVendedores[1].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 1º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-tactical-black border-2 border-[#FFD700] flex items-center justify-center mb-2">
                        <Medal size={40} className="text-[#FFD700]" />
                      </div>
                      <div className="w-24 h-36 bg-tactical-black/50 border-t-2 border-[#FFD700] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#FFD700] font-bold text-lg">1º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topVendedores[0].nome}</span>
                        <span className="text-[#FFD700] text-xs mt-1">{topVendedores[0].pontos} pts</span>
                      </div>
                    </div>
                    
                    {/* 3º lugar */}
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full bg-tactical-black border-2 border-[#CD7F32] flex items-center justify-center mb-2">
                        <Medal size={28} className="text-[#CD7F32]" />
                      </div>
                      <div className="w-18 h-24 bg-tactical-black/50 border-t-2 border-[#CD7F32] flex flex-col items-center justify-center rounded-t-md">
                        <span className="text-[#CD7F32] font-bold">3º</span>
                        <span className="text-xs text-white text-center mt-1 px-1">{topVendedores[2].nome}</span>
                        <span className="text-[#CD7F32] text-xs mt-1">{topVendedores[2].pontos} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas adicionais */}
                  <div className="flex-1 bg-tactical-black/30 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-heineken mb-4">Estatísticas Top 3 Vendedores</h4>
                    <div className="space-y-3">
                      {topVendedores.map((vendedor, index) => (
                        <div key={vendedor.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white">
                              {index === 0 && <Award size={14} className="inline mr-1 text-[#FFD700]" />}
                              {index === 1 && <Award size={14} className="inline mr-1 text-[#C0C0C0]" />}
                              {index === 2 && <Award size={14} className="inline mr-1 text-[#CD7F32]" />}
                              {vendedor.nome}
                            </span>
                            <span className="text-sm text-tactical-silver">{vendedor.conversao}</span>
                          </div>
                          <div className="flex justify-between text-xs text-tactical-silver mb-1">
                            <span>Sup: {vendedor.supervisor}</span>
                          </div>
                          <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-[#FFD700]' : 
                                index === 1 ? 'bg-[#C0C0C0]' : 
                                'bg-[#CD7F32]'
                              }`} 
                              style={{ width: vendedor.conversao }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Link para relatório completo */}
                <div className="text-center">
                  <a 
                    href="/admin/ranking" 
                    className="text-sm text-heineken hover:underline inline-flex items-center"
                  >
                    Ver ranking completo de vendedores
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;

