import { PostedEvent } from './create.event';

export class CharacterPostedEvent extends PostedEvent {
}

export class CharacterPostedOnWallEvent extends CharacterPostedEvent {
}

export class CharacterPostedOnCharacterWallEvent extends CharacterPostedOnWallEvent {
}

export class CharacterPostedOnCorporationWallEvent extends CharacterPostedOnWallEvent {
}

export class CharacterPostedOnAllianceWallEvent extends CharacterPostedOnWallEvent {
}
