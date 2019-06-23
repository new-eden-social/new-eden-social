import {
  WS_EVENT_AUTHENTICATION, WS_SUBSCRIBE_EVENTS,
  WS_UN_SUBSCRIBE_EVENTS,
} from './websocket.constants';

export class DWebsocketAuthentication {
  event = WS_EVENT_AUTHENTICATION;
  token: string;

  constructor(token) {
    this.token = token;
  }
}

export abstract class DWebsocketSubscribe {
  event: WS_SUBSCRIBE_EVENTS;
  key?: string|number;

  constructor(key?: string|number) {
    this.key = key;
  }
}

export class DWebsocketSubscribeToLatestWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL;
}

export class DWebsocketSubscribeToHashtagWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_HASHTAG_WALL;
}

export class DWebsocketSubscribeToCharacterWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_CHARACTER_WALL;
}

export class DWebsocketSubscribeToCorporationWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_CORPORATION_WALL;
}

export class DWebsocketSubscribeToAllianceWall extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_ALLIANCE_WALL;
}

export class DWebsocketSubscribeToPostComment extends DWebsocketSubscribe {
  event = WS_SUBSCRIBE_EVENTS.TO_POST_COMMENTS;
}

export abstract class DWebsocketUnSubscribe {
  event: WS_UN_SUBSCRIBE_EVENTS;
  key?: string|number;

  constructor(key?: string|number) {
    this.key = key;
  }
}

export class DWebsocketUnSubscribeFromLatestWall extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_LATEST_WALL;
}

export class DWebsocketUnSubscribeFromHashtagWall extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_HASHTAG_WALL;
}

export class DWebsocketUnSubscribeFromCharacterWall extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_CHARACTER_WALL;
}

export class DWebsocketUnSubscribeFromCorporationWall extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_CORPORATION_WALL;
}

export class DWebsocketUnSubscribeFromAllianceWall extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_ALLIANCE_WALL;
}

export class DWebsocketUnSubscribeFromPostComment extends DWebsocketUnSubscribe {
  event = WS_UN_SUBSCRIBE_EVENTS.FROM_POST_COMMENTS;
}
