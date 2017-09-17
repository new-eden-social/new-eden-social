import { Component } from '@nestjs/common';
import { Character } from '../character/character.entity';
import { PostService } from '../post/post.service';
import { IPostResponse } from '../post/post.interface';

@Component()
export class FeedService {

  constructor(
    private postService: PostService,
  ) {
  }

  /**
   * Get All Posts
   * @param character
   * @param page
   * @param limit
   * @return {Promise<IPostResponse[]>}
   */
  public async getCharacterFeed(
    character: Character,
    page: number = 0,
    limit: number = 10,
  ): Promise<IPostResponse[]> {
    return this.postService.getCharacterPosts(character);
  }

}
