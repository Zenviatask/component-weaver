import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  id: string;
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-20 w-20",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

const iconSizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

export const ImageUploader = ({ id, imageUrl, onImageChange, size = "md" }: ImageUploaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeClasses[size]} overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera className={`${iconSizes[size]} text-gray-400`} />
        )}
      </div>
      <div>
        <Label
          htmlFor={id}
          className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
        >
          {imageUrl ? "Alterar foto" : "Adicionar foto"}
        </Label>
        <Input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};
