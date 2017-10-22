import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharacterService) {
  }

  @Get('/:characterId')
  public async search(@Response() res, @Param('characterId') characterId: number) {
    const character = await this.characterService.get(characterId);

    res.status(HttpStatus.OK).json(character.response);
  }

}
