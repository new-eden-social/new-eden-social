import { Comment } from './comment.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { DCharacterShort } from '../character/character.dto';
import { DAllianceShort } from '../alliance/alliance.dto';
import { DCorporationShort } from '../corporation/corporation.dto';
import { DPagination } from '../core/pagination/paggination.dto';

export class DComment {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  content: string;
  @ApiModelPropertyOptional()
  character?: DCharacterShort;
  @ApiModelPropertyOptional()
  corporation?: DCorporationShort;
  @ApiModelPropertyOptional()
  alliance?: DAllianceShort;
  @ApiModelProperty({ type: String })
  createdAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
    if (comment.character) this.character = new DCharacterShort(comment.character);
    if (comment.corporation) this.corporation = new DCorporationShort(comment.corporation);
    if (comment.alliance) this.alliance = new DAllianceShort(comment.alliance);
  }
}

export class DCommentList extends DPagination<DComment> {
  constructor(comments: Comment[], page: number, perPage: number, count: number) {
    const formattedComments = comments.map(comment => new DComment(comment));
    super(formattedComments, page, perPage, count);
  }
}
