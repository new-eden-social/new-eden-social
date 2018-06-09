import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage, WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Character } from '../character/character.entity';
import { Notification } from './notification.entity';
import { DNotification } from './notification.dto';
import { ISocket } from '../../interfaces/socket.interface';
import { LoggerService } from '../core/logger/logger.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationInterceptor } from '../authentication/authentication.interceptor';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@WebSocketGateway()
@UseInterceptors(AuthenticationInterceptor)
@UseGuards(AuthenticationGuard)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;
  clients: ISocket[] = [];

  constructor(
    private logger: LoggerService,
  ) {
  }

  handleConnection(client: ISocket): void {
    this.logger.debug(`[Notification.Gateway] Client connected => ${client.id}`);
    this.clients.push(client);
  }

  handleDisconnect(client: ISocket): void {
    this.logger.debug(`[Notification.Gateway] Client disconnected => ${client.id}`);
    this.clients = this.clients.filter(c => c.id !== client.id);
  }

  public sendNotificationToCharacter(character: Character, notification: Notification): void {
    this.logger.debug(`[Notification.Gateway] sendNotificationToCharacter => ${character.id} = ${notification.type}`);
    this.getSocketsForCharacter(character)
    .forEach(socket => socket.emit(JSON.stringify(new DNotification(notification))));
  }

  @SubscribeMessage('events')
  onEvent(client, data: any): WsResponse<any> {
    const event = 'events';
    return { event, data };
  }

  private getSocketsForCharacter(character: Character): ISocket[] {
    return this.clients.filter(c => c.character.id !== character.id);
  }

}
