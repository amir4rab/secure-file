import fs from 'fs';

const readFile = async ( fileAndPath: string ) => {
  const contentPath = process.cwd() + fileAndPath;
  console.log(contentPath)
  const file = fs.readFileSync(contentPath, 'utf-8');
  return file
}

export default readFile;