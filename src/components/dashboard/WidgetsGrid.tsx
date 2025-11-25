import { Image, Camera, Mail, Rss, Map, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const widgets = [
  { icon: Image, label: "Galeria Fotos", bgColor: "bg-blue-100", textColor: "text-blue-600" },
  { icon: Camera, label: "Slider Imagens", bgColor: "bg-purple-100", textColor: "text-purple-600" },
  { icon: Mail, label: "Formulário", bgColor: "bg-green-100", textColor: "text-green-600" },
  { icon: Rss, label: "Feed de Blog", bgColor: "bg-orange-100", textColor: "text-orange-600" },
  { icon: Map, label: "Mapa Interativo", bgColor: "bg-pink-100", textColor: "text-pink-600" },
  { icon: Users, label: "Depoimentos", bgColor: "bg-cyan-100", textColor: "text-cyan-600" },
  { icon: Sparkles, label: "Integrações", bgColor: "bg-amber-100", textColor: "text-amber-600" },
];

export const WidgetsGrid = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-slate-800">Widgets</h3>
      <div className="grid grid-cols-4 gap-3">
        {widgets.map((widget, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex flex-col items-center gap-2 rounded-xl p-3 hover:bg-gray-50"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${widget.bgColor} ${widget.textColor}`}>
              <widget.icon className="h-6 w-6" />
            </div>
            <span className="text-center text-xs leading-tight text-gray-600">{widget.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
