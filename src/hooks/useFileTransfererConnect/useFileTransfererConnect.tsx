import React, { createContext, useState, useCallback, useRef, useContext, useEffect } from 'react'

import useConnect from '@/hooks/useConnect';
import { fileReader, fileUnifier } from '@/utils/frontend/fileUtils'

export type FileHead = {
  name: string,
  mimeType: string,
  chunks: number,
  size: number,
  uuid: string,
}

export type OnCompleteHandler = ( file: Blob, head: FileHead ) => void;
export type OnCompleteNotice = ( uuid: string ) => void;

type ReqMessage =  { type: 'req', value: number };
type DataMessage =  { type: 'data', value: string | FileHead };
type MessageType = ReqMessage | DataMessage;
const verifyMessageSchema = ( messageObj: MessageType ) => {
  const keys = Object.keys(messageObj);

  // verifying keys //
  if ( keys.length > 2 ) return null;
  if ( !keys.includes('type') || !keys.includes('value') ) return null;

  // verifying finding type //
  if ( messageObj?.type === 'req' && typeof messageObj?.value === 'number' ) return messageObj as ReqMessage;
  if ( 
    messageObj?.type === 'data' &&
    ( typeof messageObj?.value === 'string' || typeof messageObj?.value === 'object' ) 
  ) return messageObj as DataMessage;

  return null;
};

const progressMeterCalc = ( chunks: number, currentChunk: number ): number => {
  const currentPercent = currentChunk * 100 / chunks;
  return Math.round(currentPercent);
}

