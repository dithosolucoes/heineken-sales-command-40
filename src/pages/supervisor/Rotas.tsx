import { useState } from "react";
import { Search, MapPin, User, Calendar, BarChart3, Eye } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import Map from "@/components/Map";

// Dados de exemplo para rotas
const rotasData = [
  {
    id: 1,
    vendedor: "Carlos Silva",
    regiao: "São Paulo - Zona Sul",
    clientes: 18,
    clientesVisitados: 12,
    ultimaAtualizacao: "2023-05-10T10:30:00",
    coordenadas: {
      lat: -23.5505,
      lng: -46.6333,
      zoom: 12
    },
    pontosDeVenda: [
      { id: 1, nome: "Bar do Zé", visitado: true, latitude: -23.5475, longitude: -46.6361 },
      { id: 2, nome: "Empório São Paulo", visitado: true, latitude: -23.5605, longitude: -46.6500 },
      { id: 3, nome: "Mercado Central", visitado: false, latitude: -23.5430, longitude: -46.6282 },
      { id: 4, nome: "Loja de Conveniência 24h", visitado: true, latitude: -23.5552, longitude: -46.6388 }
    ]
  },
  {
    id: 2,
    vendedor: "Ana Oliveira",
    regiao: "São Paulo - Zona Leste",
    clientes: 22,
    clientesVisitados: 15,
    ultimaAtualizacao: "2023-05-10T14:15:00",
    coordenadas: {
      lat: -23.5430,
      lng: -46.5680,
      zoom: 12
    },
    pontosDeVenda: [
      { id: 5, nome: "Distribuidora Leste", visitado: true, latitude: -23.5380, longitude: -46.5550 },
      { id: 6, nome: "Supermercado Economia", visitado: true, latitude: -23.5480, longitude: -46.5700 },
      { id: 7, nome: "Adega Moreira", visitado: false, latitude: -23.5300, longitude: -46.5800 }
    ]
  },
  {
    id: 3,
    vendedor: "Roberto Santos",
    regiao: "São Paulo - Centro",
    clientes: 15,
    clientesVisitados: 10,
    ultimaAtualizacao: "2023-05-10T16:45:00",
    coordenadas: {
      lat: -23.5489,
      lng: -46.6388,
      zoom: 13
    },
    pontosDeVenda: [
      { id: 8, nome: "Bar do Centro", visitado: true, latitude: -23.5470, longitude: -46.6380 },
      { id: 9, nome: "Restaurante Paulista", visitado: true, latitude: -23.5560, longitude: -46.6580 },
      { id: 10, nome: "Pub Inglês", visitado: false, latitude: -23.5500, longitude: -46.6480 }
    ]
  }
];

