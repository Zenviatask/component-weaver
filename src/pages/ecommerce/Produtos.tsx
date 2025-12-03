import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader, GlassCard, FilterButton, PrimaryButton, DragHandle, ImageUploader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  colors: string[];
  sizes: string[];
  customizable: boolean;
  imageUrl: string;
}

const categories = ["Eletrônicos", "Roupas", "Acessórios", "Casa", "Esportes", "Outros"];
const defaultColors = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa", "Cinza"];
const availableSizes = ["PP", "P", "M", "G", "GG", "XG"];

const Produtos = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Camiseta Básica",
      price: 49.90,
      description: "Camiseta de algodão confortável",
      category: "Roupas",
      quantity: 100,
      colors: ["Preto", "Branco", "Azul"],
      sizes: ["P", "M", "G"],
      customizable: true,
      imageUrl: "",
    },
    {
      id: "2",
      name: "Tênis Esportivo",
      price: 299.90,
      description: "Tênis ideal para corrida",
      category: "Esportes",
      quantity: 50,
      colors: ["Preto", "Branco"],
      sizes: ["38", "39", "40", "41", "42"],
      customizable: false,
      imageUrl: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [availableColors, setAvailableColors] = useState<string[]>(defaultColors);
  const [newColorInput, setNewColorInput] = useState("");

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    category: "",
    quantity: 0,
    colors: [],
    sizes: [],
    customizable: false,
    imageUrl: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        colors: product.colors,
        sizes: product.sizes,
        customizable: product.customizable,
        imageUrl: product.imageUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        description: "",
        category: "",
        quantity: 0,
        colors: [],
        sizes: [],
        customizable: false,
        imageUrl: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map((p) =>
        p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
      ));
    } else {
      setProducts([...products, { ...formData, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleColor = (color: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.includes(color)
        ? formData.colors.filter((c) => c !== color)
        : [...formData.colors, color],
    });
  };

  const toggleSize = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size)
        ? formData.sizes.filter((s) => s !== size)
        : [...formData.sizes, size],
    });
  };

  const handleAddNewColor = () => {
    const trimmedColor = newColorInput.trim();
    if (trimmedColor && !availableColors.includes(trimmedColor)) {
      setAvailableColors([...availableColors, trimmedColor]);
      setFormData({ ...formData, colors: [...formData.colors, trimmedColor] });
      setNewColorInput("");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newProducts = [...products];
    const draggedItem = newProducts[draggedIndex];
    newProducts.splice(draggedIndex, 1);
    newProducts.splice(index, 0, draggedItem);
    setProducts(newProducts);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <DashboardLayout>
      <PageHeader title="Produtos" description="Gerencie seus produtos do e-commerce">
        <FilterButton />
        <Button variant="outline" onClick={() => filteredProducts[0] && handlePreview(filteredProducts[0])}>
          <Eye className="h-4 w-4" />
          Pré-visualizar
        </Button>
        <PrimaryButton onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4" />
          Novo Produto
        </PrimaryButton>
      </PageHeader>

      {/* Search and Filter */}
      <GlassCard className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </GlassCard>

      {/* Products List */}
      <div className="grid gap-4">
        {filteredProducts.map((product, index) => (
          <GlassCard
            key={product.id}
            className="p-6"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-slate-800 truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground truncate mt-1">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                    {product.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Qtd: {product.quantity}
                  </span>
                  {product.customizable && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                      Personalizável
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center shrink-0">
                <p className="font-bold text-xl text-slate-800">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => handlePreview(product)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
                <DragHandle />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <GlassCard className="p-12 text-center">
          <p className="text-muted-foreground">Nenhum produto encontrado</p>
        </GlassCard>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <ImageUploader
              id="product-image"
              imageUrl={formData.imageUrl}
              onImageChange={handleImageChange}
              size="lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cores disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <Button
                    key={color}
                    type="button"
                    variant={formData.colors.includes(color) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Nova cor..."
                  value={newColorInput}
                  onChange={(e) => setNewColorInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddNewColor())}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddNewColor}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tamanhos disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={formData.sizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="customizable"
                checked={formData.customizable}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, customizable: checked as boolean })
                }
              />
              <Label htmlFor="customizable">Permite personalização</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <PrimaryButton onClick={handleSave}>
              {editingProduct ? "Salvar" : "Criar"}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pré-visualização</DialogTitle>
          </DialogHeader>
          {previewProduct && (
            <div className="space-y-4">
              <div className="h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {previewProduct.imageUrl ? (
                  <img src={previewProduct.imageUrl} alt={previewProduct.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-6xl">📦</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{previewProduct.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  R$ {previewProduct.price.toFixed(2)}
                </p>
              </div>
              <p className="text-muted-foreground">{previewProduct.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                  {previewProduct.category}
                </span>
                {previewProduct.customizable && (
                  <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600">
                    Personalizável
                  </span>
                )}
              </div>
              {previewProduct.colors.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Cores:</p>
                  <div className="flex flex-wrap gap-1">
                    {previewProduct.colors.map((color) => (
                      <span key={color} className="text-xs px-2 py-1 rounded bg-gray-100">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {previewProduct.sizes.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Tamanhos:</p>
                  <div className="flex flex-wrap gap-1">
                    {previewProduct.sizes.map((size) => (
                      <span key={size} className="text-xs px-2 py-1 rounded bg-gray-100">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Estoque: {previewProduct.quantity} unidades
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Produtos;
