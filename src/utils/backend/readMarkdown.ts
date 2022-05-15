// import path from 'path';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const readMarkdown = async (fileAndPath: string) => {
  const filePath = path.normalize( process.cwd() + '/markdown/' + fileAndPath )

  const file = fs.readFileSync(filePath, 'utf-8');
  const markdown = marked.parse(file);
  return markdown
}

export default readMarkdown;