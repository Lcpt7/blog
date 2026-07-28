import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingDock from "@/components/FloatingDock";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "LCPT — 密码学与计算机科学",
  description: "Personal blog about cryptography and computer science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ParticleBackground />
        <ScrollProgress />
        <FloatingDock />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
