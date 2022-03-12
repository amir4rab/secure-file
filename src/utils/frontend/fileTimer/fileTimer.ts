const checkDigits = ( input: number ) => {
  if ( input.toString().length < 2 ) {
    return `0${input}`;
  }
  return input
}

// only exported for testing reasons //
export const timeConvertor = ( input: number ) => {
  if ( input < ( 59 )) {
    const seconds = checkDigits(+((input).toString().split('.')[0]))

    return `00:00:${seconds}`;
  }
  if ( input < ( 3600 + 59 )) {
    const minutes = checkDigits(+((input/60).toString().split('.')[0]));
    const seconds = checkDigits(+((input%60).toString().split('.')[0]));

    return `00:${minutes}:${seconds}`
  }
  const hours = checkDigits(+((input/3600).toString().split('.')[0]));

  const remainFromHours = input%3600;

  const minutes = checkDigits(+((remainFromHours/60).toString().split('.')[0]));
  const seconds = checkDigits(+((remainFromHours%60).toString().split('.')[0]));

  return `${hours}:${minutes}:${seconds}`;
}

const fileTimer = ( currentTime: number, timeLength: number ) => {
  const convertCurrentTime = timeConvertor(currentTime);
  const convertTimeLength = timeConvertor(timeLength);

  if ( convertTimeLength.startsWith('00') ) { // shortening time for les than an hour time lines
    const shortenConvertCurrentTime = convertCurrentTime.slice(3);
    const shortenConvertTimeLength = convertTimeLength.slice(3);
    return `${shortenConvertCurrentTime} / ${shortenConvertTimeLength}`
  }
  return `${convertCurrentTime} / ${convertTimeLength}`
}

export default fileTimer;