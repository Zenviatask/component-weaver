import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const domains = [
  {
    value: "meusite.com.br",
    icon: <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-sm">🌐</div>,
    description: "Site institucional"
  },
  {
    value: "blogdaclara.com",
    icon: <div className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-100 text-sm">📝</div>,
    description: "Blog "
  },
  {
    value: "lojavirtual.com",
    icon: <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100 text-sm">🛒</div>,
    description: "E-commerce"
  }
];

export default function DomainDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(domains[0].value);
  const ref = useRef();

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Encontre o domínio atual
  const current = domains.find(d => d.value === selected);

  return (
    <div className="relative flex items-center gap-4" ref={ref}>
      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100"
        onClick={() => setOpen(!open)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar domínio"
      >
        {current.icon}
        <span className="text-sm font-medium text-slate-800">{current.value}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.16, type: "spring", bounce: 0.18 }}
            className="absolute top-full left-0 bg-white rounded-xl border border-gray-200 shadow-lg z-20 py-2"
            style={{ maxWidth: "max-content" }}
            >
            {domains.map(domain => (
              <button
                key={domain.value}
                onClick={() => {
                  setSelected(domain.value);
                  setOpen(false);
                }}
                className={`flex items-start gap-3 w-full px-4 py-3 text-sm rounded-xl text-left transition-colors ${
                  selected === domain.value
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
                type="button"
              >
                {domain.icon}
                <div className="flex flex-col flex-1">
                  <span className="text-slate-800 font-medium">{domain.value}</span>
                  <span className="text-xs text-gray-500">{domain.description}</span>
                </div>
                {selected === domain.value && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M4 8l3 3 5-5"
                      stroke="#6366f1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
