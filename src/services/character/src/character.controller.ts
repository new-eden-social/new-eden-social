import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { DCharacter } from './character.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FollowService } from '@new-eden-social/api-follow';
import { PostService } from '@new-eden-social/api-post';

@ApiUseTags('characters')
@Controller('characters')
export class CharactersController {

  constructor(
    private readonly characterService: CharacterService,
    private readonly followService: FollowService,
    private readonly postService: PostService,
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
    const character = await this.characterService.get(characterId);
    const followers = await this.followService.getCharacterFollowers(character);
    const following = await this.followService.getCharacterFollowing(character);
    const numPosts = await this.postService.getNumOfPostsByCharacter(character);

    return new DCharacter(character, followers, following, numPosts);
  }

}
