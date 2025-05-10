
import React from "react";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TargetButtonProps {
  onClick: () => void;
  className?: string;
}

const TargetButton: React.FC<TargetButtonProps> = ({ onClick, className }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Button 
        onClick={onClick} 
        size="icon"
        className="h-16 w-16 rounded-full bg-heineken hover:bg-heineken/90 text-white shadow-lg flex items-center justify-center relative p-0 transition-all hover:scale-105"
      >
        <div className="absolute inset-2 rounded-full border-2 border-white opacity-70 animate-pulse"></div>
        <Target size={24} strokeWidth={2.5} />
      </Button>
      <span className="text-tactical-silver text-sm mt-2">Alvo Atingido</span>
    </div>
  );
};

export default TargetButton;
