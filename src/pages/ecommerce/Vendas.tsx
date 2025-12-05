import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader, GlassCard, FilterButton, PrimaryButton } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Eye, Package, CheckCircle, Clock, XCircle, Users } from "lucide-react";

interface Sale {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, color: "bg-yellow-100 text-yellow-600" },
  processing: { label: "Processando", icon: Package, color: "bg-blue-100 text-blue-600" },
  completed: { label: "Concluído", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-red-100 text-red-600" },
};

const Vendas = () => {
  const [sales] = useState<Sale[]>([
    {
      id: "1",
      orderNumber: "PED-001",
      customerName: "João Silva",
      customerEmail: "joao@email.com",
      products: [
        { name: "Camiseta Básica", quantity: 2, price: 49.90 },
        { name: "Tênis Esportivo", quantity: 1, price: 299.90 },
      ],
      total: 399.70,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "2",
      orderNumber: "PED-002",
      customerName: "Maria Santos",
      customerEmail: "maria@email.com",
      products: [
        { name: "Camiseta Básica", quantity: 3, price: 49.90 },
      ],
      total: 149.70,
      status: "processing",
      date: "2024-01-16",
    },
    {
      id: "3",
      orderNumber: "PED-003",
      customerName: "Pedro Costa",
      customerEmail: "pedro@email.com",
      products: [
        { name: "Tênis Esportivo", quantity: 2, price: 299.90 },
      ],
      total: 599.80,
      status: "pending",
      date: "2024-01-17",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isCustomersDialogOpen, setIsCustomersDialogOpen] = useState(false);

  const uniqueCustomers = Array.from(
    new Map(sales.map((sale) => [sale.customerEmail, { name: sale.customerName, email: sale.customerEmail }])).values()
  );

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || sale.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Vendas" description="Acompanhe todas as vendas do seu e-commerce">
          <div className="flex gap-2">
            <Dialog open={isCustomersDialogOpen} onOpenChange={setIsCustomersDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Clientes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Clientes Atuais</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {uniqueCustomers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">Nenhum cliente encontrado.</p>
                  ) : (
                    uniqueCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
              <DialogTrigger asChild>
                <FilterButton />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px] bg-white/95 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-800">Filtrar Vendas</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Buscar</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Buscar por pedido, cliente ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos status</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="processing">Processando</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
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
          </div>
        </PageHeader>

        {/* Search and Filter */}
        <GlassCard className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por pedido, cliente ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <GlassCard className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-800">{sales.length}</p>
            <p className="text-sm text-muted-foreground">Total de Pedidos</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {sales.filter((s) => s.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Concluídos</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {sales.filter((s) => s.status === "processing").length}
            </p>
            <p className="text-sm text-muted-foreground">Processando</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {sales.filter((s) => s.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </GlassCard>
        </div>

        {/* Sales List */}
        <div className="grid gap-4">
          {filteredSales.map((sale) => {
            const status = statusConfig[sale.status];
            const StatusIcon = status.icon;
            return (
              <GlassCard key={sale.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${status.color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{sale.orderNumber}</h3>
                      <p className="text-sm text-muted-foreground">{sale.customerName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(sale.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-800">
                        R$ {sale.total.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(sale)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {filteredSales.length === 0 && (
          <GlassCard className="p-12 text-center">
            <p className="text-muted-foreground">Nenhuma venda encontrada</p>
          </GlassCard>
        )}

        {/* Sale Details Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido</DialogTitle>
            </DialogHeader>
            {selectedSale && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800">{selectedSale.orderNumber}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${statusConfig[selectedSale.status].color}`}>
                    {statusConfig[selectedSale.status].label}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Cliente</h4>
                  <p className="text-slate-800">{selectedSale.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSale.customerEmail}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Produtos</h4>
                  <div className="space-y-2">
                    {selectedSale.products.map((product, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {product.quantity}x {product.name}
                        </span>
                        <span className="text-slate-800">
                          R$ {(product.quantity * product.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    R$ {selectedSale.total.toFixed(2)}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Data do pedido: {formatDate(selectedSale.date)}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Vendas;
