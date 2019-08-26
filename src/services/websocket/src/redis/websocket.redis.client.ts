import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketRedisClientOptions } from './websocket.redis.client.options';
import { Client, ClientRedis } from '@nestjs/microservices';
import { WS_REDIS_EVENTS } from './websocket.redis.events';
import { Observable } from 'rxjs';
import { DWsRedisLatestWall, DWsRedisHashtagWall, DWsRedisCharacterWall, DWsRedisCorporationWall, DWsRedisAllianceWall, DWsRedisPostComments, DWsRedisCharacter } from './websocket.redis.dto';

@Injectable()
export class WebsocketRedisClient implements OnModuleInit {

  @Client(WebsocketRedisClientOptions)
  private readonly client: ClientRedis;

  async onModuleInit() {
    await this.client.connect();
  }

  public emitLatestWallEvent<T>(data: T): Observable<DWsRedisLatestWall<T>> {
    return this.client.emit<DWsRedisLatestWall<T>>(
      WS_REDIS_EVENTS.LATEST_WALL,
      new DWsRedisLatestWall(data)
    );
  }

  public emitHashtagWallEvent<T>(hashtag: string, data: T): Observable<DWsRedisHashtagWall<T>> {
    return this.client.emit<DWsRedisHashtagWall<T>>(
      WS_REDIS_EVENTS.HASHTAG_WALL,
      new DWsRedisHashtagWall(hashtag, data)
    );
  }

  public emitCharacterWallEvent<T>(characterId: number, data: T): Observable<DWsRedisCharacterWall<T>> {
    return this.client.emit<DWsRedisCharacterWall<T>>(
      WS_REDIS_EVENTS.CHARACTER_WALL,
      new DWsRedisCharacterWall(characterId, data)
    );
  }

  public emitCorporationWallEvent<T>(corporationId: number, data: T): Observable<DWsRedisCorporationWall<T>> {
    return this.client.emit<DWsRedisCorporationWall<T>>(
      WS_REDIS_EVENTS.CORPORATION_WALL,
      new DWsRedisCorporationWall(corporationId, data)
    );
  }

  public emitAllianceWallEvent<T>(allianceId: number, data: T): Observable<DWsRedisAllianceWall<T>> {
    return this.client.emit<DWsRedisAllianceWall<T>>(
      WS_REDIS_EVENTS.ALLIANCE_WALL,
      new DWsRedisAllianceWall(allianceId, data)
    );
  }

  public emitPostCommentsEvent<T>(postId: string, data: T): Observable<DWsRedisPostComments<T>> {
    return this.client.emit<DWsRedisPostComments<T>>(
      WS_REDIS_EVENTS.POST_COMMENTS,
      new DWsRedisPostComments(postId, data)
    );
  }

  public emitCharacterEvent<T>(characterId: number, event: string, data: T): Observable<DWsRedisCharacter<T>> {
    return this.client.emit<DWsRedisCharacter<T>>(
      WS_REDIS_EVENTS.CHARACTER,
      new DWsRedisCharacter(characterId, event, data)
    );
  }

}
