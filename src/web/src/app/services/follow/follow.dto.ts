import {FOLLOW_ACTION_TYPE} from './follow.constants';
import {DCorporationShort} from '../corporation/corporation.dto';
import {DAllianceShort} from '../alliance/alliance.dto';
import { DCharacterShort } from '../character/character.dto';


export class DFollow {
  follower: DCharacterShort;

  followingCharacter: DCharacterShort;
  followingCorporation: DCorporationShort;
  followingAlliance: DAllianceShort;
}

export class DFollowAction extends DFollow {
  type: FOLLOW_ACTION_TYPE;
}
