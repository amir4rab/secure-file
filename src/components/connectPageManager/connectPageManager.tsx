import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LoadingOverlay } from '@mantine/core';

// components //
import ConnectDataDisplayer from '@/components/connect-components/connectInfoDisplayer'
import ConnectConnected from '@/components//connect-page/connectConnected';

// utils //
import { v4 as Uuid } from 'uuid';
import { CorrectResponse as initialProps } from '@/utils/frontend/extractDataPageQueries';
import { verifyMessageSchema, updateSendFileArray, updateReceiveFileArray } from './utils';

// hooks //
import useFileTransfererConnect from '@/hooks/useFileTransfererConnect';
import useInit from '@/hooks/useInit';
import useConnect from '@/hooks/useConnect';

// types //
import { SendArray, ReceiveArray, Message, ReceiveFile, SendFile } from '@/types/connect';
import type { FileHead as Head } from '@/hooks/useFileTransfererConnect';


// providers //
import ConnectContext, { ConnectContextValues } from '@/providers/connectContext';
import ConnectPageManagerDisconnected from './connectPageManager-disconnected';
import useAfterTime from '@/hooks/useAfterTime';

interface Props extends initialProps {
  connectNode: string;
}
function ConnectPageManager({ id: peerInitialId, initializer, secret: peerInitialSecret, connectNode }: Props ) {
  const [ sendArray, setSendArray ] = useState< SendArray >([]);
  const [ receiveArray, setReceiveArray ] = useState< ReceiveArray >([]);
  const [ currentMessage, setCurrentMessage ] = useState< string | null >( null );
  const [ connTimeout, setConnTimeout ] = useState< boolean >(false);

  useAfterTime(() => {
    setConnTimeout(true);
  }, 5000 )

  const hiddenDownloadLink = useRef< HTMLAnchorElement >(null);
  const firstSecInit = useRef(true);

  const connect = useConnect(connectNode);
  const connectFileTransfer = useFileTransfererConnect(connectNode);

  const onTransitionCompleteNotice = ( uuid: string ) => updateSendFileArray(setSendArray, uuid, 'sended');

  const onMessage = useCallback( async ( message: string ) => {
    if ( connectFileTransfer.isConnected || connectFileTransfer.isTransferring ) return;

    const messageObj = await verifyMessageSchema(message);

    if ( messageObj === null ) {
      console.error('False message');
      return;
    };
    const { event, data } = messageObj;

    switch( event ) {
      case 'sendFile': {
        setReceiveArray(currentItems => ([
          ...currentItems,
          {
            ...data,
            state: 'requested'
          }
        ]));
        break;
      }
      case 'cancelFile': {
        setReceiveArray(currentItems => currentItems.filter(item => item.uuid !== data.uuid));
        break;
      }
      case 'requestFile': {
        const { id, secret, uuid } = data;
        const fileObj = sendArray.find(item => item.uuid === uuid);

        if( typeof fileObj === 'undefined' ) {
          console.log(`Couldn't found the file with uuid:${uuid}`);
          return;
        }

        updateSendFileArray(setSendArray, uuid, 'sending');

        connectFileTransfer.connectTo(id, secret, fileObj.file, uuid, onTransitionCompleteNotice);
      }
    }
  }, [ sendArray, connectFileTransfer ]);

  const sendFile: ConnectContextValues['sendFile'] = async ( file ) => {
    if ( connectFileTransfer.isTransferring || connectFileTransfer.isConnected ) return;

    const uuid = Uuid();
    setSendArray(currentValues => ([
      ...currentValues,
      {
        name: file.name,
        size: file.size,
        uuid: uuid,
        file,
        state: 'requested'
      }
    ]));

    try {
      const message: Message = {
        event: 'sendFile',
        data: {
          name: file.name,
          size: file.size,
          uuid: uuid,
        }
      };
      await connect.sendMessage(
        JSON.stringify(message)
      );
    } catch( err ) {
      console.error( 'SendFile: Failed to sendFile to peer', err );
      setSendArray(currentValues => currentValues.filter(file => file.uuid !== uuid));
    }
  }

  const onTransactionCompleteHandler = ( blob: Blob, head: Head ) => { //* this function will get called on transaction completation
    if ( hiddenDownloadLink.current === null ) return;

    // Creating Url
    const url = URL.createObjectURL(blob);

    // Anchor element setup
    hiddenDownloadLink.current.download = head.name;
    hiddenDownloadLink.current.href = url;
    hiddenDownloadLink.current.click();

    // Cleanup
    URL.revokeObjectURL(url);
    hiddenDownloadLink.current.download = '';
    hiddenDownloadLink.current.href = '';


    // Updating files ui
    setReceiveArray( currentValues => currentValues.map(file => {
      if ( file.uuid !== head.uuid ) return file;
      const newFileObj: ReceiveFile = {
        ...file,
        state: 'sended',
      }
      return newFileObj;
    }));
  }

  const fileEvent: ConnectContextValues['fileEvent'] = async ( uuid, event ) => {
    if ( connectFileTransfer.isTransferring || connectFileTransfer.isConnected ) return;

    if( event === 'cancel' ) {
      try {

        // sending message to peer
        const message: Message = {
          event: 'cancelFile',
          data: {
            uuid
          }
        };
        await connect.sendMessage(
          JSON.stringify(message)
        );
        // updating files ui
        setSendArray(currentValues => currentValues.filter(file => file.uuid !== uuid));
      } catch( err ) {
        console.error( 'fileEvent: Failed to send cancelFile to peer', err );
      }
    } else if ('request') {
      try {
        // generating new Connection
        const { id, secret } = await connectFileTransfer.startConn(onTransactionCompleteHandler);

        // sending message to peer
        const message: Message = {
          event: 'requestFile',
          data: {
            uuid,
            id,
            secret
          }
        };
        await connect.sendMessage(
          JSON.stringify(message)
        );

        // updating files ui
        updateReceiveFileArray(setReceiveArray, uuid, 'sending');

      } catch( err ) {
        console.error( 'fileEvent: Failed to send cancelFile to peer', err );
      }
    };
  }

  // const onRequest = useCallback( async ( uuid: string, secret: string, id: string ) => {
  //   if ( connectFileTransfer.isTransferring || connectFileTransfer.isConnected ) return;

  //   const fileObj = sendArray.find(item => item.uuid === uuid);

  //   if ( typeof fileObj !== 'undefined' ) {
  //     const { file } = fileObj;
  //     connectFileTransfer.connectTo(id, secret, file, uuid);
  //   }
  // }, [ connectFileTransfer, sendArray ]);

  useInit(() => { //* Will be executed on the first render
    connect.init(setCurrentMessage);
  });

  useEffect(() => { //* Will be executed after connection if user is the initializer
    if ( initializer || !connect.isConnectedToServer || !firstSecInit.current ) return;

    connect.connectTo(peerInitialId as string, peerInitialSecret as string);

    firstSecInit.current = false;
  });

  useEffect(() => { //* Will be called on every message
    if ( currentMessage === null ) return;

    onMessage(currentMessage);

    setCurrentMessage(null);
  }, [ currentMessage, onMessage ])

  const contextProviderValues: ConnectContextValues = {
    sendArray,
    receiveArray,
    sendFile,
    fileEvent,
    hash: connect.hash,
    isBusy: connectFileTransfer.isConnected || connectFileTransfer.isTransferring
  }

  if ( !connect.isConnectedToServer ) return (
    <LoadingOverlay visible={ true } />
  );

  if ( connect.isDisconnected ) return (
    <ConnectPageManagerDisconnected  disconnected/>
  )


  if ( initializer && !connect.isConnectedToPeer ) return (
    <ConnectDataDisplayer 
      id={ connect.selfConnDetails !== null ? connect.selfConnDetails.id : '' } 
      secret={ connect.selfConnDetails !== null ? connect.selfConnDetails.secret : '' } 
    />
  );


  return (
    <div>
      {
        connect.isConnectedToPeer ?
          <ConnectContext.Provider value={ contextProviderValues }>
            <ConnectConnected 
              sendArray={ sendArray } 
              receiveArray={ receiveArray }
              currentPercent={ connectFileTransfer.currentPercent }
              isTransferring={ connectFileTransfer.isTransferring }
            /> 
          </ConnectContext.Provider>  :
          connTimeout ? <ConnectPageManagerDisconnected /> : <LoadingOverlay visible={ true } />
      }
      <a hidden ref={ hiddenDownloadLink } />
    </div>
  )
}

export default ConnectPageManager