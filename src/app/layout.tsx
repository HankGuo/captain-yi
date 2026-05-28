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
      <body className={`${inter.className} bg-[#0a0a0a] text-gray-200 min-h-screen relative`}>
        {/* 全局背景板：易队肖像 */}
        <div 
          className="fixed inset-0 z-[-1] bg-center bg-cover bg-no-repeat opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "url('/yi.png')" }}
        />
        {/* 渐变遮罩，让文字更易读 */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a] pointer-events-none" />
        
        {children}
      </body>
    </html>
  );
}
