import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

// mantine components
import { LoadingOverlay } from '@mantine/core';

// components
import ConnectPageManager from '@/components/connectPageManager';
import ConnectFalseQueries from '@/components/connect-components/connectFalseQueries';

// utils
import extractDataPageQueries, { ExtractQueryResponse as Queries } from '@/utils/frontend/extractDataPageQueries';

//*
//* This components wraps connectManager
//* component and only this plays it if
//* valid page queries are available.
//*
function ConnectDataWrapper() {
  const isRendered = useRef(false);
  const [ queries, setQueries ] = useState< Queries | null >( null );
  const [ connectNode, setConnectNode ] = useState< string | null >(null);
  const router = useRouter();
  
  useEffect(() => {
    if( isRendered.current || typeof window === 'undefined' || !router.isReady ) return;

    const connectNode = window.localStorage.getItem('connectNode');
    if ( connectNode !== null ) setConnectNode(connectNode);

    const queries = extractDataPageQueries(router.query);
    setQueries(queries);

    isRendered.current = true;
  }, [ router ])

  return (
    <>
      <LoadingOverlay visible={ !isRendered.current } />
      {
        !isRendered.current ? null :
        queries?.error === null && connectNode !== null ?
          <ConnectPageManager connectNode={ connectNode } { ...queries }/> : // get displayed if queries are okay
          <ConnectFalseQueries errorCode={ connectNode === null ? 'noNode' : 'falseQueries' } /> // get displayed if queries are false
      }
    </>
  )
}

export default ConnectDataWrapper