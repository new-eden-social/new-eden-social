import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  public async getLatestForPost(
    postId: string,
    limit: number,
    page: number,
  ): Promise<[Comment[], number]> {
    return this.createQueryBuilder('comment')
    .where('comment."postId" = :postId', { postId })
    .orderBy({ 'comment."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .getManyAndCount();
  }

}
