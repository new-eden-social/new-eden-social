import { DAllianceShort } from '../alliance/alliance.dto';
import { DPagination } from '../paggination.dto';
import {DFollow} from '../follow/follow.dto';

export class DCorporationIcon {
  px64x64: string;
  px128x128: string;
  px256x256: string;
}

export class DCorporationShort {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
  icon: DCorporationIcon;
}

export class DCorporationShortWithoutAlliance {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  icon: DCorporationIcon;
}

export class DCorporation {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
  icon: DCorporationIcon;
  followers: DFollow[];
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

export class DCorporationList extends DPagination<DCorporationShort> {
}
