import { Socket } from 'socket.io';

export interface IWsEvent {
  event: string;
}

export interface ISocket extends Socket {
  characterId: number;
}