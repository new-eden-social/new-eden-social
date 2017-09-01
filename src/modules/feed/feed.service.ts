import { Component } from '@nestjs/common';
import { CharactersService } from '../character/character.service';
import { IFeed } from './feed.interface';
import { Character } from '../character/character.entity';
import { KillmailService } from './killmail/killmail.service';

@Component()
export class FeedService {

  constructor(private charactersService: CharactersService, private killmailService: KillmailService) {
  }

  /**
   * Get All Posts
   * @param character
   * @param page
   * @param limit
   * @return {Promise<Post[]>}
   */
  public async getCharacterFeed(character: Character, page: number = 0, limit: number = 10): Promise<IFeed[]> {

    return await []
  }

}
