interface ConnectFile {
  name: string,
  size: number,
  uuid: string,
}

export interface SendFile extends ConnectFile {
  state: 'requested' | 'sending' | 'sended',
  file: File
}
export type SendArray = SendFile[];

export interface ReceiveFile extends ConnectFile {
  state: 'requested' | 'sending' | 'sended'
}
export type ReceiveArray = ReceiveFile[];

export type CancelFileMessage = { // event: 'cancelFile'
  uuid: string,
}
export type SendFileMessage = { // event: 'sendFile'
  uuid: string,
  name: string,
  size: number
}
export type RequestFileMessage = { // event: 'requestFile'
  uuid: string,
  id: string,
  secret: string
}
export type Message = 
  { event: 'cancelFile', data: CancelFileMessage } |
  { event: 'sendFile', data: SendFileMessage } |
  { event: 'requestFile', data: RequestFileMessage };