import { RefObject, useState } from "react";

const useFullscreen = ( elementRef: RefObject< null | HTMLElement > ) => {
  const [ isFullscreen, setIsFullscreen ] = useState(false);

  const toggle = async () => {
    if ( elementRef.current == null ) return;

    try {
      if (!isFullscreen) {
        await elementRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
      return true;
    } catch( err ) { 
      console.error(err);
      return false
    };
  }

  return ({
    toggle,
    isFullscreen
  })
};

export default useFullscreen;