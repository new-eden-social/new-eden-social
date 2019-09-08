import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage, WebSocketGateway, WebSocketServer,
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
import { EventPattern } from '@nestjs/microservices';
import { WS_REDIS_EVENTS } from './redis/websocket.redis.events';
import { DWsRedisLatestWall, DWsRedisCharacterWall, DWsRedisCharacter, DWsRedisHashtagWall, DWsRedisAllianceWall, DWsRedisCorporationWall, DWsRedisPostComments } from './redis/websocket.redis.dto';
import { AuthenticateGrpcClient } from '@new-eden-social/api-authenticate';

@WebSocketGateway()
@UsePipes(new ValidationPipe())
@UseInterceptors(new WsLoggerExceptionInterceptor())
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: SocketIO.Server;
  clients: ISocket[] = [];

  constructor(
    private readonly logger: LoggerService,
    private readonly authenticateClient: AuthenticateGrpcClient,
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
      const verifyResponse = await this.authenticateClient.service.verify({ token: data.token }).toPromise();
      client.characterId = verifyResponse.characterId;
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
   */
  @EventPattern(WS_REDIS_EVENTS.CHARACTER)
  public sendEventToCharacter(payload: DWsRedisCharacter): void {
    const clients = this.getSocketsForCharacter(payload.characterId);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCharacter [${clients.length}]` +
      ` => ${payload.characterId} = ${payload.event}`,
    );
    clients.forEach(socket => socket.emit(payload.event, payload.data));
  }

  /**
   * Send event to all sockets connected to latest wall
   */
  @EventPattern(WS_REDIS_EVENTS.LATEST_WALL)
  public sendEventToLatestWallSub(payload: DWsRedisLatestWall): void {
    const event = new DWsNewSubscriptionEvent(payload.data, WS_SUBSCRIPTIONS.TO_LATEST_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToLatestSub => latest = ${event.event}`,
    );
    this.server.to(getRoomForLatestWall()).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this character's wall
   */
  @EventPattern(WS_REDIS_EVENTS.CHARACTER_WALL)
  public sendEventToCharacterWallSub<T>(payload: DWsRedisCharacterWall): void {
    const event = new DWsNewSubscriptionEvent<T>(payload.data, WS_SUBSCRIPTIONS.TO_CHARACTER_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCharacterWall => ${payload.characterId} = ${event.event}`,
    );
    this.server.to(getRoomForCharacterWall(payload.characterId)).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this corporation's wall
   */
  @EventPattern(WS_REDIS_EVENTS.CORPORATION_WALL)
  public sendEventToCorporationWallSub<T>(payload: DWsRedisCorporationWall): void {
    const event = new DWsNewSubscriptionEvent<T>(payload.data, WS_SUBSCRIPTIONS.TO_CORPORATION_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToCorporationWall => ${payload.corporationId} = ${event.event}`,
    );
    this.server.to(getRoomForCorporationWall(payload.corporationId)).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this alliance's wall
   */
  @EventPattern(WS_REDIS_EVENTS.ALLIANCE_WALL)
  public sendEventToAllianceWallSub<T>(payload: DWsRedisAllianceWall): void {
    const event = new DWsNewSubscriptionEvent<T>(payload.data, WS_SUBSCRIPTIONS.TO_ALLIANCE_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToAllianceWall => ${payload.allianceId} = ${event.event}`,
    );
    this.server.to(getRoomForAllianceWall(payload.allianceId)).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this hashtag's wall
   */
  @EventPattern(WS_REDIS_EVENTS.HASHTAG_WALL)
  public sendEventToHashtagWallSub<T>(payload: DWsRedisHashtagWall): void {
    const event = new DWsNewSubscriptionEvent<T>(payload.data, WS_SUBSCRIPTIONS.TO_HASHTAG_WALL);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToHashtagWall => ${payload.hashtag} = ${event.event}`,
    );
    this.server.to(getRoomForHashtagWall(payload.hashtag)).emit(event.event, event.data);
  }

  /**
   * Send event to all sockets connected to this post's comments
   */
  @EventPattern(WS_REDIS_EVENTS.POST_COMMENTS)
  public sendEventToPostCommentSub<T>(payload: DWsRedisPostComments): void {
    const event = new DWsNewSubscriptionEvent<T>(payload.data, WS_SUBSCRIPTIONS.TO_POST_COMMENTS);
    this.logger.debug(
      `[Websocket.Gateway] sendEventToPostCommentSub => ${payload.postId} = ${event.event}`,
    );
    this.server.to(getRoomForPostComments(payload.postId)).emit(event.event, event.data);
  }

  private getSocketsForCharacter(characterId: number): ISocket[] {
    return this.clients.filter(c => c.characterId === characterId);
  }

}
