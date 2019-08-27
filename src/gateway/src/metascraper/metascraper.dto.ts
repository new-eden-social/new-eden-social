import { URL_META_TYPE } from './metascraper.constants';
import { IURLMetadata } from './metascraper.interface';
import { Killmail } from '@new-eden-social/killmail';
import { DKillmailShort } from '../killmail/killmail.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export abstract class DUrlMeta {
  @ApiModelProperty()
    type: URL_META_TYPE;
  @ApiModelProperty()
    metadata: IURLMetadata;
  @ApiModelPropertyOptional()
    killmail: DKillmailShort;

  constructor(metadata: IURLMetadata) {
    this.metadata = metadata;
  }
}

export class DUrlMetaWebsite extends DUrlMeta {
  type = URL_META_TYPE.WEBSITE;
}

export class DUrlMetaKillmail extends DUrlMeta {
  type = URL_META_TYPE.KILLMAIL;

  constructor(metadata: IURLMetadata, killmail: Killmail) {
    super(metadata);
    this.killmail = new DKillmailShort(killmail);
  }
}
