import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/30 backdrop-blur-md p-12">
      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-center mb-4">
        {description}
      </p>
    </div>
  );
};
