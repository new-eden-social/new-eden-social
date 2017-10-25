import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest } from './post.interface';
import { Character } from '../character/character.entity';
import { Killmail } from '../killmail/killmail.entity';
import { POST_REPOSITORY_TOKEN, TYPES } from './post.constants';
import { CorporationService } from '../corporation/corporation.service';
import { CharacterService } from '../character/character.service';
import { Corporation } from '../corporation/corporation.entity';

@Component()
export class PostService {

  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: Repository<Post>,
    private corporationService: CorporationService,
    private characterService: CharacterService,
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

    if (postData.corporationId)
      post.corporationWall = await this.corporationService.get(postData.corporationId);

    if (postData.characterId)
      post.characterWall = await this.characterService.get(postData.characterId);

    return this.postRepository.save(post);
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

    if (postData.corporationId)
      post.corporationWall = await this.corporationService.get(postData.corporationId);

    if (postData.characterId)
      post.characterWall = await this.characterService.get(postData.characterId);

    return this.postRepository.save(post);
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
  ): Promise<Post[]> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'author')
    .leftJoinAndSelect('post.killmail', 'killmail')
    .leftJoinAndSelect('killmail.participants', 'participant')
    .leftJoinAndSelect('participant.character', 'character')
    .where(
      'post."characterWallId" = :characterId OR character.id = :characterId',
      { characterId: character.id })
    .orderBy({ 'post."createdAt"': 'DESC' })
    .skip(limit * page)
    // FIXME: .take(limit)
    .getMany();
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
  ): Promise<Post[]> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'author')
    .leftJoinAndSelect('post.killmail', 'killmail')
    .leftJoinAndSelect('killmail.participants', 'participant')
    .leftJoinAndSelect('participant.character', 'character')
    .where(
      'post."corporationWallId" = :corporationId OR character."corporationId" = :corporationId',
      { corporationId: corporation.id })
    .orderBy({ 'post."createdAt"': 'DESC' })
    .skip(limit * page)
    // FIXME: .take(limit)
    .getMany();
  }

  /**
   * Create killmail post
   * @param {Killmail} killmail
   * @param {Character} finalBlow
   * @return {Promise<Post>}
   */
  public async createKillmailPost(killmail: Killmail, finalBlow: Character): Promise<Post> {
    const post = new Post();
    post.type = TYPES.KILLMAIL;
    post.killmail = killmail;
    post.character = finalBlow;
    post.locationId = killmail.locationId;
    post.createdAt = killmail.createdAt;

    return this.postRepository.save(post);
  }
}
