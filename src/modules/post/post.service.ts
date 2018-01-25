import { Component, Inject } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest } from './post.validate';
import { Character } from '../character/character.entity';
import { Killmail } from '../killmail/killmail.entity';
import { POST_REPOSITORY_TOKEN, POST_TYPES } from './post.constants';
import { CorporationService } from '../corporation/corporation.service';
import { CharacterService } from '../character/character.service';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';
import { AllianceService } from '../alliance/alliance.service';
import { HashtagService } from '../hashtag/hashtag.service';
import { ESIEntetyNotFoundException } from '../common/external/esi/esi.exceptions';
import Log from '../../utils/Log';
import { UniverseLocationService } from '../universe/location/location.service';

@Component()
export class PostService {

  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: Repository<Post>,
    private corporationService: CorporationService,
    private characterService: CharacterService,
    private allianceService: AllianceService,
    private hashtagService: HashtagService,
    private universeLocationService: UniverseLocationService,
  ) {
  }

  /**
   * Get single Post
   * @param id
   * @return {Promise<Post>}
   */
  public async get(id: number): Promise<Post> {
    return this.postRepository.findOneById(id);
  }

  /**
   * Create Post as character
   * @param {ICreatePostRequest} postData
   * @param {Character} character
   * @return {Promise<Post>}
   */
  public async createAsCharacter(
    postData: ICreatePostRequest,
    character: Character,
  ): Promise<Post> {
    const post = new Post(postData);
    post.character = character;

    return this.create(post, postData);
  }

  /**
   * Create Post as corporation
   * @param {ICreatePostRequest} postData
   * @param {Corporation} corporation
   * @return {Promise<Post>}
   */
  public async createAsCorporation(
    postData: ICreatePostRequest,
    corporation: Corporation,
  ): Promise<Post> {
    const post = new Post(postData);
    post.corporation = corporation;

    return this.create(post, postData);
  }

  /**
   * Create Post as alliance
   * @param {ICreatePostRequest} postData
   * @param {Alliance} alliance
   * @return {Promise<Post>}
   */
  public async createAsAlliance(
    postData: ICreatePostRequest,
    alliance: Alliance,
  ): Promise<Post> {
    const post = new Post(postData);
    post.alliance = alliance;

    return this.create(post, postData);
  }

  /**
   * Get character wall
   * @param {Character} character
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getCharacterWall(
    character: Character,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {

    const query = this.getAll(limit, page);
    query.where(
      `
      post."characterWallId" = :characterId OR
      (author.id = :characterId AND post."characterWallId" IS NULL)
      `,
      { characterId: character.id });

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Get corporation wall
   * @param {Corporation} corporation
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getCorporationWall(
    corporation: Corporation,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const query = this.getAll(limit, page);
    query.where(
      `
      post."corporationWallId" = :corporationId OR
      (post."corporationId" = :corporationId AND post."corporationWallId" IS NULL)
      `,
      { corporationId: corporation.id });

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Get alliance wall
   * @param {Alliance} alliance
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getAllianceWall(
    alliance: Alliance,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const query = this.getAll(limit, page);
    query.where(
      `
      post."allianceWallId" = :allianceId OR
      (post."allianceId" = :allianceId AND post."allianceWallId" IS NULL)
      `,
      { allianceId: alliance.id });

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Get all posts for specific hashtag
   * @param {string} hashtag
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<{posts: Post[]; count: number}>}
   */
  public async getByHashtag(
    hashtag: string,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const query = this.getAll(limit, page);
    query.where('hashtag."name" = :hashtag', { hashtag });

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Get all posts for specific location
   * @param {number} locationId
   * @param {number} limit
   * @param {number} page
   * @returns {Promise<{posts: Post[]; count: number}>}
   */
  public async getByLocation(
    locationId: number,
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const query = this.getAll(limit, page);
    query.where('location."id" = :locationId', { locationId });

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Get latest posts
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getLatest(
    limit = 10,
    page = 0,
  ): Promise<{ posts: Post[], count: number }> {
    const query = this.getAll(limit, page);

    const [posts, count] = await query.getManyAndCount();

    return { posts, count };
  }

  /**
   * Create killmail post
   * @param {Killmail} killmail
   * @param {Character} finalBlow
   * @return {Promise<Post>}
   */
  public async createKillmailPost(killmail: Killmail, finalBlow: Character): Promise<Post> {
    const post = new Post();
    post.type = POST_TYPES.KILLMAIL;
    post.killmail = killmail;
    post.character = finalBlow;
    post.createdAt = killmail.createdAt;

    if (killmail.locationId) {
      try {
        post.location = await this.universeLocationService.get(killmail.locationId);
      } catch (e) {
        if (e instanceof ESIEntetyNotFoundException) Log.warning('locationId was not found!');
        else throw e;
      }
    }

    return this.postRepository.save(post);
  }


  /**
   * Wrapper for querying posts
   * @param {number} limit
   * @param {number} page
   * @returns {SelectQueryBuilder<Post>}
   */
  private getAll(limit: number, page: number): SelectQueryBuilder<Post> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'authorCharacter')
    .leftJoinAndSelect('authorCharacter.corporation', 'authorCharacterCorporation')
    .leftJoinAndSelect('authorCharacterCorporation.alliance', 'authorCharacterAlliance')
    .leftJoinAndSelect('post.corporation', 'authorCorporation')
    .leftJoinAndSelect('authorCorporation.alliance', 'authorCorporationAlliance')
    .leftJoinAndSelect('post.alliance', 'authorAlliance')
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

  /**
   * Create post
   * @param {Post} post
   * @param {ICreatePostRequest} postData
   * @returns {Promise<Post>}
   */
  private async create(post: Post, postData: ICreatePostRequest): Promise<Post> {
    if (postData.allianceId)
      post.allianceWall = await this.allianceService.get(postData.allianceId);

    if (postData.corporationId)
      post.corporationWall = await this.corporationService.get(postData.corporationId);

    if (postData.characterId)
      post.characterWall = await this.characterService.get(postData.characterId);

    if (postData.locationId)
      post.location = await this.universeLocationService.get(postData.locationId);

    post.hashtags = await this.hashtagService.parse(post.content);

    return this.postRepository.save(post);
  }
}
