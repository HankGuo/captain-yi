import { getChapterData, getSortedChaptersData } from '@/lib/markdown';
import Link from 'next/link';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import ChapterContent from './ChapterContent';

export async function generateStaticParams() {
  const chapters = getSortedChaptersData();
  return chapters.map((chapter: any) => ({
    id: chapter.id,
  }));
}

export default async function Chapter({ params }: { params: { id: string } }) {
  let chapterData;
  try {
    chapterData = await getChapterData(params.id);
  } catch (error) {
    notFound();
  }

  // 简单的上下章逻辑（如果需要更复杂可以根据排序后数组查找）
  const allChapters = getSortedChaptersData();
  const currentIndex = allChapters.findIndex(c => c.id === params.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen font-sans selection:bg-amber-900/50 text-stone-300">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回目录
        </Link>
        <div className="text-xs font-sans text-stone-400 uppercase tracking-widest">
          The Lawn of Power
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 md:py-16">
        <article className="prose prose-stone prose-lg md:prose-xl mx-auto prose-p:text-justify prose-p:mb-8 prose-headings:font-bold prose-headings:text-stone-900">
          <header className="mb-10 not-prose text-center">
            <h1 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 leading-snug tracking-tight">
              {chapterData.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-stone-500 font-sans">
              <Calendar className="w-4 h-4" />
              <time>{chapterData.date}</time>
            </div>
            {chapterData.excerpt && (
              <div className="mt-8 px-5 py-4 bg-stone-100 rounded-2xl border border-stone-200 text-left relative">
                <div className="absolute top-4 left-4 text-stone-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11l-2-2v-2h4v4l-2 2v2h-2v-4zm10 0l-2-2v-2h4v4l-2 2v2h-2v-4z"/>
                  </svg>
                </div>
                <p className="text-base text-stone-600 italic indent-8 leading-relaxed">
                  {chapterData.excerpt}
                </p>
              </div>
            )}
          </header>

          <ChapterContent 
            colloquialHtml={chapterData.contentHtmlColloquial || ''} 
            classicalHtml={chapterData.contentHtmlClassical || ''} 
          />
        </article>

        {/* 移动端悬浮底部导航 (阅读页专属) */}
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:hidden">
          <div className="bg-stone-900/95 backdrop-blur-xl border border-stone-700/50 rounded-full shadow-2xl p-2 flex items-center justify-between">
            {prevChapter ? (
              <Link href={`/chapter/${prevChapter.id}`} className="flex-1 flex items-center justify-center py-3 text-stone-300 hover:text-amber-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            ) : <div className="flex-1"></div>}
            
            <div className="w-px h-6 bg-stone-700 mx-2"></div>
            
            <Link href="/" className="flex-1 flex items-center justify-center py-3 text-stone-300 hover:text-amber-500 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </Link>
            
            <div className="w-px h-6 bg-stone-700 mx-2"></div>

            {nextChapter ? (
              <Link href={`/chapter/${nextChapter.id}`} className="flex-1 flex items-center justify-center py-3 text-stone-300 hover:text-amber-500 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : <div className="flex-1"></div>}
          </div>
        </div>

        {/* 桌面端底部导航 */}
        <div className="mt-20 pt-10 border-t border-stone-200 hidden md:flex flex-row gap-4 justify-between font-sans">
          {prevChapter ? (
            <Link href={`/chapter/${prevChapter.id}`} className="group flex flex-col p-4 rounded-xl hover:bg-stone-100 transition-colors">
              <span className="text-xs text-stone-400 mb-1 flex items-center"><ArrowLeft className="w-3 h-3 mr-1" /> 上一章</span>
              <span className="text-stone-800 font-medium group-hover:text-amber-700 transition-colors line-clamp-1">{prevChapter.title}</span>
            </Link>
          ) : <div></div>}
          
          {nextChapter ? (
            <Link href={`/chapter/${nextChapter.id}`} className="group flex flex-col items-end text-right p-4 rounded-xl hover:bg-stone-100 transition-colors">
              <span className="text-xs text-stone-400 mb-1 flex items-center">下一章 <ChevronRight className="w-3 h-3 ml-1" /></span>
              <span className="text-stone-800 font-medium group-hover:text-amber-700 transition-colors line-clamp-1">{nextChapter.title}</span>
            </Link>
          ) : <div></div>}
        </div>
      </main>
    </div>
  );
}
