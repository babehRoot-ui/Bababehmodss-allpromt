"use client";

import { AnimatePresence } from "framer-motion";
import { PackageOpen } from "lucide-react";
import PromptCard from "./prompt-card";
import type { Prompt } from "@/data/prompts";

interface PromptGridProps {
  prompts: Prompt[];
  likedPrompts: Set<string>;
  savedPrompts: Set<string>;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onCopy: (text: string) => void;
}

export default function PromptGrid({
  prompts,
  likedPrompts,
  savedPrompts,
  onLike,
  onSave,
  onCopy,
}: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <PackageOpen size={28} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tidak ada prompt ditemukan
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </p>
        </div>
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
