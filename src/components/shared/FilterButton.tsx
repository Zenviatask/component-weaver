import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  onClick?: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <Button
      variant="outline"
      className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
      onClick={onClick}
    >
      <Filter className="h-4 w-4" />
      Filtros
    </Button>
  );
};
