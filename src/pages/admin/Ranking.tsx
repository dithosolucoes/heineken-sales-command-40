
import { useEffect, useState } from "react";
import { Award, Building, Medal, List, Users, Trophy } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RankingFiliais from "@/components/admin/rankings/RankingFiliais";
import RankingSupervisores from "@/components/admin/rankings/RankingSupervisores";
import RankingVendedores from "@/components/admin/rankings/RankingVendedores";

const AdminRanking = () => {
  useEffect(() => {
    document.title = "Ranking | Admin | Heineken SP SUL";
  }, []);

  return (
    <DashboardLayout userType="admin" pageTitle="Ranking Geral">
      <div className="px-4 py-2 container mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <Trophy size={20} className="mr-2 text-heineken" />
                Ranking Consolidado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="filiais" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-tactical-black">
                  <TabsTrigger value="filiais" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                    <Building size={16} className="mr-2" />
                    Filiais
                  </TabsTrigger>
                  <TabsTrigger value="supervisores" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                    <Users size={16} className="mr-2" />
                    Supervisores
                  </TabsTrigger>
                  <TabsTrigger value="vendedores" className="data-[state=active]:bg-heineken/20 data-[state=active]:text-heineken">
                    <Medal size={16} className="mr-2" />
                    Vendedores
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="filiais">
                  <RankingFiliais />
                </TabsContent>
                <TabsContent value="supervisores">
                  <RankingSupervisores />
                </TabsContent>
                <TabsContent value="vendedores">
                  <RankingVendedores />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminRanking;
