import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="min-h-screen pb-4 pl-24 pr-4 pt-20">
        {children}
      </main>
    </div>
  );
};
