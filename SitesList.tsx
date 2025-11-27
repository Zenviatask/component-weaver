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
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white/30 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800">Meus Sites</h3>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-slate-800">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Container responsivo e com scroll automático se houver muitos itens */}
      <div className="overflow-auto max-h-[60vh] p-2">
        <div className="flex flex-col gap-6">
          {sites.map((site, index) => (
            <div 
              key={index}
              className={`group flex items-center cursor-pointer gap-8 p-4 sm:p-6 transition-colors hover:bg-gray-50/50 ${
                index > 0 ? "border-t border-gray-50" : ""
              }`}
              style={{ minHeight: '100px' }}
            >
              {/* Imagem maior e responsiva */}
              <div className="h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <img src={site.image} alt={site.name} className="h-full w-full object-cover" />
              </div>
              {/* Ajuste de fontes responsivas */}
              <div className="flex-1">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-base sm:text-lg text-slate-800">
                  {site.name}
                </p>
                <p className="text-sm sm:text-base text-gray-500">{site.status}</p>
              </div>
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300 transition-colors group-hover:text-blue-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

