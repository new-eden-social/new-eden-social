import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Character } from '../character/character.entity';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { CommentService } from './comment.service';
import { DComment, DCommentList } from './comment.dto';
import { VCreateComment } from './comment.validate';
import { PostService } from '../post/post.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { VPagination } from '../core/pagination/pagination.validation';
import { DPostList } from '../post/post.dto';
import { Pagination } from '../core/pagination/pagination.decorator';
import { CORPORATION_ROLES } from '../corporation/corporation.constants';
import { CorporationRoles } from '../corporation/corporation.roles.decorator';
import { CorporationRolesGuard } from '../corporation/corporation.roles.guard';
import { CorporationAllianceExecutorGuard } from '../corporation/corporation.allianceExecutor.guard';

@ApiUseTags('comments')
@Controller('comments')
export class CommentController {

  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DComment,
    description: 'Post as Character',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post(':postId/character')
  public async createAsCharacter(
    @Body() commentData: VCreateComment,
    @Param('postId') postId: string,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DComment> {
    const post = await this.postService.get(postId);
    const comment = await this.commentService.createAsCharacter(commentData, post, character);
    return new DComment(comment);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DComment,
    description: 'Post as Character',
  })
  @ApiBearerAuth()
  @UseGuards(CorporationRolesGuard)
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  @Post(':postId/corporation')
  public async createAsCorporation(
    @Body() commentData: VCreateComment,
    @Param('postId') postId: string,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DComment> {
    const post = await this.postService.get(postId);
    const comment = await this.commentService.createAsCorporation(
      commentData,
      post,
      character.corporation);
    return new DComment(comment);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DComment,
    description: 'Post as Alliance',
  })
  @ApiBearerAuth()
  @UseGuards(CorporationRolesGuard, CorporationAllianceExecutorGuard)
  @CorporationRoles(
    CORPORATION_ROLES.DIRECTOR,
    CORPORATION_ROLES.DIPLOMAT,
    CORPORATION_ROLES.COMMUNICATION_OFFICER)
  @Post(':postId/alliance')
  public async createAsAlliance(
    @Body() commentData: VCreateComment,
    @Param('postId') postId: string,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DComment> {
    const post = await this.postService.get(postId);
    const comment = await this.commentService.createAsAlliance(
      commentData,
      post,
      character.corporation.alliance);
    return new DComment(comment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCommentList,
    description: 'Get comments for post',
  })
  @Get(':postId/latest')
  public async getLatestComments(
    @Param('postId') postId: string,
    @Pagination() pagination: VPagination,
  ) {
    const post = await this.postService.get(postId);
    const { comments, count } = await this.commentService.getLatestForPost(
      post,
      pagination.limit,
      pagination.page);

    return new DCommentList(comments, pagination.page, pagination.limit, count);
  }

}
