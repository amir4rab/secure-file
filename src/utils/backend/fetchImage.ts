// import path from 'path';

const fetchImage = ( fileAndPath: string ) => {
  const image = require( fileAndPath );
  
  return image.default.src
}

export default fetchImage;