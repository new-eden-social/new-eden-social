import { PostedEvent } from './create.event';

export class AlliancePostedEvent extends PostedEvent {
}

export class AlliancePostedOnWallEvent extends AlliancePostedEvent {
}

export class AlliancePostedOnCharacterWallEvent extends AlliancePostedOnWallEvent {
}

export class AlliancePostedOnCorporationWallEvent extends AlliancePostedOnWallEvent {
}

export class AlliancePostedOnAllianceWallEvent extends AlliancePostedOnWallEvent {
}
