import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BlogPostList, BlogPost } from "@/pages/blog/BlogPostList";
import { BlogPostForm } from "@/pages/blog/BlogPostForm";
import { StyleEditor } from "@/pages/blog/StyleEditor";
import { toast } from "sonner";

const Pages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [globalStyles, setGlobalStyles] = useState("");

  // Load posts and global styles from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      const postsWithDates = parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }));
      setPosts(postsWithDates);
    }

    const savedStyles = localStorage.getItem("blogGlobalStyles");
    if (savedStyles) {
      setGlobalStyles(savedStyles);
    }
  }, []);

  // Handle updated post from editor
  useEffect(() => {
    const updatedPost = location.state?.updatedPost as BlogPost | undefined;
    if (updatedPost) {
      setPosts((prevPosts) => {
        const existingIndex = prevPosts.findIndex((p) => p.id === updatedPost.id);
        let newPosts;
        if (existingIndex >= 0) {
          newPosts = [...prevPosts];
          newPosts[existingIndex] = {
            ...updatedPost,
            createdAt: new Date(updatedPost.createdAt),
            updatedAt: new Date(updatedPost.updatedAt),
          };
        } else {
          newPosts = [
            {
              ...updatedPost,
              createdAt: new Date(updatedPost.createdAt),
              updatedAt: new Date(updatedPost.updatedAt),
            },
            ...prevPosts,
          ];
        }
        return newPosts;
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handlePostClick = (post: BlogPost) => {
    navigate("/posts/editor", { state: { post } });
  };

  const handleDelete = (id: string) => {
    const newPosts = posts.filter((p) => p.id !== id);
    setPosts(newPosts);
    localStorage.setItem("blogPosts", JSON.stringify(newPosts));
    toast.success("Post excluído com sucesso");
  };

  const handleSubmit = (data: any) => {
    const newPost: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      content: "",
      customStyles: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newPosts = [newPost, ...posts];
    setPosts(newPosts);
    localStorage.setItem("blogPosts", JSON.stringify(newPosts));

    setIsCreating(false);
    toast.success("Post criado! Redirecionando para o editor...");
    navigate("/posts/editor", { state: { post: newPost, isNew: true } });
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  const handleUpdateProperties = (updatedPost: BlogPost) => {
    const newPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setPosts(newPosts);
    localStorage.setItem("blogPosts", JSON.stringify(newPosts));
    toast.success("Propriedades atualizadas com sucesso");
  };

  const handleStylesChange = (styles: string) => {
    setGlobalStyles(styles);
    localStorage.setItem("blogGlobalStyles", styles);
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10 space-y-6">
        {isCreating ? (
          <BlogPostForm
            post={undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <BlogPostList
              posts={posts}
              onEdit={handlePostClick}
              onDelete={handleDelete}
              onCreate={handleCreate}
              onUpdateProperties={handleUpdateProperties}
            />

            <StyleEditor
              value={globalStyles}
              onChange={handleStylesChange}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pages;
