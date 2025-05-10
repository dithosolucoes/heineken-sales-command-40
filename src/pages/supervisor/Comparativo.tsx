
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Trophy, ArrowUp, ArrowDown } from "lucide-react";
import SupervisorComparativoChart from "@/components/supervisor/ComparativoChart";

// Dados de exemplo para supervisores
const supervisoresData = [
  { id: 1, nome: "Equipe SP Sul", supervisor: "Ricardo Mendes", vendedores: 6, missoes: 64, alvos: 253, alvosAtingidos: 208, taxa: 82 },
  { id: 2, nome: "Equipe SP Leste", supervisor: "Fernanda Lima", vendedores: 8, missoes: 88, alvos: 320, alvosAtingidos: 270, taxa: 84 },
  { id: 3, nome: "Equipe SP Norte", supervisor: "Gilberto Santos", vendedores: 5, missoes: 55, alvos: 220, alvosAtingidos: 176, taxa: 80 },
  { id: 4, nome: "Equipe SP Oeste", supervisor: "Camila Rocha", vendedores: 7, missoes: 77, alvos: 285, alvosAtingidos: 228, taxa: 80 },
];

// Dados de exemplo para filiais
const filiaisData = [
  { id: 1, nome: "São Paulo Capital", gerente: "Marcos Oliveira", equipes: 4, vendedores: 26, missoes: 284, alvosAtingidos: 882, taxa: 82 },
  { id: 2, nome: "Campinas", gerente: "Patricia Souza", equipes: 3, vendedores: 18, missoes: 198, alvosAtingidos: 594, taxa: 79 },
  { id: 3, nome: "São José dos Campos", gerente: "Eduardo Martins", equipes: 2, vendedores: 14, missoes: 154, alvosAtingidos: 462, taxa: 77 },
  { id: 4, nome: "Ribeirão Preto", gerente: "Luciana Gomes", equipes: 3, vendedores: 20, missoes: 220, alvosAtingidos: 682, taxa: 81 },
];

