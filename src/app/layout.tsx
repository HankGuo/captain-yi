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
      <body className={`${inter.className} bg-stone-950 text-stone-300 min-h-screen relative selection:bg-amber-900/50`}>
        {/* 全局背景板：易队肖像 */}
        <div 
          className="fixed inset-0 z-[-2] bg-center bg-cover bg-no-repeat opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/yi.png')" }}
        />
        {/* 渐变遮罩，让文字更易读 */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-stone-950/80 via-stone-950/90 to-stone-950 pointer-events-none" />
        
        {children}
      </body>
    </html>
  );
}
