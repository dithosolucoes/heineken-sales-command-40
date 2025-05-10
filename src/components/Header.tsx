import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Users, 
  BarChart3, 
  LogOut, 
  Map, 
  UserRound, 
  LayoutDashboard,
  ClipboardList,
  FileText,
  Building,
  Trophy
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userType: "vendedor" | "supervisor" | "admin";
}

const Header = ({ userType }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Definição das rotas baseadas no tipo de usuário
  const getNavItems = () => {
    switch (userType) {
      case "supervisor":
        return [
          { name: "Dashboard", href: "/supervisor/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
          { name: "Rotas", href: "/supervisor/rotas", icon: <Map className="h-4 w-4" /> },
          { name: "Missões", href: "/supervisor/missoes", icon: <ClipboardList className="h-4 w-4" /> },
          { name: "Relatórios", href: "/supervisor/relatorios", icon: <FileText className="h-4 w-4" /> },
        ];
      case "admin":
        return [
          { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
          { name: "Relatórios", href: "/admin/relatorios", icon: <FileText className="h-4 w-4" /> },
          { name: "Missões", href: "/admin/missoes", icon: <ClipboardList className="h-4 w-4" /> },
        ];
      case "vendedor":
      default:
        return [
          { name: "Dashboard", href: "/vendedor/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
          { name: "Ranking", href: "/vendedor/ranking", icon: <Trophy className="h-4 w-4" /> },
        ];
    }
  };
  
  // Determina o título do header com base no tipo de usuário
  const getUserTitle = () => {
    switch (userType) {
      case "supervisor": 
        return "SUPERVISOR";
      case "admin":
        return "ADMINISTRADOR";
      case "vendedor":
      default:
        return "VENDEDOR";
    }
  };
  
  // Obtém o ícone do tipo de usuário
  const getUserIcon = () => {
    switch (userType) {
      case "supervisor":
        return <Users className="h-5 w-5 text-heineken mr-2" />;
      case "admin":
        return <Building className="h-5 w-5 text-heineken mr-2" />;
      case "vendedor":
      default:
        return <UserRound className="h-5 w-5 text-heineken mr-2" />;
    }
  };

  return (
    <header className="w-full py-2 px-4 bg-tactical-black border-b border-heineken/30 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 text-heineken hover:bg-tactical-darkgray hover:text-heineken-neon md:hidden">
                <Menu />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-tactical-black border-heineken/30 w-[250px] sm:max-w-none">
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center">
                  <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
                  <h2 className="text-lg font-bold text-heineken-neon">Heineken SP SUL</h2>
                </div>
                <nav className="space-y-2 mb-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        location.pathname === item.href
                          ? "bg-heineken text-white"
                          : "text-tactical-silver hover:bg-heineken/20 hover:text-heineken-neon"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-tactical-silver hover:bg-heineken/20 hover:text-heineken-neon transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-lg font-bold text-heineken-neon hidden sm:inline-block">Heineken SP SUL</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors flex items-center",
                location.pathname === item.href
                  ? "bg-heineken text-white"
                  : "text-tactical-silver hover:bg-heineken/20 hover:text-heineken-neon"
              )}
            >
              {item.icon}
              <span className="ml-1">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center text-tactical-silver">
            <div className="bg-tactical-darkgray/80 border border-heineken/30 rounded-md py-1 px-2 flex items-center">
              {getUserIcon()}
              <span className="text-xs font-bold hidden sm:inline">{getUserTitle()}</span>
            </div>
          </div>
          
          <Link to="/" className="text-tactical-silver hover:text-heineken-neon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
