'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Crown, X } from 'lucide-react';

export default function PortraitModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 瞻仰入口按钮 */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-700 hover:bg-amber-800 text-amber-50 p-4 rounded-full shadow-lg shadow-amber-900/20 transition-all hover:scale-105 active:scale-95 group flex items-center gap-2"
      >
        <Crown className="w-5 h-5" />
        <span className="text-sm font-serif tracking-widest hidden group-hover:inline-block pr-2">瞻仰易帝</span>
      </button>

      {/* 弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 animate-in fade-in zoom-in-95 duration-200">
            {/* 关闭按钮 */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* 纯净的肖像图，不加任何遮罩和文字 */}
            <div className="relative w-full aspect-[2/3]">
              <Image 
                src="/bg.png" 
                alt="易帝肖像" 
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}