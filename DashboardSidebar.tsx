import { LayoutDashboard, Globe, FileText, Sparkles, LayoutTemplate, Settings, HelpCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Sites", icon: Globe, url: "/sites" },
  { title: "Blog", icon: FileText, url: "/pages" },
  { title: "Widgets", icon: Sparkles, url: "/widgets" },
  { title: "Templates", icon: LayoutTemplate, url: "/templates" },
  { title: "Configurações", icon: Settings, url: "/settings" },
  { title: "Ajuda", icon: HelpCircle, url: "/help" },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="group fixed bottom-4 left-4 top-20 z-40 w-[67px] rounded-2xl bg-slate-800 transition-all duration-300 hover:w-56">
      <nav className="mt-2 p-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.url;
          
          return (
            <NavLink
              key={item.title}
              to={item.url}
              end
              className={`flex h-12 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${
                index > 0 ? "mt-1" : ""
              } ${isActive ? "bg-blue-500/20 !text-blue-400" : ""}`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
