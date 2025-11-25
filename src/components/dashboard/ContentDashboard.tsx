import { Globe, Rocket, MessageSquare, Activity } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { StatCard } from "./StatCard";
import { TrafficChart } from "./TrafficChart";
import { WidgetsGrid } from "./WidgetsGrid";
import { FunctionalityButtons } from "./FunctionalityButtons";
import { SitesList } from "./SitesList";
import { PagesGallery } from "./PagesGallery";

export const ContentDashboard = () => {
  return (
    <div className="relative min-h-screen bg-slate-200">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="min-h-screen pb-4 pl-24 pr-4 pt-20">
        <div className="p-4 lg:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Sites Ativos"
              value="2"
              change="+2 este mês"
              icon={Globe}
              iconBgColor="bg-blue-50"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Performance SEO"
              value="87%"
              change="+5% melhoria"
              icon={Rocket}
              iconBgColor="bg-green-50"
              iconColor="text-green-500"
            />
            <StatCard
              title="Comentários"
              value="156"
              change="+23 novos"
              icon={MessageSquare}
              iconBgColor="bg-purple-50"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Uptime"
              value="99.9%"
              change=""
              icon={Activity}
              iconBgColor="bg-orange-50"
              iconColor="text-orange-500"
            />
          </div>

          {/* Main Content Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2">
              <TrafficChart />
              
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <WidgetsGrid />
                <FunctionalityButtons />
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div>
              <SitesList />
            </div>
          </div>

          {/* Pages Gallery - Full Width */}
          <div className="mt-6">
            <PagesGallery />
          </div>
        </div>
      </main>
    </div>
  );
};
