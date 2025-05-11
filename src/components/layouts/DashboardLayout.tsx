
import { ReactNode } from "react";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "vendedor" | "supervisor" | "admin";
  pageTitle: string;
}

const DashboardLayout = ({ children, userType, pageTitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userType={userType} />
      <div className="flex-1 relative">
        {pageTitle && <h1 className="text-2xl font-bold mb-4 ml-4 mt-4 text-tactical z-10 relative">{pageTitle}</h1>}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
