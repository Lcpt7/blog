"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Home, FileText, Briefcase, Moon, Sun } from "lucide-react";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./Tooltip";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const items = [
  { id: "home", label: "首页", icon: Home, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "blog", label: "博客", icon: FileText, onClick: () => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "works", label: "作品集", icon: Briefcase, href: "https://photoworks.pages.dev/" },
  { id: "github", label: "GitHub", icon: GithubIcon, href: "https://github.com/Lcpt7" },
];

export default function FloatingDock() {
  const [theme, setTheme] = useState("dark");
  const [visible, setVisible] = useState(true);
  const [mouseX, setMouseX] = useState(-999);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setItemRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const cur = window.scrollY;
      setVisible(cur < last || cur < 60);
      last = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = dockRef.current?.getBoundingClientRect();
    if (rect) setMouseX(e.clientX - rect.left);
  };

  const onMouseLeave = () => {
    setMouseX(-999);
    setHoveredId(null);
  };

  const getScale = (el: HTMLElement | undefined): number => {
    if (!el || !dockRef.current || mouseX === -999) return 1;
    const dockRect = dockRef.current.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    const center = itemRect.left + itemRect.width / 2 - dockRect.left;
    const dist = Math.abs(mouseX - center);
    if (dist > 140) return 1;
    const factor = 1 - Math.min(dist / 140, 1);
    return 1 + (1 - Math.pow(1 - factor, 2)) * 0.7;
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"
        }`}
      >
        <div
          ref={dockRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="vision-glass flex items-center gap-2 rounded-full px-4 py-3 shadow-2xl"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const s = getScale(itemRefs.current.get(item.id));

            return (
              <TooltipRoot key={item.id}>
                <TooltipTrigger asChild>
                  <a
                    ref={(el) => setItemRef(item.id, el)}
                    href={item.href}
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (item.onClick) { e.preventDefault(); item.onClick(); }
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative flex items-center justify-center rounded-full transition-all duration-75"
                    style={{
                      width: `${46 + (s - 1) * 24}px`,
                      height: `${46 + (s - 1) * 24}px`,
                      zIndex: s > 1.2 ? 10 : 1,
                    }}
                  >
                    <span
                      className="block transition-all duration-75"
                      style={{
                        transform: `scale(${s}) translateY(${s > 1 ? -(s - 1) * 14 : 0}px)`,
                        color: hoveredId === item.id ? "var(--color-foreground)" : "var(--color-muted)",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  {item.label}
                </TooltipContent>
              </TooltipRoot>
            );
          })}

          <div className="w-px h-8 mx-1" style={{ background: "var(--vision-glass-border)", opacity: 0.3 }} />

          <TooltipRoot>
            <TooltipTrigger asChild>
              <button
                ref={(el) => setItemRef("theme", el)}
                onClick={toggleTheme}
                onMouseEnter={() => setHoveredId("theme")}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex items-center justify-center rounded-full transition-all duration-75"
                style={{
                  width: `${46 + (getScale(itemRefs.current.get("theme")) - 1) * 24}px`,
                  height: `${46 + (getScale(itemRefs.current.get("theme")) - 1) * 24}px`,
                  zIndex: getScale(itemRefs.current.get("theme")) > 1.2 ? 10 : 1,
                  color: hoveredId === "theme" ? "var(--color-foreground)" : "var(--color-muted)",
                }}
              >
                <span
                  className="block transition-all duration-75"
                  style={{
                    transform: `scale(${getScale(itemRefs.current.get("theme"))}) translateY(${getScale(itemRefs.current.get("theme")) > 1 ? -(getScale(itemRefs.current.get("theme")) - 1) * 14 : 0}px)`,
                  }}
                >
                  {theme === "dark" ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {theme === "dark" ? "浅色模式" : "深色模式"}
            </TooltipContent>
          </TooltipRoot>
        </div>
      </div>
    </TooltipProvider>
  );
}
