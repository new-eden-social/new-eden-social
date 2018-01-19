import { DAllianceShort } from '../alliance/alliance.dto';
import { Corporation } from './corporation.entity';
import { DPagination } from '../../dto/paggination.dto';
import { ICorporationName } from '../common/external/esi/esi.interface';

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
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;

  constructor(corporation: Corporation) {
    this.id = corporation.id;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.alliance = corporation.alliance ? new DAllianceShort(corporation.alliance) : null;
  }
}

export class DCorporationShortWithoutAlliance {
  id: number;
  name: string;
  ticker: string;
  description: string;

  constructor(corporation: Corporation) {
    this.id = corporation.id;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
  }
}

export class DCorporation {
  id: number;
  name: string;
  ticker: string;
  description: string;
  alliance?: DAllianceShort;

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
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.alliance = corporation.alliance ? new DAllianceShort(corporation.alliance) : null;

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
