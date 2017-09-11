import { Component } from '@nestjs/common';
import { IFeed } from './feed.interface';
import { Character } from '../character/character.entity';
import { KillmailService } from './killmail/killmail.service';

@Component()
export class FeedService {

  constructor(
    private killmailService: KillmailService,
  ) {
  }

  /**
   * Get All Posts
   * @param character
   * @param page
   * @param limit
   * @return {Promise<IFeed[]>}
   */
  public async getCharacterFeed(
    character: Character,
    page: number = 0,
    limit: number = 10,
  ): Promise<IFeed[]> {
    const rawKillmails = await this.killmailService.getKillmailsForCharacter(character);

    return Promise.all(rawKillmails.map(raw => this.killmailService.formatKillmailResponse(raw)));
  }

}
