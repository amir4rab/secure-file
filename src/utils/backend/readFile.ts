import fs from 'fs';
import path from 'path';

const readFile = async ( fileAndPath: string ) => {
  const contentPath = path.normalize( process.cwd() + fileAndPath );

  const file = fs.readFileSync(contentPath, 'utf-8');
  return file
}

export default readFile;