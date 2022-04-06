import { File as ExtractedFile, FileData, FileHead as ExtractedFileHead } from '@/types/file';

const simplifyFileSize = ( size: number ) => {
  const fixedSize = size.toFixed(2)

  if ( fixedSize.endsWith('.00') ){
    return fixedSize.slice(0, fixedSize.length - 3)
  }
  return fixedSize;
}

export const readableSize = ( size: number ) => {
  if ( size > 1_000_000_000 ){
    return `${simplifyFileSize( size / 1_000_000_000 )} GB`
  }
  if ( size > 1_000_000 ){
    return `${simplifyFileSize( size / 1_000_000 )} MB`
  }
  if ( size > 1_000 ) {
    return `${simplifyFileSize( size / 1_000 )} KB`
  }
  return `${simplifyFileSize( size )} B`;
}

export const getFormat = ( filename: string ) => {
  const fileSlices = filename.split('.');
  return fileSlices[fileSlices.length -1];
}

const convertBlobToBase64 = ( blob: Blob ): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result as string);
  };
  reader.readAsDataURL(blob);
});

const convertBase64ToBuffer = ( base64: string ): Promise<ArrayBuffer> => new Promise( async (resolve, reject) => {
  const fetchedData = await fetch(base64);
  const blob = await fetchedData.blob();
  const buffer = await blob.arrayBuffer()
  resolve(buffer)
})


// read and slices file into chunks //
export const fileUnifier = ( file: ExtractedFile ): Promise<Blob> => new Promise ( async ( resolve, reject ) => {
  try {
    const { data, head } = file;
    const arrayBufferArray: ArrayBuffer[] = [];
    for( let i = 0; i < data.length; i++ ) {
      const buffer = await convertBase64ToBuffer(data[i]) as ArrayBuffer;
      arrayBufferArray[i] = buffer;
    }
    const blob = new Blob(arrayBufferArray, { type: head.type })
    resolve(blob);
  } catch(err) {
    console.error(`Error in fileUnifier`,err);
    reject()
  }
});

// read and slices file into chunks //
const fileSlicer = async ( blob: Blob, chunksSize: number = 128_000 ) => {
  const chunks = Math.ceil(blob.size / chunksSize);
  const slicedFile= [];
  for( let i= 0; i < chunks; i++ ) {
    const slicedBase64 = await convertBlobToBase64(blob.slice(chunksSize * i, (( i + 1 ) * chunksSize)));
    slicedFile[i] = slicedBase64;
  }
  return slicedFile as FileData;
};

const generateFileMetaData = ( file: File, size: number, chunks: number ): ExtractedFileHead => {
  const currentDate = new Date();
  return ({
    name: file.name,
    format: getFormat(file.name),
    size,
    chunks,
    type: file.type,
    addedDate: currentDate.valueOf()
  });
}

export const fileReader = ( file: File ): Promise<ExtractedFile> => new Promise ( async (resolve, reject) => {
  const reader = new FileReader();
  reader.onload = async _ => {
    if ( !( reader.result instanceof ArrayBuffer ) ) return;
    const blob = new Blob([ reader?.result ], { type: file.type! });
    const slicedFile = await fileSlicer(blob);

    resolve({
      data: slicedFile,
      head: generateFileMetaData( file, reader.result.byteLength, slicedFile.length )
    });
  };
  reader.readAsArrayBuffer(file);
})