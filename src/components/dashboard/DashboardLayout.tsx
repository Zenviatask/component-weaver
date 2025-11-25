import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative min-h-screen w-full bg-slate-200">
        <DashboardHeader />
        <DashboardSidebar />
        
        <main className="min-h-screen pb-4 pl-24 pr-4 pt-20 transition-all duration-300">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
