import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { VCreateComment } from './comment.validate';
import { Character } from '../character/character.entity';
import { Post } from '../post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from './commands/create.command';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';

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
    post: Post,
    character: Character,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.post = post;
    comment.character = character;

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
  }

  public async createAsCorporation(
    commentData: VCreateComment,
    post: Post,
    corporation: Corporation,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.post = post;
    comment.corporation = corporation;

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
  }

  public async createAsAlliance(
    commentData: VCreateComment,
    post: Post,
    alliance: Alliance,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = commentData.content;
    comment.post = post;
    comment.alliance = alliance;

    return this.commandBus.execute(
      new CreateCommentCommand(comment),
    );
  }

  public async getLatestForPost(
    post: Post,
    limit = 10,
    page = 0,
  ): Promise<{ comments: Comment[], count: number }> {
    const [comments, count] = await this.commentRepository.getLatestForPost(post, limit, page);

    return { comments, count };
  }

}
