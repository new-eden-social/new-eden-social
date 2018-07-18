import {
  WS_EVENT_AUTHENTICATION,
  WS_EVENT_SUBSCRIPTION,
  WS_SUBSCRIPTIONS,
  WS_NEW_SUBSCRIPTION_EVENT,
} from './websocket.constants';
import { WsResponse } from '@nestjs/websockets';

export class DWsAuthentication implements WsResponse<{ success: boolean }> {
  event = WS_EVENT_AUTHENTICATION;
  data: { success: boolean };

  constructor(success: boolean) {
    this.data = { success };
  }
}

export class DWsSubscription implements WsResponse<{ success: boolean, message?: string }> {
  event = WS_EVENT_SUBSCRIPTION;
  data: { success: boolean, message?: string };

  constructor(success: boolean, message?: string) {
    this.data = { success, message };
  }
}

export class DWsNewSubscriptionEvent<T>
  implements WsResponse<{subscription: WS_SUBSCRIPTIONS, payload: T}> {

  event = WS_NEW_SUBSCRIPTION_EVENT;
  data: {
    subscription: WS_SUBSCRIPTIONS;
    payload: T;
  };

  constructor(payload: T, subscription: WS_SUBSCRIPTIONS) {
    this.data = {
      subscription,
      payload,
    };
  }
}
