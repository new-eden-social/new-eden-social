import { Controller, Get, HttpStatus, Param, Response } from '@nestjs/common';
import { CharacterService } from './character.service';
import { DCharacter } from './character.dto';

@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharacterService) {
  }

  @Get('/:characterId')
  public async search(@Response() res, @Param('characterId') characterId: number) {
    const character = await this.characterService.get(characterId);

    const response = new DCharacter(character);

    res.status(HttpStatus.OK).json(response);
  }

}
