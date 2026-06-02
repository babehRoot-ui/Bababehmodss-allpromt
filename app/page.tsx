"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/header";
import Hero from "./components/hero";
import Stats from "./components/stats";
import CategoryFilter from "./components/category-filter";
import PromptGrid from "./components/prompt-grid";
import Footer from "./components/footer";
import SubmitModal from "./components/submit-modal";
import { prompts as seedPrompts } from "@/data/prompts";
import type { Prompt } from "@/data/prompts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set());
  const [allPrompts, setAllPrompts] = useState<Prompt[]>(seedPrompts);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const liked = localStorage.getItem("babeh_liked_prompts");
      const saved = localStorage.getItem("babeh_saved_prompts");
      const custom = localStorage.getItem("babeh_custom_prompts");

      if (liked) setLikedPrompts(new Set(JSON.parse(liked)));
      if (saved) setSavedPrompts(new Set(JSON.parse(saved)));
      if (custom) {
        const parsed = JSON.parse(custom);
        setAllPrompts((prev) => [...parsed, ...prev]);
      }
    } catch {}
  }, []);

  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem(
      "babeh_liked_prompts",
      JSON.stringify([...likedPrompts])
    );
  }, [likedPrompts]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem(
      "babeh_saved_prompts",
      JSON.stringify([...savedPrompts])
    );
  }, [savedPrompts]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleLike = (id: string) => {
    setLikedPrompts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Unlike berhasil");
      } else {
        next.add(id);
        showToast("Prompt disukai! ❤️");
      }
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPrompts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Dihapus dari simpanan");
      } else {
        next.add(id);
        showToast("Prompt disimpan! 📌");
      }
      return next;
    });
  };

  const copyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Prompt berhasil disalin! 📋");
    } catch {
      showToast("Gagal menyalin prompt");
    }
  };

  const handleAddPrompt = (prompt: Omit<Prompt, "id" | "likes" | "createdAt">) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: `custom-${Date.now()}`,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setAllPrompts((prev) => [newPrompt, ...prev]);

    // Save custom prompts
    try {
      const custom = allPrompts.filter((p) => p.id.startsWith("custom-"));
      localStorage.setItem(
        "babeh_custom_prompts",
        JSON.stringify([newPrompt, ...custom])
      );
    } catch {}

    setShowSubmitModal(false);
    showToast("Prompt berhasil ditambahkan! 🎉");
  };

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.platform.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        activeCategory === "Semua" || p.platform === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [allPrompts, searchQuery, activeCategory]);

  const uniquePlatforms = useMemo(() => {
    const platforms = new Set(allPrompts.map((p) => p.platform));
    return ["Semua", ...Array.from(platforms)];
  }, [allPrompts]);

  return (
    <div className="min-h-screen grid-bg">
      <Header onOpenSubmit={() => setShowSubmitModal(true)} />
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Stats
        totalPrompts={allPrompts.length}
        totalPlatforms={uniquePlatforms.length - 1}
        totalCategories={uniquePlatforms.length - 1}
      />
      <CategoryFilter
        categories={uniquePlatforms}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <PromptGrid
        prompts={filteredPrompts}
        likedPrompts={likedPrompts}
        savedPrompts={savedPrompts}
        onLike={toggleLike}
        onSave={toggleSave}
        onCopy={copyPrompt}
      />
      <Footer onOpenSubmit={() => setShowSubmitModal(true)} />

      <AnimatePresence>
        {showSubmitModal && (
          <SubmitModal
            onClose={() => setShowSubmitModal(false)}
            onSubmit={handleAddPrompt}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium shadow-2xl toast-enter"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
