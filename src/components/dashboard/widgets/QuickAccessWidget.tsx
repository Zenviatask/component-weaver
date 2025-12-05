import { Zap, Plus, Settings, Image, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickAccessWidget = () => {
    const navigate = useNavigate();

    const shortcuts = [
        { label: "Novo Post", icon: Plus, action: () => navigate("/posts/editor", { state: { isNew: true } }), color: "bg-blue-100 text-blue-600" },
        { label: "Configurações", icon: Settings, action: () => navigate("/settings"), color: "bg-gray-100 text-gray-600" },
        { label: "Galeria", icon: Image, action: () => navigate("/galeria"), color: "bg-pink-100 text-pink-600" },
        { label: "Perfis", icon: Users, action: () => navigate("/perfis"), color: "bg-purple-100 text-purple-600" },
    ];

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Acesso Rápido
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {shortcuts.map((shortcut, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="h-auto py-3 flex flex-col gap-2 items-center justify-center"
                            onClick={shortcut.action}
                        >
                            <div className={`p-2 rounded-full ${shortcut.color}`}>
                                <shortcut.icon className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-medium">{shortcut.label}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
