import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Code, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface StyleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const StyleEditor = ({ value, onChange }: StyleEditorProps) => {
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  const [isOpen, setIsOpen] = useState(false);

  // Parse simple styles from CSS string
  const parseSimpleStyles = (css: string) => {
    const styles = {
      fontSize: "",
      fontFamily: "",
      textColor: "",
      backgroundColor: "",
      padding: "",
      borderRadius: "",
    };

    const fontSizeMatch = css.match(/font-size:\s*([^;]+)/);
    const fontFamilyMatch = css.match(/font-family:\s*([^;]+)/);
    const colorMatch = css.match(/color:\s*([^;]+)/);
    const bgMatch = css.match(/background-color:\s*([^;]+)/);
    const paddingMatch = css.match(/padding:\s*([^;]+)/);
    const borderRadiusMatch = css.match(/border-radius:\s*([^;]+)/);

    if (fontSizeMatch) styles.fontSize = fontSizeMatch[1].trim();
    if (fontFamilyMatch) styles.fontFamily = fontFamilyMatch[1].trim();
    if (colorMatch) styles.textColor = colorMatch[1].trim();
    if (bgMatch) styles.backgroundColor = bgMatch[1].trim();
    if (paddingMatch) styles.padding = paddingMatch[1].trim();
    if (borderRadiusMatch) styles.borderRadius = borderRadiusMatch[1].trim();

    return styles;
  };

  const simpleStyles = parseSimpleStyles(value);

  const updateSimpleStyle = (property: string, val: string) => {
    const styles = parseSimpleStyles(value);
    (styles as any)[property] = val;

    const cssMap: Record<string, string> = {
      fontSize: "font-size",
      fontFamily: "font-family",
      textColor: "color",
      backgroundColor: "background-color",
      padding: "padding",
      borderRadius: "border-radius",
    };

    const cssString = Object.entries(styles)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${cssMap[k]}: ${v};`)
      .join("\n");

    onChange(cssString);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="relative z-10">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-input bg-card p-4 hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-foreground">Estilos Personalizados</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-lg border border-input bg-card p-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "simple" | "advanced")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple" className="gap-2">
              <Palette className="h-4 w-4" />
              Simples
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Code className="h-4 w-4" />
              Avançado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                <Input
                  id="fontSize"
                  placeholder="Ex: 16px, 1rem"
                  value={simpleStyles.fontSize}
                  onChange={(e) => updateSimpleStyle("fontSize", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Família da Fonte</Label>
                <Input
                  id="fontFamily"
                  placeholder="Ex: Arial, sans-serif"
                  value={simpleStyles.fontFamily}
                  onChange={(e) => updateSimpleStyle("fontFamily", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Cor do Texto</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    className="w-16 h-10 p-1"
                    value={simpleStyles.textColor.startsWith("#") ? simpleStyles.textColor : "#000000"}
                    onChange={(e) => updateSimpleStyle("textColor", e.target.value)}
                  />
                  <Input
                    placeholder="Ex: #000000, rgb(0,0,0)"
                    value={simpleStyles.textColor}
                    onChange={(e) => updateSimpleStyle("textColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    className="w-16 h-10 p-1"
                    value={simpleStyles.backgroundColor.startsWith("#") ? simpleStyles.backgroundColor : "#ffffff"}
                    onChange={(e) => updateSimpleStyle("backgroundColor", e.target.value)}
                  />
                  <Input
                    placeholder="Ex: #ffffff, transparent"
                    value={simpleStyles.backgroundColor}
                    onChange={(e) => updateSimpleStyle("backgroundColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="padding">Espaçamento Interno</Label>
                <Input
                  id="padding"
                  placeholder="Ex: 20px, 1rem 2rem"
                  value={simpleStyles.padding}
                  onChange={(e) => updateSimpleStyle("padding", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="borderRadius">Arredondamento</Label>
                <Input
                  id="borderRadius"
                  placeholder="Ex: 8px, 0.5rem"
                  value={simpleStyles.borderRadius}
                  onChange={(e) => updateSimpleStyle("borderRadius", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="customCss">CSS Personalizado</Label>
              <Textarea
                id="customCss"
                placeholder="Digite seu CSS aqui...&#10;Ex:&#10;font-size: 18px;&#10;color: #333;&#10;padding: 20px;"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="font-mono text-sm min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                Escreva regras CSS que serão aplicadas ao conteúdo do post.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CollapsibleContent>
    </Collapsible>
  );
};
