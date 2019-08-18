import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage, WebSocketGateway, WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { VWebsocketAuthentication } from './websocket.validate';
import { DWsAuthentication, DWsSubscription, DWsNewSubscriptionEvent } from './websocket.dto';
import {
  WS_EVENT_AUTHENTICATION,
  WS_SUBSCRIBE_EVENTS,
  getRoomForLatestWall,
  getRoomForHashtagWall,
  getRoomForCharacterWall,
  getRoomForCorporationWall,
  getRoomForAllianceWall,
  MAX_ROOMS_JOINED,
  WS_SUBSCRIPTIONS,
  getRoomForPostComments,
  WS_UN_SUBSCRIBE_EVENTS,
} from './websocket.constants';
import { WsLoggerExceptionInterceptor, LoggerService } from '@new-eden-social/logger';
import { ISocket } from './websocket.interface';

@WebSocketGateway()
@UsePipes(new ValidationPipe())
@UseInterceptors(new WsLoggerExceptionInterceptor())
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: SocketIO.Server;
  clients: ISocket[] = [];

  constructor(
    private readonly logger: LoggerService,
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

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL)
  async onSubscribeToLatestWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_HASHTAG_WALL)
  async onSubscribeToHashtagWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_CHARACTER_WALL)
  async onSubscribeToCharacterWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_CORPORATION_WALL)
  async onSubscribeToCorporationWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_ALLIANCE_WALL)
  async onSubscribeToAllianceWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_SUBSCRIBE_EVENTS.TO_POST_COMMENTS)
  async onSubscribeToPostCommentsEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_LATEST_WALL)
  async onUnSubscribeFromLatestWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_HASHTAG_WALL)
  async onUnSubscribeFromHashtagWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_CHARACTER_WALL)
  async onUnSubscribeFromCharacterWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_CORPORATION_WALL)
  async onUnSubscribeFromCorporationWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_ALLIANCE_WALL)
  async onUnSubscribeFromAllianceWallEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  @SubscribeMessage(WS_UN_SUBSCRIBE_EVENTS.FROM_POST_COMMENTS)
  async onUnSubscribeFromPostCommentsEvent(client: ISocket, data: any): Promise<DWsSubscription> {
    return this.onUnSubscribeEvent(client, data);
  }

  private async onSubscribeEvent(
    client: ISocket,
    data: any,
  ): Promise<DWsSubscription> {
    try {
      if (Object.keys(client.rooms).length > MAX_ROOMS_JOINED) {
        throw Error('Already in too many rooms!');
      }

      switch (data.event) {
        case WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL:
          client.join(getRoomForLatestWall());
          break;
        case WS_SUBSCRIBE_EVENTS.TO_HASHTAG_WALL:
          client.join(getRoomForHashtagWall(data.key));
          break;
        case WS_SUBSCRIBE_EVENTS.TO_CHARACTER_WALL:
          client.join(getRoomForCharacterWall(data.key));
          break;
        case WS_SUBSCRIBE_EVENTS.TO_CORPORATION_WALL:
          client.join(getRoomForCorporationWall(data.key));
          break;
        case WS_SUBSCRIBE_EVENTS.TO_ALLIANCE_WALL:
          client.join(getRoomForAllianceWall(data.key));
          break;
        case WS_SUBSCRIBE_EVENTS.TO_POST_COMMENTS:
          client.join(getRoomForPostComments(data.key));
          break;
        default:
          throw Error('Unknown Subscription Type!');
      }
      this.logger.debug(
        `[Websocket.Gateway] ${data.event} => ${client.id} = success`,
      );
      return new DWsSubscription(true);
    } catch (e) {
      this.logger.debug(
        `[Websocket.Gateway] ${data.event} => ${client.id} = fail`,
      );
      return new DWsSubscription(false, e.message);
    }
  }

  private async onUnSubscribeEvent(
    client: ISocket,
    data: any,
  ): Promise<DWsSubscription> {
    try {
      switch (data.event) {
        case WS_UN_SUBSCRIBE_EVENTS.FROM_LATEST_WALL:
          client.leave(getRoomForLatestWall());
          break;
        case WS_UN_SUBSCRIBE_EVENTS.FROM_HASHTAG_WALL:
          client.leave(getRoomForHashtagWall(data.key));
          break;
        case WS_UN_SUBSCRIBE_EVENTS.FROM_CHARACTER_WALL:
          client.leave(getRoomForCharacterWall(data.key));
          break;
        case WS_UN_SUBSCRIBE_EVENTS.FROM_CORPORATION_WALL:
          client.leave(getRoomForCorporationWall(data.key));
          break;
        case WS_UN_SUBSCRIBE_EVENTS.FROM_ALLIANCE_WALL:
          client.leave(getRoomForAllianceWall(data.key));
          break;
        case WS_UN_SUBSCRIBE_EVENTS.FROM_POST_COMMENTS:
          client.leave(getRoomForPostComments(data.key));
          break;
        default:
          throw Error('Unknown Subscription Type!');
      }
      this.logger.debug(
        `[Websocket.Gateway] ${data.event} => ${client.id} = success`,
      );
      return new DWsSubscription(true);
    } catch (e) {
      this.logger.debug(
        `[Websocket.Gateway] ${data.event} => ${client.id} = fail`,
      );
      return new DWsSubscription(false, e.message);
    }
  }

  @SubscribeMessage(WS_EVENT_AUTHENTICATION)
  async onAuthenticateEvent(
    client: ISocket,
    data: VWebsocketAuthentication,
  ): Promise<DWsAuthentication> {
    try {
      client.characterId = await this.authenticationService.verifyAuthentication(data.token);
      this.logger.debug(
        `[Websocket.Gateway] authenticate => ${client.characterId} = success`,
      );
      return new DWsAuthentication(true);
    } catch (e) {
      this.logger.debug(
        `[Websocket.Gateway] authenticate => ${client.id} = fail`,
      );
      return new DWsAuthentication(false);
    }
  }

  /**
   * Send event to character (All sockets for this character)
   * @param characterId Number
   * @param event WsResponse
   */
  public sendEventToCharacter(characterId: number, event: WsResponse): void {
    const clients = this.getSocketsForCharacter(characterId);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCharacter [${clients.length}]` +
      ` => ${characterId} = ${event.event}`,
    );
    clients.forEach(socket => socket.emit(event.event, event.data));
  }

  /**
   * Send event to all sockets connected to latest wall
   * @param data T
   */
  public sendEventToLatestWallSub<T>(data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_LATEST_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToLatestSub => latest = ${event.event}`,
    );
    this.server.to('wall:latest').emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this character's wall
   * @param characterId Number
   * @param data T
   */
  public sendEventToCharacterWallSub<T>(characterId: number, data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_CHARACTER_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCharacterWall => ${characterId} = ${event.event}`,
    );
    this.server.to(`wall:character:${characterId}`).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this corporation's wall
   * @param corporationId Number
   * @param data T
   */
  public sendEventToCorporationWallSub<T>(corporationId: number, data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_CORPORATION_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCorporationWall => ${corporationId} = ${event.event}`,
    );
    this.server.to(`wall:corporation:${corporationId}`).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this alliance's wall
   * @param allianceId Number
   * @param data T
   */
  public sendEventToAllianceWallSub<T>(allianceId: number, data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_ALLIANCE_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToAllianceWall => ${allianceId} = ${event.event}`,
    );
    this.server.to(`wall:alliance:${allianceId}`).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this hashtag's wall
   * @param hashtag String
   * @param event T
   */
  public sendEventToHashtagWallSub<T>(hashtag: string, data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_HASHTAG_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToHashtagWall => ${hashtag} = ${event.event}`,
    );
    this.server.to(`wall:hashtag:${hashtag}`).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this post's comments
   * @param postId String
   * @param event WsResponse
   */
  public sendEventToPostCommentSub<T>(postId: string, data: T): void {
    const event = new DWsNewSubscriptionEvent<T>(data, WS_SUBSCRIPTIONS.TO_POST_COMMENTS);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToPostCommentSub => ${postId} = ${event.event}`,
    );
    this.server.to(`post:comments:${postId}`).emit(event.event, event.data);
  }

  private getSocketsForCharacter(characterId: number): ISocket[] {
    return this.clients.filter(c => c.characterId === characterId);
  }

}
