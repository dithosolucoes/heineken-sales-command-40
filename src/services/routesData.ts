
import { RouteData } from "@/components/supervisor/routes/RouteCard";

// Example data for routes
export const rotasData: RouteData[] = [
  {
    id: 1,
    vendedor: "Carlos Silva",
    regiao: "São Paulo - Zona Sul",
    clientes: 18,
    clientesVisitados: 12,
    ultimaAtualizacao: "2023-05-10T10:30:00",
    coordenadas: {
      lat: -23.5505,
      lng: -46.6333,
      zoom: 12
    },
    pontosDeVenda: [
      { id: 1, nome: "Bar do Zé", visitado: true, latitude: -23.5475, longitude: -46.6361 },
      { id: 2, nome: "Empório São Paulo", visitado: true, latitude: -23.5605, longitude: -46.6500 },
      { id: 3, nome: "Mercado Central", visitado: false, latitude: -23.5430, longitude: -46.6282 },
      { id: 4, nome: "Loja de Conveniência 24h", visitado: true, latitude: -23.5552, longitude: -46.6388 }
    ]
  },
  {
    id: 2,
    vendedor: "Ana Oliveira",
    regiao: "São Paulo - Zona Leste",
    clientes: 22,
    clientesVisitados: 15,
    ultimaAtualizacao: "2023-05-10T14:15:00",
    coordenadas: {
      lat: -23.5430,
      lng: -46.5680,
      zoom: 12
    },
    pontosDeVenda: [
      { id: 5, nome: "Distribuidora Leste", visitado: true, latitude: -23.5380, longitude: -46.5550 },
      { id: 6, nome: "Supermercado Economia", visitado: true, latitude: -23.5480, longitude: -46.5700 },
      { id: 7, nome: "Adega Moreira", visitado: false, latitude: -23.5300, longitude: -46.5800 }
    ]
  },
  {
    id: 3,
    vendedor: "Roberto Santos",
    regiao: "São Paulo - Centro",
    clientes: 15,
    clientesVisitados: 10,
    ultimaAtualizacao: "2023-05-10T16:45:00",
    coordenadas: {
      lat: -23.5489,
      lng: -46.6388,
      zoom: 13
    },
    pontosDeVenda: [
      { id: 8, nome: "Bar do Centro", visitado: true, latitude: -23.5470, longitude: -46.6380 },
      { id: 9, nome: "Restaurante Paulista", visitado: true, latitude: -23.5560, longitude: -46.6580 },
      { id: 10, nome: "Pub Inglês", visitado: false, latitude: -23.5500, longitude: -46.6480 }
    ]
  }
];

// Filter routes based on search term and selected seller
export const filterRoutes = (searchTerm: string, selectedVendedor: string): RouteData[] => {
  return rotasData
    .filter(rota => rota.vendedor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     rota.regiao.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(rota => selectedVendedor === "todos" || rota.vendedor === selectedVendedor);
};

// Get unique list of sellers for the filter
export const getUniqueSellers = (): string[] => {
  return [...new Set(rotasData.map(rota => rota.vendedor))];
};
