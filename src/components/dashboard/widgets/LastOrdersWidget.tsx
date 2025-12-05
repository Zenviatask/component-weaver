import { ShoppingCart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LastOrdersWidget = () => {
    const navigate = useNavigate();

    // Mock data - in a real app this would come from an API or Context
    const orders = [
        { id: "PED-001", customer: "João Silva", total: 399.70, status: "completed" },
        { id: "PED-002", customer: "Maria Santos", total: 149.70, status: "processing" },
        { id: "PED-003", customer: "Pedro Costa", total: 599.80, status: "pending" },
    ];

    const statusColors: Record<string, string> = {
        completed: "bg-green-100 text-green-600",
        processing: "bg-blue-100 text-blue-600",
        pending: "bg-yellow-100 text-yellow-600",
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Últimos Pedidos
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/vendas")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{order.customer}</p>
                                <p className="text-xs text-muted-foreground">{order.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">R$ {order.total.toFixed(2)}</p>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
