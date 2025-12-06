import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader, ImageUploader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, User, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "Admin Principal",
        email: "admin@levanta.com",
        avatar: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        // Simulate API call
        console.log("Saving profile:", formData);
        toast.success("Perfil atualizado com sucesso!");

        // Clear password fields
        setFormData({
            ...formData,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 relative z-10 max-w-4xl mx-auto">
                <PageHeader title="Meu Perfil" description="Gerencie suas informações pessoais e segurança" />

                <div className="grid gap-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-500" />
                                Informações Pessoais
                            </CardTitle>
                            <CardDescription>Atualize sua foto e dados de identificação</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="space-y-2">
                                    <Label>Foto de Perfil</Label>
                                    <ImageUploader
                                        id="avatar"
                                        imageUrl={formData.avatar}
                                        onImageChange={handleImageUpload}
                                        size="md"
                                    />
                                </div>

                                <div className="flex-1 space-y-4 w-full">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome Completo</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="pl-10"
                                                placeholder="Seu nome"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="pl-10"
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-orange-500" />
                                Segurança
                            </CardTitle>
                            <CardDescription>Redefina sua senha de acesso</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Senha Atual</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    placeholder="Digite sua senha atual"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">Nova Senha</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        placeholder="Mínimo de 8 caracteres"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Repita a nova senha"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button onClick={handleSave} size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20">
                            <Save className="h-5 w-5" />
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
