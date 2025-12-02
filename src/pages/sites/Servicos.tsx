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
import { PageHeader, EmptyState, GlassCard, FilterButton, PrimaryButton, ImageUploader } from "@/components/shared";
import { Plus, Pencil, Trash2, Briefcase, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

const Servicos = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
  });

  const [filterNome, setFilterNome] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

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
    setFormData({ nome: "", descricao: "", preco: "", imagem: "" });
    setEditingServico(null);
  };

  const clearFilters = () => {
    setFilterNome("");
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
          s.id === editingServico.id ? { ...formData, id: editingServico.id } : s
        )
      );
      toast.success("Serviço atualizado com sucesso!");
    } else {
      const newServico: Servico = {
        ...formData,
        id: Date.now().toString(),
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
      descricao: servico.descricao,
      preco: servico.preco,
      imagem: servico.imagem,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setServicos((prev) => prev.filter((s) => s.id !== id));
    toast.success("Serviço removido com sucesso!");
  };

  const filteredServicos = useMemo(() => {
    const nomeTerm = filterNome.toLowerCase().trim();
    return servicos.filter((servico) => {
      const nome = servico.nome?.toLowerCase() ?? "";
      return !nomeTerm ? true : nome.includes(nomeTerm);
    });
  }, [servicos, filterNome]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Serviços" description="Gerencie os serviços do seu site">
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
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-md">
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
                  <Label htmlFor="preco" className="flex items-center gap-2 text-slate-700">
                    <DollarSign className="h-4 w-4" />
                    Preço
                  </Label>
                  <Input
                    id="preco"
                    placeholder="Ex: R$ 150,00"
                    value={formData.preco}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preco: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao" className="flex items-center gap-2 text-slate-700">
                    <FileText className="h-4 w-4" />
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o serviço"
                    value={formData.descricao}
                    onChange={(e) => setFormData((prev) => ({ ...prev, descricao: e.target.value }))}
                    className="min-h-[100px] border-gray-200 focus:border-blue-500"
                  />
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
          <EmptyState
            icon={Briefcase}
            title="Nenhum serviço encontrado"
            description="Ajuste os filtros ou crie um novo serviço clicando no botão acima."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServicos.map((servico) => (
              <GlassCard key={servico.id} className="group overflow-hidden">
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600">
                  {servico.imagem && (
                    <img src={servico.imagem} alt={servico.nome} className="h-full w-full object-cover" />
                  )}
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/80 hover:bg-white text-slate-700"
                      onClick={() => handleEdit(servico)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/80 hover:bg-red-50 text-red-500"
                      onClick={() => handleDelete(servico.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{servico.nome}</h3>
                  {servico.preco && (
                    <p className="text-blue-600 font-medium mt-1">{servico.preco}</p>
                  )}
                  {servico.descricao && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{servico.descricao}</p>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Servicos;
