
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

// Dados fictícios para o ranking de vendedores
const vendedoresRankingData = [
  {
    id: 1,
    posicao: 1,
    nome: "João Silva",
    supervisor: "Carlos Oliveira",
    filial: "São Paulo - Capital",
    pontos: 320,
    conversao: "85%",
    pdvs: 12,
  },
  {
    id: 2,
    posicao: 2,
    nome: "Maria Santos",
    supervisor: "Ana Silva",
    filial: "ABC Paulista",
    pontos: 305,
    conversao: "83%",
    pdvs: 10,
  },
  {
    id: 3,
    posicao: 3,
    nome: "Pedro Almeida",
    supervisor: "Roberto Santos",
    filial: "São Paulo - Capital",
    pontos: 290,
    conversao: "81%",
    pdvs: 9,
  },
  {
    id: 4,
    posicao: 4,
    nome: "Camila Lima",
    supervisor: "Carlos Oliveira",
    filial: "São Paulo - Capital",
    pontos: 275,
    conversao: "79%",
    pdvs: 11,
  },
  {
    id: 5,
    posicao: 5,
    nome: "Lucas Martins",
    supervisor: "Luciana Costa",
    filial: "Campinas",
    pontos: 260,
    conversao: "77%",
    pdvs: 8,
  },
  {
    id: 6,
    posicao: 6,
    nome: "Ana Costa",
    supervisor: "Carlos Oliveira", 
    filial: "São Paulo - Capital",
    pontos: 250,
    conversao: "76%",
    pdvs: 9,
  },
  {
    id: 7,
    posicao: 7,
    nome: "Marcos Oliveira",
    supervisor: "Ana Silva",
    filial: "ABC Paulista",
    pontos: 245,
    conversao: "75%",
    pdvs: 8,
  },
  {
    id: 8,
    posicao: 8,
    nome: "Julia Souza",
    supervisor: "Márcio Pereira",
    filial: "São Paulo - Capital",
    pontos: 235,
    conversao: "74%",
    pdvs: 7,
  },
  {
    id: 9,
    posicao: 9,
    nome: "Rafael Moreira",
    supervisor: "Patrícia Lima",
    filial: "Litoral",
    pontos: 225,
    conversao: "72%",
    pdvs: 8,
  },
  {
    id: 10,
    posicao: 10,
    nome: "Mariana Costa",
    supervisor: "Fernando Alves",
    filial: "ABC Paulista",
    pontos: 220,
    conversao: "71%",
    pdvs: 7,
  },
  {
    id: 11,
    posicao: 11,
    nome: "Daniel Ferreira",
    supervisor: "Juliana Martins",
    filial: "Campinas",
    pontos: 210,
    conversao: "70%",
    pdvs: 6,
  },
  {
    id: 12,
    posicao: 12,
    nome: "Carla Santos",
    supervisor: "Paulo Rodrigues",
    filial: "Litoral",
    pontos: 205,
    conversao: "69%",
    pdvs: 7,
  },
  {
    id: 13,
    posicao: 13,
    nome: "Eduardo Lima",
    supervisor: "Camila Torres",
    filial: "Sorocaba",
    pontos: 195,
    conversao: "68%",
    pdvs: 6,
  },
  {
    id: 14,
    posicao: 14,
    nome: "Bruna Oliveira",
    supervisor: "Carlos Oliveira",
    filial: "São Paulo - Capital",
    pontos: 190,
    conversao: "67%",
    pdvs: 7,
  },
  {
    id: 15,
    posicao: 15,
    nome: "Ricardo Silva",
    supervisor: "Luciana Costa", 
    filial: "Campinas",
    pontos: 185,
    conversao: "66%",
    pdvs: 6,
  },
];

const RankingVendedores = () => {
  const [vendedores, setVendedores] = useState(vendedoresRankingData);
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
      setVendedores(vendedoresRankingData);
    } else {
      const filtered = vendedoresRankingData.filter(
        (vendedor) =>
          vendedor.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
          vendedor.supervisor.toLowerCase().includes(e.target.value.toLowerCase()) ||
          vendedor.filial.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setVendedores(filtered);
    }
  };

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    
    setSortConfig({ key, direction });
    
    const sorted = [...vendedores].sort((a, b) => {
      if (key === "nome" || key === "supervisor" || key === "filial") {
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
    
    setVendedores(sorted);
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
            placeholder="Buscar vendedor, supervisor ou filial..."
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
                Vendedor {getSortDirection("nome")}
              </TableHead>
              <TableHead 
                className="text-tactical-silver cursor-pointer" 
                onClick={() => requestSort("supervisor")}
              >
                Supervisor {getSortDirection("supervisor")}
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
                onClick={() => requestSort("pdvs")}
              >
                PDVs {getSortDirection("pdvs")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendedores.length > 0 ? (
              vendedores.map((vendedor) => (
                <TableRow 
                  key={vendedor.id} 
                  className={`border-heineken/10 hover:bg-tactical-black/50 ${vendedor.posicao <= 3 ? 'bg-heineken/5' : ''}`}
                >
                  <TableCell className={`text-center font-bold ${
                    vendedor.posicao === 1 ? 'text-[#FFD700]' : 
                    vendedor.posicao === 2 ? 'text-[#C0C0C0]' : 
                    vendedor.posicao === 3 ? 'text-[#CD7F32]' : 
                    'text-white'
                  }`}>
                    {vendedor.posicao}
                  </TableCell>
                  <TableCell className="font-medium text-heineken-neon">
                    {vendedor.nome}
                  </TableCell>
                  <TableCell>{vendedor.supervisor}</TableCell>
                  <TableCell>{vendedor.filial}</TableCell>
                  <TableCell className="text-right font-bold">{vendedor.pontos}</TableCell>
                  <TableCell className="text-right text-heineken">{vendedor.conversao}</TableCell>
                  <TableCell className="text-right">{vendedor.pdvs}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-tactical-silver py-8">
                  Nenhum vendedor encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RankingVendedores;
