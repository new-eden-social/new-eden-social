import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IURLMetadata, URL_META_TYPE } from '@new-eden-social/services-metascraper';

export abstract class DUrlMeta {
  @ApiModelProperty()
  type: URL_META_TYPE;
  @ApiModelProperty()
  metadata: IURLMetadata;
  @ApiModelPropertyOptional()
  killmailId?: number;

  constructor(metadata: IURLMetadata) {
    this.metadata = metadata;
  }
}

export class DUrlMetaWebsite extends DUrlMeta {
  type = URL_META_TYPE.WEBSITE;
}

export class DUrlMetaKillmail extends DUrlMeta {
  type = URL_META_TYPE.KILLMAIL;

  constructor(metadata: IURLMetadata, killmailId: number) {
    super(metadata);
    this.killmailId = killmailId;
  }
}
