import { FileHead } from './file'
import { EncryptedFileHead } from "@/types/encryptedFile";

interface File extends FileHead {
  id: string
}

export type FilesArray = File[];

export interface StoredFile extends FileHead {
  id: string,
  type: 'file'
}
export interface Folder { name: string, id: string, type: 'folder' };
export type FolderItem = StoredFile | Folder;
export type FolderArray = FolderItem[];


export type InteractionEvent = ( id: string ) => Promise<boolean>;
export type FileEvent = ( id: string, event: 'open' | 'extract' | 'delete' ) => Promise<{ result:string | null, operation: boolean, fileHead: null | EncryptedFileHead }>;
export type IsLoading = boolean
export type CurrentRout = { name:string, uuid: string }[];