import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { VCreateComment } from './comment.validate';
import { Character } from '../character/character.entity';
import { Post } from '../post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
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

    return this.commentRepository.save(comment);
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
