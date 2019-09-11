import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { DCharacter } from './character.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CharacterGrpcClient } from '@new-eden-social/services-character';

@ApiUseTags('characters')
@Controller('characters')
export class CharacterHttpController {

  constructor(
    private readonly characterClient: CharacterGrpcClient,
  ) {
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
    const character = await this.characterClient.service.get({ characterId }).toPromise();
    return new DCharacter(character);
  }
}
