import { Component } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest, IPostResponse } from './post.interface';
import { Character } from '../character/character.entity';
import { Killmail } from '../killmail/killmail.entity';
import { TYPES } from './post.constants';

@Component()
export class PostService {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<Post>> {
    return this.databaseService.getRepository(Post);
  }

  /**
   * Get single Post
   * @param id
   * @return {Promise<Post>}
   */
  public async get(id: number): Promise<Post> {
    return (await this.repository).findOneById(id);
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

    return (await this.repository).persist(post);
  }

  public async getCharacterPosts(character: Character): Promise<IPostResponse[]> {
    return (await this.repository)
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

    return (await this.repository).persist(post);
  }
}
