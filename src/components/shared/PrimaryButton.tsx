import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export const PrimaryButton = ({ children, onClick, type = "button", className }: PrimaryButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        "gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
        className
      )}
    >
      {children}
    </Button>
  );
};
