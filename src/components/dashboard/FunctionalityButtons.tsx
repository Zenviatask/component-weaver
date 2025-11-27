import { Search, Sparkles, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";

const functionalities = [
  { 
    icon: Search, 
    label: "SEO", 
    sublabel: "Otimização",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-400"
  },
  { 
    icon: Sparkles, 
    label: "Integrações",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-400"
  },
  { 
    icon: Accessibility, 
    label: "Acessibilidade",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-400"
  },
];

export const FunctionalityButtons = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm bg-white/30 backdrop-blur-md">
      <h3 className="mb-6 text-lg font-semibold text-slate-800">Funcionalidades</h3>
      <div className="flex flex-wrap gap-3">
        {functionalities.map((func, index) => (
          <Button
            key={index}
            className={`flex items-center gap-3 rounded-full ${func.gradient} px-5 py-3 font-medium text-white shadow-sm hover:shadow-md`}
          >
            <func.icon className="h-5 w-5" />
            <span>{func.label}</span>
            {func.sublabel && <span className="text-sm opacity-80">{func.sublabel}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};
