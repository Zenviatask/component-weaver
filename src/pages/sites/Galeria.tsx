import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
    Plus,
    Image as ImageIcon,
    Trash2,
    Eye,
    ArrowLeft,
    ArrowRight,
    Save,
    Move,
    Pencil,
} from "lucide-react";

interface GalleryImage {
    id: string;
    url: string;
    title: string;
}

const Galeria = () => {
    const [images, setImages] = useState<GalleryImage[]>([
        {
            id: "1",
            url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
            title: "Exemplo 1",
        },
        {
            id: "2",
            url: "https://images.unsplash.com/photo-1682687221038-404670e01d46",
            title: "Exemplo 2",
        },
    ]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage: GalleryImage = {
                    id: Date.now().toString(),
                    url: reader.result as string,
                    title: file.name.split(".")[0],
                };
                setImages((prev) => [...prev, newImage]);
                toast.success("Imagem adicionada com sucesso!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpdate = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prev) =>
                    prev.map((img) =>
                        img.id === id ? { ...img, url: reader.result as string } : img
                    )
                );
                toast.success("Imagem atualizada com sucesso!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
        toast.success("Imagem removida com sucesso!");
    };

    const handleMove = (index: number, direction: "left" | "right") => {
        if (
            (direction === "left" && index === 0) ||
            (direction === "right" && index === images.length - 1)
        ) {
            return;
        }

        const newImages = [...images];
        const targetIndex = direction === "left" ? index - 1 : index + 1;
        const temp = newImages[index];
        newImages[index] = newImages[targetIndex];
        newImages[targetIndex] = temp;

        setImages(newImages);
    };

    const handleSave = () => {
        console.log("Saving gallery:", images);
        toast.success("Galeria salva com sucesso!");
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 relative z-10 h-[calc(100vh-100px)] flex flex-col">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            Galeria de Imagens
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Gerencie as imagens da sua galeria
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSave}
                            variant="outline"
                            className="gap-2 border-green-200 text-green-700 hover:bg-green-50"
                        >
                            <Save className="h-4 w-4" />
                            Salvar
                        </Button>
                        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                                >
                                    <Eye className="h-4 w-4" />
                                    Pré-visualizar
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white">
                                <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/95 px-6 py-4 backdrop-blur">
                                    <DialogTitle>Pré-visualização do Site</DialogTitle>
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                    </div>
                                </div>
                                <div className="p-8 bg-slate-50 min-h-[500px]">
                                    <div className="max-w-6xl mx-auto">
                                        <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
                                            Nossa Galeria
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {images.map((img) => (
                                                <div
                                                    key={img.id}
                                                    className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt={img.title}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <div className="relative">
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="gallery-upload"
                                onChange={handleImageUpload}
                            />
                            <Button
                                onClick={() => document.getElementById("gallery-upload")?.click()}
                                className="gap-2 bg-slate-900 hover:bg-slate-800"
                            >
                                <Plus className="h-4 w-4" />
                                Adicionar Imagem
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto pr-2">
                    {images.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            <ImageIcon className="h-12 w-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">
                                Sua galeria está vazia
                            </h3>
                            <p className="text-slate-500 mb-6">
                                Adicione imagens para começar a montar sua galeria
                            </p>
                            <Button
                                onClick={() => document.getElementById("gallery-upload")?.click()}
                                variant="outline"
                            >
                                Selecionar Imagens
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {images.map((img, index) => (
                                <Card
                                    key={img.id}
                                    className="group relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="aspect-square relative bg-slate-100">
                                        <img
                                            src={img.url}
                                            alt={img.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                                                disabled={index === 0}
                                                onClick={() => handleMove(index, "left")}
                                                title="Mover para esquerda"
                                            >
                                                <ArrowLeft className="h-4 w-4 text-slate-700" />
                                            </Button>
                                            <div className="relative">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id={`update-img-${img.id}`}
                                                    onChange={(e) => handleImageUpdate(e, img.id)}
                                                />
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                                                    onClick={() => document.getElementById(`update-img-${img.id}`)?.click()}
                                                    title="Alterar imagem"
                                                >
                                                    <Pencil className="h-4 w-4 text-slate-700" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => handleDelete(img.id)}
                                                title="Excluir"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                                                disabled={index === images.length - 1}
                                                onClick={() => handleMove(index, "right")}
                                                title="Mover para direita"
                                            >
                                                <ArrowRight className="h-4 w-4 text-slate-700" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-3">
                                        <Input
                                            value={img.title}
                                            onChange={(e) => {
                                                const newImages = [...images];
                                                newImages[index].title = e.target.value;
                                                setImages(newImages);
                                            }}
                                            className="h-8 text-sm border-transparent hover:border-slate-200 focus:border-blue-500 px-2"
                                            placeholder="Título da imagem"
                                        />
                                    </CardContent>
                                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <Move className="h-3 w-3 inline mr-1" />
                                        {index + 1}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Galeria;
