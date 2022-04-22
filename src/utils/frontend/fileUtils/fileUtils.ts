import { File as ExtractedFile, FileData, FileHead as ExtractedFileHead, EncryptedFile } from '@/types/file';

// Removes the extra decimals from the end of file sizes
// eg: 1015.254 => 1015.25
const simplifyFileSize = ( size: number ) => {
  const fixedSize = size.toFixed(2)

  if ( fixedSize.endsWith('.00') ){
    return fixedSize.slice(0, fixedSize.length - 3)
  }
  return fixedSize;
};

// Removes zeros from file sizes and replace them with the size name
// eg: 1015.254 => 1 KB
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
};

// Extracts files format from it's name
// eg: test.mp3 => mp3
export const getFormat = ( filename: string ) => {
  const fileSlices = filename.split('.');
  return fileSlices[fileSlices.length -1];
};

// Converts Blob to Base64 string
const convertBlobToBase64 = ( blob: Blob ): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result as string);
  };
  reader.readAsDataURL(blob);
});

// Converts Base64 string to Blob
const convertBase64ToBuffer = ( base64: string ): Promise<ArrayBuffer> => new Promise( async (resolve, reject) => {
  const fetchedData = await fetch(base64);
  const blob = await fetchedData.blob();
  const buffer = await blob.arrayBuffer();
  resolve(buffer)
});

// Receives a string array and turn in into a Blob
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

// Read and slices file into chunks //
const fileSlicer = async ( blob: Blob, chunksSize: number = 128_000, headChunkLength: number | null = null ) => {
  const chunks = Math.ceil(blob.size / chunksSize);
  const slicedFile= [];
  for( let i = headChunkLength === null ? 0 : headChunkLength ; i < chunks; i++ ) {
    const slicedBase64 = await convertBlobToBase64(blob.slice(chunksSize * i, (( i + 1 ) * chunksSize)));
    slicedFile[i] = slicedBase64;
  }
  return slicedFile as FileData;
};

// Generates fileMetadata from File
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

// Reads file and slices it into chunks
export const fileReader = ( file: File ): Promise<ExtractedFile> => new Promise ( async (resolve) => {
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

//! Following methods will be used for encrypted files //

// Receives chunked  Encrypted file and turn it into a unified file
export const encryptedFileUnifier = ( data: FileData ): Promise<Blob> => new Promise ( async ( resolve, reject ) => {
  const textEncoder = new TextEncoder();
  try {
    const arrayBufferArray: ArrayBuffer[] = [];
    for( let i = 0; i < data.length; i++ ) {
      console.log(data[i])
      // const buffer = await convertBase64ToBuffer(data[i]) as ArrayBuffer;
      const buffer = textEncoder.encode(data[i])
      arrayBufferArray[i] = buffer;
    }
    const blob = new Blob( arrayBufferArray, { type: 'application/secure-file-encrypted' })
    resolve(blob);
  } catch(err) {
    console.error(`Error in fileUnifier`,err);
    reject()
  }
});

// Receives an Encrypted Blob and slices it into chunks
const encryptedFileSlicer = async ( blob: Blob, chunksSize: number = 227_652, headChunkLength = 0 ) => {
  const chunks = Math.ceil( headChunkLength === null ? blob.size / chunksSize : ( blob.size - headChunkLength ) / chunksSize );
  const slicedFile= [];

  for( let i = 0 ; i < chunks; i++ ) {
    const slicedBase64 = await blob.slice(chunksSize * i + headChunkLength , (( i + 1 ) * chunksSize + headChunkLength)).text();
    slicedFile[i] = slicedBase64;
  }
  return slicedFile as FileData;
};

// Reads Encrypted file and slices it into chunks
export const encryptedFileReader = ( file: File ): Promise<EncryptedFile> => new Promise ( async (resolve) => {
  const reader = new FileReader();
  reader.onload = async _ => {
    if ( !( reader.result instanceof ArrayBuffer ) ) return;
    const blob = new Blob([ reader?.result ], { type: file.type! });

    const slicedFile = await encryptedFileSlicer(blob, 227_652, 32_000);

    const headBaseBlob = blob.slice(0, 32_000)
    const headBase64 = await headBaseBlob.text();

    resolve({
      data: slicedFile,
      head: generateFileMetaData( file, reader.result.byteLength - 32_000, slicedFile.length ),
      headBase64: headBase64
    });
  };
  reader.readAsArrayBuffer(file);
})