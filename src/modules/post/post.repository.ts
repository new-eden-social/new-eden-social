import { Repository, SelectQueryBuilder } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Post } from './post.entity';
import { Character } from '../character/character.entity';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  public async getCharacterWall(
    character: Character,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .where(
      `
      post."characterWallId" = :characterId OR
      (authorCharacter.id = :characterId AND post."characterWallId" IS NULL)
      `,
      { characterId: character.id })
    .getManyAndCount();
  }

  public async getCorporationWall(
    corporation: Corporation,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .where(
      `
      post."corporationWallId" = :corporationId OR
      (authorCorporation.id = :corporationId AND post."corporationWallId" IS NULL)
      `,
      { corporationId: corporation.id })
    .getManyAndCount();
  }

  public async getAllianceWall(
    alliance: Alliance,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .where(
      `
      post."allianceWallId" = :allianceId OR
      (authorAlliance.id = :allianceId AND post."allianceWallId" IS NULL)
      `,
      { allianceId: alliance.id })
    .getManyAndCount();
  }

  public async getByLocation(
    locationId: number,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .where('location."id" = :locationId', { locationId })
    .getManyAndCount();
  }

  public async getByHashtag(
    hashtag: string,
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .where('hashtag."name" = :hashtag', { hashtag })
    .getManyAndCount();
  }

  public async getLatest(
    limit: number,
    page: number,
  ): Promise<[Post[], number]> {
    return this.getAll(limit, page)
    .getManyAndCount();
  }

  public async getParticipants(
    post: Post,
  ): Promise<{ characters: Character[], corporations: Corporation[], alliances: Alliance[] }> {
    const postWithComments = await this.createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'characterAuthor')
    .leftJoinAndSelect('post.corporation', 'corporationAuthor')
    .leftJoinAndSelect('post.alliance', 'allianceAuthor')
    .leftJoinAndSelect('post.comments', 'comment')
    .leftJoinAndSelect('comment.character', 'character')
    .leftJoinAndSelect('comment.corporation', 'corporation')
    .leftJoinAndSelect('comment.alliance', 'alliance')
    .where('post.id = :postId', { postId: post.id })
    .getOne();

    const characters = postWithComments.comments
    .map(comment => comment.character)
    .filter(character => character);
    if (postWithComments.character) characters.push(postWithComments.character);

    const corporations = postWithComments.comments
    .map(comment => comment.corporation)
    .filter(corporation => corporation);
    if (postWithComments.corporation) corporations.push(postWithComments.corporation);

    const alliances = postWithComments.comments
    .map(comment => comment.alliance)
    .filter(alliance => alliance);
    if (postWithComments.alliance) alliances.push(postWithComments.alliance);

    return {
      characters: characters.filter((v, i, a) => a.findIndex(v1 => v1.id === v.id) === i), // unique
      corporations: corporations.filter((v, i, a) => a.findIndex(v1 => v1.id === v.id) === i), // unique
      alliances: alliances.filter((v, i, a) => a.findIndex(v1 => v1.id === v.id) === i), // unique
    };
  }

  /**
   * Wrapper for querying posts
   * @param {number} limit
   * @param {number} page
   * @returns {SelectQueryBuilder<Post>}
   */
  private getAll(limit: number, page: number): SelectQueryBuilder<Post> {
    return this.createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'authorCharacter')
    .leftJoinAndSelect('authorCharacter.corporation', 'authorCharacterCorporation')
    .leftJoinAndSelect('authorCharacterCorporation.alliance', 'authorCharacterAlliance')
    .leftJoinAndSelect('post.corporation', 'authorCorporation')
    .leftJoinAndSelect('authorCorporation.alliance', 'authorCorporationAlliance')
    .leftJoinAndSelect('post.alliance', 'authorAlliance')
    .leftJoinAndSelect('post.characterWall', 'onCharacterWall')
    .leftJoinAndSelect('onCharacterWall.corporation', 'onCharacterWallCorporation')
    .leftJoinAndSelect('onCharacterWallCorporation.alliance', 'onCharacterWallAlliance')
    .leftJoinAndSelect('post.corporationWall', 'onCorporationWall')
    .leftJoinAndSelect('onCorporationWall.alliance', 'onCorporationWallAlliance')
    .leftJoinAndSelect('post.allianceWall', 'onAllianceWall')
    .leftJoinAndSelect('post.killmail', 'killmail')
    .leftJoinAndSelect('post.hashtags', 'hashtag')
    .leftJoinAndSelect('post.location', 'location')
    .leftJoinAndSelect('killmail.participants', 'killmailP')
    .leftJoinAndSelect('killmailP.character', 'killmailPCharacter')
    .leftJoinAndSelect('killmailPCharacter.corporation', 'killmailPCorporation')
    .leftJoinAndSelect('killmailPCorporation.alliance', 'killmailPAlliance')
    .leftJoinAndSelect('killmailP.ship', 'killmailPShip')
    .leftJoinAndSelect('killmailPShip.group', 'killmailPShipGroup')
    .leftJoinAndSelect('killmailPShipGroup.category', 'killmailPShipGroupCategory')
    .leftJoinAndSelect('killmailP.weapon', 'killmailPWeapon')
    .leftJoinAndSelect('killmailPWeapon.group', 'killmailPWeaponGroup')
    .leftJoinAndSelect('killmailPWeaponGroup.category', 'killmailPWeaponGroupCategory')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .offset(limit * page)
    .limit(limit);
  }
}
