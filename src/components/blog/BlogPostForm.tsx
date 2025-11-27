import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StyleEditor } from "./StyleEditor";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { BlogPost } from "./BlogPostList";

const formSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
  accessType: z.enum(["publico", "privado", "restrito"]).optional(),
  authors: z.array(z.string()).optional(),
  postDate: z.string().optional(),
  categories: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  profiles: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),

  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  customStyles: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export const BlogPostForm = ({ post, onSubmit, onCancel }: BlogPostFormProps) => {
  const [imagePreview, setImagePreview] = useState<string>(post?.coverImage || "");
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [profileInput, setProfileInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      link: post?.link || "",
      accessType: post?.accessType || "publico",
      authors: post?.authors || [],
      postDate: post?.postDate || "",
      categories: post?.categories || [],
      tags: post?.tags || [],
      profiles: post?.profiles || [],
      featured: post?.featured ?? false,

      excerpt: post?.excerpt || "",
      coverImage: post?.coverImage || "",
      customStyles: post?.customStyles || "",
    },
  });

  const addToArrayField = (fieldName: keyof FormData, value: string, clear: () => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const current = form.getValues(fieldName) as string[] | undefined;
    const next = Array.isArray(current) ? [...current, trimmed] : [trimmed];
    form.setValue(fieldName, next, { shouldDirty: true, shouldValidate: true });
    clear();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue("coverImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">
          {post ? "Editar Post" : "Novo Post"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="relative z-10">
            <CardHeader>
              <CardTitle>Informações do Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título do post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Link */}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de acesso */}
              <FormField
                control={form.control}
                name="accessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de acesso</FormLabel>
                    <FormControl>
                      <select
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="publico">Público</option>
                        <option value="privado">Privado</option>
                        <option value="restrito">Restrito</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Autores */}
              <FormField
                control={form.control}
                name="authors"
                render={() => (
                  <FormItem>
                    <FormLabel>Autores</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          value={authorInput}
                          onChange={(event) => setAuthorInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addToArrayField("authors", authorInput, () => setAuthorInput(""));
                            }
                          }}
                          placeholder="Digite o nome e aperte Enter para adicionar"
                        />
                        <div className="flex flex-wrap gap-2">
                          {(form.watch("authors") || []).map((author, index) => (
                            <span
                              key={`${author}-${index}`}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                            >
                              {author}
                              <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const current = form.getValues("authors") || [];
                                  form.setValue(
                                    "authors",
                                    current.filter((item) => item !== author),
                                    { shouldDirty: true, shouldValidate: true }
                                  );
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data do post */}
              <FormField
                control={form.control}
                name="postDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do post</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categorias */}
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel>Categorias</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          value={categoryInput}
                          onChange={(event) => setCategoryInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addToArrayField("categories", categoryInput, () =>
                                setCategoryInput("")
                              );
                            }
                          }}
                          placeholder="Digite a categoria e aperte Enter"
                        />
                        <div className="flex flex-wrap gap-2">
                          {(form.watch("categories") || []).map((category, index) => (
                            <span
                              key={`${category}-${index}`}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                            >
                              {category}
                              <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const current = form.getValues("categories") || [];
                                  form.setValue(
                                    "categories",
                                    current.filter((item) => item !== category),
                                    { shouldDirty: true, shouldValidate: true }
                                  );
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>Aperte Enter para adicionar à lista</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          value={tagInput}
                          onChange={(event) => setTagInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addToArrayField("tags", tagInput, () => setTagInput(""));
                            }
                          }}
                          placeholder="Digite a tag e aperte Enter"
                        />
                        <div className="flex flex-wrap gap-2">
                          {(form.watch("tags") || []).map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                            >
                              {tag}
                              <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const current = form.getValues("tags") || [];
                                  form.setValue(
                                    "tags",
                                    current.filter((item) => item !== tag),
                                    { shouldDirty: true, shouldValidate: true }
                                  );
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>Aperte Enter para adicionar à lista</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Perfis */}
              <FormField
                control={form.control}
                name="profiles"
                render={() => (
                  <FormItem>
                    <FormLabel>Perfis</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          value={profileInput}
                          onChange={(event) => setProfileInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addToArrayField("profiles", profileInput, () =>
                                setProfileInput("")
                              );
                            }
                          }}
                          placeholder="Digite o perfil e aperte Enter"
                        />
                        <div className="flex flex-wrap gap-2">
                          {(form.watch("profiles") || []).map((profile, index) => (
                            <span
                              key={`${profile}-${index}`}
                              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                            >
                              {profile}
                              <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const current = form.getValues("profiles") || [];
                                  form.setValue(
                                    "profiles",
                                    current.filter((item) => item !== profile),
                                    { shouldDirty: true, shouldValidate: true }
                                  );
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Destacar */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        className="h-4 w-4 rounded border"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Destacar</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Imagem de capa */}
              <FormField
                control={form.control}
                name="coverImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Imagem de Capa</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("coverImage")?.click()}
                            className="gap-2"
                          >
                            <ImageIcon className="h-4 w-4" />
                            Escolher Imagem
                          </Button>
                          <Input
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setImagePreview("");
                                form.setValue("coverImage", "");
                              }}
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                        {imagePreview && (
                          <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg border bg-muted">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Adicione uma imagem de capa para o post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resumo */}
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Breve descrição do post"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Um breve resumo que aparecerá na listagem
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Custom styles */}
          <FormField
            control={form.control}
            name="customStyles"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StyleEditor value={field.value || ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              {post ? "Atualizar Post" : "Criar Post"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
