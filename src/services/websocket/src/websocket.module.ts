import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { LoggerModule } from '@new-eden-social/logger';
import { AuthenticateGrpcModule } from '@new-eden-social/api-authenticate';

@Module({
  imports: [
    LoggerModule,

    AuthenticateGrpcModule,
  ],
  providers: [
    WebsocketGateway,
  ],
})
export class WebsocketModule {
}
