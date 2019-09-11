import { Injectable } from '@nestjs/common';
import { CommentRepository } from '@new-eden-social/services-comment/comment.repository';
import { Comment } from '@new-eden-social/services-comment/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { NotificationGrpcClient } from '@new-eden-social/services-notification';
import { NOTIFICATION_TYPE } from '@new-eden-social/services-notification/notification.constants';
import * as uuidv4 from 'uuid/v4';
import { ICreateComment } from '@new-eden-social/services-comment/comment.interface';

@Injectable()
export class CommentService {

  // Number of parallel notifications creations
  private readonly NOTIFICATIONS_PARALLEL_CREATE = 4;

  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private readonly notificationClient: NotificationGrpcClient
  ) {
  }

  public async createAsCharacter(
    commentData: ICreateComment,
    postId: string,
    characterId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.characterId = characterId;

    const createdComment = await this.commentRepository.save(comment);

    // Should we even await this? Or just let it run in background?
    await this.sendNotificationToParticipantsAsCharacter(
      characterId,
      createdComment.id,
      postId,
    );

    return createdComment;
  }

  public async createAsCorporation(
    commentData: ICreateComment,
    postId: string,
    corporationId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.corporationId = corporationId;

    const createdComment = await this.commentRepository.save(comment);

    // Should we even await this? Or just let it run in background?
    await this.sendNotificationToParticipantsAsCorporation(
      corporationId,
      createdComment.id,
      postId,
    );

    return createdComment;
  }

  public async createAsAlliance(
    commentData: ICreateComment,
    postId: string,
    allianceId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.allianceId = allianceId;

    const createdComment = await this.commentRepository.save(comment);

    // Should we even await this? Or just let it run in background?
    await this.sendNotificationToParticipantsAsAlliance(
      allianceId,
      createdComment.id,
      postId,
    );

    return createdComment;
  }

  public async getLatestForPost(
    postId: string,
    limit = 10,
    page = 0,
  ): Promise<{ comments: Comment[], count: number }> {
    const [comments, count] = await this.commentRepository.getLatestForPost(postId, limit, page);
    return { comments, count };
  }

  public async getParticipantsForPost(
    postId: string,
  ): Promise<{characterIds: number[], corporationIds: number[], allianceIds: number[]}> {
    const comments = await this.commentRepository.getParticipantsForPost(postId);

    const characterIds = comments.filter(comment => comment.characterId)
    .map(comment => comment.characterId);
    const corporationIds = comments.filter(comment => comment.corporationId)
    .map(comment => comment.corporationId);
    const allianceIds = comments.filter(comment => comment.allianceId)
    .map(comment => comment.allianceId);

    return {characterIds, corporationIds, allianceIds};
  }

  private async sendNotificationToParticipantsAsCharacter(
    senderCharacterId: number,
    commentId: string,
    postId: string,
  ): Promise<void> {
    const eventUuid = uuidv4();
    const participants = await this.getParticipantsForPost(postId);
    await from(participants.characterIds).pipe(
      filter(id => id !== senderCharacterId), // Skip comment author
      mergeMap(id => this.notificationClient.service.create({
        eventUuid,
        senderCharacterId,
        recipientId: id,
        commentId,
        postId,
        type: NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE,
      }), this.NOTIFICATIONS_PARALLEL_CREATE), // Create notifications in parallel
    ).toPromise();
  }

  private async sendNotificationToParticipantsAsCorporation(
    senderCorporationId: number,
    commentId: string,
    postId: string,
  ): Promise<void> {
    const eventUuid = uuidv4();
    const participants = await this.getParticipantsForPost(postId);
    await from(participants.characterIds).pipe(
      mergeMap(id => this.notificationClient.service.create({
        eventUuid,
        senderCorporationId,
        recipientId: id,
        commentId,
        postId,
        type: NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE,
      }), this.NOTIFICATIONS_PARALLEL_CREATE), // Create notifications in parallel
    ).toPromise();
  }

  private async sendNotificationToParticipantsAsAlliance(
    senderAllianceId: number,
    commentId: string,
    postId: string,
  ): Promise<void> {
    const eventUuid = uuidv4();
    const participants = await this.getParticipantsForPost(postId);
    await from(participants.characterIds).pipe(
      mergeMap(id => this.notificationClient.service.create({
        eventUuid,
        senderAllianceId,
        recipientId: id,
        commentId,
        postId,
        type: NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE,
      }), this.NOTIFICATIONS_PARALLEL_CREATE), // Create notifications in parallel
    ).toPromise();
  }
}
