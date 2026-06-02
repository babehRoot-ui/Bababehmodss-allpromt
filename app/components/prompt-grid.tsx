"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PackageOpen, PlusCircle } from "lucide-react";
import PromptCard from "./prompt-card";
import type { Prompt } from "@/data/prompts";

interface PromptGridProps {
  prompts: Prompt[];
  likedPrompts: Set<string>;
  savedPrompts: Set<string>;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onCopy: (text: string) => void;
  onOpenSubmit?: () => void;
}

export default function PromptGrid({
  prompts,
  likedPrompts,
  savedPrompts,
  onLike,
  onSave,
  onCopy,
  onOpenSubmit,
}: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
              <PackageOpen size={36} className="text-muted-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
              <PlusCircle size={12} className="text-accent-foreground" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">
            Belum Ada Prompt
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
            Mulai koleksimu dengan menambahkan prompt AI pertama.
            Klik tombol di bawah untuk submit prompt baru.
          </p>

          {onOpenSubmit && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
            >
              <PlusCircle size={16} />
              Tambah Prompt Pertama
            </motion.button>
          )}

          <p className="text-[11px] text-muted-foreground/50 mt-6">
            Data tersimpan di Supabase — bisa diakses dari mana saja
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {prompts.map((prompt, index) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              index={index}
              isLiked={likedPrompts.has(prompt.id)}
              isSaved={savedPrompts.has(prompt.id)}
              onLike={onLike}
              onSave={onSave}
              onCopy={onCopy}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
