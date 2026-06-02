"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
  duration,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none will-change-transform"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top,
        left,
        filter: "blur(100px)",
      }}
      animate={{
        y: [0, -30, 15, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.05, 0.97, 1.03, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Cek reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      opacityDir: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      // Dikurangi drastis: ~30 partikel (bukan ~100)
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 50000), 40);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.2 + 0.4,
          opacity: Math.random() * 0.4 + 0.1,
          opacityDir: Math.random() > 0.5 ? 0.002 : -0.002,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hanya render partikel, TANPA connection lines (paling berat)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir;

        if (p.opacity <= 0.05 || p.opacity >= 0.5) {
          p.opacityDir *= -1;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Animated grid - ringan, pakai CSS saja */}
      <div className="absolute inset-0 grid-animate opacity-[0.025] dark:opacity-[0.04]" />

      {/* Hanya 3 orb (bukan 6) */}
      <FloatingOrb
        size={450}
        color="rgba(99, 102, 241, 0.12)"
        top="-5%"
        left="25%"
        delay={0}
        duration={22}
      />
      <FloatingOrb
        size={350}
        color="rgba(168, 85, 247, 0.1)"
        top="40%"
        left="65%"
        delay={4}
        duration={26}
      />
      <FloatingOrb
        size={300}
        color="rgba(236, 72, 153, 0.08)"
        top="65%"
        left="15%"
        delay={8}
        duration={24}
      />

      {/* Particles - dioptimasi */}
      <Particles />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
}
