import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader, PrimaryButton } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Mail, Shield, User, Trash2, Edit } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: "admin" | "editor" | "viewer";
    status: "active" | "inactive";
    avatar?: string;
    lastActive: string;
}

const initialUsers: UserData[] = [
    {
        id: "1",
        name: "Ana Silva",
        email: "ana.silva@exemplo.com",
        role: "admin",
        status: "active",
        avatar: "https://github.com/shadcn.png",
        lastActive: "Há 2 minutos",
    },
    {
        id: "2",
        name: "Carlos Santos",
        email: "carlos.santos@exemplo.com",
        role: "editor",
        status: "active",
        lastActive: "Há 1 hora",
    },
    {
        id: "3",
        name: "Marina Costa",
        email: "marina.costa@exemplo.com",
        role: "viewer",
        status: "inactive",
        lastActive: "Há 2 dias",
    },
];

const Usuarios = () => {
    const [users, setUsers] = useState<UserData[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "viewer",
        status: "active",
    });

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDialog = (user?: UserData) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: "",
                email: "",
                role: "viewer",
                status: "active",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        if (editingUser) {
            setUsers(users.map((u) => (u.id === editingUser.id ? {
                ...u,
                ...formData,
                role: formData.role as "admin" | "editor" | "viewer",
                status: formData.status as "active" | "inactive"
            } : u)));
            toast.success("Usuário atualizado com sucesso");
        } else {
            const newUser: UserData = {
                id: Date.now().toString(),
                ...formData,
                role: formData.role as "admin" | "editor" | "viewer",
                status: formData.status as "active" | "inactive",
                lastActive: "Agora",
            };
            setUsers([...users, newUser]);
            toast.success("Usuário criado com sucesso");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        setUsers(users.filter((u) => u.id !== id));
        toast.success("Usuário removido com sucesso");
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Admin</Badge>;
            case "editor":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Editor</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">Visualizador</Badge>;
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 relative z-10">
                <PageHeader title="Usuários" description="Gerencie o acesso ao sistema">
                    <PrimaryButton onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4" />
                        Novo Usuário
                    </PrimaryButton>
                </PageHeader>

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar usuários..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between p-4 sm:p-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{user.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center gap-6">
                                        <div className="flex flex-col items-end gap-1">
                                            {getRoleBadge(user.role)}
                                            <span className="text-xs text-muted-foreground">
                                                {user.status === "active" ? (
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                        Ativo
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-gray-500">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                        Inativo
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="text-right text-sm text-muted-foreground">
                                            <p className="text-xs">Último acesso</p>
                                            <p>{user.lastActive}</p>
                                        </div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="Nome completo"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Função</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                            <SelectItem value="editor">Editor</SelectItem>
                                            <SelectItem value="viewer">Visualizador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Ativo</SelectItem>
                                            <SelectItem value="inactive">Inativo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <PrimaryButton type="submit">
                                    {editingUser ? "Salvar Alterações" : "Criar Usuário"}
                                </PrimaryButton>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
};

export default Usuarios;
