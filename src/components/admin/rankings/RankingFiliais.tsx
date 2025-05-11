
import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados fictícios para o ranking de filiais
const filiaisRankingData = [
  {
    id: 1,
    posicao: 1,
    nome: "São Paulo - Capital",
    pontos: 4350,
    conversao: "78%",
    supervisores: 4,
    pdvs: 124,
  },
  {
    id: 2,
    posicao: 2,
    nome: "ABC Paulista",
    pontos: 3200,
    conversao: "72%",
    supervisores: 3,
    pdvs: 87,
  },
  {
    id: 3,
    posicao: 3,
    nome: "Campinas",
    pontos: 2800,
    conversao: "70%",
    supervisores: 2,
    pdvs: 65,
  },
  {
    id: 4,
    posicao: 4,
    nome: "Litoral",
    pontos: 2100,
    conversao: "68%",
    supervisores: 2,
    pdvs: 55,
  },
  {
    id: 5,
    posicao: 5,
    nome: "Sorocaba",
    pontos: 1850,
    conversao: "65%",
    supervisores: 2,
    pdvs: 48,
  },
];

const RankingFiliais = () => {
  const [filiais, setFiliais] = useState(filiaisRankingData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>({
    key: "posicao",
    direction: "ascending",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    if (e.target.value === "") {
      setFiliais(filiaisRankingData);
    } else {
      const filteredFiliais = filiaisRankingData.filter((filial) =>
        filial.nome.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFiliais(filteredFiliais);
    }
  };

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    
    setSortConfig({ key, direction });
    
    const sortedFiliais = [...filiais].sort((a, b) => {
      // Para posição, pontuação, conversão (numérica), etc.
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      
      if (key === "conversao") {
        const aNum = parseInt(a.conversao.replace("%", ""));
        const bNum = parseInt(b.conversao.replace("%", ""));
        return direction === "ascending" ? aNum - bNum : bNum - aNum;
      }
      
      if (key === "nome") {
        return direction === "ascending" 
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "ascending" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setFiliais(sortedFiliais);
  };

  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  return (
    <div>
      <div className="flex items-center mb-6">
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
      </div>
      
      <div className="rounded-md border border-heineken/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-tactical-black">
            <TableRow className="border-heineken/20 hover:bg-transparent">
              <TableHead 
                className="text-tactical-silver w-16 cursor-pointer" 
                onClick={() => requestSort("posicao")}
              >
                # {getSortDirection("posicao")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver cursor-pointer" 
                onClick={() => requestSort("nome")}
              >
                Filial {getSortDirection("nome")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver text-right cursor-pointer" 
                onClick={() => requestSort("pontos")}
              >
                Pontos {getSortDirection("pontos")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver text-right cursor-pointer" 
                onClick={() => requestSort("conversao")}
              >
                Conversão {getSortDirection("conversao")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver text-right cursor-pointer" 
                onClick={() => requestSort("supervisores")}
              >
                Supervisores {getSortDirection("supervisores")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver text-right cursor-pointer" 
                onClick={() => requestSort("pdvs")}
              >
                PDVs {getSortDirection("pdvs")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filiais.length > 0 ? (
              filiais.map((filial) => (
                <TableRow 
                  key={filial.id} 
                  className={`border-heineken/10 hover:bg-tactical-black/50 ${filial.posicao <= 3 ? 'bg-heineken/5' : ''}`}
                >
                  <TableCell className={`text-center font-bold ${
                    filial.posicao === 1 ? 'text-[#FFD700]' : 
                    filial.posicao === 2 ? 'text-[#C0C0C0]' : 
                    filial.posicao === 3 ? 'text-[#CD7F32]' : 
                    'text-white'
                  }`}>
                    {filial.posicao}
                  </TableCell>
                  <TableCell className="font-medium text-heineken-neon">
                    {filial.nome}
                  </TableCell>
                  <TableCell className="text-right font-bold">{filial.pontos.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-heineken">{filial.conversao}</TableCell>
                  <TableCell className="text-right">{filial.supervisores}</TableCell>
                  <TableCell className="text-right">{filial.pdvs}</TableCell>
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
    </div>
  );
};

export default RankingFiliais;
