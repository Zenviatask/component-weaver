import { useEffect, useState } from "react";
import { LastOrdersWidget } from "./widgets/LastOrdersWidget";
import { EditLastPostWidget } from "./widgets/EditLastPostWidget";
import { GalleryManagerWidget } from "./widgets/GalleryManagerWidget";
import { QuickAccessWidget } from "./widgets/QuickAccessWidget";
import { SiteHealthWidget } from "./widgets/SiteHealthWidget";
import { SitesListWidget } from "./widgets/SitesListWidget";
import { TrafficChartWidget } from "./widgets/TrafficChartWidget";
import { PagesGalleryWidget } from "./widgets/PagesGalleryWidget";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardWidgetsContainer = () => {
    const navigate = useNavigate();
    const [enabledWidgets, setEnabledWidgets] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("dashboardWidgets");
        if (saved) {
            const parsed = JSON.parse(saved);
            const enabled = parsed.filter((w: any) => w.enabled).map((w: any) => w.id);
            setEnabledWidgets(enabled);
        }
    }, []);

    const renderWidget = (id: string) => {
        switch (id) {
            case "last-orders":
                return <LastOrdersWidget />;
            case "edit-last-post":
                return <EditLastPostWidget />;
            case "gallery-manager":
                return <GalleryManagerWidget />;
            case "quick-access":
                return <QuickAccessWidget />;
            case "site-health":
                return <SiteHealthWidget />;
            case "sites-list":
                return <SitesListWidget />;
            case "traffic-chart":
                return <TrafficChartWidget />;
            case "pages-gallery":
                return <PagesGalleryWidget />;
            default:
                return null;
        }
    };

    const getColSpan = (id: string) => {
        switch (id) {
            case "traffic-chart":
            case "pages-gallery":
                return "md:col-span-2";
            default:
                return "col-span-1";
        }
    };

    if (enabledWidgets.length === 0) {
        return (
            <div className="col-span-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <Plus className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800">Nenhum widget adicionado</h3>
                    <p className="text-sm text-muted-foreground">Personalize seu dashboard adicionando widgets úteis.</p>
                </div>
                <Button onClick={() => navigate("/widgets")}>
                    Adicionar Widgets
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enabledWidgets.map((id) => (
                <div key={id} className={`h-full min-h-[200px] ${getColSpan(id)}`}>
                    {renderWidget(id)}
                </div>
            ))}

            <div className="flex items-center justify-center border-2 border-dashed rounded-xl p-4 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[200px]" onClick={() => navigate("/widgets")}>
                <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-blue-600">
                    <Plus className="h-5 w-5" />
                    <span className="text-sm font-medium">Adicionar mais</span>
                </div>
            </div>
        </div>
    );
};
