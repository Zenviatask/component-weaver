import React from 'react';
import { motion } from 'framer-motion';
import {
  Image, Camera, Mail, Rss, Map, Users, Puzzle
} from 'lucide-react';

const widgets = [
  { id: 1, name: 'Galeria Fotos', icon: Image, color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Slider Imagens', icon: Camera, color: 'bg-purple-100 text-purple-600' },
  { id: 3, name: 'Formulário', icon: Mail, color: 'bg-green-100 text-green-600' },
  { id: 4, name: 'Feed de Blog', icon: Rss, color: 'bg-orange-100 text-orange-600' },
  { id: 5, name: 'Mapa Interativo', icon: Map, color: 'bg-pink-100 text-pink-600' },
  { id: 6, name: 'Depoimentos', icon: Users, color: 'bg-cyan-100 text-cyan-600' },
  { id: 7, name: 'Integrações', icon: Puzzle, color: 'bg-amber-100 text-amber-600' },
];

export default function WidgetsGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-full"
      // nunca aplique z-index alto aqui
      style={{ position: "relative" }}
      tabIndex={-1}
      aria-label="Seção de Widgets"
    >
      <h3 className="text-lg font-semibold text-[#1a2742] mb-6">Widgets</h3>
      <div className="grid grid-cols-4 gap-3">
        {widgets.map((widget, index) => (
          <motion.button
            type="button"
            aria-label={`Abrir ${widget.name}`}
            key={widget.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
            tabIndex={0}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${widget.color}`}>
              <widget.icon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="text-xs text-gray-600 text-center leading-tight">{widget.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
