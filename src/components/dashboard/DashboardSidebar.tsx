import { LayoutDashboard, Globe, FileText, Sparkles, LayoutTemplate, Settings, HelpCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Sites", icon: Globe, url: "/sites" },
  { title: "Páginas", icon: FileText, url: "/pages" },
  { title: "Widgets", icon: Sparkles, url: "/widgets" },
  { title: "Templates", icon: LayoutTemplate, url: "/templates" },
  { title: "Configurações", icon: Settings, url: "/settings" },
  { title: "Ajuda", icon: HelpCircle, url: "/help" },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className="fixed bottom-4 left-4 top-20 border-none bg-slate-800 rounded-2xl transition-all duration-300"
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-transparent">
        <SidebarGroup className="mt-2 px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-1 first:mt-0">
                  <SidebarMenuButton
                    asChild
                    className="h-12 rounded-xl transition-colors duration-200 hover:bg-white/5 hover:text-white data-[active=true]:bg-blue-500/20 data-[active=true]:text-blue-400"
                  >
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3 text-gray-400"
                      activeClassName="!bg-blue-500/20 !text-blue-400"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
