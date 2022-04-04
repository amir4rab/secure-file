// based on Mantine useMediaQuery Hook
// under MIT license
// code source: https://github.com/mantinedev/mantine/blob/master/src/mantine-hooks/src/use-media-query/use-media-query.ts
// for some risen using official hook generated some errors, error came from 'getInitialValue' function

import { useState, useEffect, useRef } from 'react';

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;
/**
  * Older versions of Safari (shipped withCatalina and before) do not support addEventListener on matchMedia
  * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
* */
const attachMediaListener = (query: MediaQueryList, callback: MediaQueryCallback) => {
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  const queryRef = useRef<MediaQueryList>();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ( typeof window === 'undefined' ) {
      setMatches(false);
      return;
    }
    if ('matchMedia' in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;