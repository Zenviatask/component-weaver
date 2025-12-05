import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, MapPin, ShoppingBag, DollarSign, ShoppingCart } from "lucide-react";

interface CustomerData {
    id: string;
    name: string;
    email: string;
    location: string;
    totalSpent: number;
    orderCount: number;
    hasAbandonedCart: boolean;
    lastActive: string;
    avatar?: string;
    status: "active" | "inactive";
}

const initialCustomers: CustomerData[] = [
    {
        id: "1",
        name: "Ana Silva",
        email: "ana.silva@exemplo.com",
        location: "São Paulo, SP",
        totalSpent: 1250.00,
        orderCount: 5,
        hasAbandonedCart: true,
        lastActive: "Há 2 horas",
        status: "active",
        avatar: "https://github.com/shadcn.png",
    },
    {
        id: "2",
        name: "Carlos Santos",
        email: "carlos.santos@exemplo.com",
        location: "Rio de Janeiro, RJ",
        totalSpent: 450.50,
        orderCount: 2,
        hasAbandonedCart: false,
        lastActive: "Há 1 dia",
        status: "active",
    },
    {
        id: "3",
        name: "Marina Costa",
        email: "marina.costa@exemplo.com",
        location: "Belo Horizonte, MG",
        totalSpent: 3200.00,
        orderCount: 12,
        hasAbandonedCart: false,
        lastActive: "Há 3 dias",
        status: "active",
    },
    {
        id: "4",
        name: "Roberto Almeida",
        email: "roberto.almeida@exemplo.com",
        location: "Curitiba, PR",
        totalSpent: 0,
        orderCount: 0,
        hasAbandonedCart: true,
        lastActive: "Há 5 dias",
        status: "inactive",
    },
    {
        id: "5",
        name: "Fernanda Oliveira",
        email: "fernanda.oliveira@exemplo.com",
        location: "Porto Alegre, RS",
        totalSpent: 890.90,
        orderCount: 3,
        hasAbandonedCart: true,
        lastActive: "Há 1 semana",
        status: "active",
    },
];

const Usuarios = () => {
    const [customers] = useState<CustomerData[]>(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (
        <DashboardLayout>
            <div className="p-4 lg:p-6 relative z-10">
                <PageHeader title="Clientes" description="Acompanhe o comportamento e dados dos seus clientes" />

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por nome, email ou cidade..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredCustomers.map((customer) => (
                        <Card key={customer.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 gap-4">

                                    {/* User Info */}
                                    <div className="flex items-center gap-4 min-w-[250px]">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={customer.avatar} />
                                            <AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
                                                {customer.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{customer.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3" />
                                                {customer.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="flex flex-wrap items-center gap-6 md:gap-12 flex-1 justify-start md:justify-end">

                                        <div className="flex flex-col items-start md:items-end">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <ShoppingBag className="h-3 w-3" />
                                                Pedidos
                                            </span>
                                            <span className="font-medium text-slate-900">{customer.orderCount}</span>
                                        </div>

                                        <div className="flex flex-col items-start md:items-end">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <DollarSign className="h-3 w-3" />
                                                Total Gasto
                                            </span>
                                            <span className="font-medium text-slate-900">{formatCurrency(customer.totalSpent)}</span>
                                        </div>

                                        <div className="flex flex-col items-start md:items-end min-w-[140px]">
                                            {customer.hasAbandonedCart ? (
                                                <Badge variant="destructive" className="flex gap-1 items-center bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
                                                    <ShoppingCart className="h-3 w-3" />
                                                    Carrinho Abandonado
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                                    Sem pendências
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="text-right text-sm text-muted-foreground hidden lg:block min-w-[100px]">
                                            <p className="text-xs">Último acesso</p>
                                            <p>{customer.lastActive}</p>
                                        </div>

                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Usuarios;
