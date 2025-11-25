import { Bell, ChevronDown, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainDropdown from "@/components/DomainDropdown";

export const DashboardHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Use caminho absoluto para imagens em public */}
        <img src="/LEVANTA-01.svg" alt="Levantec Logo" className="h-8 w-auto align-middle" draggable={false} style={{ display: "block" }} />
      </div>
      <div className="flex items-center gap-4">
        <div>
          <DomainDropdown />
        </div>

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
