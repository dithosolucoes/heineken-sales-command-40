
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tipo para usuários
type UserRole = 'vendedor' | 'supervisor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  region: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

const AdminUserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados simulados de usuários
  const [users] = useState<User[]>([
    { id: "1", name: "Carlos Silva", email: "carlos.silva@example.com", role: "vendedor", region: "Zona Sul", status: "active", lastActive: "2025-05-09" },
    { id: "2", name: "Ana Oliveira", email: "ana.oliveira@example.com", role: "vendedor", region: "Centro", status: "active", lastActive: "2025-05-10" },
    { id: "3", name: "Roberto Santos", email: "roberto.santos@example.com", role: "supervisor", region: "Zona Norte", status: "active", lastActive: "2025-05-10" },
    { id: "4", name: "Juliana Costa", email: "juliana.costa@example.com", role: "vendedor", region: "Zona Oeste", status: "active", lastActive: "2025-05-08" },
    { id: "5", name: "Fernando Lima", email: "fernando.lima@example.com", role: "supervisor", region: "Zona Sul", status: "inactive", lastActive: "2025-05-01" },
    { id: "6", name: "Marcela Dias", email: "marcela.dias@example.com", role: "vendedor", region: "Zona Leste", status: "active", lastActive: "2025-05-09" },
    { id: "7", name: "Paulo Mendes", email: "paulo.mendes@example.com", role: "admin", region: "Geral", status: "active", lastActive: "2025-05-10" },
    { id: "8", name: "Camila Rocha", email: "camila.rocha@example.com", role: "vendedor", region: "Centro", status: "inactive", lastActive: "2025-04-28" },
    { id: "9", name: "Ricardo Alves", email: "ricardo.alves@example.com", role: "vendedor", region: "Zona Norte", status: "active", lastActive: "2025-05-07" },
    { id: "10", name: "Sandra Batista", email: "sandra.batista@example.com", role: "supervisor", region: "Zona Oeste", status: "active", lastActive: "2025-05-06" },
  ]);

  // Filtrar usuários com base no termo de busca
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para traduzir a função do usuário
  const translateRole = (role: UserRole): string => {
    const roles = {
      'vendedor': 'Vendedor',
      'supervisor': 'Supervisor',
      'admin': 'Administrador'
    };
    return roles[role];
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-heineken">Gerenciamento de Usuários</h2>

      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar por nome, e-mail, região..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tactical-darkgray/50 border-tactical-darkgray pl-10 text-white"
          />
        </div>
      </div>

      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-medium text-white">Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-tactical-darkgray/90 border-b border-heineken/20">
                  <TableHead className="text-tactical-silver">Nome</TableHead>
                  <TableHead className="text-tactical-silver">E-mail</TableHead>
                  <TableHead className="text-tactical-silver">Função</TableHead>
                  <TableHead className="text-tactical-silver">Região</TableHead>
                  <TableHead className="text-tactical-silver">Status</TableHead>
                  <TableHead className="text-tactical-silver">Último Acesso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow 
                      key={user.id} 
                      className="hover:bg-tactical-darkgray/90 cursor-pointer border-b border-tactical-darkgray/30"
                    >
                      <TableCell className="text-white font-medium">{user.name}</TableCell>
                      <TableCell className="text-tactical-silver">{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-900/50 text-purple-300' : 
                          user.role === 'supervisor' ? 'bg-blue-900/50 text-blue-300' : 
                          'bg-green-900/50 text-green-300'
                        }`}>
                          {translateRole(user.role)}
                        </span>
                      </TableCell>
                      <TableCell className="text-tactical-silver">{user.region}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                        }`}>
                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell className="text-tactical-silver">{user.lastActive}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-tactical-silver">
                      Nenhum usuário encontrado com os filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserList;
