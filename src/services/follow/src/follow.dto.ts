import { FOLLOW_ACTION_TYPE } from './follow.constants';
import { Follow } from './follow.entity';
import { DCharacterShort } from '@new-eden-social/api-character/character.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DAllianceShort } from '../alliance/alliance.dto';

export class DFollow {
  follower: DCharacterShort;

  followingCharacter: DCharacterShort;
  followingCorporation: DCorporationShort;
  followingAlliance: DAllianceShort;

  constructor(follow: Follow) {
    this.follower = new DCharacterShort(follow.follower);
    if (follow.followingCharacter) { this.followingCharacter = new DCharacterShort(follow.followingCharacter); }
    if (follow.followingCorporation) { this.followingCorporation = new DCorporationShort(follow.followingCorporation); }
    if (follow.followingAlliance) { this.followingAlliance = new DAllianceShort(follow.followingAlliance); }
  }
}

export class DFollowAction extends DFollow {
  type: FOLLOW_ACTION_TYPE;

  constructor(type: FOLLOW_ACTION_TYPE, follow: Follow) {
    super(follow);
    this.type = type;
  }
}
