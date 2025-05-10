
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trophy, Bell, LogOut, User, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  userType: "vendedor";
}

const Header = ({ userType }: HeaderProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();

  // Generate navigation links based on user type
  const getNavigationLinks = () => {
    switch (userType) {
      case "vendedor":
        return [
          { name: "Dashboard", path: "/vendedor/dashboard" },
          { name: "Ranking", path: "/vendedor/ranking" },
        ];
      default:
        return [];
    }
  };

  const navigationLinks = getNavigationLinks();

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-tactical-black border-b border-tactical-darkgray/90 py-2 relative z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white p-1">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-tactical-black border-r border-tactical-darkgray p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-tactical-darkgray flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="/placeholder.svg"
                      alt="Logo"
                      className="h-8 mr-2"
                    />
                    <span className="text-lg font-bold text-heineken">
                      Tactical
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSheetOpen(false)}
                    className="text-tactical-silver"
                  >
                    <X size={18} />
                  </Button>
                </div>
                <div className="p-4 flex-1">
                  <nav className="space-y-1">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsSheetOpen(false)}
                        className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                          isActive(link.path)
                            ? "bg-heineken text-white"
                            : "text-tactical-silver hover:bg-tactical-darkgray hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="p-4 border-t border-tactical-darkgray">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-tactical-silver"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Logo */}
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-heineken hidden sm:inline">
              Tactical
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                  isActive(link.path)
                    ? "bg-heineken text-white"
                    : "text-tactical-silver hover:bg-tactical-darkgray hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-tactical-silver relative"
          >
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-heineken" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar className="h-8 w-8 border border-tactical-darkgray">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-tactical-darkgray text-white">
                    JV
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">João Vendedor</p>
                  <p className="text-xs text-tactical-silver">
                    Vendedor - SP Sul
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-tactical-darkgray border-heineken/20 min-w-[200px]"
            >
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-tactical-silver/20" />
              <DropdownMenuItem className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Trophy className="mr-2 h-4 w-4" />
                <span>Meus Alvos</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-tactical-silver/20" />
              <DropdownMenuItem className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
