
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RouteSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedVendedor: string;
  onVendedorChange: (value: string) => void;
  vendedores: string[];
}

const RouteSearchBar = ({
  searchTerm,
  onSearchChange,
  selectedVendedor,
  onVendedorChange,
  vendedores
}: RouteSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por vendedor ou região..."
          className="pl-8 bg-tactical-darkgray/80 border-heineken/30"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Select value={selectedVendedor} onValueChange={onVendedorChange}>
          <SelectTrigger className="w-[180px] bg-tactical-darkgray/80 border-heineken/30">
            <SelectValue placeholder="Filtrar por vendedor" />
          </SelectTrigger>
          <SelectContent className="bg-tactical-darkgray/90 border-heineken/30">
            <SelectItem value="todos">Todos os vendedores</SelectItem>
            {vendedores.map(vendedor => (
              <SelectItem key={vendedor} value={vendedor}>{vendedor}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RouteSearchBar;
