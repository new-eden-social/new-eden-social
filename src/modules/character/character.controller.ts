import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { DCharacter } from './character.dto';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FollowService } from '../follow/follow.service';
import { PostService } from '../post/post.service';

@ApiUseTags('characters')
@Controller('characters')
export class CharactersController {

  constructor(
    private characterService: CharacterService,
    private followService: FollowService,
    private postService: PostService,
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
