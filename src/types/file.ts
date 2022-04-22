export type FileHead = {
  name: string,
  size: number,
  chunks: number,
  format: string,
  type: string,
  addedDate: number,
};

export type FileData = string[];

export interface File {
  head: FileHead
  data: FileData;
}

export interface EncryptedFile extends File  {
  headBase64: string;
}

export default File;