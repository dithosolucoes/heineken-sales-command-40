
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, User, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Dados de exemplo para supervisores
const supervisoresData = {
  101: { nome: "Carlos Silva", filial: "São Paulo - Capital", filialId: 1, pdvs: 85, vendasTotal: "R$ 132.450,00", conversao: "75%" },
  102: { nome: "Ana Oliveira", filial: "São Paulo - Capital", filialId: 1, pdvs: 90, vendasTotal: "R$ 128.780,00", conversao: "71%" },
  103: { nome: "Roberto Almeida", filial: "São Paulo - Capital", filialId: 1, pdvs: 82, vendasTotal: "R$ 102.340,00", conversao: "68%" },
  104: { nome: "Juliana Santos", filial: "São Paulo - Capital", filialId: 1, pdvs: 83, vendasTotal: "R$ 89.210,00", conversao: "65%" },
  201: { nome: "Marcos Pereira", filial: "ABC Paulista", filialId: 2, pdvs: 75, vendasTotal: "R$ 118.320,00", conversao: "70%" },
  202: { nome: "Fernanda Lima", filial: "ABC Paulista", filialId: 2, pdvs: 72, vendasTotal: "R$ 104.670,00", conversao: "67%" },
  203: { nome: "Ricardo Costa", filial: "ABC Paulista", filialId: 2, pdvs: 73, vendasTotal: "R$ 95.460,00", conversao: "66%" },
  301: { nome: "Leonardo Martins", filial: "Campinas", filialId: 3, pdvs: 90, vendasTotal: "R$ 142.180,00", conversao: "72%" },
  302: { nome: "Cristina Barbosa", filial: "Campinas", filialId: 3, pdvs: 90, vendasTotal: "R$ 122.140,00", conversao: "68%" },
  401: { nome: "Paulo Ferreira", filial: "Litoral", filialId: 4, pdvs: 75, vendasTotal: "R$ 98.340,00", conversao: "64%" },
  402: { nome: "Mariana Dias", filial: "Litoral", filialId: 4, pdvs: 75, vendasTotal: "R$ 100.330,00", conversao: "62%" }
};

// Dados de exemplo para vendedores de um supervisor
const vendedoresData = {
  101: [
    { id: 1001, nome: "Pedro Souza", pdvs: 22, vendasTotal: "R$ 38.450,00", missoesConcluidas: 18, conversao: "76%" },
    { id: 1002, nome: "Tatiana Alves", pdvs: 20, vendasTotal: "R$ 35.780,00", missoesConcluidas: 16, conversao: "74%" },
    { id: 1003, nome: "Fábio Gomes", pdvs: 21, vendasTotal: "R$ 30.340,00", missoesConcluidas: 15, conversao: "72%" },
    { id: 1004, nome: "Carla Mendes", pdvs: 22, vendasTotal: "R$ 27.880,00", missoesConcluidas: 14, conversao: "70%" }
  ],
  102: [
    { id: 1005, nome: "Rodrigo Lima", pdvs: 23, vendasTotal: "R$ 34.120,00", missoesConcluidas: 19, conversao: "75%" },
    { id: 1006, nome: "Amanda Costa", pdvs: 22, vendasTotal: "R$ 32.450,00", missoesConcluidas: 17, conversao: "73%" },
    { id: 1007, nome: "Bruno Santos", pdvs: 23, vendasTotal: "R$ 31.780,00", missoesConcluidas: 16, conversao: "72%" },
    { id: 1008, nome: "Daniela Silva", pdvs: 22, vendasTotal: "R$ 30.430,00", missoesConcluidas: 15, conversao: "70%" }
  ],
  // ... dados para outros supervisores
};

// Dados de exemplo para o gráfico de desempenho
const getDesempenhoData = (supervisorId: number) => [
  { nome: "Jan", vendas: 22000, conversoes: 72 },
  { nome: "Fev", vendas: 24500, conversoes: 74 },
  { nome: "Mar", vendas: 23800, conversoes: 71 },
  { nome: "Abr", vendas: 25600, conversoes: 75 },
  { nome: "Mai", vendas: 26400, conversoes: 76 },
  { nome: "Jun", vendas: 28200, conversoes: 78 }
];

