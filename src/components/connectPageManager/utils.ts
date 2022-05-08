import React from 'react';
import type { Message, ReceiveFile, SendFile } from '@/types/connect';

const getKeys = ( obj: object ) => Object.keys(obj);

export const verifyMessageSchema = async ( message: string ): Promise< Message | null > => {
  try {
    const messageObj = await JSON.parse(message)
  
    const keys = getKeys(messageObj);
  
    // verifying keys //
    if ( keys.length > 2 ) return null;
    if ( !keys.includes('event') || !keys.includes('data') ) return null;
    if ( typeof messageObj.data !== 'object' ) return null;
    if ( !messageObj.data.hasOwnProperty('uuid') && typeof !messageObj.data.uuid === 'string' ) return null;

    switch( messageObj.event ) {
      case 'cancelFile': {
        if ( getKeys(messageObj.data).length > 1 ) return null;

        return messageObj as Message;
      }
      case 'sendFile': {
        if ( !messageObj.data.hasOwnProperty('name') && typeof !messageObj.data.name === 'string' ) return null;
        if ( !messageObj.data.hasOwnProperty('size') && typeof !messageObj.data.size === 'number' ) return null;
        if ( getKeys(messageObj.data).length > 3 ) return null;

        return messageObj as Message;
      }
      case 'requestFile': {
        if ( !messageObj.data.hasOwnProperty('id') && typeof !messageObj.data.id === 'string' ) return null;
        if ( !messageObj.data.hasOwnProperty('secret') && typeof !messageObj.data.secret === 'string' ) return null;
        if ( getKeys(messageObj.data).length > 3 ) return null;
      
        return messageObj as Message;
      }
      default: {
        return null;
      }
    }
  } catch(err) {
    console.error('verifyMessageSchema: Error', err)
    return null;
  }

}

export const updateSendFileArray = ( setState: React.Dispatch<React.SetStateAction<SendFile[]>>, uuid: string, nextState: SendFile['state'] ) => {
  setState( currentArray => currentArray.map( item => {
    if ( item.uuid !== uuid ) return item;
    const newObj: SendFile = {
      ...item,
      state: nextState
    };
    return newObj;
  }))
}

export const updateReceiveFileArray = ( setState: React.Dispatch<React.SetStateAction<ReceiveFile[]>>, uuid: string, nextState: ReceiveFile['state'] ) => {
  setState( currentArray => currentArray.map( item => {
    if ( item.uuid !== uuid ) return item;
    const newObj: ReceiveFile = {
      ...item,
      state: nextState
    };
    return newObj;
  }))
}