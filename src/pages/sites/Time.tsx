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
import { Plus, Pencil, Trash2, Users, User, Briefcase, Mail, Eye } from "lucide-react";
import { toast } from "sonner";

interface Membro {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  bio: string;
  foto: string;
}

const Time = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMembro, setEditingMembro] = useState<Membro | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    email: "",
    bio: "",
    foto: "",
  });

  const [filterNome, setFilterNome] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, foto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ nome: "", cargo: "", email: "", bio: "", foto: "" });
    setEditingMembro(null);
  };

  const clearFilters = () => {
    setFilterNome("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      toast.error("Por favor, preencha o nome do membro");
      return;
    }

    if (editingMembro) {
      setMembros((prev) =>
        prev.map((m) =>
          m.id === editingMembro.id ? { ...formData, id: editingMembro.id } : m
        )
      );
      toast.success("Membro atualizado com sucesso!");
    } else {
      const newMembro: Membro = {
        ...formData,
        id: Date.now().toString(),
      };
      setMembros((prev) => [...prev, newMembro]);
      toast.success("Membro adicionado com sucesso!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (membro: Membro) => {
    setEditingMembro(membro);
    setFormData({
      nome: membro.nome,
      cargo: membro.cargo,
      email: membro.email,
      bio: membro.bio,
      foto: membro.foto,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMembros((prev) => prev.filter((m) => m.id !== id));
    toast.success("Membro removido com sucesso!");
  };

  const filteredMembros = useMemo(() => {
    const nomeTerm = filterNome.toLowerCase().trim();
    return membros.filter((membro) => {
      const nome = membro.nome?.toLowerCase() ?? "";
      return !nomeTerm ? true : nome.includes(nomeTerm);
    });
  }, [membros, filterNome]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Time" description="Gerencie os membros da equipe">
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
                    Nossa Equipe
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {membros.map((membro) => (
                      <div key={membro.id} className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden border-4 border-blue-100">
                          {membro.foto ? (
                            <img src={membro.foto} alt={membro.nome} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                              <User className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">{membro.nome}</h4>
                        <p className="text-blue-600 font-medium mb-2">{membro.cargo}</p>
                        <p className="text-slate-600 text-sm">{membro.bio}</p>
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
                <DialogTitle className="text-slate-800">Filtrar Membros</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filterNome">Filtrar por Nome</Label>
                  <Input
                    id="filterNome"
                    placeholder="Nome do membro"
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
                Novo Membro
              </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-slate-800">
                  {editingMembro ? "Editar Membro" : "Adicionar Membro"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <ImageUploader
                  id="membroFoto"
                  imageUrl={formData.foto}
                  onImageChange={handleImageUpload}
                />
                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2 text-slate-700">
                    <User className="h-4 w-4" />
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite o nome"
                    value={formData.nome}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo" className="flex items-center gap-2 text-slate-700">
                    <Briefcase className="h-4 w-4" />
                    Cargo
                  </Label>
                  <Input
                    id="cargo"
                    placeholder="Ex: Desenvolvedor"
                    value={formData.cargo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cargo: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="flex items-center gap-2 text-slate-700">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Uma breve descrição sobre o membro"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[80px] border-gray-200 focus:border-blue-500"
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
                    {editingMembro ? "Salvar Alterações" : "Adicionar Membro"}
                  </PrimaryButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>

        {filteredMembros.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nenhum membro encontrado"
            description="Ajuste os filtros ou adicione um novo membro clicando no botão acima."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembros.map((membro) => (
              <GlassCard key={membro.id} className="group overflow-hidden">
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-100">
                      {membro.foto ? (
                        <img src={membro.foto} alt={membro.nome} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/80 hover:bg-white text-slate-700"
                      onClick={() => handleEdit(membro)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/80 hover:bg-red-50 text-red-500"
                      onClick={() => handleDelete(membro.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="pt-12 pb-4 px-4 text-center">
                  <h3 className="font-semibold text-slate-800">{membro.nome}</h3>
                  {membro.cargo && (
                    <p className="text-sm text-blue-600 font-medium">{membro.cargo}</p>
                  )}
                  {membro.email && (
                    <p className="text-xs text-muted-foreground mt-1">{membro.email}</p>
                  )}
                  {membro.bio && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{membro.bio}</p>
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

export default Time;
