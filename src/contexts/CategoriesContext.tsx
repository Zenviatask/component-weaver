import { createContext, useContext, useState, ReactNode } from "react";

interface CategoriesContextType {
    categories: string[];
    addCategory: (category: string) => void;
    setCategories: (categories: string[]) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<string[]>([
        "Eletrônicos",
        "Roupas",
        "Acessórios",
        "Casa",
        "Esportes",
        "Outros",
    ]);

    const addCategory = (category: string) => {
        const trimmedCategory = category.trim();
        if (trimmedCategory && !categories.includes(trimmedCategory)) {
            setCategories([...categories, trimmedCategory]);
        }
    };

    return (
        <CategoriesContext.Provider value={{ categories, addCategory, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
};
