import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BorderGlow from "@/components/ui/BorderGlow";

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative z-[1] py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Section label */}
        <div className="mb-12 sm:mb-16 text-center">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase"
                style={{ color: "var(--color-muted)", opacity: 0.7 }}>
            Writing
          </span>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
              <BorderGlow>
                <article className="lg-card p-5 sm:p-7">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 flex-wrap" style={{ position: "relative", zIndex: 2 }}>
                  <span className="accent-dot" />
                  <time className="text-[11px] font-mono tracking-wider"
                        style={{ color: "var(--color-muted)" }}>
                    {post.date}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                              style={{
                                background: "rgba(56,189,248,0.06)",
                                color: "var(--color-accent)",
                                border: "1px solid rgba(56,189,248,0.12)",
                              }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-foreground)", position: "relative", zIndex: 2 }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed"
                     style={{ color: "var(--color-muted)", position: "relative", zIndex: 2 }}>
                    {post.excerpt}
                  </p>
                )}
                </article>
              </BorderGlow>
            </Link>
          ))}
        </div>

        {getAllPosts().length > 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="vision-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-400 hover:scale-105"
              style={{ color: "var(--color-muted)" }}
            >
              全部文章
              <span style={{ color: "var(--color-accent)" }}>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
