import { getChapterData, getSortedChaptersData } from '@/lib/markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ChapterContent from './ChapterContent';

export async function generateStaticParams() {
  const chapters = getSortedChaptersData();
  return chapters.map((chapter) => ({
    id: chapter.id,
  }));
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapterData = await getChapterData(params.id);

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
          />
        </article>
      </main>
      
      {/* 底部导航 */}
      <div className="max-w-2xl mx-auto px-5 pb-12">
        <Link href="/" className="block w-full py-4 text-center text-[#52525B] hover:text-[#1C1C1C] border border-[#D4D4D8] hover:border-[#1C1C1C] rounded-sm transition-colors font-serif text-sm tracking-widest bg-white/50">
          合卷返回
        </Link>
      </div>
    </div>
  );
}