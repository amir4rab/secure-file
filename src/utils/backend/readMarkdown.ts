// import path from 'path';
import fs from 'fs';
import { marked } from 'marked';

const readMarkdown = async (fileAndPath: string) => {
  const licensePath = process.cwd() + '/markdown/' + fileAndPath;
  const file = fs.readFileSync(licensePath, 'utf-8');
  const markdown = marked.parse(file);
  return markdown
}

export default readMarkdown;