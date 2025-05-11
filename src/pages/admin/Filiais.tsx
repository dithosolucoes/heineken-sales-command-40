
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados de exemplo para filiais
const filiaisData = [
  { 
    id: 1, 
    nome: "São Paulo - Capital", 
    quantidadeSupervisores: 4, 
    quantidadeVendedores: 16, 
    pontos: 340, 
    conversao: "72%" 
  },
  { 
    id: 2, 
    nome: "ABC Paulista", 
    quantidadeSupervisores: 3, 
    quantidadeVendedores: 12, 
    pontos: 220, 
    conversao: "68%" 
  },
  { 
    id: 3, 
    nome: "Campinas", 
    quantidadeSupervisores: 2, 
    quantidadeVendedores: 8, 
    pontos: 180, 
    conversao: "65%" 
  },
  { 
    id: 4, 
    nome: "Litoral", 
    quantidadeSupervisores: 2, 
    quantidadeVendedores: 8, 
    pontos: 150, 
    conversao: "63%" 
  }
];

const AdminFiliais = () => {
  const navigate = useNavigate();
  const [filiais, setFiliais] = useState(filiaisData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  useEffect(() => {
    document.title = "Filiais | Admin | Heineken SP SUL";
  }, []);
  
  const handleFilialClick = (filialId: number) => {
    navigate(`/admin/filial/${filialId}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    if (e.target.value === "") {
      setFiliais(filiaisData);
    } else {
      const filteredFiliais = filiaisData.filter(filial => 
        filial.nome.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFiliais(filteredFiliais);
    }
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedFiliais = [...filiais].sort((a, b) => {
      if (key === 'nome') {
        return direction === 'ascending' 
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      }
      
      // Para valores numéricos
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      
      if (key === 'conversao') {
        const aNum = parseInt(a.conversao.replace('%', ''));
        const bNum = parseInt(b.conversao.replace('%', ''));
        return direction === 'ascending' ? aNum - bNum : bNum - aNum;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'ascending' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setFiliais(sortedFiliais);
  };

  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };
  
  return (
    <DashboardLayout userType="admin" pageTitle="Filiais">
      <div className="px-4 py-2 container mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <Building size={20} className="mr-2 text-heineken" />
                Visão Geral de Filiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-tactical-silver mb-4">
                Selecione uma filial para ver detalhes e supervisores associados.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-tactical-silver" />
                  <Input
                    type="search"
                    placeholder="Buscar filial..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-9 bg-tactical-black border-heineken/20 text-white"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-tactical-silver border-heineken/30 hover:bg-heineken/10 hover:text-heineken-neon"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-heineken/20 hover:bg-transparent">
                      <TableHead 
                        className="text-tactical-silver cursor-pointer" 
                        onClick={() => requestSort('nome')}
                      >
                        Nome {getSortDirection('nome')}
                      </TableHead>
                      <TableHead 
                        className="text-tactical-silver text-center cursor-pointer" 
                        onClick={() => requestSort('quantidadeSupervisores')}
                      >
                        Supervisores {getSortDirection('quantidadeSupervisores')}
                      </TableHead>
                      <TableHead 
                        className="text-tactical-silver text-center cursor-pointer" 
                        onClick={() => requestSort('quantidadeVendedores')}
                      >
                        Vendedores {getSortDirection('quantidadeVendedores')}
                      </TableHead>
                      <TableHead 
                        className="text-tactical-silver text-center cursor-pointer" 
                        onClick={() => requestSort('pontos')}
                      >
                        Pontos {getSortDirection('pontos')}
                      </TableHead>
                      <TableHead 
                        className="text-tactical-silver text-center cursor-pointer" 
                        onClick={() => requestSort('conversao')}
                      >
                        Conversão {getSortDirection('conversao')}
                      </TableHead>
                      <TableHead className="text-tactical-silver text-right">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filiais.length > 0 ? (
                      filiais.map((filial) => (
                        <TableRow 
                          key={filial.id} 
                          className="border-heineken/10 hover:bg-tactical-black/50 cursor-pointer"
                          onClick={() => handleFilialClick(filial.id)}
                        >
                          <TableCell className="font-medium text-heineken-neon">
                            <div className="flex items-center">
                              <Building size={16} className="mr-2" />
                              {filial.nome}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{filial.quantidadeSupervisores}</TableCell>
                          <TableCell className="text-center">{filial.quantidadeVendedores}</TableCell>
                          <TableCell className="text-center">{filial.pontos}</TableCell>
                          <TableCell className="text-center text-heineken">{filial.conversao}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-heineken/20 hover:text-heineken-neon"
                            >
                              Detalhes <ArrowRight size={14} className="ml-1" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-tactical-silver py-8">
                          Nenhuma filial encontrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFiliais;
