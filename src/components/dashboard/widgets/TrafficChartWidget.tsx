import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrafficChart } from "../TrafficChart";

export const TrafficChartWidget = () => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Tráfego do Site
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* TrafficChart already has its own padding/card structure, we might need to adjust it or just render it inside. 
            Looking at TrafficChart usage in ContentDashboard, it was standalone. 
            If TrafficChart renders a Card internally, we should probably just wrap it or modify TrafficChart to be more flexible.
            For now, I'll assume TrafficChart is a full card and I might be double wrapping. 
            Let's check TrafficChart content first.
        */}
                <div className="p-4">
                    <TrafficChart />
                </div>
            </CardContent>
        </Card>
    );
};
