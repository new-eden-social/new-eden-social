import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest } from './post.interface';
import { Character } from '../character/character.entity';
import { Killmail } from '../killmail/killmail.entity';
import { POST_REPOSITORY_TOKEN, TYPES } from './post.constants';

@Component()
export class PostService {

  constructor(
    @Inject(POST_REPOSITORY_TOKEN) private postRepository: Repository<Post>,
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
   * Create Post
   * @param postData
   * @param character
   * @return {Promise<Post>}
   */
  public async create(postData: ICreatePostRequest, character: Character): Promise<Post> {
    const post = new Post(postData);
    post.character = character;

    return this.postRepository.save(post);
  }

  /**
   * Get character posts
   * @param {Character} character
   * @param {Number} limit
   * @param {Number} page
   * @return {Promise<Post[]>}
   */
  public async getCharacterPosts(
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
      'author.id = :characterId OR character.id = :characterId',
      { characterId: character.id })
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
