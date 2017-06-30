import { Component } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Post } from './post.entety';
import { CreatePostRequest } from './post.interface';
import { Character } from '../character/character.entety';
import { CharactersService } from '../character/character.service';

@Component()
export class PostService {

  constructor(private databaseService: DatabaseService,
              private charactersService: CharactersService) {
  }

  private get repository(): Promise<Repository<Post>> {
    return this.databaseService.getRepository(Post);
  }

  /**
   * Get All Posts
   * @param page
   * @param limit
   * @return {Promise<Post[]>}
   */
  public async all(page: number = 0, limit: number = 10): Promise<Post[]> {
    const posts = await (await this.repository)
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.character', 'character')
    .orderBy('post.createdAt', 'DESC')
    .skip(page * limit)
    .take(limit)
    .getMany();

    // Populate posts with characters data
    return Promise.all(posts.map(async post => {
      // TODO: Could use some different method that get use less character information ?
      post.character = await this.charactersService.get(post.character.id);
      return post
    }))
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
  public async create(postData: CreatePostRequest, character: Character): Promise<Post> {
    const post = new Post();
    post.populateRequestData(postData);
    post.character = character;

    return (await this.repository).persist(post);
  }

}
