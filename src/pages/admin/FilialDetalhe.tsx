
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, Building, BarChart3, MapPin } from "lucide-react";
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

// Dados de exemplo para supervisores de uma filial
const supervisoresData = {
  1: [
    { id: 101, nome: "Carlos Silva", vendedores: 4, pdvs: 85, vendasTotal: "R$ 132.450,00", conversao: "75%" },
    { id: 102, nome: "Ana Oliveira", vendedores: 4, pdvs: 90, vendasTotal: "R$ 128.780,00", conversao: "71%" },
    { id: 103, nome: "Roberto Almeida", vendedores: 4, pdvs: 82, vendasTotal: "R$ 102.340,00", conversao: "68%" },
    { id: 104, nome: "Juliana Santos", vendedores: 4, pdvs: 83, vendasTotal: "R$ 89.210,00", conversao: "65%" }
  ],
  2: [
    { id: 201, nome: "Marcos Pereira", vendedores: 4, pdvs: 75, vendasTotal: "R$ 118.320,00", conversao: "70%" },
    { id: 202, nome: "Fernanda Lima", vendedores: 4, pdvs: 72, vendasTotal: "R$ 104.670,00", conversao: "67%" },
    { id: 203, nome: "Ricardo Costa", vendedores: 4, pdvs: 73, vendasTotal: "R$ 95.460,00", conversao: "66%" }
  ],
  3: [
    { id: 301, nome: "Leonardo Martins", vendedores: 4, pdvs: 90, vendasTotal: "R$ 142.180,00", conversao: "72%" },
    { id: 302, nome: "Cristina Barbosa", vendedores: 4, pdvs: 90, vendasTotal: "R$ 122.140,00", conversao: "68%" }
  ],
  4: [
    { id: 401, nome: "Paulo Ferreira", vendedores: 4, pdvs: 75, vendasTotal: "R$ 98.340,00", conversao: "64%" },
    { id: 402, nome: "Mariana Dias", vendedores: 4, pdvs: 75, vendasTotal: "R$ 100.330,00", conversao: "62%" }
  ]
};

// Dados de exemplo para filiais
const filiaisData = {
  1: { nome: "São Paulo - Capital", pdvs: 340, vendasTotal: "R$ 452.780,00", conversao: "72%" },
  2: { nome: "ABC Paulista", pdvs: 220, vendasTotal: "R$ 318.450,00", conversao: "68%" },
  3: { nome: "Campinas", pdvs: 180, vendasTotal: "R$ 264.320,00", conversao: "65%" },
  4: { nome: "Litoral", pdvs: 150, vendasTotal: "R$ 198.670,00", conversao: "63%" }
};

// Dados de exemplo para o gráfico
const getDesempenhoData = (filialId: string) => [
  { nome: "Jan", vendas: 95000, conversoes: 68 },
  { nome: "Fev", vendas: 110000, conversoes: 70 },
  { nome: "Mar", vendas: 105000, conversoes: 65 },
  { nome: "Abr", vendas: 120000, conversoes: 72 },
  { nome: "Mai", vendas: 115000, conversoes: 74 },
  { nome: "Jun", vendas: 135000, conversoes: 78 }
];

const AdminFilialDetalhe = () => {
  const { filialId } = useParams();
  const navigate = useNavigate();
  const [filial, setFilial] = useState<any>(null);
  const [supervisores, setSupervisores] = useState<any[]>([]);
  const [desempenhoData, setDesempenhoData] = useState<any[]>([]);
  
  useEffect(() => {
    if (filialId && filiaisData[filialId as keyof typeof filiaisData]) {
      setFilial(filiaisData[filialId as keyof typeof filiaisData]);
      setDesempenhoData(getDesempenhoData(filialId));
      
      if (supervisoresData[filialId as keyof typeof supervisoresData]) {
        setSupervisores(supervisoresData[filialId as keyof typeof supervisoresData]);
      }
      
      document.title = `Filial: ${filiaisData[filialId as keyof typeof filiaisData].nome} | Admin | Heineken SP SUL`;
    } else {
      navigate("/admin/filiais");
    }
  }, [filialId, navigate]);
  
  const handleSupervisorClick = (supervisorId: number) => {
    navigate(`/admin/supervisor/${supervisorId}`);
  };
  
  if (!filial) {
    return <div>Carregando...</div>;
  }
  
  return (
    <DashboardLayout userType="admin" pageTitle={`Filial: ${filial.nome}`}>
      <div className="px-4 py-2 container mx-auto">
        {/* Cards de métricas da filial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-tactical-silver">Total de PDVs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{filial.pdvs}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-tactical-silver">Total em Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-heineken">{filial.vendasTotal}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-tactical-silver">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-heineken-neon">{filial.conversao}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Gráfico de desempenho */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <BarChart3 size={20} className="mr-2 text-heineken" />
              Desempenho da Filial
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
        
        {/* Supervisores da filial */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <Users size={20} className="mr-2 text-heineken" />
              Supervisores da Filial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-tactical-silver mb-4">
              Selecione um supervisor para ver detalhes e vendedores associados.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {supervisores.map((supervisor) => (
                <Card 
                  key={supervisor.id} 
                  className="bg-tactical-darkgray border-heineken/20 hover:border-heineken transition-colors cursor-pointer"
                  onClick={() => handleSupervisorClick(supervisor.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-heineken-neon font-bold flex justify-between items-center text-base">
                      <span className="flex items-center">
                        <Users size={16} className="mr-2" />
                        {supervisor.nome}
                      </span>
                      <ArrowRight size={14} className="text-tactical-silver" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-tactical-silver">
                        <p className="text-xs">Vendedores</p>
                        <p className="text-sm font-semibold text-white">{supervisor.vendedores}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">PDVs</p>
                        <p className="text-sm font-semibold text-white">{supervisor.pdvs}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">Vendas</p>
                        <p className="text-sm font-semibold text-heineken">{supervisor.vendasTotal}</p>
                      </div>
                      <div className="text-tactical-silver">
                        <p className="text-xs">Conversão</p>
                        <p className="text-sm font-semibold text-heineken-neon">{supervisor.conversao}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-start mb-8">
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

export default AdminFilialDetalhe;
