import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, PlayCircle, FileText, ShoppingBag, Palette, BarChart3, ExternalLink } from "lucide-react";

const Help = () => {
  const whatsappNumber = "5521998591096";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const tutorials = [
    {
      id: "item-1",
      title: "Como criar e editar posts no Blog",
      icon: FileText,
      description: "Aprenda a gerenciar o conteúdo do seu blog, criar novos artigos e otimizar para SEO.",
      videoPlaceholder: "Tutorial: Gerenciando o Blog",
    },
    {
      id: "item-2",
      title: "Gerenciando produtos no E-commerce",
      icon: ShoppingBag,
      description: "Saiba como cadastrar produtos, gerenciar estoque, variações e categorias.",
      videoPlaceholder: "Tutorial: Gestão de Produtos",
    },
    {
      id: "item-3",
      title: "Personalizando a aparência do site",
      icon: Palette,
      description: "Descubra como alterar cores, fontes, layouts e organizar os widgets do dashboard.",
      videoPlaceholder: "Tutorial: Personalização Visual",
    },
    {
      id: "item-4",
      title: "Acompanhando métricas e clientes",
      icon: BarChart3,
      description: "Entenda os relatórios de vendas, tráfego e comportamento dos seus clientes.",
      videoPlaceholder: "Tutorial: Análise de Dados",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 relative z-10">
        <PageHeader title="Ajuda e Suporte" description="Tutoriais e canal direto de atendimento" />

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">

          {/* Main Content - Tutorials */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                  Onboarding e Tutoriais
                </CardTitle>
                <CardDescription>
                  Aprenda a utilizar todos os recursos da plataforma com nossos guias passo a passo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {tutorials.map((tutorial) => (
                    <AccordionItem key={tutorial.id} value={tutorial.id}>
                      <AccordionTrigger className="hover:no-underline hover:bg-slate-50 px-4 rounded-lg">
                        <div className="flex items-center gap-3 text-left">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <tutorial.icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-slate-700">{tutorial.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-4 pb-6">
                        <p className="text-slate-600 mb-4">{tutorial.description}</p>

                        {/* Video Placeholder */}
                        <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-50 transition-colors cursor-pointer group">
                          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <PlayCircle className="h-6 w-6 text-blue-600" />
                          </div>
                          <span className="font-medium">{tutorial.videoPlaceholder}</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Support */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Suporte via WhatsApp
                </CardTitle>
                <CardDescription className="text-green-700/80">
                  Tire suas dúvidas diretamente com nossa equipe de suporte.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg shadow-green-600/20"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </Button>
                <p className="text-xs text-center mt-3 text-green-700/60">
                  Atendimento seg-sex, 9h às 18h
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Links Úteis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50" asChild>
                  <a href="#" target="_blank">Documentação Completa</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50" asChild>
                  <a href="#" target="_blank">Termos de Uso</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50" asChild>
                  <a href="#" target="_blank">Política de Privacidade</a>
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
