import { IWsEvent } from './websocket.interface';
import { Equals, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { WS_EVENT_AUTHENTICATION, WS_SUBSCRIPTIONS_EVENTS } from './websocket.constants';

export class VWebsocketAuthentication implements IWsEvent {

  @Equals(WS_EVENT_AUTHENTICATION)
  event: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class VWebsocketSubscription implements IWsEvent {

  @IsEnum(WS_SUBSCRIPTIONS_EVENTS)
  event: WS_SUBSCRIPTIONS_EVENTS;

  @IsString()
  @IsOptional()
  key?: string;
}
