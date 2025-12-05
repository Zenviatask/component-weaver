import { LayoutDashboard, Globe, FileText, Sparkles, LayoutTemplate, Settings, HelpCircle, ChevronDown, User, MessageSquare, Image, Briefcase, Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Widgets", icon: Sparkles, url: "/widgets" },
  { title: "Usuários", icon: Users, url: "/usuarios" },
  { title: "Configurações", icon: Settings, url: "/settings" },
  { title: "Ajuda", icon: HelpCircle, url: "/help" },
];

const blogSubItems = [
  { title: "Posts", icon: FileText, url: "/pages" },
  { title: "Perfis", icon: User, url: "/sites/perfis" },
];

const sitesSubItems = [
  { title: "Depoimentos", icon: MessageSquare, url: "/sites/depoimentos" },
  { title: "Páginas", icon: FileText, url: "/sites/paginas" },
  { title: "Galeria de imagens", icon: Image, url: "/sites/galeria" },
  { title: "Serviços", icon: Briefcase, url: "/sites/servicos" },
  { title: "Time", icon: Users, url: "/sites/time" },
];

const ecommerceSubItems = [
  { title: "Produtos", icon: Package, url: "/ecommerce/produtos" },
  { title: "Vendas", icon: DollarSign, url: "/ecommerce/vendas" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const [blogOpen, setBlogOpen] = useState(false);
  const [sitesOpen, setSitesOpen] = useState(false);
  const [ecommerceOpen, setEcommerceOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isBlogActive = location.pathname === "/pages" || location.pathname === "/sites/perfis";
  const isSitesActive = location.pathname.startsWith("/sites") && location.pathname !== "/sites/perfis";
  const isEcommerceActive = location.pathname.startsWith("/ecommerce");

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBlogOpen(false);
    setSitesOpen(false);
    setEcommerceOpen(false);
  };

  return (
    <aside
      className="group fixed bottom-4 left-4 top-20 z-40 w-[67px] rounded-2xl bg-slate-800 transition-all duration-300 hover:w-56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="mt-2 p-3">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={`flex h-12 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${location.pathname === "/" ? "bg-blue-500/20 !text-blue-400" : ""
            }`}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Dashboard
          </span>
        </NavLink>

        {/* Blog with submenu */}
        <Collapsible open={blogOpen} onOpenChange={setBlogOpen} className="mt-1">
          <CollapsibleTrigger
            className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isBlogActive ? "bg-blue-500/20 !text-blue-400" : ""
              }`}
          >
            <FileText className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex-1 text-left">
              Blog
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 ${blogOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className={`overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${!isHovered ? 'hidden' : ''}`}>
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-600 pl-2">
              {blogSubItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    end
                    className={`flex h-10 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isActive ? "bg-blue-500/20 !text-blue-400" : ""
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Sites with submenu */}
        <Collapsible open={sitesOpen} onOpenChange={setSitesOpen} className="mt-1">
          <CollapsibleTrigger
            className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isSitesActive ? "bg-blue-500/20 !text-blue-400" : ""
              }`}
          >
            <Globe className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex-1 text-left">
              Sites
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 ${sitesOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className={`overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${!isHovered ? 'hidden' : ''}`}>
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-600 pl-2">
              {sitesSubItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    end
                    className={`flex h-10 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isActive ? "bg-blue-500/20 !text-blue-400" : ""
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* E-commerce with submenu */}
        <Collapsible open={ecommerceOpen} onOpenChange={setEcommerceOpen} className="mt-1">
          <CollapsibleTrigger
            className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isEcommerceActive ? "bg-blue-500/20 !text-blue-400" : ""
              }`}
          >
            <ShoppingCart className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex-1 text-left">
              E-commerce
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 ${ecommerceOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className={`overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${!isHovered ? 'hidden' : ''}`}>
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-600 pl-2">
              {ecommerceSubItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    end
                    className={`flex h-10 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white ${isActive ? "bg-blue-500/20 !text-blue-400" : ""
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Other nav items */}
        {navItems.slice(1).map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              end
              className={`flex h-12 items-center gap-3 rounded-xl px-3 text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-white mt-1 ${isActive ? "bg-blue-500/20 !text-blue-400" : ""
                }`}
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
