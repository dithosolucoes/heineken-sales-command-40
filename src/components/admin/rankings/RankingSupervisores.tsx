
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dados fictícios para o ranking de supervisores
const supervisoresRankingData = [
  {
    id: 1,
    posicao: 1,
    nome: "Carlos Oliveira",
    filial: "São Paulo - Capital",
    pontos: 1240,
    conversao: "82%",
    vendedores: 5,
    pdvs: 38,
  },
  {
    id: 2,
    posicao: 2,
    nome: "Ana Silva",
    filial: "ABC Paulista",
    pontos: 1180,
    conversao: "79%",
    vendedores: 4,
    pdvs: 36,
  },
  {
    id: 3,
    posicao: 3,
    nome: "Roberto Santos",
    filial: "São Paulo - Capital",
    pontos: 1050,
    conversao: "75%",
    vendedores: 4,
    pdvs: 30,
  },
  {
    id: 4,
    posicao: 4,
    nome: "Luciana Costa",
    filial: "Campinas",
    pontos: 980,
    conversao: "73%",
    vendedores: 5,
    pdvs: 32,
  },
  {
    id: 5,
    posicao: 5,
    nome: "Márcio Pereira",
    filial: "São Paulo - Capital",
    pontos: 920,
    conversao: "70%",
    vendedores: 3,
    pdvs: 24,
  },
  {
    id: 6,
    posicao: 6,
    nome: "Patrícia Lima",
    filial: "Litoral",
    pontos: 880,
    conversao: "69%",
    vendedores: 4,
    pdvs: 28,
  },
  {
    id: 7,
    posicao: 7,
    nome: "Fernando Alves",
    filial: "ABC Paulista",
    pontos: 850,
    conversao: "68%",
    vendedores: 4,
    pdvs: 26,
  },
  {
    id: 8,
    posicao: 8,
    nome: "Juliana Martins",
    filial: "Campinas",
    pontos: 810,
    conversao: "66%",
    vendedores: 3,
    pdvs: 22,
  },
  {
    id: 9,
    posicao: 9,
    nome: "Paulo Rodrigues",
    filial: "Litoral",
    pontos: 780,
    conversao: "64%",
    vendedores: 4,
    pdvs: 27,
  },
  {
    id: 10,
    posicao: 10,
    nome: "Camila Torres",
    filial: "Sorocaba",
    pontos: 750,
    conversao: "63%",
    vendedores: 3,
    pdvs: 24,
  },
];

const RankingSupervisores = () => {
  const [supervisores, setSupervisores] = useState(supervisoresRankingData);
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
      setSupervisores(supervisoresRankingData);
    } else {
      const filtered = supervisoresRankingData.filter(
        (supervisor) =>
          supervisor.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
          supervisor.filial.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSupervisores(filtered);
    }
  };

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    
    setSortConfig({ key, direction });
    
    const sorted = [...supervisores].sort((a, b) => {
      if (key === "nome" || key === "filial") {
        return direction === "ascending" 
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      
      if (key === "conversao") {
        const aNum = parseInt(a.conversao.replace("%", ""));
        const bNum = parseInt(b.conversao.replace("%", ""));
        return direction === "ascending" ? aNum - bNum : bNum - aNum;
      }
      
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "ascending" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setSupervisores(sorted);
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
            placeholder="Buscar supervisor ou filial..."
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
                Supervisor {getSortDirection("nome")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver cursor-pointer" 
                onClick={() => requestSort("filial")}
              >
                Filial {getSortDirection("filial")}
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
                onClick={() => requestSort("vendedores")}
              >
                Vendedores {getSortDirection("vendedores")}
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
            {supervisores.length > 0 ? (
              supervisores.map((supervisor) => (
                <TableRow 
                  key={supervisor.id} 
                  className={`border-heineken/10 hover:bg-tactical-black/50 ${supervisor.posicao <= 3 ? 'bg-heineken/5' : ''}`}
                >
                  <TableCell className={`text-center font-bold ${
                    supervisor.posicao === 1 ? 'text-[#FFD700]' : 
                    supervisor.posicao === 2 ? 'text-[#C0C0C0]' : 
                    supervisor.posicao === 3 ? 'text-[#CD7F32]' : 
                    'text-white'
                  }`}>
                    {supervisor.posicao}
                  </TableCell>
                  <TableCell className="font-medium text-heineken-neon">
                    {supervisor.nome}
                  </TableCell>
                  <TableCell>{supervisor.filial}</TableCell>
                  <TableCell className="text-right font-bold">{supervisor.pontos.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-heineken">{supervisor.conversao}</TableCell>
                  <TableCell className="text-right">{supervisor.vendedores}</TableCell>
                  <TableCell className="text-right">{supervisor.pdvs}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-tactical-silver py-8">
                  Nenhum supervisor encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RankingSupervisores;
