import { Component } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ICreatePostRequest } from './post.interface';
import { Character } from '../../character/character.entity';

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
    const post = new Post();
    post.populateRequestData(postData);
    post.character = character;

    return (await this.repository).persist(post);
  }

}
