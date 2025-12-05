import { FileEdit, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const EditLastPostWidget = () => {
    const navigate = useNavigate();
    const [lastPost, setLastPost] = useState<any>(null);

    useEffect(() => {
        const savedPosts = localStorage.getItem("blogPosts");
        if (savedPosts) {
            const parsed = JSON.parse(savedPosts);
            if (parsed.length > 0) {
                // Assuming the first one is the latest or sorting by date
                const sorted = parsed.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setLastPost(sorted[0]);
            }
        }
    }, []);

    const handleEdit = () => {
        if (lastPost) {
            navigate("/posts/editor", { state: { post: lastPost } });
        } else {
            navigate("/posts/editor", { state: { isNew: true } });
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileEdit className="h-4 w-4" />
                    Último Post
                </CardTitle>
            </CardHeader>
            <CardContent>
                {lastPost ? (
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-semibold text-base line-clamp-1">{lastPost.title}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(lastPost.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {lastPost.excerpt || "Sem resumo disponível."}
                        </p>
                        <Button size="sm" className="w-full" onClick={handleEdit}>
                            Editar Post
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-4 space-y-2">
                        <p className="text-sm text-muted-foreground">Nenhum post encontrado.</p>
                        <Button size="sm" variant="outline" onClick={() => navigate("/posts/editor", { state: { isNew: true } })}>
                            Criar Novo Post
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
