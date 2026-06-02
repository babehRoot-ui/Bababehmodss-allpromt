"use client";

import { Heart, Github, PlusCircle } from "lucide-react";

interface FooterProps {
  onOpenSubmit: () => void;
}

export default function Footer({ onOpenSubmit }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <span className="font-semibold text-sm text-foreground">
                Babehmodss
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-left max-w-xs">
              Koleksi prompt AI terbaik untuk berbagai platform.
            </p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              <PlusCircle size={13} />
              Submit Prompt
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Github size={13} />
              GitHub
            </a>
          </div>

          {/* Right */}
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            Dibuat dengan <Heart size={10} className="text-red-500" fill="currentColor" /> oleh Babehmodss
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} Prompt Library by Babehmodss. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
