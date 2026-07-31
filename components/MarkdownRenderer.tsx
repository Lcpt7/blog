"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="text-[15px] leading-[1.85]"
         style={{ color: "var(--color-muted)", fontFamily: "var(--font-sans)" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-2xl sm:text-3xl font-light leading-tight mt-12 mb-5 first:mt-0"
                style={{ color: "var(--color-foreground)" }} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl sm:text-2xl font-light leading-tight mt-10 mb-4 first:mt-0"
                style={{ color: "var(--color-foreground)" }} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-normal mt-8 mb-3 first:mt-0"
                style={{ color: "var(--color-foreground)" }} {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-5" {...props}>{children}</p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc ml-5 sm:ml-6 mb-5 space-y-1.5" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal ml-5 sm:ml-6 mb-5 space-y-1.5" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="pl-1" {...props}>{children}</li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-2 pl-5 my-6 italic text-[14px] sm:text-[15px]"
              style={{ borderColor: "var(--color-accent)", opacity: 0.85 }}
              {...props}
            >
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="underline underline-offset-[3px] decoration-[0.5px] transition-colors hover:opacity-75"
              style={{ color: "var(--color-accent)" }}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-xl my-7 max-w-full"
              style={{ border: "1px solid var(--vision-glass-border)" }}
              loading="lazy"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="text-[0.85em] px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: "var(--color-glass)",
                    border: "1px solid var(--vision-glass-border)",
                    color: "var(--color-accent)",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="rounded-xl my-6 p-5 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed"
                   style={{
                     background: "rgba(0,0,0,0.3)",
                     border: "1px solid var(--vision-glass-border)",
                   }}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          pre: ({ children }) => <>{children}</>,
          hr: ({ ...props }) => (
            <hr className="my-10 border-0 h-px" style={{ background: "var(--vision-glass-border)" }} {...props} />
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-medium" style={{ color: "var(--color-foreground)" }} {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
