import Link from 'next/link';
import { getSortedChaptersData } from '@/lib/markdown';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import PortraitModal from './components/PortraitModal';

export default function Home() {
  const allChaptersData = getSortedChaptersData();

  return (
    <div className="min-h-screen font-sans selection:bg-amber-900/50 bg-stone-950">
      <PortraitModal />
      {/* 头部：封面图 */}
      <div className="relative w-full aspect-[21/9] min-h-[30vh] max-h-[50vh] md:max-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-stone-800">
        <Image 
          src="/cover.webp" 
          alt="易帝本纪：千古一帝的足球霸业" 
          fill
          priority
          className="object-cover object-center"
        />
        {/* 底部渐变过渡到页面深色背景 */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none"></div>
      </div>

      {/* 独立文案区：放在封面图下方 */}
      <div className="text-center px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 drop-shadow-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          易帝本纪
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mx-auto my-4"></div>
        <p className="text-sm text-stone-400 italic max-w-md mx-auto leading-relaxed mb-8">
          “权力如绿茵之草，非强者不能践踏。此书，录孤之霸业，传万世之威名。”
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-amber-500 uppercase tracking-widest border border-amber-900/30 px-4 py-2 rounded-full bg-stone-900/50 backdrop-blur-md shadow-sm">
          <BookOpen className="w-4 h-4" />
          <span>王朝卷宗</span>
        </div>
      </div>

      {/* 目录区域 */}
      <main className="max-w-2xl mx-auto px-5 py-12 md:py-16 relative z-20 -mt-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-stone-800 flex-1"></div>
          <h3 className="text-stone-500 font-serif italic text-base md:text-lg tracking-widest">目录 / Chapters</h3>
          <div className="h-px bg-stone-800 flex-1"></div>
        </div>

        <ul className="space-y-4 md:space-y-6">
          {allChaptersData.map(({ id, title, date, excerpt }, index) => (
            <li key={id} className="group relative">
              <Link href={`/chapter/${id}`} className="block p-5 md:p-6 rounded-2xl bg-stone-900/30 border border-stone-800/50 hover:bg-stone-900 hover:border-amber-900/50 transition-all duration-300 active:scale-[0.98]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 md:mb-4 gap-2 md:gap-0">
                  <h4 className="text-lg md:text-xl font-bold text-stone-200 group-hover:text-amber-500 transition-colors leading-snug">
                    {title}
                  </h4>
                  <span className="text-xs text-stone-600 font-mono mt-1 flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" />
                    {date}
                  </span>
                </div>
                <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">
                  {excerpt}
                </p>
                <div className="mt-4 flex items-center text-xs text-amber-700 font-medium group-hover:text-amber-500 transition-colors">
                  阅读此章 <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        {allChaptersData.length === 0 && (
          <div className="text-center py-20 text-stone-600 italic">
            历史的卷轴尚未展开... (暂无章节)
          </div>
        )}
      </main>
      
      <footer className="text-center py-8 text-xs text-stone-700 border-t border-stone-900">
        &copy; {new Date().getFullYear()} 权力的草坪. 记录绿茵场上的冰与火.
      </footer>
    </div>
  );
}