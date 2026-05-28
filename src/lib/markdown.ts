import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const chaptersDirectory = path.join(process.cwd(), 'src/content/chapters');

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

export function getSortedChaptersData(): ChapterData[] {
  if (!fs.existsSync(chaptersDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(chaptersDirectory);
  const allChaptersData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(chaptersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as { title: string; date: string; excerpt: string }),
      };
    });

  return allChaptersData.sort((a: ChapterData, b: ChapterData) => {
    // 强制按照时间正序排列（最老的章节在最前面，即第一章在最上面）
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });
}

export async function getChapterData(id: string): Promise<ChapterData> {
  const fullPath = path.join(chaptersDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const rawContent = matterResult.content;
  
  // 按照标记拆分不同文风的内容
  const colloquialMatch = rawContent.match(/### colloquial([\s\S]*?)(?=### classical|$)/i);
  const classicalMatch = rawContent.match(/### classical([\s\S]*?)(?=### colloquial|$)/i);

  const colloquialText = colloquialMatch ? colloquialMatch[1] : rawContent;
  const classicalText = classicalMatch ? classicalMatch[1] : '暂无文言文版本。';

  const processedColloquial = await remark().use(html).process(colloquialText);
  const processedClassical = await remark().use(html).process(classicalText);

  // 获取所有章节，以便计算上一章/下一章
  // 现在 getSortedChaptersData 是按照时间正序排列的（第一章在 index 0）
  const allChapters = getSortedChaptersData();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === id);
  
  // 按照阅读顺序（时间正序）：
  // "上一章" 是当前 index - 1
  // "下一章" 是当前 index + 1
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1].id : null;
  const nextChapter = currentIndex !== -1 && currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1].id : null;

  return {
    id,
    contentHtmlColloquial: processedColloquial.toString(),
    contentHtmlClassical: processedClassical.toString(),
    prevChapterId: prevChapter,
    nextChapterId: nextChapter,
    ...(matterResult.data as { title: string; date: string; excerpt: string }),
  };
}
