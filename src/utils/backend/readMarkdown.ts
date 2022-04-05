// import path from 'path';
import fs from 'fs';
import { marked } from 'marked';

const readMarkdown = async (fileAndPath: string) => {
  const path = process.cwd() + '/markdown/' + fileAndPath;
  const file = fs.readFileSync(path, 'utf-8');
  const markdown = marked.parse(file);
  return markdown
}

export default readMarkdown;