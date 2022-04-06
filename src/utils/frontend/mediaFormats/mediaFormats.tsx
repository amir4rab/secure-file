export const videoFormats = [
  'mp4', 'webm', 'ogg', '3gp', 'quicktime', 'mpeg'
];
export const audioFormats = [
  'mp3', 'flac'
];
export const imageFormats = [
  'jpg', 'png', 'svg'
];
export const documentFormats = [
  'pdf'
]

export const getFamilyFormat = ( input: string ) => {
  if ( videoFormats.includes(input) ) return 'video';
  if ( audioFormats.includes(input) ) return 'audio';
  if ( imageFormats.includes(input) ) return 'image';
  if ( documentFormats.includes(input) ) return 'document';
  return 'unsupported';
}

export const isMediaOpenable = ( input: string ) => {
  if ( videoFormats.includes(input) ) return true;
  if ( audioFormats.includes(input) ) return true;
  if ( imageFormats.includes(input) ) return true;
  if ( documentFormats.includes(input) ) return true;
  return false;
}

const defaultExport = {
  videoFormats,
  audioFormats,
  imageFormats,
  documentFormats,
  getFamilyFormat,
  isMediaOpenable
}

export default defaultExport;