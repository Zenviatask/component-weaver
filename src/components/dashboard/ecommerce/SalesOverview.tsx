import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

const data = [
    { name: "Jan", sales: 4000, revenue: 2400, orders: 240 },
    { name: "Fev", sales: 3000, revenue: 1398, orders: 210 },
    { name: "Mar", sales: 2000, revenue: 9800, orders: 290 },
    { name: "Abr", sales: 2780, revenue: 3908, orders: 200 },
    { name: "Mai", sales: 1890, revenue: 4800, orders: 181 },
    { name: "Jun", sales: 2390, revenue: 3800, orders: 250 },
    { name: "Jul", sales: 3490, revenue: 4300, orders: 210 },
    { name: "Ago", sales: 4000, revenue: 2400, orders: 240 },
    { name: "Set", sales: 3000, revenue: 1398, orders: 210 },
    { name: "Out", sales: 2000, revenue: 9800, orders: 290 },
    { name: "Nov", sales: 2780, revenue: 3908, orders: 200 },
    { name: "Dez", sales: 1890, revenue: 4800, orders: 181 },
];

type MetricType = "revenue" | "orders" | "sales";

export const SalesOverview = () => {
    const [activeMetric, setActiveMetric] = useState<MetricType>("revenue");

    const metrics = {
        revenue: {
            label: "Receita Total",
            value: "R$ 54.230,00",
            icon: DollarSign,
            color: "#10b981", // emerald-500
            dataKey: "revenue",
        },
        orders: {
            label: "Total de Pedidos",
            value: "1.234",
            icon: ShoppingBag,
            color: "#3b82f6", // blue-500
            dataKey: "orders",
        },
        sales: {
            label: "Ticket Médio",
            value: "R$ 145,00",
            icon: TrendingUp,
            color: "#f59e0b", // amber-500
            dataKey: "sales",
        },
    };

    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Visão Geral de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id={`color${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={metrics[activeMetric].color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={metrics[activeMetric].color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6b7280", fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6b7280", fontSize: 12 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={metrics[activeMetric].dataKey}
                                    stroke={metrics[activeMetric].color}
                                    fillOpacity={1}
                                    fill={`url(#color${activeMetric})`}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col gap-3">
                        {(Object.keys(metrics) as MetricType[]).map((key) => {
                            const metric = metrics[key];
                            const Icon = metric.icon;
                            const isActive = activeMetric === key;

                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveMetric(key)}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${isActive
                                            ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                                            : "border-slate-100 hover:bg-slate-50"
                                        }`}
                                >
                                    <div
                                        className={`p-2 rounded-lg ${isActive ? "bg-white shadow-sm" : "bg-slate-100"}`}
                                        style={{ color: metric.color }}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                                        <p className="font-semibold text-slate-900">{metric.value}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
