import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Comment } from './comment.entity';
import { Post } from '../post/post.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  public async getLatestForPost(
    post: Post,
    limit: number,
    page: number,
  ): Promise<[Comment[], number]> {
    return this.createQueryBuilder('comment')
    .leftJoinAndSelect('comment.character', 'authorCharacter')
    .leftJoinAndSelect('authorCharacter.corporation', 'authorCharacterCorporation')
    .leftJoinAndSelect('authorCharacterCorporation.alliance', 'authorCharacterAlliance')
    .leftJoinAndSelect('comment.corporation', 'authorCorporation')
    .leftJoinAndSelect('authorCorporation.alliance', 'authorCorporationAlliance')
    .leftJoinAndSelect('comment.alliance', 'authorAlliance')
    .where('comment."postId" = :postId', { postId: post.id })
    .orderBy({ 'comment."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .getManyAndCount();
  }

}
