export type FileHead = {
  name: string,
  size: number,
  chunks: number,
  format: string,
  type: string,
  addedDate: number,
};

export type FileData = string[];

export type File = {
  head: FileHead
  data: FileData;
}

export default File;