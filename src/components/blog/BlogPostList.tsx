import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import blogPlaceholder from "@/assets/blog-placeholder.jpg";

export interface BlogPost {
  id: string;
  title: string;
  coverImage?: string;
  excerpt: string;
  content: string;
  customStyles: string;
  createdAt: Date;
  updatedAt: Date;
  link?: string;
  accessType?: "publico" | "privado" | "restrito";
  authors?: string[];
  postDate?: string;
  categories?: string[];
  tags?: string[];
  profiles?: string[];
  featured?: boolean;
}

interface BlogPostListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onUpdateProperties?: (post: BlogPost) => void;
}

const POSTS_PER_PAGE = 8; // 4 columns x 2 rows

export const BlogPostList = ({ posts, onEdit, onDelete, onCreate, onUpdateProperties }: BlogPostListProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [editingProperties, setEditingProperties] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // FILTROS (usados no modal)
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterLink, setFilterLink] = useState("");
  const [filterAccessType, setFilterAccessType] = useState<"publico" | "privado" | "restrito" | "">("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterPostDate, setFilterPostDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterProfile, setFilterProfile] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "notFeatured">("all");

  // Form state for properties dialog
  const [propTitle, setPropTitle] = useState("");
  const [propLink, setPropLink] = useState("");
  const [propAccessType, setPropAccessType] = useState<"publico" | "privado" | "restrito">("publico");
  const [propAuthors, setPropAuthors] = useState<string[]>([]);
  const [propCategories, setPropCategories] = useState<string[]>([]);
  const [propTags, setPropTags] = useState<string[]>([]);
  const [propProfiles, setPropProfiles] = useState<string[]>([]);
  const [propFeatured, setPropFeatured] = useState(false);

  // Input states for array fields
  const [authorInput, setAuthorInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [profileInput, setProfileInput] = useState("");

  const resetFilters = () => {
    setFilterTitle("");
    setFilterLink("");
    setFilterAccessType("");
    setFilterAuthor("");
    setFilterPostDate("");
    setFilterCategory("");
    setFilterTag("");
    setFilterProfile("");
    setFilterFeatured("all");
  };

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return posts.filter((post) => {
      // Busca livre (input de texto principal)
      const title = post.title?.toLowerCase() ?? "";
      const excerpt = post.excerpt?.toLowerCase() ?? "";
      const link = post.link?.toLowerCase() ?? "";

      const matchesSearch = !term
        ? true
        : title.includes(term) || excerpt.includes(term) || link.includes(term);

      // Título
      const filterTitleTerm = filterTitle.toLowerCase().trim();
      const matchesTitle = !filterTitleTerm
        ? true
        : title.includes(filterTitleTerm);

      // Link
      const filterLinkTerm = filterLink.toLowerCase().trim();
      const matchesLink = !filterLinkTerm
        ? true
        : link.includes(filterLinkTerm);

      // Tipo de acesso
      const matchesAccessType = !filterAccessType
        ? true
        : post.accessType === filterAccessType;

      // Autor
      const authorTerm = filterAuthor.toLowerCase().trim();
      const matchesAuthor = !authorTerm
        ? true
        : (post.authors ?? []).some((a) =>
            a.toLowerCase().includes(authorTerm)
          );

      // Data do post (string livre, você pode trocar por date)
      const postDateTerm = filterPostDate.trim();
      const matchesPostDate = !postDateTerm
        ? true
        : (post.postDate ?? "").includes(postDateTerm);

      // Categoria
      const categoryTerm = filterCategory.toLowerCase().trim();
      const matchesCategory = !categoryTerm
        ? true
        : (post.categories ?? []).some((c) =>
            c.toLowerCase().includes(categoryTerm)
          );

      // Tag
      const tagTerm = filterTag.toLowerCase().trim();
      const matchesTag = !tagTerm
        ? true
        : (post.tags ?? []).some((t) =>
            t.toLowerCase().includes(tagTerm)
          );

      // Perfil
      const profileTerm = filterProfile.toLowerCase().trim();
      const matchesProfile = !profileTerm
        ? true
        : (post.profiles ?? []).some((p) =>
            p.toLowerCase().includes(profileTerm)
          );

      // Destacar
      const matchesFeatured =
        filterFeatured === "all"
          ? true
          : filterFeatured === "featured"
          ? !!post.featured
          : !post.featured;

      return (
        matchesSearch &&
        matchesTitle &&
        matchesLink &&
        matchesAccessType &&
        matchesAuthor &&
        matchesPostDate &&
        matchesCategory &&
        matchesTag &&
        matchesProfile &&
        matchesFeatured
      );
    });
  }, [
    posts,
    search,
    filterTitle,
    filterLink,
    filterAccessType,
    filterAuthor,
    filterPostDate,
    filterCategory,
    filterTag,
    filterProfile,
    filterFeatured,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when search or filtros mudarem
  useMemo(() => {
    setCurrentPage(1);
  }, [
    search,
    filterTitle,
    filterLink,
    filterAccessType,
    filterAuthor,
    filterPostDate,
    filterCategory,
    filterTag,
    filterProfile,
    filterFeatured,
  ]);

  const openPropertiesDialog = (post: BlogPost) => {
    setEditingProperties(post);
    setPropTitle(post.title || "");
    setPropLink(post.link || "");
    setPropAccessType(post.accessType || "publico");
    setPropAuthors(post.authors || []);
    setPropCategories(post.categories || []);
    setPropTags(post.tags || []);
    setPropProfiles(post.profiles || []);
    setPropFeatured(post.featured || false);
  };

  const handleSaveProperties = () => {
    if (!editingProperties) return;

    const updatedPost: BlogPost = {
      ...editingProperties,
      title: propTitle,
      link: propLink,
      accessType: propAccessType,
      authors: propAuthors,
      categories: propCategories,
      tags: propTags,
      profiles: propProfiles,
      featured: propFeatured,
      updatedAt: new Date(),
    };

    if (onUpdateProperties) {
      onUpdateProperties(updatedPost);
    }
    setEditingProperties(null);
  };

  const addToArray = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    clearInput: () => void
  ) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setter((prev) => [...prev, trimmed]);
    clearInput();
  };

  const removeFromArray = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div className="space-y-4 relative z-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-foreground">Posts do Blog</h2>

        <div className="flex w-full gap-2 sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="search"
              placeholder="Buscar posts..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background
                        file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
                        disabled:opacity-50 md:text-sm pl-9"
            />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="gap-2 whitespace-nowrap"
                onClick={() => setFiltersOpen(true)}
                aria-label="Abrir filtros avançados"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              Filtros Avançados
            </TooltipContent>
          </Tooltip>

          <Button onClick={onCreate} className="gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Novo Post
          </Button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <Card className="relative z-10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              {posts.length === 0
                ? "Nenhum post criado ainda"
                : "Nenhum post encontrado para esta busca"}
            </p>
            <Button onClick={onCreate} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow z-10 relative"
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={post.coverImage || blogPlaceholder}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(post)}
                      className="flex-1 gap-2"
                    >
                      <Pencil className="h-3 w-3" />
                      Editar
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPropertiesDialog(post)}
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Propriedades</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(post.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) onDelete(deleteId);
                setDeleteId(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Properties Dialog */}
      <Dialog open={!!editingProperties} onOpenChange={() => setEditingProperties(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Propriedades do Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="prop-title">Título</Label>
              <Input
                id="prop-title"
                value={propTitle}
                onChange={(e) => setPropTitle(e.target.value)}
                placeholder="Digite o título do post"
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="prop-link">Link</Label>
              <Input
                id="prop-link"
                value={propLink}
                onChange={(e) => setPropLink(e.target.value)}
                placeholder="https://..."
              />
            </div>

            {/* Tipo de acesso */}
            <div className="space-y-2">
              <Label htmlFor="prop-access">Tipo de acesso</Label>
              <select
                id="prop-access"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={propAccessType}
                onChange={(e) => setPropAccessType(e.target.value as "publico" | "privado" | "restrito")}
              >
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
                <option value="restrito">Restrito</option>
              </select>
            </div>

            {/* Autores */}
            <div className="space-y-2">
              <Label>Autores</Label>
              <Input
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addToArray(setPropAuthors, authorInput, () => setAuthorInput(""));
                  }
                }}
                placeholder="Digite o nome e aperte Enter"
              />
              <div className="flex flex-wrap gap-2">
                {propAuthors.map((author, index) => (
                  <span
                    key={`${author}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {author}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromArray(setPropAuthors, author)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <Label>Categorias</Label>
              <Input
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addToArray(setPropCategories, categoryInput, () => setCategoryInput(""));
                  }
                }}
                placeholder="Digite a categoria e aperte Enter"
              />
              <div className="flex flex-wrap gap-2">
                {propCategories.map((category, index) => (
                  <span
                    key={`${category}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {category}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromArray(setPropCategories, category)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addToArray(setPropTags, tagInput, () => setTagInput(""));
                  }
                }}
                placeholder="Digite a tag e aperte Enter"
              />
              <div className="flex flex-wrap gap-2">
                {propTags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromArray(setPropTags, tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Perfis */}
            <div className="space-y-2">
              <Label>Perfis</Label>
              <Input
                value={profileInput}
                onChange={(e) => setProfileInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addToArray(setPropProfiles, profileInput, () => setProfileInput(""));
                  }
                }}
                placeholder="Digite o perfil e aperte Enter"
              />
              <div className="flex flex-wrap gap-2">
                {propProfiles.map((profile, index) => (
                  <span
                    key={`${profile}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    {profile}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromArray(setPropProfiles, profile)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Destacar */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prop-featured"
                checked={propFeatured}
                onChange={(e) => setPropFeatured(e.target.checked)}
                className="h-4 w-4 rounded border"
              />
              <Label htmlFor="prop-featured" className="!mt-0">Destacar</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProperties(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProperties}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FILTERS MODAL */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filtros Avançados</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="filter-title">Título</Label>
              <Input
                id="filter-title"
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
                placeholder="Filtrar por título"
              />
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="filter-link">Link</Label>
              <Input
                id="filter-link"
                value={filterLink}
                onChange={(e) => setFilterLink(e.target.value)}
                placeholder="Filtrar por link"
              />
            </div>

            {/* Tipo de acesso */}
            <div className="space-y-2">
              <Label htmlFor="filter-access">Tipo de acesso</Label>
              <select
                id="filter-access"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filterAccessType}
                onChange={(e) => setFilterAccessType(e.target.value as any)}
              >
                <option value="">Todos</option>
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
                <option value="restrito">Restrito</option>
              </select>
            </div>

            {/* Autores */}
            <div className="space-y-2">
              <Label htmlFor="filter-author">Autores</Label>
              <Input
                id="filter-author"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                placeholder="Nome do autor"
              />
            </div>

            {/* Data do post */}
            <div className="space-y-2">
              <Label htmlFor="filter-post-date">Data do post</Label>
              <Input
                id="filter-post-date"
                value={filterPostDate}
                onChange={(e) => setFilterPostDate(e.target.value)}
                placeholder="Ex: 2025-11-28"
              />
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <Label htmlFor="filter-category">Categorias</Label>
              <Input
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                placeholder="Categoria"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="filter-tag">Tags</Label>
              <Input
                id="filter-tag"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                placeholder="Tag"
              />
            </div>

            {/* Perfis */}
            <div className="space-y-2">
              <Label htmlFor="filter-profile">Perfis</Label>
              <Input
                id="filter-profile"
                value={filterProfile}
                onChange={(e) => setFilterProfile(e.target.value)}
                placeholder="Perfil"
              />
            </div>

            {/* Destacar */}
            <div className="space-y-2">
              <Label htmlFor="filter-featured">Destacar</Label>
              <select
                id="filter-featured"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value as any)}
              >
                <option value="all">Todos</option>
                <option value="featured">Somente destacados</option>
                <option value="notFeatured">Somente não destacados</option>
              </select>
            </div>
          </div>

          <DialogFooter className="flex justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={resetFilters}
            >
              Limpar filtros
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFiltersOpen(false)}
              >
                Fechar
              </Button>
              <Button
                type="button"
                onClick={() => setFiltersOpen(false)}
              >
                Aplicar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
