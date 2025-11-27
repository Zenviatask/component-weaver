import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const pages = [
  { name: "Home", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200&h=120&fit=crop" },
  { name: "Sobre Nós", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop" },
  { name: "Serviços", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop" },
  { name: "Contato", image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=200&h=120&fit=crop" },
];

export const PagesGallery = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white/30 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800">Área de Páginas</h3>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-slate-800">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-6 pt-5 pb-3">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {pages.map((page, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative mb-2 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={page.image} 
                  alt={page.name} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-slate-800">
                {page.name}
              </p>
            </div>
          ))}
        </div>

        {/* Botão de adicionar páginas */}
        <div className="mt-6 flex">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl text-white font-medium border-0 hover:bg-blue-100 transition-colors"
            style={{
              background: "linear-gradient(90deg, #3363ccff 0%, #2b59ecff 100%)"
            }}
          >
            + Adicionar páginas
          </Button>
        </div>

      </div>
    </div>
  );
};
