
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MissionStatusTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const MissionStatusTabs = ({ activeTab, onTabChange }: MissionStatusTabsProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full mb-6">
      <TabsList className="w-full sm:w-auto bg-tactical-darkgray/80 border border-heineken/30">
        <TabsTrigger
          value="todas"
          className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
        >
          Todas
        </TabsTrigger>
        <TabsTrigger
          value="em_andamento"
          className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
        >
          Em Andamento
        </TabsTrigger>
        <TabsTrigger
          value="planejadas"
          className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
        >
          Planejadas
        </TabsTrigger>
        <TabsTrigger
          value="concluidas"
          className="flex-1 sm:flex-none data-[state=active]:bg-heineken data-[state=active]:text-black"
        >
          Concluídas
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default MissionStatusTabs;
