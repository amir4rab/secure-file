import React, { useRef } from 'react'

const useTimeout = () => {
  const timeoutRef = useRef< NodeJS.Timeout | null >(null);

  const reset = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }

  const setTimeoutFn = ( fn: Function, timeout: number  ) => {
    if ( timeoutRef.current !== null ) reset()

    timeoutRef.current = setTimeout(() => {
      fn();
    }, timeout)
  }

  return ({
    set: setTimeoutFn
  })
}

export default useTimeout