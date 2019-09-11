import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { DPagination } from '@new-eden-social/pagination';
import { ICommentResponse } from '@new-eden-social/services-comment';

export class DComment {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  content: string;
  @ApiModelPropertyOptional()
  characterId?: number;
  @ApiModelPropertyOptional()
  corporationId?: number;
  @ApiModelPropertyOptional()
  allianceId?: number;
  @ApiModelProperty({ type: String })
  createdAt: Date;
  @ApiModelProperty()
  postId: string;

  constructor(comment: ICommentResponse) {
    this.id = comment.id;
    this.content = comment.content;
    this.createdAt = new Date(comment.createdAt);
    this.postId = comment.postId;
    this.characterId = comment.characterId;
    this.corporationId = comment.corporationId;
    this.allianceId = comment.allianceId;
  }
}

export class DCommentList extends DPagination<DComment> {
  constructor(comments: ICommentResponse[], page: number, perPage: number, count: number) {
    const formattedComments = comments.map(comment => new DComment(comment));
    super(formattedComments, page, perPage, count);
  }
}
