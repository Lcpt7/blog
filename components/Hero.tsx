"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMouseMove = (e: MouseEvent) => {
      glow.style.setProperty("--x", `${e.clientX}px`);
      glow.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="relative z-[1] flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(56, 189, 248, 0.08), transparent 40%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-40 w-40 border border-white/[0.03] rounded-3xl rotate-12 animate-[float-hex_20s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-10 h-32 w-32 border border-white/[0.03] rounded-full animate-[float-hex_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-1/4 left-1/4 h-24 w-24 border border-white/[0.02] rounded-[40%_60%_50%_50%] animate-[float-hex_18s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 h-20 w-20 border border-white/[0.02] rounded-[50%_40%_60%_50%] animate-[float-hex_22s_ease-in-out_infinite_reverse] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative text-center px-6">
        <h1 className="animate-fade-up font-mono text-7xl font-light tracking-[0.15em] sm:text-8xl md:text-9xl">
          <span className="text-gradient">LCPT</span>
        </h1>
        <p className="animate-fade-up mt-4 font-mono text-sm tracking-[0.2em] sm:text-base [animation-delay:300ms]"
           style={{ color: "var(--color-muted)" }}>
          密码学
        </p>
        <p className="animate-fade-up mt-2 text-[10px] tracking-[0.3em] font-mono [animation-delay:400ms]"
           style={{ color: "var(--color-muted)", opacity: 0.5 }}>
          CRYPTOGRAPHY
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: "var(--color-muted)", opacity: 0.3 }}>SCROLL</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--color-muted), transparent)", opacity: 0.3 }} />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32" style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }} />
    </section>
  );
}
