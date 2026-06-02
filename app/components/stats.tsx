"use client";

import { motion } from "framer-motion";
import { FileText, Bot, Layers } from "lucide-react";

interface StatsProps {
  totalPrompts: number;
  totalPlatforms: number;
  totalCategories: number;
}

const stats = [
  { icon: FileText, label: "Total Prompts", color: "text-indigo-400" },
  { icon: Bot, label: "AI Platforms", color: "text-purple-400" },
  { icon: Layers, label: "Kategori", color: "text-pink-400" },
];

export default function Stats({
  totalPrompts,
  totalPlatforms,
  totalCategories,
}: StatsProps) {
  const values = [totalPrompts, totalPlatforms, totalCategories];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-12"
    >
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 py-5 px-3 rounded-xl bg-card/60 border border-border backdrop-blur-sm"
          >
            <stat.icon size={20} className={stat.color} />
            <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
              {values[i]}
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium tracking-wide uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
