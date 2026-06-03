import { getChapterData } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ChapterContent from './ChapterContent';

export const runtime = 'edge';

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapterData = await getChapterData(params.id);

  if (!chapterData) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-stone-800 mb-4">章节未找到</h1>
          <Link href="/" className="text-stone-500 hover:text-stone-800 transition-colors">
            返回目录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#1C1C1C] font-serif selection:bg-stone-300">
      {/* 顶部导航栏 - 水墨屏极简风格 */}
      <header className="sticky top-0 z-50 bg-[#F4F4F5]/90 backdrop-blur-sm border-b border-[#D4D4D8] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-[#52525B] hover:text-[#1C1C1C] transition-colors font-sans">
          <ArrowLeft className="w-4 h-4" /> 返回卷宗
        </Link>
        <div className="text-xs font-serif text-[#71717A] tracking-widest">
          易帝本纪
        </div>
      </header>

      {/* 文章正文容器 */}
      <main className="max-w-2xl mx-auto px-5 py-10 md:py-16">
        <article className="prose prose-stone prose-lg md:prose-xl mx-auto
          prose-headings:font-bold prose-headings:text-[#1C1C1C] prose-headings:font-serif
          prose-p:text-[#333333] prose-p:leading-relaxed prose-p:text-justify prose-p:mb-6
          prose-strong:text-[#111111] prose-strong:font-bold
          prose-blockquote:border-l-4 prose-blockquote:border-[#A1A1AA] prose-blockquote:bg-[#E4E4E7]/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:text-[#52525B] prose-blockquote:font-serif prose-blockquote:not-italic
        ">
          <header className="mb-12 text-center border-b border-[#D4D4D8] pb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {chapterData.title}
            </h1>
            <div className="text-sm text-[#71717A] font-mono tracking-wider flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#D4D4D8]"></span>
              {chapterData.date}
              <span className="w-8 h-px bg-[#D4D4D8]"></span>
            </div>
          </header>
          
          <ChapterContent 
            colloquialHtml={chapterData.contentHtmlColloquial || ''} 
            classicalHtml={chapterData.contentHtmlClassical || ''} 
            prevChapterId={chapterData.prevChapterId}
            nextChapterId={chapterData.nextChapterId}
          />
        </article>
      </main>
      
      {/* 底部导航栏：上一章、目录、下一章 */}
      <div className="max-w-2xl mx-auto px-5 pb-12">
        <div className="flex items-center justify-between border-t border-[#D4D4D8] pt-6">
          {chapterData.prevChapterId ? (
            <Link href={`/chapter/${chapterData.prevChapterId}`} className="flex items-center gap-2 text-[#52525B] hover:text-[#1C1C1C] transition-colors font-sans text-sm p-2 -ml-2">
              <ArrowLeft className="w-4 h-4" /> 上一章
            </Link>
          ) : (
            <div className="w-20"></div> // 占位
          )}
          
          <Link href="/" className="text-[#52525B] hover:text-[#1C1C1C] transition-colors font-serif text-sm tracking-widest border border-[#D4D4D8] hover:border-[#1C1C1C] px-6 py-2 rounded-sm bg-white/50">
            合卷
          </Link>

          {chapterData.nextChapterId ? (
            <Link href={`/chapter/${chapterData.nextChapterId}`} className="flex items-center gap-2 text-[#52525B] hover:text-[#1C1C1C] transition-colors font-sans text-sm p-2 -mr-2">
              下一章 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          ) : (
            <div className="w-20"></div> // 占位
          )}
        </div>
      </div>
    </div>
  );
}