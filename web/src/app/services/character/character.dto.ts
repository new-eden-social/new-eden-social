import { DCorporationShort } from '../corporation/corporation.dto';
import { DPagination } from '../paggination.dto';
import {DFollow} from '../follow/follow.dto';


export class DCharacterPortrait {
  px64x64: string;
  px128x128: string;
  px256x256: string;
  px512x512: string;
}

export class DCharacterShort {
  id: number;
  handle: string;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId?: number;
  securityStatus: number;
  portrait: DCharacterPortrait;
  corporation: DCorporationShort;
}

export class DCharacter {
  id: number;
  handle: string;
  name: string;
  description: string;
  gender: string;
  raceId: number;
  bloodlineId: number;
  ancestryId?: number;
  securityStatus: number;
  portrait: DCharacterPortrait;
  corporation: DCorporationShort;
  followers: DFollow[];
  following: DFollow[];
  numPosts: number;

  /* LIVE Data*/
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
}

export class DCharacterList extends DPagination<DCharacterShort> {
}
