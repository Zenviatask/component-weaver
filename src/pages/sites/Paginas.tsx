import { useState, useEffect, ElementType } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, FileText, Globe, MoreHorizontal, ChevronLeft, ChevronRight, Eye, Image as ImageIcon, Layers, ArrowLeft, Type, Layout, MousePointerClick, Hash, List, Trash2, Upload, Save, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface CardData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
}
interface Section {
    id: string;
    hasTitle: boolean;
    hasDescription: boolean;
    hasSubtitle: boolean;
    hasImage: boolean;
    hasCarousel: boolean;
    hasCards: boolean;
    hasButton: boolean;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    carouselImages: string[];
    cards: CardData[];
    buttonText: string;
}
interface Page {
    id: string;
    title: string;
    slug: string;
    lastModified: string;
    sections: Section[];
}
const defaultSection: Section = {
    id: "section-1",
    hasTitle: true,
    hasDescription: true,
    hasSubtitle: false,
    hasImage: false,
    hasCarousel: false,
    hasCards: false,
    hasButton: false,
    title: "Nova Seção",
    subtitle: "",
    description: "Descrição da seção...",
    imageUrl: "",
    carouselImages: [],
    cards: [],
    buttonText: "Saiba Mais"
};

const Paginas = () => {
    const [pages, setPages] = useState<Page[]>(() => {
        const saved = localStorage.getItem("sitePages");
        if (saved) {
            return JSON.parse(saved);
        }
        return [{
            id: "1",
            title: "Home",
            slug: "/",
            lastModified: "2024-03-20",
            sections: [{
                ...defaultSection,
                id: "hero",
                title: "Bem-vindo à Levanta",
                hasSubtitle: true,
                subtitle: "Crie seu site conosco",
                hasButton: true,
                buttonText: "Começar Agora"
            }, {
                ...defaultSection,
                id: "features",
                title: "Nossos Serviços",
                hasCards: true,
                description: "Confira o que oferecemos",
                cards: [{
                    id: "c1",
                    title: "Serviço 1",
                    description: "Descrição do serviço 1",
                    imageUrl: "",
                    buttonText: "Ver mais",
                    buttonLink: "#"
                }, {
                    id: "c2",
                    title: "Serviço 2",
                    description: "Descrição do serviço 2",
                    imageUrl: "",
                    buttonText: "Ver mais",
                    buttonLink: "#"
                }]
            }]
        }, {
            id: "2",
            title: "Sobre",
            slug: "/sobre",
            lastModified: "2024-03-19",
            sections: [{
                ...defaultSection,
                id: "about-main",
                title: "Nossa História",
                hasImage: true,
                description: "Fundada em 2024..."
            }]
        }];
    });

    useEffect(() => {
        localStorage.setItem("sitePages", JSON.stringify(pages));
    }, [pages]);

    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const selectedPage = pages.find(p => p.id === selectedPageId);
    const currentSection = selectedPage?.sections[currentSectionIndex];

    const handleUpdateSection = (updates: Partial<Section>) => {
        if (!selectedPage || !currentSection) return;
        const updatedSections = [...selectedPage.sections];
        updatedSections[currentSectionIndex] = {
            ...currentSection,
            ...updates
        };
        setPages(pages.map(p => p.id === selectedPageId ? {
            ...p,
            sections: updatedSections
        } : p));
    };
    const handleAddSection = () => {
        if (!selectedPage) return;
        const newSection = {
            ...defaultSection,
            id: `section-${selectedPage.sections.length + 1}`
        };
        const updatedSections = [...selectedPage.sections, newSection];
        setPages(pages.map(p => p.id === selectedPageId ? {
            ...p,
            sections: updatedSections
        } : p));
        setCurrentSectionIndex(updatedSections.length - 1);
    };
    const handleDeleteSection = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedPage) return;
        if (selectedPage.sections.length <= 1) return;
        const updatedSections = selectedPage.sections.filter((_, i) => i !== index);
        setPages(pages.map(p => p.id === selectedPageId ? {
            ...p,
            sections: updatedSections
        } : p));
        if (currentSectionIndex >= updatedSections.length) {
            setCurrentSectionIndex(updatedSections.length - 1);
        }
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "imageUrl" | "carousel" | "card", cardIndex?: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === "imageUrl") {
                    handleUpdateSection({
                        imageUrl: reader.result as string
                    });
                } else if (field === "carousel") {
                    handleUpdateSection({
                        carouselImages: [...(currentSection?.carouselImages || []), reader.result as string]
                    });
                } else if (field === "card" && typeof cardIndex === "number" && currentSection) {
                    const newCards = [...currentSection.cards];
                    newCards[cardIndex] = {
                        ...newCards[cardIndex],
                        imageUrl: reader.result as string
                    };
                    handleUpdateSection({
                        cards: newCards
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAddCard = () => {
        if (!currentSection) return;
        const newCard: CardData = {
            id: `card-${Date.now()}`,
            title: "Novo Card",
            description: "Descrição do card",
            imageUrl: "",
            buttonText: "Ação",
            buttonLink: "#"
        };
        handleUpdateSection({
            cards: [...currentSection.cards, newCard]
        });
    };
    const handleUpdateCard = (index: number, updates: Partial<CardData>) => {
        if (!currentSection) return;
        const newCards = [...currentSection.cards];
        newCards[index] = {
            ...newCards[index],
            ...updates
        };
        handleUpdateSection({
            cards: newCards
        });
    };
    const handleDeleteCard = (index: number) => {
        if (!currentSection) return;
        const newCards = currentSection.cards.filter((_, i) => i !== index);
        handleUpdateSection({
            cards: newCards
        });
    };
    const handleSave = () => {
        // Simulating save
        console.log("Saving page data:", selectedPage);
        // Here you would typically make an API call
        alert("Alterações salvas com sucesso!");
    };
    const toggleItems: {
        id: keyof Section;
        label: string;
        icon: ElementType;
    }[] = [{
        id: "hasTitle",
        label: "Título",
        icon: Type
    }, {
        id: "hasSubtitle",
        label: "Subtítulo",
        icon: Type
    }, {
        id: "hasDescription",
        label: "Descrição",
        icon: FileText
    }, {
        id: "hasImage",
        label: "Imagem",
        icon: ImageIcon
    }, {
        id: "hasCarousel",
        label: "Carrossel",
        icon: Layers
    }, {
        id: "hasButton",
        label: "Botão",
        icon: MousePointerClick
    }, {
        id: "hasCards",
        label: "Cards",
        icon: Layout
    }];
    if (selectedPage) {
        return <DashboardLayout>
            <div className="p-4 lg:p-6 relative z-10 h-[calc(100vh-100px)] flex flex-col">
                {/* Header Editor */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPageId(null)} className="hover:bg-slate-100 rounded-full">
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                {selectedPage.title}
                                <Badge variant="secondary" className="text-xs font-normal">
                                    {selectedPage.sections.length} seções
                                </Badge>
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Editando conteúdo da página
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSave} variant="outline" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
                            <Save className="h-4 w-4" />
                            Salvar
                        </Button>
                        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
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
                                <div className="space-y-0">
                                    {selectedPage.sections.map(section => <div key={section.id} className="border-b p-8 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <div className="max-w-4xl mx-auto space-y-6">
                                            {(section.hasTitle || section.hasSubtitle) && <div className="text-center space-y-2">
                                                {section.hasTitle && <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>}
                                                {section.hasSubtitle && <h3 className="text-xl text-slate-600 font-light">
                                                    {section.subtitle}
                                                </h3>}
                                            </div>}

                                            {section.hasDescription && <p className="text-lg text-slate-700 leading-relaxed text-center max-w-2xl mx-auto">{section.description}</p>}

                                            {section.hasImage && section.imageUrl && <div className="rounded-xl overflow-hidden shadow-lg">
                                                <img src={section.imageUrl} alt="Section" className="w-full h-auto object-cover" />
                                            </div>}

                                            {section.hasCarousel && section.carouselImages.length > 0 && <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                                                {section.carouselImages.map((img, idx) => <img key={idx} src={img} alt={`Slide ${idx}`} className="h-64 w-auto rounded-lg shadow-md snap-center" />)}
                                            </div>}

                                            {section.hasCards && section.cards.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {section.cards.map(card => <Card key={card.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                    {card.imageUrl && <div className="h-48 overflow-hidden">
                                                        <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                                                    </div>}
                                                    <CardHeader>
                                                        <CardTitle>{card.title}</CardTitle>
                                                        <CardDescription>{card.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Button variant="outline" className="w-full">{card.buttonText}</Button>
                                                    </CardContent>
                                                </Card>)}
                                            </div>}

                                            {section.hasButton && <div className="flex justify-center pt-4">
                                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full shadow-lg shadow-blue-200">
                                                    {section.buttonText}
                                                </Button>
                                            </div>}
                                        </div>
                                    </div>)}
                                    <div className="bg-slate-900 text-white py-12 text-center">
                                        <p className="text-sm opacity-60">
                                            Crie seu site com a Levanta
                                        </p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button onClick={handleAddSection} className="gap-2 bg-slate-900 hover:bg-slate-800">
                            <Plus className="h-4 w-4" />
                            Nova Seção
                        </Button>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="flex flex-1 gap-6 overflow-hidden relative">
                    {/* Collapsible Sidebar */}
                    <div className="group absolute left-0 top-0 bottom-0 z-20 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ease-in-out w-[66px] hover:w-[280px] overflow-hidden hover:shadow-xl">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3 shrink-0 bg-slate-50/50">
                            <List className="h-5 w-5 text-slate-500 shrink-0" />
                            <span className="font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Navegação
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
                            {selectedPage.sections.map((section, index) => <div key={section.id} onClick={() => setCurrentSectionIndex(index)} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all relative group/item ${index === currentSectionIndex ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-slate-600"}`}>
                                <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${index === currentSectionIndex ? "bg-blue-200/50" : "bg-gray-100"}`}>
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                                    <span className="truncate text-sm font-medium pr-2">
                                        {section.title || "Sem título"}
                                    </span>
                                    {selectedPage.sections.length > 1 && <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/item:opacity-100 hover:bg-red-100 hover:text-red-600" onClick={e => handleDeleteSection(index, e)}>
                                        <Trash2 className="h-3 w-3" />
                                    </Button>}
                                </div>
                                {index === currentSectionIndex && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-full" />}
                            </div>)}
                        </div>

                        <div className="p-3 border-t border-gray-100 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                            <Button variant="outline" className="w-full justify-start gap-2 text-xs h-8" onClick={handleAddSection}>
                                <Plus className="h-3 w-3" />
                                Adicionar Seção
                            </Button>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 ml-[96px] h-full overflow-hidden flex flex-col">
                        <Card className="h-full flex flex-col border-0 shadow-none bg-transparent">
                            <div className="flex items-center justify-between mb-4 shrink-0 px-1">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-white">
                                        Seção {currentSectionIndex + 1}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">ID: {currentSection?.id}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white" disabled={currentSectionIndex === 0} onClick={() => setCurrentSectionIndex(prev => prev - 1)}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white" disabled={currentSectionIndex === selectedPage.sections.length - 1} onClick={() => setCurrentSectionIndex(prev => prev + 1)}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {currentSection && <div className="flex-1 overflow-y-auto pr-2 pb-10">
                                <div className="grid gap-6 max-w-6xl mx-auto">

                                    {/* Configurações de Estrutura */}
                                    <Card className="border-slate-200 shadow-sm">
                                        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                                            <div className="flex items-center gap-2">
                                                <Layout className="h-5 w-5 text-blue-500" />
                                                <CardTitle className="text-base">Estrutura da Seção</CardTitle>
                                            </div>
                                            <CardDescription>Defina quais elementos estarão visíveis nesta seção</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {toggleItems.map(item => <div key={item.id} className={`flex flex-col gap-3 p-3 rounded-xl border transition-all cursor-pointer ${currentSection[item.id] ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-white border-slate-100 hover:border-slate-300"}`} onClick={() => handleUpdateSection({
                                                    [item.id]: !currentSection[item.id]
                                                })}>
                                                    <div className="flex items-center justify-between">
                                                        <item.icon className={`h-5 w-5 ${currentSection[item.id] ? "text-blue-600" : "text-slate-400"}`} />
                                                        <Switch id={item.id} checked={currentSection[item.id] as boolean} onCheckedChange={checked => handleUpdateSection({
                                                            [item.id]: checked
                                                        })} className="scale-75 origin-right" />
                                                    </div>
                                                    <Label htmlFor={item.id} className="cursor-pointer font-medium text-sm text-slate-700">
                                                        {item.label}
                                                    </Label>
                                                </div>)}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Accordion type="multiple" defaultValue={["content", "media"]} className="space-y-4">
                                        {/* Conteúdo de Texto */}
                                        {(currentSection.hasTitle || currentSection.hasSubtitle || currentSection.hasDescription) && <AccordionItem value="content" className="border rounded-xl bg-white px-4 shadow-sm">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-2 text-slate-800">
                                                    <Type className="h-4 w-4 text-blue-500" />
                                                    <span className="font-semibold">Conteúdo de Texto</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4 pb-4">
                                                {currentSection.hasTitle && <div className="space-y-2">
                                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Título Principal</Label>
                                                    <Input value={currentSection.title} onChange={e => handleUpdateSection({
                                                        title: e.target.value
                                                    })} className="text-lg font-medium" placeholder="Digite o título da seção..." />
                                                </div>}
                                                {currentSection.hasSubtitle && <div className="space-y-2">
                                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subtítulo</Label>
                                                    <Input value={currentSection.subtitle} onChange={e => handleUpdateSection({
                                                        subtitle: e.target.value
                                                    })} placeholder="Digite o subtítulo..." />
                                                </div>}
                                                {currentSection.hasDescription && <div className="space-y-2">
                                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Descrição</Label>
                                                    <Textarea value={currentSection.description} onChange={e => handleUpdateSection({
                                                        description: e.target.value
                                                    })} className="min-h-[100px] resize-y" placeholder="Digite a descrição detalhada..." />
                                                </div>}
                                            </AccordionContent>
                                        </AccordionItem>}

                                        {/* Mídia */}
                                        {(currentSection.hasImage || currentSection.hasCarousel) && <AccordionItem value="media" className="border rounded-xl bg-white px-4 shadow-sm">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-2 text-slate-800">
                                                    <ImageIcon className="h-4 w-4 text-purple-500" />
                                                    <span className="font-semibold">Mídia e Imagens</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-6 pb-4">
                                                {currentSection.hasImage && <div className="p-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/50">
                                                    <Label className="mb-3 block text-sm font-medium text-slate-700">Imagem Principal</Label>
                                                    <div className="flex items-start gap-6">
                                                        <div className="relative h-32 w-48 shrink-0 rounded-lg bg-white border shadow-sm overflow-hidden flex items-center justify-center">
                                                            {currentSection.imageUrl ? <img src={currentSection.imageUrl} alt="Preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-8 w-8 text-slate-300" />}
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, "imageUrl")} className="text-sm file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 my-0 py-[8px]" />
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">
                                                                Recomendado: 1920x1080px (JPG, PNG)
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>}

                                                {currentSection.hasCarousel && <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-sm font-medium text-slate-700">Galeria do Carrossel</Label>
                                                        <div className="relative">
                                                            <Input type="file" accept="image/*" id="carousel-upload" className="hidden" onChange={e => handleImageUpload(e, "carousel")} />
                                                            <Button variant="outline" size="sm" className="gap-2" onClick={() => document.getElementById('carousel-upload')?.click()}>
                                                                <Upload className="h-3 w-3" />
                                                                Adicionar Imagem
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border min-h-[120px]">
                                                        {currentSection.carouselImages.map((img, idx) => <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden bg-white shadow-sm border">
                                                            <img src={img} alt={`Carousel ${idx}`} className="h-full w-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => {
                                                                    const newImages = currentSection.carouselImages.filter((_, i) => i !== idx);
                                                                    handleUpdateSection({
                                                                        carouselImages: newImages
                                                                    });
                                                                }}>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>)}
                                                        {currentSection.carouselImages.length === 0 && <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-8">
                                                            <Layers className="h-8 w-8 mb-2 opacity-50" />
                                                            <span className="text-sm">Nenhuma imagem adicionada</span>
                                                        </div>}
                                                    </div>
                                                </div>}
                                            </AccordionContent>
                                        </AccordionItem>}

                                        {/* Cards Editor */}
                                        {currentSection.hasCards && <AccordionItem value="cards" className="border rounded-xl bg-white px-4 shadow-sm">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-2 text-slate-800">
                                                    <Layout className="h-4 w-4 text-orange-500" />
                                                    <span className="font-semibold">Cards e Itens</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4 space-y-4">
                                                <div className="flex justify-end">
                                                    <Button onClick={handleAddCard} size="sm" className="gap-2">
                                                        <Plus className="h-3 w-3" />
                                                        Adicionar Card
                                                    </Button>
                                                </div>
                                                <div className="space-y-4">
                                                    {currentSection.cards.map((card, index) => <Card key={card.id} className="relative group">
                                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteCard(index)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <CardContent className="p-4 grid gap-4 sm:grid-cols-[100px_1fr]">
                                                            <div className="space-y-2">
                                                                <div className="h-24 w-full bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border">
                                                                    {card.imageUrl ? <img src={card.imageUrl} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="h-8 w-8 text-slate-300" />}
                                                                </div>
                                                                <div className="relative">
                                                                    <Input type="file" accept="image/*" className="hidden" id={`card-img-${card.id}`} onChange={e => handleImageUpload(e, "card", index)} />
                                                                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => document.getElementById(`card-img-${card.id}`)?.click()}>
                                                                        Alterar
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Input value={card.title} onChange={e => handleUpdateCard(index, {
                                                                    title: e.target.value
                                                                })} placeholder="Título do card" className="font-medium" />
                                                                <Textarea value={card.description} onChange={e => handleUpdateCard(index, {
                                                                    description: e.target.value
                                                                })} placeholder="Descrição do card" className="h-20 resize-none text-sm" />
                                                                <div className="flex gap-2">
                                                                    <Input value={card.buttonText} onChange={e => handleUpdateCard(index, {
                                                                        buttonText: e.target.value
                                                                    })} placeholder="Texto do botão" className="flex-1 text-sm" />
                                                                    <Input value={card.buttonLink} onChange={e => handleUpdateCard(index, {
                                                                        buttonLink: e.target.value
                                                                    })} placeholder="Link" className="flex-1 text-sm" />
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>)}
                                                    {currentSection.cards.length === 0 && <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-lg border border-dashed">
                                                        <p>Nenhum card adicionado</p>
                                                    </div>}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>}

                                        {/* Ações */}
                                        {currentSection.hasButton && <AccordionItem value="actions" className="border rounded-xl bg-white px-4 shadow-sm">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-2 text-slate-800">
                                                    <MousePointerClick className="h-4 w-4 text-green-500" />
                                                    <span className="font-semibold">Botões e Ações</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Texto do Botão</Label>
                                                        <Input value={currentSection.buttonText} onChange={e => handleUpdateSection({
                                                            buttonText: e.target.value
                                                        })} placeholder="Ex: Saiba Mais" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Link de Destino (Opcional)</Label>
                                                        <Input placeholder="https://..." />
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>}

                                        {/* Configurações Avançadas */}
                                        <AccordionItem value="advanced" className="border rounded-xl bg-white px-4 shadow-sm">
                                            <AccordionTrigger className="hover:no-underline py-4">
                                                <div className="flex items-center gap-2 text-slate-800">
                                                    <Hash className="h-4 w-4 text-slate-500" />
                                                    <span className="font-semibold">Avançado</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="space-y-2">
                                                    <Label>ID da Seção (HTML)</Label>
                                                    <Input value={currentSection.id} onChange={e => handleUpdateSection({
                                                        id: e.target.value
                                                    })} className="font-mono text-sm bg-slate-50" />
                                                    <p className="text-xs text-muted-foreground">Usado para links de âncora (ex: #contato)</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>}
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>;
    }
    return <DashboardLayout>
        <div className="p-4 lg:p-6 relative z-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Páginas</h1>
                    <p className="text-muted-foreground">
                        Gerencie as páginas e seções do seu site
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
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
                            <div className="space-y-0">
                                {(pages.find(p => p.slug === "/") || pages[0])?.sections.map(section => (
                                    <div key={section.id} className="border-b p-8 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <div className="max-w-4xl mx-auto space-y-6">
                                            {(section.hasTitle || section.hasSubtitle) && (
                                                <div className="text-center space-y-2">
                                                    {section.hasTitle && <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>}
                                                    {section.hasSubtitle && (
                                                        <h3 className="text-xl text-slate-600 font-light">
                                                            {section.subtitle}
                                                        </h3>
                                                    )}
                                                </div>
                                            )}

                                            {section.hasDescription && (
                                                <p className="text-lg text-slate-700 leading-relaxed text-center max-w-2xl mx-auto">{section.description}</p>
                                            )}

                                            {section.hasImage && section.imageUrl && (
                                                <div className="rounded-xl overflow-hidden shadow-lg">
                                                    <img src={section.imageUrl} alt="Section" className="w-full h-auto object-cover" />
                                                </div>
                                            )}

                                            {section.hasCarousel && section.carouselImages.length > 0 && (
                                                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                                                    {section.carouselImages.map((img, idx) => (
                                                        <img key={idx} src={img} alt={`Slide ${idx}`} className="h-64 w-auto rounded-lg shadow-md snap-center" />
                                                    ))}
                                                </div>
                                            )}

                                            {section.hasCards && section.cards.length > 0 && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {section.cards.map(card => (
                                                        <Card key={card.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                            {card.imageUrl && (
                                                                <div className="h-48 overflow-hidden">
                                                                    <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                                                                </div>
                                                            )}
                                                            <CardHeader>
                                                                <CardTitle>{card.title}</CardTitle>
                                                                <CardDescription>{card.description}</CardDescription>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <Button variant="outline" className="w-full">{card.buttonText}</Button>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}

                                            {section.hasButton && (
                                                <div className="flex justify-center pt-4">
                                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full shadow-lg shadow-blue-200">
                                                        {section.buttonText}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-slate-900 text-white py-12 text-center">
                                    <p className="text-sm opacity-60">
                                        Crie seu site com a Levanta
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <Plus className="h-4 w-4" />
                        Nova Página
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Buscar páginas..." className="pl-9" />
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {pages.map(page => <div key={page.id} onClick={() => {
                        setSelectedPageId(page.id);
                        setCurrentSectionIndex(0);
                    }} className="flex items-center justify-between p-4 hover:bg-white/60 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-slate-900">{page.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Globe className="h-3 w-3" />
                                    <span>{page.slug}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                <Layers className="h-3 w-3" />
                                <span>{page.sections.length} Seções</span>
                            </div>
                            <span className="text-sm text-muted-foreground hidden sm:block">
                                {page.lastModified}
                            </span>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </DashboardLayout>;
};
export default Paginas;