interface ContextValues {
  isConnected: boolean,
  isTransferring: boolean,
  currentPercent: number,
  connectTo: ( id: string, secret: string, file: File, uuid: string, onCompleteNotice: OnCompleteNotice ) => void;
  startConn: ( onCompleteHandler: OnCompleteHandler ) => Promise<{ id: string, secret: string }>;
}
const useFileTransfererConnect = ( webRtcNodeHref: string ) => {
  const connect = useConnect(webRtcNodeHref);

  const [ fileDataArr, setFileDataArr ] = useState< string[] | null >(null);
  const [ fileHead, setFileHead ] = useState< FileHead | null >(null);
  const [ currentChunk, setCurrentChunk ] = useState< number >(-1);
  
  const [ currentMessage, setCurrentMessage ] = useState< string | null >(null); 

  const [ isConnected, setIsConnected ] = useState<ContextValues['isConnected']>(false);
  const [ isTransferring, setIsTransferring ] = useState<ContextValues['isTransferring']>(false);
  const [ currentPercent, setCurrentPercent ] = useState<ContextValues['currentPercent']>(0);

  const onCompleteHandlerRef = useRef< OnCompleteHandler | null >(null)
  const onCompleteNoticeRef = useRef< OnCompleteNotice | null >(null)

  //* Resets everything and make hook ready for another connection *//
  const resetConnection = useCallback(async () => {
    console.debug('Closing file transfer connection!')

    await connect.reset();

    setFileDataArr(null);
    setFileHead(null);
    setCurrentChunk(-1);
    setCurrentMessage(null);
    setIsConnected(false);
    setIsTransferring(false);
    setCurrentPercent(0);
    onCompleteHandlerRef.current = null;
    onCompleteNoticeRef.current = null;
  }, [ connect ]);

  //* Handles incoming messages *//
  const messageHandler = useCallback( async ( message: string ) => {
    const messageObj = await JSON.parse(message);
    const messageVerifiedObj = verifyMessageSchema(messageObj as MessageType);
    
    if ( messageVerifiedObj === null ) return;
    const { type, value } = messageVerifiedObj;

    if ( type === 'req' ) { // if responding to a request
      if ( fileDataArr === null ) {
        console.error(`fileDataArr is undefined!`);
        return;
      }
      
      let messageObj: DataMessage = { value: '', type: 'data'  };
      if ( value === -2 ) {
        console.log('Sending completed!');
        onCompleteNoticeRef.current && onCompleteNoticeRef.current(fileHead?.uuid!);
        resetConnection();
        return;
      } else if ( value === -1 ) {
        setIsTransferring(true);
        setIsConnected(true);

        messageObj = {
          value: fileHead!,
          type: 'data'
        }
      } else {
        messageObj = {
          value: fileDataArr[value]!,
          type: 'data'
        }
      }

      if ( value >= 1 && fileHead !== null ) setCurrentPercent(progressMeterCalc(fileHead.chunks, value));
      const message = JSON.stringify(messageObj);
      await connect.sendMessage(message);
      
    } else { // if received a file and sending a new request in case that file is still not completely transferred //
      
      let transactionIsCompleted = false;
      if ( typeof value === 'object' ) {
        setFileHead(value);
        setIsTransferring(true);
      } else  {
        const currentDataArray = fileDataArr !== null ? [
          ...fileDataArr,
          value
        ] : [ value ];


        // Checks if the current chunk is the last chunk of file, in that case do's the following   //
        // Will break the loop of requesting files                                                  //
        if ( currentChunk === fileHead?.chunks  ) {
          const file = await fileUnifier({ 
            data: currentDataArray!, 
            head: {
              name: fileHead.name,
              size: fileHead.size,
              chunks: fileHead.chunks,
              format: fileHead.mimeType,
              type: fileHead.mimeType,
              addedDate: 0,
            } 
          });
  
          onCompleteHandlerRef.current && onCompleteHandlerRef.current(file, fileHead);
          transactionIsCompleted = true;
        } else {
          setFileDataArr(currentDataArray);
        }
      };

      if ( currentChunk >= 1 && fileHead !== null ) setCurrentPercent(progressMeterCalc(fileHead.chunks, currentChunk));
      if ( !transactionIsCompleted ) { // sending request for next data chunk

        const nextChunk = currentChunk + 1;
        const messageObj: ReqMessage = { value: currentChunk, type: 'req'  };
        setCurrentChunk(nextChunk);
  
        const message = JSON.stringify(messageObj);
        await connect.sendMessage(message);

      } else { // sending request to inform other peer about end of transaction 

        const messageObj: ReqMessage = { value: -2, type: 'req'  };
        const message = JSON.stringify(messageObj);
        await connect.sendMessage(message);
  
        await resetConnection();

      }
    }
  }, [ connect, currentChunk, fileDataArr, fileHead, resetConnection ]);

  //* Will get called on each message *//
  useEffect(() => {
    if ( currentMessage === null ) return;

    messageHandler(currentMessage)

    setCurrentMessage(null)
  }, [ currentMessage, messageHandler ]);

  //* Starts a connection and connects to peers to each other *//
  const connectTo: ContextValues['connectTo'] = async ( id, secret, file, uuid, onCompleteNotice )  => {
    try {
      setIsConnected(true)

      const { data, head } = await fileReader(file);
  
      const fileHead = {
        name: head.name,
        chunks: head.chunks,
        mimeType: head.type,
        size: head.size,
        uuid: uuid
      }
  
      onCompleteNoticeRef.current = onCompleteNotice;
  
      setFileDataArr( data );
      setFileHead( fileHead );
      
      await connect.init( setCurrentMessage );
      await connect.connectTo(
        id, 
        secret, 
        () => {
          const message = JSON.stringify({ value: fileHead, type: 'data' } as DataMessage);
          connect.sendMessage(message);
        }
      );
    } catch(err) {
      console.error(`useFileTransferConnect[connectTo]: Something went wrong when connecting to peer!`, err);
      setIsConnected(false);
      await resetConnection();
    }
  }
  
  //* Starts a connection *//
  const startConn: ContextValues['startConn'] = async ( onCompleteHandler: OnCompleteHandler ) => {
    const { id, secret } = await connect.init( setCurrentMessage );
    setIsConnected(true)
    onCompleteHandlerRef.current = onCompleteHandler;

    return ({
      id,
      secret
    })
  }

  return ({
    isConnected,
    isTransferring,
    currentPercent,
    connectTo,
    startConn
  });
}

export default useFileTransfererConnect