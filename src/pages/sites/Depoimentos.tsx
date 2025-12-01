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
import { toast } from "sonner";
import {
  Plus,
  User,
  Camera,
  Pencil,
  Trash2,
  Filter,
  Quote,
} from "lucide-react";

interface Testimonial {
  id: string;
  nome: string;
  descricaoHtml: string; // texto com tags HTML
  foto: string;
}

const Depoimentos = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    descricaoHtml: "",
    foto: "",
  });

  // Filtros
  const [filterNome, setFilterNome] = useState("");
  const [filterTexto, setFilterTexto] = useState("");
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
      descricaoHtml: "",
      foto: "",
    });
    setEditingTestimonial(null);
  };

  const clearFilters = () => {
    setFilterNome("");
    setFilterTexto("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      toast.error("Por favor, informe o nome do cliente.");
      return;
    }

    if (!formData.descricaoHtml.trim()) {
      toast.error("Por favor, escreva o depoimento.");
      return;
    }

    if (editingTestimonial) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingTestimonial.id
            ? { ...formData, id: editingTestimonial.id }
            : t
        )
      );
      toast.success("Depoimento atualizado com sucesso!");
    } else {
      const newTestimonial: Testimonial = {
        ...formData,
        id: Date.now().toString(),
      };
      setTestimonials((prev) => [...prev, newTestimonial]);
      toast.success("Depoimento criado com sucesso!");
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      nome: testimonial.nome,
      descricaoHtml: testimonial.descricaoHtml,
      foto: testimonial.foto,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Depoimento removido com sucesso!");
  };

  // Filtragem
  const filteredTestimonials = useMemo(() => {
    const nomeTerm = filterNome.toLowerCase().trim();
    const textoTerm = filterTexto.toLowerCase().trim();

    return testimonials.filter((t) => {
      const nome = t.nome?.toLowerCase() ?? "";
      const texto = t.descricaoHtml?.toLowerCase() ?? "";

      const matchesNome = !nomeTerm ? true : nome.includes(nomeTerm);
      const matchesTexto = !textoTerm ? true : texto.includes(textoTerm);

      return matchesNome && matchesTexto;
    });
  }, [testimonials, filterNome, filterTexto]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Depoimentos</h1>
            <p className="text-muted-foreground">
              Gerencie os depoimentos de clientes exibidos no seu site
            </p>
          </div>

          <div className="flex gap-2">
            {/* Botão Filtros */}
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
                    Filtrar Depoimentos
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filterNome">Nome</Label>
                    <Input
                      id="filterNome"
                      placeholder="Pesquisar por nome"
                      value={filterNome}
                      onChange={(e) => setFilterNome(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filterTexto">Texto do depoimento</Label>
                    <Input
                      id="filterTexto"
                      placeholder="Palavras contidas no depoimento"
                      value={filterTexto}
                      onChange={(e) => setFilterTexto(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <Button type="button" variant="outline" onClick={clearFilters}>
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

            {/* Botão Novo Depoimento */}
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
                  Novo Depoimento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">
                    {editingTestimonial
                      ? "Editar Depoimento"
                      : "Criar Novo Depoimento"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {/* Foto */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {formData.foto ? (
                        <img
                          src={formData.foto}
                          alt="Foto do cliente"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Camera className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="fotoDepoimento"
                        className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                      >
                        {formData.foto ? "Alterar foto" : "Adicionar foto"}
                      </Label>
                      <Input
                        id="fotoDepoimento"
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
                      htmlFor="nomeDepoimento"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <User className="h-4 w-4" />
                      Nome
                    </Label>
                    <Input
                      id="nomeDepoimento"
                      placeholder="Digite o nome do cliente"
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

                  {/* Depoimento (HTML) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="descricaoHtml"
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <Quote className="h-4 w-4" />
                      Depoimento (aceita HTML)
                    </Label>
                    <Textarea
                      id="descricaoHtml"
                      placeholder='Você pode usar tags HTML, por exemplo: <strong>texto em negrito</strong>, <em>itálico</em>, <h3>Título</h3>'
                      value={formData.descricaoHtml}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          descricaoHtml: e.target.value,
                        }))
                      }
                      className="min-h-[140px] border-gray-200 focus:border-blue-500 font-mono text-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Dica: use tags como {"<strong>"}, {"<em>"},
                      {"<u>"}, {"<h3>"} para estilizar o texto.
                    </p>
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
                      {editingTestimonial
                        ? "Salvar alterações"
                        : "Criar depoimento"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Lista de Depoimentos */}
        {filteredTestimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/30 backdrop-blur-md p-12">
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Quote className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Nenhum depoimento encontrado
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Ajuste os filtros ou crie um novo depoimento clicando em
              &quot;Novo Depoimento&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md flex flex-col px-6 pt-10 pb-6 relative"
              >
                {/* Ícone de aspas */}
                <div className="absolute top-4 left-4 text-blue-100 group-hover:text-blue-200 transition-colors">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Avatar maior */}
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full border-4 border-blue-50 bg-gray-100 overflow-hidden shadow-sm mb-4">
                    {testimonial.foto ? (
                      <img
                        src={testimonial.foto}
                        alt={testimonial.nome}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo do depoimento */}
                <div className="mt-2 flex-1 flex flex-col items-center text-center">
                  <div className="text-sm text-slate-700 italic max-w-xs">
                    <div
                      className="prose prose-sm max-w-none prose-p:mb-1 prose-headings:mb-1"
                      dangerouslySetInnerHTML={{
                        __html: testimonial.descricaoHtml,
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-slate-900">
                      {testimonial.nome}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 bg-white/80 hover:bg-white text-slate-700"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 bg-white/80 hover:bg-red-50 text-red-500"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Depoimentos;
