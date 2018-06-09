import { IWsEvent } from './websocket.interface';
import { Equals, IsNotEmpty, IsString } from 'class-validator';
import { WS_EVENT_AUTHENTICATION } from './websocket.constants';

export class VWebsocketAuthentication implements IWsEvent {

  @Equals(WS_EVENT_AUTHENTICATION)
  event: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
