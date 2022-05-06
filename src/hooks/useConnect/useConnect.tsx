import { useRef, useEffect, useState, useCallback } from 'react';
import WebRtc from '@amir4rab/web-rtc-connector-client';
import { validate } from 'uuid'


type OnConnectEvent = ( id: string, secret: string ) => void;
type OnConnectToPeerEvent = ( id: string, secret: string ) => void;
type OnMessage = ( message: string ) => void

interface UseConnectInterface {
  isConnectedToPeer: boolean;
  isConnectedToServer: boolean;
  selfConnDetails: { id: string, secret: string } | null;
  sendMessage: ( message: string ) => Promise<void>;
  connectTo: ( id: string, secret: string, cb?: Function ) => Promise<boolean>;
  init: ( onMessage: OnMessage, onConnect?: OnConnectEvent, onConnectToPeer?: OnConnectToPeerEvent ) => Promise<{ id: string, secret: string }>;
  reset: () => Promise<void>;
};

export const useConnect = () => {
  const webRtcRef = useRef< WebRtc | null >(null);

  const [ isConnectedToPeer, setIsConnectedToPeer ] = useState<UseConnectInterface['isConnectedToPeer']>(false);
  const [ isConnectedToServer, setIsConnectedToServer ] = useState<UseConnectInterface['isConnectedToServer']>(false);
  const [ connectionDetails, setConnectionDetails ] = useState<UseConnectInterface['selfConnDetails']>(null);
  const afterConnToPeerCb = useRef< Function | null >(null);

  const [ currentMessage, setCurrentMessage ] = useState< null | string >( null );
  const onMessageFunctionRef = useRef< null | OnMessage >(null);

  // const logEvents = useRef(false);

  const init: UseConnectInterface['init'] = async ( onMessage, onConnect?, onConnectToPeer? ) => 
    new Promise( async ( resolve ) => {
      webRtcRef.current = new WebRtc({
        serverUrl: 'localhost:5001',
        connectionEvent: () => {},
        onPeerConnection: () => {},
      });

      webRtcRef.current.on( 'onConnection', ({ id, secret }:{ id: string, secret: string }) => {
        setIsConnectedToServer(true);
        setConnectionDetails({ id, secret })
        resolve({ id, secret })
        onConnect && onConnect(id, secret)
      });
      
      webRtcRef.current.on( 'onDataChannel', () => {
        console.log('Connected')
        setIsConnectedToPeer(true);
        afterConnToPeerCb.current && afterConnToPeerCb.current();
      });
      
      // webRtcRef.current.on( 'onMessage', onMessage );
      onMessageFunctionRef.current = onMessage;
      webRtcRef.current.on( 'onMessage', ( message: string ) => setCurrentMessage(message) );
  });

  useEffect(() => {
    return () => {
      webRtcRef.current && webRtcRef.current.close();
    }
  }, []);

  useEffect(() => {
    if ( currentMessage !== null ) {
      onMessageFunctionRef.current && onMessageFunctionRef.current(currentMessage);
      setCurrentMessage(null);
    }
  }, [ currentMessage ])

  const sendMessage = async ( message: string ) => {
    await webRtcRef.current?.sendMessage(message)
  };
  
  const connectTo: UseConnectInterface['connectTo'] = async ( id, secret, cb? ) => {
    if ( secret.length !== 16 || !validate(id) ) return false;
    if ( typeof cb !== 'undefined' ) afterConnToPeerCb.current = cb;

    await webRtcRef.current?.dataConnection({ id, secret })

    return true;
  };

  const reset = async () => {
    // closing last connection
    webRtcRef.current && await webRtcRef.current.close();

    // resetting states
    setIsConnectedToPeer(false)
    setIsConnectedToServer(false)
    setConnectionDetails(null);
    setCurrentMessage(null)

    // resetting refs
    afterConnToPeerCb.current = null;
    webRtcRef.current = null;
    onMessageFunctionRef.current = null;
  }

  return ({
    isConnectedToPeer,
    isConnectedToServer,
    selfConnDetails: connectionDetails,
    sendMessage,
    connectTo,
    init,
    reset
  } as UseConnectInterface)
}

export default useConnect;