import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader, ImageUploader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
  Image as ImageIcon,
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  ShoppingCart,
  FileEdit
} from "lucide-react";
import { toast } from "sonner";
import { CategoriesProvider } from "@/contexts/CategoriesContext";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  latitude: string;
  longitude: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Editor" | "Comprador";
  categories: string[];
  password: string;
  adminPassword: string;
}

const Settings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "Levanta",
    siteDescription: "Crie seu site conosco",
    logo: "",
    favicon: "",
    cnpj: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    latitude: "",
    longitude: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin Principal",
      email: "admin@levanta.com",
      role: "Administrador",
      categories: [],
      password: "",
      adminPassword: "",
    },
  ]);

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "Editor" as "Administrador" | "Editor" | "Comprador",
    categories: [] as string[],
    password: "",
    adminPassword: "",
  });

  const availableCategories = ["Eletrônicos", "Roupas", "Acessórios", "Casa", "Esportes", "Outros"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "favicon") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Aqui você salvaria as configurações no backend
    console.log("Salvando configurações:", settings);
    toast.success("Configurações salvas com sucesso!");
  };

  const handleOpenUserDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        categories: user.categories,
        password: "",
        adminPassword: "",
      });
    } else {
      setEditingUser(null);
      setUserFormData({
        name: "",
        email: "",
        role: "Editor",
        categories: [],
        password: "",
        adminPassword: "",
      });
    }
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error("Preencha nome e email");
      return;
    }

    if (editingUser) {
      setUsers(users.map((u) =>
        u.id === editingUser.id
          ? { ...userFormData, id: editingUser.id }
          : u
      ));
      toast.success("Usuário atualizado com sucesso!");
    } else {
      setUsers([...users, { ...userFormData, id: Date.now().toString() }]);
      toast.success("Usuário criado com sucesso!");
    }
    setIsUserDialogOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("Usuário removido com sucesso!");
  };

  const toggleCategory = (category: string) => {
    setUserFormData({
      ...userFormData,
      categories: userFormData.categories.includes(category)
        ? userFormData.categories.filter((c) => c !== category)
        : [...userFormData.categories, category],
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Administrador":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "Editor":
        return <FileEdit className="h-4 w-4 text-blue-500" />;
      case "Comprador":
        return <ShoppingCart className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Configurações" description="Configure as informações do seu site">
          <Button onClick={handleSave} className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Coluna Esquerda - Configurações do Site */}
          <div className="space-y-6">
            <Accordion type="multiple" defaultValue={["basic", "contact", "location", "social"]} className="space-y-4">
              {/* Informações Básicas */}
              <AccordionItem value="basic" className="border rounded-xl bg-white/80 backdrop-blur-sm px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">Informações Básicas</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Nome do Site</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        placeholder="Nome do seu site"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={settings.cnpj}
                        onChange={(e) => setSettings({ ...settings, cnpj: e.target.value })}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Descrição do Site</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      placeholder="Breve descrição sobre seu site"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Logo do Site</Label>
                      <ImageUploader
                        id="logo"
                        imageUrl={settings.logo}
                        onImageChange={(e) => handleImageUpload(e, "logo")}
                        size="md"
                      />
                      <p className="text-xs text-muted-foreground">Recomendado: 200x200px (PNG com fundo transparente)</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <ImageUploader
                        id="favicon"
                        imageUrl={settings.favicon}
                        onImageChange={(e) => handleImageUpload(e, "favicon")}
                        size="sm"
                      />
                      <p className="text-xs text-muted-foreground">Recomendado: 32x32px ou 64x64px (PNG/ICO)</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Informações de Contato */}
              <AccordionItem value="contact" className="border rounded-xl bg-white/80 backdrop-blur-sm px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Phone className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Informações de Contato</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        placeholder="contato@exemplo.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={settings.website}
                      onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                      placeholder="https://www.exemplo.com"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Localização */}
              <AccordionItem value="location" className="border rounded-xl bg-white/80 backdrop-blur-sm px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-2 text-slate-800">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span className="font-semibold">Localização</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      placeholder="Rua, número, complemento"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={settings.city}
                        onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                        placeholder="Cidade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={settings.state}
                        onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        value={settings.zipCode}
                        onChange={(e) => setSettings({ ...settings, zipCode: e.target.value })}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        value={settings.latitude}
                        onChange={(e) => setSettings({ ...settings, latitude: e.target.value })}
                        placeholder="-23.550520"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        value={settings.longitude}
                        onChange={(e) => setSettings({ ...settings, longitude: e.target.value })}
                        placeholder="-46.633308"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use as coordenadas de geolocalização para exibir sua localização em mapas
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Redes Sociais */}
              <AccordionItem value="social" className="border rounded-xl bg-white/80 backdrop-blur-sm px-4 shadow-sm">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Globe className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold">Redes Sociais</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        value={settings.facebook}
                        onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                        placeholder="https://facebook.com/seu-perfil"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={settings.instagram}
                        onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                        placeholder="https://instagram.com/seu-perfil"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-sky-500" />
                        Twitter / X
                      </Label>
                      <Input
                        id="twitter"
                        value={settings.twitter}
                        onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                        placeholder="https://twitter.com/seu-perfil"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={settings.linkedin}
                        onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/seu-perfil"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Botão de Salvar no Final */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">Pronto para salvar?</h3>
                  <p className="text-sm text-muted-foreground">Clique em "Salvar Alterações" para aplicar as configurações</p>
                </div>
                <Button onClick={handleSave} size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Save className="h-5 w-5" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Gerenciamento de Usuários */}
          <div className="space-y-4">
            <Card className="border-slate-200 shadow-sm sticky top-6">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-base">Usuários</CardTitle>
                  </div>
                  <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => handleOpenUserDialog()} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingUser ? "Editar Usuário" : "Novo Usuário"}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="userName">Nome</Label>
                          <Input
                            id="userName"
                            value={userFormData.name}
                            onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                            placeholder="Nome completo"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="userEmail">Email</Label>
                          <Input
                            id="userEmail"
                            type="email"
                            value={userFormData.email}
                            onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                            placeholder="email@exemplo.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Função</Label>
                          <Select
                            value={userFormData.role}
                            onValueChange={(value: "Administrador" | "Editor" | "Comprador") =>
                              setUserFormData({ ...userFormData, role: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Administrador">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-red-500" />
                                  Administrador
                                </div>
                              </SelectItem>
                              <SelectItem value="Editor">
                                <div className="flex items-center gap-2">
                                  <FileEdit className="h-4 w-4 text-blue-500" />
                                  Editor
                                </div>
                              </SelectItem>
                              <SelectItem value="Comprador">
                                <div className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4 text-green-500" />
                                  Comprador
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Categorias</Label>
                          <div className="flex flex-wrap gap-2">
                            {availableCategories.map((category) => (
                              <Button
                                key={category}
                                type="button"
                                variant={userFormData.categories.includes(category) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleCategory(category)}
                              >
                                {category}
                              </Button>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Selecione as categorias que o usuário pode gerenciar
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="userPassword">Senha</Label>
                          <Input
                            id="userPassword"
                            type="password"
                            value={userFormData.password}
                            onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                            placeholder="Digite a senha"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="adminPassword">Senha Administrativa</Label>
                          <Input
                            id="adminPassword"
                            type="password"
                            value={userFormData.adminPassword}
                            onChange={(e) => setUserFormData({ ...userFormData, adminPassword: e.target.value })}
                            placeholder="Senha do administrador"
                          />
                          <p className="text-xs text-muted-foreground">
                            Necessária para confirmar a criação/edição
                          </p>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveUser}>
                          {editingUser ? "Salvar" : "Criar"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Gerencie os usuários da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <h4 className="font-medium text-sm text-slate-800 truncate">{user.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {user.role}
                          </span>
                          {user.categories.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              • {user.categories.length} categorias
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenUserDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
