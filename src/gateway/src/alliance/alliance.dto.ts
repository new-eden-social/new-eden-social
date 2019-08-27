import { Alliance } from '../alliance.entity';
import { DPagination } from '@new-eden-social/pagination';
import { IAllianceIcon } from '../alliance.interface';
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

export class DAllianceList extends DPagination<DAlliance> {
  constructor(alliances: Alliance[], page: number, perPage: number, count: number) {
    const formattedAlliances = alliances.map(alliance => new DAlliance(alliance));
    super(formattedAlliances, page, perPage, count);
  }
}
