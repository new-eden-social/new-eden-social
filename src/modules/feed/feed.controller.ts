import { Response, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CharactersService } from '../character/character.service';

@Controller('feeds')
export class FeedController {

  constructor(private feedService: FeedService,
              private charactersService: CharactersService) {
  }

  @Get('/character/:characterId')
  public async feed(@Response() res, @Param('characterId') characterId: number) {
    const character = await this.charactersService.get(characterId);
    const feed = await this.feedService.getCharacterFeed(character);

    res.status(HttpStatus.OK).json(feed);
  }

}
