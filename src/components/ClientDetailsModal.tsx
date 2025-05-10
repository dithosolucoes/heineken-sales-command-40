
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, Store, ChevronRight } from "lucide-react";
import { ClientData } from "@/types/client";
import { getPotentialColor } from "@/utils/clientData";
import TargetButton from "./TargetButton";

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
  onConfirmConversion: (clientId: string) => void;
}

const ClientDetailsModal = ({
  isOpen,
  onClose,
  client,
  onConfirmConversion,
}: ClientDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("detalhes");

  useEffect(() => {
    if (isOpen && client) {
      setActiveTab("detalhes");
    }
  }, [isOpen, client]);

  if (!client) return null;

  const handleConfirm = () => {
    onConfirmConversion(client.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-tactical-black border-heineken/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-heineken-neon flex items-center text-lg">
            <Store className="mr-2" size={18} />
            {client.name}
          </DialogTitle>
          <div className="flex items-center text-sm text-tactical-silver">
            <Badge
              className={`${
                client.converted
                  ? "bg-green-500/20 text-green-500"
                  : "bg-yellow-500/20 text-yellow-500"
              }`}
            >
              {client.converted ? "CONVERTIDO" : "NÃO CONVERTIDO"}
            </Badge>
            <div className="mx-2 text-tactical-silver/30">•</div>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${getPotentialColor(
                  client.potential
                )} mr-1`}
              ></div>
              <span className="capitalize">{client.potential}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="pb-4">
          <div className="flex items-center text-tactical-silver mb-4">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <span>
              {client.address.street}, {client.address.number} -{" "}
              {client.address.neighborhood}, {client.address.city}/
              {client.address.state}
            </span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-tactical-darkgray/50 border border-heineken/20 w-full h-10 p-0">
              <TabsTrigger
                value="detalhes"
                className="flex-1 data-[state=active]:bg-heineken data-[state=active]:text-white rounded-none h-full"
              >
                Detalhes
              </TabsTrigger>
              <TabsTrigger
                value="historico"
                className="flex-1 data-[state=active]:bg-heineken data-[state=active]:text-white rounded-none h-full"
              >
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes" className="pt-4">
              <div className="tactical-panel p-3 mb-4">
                <h3 className="text-xs text-tactical-silver mb-2">CONTATOS</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone
                      size={16}
                      className="mr-2 text-heineken flex-shrink-0"
                    />
                    <span>(11) 99999-8888</span>
                  </div>
                </div>
              </div>

              <div className="tactical-panel p-3 mb-4">
                <h3 className="text-xs text-tactical-silver mb-2">
                  PRÓXIMA VISITA
                </h3>
                <div className="flex items-center">
                  <Calendar
                    size={16}
                    className="mr-2 text-heineken flex-shrink-0"
                  />
                  <span>
                    {client.nextVisit
                      ? client.nextVisit.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "Não agendada"}
                  </span>
                </div>
              </div>

              <div className="tactical-panel p-3 mb-6">
                <h3 className="text-xs text-tactical-silver mb-2">OBSERVAÇÕES</h3>
                <p className="text-sm">
                  {client.notes || "Sem observações adicionais."}
                </p>
              </div>

              <div className="flex justify-center mt-4">
                {!client.converted && <TargetButton onClick={handleConfirm} />}
                {client.converted && (
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <Target size={24} />
                    </div>
                    <span className="text-green-500 text-sm mt-2">Alvo já atingido</span>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="historico" className="pt-4">
              <div className="space-y-3">
                <div className="tactical-panel p-3 border-l-4 border-green-500">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-tactical-silver">
                      12/04/2023
                    </span>
                    <Badge variant="outline" className="text-green-500">
                      Visita
                    </Badge>
                  </div>
                  <p className="text-sm">Apresentação dos produtos realizada.</p>
                </div>

                <div className="tactical-panel p-3 border-l-4 border-heineken">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-tactical-silver">
                      05/03/2023
                    </span>
                    <Badge variant="outline" className="text-heineken">
                      Contato
                    </Badge>
                  </div>
                  <p className="text-sm">Telefonema para agendamento.</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-heineken/30 text-heineken"
              >
                Ver histórico completo <ChevronRight size={16} className="ml-1" />
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;
