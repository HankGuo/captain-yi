import { getRequestContext } from '@cloudflare/next-on-pages';
import { remark } from 'remark';
import html from 'remark-html';

export interface ChapterData {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtmlColloquial?: string;
  contentHtmlClassical?: string;
  prevChapterId?: string | null;
  nextChapterId?: string | null;
}

export async function getSortedChaptersData(): Promise<ChapterData[]> {
  try {
    const db = getRequestContext().env.DB;
    const { results } = await db.prepare('SELECT id, title, date, excerpt FROM chapters ORDER BY date ASC').all<ChapterData>();
    return results;
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
    return [];
  }
}

export async function getChapterData(id: string): Promise<ChapterData | null> {
  try {
    const db = getRequestContext().env.DB;
    
    // Fetch current chapter
    const chapter = await db.prepare('SELECT * FROM chapters WHERE id = ?').bind(id).first<any>();
    
    if (!chapter) {
      return null;
    }

    const processedColloquial = await remark().use(html).process(chapter.content_colloquial || '');
    const processedClassical = await remark().use(html).process(chapter.content_classical || '暂无文言文版本。');

    // Fetch previous chapter
    const prevChapter = await db.prepare('SELECT id FROM chapters WHERE date < ? ORDER BY date DESC LIMIT 1').bind(chapter.date).first<{id: string}>();
    
    // Fetch next chapter
    const nextChapter = await db.prepare('SELECT id FROM chapters WHERE date > ? ORDER BY date ASC LIMIT 1').bind(chapter.date).first<{id: string}>();

    return {
      id: chapter.id,
      title: chapter.title,
      date: chapter.date,
      excerpt: chapter.excerpt,
      contentHtmlColloquial: processedColloquial.toString(),
      contentHtmlClassical: processedClassical.toString(),
      prevChapterId: prevChapter ? prevChapter.id : null,
      nextChapterId: nextChapter ? nextChapter.id : null,
    };
  } catch (error) {
    console.error('Failed to fetch chapter details:', error);
    return null;
  }
}
