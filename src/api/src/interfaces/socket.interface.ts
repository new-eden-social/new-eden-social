import { Character } from '../modules/character/character.entity';
import { Socket } from 'socket.io';

export interface ISocket extends Socket {
  character: Character;
}
