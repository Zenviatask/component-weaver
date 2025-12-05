import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, FileEdit, Image, Zap, Plus, Check, Globe, BarChart3, Layout } from "lucide-react";
import { toast } from "sonner";

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
  colSpan?: string;
}

const availableWidgets = [
  {
    id: "last-orders",
    title: "Últimos Pedidos",
    description: "Visualize os 3 últimos pedidos realizados na loja.",
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "edit-last-post",
    title: "Editar Último Post",
    description: "Atalho rápido para editar a publicação mais recente do blog.",
    icon: FileEdit,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: "gallery-manager",
    title: "Galeria de Imagens",
    description: "Gerencie e organize as imagens da sua galeria.",
    icon: Image,
    color: "text-pink-600 bg-pink-100",
  },
  {
    id: "site-health",
    title: "Saúde do Site",
    description: "Monitore a performance, SEO e uptime do seu site.",
    icon: Zap,
    color: "text-green-600 bg-green-100",
  },
  {
    id: "sites-list",
    title: "Meus Sites",
    description: "Lista de sites ativos e seus status.",
    icon: Globe,
    color: "text-indigo-600 bg-indigo-100",
    colSpan: "col-span-1",
  },
  {
    id: "traffic-chart",
    title: "Tráfego do Site",
    description: "Gráfico de visualizações e métricas de tráfego.",
    icon: BarChart3,
    color: "text-cyan-600 bg-cyan-100",
    colSpan: "col-span-2",
  },
  {
    id: "pages-gallery",
    title: "Área de Páginas",
    description: "Galeria de páginas do site para edição rápida.",
    icon: Layout,
    color: "text-orange-600 bg-orange-100",
    colSpan: "col-span-2",
  },
  {
    id: "quick-access",
    title: "Acesso Rápido",
    description: "Botões de atalho para as funções mais usadas.",
    icon: Zap,
    color: "text-yellow-600 bg-yellow-100",
  },
];

const Widgets = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    // Load saved widgets from localStorage or initialize with defaults
    const saved = localStorage.getItem("dashboardWidgets");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge saved state with available widgets definition (in case definitions changed)
      const merged = availableWidgets.map(w => ({
        ...w,
        enabled: parsed.find((p: any) => p.id === w.id)?.enabled || false
      }));
      setWidgets(merged);
    } else {
      setWidgets(availableWidgets.map(w => ({ ...w, enabled: false })));
    }
  }, []);

  const toggleWidget = (id: string) => {
    const newWidgets = widgets.map(w =>
      w.id === id ? { ...w, enabled: !w.enabled } : w
    );
    setWidgets(newWidgets);

    // Save only the enabled state
    const toSave = newWidgets.map(({ id, enabled }) => ({ id, enabled }));
    localStorage.setItem("dashboardWidgets", JSON.stringify(toSave));

    const widget = newWidgets.find(w => w.id === id);
    if (widget?.enabled) {
      toast.success(`${widget.title} adicionado ao dashboard`);
    } else {
      toast.info(`${widget.title} removido do dashboard`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10 space-y-6">
        <PageHeader
          title="Widgets"
          description="Personalize seu dashboard com widgets úteis"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <Card key={widget.id} className={`transition-all duration-300 ${widget.enabled ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' : 'hover:shadow-md'}`}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className={`p-2 rounded-xl ${widget.color}`}>
                  <widget.icon className="h-6 w-6" />
                </div>
                <Switch
                  checked={widget.enabled}
                  onCheckedChange={() => toggleWidget(widget.id)}
                />
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg mb-2">{widget.title}</CardTitle>
                <CardDescription>{widget.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant={widget.enabled ? "secondary" : "outline"}
                  className="w-full gap-2"
                  onClick={() => toggleWidget(widget.id)}
                >
                  {widget.enabled ? (
                    <>
                      <Check className="h-4 w-4" />
                      Adicionado
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Widgets;
