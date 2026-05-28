'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterContent({
  colloquialHtml,
  classicalHtml,
}: {
  colloquialHtml: string;
  classicalHtml: string;
}) {
  const [style, setStyle] = useState<'colloquial' | 'classical'>('colloquial');

  return (
    <div className="relative">
      <div className="flex justify-center mb-12 not-prose sticky top-14 z-40 bg-[#F4F4F5]/90 backdrop-blur-sm py-4 border-b border-[#D4D4D8]/50">
        <div className="bg-[#E4E4E7] p-1 rounded-sm inline-flex font-sans text-sm border border-[#D4D4D8]">
          <button
            onClick={() => setStyle('colloquial')}
            className={`px-6 py-2 rounded-sm transition-all duration-200 ${
              style === 'colloquial'
                ? 'bg-[#1C1C1C] text-[#F4F4F5] font-bold shadow-sm'
                : 'text-[#52525B] hover:text-[#1C1C1C]'
            }`}
          >
            散打评书版
          </button>
          <button
            onClick={() => setStyle('classical')}
            className={`px-6 py-2 rounded-sm transition-all duration-200 ${
              style === 'classical'
                ? 'bg-[#1C1C1C] text-[#F4F4F5] font-bold shadow-sm'
                : 'text-[#52525B] hover:text-[#1C1C1C]'
            }`}
          >
            文言文版
          </button>
        </div>
      </div>

      <div className="min-h-[50vh] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={style}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-serif leading-loose text-[#1C1C1C] text-lg md:text-xl tracking-wide w-full text-justify"
            dangerouslySetInnerHTML={{
              __html: style === 'colloquial' ? colloquialHtml : classicalHtml,
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}