export default function Footer() {
  return (
    <footer className="relative z-[1] border-t" style={{ borderColor: "var(--color-glass-border)" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-12 sm:flex-row sm:justify-between">
        <span className="font-mono text-xs tracking-widest"
              style={{ color: "var(--color-muted)" }}>
          LCPT
        </span>
        <p className="text-xs" style={{ color: "var(--color-muted)", opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} — 基于 Next.js 构建
        </p>
      </div>
    </footer>
  );
}
