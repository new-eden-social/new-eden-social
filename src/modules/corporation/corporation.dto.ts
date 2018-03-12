import { DAllianceShort } from '../alliance/alliance.dto';
import { Corporation } from './corporation.entity';
import { DPagination } from '../../dto/paggination.dto';
import { ICorporationName } from '../common/external/esi/esi.interface';
import { ICorporationIcon } from './corporation.interface';

export class DCorporationIcon {
  px64x64: string;
  px128x128: string;
  px256x256: string;

  constructor(icon: ICorporationIcon) {
    this.px64x64 = icon.px64x64;
    this.px128x128 = icon.px128x128;
    this.px256x256 = icon.px256x256;
  }
}

export class DCorporationName {
  id: number;
  name: string;

  constructor(corporation: ICorporationName) {
    this.id = corporation.corporation_id;
    this.name = corporation.corporation_name;
  }
}

export class DCorporationShort {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
  icon: DCorporationIcon;

  constructor(corporation: Corporation) {
    this.id = corporation.id;
    this.handle = corporation.handle;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.alliance = corporation.alliance ? new DAllianceShort(corporation.alliance) : null;
    this.icon = new DCorporationIcon(corporation.icon);
  }
}

export class DCorporationShortWithoutAlliance {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  icon: DCorporationIcon;

  constructor(corporation: Corporation) {
    this.id = corporation.id;
    this.handle = corporation.handle;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.icon = new DCorporationIcon(corporation.icon);
  }
}

export class DCorporation {
  id: number;
  handle: string;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;
  icon: DCorporationIcon;

  /* LIVE Data*/
  iskDestroyed: number;
  iskLost: number;
  pointsDestroyed: number;
  pointsLost: number;
  shipsDestroyed: number;
  shipsLost: number;
  soloKills: number;
  soloLosses: number;

  constructor(corporation: Corporation) {
    this.id = corporation.id;
    this.handle = corporation.handle;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.alliance = corporation.alliance ? new DAllianceShort(corporation.alliance) : null;
    this.icon = new DCorporationIcon(corporation.icon);

    this.iskDestroyed = corporation.iskDestroyed;
    this.iskLost = corporation.iskLost;
    this.pointsDestroyed = corporation.pointsDestroyed;
    this.pointsLost = corporation.pointsLost;
    this.shipsLost = corporation.shipsLost;
    this.shipsDestroyed = corporation.shipsDestroyed;
    this.soloKills = corporation.soloKills;
    this.soloLosses = corporation.soloLosses;
  }
}

export class DCorporationList extends DPagination<DCorporationShort> {
  constructor(corporations: Corporation[], page: number, perPage: number, count: number) {
    const formattedCorporations = corporations.map(
      corporation => new DCorporationShort(corporation));
    super(formattedCorporations, page, perPage, count);
  }
}
