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
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* 肖像图 */}
            <div className="relative w-full aspect-[2/3]">
              <Image 
                src="/bg.png" 
                alt="易帝肖像" 
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            </div>

            {/* 尊号文案 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-yellow-600 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                金恩之王
              </h2>
              <p className="text-stone-400 text-sm tracking-widest mb-4">KING OF JIN&apos;EN</p>
              <div className="w-12 h-0.5 bg-amber-500/50 mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}