import { WsResponse } from '@nestjs/websockets';

export class DWsRedisLatestWall<T = any> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class DWsRedisHashtagWall<T = any> {
  hashtag: string;
  data: T;

  constructor(hashtag: string, data: T) {
    this.hashtag = hashtag;
    this.data = data;
  }
}

export class DWsRedisCharacterWall<T = any> {
  characterId: number;
  data: T;

  constructor(characterId: number, data: T) {
    this.characterId = characterId;
    this.data = data;
  }
}

export class DWsRedisCorporationWall<T = any> {
  corporationId: number;
  data: T;
  constructor(corporationId: number, data: T) {
    this.corporationId = corporationId;
    this.data = data;
  }
}

export class DWsRedisAllianceWall<T = any> {
  allianceId: number;
  data: T;
  constructor(allianceId: number, data: T) {
    this.allianceId = allianceId;
    this.data = data;
  }
}

export class DWsRedisCharacter<T = any> implements WsResponse<T> {
  characterId: number;
  event: string;
  data: T;

  constructor(characterId: number, event: string, data: T) {
    this.characterId = characterId;
    this.event = event;
    this.data = data;
  }
}

export class DWsRedisPostComments<T = any> {
  postId: string;
  data: T;

  constructor(postId: string, data: T) {
    this.postId = postId;
    this.data = data;
  }
}
