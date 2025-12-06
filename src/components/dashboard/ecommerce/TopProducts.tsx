import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Camiseta Básica", sales: 120 },
    { name: "Tênis Sport", sales: 98 },
    { name: "Boné Aba Reta", sales: 86 },
    { name: "Calça Jeans", sales: 72 },
    { name: "Jaqueta", sales: 65 },
];

export const TopProducts = () => {
    return (
        <Card className="col-span-4 lg:col-span-1 h-full">
            <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Bar
                                dataKey="sales"
                                fill="#3b82f6"
                                radius={[0, 4, 4, 0]}
                                barSize={20}
                                background={{ fill: '#f3f4f6', radius: [0, 4, 4, 0] }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
