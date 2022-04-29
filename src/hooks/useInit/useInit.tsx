import { useEffect, useRef } from "react";

const useInit = ( event: Function, ssr = true ) => {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if ( !ssr && typeof window === 'undefined' ) return;
    if ( firstRenderRef.current ) { 
      event();
      firstRenderRef.current = false;
    };
  }, [ event, ssr ]);

  return null
}

export default useInit;
