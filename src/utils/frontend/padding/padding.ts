export const addPadding = ( text: string, lengthAfterPadding= 16_000, paddingChar= '=' ) => {
  return text.padStart( lengthAfterPadding, paddingChar );
}

export const removePadding = ( textWithPadding: string, paddingChar= '=' ) => {
  const paddingCharTimeFour = paddingChar + paddingChar + paddingChar + paddingChar;
  return textWithPadding.slice(textWithPadding.lastIndexOf(paddingCharTimeFour) + 4);
}