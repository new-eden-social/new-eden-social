import { PostedEvent } from './create.event';

export class CorporationPostedEvent extends PostedEvent {
}

export class CorporationPostedOnWallEvent extends CorporationPostedEvent {
}

export class CorporationPostedOnCharacterWallEvent extends CorporationPostedOnWallEvent {
}

export class CorporationPostedOnCorporationWallEvent extends CorporationPostedOnWallEvent {
}

export class CorporationPostedOnAllianceWallEvent extends CorporationPostedOnWallEvent {
}
