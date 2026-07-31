import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getReadTime(content: string): string {
  const text = content.replace(/[#*`\[\]()>\-!|_\n]/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  // 中文约 400 字/分钟，英文约 200 词/分钟，折中 350
  const minutes = Math.max(1, Math.ceil(words / 350));
  return `${minutes} min`;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      const date = data.date
        ? String(data.date)
        : formatDate(fs.statSync(filePath).mtime);

      const tags = data.tags
        ? (Array.isArray(data.tags) ? data.tags : String(data.tags).split(",").map((t: string) => t.trim()))
        : [];

      return {
        slug,
        title: data.title || slug,
        date,
        excerpt: data.excerpt || "",
        content,
        tags,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  const date = data.date
    ? String(data.date)
    : formatDate(fs.statSync(filePath).mtime);

  const tags = data.tags
    ? (Array.isArray(data.tags) ? data.tags : String(data.tags).split(",").map((t: string) => t.trim()))
    : [];

  return {
    slug,
    title: data.title || slug,
    date,
    excerpt: data.excerpt || "",
    content,
    tags,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getReadTimeForPost(content: string): string {
  return getReadTime(content);
}
