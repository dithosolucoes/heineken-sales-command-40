
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dados de exemplo para filiais
const filiaisData = [
  { 
    id: 1, 
    nome: "São Paulo - Capital", 
    quantidadeSupervisores: 4, 
    quantidadeVendedores: 16, 
    pontos: 340, 
    conversao: "72%" 
  },
  { 
    id: 2, 
    nome: "ABC Paulista", 
    quantidadeSupervisores: 3, 
    quantidadeVendedores: 12, 
    pontos: 220, 
    conversao: "68%" 
  },
  { 
    id: 3, 
    nome: "Campinas", 
    quantidadeSupervisores: 2, 
    quantidadeVendedores: 8, 
    pontos: 180, 
    conversao: "65%" 
  },
  { 
    id: 4, 
    nome: "Litoral", 
    quantidadeSupervisores: 2, 
    quantidadeVendedores: 8, 
    pontos: 150, 
    conversao: "63%" 
  }
];

const AdminFiliais = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Filiais | Admin | Heineken SP SUL";
  }, []);
  
  const handleFilialClick = (filialId: number) => {
    navigate(`/admin/filial/${filialId}`);
  };
  
  return (
    <DashboardLayout userType="admin" pageTitle="Filiais">
      <div className="px-4 py-2 container mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <Building size={20} className="mr-2 text-heineken" />
                Visão Geral de Filiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-tactical-silver mb-4">
                Selecione uma filial para ver detalhes e supervisores associados.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filiaisData.map((filial) => (
            <Card 
              key={filial.id} 
              className="bg-tactical-darkgray/80 border-heineken/30 hover:border-heineken transition-colors cursor-pointer"
              onClick={() => handleFilialClick(filial.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-heineken-neon font-bold flex justify-between items-center">
                  <span className="flex items-center">
                    <Building size={18} className="mr-2" />
                    {filial.nome}
                  </span>
                  <ArrowRight size={16} className="text-tactical-silver" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-tactical-silver">
                    <p className="text-sm">Supervisores</p>
                    <p className="text-xl font-semibold text-white">{filial.quantidadeSupervisores}</p>
                  </div>
                  <div className="text-tactical-silver">
                    <p className="text-sm">Vendedores</p>
                    <p className="text-xl font-semibold text-white">{filial.quantidadeVendedores}</p>
                  </div>
                  <div className="text-tactical-silver">
                    <p className="text-sm">Pontos</p>
                    <p className="text-xl font-semibold text-white">{filial.pontos}</p>
                  </div>
                  <div className="text-tactical-silver">
                    <p className="text-sm">Conversão</p>
                    <p className="text-xl font-semibold text-heineken">{filial.conversao}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFiliais;
