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
import { DragHandle } from "@/components/shared";

export const DashboardWidgetsContainer = () => {
    const navigate = useNavigate();
    const [enabledWidgets, setEnabledWidgets] = useState<string[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("dashboardWidgets");
        if (saved) {
            const parsed = JSON.parse(saved);
            // We need to respect the saved order, but also filter by enabled status if that logic exists.
            // The previous logic was: const enabled = parsed.filter((w: any) => w.enabled).map((w: any) => w.id);
            // This assumes 'parsed' is the full list of widget definitions.
            // If we want to persist ORDER, we should save the ordered list of IDs or the full definitions in order.

            // Let's assume 'dashboardWidgets' stores the full config array.
            // We extract enabled IDs in order.
            const enabled = parsed.filter((w: any) => w.enabled).map((w: any) => w.id);
            setEnabledWidgets(enabled);
        }
    }, []);

    // Function to save the new order to localStorage
    const saveNewOrder = (newOrderIds: string[]) => {
        const saved = localStorage.getItem("dashboardWidgets");
        if (saved) {
            const parsed = JSON.parse(saved);
            // We need to reorder the 'parsed' array to match 'newOrderIds' for the enabled ones,
            // while keeping disabled ones... or just update the order of enabled ones.
            // Simpler approach: Reconstruct the full list.
            // Find the definitions for the enabled widgets in the new order.
            const enabledDefinitions = newOrderIds.map(id => parsed.find((w: any) => w.id === id)).filter(Boolean);
            // Find disabled widgets
            const disabledDefinitions = parsed.filter((w: any) => !newOrderIds.includes(w.id));

            // Combine them (enabled first, or keep disabled at end? Doesn't matter much for display if we only show enabled)
            // But to preserve the user's custom order, we should save the new order.
            const newFullList = [...enabledDefinitions, ...disabledDefinitions];

            localStorage.setItem("dashboardWidgets", JSON.stringify(newFullList));
        }
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newWidgets = [...enabledWidgets];
        const draggedItem = newWidgets[draggedIndex];
        newWidgets.splice(draggedIndex, 1);
        newWidgets.splice(index, 0, draggedItem);

        setEnabledWidgets(newWidgets);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        saveNewOrder(enabledWidgets);
    };

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
            {enabledWidgets.map((id, index) => (
                <div
                    key={id}
                    className={`h-full min-h-[200px] ${getColSpan(id)} relative group transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-95' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                >
                    {/* Drag Handle Overlay */}
                    <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-md shadow-sm">
                        <DragHandle className="cursor-grab active:cursor-grabbing p-1" />
                    </div>

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
