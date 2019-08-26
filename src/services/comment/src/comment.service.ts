import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { VCreateComment } from './comment.validate';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {
  }

  public async createAsCharacter(
    commentData: VCreateComment,
    postId: string,
    characterId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.characterId = characterId;

    const createdComment = await this.commentRepository.save(comment);

    const participants = await this.getParticipantsForPost(postId);

    // from(participants.characterIds).pipe(
    //   filter(id => id !== characterId), // Skip comment author
    //   // TODO: Paralelize notification creation.
    // )

    // for (const participantId of participants.characterIds) {
    //   if (characterId === participantId) {
    //     continue;
    //   }
    //   const notification = new Notification();
    //   notification.eventUuid = eventUuid;
    //   notification.senderCharacter = event.comment.character;
    //   notification.recipient = participant;
    //   notification.comment = event.comment;
    //   notification.post = event.comment.post;
    //   notification.type = NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE;
    //   // Execute create notification command
    // }

  }

  public async createAsCorporation(
    commentData: VCreateComment,
    postId: string,
    corporationId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.corporationId = corporationId;

    return this.commentRepository.save(comment);
  }

  public async createAsAlliance(
    commentData: VCreateComment,
    postId: string,
    allianceId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.allianceId = allianceId;

    return this.commentRepository.save(comment);
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

  private async sendNotificationForCreate() {
    const participants = await this.postService.getParticipants(event.comment.post);
    const eventUuid = uuidv4();

    // Create notification for all the characters

  }
}
