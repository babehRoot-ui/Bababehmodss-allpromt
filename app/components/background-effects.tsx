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
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        top,
        left,
        filter: "blur(80px)",
      }}
      animate={{
        y: [0, -40, 20, -30, 0],
        x: [0, 20, -15, 25, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.4, 0.6, 0.35, 0.55, 0.4],
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          opacityDir: Math.random() > 0.5 ? 0.003 : -0.003,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir;

        if (p.opacity <= 0.05 || p.opacity >= 0.6) {
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

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineOpacity = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
      window.removeEventListener("resize", resize);
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

function AuroraLine({
  top,
  color,
  delay,
  duration,
  rotate,
}: {
  top: string;
  color: string;
  delay: number;
  duration: number;
  rotate: number;
}) {
  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        top,
        height: "2px",
        background: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
        filter: "blur(4px)",
        transform: `rotate(${rotate}deg)`,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.3, 0],
        x: ["-10%", "0%", "10%", "0%", "-10%"],
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

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Animated grid */}
      <div className="absolute inset-0 grid-animate opacity-[0.03] dark:opacity-[0.05]" />

      {/* Floating gradient orbs */}
      <FloatingOrb
        size={500}
        color="rgba(99, 102, 241, 0.15)"
        top="-10%"
        left="20%"
        delay={0}
        duration={20}
      />
      <FloatingOrb
        size={400}
        color="rgba(168, 85, 247, 0.12)"
        top="30%"
        left="60%"
        delay={3}
        duration={25}
      />
      <FloatingOrb
        size={350}
        color="rgba(236, 72, 153, 0.1)"
        top="60%"
        left="10%"
        delay={6}
        duration={22}
      />
      <FloatingOrb
        size={300}
        color="rgba(6, 182, 212, 0.1)"
        top="70%"
        left="70%"
        delay={9}
        duration={18}
      />
      <FloatingOrb
        size={250}
        color="rgba(99, 102, 241, 0.08)"
        top="10%"
        left="80%"
        delay={2}
        duration={23}
      />
      <FloatingOrb
        size={200}
        color="rgba(168, 85, 247, 0.1)"
        top="80%"
        left="40%"
        delay={5}
        duration={19}
      />

      {/* Aurora lines */}
      <AuroraLine top="15%" color="rgba(99, 102, 241, 0.6)" delay={0} duration={8} rotate={-1} />
      <AuroraLine top="35%" color="rgba(168, 85, 247, 0.5)" delay={2} duration={10} rotate={0.5} />
      <AuroraLine top="55%" color="rgba(236, 72, 153, 0.4)" delay={4} duration={9} rotate={-0.5} />
      <AuroraLine top="75%" color="rgba(6, 182, 212, 0.4)" delay={6} duration={11} rotate={0.8} />
      <AuroraLine top="90%" color="rgba(99, 102, 241, 0.3)" delay={1} duration={7} rotate={-0.3} />

      {/* Particles canvas */}
      <Particles />

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette" />

      {/* Top fade (untuk header area) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
}
