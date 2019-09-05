import { DPagination } from '@new-eden-social/pagination';
import { ApiModelProperty } from '@nestjs/swagger';
import { ICorporationResponse, ICorporationIconResponse } from '@new-eden-social/api-corporation';

export class DCorporationIcon {
  @ApiModelProperty()
  px64x64: string;
  @ApiModelProperty()
  px128x128: string;
  @ApiModelProperty()
  px256x256: string;

  constructor(icon: ICorporationIconResponse) {
    this.px64x64 = icon.px64x64;
    this.px128x128 = icon.px128x128;
    this.px256x256 = icon.px256x256;
  }
}

export class DCorporation {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  handle: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  ticker: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  allianceId?: number;
  @ApiModelProperty()
  icon: DCorporationIcon;

  constructor(corporation: ICorporationResponse) {
    this.id = corporation.id;
    this.handle = corporation.handle;
    this.name = corporation.name;
    this.ticker = corporation.ticker;
    this.description = corporation.description;
    this.allianceId = corporation.allianceId;
    this.icon = new DCorporationIcon(corporation.icon);
  }
}

export class DCorporationList extends DPagination<DCorporation> {
  constructor(corporations: ICorporationResponse[], page: number, perPage: number, count: number) {
    const formattedCorporations = corporations.map(
      corporation => new DCorporation(corporation));
    super(formattedCorporations, page, perPage, count);
  }
}
