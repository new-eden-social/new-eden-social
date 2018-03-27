import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { DCharacter } from './character.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('characters')
@Controller('characters')
export class CharactersController {

  constructor(private characterService: CharacterService) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DCharacter,
    description: 'Get character by id',
  })
  @Get('/:characterId')
  public async search(
    @Param('characterId') characterId: number,
  ): Promise<DCharacter> {
    const character = await this.characterService.get(characterId);

    return new DCharacter(character);
  }

}
