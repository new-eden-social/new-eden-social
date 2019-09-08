import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  public async getCharacterWall(
    characterId: number,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .where(
      `
      post."characterWallId" = :characterId OR
      (post."characterId" = :characterId AND post."characterWallId" IS NULL)
      `,
      { characterId })
    .getManyAndCount();
  }

  public async getCorporationWall(
    corporationId: number,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .where(
      `
      post."corporationWallId" = :corporationId OR
      (post."corporationId" = :corporationId AND post."corporationWallId" IS NULL)
      `,
      { corporationId })
    .getManyAndCount();
  }

  public async getAllianceWall(
    allianceId: number,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .where(
      `
      post."allianceWallId" = :allianceId OR
      (post."allianceId" = :allianceId AND post."allianceWallId" IS NULL)
      `,
      { allianceId })
    .getManyAndCount();
  }

  public async getByLocation(
    locationId: number,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .where('post."locationId" = :locationId', { locationId })
    .getManyAndCount();
  }

  public async getByHashtag(
    hashtag: string,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .where(':hashtag = ANY (post."hashtags")', { hashtag })
    .getManyAndCount();
  }

  public async getLatest(
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.createQueryBuilder('post')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit)
    .getManyAndCount();
  }

  public getNumOfPostsByCharacter(
    characterId: number,
  ): Promise<number> {
    return this.count({ where: { characterId } });
  }

  public getNumOfPostsByCorporation(
    corporationId: number,
  ): Promise<number> {
    return this.count({ where: { corporationId } });
  }

  public getNumOfPostsByAlliance(
    allianceId: number,
  ): Promise<number> {
    return this.count({ where: { allianceId } });
  }
}
