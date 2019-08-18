import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { VCreateComment } from './comment.validate';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from './commands/create.command';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private readonly commandBus: CommandBus,
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

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
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

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
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

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
  }

  public async getLatestForPost(
    postId: string,
    limit = 10,
    page = 0,
  ): Promise<{ comments: Comment[], count: number }> {
    const [comments, count] = await this.commentRepository.getLatestForPost(postId, limit, page);
    return { comments, count };
  }

}
