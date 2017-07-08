import { Component } from '@nestjs/common';
import { IService } from '../../interfaces/service.interface';
import { DatabaseService } from '../database/database.service';
import { Repository } from 'typeorm';
import { Post } from './post.entety';

@Component()
export class PostService implements IService<Post> {

  constructor(private databaseService: DatabaseService) {
  }

  private get repository(): Promise<Repository<Post>> {
    return this.databaseService.getRepository(Post);
  }

  /**
   * Get character data
   * @param id
   * @return {Promise<Character>}
   */
  public async get(id: number): Promise<Post> {
    let post = await (await this.repository).findOneById(id);

    return post;
  }
}
