import { useState, useMemo } from "react";
import { ArrowLeft, Save, ChevronRight } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PostEditorPage = () => {
  const [title, setTitle] = useState("Título 1");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [hasImage, setHasImage] = useState(false);
  const [hasHeading, setHasHeading] = useState(false);

  const progress = useMemo(() => {
    let score = 0;
    if (title.trim().length > 0) score += 25;
    if (wordCount >= 300) score += 25;
    if (hasHeading) score += 25;
    if (hasImage) score += 25;
    return score;
  }, [title, wordCount, hasHeading, hasImage]);

  const handleEditorChange = (content: string, editor: any) => {
    setContentHtml(content);

    const text = editor.getContent({ format: "text" }) as string;
    const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);

    const hasImg = !!editor.dom.select("img")?.length;
    setHasImage(hasImg);

    const hasH = !!(editor.dom.select("h2")?.length || editor.dom.select("h3")?.length);
    setHasHeading(hasH);
  };

  const handleSave = () => {
    const payload = {
      title,
      subtitle,
      slug,
      summary,
      contentHtml,
      wordCount,
    };
    console.log("Salvar post", payload);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <DashboardLayout>
      {/* ocupa a tela inteira verticalmente */}
      <div className="flex min-h-screen flex-col gap-4 px-4 py-4 lg:px-8 lg:py-6">
        {/* Breadcrumb e ações */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Meus posts</span>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium">Teste</span>
              </div>
              <h1 className="text-xl font-bold text-foreground lg:text-2xl">
                Editor de Conteúdo
              </h1>
              <p className="text-xs text-muted-foreground lg:text-sm">
                Escreva matérias com textos formatados, imagens, áudios, vídeos e muito mais.
              </p>
            </div>
          </div>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Salvar post
          </Button>
        </div>

        {/* área única para o editor, ocupando o restante da tela */}
        <div className="flex flex-1">
          <Card className="relative z-10 flex h-full w-full flex-1">
            <div className="flex w-full flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Conteúdo do post</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-2">
                <div className="height-100% rounded-md border bg-background">
                  <Editor
                    apiKey="qwtenc77z676k28xloz95dxkz50ttlxarqb3m3d25t2iance"
                    value={contentHtml}
                    init={{
                      height: "flex", // usa toda a altura do container
                      menubar: false,
                      branding: false,
                      statusbar: false,
                      skin: "oxide",
                      content_css: "default",
                      language: "pt_BR",
                      language_url: "/tinymce/langs/pt_BR.js", // coloque o arquivo de idioma neste caminho
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | styles | bold italic underline forecolor backcolor | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | blockquote | " +
                        "link image media | table | removeformat | code fullscreen",
                      image_caption: true,
                      image_title: true,
                      automatic_uploads: true,
                      file_picker_types: "image media",
                      file_picker_callback: (callback, _value, meta) => {
                        const input = document.createElement("input");
                        input.type = "file";
                        if (meta.filetype === "image") {
                          input.accept = "image/*";
                        } else if (meta.filetype === "media") {
                          input.accept = "audio/*,video/*";
                        }
                        input.onchange = () => {
                          const file = input.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const url = e.target?.result as string;
                            callback(url, { title: file.name });
                          };
                          reader.readAsDataURL(file);
                        };
                        input.click();
                      },
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
