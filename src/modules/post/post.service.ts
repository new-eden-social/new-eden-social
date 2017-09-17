import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest, IPostResponse } from './post.interface';
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

  public async getCharacterPosts(character: Character): Promise<IPostResponse[]> {
    return this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.killmail', 'killmail')
    .leftJoinAndSelect(
      'killmail.participants',
      'killmail.participants')
    .leftJoinAndSelect(
      Character,
      'killmail.participants.character',
      '"killmail.participants"."characterId" = "killmail.participants.character".id')
    .orderBy({ 'post."createdAt"': 'DESC' })
    .getMany();
  }

  public async createKillmailPost(killmail: Killmail, finalBlow: Character) {
    const post = new Post();
    post.type = TYPES.KILLMAIL;
    post.killmail = killmail;
    post.character = finalBlow;
    post.locationId = killmail.locationId;
    post.createdAt = killmail.createdAt;

    return this.postRepository.persist(post);
  }
}
