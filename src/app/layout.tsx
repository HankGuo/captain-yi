import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "易帝本纪 - 千古一帝的足球霸业",
  description: "金恩之王，易帝本纪。记录绿茵场上的无上霸业与权力之争。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      {/* 默认深色庄重背景，具体页面的样式在具体的 page.tsx 覆盖 */}
      <body className={`${inter.className} bg-stone-950 text-stone-300 min-h-screen selection:bg-amber-900/50`}>
        {children}
      </body>
    </html>
  );
}