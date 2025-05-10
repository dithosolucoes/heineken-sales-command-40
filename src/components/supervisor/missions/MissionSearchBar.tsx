
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MissionSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterOptions?: {
    inProgress: boolean;
    planned: boolean;
    completed: boolean;
  };
  onFilterChange?: (filters: { inProgress: boolean; planned: boolean; completed: boolean }) => void;
}

const MissionSearchBar = ({ 
  searchTerm, 
  onSearchChange,
  filterOptions = { inProgress: true, planned: true, completed: true },
  onFilterChange
}: MissionSearchBarProps) => {
  const isMobile = useIsMobile();
  
  const handleFilterChange = (filterKey: 'inProgress' | 'planned' | 'completed', value: boolean) => {
    if (onFilterChange) {
      onFilterChange({
        ...filterOptions,
        [filterKey]: value
      });
    }
  };
  
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-heineken text-heineken hover:bg-heineken/20">
            <Filter size={16} className="mr-1" />
            {!isMobile && "Filtros"}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-tactical-black border-heineken/30">
          <SheetHeader className="border-b border-heineken/20 pb-4">
            <SheetTitle className="text-heineken-neon">Filtros de Missões</SheetTitle>
          </SheetHeader>
          
          <div className="pt-6 space-y-6">
            <h3 className="text-sm font-medium text-tactical-silver mb-3">Status da Missão</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-em-andamento" 
                  checked={filterOptions.inProgress}
                  onCheckedChange={(checked) => 
                    handleFilterChange('inProgress', checked === true)}
                />
                <Label htmlFor="filter-em-andamento" className="text-white">Em Andamento</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-planejadas" 
                  checked={filterOptions.planned}
                  onCheckedChange={(checked) => 
                    handleFilterChange('planned', checked === true)}
                />
                <Label htmlFor="filter-planejadas" className="text-white">Planejadas</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-concluidas" 
                  checked={filterOptions.completed}
                  onCheckedChange={(checked) => 
                    handleFilterChange('completed', checked === true)}
                />
                <Label htmlFor="filter-concluidas" className="text-white">Concluídas</Label>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MissionSearchBar;
