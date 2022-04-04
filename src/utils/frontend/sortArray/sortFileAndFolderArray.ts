import { FolderArray } from "@/types/useFileManager";
import { File } from '@/types/useFileManager';

interface Props {
  input: FolderArray;
  sortBy: 'default' | 'alphabet' | 'size';
}

const sortFileAndFolderArray = ( { input, sortBy }: Props ): FolderArray => {

  switch(sortBy) {
    case 'default': {
      return input;
    };

    case 'alphabet': {
      const sortedArray = input.sort( ( a, b ) => {
        if ( a.name > b.name ) return 1;
        if ( b.name > a.name ) return -1;
        return 0;
      })
      return sortedArray;
    };

    case 'size': {
      const foldersArray: FolderArray = []
      const filesArray = input.filter(item => {
        if ( item.type !== 'folder' ) {
          return item;
        } else {
          foldersArray.push(item)
        }
      });
      const sortedFilesArray = filesArray.sort((a, b) => {
        const aFile = a as File;
        const bFile = b as File;
        if ( aFile.size > bFile.size ) return 1;
        if ( bFile.size > aFile.size ) return -1;
        return 0;
      })
      const outputArray: FolderArray = [
        ...foldersArray,
        ...sortedFilesArray
      ]
      console.log(outputArray);
      return outputArray;
    }
  }
}

export default sortFileAndFolderArray;