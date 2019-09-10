import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Comment } from '@new-eden-social/services-comment/comment.entity';

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

  public async getParticipantsForPost(
    postId: string,
  ): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
    .select('DISTINCT(comment."characterId")', 'characterId')
    .select('DISTINCT(comment."corporationId")', 'corporationId')
    .select('DISTINCT(comment."allianceId")', 'allianceId')
    .where('comment."postId" = :postId', { postId })
    .getMany();
  }
}
