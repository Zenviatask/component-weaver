import { Layout, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Section {
    imageUrl?: string;
    hasImage?: boolean;
}

interface Page {
    id: string;
    title: string;
    sections: Section[];
}

export const PagesGalleryWidget = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        const savedPages = localStorage.getItem("sitePages");
        if (savedPages) {
            try {
                const parsed = JSON.parse(savedPages);
                setPages(parsed);
            } catch (e) {
                console.error("Failed to parse site pages", e);
            }
        } else {
            // Fallback/Default if nothing in localStorage yet (matches default in Paginas.tsx)
            // Ideally we shouldn't duplicate defaults, but for display it's fine to show nothing or wait for Paginas to load once.
            // Or we can just show empty.
        }
    }, []);

    const getPageImage = (page: Page) => {
        // Try to find the first section with an image
        const sectionWithImage = page.sections.find(s => s.hasImage && s.imageUrl);
        if (sectionWithImage) return sectionWithImage.imageUrl;

        // Default placeholders based on title
        if (page.title.toLowerCase().includes("home")) return "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200&h=120&fit=crop";
        if (page.title.toLowerCase().includes("sobre")) return "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=120&fit=crop";

        return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop";
    };

    return (
        <Card className="h-full col-span-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Área de Páginas
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/sites/paginas")}>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-4 pt-2">
                    {pages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {pages.map((page, index) => (
                                <div key={page.id || index} className="group cursor-pointer" onClick={() => navigate("/sites/paginas")}>
                                    <div className="relative mb-2 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                                        <img
                                            src={getPageImage(page)}
                                            alt={page.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-slate-800">
                                        {page.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <p className="mb-2">Nenhuma página encontrada.</p>
                        </div>
                    )}

                    {/* Botão de adicionar páginas */}

                </div>
            </CardContent>
        </Card>
    );
};
