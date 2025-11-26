import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BlogPostList, BlogPost } from "@/components/blog/BlogPostList";
import { BlogPostForm } from "@/components/blog/BlogPostForm";
import { toast } from "sonner";

const Pages = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast.success("Post excluído com sucesso");
  };

  const handleSubmit = (data: any) => {
    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...data, updatedAt: new Date() }
            : p
        )
      );
      toast.success("Post atualizado com sucesso");
    } else {
      const newPost: BlogPost = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setPosts([newPost, ...posts]);
      toast.success("Post criado com sucesso");
    }
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        {isCreating || editingPost ? (
          <BlogPostForm
            post={editingPost || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <BlogPostList
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pages;
