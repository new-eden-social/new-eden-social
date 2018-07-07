import { DCorporationShortWithoutAlliance } from '../corporation/corporation.dto';
import { Alliance } from './alliance.entity';
import { DPagination } from '../core/pagination/paggination.dto';
import { IAllianceIcon } from './alliance.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class DAllianceIcon {
  @ApiModelProperty()
  px64x64: string;
  @ApiModelProperty()
  px128x128: string;

  constructor(icon: IAllianceIcon) {
    this.px64x64 = icon.px64x64;
    this.px128x128 = icon.px128x128;
  }
}

export class DAllianceShort {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  handle: string;
  @ApiModelProperty()
  ticker: string;
  @ApiModelProperty({ type: String })
  dateFounded: Date;
  @ApiModelProperty()
  icon: DAllianceIcon;

  constructor(alliance: Alliance) {
    this.id = alliance.id;
    this.name = alliance.name;
    this.handle = alliance.handle;
    this.ticker = alliance.ticker;
    this.dateFounded = alliance.dateFounded;
    this.icon = new DAllianceIcon(alliance.icon);
  }
}

export class DAlliance {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  handle: string;
  @ApiModelProperty()
  ticker: string;
  @ApiModelProperty({ type: String })
  dateFounded: Date;
  @ApiModelProperty()
  executorCorporation: DCorporationShortWithoutAlliance;
  @ApiModelProperty()
  icon: DAllianceIcon;

  /* LIVE Data */
  @ApiModelProperty()
  hasSupers: boolean;
  @ApiModelProperty()
  iskDestroyed: number;
  @ApiModelProperty()
  iskLost: number;
  @ApiModelProperty()
  pointsDestroyed: number;
  @ApiModelProperty()
  pointsLost: number;
  @ApiModelProperty()
  shipsDestroyed: number;
  @ApiModelProperty()
  shipsLost: number;
  @ApiModelProperty()
  soloKills: number;
  @ApiModelProperty()
  soloLosses: number;
  @ApiModelProperty()
  memberCount: number;
  @ApiModelProperty()
  corpCount: number;

  constructor(alliance: Alliance) {
    this.id = alliance.id;
    this.name = alliance.name;
    this.handle = alliance.handle;
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
