import { POST_TYPES } from './post.constants';
import { DCharacterShort } from '../character/character.dto';
import { DKillmailShort } from '../killmail/killmail.dto';
import { DUniverseLocation } from '../universe/location/location.dto';
import { DPagination } from '../paggination.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DAllianceShort } from '../alliance/alliance.dto';

export class DPost {
  id: string;
  content: string;
  type: POST_TYPES;
  character?: DCharacterShort;
  corporation?: DCorporationShort;
  alliance?: DAllianceShort;
  killmail?: DKillmailShort;
  hashtags: string[];
  location?: DUniverseLocation;
  createdAt: Date;
  characterWall: DCharacterShort;
  corporationWall: DCorporationShort;
  allianceWall: DAllianceShort;
}

export class DPostList extends DPagination<DPost> {
}
