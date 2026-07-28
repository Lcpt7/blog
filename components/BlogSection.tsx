import { posts } from "@/lib/posts";

export default function BlogSection() {
  const post = posts[0];

  return (
    <section id="blog" className="relative z-[1] py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-14 text-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--color-muted)" }}>
            博客
          </span>
        </div>

        <article className="vision-glass rounded-2xl p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10 md:p-14 shadow-lg transition-all duration-300">
          <header className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono"
                 style={{ color: "var(--color-muted)" }}>
              <time>{post.date}</time>
              <span className="h-3 w-px" style={{ background: "var(--liquid-glass-border)" }} />
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-3xl font-light leading-tight"
                style={{ color: "var(--color-foreground)" }}>
              <span className="bg-gradient-to-b from-[var(--color-foreground)] via-[var(--color-foreground)]/90 to-[var(--color-foreground)]/40 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h2>
          </header>

          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed"
               style={{ color: "var(--color-muted)" }}>
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={i} className="!mt-8 sm:!mt-10 !mb-3 text-base sm:text-lg font-medium"
                      style={{ color: "var(--color-foreground)" }}>
                    {line.replace("## ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-5 sm:ml-6 list-disc text-sm sm:text-base"
                      style={{ color: "var(--color-muted)" }}>
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim() === "") return <div key={i} className="h-2 sm:h-3" />;
              return <p key={i} className="leading-[1.8] sm:leading-relaxed">{line}</p>;
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
