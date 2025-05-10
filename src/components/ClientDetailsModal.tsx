
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Store, 
  Shield, 
  Wine, 
  Compass,
  MapPin,
  Building2,
  MapPinned,
  Mail,
  Check,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ClientCategory, ClientType, ClientPotential } from "@/types/client";

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDetails | null;
  onConfirmConversion?: (clientId: string) => void;
}

interface ClientDetails {
  id: string;
  name: string;
  category: ClientCategory;
  type: ClientType;
  cluster: number;
  opp: boolean;
  refrigerator: boolean;
  potential: ClientPotential; // Updated to use the ClientPotential type
  bottle: boolean;
  converted: boolean; // Added conversion status
  address: {
    street: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
  position: {
    lat: number;
    lng: number;
  };
}

// Função para obter o ícone baseado na categoria
const getCategoryIcon = (category: ClientCategory) => {
  switch (category) {
    case "Armazém/mercearia":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    case "Restaurante C/D":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    case "Bar C/D":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    case "Padaria/confeitaria":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    case "Entretenimento Espec":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    case "Lanchonete":
      return <Store className="h-6 w-6 text-tactical-silver" />;
    default:
      return <Store className="h-6 w-6 text-tactical-silver" />;
  }
};

// Função para obter a cor do potencial
const getPotentialColor = (potential: string) => {
  switch (potential) {
    case "diamante":
      return "text-blue-400";
    case "ouro":
      return "text-tactical-gold";
    case "prata":
      return "text-tactical-silver";
    case "bronze":
      return "text-tactical-bronze";
    case "inox": // Added the new "inox" tier
      return "text-tactical-silver";
    default:
      return "text-tactical-silver";
  }
};

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onClose,
  client,
  onConfirmConversion
}) => {
  const { toast } = useToast();
  const [isTargetHit, setIsTargetHit] = useState(false);

  if (!client) return null;

  const handleConfirmConversion = () => {
    setIsTargetHit(true);
    
    if (onConfirmConversion && client) {
      onConfirmConversion(client.id);
      toast({
        title: "Conversão registrada",
        description: "Será validada com base na planilha de vendas enviada às 17h.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-tactical-black border-heineken/30 p-0 max-w-md">
        <div className="tactical-panel border-tactical w-full max-w-md animate-tactical-fade">
          {/* Header */}
          <DialogHeader className="bg-tactical-darkgray border-b border-heineken/20 p-4">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-lg font-bold text-heineken-neon">
                  {client.name}
                </DialogTitle>
                <div className="flex items-center text-xs text-tactical-silver mt-1">
                  {getCategoryIcon(client.category)}
                  <span className="ml-1">{client.category}</span>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Categoria do Varejo */}
            <div className="flex items-center justify-between p-3 bg-tactical-darkgray/50 rounded-sm">
              <div className="flex items-center">
                <Store className="h-5 w-5 text-heineken mr-2" />
                <span className="text-sm text-tactical-silver">CATEGORIA VAREJO:</span>
              </div>
              <span className="text-sm text-heineken-neon">{client.category}</span>
            </div>
            
            {/* Conversion Status */}
            <div className="flex items-center justify-between p-3 bg-tactical-darkgray/50 rounded-sm">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-heineken mr-2" />
                <span className="text-sm text-tactical-silver">STATUS DE CONVERSÃO:</span>
              </div>
              <span className={`text-sm ${client.converted ? 'text-heineken-neon' : 'text-[#ea384c]'}`}>
                {client.converted ? (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    <span>CONVERTIDO</span>
                  </div>
                ) : "NÃO CONVERTIDO"}
              </span>
            </div>
            
            {/* Potencial */}
            <div className="flex items-center justify-between p-3 bg-tactical-darkgray/50 rounded-sm">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-heineken mr-2" />
                <span className="text-sm text-tactical-silver">POTENCIAL:</span>
              </div>
              <span className={`text-sm font-bold uppercase ${getPotentialColor(client.potential)}`}>
                {client.potential}
              </span>
            </div>
            
            {/* Vasilhame */}
            <div className="flex items-center justify-between p-3 bg-tactical-darkgray/50 rounded-sm">
              <div className="flex items-center">
                <Wine className="h-5 w-5 text-heineken mr-2" />
                <span className="text-sm text-tactical-silver">VASILHAME:</span>
              </div>
              <span className={`text-sm ${client.bottle ? 'text-heineken-neon' : 'text-[#ea384c]'}`}>
                {client.bottle ? "SIM" : "NÃO"}
              </span>
            </div>
            
            {/* Endereço Completo */}
            <div className="border border-heineken/20 rounded-sm p-3 mt-4">
              <h3 className="text-xs font-bold text-tactical-silver uppercase mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> 
                Endereço Completo
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-start">
                  <MapPinned className="h-4 w-4 text-tactical-silver mr-2 mt-0.5" />
                  <span className="text-tactical-silver">{client.address.street}</span>
                </div>
                <div className="flex items-start">
                  <Building2 className="h-4 w-4 text-tactical-silver mr-2 mt-0.5" />
                  <span className="text-tactical-silver">{client.address.neighborhood}, {client.address.city}</span>
                </div>
                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-tactical-silver mr-2 mt-0.5" />
                  <span className="text-tactical-silver">CEP: {client.address.zipCode}</span>
                </div>
                <div className="flex items-start text-xs text-tactical-silver/70 mt-1">
                  <span>LAT: {client.position.lat.toFixed(5)}</span>
                  <span className="mx-2">•</span>
                  <span>LONG: {client.position.lng.toFixed(5)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer/Action */}
          <div className="p-4 border-t border-heineken/20">
            <Button 
              onClick={handleConfirmConversion} 
              className={`w-full tactical-button py-6 ${
                isTargetHit 
                  ? 'bg-heineken/80 text-white' 
                  : 'bg-tactical-darkgray border border-heineken text-heineken-neon'
              }`}
            >
              {isTargetHit ? "ALVO ATINGIDO" : "ALVO"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;
