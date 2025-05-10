
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    toast({
      title: "Área em desenvolvimento",
      description: "A área de admin está em desenvolvimento. Voltando para o login.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tactical-black bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-tactical pointer-events-none" />
      
      <div className="w-full max-w-lg tactical-panel p-6 animate-tactical-fade">
        <h1 className="text-2xl font-bold text-heineken mb-4">ÁREA DE ADMINISTRADOR</h1>
        <div className="bg-tactical-darkgray/80 p-4 rounded-md border border-heineken/30 mb-6">
          <p className="text-white mb-4">
            Esta área está em desenvolvimento e estará disponível em breve.
          </p>
          
          <div className="mt-6">
            <Button 
              onClick={handleBack}
              className="bg-heineken hover:bg-heineken/80 w-full"
            >
              Voltar para Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
