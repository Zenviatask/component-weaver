import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const GalleryManagerWidget = () => {
    const navigate = useNavigate();

    // Mock images
    const images = [
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
        "https://images.unsplash.com/photo-1682687221038-404670e01d46",
        "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
        "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
    ];

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Galeria Recente
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/galeria")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2">
                    {images.map((src, idx) => (
                        <div key={idx} className="aspect-square rounded-md overflow-hidden bg-muted">
                            <img src={src} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
