"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

const platformColors: Record<string, string> = {
  Semua: "from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
  ChatGPT: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  Claude: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
  Gemini: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
  DeepSeek: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20",
  Grok: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
  Copilot: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
  Perplexity: "from-teal-500/10 to-teal-500/5 border-teal-500/20",
  "Qwen AI": "from-purple-500/10 to-purple-500/5 border-purple-500/20",
  Llama: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
  Midjourney: "from-gray-500/10 to-gray-500/5 border-gray-500/20",
  "Stable Diffusion": "from-fuchsia-500/10 to-fuchsia-500/5 border-fuchsia-500/20",
};

export default function CategoryFilter({
  categories,
  active,
  onSelect,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-active="true"]`);
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [active]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      id="prompts"
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-8"
    >
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => {
          const isActive = active === category;
          const colorClass = platformColors[category] || platformColors.Semua;

          return (
            <button
              key={category}
              data-active={isActive}
              onClick={() => onSelect(category)}
              className={`relative shrink-0 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border ${
                isActive
                  ? `bg-gradient-to-r ${colorClass} text-foreground category-active`
                  : "bg-card/40 border-border text-muted-foreground hover:text-foreground hover:bg-card/70"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
