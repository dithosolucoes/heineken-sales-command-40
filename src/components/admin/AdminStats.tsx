
import { useState } from "react";
import StatsCard from "@/components/ui/stats-card";
import { Building, Users, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    </div>
  );
};

export default AdminStats;
