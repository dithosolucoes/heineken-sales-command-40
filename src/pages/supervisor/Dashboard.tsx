
import { BarChart3, Users, Target, CheckCircle } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/ui/stats-card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Dados de exemplo para vendedores
const vendedoresData = [
  { id: 1, nome: "Carlos Silva", missoes: 12, alvos: 45, alvosAtingidos: 38, taxa: 84 },
  { id: 2, nome: "Ana Oliveira", missoes: 10, alvos: 42, alvosAtingidos: 39, taxa: 93 },
  { id: 3, nome: "Roberto Santos", missoes: 8, alvos: 38, alvosAtingidos: 29, taxa: 76 },
  { id: 4, nome: "Julia Mendes", missoes: 14, alvos: 52, alvosAtingidos: 46, taxa: 88 },
  { id: 5, nome: "Fernando Costa", missoes: 9, alvos: 36, alvosAtingidos: 24, taxa: 67 },
  { id: 6, nome: "Mariana Souza", missoes: 11, alvos: 40, alvosAtingidos: 32, taxa: 80 }
];

const SupervisorDashboard = () => {
  const [selectedVendedor, setSelectedVendedor] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Cálculo de métricas agregadas
  const totalMissoes = vendedoresData.reduce((sum, vendedor) => sum + vendedor.missoes, 0);
  const totalAlvos = vendedoresData.reduce((sum, vendedor) => sum + vendedor.alvos, 0);
  const totalAlvosAtingidos = vendedoresData.reduce((sum, vendedor) => sum + vendedor.alvosAtingidos, 0);
  const taxaMediaConversao = Math.round(totalAlvosAtingidos / totalAlvos * 100);

  const handleVendedorClick = (vendedor: any) => {
    setSelectedVendedor(vendedor);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Painel de Controle">
      <div className="px-4 pb-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total de Vendedores" 
            value={vendedoresData.length} 
            icon={<Users />}
            trend={{ value: 12, label: "vs. mês anterior", positive: true }}
          />
          <StatsCard 
            title="Missões Ativas" 
            value={totalMissoes} 
            icon={<Target />}
            trend={{ value: 8, label: "vs. mês anterior", positive: true }}
          />
          <StatsCard 
            title="Alvos Atingidos" 
            value={totalAlvosAtingidos} 
            icon={<CheckCircle />}
            trend={{ value: 15, label: "vs. mês anterior", positive: true }}
          />
          <StatsCard 
            title="Taxa de Conversão" 
            value={`${taxaMediaConversao}%`} 
            icon={<BarChart3 />}
            trend={{ value: 5, label: "vs. mês anterior", positive: true }}
          />
        </div>

        {/* Tabela de Vendedores */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-heineken-neon text-lg">Equipe de Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-heineken/20">
                    <TableHead className="text-tactical-silver">Vendedor</TableHead>
                    <TableHead className="text-tactical-silver text-right">Missões</TableHead>
                    <TableHead className="text-tactical-silver text-right">Alvos</TableHead>
                    <TableHead className="text-tactical-silver text-right">Alvos Atingidos</TableHead>
                    <TableHead className="text-tactical-silver text-right">Taxa</TableHead>
                    <TableHead className="text-tactical-silver text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendedoresData.map((vendedor) => (
                    <TableRow 
                      key={vendedor.id} 
                      className="border-heineken/10 hover:bg-tactical-black/50"
                    >
                      <TableCell className="font-medium text-white">{vendedor.nome}</TableCell>
                      <TableCell className="text-right">{vendedor.missoes}</TableCell>
                      <TableCell className="text-right">{vendedor.alvos}</TableCell>
                      <TableCell className="text-right">{vendedor.alvosAtingidos}</TableCell>
                      <TableCell className="text-right">
                        <span className={`${vendedor.taxa >= 80 ? 'text-heineken-neon' : vendedor.taxa >= 60 ? 'text-yellow-400' : 'text-red-500'}`}>
                          {vendedor.taxa}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleVendedorClick(vendedor)}
                          className="hover:bg-heineken/20 hover:text-heineken-neon"
                        >
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de detalhes do vendedor */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="bg-tactical-black border-heineken/30 w-full sm:max-w-md">
          <SheetHeader className="border-b border-heineken/20 pb-4">
            <SheetTitle className="text-heineken-neon">Detalhes do Vendedor</SheetTitle>
          </SheetHeader>
          
          {selectedVendedor && (
            <div className="mt-6 space-y-4">
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <h3 className="text-xl font-bold text-white mb-4">{selectedVendedor.nome}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-r border-heineken/20 pr-4">
                    <p className="text-sm text-tactical-silver">Missões</p>
                    <p className="text-2xl font-bold text-heineken-neon">{selectedVendedor.missoes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tactical-silver">Taxa de Conversão</p>
                    <p className={`text-2xl font-bold ${selectedVendedor.taxa >= 80 ? 'text-heineken-neon' : selectedVendedor.taxa >= 60 ? 'text-yellow-400' : 'text-red-500'}`}>
                      {selectedVendedor.taxa}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Progresso</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-tactical-silver">Alvos</span>
                      <span className="text-xs text-heineken-neon">{selectedVendedor.alvosAtingidos}/{selectedVendedor.alvos}</span>
                    </div>
                    <div className="w-full bg-tactical-black rounded-full h-2">
                      <div 
                        className="bg-heineken h-2 rounded-full" 
                        style={{ width: `${(selectedVendedor.alvosAtingidos / selectedVendedor.alvos) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-heineken hover:bg-heineken/80 text-white" 
                onClick={() => setIsDetailsOpen(false)}
              >
                Fechar
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default SupervisorDashboard;
