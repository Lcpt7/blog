import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} — LCPT blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="relative z-[1] min-h-screen pt-28 pb-24 sm:pt-36 sm:pb-32">
      <article className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Back */}
        <header className="mb-10 sm:mb-14">
          <Link
            href="/posts"
            className="vision-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-mono tracking-[0.15em] uppercase transition-all duration-400 hover:scale-105"
            style={{ color: "var(--color-muted)" }}
          >
            <span>←</span>
            <span>文章</span>
          </Link>
          <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-light leading-tight tracking-tight"
              style={{ color: "var(--color-foreground)" }}>
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
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
        </header>

        {/* Content card */}
        <div className="lg-card p-6 sm:p-10 md:p-12 !rounded-2xl sm:!rounded-3xl !shadow-2xl">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Prev / Next */}
        {(prevPost || nextPost) && (
          <nav className="mt-12 grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/posts/${prevPost.slug}`} className="lg-card p-4 sm:p-5 group text-left col-start-1 block">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--color-muted)" }}>
                  ← 上一篇
                </span>
                <h3 className="mt-2 text-sm font-medium leading-snug transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-foreground)" }}>
                  {prevPost.title}
                </h3>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/posts/${nextPost.slug}`} className="lg-card p-4 sm:p-5 group text-right col-start-2 block">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--color-muted)" }}>
                  下一篇 →
                </span>
                <h3 className="mt-2 text-sm font-medium leading-snug transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-foreground)" }}>
                  {nextPost.title}
                </h3>
              </Link>
            ) : <div />}
          </nav>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/posts"
            className="vision-glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-mono tracking-[0.15em] uppercase transition-all duration-400 hover:scale-105"
            style={{ color: "var(--color-muted)" }}
          >
            <span>←</span>
            <span>返回文章列表</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