const AdminSupervisorDetalhe = () => {
  const { supervisorId } = useParams();
  const navigate = useNavigate();
  const [supervisor, setSupervisor] = useState<any>(null);
  const [vendedores, setVendedores] = useState<any[]>([]);
  const [desempenhoData, setDesempenhoData] = useState<any[]>([]);
  
  useEffect(() => {
    if (supervisorId) {
      const supervisorIdNumber = parseInt(supervisorId, 10);
      
      if (supervisoresData[supervisorIdNumber as keyof typeof supervisoresData]) {
        setSupervisor(supervisoresData[supervisorIdNumber as keyof typeof supervisoresData]);
        setDesempenhoData(getDesempenhoData(supervisorIdNumber));
        
        if (vendedoresData[supervisorIdNumber as keyof typeof vendedoresData]) {
          setVendedores(vendedoresData[supervisorIdNumber as keyof typeof vendedoresData]);
        }
        
        document.title = `Supervisor: ${supervisoresData[supervisorIdNumber as keyof typeof supervisoresData].nome} | Admin | Heineken SP SUL`;
      } else {
        navigate("/admin/filiais");
      }
    }
  }, [supervisorId, navigate]);
  
  const handleVendedorClick = (vendedorId: number) => {
    navigate(`/admin/vendedor/${vendedorId}`);
  };
  
  if (!supervisor) {
    return <div>Carregando...</div>;
  }
  
  return (
    <DashboardLayout userType="admin" pageTitle={`Supervisor: ${supervisor.nome}`}>
      <div className="px-4 py-2 container mx-auto">
        {/* Info do supervisor */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <Users size={20} className="mr-2 text-heineken" />
              Informações do Supervisor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-tactical-silver">Filial</p>
                <p className="text-white font-medium">{supervisor.filial}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mt-4 md:mt-0">
                <div>
                  <p className="text-tactical-silver text-sm">PDVs</p>
                  <p className="text-2xl font-bold text-white">{supervisor.pdvs}</p>
                </div>
                <div>
                  <p className="text-tactical-silver text-sm">Vendas</p>
                  <p className="text-2xl font-bold text-heineken">{supervisor.vendasTotal}</p>
                </div>
                <div>
                  <p className="text-tactical-silver text-sm">Conversão</p>
                  <p className="text-2xl font-bold text-heineken-neon">{supervisor.conversao}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Gráfico de desempenho */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <BarChart3 size={20} className="mr-2 text-heineken" />
              Desempenho do Supervisor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={desempenhoData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
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
                  <Bar dataKey="conversoes" name="Conversões (%)" fill="#28a745" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Vendedores do supervisor */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <User size={20} className="mr-2 text-heineken" />
              Vendedores do Supervisor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-tactical-silver mb-4">
              Selecione um vendedor para ver detalhes completos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {vendedores.map((vendedor) => (
                <Card 
                  key={vendedor.id} 
                  className="bg-tactical-darkgray border-heineken/20 hover:border-heineken transition-colors cursor-pointer"
                  onClick={() => handleVendedorClick(vendedor.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-heineken-neon font-bold flex justify-between items-center text-base">
                      <span className="flex items-center">
                        <User size={16} className="mr-2" />
                        {vendedor.nome}
                      </span>
                      <ArrowRight size={14} className="text-tactical-silver" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-tactical-silver">
                        <p className="text-xs">PDVs</p>
                        <p className="text-sm font-semibold text-white">{vendedor.pdvs}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">Missões</p>
                        <p className="text-sm font-semibold text-white">{vendedor.missoesConcluidas}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">Vendas</p>
                        <p className="text-sm font-semibold text-heineken">{vendedor.vendasTotal}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">Conversão</p>
                        <p className="text-sm font-semibold text-heineken-neon">{vendedor.conversao}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-start gap-4 mb-8">
          <Button
            variant="outline"
            className="text-tactical-silver border-heineken/30 hover:bg-heineken/10 hover:text-heineken-neon"
            onClick={() => navigate(`/admin/filial/${supervisor.filialId}`)}
          >
            Voltar para filial
          </Button>
          <Button
            variant="outline"
            className="text-tactical-silver border-heineken/30 hover:bg-heineken/10 hover:text-heineken-neon"
            onClick={() => navigate("/admin/filiais")}
          >
            Voltar para lista de filiais
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSupervisorDetalhe;
