
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface MissionSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MissionSearchBar = ({ searchTerm, onSearchChange }: MissionSearchBarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar missões..."
          className="pl-8 bg-tactical-darkgray/80 border-heineken/30"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button className="bg-heineken hover:bg-heineken/80 text-black">
          <Plus size={16} className="mr-1" />
          {!isMobile && "Nova Missão"}
        </Button>
        <Button variant="outline" className="border-heineken text-heineken hover:bg-heineken/20">
          <Filter size={16} className="mr-1" />
          {!isMobile && "Filtros"}
        </Button>
      </div>
    </div>
  );
};

export default MissionSearchBar;
