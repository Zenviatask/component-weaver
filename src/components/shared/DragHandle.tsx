import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DragHandleProps {
  className?: string;
}

export const DragHandle = ({ className }: DragHandleProps) => {
  return (
    <div className={cn("cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing", className)}>
      <GripVertical className="h-5 w-5" />
    </div>
  );
};
