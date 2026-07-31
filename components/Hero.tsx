"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMouseMove = (e: MouseEvent) => {
      glow.style.setProperty("--mx", `${e.clientX}px`);
      glow.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const py = scrollY * 0.12;

  return (
    <section className="relative z-[1] flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Parallax grid layer */}
      <div className="pointer-events-none absolute inset-0" style={{ transform: `translateY(${py}px)` }}>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,0.6) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(56,189,248,0.6) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 38%, black 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 38%, black 15%, transparent 70%)",
          }}
        />
      </div>

      {/* Text */}
      <div className="relative text-center px-6 z-10">
        <h1 className="animate-fade-up font-mono text-7xl font-light tracking-[0.15em] sm:text-8xl md:text-9xl">
          <span className="text-gradient">LCPT</span>
        </h1>
        <p className="animate-fade-up mt-4 font-mono text-sm tracking-[0.2em] sm:text-base [animation-delay:250ms]"
           style={{ color: "var(--color-muted)" }}>
          密码学
        </p>
        <p className="animate-fade-up mt-2 text-[10px] tracking-[0.3em] font-mono [animation-delay:350ms]"
           style={{ color: "var(--color-muted)", opacity: 0.45 }}>
          CRYPTOGRAPHY
        </p>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in z-10" style={{ animationDelay: "1.2s" }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--color-muted)", opacity: 0.25 }}>SCROLL</span>
          <div className="w-px h-6" style={{ background: "linear-gradient(to bottom, var(--color-muted), transparent)", opacity: 0.25 }} />
        </div>
      </div>
    </section>
  );
}
