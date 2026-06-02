"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="hero-orb w-[500px] h-[500px] bg-indigo-500/10 top-[-100px] left-1/2 -translate-x-1/2" />
      <div className="hero-orb w-[300px] h-[300px] bg-purple-500/8 top-[50px] right-[-50px]" />
      <div className="hero-orb w-[200px] h-[200px] bg-pink-500/6 bottom-[0px] left-[-50px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
        >
          <Sparkles size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Dibuat oleh{" "}
            <span className="text-foreground font-semibold">Babehmodss</span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="gradient-text">Prompt Library</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Koleksi prompt AI terbaik untuk berbagai platform. Simpan, kelola, dan
          gunakan kembali prompt favoritmu.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-card border border-border rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden">
              <Search
                size={18}
                className="ml-4 text-muted-foreground shrink-0"
              />
              <input
                type="text"
                placeholder="Cari prompt, platform, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3.5 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="mr-3 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
