"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Heart,
  Bookmark,
  ExternalLink,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Prompt } from "@/data/prompts";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
  isLiked: boolean;
  isSaved: boolean;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onCopy: (text: string) => void;
}

const badgeClassMap: Record<string, string> = {
  ChatGPT: "badge-chatgpt",
  Claude: "badge-claude",
  Gemini: "badge-gemini",
  DeepSeek: "badge-deepseek",
  Grok: "badge-grok",
  Copilot: "badge-copilot",
  Perplexity: "badge-perplexity",
  "Qwen AI": "badge-qwen",
  Llama: "badge-llama",
  Midjourney: "badge-midjourney",
  "Stable Diffusion": "badge-stablediffusion",
};

export default function PromptCard({
  prompt,
  index,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onCopy,
}: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeClass = badgeClassMap[prompt.platform] || "badge-chatgpt";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      layout
      className="group card-hover rounded-xl bg-card border border-border overflow-hidden"
    >
      {/* Top section */}
      <div className="p-5 pb-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 truncate">
              {prompt.title}
            </h3>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase ${badgeClass}`}
            >
              {prompt.platform}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {prompt.description}
        </p>

        {/* Expandable content preview */}
        <div className="relative">
          <div
            className={`text-xs text-muted-foreground/80 bg-muted/50 rounded-lg p-3 font-mono leading-relaxed overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-[400px]" : "max-h-[60px]"
            }`}
          >
            {prompt.content}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-1.5 text-[11px] text-accent font-medium hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp size={12} /> Sembunyikan
              </>
            ) : (
              <>
                <ChevronDown size={12} /> Lihat prompt
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
        {/* Author */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <User size={10} className="text-white" />
          </div>
          <span className="text-[11px] text-muted-foreground truncate">
            {prompt.author}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onLike(prompt.id)}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              isLiked
                ? "text-red-500 bg-red-500/10"
                : "text-muted-foreground hover:text-red-400 hover:bg-red-500/5"
            }`}
            aria-label="Like"
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onSave(prompt.id)}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              isSaved
                ? "text-indigo-500 bg-indigo-500/10"
                : "text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/5"
            }`}
            aria-label="Save"
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              copied
                ? "text-emerald-500 bg-emerald-500/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            aria-label="Copy"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
