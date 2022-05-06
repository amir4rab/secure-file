import React, { useEffect, useRef } from 'react'
import useInit from '../useInit';

interface Props {
  cb: Function;
  timeout: number;
};
const useAfterTime = ( cb: Props['cb'], timeout: Props['timeout'] ) => {
  const timeoutRef = useRef< null | NodeJS.Timeout >(null);

  useInit(() => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      cb()
    }, timeout);
  });
}

export default useAfterTime