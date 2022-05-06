const strToArray = ( input: string, sliceSize= 8 ) => {
  const array: string[] = [];
  for( let i = 0; i < input.length; i = i + sliceSize ) {
    array.push(input.slice(i, i + sliceSize));
  };
  return array;
}

export default strToArray;