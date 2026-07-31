import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="relative z-[1] min-h-screen pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase"
                style={{ color: "var(--color-muted)", opacity: 0.7 }}>
            Writing
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-light tracking-tight"
              style={{ color: "var(--color-foreground)" }}>
            所有文章
          </h1>
          {posts.length > 0 && (
            <p className="mt-3 text-xs font-mono tracking-wider" style={{ color: "var(--color-muted)" }}>
              {posts.length} 篇
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--color-muted)" }}>
            <p className="text-sm">还没有文章。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                <article className="lg-card p-5 sm:p-7">
                  <div className="flex items-center gap-3 mb-2 flex-wrap" style={{ position: "relative", zIndex: 2 }}>
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
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="vision-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-400 hover:scale-105"
            style={{ color: "var(--color-muted)" }}
          >
            <span>←</span>
            <span>首页</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
