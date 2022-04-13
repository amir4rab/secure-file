import React, { useCallback, useEffect, useState } from 'react'

function useStorageQuota() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ quota, setQuota ] = useState(0);
  const [ usage, setUsage ] = useState(0);

  const calc = useCallback( async () => {
    if ( navigator.storage && navigator.storage.estimate ) {
      const estimate = await navigator.storage.estimate();
      setQuota(estimate.quota!);
      setUsage(estimate.usage!);
      setIsLoading(false);
  
      return estimate;
    } else {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    if ( typeof window !== 'undefined' ) calc();
  })

  return ({
    isLoading,
    quota,
    usage,
    reCalc: calc
  })
}

export default useStorageQuota