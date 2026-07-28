"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: {
      x: number; y: number; size: number;
      vx: number; vy: number;
      alpha: number; phase: number;
      hue: number;
    }[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.min(600, Math.floor((w * h) / 4000));

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.8 + 0.3,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.2,
          alpha: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
          hue: [195, 210, 225, 240, 180, 260, 170, 280, 200, 230][Math.floor(Math.random() * 10)],
        });
      }
    };

    resize();
    spawn();
    window.addEventListener("resize", () => { resize(); spawn(); });

    const draw = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const baseBrightness = isLight ? 25 : 65;
      const glowBrightness = isLight ? 15 : 45;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const twinkle = Math.sin(time * 3 + p.phase) * 0.4 + 0.6;
        const alpha = p.alpha * twinkle;

        p.x += p.vx + Math.sin(time * 0.6 + p.phase) * 0.25;
        p.y += p.vy + Math.cos(time * 0.7 + p.phase * 1.3) * 0.22;

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (1 - dist / 180) * 1.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        if (alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 55%, ${glowBrightness}%, ${alpha * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 45%, ${baseBrightness + 25}%, ${alpha * 0.9})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = Math.sqrt(dx * dx + dy * dy);
          if (d2 < 70) {
            const a = Math.max(0, (1 - d2 / 70) * 0.035);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(220, 30%, ${baseBrightness}%, ${a})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
