
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, BarChart3, Target, Users, LogOut, Building, Upload } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface HeaderProps {
  userType: "vendedor" | "supervisor" | "admin";
}

// Configuração de menus por tipo de usuário
const menuConfig = {
  vendedor: [
    { name: "Dashboard", path: "/vendedor/dashboard", icon: <BarChart3 size={18} /> },
    { name: "Ranking", path: "/vendedor/ranking", icon: <BarChart3 size={18} /> },
    { name: "Relatório", path: "/vendedor/relatorio", icon: <BarChart3 size={18} /> }
  ],
  supervisor: [
    { name: "Dashboard", path: "/supervisor/dashboard", icon: <BarChart3 size={18} /> },
    { name: "Comparativo", path: "/supervisor/comparativo", icon: <BarChart3 size={18} /> },
    { name: "Missões", path: "/supervisor/missoes", icon: <Target size={18} /> }
  ],
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: <BarChart3 size={18} /> },
    { name: "Filiais", path: "/admin/filiais", icon: <Building size={18} /> },
    { name: "Upload de Dados", path: "/admin/upload-data", icon: <Upload size={18} /> }
  ]
};

// Nomes de exibição por tipo de usuário
const roleDisplayNames = {
  vendedor: "Vendedor",
  supervisor: "Supervisor",
  admin: "Administrador"
};

const Header: React.FC<HeaderProps> = ({ userType }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determinar quais menus mostrar com base no tipo de usuário
  const menus = menuConfig[userType];

  // Verificar se um item está ativo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Rota para voltar ao login
  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout real
    // Por enquanto apenas redireciona para página de login
    window.location.href = '/';
  };

  return (
    <header className="border-b border-heineken/20 bg-tactical-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e Brand */}
          <div className="flex items-center">
            <Link to={`/${userType}/dashboard`} className="flex items-center">
              <span className="text-heineken-neon font-bold text-xl mr-1">HEINEKEN</span>
              <span className="text-white font-medium">TacticalOps</span>
            </Link>
          </div>

          {/* Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {menus.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.path)
                    ? "bg-heineken text-black"
                    : "text-tactical-silver hover:bg-heineken/10 hover:text-heineken-neon"
                )}
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-1.5">{item.icon}</span>}
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-heineken/30 text-tactical-silver hover:bg-heineken/10 hover:text-heineken-neon"
                >
                  <Users size={16} className="mr-1" />
                  {roleDisplayNames[userType]}
                  <ChevronDown size={14} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-tactical-darkgray/95 backdrop-blur-md border-heineken/30">
                <DropdownMenuLabel className="text-tactical-silver">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-heineken/20" />
                <DropdownMenuItem 
                  className="text-tactical-silver hover:bg-heineken/10 hover:text-heineken-neon cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={14} className="mr-1.5" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden text-tactical-silver hover:bg-heineken/10 hover:text-heineken-neon"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-tactical-black border-heineken/30 w-[280px] p-0">
                <SheetHeader className="p-4 border-b border-heineken/20">
                  <SheetTitle className="text-heineken-neon">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="py-4">
                  <div className="px-4 py-2">
                    <p className="text-sm text-tactical-silver">Navegação</p>
                  </div>
                  
                  {menus.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm",
                        isActive(item.path)
                          ? "bg-heineken/20 text-heineken-neon"
                          : "text-tactical-silver hover:bg-heineken/10"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <span className="mr-3 text-current">{item.icon}</span>}
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-heineken/20 mt-4 pt-4">
                    <div className="px-4 py-2">
                      <p className="text-sm text-tactical-silver">Conta</p>
                    </div>
                    
                    <button
                      className="flex w-full items-center px-4 py-3 text-sm text-tactical-silver hover:bg-heineken/10"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} className="mr-3" />
                      Sair
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
