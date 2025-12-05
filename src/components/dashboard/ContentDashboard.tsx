import { Globe, Rocket, MessageSquare, Activity } from "lucide-react";
import { DashboardLayout } from "./DashboardLayout";
import { StatCard } from "./StatCard";
import { DashboardWidgetsContainer } from "./DashboardWidgetsContainer";

export const ContentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10 ">
        {/* Stats Grid */}
        {/*<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>*/}

        {/* Main Content */}
        <div className="mt-6">
          <DashboardWidgetsContainer />
        </div>
      </div>
    </DashboardLayout>
  );
};
