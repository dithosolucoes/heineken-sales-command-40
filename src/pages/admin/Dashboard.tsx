
import { useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminStats from "@/components/admin/AdminStats";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Admin Dashboard | Heineken SP SUL";
  }, []);
  
  return (
    <DashboardLayout userType="admin" pageTitle="Área de Administração">
      <div className="px-4 py-2 w-full">
        <AdminStats />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
