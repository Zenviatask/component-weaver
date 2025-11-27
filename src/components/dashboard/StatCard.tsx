import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  changePositive?: boolean;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconBgColor, 
  iconColor,
  changePositive = true 
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm bg-white/30 backdrop-blur-md transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
          <p className={`mt-2 flex items-center gap-1 text-sm ${changePositive ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-xs">{changePositive ? '↑' : '↓'}</span> {change}
          </p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} ${iconColor}`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};
