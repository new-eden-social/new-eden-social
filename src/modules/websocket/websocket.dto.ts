import { WS_EVENT_AUTHENTICATION } from './websocket.constants';
import { WsResponse } from '@nestjs/websockets';

export class DWsAuthentication implements WsResponse<{ success: boolean }> {
  event = WS_EVENT_AUTHENTICATION;
  data: { success: boolean };

  constructor(success: boolean) {
    this.data = { success };
  }
}
