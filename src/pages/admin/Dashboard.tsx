
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Database, Map, BarChart } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";
import AdminUserList from "@/components/admin/AdminUserList";
import AdminPDVsMap from "@/components/admin/AdminPDVsMap";
import AdminUploadData from "@/components/admin/AdminUploadData";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Admin Dashboard | Heineken SP SUL";
  }, []);
  
  return (
    <DashboardLayout userType="admin" pageTitle="Área de Administração">
      <div className="px-4 py-2 w-full">
        <Tabs 
          defaultValue="dashboard" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="mb-6 border-b border-tactical-darkgray/30">
            <TabsList className="bg-tactical-darkgray/50 h-12">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                <Users className="mr-2 h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="pdvs" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                <Map className="mr-2 h-4 w-4" />
                PDVs
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                <Database className="mr-2 h-4 w-4" />
                Upload de Dados
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-heineken data-[state=active]:text-black">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="p-0 border-none">
            <AdminStats />
          </TabsContent>
          
          <TabsContent value="users" className="p-0 border-none">
            <AdminUserList />
          </TabsContent>
          
          <TabsContent value="pdvs" className="p-0 border-none">
            <AdminPDVsMap />
          </TabsContent>
          
          <TabsContent value="upload" className="p-0 border-none">
            <AdminUploadData />
          </TabsContent>
          
          <TabsContent value="analytics" className="p-0 border-none">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
