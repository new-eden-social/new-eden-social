import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { DComment, DCommentList } from './comment.dto';
import { VCreateComment } from './comment.validate';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { Pagination, VPagination } from '@new-eden-social/pagination';
import { CORPORATION_ROLES, CorporationGrpcClient } from '@new-eden-social/api-corporation';
import { CommentGrpcClient } from '@new-eden-social/api-comment';
import { ICharacterResponse } from '@new-eden-social/api-character';
import { PostGrpcClient } from '@new-eden-social/api-post';
import { CorporationRolesGuard } from '../corporation/corporation.roles.guard';
import { CorporationRoles } from '../corporation/corporation.roles.decorator';
import { CorporationAllianceExecutorGuard } from '../corporation/corporation.allianceExecutor.guard';

@ApiUseTags('comments')
@Controller('comments')
export class CommentController {

  constructor(
    private readonly commentClient: CommentGrpcClient,
    private readonly corporationClient: CorporationGrpcClient,
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
    @AuthenticatedCharacter() character: ICharacterResponse,
  ): Promise<DComment> {
    const comment = await this.commentClient.service.createAsCharacter({
      comment: commentData,
      postId,
      characterId: character.id,
    }).toPromise();
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
    @AuthenticatedCharacter() character: ICharacterResponse,
  ): Promise<DComment> {
    const comment = await this.commentClient.service.createAsCorporation({
      comment: commentData,
      postId,
      corporationId: character.corporationId,
    }).toPromise();
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
    @AuthenticatedCharacter() character: ICharacterResponse,
  ): Promise<DComment> {
    const corporation = await this.corporationClient.service.get({
      corporationId: character.corporationId,
    }).toPromise();
    const comment = await this.commentClient.service.createAsAlliance({
      comment: commentData,
      postId,
      allianceId: corporation.id,
    }).toPromise();
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
    const { comments, count } = await this.commentClient.service.getLatest({
      postId,
      pagination: {
        limit: pagination.limit,
        page: pagination.page,
      }
    }).toPromise();

    return new DCommentList(comments, pagination.page, pagination.limit, count);
  }

}
