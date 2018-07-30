import { IEvent } from '@nestjs/cqrs';
import { Follow } from '../follow.entity';

export class FollowEvent implements IEvent {
  constructor(public readonly follow: Follow) {
  }
}

export class FollowCharacterEvent extends FollowEvent {
}

export class FollowCorporationEvent extends FollowEvent {
}

export class FollowAllianceEvent extends FollowEvent {
}
