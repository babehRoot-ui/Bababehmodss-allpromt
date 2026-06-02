"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

interface SubmitModalProps {
  onClose: () => void;
  onSubmit: (prompt: {
    title: string;
    description: string;
    content: string;
    platform: string;
    author: string;
  }) => void;
}

const platforms = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "DeepSeek",
  "Grok",
  "Copilot",
  "Perplexity",
  "Qwen AI",
  "Llama",
  "Midjourney",
  "Stable Diffusion",
];

export default function SubmitModal({ onClose, onSubmit }: SubmitModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("ChatGPT");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Judul wajib diisi";
    if (!description.trim()) errs.description = "Deskripsi wajib diisi";
    if (!content.trim()) errs.content = "Prompt wajib diisi";
    if (!author.trim()) errs.author = "Nama author wajib diisi";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title, description, content, platform, author });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-400" />
            <h2 className="text-base font-semibold text-foreground">
              Submit Prompt
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5 tracking-wide">
              Judul Prompt *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Prompt untuk menulis artikel SEO"
              className="w-full px-3.5 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
            {errors.title && (
              <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5 tracking-wide">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5 tracking-wide">
              Deskripsi Singkat *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan singkat fungsi prompt ini..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
            {errors.description && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5 tracking-wide">
              Isi Prompt *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis prompt lengkap di sini..."
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none font-mono leading-relaxed"
            />
            {errors.content && (
              <p className="text-[11px] text-red-500 mt-1">{errors.content}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5 tracking-wide">
              Nama Author *
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nama kamu"
              className="w-full px-3.5 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
            {errors.author && (
              <p className="text-[11px] text-red-500 mt-1">{errors.author}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-accent-foreground text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
          >
            <Send size={15} />
            Kirim Prompt
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
