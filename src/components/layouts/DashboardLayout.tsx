
import { ReactNode } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "vendedor" | "supervisor" | "admin";
  pageTitle: string;
}

const DashboardLayout = ({ children, userType, pageTitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userType={userType} />
      {userType === "admin" && (
        <div className="bg-tactical-darkergray border-b border-tactical-darkgray">
          <div className="container mx-auto flex items-center space-x-4 px-4">
            <Link to="/admin/dashboard" className="py-3 px-2 flex items-center text-sm hover:text-heineken">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
              Dashboard
            </Link>
            <Link to="/admin/filiais" className="py-3 px-2 flex items-center text-sm hover:text-heineken">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              Filiais
            </Link>
            <Link to="/admin/ranking" className="py-3 px-2 flex items-center text-sm hover:text-heineken">
              <Trophy size={16} className="mr-2" />
              Ranking
            </Link>
            <Link to="/admin/upload-data" className="py-3 px-2 flex items-center text-sm hover:text-heineken">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload de Dados
            </Link>
          </div>
        </div>
      )}
      <div className="flex-1 relative">
        {pageTitle && <h1 className="text-2xl font-bold mb-4 ml-4 mt-4 text-tactical z-10 relative">{pageTitle}</h1>}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
