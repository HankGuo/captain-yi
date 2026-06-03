const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, '../src/content/chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let schema = `
DROP TABLE IF EXISTS chapters;
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content_colloquial TEXT NOT NULL,
  content_classical TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

let seed = ``;

files.forEach(file => {
  const id = file.replace('.md', '');
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const parsed = matter(content);

  const title = parsed.data.title.replace(/'/g, "''");
  const date = parsed.data.date;
  const excerpt = parsed.data.excerpt.replace(/'/g, "''");

  const raw = parsed.content;
  const colloquialMatch = raw.match(/### colloquial([\s\S]*?)(?=### classical|$)/i);
  const classicalMatch = raw.match(/### classical([\s\S]*?)(?=### colloquial|$)/i);

  const col = colloquialMatch ? colloquialMatch[1].trim().replace(/'/g, "''") : '';
  const cla = classicalMatch ? classicalMatch[1].trim().replace(/'/g, "''") : '';

  seed += `INSERT INTO chapters (id, title, date, excerpt, content_colloquial, content_classical) VALUES ('${id}', '${title}', '${date}', '${excerpt}', '${col}', '${cla}');\n`;
});

fs.writeFileSync(path.join(__dirname, 'schema.sql'), schema);
fs.writeFileSync(path.join(__dirname, 'seed.sql'), seed);

console.log('SQL generated successfully.');