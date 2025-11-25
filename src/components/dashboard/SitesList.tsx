import { ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const sites = [
  {
    name: "meusite.com.br",
    status: "Hospedado · Ativo",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop",
  },
  {
    name: "blogdaclara.com",
    status: "Hospedado · Ativo",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&h=120&fit=crop",
  },
  {
    name: "lojavirtual.com",
    status: "Em manutenção",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=120&fit=crop",
  },
];

export const SitesList = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800">Seus Sites</h3>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-slate-800">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      <div>
        {sites.map((site, index) => (
          <div
            key={index}
            className={`group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-gray-50/50 ${
              index > 0 ? "border-t border-gray-50" : ""
            }`}
          >
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <img src={site.image} alt={site.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-slate-800">
                {site.name}
              </p>
              <p className="text-sm text-gray-500">{site.status}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
