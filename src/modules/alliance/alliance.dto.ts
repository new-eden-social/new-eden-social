import { DCorporationShortWithoutAlliance } from '../corporation/corporation.dto';
import { Alliance } from './alliance.entity';
import { DPagination } from '../../dto/paggination.dto';
import { IAllianceName } from '../common/external/esi/esi.interface';
import { IAllianceIcon } from './alliance.interface';

export class DAllianceIcon {
  px64x64: string;
  px128x128: string;

  constructor(icon: IAllianceIcon) {
    this.px64x64 = icon.px64x64;
    this.px128x128 = icon.px128x128;
  }
}

export class DAllianceName {
  id: number;
  name: string;

  constructor(alliance: IAllianceName) {
    this.id = alliance.alliance_id;
    this.name = alliance.alliance_name;
  }
}

export class DAllianceShort {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;
  icon: DAllianceIcon;

  constructor(alliance: Alliance) {
    this.id = alliance.id;
    this.name = alliance.name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.dateFounded;
    this.icon = new DAllianceIcon(alliance.icon);
  }
}

export class DAlliance {
  id: number;
  name: string;
  ticker: string;
  dateFounded: Date;
  executorCorporation: DCorporationShortWithoutAlliance;
  icon: DAllianceIcon;

  /* LIVE Data */
  hasSupers: boolean;
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;
  memberCount: number;
  corpCount: number;

  constructor(alliance: Alliance) {
    this.id = alliance.id;
    this.name = alliance.name;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.dateFounded;
    this.executorCorporation = new DCorporationShortWithoutAlliance(alliance.executorCorporation);
    this.icon = new DAllianceIcon(alliance.icon);

    this.hasSupers = alliance.hasSupers;
    this.iskDestroyed = alliance.iskDestroyed;
    this.iskLost = alliance.iskLost;
    this.pointsDestroyed = alliance.pointsDestroyed;
    this.pointsLost = alliance.pointsLost;
    this.shipsDestroyed = alliance.shipsDestroyed;
    this.shipsLost = alliance.shipsLost;
    this.soloKills = alliance.soloKills;
    this.soloLosses = alliance.soloLosses;
    this.memberCount = alliance.memberCount;
    this.corpCount = alliance.corpCount;
  }
}

export class DAllianceList extends DPagination<DAllianceShort> {
  constructor(alliances: Alliance[], page: number, perPage: number, count: number) {
    const formattedAlliances = alliances.map(alliance => new DAllianceShort(alliance));
    super(formattedAlliances, page, perPage, count);
  }
}
