import { Globe, MoreVertical, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sites = [
    {
        name: "meusite.com.br",
        description: "Site institucional",
        status: "Ativo",
        icon: "🌐",
        color: "bg-blue-100",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop",
    },
    {
        name: "blogdaclara.com",
        description: "Blog",
        status: "Ativo",
        icon: "📝",
        color: "bg-pink-100",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&h=120&fit=crop",
    },
    {
        name: "lojavirtual.com",
        description: "E-commerce",
        status: "Em manutenção",
        icon: "🛒",
        color: "bg-purple-100",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=120&fit=crop",
    },
];

export const SitesListWidget = () => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Meus Sites
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sites.map((site, index) => (
                        <div key={index} className="flex items-center gap-4 group cursor-pointer">
                            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                                <img src={site.image} alt={site.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm truncate">{site.name}</p>
                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                                </div>
                                <p className="text-xs text-muted-foreground">{site.description}</p>
                            </div>
                            <div className={`h-2 w-2 rounded-full ${site.status === "Ativo" ? "bg-green-500" : "bg-yellow-500"}`} title={site.status} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
