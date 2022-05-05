import { createContext, useContext } from 'react'

// types //
import { SendArray, ReceiveArray } from '@/types/connect';

export type SendFile = ( file: File ) => Promise<void>;
export type FileEvent = ( uuid: string, operation: 'cancel' | 'request' ) => Promise<void>;

export interface ConnectContextValues {
  sendArray: SendArray;
  receiveArray: ReceiveArray;
  sendFile: SendFile;
  fileEvent: FileEvent;
}

const defaultValues = {
  sendArray: [],
  receiveArray: [],
  sendFile: async () => {},
  fileEvent: async () => {},
};

const ConnectContext = createContext< ConnectContextValues >(defaultValues)

export const useConnectContext = () => {
  const context = useContext(ConnectContext);

  return context;
}

export default ConnectContext