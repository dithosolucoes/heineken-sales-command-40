
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import { ClientData, ClientType, ClientPotential, ClientCategory } from "@/types/client";
import { clientsData } from "@/utils/clientData";

const AdminPDVsMap = () => {
  const [pdvs] = useState<ClientData[]>(clientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPDV, setSelectedPDV] = useState<ClientData | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [typeFilters, setTypeFilters] = useState<ClientType[]>([]);
  const [potentialFilters, setPotentialFilters] = useState<ClientPotential[]>([]);

  // Filtragem de PDVs
  const filteredPDVs = pdvs.filter(pdv => {
    // Filtrar por termo de busca
    const matchesSearch = searchTerm === "" || 
      pdv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdv.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdv.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filtrar por tipo
    const matchesType = typeFilters.length === 0 || 
      typeFilters.includes(pdv.type);
      
    // Filtrar por potencial
    const matchesPotential = potentialFilters.length === 0 || 
      potentialFilters.includes(pdv.potential);
      
    return matchesSearch && matchesType && matchesPotential;
  });

  // Toggle para filtros de tipo
  const toggleTypeFilter = (type: ClientType) => {
    if (typeFilters.includes(type)) {
      setTypeFilters(typeFilters.filter(t => t !== type));
    } else {
      setTypeFilters([...typeFilters, type]);
    }
  };

  // Toggle para filtros de potencial
  const togglePotentialFilter = (potential: ClientPotential) => {
    if (potentialFilters.includes(potential)) {
      setPotentialFilters(potentialFilters.filter(p => p !== potential));
    } else {
      setPotentialFilters([...potentialFilters, potential]);
    }
  };

  // Traduzir categoria do cliente
  const translateCategory = (category: ClientCategory): string => {
    const categories: Record<ClientCategory, string> = {
      "Armazém/mercearia": "Armazém/Mercearia",
      "Restaurante C/D": "Restaurante C/D",
      "Bar C/D": "Bar C/D",
      "Padaria/confeitaria": "Padaria/Confeitaria",
      "Entretenimento Espec": "Entretenimento",
      "Lanchonete": "Lanchonete"
    };
    return categories[category];
  };

  // Traduzir potencial do cliente
  const translatePotential = (potential: ClientPotential): string => {
    const potentials: Record<ClientPotential, string> = {
      "bronze": "Bronze",
      "prata": "Prata",
      "ouro": "Ouro",
      "diamante": "Diamante",
      "inox": "Inox"
    };
    return potentials[potential];
  };

  // Tratar clique em um PDV
  const handlePDVClick = (pdv: ClientData) => {
    setSelectedPDV(pdv);
  };

  // Estatísticas dos PDVs
  const pdvStats = {
    total: pdvs.length,
    converted: pdvs.filter(p => p.converted).length,
    unconverted: pdvs.filter(p => !p.converted).length,
    byType: {
      bar: pdvs.filter(p => p.type === "bar").length,
      restaurante: pdvs.filter(p => p.type === "restaurante").length,
      mercado: pdvs.filter(p => p.type === "mercado").length,
      padaria: pdvs.filter(p => p.type === "padaria").length,
      entretenimento: pdvs.filter(p => p.type === "entretenimento").length,
      lanchonete: pdvs.filter(p => p.type === "lanchonete").length,
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-heineken">Pontos de Venda (PDVs)</h2>
      
      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tactical-silver text-sm">Total de PDVs</p>
                <h4 className="text-2xl font-bold text-white">{pdvStats.total}</h4>
              </div>
              <MapPin className="text-heineken-neon h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tactical-silver text-sm">PDVs Convertidos</p>
                <h4 className="text-2xl font-bold text-heineken-neon">
                  {pdvStats.converted} <span className="text-sm text-tactical-silver">({Math.round((pdvStats.converted / pdvStats.total) * 100)}%)</span>
                </h4>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                <span className="text-green-400 text-xl">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tactical-silver text-sm">A Converter</p>
                <h4 className="text-2xl font-bold text-white">
                  {pdvStats.unconverted} <span className="text-sm text-tactical-silver">({Math.round((pdvStats.unconverted / pdvStats.total) * 100)}%)</span>
                </h4>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-900/30 flex items-center justify-center">
                <span className="text-yellow-400 text-xl">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar PDVs por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tactical-darkgray/50 border-tactical-darkgray pl-10 text-white w-full"
          />
        </div>
        <Button 
          variant="outline" 
          className="border-tactical-silver text-tactical-silver hover:text-white hover:bg-tactical-darkgray"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Filtros expandidos */}
      {filterOpen && (
        <Card className="bg-tactical-darkgray/80 border-heineken/30 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-tactical-silver font-medium mb-2">Tipo de PDV</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("bar") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("bar")}
                >
                  Bar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("restaurante") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("restaurante")}
                >
                  Restaurante
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("mercado") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("mercado")}
                >
                  Mercado
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("padaria") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("padaria")}
                >
                  Padaria
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("entretenimento") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("entretenimento")}
                >
                  Entretenimento
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${typeFilters.includes("lanchonete") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => toggleTypeFilter("lanchonete")}
                >
                  Lanchonete
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-tactical-silver font-medium mb-2">Potencial</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${potentialFilters.includes("bronze") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => togglePotentialFilter("bronze")}
                >
                  Bronze
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${potentialFilters.includes("prata") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => togglePotentialFilter("prata")}
                >
                  Prata
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${potentialFilters.includes("ouro") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => togglePotentialFilter("ouro")}
                >
                  Ouro
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${potentialFilters.includes("diamante") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => togglePotentialFilter("diamante")}
                >
                  Diamante
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`text-xs ${potentialFilters.includes("inox") ? 'bg-heineken text-black' : 'bg-transparent text-tactical-silver'}`}
                  onClick={() => togglePotentialFilter("inox")}
                >
                  Inox
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Visualização do mapa e lista */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="bg-tactical-darkgray/50">
          <TabsTrigger value="map" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
            Mapa
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
            Lista
          </TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="border-none p-0">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardContent className="p-0">
              <div className="h-[500px] relative">
                <Map highlightedClientId={selectedPDV?.id} onSelectClient={handlePDVClick} />
                
                {/* Informações do PDV selecionado */}
                {selectedPDV && (
                  <div className="absolute top-4 right-4 w-64 bg-tactical-black/90 border border-heineken/30 p-4 rounded-md">
                    <h5 className="text-heineken font-bold text-lg">{selectedPDV.name}</h5>
                    <p className="text-tactical-silver text-sm mt-1">
                      {selectedPDV.address.street}, {selectedPDV.address.neighborhood}
                    </p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-tactical-silver">Categoria:</span>
                        <span className="text-xs text-white">{translateCategory(selectedPDV.category)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-tactical-silver">Potencial:</span>
                        <span className="text-xs text-white">{translatePotential(selectedPDV.potential)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-tactical-silver">Status:</span>
                        <span className={`text-xs ${selectedPDV.converted ? 'text-green-400' : 'text-yellow-400'}`}>
                          {selectedPDV.converted ? 'Convertido' : 'Não convertido'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-heineken text-black hover:bg-heineken/80"
                      size="sm"
                      onClick={() => setSelectedPDV(null)}
                    >
                      Fechar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="border-none p-0 mt-4">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-tactical-darkgray border-b border-heineken/20">
                      <TableHead className="text-tactical-silver">Nome</TableHead>
                      <TableHead className="text-tactical-silver">Endereço</TableHead>
                      <TableHead className="text-tactical-silver">Categoria</TableHead>
                      <TableHead className="text-tactical-silver">Potencial</TableHead>
                      <TableHead className="text-tactical-silver">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPDVs.length > 0 ? (
                      filteredPDVs.map((pdv) => (
                        <TableRow 
                          key={pdv.id} 
                          className="hover:bg-tactical-darkgray cursor-pointer border-b border-tactical-darkgray/30"
                          onClick={() => handlePDVClick(pdv)}
                        >
                          <TableCell className="text-white font-medium">{pdv.name}</TableCell>
                          <TableCell className="text-tactical-silver">
                            {pdv.address.street}, {pdv.address.neighborhood}
                          </TableCell>
                          <TableCell className="text-tactical-silver">
                            {translateCategory(pdv.category)}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              pdv.potential === 'diamante' ? 'bg-blue-900/50 text-blue-300' : 
                              pdv.potential === 'ouro' ? 'bg-yellow-900/50 text-yellow-300' : 
                              pdv.potential === 'prata' ? 'bg-gray-500/50 text-gray-300' :
                              pdv.potential === 'inox' ? 'bg-purple-900/50 text-purple-300' :
                              'bg-amber-900/50 text-amber-300'
                            }`}>
                              {translatePotential(pdv.potential)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              pdv.converted ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'
                            }`}>
                              {pdv.converted ? 'Convertido' : 'Não convertido'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-tactical-silver">
                          Nenhum PDV encontrado com os filtros aplicados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPDVsMap;
