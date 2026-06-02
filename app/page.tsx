"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/header";
import Hero from "./components/hero";
import Stats from "./components/stats";
import CategoryFilter from "./components/category-filter";
import PromptGrid from "./components/prompt-grid";
import Footer from "./components/footer";
import SubmitModal from "./components/submit-modal";
import BackgroundEffects from "./components/background-effects";
import { platforms as platformList } from "@/data/prompts";
import { supabase, getFingerprint } from "@/lib/supabase";
import type { Prompt } from "@/data/prompts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set());
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => ["Semua", ...platformList], []);

  // ===== FETCH PROMPTS DARI SUPABASE =====
  const fetchPrompts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mapped: Prompt[] = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        content: p.content,
        platform: p.platform,
        author: p.author,
        likes: p.likes || 0,
        createdAt: p.created_at,
      }));

      setAllPrompts(mapped);
    } catch {
      // Fallback: kosongkan, user bisa add baru
      setAllPrompts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===== FETCH LIKES & SAVES DARI SUPABASE =====
  const fetchUserInteractions = useCallback(async () => {
    const fp = getFingerprint();
    if (!fp) return;

    try {
      const [likesRes, savesRes] = await Promise.all([
        supabase.from("prompt_likes").select("prompt_id").eq("user_fingerprint", fp),
        supabase.from("prompt_saves").select("prompt_id").eq("user_fingerprint", fp),
      ]);

      if (likesRes.data) {
        setLikedPrompts(new Set(likesRes.data.map((l: any) => l.prompt_id)));
      }
      if (savesRes.data) {
        setSavedPrompts(new Set(savesRes.data.map((s: any) => s.prompt_id)));
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchPrompts();
    fetchUserInteractions();
  }, [fetchPrompts, fetchUserInteractions]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ===== LIKE / UNLIKE =====
  const toggleLike = async (id: string) => {
    const fp = getFingerprint();
    if (!fp) return;

    const isLiked = likedPrompts.has(id);
    setLikedPrompts((prev) => {
      const next = new Set(prev);
      if (isLiked) next.delete(id);
      else next.add(id);
      return next;
    });

    try {
      if (isLiked) {
        await supabase.from("prompt_likes").delete().eq("prompt_id", id).eq("user_fingerprint", fp);
        // Kurangi likes count
        const prompt = allPrompts.find((p) => p.id === id);
        if (prompt) {
          await supabase.from("prompts").update({ likes: Math.max(0, prompt.likes - 1) }).eq("id", id);
        }
        showToast("Unlike berhasil");
      } else {
        await supabase.from("prompt_likes").insert({ prompt_id: id, user_fingerprint: fp });
        const prompt = allPrompts.find((p) => p.id === id);
        if (prompt) {
          await supabase.from("prompts").update({ likes: prompt.likes + 1 }).eq("id", id);
        }
        showToast("Prompt disukai! ❤️");
      }
      // Refresh data
      fetchPrompts();
    } catch {
      showToast("Gagal update like");
    }
  };

  // ===== SAVE / UNSAVE =====
  const toggleSave = async (id: string) => {
    const fp = getFingerprint();
    if (!fp) return;

    const isSaved = savedPrompts.has(id);
    setSavedPrompts((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(id);
      else next.add(id);
      return next;
    });

    try {
      if (isSaved) {
        await supabase.from("prompt_saves").delete().eq("prompt_id", id).eq("user_fingerprint", fp);
        showToast("Dihapus dari simpanan");
      } else {
        await supabase.from("prompt_saves").insert({ prompt_id: id, user_fingerprint: fp });
        showToast("Prompt disimpan! 📌");
      }
    } catch {
      showToast("Gagal update simpanan");
    }
  };

  // ===== COPY =====
  const copyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Prompt berhasil disalin! 📋");
    } catch {
      showToast("Gagal menyalin prompt");
    }
  };

  // ===== SUBMIT PROMPT KE SUPABASE =====
  const handleAddPrompt = async (prompt: Omit<Prompt, "id" | "likes" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from("prompts")
        .insert({
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          platform: prompt.platform,
          author: prompt.author,
          likes: 0,
        })
        .select()
        .single();

      if (error) throw error;

      setAllPrompts((prev) => [
        {
          id: data.id,
          title: data.title,
          description: data.description,
          content: data.content,
          platform: data.platform,
          author: data.author,
          likes: 0,
          createdAt: data.created_at,
        },
        ...prev,
      ]);

      setShowSubmitModal(false);
      showToast("Prompt berhasil ditambahkan! 🎉");
    } catch {
      showToast("Gagal menambahkan prompt");
    }
  };

  // ===== FILTER & SEARCH =====
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

  return (
    <div className="min-h-screen glow-corner relative">
      <BackgroundEffects />

      <div className="relative" style={{ zIndex: 10 }}>
        <Header onOpenSubmit={() => setShowSubmitModal(true)} />
        <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Stats
          totalPrompts={allPrompts.length}
          totalPlatforms={platformList.length}
          totalCategories={platformList.length}
        />
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {loading ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Memuat prompts...</p>
            </div>
          </div>
        ) : (
          <PromptGrid
            prompts={filteredPrompts}
            likedPrompts={likedPrompts}
            savedPrompts={savedPrompts}
            onLike={toggleLike}
            onSave={toggleSave}
            onCopy={copyPrompt}
            onOpenSubmit={() => setShowSubmitModal(true)}
          />
        )}

        <Footer onOpenSubmit={() => setShowSubmitModal(true)} />
      </div>

      <AnimatePresence>
        {showSubmitModal && (
          <SubmitModal
            onClose={() => setShowSubmitModal(false)}
            onSubmit={handleAddPrompt}
          />
        )}
      </AnimatePresence>

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
