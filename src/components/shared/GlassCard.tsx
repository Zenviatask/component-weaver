import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn(
      "rounded-2xl border border-gray-100 bg-white/30 backdrop-blur-md shadow-sm transition-shadow hover:shadow-md",
      className
    )}>
      {children}
    </div>
  );
};