const SupervisorRotas = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendedor, setSelectedVendedor] = useState("todos");
  const [selectedRota, setSelectedRota] = useState<any>(null);
  const [isRouteDetailOpen, setIsRouteDetailOpen] = useState(false);

  // Filtrar rotas com base na busca e no vendedor selecionado
  const getRotasFiltradas = () => {
    return rotasData
      .filter(rota => rota.vendedor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       rota.regiao.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(rota => selectedVendedor === "todos" || rota.vendedor === selectedVendedor);
  };

  const handleRotaClick = (rota: any) => {
    setSelectedRota(rota);
    setIsRouteDetailOpen(true);
  };

  // Obter lista única de vendedores para o filtro
  const vendedoresUnicos = [...new Set(rotasData.map(rota => rota.regiao))];
  const rotasFiltradas = getRotasFiltradas();

  // Formatar data/hora de última atualização
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Monitoramento de Rotas">
      <div className="px-4 pb-6">
        {/* Barra de filtro e busca */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por vendedor ou região..."
              className="pl-8 bg-tactical-darkgray/80 border-heineken/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
              <SelectTrigger className="w-[180px] bg-tactical-darkgray/80 border-heineken/30">
                <SelectValue placeholder="Filtrar por vendedor" />
              </SelectTrigger>
              <SelectContent className="bg-tactical-darkgray/90 border-heineken/30">
                <SelectItem value="todos">Todos os vendedores</SelectItem>
                {rotasData.map(rota => (
                  <SelectItem key={rota.id} value={rota.vendedor}>{rota.vendedor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista de rotas */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-heineken-neon mb-2">Rotas Ativas</h3>
            
            {rotasFiltradas.map((rota) => (
              <Card 
                key={rota.id} 
                className="bg-tactical-darkgray/80 border-heineken/30 hover:border-heineken/50 cursor-pointer transition-all"
                onClick={() => handleRotaClick(rota)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-base">{rota.vendedor}</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-heineken border-heineken hover:bg-heineken/20 h-8 px-2"
                    >
                      <Eye size={16} className="mr-1" />
                      Ver
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-tactical-silver mb-2">
                    <MapPin size={16} className="mr-1.5 text-heineken-neon" />
                    <span>{rota.regiao}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-tactical-silver/80">PDVs Visitados</p>
                      <p className="text-lg font-semibold text-heineken-neon">
                        {rota.clientesVisitados}/{rota.clientes}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-tactical-silver/80">Atualizado</p>
                      <p className="text-sm text-tactical-silver">
                        {formatDateTime(rota.ultimaAtualizacao)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-tactical-black/80 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-heineken h-full rounded-full" 
                      style={{ width: `${(rota.clientesVisitados / rota.clientes) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {rotasFiltradas.length === 0 && (
              <div className="text-center p-8 bg-tactical-darkgray/50 rounded-lg border border-heineken/10">
                <MapPin className="mx-auto h-10 w-10 text-tactical-silver mb-2" />
                <h3 className="text-tactical-silver text-lg font-medium">Nenhuma rota encontrada</h3>
                <p className="text-tactical-silver/80 mt-1">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </div>
          
          {/* Mapa (desktop e tablets) */}
          <div className="hidden md:block lg:col-span-7 xl:col-span-8 rounded-lg overflow-hidden border border-heineken/30 h-[calc(100vh-250px)]">
            <Map 
              className=""
              highlightedClientId={selectedRota?.id.toString()}
              onSelectClient={(client) => console.log("Client selected:", client)}
            />
          </div>
        </div>
      </div>

      {/* Sheet modal para detalhes da rota */}
      <Sheet open={isRouteDetailOpen} onOpenChange={setIsRouteDetailOpen}>
        <SheetContent className="bg-tactical-black border-heineken/30 w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="border-b border-heineken/20 pb-4">
            <SheetTitle className="text-heineken-neon">Detalhes da Rota</SheetTitle>
          </SheetHeader>
          
          {selectedRota && (
            <div className="mt-6 space-y-6">
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-tactical-black flex items-center justify-center mr-4">
                    <User size={20} className="text-heineken-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedRota.vendedor}</h3>
                    <p className="text-tactical-silver">{selectedRota.regiao}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-r border-heineken/20 pr-4">
                    <p className="text-sm text-tactical-silver">PDVs Visitados</p>
                    <p className="text-2xl font-semibold text-heineken-neon">
                      {selectedRota.clientesVisitados}/{selectedRota.clientes}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-tactical-silver">Progresso</p>
                    <p className="text-2xl font-semibold text-heineken-neon">
                      {Math.round((selectedRota.clientesVisitados / selectedRota.clientes) * 100)}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-tactical-silver mb-1">Última Atualização</p>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-heineken" />
                    <span>{formatDateTime(selectedRota.ultimaAtualizacao)}</span>
                  </div>
                </div>
              </div>
              
              {/* Mapa (mobile) */}
              <div className="h-[200px] rounded-md overflow-hidden border border-heineken/20">
                <Map 
                  className=""
                  highlightedClientId={selectedRota.id.toString()}
                  onSelectClient={(client) => console.log("Client selected:", client)}
                />
              </div>
              
              <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/20">
                <h4 className="text-sm font-bold uppercase text-tactical-silver mb-3">Pontos de Venda</h4>
                <div className="space-y-3">
                  {selectedRota.pontosDeVenda.map((pdv: any) => (
                    <div key={pdv.id} className="flex items-center justify-between bg-tactical-black/50 p-3 rounded-md">
                      <span className="text-tactical-silver">{pdv.nome}</span>
                      <span className={`text-sm ${pdv.visitado ? 'text-green-500' : 'text-yellow-400'}`}>
                        {pdv.visitado ? 'Visitado' : 'Pendente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-heineken hover:bg-heineken/80 text-black" 
                onClick={() => setIsRouteDetailOpen(false)}
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

export default SupervisorRotas;
