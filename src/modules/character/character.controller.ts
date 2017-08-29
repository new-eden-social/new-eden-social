import { Response, Param, Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { CharactersService } from './character.service';
import { Character } from './character.entity';

@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharactersService) {
  }

  @Get('/:id')
  public async search(@Response() res, @Param('id') characterId) {
    const character = await this.characterService.get(characterId);

    res.status(HttpStatus.OK).json(character.response);
  }

}
