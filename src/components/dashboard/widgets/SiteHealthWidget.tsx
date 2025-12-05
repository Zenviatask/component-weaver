import { Activity, Zap, Search, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const SiteHealthWidget = () => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Saúde do Site
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                Velocidade
                            </span>
                            <span className="font-bold">98/100</span>
                        </div>
                        <Progress value={98} className="h-2" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <Search className="h-3 w-3 text-blue-500" />
                                SEO
                            </span>
                            <span className="font-bold">100/100</span>
                        </div>
                        <Progress value={100} className="h-2" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <Server className="h-3 w-3 text-green-500" />
                                Uptime
                            </span>
                            <span className="font-bold">99.9%</span>
                        </div>
                        <Progress value={99.9} className="h-2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
