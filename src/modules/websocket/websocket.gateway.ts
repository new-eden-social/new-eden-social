import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage, WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Character } from '../character/character.entity';
import { ISocket } from '../../interfaces/socket.interface';
import { LoggerService } from '../core/logger/logger.service';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { AuthenticationService } from '../authentication/authentication.service';
import { VWebsocketAuthentication } from './websocket.validate';
import { DWsAuthentication } from './websocket.dto';
import { WS_EVENT_AUTHENTICATION } from './websocket.constants';

@WebSocketGateway()
@UsePipes(new ValidationPipe())
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;
  clients: ISocket[] = [];

  constructor(
    private logger: LoggerService,
    private authenticationService: AuthenticationService,
  ) {
  }

  handleConnection(client: ISocket): void {
    this.logger.debug(`[Websocket.Gateway] Client connected => ${client.id}`);
    this.clients.push(client);
  }

  handleDisconnect(client: ISocket): void {
    this.logger.debug(`[Websocket.Gateway] Client disconnected => ${client.id}`);
    this.clients = this.clients.filter(c => c.id !== client.id);
  }

  @SubscribeMessage('events')
  @UseGuards(AuthenticationGuard)
  onEvent(client, data: any): WsResponse<any> {
    const event = 'events';
    return { event, data };
  }

  @SubscribeMessage(WS_EVENT_AUTHENTICATION)
  async onAuthenticateEvent(
    client: ISocket,
    data: VWebsocketAuthentication,
  ): Promise<DWsAuthentication> {
    try {
      client.character = await this.authenticationService.verifyAuthentication(data.token);
      this.logger.debug(
        `[Websocket.Gateway] authenticate => ${client.character.id} = success`,
      );
      return new DWsAuthentication(true);
    } catch (e) {
      return new DWsAuthentication(false);
    }
  }

  public sendEventToCharacter<T>(character: Character, event: WsResponse): void {
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCharacter => ${character.id} = ${event.event}`,
    );
    this.getSocketsForCharacter(character)
    .forEach(socket => socket.emit(JSON.stringify(event)));
  }

  private getSocketsForCharacter(character: Character): ISocket[] {
    return this.clients.filter(c => c.character && c.character.id !== character.id);
  }

}
