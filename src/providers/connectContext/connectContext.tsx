import { createContext, useContext } from 'react'

// types //
import { SendArray, ReceiveArray } from '@/types/connect';

export type SendFile = ( file: File ) => Promise<void>;
export type FileEvent = ( uuid: string, operation: 'cancel' | 'request' ) => Promise<void>;

export interface ConnectContextValues {
  sendArray: SendArray;
  receiveArray: ReceiveArray;
  hash: string
  sendFile: SendFile;
  fileEvent: FileEvent;
  isBusy: boolean;
}

const defaultValues = {
  sendArray: [],
  receiveArray: [],
  hash: '',
  sendFile: async () => {},
  fileEvent: async () => {},
  isBusy: false,
};

const ConnectContext = createContext< ConnectContextValues >(defaultValues)

export const useConnectContext = () => {
  const context = useContext(ConnectContext);

  return context;
}

export default ConnectContext