const SupervisorComparativo = () => {
  const [activeTab, setActiveTab] = useState("supervisores");
  
  // Ordenar dados por taxa de conversão (decrescente)
  const supervisoresOrdenados = [...supervisoresData].sort((a, b) => b.taxa - a.taxa);
  const filiaisOrdenadas = [...filiaisData].sort((a, b) => b.taxa - a.taxa);

  return (
    <DashboardLayout userType="supervisor" pageTitle="Comparativo de Performance">
      <div className="px-4 pb-6 space-y-6">
        <Tabs defaultValue="supervisores" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-tactical-darkgray/80 border border-heineken/30">
              <TabsTrigger 
                value="supervisores"
                className="data-[state=active]:bg-heineken data-[state=active]:text-black"
              >
                Equipes de Supervisores
              </TabsTrigger>
              <TabsTrigger 
                value="filiais"
                className="data-[state=active]:bg-heineken data-[state=active]:text-black"
              >
                Filiais
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Conteúdo dos Supervisores */}
          <TabsContent value="supervisores" className="mt-0">
            {/* Gráfico de comparativo */}
            <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
              <CardHeader>
                <CardTitle className="text-heineken-neon text-lg">Comparativo de Equipes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <SupervisorComparativoChart 
                    data={supervisoresData}
                    type="supervisores"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Ranking de supervisores */}
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-heineken-neon text-lg">Ranking de Equipes</CardTitle>
                <Trophy className="w-5 h-5 text-heineken-neon" />
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-heineken/20">
                        <TableHead className="text-tactical-silver">Pos.</TableHead>
                        <TableHead className="text-tactical-silver">Equipe</TableHead>
                        <TableHead className="text-tactical-silver">Supervisor</TableHead>
                        <TableHead className="text-tactical-silver text-right">Vendedores</TableHead>
                        <TableHead className="text-tactical-silver text-right">Missões</TableHead>
                        <TableHead className="text-tactical-silver text-right">Alvos Atingidos</TableHead>
                        <TableHead className="text-tactical-silver text-right">Taxa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supervisoresOrdenados.map((equipe, index) => (
                        <TableRow 
                          key={equipe.id} 
                          className={`border-heineken/10 hover:bg-tactical-black/50 ${index === 0 ? 'bg-heineken/10' : ''}`}
                        >
                          <TableCell className="font-medium">
                            {index === 0 ? (
                              <div className="flex items-center">
                                <span className="text-heineken-neon font-bold">#1</span>
                                <Trophy className="w-4 h-4 ml-1 text-heineken-neon" />
                              </div>
                            ) : (
                              <span>#{index + 1}</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-white">{equipe.nome}</TableCell>
                          <TableCell>{equipe.supervisor}</TableCell>
                          <TableCell className="text-right">{equipe.vendedores}</TableCell>
                          <TableCell className="text-right">{equipe.missoes}</TableCell>
                          <TableCell className="text-right">{equipe.alvosAtingidos}/{equipe.alvos}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <span className={`${equipe.taxa >= 80 ? 'text-heineken-neon' : equipe.taxa >= 60 ? 'text-yellow-400' : 'text-red-500'} font-bold`}>
                                {equipe.taxa}%
                              </span>
                              {index > 0 && (
                                <span className="ml-1">
                                  {Math.abs(equipe.taxa - supervisoresOrdenados[0].taxa) <= 2 ? (
                                    <ArrowUp className="w-4 h-4 text-yellow-400" />
                                  ) : (
                                    <ArrowDown className="w-4 h-4 text-red-500" />
                                  )}
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Conteúdo das Filiais */}
          <TabsContent value="filiais" className="mt-0">
            {/* Gráfico de comparativo */}
            <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
              <CardHeader>
                <CardTitle className="text-heineken-neon text-lg">Comparativo de Filiais</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <SupervisorComparativoChart 
                    data={filiaisData}
                    type="filiais"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Ranking de filiais */}
            <Card className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-heineken-neon text-lg">Ranking de Filiais</CardTitle>
                <Trophy className="w-5 h-5 text-heineken-neon" />
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-heineken/20">
                        <TableHead className="text-tactical-silver">Pos.</TableHead>
                        <TableHead className="text-tactical-silver">Filial</TableHead>
                        <TableHead className="text-tactical-silver">Gerente</TableHead>
                        <TableHead className="text-tactical-silver text-right">Equipes</TableHead>
                        <TableHead className="text-tactical-silver text-right">Vendedores</TableHead>
                        <TableHead className="text-tactical-silver text-right">Missões</TableHead>
                        <TableHead className="text-tactical-silver text-right">Taxa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filiaisOrdenadas.map((filial, index) => (
                        <TableRow 
                          key={filial.id} 
                          className={`border-heineken/10 hover:bg-tactical-black/50 ${index === 0 ? 'bg-heineken/10' : ''}`}
                        >
                          <TableCell className="font-medium">
                            {index === 0 ? (
                              <div className="flex items-center">
                                <span className="text-heineken-neon font-bold">#1</span>
                                <Trophy className="w-4 h-4 ml-1 text-heineken-neon" />
                              </div>
                            ) : (
                              <span>#{index + 1}</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-white">{filial.nome}</TableCell>
                          <TableCell>{filial.gerente}</TableCell>
                          <TableCell className="text-right">{filial.equipes}</TableCell>
                          <TableCell className="text-right">{filial.vendedores}</TableCell>
                          <TableCell className="text-right">{filial.missoes}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <span className={`${filial.taxa >= 80 ? 'text-heineken-neon' : filial.taxa >= 60 ? 'text-yellow-400' : 'text-red-500'} font-bold`}>
                                {filial.taxa}%
                              </span>
                              {index > 0 && (
                                <span className="ml-1">
                                  {Math.abs(filial.taxa - filiaisOrdenadas[0].taxa) <= 2 ? (
                                    <ArrowUp className="w-4 h-4 text-yellow-400" />
                                  ) : (
                                    <ArrowDown className="w-4 h-4 text-red-500" />
                                  )}
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupervisorComparativo;
