import { FileData, FileHead } from './file';

export interface EncryptedFileHead extends FileHead {
  route: string
  wrappedKey: string,
} 

export type EncryptedFile = {
  head: EncryptedFileHead,
  data: FileData
}