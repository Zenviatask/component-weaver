import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { PageHeader, EmptyState, PrimaryButton, FilterButton, ImageUploader } from "@/components/shared";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Briefcase,
  Type,
  FileText,
  ArrowUp,
  ArrowDown,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Servico {
  id: string;
  nome: string;
  subtitulo: string;
  descricaoHtml: string;
  imagem: string;
  order: number;
}

const ITEMS_PER_PAGE = 6;

const Servicos = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    subtitulo: "",
    descricaoHtml: "",
    imagem: "",
  });

  const [filterNome, setFilterNome] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagem: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", subtitulo: "", descricaoHtml: "", imagem: "" });
    setEditingServico(null);
  };

  const clearFilters = () => {
    setFilterNome("");
    setCurrentPage(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      toast.error("Por favor, preencha o nome do serviço");
      return;
    }

    if (editingServico) {
      setServicos((prev) =>
        prev.map((s) =>
          s.id === editingServico.id ? { ...formData, id: editingServico.id, order: s.order } : s
        )
      );
      toast.success("Serviço atualizado com sucesso!");
    } else {
      const newServico: Servico = {
        ...formData,
        id: Date.now().toString(),
        order: servicos.length,
      };
      setServicos((prev) => [...prev, newServico]);
      toast.success("Serviço criado com sucesso!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (servico: Servico) => {
    setEditingServico(servico);
    setFormData({
      nome: servico.nome,
      subtitulo: servico.subtitulo,
      descricaoHtml: servico.descricaoHtml,
      imagem: servico.imagem,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setServicos((prev) => prev.filter((s) => s.id !== id));
    toast.success("Serviço removido com sucesso!");
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    // Calculate actual index in the full array based on pagination
    const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const newServicos = [...servicos];
    const targetIndex = direction === 'up' ? actualIndex - 1 : actualIndex + 1;

    if (targetIndex >= 0 && targetIndex < newServicos.length) {
      const temp = newServicos[actualIndex];
      newServicos[actualIndex] = newServicos[targetIndex];
      newServicos[targetIndex] = temp;

      // Update order property
      newServicos.forEach((s, i) => s.order = i);

      setServicos(newServicos);
    }
  };

  const filteredServicos = useMemo(() => {
    const nomeTerm = filterNome.toLowerCase().trim();
    return servicos
      .filter((servico) => {
        const nome = servico.nome?.toLowerCase() ?? "";
        return !nomeTerm ? true : nome.includes(nomeTerm);
      });
  }, [servicos, filterNome]);

  const totalPages = Math.ceil(filteredServicos.length / ITEMS_PER_PAGE);
  const paginatedServicos = filteredServicos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Serviços" description="Gerencie os serviços do seu site">
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
                    Nossos Serviços
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicos.map((servico) => (
                      <div key={servico.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={servico.imagem || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"}
                            alt={servico.nome}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{servico.nome}</h3>
                          {servico.subtitulo && (
                            <p className="text-blue-600 font-medium mb-3">{servico.subtitulo}</p>
                          )}
                          <div
                            className="text-slate-600 text-sm line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: servico.descricaoHtml }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <FilterButton />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] bg-white/95 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-slate-800">Filtrar Serviços</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filterNome">Filtrar por Nome</Label>
                  <Input
                    id="filterNome"
                    placeholder="Nome do serviço"
                    value={filterNome}
                    onChange={(e) => setFilterNome(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between gap-3">
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Limpar filtros
                </Button>
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Fechar</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <PrimaryButton>Aplicar</PrimaryButton>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <PrimaryButton>
                <Plus className="h-4 w-4" />
                Novo Serviço
              </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingServico ? "Editar Serviço" : "Criar Novo Serviço"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <ImageUploader
                  id="servicoImagem"
                  imageUrl={formData.imagem}
                  onImageChange={handleImageUpload}
                />

                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2 text-slate-700">
                    <Briefcase className="h-4 w-4" />
                    Nome do Serviço
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite o nome do serviço"
                    value={formData.nome}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitulo" className="flex items-center gap-2 text-slate-700">
                    <Type className="h-4 w-4" />
                    Subtítulo
                  </Label>
                  <Input
                    id="subtitulo"
                    placeholder="Digite um subtítulo curto"
                    value={formData.subtitulo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subtitulo: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricaoHtml" className="flex items-center gap-2 text-slate-700">
                    <FileText className="h-4 w-4" />
                    Descrição (aceita HTML)
                  </Label>
                  <Textarea
                    id="descricaoHtml"
                    placeholder='Descreva o serviço. Você pode usar tags HTML como <strong>negrito</strong>, <ul><li>lista</li></ul>'
                    value={formData.descricaoHtml}
                    onChange={(e) => setFormData((prev) => ({ ...prev, descricaoHtml: e.target.value }))}
                    className="min-h-[140px] border-gray-200 focus:border-blue-500 font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    Dica: use tags como {"<strong>"}, {"<em>"}, {"<ul>"}, {"<li>"} para estilizar o texto.
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setIsDialogOpen(false); resetForm(); }}
                  >
                    Cancelar
                  </Button>
                  <PrimaryButton type="submit" className="flex-1">
                    {editingServico ? "Salvar Alterações" : "Criar Serviço"}
                  </PrimaryButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>

        {filteredServicos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/30 backdrop-blur-md p-12">
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Nenhum serviço encontrado
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Ajuste os filtros ou crie um novo serviço clicando no botão acima.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServicos.map((servico, index) => (
                <Card key={servico.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md flex flex-col relative h-full">
                  {/* Image Section */}
                  <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                    {servico.imagem ? (
                      <img src={servico.imagem} alt={servico.nome} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                        <Briefcase className="h-10 w-10" />
                      </div>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white text-slate-700 shadow-sm"
                        onClick={() => handleEdit(servico)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-red-50 text-red-500 shadow-sm"
                        onClick={() => handleDelete(servico.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Reordering Overlay */}
                    <div className="absolute top-2 left-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white text-slate-700 shadow-sm"
                        disabled={currentPage === 1 && index === 0 || filterNome !== ""}
                        onClick={() => moveService(index, 'up')}
                        title="Mover para cima"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white text-slate-700 shadow-sm"
                        disabled={currentPage === totalPages && index === paginatedServicos.length - 1 || filterNome !== ""}
                        onClick={() => moveService(index, 'down')}
                        title="Mover para baixo"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">{servico.nome}</h3>
                    {servico.subtitulo && (
                      <p className="text-blue-600 font-medium text-sm mb-3">{servico.subtitulo}</p>
                    )}

                    <div className="text-sm text-slate-600 flex-1">
                      <div
                        className="prose prose-sm max-w-none prose-p:mb-1 prose-headings:mb-1 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: servico.descricaoHtml,
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-600">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Servicos;
