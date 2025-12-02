import { Toaster } from "@/components/ui/toaster";
import AnimatedBackground from "./AnimatedBackground";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Sites from "./pages/Sites";
import Pages from "./pages/Pages";
import Widgets from "./pages/Widgets";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { PostEditorPage } from "./components/blog/PostEditorPage";
import Perfis from "./pages/sites/Perfis";
import Depoimentos from "./pages/sites/Depoimentos";
import Paginas from "./pages/sites/Paginas";
import Galeria from "./pages/sites/Galeria";


const queryClient = new QueryClient();

const App = () => (
  <>
    <AnimatedBackground />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/sites/perfis" element={<Perfis />} />
              <Route path="/sites/depoimentos" element={<Depoimentos />} />
              <Route path="/sites/paginas" element={<Paginas />} />
              <Route path="/sites/galeria" element={<Galeria />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/widgets" element={<Widgets />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/posts/editor" element={<PostEditorPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </>
);

export default App;
