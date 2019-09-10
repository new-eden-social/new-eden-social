import { Controller } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrpcMethod } from '@nestjs/microservices';
import { ICommentGrpcService, ICreateAsCharacterRequest, ICreateAsCorporationRequest, ICreateAsAllianceRequest, ICommentResponse, IPaginatedCommentsResponse, IPaginationRequest, IGetLatestRequest, IGetParticipantsReqiest, IGetParticipantsResponse } from './comment.grpc.interface';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.entity';

@Controller()
export class CommentGrpcController implements ICommentGrpcService {

  constructor(
    private readonly commentService: CommentService,
    ) {
  }

  @GrpcMethod('CommentService')
  createAsCharacter(data: ICreateAsCharacterRequest): Observable<ICommentResponse> {
    return from(this.commentService.createAsCharacter(data.comment, data.postId, data.characterId)).pipe<ICommentResponse>(
      map<Comment, ICommentResponse>(this.commentTransform)
    );
  }

  @GrpcMethod('CommentService')
  createAsCorporation(data: ICreateAsCorporationRequest): Observable<ICommentResponse> {
    return from(this.commentService.createAsCorporation(data.comment, data.postId, data.corporationId)).pipe<ICommentResponse>(
      map<Comment, ICommentResponse>(this.commentTransform)
    );
  }

  @GrpcMethod('CommentService')
  createAsAlliance(data: ICreateAsAllianceRequest): Observable<ICommentResponse> {
    return from(this.commentService.createAsAlliance(data.comment, data.postId, data.allianceId)).pipe<ICommentResponse>(
      map<Comment, ICommentResponse>(this.commentTransform)
    );
  }

  @GrpcMethod('CommentService')
  getLatest(data: IGetLatestRequest): Observable<IPaginatedCommentsResponse> {
    return from(this.commentService.getLatestForPost(
      data.postId,
      data.pagination.limit,
      data.pagination.page,
      )).pipe<IPaginatedCommentsResponse>(
      map<{comments: Comment[], count: number}, IPaginatedCommentsResponse>(latestData => ({
          comments: latestData.comments.map(this.commentTransform),
          count: latestData.count,
        }))
    );
  }

  getParticipantsForPost(data: IGetParticipantsReqiest): Observable<IGetParticipantsResponse> {
    return from(this.commentService.getParticipantsForPost(
      data.postId,
      )).pipe<IGetParticipantsResponse>(
      map<{characterIds: number[], corporationIds: number[], allianceIds: number[]}, IGetParticipantsResponse>(participants => ({
          characterIds: participants.characterIds,
          corporationIds: participants.corporationIds,
          allianceIds: participants.allianceIds,
        }))
    );
  }

  private commentTransform(comment: Comment): ICommentResponse {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      characterId: comment.characterId,
      corporationId: comment.corporationId,
      allianceId: comment.allianceId,
      postId: comment.postId,
    };
  }
}
