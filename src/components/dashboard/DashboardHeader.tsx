import { Bell, ChevronDown, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
          <span className="text-lg font-bold text-white">L</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">LEVANTEC</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex items-center gap-2 rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-sm">🌐</div>
          <span className="text-sm font-medium text-slate-800">meusite.com.br</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
        
        <div className="h-8 w-px bg-gray-200" />
        
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-400 hover:text-slate-800">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100">
          <User className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};
