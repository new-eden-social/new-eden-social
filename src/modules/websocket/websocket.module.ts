import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    AuthenticationModule,
  ],
  providers: [
    WebsocketGateway,
  ],
  exports: [
    WebsocketGateway,
  ],
})
export class WebsocketModule {
}
