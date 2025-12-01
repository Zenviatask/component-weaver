import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Plus,
  User,
  Calendar,
  FileText,
  Tag,
  Camera,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  nome: string;
  dataAniversario: string;
  descricao: string;
  tipoPerfil: string;
  foto: string;
}

const tiposPerfil = [
  "Administrador",
  "Editor",
  "Colaborador",
  "Visitante",
  "Cliente",
];

const Perfis = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    dataAniversario: "",
    descricao: "",
    tipoPerfil: "",
    foto: "",
  });

  // Filtros
  const [filterNome, setFilterNome] = useState("");
  const [filterData, setFilterData] = useState("");
  // "" = sem filtro de tipo
  const [filterTipo, setFilterTipo] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

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
    setFormData({
      nome: "",
      dataAniversario: "",
      descricao: "",
      tipoPerfil: "",
      foto: "",
    });
    setEditingProfile(null);
  };

  const clearFilters = () => {
    setFilterNome("");
    setFilterData("");
    setFilterTipo("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      toast.error("Por favor, preencha o nome do perfil");
      return;
    }

    if (editingProfile) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === editingProfile.id ? { ...formData, id: editingProfile.id } : p
        )
      );
      toast.success("Perfil atualizado com sucesso!");
    } else {
      const newProfile: Profile = {
        ...formData,
        id: Date.now().toString(),
      };
      setProfiles((prev) => [...prev, newProfile]);
      toast.success("Perfil criado com sucesso!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData({
      nome: profile.nome,
      dataAniversario: profile.dataAniversario,
      descricao: profile.descricao,
      tipoPerfil: profile.tipoPerfil,
      foto: profile.foto,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    toast.success("Perfil removido com sucesso!");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Filtro com useMemo
  const filteredProfiles = useMemo(() => {
    const nomeTerm = filterNome.toLowerCase().trim();
    const dataTerm = filterData.trim();
    const tipoTerm = filterTipo.trim();

    return profiles.filter((profile) => {
      const nome = profile.nome?.toLowerCase() ?? "";
      const matchesNome = !nomeTerm ? true : nome.includes(nomeTerm);

      const profileDate = profile.dataAniversario ?? "";
      const matchesData = !dataTerm ? true : profileDate.includes(dataTerm);

      const matchesTipo = !tipoTerm ? true : profile.tipoPerfil === tipoTerm;

      return matchesNome && matchesData && matchesTipo;
    });
  }, [profiles, filterNome, filterData, filterTipo]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Perfis</h1>
            <p className="text-muted-foreground">
              Gerencie os perfis do seu site
            </p>
          </div>

          <div className="flex gap-2">
            {/* Botão de filtros (abre modal) */}
            <Dialog
              open={isFilterDialogOpen}
              onOpenChange={setIsFilterDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px] bg-white/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">
                    Filtrar Perfis
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="filterNomeModal">Filtrar por Nome</Label>
                    <Input
                      id="filterNomeModal"
                      placeholder="Nome"
                      value={filterNome}
                      onChange={(e) => setFilterNome(e.target.value)}
                    />
                  </div>

                  {/* Data */}
                  <div className="space-y-2">
                    <Label htmlFor="filterDataModal">
                      Filtrar por Aniversário
                    </Label>
                    <Input
                      id="filterDataModal"
                      type="date"
                      value={filterData}
                      onChange={(e) => setFilterData(e.target.value)}
                    />
                  </div>

                  {/* Tipo de Perfil */}
                  <div className="space-y-2">
                    <Label htmlFor="filterTipoModal">Tipo de Perfil</Label>
                    <Select
                      value={filterTipo === "" ? "all" : filterTipo}
                      onValueChange={(value) =>
                        setFilterTipo(value === "all" ? "" : value)
                      }
                    >
                      <SelectTrigger id="filterTipoModal">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {tiposPerfil.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Limpar filtros
                  </Button>
                  <div className="flex gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Fechar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        Aplicar
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Botão Novo Perfil */}
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Plus className="h-4 w-4" />
                  Novo Perfil
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">
                    {editingProfile ? "Editar Perfil" : "Criar Novo Perfil"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {/* Foto Upload */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {formData.foto ? (
                        <img
                          src={formData.foto}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="foto"
                        className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                      >
                        {formData.foto ? "Alterar foto" : "Adicionar foto"}
                      </Label>
                      <Input
                        id="foto"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  {/* Nome */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="nome"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <User className="h-4 w-4" />
                      Nome
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Digite o nome"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Data de Aniversário */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="dataAniversario"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <Calendar className="h-4 w-4" />
                      Data de Aniversário
                    </Label>
                    <Input
                      id="dataAniversario"
                      type="date"
                      value={formData.dataAniversario}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dataAniversario: e.target.value,
                        }))
                      }
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Tipo de Perfil */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="tipoPerfil"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <Tag className="h-4 w-4" />
                      Tipo de Perfil
                    </Label>
                    <Select
                      value={formData.tipoPerfil}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, tipoPerfil: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {tiposPerfil.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="descricao"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <FileText className="h-4 w-4" />
                      Descrição
                    </Label>
                    <Textarea
                      id="descricao"
                      placeholder="Digite uma descrição para o perfil"
                      value={formData.descricao}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          descricao: e.target.value,
                        }))
                      }
                      className="min-h-[100px] border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      {editingProfile ? "Salvar Alterações" : "Criar Perfil"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/30 backdrop-blur-md p-12">
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Nenhum perfil encontrado
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Ajuste os filtros ou crie um novo perfil clicando no botão acima.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white/30 backdrop-blur-md shadow-sm transition-all hover:shadow-md"
              >
                {/* Profile Header with Photo */}
                <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-100">
                      {profile.foto ? (
                        <img
                          src={profile.foto}
                          alt={profile.nome}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => handleEdit(profile)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 bg-white/20 hover:bg-red-500/80 text-white"
                      onClick={() => handleDelete(profile.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-12 pb-4 px-4 text-center">
                  <h3 className="font-semibold text-slate-800 truncate">
                    {profile.nome}
                  </h3>

                  {profile.tipoPerfil && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                      {profile.tipoPerfil}
                    </span>
                  )}

                  {profile.dataAniversario && (
                    <p className="mt-2 text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(profile.dataAniversario)}
                    </p>
                  )}

                  {profile.descricao && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {profile.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Perfis;
