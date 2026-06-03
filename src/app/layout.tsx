import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "易帝本纪 - 千古一帝的足球霸业",
  description: "易家独大 - 内部风云录电子周刊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      {/* 默认深色庄重背景，具体页面的样式在具体的 page.tsx 覆盖 */}
      <body className="bg-stone-950 text-stone-300 font-serif min-h-screen relative antialiased selection:bg-stone-700">
        {children}
      </body>
    </html>
  );
}