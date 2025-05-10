
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, BarChart3, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

// Dados de exemplo para vendedores
const vendedoresData = {
  1001: { 
    nome: "Pedro Souza", 
    supervisor: "Carlos Silva", 
    supervisorId: 101,
    filial: "São Paulo - Capital",
    filialId: 1,
    pdvs: 22,
    vendasTotal: "R$ 38.450,00",
    missoesConcluidas: 18, 
    metaMensal: 20,
    conversao: "76%"
  },
  1002: { 
    nome: "Tatiana Alves", 
    supervisor: "Carlos Silva", 
    supervisorId: 101,
    filial: "São Paulo - Capital",
    filialId: 1,
    pdvs: 20,
    vendasTotal: "R$ 35.780,00",
    missoesConcluidas: 16, 
    metaMensal: 20,
    conversao: "74%"
  },
  // ... dados para outros vendedores
};

// Dados de exemplo para o gráfico de desempenho
const getDesempenhoData = (vendedorId: string) => [
  { nome: "Jan", vendas: 5800, conversoes: 74 },
  { nome: "Fev", vendas: 6200, conversoes: 75 },
  { nome: "Mar", vendas: 6100, conversoes: 73 },
  { nome: "Abr", vendas: 6500, conversoes: 76 },
  { nome: "Mai", vendas: 6700, conversoes: 77 },
  { nome: "Jun", vendas: 7150, conversoes: 78 }
];

// Dados de exemplo para missões
const getMissoesData = (vendedorId: string) => [
  { nome: "Semana 1", concluidas: 4, total: 5 },
  { nome: "Semana 2", concluidas: 5, total: 5 },
  { nome: "Semana 3", concluidas: 3, total: 5 },
  { nome: "Semana 4", concluidas: 6, total: 5 }
];

// Dados de exemplo para PDVs do vendedor
const getPdvsVendedor = (vendedorId: string) => [
  { id: 1, nome: "Bar do Zé", bairro: "Centro", conversao: "Sim", vendasMes: "R$ 2.450,00" },
  { id: 2, nome: "Mercearia Central", bairro: "Jardins", conversao: "Sim", vendasMes: "R$ 3.120,00" },
  { id: 3, nome: "Mercado São Paulo", bairro: "Pinheiros", conversao: "Sim", vendasMes: "R$ 2.870,00" },
  { id: 4, nome: "Conveniência Express", bairro: "Vila Mariana", conversao: "Não", vendasMes: "R$ 1.950,00" },
  { id: 5, nome: "Adega 24h", bairro: "Itaim", conversao: "Sim", vendasMes: "R$ 3.540,00" }
];

const AdminVendedorDetalhe = () => {
  const { vendedorId } = useParams();
  const navigate = useNavigate();
  const [vendedor, setVendedor] = useState<any>(null);
  const [desempenhoData, setDesempenhoData] = useState<any[]>([]);
  const [missoesData, setMissoesData] = useState<any[]>([]);
  const [pdvsList, setPdvsList] = useState<any[]>([]);
  
  useEffect(() => {
    if (vendedorId && vendedoresData[vendedorId as keyof typeof vendedoresData]) {
      setVendedor(vendedoresData[vendedorId as keyof typeof vendedoresData]);
      setDesempenhoData(getDesempenhoData(vendedorId));
      setMissoesData(getMissoesData(vendedorId));
      setPdvsList(getPdvsVendedor(vendedorId));
      
      document.title = `Vendedor: ${vendedoresData[vendedorId as keyof typeof vendedoresData].nome} | Admin | Heineken SP SUL`;
    } else {
      navigate("/admin/filiais");
    }
  }, [vendedorId, navigate]);
  
  if (!vendedor) {
    return <div>Carregando...</div>;
  }
  
  return (
    <DashboardLayout userType="admin" pageTitle={`Vendedor: ${vendedor.nome}`}>
      <div className="px-4 py-2 container mx-auto">
        {/* Info do vendedor */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <User size={20} className="mr-2 text-heineken" />
              Informações do Vendedor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="mb-2">
                  <span className="text-tactical-silver">Supervisor:</span>
                  <span className="text-white font-medium ml-2">{vendedor.supervisor}</span>
                </div>
                <div>
                  <span className="text-tactical-silver">Filial:</span>
                  <span className="text-white font-medium ml-2">{vendedor.filial}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-tactical-silver text-sm">PDVs</p>
                  <p className="text-2xl font-bold text-white">{vendedor.pdvs}</p>
                </div>
                <div>
                  <p className="text-tactical-silver text-sm">Vendas</p>
                  <p className="text-2xl font-bold text-heineken">{vendedor.vendasTotal}</p>
                </div>
                <div>
                  <p className="text-tactical-silver text-sm">Missões</p>
                  <p className="text-2xl font-bold text-white">{vendedor.missoesConcluidas} / {vendedor.metaMensal}</p>
                </div>
                <div>
                  <p className="text-tactical-silver text-sm">Conversão</p>
                  <p className="text-2xl font-bold text-heineken-neon">{vendedor.conversao}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de desempenho */}
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <BarChart3 size={20} className="mr-2 text-heineken" />
                Desempenho Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={desempenhoData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="nome" tick={{ fill: '#ccc' }} />
                    <YAxis tick={{ fill: '#ccc' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                      labelStyle={{ color: '#ccc' }}
                    />
                    <Legend wrapperStyle={{ color: '#ccc' }} />
                    <Bar dataKey="vendas" name="Vendas (R$)" fill="#8eff00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Gráfico de missões */}
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <Target size={20} className="mr-2 text-heineken" />
                Missões Concluídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={missoesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="nome" tick={{ fill: '#ccc' }} />
                    <YAxis tick={{ fill: '#ccc' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                      labelStyle={{ color: '#ccc' }}
                    />
                    <Legend wrapperStyle={{ color: '#ccc' }} />
                    <Line type="monotone" dataKey="concluidas" name="Missões Concluídas" stroke="#8eff00" />
                    <Line type="monotone" dataKey="total" name="Meta" stroke="#777" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Lista de PDVs */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <MapPin size={20} className="mr-2 text-heineken" />
              PDVs do Vendedor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-tactical-silver">
                <thead className="text-xs uppercase border-b border-tactical-darkgray/30">
                  <tr>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Bairro</th>
                    <th className="py-3 px-4">Conversão</th>
                    <th className="py-3 px-4">Vendas Mensais</th>
                  </tr>
                </thead>
                <tbody>
                  {pdvsList.map((pdv) => (
                    <tr key={pdv.id} className="border-b border-tactical-darkgray/20">
                      <td className="py-3 px-4 text-white">{pdv.nome}</td>
                      <td className="py-3 px-4">{pdv.bairro}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center ${pdv.conversao === "Sim" ? "text-heineken" : "text-tactical-silver"}`}>
                          {pdv.conversao === "Sim" && <CheckCircle size={14} className="mr-1" />}
                          {pdv.conversao}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-heineken-neon">{pdv.vendasMes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-start gap-4 mb-8">
          <Button
            variant="outline"
            className="text-tactical-silver border-heineken/30 hover:bg-heineken/10 hover:text-heineken-neon"
            onClick={() => navigate(`/admin/supervisor/${vendedor.supervisorId}`)}
          >
            Voltar para supervisor
          </Button>
          <Button
            variant="outline"
            className="text-tactical-silver border-heineken/30 hover:bg-heineken/10 hover:text-heineken-neon"
            onClick={() => navigate(`/admin/filial/${vendedor.filialId}`)}
          >
            Voltar para filial
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminVendedorDetalhe;
