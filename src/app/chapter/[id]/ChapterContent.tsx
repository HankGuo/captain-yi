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
      <div className="flex justify-center mb-10 not-prose sticky top-16 z-40 bg-[#fcfbf9]/80 backdrop-blur-md py-4">
        <div className="bg-stone-200/50 p-1 rounded-full inline-flex font-sans text-sm shadow-inner border border-stone-200">
          <button
            onClick={() => setStyle('colloquial')}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 ease-out ${
              style === 'colloquial'
                ? 'bg-white shadow-sm text-amber-900 font-bold scale-105'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            散打评书版
          </button>
          <button
            onClick={() => setStyle('classical')}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 ease-out ${
              style === 'classical'
                ? 'bg-white shadow-sm text-amber-900 font-bold scale-105'
                : 'text-stone-500 hover:text-stone-700'
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
            initial={{ opacity: 0, x: style === 'colloquial' ? -20 : 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: style === 'colloquial' ? 20 : -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-loose text-stone-800 text-lg md:text-xl tracking-wide w-full"
            dangerouslySetInnerHTML={{
              __html: style === 'colloquial' ? colloquialHtml : classicalHtml,
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
