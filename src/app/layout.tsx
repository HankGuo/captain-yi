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
      <body className={`${inter.className} bg-stone-100 text-stone-900 min-h-screen relative selection:bg-amber-200/50`}>
        {/* 全局背景板：易队肖像，做成水墨/线稿风格的极淡水印 */}
        <div 
          className="fixed inset-0 z-[-2] bg-center bg-cover bg-no-repeat opacity-[0.03] pointer-events-none mix-blend-luminosity"
          style={{ backgroundImage: "url('/bg.png')" }}
        />
        
        {children}
      </body>
    </html>
  );
}
