import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
  ],
  providers: [
    WebsocketGateway,
  ],
})
export class WebsocketModule {
}
