import { DPagination } from '@new-eden-social/pagination';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { DUrlMeta, DUrlMetaKillmail, DUrlMetaWebsite } from '../metascraper/metascraper.dto';
import { POST_TYPES, IPostResponse } from '@new-eden-social/api-post';

export class DPost {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  content: string;
  @ApiModelProperty()
  type: POST_TYPES;

  @ApiModelPropertyOptional()
  characterId?: number;
  @ApiModelPropertyOptional()
  corporationId?: number;
  @ApiModelPropertyOptional()
  allianceId?: number;

  @ApiModelPropertyOptional()
  killmailId?: number;
  @ApiModelPropertyOptional()
  locationId?: number;

  @ApiModelPropertyOptional()
  url: DUrlMeta;
  @ApiModelProperty({ type: String, isArray: true })
  hashtags: string[];
  @ApiModelProperty({ type: String })
  createdAt: Date;

  @ApiModelPropertyOptional()
  characterWallId: number;
  @ApiModelPropertyOptional()
  corporationWallId: number;
  @ApiModelPropertyOptional()
  allianceWallId: number;

  constructor(post: IPostResponse) {
    this.id = post.id;
    this.content = post.content;
    this.type = post.type;
    this.hashtags = post.hashtags;
    this.createdAt = new Date(post.createdAt);

    this.killmailId = post.killmailId;
    this.locationId = post.locationId;

    this.characterId = post.characterId;
    this.corporationId = post.corporationId;
    this.allianceId = post.allianceId;
    this.characterWallId = post.characterWallId;
    this.corporationWallId = post.corporationWallId;
    this.allianceWallId = post.allianceWallId;

    // Depending on post type, killmail is used in different ways
    // for KILLMAIL type, it's killmail that triggered post creation
    // for TEXT type it's killmail from url inside post
    switch (post.type) {
      case POST_TYPES.TEXT:
        if (post.url) {
          if (post.killmailId) { this.url = new DUrlMetaKillmail(post.url, post.killmailId); }
          else { this.url = new DUrlMetaWebsite(post.url); }
        }
    }
  }
}

export class DPostList extends DPagination<DPost> {
  constructor(posts: IPostResponse[], page: number, perPage: number, count: number) {
    const formattedPosts = posts.map(post => new DPost(post));
    super(formattedPosts, page, perPage, count);
  }
}
