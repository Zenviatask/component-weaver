import { LayoutDashboard, Globe, FileText, Sparkles, LayoutTemplate, Settings, HelpCircle } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, href: "/dashboard", active: true },
  { icon: Globe, href: "/sites" },
  { icon: FileText, href: "/pages" },
  { icon: Sparkles, href: "/widgets" },
  { icon: LayoutTemplate, href: "/templates" },
  { icon: Settings, href: "/settings" },
  { icon: HelpCircle, href: "/help" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="fixed bottom-4 left-4 top-20 z-40 w-20 rounded-2xl bg-slate-800">
      <nav className="mt-2 p-3">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex h-12 items-center justify-center rounded-xl transition-colors duration-200 ${
              item.active
                ? "bg-blue-500/20 text-blue-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            } ${index > 0 ? "mt-1" : ""}`}
          >
            <item.icon className="h-5 w-5" />
          </a>
        ))}
      </nav>
    </aside>
  );
};
