
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Sheet } from "@/components/ui/sheet";
import { filterMissions } from "@/services/missionsData";
import MissionSearchBar from "@/components/supervisor/missions/MissionSearchBar";
import MissionStatusTabs from "@/components/supervisor/missions/MissionStatusTabs";
import MissionCard, { MissionData } from "@/components/supervisor/missions/MissionCard";
import MissionDetails from "@/components/supervisor/missions/MissionDetails";
import EmptyMissionState from "@/components/supervisor/missions/EmptyMissionState";

const SupervisorMissoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");
  const [selectedMissao, setSelectedMissao] = useState<MissionData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Get filtered missions
  const missionsFiltradas = filterMissions(searchTerm, activeTab);

  const handleMissaoClick = (missao: MissionData) => {
    setSelectedMissao(missao);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Missões">
      <div className="px-4 pb-6">
        {/* Search and filter bar */}
        <MissionSearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        {/* Status tabs */}
        <MissionStatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Mission cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missionsFiltradas.map((missao) => (
            <MissionCard 
              key={missao.id} 
              mission={missao} 
              onClick={handleMissaoClick}
            />
          ))}

          {missionsFiltradas.length === 0 && <EmptyMissionState />}
        </div>
      </div>

      {/* Sheet modal for mission details */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <MissionDetails 
          mission={selectedMissao} 
          onClose={handleCloseDetails}
        />
      </Sheet>
    </DashboardLayout>
  );
};

export default SupervisorMissoes;
