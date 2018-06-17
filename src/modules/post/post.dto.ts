import { POST_TYPES } from './post.constants';
import { Post } from './post.entity';
import { DCharacterShort } from '../character/character.dto';
import { DKillmailShort } from '../killmail/killmail.dto';
import { DPagination } from '../core/pagination/paggination.dto';
import { DUniverseLocation } from '../universe/location/location.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DAllianceShort } from '../alliance/alliance.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class DPost {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  content: string;
  @ApiModelProperty()
  type: POST_TYPES;
  @ApiModelPropertyOptional()
  character?: DCharacterShort;
  @ApiModelPropertyOptional()
  corporation?: DCorporationShort;
  @ApiModelPropertyOptional()
  alliance?: DAllianceShort;
  @ApiModelPropertyOptional()
  killmail?: DKillmailShort;
  @ApiModelProperty({ type: String, isArray: true })
  hashtags: string[];
  @ApiModelPropertyOptional()
  location?: DUniverseLocation;
  @ApiModelProperty({ type: String })
  createdAt: Date;
  @ApiModelPropertyOptional()
  characterWall: DCharacterShort;
  @ApiModelPropertyOptional()
  corporationWall: DCorporationShort;
  @ApiModelPropertyOptional()
  allianceWall: DAllianceShort;

  constructor(post: Post) {
    this.id = post.id;
    this.content = post.content;
    this.type = post.type;
    if (post.character) this.character = new DCharacterShort(post.character);
    if (post.corporation) this.corporation = new DCorporationShort(post.corporation);
    if (post.alliance) this.alliance = new DAllianceShort(post.alliance);
    this.hashtags = post.hashtags.map(h => h.name);
    this.createdAt = post.createdAt;
    if (post.location) this.location = new DUniverseLocation(post.location);
    if (post.killmail) this.killmail = new DKillmailShort(post.killmail);
    if (post.characterWall) this.characterWall = new DCharacterShort(post.characterWall);
    if (post.corporationWall) this.corporationWall = new DCorporationShort(post.corporationWall);
    if (post.allianceWall) this.allianceWall = new DAllianceShort(post.allianceWall);
  }
}

export class DPostList extends DPagination<DPost> {
  constructor(posts: Post[], page: number, perPage: number, count: number) {
    const formattedPosts = posts.map(post => new DPost(post));
    super(formattedPosts, page, perPage, count);
  }
}
