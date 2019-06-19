import { WS_SUBSCRIPTIONS } from './websocket.constants';

export interface IWebsocketState {
  connected: boolean;
  authenticated: boolean;
  subscriptions: {
    [key: string]: boolean
  }
}

export interface IAuthenticationResponse {
  success: boolean;
}

export interface ISubscriptionResponse {
  success: boolean;
  message?: string;
}

export interface IWebsocketException {
  status: string,
  message: string,
}

export interface DWsNewSubscriptionEvent<T> {
    subscription: WS_SUBSCRIPTIONS;
    payload: T;
}
