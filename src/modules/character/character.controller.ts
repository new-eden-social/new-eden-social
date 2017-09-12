import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CharactersService } from './character.service';

@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharactersService) {
  }

  @Get('/:id')
  public async search(@Response() res, @Param('id') characterId: number) {
    const character = await this.characterService.get(characterId);

    res.status(HttpStatus.OK).json(character.response);
  }

}
